# Why I abandoned GUI IDEs for a terminal-native stack

*Or: how I learned to stop worrying about which terminal emulator has the best
GPU buffer-diffing strategy and just got back to work.*

---

There's a special kind of impostor syndrome that comes from choosing terminal
tools. It goes like this:

Your terminal emulator must have "tt" in the name — Alacritty, Kitty, Ghostty.
It must be written in Rust (or maybe Go, if you're feeling contrarian). It must
have a GPU rendering engine, because apparently your text editor needs more
frames per second than your graphics card can deliver. And once you've chosen,
you must be prepared to defend that choice against colleagues who will scoff at
your incomplete tool-consideration matrix. "You chose Alacritty? Do you even
*know* about Kitty's image protocol?"

This is before we even get to the multiplexer (tmux or Zellij or herdr?), the
editor (neovim with 47 plugins or VS Code with 2GB of RAM?), and the AI agent
(Claude Code or Copilot or pi or Codex or one of the four new ones that
launched this week?).

It's the JavaScript framework wars all over again, except this time the tools
aren't just rendering HTML — they're writing code, running tests, and committing
on your behalf. Nobody wants to be the person who bet on AngularJS in 2014.
Nobody wants to be the person who bet on the wrong AI agent in 2026. The
analysis paralysis is real, and it's worse this time because the stakes feel
higher: pick wrong, and you don't just rewrite a component — you retrain your
entire workflow.

I have a solution. It's four tools. It works identically on macOS, Linux, and
WSL2. It works over SSH from a phone. It starts in under a second. And I'm
never going back.

Here's the stack, and here's why each piece was chosen over the obvious
alternative — not because it's Rustier or GPU-ier or has more GitHub stars,
but because it solves a specific problem that the alternatives don't.

---

---

## The stack at a glance

| Layer | Tool | Replaces |
|---|---|---|
| Terminal | **Alacritty** | iTerm2, Windows Terminal, Kitty |
| Session multiplexer | **herdr** | tmux, screen, Zellij |
| AI coding agent | **pi** | Copilot, Cursor, Claude Code |
| Text editor | **Fresh** | VS Code, neovim, JetBrains |

All four run in the terminal. All four work identically on macOS, Linux, and
WSL2. All four work over SSH with zero GUI dependencies. This matters more than
you think.

---

## Layer 1: Alacritty — the GPU terminal that stays out of the way

There are more featureful terminals. iTerm2 has a million settings panels.
Windows Terminal has acrylic blur. Kitty has a built-in image protocol.

Alacritty does one thing: render text as fast as the GPU allows.

**Why not iTerm2?** It's macOS-only. I work across macOS, Linux, and Windows
via WSL2. I want the same terminal everywhere, same config file, same
keybindings. iTerm2 can't do that. Alacritty can.

**Why not Kitty?** Kitty is excellent, but its image protocol creates a
dependency — tools need to specifically support it. Alacritty renders
standard ANSI and leaves extensions to the tools that need them. It's
boring in the best possible way.

**The cross-platform argument.** Alacritty's `alacritty.toml` is identical on
every OS. I copy one file and my terminal is exactly the same whether I'm on a
MacBook, an Arch desktop, or Windows Terminal running WSL2. David Heinemeier
Hansson chose it for Omakub, which isn't a reason to use it, but it's a
reassuring data point that the "boring single-purpose tool" philosophy scales.

---

## Layer 2: herdr — tmux, but for agents

tmux solved session persistence in 2007. It still works. But tmux was designed
for human-operated shells, not AI agents. It doesn't know that a pane is
running Claude Code and is blocked waiting for approval. It doesn't roll up
workspace states into a scannable sidebar. It doesn't let agents orchestrate
panes programmatically.

herdr does all three.

**Why not tmux?** tmux gives you persistence and panes. That's it. herdr gives
you the same plus:

- **Agent awareness.** The sidebar shows which agents are blocked (🔴), working
  (🟡), done (🔵), or idle (🟢). Workspaces roll up to their most urgent state.
  I can scan eight workspaces in two seconds.
- **Mouse-native.** Click panes to focus. Drag borders to resize. Right-click
  for context menus. tmux requires memorizing a prefix key and hoping your
  terminal emulator passes mouse events correctly.
- **Remote attach.** `herdr --remote workbox` attaches to a session running on
  another machine over SSH. No `ssh`, then `tmux attach`. One command.
- **Agents can drive it.** herdr has a Unix socket API. pi can create workspaces,
  split panes, run commands, and read output — programmatically. This is the
  killer feature that tmux will never have.

**Why not Zellij?** Zellij pioneered the "tmux with a friendlier UI" space, but
it has no agent awareness and no socket API for agent orchestration. It's a
terminal multiplexer for humans. herdr is a multiplexer for humans and agents.

---

## Layer 3: pi — the agent that doesn't leave your terminal

There are two categories of AI coding tools: sidebar assistants and terminal
agents. Sidebar assistants (Copilot, Cursor) live in GUI editors. Terminal
agents (Claude Code, Codex, OpenCode) live in the terminal.

pi is a terminal agent, which means it already works in this stack. But pi
specifically was chosen for three reasons:

**1. Extensibility without forking.** pi has a TypeScript extension SDK. I can
add custom tools, lifecycle hooks, permission gates, and custom UI without
touching pi's source code. Claude Code requires MCP servers. pi just asks you
to write a TypeScript file and symlink it in.

**2. No cloud dependency.** pi runs locally. Your code never leaves your
machine unless you choose a cloud provider. Copilot and Cursor send your code
to Microsoft/Anthropic. pi lets you use local Ollama models, self-hosted
endpoints, or API keys — your choice.

**3. The Edinburgh Protocol.** pi ships with a behavioral framework (skepticism
+ systems thinking + empirical verification) that makes the agent less
sycophantic and more rigorous. It's not a prompt — it's an identity that
shapes how the agent reasons. Silo enforces a filesystem boundary. Evals
gate models before deployment. I didn't build these; they shipped with pi.

---

## Layer 4: Fresh — the editor that opens before you finish typing its name

VS Code takes 3-8 seconds to start. JetBrains IDEs take 15-30. Fresh starts in
under 10 milliseconds. When you're bouncing between files across eight herdr
workspaces, that difference is everything.

**Why not neovim?** I have deep respect for neovim. But its plugin ecosystem
requires a PhD in Lua configuration. Fresh plugins are TypeScript files in
`~/.config/fresh/plugins/` — drop one in, restart, done. The API surface is
clean, typed, and discoverable through TypeScript definitions. No learning
a bespoke scripting language.

**Why not VS Code?** VS Code is a GUI application. It requires a desktop
environment, a GPU, and a browser engine. Over SSH, you need VS Code Remote
or a remote desktop. Fresh runs in the terminal. Over SSH, it's just
`fresh filename.md`. No "Installing server..." spinner. No remote filesystem
abstraction that breaks `git` or `find`. Real files on a real filesystem.

**Fresh's compose mode.** Fresh has a built-in markdown compose mode that
centers text, hides markup, and provides a distraction-free writing surface.
I'm writing this article in it.

---

## The extension layer: Glow preview

This is the moment where the stack feels integrated rather than assembled.

Fresh doesn't have a built-in markdown preview. But Glow (Charmbracelet's
CLI markdown renderer) is excellent and already installed. So I wrote a
12-line Fresh plugin that:

