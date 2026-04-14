import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiCode } from "@/components/WikiComponents";

export default function WebhooksEventos() {
  return (
    <div>
      <WikiBreadcrumb section="implementacion" page="webhooks-eventos" />
      <WikiH1>Webhooks y Eventos del Grafo</WikiH1>
      <WikiP>
        El grafo ISNI emite eventos de dominio cuando se crean, actualizan o vinculan perfiles. Esta capa es el puente entre
        Atlas documental y Atlas operativo: cada cambio semántico puede activar flujos técnicos en tiempo casi real.
      </WikiP>

      <WikiH2>Catálogo de eventos principales</WikiH2>
      <WikiCode>{`identity.created
identity.updated
identity.linked
credential.issued
credential.revoked
publication.indexed
relationship.changed
node.onboarded
node.health.degraded`}</WikiCode>

      <WikiCard title="Buenas prácticas de entrega" accent="orange">
        <ul className="list-disc list-inside space-y-1">
          <li>Reintentos exponenciales con idempotency key por evento.</li>
          <li>Firmado de payload + timestamp para validación de origen.</li>
          <li>Versionado de esquema para cambios compatibles en consumidores.</li>
          <li>DLQ y replay controlado para evitar pérdida de eventos críticos.</li>
        </ul>
      </WikiCard>
    </div>
  );
}
