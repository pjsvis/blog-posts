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
| `SILO_MANIFEST.md` | Asset map and silo identity — all assets must be findable here |
| `playbooks/export-playbook.md` | Multi-platform distribution logic |
| `playbooks/conventions-playbook.md` | Conventions document — breaking it allows barnacles to return |
| `playbooks/td-playbook.md` | Solo workflow protocol — keep current |
| `playbooks/barnacle-playbook.md` | Barnacle identification and removal process |
| `playbooks/blog-posts-playbook.md` | Jekyll pipeline reference — core layout and front-matter rules |
| `playbooks/silo-playbook.md` | Silo structure and conventions — directory compartments, justfile facade |

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
 ├── briefs/              ← Internal: post briefs and epics
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
- **Write a brief before drafting.** See `playbooks/briefs-playbook.md`.
- **Write a debrief after publishing.** See `playbooks/debriefs-playbook.md`.
- **Capture decisions as ADRs.** See `playbooks/decisions-playbook.md`.
- **Pre-publish gate:** Run `just check` before pushing content to production.
- **Export before distribution.** Run `bun run scripts/export-all.ts` to prepare content for Substack, Medium, and other platforms.