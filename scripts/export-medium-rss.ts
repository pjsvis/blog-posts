#!/usr/bin/env bun
/**
 * export-medium-rss.ts — Generate RSS feed for Medium importer.
 *
 * Creates _exported/medium/feed.xml containing posts that target Medium
 * (canonical_target includes 'medium'). Used with Medium's RSS import feature:
 * Settings → Import → Import from RSS → paste feed URL
 *
 * Usage:
 *   bun run scripts/export-medium-rss.ts            # generate full feed
 *   bun run scripts/export-medium-rss.ts --post=slug # single post
 *
 * Related: decisions/adr-003-multi-platform-canonical-url-strategy.md
 */

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, basename } from "node:path";

const POSTS_DIR = join(process.cwd(), "_posts");
const EXPORT_DIR = join(process.cwd(), "_exported");
const FEED_PATH = join(EXPORT_DIR, "medium", "feed.xml");
const SITE_URL = "https://pjsvis.github.io/blog-posts";
const SITE_TITLE = "Peter Smith — Systems & AI";
const SITE_DESCRIPTION = "Writing on AI, agentic systems, and the Edinburgh Protocol";

interface PostMeta {
  title?: string;
  date?: string;
  categories?: string[];
  tags?: string[];
  canonical_url?: string;
  canonical_target?: string[];
  layout?: string;
}

interface Post extends PostMeta {
  filename: string;
  body: string;
}

function parseFrontMatter(content: string): { meta: PostMeta; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const meta: PostMeta = {};
  const rawYaml = match[1];
  const body = match[2];

  for (const line of rawYaml.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim();

    if (key === "title" || key === "layout") {
      meta[key as keyof PostMeta] = val.replace(/^["']|["']$/g, "");
    } else if (key === "date") {
      meta.date = val;
    } else if (key === "categories" || key === "tags" || key === "canonical_target") {
      meta[key as keyof PostMeta] = val
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    } else if (key === "canonical_url") {
      meta.canonical_url = val.replace(/^["']|["']$/g, "");
    }
  }

  return { meta, body };
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function bodyToHtml(body: string): string {
  return body
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
    // Horizontal rules
    .replace(/^---$/gm, "<hr>")
    // Paragraphs (double newlines)
    .replace(/\n\n/g, "</p><p>")
    // Single newlines in paragraphs
    .replace(/\n(?!\n)/g, "<br>");
}

async function loadPosts(slug?: string): Promise<Post[]> {
  if (!existsSync(POSTS_DIR)) {
    console.error(`_posts/ directory not found at ${POSTS_DIR}`);
    process.exit(1);
  }

  const files = await readdir(POSTS_DIR);
  const mdFiles = files.filter((f) => f.endsWith(".md") && !f.startsWith("_"));

  const allPosts: Post[] = await Promise.all(
    mdFiles.map(async (f) => {
      const raw = await readFile(join(POSTS_DIR, f), "utf-8");
      const { meta, body } = parseFrontMatter(raw);
      return { ...meta, filename: f, body };
    })
  );

  // Filter to posts targeting Medium
  const mediumPosts = allPosts.filter((p) => {
    const targets = p.canonical_target ?? ["medium", "substack", "hn", "twitter"];
    return targets.includes("medium");
  });

  // Sort by date descending (newest first)
  mediumPosts.sort((a, b) => {
    const dateA = a.date ? new Date(a.date.replace(/ ([+-]\d{4})$/, (_, tz) => tz)).getTime() : 0;
    const dateB = b.date ? new Date(b.date.replace(/ ([+-]\d{4})$/, (_, tz) => tz)).getTime() : 0;
    return dateB - dateA;
  });

  if (slug) {
    return mediumPosts.filter((p) => p.filename.includes(slug));
  }

  return mediumPosts;
}

function formatRssDate(dateStr?: string): string {
  if (!dateStr) return new Date().toUTCString();
  try {
    // Handle formats like "2026-05-13T12:00:00 +0000" or "2026-05-13"
    // Remove space before timezone: "2026-05-13T12:00:00 +0000" -> "2026-05-13T12:00:00+0000"
    const normalized = dateStr.replace(/ ([+-]\d{4})$/, (_, tz) => tz);
    const date = new Date(normalized);
    if (isNaN(date.getTime())) {
      return new Date().toUTCString();
    }
    return date.toUTCString();
  } catch {
    return new Date().toUTCString();
  }
}

function generateRss(posts: Post[]): string {
  const items = posts
    .map((post) => {
      const slug = basename(post.filename, ".md");
      const postUrl = `${SITE_URL}/posts/${slug}/`;
      const canonicalUrl = post.canonical_url ?? postUrl;

      // Strip top-level heading (title comes from front-matter)
      const bodyWithoutTitle = post.body.replace(/^\n# .+\n\n?/, "").trim();
      const htmlContent = bodyToHtml(bodyWithoutTitle);

      const categories = (post.categories ?? []).map((c) => `<category>${escapeXml(c)}</category>`).join("\n        ");
      const tags = (post.tags ?? []).map((t) => `<category domain="tag">${escapeXml(t)}</category>`).join("\n        ");

      return `    <item>
        <title>${escapeXml(post.title ?? "Untitled")}</title>
        <link>${postUrl}</link>
        <guid isPermaLink="false">${escapeXml(canonicalUrl)}</guid>
        <link rel="canonical" href="${escapeXml(canonicalUrl)}"/>
        <description><![CDATA[${htmlContent}]]></description>
        <pubDate>${formatRssDate(post.date)}</pubDate>
        ${categories}
        ${tags}
    </item>`;
    })
    .join("\n\n");

  const lastBuildDate = posts.length > 0 ? formatRssDate(posts[0].date) : new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/_exported/medium/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

async function main() {
  const args = process.argv.slice(2);
  const slugArg = args.find((a) => a.startsWith("--post="))?.replace("--post=", "");

  const posts = await loadPosts(slugArg);
  console.log(`Found ${posts.length} post(s) targeting Medium`);

  if (posts.length === 0) {
    console.log("No posts with canonical_target including 'medium'");
    console.log("Add 'medium' to canonical_target in front-matter to include a post");
    return;
  }

  for (const post of posts) {
    console.log(`  ${post.filename} — ${post.title ?? "untitled"}`);
  }

  await mkdir(join(EXPORT_DIR, "medium"), { recursive: true });
  const feed = generateRss(posts);
  await writeFile(FEED_PATH, feed, "utf-8");

  console.log(`\n✅ RSS feed generated: ${FEED_PATH}`);
  console.log(`\nTo import into Medium:`);
  console.log(`  1. Upload ${FEED_PATH} to your repo or serve it publicly`);
  console.log(`  2. In Medium: Settings → Import → Import from RSS`);
  console.log(`  3. Paste the public URL to the feed.xml`);
  console.log(`\nOr use the GitHub Pages URL: ${SITE_URL}/_exported/medium/feed.xml`);
}

main().catch((err) => {
  console.error("RSS generation failed:", err);
  process.exit(1);
});