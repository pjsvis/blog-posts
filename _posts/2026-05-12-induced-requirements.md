---
layout: post
title: "Advisory on Requirements Derivation from System Artefacts — Induced vs. Imposed Methodology"
date: 2026-05-12T12:00:00 +0000
categories: [ai, systems, requirements]
tags: [induced-requirements, imposed-requirements, requirements-derivation, edinburgh-protocol]
canonical_target: [substack]
published: false
---

# ADVISORY: Requirements Derivation from System Artefacts — Induced vs. Imposed Methodology

**Reference:** RDM-2025-002 | Effective: 2026-05-12 | Review: 2027-05-12
**Authority:** Office of Silo Architecture and Agentic Systems (OSAAS)

---

## PURPOSE

Most system failures originate in a misalignment between stated requirements and actual system state at implementation. This misalignment is a consequence of the methodology: imposed requirements are applied from outside, without examination of the system. This advisory establishes induced methodology as the default.

**Imposed:** Generated independently of the system. Applied from above.
**Induced:** Derived from systematic examination of the system. The gap is real; the requirement is pulled from artefacts, not pushed onto them.

---

## FINDINGS

### 4.1. Imposed Requirements Misalign

An imposed requirement is generated without reference to the system's current state. The generator knows what they believe the system should do — not what it actually does. These are different things. The system is built to the requirement. The requirement does not match the system. The deviation is technical debt.

### 4.2. Working Memory Constrains Human Examination

Systematic examination of a system requires holding full scope in working memory. Scope is large; working memory is finite. Human personnel default to the scope of their current task, not the scope of the entire system. This is not a character flaw — it is a cognitive architecture constraint.

The traditional mitigation (process docs, architecture reviews, specs) attempts to externalize scope so humans can examine it without holding it. Partial effectiveness — but documentation snapshots are subject to staleness. A stale document provides false confidence. A spec that does not match the system redirects ambiguity to the implementation phase, where correction is more expensive.

### 4.3. Agentic Systems Remove This Constraint

Agentic systems operating with appropriate orientation can read the full project scope, compare it to documented conventions, identify gaps, and draft requirements — without working memory constraints. The agent is not designing; it is performing systematic induction: examination executed without the cognitive ceiling that limits human personnel.

### 4.4. The Human Role: Judgment

Induced requirements do not eliminate the human role. The agent surfaces gaps; the human performs triage — confirming the gap is real, the requirement is correct, and the implementation approach is appropriate. Agentic systems cannot determine priority given competing demands, resource constraints, or operational context. These are human judgments. The agent surfaces; the human decides.

---

## RECOMMENDED PRACTICES

### 5.1. Induced Methodology as Default

All requirements generation begins with systematic examination of the target system:

a. Examine the system before generating requirements — not after
b. Identify and record gaps between documented and actual state
c. Formulate requirements in response to identified gaps
d. Review all requirements — induced or imposed — against the examined system state before implementation

### 5.2. Agentic Systems as Examination Infrastructure

Agents performing systematic examination must have appropriate orientation (conventions read, registry state confirmed, scope established) and must document the examined scope — what was read, compared, and found. Identified gaps route through the brief/debrief process for human triage.

### 5.3. The Document Registry as Infrastructure

The registry system (`scripts/reg-sync.ts` → `*/INDEX.jsonl`) is the primary examination infrastructure:

- **Visibility:** Index comparison surfaces gaps between documented and actual state
- **Feedback:** Continuous updates mean gaps surface as the system changes, not only at initial examination
- **Audit:** Complete history of induced requirements enables retrospective assessment

Gaps in the registry are gaps in examination capability.

### 5.4. When Imposed Requirements Are Appropriate

The imposed methodology applies when: regulatory or compliance requirements mandate functionality regardless of system state; operational constraints preclude systematic examination; an external authority has issued a non-challengeable requirement. All imposed requirements are reviewed against system state before implementation. Conflicts are documented and escalated.

---

## RELATED

Advisory AWC-2025-001 (Ephemeral Session Management)
Advisory HAP-2025-003 (Human-Agent Partnership in Requirements Triage)
Advisory OFV-2025-004 (Agentic Framework Orientation and Asset Location)

---

*Advisory issued: 2026-05-12 | File reference: RDM-2025-002*