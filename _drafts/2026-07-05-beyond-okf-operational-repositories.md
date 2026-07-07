---
title: "Beyond OKF: What Makes a Repository Operational for AI Agents"
date: 2026-07-05
layout: post
tags: [okf, open-knowledge-format, entropy, palimpsest-problem, hierarchy-of-truth, tree-sitter, agentic, tidy-first, justify-engine]
status: draft
type: draft
brief_ref: 2026-07-05-brief-okf-vs-operational-repositories
---

# Beyond OKF: What Makes a Repository Operational for AI Agents

*This is a draft. Expect excess.*

---

## The Map Problem

Every AI agent eventually hits the same wall. It has access to a well-documented repository. It has the architecture diagrams, the runbooks, the decision logs, the brief for the current sprint. It has everything it needs to be useful.

And then it does the wrong thing.

Not obviously wrong — subtly wrong. It implements the feature on the wrong database. It assumes SQLite when the project migrated to Postgres six weeks ago. It references an API endpoint that was deprecated in the last refactor. It builds on a foundation that no longer exists.

This is not a failure of intelligence. It's a failure of context verification. The agent has a map. The territory has changed. And the agent has no way of knowing.

Google's Open Knowledge Format (OKF) is an attempt to solve part of this problem. OKF standardizes how organizational knowledge is represented: markdown files, YAML frontmatter, standard directory structures, standard links. It's clean. It's interoperable. It's human-readable. Arvind Kumar's write-up on Medium is worth reading — he correctly identifies that the industry has been building these knowledge bundles organically (in the form of `AGENTS.md`, `CLAUDE.md`, `README.md`, `runbooks/`, `playbooks/`) without standardizing them.

OKF is right about the format. This post is about what comes after the format.

---

## Act I: Why OKF Is Worth Taking Seriously

The standard failure mode of enterprise knowledge management is complexity. Companies build knowledge graphs, metadata catalogs, integration layers, and search indexes. They hire people to maintain these systems. The systems become the product. The actual knowledge — the runbooks, the architecture decisions, the metric definitions — gets buried under the weight of the infrastructure meant to surface it.

OKF rejects this. Its core insight is that markdown files and YAML frontmatter are sufficient. No database. No proprietary runtime. No SDK. No special storage engine. If you can clone a Git repository, you can consume OKF. If you can read a markdown file, you can understand OKF.

This is the right instinct. The industry spent five years building elaborate RAG pipelines that ingested PDFs, Confluence exports, and Slack threads into vector databases, then watched as the agents built on top of those pipelines produced confident nonsense because the underlying knowledge was stale, contradictory, or simply wrong. The complexity of the knowledge management infrastructure was inversely correlated with the quality of the knowledge output.

OKF's answer is: simplify. Use the file system. Use standard formats. Let Git do what it was designed to do — track changes, handle merges, provide history. Don't build a second knowledge management system on top of a version control system that already does what you need.

The format itself is well-designed. The required field is `type:` — everything else is optional. Google was careful to be minimally opinionated. An organization can model its knowledge however it wants; OKF just provides a standard surface that tools can read.

```yaml
---
type: Kafka Topic
title: Order Created Event
description: Published when a new order is successfully created.
resource: kafka://order-created
tags:
  - kafka
  - orders
  - events
timestamp: 2026-06-22T10:00:00Z
---
```

This is clean. It's parseable. It's human-legible. An agent can read it without special infrastructure.

And here's the thing: many teams are already doing this. The `AGENTS.md` file that Andrej Karpathy popularized is a crude version of OKF. The `playbooks/` directory in a well-maintained repository is OKF before the spec existed. The `decisions/` folder with its `ADR-001-switch-to-postgres.md` files is OKF-adjacent.

OKF's contribution is standardization. It gives a name to a pattern that was already emerging organically. That matters.

**But.**

OKF is a map. It tells you what's in the library. It does not tell you whether the library is on fire.

---

## Act II: The Palimpsest Problem

A map is only useful if it's accurate. The problem with knowledge repositories — any knowledge repository, including OKF-compliant ones — is that they accumulate over time, and time is corrosive.

