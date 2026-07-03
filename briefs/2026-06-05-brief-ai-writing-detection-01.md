# Brief: AI-Signs Detection Engine

**Date:** 2026-06-05
**Status:** Open

Ref: https://medium.com/ai-advances/detect-ai-generated-text-signs-ai-writing-2773c022b6eb

---

## Objective

To develop a deterministic, Mastra-based agentic "judge" that evaluates text against a community-curated rubric of AI writing indicators, providing a probabilistic assessment of AI-generation while establishing a reusable pattern for structured LLM evaluation.

## Post Details

**Proposed Title:** Engineering Deterministic AI Detection: A Mastra-based Approach
**Target Platform(s):** Medium, Coding Nexus
**Categories:** AI, TypeScript, Mastra, Engineering

## Content Outline

1. **Hook** — The inherent flaw in "AI Detectors": They are often black-box, opaque, and prone to false positives.


2. **Body** —
* **The Rubric:** Introducing the Wikipedia "WikiProject AI Cleanup" as an evolving, human-assisted source of truth.


* **Agentic Architecture:** Implementing the judge using Mastra, Zod, and YAML-based rubric definitions to ensure auditability and schema-strictness.
* **The Pipeline:** Detailing the workflow: parallel rubric evaluation, reasoning aggregation, and probability calculation.


3. **Resolution** — Why "Human-Assisted Methods" (LLM-as-a-Judge) outperform black-box classifiers by being auditable, tunable, and transparent.


4. **CTA** — Encourage readers to check the GitHub repository to adopt or extend the rubric for their own classification needs.

## Research Needed

* [ ] Verify Mastra v0.x workflow implementation patterns for parallel step execution.
* [ ] Source links/references verified (including the Wikipedia "Signs of AI writing" and the referenced Medium article).


* [ ] Test code examples for `YAML` parsing and `Zod` schema validation in a Bun environment.

## Export Checklist

* [ ] Front-matter complete (title, date, categories, canonical_target)
* [ ] Run `bun run scripts/export-all.ts`
* [ ] Review `_exported/` output
* [ ] Commit to `main` → GitHub Pages deploys

## Notes

* The project will be housed in `blog-posts` under `src/lib/detector` as a "Silo" module to facilitate future extraction.
* A foundational ADR should be written in `decisions/` justifying the choice of Mastra over native LLM SDKs to standardize agentic orchestration across the codebase.

---

## Done

* [ ] Objective is specific and actionable
* [ ] Content outline has clear structure (hook, body, resolution, CTA)
* [ ] No ambiguous language ("should", "maybe", "consider")
* [ ] Research checklist is realistic
* [ ] Export checklist is complete
* [ ] Significant framing decisions have corresponding ADRs in `decisions/`