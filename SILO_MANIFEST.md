# blog-posts Silo Manifest

**Purpose:** Single source of truth for agent orientation. When an agent
spins up in this silo, all assets should be findable here.

**First step:** `just orient` — shows branch, git status, and current state.

---

## Getting Started

```bash
# Orient: see current state
just orient

# Check: front-matter validation + registry sync
just check

# Preview locally
just preview

# Help: workflow guide
just help

# Info: project rationale
just info
```

---

## Asset Map

| Asset | Location | Description |
|-------|----------|-------------|
| **Project identity** | `AGENTS.md` | Blog posts agent orientation, Edinburgh Protocol, hard rules |
| **Task runner** | `justfile` | 20+ recipes: publish, export, preview, registries, help, info |
| **Silo reference** | `SILO_MANIFEST.md` | This file — asset map, conventions, quick reference |
| **Architecture** | `playbooks/blog-posts-playbook.md` | Jekyll pipeline, front-matter invariant, publishing workflow |
| **Briefs registry** | `briefs/INDEX.jsonl` | All post briefs (open/in_progress/done) |
| **Playbooks registry** | `playbooks/REGISTRY.jsonl` | All playbooks (canonical/project) |
| **Debriefs registry** | `debriefs/INDEX.jsonl` | All post debriefs |
| **Decisions registry** | `decisions/INDEX.jsonl` | All ADRs (Proposed/Accepted/Superseded) |
| **Prompts registry** | `prompts/INDEX.jsonl` | Subject expert personas and writing sleeves |
| **Export scripts** | `scripts/` | `export-all.ts`, `scrape-and-export.ts`, `reg-sync.ts`, `reg-list.ts` |
| **Sparkline font** | `assets/fonts/Datatype.woff2` | Datatype — variable font that renders `{l:...}`, `{b:...}`, `{p:...}` as inline charts via ligatures. 73KB. Repo: [franktisellano/datatype](https://github.com/franktisellano/datatype). |
| **Export output** | `_exported/` | Generated platform-specific output (medium/, substack/, hn/, twitter/) |
| **Published posts** | `_posts/` | Jekyll collection — raw Markdown with front-matter |
| **Works in progress** | `_drafts/` | Excluded from Jekyll build and export pipeline |
| **Internal process** | `briefs/`, `debriefs/`, `decisions/`, `playbooks/` | Not published to GitHub Pages |
| **GitHub Pages** | `.github/workflows/deploy.yml` | CI/CD: Jekyll → pjsvis.github.io/blog-posts on push to main |

---

## Override Relationships

- `blog-posts/AGENTS.md` **overrides** `~/.pi/agent/AGENTS.md` for all sessions in this repo
- `playbooks/conventions-playbook.md` is the living conventions document — breaking it allows barnacles to return
- `playbooks/barnacle-playbook.md` is the barnacle detection and removal process

---

## Key Conventions

| Convention | Location | Description |
|------------|----------|-------------|
| Jekyll underscore dirs | `playbooks/conventions-playbook.md` | `_posts/`, `_drafts/`, `_layouts/` — do not rename |
| Front-matter required | `playbooks/blog-posts-playbook.md` | Every `_posts/` file needs layout, title, date |
| Export before distribute | `playbooks/export-playbook.md` | Review `_exported/` before pasting to Substack/Medium |
| Registry sync | `playbooks/registry-playbook.md` | Run `reg-sync --all` after adding briefs/debriefs/decisions |
| Barnacle removal | `playbooks/barnacle-playbook.md` | Scan for tradingagents carry-over, wrong paths, broken refs |
| Pre-commit gate | `just check` | Front-matter validation + registry sync must pass |

---

## Quick Reference

```bash
# Orient
just orient

# Validate before commit
just check

# Local Jekyll preview
just preview

# Export to distribution channels
just export

# Registry management
just reg-sync
just reg-briefs
just reg-debriefs
just reg-decisions
just reg-playbooks

# Open live site
just live

# Workflow guide
just help

# Project rationale
just info
```