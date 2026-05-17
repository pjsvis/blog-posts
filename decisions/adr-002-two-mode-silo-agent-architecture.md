# ADR-002: Two-Mode Silo Agent Architecture

**Date:** 2026-05-17
**Status:** Accepted

## Context

Agentic systems operating within the silo have fundamentally different relationships with the project. Some agents develop the silo — building, settling requirements, maintaining conventions. Others visit the silo — observing patterns, identifying drift, providing an external perspective. The mode system must accommodate both relationships cleanly.

The question arose during a review of the onboarding advisory (OFV-2025-004): the orientation procedure was written for agents who would work in the silo, but the silo also benefits from agents who visit it. These are not the same task. They do not require the same onboarding depth, produce the same artefacts, or carry the same responsibilities.

A mode taxonomy was needed. The constraint: it must be legible to both agents and humans, and it must not grow complexity faster than it solves it.

## Decision

The silo supports two primary agent modes:

**Developer Mode** — The agent works within the silo. It maintains consistency, settles requirements, and produces artefacts that become part of the project: code, briefs, decisions, conventions, registry entries. It is subject to handoff discipline, and its products require review before they are accepted as settled state.

**Visitor Mode** — The agent visits the silo, observes its state, and records observations in the visitor's book. It does not commit to the silo. It does not settle requirements. Its product is the observation: a documented perspective that can be reviewed by anyone, acted upon by developers, or ignored. The visitor's book is the artefact.

Additional modes are permitted only where they describe a genuinely distinct relationship with the silo — not merely a different activity within the same relationship. The threshold for a new mode is: *does this mode require a fundamentally different onboarding procedure, a different artefact type, and a different set of silo commitments?* If not, it is a task variant, not a mode.

The "2+N" notation reflects this: two modes is the core; N is justified only by genuinely distinct relationships.

## Alternatives Considered

| Alternative | Why Rejected |
|-------------|--------------|
| **Mode taxonomy with plan/execute/weird variants** | Describes activity types, not relationships with the silo. A developer operating in plan mode is still a developer. The taxonomy adds complexity without adding clarity. |
| **Single-mode (all agents are developers)** | Eliminates the visitor relationship entirely. External observation — the clean perspective, the pattern identification, the big-picture review — has no home. Developers can observe, but observation is not their mode; it is a secondary activity in a mode designed for settlement. |
| **Mode by task rather than by relationship** | Defines modes by what the agent does (write, review, test, deploy) rather than by how it relates to the silo (develop, visit). Task-based modes scale with the number of task types. Relationship-based modes scale with the number of distinct silo commitments. The latter grows more slowly. |

## Consequences

**What became easier:**
- Onboarding procedure is mode-specific: developers receive full orientation; visitors receive context sufficient to observe intelligently
- Artefact ownership is clear: developer products enter the silo; visitor products enter the visitor's book
- Human review is structured: developer outputs go through brief/debrief; visitor outputs go through the visitor's book
- Mode transitions are explicit: an agent moving from visitor to developer completes developer onboarding

**What became harder:**
- Mode boundaries require judgment in edge cases (an agent that observes and then develops — which mode applies first?)
- The visitor's book is a new artefact type that requires a defined format and location
- Additional modes, if added, must pass the relationship-distinction threshold — this is a constraint, not a ceiling

**Constraints this imposes:**
- All agents entering the silo must declare their mode before substantive work
- Developer-mode agents must complete handoff before session termination
- Visitor-mode agents must sign the visitor's book before session termination
- A new mode requires an ADR before it can be added to the taxonomy

## Related

- Advisory: `OFV-2025-004` (Agentic Framework Orientation and Asset Location)
- Advisory: `HAP-2025-003` (Human-Agent Partnership in Requirements Triage)
- Advisory: `RDM-2025-002` (Requirements Derivation — Induced vs. Imposed)
- Epic: `briefs/epic-osaas-advisory-series.md`