Consider a project that started in early 2025. The initial architecture decision was SQLite. A `decisions/001-sqlite-first.md` file was written. A `playbooks/local-dev-setup.md` was created. Everything worked.

Then, four months in, the team hit SQLite's concurrency limits under production load. A decision was made: migrate to Postgres. A new file, `decisions/007-migrate-to-postgres.md`, was written. The old decision file was not deleted — it was left in place, a historical record of the old architecture.

Now consider what happens when a new agent enters the repository six months later. It reads the decision files. It finds two database-related decisions. It doesn't know which one is current unless it reads the dates carefully, unless it notices the implicit supersession, unless it understands that decision #7 effectively invalidates decision #1 even though no one wrote "decision #1 is superseded."

This is the Palimpsest Problem.

In its original meaning, a palimpsest is a manuscript where earlier writing has been scraped off and new text written over it, but traces of the old text remain visible underneath. The reader must work to separate the layers.

In an AI agent context, the Palimpsest Problem describes a failure mode where an agent reading multiple documents to establish context produces different conclusions depending on read order. The documents are layered. The agent has assimilated the context. Typically the last statement wins — unless the agent reads the documents in a different order, in which case it acts on different logic.

The Palimpsest Problem is not hypothetical. It is the documented behavior of any LLM fed a large context window. Recency bias means the most recently read document has the highest weight in the model's working memory. Attention drift means that earlier documents become background context, not foreground constraints. Two agents reading the same repository in different orders produce different plans. This is non-deterministic by default.

**The concrete failure mode:**

You have a repository with:
- `decisions/001-sqlite-first.md` — active, no status field
- `decisions/007-migrate-to-postgres.md` — active, no status field
- `playbooks/local-dev-setup.md` — says "use SQLite for local development"
- `playbooks/deployment.md` — references `db.ts`, which imports `sqlite3`
- `db.ts` — imports `sqlite3`
- No `package.json` reference to `pg` or `postgres`

An agent enters. It reads the decision files. Depending on read order, it concludes either "this is a SQLite project" or "this is a Postgres project." It reads the playbooks. It finds conflicting guidance. It reads the code. It finds SQLite imports. It has a tie-breaker — the code is more recent than the decisions (git log says so) — so it assumes the code is authoritative.

The agent is now implementing a Postgres migration strategy on a codebase that has no Postgres dependency, because of read order, because the decisions don't have status fields, because the old decision file wasn't archived, because the Palimpsest Problem is structural and not addressed by any of the files.

This is the map. This is the territory. The gap between them is the Palimpsest Problem.

**Why OKF doesn't solve this:**

OKF standardizes the format of knowledge documents. It does not standardize their state, their relationships, or their ordering. It assumes that if the files are present, the knowledge is good. It has no concept of a document being deprecated, superseded, in conflict with another document, or inconsistent with the codebase.

OKF is a library catalog. A good library catalog tells you what books exist and where to find them. It does not tell you which books have been superseded by later editions, which contain errors that were corrected in subsequent printings, or which sections of which books contradict other sections of other books in the same collection.

You need more than a catalog. You need a librarian.

---

## Act III: The Hierarchy of Truth

The Palimpsest Problem is solvable. The solution is to impose a deterministic ordering on document types — to establish that some documents outrank others, and that when they conflict, the higher-ranked document wins by default.

Call this the Hierarchy of Truth.

The principle: context cannot be loaded randomly. When an agent assembles its working memory from a repository, it must weight the documents according to a strict, pre-defined hierarchy. The hierarchy is not a preference. It is a rule.

| Rank | Document Type | Weight | Rule |
|------|--------------|--------|------|
| 1 | Decisions | Law | Outranks everything. Supersedes older decisions automatically. |
| 2 | Playbooks | Mechanics | Must comply with Decisions. Outrank Briefs. |
| 3 | Briefs | Temporal | Rank nothing outside their task ID. Active briefs are work items, not constraints. |
| 4 | Debriefs | Historical | Context only. Inform Decisions but don't constrain them. |

