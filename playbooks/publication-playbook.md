# Publication Playbook

## Purpose

Every post that goes live on `pjsvis.github.io/blog-posts/` must pass through the same gates. This playbook is the checklist. No exceptions.

---

## Pre-Push Checklist

Before pushing any post to `main` for GitHub Pages deployment:

### Front-Matter Validation

```yaml
---
layout: post
title: "Your Post Title"              # No "Draft:" prefix in _posts/
date: 2026-05-25T12:00:00 +0000       # Must be <= today's date
categories: [cat1, cat2]              # Taxonomic grouping
tags: [tag1, tag2]                    # Semantic tags
canonical_target: [substack, medium]  # Platforms to export to
canonical_url: https://pjsvis.github.io/blog-posts/posts/YYYY-MM-DD-slug/  # Exact permalink
published: true                       # false = page NOT generated at all
---
```

### Jekyll URL Reference

```
Permalink pattern:  /posts/:name/
                    └─ :name = filename minus .md (e.g. "2026-05-25-post-slug")

GitHub Pages URL:   https://pjsvis.github.io/blog-posts/posts/YYYY-MM-DD-slug/
                                                    └──────────┘ └─────────────┘
                                                     baseurl       /posts/:name/
```

**Common mistake:** Using `/2026/05/25/slug/` instead of `/posts/2026-05-25-slug/`. The former is a Jekyll default permalink that our config overrides.

### Cross-Links

When linking between posts, use the full `/blog-posts/posts/YYYY-MM-DD-slug/` path:

```markdown
[Part 1 of this series](/blog-posts/posts/2026-05-25-spacex-s1-perky-pat-layout/)
```

Not: `/_posts/2026-05-25-slug/` — that's an internal filesystem path, not a URL.

### Date Discipline

- **Filename date** must match **front-matter date** or Jekyll's permalink resolves incorrectly
- **Front-matter date** must be ≤ today's date. If you need future dates, add `future: true` to `_config.yml`
- `published: false` = post is excluded from the Jekyll build entirely. No URL exists. Use only for drafts you want completely hidden
- `published: true` = post is generated and accessible. Shows on blog index

### Registry Sync

Run `just check` before committing. It validates:
- All `_posts/` files have required front-matter fields
- All registries (briefs, debriefs, decisions, playbooks) are in sync

If check fails, fix the issues before pushing.

---

## Push-to-Publish Flow

```bash
# 1. Draft in _drafts/ until complete and reviewed
# 2. Move to _posts/ with correct front-matter and filename
# 3. Validate
just check

# 4. Commit on feature branch
git add _posts/YYYY-MM-DD-slug.md
git commit -m "feat: post title"

# 5. Merge to main and push
git checkout main
git merge feature-branch --no-edit
git push origin main
```

**Deploy time:** ~60 seconds after push. GitHub Actions → Jekyll build → Pages deploy.  
**Verify:** `curl -s -o /dev/null -w "%{http_code}" https://pjsvis.github.io/blog-posts/posts/YYYY-MM-DD-slug/` should return `200`.

---

## Platform Distribution

After GitHub Pages is live, distribute to each platform. Order matters: Medium first (canonical), then Substack (newsletter), then social (X, HN).

### Medium

```bash
bun run scripts/export-all.ts     # generates _exported/medium/
```
- Review `_exported/medium/` output for formatting artefacts
- Post to Medium with canonical URL set to the GitHub Pages URL
- Add series tag if part of a multi-post series

### Substack

```bash
bun run scripts/export-all.ts     # generates _exported/substack/
```
- Review `_exported/substack/` output
- Post as newsletter draft, schedule or send immediately
- Include cross-links to other series posts

### X (Twitter)

Write threads in advance. Template:

```
Tweet 1: Hook (one striking fact or question)
Tweet 2-N: Key points, one per tweet
Tweet N: Link to post + call to action
```

- Max 280 characters per tweet
- Use 🧵 to indicate thread
- Include the GitHub Pages URL (or Medium canonical)

### Hacker News

- Submit the GitHub Pages URL as the link
- Title: use the post title, trimmed to fit (max 80 chars)
- If part of a series, consider submitting Post 1 first, then a "series complete" roundup
- Prepare a first comment with context if the title alone doesn't convey the argument
- Do not ask for upvotes. The work speaks or it doesn't.

---

## Series Publications

For multi-post series, use this structure:

### Campaign Plan

Write a campaign plan in `briefs/campaign-series-name.md` covering:
- Publication order and dates
- X thread copy for each post
- HN submission titles
- Cross-link structure between posts

Template: see `briefs/campaign-spacex-ipo-series.md` for a worked example.

### Series Footer

Every post in a series should include a footer linking to all other posts:

```markdown
*This is Part 2 of a 4-part series on [topic]:*

- *[Part 1: Title](/blog-posts/posts/YYYY-MM-DD-slug-1/)*
- *Part 2: Title (this post)*
- *[Part 3: Title](/blog-posts/posts/YYYY-MM-DD-slug-3/)*
- *[Part 4: Title](/blog-posts/posts/YYYY-MM-DD-slug-4/)*
```

### Front-Matter Series Tags

Add series metadata to each post:
```yaml
series: series-name
series_order: 2
```

### Simultaneous vs. Staggered

- **Simultaneous:** Publish all posts at once. Best when the series is a single argument released in parts that readers consume sequentially. Cross-link all posts immediately.
- **Staggered:** Publish one post per day/week. Best when riding a news cycle or building audience over time. Update earlier posts with "Part N now live" links as each new part drops.

---

## Quick Reference

| What | Command / URL |
|------|---------------|
| Validate front-matter | `just check` |
| Local preview | `just preview` (http://localhost:4000/blog-posts/) |
| Export to platforms | `bun run scripts/export-all.ts` |
| Deploy status | `gh run list --repo pjsvis/blog-posts --workflow deploy.yml --limit 1` |
| Verify post is live | `curl -s -o /dev/null -w "%{http_code}" https://pjsvis.github.io/blog-posts/posts/SLUG/` |
| Blog index | https://pjsvis.github.io/blog-posts/ |

---

## Common Errors

| Symptom | Cause | Fix |
|---------|-------|-----|
| 404 on post URL | `published: false` in front-matter | Change to `published: true` |
| 404 on post URL | Date is in the future | Set date ≤ today, or add `future: true` to `_config.yml` |
| 404 on post URL | Wrong URL format | Use `/posts/YYYY-MM-DD-slug/` not `/YYYY/MM/DD/slug/` |
| Post not on index | `published: false` | Change to `published: true` |
| `just check` fails | Missing `canonical_url` or other front-matter field | Add the field. See template above. |
| Index shows old posts | New posts have `published: false` | Change to `published: true` |
| Cross-links broken | Links use `/_posts/` or `/YYYY/MM/DD/` format | Use `/blog-posts/posts/YYYY-MM-DD-slug/` |