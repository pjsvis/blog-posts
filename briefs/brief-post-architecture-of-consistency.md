# Brief: Architecture of Consistency — First Post Dry Run

**Date:** 2026-05-17
**Status:** Done (reviewed inline during dry run)

---

## Objective

Dry run the full publish pipeline end-to-end: promote draft → build → export → review → verify. Identify failures before they reach a live platform.

---

## Post Details

**Promoted from:** `_drafts/2026-05-13-the-architecture-of-consistency.md`
**Published to:** `_posts/2026-05-13-the-architecture-of-consistency.md`
**Title:** "The Architecture of Consistency: Why AI Agents Need Logic Over Completeness"
**Target Platform(s):** Substack, Medium
**site_status:** draft (published: false — site draft, exportable)
**canonical_target:** [substack, medium]

---

## What happened during the dry run

### Issues found

1. **Duplicate title in Substack export** — `post.body` retained the markdown h1, export script added front-matter title on top → double title
2. **Duplicate h1 in Medium export** — same root cause
3. **Twitter export** — 19 paragraph-fragment tweets, not coherent sections
4. **canonical_target gating** — script exported to all platforms regardless of field; only Medium conditional was implemented
5. **`just check` false positive** — glob `_posts/*.md` iterated as literal string when `_posts/` was empty

### Fixes applied

1. Export script: strip leading `\n# Title\n` from body before adding title from front-matter
2. Export script: canonical_target gates all four platforms (not just Medium)
3. Twitter export: section-based chunking (breaks on `## ` headings)
4. justfile: guard empty `_posts/` glob with `if [ -n "$(ls ...)" ]`

---

## Export Checklist

- [x] Front-matter complete (title, date, categories, tags, canonical_target, site_status, published)
- [x] Run `bun run scripts/export-all.ts`
- [x] Review `_exported/` output — Substack clean, Medium clean, Twitter coherent
- [x] `_exported/` staged for manual platform publish (site_status: draft)
- [x] Commit to branch

## Notes

- TradingAgents references in the post are a scoping question — the post is about concepts that originated in TradingAgents but are now broadly applicable. The closing paragraph links to the TradingAgents repo for context.
- `site_status: draft` keeps the post off the Jekyll site (published: false) while `_exported/` holds the reviewed export for platform publish.

## Done

When all `[x]` items are checked. Post is in `_posts/` as a site draft with clean exports in `_exported/`. Awaiting manual publish decision on Substack and Medium.