1. Reads the current buffer
2. Pipes it through Glow
3. Displays the rendered output in a full-screen tab
4. Auto-refreshes on save
5. Closes with `q` and returns to the source

It took 30 minutes. The ANSI colors match Fresh's theme exactly because both
use the same terminal palette slots. Tables render correctly. Code blocks have
syntax highlighting. It feels like a native feature.

This is the pattern the entire stack enables: small, composable tools that
speak through stdin/stdout and the filesystem, glued together with a few
lines of TypeScript. No plugin marketplace. No extension API review. Just
write a file and it works.

### Agent-friendly tools: defuddle and rtk

The stack also includes tools specifically designed to make life easier for
the AI agent, not just the human. Two stand out:

**defuddle** — a pi extension that fetches any webpage as clean Markdown.
When pi needs to read documentation, it doesn't get HTML soup. It gets
structured, readable Markdown. One URL, one clean output.

**rtk (Rust Token Killer)** — a CLI proxy that filters and compresses command
output before it hits the LLM context window. 60-90% token savings on common
dev commands. `cargo test` output goes from 5,000 tokens of boilerplate to
"262 passed, 0 failed." `git status` goes from 40 lines of git-speak to a
compact 3-line summary. When your AI agent runs 60 commands in a session,
that's the difference between context overflow and a productive conversation.

rtk integrates directly with pi: `rtk init -g --agent pi` installs a TypeScript
extension that auto-rewrites every shell command through rtk's filter. The
agent never sees the noise.

These aren't afterthoughts. They're the reason the stack works better than a
monolithic GUI: each layer has tools optimized for its specific consumers —
humans, agents, or both.

---

## Why cherry-picking beats all-in-one

