---
layout: none
title: "Debrief: Zero-G Persona Architecture — Subject Expert Development"
date: 2026-05-26
status: done
summary: Built zero-g-engineer persona + primer, added Earth-bound application, created barnacle scrape brief
meta:
  platforms: internal-only
  adr: null
---

# Debrief: Zero-G Persona Architecture

**Date:** 2026-05-26  
**Duration:** Single session  
**Status:** Done

---

## What Was Accomplished

### 1. Zero-G Primer (`prompts/zero-g-primer.md`)

Built as the foundational document for agents and users unfamiliar with the domain. Delivers the intuitive reframe before the persona is invoked.

**Content:**
- The floor is optional (core reframe)
- Mass as the only currency (rocket equation, 1g thinking tax, quantified savings table)
- The body is a tensegrity structure (fascial chains, toe grip activation, Oxter Effect, movement snacks)
- The habitat taxonomy (reduced-g surface, transit, orbital, Lagrange — which assumptions apply where)
- Leverage = mass (mechanical advantage in zero-g is a mass problem, not a geometry problem)
- Movement snacks as the intervention model (daily cycle with snack timing)
- Key numbers to hold (bone loss rates, mass figures, gravity values)
- Appendix: Earth-bound application (Janeway/Elon problem space, mapping table for organizational/psychological problems)

**Outcome:** 236 lines, ~14KB. Read first before invoking the persona in any new session.

### 2. Zero-G Engineer Persona (`prompts/zero-g-engineer.md`)

Updated from initial 4-byte stub to full subject expert template.

**Additions over initial version:**
- Human tensegrity requirements section (fascial chains, movement snack model, cost of uncalibrated chains)
- Habitat taxonomy section (four-row table: reduced-g / transit / orbital / Lagrange with constraints)
- Leverage = mass in operational reality
- Reframe protocol step 5 (classify by habitat type before design assumptions)
- Updated trigger conditions (leverage/mass qualification, movement snack, habitat classification)
- Earth-bound application in identity block
- New trigger: psychology of high-velocity decision-makers

**Outcome:** 243 lines, ~15KB. Active in prompts registry.

### 3. Prompts Infrastructure

Built the supporting infrastructure for the prompts directory as a first-class silo registry:

| File | Purpose |
|------|---------|
| `prompts/INDEX.jsonl` | Registry (3 entries: zero-g-engineer, zero-g-primer, ctx-writer-sleeve) |
| `prompts/README.md` | Conventions: invocation patterns, content/style separation, document type table |
| `scripts/reg-list.ts` | Updated: prompts now listed via `just reg-prompts` |
| `justfile` | Updated: `just reg-prompts` target |
| `SILO_MANIFEST.md` | Updated: prompts registry in asset map |

**Outcome:** Prompts now follow the same registry discipline as briefs, debriefs, decisions, and playbooks. Single-level directory, JSONL index, `reg-list` integration.

### 4. Barnacle Scrape Brief (`briefs/brief-barnacle-scrape-2026-05-26.md`)

Created brief for the barnacle removal work identified during `just check`. Three-phase scope:

1. **Registry drift** — address MISSING/STALE across all registries (debriefs, decisions, playbooks)
2. **TradingAgents carry-over** — scan playbooks, briefs, decisions, prompts for wrong tool names, paths, and process references
3. **Stale drafts and process barnacles** — drafts in wrong directories, superseded decisions, briefs without content

**Process:** Adapted from TradingAgents Barnacle Removal System, simplified for blog-posts context (no infrastructure mapping required — documentation entropy only).

**Outcome:** Brief registered as `open` in `briefs/INDEX.jsonl`. Ready to execute.

---

## What Worked

**Domain knowledge from existing drafts informed the primer correctly.** The zero-g content already written (one-g-thinking, soft-airlock, rgem-cathedral) contained the hard numbers and engineering analysis. The primer and persona extracted the *lens* from that content — the reframe protocol — and encoded it as a reusable cognitive tool.

