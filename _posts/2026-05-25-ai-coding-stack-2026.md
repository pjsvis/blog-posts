---
layout: post
title: "My Tech Stack for AI-Assisted Coding in 2026: Zed, herdr, Pi, Bun, Hono, and Some CLI Stuff"
date: 2026-05-25T12:00:00 +0000
categories: [ai, tooling, systems]
tags: [ai-assisted-coding, tech-stack, zed, herdr, pi, bun, hono, edinburgh-protocol]
canonical_target: [substack, medium]
canonical_url: https://pjsvis.github.io/blog-posts/posts/2026-05-25-ai-coding-stack-2026/
published: true
---

# My Tech Stack for AI-Assisted Coding in 2026: Zed, herdr, Pi, Bun, Hono, and Some CLI Stuff

AI-assisted coding in 2026 has a tooling problem. Not a shortage — an excess. Every week there's a new "game-changing" agent, a new editor fork with AI bolted on, a new runtime that promises to make your agent 3x faster. The noise-to-signal ratio is abysmal.

What's missing is a clear account of a *working* stack. Not aspirational. Not a tweet-length endorsement. A real toolchain that someone uses daily and can defend. Here's mine.

This stack is not about brand loyalty. I don't care who built the tool. I care about one thing: does it reduce conceptual entropy at its layer of the system? The Edinburgh Protocol — the operating framework my agents and I work under — treats software development as a tensegrity structure. Each piece is either a compression strut (holding the structure up) or a tension cable (keeping it from buckling under load). A tool that doesn't serve one of those two roles has no place in the stack.

Here's what earned its place.

---

## Zed — The Editor

Zed is where I type. It's also, increasingly, where the agent types.

I switched to Zed in early 2025 after years of VS Code. The difference is not subtle. Zed is fast in the way that makes you re-evaluate what "fast" means. Keystroke to screen is instantaneous. File opens are instantaneous. The editor never gets in your way. This matters more than it sounds — when you're working with an AI agent that can produce 200 lines of code in under a second, the editor cannot be the bottleneck.

The AI integration is native, not bolted on. The assistant panel lives in the same visual space as the editor, and inline transformations — select some code, tell the model what to do, watch it rewrite — feel like a natural extension of editing rather than a separate workflow. Zed supports multiple model providers, and critically, it lets you configure *which* model does *what*. I don't want GPT-4 for a simple refactor. I want a fast local model for that, and the big guns for architecture work. Zed lets me route accordingly.

What I don't use: Zed's agent mode. I tried it. It's fine. But it's not the agent I want. For that, I need a different layer.

---

## herdr — The Terminal Workspace Manager

If Zed is where I type, herdr is where the agent *lives*.

herdr is a terminal workspace manager purpose-built for AI coding agent workflows. It manages persistent terminal sessions — tabs, panes, workspaces — and it does so with an architecture designed for headless operation. A herdr server runs persistently. Agents connect to it over a socket. They can create tabs, split panes, run commands, and maintain state across sessions. When I close my laptop, the server keeps running. When I come back, everything is where I left it.

This is not a terminal multiplexer with extra features. It's a different category. tmux is for humans managing their own terminal state. herdr is for *agents* managing terminal state on behalf of a human. The difference shows in the API: `herdr tab new`, `herdr pane split`, `herdr agent run` — commands designed to be issued by a coding agent, not typed by a person.

The agent integration model is the killer feature. herdr can spawn an agent in a dedicated pane and maintain a structured communication channel with it. The agent sees its terminal context. The human sees the agent's output. There's no copy-paste, no context-switching, no "wait, which terminal was the agent running in?"

For solo developers working with coding agents, herdr is the structural layer that turns a collection of terminal windows into a coherent workspace. It is the compression strut of my stack — without it, the agent has nowhere stable to operate.

---

## Pi — The Agent Harness

Pi is the agent framework. It's the governance layer.

If you've used Claude Code, Cursor, or Copilot's agent mode, you've used something that occupies this slot. Pi is different in one specific way: it treats the agent as a *governed* entity, not a free-roaming assistant.

Pi provides the harness: the SDK, the extension system, the skill mechanism, the prompt templating, the TUI, the keybindings, the model routing. But more importantly, it provides the *constraints*. Agents running inside Pi operate under a defined identity — in my case, the Edinburgh Protocol, which gives them skepticism (Hume), systems thinking (Smith), and a bias toward practical improvement (Watt). They have a working directory boundary they cannot cross. They have a skill system that loads specialized instructions for specific tasks. They have a task management integration that keeps them grounded in what actually needs doing.

The result is an agent that knows its limits, stays in its lane, and produces work that is structurally sound rather than merely voluminous. Pi is the tension cable — it keeps the agent from buckling under its own generative capacity.

I don't use Pi as a chat interface. I use it as a harnessed worker that operates inside a silo with clear rules. The difference in output quality is not marginal. It's categorical.

