---
layout: post
title: "Induced vs Imposed Requirements: How AI Changes Requirements Engineering"
subtitle: "The Agent Surfaces. The Human Triage."
date: 2026-05-26T12:00:00 +0000
categories: [ai, systems, requirements]
tags: [induced-requirements, human-agent-partnership, edinburgh-protocol]
canonical_url: https://pjsvis.github.io/blog-posts/posts/2026-05-26-induced-requirements/
published: true
---

# Induced vs Imposed Requirements: How AI Changes Requirements Engineering

Most software problems begin with a misalignment between what people *think* the system should do and what the system actually does. Traditional requirements processes rely heavily on **imposed requirements** — statements generated independently of the current system state. AI agents open the door to **induced requirements** — gaps derived from systematic examination of the actual artefacts.

This distinction matters.

---

## Imposed vs Induced

**Imposed requirements** come from authority, specifications, or stakeholder requests. They are "pushed" onto the system. They can be realistic or fanciful. They provide coherent direction when they align with reality.

**Induced requirements** are pulled from the system itself. An agent examines the codebase, documentation, and behaviour, then surfaces genuine gaps. With modern agents, this examination can be systematic and exhaustive — something humans struggle with due to working memory limits.

Neither is inherently superior. Imposed requirements give strategic direction. Induced requirements ground development in reality. The art is maintaining the right tension between them.

---

## The Human-Agent Partnership

Agents excel at **surface** — they can read the entire project and identify inconsistencies without fatigue. Humans excel at **triage** — judging whether a gap is worth closing given priorities, resources, and structural role.

Use the following structural categories for triage (tensegrity thinking):

- **Enable** (Compression Struts): Foundational. If this doesn't exist, nothing else works.
- **Strengthen** (Tension Cables): Makes existing features reliable and deterministic.
- **Enhance** (Decorative): Valuable but structurally optional.

Agents surface gaps. Humans assign categories and decide priority. This maintains the system's structural integrity.

---

## Practical Workflow

- Agent performs systematic examination of the silo.
- Surfaces induced requirements with evidence.
- Human reviews and categorizes (Enable/Strengthen/Enhance).
- Both review imposed requirements against current system state.
- Barnacles (small inconsistencies) are scraped regularly rather than allowed to accumulate.

Small inconsistencies compound. They are not harmless — they are entropy that increases the risk of larger failures later. Regular scraping is maintenance, not luxury.

**Further Reading**
- Companion pieces on ephemeral sessions and clean context engineering.
- Observe your own projects: track the ratio of induced to imposed requirements over time.

The best systems maintain productive tension between human judgment and agent scale.

*Reworked with analytical assistance from Grok (xAI)...*