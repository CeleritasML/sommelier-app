import pytorch_lightning as pl
import torch
from torchmetrics import Accuracy
from transformers import (
    AdamW,
    AutoModelForSequenceClassification,
    AutoConfig,
    get_linear_schedule_with_warmup,
)


class WineBert(pl.LightningModule):
    def __init__(
        self,
        model_name: str = "google/bert_uncased_L-4_H-256_A-4",
        num_classes: int = 584,
        learning_rate: float = 1e-4,
        adam_epsilon: float = 1e-8,
        warmup_steps: int = 1000,
        weight_decay: float = 0.0,
        train_batch_size: int = 256,
        val_batch_size: int = 256,
        **kwargs,
    ):
        super().__init__()
        self.save_hyperparameters()
        self.config = AutoConfig.from_pretrained(model_name, num_labels=num_classes)
        self.model = AutoModelForSequenceClassification.from_pretrained(
            model_name, config=self.config
        )

    def forward(self, **inputs):
        return self.model(**inputs)

    def _compute_accuracy(self, outputs):
        logits = torch.cat([x["logits"] for x in outputs]).detach().cpu()
        labels = torch.cat([x["labels"] for x in outputs]).detach().cpu()
        metric = Accuracy(top_k=5)
        return metric(logits, labels)

    def training_step(self, batch, batch_idx):
        outputs = self(**batch)
        loss, logits = outputs[:2]
        self.log("train_loss", loss, prog_bar=True)
        return {"loss": loss, "logits": logits, "labels": batch["labels"]}

    def training_epoch_end(self, outputs):
        train_accuracy = self._compute_accuracy(outputs)
        self.log("train_accuracy", train_accuracy)

    def validation_step(self, batch, batch_idx):
        outputs = self(**batch)
        val_loss, logits = outputs[:2]
        self.log("val_loss", val_loss, prog_bar=True)
        return {"loss": val_loss, "logits": logits, "labels": batch["labels"]}

    def validation_epoch_end(self, outputs):
        val_accuracy = self._compute_accuracy(outputs)
        self.log("val_accuracy", val_accuracy)

    def test_step(self, batch, batch_idx):
        outputs = self(**batch)
        return {"logits": outputs[1], "labels": batch["labels"]}

    def test_epoch_end(self, outputs):
        test_accuracy = self._compute_accuracy(outputs)
        self.log("test_accuracy", test_accuracy)

    def configure_optimizers(self):
        model = self.model
        no_decay = ["bias", "LayerNorm.weight"]
        optimizer_grouped_parameters = [
            {
                "params": [
                    p
                    for n, p in model.named_parameters()
                    if not any(nd in n for nd in no_decay)
                ],
                "weight_decay": self.hparams.weight_decay,
            },
            {
                "params": [
                    p
                    for n, p in model.named_parameters()
                    if any(nd in n for nd in no_decay)
                ],
                "weight_decay": 0.0,
            },
        ]
        optimizer = AdamW(
            optimizer_grouped_parameters,
            lr=self.hparams.learning_rate,
            eps=self.hparams.adam_epsilon,
        )
        scheduler = get_linear_schedule_with_warmup(
            optimizer,
            num_warmup_steps=self.hparams.warmup_steps,
            num_training_steps=self.trainer.estimated_stepping_batches,
        )
        scheduler = {"scheduler": scheduler, "interval": "step"}
        return [optimizer], [scheduler]
