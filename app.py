import json

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import numpy as np
import onnxruntime as ort
from transformers import AutoTokenizer


app = Flask(__name__, static_folder="frontend/build", static_url_path="/")
CORS(app)

# Load the model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
bert = ort.InferenceSession("models/bert-mini-finetune.onnx")
with open("models/idx_to_keywords.json", "r") as f:
    idx_to_keywords = json.load(f)


def predict(texts):
    """Predicts the keywords for a list of texts"""
    # Tokenize the texts
    inputs = tokenizer(texts, return_tensors="np")
    # Run the model
    output = bert.run(output_names=["logits"], input_feed=dict(inputs))
    logits = output[0]
    # Convert the logits to probabilities
    probs = np.exp(logits) / np.exp(logits).sum(axis=1, keepdims=True)
    # Get the top 5 predictions
    top5 = probs.argsort(axis=1)[:, -5:]
    # Convert the idx to wine info
    results = []
    for i, _ in enumerate(texts):
        predictions = []
        for rank, idx in enumerate(top5[i]):
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
                    "special_keywords": idx_to_keywords[idx]["special_keywords"],
                    "common_keywords": idx_to_keywords[idx]["common_keywords"],
                    "probability": float(probs[i][idx]),
                    "rank": rank,
                }
            )
        results.append(predictions)
    return results


@app.route("/api/recommend", methods=["POST"])
def recommend():
    # Check if the request is valid
    if not request.is_json:
        return jsonify({"error": "Invalid request"}), 400

    if "text" not in request.json:
        return jsonify({"error": "Missing `text` field in request"}), 400

    # Get the text from the request
    text = request.json["text"]

    # Check if the text is long enough or too long
    if len(text) > 500:
        return jsonify({"error": "Text too long"}), 400
    elif len(text.strip()) < 10:
        return jsonify({"error": "Text too short, must be at least 10 characters"}), 400

    results = predict([text])
    return jsonify(results[0])


@app.route("/api/recommends", methods=["POST"])
def recommends():
    # Check if the request is valid
    if not request.is_json:
        return jsonify({"error": "Invalid request"}), 400

    if "texts" not in request.json:
        return jsonify({"error": "Missing `texts` field in request"}), 400

    # Get the texts from the request
    texts = request.json["texts"]

    # Check if the texts are long enough or too long
    for text in texts:
        if len(text) > 500:
            return jsonify({"error": "Text too long"}), 400
        elif len(text.strip()) < 10:
            return (
                jsonify({"error": "Text too short, must be at least 10 characters"}),
                400,
            )

    results = predict(texts)
    return jsonify(results)


@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run()
