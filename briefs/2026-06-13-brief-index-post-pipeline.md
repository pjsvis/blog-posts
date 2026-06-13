# Brief: Index Post Pipeline

## Problem

Post-blog era. We've built the silo. Nodes drop. Nobody knows where to find them unless they're in the repo.

## Solution

A single, always-on-top "directory post" on Medium and Substack. Links to all published nodes. No design. Just go.

Agents and humans point at this page, parse the list, decide what to read.

## What We Decided

- **Index post lives on Medium + Substack** — the entry points where audiences already are
- **Jekyll is the silo** — write here, export from here, never needs to be a destination
- **One page, zero ceremony** — just a flat list of links with key lines
- **Manual paste** — drop the file, paste it, read it before posting (quality gate)
- **Update date each time** — keeps it near the top of chronological feeds, no pinning required

## The Index Post Format

```markdown
Nodes (updated 2026-06-13)

A directory of dropped thoughts. Go or don't go.

• The Harness-Harness — "A structure for your structure. A cunning plan."
  [Medium] [Substack]
  
• Shannon, Kolmogorov, and the Meta-Reflexive Loop — "The AI eventually compiles itself out of a job."
  [Medium] [Substack]
  
• Echo + Herdr + TailScale — "Your iPhone becomes a legitimate agent-monitoring device."
  [Medium] [Substack]
```

Optionally includes JSON block for agent parsing:

```html
<!-- AGENT BLOCK -->
<!-- {"nodes":[...]} -->
```

## What Needs Building

1. **`scripts/generate-index-post.ts`** — parses `_posts/`, spits out the Markdown index file
2. **The first index post** — ready to paste to Medium and Substack
3. **HN promotion** — one link to the index post, nothing else

## When to Update

When a new node drops. Run the generator, paste the output, done. No more ceremony than that.

## Status

Brief committed. Implementation deferred. Beer now.