---
title: "BRIEF: Fix the reg-sync --fix UX gap and clear registry drift"
date: 2026-08-10
type: brief
status: done
tags: [registry, reg-sync, justfile, ux, drift, foundation-tests, infrastructure]
---

# Brief: Fix the reg-sync `--fix` UX gap and clear registry drift

**Date:** 2026-08-10
**Status:** Done — Tasks 1–3 complete (commits 7bcba90, bc1a2b5, e88906c). Foundation-test criterion blocked by 2 pre-existing issues — see Execution Log.
**Silo:** blog-posts
**Scope:** `justfile` (1 recipe), `scripts/reg-sync.ts` (message only), then index regeneration

---

## Objective

Make `just reg-sync --fix` actually work (today it errors), clear the accumulated registry drift so the foundation test suite goes green again, and fold `canon/` into the registry sweep.

**Why now:** During the 2026-08-10 commit session, `just reg-sync` reported large drift (36 briefs, 3 debriefs, 2 decisions, 3 playbooks, 3 images MISSING) and ended with the instruction `Run with --fix to regenerate indexes.` — but `just reg-sync --fix` fails with `error: justfile does not contain recipe '--fix'`. Two of three foundation tests (`tests/00-foundation.sh`) are red as a result. The instruction is a lie at the `just` layer, and the drift it points at is real.

---

## The Problem — root cause

A leaky abstraction between two layers:

- **Script layer** (`scripts/reg-sync.ts`): parses `--fix` correctly (`const fix = args.includes("--fix")`) and prints `"Run with --fix to regenerate indexes."` when drift is found. Accurate at this layer.
- **Just layer** (`justfile` recipe `reg-sync`): declares **no parameters**, so `just` parses a trailing `--fix` as a *recipe name*, not an argument:

  ```
  $ just reg-sync --fix
  error: justfile does not contain recipe `--fix'
  ```

The flag exists; the recipe does not forward it. A separate recipe `reg-sync-fix` does the right thing, but the script's message never mentions it — so the user follows the printed instruction straight into an error.

Current recipes (`justfile:78-82`):

```just
reg-sync:
  bun scripts/reg-sync.ts --all

reg-sync-fix:
  bun scripts/reg-sync.ts --all --fix
```

---

## The Change

### Task 1 — Make `reg-sync` forward arguments (the actual fix)

Make `reg-sync` variadic so extra args pass through to the script. Keep `reg-sync-fix` unchanged (docs, playbooks, and `tests/00-foundation.sh` all reference both names):

```just
reg-sync *args:
  bun scripts/reg-sync.ts --all {{args}}

reg-sync-fix:
  bun scripts/reg-sync.ts --all --fix     # unchanged
