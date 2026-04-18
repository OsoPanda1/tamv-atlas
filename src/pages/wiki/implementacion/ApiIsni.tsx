import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiCode } from "@/components/WikiComponents";

export default function ApiIsni() {
  return (
    <div>
      <WikiBreadcrumb section="implementacion" page="api-isni" />
      <WikiH1>API ISNI y Endpoints</WikiH1>
      <WikiP>
        La capa ISNI/SNI se expone como una API orientada a identidad, verificación y trazabilidad de relaciones. Su objetivo
        no es solo "leer perfiles", sino materializar soberanía digital en servicios interoperables con ORCID, DOI, ROR,
        SSI/DID y sistemas territoriales TAMV.
      </WikiP>

      <WikiH2>Contrato de API (v1)</WikiH2>
      <WikiCard title="Dominios funcionales" accent="cyan">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Identidad:</strong> perfiles de persona, organización, territorio y proyecto.</li>
          <li><strong>Resolución:</strong> mapeo entre ISNI, DID, ORCID, DOI y ROR con prioridad por confianza.</li>
          <li><strong>Credenciales:</strong> verificación de VC y emisión de comprobantes firmados.</li>
          <li><strong>Trazabilidad:</strong> consulta de relaciones y eventos históricos de cambios.</li>
        </ul>
      </WikiCard>

      <WikiCode>{`GET    /api/profiles/:id
GET    /api/resolve/:identifier
POST   /api/credentials/verify
POST   /api/credentials/issue
GET    /api/graph/:id/relations
GET    /api/events?entity=:id&from=:isoDate
GET    /api/msr
POST   /api/msr
GET    /api/bookpi
POST   /api/bookpi`}</WikiCode>

      <WikiCard title="Estado actual implementado en este repositorio" accent="green">
        Endpoints productivos ya operativos: <code>GET /healthz</code>, <code>GET /v1/identity/org</code>,
        <code>GET /v1/identity/did/:suffix</code>, <code>GET /v1/pids/status</code>, <code>POST /v1/signature/sign</code> y
        <code>POST /v1/signature/verify</code>.
      </WikiCard>

      <WikiH2>Modelo de datos mínimo (persistencia)</WikiH2>
      <WikiP>
        En base de datos, ISNI/SNI se representa como un núcleo de entidades y vínculos. El patrón recomendado combina
        almacenamiento documental para perfiles y almacenamiento orientado a grafo para relaciones, con eventos inmutables
        para auditoría de cambios.
      </WikiP>
      <WikiCode>{`EntityProfile(id, type, displayName, identifiers[], trustScore, metadata)
IdentifierLink(id, entityId, scheme, value, source, confidence, verifiedAt)
Relationship(id, fromEntityId, toEntityId, relationType, weight, provenance)
CredentialRecord(id, holderDid, issuerDid, vcType, status, hash, issuedAt)
DomainEvent(id, entityId, eventType, payload, actor, createdAt)`}</WikiCode>

      <WikiCard title="Criterios operativos ISNI/SNI" accent="green">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Consistencia:</strong> cada entidad mantiene identificador canónico y alias trazables.</li>
          <li><strong>Reproducibilidad:</strong> toda resolución debe incluir fuente y nivel de confianza.</li>
          <li><strong>Auditabilidad:</strong> cada mutación de perfil genera un evento firmado y fechable.</li>
          <li><strong>Interoperabilidad:</strong> payloads JSON-LD para consumo semántico entre módulos.</li>
        </ul>
      </WikiCard>

      <WikiH2>Arquitectura backend federada propuesta</WikiH2>
      <WikiP>
        El backend operativo que acompaña esta wiki se organiza como federación de servicios: <strong>auth</strong>,
        <strong> atlas-content</strong> e <strong>isni-identity</strong>, compartiendo PostgreSQL por esquemas (<code>auth</code>,
        <code>atlas</code>, <code>identity</code>) y controlando acceso por JWT y rol mínimo requerido por artículo o recurso.
      </WikiP>

      <WikiCode>{`backend/
  common/core/config.py
  common/core/db.py
  auth/app/{main,models,security,routes}.py
  atlas-content/app/{main,models,routes_public,routes_secure}.py
  isni-identity/app/{main,models,routes}.py

ROLE_ORDER = ["ciudadano", "dev", "empresario", "academia", "gobierno", "admin"]

GET  /atlas/modules
GET  /atlas/articles/summary
GET  /secure/atlas/articles/:slug
POST /auth/register
POST /auth/token`}</WikiCode>
    </div>
  );
}
