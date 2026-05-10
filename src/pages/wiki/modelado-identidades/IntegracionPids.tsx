import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiTable, WikiLink } from "@/components/WikiComponents";

export default function IntegracionPids() {
  return (
    <div>
      <WikiBreadcrumb section="modelado-identidades" page="integracion-pids" />
      <WikiH1>Integración con ORCID, DOI, ROR</WikiH1>
      <WikiP>TAMV utiliza PIDs estándar como anclas que conectan entidades del ecosistema con el grafo global de conocimiento académico.</WikiP>

      <WikiTable
        headers={["PID", "Tipo", "Valor TAMV", "Rol en ISNI"]}
        rows={[
          ["ORCID", "Persona", "0009-0008-5050-1539", "Fuente PID de personas; ancla de autoría"],
          ["DOI", "Publicación", "10.5281/zenodo.19562517", "Identificador de obras vinculadas al grafo"],
          ["DOI", "Canon TAMV", "10.5281/zenodo.19436662", "Documento rector del ecosistema"],
          ["ROR", "Organización", "Objetivo futuro", "Fuente PID de instituciones"],
          ["ISNI (global)", "Nombre", "En proceso", "Desambiguación internacional"],
        ]}
      />

      <WikiH2>ORCID en TAMV</WikiH2>
      <WikiP>El perfil ORCID asociado documenta empleo, formación y publicaciones vinculadas a OpenAIRE, además de grants relacionados al ecosistema TAMV.</WikiP>

      <WikiH2>DOI y Zenodo</WikiH2>
      <WikiP>Las publicaciones se registran en la comunidad Zenodo <WikiLink href="https://zenodo.org/communities/tamvonline-oficial/">tamvonline-oficial</WikiLink> bajo licencia CC BY 4.0. El white paper principal describe la arquitectura UTAMV y el Núcleo de IA Académica Core 2026.</WikiP>

      <WikiH2>OpenAIRE y Frontiers Loop</WikiH2>
      <WikiP>Las publicaciones están indexadas en OpenAIRE (grafo europeo de ciencia abierta) y el perfil del investigador en Frontiers Loop, conectando la producción intelectual de TAMV con la infraestructura global de Open Science.</WikiP>

      <WikiCard title="Posicionamiento clave" accent="cyan">
        ISNI no compite con ORCID/ROR/DOI: los integra como anclas externas confiables. ISNI añade contexto territorial, comunitario y narrativo que esos PIDs no contemplan — nombres normalizados, alias, jerarquías institucionales, reglas propias y narrativas LATAM.
      </WikiCard>
    </div>
  );
}
