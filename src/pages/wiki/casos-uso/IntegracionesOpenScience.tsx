import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function IntegracionesOpenScience() {
  return (
    <div>
      <WikiBreadcrumb section="casos-uso" page="integraciones-open-science" />
      <WikiH1>Integraciones con Zenodo, OpenAIRE, Frontiers</WikiH1>
      <WikiP>
        TAMV publica en Zenodo bajo licencia CC BY 4.0 con DOIs resolubles. Los trabajos se indexan automáticamente en OpenAIRE. El perfil del investigador en Frontiers Loop conecta con el grafo europeo de ciencia abierta.
      </WikiP>
      <WikiCard accent="cyan">
        La comunidad Zenodo tamvonline-oficial agrupa toda la producción intelectual.
      </WikiCard>
    </div>
  );
}
