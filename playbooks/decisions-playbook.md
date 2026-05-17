# Decisions Playbook

## Purpose

An **Architecture Decision Record (ADR)** captures a significant choice — the *why* behind the *what*. Unlike briefs (aspirational, written before) and debriefs (retrospective, written after), ADRs are written *during* drafting, at the moment of decision.

**The ADR answers the question nobody asked at the time but everyone will ask six months later: "Why did we frame it this way?"**

## When to Write an ADR

Write an ADR when you:
- Choose between two viable framings or structures for a post
- Adopt a new tool or approach for the export pipeline
- Discover a constraint that changes the content or format
- Deprecate or supersede a previous decision

Don't write an ADR for:
- Obvious choices with no real alternative ("we used Jekyll because it auto-deploys to GitHub Pages")
- Temporary workarounds that don't shape the approach
- Personal preference (sentence length, tone) — those don't go in docs

## ADR Format

Every ADR is a single `.md` file in `decisions/`. Use numbered prefixes (`001-`, `002-`) for chronological ordering. Use the template at `decisions/TEMPLATE.md`.

```markdown
# Decision: [Title]

**Date:** YYYY-MM-DD
**Status:** [Proposed | Accepted | Superseded]

## Context
What situation led to this decision? One paragraph on the writing or technical context.

## Decision
What did we choose? One sentence.

## Alternatives Considered
| Alternative | Why Rejected |
|-------------|-------------|
| Option A | Reason |
| Option B | Reason |

## Consequences

**What became easier:**
- 

**What became harder:**
- 

**Constraints this imposes:**
- 

## Related
- Debrief: `debriefs/YYYY-MM-DD-topic.md`
- Playbook: `playbooks/*.md`
- ADR: `decisions/NNN-*.md` (supersedes / superseded by)
```

## Status Lifecycle

```
Proposed → Accepted → Superseded
                ↓
           (never deleted — ADRs are historical records)
```

- **Proposed:** Under discussion. Not yet committed to.
- **Accepted:** The decision is in effect. The approach follows this.
- **Superseded:** A later ADR replaced this decision. Add `Superseded by: decisions/NNN-*.md` to the top.

Never delete an ADR. Even superseded decisions are valuable — they explain why something was tried and why it was abandoned.

## Location

All ADRs reside in `decisions/`.
- `decisions/TEMPLATE.md` — the template for new ADRs
- `decisions/NNN-slug.md` — individual ADRs (numbered sequentially)

## Differences from Briefs and Debriefs

| | Brief | ADR | Debrief |
|---|-------|-----|---------|
| **When** | Before | During | After |
| **Answers** | "What will we write?" | "Why did we choose X?" | "What happened?" |
| **Audience** | Implementer | Future maintainer | Future agent |
| **Lifespan** | Becomes irrelevant after publishing | Retains value indefinitely | Historical reference |
| **Updates** | Status only (Open → Done) | Status only (Proposed → Accepted → Superseded) | Never (frozen on completion) |

## Review Checklist

Before committing an ADR:
- [ ] Uses the `decisions/TEMPLATE.md` format
- [ ] Alternatives table has at least two entries with specific rejection reasons
- [ ] Consequences include both "easier" and "harder"
- [ ] Constraints are specific and actionable
- [ ] Related links are correct and files exist