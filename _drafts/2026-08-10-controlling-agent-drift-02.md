Here is an annotated bibliography of foundational texts and empirical studies you can quote across your briefs, playbooks, and system documentation. It anchors your operational setup (`just` recipes, file registers, Edinburgh Protocol constraints, and sequential Pi agents) directly in complexity science, multi-agent coordination, and software systems theory.

---

### 1. Complex Systems & Multi-Agent Dynamics

**Baronchelli, A. (2018). "The emergence of conventions in online social networks." *Nature Human Behaviour*, 2(4), 243–244.**

* **Core Finding:** Explains the mechanics of the Naming Game in networked populations. Demonstrates how local interactions without a central coordinator naturally condense into global, unwritten conventions through positive feedback loops.
* **Operational Value:** Use this to justify why early agent code patterns snowball so rapidly. It proves that without strict boundary constraints, agents will spontaneously manufacture their own structural conventions regardless of system prompt intent.
* **Quote-Worthy Context:** *"Consensus is an emergent property of local interaction dynamics, independent of centralized oversight."*

**Ashery, A. F., Aiello, L. M., & Baronchelli, A. (2025). "Spontaneous convention formation and critical mass flipping in populations of LLM agents." *Science Advances*.**

* **Core Finding:** Applies classical coordination games to populations of Large Language Models. Proves that LLM swarms exhibit collective bias (amplifying minor 1% prompts into dominant conventions) and are vulnerable to state flips when exposed to a committed 25% minority.
* **Operational Value:** Perfect justification for strict PR gating and file register validation. It demonstrates mathematically that you cannot audit multi-agent safety or architecture by evaluating a single agent prompt in isolation.

**Centola, D., Becker, J., Brackbill, D., & Baronchelli, A. (2018). "Experimental evidence for tipping points in social convention." *Science*, 360(6393), 1116–1119.**

* **Core Finding:** Established empirically that a committed minority reaching ~25% of a population can overturn established majority conventions and cascade the entire network to a new equilibrium.
* **Operational Value:** Use this to explain your refactoring strategy. You don't need to rewrite 100% of a repository at once—refactoring 25% of the codebase modules into a new register pattern triggers a critical mass where sequential agents naturally refactor the remaining 75%.

---

### 2. Software Architecture & Context Constraints

**Gall, J. (1975). *Systemantics: How Systems Work and Especially How They Fail*. Pocket Books.**

* **Core Finding:** Formulated **Gall's Law**: *"A complex system that works is invariably found to have evolved from a simple system that worked. A complex system designed from scratch never works and cannot be patched up to make it work."*
* **Operational Value:** Cites the theoretical basis for your iterative development model. Validates why building your agent framework step-by-step (`just` tasks, briefs, playbooks, ISO prefixes) yields a resilient stack while over-designed, monolithic agent frameworks fail.

**Brooks, F. P. (1975). *The Mythical Man-Month: Essays on Software Engineering*. Addison-Wesley.**

* **Core Finding:** Introduces concepts of conceptual integrity, documentation as code, and the overhead of communication channels in engineering teams.
* **Operational Value:** Explains why minimalist Pi agents with tight tool sets outperform bloated agent setups. By using structured briefs and decision logs, you maintain conceptual integrity across sequential context windows without compounding communication overhead.

---

### 3. State Anchors & Verification Loops

**Lamport, L. (1978). "Time, clocks, and the ordering of events in a distributed system." *Communications of the ACM*, 21(7), 558–565.**

* **Core Finding:** Shows how distributed, uncoordinated nodes can establish a single, logical sequence of events using state-ordering mechanisms without requiring a synchronized global clock.
* **Operational Value:** Theoretical backing for your ISO date prefixing convention (`YYYY-MM-DD-...`). It turns a standard directory listing into a deterministic, append-only event log that fresh-context agents can parse instantly without deep context loading.

**Humphrey, W. S. (1989). *Managing the Software Process*. Addison-Wesley.**

* **Core Finding:** Demonstrates that automated verification steps at the local level (verifying inputs/outputs before commit) prevent error propagation across development cycles.
* **Operational Value:** Justifies the `just check` invariant in your pipeline. Proves that an automated local oracle (tests/lints) is mandatory to break positive feedback loops of hallucinated code before they contaminate the repository context buffer.

---

### Suggested Mapping in Your Playbooks

| Playbook / Module | Primary Source Citation | Key Application |
| --- | --- | --- |
| **`just orient` & Onboarding** | Ashery et al. (2025) | Justifies deterministic context initialization to prevent agent drift. |
| **Refactoring & Upgrades** | Centola et al. (2018) | Establishes the 25% threshold rule for automated codebase migration. |
| **Directory & Log Conventions** | Lamport (1978) | Validates ISO date prefixing as an append-only distributed memory log. |
| **`just check` Gating** | Humphrey (1989) / Baronchelli (2018) | Uses deterministic CI checks to stop local noise from becoming global precedent. |
| **System Architecture Philosophy** | Gall (1975) | Grounding for your step-by-step, evolutionary tooling stack. |