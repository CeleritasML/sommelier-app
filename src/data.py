import datasets
import json
import pandas as pd
import pytorch_lightning as pl
from torch.utils.data import DataLoader
from transformers import AutoTokenizer


class WineDataModule(pl.LightningDataModule):
    def __init__(
        self,
        model_name: str = "bert-base-uncased",
        data_path: str = "data/wine_cleaned_{split}.csv",
        max_seq_length: int = 200,
        train_batch_size: int = 256,
        eval_batch_size: int = 32,
        random_seed: int = 42,
    ):
        super().__init__()
        self.model_name = model_name
        self.data_path = data_path
        self.max_seq_length = max_seq_length
        self.train_batch_size = train_batch_size
        self.eval_batch_size = eval_batch_size
        self.num_workers = 0
        self.random_seed = random_seed

    def prepare_data(self):
        tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        with open("models/label_to_idx.json", "r") as f:
            self.label_to_idx = json.load(f)
        self.dataset = {}
        for split in ["train", "val", "test"]:
            df = pd.read_csv(self.data_path.format(split=split))
            features = self._convert_to_features(tokenizer, df)
            subset = datasets.Dataset.from_dict(features)
            subset.set_format(type="torch", columns=list(features.keys()))
            self.dataset[split] = subset

    def setup(self, stage: str):
        pass

    def train_dataloader(self):
        return DataLoader(
            self.dataset["train"],
            batch_size=self.train_batch_size,
            num_workers=self.num_workers,
            shuffle=True,
        )

    def val_dataloader(self):
        return DataLoader(
            self.dataset["val"],
            batch_size=self.eval_batch_size,
            num_workers=self.num_workers,
        )

    def test_dataloader(self):
        return DataLoader(
            self.dataset["test"],
            batch_size=self.eval_batch_size,
            num_workers=self.num_workers,
        )

    def _convert_to_features(self, tokenizer, examples):
        features = tokenizer.batch_encode_plus(
            examples["description"].tolist(),
            max_length=self.max_seq_length,
            padding="max_length",
            truncation=True,
        )
        features["labels"] = examples["region_variety"].tolist()
        features["labels"] = [self.label_to_idx[label] for label in features["labels"]]
        return features


if __name__ == "__main__":
    dm = WineDataModule()
    dm.prepare_data()
    dm.setup("fit")
    print(next(iter(dm.train_dataloader())))
