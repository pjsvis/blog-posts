---
date: 2026-06-03
tags: [infrastructure, images, export-pipeline]
agent: claude
environment: local
---

# Debrief: Image Pipeline for GitHub Pages

## Accomplishments

- **ADR-005 written and accepted:** Documented the decision to use absolute URLs over automatic path rewriting
- **Export script updated:** `scripts/export-all.ts` now detects image references, warns on local/relative paths, and downloads images to `_exported/medium/images/` as a convenience bundle
- **Conventions documented:** DXO export profile (JPEG 85%, sRGB, 1600×1200) added to `playbooks/conventions-playbook.md`
- **Export playbook updated:** `playbooks/export-playbook.md` reflects the absolute URL approach
- **Image registry created:** `assets/images/INDEX.md` tracks all pushed images and their URLs
- **Brief completed:** `briefs/brief-image-pipeline-github-pages-2026-06-03.md` marked done
- **`just check` passes:** All registries in sync

## Problems

- **Initial approach was too complex:** The first implementation added path rewriting logic to the export script. This created hidden behavior that would be hard to debug. User correctly identified this as unnecessary complexity.
- **Simplification required a second pass:** Removed `rewriteImagePathsToGithub()`, `extractImagePaths()` was refactored to `extractImageUrls()`, validation logic changed from "warn on missing local file" to "warn on local/relative URL."

## Lessons Learned

- **Explicit is better than implicit.** Absolute URLs are longer to type but eliminate an entire class of "why didn't my image show up" problems.
- **User feedback is a barnacle detector.** The user immediately spotted that the path-rewriting approach added friction. When a user says "let me just specify the URL," that's signal that the automation is solving the wrong problem.
- **GitHub Pages is sufficient.** No need for CDN, no need for Medium API integration. The simplest hosting is the one already deployed.

## Platform Notes

### Medium
- Images referenced by absolute GitHub Pages URL render correctly as `<img>` tags in the HTML export
- Convenience bundle at `_exported/medium/images/` allows manual upload if needed
- No Medium API integration required

### Substack / HN / Twitter
- Absolute URLs pass through untouched in Markdown exports
- No platform-specific image handling needed

## Related

- Brief: `briefs/brief-image-pipeline-github-pages-2026-06-03.md`
- Decision: `decisions/adr-005-image-pipeline-absolute-urls.md`
- Commit: `c596065` — `feat(images): simplified image pipeline — absolute URLs, no path rewriting`
