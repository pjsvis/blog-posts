---
layout: post
title: "Advisory on Agentic Framework Orientation and Asset Location Verification for Silo Onboarding"
date: 2026-05-12T12:00:00 +0000
categories: [ai, systems, agentic-workflows]
tags: [silo-architecture, onboarding, asset-location, edinburgh-protocol]
canonical_target: [substack]
published: false
---

# ADVISORY: Agentic Framework Orientation and Asset Location Verification for Silo Onboarding

**Reference:** OFV-2025-004 | Effective: 2026-05-12 | Review: 2027-05-12
**Authority:** Office of Silo Architecture and Agentic Systems (OSAAS)

---

## PURPOSE

Agentic systems operating without appropriate orientation produce outputs inconsistent with project conventions, reference assets that do not exist, or operate from incorrect assumptions about system state. The root cause: inadequate orientation to the silo environment upon session initiation. This advisory establishes the recommended onboarding procedure and the asset location hierarchy that governs where identity, configuration, and skill files are resolved during a session.

---

## ASSET LOCATION HIERARCHY

The asset location hierarchy follows a four-layer model. Later layers may override earlier ones.

| Layer | Location | Contents |
|-------|----------|----------|
| 1 | `{pi-installation}/` | Framework binaries, package docs, SDK reference |
| 2 | `~/.pi/agent/` | Edinburgh Protocol, global operational guidelines |
| 3 | `{silo-root}/` | Project-specific rules, conventions, AGENTS.md |
| 4 | `{silo-root}/.claude/` | Skills, extensions, session-level configuration |

**Layer 1 — Global Platform:** Framework binary and documentation. Documentation is documentation-in-filesystem, not documentation-in-web. Read the `.md` files in the package docs directory.

**Layer 2 — Global Identity:** The Edinburgh Protocol. Defines fundamental operating principles. Read at every session initiation regardless of silo.

**Layer 3 — Project Identity:** Project-specific rules that override Layer 2 for sessions within this silo. **Important:** The project `AGENTS.md` overrides `~/.pi/agent/AGENTS.md` for sessions in this silo. Read both files; neither should be read in isolation.

**Layer 4 — Session Config:** Skill files and extensions resolved from `.claude/skills/` within the current working directory.

---

## ONBOARDING PROCEDURE

Upon session initiation, agents complete the following orientation steps in order:

a. Read the Edinburgh Protocol (Layer 2)
b. Read the project AGENTS.md (Layer 3)
c. Read the conventions file (Layer 3, `playbooks/`)
d. Verify asset locations — confirm referenced files exist at stated locations
e. Establish system state — confirm branch and commit, identify in-flight work

This takes approximately 20 seconds. It is a required investment, not overhead.

### Orientation Verification

Following orientation, the agent should:

- Confirm the conventions file has been read and understood
- Confirm referenced skill files exist at stated locations
- State current system state for human confirmation

If orientation cannot be completed — a referenced asset does not exist at the stated location — the agent surfaces the incomplete orientation to the human session owner before proceeding with substantive work.

### Session Termination

When terminating a session: document current state and outstanding items in the handoff format; confirm all substantive changes are committed to the silo; confirm orientation state is preserved.

---

## FINDINGS

**6.1. Two-Level Identity Requires Explicit Override Declaration**

The two-level identity system (Layer 2: global; Layer 3: project) produces confusion during onboarding. New agents reading Layer 2 do not immediately understand that Layer 3 overrides it for silo sessions.

*Recommended mitigation:* Both AGENTS.md files should include explicit override declarations. The global file: *"In project silos with their own AGENTS.md, the project file overrides this one."* The project file: *"This file overrides ~/.pi/agent/AGENTS.md for sessions in this silo."*

**6.2. Skill System Lacks a Manifest**

The skill system lacks a manifest — no single file lists all available skills, purposes, and locations. Agents performing systematic examination may not discover all available skills without one.

*Recommended mitigation:* Each skills directory should contain a `SKILLS_INDEX.md` listing every skill with a one-line description and reference to the full `SKILL.md`.

**6.3. Framework and Project Documentation Are Not Cross-Referenced**

Framework documentation (Layer 1) and project documentation (Layer 3) are functionally separate but not linked. An agent seeking to understand a framework feature must know where to look — framework docs or project docs.

*Recommended mitigation:* A `SILO_MANIFEST.md` file at the silo root should document the locations of all major documentation assets in a single reference.

---

## RELATED

Advisory AWC-2025-001 (Ephemeral Session Management)
Advisory RDM-2025-002 (Requirements Derivation — Induced vs. Imposed)
Advisory HAP-2025-003 (Human-Agent Partnership in Requirements Triage)

---

*Advisory issued: 2026-05-12 | File reference: OFV-2025-004*