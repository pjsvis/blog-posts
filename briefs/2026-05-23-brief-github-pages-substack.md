You can automate publishing to Medium from GitHub using **GitHub Actions** and Medium's API.

### Steps to Automate

1.  **Get Your Medium Integration Token:**
    *   Go to your Medium [Security Settings](https://medium.com/me/settings).
    *   Under "Integration Tokens," generate a new token (e.g., "github post to medium action").
    *   Copy this token.

2.  **Store the Token in GitHub:**
    *   In your GitHub repository, go to **Settings > Secrets and variables > Actions**.
    *   Create a new repository secret (e.g., `MEDIUM_INTEGRATION_TOKEN`) and paste your token.

3.  **Create a GitHub Actions Workflow:**
    *   Create a file in your repo at `.github/workflows/publish-to-medium.yml`.
    *   Use an existing action like `infraway/medium-post-markdown` or write a custom script.

    **Example Workflow:**
    ```yaml
    name: Publish to Medium
    on:
      push:
        branches: [main]
        paths: ['content/posts/*.md'] # Trigger on new/changed posts

    jobs:
      publish:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout code
            uses: actions/checkout@v4

          - name: Publish to Medium
            uses: infraway/medium-post-markdown@v1.5.0
            with:
              access_token: ${{ secrets.MEDIUM_INTEGRATION_TOKEN }}
              markdown_file: ./content/posts/your-new-post.md
              title: "Your Post Title"
              tags: "tag1,tag2"
              publish_status: draft # or 'public'
    ```

4.  **Customize:**
    *   Adjust the `on:` trigger (e.g., specific branches, paths, or use `workflow_dispatch` for manual runs).
    *   Modify the `markdown_file` path and other parameters (title, tags, status) as needed.

