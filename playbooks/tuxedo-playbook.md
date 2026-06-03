# Tuxedo Playbook — Global Task Radar

## What This Is

`tux` (tuxedo) is the lightweight, global todo.txt viewer for human task awareness. It sits alongside `td` (the formal agent pipeline) and handles everything that does not need review cycles, handoffs, or session tracking.

**Rule of thumb:**
- Needs review/approval, formal status, or agent implementation → `td`
- Everything else — reminders, reading list, next actions across projects → `tux`

## Workflow

### Daily Start

```bash
just start   # cold start: orient + check + reminder
```

Then:

```bash
tux          # open global todo list
```

### Adding Items

Edit `~/todo.txt` directly, or use tuxedo's TUI (`i` to insert). Tag by project:

```
(A) [blog-posts] Test image pipeline with real photo
(B) [reading] Reasoning Aligns LLMs to Human Cognition
(C) [personal] Buy coffee
```

### Session Start Checklist (in `~/todo.txt`)

The top of `~/todo.txt` contains a persistent checklist:

```
====
Session Start
====
- tux → global radar (this file)
- just orient → branch, status, commits
- td usage --new-session → agent session (only when needed)
- just check → validate front-matter + registries
- td next → highest priority open task
```

### Tag Conventions

| Tag | Use for |
|-----|---------|
| `[blog-posts]` | Tasks for this repo |
| `[reading]` | Papers, books, articles to read |
| `[personal]` | Errands, life admin |
| `[writing]` | Draft ideas not yet briefed |

### Priority Levels

Standard todo.txt format:

| Priority | Meaning |
|----------|---------|
| `(A)` | Do today |
| `(B)` | Do this week |
| `(C)` | Do this month |
| `(D)` | Backlog / someday |

### Done Section

Move completed items to a `====\nDone\n====` section at the bottom, or delete them. The Done section is useful for weekly retrospectives.

## Relationship to Other Tools

| Tool | Scope | Data Store |
|------|-------|------------|
| `tux` | Global human tasks | `~/todo.txt` |
| `td` | Formal agent pipeline | `.td/` database |
| `just start` | Cold start orientation | `justfile` recipe |

## Anti-Patterns

| ❌ Don't | ✅ Do |
|----------|-------|
| Put formal features in `tux` | `td create` for anything needing review |
| Duplicate `td` tasks in `tux` | `tux` tracks "write draft," `td` tracks "implement image pipeline" |
| Let `tux` grow to 100+ items | Archive or delete old items; keep it scannable |
| Use `tuxedo` bare (opens local `todo.txt`) | Always use `tux` alias for global list |

## File Location

- **Global list:** `~/todo.txt`
- **Alias:** `alias tux='tuxedo ~/todo.txt'` (in `.zshrc` and `.bashrc`)

## Related

- `playbooks/td-playbook.md` — formal task pipeline
- `just start` — cold start recipe
