import json
import numpy as np
import onnxruntime as ort
from transformers import AutoTokenizer


if __name__ == "__main__":
    with open("models/idx_to_label.json", "r") as f:
        idx_to_label = json.load(f)
    tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
    sess = ort.InferenceSession("models/bert-mini-50epoch.onnx")
    inputs = tokenizer("This is a test", return_tensors="np")
    output = sess.run(output_names=["logits"], input_feed=dict(inputs))
    top5_idx = np.argpartition(output[0][0], -5)[-5:]
    print("Top 5 predictions:")
    print([idx_to_label[idx] for idx in top5_idx])
