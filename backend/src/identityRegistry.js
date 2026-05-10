const SCHEMA_CONTEXT = 'https://schema.org';
const DEFAULT_DID_SUFFIX = '7f:001';

const safe = (value, fallback = '') =>
  value ?? fallback;

const normalizeUrl = (base, value) =>
  value ? `${base.replace(/\/$/, '')}/${value}` : null;

const compact = (arr) => arr.filter(Boolean);

const property = (name, value) => ({
  '@type': 'PropertyValue',
  name,
  value,
});

const buildFounderIdentity = ({ founderName, founderAlias }, pids = {}) => ({
  '@type': 'Person',
  name: safe(founderName),
  alternateName: safe(founderAlias),
  sameAs: compact([
    normalizeUrl('https://orcid.org', pids.orcid),
    normalizeUrl('https://zenodo.org/records', pids.zenodoRecord),
  ]),
});

const buildSignatureProperties = (signingProfile = {}) => [
  property('signature.profile', safe(signingProfile.activeAlgorithm)),
  property('signature.pqc.plan', safe(signingProfile.mlDsaProfile)),
  property(
    'signature.pqc.enabled',
    Boolean(signingProfile.mlDsaEnabled),
  ),
];

export function buildOrganizationIdentity(
  config = {},
  signingProfile = {},
) {
  const {
    organization = {},
    pids = {},
  } = config;

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Organization',

    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'ISNI',
      value: safe(pids.isni),
    },

    name: safe(organization.name),
    description: safe(organization.description),

    founder: buildFounderIdentity(organization, pids),

    knowsAbout: [
      'Quantum-Resistant Cryptography',
      'Distributed Identity',
      'System Architecture',
    ],

    additionalProperty: [
      property(
        'division.strategy',
        'Research and Development (R&D)',
      ),
      ...buildSignatureProperties(signingProfile),
    ],
  };
}

const buildVerificationMethod = (
  did,
  {
    keyId = 'key-1',
    type = 'Ed25519VerificationKey2020',
    publicKeyPem = '',
  } = {},
) => ({
  id: `${did}#${keyId}`,
  type,
  controller: did,
  publicKeyPem,
});

export function buildDidDocument(
  config = {},
  suffix = DEFAULT_DID_SUFFIX,
  publicKeyPem = '',
) {
  const {
    did: didConfig = {},
  } = config;

  const did = `did:${safe(didConfig.method)}:${safe(
    didConfig.region,
  )}:${suffix}`;

  const verificationMethod = buildVerificationMethod(did, {
    publicKeyPem,
  });

  return {
    '@context': [
      'https://www.w3.org/ns/did/v1',
    ],

    id: did,

    verificationMethod: [verificationMethod],

    authentication: [verificationMethod.id],
    assertionMethod: [verificationMethod.id],

    service: [
      {
        id: `${did}#resolver`,
        type: 'LinkedDataService',
        serviceEndpoint: safe(didConfig.serviceEndpoint),
      },
    ],
  };
}
