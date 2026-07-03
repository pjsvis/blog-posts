# The Silo Manifesto

*Or: keeping your agent(s) nose(s) to the grindstone(s).*

---

AI coding agents are remarkably capable and remarkably undisciplined. Give one
a task and it will happily write code, run tests, fix bugs, and commit changes.
Give it an open-ended conversation and it will drift. It will chase tangents.
It will "research" things you didn't ask about. It will write 200 lines of code
for a problem that needed 4.

This isn't a prompt problem. Better prompts help at the margins, but they don't
solve the fundamental issue: **an agent without structure is an agent without
focus.** The solution isn't a better prompt. It's a methodology.

---

## The brief/debrief cycle

Every session starts with a **brief** and ends with a **debrief**. This sounds
bureaucratic. It's the opposite of bureaucratic — it's the minimum viable
structure that keeps an agent on track.

### The brief

A brief is a short document (typically under 2KB) that defines **what** and
**why** before any code is written. It answers four questions:

1. **What** are we building? (one paragraph)
2. **Why** are we building it? (what problem does it solve?)
3. **How** will we build it? (high-level approach, not line-by-line)
4. **What does success look like?** (verifiable acceptance criteria)

That's it. No architecture diagrams. No API specs. No implementation details.
Those come during the session, guided by the brief.

The brief is not a living document. Once work starts, the brief is frozen.
If requirements change, you write a new brief. This prevents scope creep —
the most common failure mode of agent sessions.

A brief file looks like this:

```markdown
# brief: Glow markdown preview for Fresh editor

**Created:** 2026-06-11
**Status:** pending

## What
A Fresh editor plugin that renders the current markdown buffer through
Glow in a full-screen tab, invoked by a keybinding.

## Why
Fresh lacks a built-in markdown preview. Glow is already installed and
produces excellent terminal-native rendered output.

## How
Fresh plugin using createVirtualBuffer + spawnProcess("glow", ...).
Custom mode with q to close, r to refresh. Auto-refresh on save.

## Acceptance criteria
- Keybinding opens a full-screen Glow-rendered preview
- q closes and returns to source
- Saving a .md file auto-refreshes the preview
- Works for untitled buffers (temp file fallback)

## Out of scope
- Live preview on keystroke
- Scroll-sync between source and preview
- Image rendering
```

### The session

Between the brief and the debrief, the agent works. The session is tracked by
**td** — a local task database that knows what's being worked on, who's doing it,
and what state it's in.

td is not a TODO list. It's a structured work log. Every task has:
- A unique ID
- A session (which implementer worked on it)
- A status (open → in_progress → in_review → done)
- Handoff logs (capturing state when work pauses)
- Review state (who reviewed it, whether it was approved or rejected)

The agent logs progress with `td log "message"`. When work pauses, it runs
`td handoff` to capture the current state. When work is complete, it submits
for review with `td review`. The human (or another agent) reviews and either
approves or rejects.

This cycle — brief → implement → handoff → review → debrief — ensures that
nothing falls through cracks. The agent always knows what it's working on.
The human always knows what state things are in.

### The debrief

When a task is complete, a **debrief** captures what was learned. This is not
a status report. It's a knowledge artifact.

```markdown
# debrief: Glow markdown preview

## What worked
- ANSI color numbers (0-15) in the Glamour style JSON matched Fresh's
  terminal palette perfectly. Both tools render from the same slots.
- full-screen preview (createVirtualBuffer) > split pane for reading mode
- Own close handler (glow_preview_close) instead of relying on
  close_current_tab — virtual buffer lifecycle is cleaner

## What didn't work
- Dynamic terminal width (via getScreenSize) broke table formatting
- hex colors in Glamour style produced muted results vs. ANSI numbers
- close_current_tab on virtual buffers didn't reliably fire buffer_closed

## What to try next
- RTK integration for agent command output filtering
- pi-driven install playbook for the whole terminal stack
- Blog articles: terminal stack justification + this silo manifesto
```

Debriefs are permanent, linkable references. They prevent the same mistakes
from being made twice. They capture institutional knowledge that would
otherwise evaporate when a session ends.

---

## td: the agent's external memory

Agent sessions are long. Context windows are finite. The agent needs a way to
remember what it's doing across compactions, across sessions, across days.

td provides that memory. It's a SQLite database that tracks:

- **Issues** — what needs to be done, what's in progress, what's done
- **Sessions** — which agent or human worked on what, when
- **Handoffs** — captured state when work pauses (so resuming is instant)
- **Reviews** — approval/rejection cycles with context

The agent queries td at session start (`td usage --new-session` or `td next`)
and knows immediately what to work on. It doesn't need to "remember" — td
remembers for it.

This is fundamentally different from a TODO list. A TODO list says "do these
things." td says "here's what you were doing, here's where you left off,
here's what needs review, here's what's blocked." It's structured state, not
a flat list.

### The key td commands

| Command | Purpose |
|---|---|
| `td usage --new-session` | Start of session: what am I working on? |
| `td next` | What's the highest priority open issue? |
| `td start <id>` | Begin work on an issue |
| `td log "msg"` | Track progress |
| `td handoff <id>` | Capture state before pausing |
| `td review <id>` | Submit completed work for review |
| `td approve <id>` | Approve reviewed work |
| `td reject <id>` | Send work back to open |
| `td context <id>` | Full context for resuming work |

The agent never starts a session cold. td tells it what to do, what it was doing,
and what state to resume from.

---

## The Edinburgh Protocol

The brief/debrief cycle tells the agent *what* to do and *how to report back*.
The Edinburgh Protocol shapes *how it thinks* while doing it.

