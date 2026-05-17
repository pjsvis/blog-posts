# Blog Posts — Justfile

default: help

# Activate Flox environment (silently — no stdout pollution)
# Usage: eval "$(just activate)"  to apply it to the current shell.
# Without eval, just spawns a subshell that is discarded on exit.
activate:
  @printf '%s' 'eval "$(flox activate 2>/dev/null)"'

# Check front-matter, registries, and export pipeline
check:
  @echo "=== Front-matter validation ==="
  @if [ -n "$(ls _posts/*.md 2>/dev/null)" ]; then \
    for f in _posts/*.md; do \
      if ! grep -q "^---" "$$f" 2>/dev/null; then \
        echo "MISSING front-matter: $$f"; \
      fi; \
    done; \
  else \
    echo "(no posts to validate — _posts/ is empty)"; \
  fi
  @echo "=== Registry sync ==="
  @bun scripts/reg-sync.ts --all || true
  @echo "Check complete."

# Export all posts to distribution channels
export:
  bun scripts/export-all.ts

# Export a single post (usage: just export-post my-slug)
export-post slug:
  bun scripts/export-all.ts --post={{slug}}

# Preview Jekyll site locally
# Guards: validates flox Ruby env before running. Escalates with clear error on failure.
preview:
  @. scripts/env-guard.sh 2>/dev/null; require_ruby_env || exit 1
  @flox activate -c "bundle install --quiet 2>/dev/null || bundle init" 2>/dev/null
  @flox activate -c "bundle add github-pages webrick --quiet 2>/dev/null || true" 2>/dev/null
  @flox activate -c "bundle exec jekyll serve --baseurl=''"

# Build site (for local verification)
# Guards: validates flox Ruby env before running. Escalates with clear error on failure.
build:
  @. scripts/env-guard.sh 2>/dev/null; require_ruby_env || exit 1
  @flox activate -c "bundle install --quiet 2>/dev/null || bundle init" 2>/dev/null
  @flox activate -c "bundle exec jekyll build"

# Orient: show current state
orient:
  @echo "=== Branch ===" && git branch --show-current
  @echo "=== Git status ===" && git status --short
  @echo "=== Last commit ===" && git log -1 --oneline 2>/dev/null || echo "(no commits)"
  @echo "=== Posts ===" && ls _posts/*.md 2>/dev/null | wc -l | xargs echo "Count:"
  @echo "=== Drafts ===" && ls _drafts/*.md 2>/dev/null | wc -l | xargs echo "Count:"

# Open GitHub Pages in browser
live:
  open "https://pjsvis.github.io/blog-posts"

# Registry commands
reg-sync:
  bun scripts/reg-sync.ts --all

reg-sync-fix:
  bun scripts/reg-sync.ts --all --fix

reg-list:
  @echo "Available: briefs | debriefs | decisions | playbooks"
  @echo "Usage: bun scripts/reg-list.ts <registry>"

reg-briefs:
  bun scripts/reg-list.ts briefs

reg-debriefs:
  bun scripts/reg-list.ts debriefs

reg-decisions:
  bun scripts/reg-list.ts decisions

reg-playbooks:
  bun scripts/reg-list.ts playbooks

# How to use the just system
help:
  @echo "=== blog-posts justfile ==="
  @echo ""
  @echo "  just --list      — see all available recipes"
  @echo ""
  @echo "  Entry points:"
  @echo "  just activate  — emit flox activation command (use with eval)"
  @echo "  just orient    — current state: branch, status, post count"
  @echo "  just check     — pre-commit validation: front-matter + registry sync"
  @echo "  just help      — this guide"
  @echo "  just info      — project rationale and key constraints"
  @echo ""
  @echo "  Publishing:"
  @echo "  just preview   — local Jekyll preview"
  @echo "  just build     — build site locally"
  @echo "  just export    — generate _exported/ (medium, substack, hn, twitter)"
  @echo "  just live      — open live site"
  @echo ""
  @echo "  Registries:"
  @echo "  just reg-sync        — check filesystem vs index drift"
  @echo "  just reg-briefs      — list briefs"
  @echo "  just reg-debriefs    — list debriefs"
  @echo "  just reg-decisions   — list decisions"
  @echo "  just reg-playbooks   — list playbooks"
  @echo ""
  @echo "  Ask the agent for details on any workflow or playbook."

# Project rationale and constraints
info:
  @echo "=== blog-posts — what this silo is ==="
  @echo ""
  @echo "  Jekyll + GitHub Pages as the single source of truth."
  @echo "  Raw Markdown in _posts/ with front-matter. GitHub Actions deploys"
  @echo "  on every push to main. Export scripts generate platform-specific"
  @echo "  output (Substack, Medium, HN, Twitter) from _posts/."
  @echo ""
  @echo "  Adapted from tradingagents: briefs/debriefs/ADR process, registry"
  @echo "  system (INDEX.jsonl, reg-sync, reg-list), barnacle removal. Stripped"
  @echo "  of all trading-specific context."
  @echo ""
  @echo "  Key constraints (do not break):"
  @echo "  - _posts/, _drafts/, _layouts/ — Jekyll hard-codes these"
  @echo "  - Every _posts/ file needs front-matter (layout, title, date)"
  @echo "  - Review _exported/ before distributing to any platform"
  @echo "  - Registries (INDEX.jsonl) must stay in sync with filesystem"
  @echo ""
  @echo "  Run just --list to see all recipes."