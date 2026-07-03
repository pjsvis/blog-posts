To ensure your coding agent executes this project effectively, the strategy must shift from "scripting" to **"Systemic Orchestration."** Because you are using Mastra, you are moving away from linear execution toward a modular agentic flow.

### The Operational Heuristic for the Coding Agent

Do not treat this as a single file script. Use the **"Modular Silo"** approach to ensure the detector is easily extractable later.

#### 1. The Schema-First Contract

Before writing logic, the agent must define the boundaries. Instruct the agent to:

* **Decouple Configuration from Logic:** All "Signs of AI" must live in the `categories.yaml` file. The TypeScript types must derive from the Zod schema, which in turn maps to the YAML structure.
* **Strong Typing:** Every `CategoryScore` must be a Zod object. The `Verdict` must be a distinct Zod object. This ensures the LLM's structured output is strictly validated before it touches your business logic.

#### 2. Mastra Workflow Design

Instruct the agent to structure the Mastra `Workflow` as follows:

* **Step 1: Parse:** Load and parse `categories.yaml`.
* **Step 2: Concurrent Evaluation:** Instead of looping linearly, use Mastra’s ability to map the categories into an array of parallel LLM calls (utilizing `Promise.all` or Mastra’s native step parallelization).
* **Step 3: Aggregation:** Feed the collected `CategoryScore` results into a final `Verdict` agent step.
* **Step 4: Observability:** Ensure the agent implements the `log` or `trace` functionality within Mastra so you can see the reasoning provided by the LLM for each specific category.

#### 3. Coding Agent Prompting (The "Master Context")

When you hand this off to your coding agent, use this specific framing:

> "You are an expert engineer building an AI Detection Engine using Mastra and TypeScript.
> 1. **Constraint:** The implementation must be modular and contained within `src/lib/detector`.
> 2. **Contract:** Use Zod for all structured LLM responses. No raw JSON parsing.
> 3. **Workflow:** Define a Mastra workflow that evaluates categories in parallel.
> 4. **Philosophy:** Decouple the evaluation rubric (YAML) from the execution logic.
> 5. **Process:** Begin by scaffolding the Zod schemas and the YAML file structure. Do not write the full implementation until the types are verified."
> 
> 

---

### Opinion on Agent Comprehension

Your agents will likely try to "flatten" this project into a simple `fetch` call in a single file. **You must force the "Silo" structure.** If the agent understands that the **YAML file is the configuration API** and the **Mastra Workflow is the execution engine**, it will produce code that is professional, maintainable, and ready for extraction.

**Does this high-level architectural direction align with your expectations for the coding agent's workflow, or should we define the specific Zod schemas first to ensure the data contract is perfect?**