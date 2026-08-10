# adr-007: CSS isolation pattern — total isolation apart from custom properties

**Date:** 2026-07-17
**Status:** Accepted

## Context

Web tools built in this stack (PolyVis graph visualiser, markdown browser, embedded content views) share a recurring failure mode: **CSS cascade bleed**. The host page's inherited styles (`color`, `font-family`, `line-height`, `box-sizing`, margins) leak into embedded content or component regions, and debugging the cascade is hard because it's a global ordering computation over every rule in the document. The usual reflex — add a more specific selector, add `!important`, add an override — makes the cascade *larger*, not smaller, and pushes the bug somewhere else.

Two native CSS primitives now change the economics:

- **`all: revert`** (Baseline ~2020) — resets every standard CSS property on an element to the browser-default (user-agent) cascade origin. One declaration, complete reset at the tag boundary.
- **`@scope`** (Baseline December 2025) — selector isolation: rules inside `@scope (.region) to (.boundary) { ... }` only match within that subtree; the `to` clause sets a lower ("donut") boundary. `@scope` does *selector* isolation, not *style* isolation — inherited values still bleed through. (CSSWG issue #11002 is open on true style isolation; `all: revert` is the current mechanism.)

The discovery that makes total isolation viable: **CSS custom properties (`--token`) are *not* reset by `all: revert`** — per spec, `all` excludes custom properties. So a design token declared at `:root` inherits *through* an `all: revert` boundary into every isolated region. The isolation boundary is permeable to the design system and impermeable to the host page's cascade. Share the *tokens*, isolate the *presentation*.

This is the CSS analogue of bounded-context entry (cool-pi-extensions Decision 015): the cascade is the unbounded context, and `all: revert` + `@scope` is the boundary.

## Decision

Adopt **total isolation apart from custom properties** as the CSS pattern for bounded regions in web tools built here. Concretely:

1. **Design tokens on `:root` as custom properties.** `--font-sans`, `--color-bg`, `--space-1`, etc. These inherit through isolation boundaries. This is the shared substrate.
2. **Layout CSS lives outside the isolation boundaries.** The page shell holds the grid/flex; panels are positioned as grid items by *un-isolated* layout CSS. A region cannot know about its siblings' sizes, so the layout container is not reset.
3. **Each bleed-risk region gets `@scope` + `all: revert` on its root**, then re-applies a reset/base stylesheet and its own component CSS, consuming tokens via `var(--token)`.
4. **Procedural rule: when CSS breaks, isolate first.** Isolation is the first diagnostic, not the last resort. Temporarily isolating a region tests whether the bug is a cascade bleed (isolation fixes it) or a local rule (isolation doesn't, and you've narrowed the search to the box). This is a falsification move.
5. **Do not isolate reflexively.** For stable, hand-authored regions with no bleed risk, **cascade layers** (`@layer reset, base, components;`) order the cascade without hard boundaries. Isolate where there's bleed; layer where there's just ordering. Isolate-first is a diagnostic, not a religion.

## Alternatives Considered

| Alternative | Why Rejected |
|-------------|-------------|
| BEM / naming conventions | Relies on author discipline; doesn't stop inherited values bleeding; accretes naming ceremony. Viable as a supplement *inside* an isolated region, not as the boundary. |
| CSS Modules / build-time scoped styles | Requires a build step — breaks the no-build / script-tag aesthetic of the Alpine + Hono JSX SSR stack. The native primitives need no build. |
| Shadow DOM for every region | Gives CSS isolation but forces *JS* isolation, which breaks SEO tools and document-level query selectors. Overkill for content embedding (CSSWG #11002, joezappie). Reach for Shadow DOM only when you need JS isolation too. |
| `all: initial` instead of `all: revert` | `initial` resets to the property's spec initial value (`display: inline` for a `p`), losing the UA default (`display: block`). `revert` keeps UA defaults — the correct baseline for content embedding. |
| Tailwind scoped preflight plugin | Solves the Tailwind-Preflight-vs-host-page collision but adds a dependency and a config layer. The native primitives do the same work. Right answer *if* you're already on Tailwind; we're not. |

## Consequences

**What became easier:**
- Cascade-bleed bugs collapse to "what's in this box" instead of "which of N rules won, and why." Debugging surface shrinks to the isolated region.
- Embedded content (markdown view, rendered CMS HTML, third-party widgets) renders with a known baseline regardless of host-page theme.
- Design tokens stay shared without sharing presentation — `:root` is the single source of truth for tokens, isolated regions consume via `var()`.

**What became harder:**
- The layout container must be kept outside the isolation boundaries — `all: revert` on the grid container breaks the grid. Discipline enforces this, not tooling.
- After `all: revert`, you re-apply a base stylesheet inside the region before component CSS. Order matters: reset, then base, then component.
- UA-default baselines differ slightly across browsers. Fine for content embedding; matters for pixel-perfect work. Know which you're doing.
- `all: revert` with `!important` exists to defeat host `!important` rules but cascades the `!important` requirement into everything afterward. Reach for it only when the host page forces it, not by default.

**Constraints this imposes:**
- Design tokens *must* be custom properties on `:root` (or an ancestor above the isolation boundary). Token values resolve via `var()` at use-site; they do not bleed as resolved values.
- Layout CSS and presentation CSS are separated by the boundary — they cannot live in the same isolated block.
- `@scope`'s lack of true style isolation is a *known* gap with an open spec issue (#11002), not a bug. `all: revert` on the scope root is the current mechanism for closing it.

## Related

- MDN: [`all: revert`](https://developer.mozilla.org/en-US/docs/Web/CSS/all), [`@scope`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40scope)
- CSSWG issue [#11002 — Can we use `@scope` for style isolation?](https://github.com/w3c/csswg-drafts/issues/11002)
- OddBird: [CSS Scope Proposal & Explainer](https://css.oddbird.net/scope/explainer/) (Miriam Suzanne — donut scope, proximity, the `to` clause)
- Cross-repo ADR: cool-pi-extensions Decision 017 (same pattern, fuller rationale + the bounded-context tie to Decision 015)
- Applied: PolyVis (`https://www.polyvis.net`), the markdown browser

---

*The cascade is the unbounded context. Total isolation apart from custom properties is the bounded-context entry for CSS. When CSS breaks, isolate first — the isolation is the diagnostic, not the last resort.*
