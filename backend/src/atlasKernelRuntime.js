import { randomUUID } from 'node:crypto';

const now = () => new Date().toISOString();

export class AtlasKernelRuntime {
  postLedger(userId, amount, reason) {
    return {
      id: `ldg_${randomUUID().replace(/-/g, '')}`,
      userId,
      amount,
      reason,
      kind: amount >= 0 ? 'credit' : 'debit',
      createdAt: now(),
    };
  }

  createUser(handle, displayName) {
    return {
      id: `usr_${randomUUID().replace(/-/g, '')}`,
      handle,
      displayName,
      roles: ['citizen'],
      memberships: ['free'],
      createdAt: now(),
    };
  }

  executeProtocol(protocolId, actorId, paths) {
    if (!paths?.length) throw new Error('No protocol paths');
    const ranked = [...paths].sort((a, b) => (b.score - b.ethicalRisk * 2) - (a.score - a.ethicalRisk * 2));
    return {
      protocolId,
      phase: 'active',
      selectedPath: ranked[0],
      evaluatedPaths: ranked,
      collapsedAt: now(),
      actorId,
    };
  }
}