The rule: **if a lower-ranked document contradicts a higher-ranked document, the higher-ranked document wins, regardless of read order.**

This is not about which document is more recent. A brief written last week does not outrank a decision made two years ago. A playbook updated yesterday does not override a decision that is still active. The hierarchy is structural, not temporal.

**Why this works:**

The Hierarchy of Truth eliminates the non-determinism of the Palimpsest Problem. An agent reading a repository doesn't have to guess which document is authoritative — the hierarchy tells it. Decision #7 outranks Decision #1. Playbook conflicts with Decision? The Decision wins. Brief conflicts with Playbook? The Playbook wins.

This requires conventions that OKF doesn't prescribe:

```yaml
# In every decision file:
type: decision
status: active  # or: resolved, superseded, archived
decision_id: 007
supersedes: 001
date: 2025-08-14
```

```yaml
# In every playbook file:
type: playbook
status: active
governed_by:  # list of decision IDs this playbook implements
  - 007
  - 012
```

The `governed_by` field is the horizontal linkage. It tells the agent: "this playbook is an implementation of these specific decisions." If the agent encounters a contradiction between a playbook and a decision, it can trace the relationship explicitly. The playbook must comply with Decision #007. If it doesn't, the playbook is wrong, not the decision.

**Sizing contradictions:**

Not all contradictions are equal. The Hierarchy of Truth must have a sizing mechanism — a way to distinguish between contradictions that can be auto-resolved and contradictions that require human intervention.

**Micro-tears** are small, auto-resolvable contradictions. Example: a brief says "use port 8080" but the current `playbooks/dev-environment.md` was updated last week to use port 9000. The agent checks timestamps. The playbook is newer. The brief is stale. The agent silently updates the brief to port 9000, logs the micro-tidy in a debrief, and moves on. The entropy cost is low; the resolution is mechanical.

**Macro-tears** are large, structural contradictions that require human judgment. Example: a Decision explicitly states "all persistent state uses SQLite." A newly added Playbook contains detailed instructions for configuring a Postgres connection pool. This is not a timestamp issue — this is a fundamental conflict between two active documents. The entropy vector spikes to maximum. The agent halts. It does not attempt to resolve this itself. It flags the contradiction explicitly:

> "Decision #004 states: all persistent state uses SQLite. Playbook `database/connection-pool.md` instructs: configure Postgres connection pool. These documents are in direct conflict. Neither is archived. The agent cannot proceed until this contradiction is resolved."

The agent has a hard stop. It will not write code, draft a brief, or take any action until a human resolves the macro-tear.

This is the critical property: **the agent refuses to build on an inconsistent foundation.** This is not optional. It is the rule that makes the Hierarchy of Truth enforceable.

**The topological sort:**

Because the Hierarchy of Truth is explicit — because every document has a `type`, a `status`, and (for playbooks) a `governed_by` field — the agent doesn't read files in alphabetical order or in whatever order they appear in a context window. It reads them topologically.

The agent's read order:
1. All `active` Decisions — these are the law
2. All Playbooks governed by those Decisions — these are the mechanics
3. Active Briefs that are not blocked — these are the work items
4. Debriefs relevant to the current task — historical context

By forcing a mathematically linear read order — law, then mechanics, then work items, then history — the "last statement wins" lottery is eliminated. The agent's conclusions are deterministic. Same repository, same documents, any agent produces the same plan.

This is what makes a repository operational. It is not just a knowledge bundle. It is a verified, ordered, conflict-checked context that an agent can safely act on.

---

## Act IV: The Entropy Vector

The Hierarchy of Truth resolves contradictions between documents. But a repository can be internally consistent — no document contradicts another — and still be in bad shape.

A repository can be:

- Full of outdated files that haven't been touched in six months
- Missing index files that are supposed to track the folder contents
- Full of committed work that was never followed up on
- Running a task queue with items that were resolved in code but never closed in the database

These are not document contradictions. They are state problems. They represent entropy — the slow accumulation of disorder that happens in any living system.

