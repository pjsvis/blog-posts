Here is the updated operational playbook rule, reflecting a rolling history window for active briefs and keeping decision logs permanently active unless an explicit pruning review is triggered.

---

## Operational Rule: Artifact Lifecycle & Pruned Archival

### 1. Purpose & Scope

To maintain short-term context velocity for sequential Pi agents during `just orient` while preserving immediate historical "breadcrumbs" to debug regressions, prevent context amnesia, and distill long-term system wisdom.

---

### 2. Active vs. Cold Storage Retention Rules

Rather than continuous or blanket archiving, active workspace directories operate under specific retention policies based on the file type:

| Directory | Active Retention Policy | Archival Trigger | Target Path |
| --- | --- | --- | --- |
| **`./briefs/`** | **Rolling Horizon (Last 3–5 Briefs)** | Active folder exceeds 5 files or an Epic completes. | `.archive/briefs/` |
| **`./debriefs/`** | **Rolling Horizon (Last 3 Debriefs)** | Lessons promoted to Playbook & folder exceeds 3 files. | `.archive/debriefs/` |
| **`./decision-logs/`** | **Permanently Active (Default)** | Only archived if explicit architectural decisions are rendered obsolete. | `.archive/decision-logs/` |
| **`./playbooks/`** | **Permanent (Never Archived)** | None (append-only living documents). | N/A |
| **`./registers/`** | **Permanently Active (Current State)** | Deprecated schema/checksum snapshots only. | `.archive/registers/` |

---

### 3. Decision Log Policy: Permanent Active Context

Decision logs form the structural memory of the project and should **not** be routinely archived.

* **Default State:** Decision logs remain in `./decision-logs/` permanently so sequential agents instantly understand the architectural "why" behind existing code patterns during `just orient`.
* **Exception (Pruning Outdated Decisions):** A decision log is moved to `.archive/decision-logs/` **only** when a newer decision explicitly supersedes or deprecates it. This prevents agents from attempting to satisfy conflicting historical constraints.

---

### 4. Rolling Window Archival Protocol

Archival is executed in batches at Epic boundaries or when rolling window thresholds are met—never task-by-task.

#### Step 1: Lesson Promotion (Debrief Phase)

Before sweeping any files, review the active `./debriefs/` folder:

1. Extract failure patterns, unexpected edge cases, or reusable conventions.
2. Append new operational rules to the relevant module in `./playbooks/` with an ISO timestamp (`YYYY-MM-DD`).

#### Step 2: Rolling Sweep Execution

When executing a cleanup (e.g., via `just archive`):

1. **Sort by ISO Date:** Rank active `./briefs/` and `./debriefs/` chronologically using their `YYYY-MM-DD-` filename prefixes.
2. **Retain the Rolling Window:** Keep the $N$ most recent files (e.g., last 3–5 briefs, last 3 debriefs) in the active folders.
3. **Move Stale Artifacts:** Move older files into their corresponding subdirectories under `.archive/`:
```bash
# Example: Moving briefs older than the rolling window
mv briefs/2026-07-01-legacy-task.md .archive/briefs/
mv debriefs/2026-07-01-legacy-task-debrief.md .archive/debriefs/

```



---

### 5. Consolidated `.archive/` Directory Layout

All cold storage artifacts reside strictly within the `.archive/` tree to allow simple exclusion rules during agent orientation:

```text
.
├── briefs/                 # Active briefs (current work + last 3-5 briefs)
├── debriefs/               # Active debriefs (last 3 completed runs)
├── decision-logs/          # Active architectural decision log (permanent)
├── playbooks/              # Promoted system wisdom (permanent)
├── registers/              # Baseline repo checksums & schemas
└── .archive/               # Cold storage boundary (ignored by default CLI tools)
    ├── briefs/             # Archived historical briefs
    ├── debriefs/           # Archived historical debriefs
    ├── decision-logs/      # Superseded / deprecated decisions ONLY
    └── registers/          # Deprecated register snapshots

```

---

### 6. System Invariants

1. **Breadcrumb Guarantee:** An agent encountering a failure after `just orient` must always find the last 3–5 briefs and debriefs in active directories to trace how the codebase reached its current state.
2. **Zero Pollution Boundary:** `just orient` recipes and CLI tools used by Pi agents must explicitly exclude `.archive/` to avoid burning context window tokens on cold storage.
3. **Prefix Integrity:** ISO date prefixes (`YYYY-MM-DD-`) are immutable and must be preserved across all active and archived states.