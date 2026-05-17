# Epic: OSAAS Advisory Series — Agentic Workflow Architecture

**Date:** 2026-05-11
**Status:** In Progress
**Posts:** 04 (AWC-2025-001, RDM-2025-002, HAP-2025-003, OFV-2025-004)

---

## Vision

Four inter-referencing advisories from the fictional "Office of Silo Architecture and Agentic Systems (OSAAS)" that use bureaucratic government-advisory format to explain real concepts: ephemeral sessions, induced vs. imposed requirements, human-agent partnership in triage, and agent orientation/asset location. The format is the hook — the content is substantive. The Edinburgh Protocol and silo discipline are assumed background.

---

## Posts

### 01 — AWC-2025-001 (Ephmeral Session Management)

**What:** Why continuous context causes output degradation over time, and why ephemeral sessions (reset per task, state stored in silo) are the correct architecture.
**Slug:** `2026-05-11-context-windows-and-session-reset`
**Platform:** substack
**Brief:** This epic

### 02 — RDM-2025-002 (Requirements Derivation Methodology)

**What:** The induced vs. imposed requirements distinction — induced requirements come from systematic examination of the system; imposed requirements are applied from outside without examination. Agentic systems remove the working memory constraint that makes induced methodology hard for humans.
**Slug:** `2026-05-12-induced-requirements` (draft: `2026-05-11-induced-requirements`)
**Platform:** substack
**Brief:** This epic

### 03 — HAP-2025-003 (Human-Agent Partnership)

**What:** The human role in the induced methodology — triage. Agents surface; humans decide. Documented pattern preferences (spec preference vs. system preference) and how to compensate for them.
**Slug:** `2026-05-11-human-agent-partnership` (draft: `2026-05-11-induced-requirements`)
**Platform:** substack
**Note:** Draft uses title referencing "Induced Methodology" but content is HAP-2025-003. Title updated to match reference number.

### 04 — OFV-2025-004 (Agentic Framework Orientation)

**What:** The asset location hierarchy (Layer 1-4), the onboarding procedure, the Edinburgh Protocol override relationship, and findings on skill system manifest gaps and documentation separation.
**Slug:** `2026-05-12-pi-silo-onboarding-assets`
**Platform:** substack
**Brief:** This epic

---

## Exit Criteria

- [ ] All 4 drafts moved to `_posts/` with correct front-matter
- [ ] `just check` passes
- [ ] Committed to `first-post` branch, pushed
- [ ] Substack dry-run confirms correct posts and content
- [ ] Substack push completes — drafts visible in Substack editor
- [ ] Epic brief marked Done
- [ ] Debrief written

---

## Notes

- Format: fictional OSAAS advisory documents — government memo aesthetic
- Cross-references between advisories are intentional and expected
- Body text strips the H1 title when publishing to Substack (handled in `publish-substack.ts`)
- Existing published post (`the-architecture-of-consistency`) remains as-is, `published: false`