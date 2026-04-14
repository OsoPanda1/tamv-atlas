import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiTable, WikiLink } from "@/components/WikiComponents";

export default function OrcidDoiIsni() {
  return (
    <div>
      <WikiBreadcrumb section="identidad" page="orcid-doi-isni" />
      <WikiH1>ORCID, DOI, ISNI, ROR</WikiH1>
      <WikiP>
        TAMV utiliza identificadores persistentes (PIDs) estándar para anclar su producción intelectual y sus entidades al grafo global de conocimiento.
      </WikiP>

      <WikiTable
        headers={["PID", "Propósito", "Valor TAMV"]}
        rows={[
          ["ORCID", "Identificador de investigador", "0009-0008-5050-1539 (Edwin O. Castillo Trejo)"],
          ["DOI", "Identificador de publicación", "10.5281/zenodo.19562517 (UTAMV White Paper)"],
          ["DOI", "Canon TAMV", "10.5281/zenodo.19436662"],
          ["DOI", "Biografía", "10.5281/zenodo.19411506"],
          ["ISNI", "Identidad de nombres", "En proceso de vinculación con TAMV"],
          ["ROR", "Identificador de organización", "Objetivo futuro para TAMV Network"],
        ]}
      />

      <WikiH2>ORCID — Perfil del investigador</WikiH2>
      <WikiP>
        El perfil ORCID de Edwin O. Castillo Trejo documenta su empleo como Director General de Proyectos y CEO Fundador de TAMV Online Network (2020-2026), su formación como Autodidact Software Architect y cinco trabajos publicados vinculados a OpenAIRE.
      </WikiP>
      <WikiCard accent="cyan">
        Perfil completo: <WikiLink href="https://orcid.org/0009-0008-5050-1539">orcid.org/0009-0008-5050-1539</WikiLink>
      </WikiCard>

      <WikiH2>DOI — Publicaciones registradas</WikiH2>
      <WikiP>
        La producción técnica de TAMV se registra en Zenodo bajo licencia Creative Commons Attribution 4.0 International, garantizando acceso abierto y citabilidad. El white paper principal "Arquitectura de UTAMV y el Núcleo de IA Académica (Core 2026)" describe la arquitectura de infraestructura y protocolos de gobernanza.
      </WikiP>

      <WikiH2>Integración futura con ISNI</WikiH2>
      <WikiP>
        Los slugs y nombres de archivo de esta wiki están diseñados para usarse como IDs o URLs en un grafo de conocimiento ISNI/UTAMV, permitiendo vincular cada artículo con su nodo semántico correspondiente.
      </WikiP>
    </div>
  );
}
