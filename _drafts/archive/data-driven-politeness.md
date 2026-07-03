---
layout: post
title: "Data-Driven Politeness: Courteous Context Engineering for AI Agents"
subtitle: "Low-Entropy Inputs and the $7 \\pm 2$ Rule"
date: 2026-05-26T12:00:00 +0000
categories: [ai, engineering, workflow]
tags: [context-engineering, agents, low-entropy, graphviz, edinburgh-protocol]
canonical_target: [substack, medium]
canonical_url: https://pjsvis.github.io/blog-posts/posts/2026-05-26-clean-context-engineering/
published: true
---

# Data-Driven Politeness: Courteous Context Engineering for AI Agents

True politeness toward a reasoning system is measured by conceptual entropy reduction. Rambling narratives, sprawling diagrams, and vague instructions create noise. Clean, structured inputs create clarity.

Here is a practical hierarchy for designing context that respects how synthetic reasoning actually works.

---

## The Preferred Hierarchy

1. **State and Objective First**  
   Explicitly bound the immediate task. One coherent goal per interaction.

2. **Mono-Clausal Constraints**  
   Use short, single-idea bullets. Respect token economy and attention mechanisms.

3. **Deterministic Source Material**  
   Provide raw, textual representations (code, JSON, Graphviz DOT files) as the source of truth.

4. **Ephemeral Visuals**  
   Keep diagrams small ($7 \pm 2$ core elements) and generated automatically from text. Treat visuals as transient build artifacts, not primary documents. This makes dangling nodes and missing transitions obvious.

5. **Explicit Lifecycle Closers**  
   End requests with clear directives (e.g., "- Opinion", "- Proceed") to anchor the loop.

---

## The Cost of Linguistic Noise

Precision is reciprocal. Spelling errors, vague variable names, or sloppy structure impose real costs:
- Extra round-trips for clarification.
- Degraded pattern matching in the session.
- Polluted context history.

In a terminal workflow, clarity is basic courtesy.

---

## High-Entropy vs Low-Entropy Example

**High-entropy (common)**: Long, multi-topic paragraphs with vague intent and large diagrams.

**Low-entropy (effective)**: