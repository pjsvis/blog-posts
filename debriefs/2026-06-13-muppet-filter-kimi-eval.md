---
date: 2026-06-13
tags: [ai-eval, edinburgh-protocol, model-evaluation, blogging]
agent: local-ai
environment: local
---

# Debrief: Edinburgh Protocol Eval System — Kimi K2.6 Research

## Accomplishments

- **Investigated eval failure:** Traced Kimi eval failures to internet outage, not justfile refactor
- **Fixed eval facade:** Created `scripts/eval.sh` + `just eval` recipe for unified eval CLI
- **Fixed Kimi temperature bug:** K2.6+ requires 0.6 (not 0.7), added kimi-k2.5 and kimi-k2.7 to registry
- **Ran thinking trace experiment:** Compared thinking-enabled vs disabled output (2.75× assertiveness difference)
- **Updated Q2 eval doc:** Corrected hypothesis, added Kimi results, documented thinking mode analysis
- **Wrote two blog posts:** "The Muppet Filter" (methodology) + "Why Kimi K2.6 Hasn't Benchmaxxed" (opinion)
- **Packaged brief:** `briefs/2026-06-13-brief-muppet-filter-kimi-eval.md` with source docs in `canon/`

## Problems

- **Internet outage:** Delayed Kimi eval, ping test showed intermittent connectivity
- **Bash associative arrays:** `declare -A` required, `local -A` fails in bash mode
- **jq group_by exit code 5:** JSONL format issue, rewrote status command with simpler aggregation
- **Kimi temperature constraint:** Model API only accepts 0.6 for temperature, not 0.7
- **kimi-k2.7 not available:** Model not released yet, added to registry for future

## Lessons Learned

- **Bounded contexts are the pattern:** cool-pi-extensions (eval infrastructure) vs blog-posts (publishing) = clean separation, minimal handoff
- **Naming matters for traction:** "Muppet Filter" has legs, "Edinburgh Protocol Eval" is descriptive but not punchy — use both for different channels
- **Correcting hypotheses is good:** The original "kimi is benchmaxxing" suspicion was wrong, documenting the correction adds credibility
- **The Jackson Pollock insight was unexpected:** Revised opinion (messy implementation) is more nuanced than binary pass/fail
- **Wacky thesis closing works:** Meta-humor about verbosity as character, not bug — lands better than earnest conclusion

## Key Insights

- **Thinking trace is genuine reasoning:** When enabled, assertiveness triples. The visible reasoning is real, not performance anxiety.
- **Substrate/Sleeve/Skin framework is durable:** Works for eval, deployment, and editorial framing
- **Cursor's validation matters:** Market signal from engineers with hands-on experience > benchmark scores
- **Inference arbitrage is real:** Free NVIDIA models (Nemotron) match paid performance on Protocol compliance

## Metrics

- **Eval status:** `just eval status` working, 48 entries in `.silo/eval_log.json`
- **Kimi scores:** K2.6: 15-18/19 (varies), K2.5: 14-15/19
- **Post drafts:** 387 lines across two posts in `canon/`

## Related

- Brief: `briefs/2026-06-13-brief-muppet-filter-kimi-eval.md`
- Source docs: `canon/the-muppet-filter-draft.md`, `canon/why-kimi-k2.6-hasnt-benchmaxxed-draft.md`
- Raw results: `cool-pi-extensions/.silo/eval_log.json`
- Eval infrastructure: `cool-pi-extensions/scripts/eval.sh`, `src/cli/pi-check/edinburgh-eval.ts`

## Next Steps

- [ ] Writer picks up brief from blog-posts/briefs/
- [ ] Finalize posts for publication
- [ ] Deploy via blog-posts export pipeline
- [ ] Add kimi-k2.7 eval when model releases
- [ ] Consider running full eval with Gemini grading (requires OPENROUTER_API_KEY)