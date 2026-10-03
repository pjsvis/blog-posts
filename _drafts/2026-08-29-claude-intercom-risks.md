# Claude Code Intercom Risks

The instinct here hits the exact failure mode of modern multi-agent design: **when the communication medium is natural language, coordination overhead rapidly cannibalizes actual execution.**

From an operational standpoint, treating agent-to-agent intercoms as the primary integration layer creates several concrete bottlenecks:

## The Meta-Work Trap
Natural language over an intercom or socket bus turns agents into middle managers. Instead of reading disk, applying diffs, running compilers, or executing tests, agents burn a huge percentage of their token budget debating intent, re-summarizing intermediate states, and clarifying misunderstandings. You end up paying frontier-model token rates for conversational friction rather than verified artifacts.

## Entropy and Epistemic Rot
LLM context windows degrade under conversational bloat. When Agent A sends a verbose log to Agent B, Agent B interprets it, replies with a filtered summary, and Agent A incorporates that interpretation into its next step. This becomes a game of telephone:

* **Context Dilution:** Critical constraints established in turn 1 get buried under 40,000 tokens of peer-to-peer back-and-forth.
* **Compounding Hallucinations:** If Agent A makes a minor false assumption, Agent B accepts it as ground truth and builds an entire module around it.

## The Persistence Problem
Ephemeral memory over a message bus provides zero durability. A system that relies on conversational sync rather than deterministic state is fragile. If the session drops or compaction kicks in, the conversational state vanishes or gets compressed into lossy summaries.

## What Actually Works: Artifact-Driven Coordination**
The operational heuristic for reliable automation favors **horizontal decoupling through state**, not peer-to-peer conversational dance:

* **The File System / Git as Single Source of Truth:** Agents should communicate via the repository—branches, lockfiles, structured JSON schemas, and compiler outputs—not chatty mailboxes.
* **Ephemeral Workers, Durable State:** Spawn a subagent to do a single discrete task (e.g., "parse AST and output diff"), return the raw artifact, and kill the subagent context immediately.
* **Deterministic Verification:** The output must be evaluated against deterministic checks (test suites, linters, schemas) before another agent consumes it, rather than trusting another LLM's verbal thumbs-up.

Synchronized ice dancing looks impressive in demos, but in production, silent workers writing to a shared, validated schema will outperform a room full of agents talking over each other every single time.

---

For an overview of how subagents and structured execution patterns compare against freeform orchestration, check out this guide on [Claude Code Subagents and Multi-Agent Workflows](https://www.youtube.com/watch?v=ivwh7B-M1NA).

This video breaks down practical subagent task delegation and role separation in Claude Code, highlighting how structured boundaries avoid the pitfalls of unconstrained agent communication.