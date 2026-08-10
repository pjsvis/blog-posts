---
layout: none
title: "Brief: Everything But the Agent — Why Your Codebase Should Outlive Your LLM"
date: 2026-07-07
status: open
summary: Synthesis post — the repo as artefact of proof, the agent as a stateless normalised worker, and the Shannon/Kolmogorov boundary that assigns semantics to the human. Integrates the amnesia, cargo-not-crew, muppet-filter, and thermostat threads into one architecture readers can adopt or adapt.
---

# Brief: Everything But the Agent

## Objective

Write the synthesis post that assembles, into a single coherent architecture, the pieces developed across prior briefs: the stateless agent (case-against-memory), the agent-as-overhead framing (cargo-not-crew), the EP eval as admission gate (muppet-filter), and the repo as homeostatic regulator (repo-as-thermostat). The post's job is not to introduce a new component but to show how the components form one system, why that system is likely a good thing, and which considerations a reader should weigh — whether they adopt our conventions or their own.

Reader takeaway: a framework for the agent-repo relationship, not a how-to. Readers can implement the same process however they like, or use our conventions; either way they benefit from having considered what we considered.

## Thesis

The dominant frame treats the agent as the thing that has state and does the work. The alternative — the one this post argues — treats the **repo as the thing that has state and a checksum**, and the agent as a **stateless, normalised worker** that re-derives its map from the territory every visit. The repo is the artefact of proof; the agent is Everything But. The boundary between what the agent may do (syntax: Shannon pattern-matching, Kolmogorov compression) and what remains the human's (semantics) is not a deficiency in the system — it is Shannon's 1948 separation, made operational. That separation is what makes the agent recyclable, the trajectory auditable, and the proof load-bearing.

## Provenance

From a session that began by questioning whether pi loads skills at startup, discovered that skills inject descriptions into the system prompt while loading their bodies on demand, and that there is no telemetry on skill usage. The objection to skills was initially framed as visibility; through the session it corrected itself, repeatedly, and each correction moved the real objection deeper:

1. Skills are hidden / untooled for telemetry. (symptom)
2. Skills are unprovenanced priors injected outside the repo's orient gate. (architectural)
3. The repo is the only admissible evidence for an agent's conclusions. (Hume's Razor on priors)
4. The agent operates at the syntactic layer; semantics is the human's. (Shannon's boundary)
5. The agent's semantic priors are a depreciating asset; statelessness is structural distrust of decay. (the load-bearing move)
6. The EP is the normaliser, the variable, and the eval; the repo is the artefact of proof; the agent is Everything But. (the synthesis)

Gemini 3.1's introduction of agent memory — rejected as an unwanted variable — was the confirming instance: a vendor feature is a regression the moment it reintroduces the failure mode the architecture exists to suppress.

The corrections are the contribution. The arc from "skills are hidden" to "the repo is the artefact of proof" is the post's narrative spine.

## The post's moves

**1. Invert the default.** State the dominant frame (agent has state, does the work) and invert it (repo has state and a checksum; agent is stateless). Name the consequence: anything not in the repo is inadmissible as evidence for the agent's conclusions. Refine the phrasing deliberately — not "does not exist" (the model's training priors demonstrably exist and demonstrably shape output; the strong claim fails Hume's Razor), but "is not admissible as evidence." The reframe survives the skeptic; the strong claim does not.

**2. Why stateless: the depreciating asset.** The standard argument for statelessness is operational (re-orient to fresh state). The stronger argument is epistemic: the agent's semantic priors are frozen at training while the repo moves, so they decay against the territory. Statelessness is not refresh — it is structural distrust of a depreciating asset. This inverts the dominant AI rhetoric, which treats model judgment as the valuable output. Here the model's judgment is the least trustworthy, most time-sensitive component. The economics make it material: the LLM costs billions and depreciates; the repo costs tens and persists — and appreciates, as better future engines extract more from the same record. Cost tracks depreciation rate, not durability: the expensive thing is expensive *because* it's the disposable one. Only the cheap, durable, appreciating asset can bear the artefact-of-proof role — the cost structure forces the assignment. (Seed: case-against-memory, sharpened.)

**3. The boundary is Shannon's, not ours.** The agent operates at the syntactic layer — Shannon pattern-matching and Kolmogorov execution (compression, dedup, invariant enforcement). Semantics is the human's domain. This is not a gap to close; it is the principled separation that makes the system possible. A second formal reason the human sits in the loop lives inside syntax itself: Kolmogorov complexity is uncomputable, so "sufficiently reduced" is undecidable mechanically — the tidy/spin-off/proceed decision is a judgment the formal layer cannot certify. Two theorem-grounded boundaries, not one.

