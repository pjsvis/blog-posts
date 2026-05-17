#!/usr/bin/env bun
/**
 * export-all.ts — Export all _posts/ content to multi-platform distribution formats.
 *
 * Reads front-matter metadata to route each post to the correct output:
 *   _exported/medium/    → Medium-compatible HTML (strip front-matter, add title)
 *   _exported/substack/  → Substack-compatible Markdown (raw body, footnotes preserved)
 *   _exported/hn/        → Hacker News text submission block
 *   _exported/twitter/   → Thread-ready chunked segments
 *
 * Usage:
 *   bun run scripts/export-all.ts
 *   bun run scripts/export-all.ts --post 2026-05-17-my-post  (single post)
 */

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, basename, extname } from "node:path";

const POSTS_DIR = join(process.cwd(), "_posts");
const EXPORT_DIR = join(process.cwd(), "_exported");
const PLATFORMS = ["medium", "substack", "hn", "twitter"] as const;

type Platform = (typeof PLATFORMS)[number];

interface PostMeta {
  title?: string;
  date?: string;
  categories?: string[];
  tags?: string[];
  canonical_target?: string[];
  layout?: string;
}

interface Post extends PostMeta {
  filename: string;
  rawContent: string;
  body: string; // front-matter stripped
}

/** Parse YAML front-matter from a markdown file */
function parseFrontMatter(content: string): { meta: PostMeta; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const meta: PostMeta = {};
  const rawYaml = match[1];
  const body = match[2];

  // Simple YAML parser for our front-matter patterns
  for (const line of rawYaml.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim();

    if (key === "title" || key === "layout") {
      meta[key as keyof PostMeta] = val.replace(/^["']|["']$/g, "");
    } else if (key === "date") {
      meta.date = val;
    } else if (key === "categories" || key === "tags") {
      meta[key as keyof PostMeta] = val
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    } else if (key === "canonical_target") {
      meta.canonical_target = val
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    }
  }

  return { meta, body };
}

/** Load all posts from _posts/ */
async function loadPosts(slug?: string): Promise<Post[]> {
  if (!existsSync(POSTS_DIR)) {
    console.error(`_posts/ directory not found at ${POSTS_DIR}`);
    process.exit(1);
  }

  const files = await readdir(POSTS_DIR);
  const mdFiles = files.filter((f) => f.endsWith(".md") && !f.startsWith("_"));

  if (slug) {
    const target = mdFiles.find((f) => f.includes(slug));
    if (!target) {
      console.error(`No post found matching "${slug}"`);
      process.exit(1);
    }
    return loadPost(target);
  }

  return Promise.all(mdFiles.map(loadPost));
}

async function loadPost(filename: string): Promise<Post> {
  const rawContent = await readFile(join(POSTS_DIR, filename), "utf-8");
  const { meta, body } = parseFrontMatter(rawContent);
  return { ...meta, filename, rawContent, body };
}

/** Export to Medium (HTML, no duplicate title — body h1 stripped, title from front-matter only) */
function exportMedium(post: Post): string {
  // Strip the top-level heading from body (it's the duplicate title)
  // Body starts with \n# Title — strip the leading newline and the heading line
  const bodyWithoutTitle = post.body.replace(/^\n# .+\n\n?/, "");

  const htmlBody = bodyWithoutTitle
    // Headings
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Bold/italic
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    // Blockquotes
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    // Paragraphs (double newlines)
    .replace(/\n\n/g, "</p><p>")
    // Single newlines in paragraphs
    .replace(/\n(?!\n)/g, "<br>");

  return `<h1>${post.title ?? "Untitled"}</h1>\n<p>${htmlBody}</p>`;
}

/** Export to Substack (Markdown, title from front-matter only — no body h1 duplicate) */
function exportSubstack(post: Post): string {
  // Strip the top-level heading from body (title comes from front-matter)
  // Body starts with \n# Title — strip the leading newline and the heading line
  const bodyWithoutTitle = post.body.replace(/^\n# .+\n\n?/, "");
  return `# ${post.title ?? "Untitled"}\n\n${bodyWithoutTitle}`;
}

/** Export to Hacker News (text block with link) */
function exportHN(post: Post): string {
  const githubUrl = `https://pjsvis.github.io/blog-posts/posts/${basename(post.filename, ".md")}/`;
  return `Title: ${post.title ?? "Untitled"}\nLink: ${githubUrl}\n\n---\n\n${post.body.split("\n\n")[0] ?? post.body}`;
}

/** Export to Twitter (section-based thread, ~280 char segments — breaks on ## headings) */
function exportTwitter(post: Post): string {
  // Strip top-level heading (it's the duplicate title)
  // Body starts with \n# Title — strip the leading newline and the heading line
  const body = post.body.replace(/^\n# .+\n\n?/, "");

  // Split on section headings (## ) to get coherent units
  const rawSections = body.split(/(?=^## )/m).filter(Boolean);

  const segments: string[] = [];

  // Hook tweet (title + first paragraph)
  const firstPara = body.replace(/^## .+$\n?/m, "").trim().split("\n\n")[0] ?? "";
  if (firstPara) {
    segments.push(firstPara.slice(0, 280));
  }

  // Section tweets
  for (const section of rawSections) {
    const heading = section.match(/^## (.+)$/m)?.[1] ?? "";
    const content = section.replace(/^## .+$/m, "").trim();

    if (!content && !heading) continue;

    // Build tweet: heading if present, then content chunks
    let tweet = heading ? `**${heading}**\n` : "";

    for (const para of content.split("\n\n")) {
      const trimmed = para.trim();
      if (!trimmed) continue;

      const candidate = tweet + trimmed;
      if (candidate.length <= 280) {
        tweet = candidate;
      } else {
        if (tweet.replace(/^\*\*.+\*\*\n?/, "")) segments.push(tweet.trim());
        tweet = trimmed.slice(0, 280);
      }
    }
    if (tweet.trim()) segments.push(tweet.trim());
  }

  // CTA tweet
  const slug = post.filename.replace(".md", "");
  segments.push(`Thread continues →`);

  return segments.map((s, i) => `${i + 1}/${segments.length}\n${s}`).join("\n\n---\n\n");
}

/** Write output to platform directory */
async function writeExport(platform: Platform, post: Post, content: string): Promise<void> {
  const dir = join(EXPORT_DIR, platform);
  await mkdir(dir, { recursive: true });
  const ext = platform === "medium" ? ".html" : ".md";
  const outName = basename(post.filename, ".md") + ext;
  await writeFile(join(dir, outName), content, "utf-8");
}

/** Main export loop */
async function main() {
  const args = process.argv.slice(2);
  const slugArg = args.find((a) => a.startsWith("--post="))?.replace("--post=", "");

  const posts = await loadPosts(slugArg);
  console.log(`Found ${posts.length} post(s) to export`);

  for (const post of posts) {
    console.log(`  Exporting: ${post.filename} (${post.title ?? "untitled"})`);

    // canonical_target gates all platforms. If not set, export to all.
    const targets = post.canonical_target?.length
      ? post.canonical_target
      : ["medium", "substack", "hn", "twitter"];

    if (targets.includes("medium")) {
      await writeExport("medium", post, exportMedium(post));
    }
    if (targets.includes("substack")) {
      await writeExport("substack", post, exportSubstack(post));
    }
    if (targets.includes("hn")) {
      await writeExport("hn", post, exportHN(post));
    }
    if (targets.includes("twitter")) {
      await writeExport("twitter", post, exportTwitter(post));
    }
  }

  console.log(`\nExports written to _exported/ directory.`);
  console.log("Review before distributing to platforms.");
}

main().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});