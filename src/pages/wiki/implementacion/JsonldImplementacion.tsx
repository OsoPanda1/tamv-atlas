import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function JsonldImplementacion() {
  return (
    <div>
      <WikiBreadcrumb section="implementacion" page="jsonld-implementacion" />
      <WikiH1>JSON-LD en Sitios TAMV</WikiH1>
      <WikiP>Cada perfil TAMV incluye un bloque JSON-LD embebido con tipos Schema.org (Person, Organization, Place) y relaciones (memberOf, affiliation, sameAs, identifier). Esto permite que motores de búsqueda, grafos de conocimiento y sistemas externos comprendan la estructura sin adaptadores.</WikiP>
    </div>
  );
}
