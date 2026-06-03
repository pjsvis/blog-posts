# Image Registry

Single source of truth for all images hosted on GitHub Pages.

## Available Images

| Filename | URL | Date Added | Used In |
|----------|-----|------------|---------|
| 415-hunters-286.jpg | https://pjsvis.github.io/blog-posts/assets/images/415-hunters-286.jpg | 2026-05-25 | — |
| jenny-nicholson-star-wars-hotel.jpg | https://pjsvis.github.io/blog-posts/assets/images/jenny-nicholson-star-wars-hotel.jpg | 2026-05-25 | — |

## How to Add Images

1. **Process in DXO** using the profile defined in `playbooks/conventions-playbook.md`
2. **Save to this folder** (`assets/images/`)
3. **Ask the agent to commit + push** — images must be on `main` to be live
4. **Reference by absolute URL** in your post:
   ```markdown
   ![Alt text](https://pjsvis.github.io/blog-posts/assets/images/your-image.jpg)
   ```
5. **Update this registry** — add the new row to the table above
