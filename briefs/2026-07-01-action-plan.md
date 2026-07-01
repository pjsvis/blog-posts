# Action Plan — July 2026

**Generated:** 2026-07-01
**Status:** Active
**Source:** `mavis` session, blog-posts workspace

---

## Context

A systematic review of untracked drafts, briefs, canon docs, and playbooks revealed
40 untracked drafts across several distinct content clusters. The state is uneven:
some pieces are publication-ready, others are raw compilation output, and some
infrastructure artefacts are complete but awaiting human action.

This plan documents the decisions and actions required to convert accumulated
Stuff into published Things.

---

## Core Principles

> **Artefact as proof.** If it is not in the repo, it is not a thing.

> **Mentation.** The systematic transformation of unstructured, chaotic, high-entropy
inputs ("Stuff") into structured, deterministic, low-entropy outputs ("Things").

> **Edinburgh Protocol.** Analytical, precisely articulate, dryly witty. No manic
enthusiasm. Hume's Razor: state ignorance explicitly when inputs are insufficient.

---

## Priority 1 — Nuclear Series — Ship Now

The most developed, most recent, and most strategically coherent body of work.
Nine drafts spanning UK defence posture, SSBN→SSGN platform refactor, Letters of
Last Resort paradox, and three rounds of Telegraph/Times letter refinement.

### Actions

- [ ] `nuclear-repurposing.md` → add front matter, publish
  - The flagship essay. Minimal polish needed. Publication-ready.
- [ ] `nuclear-telegraph-01.md` → add front matter, send to *Telegraph* or *The Times*
  - Telegraph version: frames around vulnerability, waste, "better defence not no defence"
  - Times version: frames around Whitehall paradox, rational bluff, institutional theatre
  - `telegraph-02.md` and `telegraph-03.md` are backup variants — hold for follow-up
    if first letter is published
- [ ] `nuclear-repurposing-example.md` → integrate as closing act of main essay
  - Red Sea tactical vignette (FAFO / subsea mothership) is exceptional
  - Alternatively: pull as standalone short-form piece

### Backing research (do not publish, keep as briefs)

- `_drafts/2026-07-02-uk-defense-plans.md` — UK defence posture, Ukraine lessons
- `_drafts/2026-06-30-uk-defence-investment-plan-analysis-june-2026.md` — DIP financial deep dive
- `nuclear-decommissioning-01.md`, `nuclear-letters.md`, `nuclear-letters-of-last-resort.md`,
  `nuclear-telegraph-01.md`, `nuclear-telegraph-02.md`, `nuclear-telegraph-03.md`,
  `uk-defense-tech-fetish.md` — research ledger

---

## Priority 2 — UK Defence Policy — Consolidate and Publish

Two strong but separate pieces that cannibalise each other if published independently:

- `2026-06-22-uk-defense-policy.md` — structural critique, four-nation horizontal grid proposal
- `2026-06-30-uk-defence-investment-plan-analysis-june-2026.md` — financial analysis

### Actions

- [ ] Merge both into a single post anchored on the four-nation procurement grid
  - Policy piece has the better hook; DIP numbers are the evidence layer
  - Drop `uk-defense-policy.md` once merged — fully absorbed
- [ ] Publish consolidated post

---

## Priority 3 — Tech Cluster

### the-palimpsest-problem.md — publish

- [ ] Add front matter
- [ ] Light editorial pass
- [ ] Publish

The metaphor is sharp, the three-phase mitigation protocol is clean, the closing
lands. Minimal work required.

### data-centers-in-space + algorithmic-historicism — pair as series

- [ ] Pair as a two-part series
  - Both share a structural argument: designing *for* the environment rather than
    against it (orbital compute / falsification-first AI)
  - Space piece is richer in concrete architecture; AI piece is more philosophical
  - Draft 1: space data centres; Draft 2: algorithmic historicism
- [ ] Edit both for length — both are currently sprawling compilation output
  - Strip conversational scaffolding; keep the structural argument

### tardigrades.md — publish

- [ ] Add front matter
- [ ] Publish

Solid, well-written, front-matter only needed.

### older-dolphins.md — short-form only

- [ ] Convert to LinkedIn short or newsletter hook
  - C15:0 / Greek yogurt arbitrage is a tight, self-contained argument
  - Not a standalone essay; fits the "street-food snack" category
  - Alternatively: integrate as a single paragraph in a larger piece on supplement marketing

---

## Priority 4 — Process Infrastructure — Awaiting Human

### briefs/2026-06-13-brief-muppet-filter-kimi-eval.md

Pipeline is complete. Human action required:
- [ ] Writer picks up brief from `briefs/`
- [ ] Writes two posts from `canon/the-muppet-filter-draft.md` and `canon/why-kimi-k2.6-hasnt-benchmaxxed.md`
- [ ] Runs export pipeline (`bun run scripts/export-all.ts` or equivalent)
- [ ] Reviews `_exported/` output
- [ ] Commits and deploys

### canon/model-eval-q2-2026.md

Raw eval data already written. No action from Mavis.

---

## ADRs Required

Two decisions need formal documentation as Architecture Decision Records:

### ADR-NNN: Nuclear SSGN Refactor

- [ ] Write ADR in `decisions/`
- [ ] Codify the decision to argue for SSBN → SSGN conversion as a published position
- [ ] Status: **Proposed**

### ADR-NNN: Silo Manifesto / Decisions Playbook Consolidation

- [ ] Write ADR in `decisions/`
- [ ] Resolve duplication: `silo-manifesto.md` (draft post) vs `playbooks/decisions-playbook.md`
    (which already documents the brief/debrief cycle)
- [ ] Decision options:
  - **Option A:** Manifesto becomes the playbook methodology section; publish as-is
  - **Option B:** Publish manifesto as meta post; playbook absorbs the methodology
  - **Option C:** Archive manifesto; extend playbook with the Silo concept language
- [ ] Commit decision and close the palimpsest
- [ ] Status: **Proposed**

---

## Lower Priority / Reconsider

| Draft | Action | Rationale |
|---|---|---|
| `ai-terminal-multiplex.md` | Rewrite as essay or move to notes | Currently a tool recommendation list; not an essay |
| `distributed-inference.md` | Promote or retire | Open-weights economics from May; likely superseded |
| `tangled-web.md` | Require clearer editorial angle | Fascial / exercise ROI; sits between biology and self-help |
| `vlogs.md` | Cut to core or archive | Comment and blog reply stitched together; 99 lines of scaffolding |
| `silo-manifesto.md` | See ADR above | Depends on consolidation decision |

---

## Export Checklist (per post)

For each post published:
- [ ] Front matter complete (title, date, categories, `canonical_target`)
- [ ] Cross-links resolve
- [ ] Run export pipeline
- [ ] Review `_exported/` output
- [ ] Commit to `main`
- [ ] Deploy

---

## Related

- Pipeline methodology: `playbooks/blog-research.md`
- Publishing workflow: `playbooks/medium-substack-playbook.md`
- ADR template: `decisions/TEMPLATE.md`
- Edinburgh Protocol: `canon/edinburgh-protocol.md`
- Silo Manifesto (pending ADR): `_drafts/2026-06-11-silo-manifesto.md`
- Decisions Playbook: `playbooks/decisions-playbook.md`
