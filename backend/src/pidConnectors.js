function normalizeOrcid(orcid) {
  return String(orcid ?? '').trim();
}

function normalizeIsni(isni) {
  return String(isni ?? '')
    .replace(/\s+/g, '')
    .replace(/-/g, '')
    .trim();
}

function toIsoDate(input) {
  if (!input) {
    return null;
  }
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString();
}

async function fetchJson(url, { fetchImpl, headers = {}, timeoutMs = 7000 } = {}) {
  const response = await fetchImpl(url, {
    headers,
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) {
    throw new Error(`Upstream error ${response.status} for ${url}`);
  }

  return response.json();
}

export async function loadOrcidProfile(orcid, { fetchImpl } = {}) {
  const normalized = normalizeOrcid(orcid);
  const baseUrl = `https://pub.orcid.org/v3.0/${normalized}`;

  const [person, works] = await Promise.all([
    fetchJson(`${baseUrl}/person`, {
      fetchImpl,
      headers: { accept: 'application/json' },
    }),
    fetchJson(`${baseUrl}/works`, {
      fetchImpl,
      headers: { accept: 'application/json' },
    }),
  ]);

  const worksGroup = Array.isArray(works?.group) ? works.group : [];
  const lastModified = worksGroup
    .map((group) => {
      const value = group?.['last-modified-date']?.value;
      return typeof value === 'number' ? value : 0;
    })
    .sort((a, b) => b - a)[0];

  return {
    provider: 'orcid',
    id: normalized,
    url: `https://orcid.org/${normalized}`,
    displayName:
      person?.name?.['credit-name']?.value ??
      [person?.name?.['given-names']?.value, person?.name?.['family-name']?.value]
        .filter(Boolean)
        .join(' ') ??
      null,
    worksCount: worksGroup.length,
    lastSyncedAt: lastModified ? toIsoDate(lastModified) : null,
    reachable: true,
  };
}

export async function loadZenodoRecord(recordId, { fetchImpl } = {}) {
  const normalized = String(recordId ?? '').trim();
  const data = await fetchJson(`https://zenodo.org/api/records/${normalized}`, {
    fetchImpl,
    headers: { accept: 'application/json' },
  });

  return {
    provider: 'zenodo',
    id: normalized,
    doi: data?.doi ?? null,
    title: data?.metadata?.title ?? null,
    url: data?.links?.html ?? `https://zenodo.org/records/${normalized}`,
    publishedAt: toIsoDate(data?.metadata?.publication_date),
    reachable: true,
  };
}

export async function loadIsniProfile(isni, { fetchImpl } = {}) {
  const normalized = normalizeIsni(isni);
  const url = `https://isni.org/isni/${normalized}`;

  const response = await fetchImpl(url, {
    method: 'GET',
    redirect: 'follow',
    signal: AbortSignal.timeout(7000),
  });

  if (!response.ok) {
    throw new Error(`Upstream error ${response.status} for ${url}`);
  }

  return {
    provider: 'isni',
    id: normalized,
    url,
    reachable: true,
    note: 'ISNI no expone API pública abierta; la validación se realiza por resolución HTTPS.',
  };
}

function toFailure(provider, id, error) {
  return {
    provider,
    id,
    reachable: false,
    error: error instanceof Error ? error.message : 'Unknown upstream error',
  };
}

export async function loadPidStatus(config, { fetchImpl = globalThis.fetch } = {}) {
  if (typeof fetchImpl !== 'function') {
    throw new Error('Global fetch is required to resolve PIDs');
  }

  const [orcid, zenodo, isni] = await Promise.all([
    loadOrcidProfile(config.pids.orcid, { fetchImpl }).catch((error) =>
      toFailure('orcid', config.pids.orcid, error),
    ),
    loadZenodoRecord(config.pids.zenodoRecord, { fetchImpl }).catch((error) =>
      toFailure('zenodo', config.pids.zenodoRecord, error),
    ),
    loadIsniProfile(config.pids.isni, { fetchImpl }).catch((error) =>
      toFailure('isni', config.pids.isni, error),
    ),
  ]);

  return {
    checkedAt: new Date().toISOString(),
    records: {
      orcid,
      zenodo,
      isni,
    },
  };
}
