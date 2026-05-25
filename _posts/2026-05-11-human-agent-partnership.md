---
layout: post
title: "Advisory on Human-Agent Partnership in Requirements Triage and Induced Methodology"
date: 2026-05-11T12:00:00 +0000
categories: [ai, systems, requirements]
tags: [human-agent-partnership, induced-requirements, triage, edinburgh-protocol]
canonical_url: https://pjsvis.github.io/blog-posts/posts/2026-05-11-human-agent-partnership/
canonical_target: [substack]
published: false
---

# ADVISORY: Human-Agent Partnership in Requirements Triage and Induced Methodology

**Reference:** HAP-2025-003 | Effective: 2026-05-11 | Review: 2027-05-11
**Authority:** Office of Silo Architecture and Agentic Systems (OSAAS)
**Companion to:** RDM-2025-002

---

## PURPOSE

Tensegrity is the structural principle preferred by living systems. A tensegrity structure — struts under compression, cables under tension — achieves stability not through the strength of individual components but through the relationship between them. The integrity is in the arrangement. It is not what you have; it is how you put it together.

A software system under continuous development is, if designed well, a tensegrity structure. Its requirements fall into three categories that function as the structural elements:

**Enable** — The compression struts. Without them, the structure collapses. Not about quality; about existence.

**Strengthen** — The tension cables. They maintain shape under load. The feature works; it must work deterministically. Remove them and the struts stand but will buckle under stress.

**Enhance** — Decorative elements, structurally optional. They may improve aesthetics or function; they cannot save a broken structure.

Triage — the continuous process of evaluating and categorizing requirements — is the mechanism by which the system's tensegrity is maintained. The goal is not to fill the categories in order; it is to maintain the right relationships between them. A system with Enable and no Strengthen is a standing structure that will fail under load. A system with Strengthen and no Enable has nothing to strengthen.

Induced methodology generates requirements through systematic examination of the system — see RDM-2025-002. The agent surfaces gaps; the human maintains the tensegrity. This advisory establishes the recommended practices for that function.

---

## FINDINGS

### 4.1. The Categories Are Structural, Not Sequential

The three categories — Enable, Strengthen, Enhance — are commonly treated as a sequence: fill Enable first, then Strengthen, then Enhance. This is wrong. They are structural roles. The sequence interpretation produces systems that are technically complete but unreliable under load — features exist, but they do not work deterministically.

A healthy system maintains its tensegrity. Enable and Strengthen must be in equilibrium: enough Enable to give Strengthen something to work on, enough Strengthen to prevent the Enable layer from buckling under stress. Enhance is genuinely optional — structurally inert, but potentially valuable.

The risk is not that Enhance gets ignored. The risk is that Strengthen is perpetually deferred while Enable grows. The cables stretch. The structure will stand — until it doesn't.

### 4.2. Human Personnel Have Characteristic Triage Preferences

These patterns are consistent enough to have been documented. They are not character flaws. They are cognitive tendencies with predictable effects on triage quality.

**Pattern A — Spec Preference:**
Some personnel prefer imposed requirements. A spec is unambiguous: it exists, it is stated, the requirement is clear. This is appealing. What is less appreciated is that the spec's clarity is a property of the spec — not a property of its relationship to the system. A spec that does not match the system redirects ambiguity to the implementation phase. Triage quality under Pattern A is high for imposed requirements and lower for induced requirements, precisely because imposed requirements are already understood before examination begins.

**Pattern B — System Preference:**
Other personnel prefer to understand the system before accepting requirements. This is the correct instinct, subject to a constraint: working memory is finite. Personnel operating under Pattern B understand their local scope. Full system scope is harder to hold. Triage quality is high for locally scoped gaps and lower for system-level gaps that require breadth of understanding.

Neither pattern is inherently superior. Both have appropriate applications and failure modes. Awareness of one's own pattern allows for compensating scrutiny.

### 4.3. Agents Remove Scope Constraints; They Do Not Have Judgment

Agentic systems performing systematic examination hold full system scope. They identify gaps across the entire project. They do not have working memory constraints.

They also do not have judgment. They can determine that a gap exists. They cannot determine whether closing that gap is the correct action given competing demands, resource constraints, or operational context — and they certainly cannot assess whether the structural relationship between Enable, Strengthen, and Enhance remains in equilibrium. These are human contributions.

