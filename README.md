# Sommerlier Web App

# Env Setup

```
# Install Rust (if you're using M1 chip)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"

# Install Python Dependencies
poetry install

# Setup git pre-commit
brew install pre-commit
pre-commit install
```

# Activate Virtual Env

```
poetry shell
```

# Train Model

```
# run this command in poetry env
python train.py
```