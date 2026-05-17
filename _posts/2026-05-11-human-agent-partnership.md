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

**Advisory Reference:** HAP-2025-003
**Issuing Authority:** Office of Silo Architecture and Agentic Systems (OSAAS)
**Effective Date:** 2026-05-11
**Review Date:** 2027-05-11
**Classification:** Internal — Operational Guidance
**Supersedes:** N/A (Initial Issue)
**Related Advisory:** RDM-2025-002 (Requirements Derivation from System Artefacts)

---

## 1. PURPOSE

This advisory is issued as a companion to Advisory RDM-2025-002 (Requirements Derivation from System Artefacts). Whereas RDM-2025-002 addresses the methodology for requirements derivation — specifically the distinction between imposed and induced approaches — this advisory addresses the human role in the induced requirements process.

It is observed that induced requirements methodology, while technically superior to the imposed alternative, does not eliminate the requirement for human judgment. The agentic system surfaces gaps; the human performs triage. This advisory establishes the recommended practices for that triage function.

---

## 2. SCOPE

This advisory applies to:

a. Human personnel engaged in requirements triage within the induced methodology framework
b. Agentic systems operating within the silo environment that surface requirements for human review
c. Workflow configurations in which agentic systems perform systematic examination independently of direct supervisory intervention

This advisory does **not** apply to:

- Imposed requirements that are non-negotiable (regulatory, compliance, or security requirements)
- Requirements that have already received formal human approval through a prior review cycle
- Requirements triage conducted outside the established brief/debrief process

---

## 3. DEFINITIONS

For the purposes of this advisory, the following additional terms are defined:

**Requirements Triage:** The human review process applied to requirements surfaced by agentic systems through systematic examination. Triage determines whether an identified gap is real, whether the proposed requirement is the correct response, and whether the implementation approach is appropriate.

**Agent Surface:** The set of gaps, observations, and proposed requirements produced by an agentic system during systematic examination.

**Human Judgment:** The cognitive function performed during triage — evaluating the agent surface against domain knowledge, operational context, and system state to determine which requirements to approve, modify, or reject.

**Orientation Step:** The process by which an agentic system establishes current system state prior to performing systematic examination. The orientation step is specified in the conventions file, Section 3.

**Triage Record:** The documented output of the requirements triage process, including approved, modified, and rejected requirements with rationale.

---

## 4. FINDINGS

### 4.1. Human Personnel Exhibit Preference Patterns That Affect Triage Quality

It is observed that human personnel engaged in requirements triage exhibit characteristic preference patterns that affect the quality of triage outcomes.

**Pattern A — Preference for Imposed Requirements ("Spec Preference"):**
Some human personnel exhibit a preference for imposed requirements — requirements that exist as specifications prior to systematic examination. This preference is driven by the perception of reduced ambiguity: a spec is a spec; the requirement is clear. This perception is noted to be an illusion. A spec that does not match the system does not reduce ambiguity — it redirects it to the implementation phase, where correction is more expensive. Triage quality under Pattern A preference is frequently high for imposed requirements and low for induced requirements, precisely because the human is performing triage on requirements they already understand rather than requirements the system has identified.

**Pattern B — Preference for Induced Requirements ("System Preference"):**
Other human personnel exhibit a preference for induced requirements — they wish to understand the system before accepting requirements. This preference is noted to be the correct instinct, but is subject to the working memory constraint described in Advisory RDM-2025-002, Section 4.2. Human personnel operating under Pattern B preference understand the local scope of their current task but may not have full scope visibility. Triage quality under Pattern B preference is high for locally scoped gaps and lower for system-level gaps that require breadth of understanding.

Neither pattern is inherently superior. Both represent valid cognitive approaches to triage that have appropriate and inappropriate applications depending on requirement type, system state, and operational context.

### 4.2. The Agentic System Removes Scope Constraints but Does Not Replace Judgment

It is observed that agentic systems performing systematic examination are not subject to the working memory constraints described in Section 4.1. The agent can hold full system scope. It can identify gaps across the full scope of the project. It can formulate requirements that address system-level issues rather than local ones.

However, the agentic system does not possess judgment. It can identify that a gap exists; it cannot determine whether closing that gap is the correct priority given competing demands, resource constraints, or operational context. These are human judgments.

The triage function is the human's essential contribution. Without it, the agent surfaces gaps at equal priority regardless of urgency, importance, or dependency relationships. With it, the agent's surface is filtered, prioritized, and converted into an actionable backlog.

### 4.3. Unstructured Triage Produces Inconsistent Outcomes

It is observed that requirements triage conducted without structured process produces inconsistent outcomes across personnel, over time, and between systems.

Inconsistent outcomes are problematic for several reasons:

- Requirements approved under one triage session may conflict with requirements approved under another, producing implementation conflicts
- The absence of a triage record prevents retrospective assessment of triage quality
- Unstructured triage does not scale — as the agent surface grows, unstructured human filtering becomes a bottleneck

