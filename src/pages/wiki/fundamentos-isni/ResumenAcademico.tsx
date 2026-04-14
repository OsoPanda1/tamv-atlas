import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiTable, WikiLink, WikiTag } from "@/components/WikiComponents";

export default function ResumenAcademico() {
  return (
    <div>
      <WikiBreadcrumb section="fundamentos-isni" page="resumen-academico" />
      <WikiH1>Resumen Académico de ISNI</WikiH1>

      <div className="flex flex-wrap mb-6">
        <WikiTag>ISNI</WikiTag><WikiTag>Paper académico</WikiTag><WikiTag>Ontología formal</WikiTag>
        <WikiTag>DIDs/SSI</WikiTag><WikiTag>Versión 1.0</WikiTag>
      </div>

      <WikiP>
        ISNI (Infraestructura Soberana de Nombres e Identidades) es la capa de identidad soberana de TAMV ONLINE, orientada a desambiguación, persistencia, validación y publicación de identidades en el ecosistema. Unifica identificadores académicos, repositorios abiertos, perfiles profesionales y presencia institucional en una capa de metadatos interoperable con ORCID, DOI, ROR y plataformas de ciencia abierta.
      </WikiP>

      <WikiCard title="Definición formal" accent="cyan">
        <div><strong>Sistema:</strong> ISNI — Infraestructura Soberana de Nombres e Identidades</div>
        <div><strong>Ecosistema:</strong> TAMV ONLINE — Ecosistema LATAM</div>
        <div><strong>Región:</strong> LATAM</div>
        <div><strong>Nodo fundacional:</strong> Real del Monte, Hidalgo, México</div>
        <div><strong>Tipo:</strong> Paper académico + Ontología formal + Sistema de perfiles + DIDs/SSI</div>
      </WikiCard>

      <WikiH2>Posicionamiento teórico</WikiH2>
      <WikiP>
        ISNI se sitúa en la intersección entre los modelos de Self-Sovereign Identity (SSI) y las infraestructuras de Persistent Identifiers (PIDs), adoptando su rigor pero anclándolos a un grafo soberano contextualizado a LATAM. La arquitectura contempla DIDs como mecanismo opcional de identidad descentralizada para escenarios de alta soberanía.
      </WikiP>

      <WikiH2>Diagrama lógico de capas</WikiH2>
      <WikiTable
        headers={["Capa", "Función", "Tecnologías"]}
        rows={[
          ["Capa 4 — Automatización y DIDs/SSI", "Control del usuario, credenciales verificables", "did:tamv, VCs, Ed25519"],
          ["Capa 3 — Interoperabilidad", "Conexión con PIDs y APIs externas", "ORCID, ROR, DOI, Zenodo, OpenAIRE"],
          ["Capa 2 — Semántica ISNI", "Significado y relaciones entre entidades", "JSON-LD, schema.org, Grafo TAMV"],
          ["Capa 1 — Documental", "Publicación y versionado", "Markdown, Wiki TAMV, Repos GitHub"],
        ]}
      />

      <WikiH2>Objetivos específicos</WikiH2>
      <ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
        <li>Unificar identidad de personas, instituciones, territorios y proyectos en un solo modelo</li>
        <li>Conectar perfiles académicos (ORCID), organizacionales (ROR) y de objetos (DOI) bajo ISNI</li>
        <li>Publicar identidades en Markdown y JSON-LD para wiki, repositorios y web TAMV</li>
        <li>Integrar DIDs como opcional para casos de alta soberanía o credenciales sensibles</li>
        <li>Diseñar un sistema automático de perfiles tipo ORCID nativo de TAMV</li>
      </ul>

      <WikiH2>Autoría e identidad</WikiH2>
      <WikiCard accent="orange">
        <div><strong>Autor / Founder:</strong> Edwin Oswaldo Castillo Trejo (Anubis Villaseñor)</div>
        <div>ORCID: <WikiLink href="https://orcid.org/0009-0008-5050-1539">0009-0008-5050-1539</WikiLink></div>
        <div>DOI: <WikiLink href="https://doi.org/10.5281/zenodo.19436662">10.5281/zenodo.19436662</WikiLink></div>
        <div>OpenAIRE: <WikiLink href="https://explore.openaire.eu/search/advanced/research-outcomes?f0=resultauthor&fv0=Edwin%2520Oswaldo%2520Castillo%2520Trejo">Perfil OpenAIRE</WikiLink></div>
        <div>Frontiers Loop: <WikiLink href="http://loop.frontiersin.org/people/3117809/overview">loop.frontiersin.org/3117809</WikiLink></div>
      </WikiCard>
    </div>
  );
}
