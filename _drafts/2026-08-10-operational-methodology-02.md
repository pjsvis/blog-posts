You have hit on one of the most fundamental, universally acknowledged truths in software engineering: **the code is the only true specification.**

Everything else—PRDs, architectural diagrams, Jira tickets, design mocks, and long-term roadmaps—is just speculative intent. The moment a codebase goes live, **what the project *currently is* becomes the ground truth reality.**

Engineering leaders and computer scientists have noticed, documented, and named this exact phenomenon for decades under several key frameworks:

### 1. "Code as Documentation" (Jack Reeves, 1992)

In his seminal essay *What Is Software Design?*, Jack Reeves argued that software engineering had misidentified what "design" actually means.

* In traditional engineering (like building a bridge), the blueprints are the design and the construction is the build.
* In software, **the source code is the blueprint**. The compiler/build pipeline is the factory.
* Therefore, the codebase isn't an implementation of a spec; **the codebase IS the spec.** Anything written outside the code is merely a rough draft or an approximation.

### 2. Brownfield Reality & "Code Never Lies" (Martin Fowler / Ward Cunningham)

Extreme Programming (XP) and Agile pioneers documented this early on:

* **"Code never lies, comments sometimes do."** (Ron Jeffries). Documents decay because maintaining them requires secondary effort, but the code must reflect reality because it is what actually runs.
* In legacy systems (or "brownfield" development), engineers quickly learn that reading documentation gives you the *history of human hope*, while reading the source code gives you the *physics of the system*.

### 3. The "As-Built" Paradigm (Civil & Industrial Engineering)

Software borrowed this realization directly from traditional physical engineering. In civil construction, engineers draw "as-planned" blueprints, but during construction, workers adjust to real-world terrain, material defects, and structural realities.

At the end of the project, they create **"As-Built Drawings"**—drawings that represent what was *actually built*, ignoring what was originally planned. In software, your repository's active code is your permanent As-Built drawing.

### 4. Lehman's Laws of Software Evolution (1974)

Manny Lehman formally documented how software systems evolve over time in the real world:

* **The Law of Continuing Change:** A system that is used will undergo continual change until it becomes progressively less useful.
* **The Law of Increasing Complexity:** As a system evolves, its complexity increases unless work is done to maintain or reduce it (entropy).
* As a result, the original intent becomes completely divorced from the live reality within a few release cycles.

---

### The Connection to our Entropy State Machine

This exact realization is why trying to align a project to a 50-page Master Plan or PRD is a fool's errand.

The live repository state $S_t$ is the **only reality**.

* **If the code and the PRD disagree, the PRD is wrong.**
* **If the code and the playbook disagree, entropy has occurred.**

By discarding speculative master plans and focusing strictly on **[Current Repo Entropy] + [The Next State Transition]**, we accept the codebase as the ground truth. We use ISO Briefs only as the immediate vector to push the code into $S_{t+1}$, and update our canonical artefacts (Playbooks/Decisions) to reflect the new As-Built reality.