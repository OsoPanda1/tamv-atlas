import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function BusquedaAvanzada() {
  return (
    <div>
      <WikiBreadcrumb section="automatizacion" page="busqueda-avanzada" />
      <WikiH1>Búsqueda Avanzada e Indexación</WikiH1>
      <WikiP>Motor de búsqueda que indexa perfiles, publicaciones, proyectos y territorios del grafo ISNI. Soporta filtros por tipo de entidad, PID, afiliación, territorio, fecha y relaciones. La indexación se basa en los bloques JSON-LD para máxima precisión semántica.</WikiP>
    </div>
  );
}
