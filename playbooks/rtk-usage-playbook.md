# RTK (Rust Token Killer) Usage Playbook

## Context

RTK is a CLI proxy that compresses shell command output before it reaches an LLM's context window.
It filters boilerplate, groups similar items, deduplicates repeated lines, and truncates redundant output.

**Original marketing framing**: "Slash AI coding costs by 80%."  
**Our framing**: Targeted noise reduction for context hygiene.

The marketing is calibrated to SOTA model users (Claude Opus, GPT-4o). We do not primarily use those models. Our preference is inference arbitrage using open-weights Chinese models (Qwen, DeepSeek, Yi). For that audience, token volume reduction is less relevant than context management and information quality.

---

## Core Principle

**RTK is a precision instrument, not a cost-cutting bludgeon.**

Always-on compression on cheap models is a bad trade: you degrade information available to a model with less reasoning capacity, to save costs that don't materially constrain you.

Targeted use — identify noisy output, run it through RTK, assess the compressed result, decide consciously — is sound methodology.

---

## Failure Mode: Silent Deficit

If RTK is used always-on, the agent builds a mental model of CLI output that is systematically distorted from reality. It won't know what it's missing. This is the map/territory problem in practice.

**Mitigation**: Explicit evaluation step — did the compressed output actually serve the purpose?

---

## Decision Framework

### USE RTK when

- Output is high-volume, low-signal (test runs, git operations, log files)
- Agent is in diagnostic/scanning mode, not reasoning over details
- Session duration is long (context window management matters)
- Command is known-good (success paths, not debugging novel failures)
- Output has been assessed as safe to compress in prior runs

### AVOID RTK when

- Agent is investigating novel failures (need full log context)
- Diff output might contain important decisions the agent should flag
- Code review or architectural reasoning (filtering bodies loses signal)
- New/unfamiliar codebase (don't compress what you don't yet understand)
- Failure analysis (tee-on-failure is not a substitute for full output on first run)

### TARGETED USE (assess before committing)

- Run RTK on a specific noisy output source
- Compare compressed output to original
- Judge whether the compressed version retains what the agent needs
- If yes: document the command type as "approved for RTK"
- If no: use raw command or RTK verbosity flags (`-v`, `-vvv`)

---

## Empirical Results (blog-posts silo, 2026-05-28)

| Command | Raw | RTK | Reduction | Assessment |
|---------|-----|-----|-----------|------------|
| `git status` | 1,198 B | 744 B | **38%** | ✅ Clean win — strips boilerplate, retains signal |
| `git log --oneline` | 711 B | 711 B | **0%** | ⏭️ No-op — format already maxed out |
| `git diff --stat` | 857 B | 857 B | **0%** | ⏭️ No-op — stat already lean |
| `git diff` (content) | 295,755 B | 36,320 B | **88%** | ⚠️ Truncates after first file — dangerous for review |

**Pattern confirmed**: outcome-only commands are safe; content-sensitive commands truncate. Git log and diff stat are already optimized — RTK adds overhead for no gain.

## Command Risk Classification

| Command | Elision Risk | Verdict |
|---|---|---|
| `git status`, `git push`, `git add/commit` | Low — outcome only | ✅ Safe for RTK |
| `git log --oneline` | Low — summary already concise | ✅ Safe for RTK |
| `cargo test`, `npm test` (passing suite) | Low — failures preserved | ✅ Safe for RTK |
| `grep` / `rg` results | Low-Medium — deduplication usually fine | ✅ Usually safe |
| `docker ps`, `docker images` | Low — compact list format | ✅ Safe for RTK |
| `ls`, `tree` (directory listing) | Medium — grouping can hide filenames | ⚠️ Use with awareness |
| `git diff` | High — truncates multi-file diffs after first file | ❌ Avoid for review; OK for scan |
| `git diff --stat` | Low-Medium — stat already compact | ⏭️ No-op, use raw if preferred |
| `cat` large file | High — bodies stripped in aggressive mode | ⚠️ Selective use |
| `docker logs`, `kubectl logs` | Medium — repeated lines OK, unique errors matter | ⚠️ Watch tail output |
| `cat` novel/unfamiliar file | High — don't compress what you don't understand | ❌ Avoid |
| Markdown / documentation files | High — high-signal, RTK adds overhead | ❌ Not for file reading |

**Pattern**: outcome-only commands are safe; content-sensitive commands require judgment.

---

## Measurement

After sessions using RTK:

```
rtk gain           # review actual savings vs. baseline
rtk discover --all --since 7  # find missed savings opportunities
```

Token savings numbers are less relevant for our use case than: did the agent produce correct output? Did compression contribute to any degradation?

---

## Repository Integration

RTK commands are exposed via `justfile` for repo-portable access:

```bash
just gst        # rtk git status — safe, always
just glog       # rtk git log --oneline -5 (default 5, configurable: just glog 20)
just gdiff      # rtk git diff — ⚠️ content-sensitive, use for scan only
```

These are wrappers, not shell aliases. Collaborators cloning the repo get RTK integration automatically.

## Configuration

Key flags:
- `-u, --ultra-compact` — ASCII icons, inline format. Maximum compression. Opt-in only.
- `-v, --vv, -vvv` — Verbosity. Use `-vvv` to inspect raw output if compression is suspected of causing issues.
- `rtk telemetry disable` — Run before use if telemetry concerns apply.

Config file: `~/.config/rtk/config.toml`

---

## Attribution

Playbook derived from evaluation of:
- RTK project at github.com/rtk-ai/rtk (v0.42.0, 2026-05-24)
- Architecture documentation (ARCHITECTURE.md, TECHNICAL.md)
- Multiple third-party articles (Monika Singhal, Esteban Estrada, Mukesh Kumar, Mervin Praison)

Article quality assessment: promotional fluff that understates a legitimately engineered project.
Project assessment: sound architecture, 64 modules, named contributors, detailed decision records.

---

## Scope Note

RTK is a CLI output proxy, not a general-purpose file compressor. Tested against this silo:
- Markdown playbook (~4.8KB): RTK added 78 bytes (+1.6%) — no compression possible on high-signal text
- Markdown is already dense; RTK cannot compress signal, only noise

**Rule**: Use `cat` or `rg` for file content. Use RTK for CLI streams.

---

*Last updated: 2026-05-28*