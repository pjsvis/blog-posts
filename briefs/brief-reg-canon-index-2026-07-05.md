---
title: "BRIEF: Wire canon/INDEX.jsonl into reg-sync"
date: 2026-07-05
type: brief
status: done
tags: [registry, reg-sync, canon, jsonl, automation, barnacle-prevention]
---

# Brief: Wire canon/INDEX.jsonl into reg-sync

**Date:** 2026-07-05
**Status:** Done — executed 2026-08-10 via commit e88906c (canon wired in as 6th registry; bare-basename convention; canon/INDEX.jsonl created with 7 entries).
**Silo:** blog-posts
**Scope:** Single-file change to `scripts/reg-sync.ts`

---

## Objective

Wire `canon/INDEX.jsonl` into the `reg-sync` registry system so that `canon/` is checked for filesystem/index drift alongside briefs, debriefs, decisions, playbooks, and images. Today the canon directory is unregistered, which allowed an entry (`okf-entropy-dialogue-2026-07-05.md`) to sit on disk without an INDEX entry until noticed manually.

**Why now:** During the 2026-07-05 session, two research-dialogue files were on disk but missing from `canon/INDEX.jsonl`. The gap was caught only because the agent manually validated JSON lines one-by-one. This is exactly the class of drift `reg-sync` exists to catch — and it isn't currently catching it for `canon/`.

---

## Post Details

**Proposed Title:** (Not a post — internal automation brief)
**Target Platform(s):** n/a (internal)
**Categories:** automation, registry, infrastructure

---

## The Change

`scripts/reg-sync.ts` line 26 declares a `REGISTRIES` record with five entries. Add `canon` as a sixth:

```typescript
const REGISTRIES: Record<string, RegistryDef> = {
  briefs:    { indexPath: "briefs/INDEX.jsonl",   dirPath: "briefs",    ... },
  debriefs:  { indexPath: "debriefs/INDEX.jsonl", dirPath: "debriefs",  ... },
  decisions: { indexPath: "decisions/INDEX.jsonl",dirPath: "decisions", ... },
  playbooks: { indexPath: "playbooks/REGISTRY.jsonl", dirPath: "playbooks", ... },
  canon: {                                // ← ADD
    indexPath: "canon/INDEX.jsonl",
    dirPath: "canon",
    // same shape as the others; match the existing fields exactly
  },
  // images handled separately (different schema, different code path)
};
```

Two adjacent touch-points to update at the same time:

1. **Usage string** (line ~176–177): add `canon` to the listed registries:
   ```
   Usage: bun scripts/reg-sync.ts <briefs|debriefs|decisions|playbooks|canon|images|--all> [--fix]
   ```
2. **Default status on `--fix` regeneration** (line ~142): `canon` defaults to `"active"` (same as briefs/debriefs/playbooks — only decisions uses `"Proposed"`).

### Expected behavior after the change

```bash
bun scripts/reg-sync.ts canon      # check canon alone
bun scripts/reg-sync.ts --all      # canon now included in the sweep
bun scripts/reg-sync.ts --all --fix
```

`just reg-sync` and `just check` (which calls `reg-sync --all`) now cover canon automatically.

---

## Constraints

- **No schema changes to `canon/INDEX.jsonl`.** The existing field set (`file`, `date`, `status`, `summary`) already matches what reg-sync expects. The `meta` field is optional and may be absent on canon entries — reg-sync should already handle that (it does on the other registries).
- **The `file` field uses the `canon/` prefix** in the existing canon entries (e.g. `"file":"canon/edinburgh-protocol.md"`). Verify whether reg-sync expects filenames relative to the registry directory (no prefix) or relative to repo root (with prefix). **The other registries use no prefix** (`"file":"2026-05-23-brief-xxx.md"`). This is the one real decision in the brief — see Research Needed below.
- **No front-matter changes to canon files.** OKF conformance is separate; reg-sync is registry-only.

---

## Research Needed

- [ ] **Filename-prefix convention.** Check `reg-sync.ts` line ~140–150 (the `--fix` regeneration path) to confirm whether it writes `"file":"<basename>"` or `"file":"<dir>/<basename>"`. If the former, the existing canon INDEX entries (which carry the `canon/` prefix) need their prefix stripped in the same commit, for consistency. If the latter, no change needed.
- [ ] **Run `bun scripts/reg-sync.ts canon --fix` on a copy** (or in `--dry-run` if supported) to preview the regenerated entries before touching the live index.
- [ ] **Verify `just check` still passes** after the change.

---

## Validation

- `bun scripts/reg-sync.ts canon` runs without error and reports `canon` as `up to date` (given the current INDEX matches disk).
- `bun scripts/reg-sync.ts --all` includes `canon` in the sweep.
- `just check` still passes end-to-end.
- A drift simulation: temporarily rename a canon file, run `reg-sync canon`, confirm it reports `MISSING`/`STALE`; restore.

---

## Notes

- This is a one-file, ~15-line change. The brief exists because the change touches shared infrastructure (`reg-sync.ts` is on the critical path for `just check`) and because the filename-prefix question needs answering before the commit, not during it.
- Follow-up (separate brief, not this one): the `canon/INDEX.jsonl` schema could be extended with OKF-conformant fields (`type`, `title`, `tags`) to align with the canon bundle in `just-silo/canon/`. That is a larger change and should not be bundled with this one.

---

## Done

When:
- [ ] `canon` is a registered entry in `REGISTRIES`
- [ ] Usage string lists `canon`
- [ ] `bun scripts/reg-sync.ts canon` reports up-to-date against the current INDEX
- [ ] `bun scripts/reg-sync.ts --all` includes canon in the sweep
- [ ] `just check` passes
- [ ] Drift simulation confirms MISSING/STALE detection works for canon
- [ ] Filename-prefix convention matches the other registries (or documented exception)
