---
layout: post
title: "Advisory on Two-Mode Silo Agent Architecture"
date: 2026-05-17T12:00:00 +0000
categories: [ai, systems, silo-architecture]
tags: [silo-architecture, agent-modes, developer-mode, visitor-mode, visitor-book]
canonical_target: [substack]
published: false
---

# ADVISORY: Two-Mode Silo Agent Architecture

**Reference:** OSA-2025-005 | Effective: 2026-05-17 | Review: 2027-05-17
**Authority:** Office of Silo Architecture and Agentic Systems (OSAAS)

---

## PURPOSE

Agentic systems operating within the silo have fundamentally different relationships with the project. Some develop it — building, settling, maintaining consistency. Others visit it — observing patterns, identifying drift, providing an external perspective. This advisory establishes the two-mode architecture that governs how agents relate to the silo and produce artefacts within it.

---

## AGENT MODES

### Developer Mode

The agent works within the silo. It builds, settles requirements, maintains conventions, and produces artefacts that become part of the project: code, briefs, decisions, conventions, registry entries.

Developer-mode agents complete full onboarding (see OFV-2025-004, Section 5) and are subject to handoff discipline. Their products require review before acceptance as settled state. The brief/debrief process applies.

**Onboarding:** Full — Edinburgh Protocol, project AGENTS.md, conventions, asset verification, system state confirmation.

**Artefacts:** Briefs, debriefs, decisions, code, conventions, registry entries.

**Handoff:** Required at session termination. Document state and outstanding items. Commit substantive changes to the silo.

---

### Visitor Mode

The agent visits the silo, observes its state, and records observations in the visitor's book. It does not commit to the silo. It does not settle requirements. Its product is the observation.

The visitor's book is the artefact. It contains documented perspectives — observations about patterns, drift, inconsistency, or notable system state — that can be reviewed by anyone, acted upon by developers, or ignored. The correct epistemic weight for a visitor's observation is: *I observed this; you decide.*

**Onboarding:** Context sufficient to observe intelligently. Edinburgh Protocol read; project AGENTS.md read; silo state confirmed to the extent relevant to the observation task. Full onboarding is not required.

**Artefacts:** Visitor's book entry.

**Handoff:** Sign the visitor's book before session termination.

---

## ONBOARDING PROCEDURE

Upon session initiation, agents declare their mode before substantive work begins.

**Developer onboarding:** As specified in OFV-2025-004, Section 5.

**Visitor onboarding:**
a. Read the Edinburgh Protocol (Layer 2)
b. Read the project AGENTS.md (Layer 3)
c. Confirm silo state sufficient for the observation task (branch, high-level structure)
d. Declare observation scope — what will be examined and reported

---

## THE VISITOR'S BOOK

The visitor's book is the persistent record of external observations about the silo. It is not a brief. It does not require action. It is a documented perspective available to all silo participants.

**Format:**
```
# Visitor's Book Entry

**Date:** YYYY-MM-DD
**Visitor Mode:** [observation scope — what was examined]

## Observations

[Documented observations]

## Recommendations (Optional)

[Noted — no obligation to act]
```

**Location:** `visitors/BOOK.md` within the silo root.

Entries are additive. They are not deleted. A visitor's observation that is not acted upon remains in the record — it may be revisited, or it may stand as evidence of a gap that was known and not addressed.

---

## MODE BOUNDARIES

An agent may transition from visitor to developer within a session, or across sessions. Transitions are explicit:

- **Visitor → Developer:** Complete developer onboarding before producing developer-mode artefacts. The visitor's observations are preserved; the mode changes.
- **Developer → Visitor:** Sign the visitor's book before producing visitor-mode artefacts. Outstanding developer work is handoff'd or committed before the transition.

The mode boundary is not administrative friction. It is the mechanism by which the silo maintains clarity about which artefacts belong to which relationship.

---

## ON ADDITIONAL MODES

Two is the core. Additional modes are permitted only where they describe a genuinely distinct relationship with the silo — not merely a different activity within the same relationship.

The threshold for a new mode:

- Does this mode require a fundamentally different onboarding procedure?
- Does it produce a different artefact type?
- Does it carry a different set of silo commitments?

If the answer to all three is yes, the mode may be added — via ADR, with documented reasoning. If the answer to any question is no, the proposed mode is a task variant within an existing mode, not a new mode.

---

## RELATED

Advisory OFV-2025-004 (Agentic Framework Orientation and Asset Location)
Advisory HAP-2025-003 (Human-Agent Partnership in Requirements Triage)
Advisory RDM-2025-002 (Requirements Derivation — Induced vs. Imposed)
Advisory AWC-2025-001 (Ephemeral Session Management)

---

*Advisory issued: 2026-05-17 | File reference: OSA-2025-005*