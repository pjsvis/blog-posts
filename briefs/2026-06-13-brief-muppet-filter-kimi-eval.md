# Brief: The Muppet Filter & Why Kimi K2.6 Hasn't Benchmaxxed

**Date:** 2026-06-13
**Status:** Open
**Source:** `~/Dev/GitHub/cool-pi-extensions/docs/the-muppet-filter.md`, `~/Dev/GitHub/cool-pi-extensions/docs/why-kimi-k2.6-hasnt-benchmaxxed.md`

---

## Objective

Package the Edinburgh Protocol eval system research as two blog posts with shared narrative arc. Both posts should feel like they come from the same voice (Edinburgh Protocol: world-weary, systems-thinking, dry wit) but serve different purposes.

**Post 1 ("The Muppet Filter"):** Methodology piece — how the eval system works, what it found, how to use it.
**Post 2 ("Why Kimi K2.6 Hasn't Benchmaxxed"):** Opinion piece — the unexpected discovery, the revised hypothesis, the critique.

---

## Shared Narrative Arc

```
Act I: Humble Beginning
  → Last year, inference was cheap. Simple problem: exclude muppets.

Act II: Complication
  → Inference got expensive. Need inference arbitrage. Eval becomes ranking.

Act III: Unexpected Discovery
  → Benchmaxxing bar-stewards turned up. Not muppets — something worse.

Act IV: Kimi Revision
  → Kimi K2.6 thinks well, comes up with good ideas, but implementation is messy (Jackson Pollock).

Act V: Meta-Moment
  → "At this point, Kimi K2.6 would be deep in the writing of a wacky thesis."
```

Post 1 emphasizes Acts I–III (methodology, results, unexpected discovery).
Post 2 emphasizes Acts III–V (benchmaxxing discovery, Kimi critique, wacky thesis closing).

---

## Post 1: The Muppet Filter

**Proposed Title:** The Muppet Filter: Building a Behavioral Eval System to Identify Models That Actually Work

**Target Platform(s):** Medium (Coding Nexus), GitHub Pages
**Categories:** AI, Engineering, Methodology, Edinburgh Protocol

### Content Outline

1. **The Humble Beginning** (~200 words)
   - Last year: inference was cheap
   - Simple problem: identify muppet-substrates
   - The eval system was a filter, not a ranking

2. **The Complication** (~200 words)
   - Inference gets expensive
   - Need inference arbitrage
   - Eval changes from filter to ranking

3. **The Unexpected Discovery** (~150 words)
   - Benchmaxxing bar-stewards turned up
   - We expected muppets, found something worse

4. **The Methodology** (~400 words)
   - Substrate/Sleeve/Skin framework (with diagram)
   - The four trap tests explained simply
   - Two-pass grading (regex + Gemini Flash)
   - pi-coding-agent advantage (direct latent space access)

5. **The Results** (~300 words)
   - Summary table: Pass/Fail/Muppet
   - Key findings: NVIDIA free tier matches paid, Kimi K2.6 is top performer

6. **The Framework in Action** (~150 words)
   - Demo commands: `just eval status`, `just eval edinburgh`, `just eval traps`
   - Point to repo for implementation

7. **The Mystery in the Sleeve** (~150 words)
   - Context-initialization, temperature, thinking-mode
   - Not everything is in the prompt

8. **What This Enables** (~150 words)
   - For procurement, developers, the field
   - "Use it." — direct call to action

### Tone
Technical but accessible. Explains methodology without exhaustive detail. Points to existing docs for deep dive.

### Closing Line
"Use it."

---

## Post 2: Why Kimi K2.6 Hasn't Benchmaxxed

**Proposed Title:** Why Kimi K2.6 Hasn't Benchmaxxed: A Meditation on Model Quality, Benchmark Gaming, and the Difference Between Performance and Competence

**Target Platform(s):** Medium (General), GitHub Pages
**Categories:** AI, Opinion, Model Evaluation, Edinburgh Protocol

### Content Outline

1. **The Humble Beginning** (~150 words)
   - Last year: exclude muppets only
   - Trap prompts designed to catch them

2. **The Unwelcome Discovery** (~150 words)
   - Benchmaxxing definition and why it's hard to detect

3. **The Numbers That Don't Add Up (In a Good Way)** (~200 words)
   - 18/19 score is a different kind of high
   - The "revenge cartography" quote
   - A model with a stance, not a performer

4. **The Hypothesis That Was Wrong** (~300 words)
   - Original suspicion: benchmaxxing signature
   - The thinking trace experiment
   - Results: thinking enabled = 2.75× more assertive
   - Interpretation: genuine capability, not performance anxiety

5. **The Jackson Pollock Problem** (~200 words)
   - Thinks well ✓
   - Good ideas ✓
   - Implementation: messy ✓
   - The drip painter metaphor
   - Comparison table: benchmaxxed vs Kimi failure modes

6. **The Muppet Substrate Angle** (~200 words)
   - Explains Substrate/Sleeve/Skin without going deep
   - Points to the mystery in the sleeve
   - Muppet Filter as memorable framing

7. **Cursor's Validation** (~150 words)
   - Market signal: engineers with hands-on experience chose Kimi

