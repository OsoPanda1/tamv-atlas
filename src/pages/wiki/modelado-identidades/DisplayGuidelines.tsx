import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiCode } from "@/components/WikiComponents";

export default function DisplayGuidelines() {
  return (
    <div>
      <WikiBreadcrumb section="modelado-identidades" page="display-guidelines" />
      <WikiH1>Directrices de Visualización de Identificadores</WikiH1>
      <WikiP>Reglas para mostrar identificadores TAMV e ISNI en documentos, perfiles y aplicaciones del ecosistema.</WikiP>

      <WikiH2>Formato de PIDs externos</WikiH2>
      <WikiCard accent="cyan">
        <ul className="space-y-1">
          <li><strong>ORCID:</strong> https://orcid.org/0009-0008-5050-1539 (siempre como URL resoluble)</li>
          <li><strong>DOI:</strong> https://doi.org/10.5281/zenodo.19562517 (siempre como URL resoluble)</li>
          <li><strong>ROR:</strong> https://ror.org/XXXXXX (cuando disponible)</li>
        </ul>
      </WikiCard>

      <WikiH2>Formato de DIDs TAMV</WikiH2>
      <WikiCode>{`did:tamv:person:edwin-castillo-trejo
did:tamv:org:tamv-online-network
did:tamv:territory:rdm-real-del-monte
did:tamv:project:utamv-campus
did:tamv:community:tamvonline-ecosistem-latam`}</WikiCode>

      <WikiH2>Reglas de uso</WikiH2>
      <ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
        <li>Los PIDs siempre se muestran como URLs resolubles, nunca como texto plano</li>
        <li>Los DIDs se muestran en formato did:tamv:tipo:identificador</li>
        <li>En JSON-LD, usar la propiedad "identifier" con PropertyValue</li>
        <li>En Markdown, usar enlaces con texto descriptivo</li>
        <li>Siempre incluir el icono o badge del PID cuando sea posible</li>
      </ul>
    </div>
  );
}
