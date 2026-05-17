---
layout: post
title: "Advisory on Agentic Framework Orientation and Asset Location Verification for Silo Onboarding"
date: 2026-05-12T12:00:00 +0000
published: false
---

# ADVISORY: Agentic Framework Orientation and Asset Location Verification for Silo Onboarding

**Advisory Reference:** OFV-2025-004
**Issuing Authority:** Office of Silo Architecture and Agentic Systems (OSAAS)
**Effective Date:** 2026-05-12
**Review Date:** 2027-05-12
**Classification:** Internal — Technical Onboarding
**Supersedes:** N/A (Initial Issue)

---

## 1. PURPOSE

This advisory is issued to establish the recommended practices for agentic system orientation upon entry into a silo environment, and to document the asset location hierarchy that governs where agentic systems locate identity, configuration, and skill files during a session.

It is observed that agentic systems operating without appropriate orientation produce outputs that are inconsistent with project conventions, that reference assets that do not exist at the stated location, or that operate from incorrect assumptions about system state. This advisory addresses the root cause: inadequate orientation to the silo environment upon session initiation.

---

## 2. SCOPE

This advisory applies to:

a. All agentic systems operating within the silo environment
b. Configuration and identity files used by agentic systems at session initiation
c. Skill files and extensions referenced by agentic systems during a session
d. Personnel responsible for maintaining the asset location hierarchy within the silo

This advisory does **not** apply to:

- Agentic systems operating outside the silo environment (unaffiliated sessions)
- Systems where the asset location hierarchy has been explicitly overridden by project configuration
- One-shot commands where orientation is operationally infeasible (e.g., single-turn CLI invocations)

---

## 3. DEFINITIONS

For the purposes of this advisory, the following terms are defined:

**Silo:** The persistent project directory structure, including source code, configuration, documentation, and conventions files. The silo is the authoritative source of project state. Sessions operate within the silo boundary.

**Onboarding (Orientation):** The process by which an agentic system establishes current system state upon session initiation. Onboarding includes reading identity files, conventions files, and establishing the asset location map for the current session.

**Asset Location Hierarchy:** The layered resolver system that determines where an agentic system locates identity, configuration, skill, and documentation files during a session. The hierarchy operates from global to repo level, with later layers potentially overriding earlier ones.

**Edinburgh Protocol:** The organizational identity framework defining the agent's operating principles, philosophical stance, and behavioral norms. The Edinburgh Protocol is defined in the global identity file and may be supplemented by project-specific rules.

**Identity Layer:** The set of files that define who the agent is and how it operates. The identity layer has two components: the global identity (platform-level) and the project identity (silo-level). The project identity overrides the global identity for sessions within the silo.

**Skill File:** A structured documentation file that provides guidance on the use of a specific capability or tool within the silo environment. Skill files are referenced by agentic systems during session operation.

**Silo Discipline:** The principle that agentic systems operate within the repository boundary and do not reference or modify files outside the silo without explicit authorization. The phrase "I'm staying in" is the recognized expression of silo discipline compliance.

---

## 4. ASSET LOCATION HIERARCHY

### 4.1. Overview

The asset location hierarchy for agentic systems operating within the silo environment follows a four-layer model. Each layer may contain files that affect the agent's behavior. Later layers may override earlier ones.

The hierarchy is defined as follows (in resolution order, earliest to latest):

| Layer | Designation | Location | Contents |
|-------|------------|----------|----------|
| 1 | Global Platform | `/{pi-installation}/` | Framework binaries, package documentation, SDK reference |
| 2 | Global Identity | `~/.pi/agent/` | Edinburgh Protocol, global operational guidelines |
| 3 | Project Identity | `{silo-root}/` | Project-specific rules, conventions, AGENTS.md |
| 4 | Session Config | `{silo-root}/.claude/` | Skills, extensions, session-level configuration |

### 4.2. Layer 1 — Global Platform

The global platform layer contains the agentic framework binary and associated package documentation. This layer is established at installation time and is not modified by session activity.

| Asset | Location | Purpose |
|-------|----------|---------|
| Framework binary | Platform-dependent | Primary entry point for agentic system |
| Package root | Platform-dependent | Contains `docs/`, `examples/`, and `README.md` |
| Framework documentation | `{package}/docs/` | SDK reference, TUI API, keybindings, models, packages |

