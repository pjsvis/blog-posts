# Discussion: AI-Assisted Writing — Marble, Two Panels, and Reversing the Pipeline

**Date:** 2026-09-02
**Status:** Proposed (discussion document, pre-ADR)
**Author:** Peter + Edinburgh Protocol agent

---

## Context

The `fiction-psychosis` post was drafted in the Edinburgh Protocol voice — dry, precise, world-weary, Caledonian-drawing-room. The voice is excellent and the argument holds, but it is not Peter's voice. Peter's voice is cynical, Leithian, sweary, anecdotal. The post is a marble block: the argument and the verified facts are the asset; the sentences are not. This raised a general question about how to write *with* AI assistance rather than *in* an AI voice — and, in turn, whether the current Jekyll-first export pipeline is even the right shape.

Two data points make this urgent:

- **119 drafts, 24 posts.** A 5:1 draft-to-publish ratio. The pipeline is winning the battle against output. That is a systems failure, not a discipline failure.
- **The export pipeline exists, has playbooks, has scripts — and is used rarely enough that `medium-substack-playbook.md` still references "your Jasper canvas," a tool that is no longer the starting point.** The pipeline documentation has barnacled around a workflow that no longer matches how work actually happens.

## Part 1 — The marble principle

### Thesis

The AI's draft is **source material, not a draft to be edited.** Its job is to prove the argument holds and the facts check out. Once it has done that, its continued presence on screen is liability, not asset.

This is the correct classification of the Edinburgh Protocol voice: it is the wrong register *by construction*, and that is its value, not its flaw. It produces a clean skeleton and clean citations. It does not produce Peter's sentences, and it should not be asked to.

### The two-panel setup

| Panel | Contents | Rule |
|-------|----------|------|
| **A — Notes** | The marble: argument skeleton, verified facts, research list. Not sentences — bullet structure. | Read, absorb, **close.** |
| **B — Written product** | The fresh write, in Peter's voice, composed from memory of Panel A. | Never open Panel A while writing. |

The act that transposes register is **recomposition from memory**: read the argument, absorb the shape, close the panel, write what you remember. What comes out is yours because it passed through the only filter that produces your voice — the act of forgetting the exact words and remembering only what they meant.

### Failure modes (in ascending order of detectability)

1. **Copy-paste.** Detectable. You will see it and stop. Boring failure.
2. **Paraphrase-pastiche.** Keep the marble open, write fresh, but sentence-by-sentence re-dress the scaffold — swap a Protocol phrase for something with a swear in it, keep the structure, move on. Produces *a voice doing an impression of a voice.* Invisible to the writer, obvious to the reader. This is the real risk.
3. **Inherited tidiness.** The marble is too tidy, so the fresh write inherits a frontal, marching structure that Peter's anecdotal register doesn't want. The voice is discursive; it arrives sideways, through a story. If the fresh write wants to start in a pub, or a close, or a specific bloody argument about a specific book, let it. The marble gave the destination; the route is none of its business.

### Discipline (the guard, not the tool)

- **Never select text from Panel A.** Ever. If you find yourself wanting to, you've stopped writing and started editing.
- **Close Panel A before opening Panel B.** The marble's job is to hand you the argument and the facts; once done, its presence is pure liability.
- **Let the fresh write be rude to the marble.** If the fresh write disagrees on a point, the fresh write is probably right — it's being written by the person who knows whether the swear lands. The marble is source material, not scripture. Cut the Socrates bit if you want. Lead with the anecdote. Tell the marble where it was being a smug bastard.

### The honest way to deliver Panel A

Panel A should not be sentences. It should be a **trimmed argument skeleton + verified facts**, stripped of prose, so there is nothing tempting to copy because there is nothing to copy. Bullet points, citations, structure. The prose is the writer's job; the AI's job is to prove the prose is worth writing and to keep the facts honest.

---

## Part 2 — Reversing the pipeline

### Current state

