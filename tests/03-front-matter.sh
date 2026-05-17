#!/usr/bin/env bash
# Test: All posts and drafts have valid front-matter
# Run: bash tests/03-front-matter.sh

set -euo pipefail

FAILURES=""

check_file() {
  local file="$1"
  local dir="$2"

  if [ ! -f "$file" ]; then
    return 0  # Skip non-existent files
  fi

  # Check: file starts with ---
  if ! head -1 "$file" | grep -q "^---"; then
    FAILURES="${FAILURES}missing-front-matter-delimiter:${file}\n"
    return
  fi

  # Check: has layout field
  if ! grep -A5 "^---" "$file" | grep -q "^layout:"; then
    FAILURES="${FAILURES}missing-layout:${file}\n"
    return
  fi

  # Check: has title field
  if ! grep -A10 "^---" "$file" | grep -q "^title:"; then
    FAILURES="${FAILURES}missing-title:${file}\n"
    return
  fi

  # Check: has date field
  if ! grep -A15 "^---" "$file" | grep -q "^date:"; then
    FAILURES="${FAILURES}missing-date:${file}\n"
    return
  fi
}

# Check posts
for f in _posts/*.md; do
  check_file "$f" "_posts"
done

# Check drafts (exclude README.md and other non-posts)
for f in _drafts/*.md; do
  basename=$(basename "$f")
  if [ "$basename" = "README.md" ] || [ "$basename" = "blog-playbook.md" ]; then
    continue
  fi
  check_file "$f" "_drafts"
done

if [ -n "$FAILURES" ]; then
  echo "FAIL: front-matter issues found:"
  echo -e "$FAILURES"
  exit 1
fi

echo "PASS: front-matter — all posts and drafts valid"
exit 0