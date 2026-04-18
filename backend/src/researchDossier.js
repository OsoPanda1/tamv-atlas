export function buildNodo001ResearchDossier() {
  return {
    id: 'tamv-rd-nodo-001-genesis',
    version: '2026-04-18',
    title: 'Informe de investigación: TAMV Online Network y Nodo 001 (Génesis)',
    scope: {
      project: 'TAMV Online Network',
      founder: 'Edwin Oswaldo Castillo Trejo (Anubis Villaseñor)',
      location: 'Mineral del Monte, Hidalgo, México',
    },
    executiveSummary:
      'La mayoría de afirmaciones técnicas del ecosistema TAMV permanecen en estado auto-reportado; se requiere evidencia externa para elevar nivel de verificabilidad.',
    claims: [
      {
        claim: 'Ecosistema civilizatorio TAMV Online',
        source: 'Sitio oficial TAMV',
        verification: 'self_reported',
        notes: 'Descripción institucional disponible públicamente.',
      },
      {
        claim: 'Fundador único: Edwin O. Castillo Trejo',
        source: 'Sitio oficial TAMV / perfiles públicos',
        verification: 'self_reported',
        notes: 'Consistencia entre perfiles institucionales.',
      },
      {
        claim: 'Afiliación en Frontiers/Loop',
        source: 'Perfil público Frontiers Loop',
        verification: 'externally_visible',
        notes: 'Existe perfil con afiliación TAMV reportada.',
      },
      {
        claim: 'Red de 195 nodos + hashes cuánticos',
        source: 'Materiales internos TAMV (blog/docs)',
        verification: 'not_verified',
        notes: 'No se encontró verificación técnica externa reproducible.',
      },
      {
        claim: 'IA Isabella de gobernanza ética',
        source: 'Materiales TAMV',
        verification: 'not_verified',
        notes: 'Se requiere demo auditable o repositorio público.',
      },
    ],
    pendingChecks: [
      {
        priority: 'high',
        task: 'Validar ORCID 0009-0008-5050-1539 y DOI 10.5281/zenodo.19411506',
      },
      {
        priority: 'high',
        task: 'Auditar instancia Supabase (tablas nodes_ring, financial_ledger, etc.)',
      },
      {
        priority: 'medium',
        task: 'Identificar repos de Edge Functions en GitHub OsoPanda1',
      },
      {
        priority: 'medium',
        task: 'Revisar Groups.io y LinkedIn para evidencia de despliegues',
      },
      {
        priority: 'low',
        task: 'Buscar menciones externas en academia/prensa de TAMV y RDM Digital',
      },
    ],
    recommendations: [
      'Publicar repositorios auditables bajo licencia abierta.',
      'Distinguir claramente visión/roadmap versus funcionalidades verificadas.',
      'Aportar PoCs públicas para validar métricas 20/30/50 e identidad soberana.',
      'Fortalecer evaluación legal y de ciberseguridad antes de operación comercial.',
    ],
  };
}
