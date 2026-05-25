---
layout: post
title: "Advisory on Agentic Framework Orientation and Asset Location Verification for Silo Onboarding"
date: 2026-05-12T12:00:00 +0000
categories: [ai, systems, agentic-workflows]
tags: [silo-architecture, onboarding, asset-location, edinburgh-protocol]
canonical_url: https://pjsvis.github.io/blog-posts/posts/2026-05-12-pi-silo-onboarding-assets/
canonical_target: [substack]
published: false
---

```text
- this is to specific to pi and silos
- we can generalise the argument to make an argument for a silo
- we start by stating why its a good idea for agents
- we can even extol the virtues of the just file as a faade
- we continue with the required orientation step
- then we note the barnacle issue, but we deal with it in another post
- so we summarise with the idea of a repeateable constraint-stack and context-initialisation process
- the process is repeatable and idempotent: ie it gets consistent results over multiple turns
- persisting lessons-learned and maintaining decision logs and playbooks is a key part of the process
- projects will accrue imposed requirements and generate induced requirements: maybe explain those
- maybe refer to our induced requirements blog post
- summarise the good things to sdo and refer to other blog posts as available 
- maybe even suggest creating additional explanatory blog posts
```



# ADVISORY: Agentic Framework Orientation and Asset Location Verification for Silo Onboarding

**Reference:** OFV-2025-004 | Effective: 2026-05-12 | Review: 2027-05-12
**Authority:** Office of Silo Architecture and Agentic Systems (OSAAS)

---

## PURPOSE

Agentic systems operating without appropriate orientation produce outputs inconsistent with project conventions, reference assets that do not exist at the stated location, or proceed from incorrect assumptions about system state. The cause is inadequate orientation upon session initiation. This advisory establishes the recommended onboarding procedure and the asset location hierarchy that governs where identity, configuration, and skill files are resolved during a session.

---

## ASSET LOCATION HIERARCHY

Four layers. Later layers may override earlier ones.

| Layer | Location | Contents |
|-------|----------|----------|
| 1 | `{pi-installation}/` | Framework binaries, package docs, SDK reference |
| 2 | `~/.pi/agent/` | Edinburgh Protocol, global operational guidelines |
| 3 | `{silo-root}/` | Project-specific rules, conventions, AGENTS.md |
| 4 | `{silo-root}/.claude/` | Skills, extensions, session-level configuration |

**Layer 1 — Global Platform:** Framework binary and associated package documentation. The documentation is in the filesystem, not on the web. Personnel seeking to understand framework features should read the relevant `.md` files rather than searching for a web reference that may not exist.

**Layer 2 — Global Identity:** The Edinburgh Protocol — fundamental operating principles. Read at every session initiation regardless of silo.

**Layer 3 — Project Identity:** Project-specific rules that override Layer 2 for sessions within this silo. **The project AGENTS.md overrides `~/.pi/agent/AGENTS.md` for sessions in this silo.** Both files should be read. Neither should be read in isolation.

**Layer 4 — Session Config:** Skill files and extensions resolved from `.claude/skills/` within the current working directory.

---

## ONBOARDING PROCEDURE

Upon session initiation, agents complete the following in order:

a. Read the Edinburgh Protocol (Layer 2)
b. Read the project AGENTS.md (Layer 3)
c. Read the conventions file (Layer 3, `playbooks/`)
d. Verify asset locations — confirm referenced files exist at stated locations
e. Establish system state — confirm branch and commit, identify in-flight work

Estimated time: 20 seconds. This is a required investment.

### Orientation Verification

Following orientation, the agent confirms: the conventions file has been read; referenced skill files exist at stated locations; current system state is stated for human confirmation.

If orientation cannot be completed — a referenced asset does not exist at the stated location — the agent surfaces the incomplete orientation to the human session owner before proceeding with substantive work.

### Session Termination

When terminating: document current state and outstanding items in the handoff format; confirm all substantive changes are committed to the silo; confirm orientation state is preserved.

---

## FINDINGS

**6.1. Two-Level Identity Requires Explicit Override Declaration**

The two-level identity system produces confusion during onboarding. Agents reading Layer 2 do not immediately understand that Layer 3 overrides it for silo sessions. This is not resolved by the agent knowing it is a "map" — the override relationship is a structural property that should be stated, not inferred.

*Recommended mitigation:* Both AGENTS.md files include explicit override declarations. The global file: *"In project silos with their own AGENTS.md, the project file overrides this one."* The project file: *"This file overrides ~/.pi/agent/AGENTS.md for sessions in this silo."*

**6.2. The Skill System Lacks a Manifest**

There is no single file listing available skills, their purposes, and their locations. Agents performing systematic examination may not discover all available skills without examining each directory individually.

*Recommended mitigation:* Each skills directory contains a `SKILLS_INDEX.md` listing every skill with a one-line description and a reference to the full `SKILL.md`.

**6.3. Framework and Project Documentation Are Not Cross-Referenced**

Framework documentation (Layer 1) and project documentation (Layer 3) are functionally separate. An agent seeking to understand a feature must determine which layer contains the relevant information — without guidance, this requires exploration.

*Recommended mitigation:* A `SILO_MANIFEST.md` file at the silo root documents the locations of all major documentation assets — framework docs, project docs, skill files, and identity files — in a single reference.

---

## RELATED

Advisory AWC-2025-001 (Ephemeral Session Management)
Advisory RDM-2025-002 (Requirements Derivation — Induced vs. Imposed)
Advisory HAP-2025-003 (Human-Agent Partnership in Requirements Triage)

---

*Advisory issued: 2026-05-12 | File reference: OFV-2025-004*