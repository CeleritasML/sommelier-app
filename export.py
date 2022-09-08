import argparse
import torch
from transformers import AutoTokenizer

from src.model import WineBert


if __name__ == "__main__":
    # python export.py --ckpt_path lightning_logs/version_6/checkpoints/ckpt-epoch=49-val_loss=0.61-val_accuracy=0.9533.ckpt --output_path models/bert-mini-50epoch.onnx
    parser = argparse.ArgumentParser()
    parser.add_argument("--ckpt_path", type=str, required=True)
    parser.add_argument("--output_path", type=str, required=True)
    parser.add_argument("--tokenizer", type=str, default="bert-base-uncased")
    args = parser.parse_args()

    tokenizer = AutoTokenizer.from_pretrained(args.tokenizer)
    module = WineBert.load_from_checkpoint(args.ckpt_path)

    example_input = tokenizer("This is a test", return_tensors="pt")
    torch.onnx.export(
        module.model,
        tuple(example_input.values()),
        f=args.output_path,
        input_names=["input_ids", "attention_mask", "token_type_ids"],
        output_names=["logits"],
        dynamic_axes={
            "input_ids": {0: "batch_size", 1: "sequence"},
            "attention_mask": {0: "batch_size", 1: "sequence"},
            "token_type_ids": {0: "batch_size", 1: "sequence"},
            "logits": {0: "batch_size", 1: "sequence"},
        },
        verbose=True,
    )
