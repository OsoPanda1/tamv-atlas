import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiTable } from "@/components/WikiComponents";

export default function ComparacionSistemas() {
  return (
    <div>
      <WikiBreadcrumb section="modelado-identidades" page="comparacion-sistemas" />
      <WikiH1>Comparación TAMV · ORCID · ROR</WikiH1>

      <WikiTable
        headers={["Sistema", "Entidad", "Alcance", "Gobernanza", "Rol en TAMV"]}
        rows={[
          ["ORCID", "Persona (autor)", "Global académico", "Fundación sin lucro", "Fuente PID de personas; se integra en ISNI"],
          ["ROR", "Organización", "Global académico", "Comunidad abierta", "Fuente PID de instituciones; enlazado en perfiles"],
          ["DOI", "Objeto digital", "Global ciencia", "Crossref/DataCite", "Identificador de obras vinculadas al grafo"],
          ["TAMV/ISNI", "Personas, orgs, territorios, proyectos, comunidades", "LATAM/Global soberano", "Gobernanza TAMV", "Capa de orquestación, contexto territorial y grafo local"],
        ]}
      />

      <WikiH2>Diferencias clave</WikiH2>
      <WikiP>ORCID identifica personas y ROR organizaciones, pero ninguno modela territorios, comunidades o proyectos como entidades de primera clase. TAMV/ISNI añade estas dimensiones más el contexto territorial, narrativo y cultural que los PIDs globales no contemplan.</WikiP>
      <WikiP>Además, ISNI implementa opcionalmente DIDs (did:tamv) para identidades de alta soberanía, credenciales verificables para UTAMV y perfiles tipo ORCID nativos con generación automática en Markdown/JSON-LD.</WikiP>
    </div>
  );
}
