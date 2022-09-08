import argparse
import pytorch_lightning as pl
import torch

from src.data import WineDataModule
from src.model import WineBert


pl.seed_everything(42)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--ckpt_path", type=str, required=True)
    args = parser.parse_args()
    dm = WineDataModule()
    model = WineBert.load_from_checkpoint(args.ckpt_path)

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
    trainer.test(model, datamodule=dm)
