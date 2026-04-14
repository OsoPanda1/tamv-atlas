import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function ApiIsni() {
  return (
    <div>
      <WikiBreadcrumb section="implementacion" page="api-isni" />
      <WikiH1>API ISNI y Endpoints</WikiH1>
      <WikiP>La API ISNI expone endpoints para consulta de perfiles, resolución de identificadores y validación de credenciales. Endpoints principales: GET /api/profiles/:id, GET /api/resolve/:did, POST /api/credentials/verify. Integración con MSR API (GET/POST /api/msr) y BookPI (GET/POST /api/bookpi).</WikiP>
    </div>
  );
}