```
_drafts/ → _posts/ → export scripts → _exported/{medium,substack}/ → manual paste → publish
```

Jekyll is the single source of truth. Export scripts transform Markdown for each platform. Distribution is manual paste.

### Proposed state

```
Write directly on Medium / Substack  →  (optional) back-import to _posts/ as archive
```

Medium and Substack become the *writing surface*, not the export target. Jekyll becomes a passive archive — the canonical home for canonical_url purposes, or simply a backup, updated by back-import when it matters and ignored when it doesn't.

### Why this is worth considering

- **Friction killed the pipeline.** 119 drafts say so. The export pipeline is five steps between a finished draft and a published post. Writing on the platform is one step between an idea and a published post. The pipeline was built to preserve canonical discipline and formatting control; it has instead preserved drafts in a drawer.
- **The voice question makes it worse.** If Peter is going to write fresh in his own voice anyway (Part 1), the Jekyll draft is a *second* draft — the marble — that then has to be re-written a *third* time on the platform. Three drafts to one publish is the architecture of never publishing.
- **Medium and Substack are better writing surfaces than Jekyll for this voice.** Rich-text editor, immediate preview, native audience, native distribution. The Jekyll value proposition (version control, ownership, formatting control) matters for reference material and long-term archives; it matters less for opinion pieces that live or die in the feed.

### What we lose, and whether it matters

| Loss | Does it matter? |
|------|-----------------|
| Canonical URL discipline (ADR-003) | Mitigated: Medium and Substack both support `canonical_url` pointing at GitHub Pages, or at each other. The discipline survives the reversal; it just gets set on the platform, not in front-matter. |
| Formatting control (Markdown source of truth) | Only matters if we back-import. If GitHub Pages is a passive archive, formatting fidelity is not the constraint. |
| The export scripts (`export-all.ts`) | Become optional, not mandatory. Keep them for the case where a post is written in Jekyll first and then distributed. Don't delete; demote. |
| Version history in git | Real loss. Mitigation: back-import finished posts to `_posts/` and commit. Git becomes an archive-of-record, not a working copy. |
| Single source of truth | Becomes *distributed* truth with reconciliation. This is the honest cost. Accept it or don't do the reversal. |

### The reconciliation discipline

If the pipeline reverses, divergence is the default state. Two ways to live with it:

- **Back-import on publish.** After publishing on Medium/Substack, paste the final into `_posts/` and commit. GitHub Pages becomes a mirror, updated post-publish. Simple, mechanical, low-friction.
- **Don't reconcile.** Accept that Medium/Substack is where the posts live and GitHub Pages is the archive of older work that stays where it is. Honest about the cost: future you cannot grep the canonical copy. Only viable if you trust the platforms not to enshittify. Historical precedent on that trust is poor.

The recommended posture: **back-import on publish, but treat it as archive, not source.** The source is wherever the post was written. The archive is git.

---

## Part 3 — The silo-slices channel

### The idea

The blog-posts silo (and adjacent silos) already contain written material that has intrinsic reader interest: playbooks, barnacle-scraping logs, the Edinburgh Protocol conceptual lexicon, agent handoffs, briefs, debriefs, ADRs. None of this is "content" in the marketing sense; all of it is the *working record of someone operating an AI-assisted writing system in public.* That is a genre, and it has an audience.

### What to publish

- **Funny stories from the silo.** The barnacle record. The `Justfile` capitalisation saga. The time an agent spent an hour debugging a problem caused by following a convention that didn't exist. These are already written; they need selecting, not writing.
- **Ancient world porn.** (Working title.) The constructed-language stuff, the deep-lore rabbit holes, the genuinely interesting niche material that the fiction-psychosis post only gestures at. The silo is full of this; it just isn't in `_posts/`.
- **Sections of particular silos.** A single ADR, abridged. A single playbook entry, with context. A single lexicon term, expanded. Curation, not creation.
- **Agent handoffs and briefs, lightly redacted.** The texture of working with an AI agent — what the handoffs actually look like, what the briefs actually say — is the content the AI-curious audience wants and almost nobody publishes honestly.

