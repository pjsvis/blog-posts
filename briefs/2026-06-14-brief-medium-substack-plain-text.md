# Brief: Plain Text Publishing to Medium and Substack

## Problem

The performance has taken over blog posts. Content became the supporting act for the design. We need to invert the thing.

## Solution

Strip the performance out of blog posts. Use `<pre>` with inline styles as the canonical delivery format. No CSS file. No layout. No ceremony. Just text.

## The Canonical Format

```html
<pre style="white-space: pre; font-family: monospace; font-size: 14px; line-height: 1.5; max-width: 100%; overflow-x: auto;">
[content here — no markdown, no formatting, just raw text]
</pre>
```

## Why This Works

- **Self-contained** — inline styles survive sanitisation
- **Monospace font** — readable, honest, retro
- **Agent-parseable** — `<pre>` tag is the universal signal
- **Portable** — paste directly into Medium or Substack editor
- **No ceremony** — content over performance, always

## Process

1. Write content in `_posts/` as Markdown
2. Render to `nodes/` as `<pre>` HTML (use existing posts as template)
3. Paste the `<pre>` block directly into Medium/Substack editor
4. Both platforms accept it as a code block or raw HTML

## Rules

- No markdown inside the `<pre>` — bold, links, anything except plain text breaks it
- Keep content raw
- No headings inside the `<pre>` — use `---` for separation if needed
- The deterrent notice stays inside the `<pre>` — "this is a dirty footprint, move on"

## Platforms Tested

| Platform | Verdict |
|----------|---------|
| Medium | ✓ Survives — sanitises on paste, preserves font, whitespace, size |
| Substack | ✓ Survives — more permissive, raw HTML renders directly |

## Goal

First attempt. No back-and-forth. Paste, publish, done.

## Scotland

World Cup. The `<pre>` is Hampden. Go score.

---

*Brief written: 2026-06-13*  
*Status: Do it*  
*When: Morning*