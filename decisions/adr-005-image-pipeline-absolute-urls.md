# Decision: Image Pipeline — Absolute URLs Over Path Rewriting

**Date:** 2026-06-03
**Status:** Accepted

## Context

The blog-posts export pipeline needed image support. Medium requires images to be hosted somewhere (its free tier blocks external URLs in some contexts, but embedded `<img>` tags with absolute URLs work fine). The initial approach was to have the export script automatically rewrite local paths (`assets/images/...`) to absolute GitHub Pages URLs during export.

## Decision

Posts must reference images by absolute GitHub Pages URL. The export script does not rewrite paths; it validates that absolute URLs are used and downloads images as a convenience bundle.

## Alternatives Considered

| Alternative | Why Rejected |
|-------------|-------------|
| Automatic path rewriting in export script (`assets/images/...` → `https://...`) | Hides the actual URL from the author; creates order-of-operations problems (image must be committed before export); local preview and exported HTML diverge; harder to debug "why didn't my image show up" |
| Upload images to Medium during export | Medium API requires OAuth and partner program access; adds significant complexity; not necessary since `<img>` tags with absolute URLs render correctly |
| Store images on a CDN (Cloudflare R2, S3) | Adds cost and another service to manage; GitHub Pages is already free and deployed |

## Consequences

**What became easier:**
- Author sees the exact URL that will be served — no magic rewriting
- Images work identically in Jekyll local preview, GitHub Pages, and exported HTML
- Debugging is trivial: if the URL 404s, the image wasn't pushed to `main`
- Export script is simpler — no path rewriting logic

**What became harder:**
- Authors must use full URLs instead of short relative paths (minor tradeoff)
- Images must be committed and pushed before they can be referenced in a post

**Constraints this imposes:**
- All image references in `_posts/` must use `https://pjsvis.github.io/blog-posts/assets/images/filename.jpg`
- The agent must commit and push new images before they can be used in posts
- `assets/images/INDEX.md` must be kept up to date as the image registry

## Related

- Debrief: `debriefs/2026-06-03-image-pipeline.md`
- Playbook: `playbooks/conventions-playbook.md` (Image Conventions section)
- Playbook: `playbooks/export-playbook.md`
- Brief: `briefs/brief-image-pipeline-github-pages-2026-06-03.md`
- ADR-003: Multi-platform canonical URL strategy