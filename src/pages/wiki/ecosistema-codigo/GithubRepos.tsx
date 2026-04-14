import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiLink, WikiTable, WikiTag } from "@/components/WikiComponents";

export default function GithubRepos() {
  return (
    <div>
      <WikiBreadcrumb section="ecosistema-codigo" page="github-repos" />
      <WikiH1>Análisis integral del perfil GitHub OsoPanda1</WikiH1>

      <WikiP>
        Esta sección consolida el análisis del perfil <WikiLink href="https://github.com/OsoPanda1">OsoPanda1</WikiLink> como
        un <strong>portafolio de un solo macroproyecto</strong>: TAMV ONLINE (MD‑X4 + RDM‑TOS + capa XR/IA).
        El patrón observado no es de productos aislados, sino de repositorios satélite que convergen en una sola narrativa técnica territorial.
      </WikiP>

      <WikiH2>Lectura estratégica del perfil</WikiH2>
      <WikiCard title="Hipótesis de arquitectura de portafolio" accent="cyan">
        El perfil funciona como <strong>arquitectura por constelación</strong>: múltiples repos (frontend, twin, explorer, core,
        experimental) que parecen distintos, pero en conjunto documentan y prueban un único sistema operativo territorial.
      </WikiCard>

      <div className="flex flex-wrap mb-4">
        <WikiTag>106 repos públicos</WikiTag>
        <WikiTag>Foco en TypeScript/JavaScript</WikiTag>
        <WikiTag>Narrativa soberanía digital</WikiTag>
        <WikiTag>Cadencia de commits 2026</WikiTag>
      </div>

      <WikiP>
        Señales visibles del perfil: bio orientada a TAMV ONLINE, README de usuario como manifiesto técnico, y secuencia de repositorios
        con prefijos/referencias recurrentes a <strong>TAMV</strong>, <strong>RDM</strong>, <strong>civilizational core</strong> y
        <strong>ecosistema nextgen</strong>.
      </WikiP>

      <WikiH2>Evidencia de convergencia (repos clave)</WikiH2>
      <WikiTable
        headers={["Repositorio", "Rol dentro del macroproyecto", "Señal de alineación"]}
        rows={[
          ["OsoPanda1/OsoPanda1", "Manifiesto maestro", "README centraliza MD‑X4, RDM‑TOS, Isabella IA y canon académico"],
          ["ecosistema-nextgen-tamv", "Capa ecosistema", "Descripción explícita de ecosistema civilizatorio"],
          ["civilizational-core", "Núcleo conceptual/técnico", "Nombre y narrativa de core de sistema"],
          ["real-del-monte-explorer", "Interfaz de territorio", "README describe frontend inmersivo + mapas + backend de operación"],
          ["real-del-monte-twin", "Gemelo digital", "Continuidad de naming RDM para territorial digital twin"],
          ["rdm-digital-2dbd42b0", "Implementación operativa", "Referencia directa a línea RDM digital"],
          ["tamv-nexus-verse", "Capa de unificación", "Nombre orientado a nexo/verse del mismo universo TAMV"],
        ]}
      />

      <WikiH2>Diagnóstico: “muchos repos, un solo sistema”</WikiH2>
      <WikiP>
        A nivel de gobernanza técnica, el perfil se interpreta como <strong>descomposición modular</strong> de un programa único.
        Esto aporta velocidad experimental, pero exige mejorar trazabilidad entre repos (ownership, roadmap, dependencias y estado de madurez).
      </WikiP>

      <WikiCard title="Riesgo actual" accent="orange">
        Sin mapa de relación inter-repos, para terceros el ecosistema puede parecer disperso. La percepción mejora cuando se explicita el
        patrón: <strong>Core (MD‑X4) → Nodo territorial (RDM‑TOS) → Interfaces (Explorer/Twin/XR) → Servicios y documentación</strong>.
      </WikiCard>

      <WikiCard title="Acción recomendada en TAMV/ISNI wiki" accent="green">
        Mantener esta página como inventario vivo y añadir, por repositorio crítico: objetivo, estado, dependencia, owner y enlace al módulo
        wiki correspondiente. Esto convierte GitHub en un tablero de arquitectura, no solo en listado de código.
      </WikiCard>

      <WikiP>
        Revisión de referencia rápida: <WikiLink href="https://github.com/OsoPanda1?tab=repositories">listado de repositorios</WikiLink>.
      </WikiP>
    </div>
  );
}
