import { createHash, generateKeyPairSync, sign, verify, randomBytes } from 'node:crypto';

async function getMlDsaImplementation() {
  const module = await import('@noble/post-quantum/ml-dsa');
  // API changes between versions; normalize access.
  return module.ml_dsa65 ?? module.ml_dsa44 ?? module.default;
}

export async function buildSigningEngine(seedMaterial, mode = 'hybrid') {
  const hashed = createHash('sha256').update(seedMaterial).digest('hex');

  const { publicKey: edPublicKey, privateKey: edPrivateKey } = generateKeyPairSync('ed25519');

  let mlDsa = null;
  let mlDsaKeyPair = null;

  if (mode === 'hybrid' || mode === 'mldsa') {
    try {
      mlDsa = await getMlDsaImplementation();
      const seed = randomBytes(32);
      mlDsaKeyPair = mlDsa.keygen(seed);
    } catch (error) {
      if (mode === 'mldsa') {
        throw new Error(
          `ML-DSA mode requested but library initialization failed: ${error instanceof Error ? error.message : 'unknown error'}`,
        );
      }
    }
  }

  const activeAlgorithm =
    mode === 'mldsa' && mlDsa ? 'ML-DSA' : mode === 'ed25519' ? 'Ed25519' : mlDsa ? 'Hybrid(ML-DSA+Ed25519)' : 'Ed25519';

  return {
    profile: {
      requestedMode: mode,
      activeAlgorithm,
      mlDsaProfile: 'ML-DSA-65',
      pqcRoadmap: 'NIST FIPS 204 migration path enabled in runtime',
      keyId: `tamv-sign-${hashed.slice(0, 12)}`,
      mlDsaEnabled: Boolean(mlDsaKeyPair),
    },

    signPayload(payload) {
      const message = Buffer.from(JSON.stringify(payload));
      const ed25519Signature = sign(null, message, edPrivateKey).toString('base64');

      const response = {
        ed25519Signature,
        algorithm: activeAlgorithm,
      };

      if (mlDsa && mlDsaKeyPair) {
        const mlDsaSignature = mlDsa.sign(mlDsaKeyPair.secretKey, message);
        response.mlDsaSignature = Buffer.from(mlDsaSignature).toString('base64');
      }

      return response;
    },

    verifyPayload(payload, signatureEnvelope = {}) {
      const message = Buffer.from(JSON.stringify(payload));

      const edValid = signatureEnvelope.ed25519Signature
        ? verify(
            null,
            message,
            edPublicKey,
            Buffer.from(signatureEnvelope.ed25519Signature, 'base64'),
          )
        : false;

      const mlDsaValid =
        mlDsa &&
        mlDsaKeyPair &&
        signatureEnvelope.mlDsaSignature &&
        mlDsa.verify(
          mlDsaKeyPair.publicKey,
          message,
          Buffer.from(signatureEnvelope.mlDsaSignature, 'base64'),
        );

      return {
        ed25519: edValid,
        mlDsa: Boolean(mlDsaValid),
        valid: activeAlgorithm.startsWith('Hybrid') ? edValid && Boolean(mlDsaValid) : edValid || Boolean(mlDsaValid),
      };
    },

    exportPublicKeyPem() {
      return edPublicKey.export({ type: 'spki', format: 'pem' }).toString();
    },
  };
}