**Human tensegrity addition was the right call.** The fascial chains, Oxter Effect, and movement snack model are not obvious without explicit treatment. Adding them to the primer and persona makes the human factors section empirically grounded rather than vague.

**Earth-bound application in the primer appendix.** The mapping table (mass → attention, floor → organizational structure, etc.) and the Janeway/Elon use case give the persona utility beyond literal space engineering. This was a late addition prompted by the user and it substantially increases the value of the persona.

---

## What Did Not Work

**None.** The session completed all intended deliverables.

**Pre-existing registry drift discovered** (`just check` surfaced 4 missing entries in debriefs, decisions, and playbooks). This is not a failure of this session — it's pre-existing entropy from earlier work. The barnacle brief addresses it.

---

## Lessons Learned

**Subject expert personas benefit from a primer-first structure.** Reading a 236-line primer before invoking a 243-line persona is not overhead — it's the correct cognitive sequence. The primer builds the intuition; the persona applies it. Separating them means the primer can be read without committing to the persona, and the persona can be invoked without rebuilding the foundation.

**The taxonomy table was the right addition.** The habitat classification (reduced-g surface / transit / orbital / Lagrange) is the piece that makes the zero-g reframe protocol specific rather than vague. Different habitat types have different valid assumptions. Knowing which type you're working in determines which 1g assumptions to eliminate.

**Earth-bound application validates the persona as a general cognitive tool.** If the zero-g lens applies to organizational psychology and decision science — not just spacecraft design — then the persona has value across the full range of the blog's content. The Janeway/Elon series is the immediate use case.

---

## Related Decisions and References

**ADR:** None required (architecture decision, not blog content decision)  
**Platforms:** Internal only (persona/primer are silo infrastructure, not published content)  
**Dependencies:** `agent/concepts/tensegrity.md` (referenced), `prompts/ctx-writer-sleeve.json` (combined invocation)

---

## Open Items

- [x] Write briefs for Clippers thread (2026-05-26 session)
- [ ] Execute `briefs/brief-barnacle-scrape-2026-05-26.md` — registry drift, carry-over removal, stale draft cleanup
- [ ] Draft posts in sequence: The Clipper Moment → Cargo, Not Crew → Lloyd's of Lagrange

---

## Note: Clippers Analogy (Added Post-Session)

During the session, the user introduced a structural parallel between the clipper era of maritime trade (17th-19th century) and the current state of space logistics:

| Clipper Era | Space Equivalent |
|---|---|
| Commodities everywhere, manufacturing concentrated | Resources distributed, manufacturing emerging |
| Overland bulk transport infeasible | Current launch costs make bulk transport infeasible |
| Clippers solved the logistics constraint | Reusable heavy lift (Starship-class) solves the logistics constraint |
| Lloyd's of London emerged as the insurance institution | Orbital insurance / liability frameworks will be needed |
| Global maritime law developed alongside trade | Interplanetary legal frameworks needed |
| Enabled the industrial revolution by unlocking commodity access | Will enable space economy by unlocking resource access |

**Assessment:** The analogy is structurally sound and worth developing as a blog post series thread. Key points:
- The structural position is analogous: logistics constraint blocking an economy that is otherwise ready to function
- The difference: clippers exploited natural forces (wind); space clippers must manufacture their energy budget
- The implication: the SpaceX architecture is not just a rocket, it's the clipper — the transport layer that unlocks the system behind it
- The Janeway/Elon framing: Musk is not trying to win a race, he's trying to build the clipper. Starship doesn't need to be elegant; it needs to be large enough and cheap enough to make the whole system work.

**Recommendation:** Develop as a standalone post ("The Clipper Moment") and as a thematic thread through the SpaceX series. Also consider "Cargo, Not Crew" and "Lloyd's of Lagrange" as follow-on posts.

---

*Debrief complete. Session productive — all deliverables complete.*