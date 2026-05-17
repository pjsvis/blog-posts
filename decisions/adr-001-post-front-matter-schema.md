# ADR-001: Post Front-Matter Schema

**Date:** 2026-05-17
**Status:** Accepted

## Context

Posts in `_posts/` require structured metadata for Jekyll rendering, platform routing, and review workflow. The schema evolved during dry-run testing — this ADR codifies the decisions.

## Decision

All posts in `_posts/` must have the following front-matter fields:

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DDTHH:MM:SS +0000
categories: [category1, category2]
tags: [tag1, tag2, tag3]
canonical_target: [substack, medium, hn, twitter]
site_status: draft   # draft | staged | published
published: false     # Jekyll visibility — false = excluded from build
---
```

### Field definitions

| Field | Required | Values | Notes |
|-------|----------|--------|-------|
| `layout` | Yes | `post` | Jekyll requires this |
| `title` | Yes | string | Used in exports, Jekyll title tag, nav |
| `date` | Yes | ISO 8601 | Sets URL slug, post ordering |
| `categories` | Yes | list | Jekyll categories, rendered in post meta |
| `tags` | Yes | list | Used for export metadata, cross-linking |
| `canonical_target` | No | list subset | Gates which platforms receive the export. Defaults to all four if omitted. Valid values: `substack`, `medium`, `hn`, `twitter` |
| `site_status` | Yes | `draft` / `staged` / `published` | Workflow state. `published` → set `published: true` in Jekyll |
| `published` | Yes | `false` (draft/staged) / `true` (published) | Jekyll build gate — only `published: true` posts appear on site |

### Workflow state transitions

```
_drafts/ → [brief written] → [HITL review] → _posts/ (site_status: draft, published: false)
                                                            ↓
                                          [export reviewed] → [platform publish]
                                                            ↓
                                          site_status: staged, published: false
                                                            ↓
                                          [live on site] → site_status: published, published: true
```

### Canonical target platform routing

- `substack` → `_exported/substack/` — raw Markdown, single title from front-matter
- `medium` → `_exported/medium/` — HTML, single `<h1>` from front-matter
- `hn` → `_exported/hn/` — text submission block with link
- `twitter` → `_exported/twitter/` — section-based thread chunks

## Consequences

**Positive:**
- Export pipeline is data-driven — platform selection is declarative, not hardcoded
- Site visibility and platform targeting are independent controls
- Workflow state visible in front-matter at a glance

**Negative:**
- Every draft promoted to `_posts/` needs `site_status` and `published` fields set
- Agents must be told not to set `published: true` without human approval

## Notes

- The `site_status` field is custom (not a Jekyll standard) — it's a workflow marker. It doesn't affect Jekyll rendering.
- `published: false` excludes posts from the Jekyll build entirely. Use it as the default gate.
- Export pipeline reads `canonical_target` from front-matter but does not modify it.