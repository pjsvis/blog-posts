# Debrief: OSAAS Advisory Series — Agentic Workflow Architecture

**Date:** 2026-05-17
**Epic:** epic-osaas-advisory-series.md

---

## Summary

Moved 4 advisory-style blog posts from `_drafts/` to `_posts/` and published as Substack drafts. The series uses fictional "OSAAS" (Office of Silo Architecture and Agentic Systems) government-advisory format to explain real concepts: ephemeral sessions, induced vs. imposed requirements, human-agent partnership in triage, and agent orientation.

Second iteration: rewrote all 4 posts in 7-of-9 register — factual, precise, quiet absurdity, no performance. Culled old Substack drafts and republished updated versions.

Third iteration: established two-mode silo agent architecture (ADR-002) and documented it as advisory OSA-2025-005. Initiated visitor's book at `visitors/BOOK.md`.

## What Was Done

- **2026-05-11-context-windows-and-session-reset** → Advisory AWC-2025-001
- **2026-05-11-human-agent-partnership** → Advisory HAP-2025-003
- **2026-05-12-induced-requirements** → Advisory RDM-2025-002
- **2026-05-12-pi-silo-onboarding-assets** → Advisory OFV-2025-004

## Substack Drafts Created

| Post | Draft URL |
|------|-----------|
| The Architecture of Consistency | https://petersmith154047.substack.com/publish/drafts/198132223 |
| Human-Agent Partnership | https://petersmith154047.substack.com/publish/drafts/198132225 |
| Induced vs. Imposed Requirements | https://petersmith154047.substack.com/publish/drafts/198132226 |
| Agentic Framework Orientation | https://petersmith154047.substack.com/publish/drafts/198132228 |
| Ephemeral Session Management | https://petersmith154047.substack.com/publish/drafts/198132231 |

## Decisions Made

- **ADR-002: Two-mode silo architecture:** Developer mode (build, settle, handoff) and visitor mode (observe, sign visitor's book). Threshold for additional modes: genuinely distinct relationship, not merely different activity. Documented in `decisions/adr-002-two-mode-silo-agent-architecture.md`.
- **Tone: 7-of-9 register:** All 4 advisories rewritten in factual, precise, quiet-absurdity voice. Dry observations over performed wit. The reader supplies the eyebrow.
- **Visitor's book:** New artefact type at `visitors/BOOK.md`. Visitor-mode agents observe, document, sign. No commitment, no settlement. Observations are available to all, acted upon by developers, or ignored. Renamed from `2026-05-11-induced-requirements.md` to `2026-05-11-human-agent-partnership.md` to match its advisory reference number. The draft body already referenced HAP-2025-003 correctly.
- **Existing post included:** `the-architecture-of-consistency` has `canonical_target: [substack, medium]` so it was naturally included in the push. It is `published: false` so Substack will create a draft only.

## Notes

- `publish-substack.ts` strips the H1 title from body when creating drafts (already handled)
- Cross-references between advisories (AWC ↔ RDM ↔ HAP ↔ OFV ↔ OSA) are intentional
- The advisory format is the hook; content is substantive Edinburgh Protocol / silo discipline material
- OSA-2025-005 (two-mode architecture) is in `_drafts/` — not yet staged for publication

## Next Steps

- Stage OSA-2025-005 to `_posts/` and publish to Substack
- Review and publish existing drafts in Substack editor
- Export to Medium from `_exported/medium/` (after Substack publishes)
- Consider Twitter thread for the architecture-of-consistency post

## Agent Concepts Folder — 2026-05-17

Built `agent/concepts/` — a collection of 11 discrete concept files that document the silo's terminology and relationships. Each concept is a named thing: silo, onboarding, agent-modes, edinburgh-protocol, triage, tensegrity, conceptual-entropy, visitor-book, brief-debrief, justfile, registry.

The organizing principle: discrete rooms, not a stream. An agent reads one, decides if it applies, moves on. No flowchart required.

Orientation script at `agent/orient.sh`:
- `./orient.sh` — list all concepts
- `./orient.sh triage` — structural concepts
- `./orient.sh process` — process concepts
- `./orient.sh identity` — identity concepts
- `./orient.sh [name]` — read specific concept

Also dropped the justfile reference from the-return-of-the-palm-pilot.md — replaced with "command vocabulary" for broader legibility.