The Entropy Vector is a measurement of this disorder. It is not a binary clean/dirty flag. It is a multi-dimensional measurement that tells the agent how much work the workspace needs before it can safely do useful work.

**The four signals:**

The entropy vector is derived from four independent measurements:

**1. Structural integrity.** Does the folder index match the filesystem? Every organized repository has an implicit or explicit index — a file that lists what is in each folder. If that index is out of sync with what is actually on disk, the repository has drifted. The agent doesn't know what's there. This is high entropy.

The concrete implementation: a script that compares the JSONL index against the actual filesystem and reports missing files, stale entries, and auto-regenerates the index. This is the Shannon checksum in practice — not a hash function, but a structural diff.

```typescript
// scripts/reg-sync.ts — the Shannon checksum in practice
function checkRegistry(name: string, def: RegistryDef, fix: boolean): boolean {
  const indexEntries = loadIndex(def.indexPath);
  const indexedFiles = new Set(indexEntries.map((e) => e.file));
  const diskFiles = new Set(listFiles(def));

  const missing = [...diskFiles].filter((f) => !indexedFiles.has(f));
  const stale = [...indexedFiles].filter((f) => !diskFiles.has(f));

  if (missing.length === 0 && stale.length === 0) {
    console.log("  ✓ up to date");
    return true;
  }

  if (fix) {
    const merged = [...indexEntries, ...missing].filter((e) => diskFiles.has(e.file));
    writeFileSync(def.indexPath, merged.map((e) => JSON.stringify(e)).join("\n"));
  }

  return false;
}
```

The key property: this is a deterministic, verifiable check. If the diff is non-empty, entropy is high. No guessing, no probability — just a file list compared against a file list.

**2. Task queue state.** The `td` SQLite database tracks all outstanding work. If the queue is full and stale — tasks marked active that were created three months ago, brief references with no corresponding td entry, td entries with no corresponding brief — the queue is adding entropy. A cluttered task queue means the agent doesn't know what's actually outstanding.

**3. Knowledge decay.** When was each document last verified? Playbooks that haven't been touched in 90 days are suspect. Decisions that were made two years ago and have never been reviewed are ghosts. Every document has a `last_verified:` field. If it's empty or old, the document adds to entropy automatically.

```yaml
# In every document:
last_verified: 2026-06-15  # YYYY-MM-DD of last human review
```

The rule: a playbook with `last_verified` older than 90 days adds 1 point to the entropy vector. A decision with `last_verified` older than a year adds 2 points. An unverified playbook is not trustworthy; it might be describing a system that no longer exists.

Knowledge decay is not a hypothetical failure mode. A 2026 essay on AI and authenticity used the "most expensive hyphen in history" as its opening anchor — Mariner 1, 1962, an $80 million spacecraft destroyed because of a single wrong character in its guidance code. The story is vivid, structurally perfect (consequence → character → catastrophe → lesson), and wrong on every technical detail. The actual cause was a missing superscript bar over a guidance variable in the Fortran source — a transcription error from handwritten formulas to code, not a hyphen. A hyphen in a navigation variable doesn't produce the physics that destroyed the spacecraft; a missing bar does. The author's knowledge base had absorbed the myth, not the reality, and it passed through without friction because there was no `last_verified` gate forcing a check against primary sources. This is what unverified knowledge looks like in the wild: not obviously wrong, just wrong in exactly the way that feels right. The Shannon checksum fires before the verification is complete.

**4. Entropy cost weighting.** Each outstanding brief or uncommitted decision has an entropy cost. The brief author estimates this when creating the document:

```yaml
entropy_cost: 3  # 1=low drag, 5=high drag
```

A complex architectural brief that touches multiple systems has high entropy cost. A simple one-page brief has low entropy cost. The agent sums the entropy costs during its initial scan. If the sum crosses a threshold (say, 10), the entropy vector demands tidy-first before any new work is attempted.

**The decision table:**

The entropy vector feeds the Justify Engine — the rule that before any agent action, the agent must justify that action against the current state of the repository.

