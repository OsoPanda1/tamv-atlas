import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { config } from './config.js';
import { buildSigningEngine } from './pqcHybrid.js';
import { buildDidDocument, buildOrganizationIdentity } from './identityRegistry.js';
import { reconcilePids } from './pidReconciler.js';
import { buildAuditMetrics } from './auditMetrics.js';
import { buildNodo001ResearchDossier } from './researchDossier.js';

const signingEngine = await buildSigningEngine(config.signing.seed, config.signing.mode);
const orgIdentity = buildOrganizationIdentity(config, signingEngine.profile);

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
    'access-control-allow-headers': 'content-type,authorization',
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
      signingMode: signingEngine.profile.activeAlgorithm,
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
      const verification = signingEngine.verifyPayload(body.payload, body.signature);
      return writeJson(res, 200, {
        ...verification,
        checkedAt: new Date().toISOString(),
      });
    } catch (error) {
      return writeJson(res, 400, {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }



  if (req.method === 'GET' && url.pathname === '/v1/research/nodo-001') {
    return writeJson(res, 200, buildNodo001ResearchDossier());
  }

  if (req.method === 'GET' && url.pathname === '/v1/audit/metrics') {
    try {
      const pidReport = await reconcilePids(config);
      const metrics = buildAuditMetrics({
        pidReport,
        signingProfile: signingEngine.profile,
      });
      return writeJson(res, 200, metrics);
    } catch (error) {
      return writeJson(res, 500, {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  if (req.method === 'POST' && url.pathname === '/v1/pids/reconcile') {
    try {
      const report = await reconcilePids(config);
      return writeJson(res, report.passed ? 200 : 503, report);
    } catch (error) {
      return writeJson(res, 500, {
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
