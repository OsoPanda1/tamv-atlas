import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function ModeloPerfiles() {
  return (
    <div>
      <WikiBreadcrumb section="perfiles-tamv" page="modelo-perfiles" />
      <WikiH1>Modelo de Datos de Perfil TAMV</WikiH1>
      <WikiP>Cada perfil TAMV (persona, organización, territorio) se publica como página en Markdown + bloque JSON-LD con PIDs, DIDs, URLs, roles, afiliaciones y relaciones (memberOf, affiliation, sameAs, identifier). La ontología formal define tipos (Person, Organization, Territory, Project, Community, CreativeWork, Dataset) y relaciones en JSON-LD/schema.org.</WikiP>
    </div>
  );
}
