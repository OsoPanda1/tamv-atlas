import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function GeneracionAutomatica() {
  return (
    <div>
      <WikiBreadcrumb section="perfiles-tamv" page="generacion-automatica" />
      <WikiH1>Generación Automática de Perfiles</WikiH1>
      <WikiP>El sistema genera automáticamente perfiles en Markdown y JSON-LD a partir de datos estructurados. Los generadores crean páginas wiki, bloques semánticos y fichas de identidad para cada entidad del ecosistema, con normalización de nombres, resolución de duplicados y vinculación automática de PIDs.</WikiP>
    </div>
  );
}
