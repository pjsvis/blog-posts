# blog-posts

Writing on systems, AI, and empirical pragmatism.

## Quick Start

```bash
# Preview locally
just preview

# Check all posts have valid front-matter
just check

# Export posts to Substack/Medium/HN/Twitter formats
just export

# Open live site
just live
```

## Structure

```
_posts/    → Published long-form content
_drafts/   → Works in progress
briefs/    → Internal: post briefs and planning
debriefs/  → Internal: retrospective documents
decisions/ → Internal: architectural decisions (ADRs)
playbooks/ → Internal: operational playbooks
assets/    → Static CSS and media
scripts/   → Export automation (Bun/TypeScript)
_exported/ → Platform-specific output (generated)
```

## Publishing Flow

1. **Draft** in `_drafts/` → write content with draft front-matter
2. **Brief** → create `briefs/brief-[topic]-[date].md` before starting
3. **Review** → `just check` validates front-matter
4. **Move** → `_drafts/` → `_posts/YYYY-MM-DD-slug.md`
5. **Commit** → push to `main` → GitHub Pages auto-deploys
6. **Export** → `just export` → `_exported/` → distribute manually

## CI/CD

GitHub Actions builds and deploys to `pjsvis.github.io/blog-posts` on every push to `main`.

Branch → `main` = live. No staging environment.

## Multi-Platform Distribution

See `playbooks/export-playbook.md` for the full distribution matrix.

| Platform | Source | Method |
|----------|--------|--------|
| GitHub Pages | `_posts/` → Jekyll | Auto via GitHub Actions |
| Substack | `_exported/substack/` | Copy-paste body |
| Medium | `_exported/medium/` | Copy-paste HTML |
| Hacker News | `_exported/hn/` | Text submission |
| Twitter/X | `_exported/twitter/` | Thread paste |