| Signal | State | Entropy | Justified Next Action |
|--------|-------|---------|----------------------|
| Structural integrity | Index ≠ filesystem | High | Tidy-first: reconcile index |
| Task queue | >5 stale items | High | Tidy-first: close resolved tasks |
| Knowledge decay | >3 unverified docs | High | Tidy-first: review or archive |
| Entropy sum | Sum > 10 | High | Tidy-first: before any new work |
| All signals | Clean | Low | Proceed with next brief |

**The Justify Engine rule:**

Before the agent writes a line of code, drafts a brief, or takes any action, it must answer: "Is the entropy vector low enough that my action is justified?"

If the answer is no, the agent's output is tidy-first. It produces a report of the entropy signals, a list of the specific tidy actions required, and the delta to a clean state. It does not produce the thing the human asked for until entropy is reduced.

This is the operational difference between a knowledge bundle and an operational repository. A knowledge bundle says "here's what we know." An operational repository says "here's what we know, here's the state of the workspace, and here is the one thing that is justified to do next."

---

## Act V: Code vs. Intent — The Reality Checksum

The Hierarchy of Truth and the Entropy Vector operate on documentation. But documentation states intent. Code states reality. The Palimpsest Problem applies to this relationship too.

Consider the half-done Postgres migration again. The Decision #007 says:

> "Effective immediately, all new persistent state uses Postgres. SQLite is deprecated and will be removed in a future release. Migration to be completed by Q4 2025."

This is intent. The decision is active. The Hierarchy of Truth says this is law.

Now the code. Running `just orient` reveals:
- `package.json` has `pg` as a dependency
- `db.ts` imports `pg` and initializes a Postgres client
- `migrations/` contains Postgres migration files
- But: `services/cache.ts` still uses `sqlite3` for the session store
- And: `playbooks/local-dev.md` still says "use SQLite for local dev"

This is not a document contradiction — the documents are consistent. It's a code-documentation gap. The intent (migrate to Postgres) has been partially implemented. The implementation is incomplete. The agent has no way of knowing this unless it reads the actual code.

**Tree-sitter as the reality checksum:**

A deterministic AST parser doesn't read code as text. It parses the syntax tree. It extracts the manifest of active imports, dependencies, and database drivers. It produces a code-index that the agent can cross-reference against the decision documents.

The mechanism: a script hooked into `just orient` runs a fast tree-sitter sweep over the repository. It extracts:
- All database driver imports (sqlite3, pg, mysql, mongodb, etc.)
- All external service dependencies (S3, Redis, external APIs)
- All environment variable references
- All configuration file references

It saves this as a lightweight `code-index.json` or dumps it into the td SQLite database. When the agent runs `just orient`, it reads this index alongside the document map.

**Collision detection:**

The agent checks Decision #007 ("all persistent state uses Postgres") against the tree-sitter index. It finds:
- `pg` import in `db.ts` ✓ matches
- `sqlite3` import in `services/cache.ts` ✗ does not match

The agent calculates: "Decision #007 is active. Tree-sitter index shows 1 Postgres driver import and 1 SQLite driver import. The migration is 50% complete. This is a partial implementation."

The entropy vector increases. The Justify Engine says: "The foundation is inconsistent. Proceeding with new work on this codebase risks building on a half-migrated state."

The agent produces a tidy-first task: "Complete SQLite to Postgres migration for `services/cache.ts` before any new feature work."

**The hierarchy for code collisions:**

When code and documentation diverge, the resolution depends on the hierarchy:

| Collision Type | Example | Resolution |
|---------------|---------|------------|
| Code vs. active Decision | Code uses SQLite, Decision says Postgres | Code is rogue. Flag offending nodes. Generate tidy-first. |
| Code vs. active Playbook | Code has wrong port, Playbook says 9000 | Playbook is authoritative unless newer code proves otherwise. Investigate. |
| Code vs. Brief | Code implements wrong version of feature | Brief is wrong. Update brief. Log micro-tidy. |

The key rule: **the agent refuses to build on an inconsistent foundation.** If the code state doesn't match the documented state, the agent does not write new code until the inconsistency is resolved. This is not optional.

**The implementation:**

