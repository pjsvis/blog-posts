# Blog Posts Playbook — Jekyll & GitHub Pages Pipeline

## Purpose

This playbook establishes the layout parameters, front-matter configurations, and publishing gates for the blog-posts Jekyll pipeline.

Jekyll is the single source of truth. All content lives in `_posts/` (published) or `_drafts/` (in-progress). The pipeline transforms raw Markdown into optimized web assets via GitHub Pages.

---

## Directory Structure

```
blog-posts/
 ├── _config.yml           ← Pipeline configuration (baseurl, collections)
 ├── _layouts/             ← HTML layout templates (default.html, post.html)
 ├── _posts/               ← Published long-form content
 ├── _drafts/              ← Works in progress (excluded from build)
 ├── assets/               ← Static media (CSS, images)
 ├── briefs/               ← Internal: post briefs and epics
 ├── debriefs/             ← Internal: retrospective documents
 ├── decisions/            ← Internal: architecture decision records
 ├── playbooks/            ← Internal: operational playbooks
 ├── scripts/              ← Export automation (Bun/TypeScript)
 └── .github/workflows/    ← CI/CD: Jekyll → GitHub Pages deploy
```

**Note:** Jekyll underscore directories (`_posts/`, `_drafts/`, `_layouts/`, `_config.yml`) are hard-coded by Jekyll. Do not rename them. See `playbooks/conventions-playbook.md`.

---

## Front-Matter Invariant

Every Markdown file in `_posts/` must declare its identity at the top using YAML front-matter. **No exceptions.**

### Post Format

```markdown
---
layout: post
title: "Your Post Title"
date: 2026-05-17T12:00:00 +0000
categories: [ai, systems]
tags: [tag1, tag2]
canonical_target: [substack, medium]
---

# Your Content Begins Here...

```

### Draft Format

```markdown
---
layout: post
title: "Draft: Your Post Title"
draft: true
---

# Your Content...

```

| Field | Required | Purpose |
|-------|----------|---------|
| `layout` | Yes | Must be `post` |
| `title` | Yes | Used in `<title>`, export headers, and platform distribution |
| `date` | Yes | Sets permalink structure (`/_posts/YYYY-MM-DD-slug/`); **frozen after first publish — see URL Stability below** |
| `permalink` | Recommended | Explicit stable URL, decoupled from filename date. See URL Stability below. |
| `categories` | No | Taxonomic grouping |
| `tags` | No | Semantic tags for search and classification |
| `canonical_url` | Yes | Absolute URL of the canonical source (GitHub Pages). See ADR-003. |
| `canonical_target` | No | List of platforms to export to; omit exports to all |
| `draft` | No | Marks unpublished work |
| `published` | Yes (in `_posts/`) | Must be `true` once the post is in `_posts/` |
| `series` | No | Series slug for multi-post series (e.g., `spacex-ipo`) |
| `series_order` | No | Integer position in series |

### URL Stability — Frozen Date Rule

**The date in a `_posts/` filename must never change after first publish.** Changing it breaks every existing link (bookmarks, shared URLs, email references) — all return 404. This is the single most destructive publishing error.

**Why filenames and URLs are coupled by default:** Jekyll's default permalink derives the URL from the filename's date prefix (`/_posts/YYYY-MM-DD-slug/`). Changing the filename date changes the URL.

**The fix: explicit `permalink:` in every post.** Decouple the filename from the URL by declaring the URL explicitly in front matter:

```yaml
permalink: /posts/2026-05-25-slug/   # stable URL — filename date is now irrelevant to the URL
```

With an explicit `permalink:`, you can revise a post's content, update its front-matter metadata, and even correct the filename date — all without changing the URL. The URL stays stable.

**When revising a published post:** Write the revision to the same `_posts/YYYY-MM-DD-slug.md` file. Jekyll overwrites the page at the same URL. No links break.

**When you must change a date (correction only, not revision):** Configure `redirect_from:` before renaming the file — see ADR-004.

---

## Publishing Workflow

### 1. Draft

Create in `_drafts/`. Use the content outline from your brief. Keep drafts internal — they are excluded from Jekyll builds and export pipeline.

### 2. Brief

Before starting a draft, create `briefs/brief-[topic]-[YYYY-MM-DD].md`. See `playbooks/briefs-playbook.md`.

### 3. Review

Move from `_drafts/` to `_posts/YYYY-MM-DD-slug.md`. Run `just check` to validate front-matter.

### 4. Publish

Commit to `main`. GitHub Actions automatically builds and deploys to `https://pjsvis.github.io/blog-posts/`.

### 5. Export

Run `bun run scripts/export-all.ts` to generate platform-specific output in `_exported/`. Review before distributing. See `playbooks/export-playbook.md`.

### 6. Debrief

After publishing and distributing, write `debriefs/YYYY-MM-DD-topic.md`. See `playbooks/debriefs-playbook.md`.

---

## Local Preview

```bash
just preview   # runs: bundle exec jekyll serve --baseurl=""
```

Open `http://localhost:4000/blog-posts/` to preview before committing.

---

## Anti-Patterns

| ❌ Don't | ✅ Do |
|----------|-------|
| Draft in `_posts/` | Keep drafts in `_drafts/` until ready |
| Publish without `just check` | Validate front-matter before every commit |
| Export without reviewing output | Open `_exported/` files before distributing |
| Hard-code links in post body | Use `{{ site.baseurl }}` or full GitHub Pages URLs |
| Mix internal docs with public posts | Keep `briefs/`, `debriefs/`, `decisions/`, `playbooks/` separate |
| Move a `_posts/` file to change its date | Keep the filename; update content in place |
| Rename a published post's file | Never — it changes the URL and breaks all links |
| Publish to `_posts/` without `permalink:` | Always declare `permalink:` to decouple filename from URL |