# Medium + Substack Publishing Playbook

## What This Is

The operating procedure for publishing directly on Medium and Substack — the platforms are the **writing surface**, not export targets. Jekyll (`_posts/`) is the **archive of record**, updated by back-import after publishing.

Pipeline shape (reversed 2026-09 — see `decisions/discussion-ai-assisted-writing-pipeline-2026-09-02.md`):

```
Panel A (marble skeleton)  →  Panel B (fresh write, on platform)  →  publish
                                          │
                                          ▼
                        back-import final to _posts/ (archive, git commit)
```

The Jekyll-first export path (`scripts/export-all.ts`) is **demoted to optional** — see §9. It is not the default route.

---

## 1. Source material — Panel A (the marble)

Before opening the platform, produce or request the marble: an **argument skeleton + verified facts, stripped of prose**.

- Bullet structure, citations, research list — no sentences
- Nothing in Panel A should be tempting to copy, because there is nothing to copy
- The AI's job: prove the argument holds and keep the facts honest
- The writer's job: the prose, the voice, the route

**Discipline:** read Panel A, absorb the shape, **close it**. Never select text from Panel A. Never keep it open while writing. Recompose from memory — that is the act that transposes register.

Failure modes, in ascending detectability:

| Mode | Symptom | Guard |
|------|---------|-------|
| Copy-paste | Marble text appears verbatim | Never select from Panel A |
| Paraphrase-pastiche | Structure identical, adjectives sweary — a voice doing an impression of a voice | Close Panel A before writing |
| Inherited tidiness | Fresh write marches frontally instead of arriving sideways through anecdote | Let the fresh write be rude to the marble |

---

## 2. Open the writing surface

- **Medium new story:** https://medium.com/new-story
- **Substack dashboard:** https://substack.com/dashboard

Write Panel B directly in the platform editor. Do not draft in Jekyll first unless the post is reference material that needs version control from birth (§9).

---

## 3. Writing on the platform

- Write fresh from memory of Panel A — recompose, don't transcribe
- The voice is cynical, Leithian, sweary, anecdotal: it arrives sideways, through a story, not in a frontal march
- If the fresh write wants to start in a pub, a close, or a specific bloody argument about a specific book, let it
- If the fresh write disagrees with the marble on a point, the fresh write is probably right

### Medium draft checklist

- [ ] Headline final
- [ ] Subtitle/dek if using one
- [ ] Featured image at top (see §5)
- [ ] Opening paragraph strong — it is the only thing the feed shows
- [ ] Section breaks clean
- [ ] Bold/italics survived
- [ ] Links verified (see §4)
- [ ] Tags added
- [ ] Mobile preview checked

### Substack draft checklist

- [ ] Title final
- [ ] Intro note feels personal, not repetitive
- [ ] Closing CTA present
- [ ] Featured image works at top
- [ ] Email preview clean (Substack is email-first — this preview matters more than web)
- [ ] Links work
- [ ] Spacing consistent

---

## 4. Links

Both editors are standard rich text. No special syntax.

| Action | Result |
|--------|--------|
| Paste a bare URL into the body | Auto-converts to a clickable link |
| Select text, paste a URL over it | Selected text becomes anchor text |
| Select text, `Cmd-K` / `Ctrl-K` | Link dialog |

**Discipline:** use **absolute GitHub Pages URLs** (`https://pjsvis.github.io/blog-posts/assets/images/...`, `https://pjsvis.github.io/blog-posts/posts/...`) for anything pointing back at the silo, so links survive cross-platform paste and point at the canonical home. Never paste relative or `{{ site.baseurl }}` paths — they are Jekyll template syntax and will render literally on Medium/Substack.

---

## 5. Images

- Final image around **2000 × 1125 px** (16:9 preferred — matches the DXO export profile in `conventions-playbook.md`)
- Confirm the crop works at thumbnail size; no essential edge detail
- No distracting incidental text in the image
- Upload directly to the platform editor — no GitHub Pages round-trip needed for platform posts
- If the image is also referenced from a Jekyll post, follow the image conventions in `conventions-playbook.md` (commit to `assets/images/`, reference by absolute URL)

---

## 6. Canonical URL

Medium and Substack both support a canonical URL setting. Set it to the GitHub Pages URL **after back-import** (§8), or leave unset if the platform version is the canonical one.

Rule of thumb:

- Platform post, back-imported → canonical = GitHub Pages URL
- Platform post, not back-imported → platform version is canonical; note the live URL in the debrief

---

## 7. Publish order

1. **Substack** first (email list is the owned channel)
2. **Medium** second (discovery surface)
3. Social/LinkedIn launch post if warranted
4. Cross-link between the two versions

---

## 8. Back-import to Jekyll (archive of record)

After publishing:

1. Copy the final text into `_posts/YYYY-MM-DD-slug.md` with full front-matter (see `blog-posts-playbook.md`)
2. Set `canonical_url` to the live platform URL (ADR-003 discipline survives the reversal — it just gets set in a different place)
3. `just check`
4. Commit to a draft branch → merge; GitHub Pages deploys the archive

Treat this as **archive, not source**. The source is wherever the post was written. Git is the record. If back-import feels like friction on a given post, note the live URL in the debrief and skip it — an unreconciled archive is better than an unpublished post, but do not let skips become the norm without saying so in the debrief.

---

## 9. Optional: Jekyll-first export path (demoted)

For posts that *do* originate in Jekyll (reference material, series with version-control needs):

```bash
bun run scripts/export-all.ts --post=my-slug
```

- Substack: paste `_exported/substack/YYYY-MM-DD-slug.md` body
- Medium: paste `_exported/medium/YYYY-MM-DD-slug.html`, or use Medium's import-from-URL with the live GitHub Pages URL
- Review `_exported/` output before pasting — automated export is a first pass

Full details: `playbooks/export-playbook.md`.

---

## 10. Post-publish tasks

- [ ] Copy live URLs into the debrief (`debriefs/YYYY-MM-DD-topic.md`)
- [ ] Cross-link the two platform versions
- [ ] Back-import to `_posts/` (§8)
- [ ] Note which headline/dek was used and how it performed

---

## Useful URLs

### Medium
- New story: https://medium.com/new-story
- Home: https://medium.com/

### Substack
- Dashboard: https://substack.com/dashboard
- Login: https://substack.com/sign-in