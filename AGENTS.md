# Blog Posts Agent Orientation

**The only file you should reference for project rules. All other docs are supplementary.**

---

## HARD RULES

- **NEVER delete untracked files** without explicit user permission
- **NEVER run `git clean`, `rm -rf`, or destructive shell commands** without explicit user permission
- **NEVER modify AGENTS.md** without explicit user authorization
- **ALWAYS ask** before modifying or removing user data

## CRITICAL FILES

These files are core infrastructure. Modification requires user authorization.

| File | Why protected |
|------|---------------|
| `_config.yml` | Jekyll pipeline — broken config breaks all publishing |
| `playbooks/export-playbook.md` | Multi-platform distribution logic |
| `playbooks/conventions-playbook.md` | Conventions document — breaking it allows barnacles to return |
| `playbooks/td-playbook.md` | Solo workflow protocol — keep current |

---

## Session Startup

```bash
just orient   # see branch, git status, last commit, in-flight tasks
git fetch origin
td usage --new-session   # new session identity
```

Reference: `playbooks/td-playbook.md` for the full workflow.

---

## Repository Structure

```
blog-posts/               ← Jekyll source (GitHub Pages)
 ├── _config.yml          ← Pipeline configuration
 ├── _layouts/            ← HTML layout templates
 ├── _posts/              ← Published long-form content
 ├── _drafts/             ← Works in progress
 ├── briefs/              ← Internal: system briefs, epics, stories
 ├── debriefs/            ← Internal: retrospective documents
 ├── decisions/           ← Internal: architecture decision records
 ├── playbooks/           ← Internal: operational playbooks
 ├── assets/              ← Static media (CSS, images)
 ├── scripts/             ← Export automation scripts
 └── .github/workflows/   ← CI/CD (Jekyll → GitHub Pages deploy)
```

---

## Working Principles

- **Branch before editing.** Never commit directly to `main`.
- **Commit cadence.** One logical change per commit.
- **Write a brief before starting.** See `playbooks/briefs-playbook.md`.
- **Write a debrief after finishing.** See `playbooks/debriefs-playbook.md`.
- **Capture decisions as ADRs.** See `playbooks/decisions-playbook.md`.
- **Pre-publish gate:** Run `just check` before pushing content to production.
- **Export before distribution.** Run `scripts/export-all.ts` to prepare content for Substack, Medium, and other platforms.