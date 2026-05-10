const SOURCE = 'tamv-identity-api';

const FEDERATION_BASE = Object.freeze([
  { id: 'FED-01', name: 'ISNI / Identidad Soberana', nodes: 128, conceptual: 92, wiring: 70, production: 68 },
  { id: 'FED-02', name: 'MD-X Kernel Operativo', nodes: 256, conceptual: 86, wiring: 62, production: 58 },
  { id: 'FED-03', name: 'Isabella Villaseñor AI', nodes: 64, conceptual: 82, wiring: 57, production: 54 },
  { id: 'FED-04', name: 'UTAMV Academia', nodes: 192, conceptual: 88, wiring: 66, production: 61 },
  { id: 'FED-05', name: 'RDM Territorial', nodes: 320, conceptual: 85, wiring: 60, production: 56 },
  { id: 'FED-06', name: 'BookPI / Ética', nodes: 80, conceptual: 80, wiring: 55, production: 52 },
  { id: 'FED-07', name: 'Integración Global', nodes: 224, conceptual: 83, wiring: 64, production: 60 },
]);

const clamp = (value, min = 0, max = 100) =>
  Math.min(max, Math.max(min, value));

const toPercent = (part, total) =>
  total > 0 ? clamp(Math.round((part / total) * 100)) : 0;

const computePidFormatScore = (formatValidation = {}) => {
  const values = Object.values(formatValidation);
  return toPercent(values.filter(Boolean).length, values.length);
};

const enhanceFederation = (federation, pidFormatScore, pidPassed) => {
  if (federation.id !== 'FED-01') return federation;

  return {
    ...federation,
    wiring: Math.max(federation.wiring, pidFormatScore),
    production: pidPassed
      ? Math.max(federation.production, 75)
      : federation.production,
  };
};

export function buildAuditMetrics({
  pidReport = {},
  signingProfile = {},
} = {}) {
  const {
    formatValidation = {},
    passed = false,
  } = pidReport;

  const {
    mlDsaEnabled = false,
  } = signingProfile;

  const pidFormatScore = computePidFormatScore(formatValidation);

  return {
    checkedAt: new Date().toISOString(),
    source: SOURCE,
    signing: signingProfile,
    pidReport,

    productionAxes: [
      { axis: 'Frontend Atlas', actual: 70, objetivo: 90 },
      { axis: 'Integración Backend', actual: 65, objetivo: 85 },
      { axis: 'Infra Endurecida', actual: 62, objetivo: 85 },
      { axis: 'Documentación', actual: 78, objetivo: 90 },
      { axis: 'Testing/QA', actual: 60, objetivo: 85 },
      { axis: 'Seguridad/PQC', actual: mlDsaEnabled ? 72 : 58, objetivo: 95 },
      { axis: 'Observabilidad', actual: 54, objetivo: 85 },
    ],

    legalFrameworks: [
      { id: 'UNESCO-AI', name: 'UNESCO AI Ethics', coverage: 68, status: 'in_progress' },
      { id: 'GDPR', name: 'GDPR / RGPD', coverage: 72, status: 'in_progress' },
      { id: 'ICCPR', name: 'ICCPR', coverage: 81, status: 'active' },
      { id: 'UNDRIP', name: 'UNDRIP', coverage: 59, status: 'in_progress' },
    ],

    roadmapPhases: [
      { fase: 'Q2 2026', actual: 65, target: 75, milestone: 'Integración backend + auditoría real' },
      { fase: 'Q3 2026', actual: 42, target: 82, milestone: 'Staging K8s + observabilidad' },
      { fase: 'Q4 2026', actual: 20, target: 90, milestone: 'Release productivo multi-federación' },
    ],

    riskMatrix: [
      {
        id: 'R-01',
        risk: 'Deriva documental PID',
        impact: 'ALTO',
        probability: passed ? 'BAJA' : 'MEDIA',
        mitigation: 'CronJob de reconciliación DOI/ORCID/ISNI',
      },
      {
        id: 'R-02',
        risk: 'PQC no disponible en runtime',
        impact: 'ALTO',
        probability: mlDsaEnabled ? 'BAJA' : 'MEDIA',
        mitigation: 'Modo hybrid + validación de dependencia en CI',
      },
    ],

    federations: FEDERATION_BASE.map((f) =>
      enhanceFederation(f, pidFormatScore, passed)
    ),
  };
}
