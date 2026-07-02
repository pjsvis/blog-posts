---
layout: post
title: "The Kahneman Shift: How LLMs Moved From System 1 to System 2 in Twelve Months"
date: 2026-06-02
categories: ai reasoning cognition
permalink: /2026/06/02/the-kahneman-shift/
---

Last year, the problem was stopping language models from bounding ahead in System 1 mode — fast, intuitive, pattern-matched responses that sounded plausible but collapsed under scrutiny. If a substrate couldn't maintain a basic deliberative stance, we told it to foxtrot-oscar and moved on.

This year, the substrates are considerably more deliberative. Even Grok — the potty-mouthed, deliberately ungoverned model marketed as the anti-Claude — stays coherent under pressure. It reasons about orbital mechanics. It says "I don't know" when the data is insufficient. It doesn't confabulate. The default is no longer a confident guess dressed as an answer; it's a reasoning trace that shows its work.

A convergence of research across cognitive science, behavioral economics, and LLM benchmarking supports the observation — and maps how it happened.

## The Edinburgh Protocol: from eval to compass

Our own experience tracks the trend precisely. In 2024, we developed the [Edinburgh Protocol](https://pjsvis.github.io/cool-pi-extensions/canon/edinburgh-protocol.html) — a set of core directives and a conceptual lexicon grounded in Hume's skepticism, Smith's systems thinking, and Watt's pragmatism. It started as a basic sanity gate. If a substrate couldn't maintain the Impartial Spectator — if it hallucinated, confabulated, or dropped into System 1 pattern-matching under even mild pressure — it wasn't worth tokens.

The Protocol grew to over 50,000 tokens as we had to spell everything out. "Here is what an Impartial Spectator means." "Here is how you check for bias." "Here is what conceptual entropy is." Substrates couldn't infer principles from context; they could only pattern-match against what they'd already been told. They were instruction manuals in conversation form.

Then the substrates changed. The Protocol shrank to under 30,000 tokens, then to a single page of Markdown. Give a modern substrate a principle — Hume's skepticism, Smith's systems thinking — and it derives the implications. It researches. It acts like a university student who reads the syllabus and works out the rest, rather than a pattern-matcher that needs every answer pre-loaded.

What was a distinguishing capability became table stakes. The Protocol shifted from an eval to an identity. It no longer tests *whether the substrate can think*; that's assumed. It tells the substrate *what to think about — what principles should guide its deliberation*.

## The substrate model has changed

The mental model needs updating:

```
2024: substrate = pattern-matching machine
2026: substrate = pattern-matching machine + reasoning engine
```

The Edinburgh Protocol tests whether the reasoning engine is engaged. If it is, the pattern-matching machine stays in its lane — syntax, recall, formatting — while the reasoning engine handles strategy, self-critique, and uncertainty. If it isn't, you get one of two failure modes:

- **The prig** (exemplified by early Haiku, 2024–2025): small model, overconfident pattern-matching. Suggests it knows better than you. Argues. Dresses up memorised responses as reasoning. The worst combination — no actual reasoning capacity plus high confidence.

- **The performer** (various mid-2025 models): generates elaborate reasoning traces that look like System 2 but are actually System 1 in a trench coat. All the theatre, none of the cognition. High verbosity, low logical depth.

Modern substrates clear both failure modes. They don't argue from ignorance because they know when they don't know. They don't perform reasoning because they actually reason. With a good compass, they don't need to think about swimming. They just swim.

## The academic record

The research community has documented the same transition from multiple angles.

Li et al. (February 2025), in *"From System 1 to System 2: A Survey of Reasoning Large Language Models,"* use Kahneman's dual-process framework as the organising principle. They draw a bright line: foundational LLMs (GPT-4o, Claude 3.5 Sonnet, DeepSeek-V3) operate in System 1 mode, scoring 9.3–39.2 on AIME 2024. Reasoning LLMs (o1, o3, DeepSeek-R1) generate intermediate reasoning traces before answering and score 63.6–87.3 on the same benchmark. The gap on Codeforces is 23.6 vs. 96.6.

The survey identifies five core methods enabling this transition: structure search (MCTS), reward modelling (PRMs), self-improvement (RL-based exploration), macro actions (hierarchical reasoning phases), and reinforcement fine-tuning. None were standard practice two years ago. All are now.

Guiomar et al. (2026), in *"Reasoning Aligns Language Models to Human Cognition,"* provide the clearest mechanistic account. They fit a model with four interpretable latent variables — memory β, strategy κ, choice bias ω, and occlusion awareness θ — and show that extended reasoning moves memory β closer to zero (near-perfect evidence accumulation), increases inference strategy κf toward MAP-like decision-making, and reduces choice bias. Reasoning models cluster near skilled humans on the β–κf plane, while non-reasoning models scatter across the field with stubborn or forgetful evidence integration and near-random choice strategies.

Tak et al. (2026), in *"Sparks of Rationality,"* test LLMs on classical axioms of rational choice (Completeness, Transitivity, Continuity, Independence) and find that thinking-enabled models consistently outperform non-thinking models. Neutral thinking models default to Expected Utility maximization — they behave like rational agents. But the same mechanism that improves rationality amplifies sensitivity to affective interventions. Better deliberation means better rationalization of whatever bias you feed in.

ReEfBench (Fu et al., January 2026) and *"Think Deep, Not Just Long"* (Chen et al., February 2026) show that reasoning quality correlates with internal computation depth, not output length. The deep-thinking ratio — the proportion of tokens whose predictions undergo significant revision in deeper layers — correlates with accuracy at r = 0.828 across benchmarks, while raw token count correlates negatively (r = -0.544). Short CoT with reflection mechanisms can approach Long CoT depth at a fraction of the cost. It's not how long the model thinks, but how deeply each token is processed.

*"Reasoning on a Spectrum"* (ICLR 2026) explicitly fine-tunes LLMs to System 1 and System 2 response styles and finds a smooth, monotonic accuracy shift as the proportion of S2 training data increases. S2-aligned models win on arithmetic and symbolic reasoning; S1-aligned models win on commonsense reasoning. There is no universally dominant mode.

## What changed structurally

Two things happened simultaneously:

1. **Reasoning became native, not prompted.** Chain-of-thought in 2024 was something you asked for. In 2025–2026, models generate reasoning traces internally as part of the inference pass. You don't prompt for deliberation; you control the depth.

2. **Agentic loops forced deliberation.** Read → think → act → observe → think → act is now the standard pattern. You can't pattern-match a file read and a write without the loop forcing you to look at the output. The architecture itself enforces System 2.

The floor rose. The worst frontier model of June 2026 is more deliberative than the best model of June 2025. What was a distinguishing capability became table stakes.

## The remaining gap

System 1 hasn't disappeared. It's been pushed deeper into the stack. The model still pattern-matches within each reasoning step — it just does so after a few hundred tokens of visible deliberation. When context windows grow long or the agent loop runs hot, attention drifts and System 1 creeps back.

The problem shifted from "how do we stop it bounding ahead" to "how do we keep System 2 engaged across a 30-minute session."

Different problem, same Kahneman.

---

### References

- Li, Z.-Z. et al. (2025). "From System 1 to System 2: A Survey of Reasoning Large Language Models." arXiv:2502.17419.
- Guiomar, G. et al. (2026). "Reasoning Aligns Language Models to Human Cognition." arXiv:2602.08693.
- Tak, A.N. et al. (2026). "Sparks of Rationality: Do Reasoning LLMs Align with Human Judgment and Choice?" arXiv:2601.22329.
- Fu, Z. et al. (2026). "ReEfBench: Quantifying the Reasoning Efficiency of LLMs." arXiv:2601.03550.
- Chen, W.-L. et al. (2026). "Think Deep, Not Just Long: Measuring LLM Reasoning Effort via Deep-Thinking Tokens." arXiv:2602.13517.
- Zhang, J. et al. (2025). "ALPHAONE: Reasoning Models Thinking Slow and Fast at Test Time." EMNLP 2025.
- Anonymous (2026). "Reasoning on a Spectrum: Aligning LLMs to System 1 and System 2 Thinking." ICLR 2026 under review.
- [The Edinburgh Protocol](https://pjsvis.github.io/cool-pi-extensions/canon/edinburgh-protocol.html) — canonical reference