**4. The EP as normaliser, variable, and eval.** Three layers, three mutability profiles: repo (slow, protected), EP (the variable — actively tuned, the one knob you own), agent (disposable, recycled). The EP normalises admitted agents toward a common basin — convergence, not behavioral replication. It doubles as the admission gate: any model that fails the EP eval is rejected. (Cross-ref muppet-filter; substrate/sleeve/skin.)

**5. Everything but the agent.** The completion: move the EP into the repo (system.md), acquired via orient, not injected via a side channel. The repo then holds state, checksum, playbooks, canon, and the normaliser; the agent holds nothing but its decaying weights. Skills, by contrast, are unprovenanced priors injected outside the gate — the architectural reason they were rejected, of which "no telemetry" was merely the first symptom.

**6. The trajectory and its audit.** Normalised stateless agents produce smooth state changes; deviations leave evidence in the repo (recorded transitions). The audit is two-layered, mirroring the competence boundary: formal (check + next-agent-on-detritus) catches structural derailment; semantic (briefs as the human's rationale-record) catches misaligned decisions. The "next agent sees detritus" fallback covers the formal row only; semantic detritus is always the human's. A trajectory discontinuity is healthy iff it carries a recorded rationale (a brief); derailment iff unexplained.

**7. The personalisation failure mode.** The field's vocabulary — "agent," "pal," "does stuff" — smuggles in a theory of mind the substrate doesn't warrant. What's actually there is a Shannon/Kolmogorov thinking machine: a pattern-matcher with a compression loop, running on a substrate with known failure modes (attention dilution, context rot, drift), kept reliable only by an operating envelope of short, focused sessions. Refuse the phenomenological freight — the same move as thermostat-not-CNS, applied to the agent. The 10-year horizon is the clincher: the substrate is replaced wholesale on a 2–5 year cycle, so "your LLM pal" in a decade is a different machine, not a development of the current one. Personalisation invests relational capital in a depreciating asset with a known half-life; disposability is the rational response.

**8. The visitor: externalised impartial spectator.** A distinct role from the developer-agent. The visitor does not orient-and-develop; it inspects and audits — figures out what's going on by inspection, leaves an assessment, produces no transitions. It is the reviewer in a document lifecycle: human authors the frame (EP, briefs), developer-agent writes the transitions, visitor reviews, repo is the artefact. The visitor is the EP's own Impartial Spectator principle externalised — instead of asking one agent to *simulate* impartiality (weak; same process, same blind spots), you deploy a separate instance whose entire posture is to be unimplicated. It only exists when the agent is depersonalised: a personalised "pal" cannot audit its own work. Depersonalisation is the precondition for auditability.

## Why this post (and why now)

The prior briefs each developed a component. None assembled the system. Readers who encountered the amnesia thesis, the cargo-not-crew analogy, the muppet filter, or the thermostat framing in isolation could not see that they are one architecture. The synthesis is the contribution: the components cohere because they share a single boundary (Shannon's), and that coherence is what makes the system adoptable rather than idiosyncratic. The post is timely because vendor direction (persistent agent memory, personalised context) is moving opposite to the architecture; stating the alternative clearly is worth doing while the divergence is still a choice rather than a default.

## Considerations for the reader (the things we considered)

The post should make these explicit, because the reader's benefit is in considering them — adoption of our conventions is secondary:

- **Admissible evidence.** Treat the repo as the only admissible evidence for an agent's conclusions; treat agent-carried priors (memory, skills, training) as inadmissible — not non-existent, but not grounds for a claim.
- **Provenance of priors.** Any prior the agent uses should enter through an explicit gate (orient), not through injection machinery. Skills that auto-inject bypass the gate; playbooks/canon acquired via orient pass it.
- **Depreciating vs non-depreciating assets.** The agent's semantic judgment depreciates; the repo does not. Weight them accordingly.
- **The Shannon boundary.** Decide deliberately where syntax ends and semantics begins in your own setup. Don't ask the agent to certify meaning it cannot access.
- **Two-layer audit.** Build a formal detector (checksums, invariants) and a semantic detector (human rationale-record). Don't expect one to cover the other.
- **Recyclability over reliability.** Prefer a population of interchangeable-in-protocol agents over dependence on a single agent's memory or skills. Freshness diversification beats single-agent fidelity.
- **The variable you own.** Identify the one knob you control (for us, the EP) and put your tuning there; treat vendor-controlled layers (model weights, memory features) as disposable.
- **Depersonalise the agent.** Refuse the vocabulary that imports personhood ("pal," "secret agent"); treat the substrate as a thinking machine with known failure modes, kept reliable by short focused sessions. Personalisation forecloses the visitor role and invests in a depreciating substrate.
- **Separate the roles.** Distinguish developer (writes transitions) from visitor (inspects and audits). An unimplicated viewpoint is the only thing that catches drift the developer and the human, both implicated, structurally cannot.
- **Mind the substrate half-life.** The agent is replaced wholesale on a 2–5 year cycle; do not invest identity or relational capital in a specific instance. The repo is the non-depreciating asset; the agent is disposable by design.

## The honest limits (must appear in the post)

- **The normaliser is approximate by construction.** Applying the EP is a semantic act performed through decaying priors; convergence to a basin, not behavioral identity. Two EP-normalised agents apply *their respective interpretations* of the same principles.
- **Shared normaliser, shared blind spots.** The EP that smooths the trajectory can also propagate a shared misalignment undetected. Variance reduction suppresses both noise and the dissent that would have surfaced error.
- **The eval is prospective; the repo is retrospective.** The EP eval is an admission gate (recognition + short-horizon traps); it does not certify sustained in-basin behaviour over a long trajectory. That is observable only in the git history.
- **The unchecksummable apex.** Everything is checksummed except the EP itself — the one artefact whose quality matters most. The eval cannot self-audit it (circular reference); a lower-bar EP is easier to pass, registering as false improvement.
- **Confirmatory resonance.** "The model recognises the value of the EP" is weak evidence of application and strong evidence of mirroring. The feeling of fit is not evidence of accuracy — the analysis-playbook's own rule, applied to our own satisfaction.
- **Formal, not semantic, entropy.** The check regulates structural entropy (registry sync, invariants); it cannot regulate semantic entropy (did the README get clearer). A green check is permission to proceed, not a certificate of meaning. (Acknowledged in repo-as-thermostat; this post inherits the limit.)
- **The visitor shares the basin.** An EP-normalised visitor catches formal drift (unimplicated, inspection-oriented) but not semantic drift within the EP basin (it shares the frame). A visitor from outside the EP frame is the only cross-frame semantic auditor — but at the cost of noise (false positives on legitimate EP-aligned choices). The eval doubles as a visitor-selection tool: in-basin for clean formal audit, out-of-basin for semantic audit at the cost of noise.

## Tone

Edinburgh Protocol throughout: world-weary but intellectually curious; precise, articulate, dryly witty; no manic enthusiasm; skepticism as a feature. The post is expository, not polemical — it argues for a frame, and is honest about where the frame thins. No point probabilities; this is qualitative structural reasoning.

Shannon-Packet format on publication: TL;DR under 200 words, Links section, no throat-clearing.

## Posture (sculpting directive)

Frame the architecture as **derived from constraints, not engineered toward requirements.** The hard constraints are the tools' limits: the agent is a decaying-prior Shannon/Kolmogorov machine; semantics is excluded by Shannon; Kolmogorov complexity is uncomputable; the agent and human are both implicated in the work. The architecture is the minimal feasible solution within those constraints — not a preference. The EP is the decision variable (tuned within the feasible region); minimality is the objective; every rejection (memory, skills-as-injection, agent-doing-semantics) is a constraint violation, not a taste. LP is load-bearing, not decorative: state what is given, compute what is feasible.

Consequence for the honest-limits section: the limits are the polytope's boundary, not confessions of unmet requirements. State them as specification of where the feasible region ends — they are the proof of the derivation, and the strongest part of the post. Do not let editing soften them into caveats.

This is the EP applied to itself: Anti-Dogma ("does it work?") is the LP posture at the design level. The architecture is derived the way the EP says to derive everything.

## Audience / platform

General technical reader (HN, Substack, Medium). Assumes no prior reading of the sibling briefs; cross-links are enrichment, not prerequisites. The architecture should be legible to someone who has never used pi, just-silo, or the EP — the considerations are the transferable part; the conventions are the illustrative instance.

## Research checklist

- [ ] Shannon (1948) — locate the exact "semantic aspects are irrelevant" passage for direct quotation.
- [ ] Kolmogorov (1965) — confirm the uncomputability framing; consider Li & Vitányi for a citable modern treatment.
- [ ] Verify the EP eval's current trap vectors and scoring (cool-pi-extensions) — cite the live system, not a stale description.
- [ ] Confirm the canon/playbook lifecycle (just-silo/canon/index.md) is current at publication.
- [ ] Verify `just orient` / `just check` / `just canon-check` recipes still exist as described (they do at time of writing).
- [ ] Check whether the EP-as-system.md move has been implemented by publication; if so, cite the file; if not, frame as proposed.
- [ ] Cross-check the "increasingly pleased with recognition" claim against the eval log before stating it — avoid asserting a vibe.
- [ ] Decide whether to name the skills contrast by product (pi) or abstractly (auto-injecting capability packages); the architecture is general, the example is specific.

## References (more than the minimum)

### Foundational (external)
- Shannon, C.E. (1948). "A Mathematical Theory of Communication." Bell System Technical Journal 27. — the syntactic/semantic separation; the load-bearing citation.
- Kolmogorov, A.N. (1965). "Three Approaches to the Quantitative Definition of Information." Problems of Information Transmission 1(1). — complexity and its uncomputability; the second formal boundary.
- Li, M. & Vitányi, P. *An Introduction to Kolmogorov Complexity and Its Applications.* — modern citable treatment of uncomputability.
- Hume, D. *An Enquiry Concerning Human Understanding.* — Hume's Razor; the philosophical root of "admissible evidence."
- Smith, A. *The Theory of Moral Sentiments.* — the Impartial Spectator; systems over villains. The visitor role is this principle externalised as a separate agent instance.
- Agent Skills specification — https://agentskills.io/specification — for the skills contrast (auto-injection, progressive disclosure).
- Open Knowledge Format (OKF) spec — https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md — for the canon/playbook format.

### Prior marble (our own briefs / posts)
- `briefs/2026-05-23-case-against-agent-memory.md` — the amnesia thesis; seed of the stateless agent.
- `briefs/2026-05-26-brief-cargo-not-crew.md` — agent-as-overhead, repo-as-payload analogy.
- `briefs/2026-06-13-brief-muppet-filter-kimi-eval.md` — the EP eval; substrate/sleeve/skin; the admission gate.
- `briefs/2026-07-07-brief-repo-as-thermostat.md` — repo as homeostatic loop; structural vs semantic entropy (sibling).
- `briefs/2026-07-05-brief-entropy-is-inevitable.md` — entropy as the homeostatic variable.
- `briefs/2026-07-07-brief-claude-shannon-post-style.md` — Shannon-Packet house format.
- `briefs/2026-07-07-brief-entropy-circuit-proposal.md` — entropy circuit (candidate sibling).
- `cool-pi-extensions/prompts/edinburgh-protocol.md` — the EP itself.
- `just-silo/canon/analysis-playbook.md` — confirmatory resonance failure mode; the qualitative likelihood ladder.
- `just-silo/canon/index.md` — the canon/playbook lifecycle and curation discipline.

## Deliverables

- `_posts/<date>-everything-but-the-agent.md` — the post, Shannon-Packet format.
- `briefs/2026-07-07-brief-everything-but-the-agent.md` — this brief.
- `debriefs/<date>-debrief-everything-but-the-agent.md` — capture whether the synthesis landed and whether the honest limits survived publication.

## Sibling

- `briefs/2026-07-07-brief-repo-as-thermostat.md` — the thermostat framing is the repo-half of this architecture; this post is the full system view that includes the agent and the EP. Cross-link both directions.

## Proposed titles

**Chosen: "Everything But the Agent — Why Your Codebase Should Outlive Your LLM"**

- Title: "Everything But the Agent"
- Tagline: "Why Your Codebase Should Outlive Your LLM"
- Rationale: title supplies the intrigue (a completion phrase that resolves on reading); tagline supplies the wound (contradicts the assumption that the LLM is the durable asset). "Outlive" does the clicking — evocative without manic, EP-register bleak-evocative (cf. sibling "Why Your AI Needs Amnesia"). Economic teeth: the tagline inverts the default that the expensive asset is the durable one — the LLM (billions, depreciating) vs the repo (tens, appreciating); the wound is that the reader has been investing in the thing that decays.
- Alternatives considered: "The Agent Is Disposable. The Repo Is Not." (punchier, colder); "Stop Getting Attached to Your LLM" (max provocation, risks preachy); "The Shannon Repo Model" (accurate, but a body term, not a hook).
- Avoid in the hook: "Shannon" / "Kolmogorov" — body material, lethal on the cover.

## Links (for the post's Links section)

- Shannon (1948): https://en.wikipedia.org/wiki/A_Mathematical_Theory_of_Communication (or locate primary)
- Kolmogorov complexity: https://en.wikipedia.org/wiki/Kolmogorov_complexity
- Agent Skills spec: https://agentskills.io/specification
- OKF spec: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
- Sibling post: `2026-07-07-repo-as-thermostat.md` (if published)
- Prior: `2026-05-23-case-against-agent-memory.md` (if published)
