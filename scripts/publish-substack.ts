#!/usr/bin/env bun
/**
 * publish-substack.ts — Publish posts to Substack as drafts.
 *
 * Usage:
 *   bun scripts/publish-substack.ts <slug>          # publish single post as draft
 *   bun scripts/publish-substack.ts --all           # publish all posts targeting substack
 *   bun scripts/publish-substack.ts --dry-run       # show what would be published
 *
 * Credentials (required environment variables):
 *   SUBSTACK_SID   — substack.sid cookie value
 *   SUBSTACK_SUBDOMAIN — subdomain e.g. "petersmith154047"
 *
 * Workflow: uses the first available draft as a template for byline structure.
 */

import { readFile } from "node:fs/promises";
import { join, basename } from "node:path";

const POSTS_DIR = join(process.cwd(), "_posts");

// ---- Config from env ----
const SID = process.env.SUBSTACK_SID ?? "";
const SUBDOMAIN = process.env.SUBSTACK_SUBDOMAIN ?? "";
const SUBSTACK_BASE = `https://${SUBDOMAIN}.substack.com`;
const API_DRAFTS = `${SUBSTACK_BASE}/api/v1/drafts`;

function authHeaders(): Record<string, string> {
  return {
    Cookie: `substack.sid=${SID}; connect.sid=${SID}`,
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    Origin: "https://substack.com",
    Referer: "https://substack.com/",
  };
}

// ---- Parse front-matter ----
interface PostMeta {
  title?: string;
  date?: string;
  tags?: string[];
  canonical_target?: string[];
}

function parseFrontMatter(content: string): { meta: PostMeta; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };
  const meta: PostMeta = {};
  const rawYaml = match[1];
  const body = match[2];
  for (const line of rawYaml.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    if (key === "title") {
      meta.title = val.replace(/^["']|["']$/g, "");
    } else if (key === "tags" || key === "canonical_target") {
      meta[key as keyof PostMeta] = val
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    }
  }
  return { meta, body };
}

// ---- Text to ProseMirror ----
function textToProseMirror(text: string): object {
  const paragraphs = text.split("\n\n").filter((s) => s.trim());
  if (!paragraphs.length) paragraphs.push(text.trim() || " ");

  const content = paragraphs.map((para) => {
    // Handle headings
    const headingMatch = para.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2];
      return {
        type: "heading",
        attrs: { level },
        content: [{ type: "text", text: headingText }],
      };
    }

    // Handle blockquote
    if (para.startsWith("> ")) {
      const quoteText = para.replace(/^> /gm, "").trim();
      return {
        type: "blockquote",
        content: [{ type: "paragraph", content: [{ type: "text", text: quoteText }] }],
      };
    }

    // Handle bold, italic, links, code inline
    const parts: object[] = [];
    const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(para)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: "text", text: para.slice(lastIndex, match.index) });
      }
      const token = match[1];
      if (token.startsWith("**") && token.endsWith("**")) {
        parts.push({ type: "text", text: token.slice(2, -2), marks: [{ type: "strong" }] });
      } else if (token.startsWith("*") && token.endsWith("*")) {
        parts.push({ type: "text", text: token.slice(1, -1), marks: [{ type: "em" }] });
      } else if (token.startsWith("`") && token.endsWith("`")) {
        parts.push({ type: "text", text: token.slice(1, -1), marks: [{ type: "code" }] });
      } else if (token.startsWith("[") && token.includes("](")) {
        const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          parts.push({
            type: "text",
            text: linkMatch[1],
            marks: [{ type: "link", attrs: { href: linkMatch[2], target: "_blank", rel: "noopener noreferrer nofollow", class: null } }],
          });
        }
      } else {
        parts.push({ type: "text", text: token });
      }
      lastIndex = match.index + token.length;
    }
    if (lastIndex < para.length) {
      parts.push({ type: "text", text: para.slice(lastIndex) });
    }
    if (parts.length === 0) {
      parts.push({ type: "text", text: para });
    }

    return { type: "paragraph", content: parts };
  });

  return { type: "doc", content };
}

// ---- Fetch reference draft ----
interface Byline {
  user_id: number;
  is_draft: boolean;
  is_guest: boolean;
}

interface ReferenceDraft {
  id: number;
  type: string;
  audience: string;
  should_send_email: boolean;
  write_comment_permissions: string;
  publication_id: number;
  postBylines: Byline[];
}

