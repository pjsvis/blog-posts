# Conventions Playbook

## What This Is

A living record of the project's **active conventions** — the rules we follow
because they solve real problems — and a process for identifying and removing
**barnacles**: conventions that have lost their purpose but live on in docs,
scripts, and agent context, misleading everyone who follows them.

## What Is a Barnacle?

A barnacle is a document fragment, script comment, or supposed "convention" that:
1. **Misdirects** — tells an agent to do the wrong thing
2. **Perpetuates bad practice** — the more it is followed, the worse things get
3. **Has no living justification** — nobody can explain why it exists

Barnacles are an **emergent property** of any silo. Documents drift. Tools
change. What once made sense becomes noise, then harm. They accumulate silently
until an agent spends an hour debugging a problem caused by following a
barnacle.

## The Justfile Barnacle (Case Study)

**What it was:** A "convention" that the file must be named `Justfile`
(capitalized).

**Why it formed:** Someone capitalized it once. It looked official. It stuck.

**Why it became a barnacle:** The tool `just` writes to `justfile` (lowercase)
when you run `just --unstable --fmt`. Every formatter run created a second file
on macOS (case-insensitive filesystem, same inode). Agents kept manually
renaming it back. The "convention" created recurring friction with no benefit.

**The scrape:** We deleted `Justfile`, kept `justfile`, updated all docs, and
added this playbook entry so the next agent does not recreate it.

**Lesson:** If a convention fights the tool default, suspect it. If you cannot
justify it in one sentence, delete it.

## Active Conventions

| Convention | Justification | Since |
|------------|---------------|-------|
| Jekyll underscore directories | Jekyll hard-codes `_posts/`, `_drafts/`, `_layouts/`, `_config.yml` — no config override exists; renaming breaks the build | 2026-05-17 |
| `justfile` lowercase | Tool default; formatter compatibility | 2026-05-17 |
| Front-matter on all posts | Required for Jekyll routing, platform export, and post metadata; no exceptions | 2026-05-17 |
| Write a brief before drafting | Prevents scope creep and unclear objectives; see `playbooks/briefs-playbook.md` | 2026-05-17 |
| Write a debrief after publishing | Captures what worked, what didn't, and platform-specific lessons for next time | 2026-05-17 |
| Capture decisions as ADRs | The *why* behind content and technical choices lives longer than the post itself; see `playbooks/decisions-playbook.md` | 2026-05-17 |
| Review exports before distributing | Automated export is a first pass; review `_exported/` before pasting into Substack/Medium | 2026-05-17 |
| Branch before editing | Never commit directly to `main`; use feature branches for draft work and post revisions | 2026-05-17 |
| Every deliberate folder has a `README.md` | Prevents mystery; draws boundaries between adjacent dirs | 2026-05-17 |

## Barnacle Removal Record

| Date | Barnacle | Where Found | Why Removed | Removed By |
|------|----------|-------------|-------------|------------|
| 2026-05-17 | TA_DASHBOARD_PORT, PORTFOLIO_DB, src/server/, Biome, Bun.spawn, pos+slicing, and all other tradingagents-specific entries | `playbooks/conventions-playbook.md` | Carry-over from tradingagents repo; zero relevance to blog-posts pipeline; would misdirect agents into looking for TypeScript infrastructure that doesn't exist here | claude |

## Process Barnacles

Barnacles aren't just in documents. The development process itself accumulates
drift: tasks marked `in_review` on a merged PR, planning docs that don't match
the td database, handoff files referencing work that's been done for days.

**Process barnacles are more dangerous than doc barnacles** because they
mislead agents about what work actually remains.

| Process Barnacle | Symptom | Fix |
|------------------|---------|-----|
| Draft in `_posts/` | Unfinished posts go live because they were in the wrong directory | Keep drafts in `_drafts/` only; move to `_posts/` when ready |
| Publish without `just check` | Front-matter malformed or missing; Jekyll build fails or post has no metadata | Run `just check` before every commit to production |
| Export without reviewing | Automated output contains formatting artefacts, broken links, or missing sections | Open `_exported/` files and read them before distributing |
| Skip the debrief | Platform lessons (Substack formatting, Medium constraints, HN reception) are lost; next post repeats the same mistakes | Write a debrief after every significant post; see `playbooks/debriefs-playbook.md` |
| Orphaned branches | Old `feat/` branches for completed posts still exist locally; confuse `git branch` output | `git branch -d` after merging; no reason to keep feature branches once merged |

## Barnacle Inspection Prompt

**Run this at the start of every session.** If you find a barnacle, either
remove it or add it to the record above with a note explaining why it persists.

```
## Barnacle Inspection

### Document barnacles
Scan the project's documents (playbooks, docs, READMEs, AGENTS.md) and
scripts for fragments that:

1. Direct the reader to do something that contradicts an active convention
2. Reference a tool, path, or process that no longer exists
3. Insist on a naming or formatting rule that conflicts with the tool default
4. Describe a workflow that has been superseded by automation
5. Contain copy-paste from another project (wrong names, wrong paths)

For each candidate found, judge:
- Does it have a one-sentence justification?
- Does following it create friction?
- Is it referenced anywhere other than the document itself?

Also inspect the directory tree:
- Any folder with more than one file and no `README.md`? Suspicious.
- Drafts in `_posts/` instead of `_drafts/`? A process barnacle.

If it fails two of three: it is a barnacle. Scrape it. Update the record.
If it passes: add to the Active Conventions table with its justification.

### Process barnacles
After the doc scan, run these checks:

1. `just orient` → are there uncommitted changes from a previous session?
2. `git branch` → any feature branches for work that's already merged? Delete them.
3. `_posts/` → any files that look like drafts (work in progress titles, missing front-matter)?
4. `_exported/` → any stale exports from old posts that were revised?
```

## Startup Ritual

When you begin work on this silo, run:

```bash
# 1. Orient: see branch, status, recent work
just orient

# 2. Fetch latest from remote
git fetch origin

# 3. Start a new td session
td usage --new-session

# 4. Read the barnacle record
cat playbooks/conventions-playbook.md | sed -n '/Barnacle Removal Record/,/Barnacle Inspection Prompt/p'
```

If you scraped a barnacle, commit with message:
```
fix(conventions): scrape <name> barnacle

<one sentence why it was misleading>
```

## Agent Note

You are not maintaining conventions for their own sake. You are preventing
the accumulation of misdirection. Every barnacle you scrape saves the next
agent an hour. Every barnacle you leave costs the next agent an hour.

The learning loop is only virtuous if it does not foul the silo.