Tree-sitter has bindings for Python, Rust, Go, JavaScript, and most languages you'd find in a modern codebase. A 50-line Python script can traverse a repository in under a second and produce the index:

```python
import tree_sitter_languages
from tree_sitter import Language, Parser

def build_code_index(repo_path):
    index = {
        "database_drivers": [],
        "external_services": [],
        "env_vars": [],
    }
    for file in Path(repo_path).rglob("*.py"):
        tree = parser.parse(file.read_bytes())
        # extract imports via AST walk
        for node in tree.root_node.children:
            if node.type == "import_statement":
                index["database_drivers"].extend(
                    get_imports(node, ["sqlite3", "pg", "psycopg2", "mysql"])
                )
    return index
```

This is not expensive. A tree-sitter sweep of a 10,000-file repository takes under 30 seconds. For a typical project repository of a few hundred files, it's under 2 seconds. The index is a JSON file that can be committed, diffed, and checked into version control.

When the agent runs `just orient`, it reads:
- The document map (decisions, playbooks, briefs)
- The entropy vector (structural integrity, task queue, knowledge decay)
- The code index (database drivers, service dependencies)

It then applies the Hierarchy of Truth. It checks code against documents. It calculates entropy. It produces a plan.

If the plan is "tidy-first," the agent produces a tidy-first report. If the plan is "proceed," the agent produces the next brief.

This is the operational minimum. Three checks. Under five seconds. The agent knows where it is. It knows if the territory matches the map. It knows what to do before it does anything.

---

## Act VI: The Operational Minimum

Pull it together. What does an operational repository actually require?

**For documentation:**

Every document has a `type:` field in its YAML frontmatter. This is the minimum OKF compliance. It tells the agent what kind of document it's reading.

```yaml
---
type: decision
status: active
decision_id: 007
supersedes: 001
date: 2025-08-14
last_verified: 2026-06-15
entropy_cost: 2
governed_by:  # playbooks only
---
```

Every document has a `status:` field. Every decision and playbook has a `last_verified:` field. Briefs have an `entropy_cost:` estimate.

The folder index is auto-verified against the filesystem on every `just orient`. If the index doesn't match the files, the entropy vector spikes.

**For tasks:**

The td SQLite database tracks all outstanding work. Every active brief has a corresponding td task. Every completed td task has a corresponding debrief.

The agent checks for discrepancies between frontmatter status and td state. If a brief is marked `status: active` but the td database shows the task as `resolved`, the agent enters the Investigation Heuristic:
1. Detect: collision between frontmatter and td
2. Trace: walk the dependency graph to find the divergence
3. Interrogate: flag the tear explicitly, do not auto-overwrite

**For code:**

A tree-sitter sweep runs as part of `just orient`. The code-index is cross-referenced against active decisions. If intent (documented state) diverges from reality (code state), the entropy vector spikes and the agent halts.

**For the agent:**

The sequence on entry:
1. Run `just orient` — branch, status, recent commits, task queue
2. Read the entropy vector — structural integrity, task queue state, knowledge decay
3. Apply the Hierarchy of Truth — read decisions first, then playbooks, then briefs
4. Run tree-sitter sweep — code-index vs. documented state
5. Calculate: is entropy low enough to proceed?

If yes: grab the next brief, work on it.
If no: produce a tidy-first report, do not produce the thing the human asked for.

This is not a lot of infrastructure. It's three checks that run in under five seconds. The agent knows where it is. It knows if the territory matches the map. It knows what to do before it does anything.

---

## The Reference Implementation

