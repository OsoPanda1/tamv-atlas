export function buildOrganizationIdentity(config, signingProfile) {
  const orcidUrl = `https://orcid.org/${config.pids.orcid}`;
  const zenodoUrl = `https://zenodo.org/record/${config.pids.zenodoRecord}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'ISNI',
      value: config.pids.isni,
    },
    name: config.organization.name,
    founder: {
      '@type': 'Person',
      name: config.organization.founderName,
      alternateName: config.organization.founderAlias,
      sameAs: [orcidUrl, zenodoUrl],
    },
    description: config.organization.description,
    knowsAbout: [
      'Quantum-Resistant Cryptography',
      'Distributed Identity',
      'System Architecture',
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'division.strategy',
        value: 'Research and Development (R&D)',
      },
      {
        '@type': 'PropertyValue',
        name: 'signature.profile',
        value: signingProfile.activeAlgorithm,
      },
      {
        '@type': 'PropertyValue',
        name: 'signature.pqc.plan',
        value: signingProfile.mlDsaProfile,
      },
    ],
  };
}

export function buildDidDocument(config, suffix = '7f:001', publicKeyPem = '') {
  const did = `did:${config.did.method}:${config.did.region}:${suffix}`;
  return {
    id: did,
    verificationMethod: [
      {
        id: `${did}#key-1`,
        type: 'Ed25519VerificationKey2020',
        controller: did,
        publicKeyPem,
      },
    ],
    service: [
      {
        id: 'isni-resolver',
        type: 'LinkedDataService',
        serviceEndpoint: config.did.serviceEndpoint,
      },
    ],
  };
}
