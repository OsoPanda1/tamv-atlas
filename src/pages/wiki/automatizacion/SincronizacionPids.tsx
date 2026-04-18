import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function SincronizacionPids() {
  return (
    <div>
      <WikiBreadcrumb section="automatizacion" page="sincronizacion-pids" />
      <WikiH1>Sincronización con ORCID, ROR, DOI</WikiH1>
      <WikiP>
        La wiki ya consume sincronización real de PIDs vía backend. El endpoint <code>/v1/pids/status</code> conecta con ORCID (API pública), Zenodo (API REST) e ISNI (resolución HTTPS) para validar que los identificadores están vivos antes de desplegar.
      </WikiP>
      <WikiH2>Flujo operativo recomendado</WikiH2>
      <WikiCard accent="cyan">
        1) Cron dispara validación cada 6 horas.<br />
        2) Se guarda snapshot JSON y hash de evidencia.<br />
        3) La wiki muestra última verificación y estado por proveedor.<br />
        4) Si falla un proveedor, se alerta y se conserva última evidencia válida.
      </WikiCard>
    </div>
  );
}
