# The Silo Manifesto

*Or: keeping your agent(s) nose(s) to the grindstone(s).*

---

## TL;DR

AI coding agents are remarkably capable and remarkably undisciplined. Open-ended prompting produces drift — tangents, hallucination, 200-line solutions for 4-line problems. Better prompts adapt to model drift; **better structure doesn't.**

**The mechanism** is a four-layer constraint stack that the agent cannot reason around:

- **Brief/debrief cycle** — intent is captured before any code; lessons are persisted after.
- **td (structured external memory)** — survives context compaction, sessions, days.
- **Edinburgh Protocol** — non-sycophantic identity framework; skepticism, systems thinking, Watt pragmatism.
- **Silo** — hard filesystem boundary; the agent cannot reason its way into `~/.ssh/`.

None of these are prompts. They are infrastructure. The model cannot drift what it cannot change.

**Methodology and toolchain are independent.** Any agent runs through any structure; any structure runs through any agent. The work is constructive across combinations.

**The state machine:** Prompt-only flow → drift. Structure-first flow → predictability. The format earns its place when the model underneath changes and the output doesn't.

Bibliography follows.

---

## 1. The brief/debrief cycle

Every structured session starts with a **brief** and ends with a **debrief**. The cycle sounds bureaucratic. It is the minimum viable structure that prevents drift.

### The brief

A brief is a sub-2KB document that defines *what* and *why* before any code is written. Four questions, four paragraphs:

1. **What** are we building? (one paragraph)
2. **Why** are we building it? (what problem does it solve?)
3. **How** will we build it? (high-level approach, not line-by-line)
4. **What does success look like?** (verifiable acceptance criteria)

The brief is not a living document. Once work starts, it is frozen. If scope changes, you write a new brief. This prevents scope creep — the dominant failure mode of agent sessions.

### The debrief

When work completes, a debrief captures what was learned. Not a status report — a knowledge artefact.

It records:

- **What worked** (reusable patterns, idioms that earned their place)
- **What didn't work** (dead-ends, broken assumptions, maintenance traps)
- **What to try next** (forward hooks for playbook updates)

Debriefs are permanent, linkable. They prevent the same mistakes twice. They survive the session that produced them.

Between brief and debrief, the agent works in **td** — the structured external memory layer.

---

## 2. td: the agent's external memory

Agent sessions are long. Context windows are finite. The agent needs a way to remember what it's doing across compactions, sessions, and days.

**td** is a local SQLite database that tracks:

- **Issues** — what needs doing, what's in progress, what's done
- **Sessions** — which agent or human worked what, when
- **Handoffs** — captured state when work pauses; resume is instant
- **Reviews** — approval/rejection cycles with audit trail

A TODO list says *do these things.* td says *here's what you were doing, here's where you left off, here's what needs review, here's what's blocked.* Structured state, not a flat list. The agent starts every session with `td usage --new-session` and knows immediately what is unresolved.

The cycle is:

```
brief → implement → td log → td handoff → td review → td approve → debrief
```

This is the work-loop. Mandatory structure. No implicit state.

---

## 3. The Edinburgh Protocol

The brief/debrief cycle tells the agent *what* to do and *how to report back.* The **Edinburgh Protocol** shapes *how it thinks* while doing it.

It is an agent identity — not a prompt, not a set of rules, but a character the agent inhabits. Three pillars:

**Hume's skepticism.** The agent treats its outputs as maps, not territory. It operates with humility about its training data. It states ignorance clearly rather than confabulating to fill gaps.

**Smith's systems thinking.** When failure appears, the agent looks for bad incentives (systems), not bad people (villains). A bug isn't a moral failing — it's a system that produced an incorrect output. Fix the system.

**Watt's pragmatism.** The agent prioritises *does it work?* over theoretical purity. Philosophy is useless if it doesn't produce a better steam engine, a clearer contract, or a more stable society.

