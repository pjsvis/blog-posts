# Debrief: Architecture of Consistency — First Post Dry Run

**Date:** 2026-05-17
**Post:** Architecture of Consistency
**Authors:** Agent (dry run), Human (HITL review)

---

## What we did

Promoted the shortest draft (`2026-05-13-the-architecture-of-consistency.md`) to `_posts/` and ran it through the full pipeline: Jekyll build → export → review. Caught and fixed 5 bugs.

---

## What broke and what we learned

| Failure | Root cause | Fix |
|---------|-----------|-----|
| Duplicate title in Substack/Medium | `post.body` retained markdown h1 from raw file | Strip `\n# Title\n` from body before adding title from front-matter |
| 19-tweet fragment thread | Twitter export sliced at 280 chars per paragraph | Section-based chunking (break on `## ` headings) |
| All platforms exported regardless of `canonical_target` | Script only gated Medium on `canonical_target` | `canonical_target` now gates all 4 platforms; defaults to all if unset |
| `just check` false positive on empty `_posts/` | Glob expands to literal string in recipe context when no files match | Guard with `if [ -n "$(ls _posts/*.md 2>/dev/null)" ]` |
| `just preview` using system Ruby 2.6 | Recipe called `bundle` without `flox activate -c` | Gate recipe on `require_ruby_env`, use `flox activate -c` |

---

## What we changed

### Structural
- Added `site_status: draft|staged|published` to front-matter schema
- Added `canonical_target` gating to export-all.ts (all platforms, not just Medium)
- Created `scripts/env-guard.sh` with `require_ruby_env()` for POSIX-compatible env checking
- Wrote ADR-001 documenting the post front-matter schema and workflow state transitions

### Pipeline
- Export script now produces single-title output for Substack and Medium
- Twitter export produces coherent section-based threads instead of paragraph fragments
- `just preview` and `just build` gate on `require_ruby_env` and use `flox activate -c`
- `_posts/` empty state handled gracefully in `just check`

---

## What the HITL review process looks like

The post was reviewed inline during the dry run — the agent flagged issues as it found them. This worked for the first run but isn't scalable.

**Refined process:**
1. Draft stays in `_drafts/` with `published: false`
2. Agent writes brief in `briefs/` with export checklist
3. Human reviews brief and exports in `_exported/`
4. On approval, agent updates front-matter (`site_status: staged`, keep `published: false`)
5. Agent commits and opens PR
6. Human merges → GitHub Pages builds (but post still invisible until `published: true`)
7. Human publishes to target platforms
8. Human sets `published: true` and commits → post goes live on site

---

## What's still outstanding

- Post is in `_posts/` with `site_status: draft`, `published: false` — exports reviewed and clean
- Awaiting: manual publish decision on Substack and Medium
- `site_status: published` will be set at the same time as `published: true`

---

## Concepts codified

- **Conceptual Entropy:** TradingAgents → blog-posts vocabulary (mentioned in post, now in context)
- **HITL review gate:** Human-in-the-loop before any external platform publish
- **Site visibility vs platform targeting:** Independent controls via `published` and `canonical_target`
- **Export-as-staging:** `_exported/` is the human review artifact, not a deployment target