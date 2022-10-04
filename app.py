import json

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import onnxruntime as ort
from transformers import AutoTokenizer


app = Flask(__name__)
CORS(app)

# Load the model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
bert = ort.InferenceSession("models/bert-mini-finetune.onnx")
with open("models/idx_to_keywords.json", "r") as f:
    idx_to_keywords = json.load(f)


@app.route("/api/recommend", methods=["POST"])
def recommend():
    # Check if the request is valid
    if not request.is_json:
        return jsonify({"error": "Invalid request"}), 400

    if "text" not in request.json:
        return jsonify({"error": "Missing `text` field in request"}), 400

    # Get the text from the request
    text = request.json["text"]

    # Check if the text is long enough
    if len(text) < 10:
        return jsonify({"error": "Text too short, must be at least 10 characters"}), 400

    # Tokenize the text
    inputs = tokenizer(text, return_tensors="np")

    # Run the model
    output = bert.run(output_names=["logits"], input_feed=dict(inputs))
    logits = output[0][0]

    # Get the top 5 predictions
    probs = np.exp(logits) / np.sum(np.exp(logits))
    top5_idx = probs.argsort()[-5:][::-1]

    # Format the predictions
    predictions = []
    for rank, idx in enumerate(top5_idx):
        label = idx_to_keywords[idx]["label"]
        region, variety = label.split(":")
        region_split = region.split("-")
        country = region_split[0]
        province = region_split[1] if len(region_split) > 1 else None
        predictions.append(
            {
                "country": country,
                "province": province,
                "variety": variety,
                "keywords": idx_to_keywords[idx]["keywords"],
                "probability": float(probs[idx]),
                "rank": rank,
            }
        )

    return jsonify(predictions)


if __name__ == "__main__":
    app.run()
