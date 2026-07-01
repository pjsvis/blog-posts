# Deployment Plan — July 2026

**Generated:** 2026-07-01
**Status:** Active
**Parent:** `briefs/2026-07-01-action-plan.md`

---

## Letter Requirements (Reference)

### The Times (UK)

- **Email:** `letters@thetimes.co.uk`
- **Exclusive:** Yes — letter must not have been published elsewhere
- **May be edited:** Yes
- **Must include:** Full name, home address, daytime telephone number
- **Word limit:** ~150–250 words (no hard published limit found; shorter is safer)
- **Tips:** Timely (respond to a recent article), wit and style help, reference article title and date

### The Daily Telegraph (UK)

- **Email:** `dtletters@telegraph.co.uk`
- **Exclusive:** Yes
- **May be edited:** Yes
- **Must include:** Full name, address, work and home telephone numbers
- **Word limit:** ~150–250 words recommended; under 300 is safe
- **Tips:** Respond to a recent article or editorial; address a specific point; concise

---

## Deployment Jump-Off Point

The following assets are at or near deployment-ready state. Minimal work required before publishing.

### Tier 1 — Immediate (front matter only)

#### nuclear-repurposing.md

- **File:** `_drafts/2026-07-03-nuclear-repurposing.md`
- **Status:** Publication-ready essay. Title present, content complete and sharp.
- **Action:** Add Jekyll front matter, move to `_posts/`
- **Proposed front matter:**
  ```yaml
  ---
  layout: post
  title: "How MAD Became SAD: Refactoring the Royal Navy's Silent White Elephant"
  date: 2026-07-04
  categories: uk-defence nuclear strategy geopolitics
  permalink: /2026/07/04/how-mad-became-sad/
  ---
  ```
- **Notes:** Closes with the Amalric Paradox framing and SSGN refactor. Strong. No further editorial work needed.

#### the-palimpsest-problem.md

- **File:** `_drafts/2026-06-26-the-palimpsest-problem.md`
- **Status:** Title present, three-phase mitigation protocol clean, closing strong.
- **Action:** Add front matter, light final pass, move to `_posts/`
- **Proposed front matter:**
  ```yaml
  ---
  layout: post
  title: "The Palimpsest Problem: Why AI Coding Agents Can't See Negative Space"
  date: 2026-07-05
  categories: ai agents engineering methodology
  permalink: /2026/07/05/the-palimpsest-problem/
  ---
  ```

#### tardigrades.md

- **File:** `_drafts/2026-06-23-tardigrades.md`
- **Status:** Content complete. Title present as section header. Needs front matter.
- **Action:** Add front matter, move to `_posts/`
- **Proposed front matter:**
  ```yaml
  ---
  layout: post
  title: "How Tardigrades Survive Space and What Engineers Can Learn From Them"
  date: 2026-07-06
  categories: biology engineering space
  permalink: /2026/07/06/tardigrades/
  ---
  ```

---

### Tier 2 — Letters (minimal trim, add name/location)

Three rounds of letter drafts exist. Each has Telegraph and Times variants. The best candidates:

#### Telegraph — nuclear-telegraph-02.md (lean, pragmatic)

- **File:** `_drafts/2026-07-03-nuclear-telegraph-02.md`
- **Draft 1** is the cleanest Telegraph variant — leads with the two questions, proposes the engineering fix
- **Word count:** ~140 words — comfortably within Telegraph limits
- **Action:** Fill in `[Your Name/City]`, send to `dtletters@telegraph.co.uk`
- **Backups:** telegraph-01.md Draft 1 (identity framing), telegraph-03.md Draft 1 (Montfort framing)
- **Note:** telegraph-01 and telegraph-03 add depth but telegraph-02 is the leanest and most publishable

#### Times — nuclear-telegraph-01.md (policy logic)

- **File:** `_drafts/2026-07-03-nuclear-telegraph-01.md`
- **Draft 2** is the sharper Times variant — Whitehall paradox framing
- **Word count:** ~150 words — within Times limits
- **Action:** Fill in `[Your Name/City]`, send to `letters@thetimes.co.uk`
- **Backup:** telegraph-02.md Draft 2 (asset refactoring framing)
- **Note:** telegraph-02's Times variant is more pragmatic; telegraph-01's is more paradoxical

---

### Tier 3 — Near-Ready (editorial pass required)

#### older-dolphins.md

- **File:** `_drafts/2026-06-22-older-dolphins.md`
- **Status:** Good short-form content. C15:0 / Greek yogurt arbitrage is a tight, self-contained argument.
- **Action:** Repurpose as LinkedIn short-form post or newsletter hook. Do not move to `_posts/`.
- **Note:** Not a standalone essay — fits "street-food snack" category

#### vlogs.md

- **File:** `_drafts/2026-06-22-vlogs.md`
- **Status:** Comment + blog reply stitched together. Too much scaffolding.
- **Action:** Strip to core argument (weaponised compliance, Švejkism, Stiob). Either publish as a short piece or archive.
- **Note:** The core insight is good; the wrapper needs removal

---

## Deployment Sequence

```
Now         → nuclear-repurposing.md  (add front matter, move to _posts/)
Now         → the-palimpsest-problem.md (add front matter, move to _posts/)
Now         → tardigrades.md (add front matter, move to _posts/)
Now         → Telegraph letter (telegraph-02, Draft 1) → dtletters@telegraph.co.uk
Now         → Times letter (telegraph-01, Draft 2) → letters@thetimes.co.uk
Pending     → older-dolphins.md → LinkedIn short-form
Pending     → vlogs.md → strip and publish as short piece OR archive
Pending     → Data-centers + algorithmic-historicism → pair, edit, publish
Pending     → UK defence consolidation → merge, publish
Pending     → ADR: nuclear SSGN refactor
Pending     → ADR: silo manifesto / decisions-playbook consolidation
Pending     → Muppet Filter posts → human writes from canon docs
```

---

## Post-Publishing Checklist (per asset)

- [ ] Front matter complete (title, date, categories, permalink)
- [ ] Moved from `_drafts/` to `_posts/`
- [ ] Cross-links resolved
- [ ] Git commit
- [ ] Deploy (GitHub Pages)
- [ ] Medium: paste essay + headline + image → `medium.com/new-story`
- [ ] Substack: paste essay + intro note + CTA → `substack.com/dashboard`
- [ ] LinkedIn: launch copy posted
- [ ] URLs saved to notes
- [ ] `_exported/` reviewed
- [ ] Action plan updated (mark item done)

---

## Related

- Action plan: `briefs/2026-07-01-action-plan.md`
- Medium/Substack playbook: `playbooks/medium-substack-playbook.md`
- Blog research playbook: `playbooks/blog-research.md`
- Decisions playbook: `playbooks/decisions-playbook.md`