The concepts in this post are not purely theoretical. There is a working partial implementation at [github.com/pjsvis/blueprint](https://github.com/pjsvis/blueprint) — a public repository demonstrating the operational repository model in practice.

**What exists:**

| Component | File | Status | What it does |
|-----------|------|--------|-------------|
| `just orient` | `justfile` | Partial | Branch, git status, recent commits, td current |
| Folder index as checksum | `scripts/reg-sync.ts` | **Working** | Compares INDEX.jsonl against filesystem, detects drift, auto-regenerates |
| JSONL schema validation | `scripts/reg-check.ts` | Working | Validates required fields in registries |
| Import boundary guard | `scripts/check-boundaries.ts` | Working | Prevents illegal cross-layer imports |
| `just check` gate | `justfile` | Working | Chains biome, tsc, boundary, reg-check, reg-sync |
| Hierarchy of Truth playbook | `playbooks/hierarchy-of-truth-playbook.md` | Added | Document ranking, Palimpsest Problem fix, Investigation Heuristic |
| Entropy Vector playbook | `playbooks/entropy-vector-playbook.md` | Added | Four-signal measurement, Justify Engine |
| Code State Verification playbook | `playbooks/code-state-verification-playbook.md` | Added | Tree-sitter AST index, reality checksum |

**What's missing (the remaining work):**

1. **OKF frontmatter** on all existing documents — every markdown file needs `type:`, `status:`, `date:`, `last_verified:`
2. **Entropy check script** (`scripts/entropy-check.ts`) — aggregates the four signals, exits non-zero if tidy-first is required
3. **Code index script** (`scripts/code-index.ts`) — tree-sitter sweep to verify code state against decisions
4. **`just entropy`** recipe — runs the entropy check and produces a tidy-first report
5. **`just code-verify`** recipe — cross-references code-index against active decisions
6. **Entropy threshold gate** in `just check` — blocks the gate if entropy is too high

The `reg-sync.ts` script is the anchor. It demonstrates the Shannon checksum concept in 100 lines of TypeScript. The remaining work is the entropy vector calculation, the code state verification, and the `just orient` upgrade. An agent entering the blueprint is handed a brief listing the six concrete tasks. When those tasks are complete, the repository will be fully operational — `just orient` runs the full integrity check, the Hierarchy of Truth is enforced, and the agent refuses to build on an inconsistent foundation.

The pattern is clear. The tools are available. The reference implementation is public. The only remaining work is execution.

---

## What OKF Got Right

OKF's contribution is real. The industry needed a standard format for the markdown-and-metadata pattern that was already emerging organically. Standardizing the `type:` field, the YAML frontmatter structure, and the directory conventions — this matters. It means tools can be built that read OKF repositories without custom integrations.

The next step is to make those repositories operational. The fields OKF doesn't require (`status:`, `last_verified:`, `entropy_cost:`, `depends_on:`) are what turn a knowledge bundle into a verifiable, action-guiding workspace. The integrity checks that verify the index matches the filesystem, the tree-sitter sweeps that verify code matches decisions, the Hierarchy of Truth that makes read order deterministic — these are what the agent actually needs.

OKF tells the agent what's in the library. An operational repository tells the agent what's worth doing — and verifies that the shelves aren't on fire.

---

## Appendix: The Hierarchy of Truth (Full Reference)

| Rank | Type | Required Fields | Rule |
|------|------|----------------|------|
| 1 | Decision | `type: decision`, `status`, `decision_id`, `last_verified` | Outranks everything. Active decisions are law. Supersedes older decisions automatically. |
| 2 | Playbook | `type: playbook`, `status`, `governed_by: [...]` | Must comply with Decisions. Outranks Briefs. |
| 3 | Brief | `type: brief`, `status`, `entropy_cost` | Temporal. Rank nothing outside their task ID. Active briefs are work items, not constraints. |
| 4 | Debrief | `type: debrief`, `task_ref`, `date` | Historical context only. Inform Decisions but don't constrain them. |

## Appendix: Entropy Vector Signals (Full Reference)

| Signal | Measurement | Threshold | Response |
|--------|-------------|-----------|---------|
| Structural integrity | Index vs. filesystem diff | Any non-empty diff | Tidy-first: reconcile |
| Task queue | Stale td items | >5 items older than 30 days | Tidy-first: close or escalate |
| Knowledge decay | `last_verified` age | Playbooks >90d, Decisions >365d | Tidy-first: review or archive |
| Entropy sum | Sum of `entropy_cost` values | Sum > 10 | Tidy-first: reduce before new work |

---

*Draft. Expect excess. Sculpture welcome.*
