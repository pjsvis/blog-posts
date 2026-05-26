---
layout: none
title: "Brief: Barnacle Scrape — Registry Drift and TradingAgents Carry-Over"
date: 2026-05-26
status: open
summary: Scan blog-posts silo for barnacles — registry drift, tradingagents carry-over, stale drafts, front-matter issues
---

# Brief: Barnacle Scrape

## Objective

Inspect the blog-posts silo for barnacles and remove them using the process defined in `playbooks/barnacle-playbook.md`.

## Scope

Scan three target areas:

### 1. Registry Drift

Run `just check` and address all MISSING and STALE entries across all registries.

**Current known drift** (from last `just check` run):
- `debriefs/`: missing `2026-05-23-multi-platform-publishing-automation.md`
- `decisions/`: missing `adr-003-multi-platform-canonical-url-strategy.md` and `adr-004-stable-post-filenames-url-stability.md`
- `playbooks/`: missing `publication-playbook.md`

**Process:**
1. Run `bun scripts/reg-sync.ts --all --fix` to regenerate indexes
2. For each regenerated entry, confirm the summary is accurate (reg-sync generates stubs)
3. Update stub summaries with accurate descriptions where possible

### 2. TradingAgents Carry-Over

Scan all `playbooks/`, `briefs/`, `decisions/`, and `prompts/` for references to:
- `src/server/`, `src/shared/`, `Biome`, `Bun.spawn`, `pos+slicing`
- TradingAgents-specific process references (agent-modes, onboarding paths, handoff protocols that don't apply here)
- Wrong tool names (e.g., referring to TypeScript infrastructure that doesn't exist in blog-posts)
- Incorrect paths (references to `~/.tradingagents/` or tradingagents-specific directories)

**Process:**
1. Scan with `rg -l "tradingagents|Biome|src/server|src/shared|Bun\.spawn" playbooks/ briefs/ decisions/ prompts/`
2. For each match, determine if it is:
   - **Cargo** (reference to a tool/path/process that doesn't exist here) → drydock and remove
   - **Load-bearing** (reference to a legitimate pattern that happens to share a name) → add `@load-bearing` comment and preserve
3. Use the barnacle quarantine pattern: move to `decisions/drydock/` with pointer comment in source

### 3. Stale Drafts and Process Barnacles

Scan for:
- Drafts in `_posts/` instead of `_drafts/` (process barnacle — unfinished posts could go live)
- Old briefs from the silo formation that are no longer relevant
- Decisions that have been superseded but not marked as such

**Process:**
1. List `_posts/` files and confirm each has complete front-matter and is genuinely ready for publication
2. List `_drafts/` files and confirm each has a corresponding brief (check `briefs/INDEX.jsonl`)
3. Check `decisions/INDEX.jsonl` for any `Proposed` decisions that are now settled — update status to `Accepted`

## Exclusion

Do not scan:
- `_posts/` — published content (not subject to barnacle removal, changes here require a separate brief)
- `_drafts/` — work in progress (active drafts may contain carry-over as workspace notes, not barnacles)
- `_exported/` — generated output
- `agent/concepts/` — conceptual lexicon (these are living definitions, not carry-over)

## Process

1. Run `just check` and capture output
2. Address registry drift first (lowest risk, clear action)
3. Run carry-over scan with `rg`
4. Document findings in `decisions/drydock/DELETION_LOG.md`
5. Commit with message: `fix(conventions): scrape barnacles — registry drift + carry-over removal`

## Deliverables

- All registries in sync (no MISSING or STALE)
- No tradingagents carry-over in playbooks, briefs, decisions, or prompts
- `decisions/drydock/DELETION_LOG.md` updated with all removed content
- Stub summary descriptions updated in affected INDEX.jsonl files

## Related

- `playbooks/barnacle-playbook.md` — process reference
- `playbooks/registry-playbook.md` — registry system
- `playbooks/conventions-playbook.md` — active conventions and barnacle record