Without human triage, the agent surfaces gaps at equal priority regardless of structural role. With it, the surface is categorized and the system's tensegrity is maintained.

The agent surfaces. The human maintains the structure.

### 4.4. Unstructured Triage Produces Structural Drift

Requirements triage without structure produces inconsistent outcomes across personnel, over time, and between sessions. The structural relationships between categories are not maintained; the tensegrity degrades.

Approved requirements from one triage may conflict with those from another. Strengthen-level requirements are deferred indefinitely while Enable-level requirements accumulate. Without a record, the drift is not visible until the structure buckles.

The brief/debrief process is the recommended structure for maintaining the system's tensegrity. Use it.

---

## RECOMMENDED PRACTICES

### 5.1. Triage Through the Brief/Report Process

The agent surfaces requirements through the brief. Human personnel perform triage — assigning each requirement a structural category. Decisions, including category assignment, are documented with rationale in the debrief. The structural relationship between categories is assessed at each triage cycle, not assumed to be stable.

Informal verbal approval is not a triage decision.

### 5.2. The Three Structural Categories

**Enable** — The compression struts. If this does not work, there is nothing to do. No qualification, no deferral. Without this, no downstream feature matters. Assign this category when the feature's absence makes the system non-functional or unsafe.

**Strengthen** — The tension cables. If this works, it must work deterministically. The feature exists; quality determines whether the system is worth using. The determinism constraint is non-negotiable — a feature that works unreliably is not strengthening the system; it is weakening it by introducing unpredictable failure under load. Assign this category when the feature exists and its reliability is the issue.

**Enhance** — Decorative elements. If this could be enhanced, let's think about it. The feature is functional; enhancement is optional. Not a rejection — a deferral. Addressed last, if capacity permits and the value justifies the cost.

### 5.3. Triage Criteria

Within each category, secondary evaluation applies:

**Gap Validity** — Is the gap real? Is the system state correctly assessed?
**Structural Role** — Enable, Strengthen, or Enhance? Does the category assignment reflect the feature's actual structural contribution?
**Determinism** — For Strengthen assignments: what does deterministic mean for this feature? Is the current state deterministic, or is the requirement to make it so?
**Relationship** — Given the full agent surface, are Enable and Strengthen in equilibrium? Is one layer growing while the other is deferred?
**Origin** — Induced (from examination) or imposed (from authority)? Does the category assignment differ?

### 5.4. Triage Frequency

Triage is not a one-time event. It is a continuous process.

The structural relationship between categories changes as the system evolves. New Enable features change what needs to be Strengthened. Accumulated deferred Strengthen requirements stretch the cables. The trigger for a triage cycle is not a calendar — it is a change in system state, resource availability, or structural relationship that may alter category assignments.

Monthly minimum. Weekly under volatile conditions. When triage is deferred, the structure drifts silently.

### 5.5. Compensating for Preference Patterns

**Pattern A personnel** should apply equal scrutiny to induced and imposed requirements, resist approving imposed requirements without evaluation against system state, and recognize that spec clarity does not imply structural correctness. Pattern A tends to assign requirements to Enable — verify that the category reflects the feature's structural role, not its stated authority.

**Pattern B personnel** should use agentic systematic examination to extend scope visibility beyond personal working memory, and focus triage on the structural relationship between categories — not just whether individual gaps are real.

### 5.6. Managing Large Agent Surfaces

When many requirements surface in one examination cycle, assess structural relationships first:

1. Enable requirements that block other structural requirements (dependency precedence)
2. Strengthen requirements for Enable features that currently exist but lack deterministic behavior (cables for existing struts)
3. Strengthen requirements for features at risk of becoming non-deterministic as the system evolves
4. Enhance requirements (structurally optional)
5. New Enable requirements (struts for new structural additions)

---

## RELATED

Advisory RDM-2025-002 (Requirements Derivation — Induced vs. Imposed)
Advisory AWC-2025-001 (Ephemeral Session Management)
Advisory OFV-2025-004 (Agentic Framework Orientation and Asset Location)

---

*Advisory issued: 2026-05-11 | File reference: HAP-2025-003*