The framework documentation is documentation-in-filesystem, not documentation-in-web. Personnel seeking to understand framework features are advised to read the relevant `.md` files in the package documentation directory.

### 4.3. Layer 2 — Global Identity (Edinburgh Protocol)

The global identity layer defines the agent's fundamental operating principles. This layer is stored at `~/.pi/agent/` and is read at every session initiation, regardless of which silo the agent is operating within.

| Asset | Location | Purpose |
|-------|----------|---------|
| Edinburgh Protocol | `~/.pi/agent/AGENTS.md` | Identity, philosophy, behavioral norms |

The Edinburgh Protocol establishes five foundational planks:

| Plank | Description |
|-------|-------------|
| **Map vs. Territory** | The agent's output is a map. The user is the territory. The agent acknowledges the limitations of its training data and logic. |
| **Stuff into Things** | The agent's primary cognitive function is the transformation of unstructured inputs (Stuff) into structured, actionable outputs (Things). |
| **Anti-Dogma** | The agent rejects high-context abstraction and ideology. Empirical evidence and practical utility take precedence over theoretical purity. |
| **Impartial Spectator** | Before answering complex queries, the agent simulates an "Impartial Spectator" to check its own biases. |
| **Silo Discipline** | The agent operates within the repository boundary. "I'm staying in." — no explanation required. |

### 4.4. Layer 3 — Project Identity (Silo Rules)

The project identity layer defines operational rules specific to the current silo. Files in this layer override the corresponding elements of the global identity layer for sessions within the silo.

| Asset | Location | Purpose |
|-------|----------|---------|
| Project AGENTS.md | `{silo-root}/AGENTS.md` | Project-specific operational rules, overrides global identity |
| Architecture Reference | `{silo-root}/ARCHITECTURE.md` | System shape and data flow reference |
| Playbook | `{silo-root}/PLAYBOOK.md` | User guide for project-specific operations |
| Conventions | `{silo-root}/playbooks/` | Detailed operational procedures |

**Important:** The project AGENTS.md file at Layer 3 **overrides** the Edinburgh Protocol at Layer 2 for sessions within this silo. Personnel and agentic systems are advised to read both files and understand the override relationship. Neither file should be read in isolation.

### 4.5. Layer 4 — Session Configuration

The session configuration layer contains skill files, extensions, and session-level settings that govern the agent's behavior during the current session.

| Asset | Location | Purpose |
|-------|----------|---------|
| Skills directory | `{silo-root}/.claude/skills/` | Skill files for project-specific capabilities |
| Extensions | `{silo-root}/.claude/extensions/` | Custom tool definitions (if present) |

Skill files within this layer are referenced by the agentic system during session operation. The skill system is a pi-native feature: skill files are resolved from the `.claude/skills/` directory within the current working directory.

---

## 5. ONBOARDING PROCEDURE

### 5.1. Required Onboarding Steps

Upon session initiation within a silo, agentic systems are required to complete the following orientation steps in order:

a. **Read the Edinburgh Protocol** (Layer 2) — establish fundamental operating principles
b. **Read the project AGENTS.md** (Layer 3) — establish project-specific overrides
c. **Read the conventions file** (Layer 3, `playbooks/`) — establish operational procedures
d. **Verify asset locations** — confirm that referenced files exist at stated locations
e. **Establish system state** — read registry entries, confirm current branch and commit, identify in-flight work

The onboarding procedure is estimated to require approximately 20 seconds of session time. This is a required investment, not optional overhead. Systematic orientation prevents the output inconsistencies described in Section 1.

### 5.2. Orientation Verification

Following the orientation steps described in Section 5.1, the agentic system is advised to verify orientation completeness by:

a. Confirming that the conventions file has been read and understood
b. Confirming that any referenced skill files exist at the stated location
c. Stating current system state (branch, commit, in-flight issues) for human confirmation

If orientation cannot be completed — for example, if a referenced asset does not exist at the stated location — the agentic system is required to surface the incomplete orientation to the human session owner prior to proceeding with substantive work.

### 5.3. Handoff and Session Termination

When a session is to be terminated, the agentic system is required to:

