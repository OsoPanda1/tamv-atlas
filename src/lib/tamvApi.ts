export interface AuditMetricFederation {
  id: string;
  name: string;
  nodes: number;
  conceptual: number;
  wiring: number;
  production: number;
}

export interface AuditMetricsResponse {
  checkedAt: string;
  productionAxes: Array<{ axis: string; actual: number; objetivo: number }>;
  legalFrameworks: Array<{ id: string; name: string; coverage: number; status: string; desc?: string }>;
  roadmapPhases: Array<{ fase: string; actual: number; target: number; milestone: string }>;
  riskMatrix: Array<{ id: string; risk: string; impact: string; probability: string; mitigation: string }>;
  federations: AuditMetricFederation[];
}

const backendBaseUrl =
  import.meta.env.VITE_TAMV_BACKEND_URL?.replace(/\/$/, '') ?? 'http://localhost:8080';

export async function fetchAuditMetrics(): Promise<AuditMetricsResponse> {
  const response = await fetch(`${backendBaseUrl}/v1/audit/metrics`);

  if (!response.ok) {
    throw new Error(`Unable to load audit metrics (${response.status})`);
  }

  return response.json() as Promise<AuditMetricsResponse>;
}

export async function signCitizenCredential(citizenId: string) {
  const response = await fetch(`${backendBaseUrl}/v1/signature/sign`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      type: 'utamv.credential',
      data: {
        citizenId,
        credential: 'UTAMV-FOUNDATIONS-2026',
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Signing failed (${response.status})`);
  }

  return response.json();
}

export async function verifyCitizenCredential(payload: unknown, signature: unknown) {
  const response = await fetch(`${backendBaseUrl}/v1/signature/verify`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ payload, signature }),
  });

  if (!response.ok) {
    throw new Error(`Verification failed (${response.status})`);
  }

  return response.json();
}
