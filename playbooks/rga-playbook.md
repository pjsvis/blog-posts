# RGA Playbook — ripgrep-all Configuration & Operation

## What This Is

`ripgrep-all` (rga) extends `ripgrep` to search inside binary files: PDFs, Office documents, zip archives, SQLite databases, mailboxes, and more. This playbook documents the local configuration, adapter management, fzf integration, and troubleshooting.

## Installation

```bash
# macOS (preferred)
brew install ripgrep-all

# From source (Rust)
cargo install ripgrep-all
```

## Initialization

```bash
# First-time setup (creates config + cache dirs)
./scripts/rga-init.sh --install

# Status check (shows adapters, cache, suggested aliases)
./scripts/rga-init.sh
```

## Configuration

**Config file:** `~/.config/ripgrep-all/rga.json`

```json
{
  "cache": {
    "disabled": false,
    "path": "~/Library/Caches/ripgrep-all",
    "compression_level": 12,
    "max_blob_len": 2097152
  },
  "adapters": [
    "pandoc",
    "poppler",
    "zip",
    "decompress",
    "tar",
    "sqlite",
    "mail"
  ],
  "max_archive_recursion": 2,
  "no_prefix_filenames": false
}
```

| Field | Value | Rationale |
|-------|-------|-----------|
| `cache.disabled` | `false` | Caching makes repeated searches on the same files instant |
| `cache.compression_level` | `12` | Default ZSTD level; tradeoff between speed and disk usage |
| `cache.max_blob_len` | `2097152` (2 MiB) | Don't cache outputs larger than 2 MiB |
| `max_archive_recursion` | `2` | Search inside zips inside zips, but not deeper |
| `no_prefix_filenames` | `false` | Keep archive-internal paths visible in output |

## Adapters

### Default (always active)

| Adapter | Handles | Speed |
|---------|---------|-------|
| `pandoc` | .epub, .odt, .docx, .fb2, .ipynb, .html | Medium |
| `poppler` | .pdf | Fast |
| `zip` | .zip, .jar, .xpi | Fast |
| `decompress` | .gz, .bz2, .xz, .zst | Fast |
| `tar` | .tar | Fast |
| `sqlite` | .db, .sqlite, .sqlite3 | Fast |
| `ffmpeg` | .mp4, .mp3, .mkv, .avi | **Slow** |

### Disabled by default

| Adapter | Handles | Enable when |
|---------|---------|-------------|
| `mail` | .mbox, .eml, .mbx | Searching mail archives |

### Adapter Management

```bash
# Use ONLY specific adapters (prune everything else)
rga --rga-adapters=pandoc,poppler "pattern" .

# Add disabled adapters to defaults
rga --rga-adapters=+mail "pattern" ~/Mail

# Remove slow adapters from defaults
rga --rga-adapters=-ffmpeg "pattern" ~/Videos

# Fast code search — skip all binary adapters
rg --type-add="code:*.{rs,ts,js,py,go,rb}" -tcode "pattern"
```

### Adapter Selection Heuristics

| Workload | Adapters | Rationale |
|----------|----------|-----------|
| Code search | `rg` (no rga) | Binary adapters add zero value; pure ripgrep is fastest |
| Document corpus | `pandoc,poppler` | PDFs and Office docs only; skip video/audio |
| Archive excavation | `zip,decompress,tar` | Deep search in compressed bundles |
| Mail forensics | `+mail` | Add mail adapter to defaults |
| Full forensic | all defaults | Accept the speed penalty for completeness |

## fzf Integration

### Basic interactive search

```bash
# Find files matching pattern, then fzf preview
rga --files-with-matches "pattern" . | fzf --preview "rga --color=always --context 3 'pattern' {}"
```

### With config file

```bash
# Alias (add to .zshrc)
alias rga='rga --rga-config-file="$HOME/.config/ripgrep-all/rga.json"'

rgf() {
  local query="${1:-}"
  rga --files-with-matches "$query" | fzf --preview "rga --color=always --context 3 '$query' {}"
}
```

### Keybinding pattern for deep search

```bash
# Ctrl-R in terminal: search history (built-in)
# Alt-R: deep search in current directory with rga + fzf
bindkey -s '\er' 'rgf ""
'
```

## Cache Management

```bash
# Check cache size
alias rga-cache-size='du -sh ~/Library/Caches/ripgrep-all'

# Purge cache (force re-indexing)
alias rga-purge='rm -rf ~/Library/Caches/ripgrep-all/*'

# Cache location by platform
#   macOS:  ~/Library/Caches/ripgrep-all
#   Linux:  ~/.cache/ripgrep-all
#   Windows: %LOCALAPPDATA%\ripgrep-all
```

## Troubleshooting

### "No matches found" in PDFs

1. Check adapter is active: `rga --rga-list-adapters | grep poppler`
2. Check pdftotext is installed: `which pdftotext` (install via `brew install poppler`)
3. Try accurate mode: `rga --rga-accurate "pattern" file.pdf`

### Cache corruption

```bash
# Symptom: rga crashes or returns garbled text
rga-purge
rga "pattern" file.pdf  # rebuilds cache on first run
```

### Slow searches

1. Prune adapters: `rga --rga-adapters=-ffmpeg,-pandoc`
2. Disable accurate mode (uses magic bytes instead of file extensions)
3. Reduce recursion: `--rga-max-archive-recursion=1`
4. Check cache is enabled: `rga --rga-config-file=... --rga-list-adapters` (shows cache status)

### Config not loading

rga does **not** read config from environment variables. Always pass the file explicitly:

```bash
rga --rga-config-file="$HOME/.config/ripgrep-all/rga.json" "pattern" .
```

Or use the shell alias defined in `rga-init.sh`.

## Determinism Checklist

- [ ] Same config file on every machine (`rga.json` under version control or dotfiles)
- [ ] Same adapter set for same workload type
- [ ] Cache path platform-aware (macOS vs Linux)
- [ ] fzf preview uses same `--rga-config-file` as main search

## Related

- `scripts/rga-init.sh` — deployment and setup script
- `~/.config/ripgrep-all/rga.json` — local configuration
- [ripgrep-all repository](https://github.com/phiresky/ripgrep-all)
