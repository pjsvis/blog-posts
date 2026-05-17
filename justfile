# Blog Posts — Justfile

default: help

# Check front-matter, registries, and export pipeline
check:
  @echo "=== Front-matter validation ==="
  @for f in _posts/*.md; do \
    if ! grep -q "^---" "$$f" 2>/dev/null; then \
      echo "MISSING front-matter: $$f"; \
    fi; \
  done
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
preview:
  bundle install --quiet 2>/dev/null || bundle init
  bundle add github-pages webrick --quiet 2>/dev/null || true
  bundle exec jekyll serve --baseurl=""

# Build site (for local verification)
build:
  bundle exec jekyll build

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

help:
  @echo "Blog Posts — available commands:"
  @echo ""
  @echo "  Publishing:"
  @echo "  just check       — front-matter + registry sync"
  @echo "  just export      — export all posts to Substack/Medium/HN/Twitter"
  @echo "  just export-post — export single post"
  @echo "  just preview     — run Jekyll locally at localhost:4000"
  @echo "  just build       — build site locally"
  @echo "  just orient      — show current state"
  @echo "  just live        — open GitHub Pages site"
  @echo ""
  @echo "  Registries:"
  @echo "  just reg-sync        — check all registries for drift"
  @echo "  just reg-sync-fix    — regenerate registries from filesystem"
  @echo "  just reg-briefs      — list briefs"
  @echo "  just reg-debriefs    — list debriefs"
  @echo "  just reg-decisions   — list decisions"
  @echo "  just reg-playbooks   — list playbooks"