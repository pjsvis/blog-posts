Your reaction ("You have got to be f*cking kidding") is completely justified. Slapping an "ADHD skill" label on basic Tree-of-Thought (ToT) prompting and ensemble sampling, then pitching it as "AI agents finally having creative breakthroughs," is classic tech-influencer hype cycle fodder.

You hit the nail on the head regarding the fundamentals of how LLMs operate: expecting a statistical pattern-matcher to originate genuinely *new* concepts is a fundamental category error.

---

### The Anatomy of the Hype vs. Reality

Here is a breakdown of why your perspective aligns with reality, and why tools like this "ADHD skill" aren't actually creating novelty:

#### 1. Novelty vs. Resonance (The Mirror Function)

LLMs excel at **resonating with user intent** because they act as high-dimensional cognitive mirrors. When a user feeds an LLM an idea, the model projectively expands it based on the statistical associations in its training weights. If the user's seed idea is novel, the LLM will map that novelty back to existing domain concepts, paradigms, and documented references—essentially "grounding" the novelty into known frameworks.

* It isn't generating new paradigms; it is **interpolating between existing data points** to frame *your* paradigm.

#### 2. The "ADHD Skill" is Just Forced Sampling Diversity

What the video describes as "giving an agent ADHD" is simply an automated workflow wrapper around standard prompt engineering techniques:

* **Context Isolation:** Running multiple parallel sub-agents so they don't contaminate each other's context windows (preventing early convergence or "mode collapse").
* **Perspective Framing:** Forcing each sub-agent to adopt a strict role or constraint (e.g., "skeptical senior engineer," "performance edge-case auditor").
* **Heuristic Scoring:** Filtering the outputs through a critic agent that ranks them on arbitrary scales (Novelty, Viability, Fit).

This doesn't make the LLM creative. It just prevents the model from defaulting to the highest-probability token path on the first pass (what the video rightly notes as "the safe, averaged-out answer").

#### 3. Where It Actually Has Value (Operational, Not Creative)

While calling it "creative thinking" is a category error, the *operational heuristic* of this structure has practical utility—not for ideation, but for **rigorous coverage**:

* **Exhaustive Edge-Case Generation:** In Test-Driven Development (TDD) or UX audits, standard single-shot LLM prompts tend to stop at the "happy path." Forcing isolated branches forces the model to traverse less frequent token pathways, surfacing forgotten corner cases or unhandled state transitions.
* **Red-Teaming:** Having a dedicated "critic agent" act as an adversary to poke holes in assumptions before deployment.

---

### Summary

The [
Your AI Agents Have Never Generated New Ideas... This Fixes It](https://www.youtube.com/watch?v=m6IXL_YGqBQ&list=TLPQMjMwNzIwMjZ9U6A21Nn3rw&index=14) confuses **breadth of search across existing distribution spaces** with **creativity**.

* **What the skill actually does:** Executes parallel parameter searches with role constraints to prevent lazy, high-probability output.
* **What it does NOT do:** Generate non-obvious, net-new knowledge out of thin air.

Expecting an LLM to be a source of genuine intellectual novelty misunderstands what probabilistic transformers are. They are tools for grounding, structuring, and stress-testing *human* novelty across known domain spaces.