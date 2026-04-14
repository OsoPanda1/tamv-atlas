import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function GeneradoresPerfiles() {
  return (
    <div>
      <WikiBreadcrumb section="automatizacion" page="generadores-perfiles" />
      <WikiH1>Generadores Automáticos de Perfiles</WikiH1>
      <WikiP>Scripts que generan fichas Markdown y bloques JSON-LD a partir de datos estructurados. Procesan entradas de ORCID API, DOI resolvers y bases de datos internas para crear perfiles completos con normalización de nombres, resolución de duplicados y vinculación automática de PIDs.</WikiP>
    </div>
  );
}