---

## Bun — The Runtime

Bun is the JavaScript/TypeScript runtime. It replaces Node.js for everything I do.

Why Bun? Speed, mostly. But speed in a specific sense: *cold-start* speed. When a coding agent runs a script to verify something — check front-matter validity, run a linter, regenerate exports — the runtime's startup time is part of the feedback loop. Node.js takes a beat. Bun doesn't. The difference between 200ms and 20ms startup is invisible to a human but transformative for an agent that runs scripts dozens of times per session.

Bun also bundles a test runner, a package manager, and a bundler. Less tooling surface, fewer dependencies, fewer barnacles. The `bun run` command covers what would otherwise require five separate tools. For the export pipeline that transforms Jekyll posts into Substack and Medium formats, Bun scripts are fast, simple, and don't require a `node_modules` directory the size of a small moon.

If your stack includes JavaScript tooling and you haven't switched to Bun, ask yourself: is Node.js actually solving a problem for you, or is it just what you've always used?

---

## Hono — The Web Framework

Hono is the lightweight web framework. I use it when I need an API surface.

Hono is built for the edge — Cloudflare Workers, Deno, Bun, Node — but I use it on Bun for local services. It's fast, it's small, and its API is clean. Routes are defined as a chain of handlers. Middleware is composable. There's no magic.

I don't use Hono for everything. Most of my work doesn't need a web framework at all. But when I need a quick API — a webhook receiver, a status endpoint, a small service that an agent can query — Hono is what I reach for. It adds surface area without adding conceptual weight.

The alternative is Express, which is fine but carries a decade of middleware conventions that no longer make sense. Or Fastify, which is fast but verbose. Hono hits the sweet spot: enough structure to be useful, not enough to get in the way.

---

## The CLI Layer — td, just, and the Small Tools

Beneath the named tools sits a layer of CLI utilities that don't make headlines but do make the stack work.

**td** is task management for people who live in the terminal. It tracks issues, sessions, work-in-progress, and review state. It integrates with git branches. It's designed to be used by both humans and agents — an agent can run `td usage --new-session` and know exactly what to work on next. No Jira. No Notion. No context-switching to a browser. Just a CLI that holds the task graph.

**just** is a command runner. It's like Make but without the build-system baggage. My justfile has targets like `just orient` (branch, status, last commit), `just check` (front-matter validation), `just preview` (local Jekyll serve). Each target is a single command that the agent can invoke without me. The justfile is the contract between me and the agent: these are the operations you're authorized to perform, and here is how you perform them.

**git** of course. But used differently in this stack. The agent commits. I review. The agent branches before editing. I merge. Git is not just version control — it's the transaction log for agent work. Every commit message is a signal: what did the agent do, and why.

The CLI layer is the unglamorous infrastructure that makes everything above it composable. It's the difference between a stack that works when you're at the keyboard and a stack that works when the agent is running while you're making coffee.

---

## How the Pieces Fit

The stack works because each piece operates at a distinct layer and composes cleanly with the others:

```
Zed          ← Human types here
herdr        ← Agent lives here
Pi           ← Governance layer
Bun + Hono   ← Execution and services
td + just    ← Task management and commands
```

There's no overlap. Zed doesn't try to be a terminal. herdr doesn't try to be an editor. Pi doesn't try to be a runtime. Each tool does one thing, and the interfaces between them are explicit: files, sockets, CLI commands.

This is not an accident. It's the Edinburgh Protocol's structural principle applied to tooling. A system where every tool tries to do everything is a system with high conceptual entropy — the agent doesn't know which tool to use for what, and neither does the human. A system where each tool has a clear layer and a clear interface is a system with low conceptual entropy. The map is legible. The agent can navigate it.

---

## What's Not Here

Notably absent: Docker, Kubernetes, any cloud dashboard, any IDE with "AI" in its name that isn't Zed, any model provider that charges by the token for agent loops, and anything with a graphical interface that I can't drive from the terminal.

I'm not saying these things are bad. I'm saying they don't reduce conceptual entropy *for my workflow*. Your mileage will vary. The principle is what matters: every tool in the stack must justify its existence by making the system more coherent, not less.

---

## Try One Piece

Don't adopt this whole stack. That's not the point. The point is the method: examine your own stack. Find the layer with the most friction. Replace that one piece with something that reduces entropy at that layer. Then repeat.

If you're curious where to start: Bun is the easiest swap. If you use Node.js, `bun install` and `bun run` will Just Work on most projects, and the speed difference is immediately noticeable. Zed is a bigger commitment — editor switches are personal — but if you're still waiting for VS Code to open a file, give it a week. herdr is worth it if you're running coding agents regularly and tired of managing terminal state by hand.

The stack is not the product. The stack is the infrastructure that lets the product emerge. Get it right, and the agent becomes an extension of the system rather than a source of chaos.