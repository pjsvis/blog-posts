# Blog Posts — Justfile

default: help

# Check front-matter and export pipeline
check:
  @echo "=== Front-matter validation ==="
  @for f in _posts/*.md; do \
    if ! grep -q "^---" "$$f" 2>/dev/null; then \
      echo "MISSING front-matter: $$f"; \
    fi; \
  done
  @echo "=== Export pipeline check ==="
  @bun run scripts/export-all.ts --dry-run 2>/dev/null || echo "(export-all.ts: add --dry-run to enable)"
  @echo "Check complete."

# Export all posts to distribution channels
export:
  bun run scripts/export-all.ts

# Export a single post (usage: just export-post my-slug)
export-post slug:
  bun run scripts/export-all.ts --post={{slug}}

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

help:
  @echo "Blog Posts — available commands:"
  @echo "  just check       — validate front-matter and export pipeline"
  @echo "  just export      — export all posts to Substack/Medium/HN/Twitter"
  @echo "  just export-post — export single post (usage: just export-post slug)"
  @echo "  just preview     — run Jekyll locally at localhost:4000"
  @echo "  just build       — build site locally"
  @echo "  just orient      — show current state"
  @echo "  just live        — open GitHub Pages site"