import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiTable } from "@/components/WikiComponents";

export default function TiposIdentidad() {
  return (
    <div>
      <WikiBreadcrumb section="modelado-identidades" page="tipos-identidad" />
      <WikiH1>Tipos de Identidad en ISNI</WikiH1>
      <WikiP>ISNI gestiona cinco tipos fundamentales de entidades, cada una con modelo de datos, gobernanza e identificadores propios.</WikiP>

      <WikiTable
        headers={["Tipo", "Ejemplo", "PID externo", "DID TAMV", "Gobernanza"]}
        rows={[
          ["Person", "Titular ORCID 0009-0008-5050-1539", "ORCID", "did:tamv:person:*", "Auto-soberana"],
          ["Organization", "TAMV Online Network", "ISNI / ROR", "did:tamv:org:*", "Estatuto TAMV"],
          ["Territory", "Real del Monte", "—", "did:tamv:territory:*", "Nodo RDM-TOS"],
          ["Project", "UTAMV Campus", "DOI", "did:tamv:project:*", "Federación GOV"],
          ["Community", "TAMVONLINE-ECOSISTEM-LATAM", "—", "did:tamv:community:*", "Moderación colectiva"],
        ]}
      />

      <WikiH2>Person</WikiH2>
      <WikiP>Personas vinculadas a ORCID con roles, credenciales verificables, historial de actividades y relaciones (memberOf, affiliation). Incluye normalización de nombres, alias y seudónimos.</WikiP>

      <WikiH2>Organization</WikiH2>
      <WikiP>Organizaciones con ISNI/ROR que operan bajo el Estatuto TAMV. Cada organización puede instanciar su propio nodo territorial. En Odoo funcionan como entidades del ERP/CRM mapeadas a perfiles ISNI vía JSON-LD.</WikiP>

      <WikiH2>Territory</WikiH2>
      <WikiP>Territorios modelados como sistemas operativos vivos con gemelo digital, actores identificados y gobernanza local conectada al kernel federado. RDM Digital es el primer nodo con 48+ subsistemas.</WikiP>

      <WikiH2>Project</WikiH2>
      <WikiP>Proyectos con DOI, versionado semántico y trazabilidad completa. El lifecycle se documenta en el grafo de conocimiento con vinculación a personas y organizaciones.</WikiP>

      <WikiH2>Community</WikiH2>
      <WikiP>Comunidades como grupos de interés, redes de colaboración o colectivos que operan dentro del ecosistema TAMV. Pueden tener perfiles propios, credenciales compartidas y gobernanza participativa.</WikiP>
    </div>
  );
}
