#!/usr/bin/env bun
/**
 * reg-list.ts — Human-readable registry lister.
 *
 * Reads a JSONL index and prints formatted entries.
 *
 * Usage:
 *   bun scripts/reg-list.ts briefs
 *   bun scripts/reg-list.ts debriefs
 *   bun scripts/reg-list.ts decisions
 *   bun scripts/reg-list.ts playbooks
 *   bun scripts/reg-list.ts prompts
 */

import { readFileSync } from "node:fs"
import { join } from "node:path"

interface RegistryEntry {
  file: string
  date: string
  status: string
  summary: string
  meta?: Record<string, unknown>
}

const FILE_MAP: Record<string, string> = {
  briefs: "briefs/INDEX.jsonl",
  debriefs: "debriefs/INDEX.jsonl",
  decisions: "decisions/INDEX.jsonl",
  playbooks: "playbooks/REGISTRY.jsonl",
  prompts: "prompts/INDEX.jsonl",
}

function getTerminalWidth(): number {
  try {
    const cols = Bun.env.COLUMNS
    if (cols) return parseInt(cols, 10)
    const output = new TextDecoder().decode(
      Bun.spawnSync({ cmd: ["tput", "cols"] }).stdout,
    ).trim()
    const w = parseInt(output, 10)
    return w > 40 ? w : 80
  } catch {
    return 80
  }
}

function wrap(text: string, width: number): string[] {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let current = ""
  for (const word of words) {
    if (current.length + word.length + 1 > width) {
      lines.push(current)
      current = word
    } else {
      current = current ? `${current} ${word}` : word
    }
  }
  if (current) lines.push(current)
  return lines.length ? lines : [""]
}

function formatMeta(meta: Record<string, unknown> | undefined): string[] {
  if (!meta || Object.keys(meta).length === 0) return []
  const lines: string[] = []
  for (const [key, value] of Object.entries(meta)) {
    if (value == null || value === "") continue
    lines.push(`${key}: ${value}`)
  }
  return lines
}

function formatEntry(entry: RegistryEntry, textWidth: number): string {
  const indent = "      "
  const header = `${entry.date}  ${entry.status.toUpperCase().padEnd(12)}  ${entry.file}`
  const summaryLines = wrap(entry.summary, textWidth)
  const metaLines = formatMeta(entry.meta)

  return [
    header,
    ...summaryLines.map((l) => `${indent}${l}`),
    ...metaLines.map((l) => `${indent}${l}`),
    "",
  ].join("\n")
}

function loadJsonl(path: string): RegistryEntry[] {
  const content = readFileSync(path, "utf-8").trim()
  if (!content) return []
  return content.split("\n").map((line) => JSON.parse(line))
}

function main(): void {
  const registry = Bun.argv[2]
  if (!registry) {
    console.error("Usage: bun scripts/reg-list.ts <briefs|debriefs|decisions|playbooks>")
    console.error(`Known: ${Object.keys(FILE_MAP).join(", ")}`)
    process.exit(1)
  }

  const path = FILE_MAP[registry]
  if (!path) {
    console.error(`Unknown registry: ${registry}`)
    console.error(`Known: ${Object.keys(FILE_MAP).join(", ")}`)
    process.exit(1)
  }

  const fullPath = join(process.cwd(), path)
  const entries = loadJsonl(fullPath)

  console.log(`── ${registry.toUpperCase()} (${entries.length} entries) ──\n`)
  if (entries.length === 0) {
    console.log("  (empty)")
    return
  }

  const width = Math.min(getTerminalWidth(), 100)
  const textWidth = width - 6 // indent length

  for (const entry of entries) {
    console.log(formatEntry(entry, textWidth))
  }
}

main()