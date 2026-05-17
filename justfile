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

# Introduction to the blog-posts workflow
help:
  @echo "=== How to write and publish a post ==="
  @echo ""
  @echo "  1. Write a brief (plan what you're going to write)"
  @echo "     → create briefs/brief-[topic]-[date].md"
  @echo "     → see playbooks/briefs-playbook.md"
  @echo ""
  @echo "  2. Draft in _drafts/ (kept private until done)"
  @echo ""
  @echo "  3. Move to _posts/YYYY-MM-DD-slug.md when ready"
  @echo "     → add front-matter (title, date, categories, canonical_target)"
  @echo ""
  @echo "  4. Run just check (validates front-matter + registry sync)"
  @echo ""
  @echo "  5. Commit and push to main"
  @echo "     → GitHub Actions auto-deploys to GitHub Pages"
  @echo ""
  @echo "  6. Run just export (generates _exported/)"
  @echo "     → _exported/medium/   → paste into Medium"
  @echo "     → _exported/substack/ → paste into Substack"
  @echo "     → _exported/hn/       → post to Hacker News"
  @echo "     → _exported/twitter/  → paste as Twitter thread"
  @echo ""
  @echo "  7. Write a debrief (what went well, what didn't)"
  @echo "     → create debriefs/YYYY-MM-DD-topic.md"
  @echo "     → see playbooks/debriefs-playbook.md"
  @echo ""
  @echo "=== Key just commands ==="
  @echo ""
  @echo "  just help          — this guide"
  @echo "  just info          — project rationale and origin"
  @echo "  just orient        — current state (branch, status, posts)"
  @echo "  just check         — pre-commit validation"
  @echo "  just preview       — local Jekyll preview at localhost:4000"
  @echo "  just export        — export all posts to distribution channels"
  @echo "  just live          — open the live GitHub Pages site"
  @echo ""
  @echo "  just reg-sync      — check all registries for drift"
  @echo "  just reg-briefs    — list all briefs"
  @echo "  just reg-playbooks — list all playbooks"
  @echo ""
  @echo "See playbooks/blog-posts-playbook.md for the full pipeline reference."

# Project rationale and origin
info:
  @echo "=== blog-posts — rationale and origin ==="
  @echo ""
  @echo "  Purpose: Write and publish long-form content on systems, AI,"
  @echo "  and empirical pragmatism — distributed across multiple platforms"
  @echo "  (GitHub Pages, Substack, Medium, Hacker News, Twitter)."
  @echo ""
  @echo "  Pipeline: Jekyll + GitHub Pages as the single source of truth."
  @echo "  Posts live in _posts/ as raw Markdown with YAML front-matter."
  @echo "  GitHub Actions builds and deploys to pjsvis.github.io/blog-posts"
  @echo "  on every push to main. Export scripts generate platform-specific"
  @echo "  output for manual distribution to Substack, Medium, HN, Twitter."
  @echo ""
  @echo "  Origin: This repo started as a clean slate for a writing-focused"
  @echo "  workflow — separate from the code-heavy tradingagents repo."
  @echo "  The process conventions (briefs, debriefs, ADRs, barnacle removal)"
  @echo "  are adapted from that project but stripped of all trading-specific"
  @echo "  context. The registry system (INDEX.jsonl files, reg-sync, reg-list)"
  @echo "  comes from the same origin, simplified for a content workflow."
  @echo ""
  @echo "  Key constraints:"
  @echo "  - Jekyll underscore directories (_posts/, _drafts/, _layouts/)"
  @echo "    must not be renamed — Jekyll hard-codes these"
  @echo "  - Every post needs front-matter before it can be published"
  @echo "  - Export output (_exported/) must be reviewed before distributing"
  @echo "  - Registries (INDEX.jsonl files) must stay in sync with the filesystem"
  @echo ""
  @echo "  See playbooks/export-playbook.md for the full distribution matrix" 
  @echo "  and playbooks/barnacle-playbook.md for the misdirection-detection process."