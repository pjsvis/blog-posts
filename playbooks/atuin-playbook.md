# Atuin Shell Memory & Copilot Playbook



## Purpose

Standardize the installation, configuration, and operational use of Atuin as a machine-level telemetry and interactive copilot layer without encroaching on repository-level task orchestration (`just`).

---

## Context & Prerequisites

* **Environment:** macOS or Linux workstation with interactive shell (`bash`, `zsh`, `fish`, or `nushell`).


* **Prerequisites:** Rust toolchain or `curl` access for binary installation.


* **Boundary Context:**
* Project/Repo operations belong in repo `Justfile`s.


* Ad-hoc command history, prompt AI, and multi-machine sync belong in `atuin`.





---

## The Protocol (The "How-To")

### Step 1: Install Atuin

Install the binary via the official script or package manager:

```bash
curl --proto '=https' --tlsv1.2 -LsSf https://setup.atuin.sh | sh

```

*Constraint:* If installing via Snap or package managers, verify shell plugin hooks are explicitly linked to your profile.

### Step 2: Initialize Shell Integration

Append the shell initialization hook to your interactive shell runtime configuration (e.g., `~/.zshrc` or `~/.bashrc`):

```bash
# For Zsh
echo 'eval "$(atuin init zsh)"' >> ~/.zshrc

# For Bash
echo 'eval "$(atuin init bash)"' >> ~/.bashrc

```

*Constraint:* Import existing flat history once during setup: `atuin import auto`.

### Step 3: Configure AI Capabilities and Search Modes

Edit or create `~/.config/atuin/config.toml` to enforce search filters and enable prompt-level AI:

```toml
# ~/.config/atuin/config.toml
search_mode = "fuzzy"
filter_mode = "global"
secrets_filter = true
secrets_filter_patterns = ["API", "KEY", "TOKEN", "SECRET", "PASSWORD"]

[ai]
enabled = true
session_continue_minutes = 60

[ai.capabilities]
enable_history_search = true
enable_history_output = true
enable_file_tools = true

```

### Step 4: Search & Copilot Operation

1. **Interactive Search:** Press `Ctrl+r` to fuzzy-search prior invocations across directory, session, or global scopes.


2. **Inline Copilot Mode:** Hit `?` on an empty prompt line to formulate natural-language CLI queries.


* Press `Tab` to drop generated commands into the buffer for inspection.


* Press `f` to ask follow-up questions within the active session.




3. **Audit Machine Activity:** Filter command history by path or agent author:


```bash
# Filter successful runs in current workspace
atuin search --cwd . --exit 0

```



---

## Standards & Patterns

* **Separation of Concerns:** Never script repeatable silo workflows into Atuin aliases. If a workflow involves >2 steps and is shared across team members, codify it into a repository `Justfile` recipe.


* **Harvesting Protocol:** Use Atuin history to identify ad-hoc commands that should be stabilized and moved to a repo's `just` interface:


```bash
atuin history list --cwd . --exit 0 --limit 15

```


* **Secret Hygiene:** Ensure `secrets_filter = true` remains active in `config.toml` to avoid persisting credentials to the SQLite history store.



---

## Validation (How do I know I'm done?)

* Pressing `Ctrl+r` launches the interactive Atuin terminal interface.


* Typing `?` on an empty line opens the `atuin ai` interactive query prompt.


* Executing `atuin history list --limit 1` returns the most recently run terminal command with recorded exit status and duration.