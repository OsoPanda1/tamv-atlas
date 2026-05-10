export interface AuditMetricFederation {
  id: string;
  name: string;
  nodes: number;
  conceptual: number;
  wiring: number;
  production: number;
}


export interface ResearchDossierResponse {
  id: string;
  version: string;
  title: string;
  executiveSummary: string;
  claims: Array<{
    claim: string;
    source: string;
    verification: "self_reported" | "externally_visible" | "not_verified";
    notes: string;
  }>;
  pendingChecks: Array<{ priority: "high" | "medium" | "low"; task: string }>;
  recommendations: string[];
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


export async function fetchResearchDossier(): Promise<ResearchDossierResponse> {
  const response = await fetch(`${backendBaseUrl}/v1/research/nodo-001`);

  if (!response.ok) {
    throw new Error(`Unable to load research dossier (${response.status})`);
  }

  return response.json() as Promise<ResearchDossierResponse>;
}

export interface RepoFusionPlan {
  generated_at_utc: string;
  owner: string;
  repo_count: number;
  repos: Array<{
    name: string;
    default_branch: string;
    html_url: string;
    import_prefix: string;
  }>;
}

export async function requestFusionPlan(owner = 'OsoPanda1'): Promise<RepoFusionPlan> {
  const response = await fetch(`${backendBaseUrl}/v1/fusion/plan`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ owner }),
  });
  if (!response.ok) throw new Error(`Fusion plan failed (${response.status})`);
  return response.json() as Promise<RepoFusionPlan>;
}

export async function runRepoFusion(owner = 'OsoPanda1') {
  const response = await fetch(`${backendBaseUrl}/v1/fusion/run`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ owner }),
  });
  if (!response.ok) throw new Error(`Fusion run failed (${response.status})`);
  return response.json();
}
