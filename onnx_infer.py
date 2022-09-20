import json
import numpy as np
import onnxruntime as ort
from transformers import AutoTokenizer


if __name__ == "__main__":
    with open("models/idx_to_keywords.json", "r") as f:
        idx_to_keywords = json.load(f)
    tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
    sess = ort.InferenceSession("models/bert-mini-finetune.onnx")
    while True:
        text = input("Enter text of wine [q to quit]: ")
        if text == "q":
            break
        inputs = tokenizer(text, return_tensors="np")
        output = sess.run(output_names=["logits"], input_feed=dict(inputs))
        logits = output[0][0]
        probs = np.exp(logits) / np.sum(np.exp(logits))
        top5_idx = probs.argsort()[-5:][::-1]
        print("Top 5 predictions:")
        for idx in top5_idx:
            print(f"{probs[idx]:.4f}: {idx_to_keywords[idx]['label']}")
        print()
