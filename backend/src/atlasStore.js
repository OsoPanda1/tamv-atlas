import { randomUUID } from 'node:crypto';

async function supabaseRequest(config, path, { method = 'GET', body } = {}) {
  const res = await fetch(`${config.supabaseUrl}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: config.supabaseServiceRoleKey,
      authorization: `Bearer ${config.supabaseServiceRoleKey}`,
      'content-type': 'application/json',
      prefer: 'return=representation',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`Supabase REST error ${res.status}: ${await res.text()}`);
  }
  if (res.status === 204) return [];
  return res.json();
}

export class AtlasStore {
  constructor(config) {
    if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
      throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for AtlasStore persistence');
    }
    this.config = config;
    this.xrListeners = new Set();
    this.signalingListeners = new Set();
  }

  async init() {}

  async createUser({ handle, displayName }) {
    const rows = await supabaseRequest(this.config, 'atlas_users', {
      method: 'POST',
      body: [{ id: randomUUID(), handle, display_name: displayName }],
    });
    return rows[0];
  }

  async listUsers() {
    return supabaseRequest(this.config, 'atlas_users?select=id,handle,display_name,created_at&order=created_at.desc&limit=500');
  }

  async recordProtocolExecution(input) {
    const rows = await supabaseRequest(this.config, 'atlas_protocols', {
      method: 'POST',
      body: [{
        id: randomUUID(),
        protocol_id: input.protocolId,
        actor_id: input.actorId,
        selected_path: input.selectedPath,
        evaluated_paths: input.evaluatedPaths,
        collapsed_at: input.collapsedAt,
      }],
    });
    return rows[0];
  }

  async recordEconomyEntry({ userId, amount, reason, kind }) {
    const rows = await supabaseRequest(this.config, 'atlas_ledger', {
      method: 'POST',
      body: [{ id: randomUUID(), user_id: userId, amount, reason, kind }],
    });
    return rows[0];
  }

  async publishXrEvent(eventType, payload) {
    const rows = await supabaseRequest(this.config, 'atlas_xr_events', {
      method: 'POST',
      body: [{ id: randomUUID(), event_type: eventType, payload }],
    });
    const event = rows[0];
    for (const listener of this.xrListeners) listener(event);
    return event;
  }

  onXrEvent(listener) { this.xrListeners.add(listener); return () => this.xrListeners.delete(listener); }

  async createSignal(msg) {
    const rows = await supabaseRequest(this.config, 'atlas_webrtc_signals', {
      method: 'POST',
      body: [{ id: randomUUID(), room_id: msg.roomId, sender_id: msg.senderId, target_id: msg.targetId ?? null, signal_type: msg.signalType, payload: msg.payload ?? {} }],
    });
    const signal = rows[0];
    for (const listener of this.signalingListeners) listener(signal);
    return signal;
  }

  onSignal(listener) { this.signalingListeners.add(listener); return () => this.signalingListeners.delete(listener); }
}
