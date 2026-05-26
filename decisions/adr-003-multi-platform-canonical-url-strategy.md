# ADR-003: Multi-Platform Canonical URL Strategy

**Date:** 2026-05-23
**Status:** Accepted

## Context

The blog-posts silo publishes to multiple platforms: GitHub Pages (primary), Substack (newsletter), and Medium (discovery). The export pipeline (`scripts/export-all.ts`) generates platform-specific output, but two gaps remain:

1. **No canonical URL declaration.** When the same content appears on multiple platforms, search engines may demote all copies as duplicate content. There is no mechanism to declare which platform "owns" the content.

2. **Medium automation is underspecified.** The current brief (`briefs/2026-05-23-brief-github-pages-medium.md`) assumes Medium has a REST API for publishing. It does not — Medium has no public publishing API. The options are RSS import (manual, "free") or browser automation (automated, but fragile and ToS-violating).

A decision is needed before further automation work proceeds. The choice here constrains both the export pipeline and the front-matter schema.

## Decision

**GitHub Pages is the canonical source.** All posts declare their canonical URL in front-matter, pointing to `https://pjsvis.github.io/blog-posts/posts/{slug}/`. Export scripts inject `<link rel="canonical">` into platform-specific output. Non-canonical platforms receive `<meta name="robots" content="noindex">` to prevent indexing.

**Medium automation uses RSS import** (periodic, manual trigger) rather than browser automation. Browser automation is rejected as fragile and ToS-violating.

**Substack automation continues** using the existing cookie-based script (`scripts/publish-substack.ts`) but gains a `--canonical` flag that injects the GitHub Pages link into the Substack body.

### Front-matter Schema Change

Add `canonical_url` to the post front-matter invariant:

```yaml
---
layout: post
title: "Post Title"
date: 2026-05-23T12:00:00 +0000
categories: [ai, systems]
tags: [tag1, tag2]
canonical_url: https://pjsvis.github.io/blog-posts/posts/YYYY-MM-DD-slug/
canonical_target: [substack, medium]
---
```

| Field | Required | Purpose |
|-------|----------|---------|
| `canonical_url` | Yes | Absolute URL of the canonical source (GitHub Pages). Used to inject `<link rel="canonical">` and for cross-platform linking. |
| `canonical_target` | No | Platforms to export to. If omitted, exports to all platforms. |

### Export Pipeline Changes

1. **`export-all.ts`** — On Medium export, prepend `<meta name="robots" content="noindex">` and inject `<link rel="canonical" href="{canonical_url}">`. Strip duplicate title from body (already done).

2. **`export-all.ts`** — On Substack export, strip top-level heading (already done) and add a footer: `Originally published at {canonical_url}`.

3. **`publish-substack.ts`** — Add `--canonical` flag. When set, append canonical link to prose mirror body.

4. **New script `scripts/export-medium-rss.ts`** — Generates an RSS feed at `_exported/medium/feed.xml`. The feed contains only posts with `canonical_target` including `medium`. Medium's RSS importer reads this feed periodically (manual trigger per post, or scheduled).

### Medium RSS Import Process

1. Run `bun run scripts/export-all.ts --post=slug` (or `--all`)
2. Run `bun run scripts/export-medium-rss.ts` to regenerate `feed.xml`
3. In Medium, go to Settings → Import → Import from RSS → paste GitHub Pages feed URL
4. Medium imports the post, preserving canonical URL from the RSS `<link>` element

This is manual per post but avoids ToS risk and requires no browser automation.

## Alternatives Considered

| Alternative | Why Rejected |
|-------------|--------------|
| **Substack as canonical source** | Substack owns the relationship with readers (subscriptions, emails). But Substack is a walled garden — content is not easily exportable back to Jekyll. GitHub Pages is the open, portable source of truth. |
| **Medium as canonical source** | Medium has no public API and imposes their own monetization layer. Hosting canonical content on a platform we don't control is an unhealthy dependency. |
| **Browser automation for Medium** | Puppeteer/Playwright scripts are fragile (cookie expiry, UI changes, rate limits), require constant maintenance, and likely violate Medium's ToS. The RSS import is more reliable and legally safer. |
| **No canonical declaration (let platforms fight it out)** | Without explicit canonical URLs, search engines arbitrarily choose the canonical source, usually the most-indexed one. GitHub Pages is lower-traffic than Substack — we'd lose the canonical race by default. |
| **Export only to Substack, link to Substack from everywhere** | Makes Substack the de facto canonical without declaring it. Reader links point to Substack, not GitHub Pages. If Substack changes their subdomain or the newsletter folds, links break. |

## Consequences

**What became easier:**
- Search engines index the GitHub Pages version as canonical, preserving SEO equity
- Export scripts have a clear "where does this link back to?" answer
- New platforms can be added to `canonical_target` without changing logic
- Debriefs can reference canonical URLs for post-mortem analytics

**What became harder:**
- Front-matter invariant requires `canonical_url` on every post — existing posts need backfill
- Medium RSS import is manual per post, not fully automated
- Substack footer links may feel redundant to readers who followed an email link

**Constraints this imposes:**
- All `_posts/` files must include `canonical_url` in front-matter
- The `canonical_url` must match the Jekyll permalink structure (`/_posts/YYYY-MM-DD-slug/`)
- Export scripts must not modify the `canonical_url` field
- No platform should be published without its canonical URL being reachable first

## Related

- Playbook: `playbooks/blog-posts-playbook.md` (front-matter invariant updated)
- Playbook: `playbooks/export-playbook.md` (export pipeline updated)
- Script: `scripts/export-all.ts` (canonical injection)
- Script: `scripts/publish-substack.ts` (--canonical flag)
- Brief: `briefs/2026-05-23-brief-github-pages-medium.md` (superseded approach)
- ADR: `decisions/adr-001-post-front-matter-schema.md` (schema updated)