The established brief/debrief process is the recommended structure for requirements triage. This process is described in the conventions file, Sections 4 and 5. Personnel are advised to use the brief process for surfacing requirements and the debrief process for documenting triage decisions and outcomes.

---

## 5. RECOMMENDED PRACTICES

### 5.1. Triage as Formal Process

Requirements triage shall be conducted as a formal process, not an informal review. Under the formal process:

a. The agent surfaces requirements through the brief process (Conventions File, Section 4)
b. Human personnel review the brief and perform triage
c. Triage decisions — approved, modified, or rejected — are documented with rationale in the debrief process (Conventions File, Section 5)
d. Implementation does not proceed until triage is complete

The brief and debrief process ensures that triage decisions are recorded, consistent, and reviewable. Personnel are advised not to proceed to implementation on the basis of informal verbal approval.

### 5.2. Triage Criteria

Human personnel performing requirements triage are advised to evaluate each surfaced requirement against the following criteria:

**a. Gap Validity:** Is the identified gap real? Has the system state been correctly assessed? Is the gap accurately described?

**b. Requirement Correctness:** Is the proposed requirement the correct response to the gap? Are there alternative requirements that would address the gap more effectively or at lower cost?

**c. Implementation Feasibility:** Is the proposed implementation approach feasible given current system state, resource constraints, and operational context?

**d. Priority:** Given the full agent surface, is this requirement the correct priority? What dependencies exist? What is blocked if this requirement is not addressed?

**e. Origin:** Is this an induced requirement (from systematic examination) or an imposed requirement (from external authority)? Do the triage criteria apply differently based on origin?

Personnel are advised to document their evaluation of each criterion in the triage record.

### 5.3. Managing Pattern Preferences

Human personnel are advised to be aware of their own triage preference pattern (as described in Section 4.1) and to compensate accordingly.

Personnel exhibiting Pattern A preference (spec preference) are advised to:

- Apply equal scrutiny to induced and imposed requirements
- Resist the tendency to approve imposed requirements without evaluation against system state
- Recognize that the spec clarity advantage is an illusion when the spec does not match the system

Personnel exhibiting Pattern B preference (system preference) are advised to:

- Leverage agentic system systematic examination to extend scope visibility beyond personal working memory
- Recognize that full scope examination by the agent removes the primary constraint on Pattern B preference
- Focus triage on judgment (priority, correctness, feasibility) rather than gap identification

Neither preference is disqualifying. Both can produce high-quality triage when personnel are aware of their pattern and compensate.

### 5.4. Agent Surface Management

When the agent surface is large — many requirements surfaced in a single examination cycle — personnel are advised to prioritize triage as follows:

a. Requirements that block other requirements (dependency precedence)
b. Requirements that address known system failures or degraded states
c. Requirements that improve system visibility (registry gaps, convention gaps)
d. Requirements that address new functionality

This priority sequence ensures that triage effort is applied where it has the greatest system-level effect. Requirements lower in the sequence may be deferred pending resolution of higher-priority items.

---

## 6. COMPLIANCE

### 6.1. Required Actions

The following actions are **required** for all personnel engaged in requirements triage:

a. Conduct triage through the formal brief/debrief process, not through informal review
b. Document triage decisions with rationale in the debrief record
c. Evaluate all surfaced requirements against the criteria in Section 5.2
d. Acknowledge personal preference pattern and apply compensating scrutiny

### 6.2. Escalation

Triage decisions that result in rejection of a requirement surfaced by an agentic system shall include documented rationale. If the agentic system disagrees with a rejection decision, the disagreement shall be escalated to OSAAS for review.

### 6.3. Monitoring

OSAAS shall monitor triage quality through periodic review of debrief records. Systematic patterns of rejection, modification, or approval that indicate triage quality issues shall be addressed through corrective consultation with the relevant personnel.

---

## 7. REFERENCES

- Conventions File, Section 3 (Agent Orientation Procedure)
- Conventions File, Section 4 (Brief Process)
- Conventions File, Section 5 (Debrief Process)
- Advisory RDM-2025-002 (Requirements Derivation from System Artefacts)
- Advisory HAP-2025-003 (this document)

---

## 8. POINTS OF CONTACT

| Role | Responsibility | Contact |
|------|---------------|---------|
| Issuing Authority | OSAAS, Silo Architecture | Internal |
| Triage Quality Review | OSAAS, Operations | Internal |
| Escalation | OSAAS, Director | Internal |

---

## 9. ACKNOWLEDGMENT

Personnel are requested to confirm receipt and understanding of this advisory by updating the acknowledgment log maintained in the silo conventions directory.

*This advisory is issued under the authority of OSAAS. Questions regarding content or applicability should be directed to the Points of Contact listed in Section 8.*

---

*Advisory issued: 2026-05-11*
*Next review: 2027-05-11*
*File reference: HAP-2025-003*