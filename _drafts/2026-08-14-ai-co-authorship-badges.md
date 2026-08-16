# Brief: 90s-Style State Signifiers & Co-Authorship Badges

**Date:** 2026-08-14
**Status:** Open

---

## Objective

Design and publish a suite of open-source 88×31 web badges and state-signifier GIFs that formalize Edinburgh Protocol co-authorship using Shannon redundancy, Popperian falsifiability, and structural gatekeeping.

## Post Details

**Proposed Title:** The Sovereign Colophon: Why We Need 88×31 Badges for the Latent Space Era
**Target Platform(s):** all
**Categories:** ai-governance, edinburgh-protocol, epistemology, web-culture, tooling

## Content Outline

1. **Hook** — The EU AI Act wants sterile watermarks; the 1990s web gave us `<blink>` and animated shovels. Why early web state transparency was superior to modern compliance theater.
2. **Body**
   * **The Shannon Package as Colophon:** Why an over-described payload (TL;DR + Core + Narrativized Bibliography) defeats channel noise in generative outputs.
   * **The AO3 Precedent:** when classification infrastructure fails a community, it gets rebuilt bottom-up — classification without judgment, two layers (machine-navigable tags + human curation). The badge is the AO3 move; the EU watermark is the FanLib move.
   * **The Epistemic Gatekeepers:** Visualizing the *Derrida Question* (input triage) and the *Foxtrot-Oscar Option* (invariant preservation refusal) as explicit runtime states.
   * **The Popper Party:** Badging falsifiability experiments and synthetic assertions instead of chasing probabilistic "truth" scores.
   * **The Asset Gallery:** Release of the 88×31 SVG/GIF matrix (specifications, assets, and usage).
3. **Resolution** — Co-authorship isn't an apology or an EU checkbox; it is a declared pipeline of epistemic checks and orchestrated machinery.
4. **CTA** — Clone the badge repo, embed the Shannon Package in your footers, and trigger the Foxtrot-Oscar option on ungrounded prompts.

## Research Needed

- [ ] Compile exact SVG specs for the 88×31 raster grid palette
- [ ] Cross-reference Art. 50 EU AI Act provenance clauses with Edinburgh Protocol invariant guarantees
- [ ] Define the standardized metadata schema for `shannon-package` front-matter
- [ ] Delany Equinox trail: verify the Savoy account against contemporaneous reporting (not just Wikipedia/ISFDB); identify which reissue carried the +100-ages mutation; confirm the Lancer title-negotiation story in Delany's own words (Shorter Views / interviews)

## Export Checklist

- [ ] Front-matter complete (title, date, categories, canonical_target)
- [ ] Run `bun run scripts/export-all.ts`
- [ ] Review `_exported/` output
- [ ] Commit to `main` → GitHub Pages deploys

## Notes

### The AO3 precedent — user note, 2026-08-16, mid-Wikipedia

**The history.** 2007: LiveJournal's Strikethrough purged fandom journals in a
moral panic while FanLib — a male-founded commercial startup — arrived to
monetize fanfic the (largely female) community had built. The community's
response was Astolat's *An Archive of One's Own* (the title from Woolf): within
~18 months, a nonprofit archive the community **owned**. Hugo Award, 2019.
Every incumbent system had treated the community as a liability to purge or an
asset to harvest; the community exited and built parallel infrastructure.

**The Woolf grammar.** Discreetly anti-patriarchy in *form* (lectures at the
women's colleges, a 501(c)(3) — maximally compliant), institutionally
anti-patriarchal in *effect*: compliance purchased the fortress; ownership
decided who lives in it. That is the badge strategy exactly.

**The two-layer architecture — the thing worth stealing.** AO3's tag system is
**classification without judgment**: tags never say good or bad, they say
*what kind and how much* (AU, fix-it, Major Character Death, rating). Quality
is delegated to the social layer — kudos, bookmarks, recs. Two layers:
machine-navigable description + human curation the tags cannot fake.

**The executable use-case.** A reader's requirement — *a new story about my
hero X from that TV show; X must not do anything weird or get killed; and I
want to recommend it to a friend who has never read fanfic* — is a **query
spec, not a wish**, on AO3 today:

| Requirement | AO3 field |
|---|---|
| story about hero X from show Y | Fandom + Character tags |
| X must not get killed | exclude Major Character Death |
| nothing weird | rating filter + excluded additional tags |
| recommendable to a newbie | sort by bookmarks-with-rec, curated collections |

AI-assisted output needs exactly these two layers: **generation/provenance
tags** (what model, what human share, what constraints honored — the badges,
the Shannon checksum) + **curation the tags can't fake**. The EU watermark is
the FanLib move (compliance from above, sterile by design); the badge is the
AO3 move (community convention, compounding). Choose the precedent
deliberately.

**Why now.** AI text is so cheap to produce that curation is not optional —
the same pressure that produced fanfic's tag system. All works are derivative
and transformative in kind; the apparatus is a *degree* machine. Traditional
publishing launders influence into "originality"; fanfic wears the source as
its address. AI derivation (from everything at once, unnamed) is what makes
provenance tagging load-bearing at last.

### The 1980 precedent — Delany's *Equinox*, verified 2026-08-16

*The Tides of Lust* (Lancer Books, 1973; $1.50 paperback original, written
alongside *Dhalgren*; Delany's preferred title *Equinox* restored on the 1994
Masquerade/RhinocEros reissue). Published under his **own name — no
pseudonym**: the controlled case of voice-as-residue. Author constant, genre
inverted, register the only transformed variable. The voice persists.

The publication history is the paperback ancestor of this post's argument:

- **The title was the shelf.** Lancer wanted *Tides of Eros*; Delany wanted
  *Equinox*; the compromise *Tides of Lust* shelved the book by imprint and
  cover. Genre binding done entirely by paratext — the thing badges are for.
- **1980: state seizure of a distribution channel.** Savoy Books (Manchester)
  UK edition — 3,000 copies seized by James Anderton's vice squad ("God's
  Cop"), 4,000 recalled by John Menzies retailers nationwide; Savoy liquidated
  1981; publisher David Britton jailed May 1982, alongside Charles Platt's
  *The Gas*. This is Strikethrough 27 years early, with prison instead of
  account deletion.
- **The +100-ages compliance mutation.** A later reissue raised every underage
  character's age by 100 — producing "109-year-old children" in the prose
  (per the title's publication history; which edition needs verification).
  Top-down compliance applied to art yields grotesque absurdity, not safety:
  the sterile watermark's bookstore-argument in miniature. The text *complied*
  by mutating into nonsense — and the mutation is the indictment.
- Nicholls (*Encyclopedia of SF*): "serious in intent… a Baudelairean ritual
  of passage" — register collision as the mechanism, poetic and disgusting by
  equal intent.

Provenance: user note 2026-08-16 ("actually quite good and very amusing");
verified same day against Wikipedia, Savoy Books' own account, ISFDB.

- Keep the visual tone authentically 16-color/dithered without sliding into unreadable parody; these badges must function as legible UI components in production docs.
- Frame the *Foxtrot-Oscar Option* as the ultimate state signifier: the system's explicit right to reject invariant violations.

---

## Done

When all `[ ]` items are checked and exports reviewed.