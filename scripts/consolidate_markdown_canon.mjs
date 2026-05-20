#!/usr/bin/env node
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const KEEP = new Set(['README.md', 'federation/tamv-digital-nexus/AGENTS.md']);
const OUTPUTS = [
  'docs/UNIFIED_01_PLATFORM_AND_ARCHITECTURE.md',
  'docs/UNIFIED_02_SERVICES_AND_APIS.md',
  'docs/UNIFIED_03_GOVERNANCE_AND_SECURITY.md',
  'docs/REPO_UNIFICATION_PLAYBOOK.md',
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

function classify(rel, content) {
  const t = `${rel}\n${content.slice(0, 4000)}`.toLowerCase();
  if (/api|endpoint|service|backend|server|function|supabase|http|oauth/.test(t)) return 1;
  if (/govern|security|policy|rfc|regla|norma|audit|compliance|identity/.test(t)) return 2;
  if (/roadmap|deploy|runbook|playbook|plan|migration|ops|testing/.test(t)) return 3;
  return 0;
}

async function main() {
  const allFiles = await walk(ROOT);
  const mdFiles = allFiles
    .map((f) => path.relative(ROOT, f).replaceAll('\\\\', '/'))
    .filter((f) => f.endsWith('.md'))
    .sort();

  const buckets = [[], [], [], []];
  for (const rel of mdFiles) {
    if (KEEP.has(rel) || OUTPUTS.includes(rel)) continue;
    const content = await readFile(path.join(ROOT, rel), 'utf-8');
    const idx = classify(rel, content);
    buckets[idx].push({ rel, content });
  }

  await mkdir(path.join(ROOT, 'docs'), { recursive: true });
  for (let i = 0; i < OUTPUTS.length; i += 1) {
    const lines = [`# Consolidado ${i + 1}`, '', `Generado: ${new Date().toISOString()}`, '', `Fuentes: ${buckets[i].length}`, ''];
    for (const doc of buckets[i]) {
      lines.push(`## Fuente: ${doc.rel}`);
      lines.push('');
      lines.push(doc.content.trim());
      lines.push('\n---\n');
    }
    await writeFile(path.join(ROOT, OUTPUTS[i]), `${lines.join('\n')}\n`);
  }

  // Remove all markdown not in keep + outputs
  const finalKeep = new Set([...KEEP, ...OUTPUTS]);
  for (const rel of mdFiles) {
    if (!finalKeep.has(rel)) {
      await rm(path.join(ROOT, rel), { force: true });
    }
  }

  const left = (await walk(ROOT))
    .map((f) => path.relative(ROOT, f).replaceAll('\\\\', '/'))
    .filter((f) => f.endsWith('.md'))
    .sort();

  await mkdir(path.join(ROOT, 'data/knowledge'), { recursive: true });
  await writeFile(path.join(ROOT, 'data/knowledge/markdown-consolidation-report.json'), JSON.stringify({
    generatedAt: new Date().toISOString(),
    keptMarkdownFiles: left,
    count: left.length,
    outputs: OUTPUTS,
  }, null, 2));

  console.log(`Markdown files left: ${left.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
