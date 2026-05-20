import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { config } from './config.js';
import { buildSigningEngine } from './pqcHybrid.js';
import { buildDidDocument, buildOrganizationIdentity } from './identityRegistry.js';
import { loadPidStatus } from './pidConnectors.js';
import { discoverFusionPlan, executeFusion } from './repoFusionService.js';
import { createIsabellaEngine } from './isabellaEngine.js';

const signingEngine = buildSigningEngine(config.signing.seed);
const orgIdentity = buildOrganizationIdentity(config, signingEngine.profile);
const isabellaEngine = createIsabellaEngine();

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!data) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(data));
      } catch {
        reject(new Error('Invalid JSON payload'));
      }
    });
  });
}

function writeJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'content-type',
  });
  res.end(JSON.stringify(payload));
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    return writeJson(res, 200, { ok: true });
  }

  if (req.method === 'GET' && url.pathname === '/healthz') {
    return writeJson(res, 200, {
      ok: true,
      service: 'tamv-identity-api',
      environment: config.environment,
      timestamp: new Date().toISOString(),
    });
  }

  if (req.method === 'GET' && url.pathname === '/v1/identity/org') {
    return writeJson(res, 200, orgIdentity);
  }

  if (req.method === 'GET' && url.pathname.startsWith('/v1/identity/did/')) {
    const suffix = url.pathname.replace('/v1/identity/did/', '');
    const didDocument = buildDidDocument(
      config,
      suffix,
      signingEngine.exportPublicKeyPem(),
    );
    return writeJson(res, 200, didDocument);
  }

  if (req.method === 'GET' && url.pathname === '/v1/pids/status') {
    try {
      const data = await loadPidStatus(config);
      return writeJson(res, 200, data);
    } catch (error) {
      return writeJson(res, 502, {
        error: error instanceof Error ? error.message : 'PID upstream error',
      });
    }
  }


  if (req.method === 'POST' && url.pathname === '/v1/fusion/plan') {
    try {
      const body = await parseJsonBody(req);
      const plan = await discoverFusionPlan(body.owner ?? 'OsoPanda1');
      return writeJson(res, 200, plan);
    } catch (error) {
      return writeJson(res, 502, {
        error: error instanceof Error ? error.message : 'Fusion plan failed',
      });
    }
  }

  if (req.method === 'POST' && url.pathname === '/v1/fusion/run') {
    try {
      const body = await parseJsonBody(req);
      const result = await executeFusion(body.owner ?? 'OsoPanda1');
      return writeJson(res, 200, result);
    } catch (error) {
      return writeJson(res, 502, {
        error: error instanceof Error ? error.message : 'Fusion execution failed',
      });
    }
  }



  if (req.method === 'POST' && url.pathname === '/api/v1/chat') {
    try {
      const body = await parseJsonBody(req);
      return writeJson(res, 200, isabellaEngine.chat(body));
    } catch (error) {
      return writeJson(res, 400, { error: error instanceof Error ? error.message : 'Invalid request' });
    }
  }

  if (req.method === 'POST' && url.pathname === '/api/v1/vision') {
    const body = await parseJsonBody(req);
    return writeJson(res, 200, isabellaEngine.vision(body));
  }

  if (req.method === 'POST' && url.pathname === '/api/v1/audio') {
    const body = await parseJsonBody(req);
    return writeJson(res, 200, isabellaEngine.audio(body));
  }

  if (req.method === 'POST' && url.pathname === '/api/v1/haptics') {
    try {
      const body = await parseJsonBody(req);
      return writeJson(res, 200, isabellaEngine.haptics(body));
    } catch (error) {
      return writeJson(res, 400, { error: error instanceof Error ? error.message : 'Invalid request' });
    }
  }

  if (req.method === 'POST' && url.pathname === '/api/v1/ledger/events') {
    const body = await parseJsonBody(req);
    return writeJson(res, 201, { event: isabellaEngine.registerLedgerEvent(body) });
  }

  if (req.method === 'GET' && url.pathname.startsWith('/api/v1/ledger/events/')) {
    const id = url.pathname.replace('/api/v1/ledger/events/', '');
    const event = isabellaEngine.getLedgerEvent(id);
    if (!event) {
      return writeJson(res, 404, { error: 'Ledger event not found', id });
    }
    return writeJson(res, 200, { event });
  }

  if (req.method === 'GET' && url.pathname === '/api/v1/plugins') {
    return writeJson(res, 200, { plugins: isabellaEngine.listPlugins() });
  }

  if (req.method === 'POST' && url.pathname === '/api/v1/plugins/install') {
    try {
      const body = await parseJsonBody(req);
      return writeJson(res, 201, { plugin: isabellaEngine.installPlugin(body.id) });
    } catch (error) {
      return writeJson(res, 400, { error: error instanceof Error ? error.message : 'Invalid request' });
    }
  }

  if (req.method === 'POST' && url.pathname === '/v1/signature/sign') {
    try {
      const body = await parseJsonBody(req);
      const payload = {
        id: randomUUID(),
        type: body.type ?? 'tamv.block',
        issuedAt: new Date().toISOString(),
        data: body.data ?? {},
      };
      const signature = signingEngine.signPayload(payload);
      return writeJson(res, 201, {
        payload,
        signature,
        profile: signingEngine.profile,
      });
    } catch (error) {
      return writeJson(res, 400, {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  if (req.method === 'POST' && url.pathname === '/v1/signature/verify') {
    try {
      const body = await parseJsonBody(req);
      const valid = signingEngine.verifyPayload(body.payload, body.signature);
      return writeJson(res, 200, {
        valid,
        checkedAt: new Date().toISOString(),
      });
    } catch (error) {
      return writeJson(res, 400, {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  return writeJson(res, 404, {
    error: 'Not found',
    path: url.pathname,
  });
});

export function startServer() {
  server.listen(config.port, config.host, () => {
    // eslint-disable-next-line no-console
    console.log(
      `TAMV Identity API running on http://${config.host}:${config.port} (${config.environment})`,
    );
  });
  return server;
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}
