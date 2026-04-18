const ORCID_REGEX = /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/;

export function validatePidFormat({ isni, orcid, zenodoRecord, doiPrefix }) {
  return {
    isni: Boolean(isni && isni.length >= 8),
    orcid: ORCID_REGEX.test(orcid),
    zenodoRecord: /^\d+$/.test(String(zenodoRecord)),
    doiPrefix: /^10\.\d{4,9}$/.test(doiPrefix),
  };
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { accept: 'application/json' },
    });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

export async function reconcilePids(config) {
  const formatValidation = validatePidFormat(config.pids);

  const [orcidResult, zenodoResult] = await Promise.allSettled([
    fetchWithTimeout(`https://pub.orcid.org/v3.0/${config.pids.orcid}/person`, config.pids.reconcileTimeoutMs),
    fetchWithTimeout(`https://zenodo.org/api/records/${config.pids.zenodoRecord}`, config.pids.reconcileTimeoutMs),
  ]);

  const online = {
    orcid:
      orcidResult.status === 'fulfilled'
        ? { reachable: orcidResult.value.ok, status: orcidResult.value.status }
        : { reachable: false, error: String(orcidResult.reason) },
    zenodo:
      zenodoResult.status === 'fulfilled'
        ? { reachable: zenodoResult.value.ok, status: zenodoResult.value.status }
        : { reachable: false, error: String(zenodoResult.reason) },
  };

  const passed =
    Object.values(formatValidation).every(Boolean) &&
    online.orcid.reachable &&
    online.zenodo.reachable;

  return {
    checkedAt: new Date().toISOString(),
    formatValidation,
    online,
    passed,
  };
}
