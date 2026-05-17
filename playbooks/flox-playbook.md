# Flox Playbook

**Source:** [flox.dev/docs](https://flox.dev/docs) — official documentation
for Flox CLI, manifest format, and concepts.

---

## Purpose

Flox is the **environment delivery mechanism** for the silo. It guarantees
that every agent — Claude, GPT, Gemini, or human — gets the same toolchain
regardless of host OS or architecture. The `flox.toml` at the silo root is
the single source of truth for what tools are required, which are optional,
and how to install things nixpkgs doesn't carry.

Without Flox, a silo's reproducibility depends on README instructions that
drift. With Flox, the first command (`flox activate`) reproduces the environment.

---

## Prerequisites

- Flox installed: `brew install flox` (macOS), or see [flox.dev/docs/install-flox/install](https://flox.dev/docs/install-flox/install/)
- A `flox.toml` at the silo root
- For FloxHub sharing: `flox auth login`

---

## Core Workflow

### Initialise a Silo

```bash
cd blog-posts
flox init                     # Creates .flox/ directory
```

This generates `.flox/env/manifest.toml`, `.flox/env.lock`, and `.flox/env.json`.
The manifest declares packages, environment variables, and activation scripts.
The lock pins exact versions for reproducibility.

**Commit the `.flox/` directory** — this enables `git clone && flox activate`
zero-friction onboarding. See [flox.dev/docs/concepts/environments](https://flox.dev/docs/concepts/environments).

### Install Dependencies

```bash
flox install        # Installs all packages from manifest
```

### Activate the Environment

```bash
flox activate       # Enters a subshell with all tools on PATH
```

⚠️ **stdout pollution:** `flox activate` emits 3,244+ characters of `export`
statements to **stdout**, not stderr. Any script that captures stdout
(`$(flox activate)` or `$(flox run ...)`) will pollute its own output.

**Correct patterns — do not pollute stdout:**

```bash
# Interactive shell: use eval to apply without emitting to stdout
eval "$(flox activate 2>/dev/null)"

# Or via just for consistent tooling:
eval "$(just activate 2>/dev/null)"

# One-shot command without entering a subshell:
flox run -- just check
```

**Incorrect pattern — pollutes stdout:**

```bash
$(flox activate)           # Captures 3KB of export noise into the script's output
just activate              # Same problem if output is captured
```

Activation layers the environment over your existing shell — aliases, dotfiles,
and IDE config remain. It does not use containers.
See [flox.dev/docs/concepts/activation](https://flox.dev/docs/concepts/activation).

### Edit the Manifest

```bash
flox edit           # Opens $EDITOR, validates on save
```

For declarative changes, edit `flox.toml` directly and run `flox install`.

### Update Package Versions

```bash
flox update         # Refresh package resolutions in lockfile
```

Run periodically to pick up patches. The lockfile ensures deterministic builds.

---

## Key Patterns

### Pattern: Adding a New Tool

1. **Is it in nixpkgs?** `flox search <tool>` or browse [floxhub.dev/packages](https://floxhub.dev/packages)
   - If yes, add to `[install]` in `flox.toml`:
     ```toml
     [install]
     mytool.pkg-path = "mytool"
     ```
2. **Is it optional?** Mark so activation doesn't fail on unsupported systems:
   ```toml
   mytool.optional = true
   ```
3. **Not in nixpkgs?** Add to the "NOT in nixpkgs" section in `flox.toml`
   comments with install instructions. Install separately after `flox activate`.

### Pattern: Cross-Platform Manifests

```toml
[options]
systems = [
  "x86_64-linux",
  "aarch64-linux",
  "x86_64-darwin",
  "aarch64-darwin",
]
```

If a package is unavailable on a system, mark it optional. Gate tool usage
with `command -v <tool>` in scripts.

### Pattern: Activation Scripts

```toml
[profile]
common = '''
  if [ -f "$BUN_INSTALL/bun" ]; then
    [ -d "$BUN_INSTALL/bin" ] && export PATH="$BUN_INSTALL/bin:$PATH"
  fi
'''
```

Use for PATH adjustments, fzf setup, or per-session configuration.

### Pattern: Environment Variables

```toml
[vars]
BUN_INSTALL = "$HOME/.bun"
```

Exported on activation. Prefer this over `.env` files.

---

## blog-posts Toolchain

| Tool | Required | Purpose |
|------|----------|---------|
| `just` | YES | Task runner — `justfile` facade |
| `jq` | YES | JSON processing — reg-sync, reg-list |
| `watchexec` | YES | Watch mode for scripts |
| `gh` | YES | GitHub CLI — repo management |
| `glow` | YES | Markdown renderer — reading playbooks/docs |
| `gum` | YES | TUI prompts — interactive scripts |
| `ripgrep` | YES | Fast grep — barnacle scanning, content search |
| `fd` | YES | Fast find — script file discovery |
| `tree` | YES | Directory tree — `just orient` output |
| `bat` | no | Syntax-highlighted cat — reading files |
| `fzf` | no | Fuzzy finder — interactive selection |
| `bun` | no | Bun runtime — export scripts (install separately) |

---

## Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| `flox init` creates `.flox/` that conflicts | Running on already-initialised silo | Check for `.flox/env/manifest.toml` first |
| Package not found on target system | Package unavailable for that OS/arch | Mark `optional = true`, gate with `command -v` |
| Activation fails with build error | Nix derivation cache miss | Run `flox update` then `flox install`. Check [status.flox.dev](https://status.flox.dev) if persistent |
| `bun` not found after activation | Bun installed outside Flox | Ensure `BUN_INSTALL` in `[vars]`, PATH appended in `[profile]` |
| Very slow first activation | Nix downloading and building packages | First activation downloads everything. Subsequent activations use cache |

---

## Related

- `flox.toml` — Canonical manifest for this silo
- `playbooks/silo-playbook.md` — Silo structure and conventions
- `playbooks/just-playbook.md` (if exists) — justfile reference
- External: [flox.dev/docs](https://flox.dev/docs) — official documentation
- External: [floxhub.dev/packages](https://hub.flox.dev/packages) — package search