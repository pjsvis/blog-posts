# Drafts

Works in progress. Move to `_posts/` when ready to publish.

Drafts are excluded from the Jekyll build and from export pipeline. They are internal development artifacts.

When publishing:
1. Rename to `_posts/YYYY-MM-DD-slug.md`
2. Add front-matter with `canonical_target`
3. Run `just check` → `just export`
4. Commit and push
