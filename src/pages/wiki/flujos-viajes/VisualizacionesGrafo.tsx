import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function VisualizacionesGrafo() {
  return (
    <div>
      <WikiBreadcrumb section="flujos-viajes" page="visualizaciones-grafo" />
      <WikiH1>Visualizaciones del Grafo ISNI</WikiH1>
      <WikiP>El grafo de conocimiento TAMV conecta todas las entidades en una red semántica navegable. Las visualizaciones incluyen mapas de relaciones entre personas y organizaciones, árboles de dependencia de proyectos, grafos territoriales con nodos de servicio, y dashboards de métricas del ecosistema.</WikiP>
    </div>
  );
}
