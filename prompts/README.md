# Prompts — Subject Expert Personas and Writing Sleeves

## Purpose

This directory contains reusable persona templates and writing style directives that agents in this silo can invoke for specific tasks.

Unlike playbooks (which describe *process*), prompts describe *persona* — the cognitive stance, knowledge domains, and interaction style that shapes how an agent approaches a problem.

## Registry

| File | Type | Domain | Status | Summary |
|------|------|--------|--------|---------|
| `zero-g-engineer.md` | persona | space-architecture | active | Zero-g-native first-principles reframe of 1g assumptions |
| `zero-g-primer.md` | primer | space-architecture | active | Foundational primer — floor optionality, mass as currency, human tensegrity, habitat taxonomy |
| `ctx-writer-sleeve.json` | persona | writing-style | active | Grounded, sharp writing style — deductive minimalism |

Run `bun scripts/reg-list.ts prompts` for a machine-readable listing.

---

## Invoking a Persona

### Single invocation

Prepend the persona template to your context when working in its domain:

```
[Read prompts/zero-g-engineer.md and apply its cognitive stance to this problem]
```

### Combined invocation

Multiple personas can be stacked — the order determines which is primary:

```
1. Read prompts/ctx-writer-sleeve.json — writing style and tone
2. Read prompts/zero-g-engineer.md — content framing and domain knowledge
3. Apply both: zero-g engineer provides the reframe, writer sleeve provides the voice
```

### With Edinburgh Protocol

The Edinburgh Protocol is the base. Subject expert personas extend it, not replace it:

```
[Base: Edinburgh Protocol — Scottish Enlightenment, Humean skepticism, empirical grounding]
[Override: prompts/zero-g-engineer.md — freefall-native reframe of 1g assumptions]
[Style: prompts/ctx-writer-sleeve.json — deductive minimalism, tactical action mode]
```

---

## Adding a New Persona

1. Write the persona template in Markdown (`.md`) or JSON (`.json`) as appropriate
2. Add entry to `prompts/INDEX.jsonl`:
   - `file`: filename
   - `date`: ISO date
   - `status`: `active`, `draft`, or `deprecated`
   - `summary`: one-sentence description
   - `meta.type`: `persona` or `sleeve`
   - `meta.domain`: functional domain
3. Add a `prompts/README.md` entry above if this is the first new persona

**Do not create sub-folders in prompts/.** Single level only. If you need to organize, use filename prefixes (e.g., `space-`, `writing-`) or front-matter metadata.

---

## Document Types

Prompts directory contains three types of documents:

| Type | Purpose | Example |
|------|---------|---------|
| **Primer** | Foundational domain knowledge — intuitive reframe, key numbers, vocabulary | `zero-g-primer.md` |
| **Persona** | Domain knowledge, cognitive stance, first-principles reframe for active use | `zero-g-engineer.md` |
| **Sleeve** | Tone, voice, structural approach to text | `ctx-writer-sleeve.json` |

**Read order:** Primers are pre-requisite reading. Read the primer before invoking the corresponding persona in a new session.

For content creation, use both: subject expert for *what to say*, writing sleeve for *how to say it*.

---

## Relationship to Other Directories

| Directory | Content | When to reference |
|-----------|---------|-------------------|
| `agent/concepts/` | Conceptual lexicon — terms, principles, definitions | When a persona references a concept (e.g., tensegrity) |
| `playbooks/` | Process knowledge — how to write briefs, debriefs, ADRs | When workflow is needed alongside persona |
| `briefs/` | Post briefs — scoped objectives for specific content | When the persona is being applied to a specific post |

---

## Related

- `prompts/zero-g-primer.md` — **read first** for any session involving space architecture
- `prompts/zero-g-engineer.md` — active persona, requires primer as foundation
- `agent/concepts/tensegrity.md` — structural principle referenced by zero-g persona
- `playbooks/registry-playbook.md` — registry system principles
- `playbooks/silo-playbook.md` — silo structure and conventions