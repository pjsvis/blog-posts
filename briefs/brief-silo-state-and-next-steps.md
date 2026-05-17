# Brief: blog-posts silo — state assessment and next steps

**Date:** 2026-05-17
**Status:** Open

---

## Objective

Assess the current silo state, fix critical gaps, and establish a clear path to first published post.

---

## What: Issues to resolve

### P0 — Must fix before first post

- [ ] **Local Jekyll preview broken** — system Ruby is 2.6.10, `github-pages` gem needs ≥ 3.0. `just preview` fails. Need either:
  - Option A: Add Ruby ≥ 3.0 to `flox.toml` (preferred — keeps toolchain in one place)
  - Option B: Document `rbenv` or `rvm` setup as prerequisite
  - Option C: Use GitHub Pages preview deploy instead of local (degrades dev loop)
- [ ] **GitHub Pages site has no blog index** — root shows raw README. Need:
  - `index.md` at root with front-matter and post listing
  - OR `posts/index.html` to show the `_posts/` collection
- [ ] **Drafts need front-matter audit** — 5 of 7 drafts in `_drafts/` are missing `title` field. Add titles before any can be published.

### P1 — Should fix before first post

- [ ] **Flox activation test** — verify `flox activate` works from a fresh terminal (outside current subshell). Confirm all tools on PATH.
- [ ] **Template post** — `YYYY-MM-DD-template-post.md` is still in `_posts/`. Remove it or replace with a real first post.
- [ ] **Export script dry run** — run `just export` against existing posts (once template is replaced) to verify output quality.
- [ ] **Delete `blog-playbook.md` from `_drafts/`** — it's a multi-post aggregate, not a single draft. Move content to proper briefs or archive.

### P2 — Nice to have

- [ ] **First real post** — decide what the inaugural post should be. 7 drafts already exist — review and promote one.
- [ ] **Homepage design** — current site shows README. Design a proper blog homepage with post list and about section.
- [ ] **Conceptual lexicon** — tradingagents has `silo-conceptual-lexicon.jsonl`. Do we need one here? Decide.

---

## How to Verify

- [ ] `bundle exec jekyll serve --baseurl=""` runs without error in a fresh terminal
- [ ] GitHub Pages site shows a blog homepage with post list (not raw README)
- [ ] All `_drafts/` files (except README.md and blog-playbook.md) have `title` in front-matter
- [ ] `flox activate` from a fresh terminal: `which just jq glow gum` all return paths
- [ ] `_posts/` contains only real posts (template removed)

---

## Technical Notes

**Ruby version:** The GitHub Actions runner uses Ruby 3.2 (ubuntu-latest). The flox environment should include a compatible Ruby version so local preview works. Nixpkgs has `ruby_3` — add to `flox.toml [install]`.

**Jekyll collection:** `_posts/` is configured with `output: true` and `permalink: /posts/:name/`. The collection should auto-generate at `/posts/` but needs an index page to list posts.

**Drafts:** Files in `_drafts/` are excluded from Jekyll build by default (no `published: false` needed — Jekyll excludes by default). They become visible once moved to `_posts/` with proper front-matter.

---

## Notes

The 7 drafts in `_drafts/` are the user's existing content. The `blog-playbook.md` file appears to be a collection of multiple post concepts, not a single draft — needs triage before processing.