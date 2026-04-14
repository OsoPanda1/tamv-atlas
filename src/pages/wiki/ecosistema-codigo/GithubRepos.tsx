import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiLink } from "@/components/WikiComponents";

export default function GithubRepos() {
  return (
    <div>
      <WikiBreadcrumb section="ecosistema-codigo" page="github-repos" />
      <WikiH1>Mapa de Repositorios</WikiH1>
      <WikiP>
        El código fuente del ecosistema TAMV se encuentra en la cuenta de GitHub <WikiLink href="https://github.com/OsoPanda1">OsoPanda1</WikiLink>, bajo la organización TAMV ONLINE ENTERPRISE. Los repositorios cubren desde prototipos de frontend hasta documentación técnica y configuraciones de infraestructura.
      </WikiP>

      <WikiH2>Repositorio principal</WikiH2>
      <WikiCard title="OsoPanda1/OsoPanda1" accent="cyan">
        README de perfil que documenta la visión completa del ecosistema: arquitectura MD‑X4, modelo heptafederado, nodo RDM‑TOS, Isabella IA, modelo de ingresos y enlaces canónicos. Funciona como punto de entrada oficial al ecosistema de código.
      </WikiCard>

      <WikiH2>Repositorios relevantes</WikiH2>
      <WikiCard title="tamv-unify-nexus">
        Nexo unificador del ecosistema TAMV. Proyecto clave que integra los subsistemas en un punto de convergencia técnica. Referenciado en el perfil ORCID como proyecto bajo grant TAMV-HUBDEVS001.
      </WikiCard>

      <WikiH2>Señales de actividad</WikiH2>
      <WikiP>
        El perfil muestra actividad constante con logros como Pair Extraordinaire, Pull Shark (x2), YOLO y Quickdraw. Los lenguajes principales incluyen TypeScript, JavaScript y tecnologías de frontend moderno.
      </WikiP>

      <WikiCard title="Explorar repositorios" accent="orange">
        Para ver todos los repositorios activos: <WikiLink href="https://github.com/OsoPanda1?tab=repositories">github.com/OsoPanda1/repositories</WikiLink>
      </WikiCard>
    </div>
  );
}
