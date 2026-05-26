# Epic: Multi-Platform Publishing Automation

**Date:** 2026-05-23
**Status:** In Progress
**Posts:** N/A (infrastructure epic — no blog posts)

---

## Vision

The blog-posts silo publishes to multiple platforms: GitHub Pages (canonical source), Substack (newsletter), and Medium (discovery). This epic automates the distribution pipeline end-to-end while maintaining a single canonical source to avoid duplicate content penalties. The outcome is a publish-once, distribute-everywhere workflow with canonical URL integrity.

---

## Background

ADR-003 established the canonical URL strategy. GitHub Pages is the canonical source. All exports must inject `<link rel="canonical">` pointing to GitHub Pages. Non-canonical platforms receive `<meta name="robots" content="noindex">`.

Three gaps remain:

1. **`export-all.ts` doesn't inject canonical metadata** — Medium exports lack `<link rel="canonical">` and noindex. Substack exports lack footer links.
2. **`publish-substack.ts` lacks `--canonical` flag** — can't append canonical link to Substack drafts programmatically.
3. **Medium automation is manual** — no RSS feed generator for Medium's importer.

---

## Posts

N/A — this is an infrastructure epic.

---

## Implementation Tasks

### Infrastructure

| # | Task | Script | Priority |
|---|------|--------|----------|
| 01 | Update `export-all.ts` — inject canonical metadata | `scripts/export-all.ts` | P0 |
| 02 | Add `--canonical` flag to Substack publisher | `scripts/publish-substack.ts` | P0 |
| 03 | Create Medium RSS feed generator | `scripts/export-medium-rss.ts` | P1 |

### Process

| # | Task | Location | Priority |
|---|------|----------|----------|
| 04 | Backfill `canonical_url` in existing posts | `_posts/*.md` | P0 |
| 05 | Update front-matter validation in `just check` | `scripts/check-posts.sh` | P1 |
| 06 | Add GitHub Actions job for Substack auto-publish | `.github/workflows/` | P2 |

---

## Exit Criteria

What must be true for the epic to be considered complete?

- [ ] `export-all.ts` generates canonical metadata for all platforms
- [ ] `publish-substack.ts` has working `--canonical` flag tested end-to-end
- [ ] `export-medium-rss.ts` generates valid RSS feed that Medium can import
- [ ] All existing `_posts/` files have `canonical_url` field
- [ ] `just check` validates `canonical_url` presence
- [ ] Registry sync warnings resolved (briefs/INDEX.jsonl updated)

---

## Related

- ADR: `decisions/adr-003-multi-platform-canonical-url-strategy.md`
- Playbook: `playbooks/export-playbook.md`
- Playbook: `playbooks/blog-posts-playbook.md`
- Brief: `briefs/2026-05-23-brief-github-pages-medium.md` (superseded approach)