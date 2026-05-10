import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiTable } from "@/components/WikiComponents";

export default function Perfiles() {
  return (
    <div>
      <WikiBreadcrumb section="identidad" page="perfiles" />
      <WikiH1>Perfiles y Entidades</WikiH1>
      <WikiP>El ecosistema TAMV gestiona cuatro tipos fundamentales de entidades, cada una con su modelo de datos, gobernanza e identificadores propios.</WikiP>

      <WikiTable
        headers={["Tipo", "Ejemplo", "Identificador", "Gobernanza"]}
        rows={[
          ["Persona", "Titular del ORCID 0009-0008-5050-1539", "ORCID / did:tamv:person", "Auto-soberana"],
          ["Organización", "TAMV Online Network", "ISNI / ROR / did:tamv:org", "Estatuto TAMV"],
          ["Territorio", "Real del Monte", "did:tamv:territory", "Nodo RDM-TOS"],
          ["Proyecto", "UTAMV Campus", "DOI / did:tamv:project", "Federación GOV"],
        ]}
      />

      <WikiH2>Personas</WikiH2>
      <WikiP>Las personas en TAMV tienen perfiles con ORCID vinculado, credenciales verificables, historial de actividades y roles dentro de las federaciones. El modelo protege la privacidad por diseño permitiendo divulgación selectiva.</WikiP>

      <WikiH2>Organizaciones</WikiH2>
      <WikiP>Las organizaciones operan con identificadores ISNI/ROR y gobernanza definida por el Estatuto TAMV. Cada organización puede instanciar su propio nodo territorial y gestionar sus miembros de forma autónoma.</WikiP>

      <WikiH2>Territorios</WikiH2>
      <WikiP>Los territorios se modelan como sistemas operativos vivos, no como abstracciones geográficas. Cada territorio tiene un gemelo digital, actores identificados y protocolos de gobernanza local conectados al kernel federado.</WikiP>

      <WikiH2>Proyectos</WikiH2>
      <WikiP>Los proyectos tienen DOI, versionado semántico, trazabilidad completa y vinculación con las personas y organizaciones que los impulsan. El lifecycle de cada proyecto se documenta en el grafo de conocimiento.</WikiP>
    </div>
  );
}