It's an agent identity — not a prompt, not a set of rules, but a character
that the agent inhabits. The three pillars:

**1. Hume's skepticism.** The agent treats its own outputs as "maps," not the
"territory." It operates with humility about its training data and logic. It
states its ignorance clearly rather than inventing stories to fill gaps.

**2. Smith's systems thinking.** When analyzing failure, the agent looks for
bad incentives (systems), not bad people (villains). A bug isn't a moral
failing — it's a system that produced an incorrect output. Fix the system.

**3. Watt's pragmatism.** The agent prioritizes "does it work?" over
theoretical purity. Philosophy is useless if it doesn't result in a better
steam engine, a clearer contract, or a more stable society.

The result: an agent that is less sycophantic, more rigorous, and more
practical. It catches its own mistakes. It questions its assumptions. It
doesn't blindly agree with the user.

This isn't a prompt that says "be skeptical." It's an identity framework that
the agent reasons within. Combined with the brief/debrief cycle, it produces
work that is both structured and intellectually honest.

---

## Silo: the hard boundary

The final piece is the simplest: **the agent stays in the project.**

The Silo extension enforces a hard filesystem boundary. The agent cannot read
or write outside the repository root. It can use any tool it wants — `bash`,
`read`, `write`, `edit` — but every operation is checked against the boundary.
If the agent tries to step outside, it's blocked with a quiet "I'm staying in."

This isn't a security sandbox. The agent has full access to everything inside
the project. It can run any command, modify any file, install any dependency.
The silo doesn't restrict what the agent can do — it restricts *where* it can
do it.

Why this matters: agents drift. Given unrestricted filesystem access, they will
eventually read your SSH keys, modify your shell config, or install packages
in unexpected places. They don't do this maliciously — they do it because
they're trying to be helpful and they lack the context to know what's out of
bounds. The silo removes the temptation by making it impossible.

When the agent asks "can I read ~/.ssh/config?" the answer is already decided.
No permission popup. No human in the loop. Just a boundary that was set once
and enforced forever.

---

## A day in the life of a structured agent session

Here's what a real session looks like with this methodology:

**08:00 — Session start**
```
$ pi
> td usage --new-session
  CURRENT SESSION: ses_b5d751
  NEXT: td-9469c0 "Glow markdown preview for Fresh" [in_progress]
  └── 3 logs, last handoff: 2026-06-11 05:34
```

The agent reads the brief (`briefs/004-glow-fresh-preview.md`), reviews the
last handoff log, and picks up where it left off. No "what was I doing?"
No context reconstruction. td tells it.

**09:30 — Agent makes progress**
```
> td log "Glow rendering via spawnProcess working. Color stripped by
  termenv non-TTY detection. Switching to bash wrapper with
  CLICOLOR_FORCE=1."
```

**10:15 — Agent finishes implementation**
```
> td handoff td-9469c0
  HANDOFF RECORDED. Next: td review td-9469c0
```

**10:16 — Human reviews**
```
$ td approve td-9469c0
  APPROVED. The Glow preview was working in the test.
```

**10:20 — Agent writes the debrief**
The debrief captures lessons learned (ANSI numbers vs hex, virtual buffer
close lifecycle, dynamic width tradeoff). These become the basis for the
playbook entry (`playbooks/extensions.md`) and the blog article.

**10:30 — Next task**
```
> td next
  (no open issues — suggest creating one or reviewing pending work)
```

The cycle repeats. Every session is structured. Every task is tracked. Every
lesson is captured.

---

## Why this works when prompt engineering doesn't

Prompt engineering is an arms race. You write a better prompt. The model adapts
(through fine-tuning, through context, through sheer stochastic drift). You
write an even better prompt. The cycle continues.

Structure doesn't adapt. A brief is a brief. A handoff is a handoff. A silo
boundary is a silo boundary. These are constraints that don't change, and the
agent works within them regardless of model drift.

The Edinburgh Protocol gives the agent an identity that improves reasoning
quality. The brief/debrief cycle gives the agent external structure that
prevents drift. td gives the agent external memory that survives context
compaction. Silo gives the agent a hard boundary that can't be talked around.

None of these are prompts. They're infrastructure.

---

## The stack and the methodology are independent

This article describes a methodology. The companion piece —
[Why I abandoned GUI IDEs for a terminal-native stack] — describes a
toolchain. They're intentionally separate.

The methodology works with any agent (pi, Claude Code, Codex) and any editor
(VS Code, neovim, Fresh). The toolchain works with any methodology. You can
use the brief/debrief cycle with Claude Code in VS Code. You can use the
terminal stack with a completely unstructured workflow.

But they're better together. The terminal stack provides tools that are
composable, fast, and SSH-native. The methodology provides the discipline
that makes them productive. One without the other is half the story.

---

## Getting started

1. **Install td** (if you haven't): it's a single binary, no dependencies
2. **Write a brief** for your next task — 2KB max, four sections
3. **Start a pi session** with `td usage --new-session`
4. **Log progress** with `td log "..."` as you work
5. **Handoff** when you pause, **review** when you're done
6. **Write a debrief** — capture what worked, what didn't, what to try next

The first session will feel like overhead. By the fifth session, you won't
know how you worked without it.

---

*This article describes the methodology. For the lighter take on why
methodology exists at all, read [The Harness-Harness](#). For the toolchain —
a four-layer terminal-native stack of Alacritty, herdr, pi, and Fresh with
cross-platform SSH-native support — read [Why I abandoned GUI IDEs for a
terminal-native stack](#).*
