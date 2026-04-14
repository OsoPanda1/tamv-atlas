import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function SincronizacionPids() {
  return (
    <div>
      <WikiBreadcrumb section="automatizacion" page="sincronizacion-pids" />
      <WikiH1>Sincronización con ORCID, ROR, DOI</WikiH1>
      <WikiP>Jobs periódicos que sincronizan perfiles TAMV con fuentes externas: consultan ORCID API para actualizar publicaciones, verifican DOIs via Crossref/DataCite, y enlazan organizaciones con ROR. Los cambios se registran en el ledger BookPI para trazabilidad.</WikiP>
    </div>
  );
}