8. **Conclusion: A Model That Hasn't Sold Out** (~150 words)
   - 18/19 earned through genuine capability
   - Jackson Pollock problem is tuning, not capability

9. **The Wacky Thesis** (~100 words)
   - Meta-humor closing
   - "The paint is good. We just need better brushes."

### Tone
Opinionated, analytical, self-aware. Edinburgh Protocol voice throughout. Meta-humor about verbosity as character, not bug.

### Closing Line
"The paint is good. We just need better brushes."

---

## Key Editorial Decisions

### Voice: Edinburgh Protocol
- World-weary but intellectually curious
- Precise, articulate, dryly witty
- No manic enthusiasm
- Skepticism as a feature, not a bug

### Framing: Substrate/Sleeve/Skin
Introduce in both posts for coherence:
```
Substrate    ← raw model capability (what's underneath)
  ↑
Sleeve       ← constraint-stack (how we define the operating region)
  ↑
Skin         ← visible persona (tone, voice, style)
```

The Muppet Filter test: *does the constraint-stack stick, or does it slide off?*

### Avoid: Jackson Pollock Syndrome
Each post has one job. Don't repeat methodology in both. Reference, don't replicate.

### The Wacky Thesis Line
This is the closing for Post 2. It should feel natural, not appended. The verbosity is part of Kimi's character — not a bug to fix.

---

## Research Needed

- [ ] Verify eval results against current `.silo/eval_log.json` in cool-pi-extensions
- [ ] Verify `just eval` commands work in cool-pi-extensions repo
- [ ] Check cross-links between posts work when deployed
- [ ] Review the "Jackson Pollock" metaphor for accuracy
- [ ] Verify Kimi thinking trace experiment numbers (2.75× assertiveness)

---

## Assets Available

### Source Docs (cool-pi-extensions)
- `docs/the-muppet-filter.md` — Post 1 draft (189 lines)
- `docs/why-kimi-k2.6-hasnt-benchmaxxed.md` — Post 2 draft (198 lines)
- `docs/model-eval-q2-2026.md` — Raw eval results, methodology details
- `docs/edinburgh-protocol-evals.md` — Trap test specifications
- `docs/model-eval-bankruptcy.md` — MiniMax/GLM critique (Attack of the Clones reference)
- `docs/the-information-arbitrage-stack.md` — Stack overview, philosophy

### Eval Infrastructure
- `scripts/eval.sh` — Eval facade (`just eval status/edinburgh/traps`)
- `src/cli/pi-check/edinburgh-eval.ts` — Scoring eval engine
- `src/cli/pi-eval-runner.ts` — Trap eval engine
- `prompts/edinburgh-protocol-evals-v1.json` — Test fixture

### Blog Infrastructure (blog-posts)
- `_drafts/` — Draft posts go here
- `briefs/` — This brief lives here
- `canon/` — Canonical references
- `playbooks/writing.md` — Editorial guidance

---

## Export Checklist

- [ ] Front-matter complete (title, date, categories, canonical_target)
- [ ] Post 1: "The Muppet Filter" → `_drafts/`
- [ ] Post 2: "Why Kimi K2.6 Hasn't Benchmaxxed" → `_drafts/`
- [ ] Review voice consistency across both posts
- [ ] Verify "The Wacky Thesis" closing lands correctly
- [ ] Check all cross-links resolve
- [ ] Run `bun run scripts/export-all.ts` (or equivalent)
- [ ] Review `_exported/` output
- [ ] Commit to `main` → deploy

---

## Notes for Writer

### The Muppet Substrate Concept
This is the memorable framing. A "muppet-substrate" is a model that had the rules and ignored them anyway. It's self-deprecating (we're testing against muppets) but precise.

### Benchmaxxing vs Muppets
Different failure modes:
- **Muppets:** Ignored the rules, enthusiastic anyway
- **Benchmaxxed:** Followed the wrong rules (benchmarks), have no texture

### Kimi's Revision
We went in expecting to find muppets. Instead we found a model that thinks well but implements messily. This is a capability problem, not a substrate problem — the sleeve sticks.

### The Wacky Thesis Line
At this point Kimi K2.6 would be deep in the writing of a wacky thesis. It would start with the right premise, reason through the problem correctly, and then spiral into twelve footnotes about adjacent topics. The thinking is sound. The structure is a mess. But I'll take a messy thesis from a model that thinks well over a polished one from a model that doesn't.

### Bar-Stewards Context
**Bar-stewards** = Scottish slang for "bastards" — affectionate contempt, knowing euphemism. Billy Connolly's territory.

**"Sugar for shite"** = swapping something bad for something equally bad/empty.

The bar-stewards are offering you sugar when you need something and giving you shite. Confident promises, hollow delivery. The Muppet Filter distinguishes between the two.

## Done

- [ ] Objective is specific and actionable
- [ ] Both posts have clear structure and closing lines
- [ ] No ambiguous language ("should", "maybe", "consider")
- [ ] Research checklist is realistic
- [ ] Export checklist is complete
- [ ] Shared narrative arc is documented
- [ ] Source docs are identified and accessible