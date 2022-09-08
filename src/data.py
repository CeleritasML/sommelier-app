import datasets
import json
import pandas as pd
import pytorch_lightning as pl
from sklearn.model_selection import train_test_split
from torch.utils.data import DataLoader
from transformers import AutoTokenizer


class WineDataModule(pl.LightningDataModule):
    def __init__(
        self,
        model_name: str = "bert-base-uncased",
        data_path: str = "data/wine_cleaned.csv",
        max_seq_length: int = 200,
        train_batch_size: int = 32,
        val_batch_size: int = 32,
        random_seed: int = 42,
    ):
        super().__init__()
        self.model_name = model_name
        self.data_path = data_path
        self.max_seq_length = max_seq_length
        self.train_batch_size = train_batch_size
        self.val_batch_size = val_batch_size
        self.random_seed = random_seed

    def prepare_data(self):
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)

        data = pd.read_csv(self.data_path)
        self.idx_to_label = list(data["region_variety"].unique())
        self.label_to_idx = {label: idx for idx, label in enumerate(self.idx_to_label)}
        with open("data/idx_to_label.json", "w") as f:
            json.dump(self.idx_to_label, f)

        train_indices, test_indices, _, _ = train_test_split(
            range(data.shape[0]),
            data["region_variety"],
            test_size=0.1,
            stratify=data["region_variety"],
            random_state=self.random_seed,
        )

        train_set = data.iloc[train_indices]
        test_set = data.iloc[test_indices]

        train_indices, val_indices, _, _ = train_test_split(
            range(train_set.shape[0]),
            train_set["region_variety"],
            test_size=0.15,
            stratify=train_set["region_variety"],
            random_state=self.random_seed,
        )

        val_set = train_set.iloc[val_indices]

        self.dataset = {"train": train_set, "val": val_set, "test": test_set}
        for split in self.dataset:
            features = self._convert_to_features(self.dataset[split])
            subset = datasets.Dataset.from_dict(features)
            subset.set_format(type="torch", columns=list(features.keys()))
            self.dataset[split] = subset

    def setup(self, stage: str):
        pass

    def train_dataloader(self):
        return DataLoader(
            self.dataset["train"],
            batch_size=self.train_batch_size,
            shuffle=True,
        )

    def val_dataloader(self):
        return DataLoader(self.dataset["val"], batch_size=self.eval_batch_size)

    def test_dataloader(self):
        return DataLoader(self.dataset["test"], batch_size=self.eval_batch_size)

    def _convert_to_features(self, examples):
        features = self.tokenizer.batch_encode_plus(
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
    print(dm.dataset["train"][0])
