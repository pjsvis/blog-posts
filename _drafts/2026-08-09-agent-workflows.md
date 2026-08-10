Here is an operational guide distilled directly from the anti-patterns in the article. It transforms the author’s soft-management traps into hard, system-level design principles.

---

## The Operational Guide to Non-Decaying Agent Workflows

### 1. Treat Context as RAM, Not Mindset

* **The Anti-Pattern:** Stuffed, ever-growing system prompts designed to shape the agent’s "culture" or "intent" over long execution spans.
* **The Rule:** **Keep context windows short-lived, task-bound, and stateless.**
* **Execution:**
* Spin up fresh agent instances for discrete sub-tasks rather than running a single, persistent "Chief Engineer" context.
* Inject only the exact schema, tool interfaces, and state data needed for that specific run.
* When a task finishes, pass the structured artifact down the pipeline and destroy the runtime context.



### 2. Wrap Non-Deterministic Nodes in Deterministic Enclosures

* **The Anti-Pattern:** Expecting an LLM to reliably enforce its own operational rules (e.g., "always report blockers to me") purely through prompt instructions.
* **The Rule:** **Enforce policy at the runtime layer, never at the prompt layer.**
* **Execution:**
* Put hard assertions around agent execution. If an agent fails to output a valid structured state within $N$ iterations or $T$ minutes, trigger a system-level timeout event.
* Use deterministic tools (linters, static analyzers, test runners) to validate agent output *before* allowing the state machine to advance.
* Never ask an agent to "remember to tell you" when it is stuck—build a heart-beat monitor that alerts you when state transitions stop occurring.



### 3. Replace "Coaching" with Automated Justification Loops

* **The Anti-Pattern:** Manually intervening with prompt-tweaking or conversational "nudges" when an agent drifts or makes bad decisions.
* **The Rule:** **Use explicit evaluation and verification engines to reject invalid drift automatically.**
* **Execution:**
* Route agent output through a dedicated evaluation/verification node (a Justify Engine or programmatic evaluator) that checks proposed code/decisions against hard acceptance criteria.
* If the evaluation fails, feed the precise, structured failure trace back to the execution agent.
* If remediation fails after a fixed retry budget, automatically escalate to the human supervisor via a defined alert bus.



### 4. Require Telemetry Over Trust

* **The Anti-Pattern:** Discovering system degradation "mid-delivery, under pressure" because the agent stopped communicating.
* **The Rule:** **Silent degradation is a telemetry failure, not an agent failure.**
* **Execution:**
* Emit structured logs and metrics for every state transition, tool execution, and retry attempt.
* Monitor top-level operational health indicators: mean time to task completion, error/retry rates, and context size creep.
* Treat an uncommunicative or spinning agent as a system crash, cutting execution via circuit breakers rather than waiting for human discovery.



---

### Comparison: Management vs. Engineering Paradigm

| Dimension | The "Agent Coach" Approach (Article) | The Operational Systems Approach |
| --- | --- | --- |
| **State Persistence** | Monolithic, growing context window | Short-lived, stateless execution nodes |
| **Rule Enforcement** | Prompting ("Always state your intent") | Hard schema assertion & state gates |
| **Failure Detection** | Probing manually when work stalls | Automated health metrics & heartbeat timeouts |
| **Drift Correction** | Re-prompting & system "coaching" | Deterministic evaluation engines & retry budgets |
| **Operator Attention** | Spent on continuous supervision | Spent on initial system invariants & alert handling |