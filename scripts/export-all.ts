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

/** Export to Medium (HTML, title-only, no front-matter) */
function exportMedium(post: Post): string {
  const htmlBody = post.body
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

/** Export to Substack (raw Markdown body, footnotes preserved) */
function exportSubstack(post: Post): string {
  return `# ${post.title ?? "Untitled"}\n\n${post.body}`;
}

/** Export to Hacker News (text block with link) */
function exportHN(post: Post): string {
  const githubUrl = `https://pjsvis.github.io/blog-posts/posts/${basename(post.filename, ".md")}/`;
  return `Title: ${post.title ?? "Untitled"}\nLink: ${githubUrl}\n\n---\n\n${post.body.split("\n\n")[0] ?? post.body}`;
}

/** Export to Twitter (chunked thread, ~280 char segments) */
function exportTwitter(post: Post): string {
  const lines = post.body.split("\n").filter(Boolean);
  const segments: string[] = [];
  let current = "";

  for (const line of lines) {
    if ((current + "\n" + line).length > 280) {
      if (current) segments.push(current.trim());
      current = line;
    } else {
      current += "\n" + line;
    }
  }
  if (current) segments.push(current.trim());

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

    if (post.canonical_target?.includes("medium") ?? true) {
      await writeExport("medium", post, exportMedium(post));
    }
    if (post.canonical_target?.includes("substack") ?? true) {
      await writeExport("substack", post, exportSubstack(post));
    }
    await writeExport("hn", post, exportHN(post));
    await writeExport("twitter", post, exportTwitter(post));
  }

  console.log(`\nExports written to _exported/ directory.`);
  console.log("Review before distributing to platforms.");
}

main().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});