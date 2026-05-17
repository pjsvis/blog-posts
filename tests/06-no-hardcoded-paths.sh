#!/usr/bin/env bash
# Test: No hardcoded user paths in tracked files
# Run: bash tests/06-no-hardcoded-paths.sh

set -euo pipefail

# Check for hardcoded /Users/ or /home/ paths in tracked source files
# Exclude .flox/ (generated paths from nix store) and .git/
HARDCODED=$(git ls-files | \
  grep -vE "^(\.flox/|_site/|_exported/)" | \
  xargs grep -l "/Users/petersmith/\|/Users/[a-zA-Z]+/" 2>/dev/null || true)

if [ -n "$HARDCODED" ]; then
  echo "FAIL: hardcoded user paths found in:"
  echo "$HARDCODED"
  exit 1
fi

echo "PASS: no hardcoded paths — codebase is relocatable"
exit 0