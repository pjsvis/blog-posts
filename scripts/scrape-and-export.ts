#!/usr/bin/env bun
/**
 * scrape-and-export.ts — Fetch existing published posts from Substack/Medium
 * and import them into _posts/ with proper front-matter.
 *
 * Use after publishing manually, then import back to keep Jekyll in sync.
 *
 * Usage:
 *   bun run scripts/scrape-and-export.ts --url https://yourblog.substack.com/p/post-slug --platform substack
 */

import { writeFile } from "node:fs/promises";
import { join } from "node:path";

type Platform = "substack" | "medium";

interface ScrapeArgs {
  url: string;
  platform: Platform;
  title?: string;
  date?: string;
}

async function scrape(url: string): Promise<string> {
  // Use the global defuddle-like utility or web_fetch
  // For now, this is a placeholder that would call the MCP/web_fetch tool
  console.error("Use defuddle or web_fetch to fetch content, then pass the result here.");
  throw new Error("Not implemented: use defuddle to fetch the URL first, then call this script with --body");
}

function buildFrontMatter(meta: Partial<ScrapeArgs>): string {
  const date = meta.date ?? new Date().toISOString().split("T")[0];
  const title = meta.title ?? "Imported Post";
  return `---
layout: post
title: "${title}"
date: ${date}T12:00:00 +0000
categories: imported
canonical_target: [substack]
---

`;
}

async function main() {
  const args = process.argv.slice(2);
  const url = args.find((a) => a.startsWith("--url="))?.replace("--url=", "");
  const platform = (args.find((a) => a.startsWith("--platform="))?.replace("--platform=", "") ?? "substack") as Platform;
  const body = args.find((a) => a.startsWith("--body="))?.replace("--body=", "");

  if (!url && !body) {
    console.error("Usage: scrape-and-export.ts --url <url> --platform <substack|medium> [--body <text>]");
    process.exit(1);
  }

  let content: string;
  if (body) {
    content = body;
  } else if (url) {
    content = await scrape(url);
  } else {
    throw new Error("Either --url or --body required");
  }

  // Strip any existing front-matter
  const cleanBody = content.replace(/^---\n[\s\S]*?\n---\n?/, "");
  const slug = (url ?? "imported-post")
    .split("/")
    .pop()
    ?.replace(/[^a-z0-9-]/gi, "-")
    ?? "imported-post";
  const date = new Date().toISOString().split("T")[0];

  const frontMatter = buildFrontMatter({ url, platform, date });
  const filename = `${date}-${slug}.md`;
  const filepath = join(process.cwd(), "_posts", filename);

  await writeFile(filepath, frontMatter + cleanBody, "utf-8");
  console.log(`Imported to: _posts/${filename}`);
}

main().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});