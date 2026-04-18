import test from 'node:test';
import assert from 'node:assert/strict';

process.env.NODE_ENV = 'test';
process.env.TAMV_ORCID = '0009-0008-5050-1539';
process.env.TAMV_ZENODO_RECORD = '19436662';
process.env.TAMV_ISNI = 'TAMV-ONLINE-0001';
process.env.TAMV_ORG_NAME = 'TAMV Online - Infraestructura Soberana';
process.env.TAMV_FOUNDER_NAME = 'Edwin Oswaldo Castillo Trejo';
process.env.PORT = '8091';

const { startServer } = await import('../src/server.js');

const server = startServer();
const base = 'http://127.0.0.1:8091';

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

test('GET /healthz returns ok', async () => {
  const response = await fetch(`${base}/healthz`);
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.ok, true);
});

test('sign + verify cycle should be valid', async () => {
  const signRes = await fetch(`${base}/v1/signature/sign`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      type: 'federation.block',
      data: { federation: '7f', impacto_humanista: 0.95 },
    }),
  });

  assert.equal(signRes.status, 201);
  const signed = await signRes.json();

  const verifyRes = await fetch(`${base}/v1/signature/verify`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ payload: signed.payload, signature: signed.signature }),
  });

  assert.equal(verifyRes.status, 200);
  const verification = await verifyRes.json();
  assert.equal(verification.valid, true);
});
