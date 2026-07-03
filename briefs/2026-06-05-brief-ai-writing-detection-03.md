To prevent architectural drift and ensure the coding agent remains aligned with your "Silo" philosophy, we will anchor the project in these three rigid elements. These define the "Contract of Truth" for the engine.

### 1. The Configuration Schema (`categories.yaml`)

This is the **Immutable Rubric**. By externalizing the signs of AI into a strictly structured YAML file, we ensure that the detector's intelligence is defined by the community's observations (Wikipedia's `WikiProject AI Cleanup`) rather than hard-coded logic.

* **Structure**: Each entry must contain `name`, `description`, and `examples`.
* **Drift Prevention**: Any new "sign" of AI discovered by the community can be added here without modifying the core TypeScript logic.

### 2. The Data Contract (Zod Schemas)

This acts as the **Type Guardian**. By defining these in Zod, we create a TypeScript interface that the Mastra agent *must* satisfy.

* **`CategoryScoreSchema`**: Defines the score (integer, 1-5 range) and the `reasoning` (string).
* **`VerdictSchema`**: Defines the final `ai_probability` (0-100 range) and the executive `reasoning`.
* **Drift Prevention**: If the LLM output deviates from this structure (e.g., provides a string instead of a score), the Zod validator will throw an error before the data hits your downstream systems.

### 3. The Orchestration Pattern (Mastra Workflow)

This is the **Execution Engine**. We will use Mastra to enforce an asynchronous, parallel execution model.

* **Parallelization**: Instead of a sequential `for` loop, the agent will implement a `Mastra.Workflow` step that map-reduces the rubric categories.
* **Reasoning-as-Trace**: Every evaluation step must output its `reasoning` field to the workflow state, allowing you to debug *why* a specific score was assigned.
* **Drift Prevention**: The logic is explicitly isolated. The Mastra workflow manages *how* the data is processed, while the YAML file manages *what* is being looked for.

---

### Summary of Component Isolation

| Component | Responsibility | Technology |
| --- | --- | --- |
| **Rubric** | Definition of AI "Signs" | `YAML` |
| **Contract** | Validation & Schema | `Zod` |
| **Orchestration** | Parallel Execution & Reasoning | `Mastra` |
| **Runtime** | Execution Environment | `Bun` |

By establishing these anchors, the coding agent cannot accidentally "flatten" the logic into a monolithic function because the schemas and workflow structure dictate a modular, step-based architecture.

**Does this grounding satisfy the requirements for your Master Context, or would you like to explicitly define the `categories.yaml` schema before we hand this off to the agent?**