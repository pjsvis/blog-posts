#!/usr/bin/env sh
# check-posts.sh — Validate front-matter on all posts
# Run: sh scripts/check-posts.sh

set -e

POSTS_DIR="_posts"
FOUND=0

if [ ! -d "$POSTS_DIR" ]; then
  echo "(no _posts/ directory — skipping)"
  exit 0
fi

for f in "$POSTS_DIR"/*.md; do
  [ -f "$f" ] || continue

  # Check: file starts with ---
  if ! head -1 "$f" | grep -q "^---"; then
    echo "MISSING front-matter: $f"
    FOUND=$((FOUND + 1))
    continue
  fi

  # Check: has title field (within first 10 lines)
  if ! grep -m1 "^title:" "$f" >/dev/null 2>&1; then
    echo "MISSING title: $f"
    FOUND=$((FOUND + 1))
  fi
done

if [ $FOUND -eq 0 ]; then
  echo "(all posts have valid front-matter)"
fi

exit $FOUND