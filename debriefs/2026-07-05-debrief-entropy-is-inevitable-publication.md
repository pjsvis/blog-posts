---
layout: none
title: "Debrief: 'Entropy is inevitable, you will adapt' publication"
date: 2026-07-05
status: done
summary: Retrofit the entropy-is-inevitable raw marble to Shannon-Packet format. Patch verifier. Catch and fix a broken cross-link target. Live at 200.
---

# Debrief: Entropy is inevitable, you will adapt — first Shannon-Packet Tier-B publication

## Outcome

`_posts/2026-07-05-entropy-is-inevitable-you-will-adapt.md` is live and serving HTTP 200 on `https://pjsvis.github.io/blog-posts/posts/2026-07-05-entropy-is-inevitable-you-will-adapt/`.

Homepage lists the post alongside the existing 16. Verified spot-checks: no regressions on prior 16 posts.

| Commit | Title | What |
|--------|-------|------|
| `887e5e8` | `feat(publish): 'Entropy is inevitable, you will adapt' (+ verifier patch)` | Post + brief + verifier fix, combined cherry-picked onto main |
| `ff70168` | `fix(entropy): drop the broken (sibling-beyond-okf) link target` | Caught a real bug in the publish path. Link removed; sibling to be re-linked when the draft ships. |

## What worked

- **Original draft quality was strong.** The 3,050-word raw marble had a load-bearing thesis already structured correctly. The retrofit was *formatting*, not *rescue surgery*. Body sections preserved verbatim. Sculptor-internal notes trimmed. TL;DR synthesised from the 10 spine claims.
- **Verifier patch surfaced a silent bug.** The script previously reported CHANNEL CLEAN on any post whose TL;DR did exceed 200 words, because the WATT regex (`^##[[:space:]]+TL\.DR`) was parsed by bash as `TL<any-char>DR` and never matched the actual `## TL;DR` heading. Patched: glob-match (`## TL;DR*`) for heading detection; explicit failure-banner if no TL;DR heading found. The patch is a strict tightening — posts that already passed clean remain clean; the 252-word TL;DR on `_drafts/2026-06-22-data-centers-in-space-shannon-packet.md` is now correctly flagged for follow-up.
- **Cross-link verification caught a deployment-breaker before it became one.** The entropy post's `Links` section referenced `_drafts/2026-07-05-beyond-okf-operational-repositories.md` for the sibling OKF draft — which lives only on `chore/draft-intro-cleanup`, not on `main`. Live link would have returned 404. Dropped the entry; re-add on the sibling's release.
- **Hidden-trap principle.** An observation surfaced mid-arc: blog posters tend to invent new frameworks and over-extend metaphors; Shannon-Packet work should be the antithesis — borrowed concepts (Shannon, Lehman, Evans, lineage, selection pressure), one central metaphor held clean. Acknowledged; not documented. Kept as a discipline, not a check.

## What didn't work

- **Cherry-pick path was non-trivial.** The branch where my entropy work landed first (`chore/draft-intro-cleanup`) had 8 prior unmerged commits from other sessions. Direct fast-forward of `main` to that branch would have dragged those commits in. Solved by cherry-picking the two entropy-relevant commits onto `main` fresh, leaving the chore-branch state untouched. Cost: one round of stash + reset to clear noise files (reg-sync JSONLs, an enrichment to a sibling draft) that had accumulated in the working tree.
- **TL;DR hit 242 words on first cut.** Watt rule says <200; verifier effectively silently bypassed the rule, so a clean-PASS report was misleading. Trimmed twice (244 → 221 → 191) by tightening prose. Final form preserves all 10 spine claims in bullet form.

## What we shipped

1. **`_posts/2026-07-05-entropy-is-inevitable-you-will-adapt.md`** — 193 lines. Front-matter, TL;DR (191 words), 7 body sections, narrativised bibliography, link mapping. Final word count 2,694.
2. **`_drafts/2026-07-05-entropy-is-inevitable-you-will-adapt-shannon-packet.md`** — 181 lines. The retro-fit draft, kept for the canonical "shannon-packet" naming convention so we can re-derive a future post from it.
3. **`_drafts/2026-07-05-entropy-is-inevitable-you-will-adapt.md`** — 389 lines. The original raw marble preserved unmodified so the unedited vein is auditable.
4. **`briefs/2026-07-05-brief-entropy-is-inevitable.md`** — 51 lines. Agent brief captured before the sculpt, in the project's standard brief format.
5. **`scripts/shannon-packet-check.sh`** — patch. WATT heading detection now actually triggers. Banner added for missing TL;DR.

## Hidden trap

The user's remark, kept as a discipline (not a check): blog-post authors tend to invent new frameworks and over-extend metaphors. Shannon-Packet work should be the antithesis — borrowed concepts, one central metaphor held clean. Risking an audit: which posts in the silo pass this quickly? Reasonable test: does the body of the post introduce a new framework by name? If yes — flag it.

## Open threads

- **Data-centers-in-space retro-fit TL;DR is now 252 words** (correctly flagged by the patched verifier). The Watt rule was previously silently bypassed — now we owe that retro-fit a trim. Same arc: tighten prose, get below 200. Estimated time: similar to the entropy retrofit.
- **Beyond-OKF sibling draft still on chore branch** (`chore/draft-intro-cleanup` commit 6240139) — referenced by the entropy post but not on `main`. Re-link when that draft ships.
- **Two pilot retro-fits (`silo-manifesto-shannon-packet.md`, `data-centers-in-space-shannon-packet.md`)** are still in `_drafts/`. They were retro-fit to Shannon-Packet channel-clean but never moved to `_posts/` and published. Worth a separate arc.
- **Watt test on the entropy post for general discipline.** Beyond the TL;DR count: every paragraph in the body currently passes a one-shot read. Grep for the obvious throat-clearing openers in body sections later.

## Compiled audit trail

```
yymm branches:  chore/draft-intro-cleanup → main (cherry-picked 40fd21f, 05f7ac9)
                main → fixup ff70168
3 commits on main since this arc started:
  887e5e8    feat(publish): entropy is inevitable (with verifier patch)
  ff70168    fix(entropy): drop broken sibling link
  (plus the prior 404-fix debrief b406178 as the arc's baseline)

working tree state on main: clean.
chore/draft-intro-cleanup: noise stashed in stash@{0} (entropy-arc-post-publish-stash;
  contains beyond-okf enrichment, untracked entropy drafts left as duplicates from
  branch switch, plus pre-existing untracked brief-reg-canon and canon/fiction files).
```
