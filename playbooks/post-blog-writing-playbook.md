# Post-Blog Writing Playbook

## Overview

How to take raw content — Gemini outputs, transcriptions, session dumps — and sculpt it into a post-blog post. The process: rough draft first, then structure, then sculpt.

---

## The Format

Every post has three parts:

```
TL;DR
  ← Is this of interest? Quick gut check.
  ← Here is the structure. Here is what we concluded.

Content
  ← Lean. Pre-structured by the TL;DR.
  ← No padding. No throat-clearing.

Narrativised Bibliography
  ← From TL;DR you can jump to bibliography and get the gist
  ← Each ref has a one-liner: who, what, why it matters
  ← Not raw links — context for the citation
```

---

## The Process

### Step 1: Identify the Through Line

Before writing anything, find the thread that connects the raw content. Usually:

```
Concept A (Shannon) → connects to → Concept B (Lehman) → connects to → Concept C (Evans) → filtered by → James Watt test
```

Ask: what is the single sentence that describes what we concluded?

Example:
> A repository is a closed information system. Before an LLM can do useful work inside it, you must verify the channel is clean and the vocabulary is bound.

### Step 2: Write the TL;DR First

The TL;DR is the whole thing in miniature. If you can't summarise it in five lines, the content isn't ready.

The TL;DR has three components:
1. **The problem** — what are we addressing?
2. **The mechanism** — how does it work?
3. **The conclusion** — what do we conclude?

Example:
```
A repository is a closed information system. Before an LLM can do useful work
inside it, you must verify two things: the channel is clean (Shannon), and the
vocabulary is bound (Evans).

The structural test: Index == Disk. Run a parity check. If it fails, stop and tidy.
The semantic test: Do your terms conflict? If the lexicon requires two definitions
for the same word, the context has ruptured — spin off a component.
The maintenance test: Is the energy spent maintaining the mechanism equal to or
less than the energy saved by its operation? If not, strip it out.

What we conclude: Semantic entropy is a directional vector...
```

### Step 3: Write the Content

The content is structured by the TL;DR. Each section in the content maps to a point in the TL;DR.

Rules:
- No throat-clearing introductions — start from the first sentence
- No padding — every paragraph either advances the argument or provides evidence
- Use diagrams where they communicate faster than prose (ASCII is fine)
- James Watt test applies to every sentence: is this earning its place?

Structure the content as a numbered progression if it helps:
1. The closed world invariant
2. Shannon's channel and the parity of disk
3. Measuring entropy direction (Lehman)
4. Evans' bounded contexts and the signal to splinter
5. The James Watt test
6. The state machine

### Step 4: Write the Narrativised Bibliography

For each citation, answer three questions in one paragraph:
1. **Who** — author, year, work
2. **What** — the core contribution
3. **Why it matters here** — the specific connection to this post

Not: a raw link or a citation string.
Yes: a one-paragraph narrative that makes the reference useful.

Example:
```
**Claude Shannon — A Mathematical Theory of Communication (1948)**
The Noisy-Channel Coding Theorem. Proved that reliable communication is possible
over unreliable media by introducing parity checks. In our architecture, Index == Disk
is the parity bit. If the check fails, the channel is corrupted and you stop before
computing.
```

### Step 5: Cut

After the first draft, ask:
- Is every section pulling its weight?
- Is the TL;DR complete enough that a scanner can get the gist without reading content?
- Is the bibliography giving context rather than dumping links?
- Is there any padding that could be cut without losing meaning?

Cut ruthlessly. The TL;DR already told the reader everything — the content is for those who want the full reasoning path.

---

## The Through Line Template

Use this to find the thread in any raw content:

```
[Foundational principle A] → [Mechanism derived from A] → [Observation about entropy/scale] → [Filter: is it worth the maintenance?] → [The conclusion / state machine]
```

Example from this post:
```
Shannon (1948) → channel parity = structural integrity → entropy direction matters (internal vs external) → Evans bounded contexts = semantic integrity → Watt test filters everything → state machine for next actions
```

---

## Audience Mapping

| Audience | Entry point | Journey |
|----------|-------------|---------|
| Agent (fast) | TL;DR → Bibliography | Parse structure, extract refs, done |
| Human (scanner) | TL;DR → Bibliography | Decide if interested, get gist |
| Human (reader) | TL;DR → Content → Bibliography | Full read with context |
| Agent (deep) | Content → Bibliography | Token-dense reasoning path |

The format serves all four without compromising any.

---

## Status

Playbook draft. Process derived from sculpting "The Thermodynamics of Vocabulary." Will refine after next post.

---

*Written: 2026-07-03*  
*Source draft: `_drafts/2026-07-03-thermodynamics-of-vocabulary.md`*