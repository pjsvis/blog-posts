---
type: brief
id: shannon-packet-schema-cross-validation
date: 2026-08-16
status: open
summary: Test the self-originated Shannon Packet schema against external writing schemas, starting with Vonnegut's eight rules (primary-verified). Deliverables: coverage matrix with preregistered predictions, targeted playbook amendments, second-schema confirmation pass.
---

# Brief: Cross-validate the Shannon Packet — Vonnegut's eight rules first

## Objective

Test the Shannon Packet against external writing schemas and tighten the
writing playbooks where the test exposes real gaps. First opponent: Vonnegut's
eight rules from the *Bagombo Snuff Box* preface — **primary-verified**, not
the scrape's seven. The deliverable is a coverage matrix plus minimal playbook
amendments, not a schema relaunch.

## Why now

Three things converged on 2026-08-16:

1. **The convergence evidence.** The two-step progressive discovery has now
   been independently derived at least five times: Vonnegut 5+8, classical
   *in medias res* + Homeric orientation, the TL;DR-first packet, the
   header/payload canon dialogue, and the consistency-gate brief's
   cheapest-gate-first funnel. Independent lineages converging on one
   structure is evidence the structure is discovered, not invented — which
   makes now the right time to stress-test what we built around it.
2. **A lossy channel was caught in the act.** The Mental Garden scrape
   transmits seven of Vonnegut's eight rules — it drops rule 8 ("give your
   readers as much information as possible... to hell with suspense"), the one
   rule that most resembles our own TL;DR header. Comparing secondary source
   against primary caught the drop. The checksum discipline works; this brief
   extends it from links to schemas.
3. **The process is stable enough to tighten.** The packet spec, audience
   mapping, and verification loop are in production in
   `post-blog-writing-playbook.md`. Tightening is cheap; later it won't be.

## Method

1. **Primary-source verification.** Obtain the eight rules verbatim from the
   *Bagombo Snuff Box* preface (1999). Do not amend anything on the scrape's
   word. The scrape (preserved at
   `canon/vonnegut-bagombo-rules-scrape-2026-08-16.md`) is flagged lossy.
2. **Coverage matrix.** Rules × packet fields. Every cell gets a verdict:
   `covered` / `partial` / `gap` / `genre-bound`. Genre-bound rules may inform
   playbook prose but never become packet fields.
3. **Adjudicate the preregistered predictions below.** The matrix was
   predicted before being built; note where the prediction failed.
4. **Watt-test every amendment.** A field or pass earns its place only if it
   removes more entropy than it adds. The packet stays minimal — no schema
   sprawl from a listicle.
5. **Second-schema confirmation.** Run the same matrix against one more
   external schema to avoid overfitting to Vonnegut. Candidates: Elmore
   Leonard's ten rules; Orwell's six rules from *Politics and the English
   Language*. Both canonical, both short.
6. **Amend the playbooks.** `post-blog-writing-playbook.md` first; lexicon
   entries second. One commit per amendment.
7. **Debrief.** What landed, what was rejected, why.

## Preregistered predictions (falsify these)

| # | Rule (compressed) | Predicted packet coverage | Verdict prediction |
|---|---|---|---|
| 1 | Time well spent | TL;DR claims reader ROI | **partial** — claimed, ungated |
| 2 | Someone to root for | — | **genre-bound** (fiction) |
| 3 | Everyone wants something (a glass of water) | — | **gap** — packet states position, never a want/ask |
| 4 | Sentence reveals or advances | Step 6 Cut + Watt test | **covered** (as process pass) |
| 5 | Start close to the end | TL;DR-first / two-step discovery | **covered** |
| 6 | Be a sadist | "Agent examines" is friendly verification | **partial** — no hostile-read pass |
| 7 | Please one person | Bounded context / audience mapping | **covered** (implicit) |
| 8 | To hell with suspense | TL;DR itself | **covered** — the rule the scrape dropped |

**The predicted headline gap:** rule 3. The packet has a position field and no
**ask** — what the writer wants from the reader. Candidate amendment: an `Ask:`
line in the TL;DR, subject to the Watt test.

**The predicted partial:** rule 6. "Agent examines, gathers, reports" verifies
links, not arguments. Candidate: a hostile-read pass — does the packet survive
a reader trying to break it, not just check it? Related to (but distinct from)
the Coherent Lie failure mode in the consistency-gate brief.

## The reverse direction

The packet has fields Vonnegut lacks entirely: **Attribution**, **Links**,
**Channel Quality** — because his unit is the sentence-story and ours is the
claim. He optimizes attention acquisition; we optimize verification retention.
The schemas are complementary halves of one channel: the hook acquires the
reader, the checksum keeps the writer honest. The matrix should record this
asymmetry, not flatten it.

## Constraints

- **Sibling to `briefs/2026-08-08-brief-shannon-packet-consistency-gate.md`**
  (status: open). Both amend the same playbook. Sequence explicitly: whichever
  lands first, the other rebases on it. No clobbering.
- **Primary source or nothing.** No amendment traces to the scrape alone.
- **Genre-bound ≠ packet field.** Fiction rules become optional prose in the
  playbook, never schema.
- **Watt test on everything.** If an amendment adds ceremony without removing
  entropy, it is a barnacle. Reject it in the debrief.
- **EP register.** A tightening, not a relaunch.

## Done

- [ ] Eight rules verified against the *Bagombo Snuff Box* preface (primary)
- [ ] Coverage matrix committed, predictions adjudicated
- [ ] Second-schema confirmation pass (Leonard or Orwell)
- [ ] Playbook amendments committed (one per amendment, Watt-tested)
- [ ] Lexicon updated for any field that lands (e.g. `ask`, `hostile-read`)
- [ ] Debrief written: landed / rejected / why

## Siblings & prior marble

- `briefs/2026-08-08-brief-shannon-packet-consistency-gate.md` — the packet's
  own honest-limits correction; sequence against this brief.
- `canon/payload-header-fiction-dialogue-2026-07-05.md` — header/payload
  separation, the same structure in fiction.
- `canon/vonnegut-bagombo-rules-scrape-2026-08-16.md` — the trigger artifact,
  preserved with its lossy-channel note.
- The two-step progressive discovery lexicon entry — the convergent structure
  this brief takes as evidence.

## Notes

Provenance acknowledged: the trigger for this tightening was an eight-minute
listicle. Channel ≠ payload — the checksum exists to separate them, and on
2026-08-16 it did. A parked post title, if the matrix yields anything public:
*"In medias res is a loan."*
