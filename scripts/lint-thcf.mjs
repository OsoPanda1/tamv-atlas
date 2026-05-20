#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
const config = JSON.parse(await readFile('data/config/gateway-config.json', 'utf8'));
const threshold = Number(config.THCF_COHERENCE_THRESHOLD);
if (!Number.isFinite(threshold) || threshold < 0.6 || threshold > 1) {
  console.error(`THCF_COHERENCE_THRESHOLD invalid: ${threshold}`);
  process.exit(1);
}
console.log(`THCF threshold ok: ${threshold}`);
