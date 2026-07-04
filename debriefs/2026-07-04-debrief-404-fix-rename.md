# Debrief: 404 fix — SpaceX IPO series naming

**Date:** 2026-07-04
**Status:** Resolved
**Author:** Peter + Claude (agent)
**Trigger:** 7 posts returning 404 on https://pjsvis.github.io/blog-posts/

---

## Outcome

All 6 SpaceX IPO series posts now serve HTTP 200 on the live site. `pi-silo-onboarding-assets` deliberately remains 404 (front-matter `published: false` — unchanged from before).

Live verification after deploy:
- 6 renamed posts: 200
- 10 previously-working posts: still 200 (no regressions)
- 4 explicit-permalink posts: still 200
- pi-silo: still 404 (intent preserved)

## Decisions shipped

Three commits on `main`, pushed to origin:

| Commit | Title | LoC |
|--------|-------|-----|
| `35480e2` | `fix(publish): add explicit permalink to 6 SpaceX IPO series posts` | +6 |
| `297f6db` | `fix(publish): rename 6 SpaceX IPO series posts to standard post filename pattern` | 6 renames (100% similarity), +3/-3 in ADR + exported copy edits |
| `e7e3bb9` | `fix(publish): update post 4 -> post 0 cross-link to canonical URL` | +1/-1 |

## Diagnosis arc

The 7 posts returned 404 on the live site despite being tracked in git and present in `_posts/`. Two distinct root causes:

1. **6 SpaceX series posts** had filenames beginning with `0-`, `1-`, …, `5-` to enforce series ordering. The post-detection regex in **Jekyll 3.x** (which GitHub Pages uses via the `github-pages` gem) requires `^\d{4}-\d{2}-\d{2}-` at the start of paths inside `_posts/`. Files that don't match are silently excluded from the collection build.
2. **`pi-silo-onboarding-assets`** has explicit `published: false` in front-matter — its 404 is intentional (the post stays a draft, not published).

## What we tried and learned

### Option A (commit `35480e2`) — INSUFFICIENT

Added explicit `permalink:` field to each of the 6 posts, pointing at the existing `canonical_url` slug value.

**Result:** Deploy happened, posts still 404. Hypothesis was wrong.

**Why it didn't take:** `permalink:` only routes a *built* document. Jekyll 3.x excludes non-conforming filenames from the posts collection entirely — the document never makes it to the routing layer, so `permalink:` has nothing to point at.

### Option B (commit `297f6db`) — EFFECTIVE

Renamed the 6 files in `_posts/` from `0-2026-05-26-...md` to `2026-05-26-...md` (drop leading digit prefix). Series ordering preserved through `series_order:` front-matter field that was already in each post.

**Result:** All 6 posts now build and serve 200 on their canonical URLs.

### Companion fixes (commits within this fix sequence)

- `e7e3bb9` — post 4 (seiza) body link to post 0 (zero-g) now points at post 0's *live* URL (`/posts/2026-05-26-zero-g-explainer/`), not the old digit-prefixed path
- ADR `decisions/adr-006-spacex-snp-500-analysis.md` references updated for posts 1, 2, 3 (the only ADR citing these files)
- `_exported/substack/4-2026-05-26-spacex-seiza-spatial-play.md` updated too — though this file is `.gitignore`d, the edit keeps the local artifact consistent for the next export run

## Series ordering preservation strategy

Title front-matter preserved where it already had numeric prefixes (`0.`, `5.`). The four middle posts (`1`, `2`, `3`, `4`) didn't have numeric prefixes in their titles — and the rename drops those filename prefixes too. **Series reading order is recovered from `series_order:` field** in front-matter; explicit front-matter ordering is the durable source of truth for series flow now. Filename prefix was the wrong level for this.

## Lesson

When using Jekyll 3.x via GitHub Pages:
- `_posts/` filenames must match `^\d{4}-\d{2}-\d{2}-`. No leading characters before the date, no other patterns.
- For series ordering, use `series_order:` front-matter — not filename hacks.
- `permalink:` only routes built documents. It cannot rescue an excluded file. Pre-flight filename validation is on the caller's shoulders.
- GitHub Pages pinned Jekyll version means what works in Jekyll 4.x may not work here.

## Open follow-ups

- None for the 404 fix.
- Wider implications: `pi-silo-onboarding-assets` remains a draft. If the user wants it live, flip `published: false` → `published: true` and (since the filename already conforms) it should serve at the default `/posts/:name/` URL without further edits.

## Files touched

```
_posts/2026-05-26-zero-g-engineering-explainer.md          (renamed from 0-2026-05-26-...)
_posts/2026-05-26-spacex-s1-perky-pat-layout.md            (renamed from 1-2026-05-26-...)
_posts/2026-05-26-spacex-borg-crucible-janeway.md          (renamed from 2-2026-05-26-...)
_posts/2026-05-26-spacex-rgem-cathedral.md                 (renamed from 3-2026-05-26-...)
_posts/2026-05-26-spacex-seiza-spatial-play.md            (renamed from 4-2026-05-26-... + body link fix)
_posts/2026-05-26-biotensegrity-explainer.md               (renamed from 5-2026-05-26-...)
decisions/adr-006-spacex-snp-500-analysis.md               (3 references updated)
_exported/substack/4-2026-05-26-spacex-seiza-spatial-play.md  (link update, .gitignore'd)
```
