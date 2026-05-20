#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });
const schema = JSON.parse(await readFile('schemas/json/gatewayConfig.schema.json', 'utf8'));
const validate = ajv.compile(schema);
const raw = await readFile('data/config/gateway-config.json', 'utf8');
const data = JSON.parse(raw);

if (!validate(data)) {
  console.error(validate.errors);
  process.exit(1);
}

const withoutChecksum = { ...data, checksum: 'sha256:pending' };
const hash = createHash('sha256').update(JSON.stringify(withoutChecksum)).digest('hex');
const next = { ...data, checksum: `sha256:${hash}` };
await writeFile('data/config/gateway-config.json', `${JSON.stringify(next, null, 2)}\n`);
console.log('schema valid and checksum updated');
