The only way to get simpler than your current system is to remove the file-type distinctions entirely and collapse everything into a single append-only log or a single directory.

However, "simpler" doesn't always mean "better." Here are the few minimalist setups that sit lower on the complexity curve, along with the trade-offs you'd make by switching to them:

### 1. The Monolithic Log (`changelog.md` or `journal.md`)

* **How it works:** Everything—briefs, debriefs, decisions, and playbooks—is written chronologically into a single, rolling Markdown file separated by headers (`## 2026-08-12 [slug]`).
* **Why it’s simpler:** Zero file management. You never move files to `.archive/`, deal with folder structures, or worry about naming consistency. Ctrl+F in a single document gives instant, absolute context.
* **Where it breaks:** Agent context windows get bloated quickly. You lose file-level granularity, making it harder to feed *only* a specific playbook or brief to an AI coding agent without passing the entire project history.

### 2. Flat Flat-File (No Folders, Pure Prefixes)

* **How it works:** Drop the `briefs/` and `.archive/briefs/` directories entirely. Keep every document in a single root context folder using strict prefixes:
* `2026-08-12-brief-[slug].md`
* `2026-08-12-decision-[slug].md`
* `2026-08-12-playbook-[slug].md`


* **Why it’s simpler:** Eliminates directory traversal and archive management. Active vs. archived state is handled by a flag in the file header or simple file sorting rather than moving files across folders.
* **Where it breaks:** Visual noise. Once you hit a few hundred files, scanning the directory manually becomes painful for humans, even if search tools handle it effortlessly.

### 3. Frontmatter Key-Value Search (Flat Files + Meta)

* **How it works:** File names are completely arbitrary or simple slugs (`[slug].md`), and relationships are tracked strictly via Markdown YAML frontmatter:
```yaml
---
type: decision
parent: 2026-08-12-brief-auth-rewrite
---

```


* **Why it’s simpler:** Filenames can be shorter and cleaner.
* **Where it breaks:** It’s actually *more* complex to search using basic CLI tools (`grep` requires multi-line or Regex awareness to parse YAML blocks effectively compared to a simple inline string/filename search).

### The Verdict

Your current system hits the absolute **sweet spot of operational simplicity**. Collapsing folders into a single file saves file system overhead but destroys agent modularity. Shifting metadata out of the filename makes `grep` harder.

You’ve essentially found the lower bound for a system that remains modular, human-readable, and agent-friendly. Anything simpler compromises function; anything more complex adds unnecessary machinery.