### Why this is the lowest-effort, highest-signal channel

- **No writing required.** Selecting and framing, yes. Drafting from scratch, no. The material exists.
- **It inverts the 5:1 ratio.** 119 drafts are a problem only if every draft is supposed to become a post. If some drafts *are* the raw material for slice-posts, the drawer becomes a quarry.
- **It is honest working-in-public.** The blog-posts silo is already a meta-silo about publishing. Publishing its own internals is the recursive move that the medium rewards.

### The risk

- **Self-referential collapse.** A blog about blogging about blogging. Guard: each slice-post must stand alone for a reader who has never seen the silo. If it only makes sense to someone who already lives here, it's a diary entry, not a post.

---

## Part 4 — Links on Medium (and Substack)

**Question asked:** How do SSH links work on Medium — the same as URLs?

**Answer:** Assuming "SSH" means standard hyperlinks (not `ssh://` — that is not a thing on Medium): they work exactly like any rich-text editor.

| Action | Result |
|--------|--------|
| Paste a bare URL (e.g. `https://pjsvis.github.io/blog-posts/...`) into the body | Medium auto-converts it to a clickable link. |
| Select text, paste a URL over it | The selected text becomes the anchor text, hyperlinked. |
| Select text, press `Ctrl-K` / `Cmd-K` | Opens the link dialog; paste URL. |
| Markdown import / paste | Medium converts `[text](url)` on paste in most cases, but the rich-text method is more reliable. |

Substack is identical: paste a bare URL to auto-link, or select text and paste the URL to hyperlink. Both editors are standard rich-text; there is no special link syntax to learn and no `SSH` involved. The only discipline worth keeping: prefer **absolute GitHub Pages URLs** (`https://pjsvis.github.io/blog-posts/...`) so links survive copy-paste between platforms and point back to the canonical home.

---

## Opinion

Three positions, in order of confidence.

**1. The marble principle is correct and should be adopted.** This is not a close call. The Edinburgh Protocol voice is a feature for producing the skeleton and verifying the facts; it is a bug if it reaches the published sentence. Read-and-close is the discipline; trimmed-skeleton Panel A is the honest delivery format. Do this regardless of the pipeline question.

**2. Reversing the pipeline is worth trying, with a defined exit criterion.** The 5:1 ratio is the evidence; the pipeline has lost. But "reverse it" is an architecture decision that is hard to half-do. Set the criterion in advance: *if, after three months of writing-on-platform + back-import, the publish rate rises and the archive stays reconciled, the reversal becomes permanent and the export scripts get demoted to optional.* If it doesn't, revert. Don't drift in the middle. The worst outcome is a hybrid where neither pipeline is trusted and the drafts pile up in both.

**3. The silo-slices channel is the best idea of the three and the one to start with.** It requires no pipeline decision, no voice work, and no new writing. It requires selecting. Start there: publish one slice — a barnacle log, a lexicon term, an ADR abridged — on Medium this week. It tests the platform-as-writing-surface hypothesis at zero cost, and it produces a post from existing material, which is the one thing the current pipeline has failed to do 119 times in a row. The fiction-psychosis marble can wait its turn; the slices are ready now.

---

## Related

- Brief: `briefs/brief-ai-psychosis-2026-09-02.md`
- Draft: `_drafts/2026-09-02-fiction-psychosis.md`
- Playbook: `playbooks/export-playbook.md` (the pipeline this proposes to reverse)
- Playbook: `playbooks/medium-substack-playbook.md` (already barnacled around "Jasper canvas")
- ADR-003: multi-platform canonical URL strategy (the discipline to preserve through any reversal)
- Conventions: `playbooks/conventions-playbook.md` — the barnacle record is itself silo-slice material