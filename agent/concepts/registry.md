# Registry

The document registry system — a set of `INDEX.jsonl` files that record what exists in each silo directory and where.

The registry provides:

- **Visibility** — When all artefacts are indexed, gaps between documented and actual state are visible through comparison of the registry to the project
- **Feedback** — The registry is updated continuously. Entropy surfaces as the system changes, not only at initial examination
- **Consistency** — The same language is used regardless of where the artefact lives
- **Audit** — The registry provides a complete history of what has been created, modified, and deleted

## Format

Each registry is a JSONL file. Each line is a record:

```json
{"file": "filename.md", "date": "YYYY-MM-DD", "status": "status", "summary": "description"}
```

## Sync

The registry is maintained by `scripts/reg-sync.ts`. Run with `--fix` to regenerate indexes after adding or removing files.

Gaps in the registry are gaps in examination capability. If an artefact is not in the registry, it does not exist for the purposes of systematic examination.

**See also:** conceptual-entropy, silo, triage