#!/usr/bin/env bun
/**
 * reg-sync.ts — Check or regenerate document registries.
 *
 * Compares files on disk against entries in the index JSONL.
 * Reports:
 *   - MISSING: files on disk not in index
 *   - STALE:   entries in index for files that no longer exist
 *
 * Usage:
 *   bun scripts/reg-sync.ts briefs          # check one registry
 *   bun scripts/reg-sync.ts --all           # check all registries
 *   bun scripts/reg-sync.ts --all --fix     # regenerate from filesystem
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { join, relative } from "node:path"

interface RegistryDef {
  indexPath: string
  dirPath: string
  filePattern: RegExp
  exclude: RegExp[]
}

const REGISTRIES: Record<string, RegistryDef> = {
  briefs: {
    indexPath: "briefs/INDEX.jsonl",
    dirPath: "briefs",
    filePattern: /\.md$/,
    exclude: [/INDEX\.jsonl/, /README\.md/],
  },
  debriefs: {
    indexPath: "debriefs/INDEX.jsonl",
    dirPath: "debriefs",
    filePattern: /\.md$/,
    exclude: [/INDEX\.jsonl/, /README\.md/],
  },
  decisions: {
    indexPath: "decisions/INDEX.jsonl",
    dirPath: "decisions",
    filePattern: /\.md$/,
    exclude: [/INDEX\.jsonl/, /README\.md/],
  },
  playbooks: {
    indexPath: "playbooks/REGISTRY.jsonl",
    dirPath: "playbooks",
    filePattern: /\.md$/,
    exclude: [/REGISTRY\.jsonl/, /README\.md/],
  },
  images: {
    indexPath: "assets/images/INDEX.jsonl",
    dirPath: "assets/images",
    filePattern: /\.(jpg|jpeg|png|webp|gif)$/i,
    exclude: [/INDEX\.jsonl/, /INDEX\.md/],
  },
}

function loadIndex(path: string): Array<{ file: string; date?: string; status?: string; summary?: string; meta?: Record<string, unknown> }> {
  try {
    const content = readFileSync(path, "utf-8").trim()
    if (!content) return []
    return content.split("\n").map((line) => JSON.parse(line))
  } catch {
    return []
  }
}

function listFiles(def: RegistryDef): string[] {
  const results: string[] = []

  function walk(dir: string): void {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
      } else if (entry.isFile() && def.filePattern.test(entry.name)) {
        const relPath = relative(def.dirPath, fullPath)
        if (def.exclude.some((re) => re.test(relPath))) continue
        results.push(relPath)
      }
    }
  }

  walk(def.dirPath)
  return results.sort()
}

function checkRegistry(name: string, def: RegistryDef, fix: boolean): boolean {
  const indexEntries = loadIndex(def.indexPath)
  const indexedFiles = new Set(indexEntries.map((e) => e.file))
  const diskFiles = new Set(listFiles(def))

  const missing = [...diskFiles].filter((f) => !indexedFiles.has(f))
  const stale = [...indexedFiles].filter((f) => !diskFiles.has(f))

  console.log(`\n── ${name.toUpperCase()} ──`)
  console.log(`  index: ${def.indexPath} (${indexedFiles.size} entries)`)
  console.log(`  files: ${def.dirPath} (${diskFiles.size} files)`)

  if (missing.length === 0 && stale.length === 0) {
    console.log(`  ✓ up to date`)
    return true
  }

  let ok = true

  if (missing.length > 0) {
    console.log(`  ⚠ MISSING from index (${missing.length}):`)
    for (const f of missing) console.log(`    + ${f}`)
    ok = false
  }

  if (stale.length > 0) {
    console.log(`  ⚠ STALE entries (${stale.length}):`)
    for (const f of stale) console.log(`    - ${f}`)
    ok = false
  }

  if (fix && (!ok || stale.length > 0)) {
    console.log(`  → regenerating index...`)

    // Keep existing entries for files that still exist (preserve summaries and meta)
    const kept = indexEntries.filter((e) => diskFiles.has(e.file))
    // Create stub entries for new files
    const added = missing.map((f) => {
      const fullPath = join(def.dirPath, f)
      const stat = statSync(fullPath)
      const date = stat.mtime.toISOString().split("T")[0]
      if (name === "images") {
        return {
          file: f,
          date,
          url: `https://pjsvis.github.io/blog-posts/assets/images/${f}`,
          summary: "(auto-generated — add description)",
          meta: {},
        }
      }
      return {
        file: f,
        date,
        status: name === "decisions" ? "Proposed" : "active",
        summary: "(auto-generated — add description)",
        meta: {},
      }
    })

    const merged = [...kept, ...added].sort((a, b) => a.file.localeCompare(b.file))
    const lines = merged.map((e) => JSON.stringify(e)).join("\n")
    writeFileSync(def.indexPath, `${lines}\n`)
    console.log(`  ✓ regenerated: ${merged.length} entries`)
  }

  return ok
}

function main(): void {
  const args = Bun.argv.slice(2)
  const fix = args.includes("--fix")
  const all = args.includes("--all")
  const targets = args.filter((a) => !a.startsWith("--"))

  if (all) {
    let ok = true
    for (const [name, def] of Object.entries(REGISTRIES)) {
      if (!checkRegistry(name, def, fix)) ok = false
    }
    if (!ok && !fix) {
      console.log("\nRun with --fix to regenerate indexes.")
      process.exit(1)
    }
    return
  }

  if (targets.length === 0) {
    console.error("Usage: bun scripts/reg-sync.ts <briefs|debriefs|decisions|playbooks|images|--all> [--fix]")
    console.error(`Registries: ${Object.keys(REGISTRIES).join(", ")}`)
    process.exit(1)
  }

  let ok = true
  for (const target of targets) {
    const def = REGISTRIES[target]
    if (!def) {
      console.error(`Unknown registry: ${target}`)
      continue
    }
    if (!checkRegistry(target, def, fix)) ok = false
  }

  if (!ok && !fix) {
    console.log("\nRun with --fix to regenerate indexes.")
    process.exit(1)
  }
}

main()