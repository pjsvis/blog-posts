# Barnacle Playbook — Identification and Removal Process

## What Is a Barnacle?

A barnacle is a document fragment, script comment, or supposed "convention" that:
1. **Misdirects** — tells an agent to do the wrong thing
2. **Perpetuates bad practice** — the more it is followed, the worse things get
3. **Has no living justification** — nobody can explain why it exists

Barnacles are an **emergent property** of any silo. Documents drift. Tools change. What once made sense becomes noise, then harm. They accumulate silently until an agent spends an hour debugging a problem caused by following a barnacle.

---

## Barnacle Taxonomy

### Mechanical Checks (Rules-Based)

| Class | Pattern | Example in blog-posts |
|-------|---------|----------------------|
| **Cross-repo carry-over** | References to tools, paths, or processes from another project | TA_DASHBOARD_PORT in a blog-posts playbook |
| **Orphaned references** | Tool-generated path patterns stale after restructure | `archive/playbooks/td-playbook.md` in a repo without an archive |
| **Temporal decay** | Instructions for processes now automated | Manual deploy steps when GitHub Actions handles it |
| **Missing file references** | References to files that don't exist | `debriefs/INDEX.jsonl` when no such file exists |
| **Wrong tool defaults** | Conventions contradicting tool defaults | Instructions to use `Justfile` when `just` defaults to `justfile` |

### Semantic Checks (LLM-Assisted)

| Class | Pattern |
|-------|---------|
| **Doc/pipeline divergence** | Rule says X, actual pipeline does Y |
| **Tool-default fights** | Conventions contradicting Jekyll or `just` defaults |
| **Cross-doc conflicts** | Same topic addressed differently in two playbooks |
| **Context drift** | Content written for a different project type entirely |

---

## The Barnacle Scraping Process

### Phase 1: Scan

Run at the start of every session:

```
## Barnacle Inspection

### Document barnacles
Scan all .md files for:
1. References to tools, paths, or processes that don't exist in blog-posts
2. File references (INDEX.jsonl, CHANGELOG.md, scripts/maintenance/*.ts) that don't exist
3. Tool names or defaults that contradict Jekyll or just
4. Content clearly written for a different project (tradingagents carry-over)
5. Missing file references (links to files that aren't in the repo)

For each candidate found, judge:
- Does it have a one-sentence justification in this context?
- Does following it create friction for blog-posts workflow?
- Is it referenced anywhere other than the document itself?

Also inspect the directory tree:
- Any folder with more than one file and no README.md? Suspicious.
- Playbooks with stale headers from another project? Barnacle.

If it fails two of three: it is a barnacle. Document it. Remove it. Update the Barnacle Removal Record.
If it passes: keep it, or add a note explaining why it belongs.

### Process barnacles
After the doc scan, run these checks:

1. `just orient` → are there uncommitted changes from a previous session?
2. `git branch` → any feature branches for work that's already merged? Delete them.
3. `_posts/` → any files that look like drafts (work in progress titles, missing canonical_target)?
4. `_exported/` → any stale exports from old posts that were revised?

### Export pipeline barnacles
Check the export scripts and playbooks for:
- Platform references that no longer apply
- Script commands that don't exist
- Front-matter patterns that don't match `_config.yml`

```

### Phase 2: Remove

When you identify a barnacle:
1. **Do not delete** — replace or remove the misleading text, but keep the intent if it still applies
2. **Document it** — add to the Barnacle Removal Record in `conventions-playbook.md`
3. **Check for siblings** — if one playbook has the barnacle, the others likely do too; scan them all
4. **Commit with a clear message** — `fix(conventions): scrape <name> barnacle — <one sentence why it was misleading>`

### Phase 3: Quarantine (When in Doubt)

If a block looks suspicious but might be load-bearing (a Chesterton's Fence scenario), treat it as a potential barnacle and flag it for review rather than removing it outright.

**Escalation triggers:**
- **Context Conflict:** Reference to a tool or process not in the manifest, but implies a critical dependency
- **Ambiguous Instruction:** Manual step described for a process that may now be automated
- **Missing Reference:** Attribution to a file or script that doesn't exist
- **Logic Paradox:** Instruction contradicts the actual pipeline

Raise these to the user before removing.

---

## Barnacle Removal Record

Maintained in `playbooks/conventions-playbook.md`. Every removed barnacle goes here with:
- Date
- What was removed
- Where it was found
- Why it was a barnacle
- Who removed it

The record serves two purposes:
1. **Sentinel** — prevents the same barnacle from being re-added
2. **Forensic trail** — explains to future agents why a piece of content was removed

---

## Common Barnacles in blog-posts

These patterns recur. Watch for them:

| Pattern | Example | Why Barnacle |
|---------|---------|-------------|
| Tradingagents carry-over | `TA_DASHBOARD_PORT`, `src/server/`, `amalfa`, `CHANGELOG.md` | Wrong project context |
| Missing INDEX.jsonl | `debriefs/INDEX.jsonl` or `briefs/INDEX.jsonl` entry requirement | No such files exist in blog-posts |
| Wrong export command | `bun run scripts/export-all.ts --dry-run` when the flag doesn't exist | Command doesn't match actual script |
| Maintenance script ref | `bun run scripts/maintenance/fix-debrief-names/index.ts` | Doesn't exist in blog-posts |
| Archived playbook ref | `archive/playbooks/td-playbook.md` | No archive directory |
| Code estimation format | `0.25d | 0.5d | 1d` in epic stories | Estimation language from tradingagents, not blog writing |
| Front-matter mismatch | `layout: default` in `_posts/` when `layout: post` is required | Breaks Jekyll rendering |

---

## Related

- `playbooks/conventions-playbook.md` — Active conventions and Barnacle Removal Record
- `playbooks/td-playbook.md` — Session startup includes barnacle scan
- `playbooks/export-playbook.md` — Export pipeline anti-patterns