async function getReferenceDraft(): Promise<ReferenceDraft | null> {
  const resp = await fetch(API_DRAFTS, { headers: authHeaders() });
  if (!resp.ok) return null;
  const data = await resp.json();
  const posts = data.posts ?? data.items ?? [];
  return posts[0] ?? null;
}

// ---- Create draft ----
async function createDraft(
  title: string,
  proseMirrorBody: object,
  refDraft: ReferenceDraft
): Promise<{ success: boolean; draftId?: string; url?: string; error?: string }> {
  const draftData = {
    type: refDraft.type ?? "newsletter",
    audience: refDraft.audience ?? "everyone",
    should_send_email: refDraft.should_send_email ?? true,
    write_comment_permissions: refDraft.write_comment_permissions ?? "everyone",
    publication_id: refDraft.publication_id,
    draft_title: title,
    draft_subtitle: null,
    draft_body: JSON.stringify(proseMirrorBody),
    section_chosen: false,
    subscriber_set_id: 1,
    draft_bylines: (refDraft.postBylines ?? []).map((b) => ({
      user_id: b.user_id,
      is_draft: true,
      is_guest: b.is_guest ?? false,
      id: b.user_id,
    })),
  };

  try {
    const resp = await fetch(API_DRAFTS, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(draftData),
    });

    if (resp.ok) {
      const result = await resp.json();
      return { success: true, draftId: String(result.id), url: `${SUBSTACK_BASE}/publish/drafts/${result.id}` };
    }
    const errorText = await resp.text();
    return { success: false, error: `HTTP ${resp.status}: ${errorText.slice(0, 300)}` };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

// ---- Load post ----
async function loadPost(filename: string) {
  const raw = await readFile(join(POSTS_DIR, filename), "utf-8");
  const { meta, body } = parseFrontMatter(raw);
  const content = body.replace(/^\n# .+\n\n?/, "").trim();
  return { filename, meta, proseMirrorBody: textToProseMirror(content) };
}

async function getPosts(): Promise<string[]> {
  const { readdir } = await import("node:fs/promises");
  const files = await readdir(POSTS_DIR);
  return files.filter((f) => f.endsWith(".md") && !f.startsWith("_"));
}

// ---- Main ----
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const allPosts = args.includes("--all") || (args.length === 1 && args[0] === "--dry-run") || args.length === 0;

  if (!SID) {
    console.error("ERROR: Missing SUBSTACK_SID");
    console.error("  export SUBSTACK_SID='...'");
    console.error("  export SUBSTACK_SUBDOMAIN='...'");
    console.error("  bun scripts/publish-substack.ts --all");
    process.exit(1);
  }
  if (!SUBDOMAIN) {
    console.error("ERROR: Missing SUBSTACK_SUBDOMAIN");
    process.exit(1);
  }

  console.log(`Testing connection to ${SUBSTACK_BASE}...`);
  const refDraft = await getReferenceDraft();
  if (!refDraft) {
    console.error("Failed to fetch drafts — check cookies.");
    process.exit(1);
  }
  console.log(`✅ Connected (reference draft: ${refDraft.id})`);

  let posts: string[] = [];

  if (allPosts) {
    const all = await getPosts();
    for (const f of all) {
      const raw = await readFile(join(POSTS_DIR, f), "utf-8");
      const { meta } = parseFrontMatter(raw);
      if (!meta.canonical_target || meta.canonical_target.includes("substack")) {
        posts.push(f);
      }
    }
  } else {
    const slug = args.find((a) => !a.startsWith("--"));
    if (!slug) {
      console.error("Usage: bun scripts/publish-substack.ts --all | --dry-run | <slug>");
      process.exit(1);
    }
    const all = await getPosts();
    const match = all.find((f) => f.includes(slug));
    if (!match) { console.error(`No post matching '${slug}'`); process.exit(1); }
    posts = [match];
  }

  if (!posts.length) { console.log("No posts to publish."); return; }

  console.log(`\nPublishing ${posts.length} post(s) as drafts...`);

  for (const filename of posts) {
    const { meta, proseMirrorBody } = await loadPost(filename);
    const title = meta.title ?? basename(filename, ".md");

    if (dryRun) {
      console.log(`  [dry-run] ${filename} → "${title}"`);
      continue;
    }

    console.log(`  Creating draft: "${title}"...`);
    const result = await createDraft(title, proseMirrorBody, refDraft);
    if (result.success) {
      console.log(`  ✅ Draft created: ${result.url}`);
    } else {
      console.error(`  ❌ ${result.error}`);
    }
  }

  if (dryRun) console.log("\n(dry-run — no posts created)");
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });