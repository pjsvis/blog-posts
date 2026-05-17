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
| `date` | Yes | Sets permalink structure (`/_posts/YYYY-MM-DD-slug/`) |
| `categories` | No | Taxonomic grouping |
| `tags` | No | Semantic tags for search and classification |
| `canonical_target` | No | List of platforms to export to; omit exports to all |
| `draft` | No | Marks unpublished work |

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