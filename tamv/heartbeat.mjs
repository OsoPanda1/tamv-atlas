import { mkdir, readFile, appendFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { createHash, randomUUID } from 'node:crypto';

const PROTOCOL = 'tamv-federation-v1';
const MANIFEST_PATH = 'tamv/node.manifest.json';
const STATE_DIR = process.env.TAMV_STATE_DIR || '.tamv/state';

function stableHash(value) {
  return createHash('sha256').update(JSON.stringify(sortKeys(value))).digest('hex');
}

function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (!value || typeof value !== 'object') return value;
  return Object.keys(value).sort().reduce((acc, key) => {
    acc[key] = sortKeys(value[key]);
    return acc;
  }, {});
}

function validateManifest(manifest) {
  for (const key of ['protocol', 'nodeId', 'repository', 'role', 'capabilities', 'channels']) {
    if (manifest[key] === undefined) throw new Error(`Missing TAMV manifest field: ${key}`);
  }
  if (manifest.protocol !== PROTOCOL) throw new Error(`Unsupported protocol: ${manifest.protocol}`);
  return manifest;
}

async function appendEvent(event) {
  const path = resolve(STATE_DIR, 'events.jsonl');
  await mkdir(dirname(path), { recursive: true });
  await appendFile(path, `${JSON.stringify(event)}\n`, 'utf8');
  return path;
}

const manifest = validateManifest(JSON.parse(await readFile(MANIFEST_PATH, 'utf8')));
const event = {
  id: randomUUID(),
  protocol: PROTOCOL,
  type: 'NODE_HEARTBEAT',
  source: manifest.nodeId,
  repository: manifest.repository,
  createdAt: new Date().toISOString(),
  payload: {
    health: 'ready',
    role: manifest.role,
    capabilities: manifest.capabilities,
    publishes: manifest.channels.publishes,
    subscribes: manifest.channels.subscribes,
    manifestHash: stableHash(manifest)
  }
};
event.integrity = stableHash(event);
const eventPath = await appendEvent(event);
console.log(JSON.stringify({ status: 'ok', eventPath, event }, null, 2));
