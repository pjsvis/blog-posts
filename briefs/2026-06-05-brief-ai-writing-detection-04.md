The `categories.yaml` file is the **Systemic Root**. By externalizing the logic, you transform the AI-Detector from a static script into a **General Purpose Evaluation Engine**.

### The `categories.yaml` Template

This structure is intentionally generic. While we are using it for "AI Detection," you could swap the file for a `legal-risk.yaml` or `style-guide.yaml` and the Mastra workflow would operate exactly the same way.

```yaml
# categories.yaml
# Template: This file acts as the configuration layer for the evaluation pipeline.
# To repurpose this engine for other tasks, simply replace these definitions.

categories:
  - name: overuse_of_em_dashes
    description: >
      Evaluates the frequency and stylistic usage of em dashes (—). 
      LLMs often use them in formulaic ways or to replace standard punctuation 
      like colons or commas in "punched up" text.
    examples:
      - "The project was a success — or so we thought."

  - name: superficial_analysis
    description: >
      Identifies the tendency to append present participle (-ing) phrases 
      to the end of sentences to simulate depth where none exists.
    examples:
      - "The company pivoted, thereby increasing its market share."

  - name: promotional_tone
    description: >
      Measures the lack of neutral tone, characterized by "AI vocabulary" 
      (e.g., delve, pivotal, key, landscape) and marketing-speak.
    examples:
      - "In today's fast-paced landscape, it is pivotal to delve into data."

  - name: negative_parallelisms
    description: >
      Detects rigid structural patterns like 'Not just X, but also Y'.
    examples:
      - "Not just a tool, but also a catalyst for change."

```

---

### Opinion: Why this is the correct architectural move

By defining the schema this way, you achieve three things:

1. **Orchestration Agnosticism:** Your Mastra workflow doesn't need to know *what* it is evaluating. It only needs to know how to load the file, map over the `categories` array, and feed the data to the LLM.
2. **Configuration over Code:** You have removed the "Business Logic" from the "Engine Logic." If a new study reveals that AI writing now frequently misuses a specific type of semicolon, you update the YAML. You do not touch the `agent.ts` or the `workflow.ts`.
3. **The "Pipeline" Mental Model:** This elevates your project from a simple blog-post tool to an **Evaluation Framework**. When you build your next module in this project, you will already have a proven, battle-tested pattern for "Structured Evaluation" that you can reuse immediately.

**To finalize this grounding for your coding agent:**
Are you satisfied with this YAML schema, or should we add a `weight` field to each category so the `final_verdict` step can mathematically prioritize certain signals over others?