There's a subtle problem with most terminal app stacks: the tools are chosen by
default, not by design. You use iTerm2 because it came with macOS. You use tmux
because everyone uses tmux. You use VS Code because it's the path of least
resistance.

But the moment you start *choosing* tools for specific jobs, you notice that
almost every terminal app has a deficiency:

- Some lack multi-line input (looking at you, basic shell)
- Some have terrible markdown previews (or none at all)
- Some are memory hogs (VS Code's Electron, JetBrains' JVM)
- Some can't persist sessions across disconnects (any GUI editor)
- Some don't let agents orchestrate them (everything pre-2023)

An all-in-one GUI tries to solve all these at once — and ends up being
mediocre at all of them. A cherry-picked stack of single-purpose tools — each
good at exactly one thing — avoids the lowest-common-denominator problem
entirely. Glow is a fantastic markdown renderer and nothing else. herdr is a
fantastic session manager and agent multiplexer and nothing else. pi is a
fantastic coding agent and nothing else.

You don't need one tool that does everything. You need four tools that each do
one thing well and agree on one interface: the terminal.

---

## The SSH story

Here's a real workflow from last week:

1. SSH into a cloud VM from an iPad on a train
2. `herdr` reattaches — pi is still running, Fresh has my unsaved changes
3. Ask pi to implement a feature. It writes code, runs tests, commits.
4. Switch to Fresh, review the diff, make edits.
5. SSH drops in a tunnel. Reconnect. Everything is where I left it.
6. Push to GitHub and deploy from the same terminal.

No VS Code Remote. No "reloading window." No lost state. No sync conflicts.
Just SSH and herdr.

---

## Cross-platform, honestly

Stack works on:

- **macOS** — Homebrew for everything, identical experience
- **Linux** — apt/Homebrew, same config files, same keybindings
- **Windows via WSL2** — Alacritty runs natively on Windows, connects to WSL2,
  everything else runs inside WSL2. Feels identical to native Linux

I switch between all three weekly. The only thing that changes is the
package manager command.

---

## Comparison: this stack vs. everything else

| | This stack | VS Code + Copilot | JetBrains + AI | neovim + Claude Code |
|---|---|---|---|---|
| **Terminal-only** | ✓ | ✗ | ✗ | ✓ |
| **Cross-platform** | ✓ | ✓ | ✓ | Unix-only |
| **SSH-native** | ✓ | Remote extension | Gateway | ✓ |
| **Session persistence** | ✓ (herdr) | ✗ | ✗ | ✓ (tmux) |
| **Agent awareness** | ✓ (herdr sidebar) | ✗ | ✗ | ✗ |
| **Agent orchestrates UI** | ✓ (socket API) | ✗ | ✗ | scriptable |
| **Editor startup** | <10ms | 3-8s | 15-30s | <100ms |
| **Extensible** | TypeScript SDK + TS plugins | Extensions | Plugins | Lua/config |
| **Offline/air-gapped** | ✓ | partial | partial | ✓ |
| **Mobile-friendly** | ✓ (SSH from any terminal) | ✗ | ✗ | ✓ |

---

## What you give up

Honesty time. This stack isn't perfect:

- **No graphical diff viewer.** Git diffs in the terminal work, but side-by-side
  diffs with inline blame are a GUI strength. Fresh has a diff view, but it's
  not as polished as VS Code's.
- **No drag-and-drop file management.** The file explorer in Fresh works, but
  it's keyboard-driven. If you're a mouse-first user, this will frustrate you.
- **Smaller community.** VS Code has millions of users and thousands of
  extensions. This stack has a few thousand and a few dozen extensions. The
  quality is high, but the quantity isn't there yet.
- **Initial setup.** Getting all four tools installed and configured takes about
  10 minutes. VS Code is one download. (I'm working on a pi-driven install
  playbook that collapses this to one sentence: "pi, install the terminal
  stack.")

---

## The philosophy

The terminal is the last truly universal interface. Every operating system has
one. Every remote server has one. Every phone and tablet can connect to one over
SSH. It's the lowest common denominator that's also the highest common
denominator — text is the most expressive, most composable, most durable
interface we have.

GUI IDEs optimize for the 90% case: local development on a single machine with
a large display. The terminal-native stack optimizes for the 100% case:
development from anywhere, on any device, with any level of connectivity,
with AI assistance that understands your tools because it shares them.

Give me four tools that agree on one interface over one tool that tries to be
all four.

---

*This article describes the toolchain. For the lighter take on why we even
need tooling for our tooling, read [The Harness-Harness](#). For the full
methodology — how to run an AI agent that stays on task using briefs,
debriefs, td, and the Edinburgh Protocol — read [The Silo Manifesto](#).*
