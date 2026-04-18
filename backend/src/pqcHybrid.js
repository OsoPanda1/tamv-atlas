import { createHash, generateKeyPairSync, sign, verify } from 'node:crypto';

/**
 * Hybrid signing profile:
 * - Runtime-compatible signature: Ed25519 (available in Node.js core).
 * - PQC readiness fields: mlDsaProfile / pqcRoadmap for governance and future switch.
 */
export function buildSigningEngine(seedMaterial) {
  const hashed = createHash('sha256').update(seedMaterial).digest('hex');
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');

  return {
    profile: {
      activeAlgorithm: 'Ed25519',
      mlDsaProfile: 'ML-DSA-65 (planned)',
      pqcRoadmap: 'NIST FIPS 204 migration path validated in architecture docs',
      keyId: `tamv-ed25519-${hashed.slice(0, 12)}`,
    },

    signPayload(payload) {
      const message = Buffer.from(JSON.stringify(payload));
      const signature = sign(null, message, privateKey);
      return signature.toString('base64');
    },

    verifyPayload(payload, signatureB64) {
      const message = Buffer.from(JSON.stringify(payload));
      return verify(
        null,
        message,
        publicKey,
        Buffer.from(signatureB64, 'base64'),
      );
    },

    exportPublicKeyPem() {
      return publicKey.export({ type: 'spki', format: 'pem' }).toString();
    },
  };
}
