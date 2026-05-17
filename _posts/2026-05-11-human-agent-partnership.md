---
layout: post
title: "Advisory on Human-Agent Partnership in Requirements Triage and Induced Methodology"
date: 2026-05-11T12:00:00 +0000
categories: [ai, systems, requirements]
tags: [human-agent-partnership, induced-requirements, triage, edinburgh-protocol]
canonical_target: [substack]
published: false
---

# ADVISORY: Human-Agent Partnership in Requirements Triage and Induced Methodology

**Reference:** HAP-2025-003 | Effective: 2026-05-11 | Review: 2027-05-11
**Authority:** Office of Silo Architecture and Agentic Systems (OSAAS)
**Companion to:** RDM-2025-002

---

## PURPOSE

Triage is the continuous process of evaluating, categorizing, and prioritizing requirements based on their criticality, impact, and urgency — ensuring that limited development resources are allocated to the most vital features.

The methodology divides requirements into three categories:

**Enable** — If this does not work, there is nothing to do. The feature is foundational: without it, no downstream feature matters. Not about quality; about existence. These receive resources first.

**Strengthen** — If this works, it must work deterministically. The feature exists and the system survives, but quality determines whether the system is worth using. These are addressed once enable-level requirements are settled, and the determinism constraint is non-negotiable.

**Enhance** — If this could be enhanced, let's think about it. The feature is functional; enhancement is optional. Not a rejection — a deferral. Addressed last, if capacity permits and the value justifies the cost.

Induced methodology — see RDM-2025-002 — generates requirements through systematic examination of the system. The agent surfaces gaps; the human performs triage. This advisory establishes the recommended practices for that function.

Project environments are volatile. Initial estimates are frequently inaccurate. Triage must therefore be performed early and often — not only at project outset, but continuously as system state, market conditions, and resource availability change. The goal is a realistic roadmap aligned with business value and technical feasibility: the most significant user needs delivered first.

---

## FINDINGS

### 4.1. Human Personnel Have Characteristic Triage Preferences

These patterns are consistent enough to have been documented. They are not character flaws. They are cognitive tendencies with predictable effects on triage quality.

**Pattern A — Spec Preference:**
Some personnel prefer imposed requirements. A spec is unambiguous: it exists, it is stated, the requirement is clear. This is appealing. What is less appreciated is that the spec's clarity is a property of the spec — not a property of its relationship to the system. A spec that does not match the system redirects ambiguity to the implementation phase. Triage quality under Pattern A is high for imposed requirements and lower for induced requirements, precisely because imposed requirements are already understood before examination begins.

**Pattern B — System Preference:**
Other personnel prefer to understand the system before accepting requirements. This is the correct instinct, subject to a constraint: working memory is finite. Personnel operating under Pattern B understand their local scope. Full system scope is harder to hold. Triage quality is high for locally scoped gaps and lower for system-level gaps that require breadth of understanding.

Neither pattern is inherently superior. Both have appropriate applications and failure modes. Awareness of one's own pattern allows for compensating scrutiny.

### 4.2. Agents Remove Scope Constraints; They Do Not Have Judgment

Agentic systems performing systematic examination hold full system scope. They identify gaps across the entire project. They do not have working memory constraints.

They also do not have judgment. They can determine that a gap exists. They cannot determine whether closing that gap is the correct action given competing demands, resource constraints, or operational context. These are human contributions. Without them, the agent surfaces gaps at equal priority regardless of urgency or dependencies. With them, the surface is filtered and converted into an actionable backlog.

The agent surfaces. The human decides.

### 4.3. Unstructured Triage Produces Inconsistent Outcomes

Requirements triage without structure produces inconsistent outcomes across personnel, over time, and between sessions. Approved requirements from one triage may conflict with those from another. Without a record, retrospective assessment is not possible. As the agent surface grows, unstructured human filtering becomes a bottleneck.

The brief/debrief process is the recommended structure. Use it.

---

## RECOMMENDED PRACTICES

### 5.1. Triage Through the Brief/Report Process

The agent surfaces requirements through the brief. Human personnel perform triage — categorizing each requirement as die, wounded, or bells and whistles. Decisions, including category assignment, are documented with rationale in the debrief. Implementation does not proceed until triage is complete.

Informal verbal approval is not a triage decision.

### 5.2. Triage Categories

Each surfaced requirement is assigned one of three categories:

**Enable** — Foundation. No qualification, no deferral. Without this, nothing else matters.

**Strengthen** — Deterministic quality. The feature works; it must work reliably. Addressed after enable requirements are settled.

**Enhance** — Optional improvement. Not a rejection; a deferral. Addressed last, if resource permits.

Category assignment is the primary triage act. It determines when the requirement is addressed, not whether it is addressed. All three categories represent decisions — including the decision to place a requirement in bells and whistles.

### 5.3. Triage Criteria

Within each category, secondary evaluation applies:

**Gap Validity** — Is the gap real? Is the system state correctly assessed?
**Requirement Correctness** — Is this the correct response? Are there better alternatives?
**Implementation Feasibility** — Is the approach feasible given system state and constraints?
**Urgency** — How has the gap changed since last triage? Has context shifted?
**Origin** — Induced (from examination) or imposed (from authority)? Does the category assignment differ?

### 5.4. Triage Frequency

Triage is not a one-time event. It is a continuous process.

Triage cycles occur monthly at minimum, weekly under volatile conditions. The trigger is not a calendar — it is a change in system state, resource availability, or market conditions that may alter category assignments or priorities.

When triage is deferred, the backlog accumulates gaps at equal priority regardless of urgency, dependencies, or importance. This is not a neutral state. It is a backlog that will produce last-minute crises where die-level features are scrapped to meet deadlines.

### 5.5. Compensating for Preference Patterns

**Pattern A personnel** should apply equal scrutiny to induced and imposed requirements, resist approving imposed requirements without evaluation against system state, and recognize that spec clarity does not imply spec accuracy. Pattern A tends to assign requirements to die — verify that the assigned category reflects system impact, not just stated authority.

**Pattern B personnel** should use agentic systematic examination to extend scope visibility beyond personal working memory, and focus triage on judgment — priority, category assignment, feasibility — rather than gap identification.

### 5.6. Managing Large Agent Surfaces

When many requirements surface in one examination cycle, triage in this order:

1. Requirements blocking other requirements (dependency precedence)
2. Requirements addressing known system failures or degraded states (die-level)
3. Requirements improving system visibility (registry, conventions — these affect triage accuracy)
4. Requirements addressing new functionality (wounded or bells and whistles)

---

## RELATED

Advisory RDM-2025-002 (Requirements Derivation — Induced vs. Imposed)
Advisory AWC-2025-001 (Ephemeral Session Management)
Advisory OFV-2025-004 (Agentic Framework Orientation and Asset Location)

---

*Advisory issued: 2026-05-11 | File reference: HAP-2025-003*