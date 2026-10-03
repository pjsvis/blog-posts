The "as-designed vs. as-built" dynamic is where human cognitive bias collides directly with artificial intelligence.

Humans are comfortable living with cognitive dissonance. In software teams, engineers maintain the "fiction" of the original architecture diagram, Jira epics, and PRDs because it keeps management happy, while quietly making hundreds of pragmatically messy deviations in the actual code to get the product over the line. Human engineers navigate this by word of mouth, implicit context, and "tribal knowledge."

An AI agent has no tribal knowledge. When you drop an AI into a brownfield codebase:

1. **It looks for a map (as-designed spec).** If it finds old docs, PRDs, or architectural notes, it takes them as literal truth.
2. **It reads the code (as-built reality).** It finds massive discrepancies between the docs and the code.
3. **It gets confused by the entropy.** Because it doesn't know *which* layer is ground truth, it starts "hallucinating." It isn't lying maliciously; it is simply trying to reconcile a broken model of reality by guessing.

### The Retrofit Protocol: The "Nutshell" Method

Your approach to retrofitting an AI agent into an existing codebase is structurally sound because it forces the agent to perform an **"As-Built Survey"** before taking a single action.

#### **Nutshell Title:** *The Discovery Brief (or As-Built Reconnaissance)*

```
[ Un-Oriented AI Agent ]
           │
           ▼
[ ISO Brief: 2026-08-10-codebase-recon-brief.md ]
           │
           ▼
[ Agent Action: Inspect Codebase (As-Built Reality) ]
           │
           ▼
[ Output: DEBRIEF / Proposals (Derived Checksum) ]

```

### How the Method Unfolds:

1. **Step 1: Drop the ISO-Dated Brief**
You create a briefs folder and drop in an explicit event: `2026-08-10-codebase-recon-brief.md`.
* **Directive:** *"Ignore all old PRDs, architectural diagrams, and stale documentation. Investigate the live repository as it exists today. Map the current dependencies, active data flows, and implicit patterns. Produce a proposal for how to establish baseline consistency."*


2. **Step 2: The Agent Generates the As-Built Baseline**
The agent scans the actual code (the physical reality) and generates a `DEBRIEF-codebase-recon.md` alongside proposed `PLAYBOOK` or `DECISION` drafts reflecting what the codebase *actually is*.
3. **Step 3: Human Verification & Falsification**
You review the agent's derived playbooks/decisions. If the agent misidentified an intentional pattern as a bug (or vice versa), you correct the derived document.
4. **Step 4: Lock the Baseline State**
The derived playbooks now become your **Shannon Checksums**. Now, and only now, do you issue the next ISO Brief to make an actual code transition.

---

### The Bottom Line

Humans survive on institutional memory and white lies about "the original plan." AI agents require explicit physical grounding.

By starting with a **Recon Brief**, you force the AI to build an accurate "As-Built" survey of the repo *first*. You eliminate the fiction, establish ground truth, and ensure that every step forward is executed from reality rather than speculation.