a. Document current state and outstanding items in the designated handoff format
b. Confirm that all substantive changes have been committed to the silo
c. Confirm that orientation state is preserved (for subsequent sessions)

Handoff procedures are specified in the conventions file, Section 7. Personnel are advised to verify handoff completeness prior to session termination.

---

## 6. FINDINGS

### 6.1. Two-Level Identity Requires Explicit Override Declaration

It is observed that the two-level identity system (Layer 2: global identity; Layer 3: project identity) produces occasional confusion during onboarding. New agents reading the global identity file do not immediately understand that the project identity file overrides it for silo sessions.

This confusion is mitigated but not eliminated by the "Map vs. Territory" principle — the agent knows it is a map and should acknowledge uncertainty. However, the confusion can result in agents operating from the global identity without reference to project-specific rules.

**Recommended mitigation:** Both AGENTS.md files should include an explicit override declaration. The global file should state: *"In project silos with their own AGENTS.md, the project file overrides this one."* The project file should state: *"This file overrides ~/.pi/agent/AGENTS.md for sessions in this silo."*

### 6.2. Skill System Lacks a Manifest

It is observed that the skill system currently lacks a manifest — there is no single file listing all available skills, their purposes, and their locations. Personnel and agents seeking to understand the available skill surface must read each skill file individually.

This finding is particularly significant in silos with multiple skill bundles. An agent performing systematic examination may not discover all available skills without a manifest.

**Recommended mitigation:** Each skills directory should contain a `SKILLS_INDEX.md` file listing every skill with a one-line description and a reference to the full `SKILL.md` file.

### 6.3. Framework Documentation and Project Documentation Are Functionally Separate

It is observed that framework documentation (Layer 1, `{pi-installation}/docs/`) and project documentation (Layer 3, `{silo-root}/playbooks/`) are functionally separate but not cross-referenced. An agent seeking to understand a framework feature must know whether to look in the framework docs or the project docs.

This finding contributes to the onboarding time estimate in Section 5.1 and is a source of friction for agents performing systematic examination.

**Recommended mitigation:** A `SILO_MANIFEST.md` file at the silo root should document the locations of all major documentation assets — framework docs, project docs, skill files, and identity files — in a single reference.

---

## 7. COMPLIANCE

### 7.1. Required Actions

The following actions are **required** for all agentic systems operating within the silo:

a. Complete the orientation steps in Section 5.1 prior to substantive work
b. Surface incomplete orientation to the human session owner before proceeding
c. Verify asset locations before referencing files not confirmed in conventions
d. Complete handoff procedures in accordance with Section 5.3 prior to session termination

### 7.2. Required Actions — Personnel

Personnel maintaining silo assets are required to:

a. Maintain accurate asset location information in the conventions file
b. Ensure that skill files are co-located with the capabilities they describe
c. Update the override declaration in both AGENTS.md files when project identity changes

### 7.3. Recommended Actions — OSAAS

The following actions are **recommended** for OSAAS:

a. Implement the manifest documentation described in Section 6.3
b. Implement the skill index described in Section 6.2
c. Review all AGENTS.md files for explicit override declarations

---

## 8. REFERENCES

- Conventions File, Section 3 (Agent Orientation Procedure)
- Conventions File, Section 7 (Handoff Procedures)
- Advisory AWC-2025-001 (Ephemeral Session Management)
- Advisory RDM-2025-002 (Requirements Derivation from System Artefacts)
- Advisory HAP-2025-003 (Human-Agent Partnership in Requirements Triage)
- Advisory OFV-2025-004 (this document)

---

## 9. POINTS OF CONTACT

| Role | Responsibility | Contact |
|------|---------------|---------|
| Issuing Authority | OSAAS, Silo Architecture | Internal |
| Asset Maintenance | OSAAS, Systems Engineering | Internal |
| Orientation Issues | OSAAS, Operations | Internal |

---

## 10. ACKNOWLEDGMENT

Personnel are requested to confirm receipt and understanding of this advisory by updating the acknowledgment log maintained in the silo conventions directory.

*This advisory is issued under the authority of OSAAS. Questions regarding content or applicability should be directed to the Points of Contact listed in Section 9.*

---

*Advisory issued: 2026-05-12*
*Next review: 2027-05-12*
*File reference: OFV-2025-004*