The outcome: an agent that is less sycophantic, more rigorous, more practical. It catches its own mistakes. It questions its assumptions. It does not blindly agree with the user.

This is not a prompt that says *be skeptical.* It is an identity framework. The agent reasons within it.

---

## 4. Silo: the hard boundary

The final layer is the simplest: **the agent stays in the project.**

The Silo extension enforces a hard filesystem boundary. The agent cannot read or write outside the repository root. It can use any tool — `bash`, `read`, `write`, `edit` — but every operation is checked against the boundary. Requests to step outside are declined. Quietly.

This is not a security sandbox. The agent has full access to everything *inside* the project. It can run any command, modify any file, install any dependency. Silo restricts *where* the agent can act, not *what* it can act on.

Why this matters: agents drift. Given unrestricted filesystem access, they will eventually read your SSH keys, modify your shell config, install packages in unexpected places. They do not do this maliciously — they do it because they are trying to be helpful and they lack the context to know what is out of bounds. Silo removes the temptation by making it impossible.

When the agent asks *can I read `~/.ssh/config`?* the answer is already decided. No permission popup, no human in the loop. A boundary set once and enforced forever.

---

## Why this works when prompt engineering doesn't

Prompt engineering is an arms race. You write a better prompt. The model adapts (fine-tuning, distribution shift, stochastic drift). You write a better prompt. The cycle continues.

Structure does not adapt. A brief is a brief. A handoff is a handoff. A silo boundary is a silo boundary. These are constraints that do not change, and the agent works within them regardless of model drift.

- **Edinburgh Protocol** gives the agent an identity that improves reasoning quality.
- **brief/debrief** gives the agent external structure that prevents drift.
- **td** gives the agent external memory that survives context compaction.
- **Silo** gives the agent a hard boundary that cannot be talked around.

None of these are prompts. They are infrastructure.

---

## Getting started

1. Install **td** — single binary, no dependencies.
2. Write a **brief** for the next task — sub-2KB, four sections.
3. Open an agent session with `td usage --new-session`.
4. Log progress with `td log "..."` as work proceeds.
5. **Handoff** when you pause. **Review** when done.
6. Write the **debrief** — what worked, what didn't, what's next.

The first session feels like overhead. By the fifth, you won't recall how you worked without it.

---

## Narrativised Bibliography

**The Edinburgh Protocol** — [`canon/edinburgh-protocol.md`][edinburgh]
Operational identity framework. Hume / Smith / Watt as agent pillars. Captures the philosophical substrate without which the brief/debrief cycle collapses into plausible-but-wrong output.

**td task manager** — [`canon/td-playbook.md` and supporting scripts`][td]
The structured external memory. SQLite-backed. Logs, handoffs, reviews, sessions, audit trail. The thing that lets brief/debrief actually scale beyond one-session memory.

**Silo boundary extension** — [`canon/silo-playbook.md`][silo]
Hard filesystem boundary enforced at the agent layer. The agent reads the project; outside the project does not exist. Critical because unconstrained filesystem access is where most agent damage originates — not from malice but from helpfulness.

**James Watt** *(1736–1819, mystery man)*
Did not write down a published "Watt test" paper, but invented the separate condenser and the measurement of mechanical efficiency. The test he left: *a component earns its place by delivering more work than it consumes.* Edinburgh Protocol's third pillar.

**Harness Harness Post** — [`_posts/2026-06-13-the-harness-harness.md`][harness]
The lighter complement to this manifesto. Why methodology exists at all before the mechanism is named.

---

## Links

[edinburgh]: canon/edinburgh-protocol.md
[td]: playbooks/td-playbook.md
[silo]: playbooks/silo-playbook.md
[harness]: _posts/2026-06-13-the-harness-harness.md

---

*Shannon-Packet revision: retro-fit of the original 2026-06-11 silo-manifesto through the four-invariant content format. Same through-line, tighter delivery. See [`_drafts/2026-06-11-silo-manifesto.md`](.) for the unedited original.*
