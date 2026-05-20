# Brief: My Tech Stack for AI-Assisted Coding in 2026

**Date:** 2026-05-20
**Status:** In Progress

---

## Objective

Lay out the actual toolchain I use for AI-assisted coding in mid-2026 — not aspirational, not hypothetical — and explain *why* each piece earns its place in a working stack driven by the Edinburgh Protocol.

---

## Post Details

**Proposed Title:** My Tech Stack for AI-Assisted Coding in 2026: Zed, herdr, Pi, Bun, Hono, and Some CLI Stuff
**Target Platform(s):** substack, medium
**Categories:** ai, tooling, systems
**Tags:** ai-assisted-coding, tech-stack, zed, herdr, pi, bun, hono, edinburgh-protocol

## Content Outline

1. **Hook** — AI-assisted coding isn't about one magic tool. The stack is a tensegrity structure: each piece does one thing, and the integrity is in how they relate.
2. **Body** — Layer by layer:
   - **Zed** — The editor. Fast, native, AI-aware. Where the human types.
   - **herdr** — Terminal workspace manager. Persistent sessions, tabs, panes, agent integrations. Where the agent lives.
   - **Pi** — The agent harness. Framework, SDK, extensions, skills. The governance layer.
   - **Bun** — The runtime. Scripting, export pipelines, tooling. Fast and modern.
   - **Hono** — The web framework. When you need a lightweight API surface.
   - **CLI layer** — `td` for task management, `just` for command running, and the small tools that hold it together.
3. **Resolution** — This stack works because each piece reduces conceptual entropy at its layer. The stack is not about brand loyalty; it's about composition.
4. **CTA** — Start with one piece. Don't adopt the whole stack at once. Find the layer where your friction is highest.

## Research Needed

- [ ] Zed AI integration details verified
- [ ] herdr agent integration features confirmed
- [ ] Pi SDK/extension references correct
- [ ] Existing posts on this topic checked for overlap

## Export Checklist

- [ ] Front-matter complete (title, date, categories, canonical_target)
- [ ] Run `bun run scripts/export-all.ts`
- [ ] Review `_exported/` output
- [ ] Commit to `main` → GitHub Pages deploys

## Notes

This is a personal-stack piece, not an advisory. Voice should be first-person, grounded in the Edinburgh Protocol framing but more conversational than the OSAAS advisory series. The herdr.md file in the repo root contains reference material for the herdr section.
