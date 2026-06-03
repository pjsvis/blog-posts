# Export Playbook — Multi-Platform Content Distribution

## Overview

Jekyll is the single source of truth. All content lives in `_posts/` (published) or `_drafts/` (in-progress). Export scripts transform raw Markdown into platform-optimized formats for Substack, Medium, Hacker News, and Twitter/X.

---

## Export Pipeline

```
_posts/           ← Raw Markdown (front-matter + body)
     │
     ▼ scripts/export-all.ts
     │
     ├─► _exported/medium/    ← HTML, title tag, stripped metadata
     ├─► _exported/substack/  ← Raw Markdown, footnotes intact
     ├─► _exported/hn/        ← Text block + GitHub Pages link
     └─► _exported/twitter/   ← Chunked thread segments (~280 chars)
```

---

## Workflow

### 1. Write and publish locally

Draft in `_drafts/`. When ready to publish:
1. Move file to `_posts/YYYY-MM-DD-slug.md`
2. Add front-matter (see blog-posts-playbook.md)
3. Set `canonical_target` to list platforms
4. Run `just check` (validates front-matter structure)
5. Commit and push to `main`
6. GitHub Actions deploys to `pjsvis.github.io/blog-posts`

### 2. Export to distribution channels

```bash
# Export all posts
bun run scripts/export-all.ts

# Export a specific post
bun run scripts/export-all.ts --post=my-slug

# Review exports
ls _exported/medium/
ls _exported/substack/
```

### 3. Manual distribution

**Substack:**
- Copy `_exported/substack/YYYY-MM-DD-slug.md` body text
- Paste into Substack editor (rich text mode)
- Add title from front-matter manually
- Publish

**Medium:**
- Copy `_exported/medium/YYYY-MM-DD-slug.html` content
- Paste into Medium editor (switch to HTML view or use browser devtools)
- Or: import from URL → GitHub Pages live URL

**Hacker News:**
- Copy `_exported/hn/YYYY-MM-DD-slug.md`
- Post as a text submission with link to GitHub Pages version

**Twitter/X:**
- Copy `_exported/twitter/YYYY-MM-DD-slug.md`
- Paste thread segments into X composer
- Use 1/N, 2/N notation

---

## Importing Existing Posts

If you've published on Substack or Medium and want to bring the content back into Jekyll:

```bash
# Fetch content using defuddle
defuddle https://yourblog.substack.com/p/slug

# Import to _posts/
bun run scripts/scrape-and-export.ts --url https://yourblog.substack.com/p/slug --platform substack
```

---

## Front-Matter for Platform Routing

```yaml
---
layout: post
title: "Your Post Title"
date: 2026-05-17T12:00:00 +0000
categories: [ai, systems]
canonical_target: [substack, medium]
---
```

| Field | Purpose |
|-------|---------|
| `canonical_target` | List of platforms to export to. If omitted, exports to all. |
| `categories` | Taxonomic grouping (not platform-specific) |
| `tags` | Semantic tags for search and classification |

---

## Platform-Specific Notes

### Substack
- Supports Markdown natively
- Footnotes (`[^1]`) render correctly
- Code blocks preserve syntax highlighting
- Best to paste raw body from `_exported/substack/`

### Medium
- Favors HTML, not Markdown
- Headings, bold, links, code, blockquotes, images all render from HTML
- Images are hosted on GitHub Pages and referenced by absolute URL in post markdown
- The export script passes absolute URLs through untouched and converts them to `<img>` tags
- Referenced images are also downloaded to `_exported/medium/images/` as a convenience bundle
- Or: publish directly on Medium and import URL back into `_posts/`

### Hacker News
- Text submissions accepted, link to GitHub Pages in body
- Keep it short — HN readers skip long posts
- Top 2 paragraphs most important

### Twitter/X
- Thread length: aim for 5-8 segments max
- First segment: hook (problem/question)
- Middle: key points, one per segment
- Last: link to full post + call to action

---

## Anti-Patterns

| ❌ Don't | ✅ Do |
|----------|-------|
| Export and distribute without reviewing | Open `_exported/` files before pasting |
| Hard-code platform links in body text | Use `{{ site.url }}{{ site.baseurl }}` for GitHub Pages links |
| Import from Medium using raw HTML | Use defuddle to get clean Markdown |
| Mix `_drafts/` content into export | Only `_posts/` enters the export pipeline |
| Use local/relative image paths in post Markdown | Use absolute GitHub Pages URLs: `https://pjsvis.github.io/blog-posts/assets/images/filename.jpg` |
| Reference an image that hasn't been committed | Commit and push images to `main` before referencing them in posts |