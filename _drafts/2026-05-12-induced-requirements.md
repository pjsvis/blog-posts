---
layout: post
title: "Advisory on Requirements Derivation from System Artefacts — Induced vs. Imposed Methodology"
date: 2026-05-12T12:00:00 +0000
published: false
---

# ADVISORY: Requirements Derivation from System Artefacts — Induced vs. Imposed Methodology

**Advisory Reference:** RDM-2025-002
**Issuing Authority:** Office of Silo Architecture and Agentic Systems (OSAAS)
**Effective Date:** 2026-05-12
**Review Date:** 2027-05-12
**Classification:** Internal — Operational Guidance
**Supersedes:** N/A (Initial Issue)

---

## 1. PURPOSE

This advisory is issued to inform all personnel engaged in system design, requirements gathering, and workflow architecture of the distinction between two methodological approaches to requirements derivation: the imposed approach and the induced approach.

It is observed that in the majority of documented system failures, the originating cause is a misalignment between stated requirements and the actual state of the system at time of implementation. This misalignment is a direct consequence of the imposed requirements methodology, in which requirements are generated prior to, or independently of, systematic examination of the target system.

This advisory sets forth the recommended methodology for requirements derivation and identifies the conditions under which the alternative (imposed) methodology may be appropriate.

---

## 2. SCOPE

This advisory applies to:

a. Requirements generation activities for any new system or subsystem within the organizational silo environment
b. Requirements review activities for existing systems undergoing modification
c. Workflow design activities where agentic systems are expected to perform without direct supervisory intervention

This advisory does **not** apply to:

- Regulatory or compliance-driven requirements (which are, by definition, externally imposed and non-negotiable)
- Time-critical requirements where systematic examination is operationally infeasible
- Security-related requirements that cannot be induced from artefacts

Personnel uncertain regarding applicability are advised to consult OSAAS.

---

## 3. DEFINITIONS

For the purposes of this advisory, the following terms are defined:

**Imposed Requirement:** A requirement that exists independently of a systematic examination of the target system. Imposed requirements originate from sources external to the system — including but not limited to management direction, external consultancy, competitive analysis, or industry benchmarking. An imposed requirement exists prior to the system; it is applied to the system from above.

**Induced Requirement:** A requirement that emerges from a systematic examination of the target system. An induced requirement is derived by comparing the system's current state to its documented state, identifying gaps, and formalizing those gaps as requirements. An induced requirement exists because the system exists and exhibits the gap — it is pulled from the artefacts, not applied to them.

**Systematic Examination:** A structured process of reviewing system artefacts — including but not limited to source code, documentation, configuration files, registry entries, and conventions files — for the purpose of establishing the system's current state and identifying gaps between current state and documented requirements.

**Requirement Gap:** A discrepancy between the documented state of the system (as recorded in conventions, specifications, or registry entries) and the actual state of the system (as determined through systematic examination).

**Technical Debt:** The accumulated cost of deviations from system requirements, whether imposed or induced, that have not been formally addressed. Technical debt compounds over time as the deviation between stated requirements and actual system state increases.

---

## 4. FINDINGS

### 4.1. Imposed Requirements Frequently Misalign with System State

It has been consistently observed that imposed requirements — while frequently valid as general principles — tend to misalign with the actual state of the target system upon implementation.

This misalignment is not a failure of the requirement. It is a consequence of the methodology. An imposed requirement is generated without reference to the system's current state. The person or entity generating the requirement does not have direct knowledge of what the system actually does; they have knowledge of what they believe the system should do. These are different things.

The gap between belief and reality is where technical debt lives. The system is built to the requirement. The requirement does not match the system. The deviation is technical debt.

### 4.2. The Working Memory Constraint

Human personnel engaged in requirements gathering are subject to a fundamental cognitive limitation: the finite capacity of working memory.

The systematic examination of a system requires:

a. Knowledge of the full scope of what exists
b. Retention of that scope in working memory
c. Comparison of the scope to a mental model of what should exist
d. Identification of the precise gap between actual and ideal
e. Formulation of the gap as a formal requirement

Steps (a) and (b) are where human personnel consistently underperform. The scope of a codebase or system is typically large; working memory is finite. Human personnel default to the scope of their current task, not the scope of the entire system. The systematic examination required for induced requirements is cognitively expensive and routinely under-resourced.

The traditional mitigation — process documentation, architecture reviews, design specifications — is an attempt to externalize system state so that human personnel can examine it without holding it in working memory. This mitigation is partially effective but introduces a further finding: documentation snapshots are subject to staleness. The documentation describes a system state that existed at the time of writing. As the system changes, the documentation does not.

A stale document is worse than no document: it provides false confidence in the accuracy of the systematic examination.

### 4.3. Agentic Systems Remove the Working Memory Constraint

It is observed that agentic systems operating within the silo environment do not exhibit the working memory constraints described in Section 4.2.

Agentic systems operating with appropriate orientation to the target system are capable of:

- Reading the full scope of the project (subject to time and token constraints)
- Comparing the observed scope to documented conventions
- Identifying gaps between documented and actual system state
- Formulating identified gaps as formal briefs in the same register and language as the project

The agentic system is not performing original design. It is performing systematic induction: the systematic examination described in Section 4.2, executed without the working memory constraint that limits human personnel.

This capability represents a material improvement in the feasibility of induced requirements methodology at operational scale.

### 4.4. Induced Requirements Are More Reliable Than Imposed Requirements

