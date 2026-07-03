# The Thermodynamics of Vocabulary

**Subtitle:** Controlling Semantic Entropy in Local AI Repositories

---

## TL;DR

A repository is a closed information system. Before an LLM can do useful work inside it, you must verify two things: the channel is clean (Shannon), and the vocabulary is bound (Evans).

**The structural test:** Index == Disk. Run a parity check. If it fails, stop and tidy.

**The semantic test:** Do your terms conflict? If the lexicon requires two definitions for the same word, the context has ruptured — spin off a component.

**The maintenance test:** Is the energy spent maintaining the mechanism equal to or less than the energy saved by its operation? If not, strip it out.

**The state machine:**
- Index != Disk → Stop. Tidy.
- Index == Disk + context over-saturated → Spin off. Encapsulate.
- Index == Disk + context tight → Green light. Proceed.

**What we conclude:** Semantic entropy is a directional vector. Internal entropy (Index != Disk) is a tidy signal — fix the baseline. External entropy (context over-saturated) is a spin-off signal — cut the tissue. The moment you stop verifying the baseline, you are computing over a corrupted channel.

Bibliography follows.

---

## Shannon's Channel and the Parity of Disk

Claude Shannon proved in 1948 that reliable communication is entirely possible over an unreliable, noisy medium as long as you introduce an internal tracking mechanism — a parity check — to detect and isolate errors.

```
Physical Files on Disk ◄─── Shannon Parity Check ───► Central Metadata Index
         │                                                        │
         └─── Fail: State Drift ───► STOP & TIDY                  └─── Pass ───► Green Light
```

In our architecture, the central metadata index acts as the repository's parity bit. If a file is added, deleted, or moved without a corresponding update to the index, the channel is corrupted.

Shannon's mathematics demonstrates that attempting to compute or decode a message over an unverified, corrupted channel is pure thermodynamic waste. By enforcing the Index == Disk gate as a strict runtime compiler constraint, we guarantee the structural integrity of the channel before the engine ever processes a token.

Once the channel's structure is verified, we must confront the message itself — and this is where semantic entropy enters the system.

---

## Measuring Entropy Direction

In the 1970s, Manny Lehman formalised what practitioners had long observed: as a software system evolves, its complexity increases unless active work is done to maintain or reduce it. This is Lehman's Second Law — Increasing Complexity — and it applies to repositories as much as to codebases.

But entropy is not random. It has a direction.

**Internal entropy** is what happens when the map no longer matches the terrain. You look at the repository and something feels wrong — files missing from the index, the index pointing to files that are gone, files moved without being registered. This is drift. Things change. The repair is housekeeping: stop what you're doing, update the map, verify the terrain. The signal is tidy — this is a known problem with a known solution.

**External entropy** is what happens when the core is sound but the boundary is straining. The map matches the terrain but you keep adding more and more to the edge — a house extended so many times it's lost its original shape, a word stretched to cover too many cases until it means nothing precisely. This is growth. The domain has outgrown the container. The signal is surgical — identify the straining edge, cut it free, give it its own closed world.

---

## Evans' Bounded Contexts and the Signal to Splinter

Large Language Models are trained on the unconstrained public internet. Consequently, their understanding of any given word is a blurred statistical average.

If you use the term "Brief" within your system, the model's internal attention mechanism balances that token against a massive web-scale distribution: corporate marketing briefs, legal filings, undergarment brands, and casual summaries.

```
Public Internet Distribution  ───► [ "Brief" ] ───► Diluted Average (High Entropy)
Local Repository Lexicon      ───► [ "Brief" ] ───► Precise Asset (Zero Entropy)
```

The solution is not to author exhaustive, multi-page playbooks for every concept — that trades token bloat for maintenance drag. The solution is a Conceptual Lexicon.

The theoretical precedent here is Eric Evans' Ubiquitous Language, the cornerstone of Domain-Driven Design (2003). Evans argued that software projects fail when the team's spoken vocabulary diverges from the code's conceptual model. He mandated a rigorous, shared language bound tightly within what he termed a Bounded Context.

Within a Bounded Context, a word has exactly one meaning. The moment a term requires two separate definitions, you have crossed a semantic border. When your local lexicon begins to conflict internally, the semantic boundary has ruptured — this is your indicator that external entropy has peaked. The mandated action: cut the tissue, spin off the component.

---

## The James Watt Test

All of this — the parity checks, the lexicon, the bounded contexts — must justify itself through the James Watt test. His principle, applied to thermodynamic systems: every component in a system must earn its place by delivering more work than it consumes.

Is the energy spent maintaining the mechanism equal to or less than the energy saved by its operation? If not, strip it out.

If maintaining the Index == Disk parity check costs more than it saves, abandon it. If the lexicon introduces more maintenance drag than it removes semantic noise, abandon it. The mechanism must earn its place in the engine.

This is not a philosophical position. It is a thermodynamic constraint.

---

## Narrativised Bibliography

**Claude Shannon — A Mathematical Theory of Communication (1948)** [[link pending: shannon-1948]]
The Noisy-Channel Coding Theorem. Proved that reliable communication is possible over unreliable media by introducing parity checks. In our architecture, Index == Disk is the parity bit. If the check fails, the channel is corrupted and you stop before computing.

**Manny Lehman — Laws of Software Evolution (1970s)** [[link pending: lehman-laws]]
Second Law (Increasing Complexity): as a system evolves, complexity increases unless active work is done to reduce it. We apply this to repositories and add a directional diagnostic: internal entropy is a tidy signal; external entropy is a spin-off signal.

**Eric Evans — Domain-Driven Design (2003)** [[link pending: evans-ddd]]
Ubiquitous Language and Bounded Contexts. A word has exactly one meaning inside a bounded context. The moment a term requires two definitions, you have crossed a semantic border. In our architecture, lexicon conflicts trigger the same mandated action as external entropy: cut the tissue, spin off the component.

**James Watt — Pragmatic Utility Test (late 18th century)** [[link pending: watt-utility]]
Does this component deliver more work than it consumes? If it fails, strip it out.

---

## Links

[shannon-1948]: link-pending
[lehman-laws]: link-pending
[evans-ddd]: link-pending
[watt-utility]: link-pending
[edinburgh-protocol]: canon/edinburgh-protocol.md