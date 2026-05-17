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

Induced methodology is technically superior to imposed methodology — see RDM-2025-002. This does not eliminate the human contribution. The agent surfaces gaps; the human performs triage. This advisory establishes the recommended practices for that function.

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

The agent surfaces requirements through the brief. Human personnel perform triage. Decisions — approved, modified, rejected — are documented with rationale in the debrief. Implementation does not proceed until triage is complete.

Informal verbal approval is not a triage decision.

### 5.2. Triage Criteria

Each surfaced requirement is evaluated against:

**Gap Validity** — Is the gap real? Is the system state correctly assessed?
**Requirement Correctness** — Is this the correct response? Are there better alternatives?
**Implementation Feasibility** — Is the approach feasible given system state and constraints?
**Priority** — Given the full agent surface, is this the correct priority? What is blocked?
**Origin** — Induced or imposed? Do the criteria apply differently?

### 5.3. Compensating for Preference Patterns

**Pattern A personnel** should apply equal scrutiny to induced and imposed requirements, resist approving imposed requirements without evaluation against system state, and recognize that spec clarity does not imply spec accuracy.

**Pattern B personnel** should use agentic systematic examination to extend scope visibility beyond personal working memory, and focus triage on judgment — priority, correctness, feasibility — rather than gap identification.

### 5.4. Prioritizing Large Agent Surfaces

When many requirements surface in one examination cycle:

1. Requirements blocking other requirements (dependency precedence)
2. Requirements addressing known system failures or degraded states
3. Requirements improving system visibility (registry, conventions)
4. Requirements addressing new functionality

---

## RELATED

Advisory RDM-2025-002 (Requirements Derivation — Induced vs. Imposed)
Advisory AWC-2025-001 (Ephemeral Session Management)
Advisory OFV-2025-004 (Agentic Framework Orientation and Asset Location)

---

*Advisory issued: 2026-05-11 | File reference: HAP-2025-003*