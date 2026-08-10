---
type: brief
id: shannon-packet-consistency-gate
date: 2026-08-08
status: open
summary: Tighten the Shannon Packet spec — rename veracity→consistency, formalise the metadata-header as the upstream Derrida gate, and add a reference register as the missing third gate. Extends the repo's own INDEX.jsonl pattern one layer out.
---

# Brief: Shannon Packet — Consistency, Not Veracity

## Objective

Tighten the Shannon Packet practice so the format claims only what it
structurally enforces. Three changes: (1) rename the third property from
*veracity* to *consistency* wherever the packet is described; (2) formalise
the metadata-header as an explicit first stage of the packet, upstream of the
TL;DR, so the Derrida Question gate runs on the header, not the body;
(3) add a reference register as the missing third gate — the same `INDEX.jsonl`
pattern the repo already runs for internal documents, extended to external
sources. The deliverable is an updated `post-blog-writing-playbook.md` plus a
short post that states the corrected claim publicly.

## The correction

The Shannon Packet enforces **concision** (structurally), exposes **clarity**
(encouraged, not gated), and tests **consistency** (coherence across
header ↔ TL;DR ↔ content ↔ bibliography). It does **not** test veracity.
Internal parity is not external truth. The constraint-stack-alignment brief
already named this as the **Coherent Lie** failure mode: a well-structured
fiction passes all three layers because the TL;DR summarises the false content
accurately and the narrativised bibliography narrates plausibly.

Calling the coherence check "veracity" oversells the format. The honest word is
*consistency*. The rename is not a downgrade — it is the EP applied to the
packet's own claims. A format that promises verification it cannot deliver is
itself a form of decorated Stuff.

## The three-stage gate

The funnel as it should be stated:

1. **Header gate (Derrida Question).** Metadata-header only: date, status, type,
   `brief_ref`, categories. Decides relevance in seconds. No body read. This is
   the cheapest gate and runs first — you don't spend verification budget on
   documents that fail the relevance gate.
2. **Coherence gate.** Bibliography ↔ TL;DR ↔ content. Catches drift, padding,
   and internal contradiction. Paid only if gate 1 passes. This is what the
   format enforces today; it is the *consistency* check.
3. **Reference register gate (the missing one).** Extract cited sources from the
   narrativised bibliography; key-match against a repo-bound register
   (`references.json` / `INDEX.jsonl`); reject in <2ms if a cited key is absent.
   Only then run any adversarial pass. This is the correspondence check — the
   one that catches the ghost source the coherence gate cannot.

Gate 3 is the `INDEX.jsonl` pattern the repo already runs for briefs, debriefs,
and decisions, extended one layer out to external sources. The pattern is
proven; the extension is the work.

## Why the narrativised bibliography is a double edge

Forcing who/what/why instead of a bare link raises the cost of fabrication (you
must narrate, not paste) **and** raises the credibility of the lie (a narrated
hallucination is harder to spot than a dead URL). The format is an anti-slop
move that becomes a pro-slop move if the author is already fabricating. The
reference register is what tips it back: narration makes the citation legible
to the deterministic lookup, and the lookup is what the narration cannot fake.

## The metadata-header as first-class stage

The `entropy-is-inevitable` post already does this in practice
(`brief_ref: 2026-07-05-brief-entropy-is-inevitable` in front matter).
Formalising it as stage 0 of the packet spec extends the Derrida Question gate
from "read the TL;DR" to "read the header" — cheaper still, and it lets an agent
or human triage a whole silo by sweeping front matter, the same way `reg-list`
sweeps `INDEX.jsonl`. The header is the orient-gate upstream of the TL;DR.

## Scope of work

1. **Rename** veracity → consistency across `post-blog-writing-playbook.md` and
   any other playbook/lexicon entry that describes the packet's properties.
2. **Formalise the header** as stage 0 in the packet spec: required fields,
   their role in the Derrida Question gate, the sweep-triage use case.
3. **Specify the reference register**: schema, ingestion path
   (`scripts/reg-sync` extended or a new `ref-sync`), the deterministic
   pre-check that runs before any adversarial pass.
4. **Update the post-blog-writing-playbook** with the three-stage gate and the
   corrected property list (concision / clarity-exposed / consistency-gated /
   correspondence-via-register).
5. **Short post** stating the corrected claim publicly — "the Shannon Packet
   tests consistency, not veracity; here's the missing gate." The post is the
   honest-limits section of the format, made external.

## Operational constraints

- **Watt test** every change to the playbook — no ceremony added to the format.
  The register is a gate, not a bureaucracy; if ingestion friction appears,
  the register becomes a barnacle.
- **EP register** — world-weary, precise, no manic enthusiasm. The correction
  is a tightening, not a relaunch.
- **No invented citations** — the reference register exists precisely to make
  this self-enforcing; the brief about it must not violate it.
- **Shannon-Packet format on the post** — the post must itself be a Shannon
  Packet, with the header gate and (once built) the register gate passing on
  its own bibliography. Eat the dog food.

## The honest limits (must appear in the post)

- **Consistency ≠ truth.** The rename is honest about what the format enforces;
  it does not make the format enforce more. The Coherent Lie is still possible
  *within* the register's scope if a registered source is itself wrong.
- **The register has an ingestion edge.** A source must be registered before it
  can be cited; the friction of registration is the trade-off for the
  deterministic check. If registration is too heavy, citations bypass it and
  the register becomes decorative.
- **The register covers external sources only.** Internal coherence (does the
  body advance the TL;DR) remains a judgment, not a lookup.
- **The unchecksummable apex.** The register verifies sources; it does not
  verify the *post's argument*. A post can cite only real sources and still be
  wrong. The register raises the floor on fabrication; it does not certify
  meaning. (Inherited from repo-as-thermostat.)

## Deliverables

- `playbooks/post-blog-writing-playbook.md` — updated: three-stage gate,
  corrected property list, header spec, register spec.
- `scripts/reg-sync.ts` (or new `scripts/ref-sync.ts`) — extended to sweep
  external references.
- `references.json` (or `assets/references/INDEX.jsonl`) — the register itself,
  seeded from existing post bibliographies.
- `_posts/<date>-shannon-packet-consistency-not-veracity.md` — the post,
  Shannon-Packet format.
- `briefs/2026-08-08-brief-shannon-packet-consistency-gate.md` — this brief.
- `debriefs/<date>-debrief-shannon-packet-consistency-gate.md` — capture
  whether the rename landed and whether the register gate earned its keep.

## Sibling / prior marble

- `briefs/2026-07-22-brief-constraint-stack-alignment.md` — proposed the
  reference register; this brief operationalises it in the repo that owns the
  pattern.
- `briefs/2026-07-07-brief-claude-shannon-post-style.md` — the editorial
  protocol; the packet format's house style.
- `briefs/2026-07-03-brief-shannon-packet-capture.md` — formalised the packet
  as a named protocol; this brief corrects its property claim.
- `briefs/2026-07-07-brief-repo-as-thermostat.md` — structural vs semantic
  entropy; the register is a structural-entropy gate, not a semantic one.
- `briefs/2026-07-07-brief-everything-but-the-agent.md` — admissible evidence;
  the register is what makes a citation admissible.

## Notes

The blog-posts repo is the right place because: (a) the Shannon Packet was born
here; (b) the `INDEX.jsonl` register pattern is in production here for internal
documents; (c) the constraint-stack-alignment brief that proposed the external
register already lives here. The work is extending a pattern this repo owns,
one layer out — not importing a foreign mechanism.
