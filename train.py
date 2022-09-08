import pytorch_lightning as pl
import torch

from src.data import WineDataModule
from src.model import WineBert

pl.seed_everything(42)

dm = WineDataModule()
model = WineBert()

checkpoint_callback = pl.callbacks.ModelCheckpoint(
    save_top_k=10,
    monitor="val_loss",
    mode="min",
    filename="ckpt-{epoch:02d}-{val_loss:.2f}-{val_accuracy:.4f}",
)

trainer = pl.Trainer(
    max_epochs=50,
    accelerator="auto",
    devices=1 if torch.cuda.is_available() else None,
    callbacks=[checkpoint_callback],
)
trainer.fit(model, datamodule=dm)
