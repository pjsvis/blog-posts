# ADR-004: Stable Post Filenames — URL Stability After Publish

**Date:** 2026-05-25
**Status:** Accepted
**Incident:** GitHub Pages 404s on all SpaceX IPO posts — users had cached 2026-05-25 filenames; we re-published with 2026-05-26 dates, deleting the old files, causing mass 404s.

---

## Context

On 2026-05-25, we published four SpaceX IPO posts with filenames bearing date `2026-05-25`. On 2026-05-25 (later that day), we revised all four posts to fix architectural barnacles (per-person rotating torus replacing rotating habitat, corrected titles, fixed cross-links, removed draft flags). The revised posts were named `2026-05-26-*` and the `2026-05-25-*` files were deleted.

The GitHub Pages build succeeded. The new `2026-05-26` URLs return 200. But users who had opened or bookmarked the `2026-05-25` URLs encountered 404 — from cached browser links, shared URLs, or email references.

This is a recurring failure mode. Every time we change a post's date in its filename after first publish, we break every existing link to that post.

---

## Decision

**Rule 1 — Frozen date after first publish:**
A `_posts/YYYY-MM-DD-slug.md` filename **must not change** once the post has been visible on GitHub Pages. The date in the filename is the URL. Changing it is equivalent to deleting the post and publishing a new one with broken links.

**Rule 2 — Revised content uses same filename:**
When revising a published post (fixing barnacles, updating architecture, correcting facts), write the revision to the **same filename** as the original. Jekyll will overwrite the page at the same URL. No links break.

**Rule 3 — Date correction is the only exception:**
If a post was published with the wrong date (e.g., content written in May but accidentally dated June), the date may be corrected — but only if:
- No external links to the post are known to exist (checked via analytics, shared link audit)
- A redirect is configured from the old URL to the new URL **before** the file is renamed
- The correction is logged in the debrief

**Rule 4 — Rebasing drafts to posts:**
When promoting a draft (`_drafts/`) to published (`_posts/`), set the date to the intended publish date at that moment. Do not backdate or postdate. Once set and the file is in `_posts/`, the date is frozen.

---

## Mechanical Implementation

Jekyll permalink default: `:title` (derived from filename without date prefix). Explicit permalink in front matter overrides.

To override the default date-derived URL, set `permalink:` in front matter:

```yaml
---
layout: post
title: "Post Title"
date: 2026-05-25T12:00:00 +0000
permalink: /posts/2026-05-25-slug/   # stable URL — decouples filename from URL
---
```

With an explicit `permalink:`, the filename date becomes irrelevant to the URL. You can keep the draft date or fix the date without breaking links.

**Recommended pattern for new posts:**
Always include an explicit `permalink:` in front matter matching the intended URL. This decouples the filename (which is for sorting/organization) from the URL (which is for stability).

---

## Redirects (When Date Must Change)

If a date change is unavoidable (Rule 3 exception), configure a Jekyll redirect before deleting the old file:

**Option A — `jekyll-redirect-from` plugin (GitHub Pages compatible):**
```yaml
---
layout: post
redirect_from: /posts/2026-05-25-slug/
---
```
The plugin generates HTTP 301 redirects from the old URL to the current page. GitHub Pages supports this plugin.

**Option B — `CNAME` or `_redirects` file (Netlify-style, not GitHub Pages native):**
Not recommended for GitHub Pages. Use Option A.

**Option C — GitHub Pages static redirect page:**
Create `posts/2026-05-25-slug/index.html` with meta refresh / HTTP-equivalent redirect. More fragile than Option A.

---

## What We Did This Time (Workaround)

The SpaceX posts were revised by:
1. Keeping `_drafts/` versions with the original architecture
2. Moving drafts to `_posts/` with new `2026-05-26` date — **creating new URLs**
3. Deleting the old `2026-05-25` files — **breaking old URLs**

No redirect was configured. The fix for affected users is hard refresh or clearing browser cache. The new URLs are live.

---

## Consequences

**What became easier:**
- Users never hit 404s from cached links
- Shared URLs in emails, Slack, etc. remain valid after revisions
- Analytics remain attached to the same URLs across revisions

**What became harder:**
- Filenames must be chosen carefully at publish time (date must be correct)
- Drafts must not be dated incorrectly before promotion
- Revision commits will touch the same filename (cleaner git history but less obvious what changed)

**Constraints this imposes:**
- Never `mv` a published `_posts/` file to change its date
- Always include `permalink:` in front matter for URL decoupling
- If a date must change, configure redirect_from **before** the file move

---

## Related

- Playbook: `playbooks/blog-posts-playbook.md` (add stable-date rule)
- ADR: `decisions/adr-003-multi-platform-canonical-url-strategy.md` (canonical URLs depend on stable URLs)
- ADR: `decisions/adr-001-post-front-matter-schema.md` (date field invariant)
- Incident: SpaceX IPO series (2026-05-25) — 404s on all four posts due to date-change republish