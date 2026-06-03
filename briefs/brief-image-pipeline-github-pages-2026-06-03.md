---
layout: none
title: "Brief: Image Pipeline — GitHub Pages Hosting + DXO Export Spec"
date: 2026-06-03
status: done
summary: Simplified image workflow. User preps images in DXO, saves to assets/images/, agent commits/pushes to GitHub Pages. Posts reference images by absolute URL. Export script validates URLs and copies images as convenience bundle.
---

# Brief: Image Pipeline — GitHub Pages Hosting + DXO Export Spec

## Objective

Enable original photography in blog posts with a minimal workflow:
1. **You** prep the image in DXO and save to `assets/images/`
2. **Agent** commits + pushes to `main` → image is live on GitHub Pages
3. **You** reference by absolute URL in post markdown

## DXO Export Profile

| Attribute | Value |
|-----------|-------|
| **Format** | JPEG, baseline |
| **Quality** | 85% (DXO "High") |
| **Color space** | sRGB |
| **Resize** | Fit into box 1600×1200px, do not enlarge |
| **Output sharpening** | Screen, Standard |
| **Watermark** | None |
| **Metadata** | Strip GPS, keep copyright/caption if present |

**Location:** `assets/images/` (flat, no subfolders)
**Naming:** Descriptive, URL-safe, kebab-case — `topic-descriptor.jpg`

**Crop ratios for common uses:**
- Medium hero/featured: 2:1 (1600×800) or 3:2 (1600×1067)
- Inline body images: 16:10 or 4:3

## Workflow

```
You: DXO → save to assets/images/my-photo.jpg
      ↓
Agent: git add assets/images/my-photo.jpg
       git commit -m "assets: add my-photo.jpg"
       git push origin main
      ↓
GitHub Pages: image live at https://pjsvis.github.io/blog-posts/assets/images/my-photo.jpg
      ↓
You: write post with ![alt](https://pjsvis.github.io/blog-posts/assets/images/my-photo.jpg)
```

## Pipeline Changes

### Export Script (`scripts/export-all.ts`)

1. **Detect image references** in post Markdown (`![alt](url)`)
2. **Warn on local/relative paths** — posts should use absolute GitHub Pages URLs
3. **Download images** to `_exported/medium/images/` as a convenience bundle (from absolute URLs)

### Image Registry

`assets/images/INDEX.md` tracks all pushed images and their URLs. Updated when new images are committed.

## Deliverables

- [x] DXO export profile defined in conventions playbook
- [x] `scripts/export-all.ts` detects images and warns on local paths
- [x] `scripts/export-all.ts` downloads images to `_exported/medium/images/`
- [x] `assets/images/INDEX.md` created as image registry
- [x] `playbooks/conventions-playbook.md` updated with image conventions
- [x] `playbooks/export-playbook.md` updated
- [x] `just check` passes

## Exclusion

- Do not implement image upload automation to Medium (still manual paste)
- Do not implement image optimization in CI (DXO handles that)
- Do not add new images to repo in this task (spec only; photos added per-post)

## Related

- `playbooks/export-playbook.md` — current export process
- `playbooks/conventions-playbook.md` — where image conventions live
- `scripts/export-all.ts` — export pipeline
- `assets/images/INDEX.md` — image registry