import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { IdNvidaService } from "@/core/identity/idnvida.service";
import { SocialService } from "@/core/social/social.service";
import { InternalLedger } from "@/core/economy/ledger.internal";
import { EconomyService } from "@/core/economy/economy.service";
import { DreamspacesService } from "@/core/xr/dreamspaces.service";
import { MsrEngine } from "@/core/memory/msr.engine";
import { BookPi } from "@/core/memory/bookpi";
import { EoctService } from "@/core/eoct/eoct.service";
import { ProtocolMsrAdapter } from "@/core/protocol/protocol.msr.adapter";
import { ProtocolBookPiAdapter } from "@/core/protocol/protocol.bookpi.adapter";
import { ProtocolEngine } from "@/core/protocol/protocol.engine";
import { ProtocolOrchestrator } from "@/core/protocol/protocol.orchestrator";
import { HttpJsonResponse, HttpRequestBody } from "./http.types";

const identity = new IdNvidaService();
const social = new SocialService();
const economy = new EconomyService(new InternalLedger());
const xr = new DreamspacesService();
const protocol = new ProtocolOrchestrator(
  new ProtocolEngine(new EoctService(), new ProtocolMsrAdapter(new MsrEngine()), new ProtocolBookPiAdapter(new BookPi())),
);

async function parseBody(req: IncomingMessage): Promise<HttpRequestBody> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  if (!chunks.length) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); } catch { return {}; }
}

function send<T>(res: ServerResponse, status: number, body: HttpJsonResponse<T>) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

export function createTamvServer(port = 4080) {
  const server = createServer(async (req, res) => {
    const method = req.method ?? "GET";
    const url = req.url ?? "/";
    const body = await parseBody(req);

    if (method === "GET" && url === "/health") return send(res, 200, { ok: true, data: { service: "tamv-core-backend", status: "up" } });

    if (method === "POST" && url === "/auth/signup") {
      const user = identity.signup(String(body.email ?? ""), String(body.password ?? ""));
      return send(res, 201, { ok: true, data: user });
    }

    if (method === "POST" && url === "/auth/login") {
      const out = identity.login(String(body.email ?? ""), String(body.password ?? ""));
      if (!out) return send(res, 401, { ok: false, error: "Credenciales inválidas" });
      return send(res, 200, { ok: true, data: out });
    }

    if (method === "POST" && url === "/social/posts") {
      const post = social.createPost(String(body.authorId ?? ""), String(body.content ?? ""));
      return send(res, 201, { ok: true, data: post });
    }

    if (method === "GET" && url === "/social/posts") return send(res, 200, { ok: true, data: social.listPosts() });

    if (method === "POST" && url === "/economy/allocate") {
      const entry = economy.allocateMonthlyCredits(String(body.accountId ?? ""), "free");
      return send(res, 201, { ok: true, data: entry });
    }

    if (method === "POST" && url === "/xr/dreamspaces") {
      const space = xr.create(String(body.name ?? ""), String(body.ownerId ?? ""), Boolean(body.isPublic ?? false));
      return send(res, 201, { ok: true, data: space });
    }

    if (method === "POST" && url === "/protocols/run") {
      const result = protocol.run({
        protocolId: String(body.protocolId ?? "p0"),
        action: String(body.action ?? "noop"),
        actorId: String(body.actorId ?? "system"),
        context: (body.context as Record<string, unknown>) ?? {},
      });
      return send(res, 200, { ok: true, data: result });
    }

    return send(res, 404, { ok: false, error: "Ruta no encontrada" });
  });

  return {
    start: () => new Promise<void>((resolve) => server.listen(port, () => resolve())),
    stop: () => new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve()))),
    port,
  };
}
