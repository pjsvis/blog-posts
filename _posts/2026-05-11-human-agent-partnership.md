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

Induced methodology is technically superior to imposed methodology (see RDM-2025-002), but it does not eliminate the requirement for human judgment. The agent surfaces gaps; the human performs triage. This advisory establishes the recommended practices for that triage function.

---

## FINDINGS

### 4.1. Humans Have Characteristic Triage Preferences

**Pattern A — Spec Preference:**
Some personnel prefer imposed requirements because a spec is unambiguous: it is clear, it exists, the requirement is stated. This preference produces high triage quality for imposed requirements and lower quality for induced requirements — the human is evaluating requirements they already understand. The apparent clarity of the spec is an illusion when the spec does not match the system.

**Pattern B — System Preference:**
Other personnel prefer to understand the system before accepting requirements. This is the correct instinct but subject to the working memory constraint: personnel understand their local scope but not necessarily the full system scope. Triage quality is high for locally scoped gaps and lower for system-level gaps that require breadth of understanding.

Neither pattern is inherently superior. Both have appropriate and inappropriate applications depending on requirement type, system state, and context.

### 4.2. Agents Remove Scope Constraints, Not Judgment

Agentic systems performing systematic examination hold full system scope — they identify gaps across the entire project, not just the current task. But the agent cannot determine whether closing a gap is the correct priority given competing demands, resource constraints, or operational context. These remain human judgments.

Without triage, the agent surfaces gaps at equal priority regardless of urgency, importance, or dependencies. With triage, the agent surface is filtered, prioritized, and converted into an actionable backlog.

### 4.3. Unstructured Triage Produces Inconsistent Outcomes

Requirements triage without structured process produces inconsistent outcomes across personnel, over time, and between sessions. Approved requirements from one triage may conflict with those from another; the absence of a record prevents retrospective assessment; unstructured triage does not scale as the agent surface grows. Use the brief/debrief process.

---

## RECOMMENDED PRACTICES

### 5.1. Triage as Formal Process

Triage proceeds through the brief/debrief structure, not informal review:

a. The agent surfaces requirements through the brief process
b. Human personnel review and perform triage
c. Decisions — approved, modified, rejected — are documented with rationale in the debrief
d. Implementation does not proceed until triage is complete

### 5.2. Triage Criteria

Evaluate each surfaced requirement against:

**Gap Validity** — Is the gap real? Is the system state correctly assessed?
**Requirement Correctness** — Is the proposed requirement the correct response? Are there better alternatives?
**Implementation Feasibility** — Is the approach feasible given system state and constraints?
**Priority** — Given the full agent surface, is this the correct priority? What is blocked?
**Origin** — Induced (from examination) or imposed (from authority)? Do criteria apply differently?

### 5.3. Compensating for Preference Patterns

**Pattern A personnel** should: apply equal scrutiny to induced and imposed requirements; resist approving imposed requirements without evaluation against system state; recognize that spec clarity is an illusion when the spec does not match the system.

**Pattern B personnel** should: use agentic systematic examination to extend scope visibility beyond personal working memory; focus triage on judgment (priority, correctness, feasibility) rather than gap identification.

### 5.4. Managing Large Agent Surfaces

When many requirements surface in one examination cycle, triage in this order:

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