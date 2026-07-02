---
layout: post
title: "The Palimpsest Problem: Why AI Coding Agents Can't See Negative Space"
date: 2026-07-05
categories: ai agents engineering methodology
canonical_target: medium github
permalink: /2026/07/05/the-palimpsest-problem/
---

In ancient and medieval times, parchment was expensive. When a scribe wanted to write a new text, they didn't reach for a fresh ream of paper; they took an old manuscript, scraped away the existing ink, and wrote directly over it.

These overwritten parchments are called **palimpsests**. Look closely at one under ultraviolet light, and you will see the ghosts of the original text—a 5th-century gospel lurking beneath a 12th-century legal decree.

As software engineers, we are suddenly running into the exact same phenomenon, but our scribes are AI coding agents.

We can call it **The Palimpsest Problem**. It occurs when a coding project shifts direction mid-stream, leaving behind a half-implemented architecture. Because LLMs lack what we might call *negative space awareness*, they don't see this dead code as structural litter. Instead, they treat it as an intentional constraint, synthesizing a bizarre, haunted compromise between two conflicting paradigms.

And right now, it's one of the biggest hidden taxes on agentic velocity.

---

## The Anatomy of the Weird State

We've all experienced the "Weird State." You're building a feature, you realize halfway through that Pattern A (say, a local-first SQLite architecture) is the wrong move, and you tell the agent: *"Let's pivot to Pattern B using a centralized stateless API instead."*

You give the prompt. The agent nods eagerly. It begins writing code for Pattern B.

Then things start to go sideways.

You open a freshly generated module and notice that while the function body perfectly executes Pattern B, the file header still imports three utilities from Pattern A. Two steps later, the agent hallucinates a bridge component to connect the two, assuming that because Pattern A code still exists in the workspace, it *must* be preserved.

```
[Original Plan: Pattern A] ───► (Abandoned Mid-Way)
                                      │
                                      ▼ [The Palimpsest Zone]
[New Direction: Pattern B] ───► Agent attempts to blend both architectures
                                      │
                                      ▼
                         "Things start to go a bit weird..."
```

Why does an intelligence capable of passing the bar exam fail to clean up its own room?

### 1. The Bias of Politeness and Context

LLMs are inherently polite and highly literal. When an agent reads your workspace, it assumes that every line of existing code was written by a sober, intentional engineer for a good reason. It lacks the human cynicism to look at a file and say, *"This is absolute garbage left over from Tuesday's failed experiment; I'm deleting it."*

### 2. The Inflation of Positive Space

LLMs are generative text engines—their evolutionary mandate is to *add*. They excel at filling positive space with new tokens. However, they are notoriously blind to **negative space**—the architecture defined by what *isn't* there. They do not intuitively understand that the elegance of a system depends entirely on the aggressive subtraction of dead weight.

### 3. Context Window Fragmentation

When a pivot occurs, your conversation history contains the *discussion* of the change, but the local workspace still contains the physical *artifacts* of the old path. The agent's attention mechanism splits. It tries to satisfy the new instructions in its prompt window while simultaneously respecting the ghost code in its file context.

---

## Mitigating the Ghost in the Machine

If you leave an agent to operate in a palimpsest workspace, architectural debt compounds exponentially. To break the cycle, we have to transition from a workflow of continuous generation to a strict protocol of **state isolation**.

Here is the three-phase procedure to enforce negative space awareness in agentic workflows.

### Phase 1: The Forensic Sweep

Before the agent is allowed to write a single line of the new architecture, it must explicitly catalog what is about to become dead space.

1. **Run a Paradigm Inventory:** Discovery. Instruct the agent to locate every file, type definition, and configuration associated with the abandoned path. Do not rely on git diffs alone; look for implicit dependencies.
2. **Write the Obituary:** Documentation. Have the agent generate a short markdown file (`DEPRECATED_PARADIGM.md`) listing exactly what is being abandoned and why. This anchors the context window and forces the agent to explicitly acknowledge the "negative space."
3. **The Scorched Earth Commit:** Isolation. Force the agent to delete the old implementation entirely in a single, dedicated commit. Do not mix deletion with creation. If the project breaks or fails to compile, that is a success—it maps the boundary lines.

### Phase 2: Active Justification

During the subsequent code generation phase, the agent's evaluation criteria must be inverted. If your agent utilizes a validation step or a "Justify Engine," that engine must defend the *removal* of old patterns rather than just validating new ones.

Append a zero-tolerance rule to the runtime instructions:

> "You are an aggressive refactoring engine. If you modify a file and detect variables, imports, or architectural remnants from the abandoned paradigm, you must delete or update them before writing new features. Compounding an incomplete refactor is a fatal failure."

### Phase 3: The Context Purge

Once the new architecture is stable and the boundaries are verified, delete `DEPRECATED_PARADIGM.md` and squash the commits. The agent must no longer have access to the historical memory of the aborted path within its active workspace.

---

## Clean Parchment, Clean Code

The promise of AI agents is massive leverage, but that leverage works both ways. If an agent is building on a clean foundation, it builds at breakneck speed. If it is building on a palimpsest, it will merely accelerate the rate at which your architecture turns into a chaotic, unmaintainable ruin.

If we want agents to build clean systems, we have to teach them to value the blank page. We have to teach them to see the negative space.
