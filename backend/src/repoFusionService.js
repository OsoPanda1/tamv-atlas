import { promisify } from 'node:util';
import { execFile } from 'node:child_process';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = resolve(process.cwd(), 'scripts/unify_osopanda_repos.sh');
const MANIFEST_PATH = resolve(process.cwd(), 'docs/repo-unification-manifest.json');

export async function discoverFusionPlan(owner = 'OsoPanda1') {
  const args = ['--owner', owner, '--import-mode', 'none', '--manifest', MANIFEST_PATH];
  await execFileAsync(SCRIPT_PATH, args, { cwd: process.cwd(), timeout: 120_000, maxBuffer: 1024 * 1024 * 4 });
  const manifestRaw = await readFile(MANIFEST_PATH, 'utf-8');
  return JSON.parse(manifestRaw);
}

export async function executeFusion(owner = 'OsoPanda1') {
  const args = ['--owner', owner, '--import-mode', 'squash', '--manifest', MANIFEST_PATH];
  const { stdout, stderr } = await execFileAsync(SCRIPT_PATH, args, {
    cwd: process.cwd(),
    timeout: 1000 * 60 * 30,
    maxBuffer: 1024 * 1024 * 16,
  });

  return {
    ok: true,
    stdout,
    stderr,
    manifestPath: MANIFEST_PATH,
  };
}
