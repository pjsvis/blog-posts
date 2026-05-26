---
layout: post
title: "Navigating Latent Space: A Field Guide"
subtitle: "Low-Entropy Context, DOT Graphs, and Staying Out of the Weeds"
date: 2026-05-26T12:00:00 +0000
categories: [ai, workflow, systems]
tags: [agents, latent-space, context-engineering, graphviz, edinburgh-protocol]
canonical_target: [substack, medium]
canonical_url: https://pjsvis.github.io/blog-posts/posts/2026-05-26-navigating-latent-space/
published: true
---

# Navigating Latent Space: A Field Guide

Every experienced user eventually hits the same quiet failure mode. The session starts with clarity. Progress feels tangible. Then, gradually, the signal-to-noise ratio collapses. The model is still fluent, still confident — but you're no longer making meaningful progress. You're in the weeds.

This is a navigational problem in a high-dimensional space. Here is a practical field guide.

---

## The Terrain

Latent space is like an infinite, undulating billiard table in many dimensions. Your prompt is the cue. The response is the ball. The surface has hidden gradients that pull toward local minima. Early momentum is hard to correct. You navigate mostly blind.

Good navigation requires both **strong setup** and **continuous course correction**.

---

## Core Navigation Techniques

**1. Strong Constraint-Stack (Setup)**  
Define boundaries clearly before momentum builds. Specify style, edge cases, success criteria, and constraints. Ambiguity creates unwanted gravity.

**2. Clean Context Initialization (The Initial Shot)**  
The first framing carries heavy weight. Vague or overloaded openings send the ball toward the wrong valley.

**3. Low-Entropy Context Engineering**  
Politeness to a reasoning system is entropy reduction. Use:
- Mono-clausal bullets (one clear idea per point)
- Explicit state and objective first
- Deterministic source material as ground truth
- Explicit lifecycle closers ("- Opinion", "- Proceed")

**4. DOT as Shared Representation**  
For state machines, workflows, or architectures, prefer **Graphviz DOT** format:
- It is pure text — both you and the agent can read and edit it directly.
- The agent can validate logic, detect dangling edges, missing transitions, and incompleteness deterministically.
- Rendered SVGs/PNGs are generated ephemerally as a human-friendly view.
- Keep graphs small (7 +/- 2 core elements) so structural problems remain obvious.

This combination — canonical text + rendered visualisation — gives both parties the best of both worlds.

**5. Periodic Heading Checks**  
Every 20–30 exchanges: Are we closer to the goal, or just circling a local optimum?

---

## Recognising the Weeds

Warning signs:
- Repetition with variation
- Confident but unverifiable output
- Context collapse (long sessions with degraded early recall)
- Output looking at output (refining its own previous responses)

There is also the subtler **fucked-adjacent** state: output that sounds right but advances nothing. Reset early here.

---

## Recovery Tactics

- **Reset**: Clean context + key receipts from the previous session. Often the highest-leverage move.
- **Context surgery**: Extract what worked, discard the rest.
- **Change the table**: Reframe with new constraints or abstractions.
- **Switch models**: Different architectures have different strengths.
- **Stop and return**: Human fatigue compounds drift.

---

## The Craft

Effective collaboration with reasoning models is a learnable craft. It rewards deliberate practice: noticing failure modes, documenting successful patterns, and building personal heuristics for the terrain.

The model provides physics. You provide navigation.

**Further Reading**
- Graphviz DOT documentation — for clean state machine representation.
- Observe your own sessions: track which constraint styles produce the best signal.
- Miller’s Law (7 +/- 2) — cognitive limit on working elements.

The weeds are always present. Skill lies in seeing them sooner and knowing the exits.

*Reworked with analytical assistance from Grok (xAI), operating under the Edinburgh Protocol.*