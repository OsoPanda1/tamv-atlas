import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function Herramientas() {
  return (
    <div>
      <WikiBreadcrumb section="automatizacion" page="herramientas" />
      <WikiH1>Herramientas de Mantenimiento del Grafo</WikiH1>
      <WikiP>Utilidades para refactoring del grafo: detección de nodos huérfanos, resolución de duplicados, migración de esquemas, validación de consistencia de PIDs, y generación de reportes de cobertura del grafo (qué porcentaje de entidades tienen ORCID, DOI, DID).</WikiP>
    </div>
  );
}
