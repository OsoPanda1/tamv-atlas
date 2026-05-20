#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();

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

async function loadJson(rel) {
  const raw = await readFile(path.join(ROOT, rel), 'utf-8');
  return JSON.parse(raw);
}

function classifyPath(rel) {
  const p = rel.toLowerCase();
  if (p.startsWith('backend/')) return 'backend';
  if (p.startsWith('src/')) return 'frontend';
  if (p.startsWith('scripts/')) return 'automation';
  if (p.startsWith('supabase/')) return 'data';
  if (p.startsWith('federation/')) return 'federation';
  if (p.startsWith('docs/')) return 'knowledge';
  return 'root';
}

async function main() {
  const files = (await walk(ROOT)).map((f) => path.relative(ROOT, f).replaceAll('\\', '/'));
  const mdFiles = files.filter((f) => f.endsWith('.md'));
  const triple = await loadJson('data/federation/osopanda-triple-review-latest.json');
  const consolidation = await loadJson('data/knowledge/markdown-consolidation-report.json');

  const structure = files.reduce((acc, rel) => {
    const area = classifyPath(rel);
    acc[area] ??= 0;
    acc[area] += 1;
    return acc;
  }, {});

  const cycle = {
    schema: 'tamv.ops.review-reformulate-cycle.v1',
    generatedAt: new Date().toISOString(),
    checks: {
      markdownCount: mdFiles.length,
      markdownLimitOk: mdFiles.length <= 6,
      consolidationCountMatches: consolidation.count === mdFiles.length,
      federationReviewPresent: Boolean(triple?.tamvInternalSha),
    },
    structure,
    federation: {
      owner: triple.owner,
      repositories: triple?.totals?.repositories ?? 0,
      federations: triple?.totals?.federations ?? 0,
      tamvInternalSha: triple.tamvInternalSha,
    },
    nextCycle: [
      'run scripts/triple_review_osopanda_repos.mjs',
      'run scripts/consolidate_markdown_canon.mjs',
      'run scripts/review_reformulate_cycle.mjs',
    ],
  };

  const digest = createHash('sha256').update(JSON.stringify(cycle)).digest('hex');
  const output = { ...cycle, cycleSha: digest };

  await mkdir(path.join(ROOT, 'data/ops'), { recursive: true });
  await writeFile(path.join(ROOT, 'data/ops/review-reformulate-cycle-latest.json'), JSON.stringify(output, null, 2));
  console.log(`Cycle report generated: ${digest}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
