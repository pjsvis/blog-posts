An experiment brief structured under your playbook conventions, followed by a grounded evaluation of turning it into a Pi extension

```markdown
# brief: Mermaid TUI renderer experiment

**Created:** 2026-07-23
**TD:** N/A
**Status:** pending

## ref

Hidden in the repo at `xai-grok-markdown/src/mermaid.rs`, this thing got brushed aside by many news outlets, but it actually reveals xAI's true ambition.

Traditional agent tools (Cursor, Windsurf, Cline) when outputting documentation, Mermaid diagrams can only be rendered in VSCode plugins or exported as PNG. Mermaid was born for the web.

xAI did something counterintuitive: convert Mermaid into Unicode box-drawing characters at compile time, printed directly in the terminal. In the TUI, you can see flowcharts made of `┌─┬─┐` characters—no GUI needed, no image rendering pipeline, no WebView.

## What
An experiment to build a lightweight Go-based CLI renderer (`mermaid-tui`) using LipGloss v2 to convert ASCII/text-based Mermaid graph ASTs into styled terminal layouts, evaluating if it can replace shell wrappers or be packaged as a Pi extension.

## Why
Current script-wrapped renderers rely on heavy Node/CLI runtime calls or brittle text alignment. Moving layout rendering to Go gives zero-dependency execution speed and pixel-perfect grid layouts. Prototyping this now determines if a native binary or a Pi extension runtime is worth full development.

## How
1. Build a minimal Go CLI taking a basic ASCII node structure (Node A -> Node B) via stdin/file.
2. Use LipGloss v2 (`lipgloss.JoinHorizontal`, `lipgloss.JoinVertical`) to style nodes, borders, and connectors.
3. Test layout scaling and color downsampling across standard 80-col and wide terminals.
4. Wrap the binary output in a simple TypeScript extension stub to test Pi IPC/TUI integration.

## Acceptance criteria
- [ ] Renders top-down (TD) and left-right (LR) 3-node graphs clean of alignment artifacts in raw terminal.
- [ ] Executes layout rendering in under 15ms without invoking node/external runtimes.
- [ ] Proof of Concept Pi extension intercepts a `/mermaid` slash command or tool call and displays the styled LipGloss buffer.

## Out of scope
- Full Mermaid syntax coverage (sequence diagrams, subgraphs, class diagrams).
- Interactive pan/zoom (Bubble Tea TUI loop).
- Native TypeScript/JS re-implementation of graph engines inside the Pi extension.

```

---

## Opinion: Does this idea have legs as a Pi Extension?

Yes, but **only if you keep the architecture clear**:

1. **Pi Extension Context**: Pi extensions run on a TypeScript/Node runtime environment. Trying to write pure TypeScript layout logic using standard string concatenation inside the extension gets messy fast.
2. **The Go Hybrid Model**: The cleanest design is to write the layout engine in **Go + LipGloss** as a compiled, standalone binary (e.g., `mermaid-tui`). The **Pi Extension** then acts purely as the bridge—registering the `/mermaid` slash command or agent tool, passing the graph string to the Go binary via `exec`/`stdin`, and rendering the returned ANSI buffer directly in Pi's terminal UI.
3. **Verdict**: The Go approach gives you instant, self-contained rendering without pulling heavy browser engine dependencies into your agent workflow. Running this 15-minute experiment with the brief above will tell you immediately if LipGloss's grid joining holds up for graph edges.