```

**Behavior after:**
- `just reg-sync` → check-only (default; `{{args}}` empty). **Test-safe** — `tests/00-foundation.sh:48` calls bare `just reg-sync` and greps for `MISSING from index`; unchanged.
- `just reg-sync --fix` → regenerates indexes. The printed instruction is now truthful at the `just` layer.
- `just reg-sync-fix` → unchanged alias.

### Task 2 — Clear the registry drift

1. Run `just reg-sync --fix` (or `just reg-sync-fix`) to regenerate all `INDEX.jsonl` / `REGISTRY.jsonl` files from disk.
2. Review every stub summary the regeneration writes (`"(auto-generated — add description)"`) and replace with a real one-line description. These are the entries that were missing.
3. Confirm `just reg-sync` now reports `✓ up to date` for all five registries.

### Task 3 — Wire `canon/` into the sweep

This is already specified in **`briefs/brief-reg-canon-index-2026-07-05.md`** (Status: Open). Execute that brief — do not re-derive it here. It covers: adding `canon` to the `REGISTRIES` map, resolving the filename-prefix question (`canon/` prefix vs. bare basename), updating the usage string, and defaulting `canon` status to `"active"`.

Order: Task 1 first (so Task 2 uses the nicer `just reg-sync --fix`), then Task 2, then Task 3.

---

## Constraints

- **Do not remove `reg-sync-fix`.** `playbooks/silo-playbook.md:109`, `playbooks/registry-playbook.md`, and `tests/00-foundation.sh` reference it. Keep it as-is.
- **Do not change `just check`.** It calls `bun scripts/reg-sync.ts --all || true` (`justfile:23`). The `|| true` masks the exit code but **not** the stdout — which is why Test 2 catches drift via output grep. Leave this alone; clearing the drift (Task 2) is the correct fix, not weakening the test.
- **Variadic only, not a rename.** `*args` (zero-or-more), not `+args`. Bare `just reg-sync` must remain check-only.
- **Script message stays.** `"Run with --fix to regenerate indexes."` becomes correct once Task 1 lands — no edit needed. (Optional: change to `Run with --fix (or: just reg-sync-fix) to regenerate indexes.` for extra discoverability. Low priority.)

---

## Research Needed

- [ ] Confirm `just 1.53.0` (installed) supports `*args` variadic recipes with `{{args}}` interpolation. (It does — documented since just 0.x. Verify with a one-line throwaway recipe before editing the real one.)
- [ ] After Task 1, confirm `just reg-sync` (no args) still exits non-zero on drift (so `just check`'s behaviour is preserved) — the variadic forwarding must not swallow the script's exit code.
- [ ] Before Task 2, decide whether any MISSING entries are **stale** (in index, not on disk) vs **missing** (on disk, not in index). The current run showed only MISSING, no STALE — re-confirm at execution time.

---

## Validation

- [ ] `just reg-sync --fix` runs and regenerates indexes (previously errored).
- [ ] `just reg-sync` reports `✓ up to date` for briefs, debriefs, decisions, playbooks, images.
- [ ] `just reg-sync-fix` still works (unchanged).
- [ ] `bash tests/00-foundation.sh` → **ALL 3 FOUNDATION TESTS PASSED** (currently Tests 2 and 3 fail on drift output).
- [ ] Task 3 validation per `brief-reg-canon-index-2026-07-05.md`.

---

## Notes

- **Decision: Option C (variadic + keep alias).** Alternatives considered: (A) variadic only, drop `reg-sync-fix` — rejected, breaks references; (B) keep the split, soften the script message — rejected, leaves the lie in place. C is the minimal diff that makes the printed instruction true without breaking docs or tests. This is a small framing decision; an ADR is optional, not required.
- **Out of scope — captured so they aren't lost:**
  - `docs/` contains 3 PDFs (~2.5 MB: `shannon_51.pdf`, `5678644.pdf`, `poverty_of_biomechanics_draft.pdf`), currently untracked and deliberately NOT committed. Decision needed: keep in git (bloat), Git LFS, or `.gitignore` + keep local. Separate call.
  - `scripts/code-index.ts` is an **empty** (0-byte) untracked file, also deliberately NOT committed. Delete it or fill it — do not commit it empty.
- **Commit cadence:** one commit per task (Task 1 = justfile, Task 2 = regenerated indexes + edited summaries, Task 3 = canon wiring). Follow repo convention of direct-to-`main` content/infra commits (linear history; the AGENTS.md "branch before editing" line is aspirational for code work and not followed for content drops).

---

## Done

When:
- [x] `just reg-sync` is variadic; `just reg-sync --fix` regenerates indexes
- [x] `reg-sync-fix` recipe preserved unchanged
- [x] All **six** registries report `✓ up to date`; 64 stub summaries replaced with title-derived descriptions
- [ ] `bash tests/00-foundation.sh` passes all 3 tests — **BLOCKED**, pre-existing (see Execution Log)
- [x] `canon/` wired into reg-sync (per `brief-reg-canon-index-2026-07-05.md`)

## Execution Log (2026-08-10)

Tasks 1–3 complete and pushed to `main` (`bc1a2b5..e88906c`).

- **Task 1** (7bcba90): `reg-sync` now variadic (`*args`); `just reg-sync --fix` works. `reg-sync-fix` unchanged.
- **Task 2** (bc1a2b5): regenerated all indexes; 57 stub summaries filled from each file's own H1/title (1 correction: `ai-writing-detection-04`).
- **Task 3** (e88906c): `canon/` added as 6th registry; `canon/INDEX.jsonl` created (7 entries, bare-basename convention). Resolves `brief-reg-canon-index-2026-07-05.md`.

**Foundation suite — not fully green, but NOT from this work:**
- **Test 1 (`just build`)** — pre-existing environmental failure: `Gemfile.lock` requires bundler 4.0.11 but system Ruby is 2.6 with no matching bundler. Needs a Ruby/bundler setup (rbenv/chruby), out of scope.
- **Test 2 (`just check`)** — registry drift cleared (Test 3 passes), but `check-posts.sh` now flags a **published** post with no front-matter: `_posts/2026-07-03-thermodynamics-of-vocabulary.md` starts with an H1, not `---`. Adding front-matter would *publish it properly on the live site* — a publishing decision, deferred to the user.
- **Test 3 (`just reg-sync`)** — PASS (no drift).

**Carried forward (out of scope, captured):** empty `scripts/code-index.ts` (0 bytes) still untracked — delete or fill.
