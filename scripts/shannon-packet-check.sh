#!/usr/bin/env bash
# shannon-packet-check.sh — Run Shannon Packet checks on a post (or all posts)
#
# Usage:
#   ./scripts/shannon-packet-check.sh <post.md>     # one file
#   ./scripts/shannon-packet-check.sh --all         # all _posts/*.md + _drafts/*.md (archive excluded)
#
# Four invariants checked per file:
#   1. PARITY     — TL;DR heading present (Shannon Packet core format)
#   2. SEMANTIC   — no unresolved [[link pending: ...]] markers
#   3. LINK       — '## Links' section present + local-path targets resolve
#   4. WATT       — TL;DR within 200 words, no throat-clearing boilerplate
#
# Front-matter validation is a Jekyll concern handled separately (check-posts.sh).
# This script is the Shannon Packet content-format layer.
#
# Exit codes:
#   0 — every file passes all four checks (CHANNEL CLEAN)
#   1 — at least one file fails any check  (NOISY)

set -e

TLDR_MAX_WORDS=200
THROAT_RX='In this (post|article)|Let me begin|Let.s begin|Buckle up|Without further ado|Bear with me'

usage() {
  echo "Usage: $0 <post.md>|--all" >&2
  exit 2
}

if [[ $# -ne 1 ]]; then
  usage
fi

case "$1" in
  --all)
    FILES=$(find _posts _drafts -name "*.md" -not -path "*/archive/*" 2>/dev/null | sort)
    ;;
  -*) usage ;;
  *)
    if [[ ! -f "$1" ]]; then
      echo "no such file: $1" >&2
      exit 2
    fi
    FILES="$1"
    ;;
esac

clean=0
noisy=0

for f in $FILES; do
  fails=()

  # PARITY — Shannon Packet core format
  if ! grep -qE "^## TL;DR" "$f"; then
    fails+=("PARITY: missing '## TL;DR' heading (Shannon Packet core format)")
  fi
  if ! grep -qE "^## (Links|Bibliography|Narrativised)" "$f"; then
    fails+=("PARITY: missing Links or Bibliography conspectus heading (TL;DR + Bibliography is the canonical triangle)")
  fi

  # SEMANTIC
  if grep -nE '\[\[link pending:' "$f" >/dev/null 2>&1; then
    fails+=("SEMANTIC: unresolved link-pending markers remain")
  fi

  # LINK RESOLUTION — only under '## Links' heading, skip http(s) URLs + link-pending
  in_links=0
  in_links_section_seen=0
  while IFS= read -r line; do
    if [[ "$line" =~ ^##[[:space:]]+Links ]]; then
      in_links=1
      in_links_section_seen=1
      continue
    fi
    if [[ "$in_links" -eq 1 ]] && [[ "$line" =~ ^##[[:space:]] ]]; then
      in_links=0
    fi
    if [[ "$in_links" -eq 1 ]] && [[ "$line" =~ ^\[([^]]+)\]:[[:space:]]*(.*)$ ]]; then
      slug="${BASH_REMATCH[1]}"
      target="${BASH_REMATCH[2]}"
      [[ "$target" =~ ^https?:// ]] && continue
      [[ "$target" =~ link-pending ]] && continue
      if [[ ! -e "$target" ]]; then
        fails+=("LINK: $slug -> $target does not resolve")
      fi
    fi
  done < "$f"
  if [[ "$in_links_section_seen" -eq 0 ]]; then
    fails+=("LINK: '## Links' section not found (slugs won't resolve)")
  fi

  # WATT — TL;DR word count + throat-clearing
  tldr=""
  in_tldr=0
  while IFS= read -r line; do
    if [[ "$in_tldr" -eq 0 ]] && [[ "$line" =~ ^##[[:space:]]+TL\.DR ]]; then
      in_tldr=1; continue
    fi
    if [[ "$in_tldr" -eq 1 ]] && [[ "$line" =~ ^##[[:space:]] ]]; then break; fi
    if [[ "$in_tldr" -eq 1 ]]; then tldr+="$line"$'\n'; fi
  done < "$f"

  tldr_words=$(printf '%s' "$tldr" | wc -w)
  if [[ "$tldr_words" -gt "$TLDR_MAX_WORDS" ]]; then
    fails+=("WATT: TL;DR has $tldr_words words (>$TLDR_MAX_WORDS)")
  fi
  if printf '%s' "$tldr" | grep -Eq "$THROAT_RX"; then
    fails+=("WATT: throat-clearing detected in TL;DR")
  fi

  # Report
  if [[ ${#fails[@]} -eq 0 ]]; then
    printf '%-72s CHANNEL CLEAN\n' "$f"
    clean=$((clean+1))
  else
    printf '%-72s NOISY\n' "$f"
    for fail in "${fails[@]}"; do
      printf '   - %s\n' "$fail"
    done
    noisy=$((noisy+1))
  fi
done

echo ""
echo "=== Summary ==="
echo "Clean: $clean"
echo "Noisy: $noisy"

[[ "$noisy" -eq 0 ]]
