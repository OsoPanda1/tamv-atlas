import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiCode } from "@/components/WikiComponents";

export default function CicdPipelines() {
  return (
    <div>
      <WikiBreadcrumb section="implementacion" page="cicd-pipelines" />
      <WikiH1>CI/CD y Pipelines de Datos</WikiH1>
      <WikiP>
        La capa infra de TAMV se articula sobre MD-X4 (operación) y MD-X5 (evolución). MD-X4 observa, enruta y protege la
        ejecución diaria; MD-X5 valida cambios y promueve versiones con control constitucional técnico.
      </WikiP>

      <WikiH2>MD-X4 / MD-X5 y motor hexagonal</WikiH2>
      <WikiCard title="Cómo opera el núcleo" accent="cyan">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Inventario federado:</strong> 177–195 repos activos con clasificación por criticidad y dominio.</li>
          <li><strong>Motor hexagonal:</strong> criterios de entrada/salida, puertos y adaptadores para evitar acoplamiento fuerte.</li>
          <li><strong>Política de promoción:</strong> sólo se despliega si lint, typecheck, test, build y reglas L1-L9 pasan.</li>
          <li><strong>Observabilidad primero:</strong> cada release exige métricas, trazas y eventos de dominio publicados.</li>
        </ul>
      </WikiCard>

      <WikiCode>{`Pipeline MD-X5 (Deca-V)
1) lint
2) typecheck
3) unit-test
4) integration-test
5) contract-test
6) security-scan
7) sbom/check-licenses
8) build + artifact signing
9) deploy canary
10) post-deploy verification + rollback gate`}</WikiCode>

      <WikiH2>Despliegue del kernel TAMV</WikiH2>
      <WikiP>
        El kernel se despliega en Kubernetes por dominios de negocio (identidad, grafo, eventos, APIs públicas, automatización)
        con separación entre plano de datos y plano de control. El estado recomendado es "event-driven + observabilidad por
        defecto" para facilitar absorción de nuevos nodos territoriales y académicos.
      </WikiP>
      <WikiCode>{`Namespaces: tamv-core, tamv-identity, tamv-events, tamv-observability
Servicios: api-gateway, isni-service, graph-service, vc-service, sync-service
Mensajería: event-bus (webhooks + colas)
Métricas: latency p95, error rate, throughput, trust-score drift
Alertas: SLO breach, backlog growth, schema mismatch, webhook delivery failures`}</WikiCode>

      <WikiCard title="Resultado esperado" accent="green">
        Infraestructura verificable, portable y auditable: preparada para incorporar nodos reales sin romper el núcleo
        semántico ni el contrato operativo entre módulos.
      </WikiCard>
    </div>
  );
}