It is observed, through documented case studies within the organizational silo environment, that requirements generated through induced methodology exhibit higher alignment with system state at implementation than requirements generated through imposed methodology.

This finding is consistent with the mechanism described in Section 4.1: induced requirements describe gaps that actually exist. The work has been validated by the system — the gap is real, the requirement is accurate. Imposed requirements describe gaps that are believed to exist; accuracy depends on the accuracy of the belief, which is not independently validated until implementation.

The reliability of induced requirements does not eliminate the human role. The human role is **judgment**: when the agentic system surfaces a gap, the human performs triage — confirming that the gap is real, that the proposed requirement is the correct response, and that the implementation approach is appropriate. The agent surfaces; the human decides. This partnership is the recommended operating model.

---

## 5. RECOMMENDED PRACTICES

### 5.1. Induced Requirements as Default Methodology

All requirements generation activities within the silo environment are advised to begin with induced methodology as the default approach.

Under the induced methodology:

a. The system is examined systematically prior to any requirement generation
b. Gaps between documented and actual system state are identified and recorded
c. Requirements are formulated in response to identified gaps, not in advance of examination
d. All requirements — whether induced or imposed — are reviewed against the examined system state prior to implementation

### 5.2. Agentic System as Systematic Examination Infrastructure

Agentic systems operating within the silo are the primary infrastructure for systematic examination. Personnel are advised to:

a. Ensure that agentic systems performing systematic examination have appropriate orientation to the target system (conventions files read, registry state confirmed, scope established)
b. Require that agentic systems performing systematic examination document the examined scope (what was read, what was compared, what was found)
c. Route identified gaps through the established brief/debrief process for human triage

The brief process is described in the conventions file, Section 4 (Brief Process). The debrief process is described in the conventions file, Section 5 (Debrief Process).

### 5.3. Register as Requirements Infrastructure

The document registry system (`scripts/reg-sync.ts` → `*/INDEX.jsonl`) is the primary infrastructure for systematic examination. The registry provides:

- **Visibility:** When all artefacts are indexed, gaps between documented and actual state are visible through comparison of the registry to the project
- **Feedback:** The registry is updated continuously. Gaps surface as the system changes, not only at initial examination
- **Consistency:** The same language — briefs, debriefs, decisions — is used regardless of requirement origin. The origin does not change the process
- **Audit:** The registry and associated briefs provide a complete history of induced requirements, enabling retrospective assessment of accuracy and completeness

Personnel are advised to ensure that all substantive system artefacts are included in the appropriate registry index. Gaps in the registry are gaps in the systematic examination capability.

### 5.4. When Imposed Requirements Are Appropriate

The imposed methodology is appropriate when:

a. Regulatory or compliance requirements mandate specific functionality regardless of system state
b. Operational constraints preclude systematic examination prior to requirement generation
c. An external authority has issued a requirement that cannot be challenged through the induced process

Imposed requirements shall be reviewed against system state prior to implementation. If the imposed requirement conflicts with system state, the conflict shall be documented and escalated through the established process.

### 5.5. The Partnership Model

The recommended operating model for requirements generation is a partnership between agentic systems and human personnel:

- **Agentic system:** Performs systematic examination, identifies gaps, drafts requirements
- **Human personnel:** Performs triage on identified gaps, approves or rejects requirements, approves implementation

Neither party operates independently. The agentic system surfaces; the human decides. This model preserves the reliability advantages of induced methodology while retaining human judgment at the critical decision point.

---

## 6. COMPLIANCE

### 6.1. Required Actions

The following actions are **required** for all personnel engaged in requirements generation:

a. Adopt induced methodology as the default approach for requirements generation
b. Ensure that agentic systems performing systematic examination have appropriate orientation and documented scope
c. Route all identified requirements through the brief/debrief process for human triage
d. Review all imposed requirements against system state prior to implementation

### 6.2. Exceptions

Requests for exception to the practices recommended in this advisory shall be submitted to OSAAS in writing. Exceptions shall include:

- A description of the operational constraint that precludes induced methodology
- An assessment of the risk associated with the imposed requirement
- A proposed mitigation for the misalignment risk identified in Section 4.1

Exceptions shall be reviewed within 10 business days of submission.

### 6.3. Monitoring

OSAAS shall monitor adherence to recommended practices through periodic review of requirements documentation and implementation outcomes. Non-adherence that results in documented system failures shall be addressed through corrective action.

---

## 7. REFERENCES

- Conventions File, Section 4 (Brief Process)
- Conventions File, Section 5 (Debrief Process)
- Registry System Documentation (`scripts/reg-sync.ts`)
- Advisory AWC-2025-001 (Ephemeral Session Management)
- Advisory RDM-2025-002 (this document)

---

## 8. POINTS OF CONTACT

| Role | Responsibility | Contact |
|------|---------------|---------|
| Issuing Authority | OSAAS, Silo Architecture | Internal |
| Requirements Review | OSAAS, Systems Engineering | Internal |
| Exception Requests | OSAAS, Director | Internal |

---

## 9. ACKNOWLEDGMENT

Personnel are requested to confirm receipt and understanding of this advisory by updating the acknowledgment log maintained in the silo conventions directory.

*This advisory is issued under the authority of OSAAS. Questions regarding content or applicability should be directed to the Points of Contact listed in Section 8.*

---

*Advisory issued: 2026-05-12*
*Next review: 2027-05-12*
*File reference: RDM-2025-002*