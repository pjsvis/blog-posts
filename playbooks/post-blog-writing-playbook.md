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
  ← End with pointer to Bibliography for scanners.

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

The TL;DR must end with a pointer to the bibliography. This allows scanners to grab TL;DR + refs and exit without reading the content:

```
*See Bibliography below.*
```

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

*See Bibliography below.*
```

### Step 3: Write the Content

The content is structured by the TL;DR. Each section in the content maps to a point in the TL;DR.

**The core heuristic:** TL;DR is short and punchy — possibly not fully comprehended. The body content's job is to expand the TL;DR in plain words.

The relationship:
- **TL;DR** = compressed signal (the conclusion, the structure, the key tests)
- **Body** = expanded definition (what each term means in practice, what the signal looks like when it is happening)

If the body is just restating the TL;DR, you have failed.
If the body is adding new information that was not in the TL;DR, you have also failed — the TL;DR should have contained it.

The body should be the TL;DR, articulated. Same content, expanded. Different register.
- No throat-clearing introductions — start from the first sentence
- No padding — every paragraph either advances the argument or provides evidence
- Use diagrams only where they communicate faster than text (ASCII is fine when it earns its place)
- James Watt test applies to every sentence: is this earning its place?

### Step 4: Write the Narrativised Bibliography

For each citation, answer three questions in one paragraph:
1. **Who** — author, year, work
2. **What** — the core contribution
3. **Why it matters here** — the specific connection to this post

Not: a raw link or a citation string.
Yes: a one-paragraph narrative that makes the reference useful.

**Context for historical figures:** When citing figures (Watt, Shannon, Evans), add minimal context:
- Date/location if it helps the reader understand their frame (e.g., Watt: Scotland, late 18th century)
- One line on why they matter in this specific argument

Example:
```
**James Watt (1736–1819) — Pragmatic Utility Test**
Scottish mechanical engineer. Improved the steam engine by measuring thermodynamic
efficiency rather than guessing. The test: does this component deliver more work
than it consumes? Applied to every mechanism in the system. If it fails, strip it out.
```

### Step 5: Flag Links

While drafting, indicate links so they can be swept for and filled in later:

```markdown
Claude Shannon (1948) [[link pending: A Mathematical Theory of Communication]]
```

Or in a `Links` section at the bottom:
```markdown
## Links

[Shannon 1948]: link-pending
[Lehman 1970s]: link-pending
[Edinburgh Protocol]: canon/edinburgh-protocol.md
```

**Why this works:**
- The post remains consistent whether you follow the links or not
- Links allow the pickiest critic to review the evidence
- Links decrease entropy — they provide evidence without bloating prose
- James Watt would approve: links earn their place if they reduce entropy without adding maintenance cost

Sweep later. Fill in the URLs. The post is readable either way.

### Step 6: Cut

After the first draft, apply these cuts:

**Cut without mercy:**
- Throat-clearing introductions (TL;DR already covered it)
- Decorative ASCII diagrams (only keep if the diagram does work that text cannot)
- Self-referential definitions (if the definition uses the word being defined, it is broken)
- Sections already delivered in the TL;DR (reference them, don't repeat)

**Context matters:** When citing a figure, add minimal context. Readers should understand who they are and why the citation matters without external research.

**Keep what earns its place:** Every paragraph either advances the argument or provides essential evidence. If it doesn't, cut it.

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

## The Shannon Packet

**Definition:** A self-contained, verifiable unit of structured communication. Named after Claude Shannon's checksum — if the links break or the evidence doesn't support the assertion, the checksum fails.

**The format:**

```
TL;DR: Compact assertions
Links: Evidence (external verification)
Attribution: Sources
Agent: Examines, gathers, reports
Channel Quality: Closer or further from agreement?
```

**The verification loop:**

1. Present your packet — TL;DR of position + link to full verification
2. Accept theirs temporarily — Follow their line of reasoning without being sidetracked
3. Agent examines — Gathers evidence, verifies links, reports back on quality
4. Assess — Do their assertions hold? Are we closer or further from agreement?

**The channel assessment:**

| Signal | Meaning |
|--------|---------|
| Links hold, evidence supports assertion | Checksum passes — channel is clean |
| Links break or contradict assertion | Checksum fails — noise in the channel |
| Both packets verified, still disagree | Honest disagreement — move on |
| Both packets verified, converge | Phase change — agreement reached |

**Broader application:**

The Shannon Packet is not limited to blog posts. It is a communication protocol for:

- **Discussions** — Present assertions via TL;DR, accept opponent's temporarily, agent examines, report back
- **Proposals** — Full verification package, agent assesses, return with quality assessment
- **Information exchange** — Rapid way to transmit complex ideas with built-in verification
- **Agreement tracking** — Are we closer or further from consensus?

The principle: every assertion gets a checksum. Broken link or unsupported claim = red flag. Verified claim = channel clean.

**James Watt:** The packet earns its place if it increases agreement velocity without increasing noise.

---

## Status

Playbook active. Process refined from sculpting "The Thermodynamics of Vocabulary."

---

*Written: 2026-07-03*  
*Source draft: `_drafts/2026-07-03-thermodynamics-of-vocabulary.md`*