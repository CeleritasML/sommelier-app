import pytorch_lightning as pl
import torch

from src.data import WineDataModule
from src.model import WineBert

pl.seed_everything(42)

dm = WineDataModule()

model = WineBert()

trainer = pl.Trainer(
    max_epochs=3,
    accelerator="auto",
    devices=1 if torch.cuda.is_available() else None,
)
trainer.fit(model, datamodule=dm)
