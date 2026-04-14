import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function PerfilesAcademicos() {
  return (
    <div>
      <WikiBreadcrumb section="perfiles-tamv" page="perfiles-academicos" />
      <WikiH1>Perfiles Académicos Tipo ORCID</WikiH1>
      <WikiP>TAMV genera perfiles académicos nativos similares a ORCID pero con contexto territorial y comunitario. Cada perfil incluye producción intelectual (DOIs), afiliaciones (organizaciones, territorios), roles en federaciones, credenciales verificables emitidas y trayectoria dentro del ecosistema UTAMV.</WikiP>
    </div>
  );
}
