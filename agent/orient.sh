#!/bin/sh
#
# agent/concepts/orient.sh — Silo agent concepts orientation
#
# Run this to orient yourself to the concepts that define this silo.
# Each concept is a discrete thing — read one, decide if it's relevant.
#
# Usage:
#   ./orient.sh              — list all concepts
#   ./orient.sh silo         — read a specific concept
#   ./orient.sh all          — read all concepts in order
#   ./orient.sh triage       — read triage, tensegrity, conceptual-entropy (structural concepts)
#   ./orient.sh process      — read brief-debrief, agent-modes, justfile (process concepts)
#   ./orient.sh identity     — read edinburgh-protocol, onboarding, silo (identity concepts)
#

CONCEPTS_DIR="$(cd "$(dirname "$0")" && pwd)/concepts"

# Concepts in logical reading order
ALL_CONCEPTS="
silo
onboarding
agent-modes
edinburgh-protocol
triage
tensegrity
conceptual-entropy
visitor-book
brief-debrief
justfile
registry
"

# Grouped by category
TRIAGE_CONCEPTS="triage tensegrity conceptual-entropy"
PROCESS_CONCEPTS="brief-debrief agent-modes justfile registry"
IDENTITY_CONCEPTS="edinburgh-protocol onboarding silo visitor-book"

print_header() {
  printf '\n============================================================\n'
  printf '  Silo Agent Concepts — Orientation\n'
  printf '============================================================\n'
  printf '  Each concept is a discrete thing.\n'
  printf '  Read one. Decide if it applies. Move on.\n'
  printf '  Do not read all of them. Read the ones that matter.\n'
  printf '============================================================\n'
}

list_concepts() {
  print_header
  printf '\nAvailable concepts:\n\n'
  for concept in $ALL_CONCEPTS; do
    if [ -f "$CONCEPTS_DIR/$concept.md" ]; then
      # Get first line (title) from the concept file
      title=$(head -1 "$CONCEPTS_DIR/$concept.md" 2>/dev/null | sed 's/^# //')
      printf '  %-20s — %s\n' "$concept" "$title"
    fi
  done
  printf '\nQuick groups:\n'
  printf '  triage       — structural concepts (triage, tensegrity, entropy)\n'
  printf '  process      — process concepts (brief-debrief, modes, justfile, registry)\n'
  printf '  identity     — identity concepts (edinburgh, onboarding, silo, visitor-book)\n'
  printf '\nUsage: %s [concept-name | all | triage | process | identity]\n' "$(basename "$0")"
  printf '\n'
}

read_concept() {
  concept="$1"
  if [ -z "$concept" ]; then
    list_concepts
    return
  fi

  file="$CONCEPTS_DIR/$concept.md"
  if [ ! -f "$file" ]; then
    printf 'Concept not found: %s\n' "$concept" >&2
    printf 'Run %s to see available concepts.\n' "$(basename "$0")" >&2
    return 1
  fi

  printf '\n============================================================\n'
  printf '  Concept: %s\n' "$concept"
  printf '============================================================\n\n'
  cat "$file"
  printf '\n'
}

read_group() {
  group_name="$1"
  shift
  concepts="$*"
  printf '\n============================================================\n'
  printf '  %s\n' "$group_name"
  printf '============================================================\n'
  for concept in $concepts; do
    read_concept "$concept"
    printf '\n---\n\n'
  done
}

case "${1:-}" in
  "")
    list_concepts
    ;;
  silo|onboarding|agent-modes|edinburgh-protocol|triage|tensegrity|conceptual-entropy|visitor-book|brief-debrief|justfile|registry)
    read_concept "$1"
    ;;
  all)
    for concept in $ALL_CONCEPTS; do
      read_concept "$concept"
      printf '\n---\n\n'
    done
    ;;
  triage)
    read_group "Structural Concepts" $TRIAGE_CONCEPTS
    ;;
  process)
    read_group "Process Concepts" $PROCESS_CONCEPTS
    ;;
  identity)
    read_group "Identity Concepts" $IDENTITY_CONCEPTS
    ;;
  help|-h|--help)
    list_concepts
    ;;
  *)
    printf 'Unknown argument: %s\n' "$1" >&2
    printf 'Run %s for usage.\n' "$(basename "$0")" >&2
    exit 1
    ;;
esac