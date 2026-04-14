import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function MetadatosVersionado() {
  return (
    <div>
      <WikiBreadcrumb section="gobernanza" page="metadatos-versionado" />
      <WikiH1>Metadatos, Versionado y Trazabilidad</WikiH1>
      <WikiP>Cada documento y perfil tiene metadatos estandarizados: sistema, módulo, versión, formato, clasificación, estado, idioma y tags. El versionado sigue semántica de versiones (MAJOR.MINOR.PATCH) con trazabilidad completa en el ledger BookPI (SHA-256).</WikiP>
    </div>
  );
}
