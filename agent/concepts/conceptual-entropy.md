# Conceptual Entropy

The accumulation of inconsistencies, outdated conventions, and silent drift between the documented state of the system and its actual state.

Conceptual entropy is what happens when a barnacle attaches: a small inconsistency that does not prevent the system from functioning, but introduces friction, ambiguity, and potential for error. Left unchecked, entropy compounds. The gap between stated convention and actual practice widens. New agents orient to the documented state and operate from incorrect assumptions.

## Sources of Entropy

- **Staleness** — Documentation that described the system accurately at time of writing but no longer reflects it
- **Contradiction** — Two or more conventions that specify incompatible behaviors
- **Absence** — A convention that should exist but doesn't, forcing agents to improvise
- **Drift** — Gradual divergence between the system's behavior and its documented requirements

## Manifestations

- A file named `Justfile` that works on some systems and not others (capital J vs lowercase j)
- A skill file referenced in conventions that does not exist at the stated location
- A brief that proposes work that has already been done
- An agent that operates from assumptions that were true in a previous session but are no longer accurate

## Mitigation

The **barnacle scraper** — the practice of identifying and removing small inconsistencies before they compound. Consistency is the key requirement, because completeness is unachievable. A system that is complete but inconsistent is a hall of mirrors.

The registry system (`scripts/reg-sync.ts` → `*/INDEX.jsonl`) is the primary tool for detecting entropy: when the registry and the project diverge, entropy has entered the system.

**See also:** triage, registry, justfile