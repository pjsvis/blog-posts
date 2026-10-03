<!-- MARBLE — raw material, unsculpted. No thesis, no hook, no angle chosen.
     Sculpt later. The facts below were verified against the okuda source
     tree on 2026-08-30 (session on feat/gloam-launcher, post-merge 56a78ed).
     Jekyll front matter to be added at publish time. -->

# Invisible Wiring: How a Line of Markdown Carries Its Own Jump Table

## The thing itself

A document in the okuda silo — the index pages especially — contains lines
that look like this in the source:

```markdown
| **Briefs** — what will we build? | **11** <!-- %%okuda-rhs:11%% briefs/index.md --> |
```

and like this when rendered in a terminal:

```
Briefs — what will we build?                          11
```

A reader sees a label and a number. A second reader — the TUI process, not
the renderer — sees the same line and learns: pressing `11` opens
`briefs/index.md`. The human-readable text and the machine-readable wiring
share one physical line of one plain markdown file. There is no sidecar, no
registry entry, no front matter block, no build step. The document is its own
jump table.

## The mechanism, verified in source

Three components, each with one job:

**1. The TUI scans the raw source** (`src/tui.ts`, `extractJumps`). Line-scoped:
any line containing a `%%okuda-rhs:NN%%` token *and* a `.md` path produces a
mapping from `NN` to that path. It does not parse markdown structure; it
scans lines. Duplicate tokens: last wins. The function is pure. The two-digit
key buffer the user types resolves against this map.

**2. The renderer strips the wiring** (`src/render.ts`). A one-line list item
carrying the token renders as slug-left, number-right (bold), with the token
and any HTML comment removed from display. In table cells, the wiring takes a
whole-comment form (`<!-- %%okuda-rhs:NN%% path.md -->`), which the grammar
layer (`src/grammar.ts`, `RE_RHS_WIRE`, `RE_RHS_TOKEN`) recognizes as a wire
tag consumed downstream rather than printed.

**3. The wiring is written by a compositor** (`scripts/reg-menu.ts`), which
generates jump-wired menus from the tier registries. Per the project's
division of concerns — the environment composites, the renderer paints, the
host (here, the same binary's TUI) reads the raw bytes.

The wiring is pinned by tests in four files (`render.test.ts`, `tui.test.ts`,
`jump-demo.test.ts`, `reg-menu.test.ts`), including exact assertions on the
emitted table-row form.

## Properties worth noting (all observed, not argued)

- **Association is physically local.** Label, token, and path share one line.
  The label cannot drift away from its target, because they are the same
  fragment of text. Drift is the standard failure mode of wiring systems
  (config files, registries, sidecars); this one makes per-line drift
  impossible. (File-level drift — renaming the target — still breaks the
  wiring, since the path is literal. The silo's separate callsign system
  exists precisely for durable addressing; jump tokens are declared
  ephemeral, session codes, "never jotted.")
- **The wire is invisible everywhere else.** HTML comments are suppressed by
  every markdown renderer; the `%%…%%` token form is stripped by okuda's own
  renderer. On GitHub, in another viewer, in `cat`, the document is an
  ordinary markdown document. The mechanism costs a host nothing.
- **The line-scoped constraint is load-bearing.** Because the scanner reads
  lines, wiring must share the line with its item. Wiring from a heading
  three paragraphs away is impossible. A more general directive grammar
  would permit non-local wiring — and non-local wiring can lie about
  proximity.
- **Token space is small and bounded.** One or two digits (`\d{1,2}`), a
  per-document vocabulary of ~99 session codes, numbered from 11 (an
  ergonomic offset decision, ADR-021 in the source silo).

## Prior art

The pattern — a machine directive hidden in a human document, ignored by
everything that does not care — is old:

- **Vim modelines**: `/* vim: set ts=4 */` — per-file editor settings parsed
  from the buffer text.
- **Emacs file-local variables**: `-*- mode: foo -*-` at the top of a file.
- **HTML comments** generally: invisible to readers, load-bearing to
  processors (server-side includes, build-tool markers, IDE region folding).
- **Jekyll/front-matter systems**: YAML between `---` fences — the same
  dual-audience move at document scope rather than line scope.

The okuda variant's distinguishing property is *line scope*: the wiring is
bound to the exact line it modifies, not to the document.

## Companion finding: the filename as sort key

In the same silo, a root-level file named `&alpha.md` reliably sorts first in
the launcher's file picker. The reason is byte order: `&` is 0x26, which
precedes digits and letters, so the filename exploits the sort invariant of
`rg --files` (and before that `fd`) to pin itself at position one of the
picker — where the default cursor sits and where Enter opens. The mnemonic
does positional work, not identity work; the file's own prose states it is
the default orientation vector. No pinning feature exists; none is needed;
the trick is composed entirely of invariants of tools already in the pipe.
Its stability is exactly the stability of the sort order underneath it.

## State of the material

Verified against: `src/tui.ts` (extractJumps), `src/render.ts` (list-item and
table-cell handling), `src/grammar.ts` (wire regexes), `scripts/reg-menu.ts`
(compositor), `src/cli.ts` and `src/root.ts` (the separate callsign layer,
which is the durable-addressing counterpart), four test files. Source silo:
`pjsvis/okuda`, branch history through 2026-08-30.

Angles not chosen (for the sculptor): the line as a unit of wiring; invisible
machinery and the two-audience document; constraints as honesty (non-local
wiring is impossible, therefore cannot lie); ephemeral vs durable addresses;
the filename-as-UI-state trick; nothing here yet argues that any of this is
*good* — it only establishes what is true.
