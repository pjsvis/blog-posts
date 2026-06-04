#!/usr/bin/env bash
#
# rga-init.sh — Initialize ripgrep-all configuration and environment
#
# Usage:
#   ./scripts/rga-init.sh           # Show status and suggested aliases
#   ./scripts/rga-init.sh --install # Overwrite config file
#
# Sets up:
#   - Cache directory (platform-aware)
#   - Config file at ~/.config/ripgrep-all/rga.json
#   - Shell aliases for common rga + fzf workflows

set -euo pipefail

RGA_VERSION="0.10.10"
CONFIG_DIR="${HOME}/.config/ripgrep-all"

# Platform-aware cache directory
case "$(uname -s)" in
  Linux*)   CACHE_DIR="${XDG_CACHE_HOME:-$HOME/.cache}/ripgrep-all" ;;
  Darwin*)  CACHE_DIR="${HOME}/Library/Caches/ripgrep-all" ;;
  CYGWIN*|MINGW*|MSYS*)
    CACHE_DIR="${LOCALAPPDATA:-$HOME/AppData/Local}/ripgrep-all" ;;
  *)        CACHE_DIR="${HOME}/.cache/ripgrep-all" ;;
esac

CONFIG_FILE="${CONFIG_DIR}/rga.json"

echo "=== rga-init v${RGA_VERSION} ==="
echo ""

# Create directories
mkdir -p "${CONFIG_DIR}"
mkdir -p "${CACHE_DIR}"
echo "Cache dir:  ${CACHE_DIR}"
echo "Config dir: ${CONFIG_DIR}"

# Write config file if missing or --install forced
if [[ ! -f "${CONFIG_FILE}" ]] || [[ "${1:-}" == "--install" ]]; then
  cat > "${CONFIG_FILE}" <<JSON
{
  "cache": {
    "disabled": false,
    "path": "${CACHE_DIR}",
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
JSON
  echo "Wrote config: ${CONFIG_FILE}"
else
  echo "Config exists (use --install to overwrite): ${CONFIG_FILE}"
fi

# Verify rga is available
if ! command -v rga >/dev/null 2>&1; then
  echo ""
  echo "WARNING: rga not found in PATH. Install via:"
  echo "  brew install ripgrep-all    # macOS"
  echo "  cargo install ripgrep-all   # Rust"
  exit 1
fi

echo ""
echo "rga found: $(rga --version)"
echo ""
echo "=== Active Adapters ==="
rga --rga-config-file="${CONFIG_FILE}" --rga-list-adapters

echo ""
echo "=== Cache Status ==="
if [[ -f "${CACHE_DIR}/cache.sqlite3" ]]; then
  ls -lh "${CACHE_DIR}"/cache.sqlite3*
else
  echo "Cache empty (will be created on first search)"
fi

echo ""
echo "=== Recommended Aliases (add to .zshrc / .bashrc) ==="
cat <<ALIASES

# rga with config (deep search in PDFs, archives, Office docs)
alias rga='rga --rga-config-file="${CONFIG_FILE}"'

# rga + fzf: find files, then interactive preview
rgf() {
  local query="\${1:-}"
  rga --rga-config-file="${CONFIG_FILE}" --files-with-matches "\$query" | fzf --preview "rga --rga-config-file=${CONFIG_FILE} --color=always --context 3 \$query {}"
}

# Fast code search (no binary adapters — pure ripgrep speed)
alias rgc='rg --type-add="code:*.{rs,ts,js,py,go,rb,java,c,cpp,h}" -tcode'

# Purge rga cache
alias rga-purge='rm -rf "${CACHE_DIR}"/*'

# Cache size check
alias rga-cache-size='du -sh "${CACHE_DIR}"'
ALIASES

echo ""
echo "=== Quick Test ==="
echo "rga --rga-config-file=\"${CONFIG_FILE}\" \"pattern\" ~/Documents"
