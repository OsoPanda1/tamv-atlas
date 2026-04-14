import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiTag, WikiCode } from "@/components/WikiComponents";

export default function StackTecnologico() {
  return (
    <div>
      <WikiBreadcrumb section="ecosistema-codigo" page="stack-tecnologico" />
      <WikiH1>Stack Tecnológico y Patrones</WikiH1>

      <WikiH2>Stack principal</WikiH2>
      <div className="flex flex-wrap mb-6">
        <WikiTag>React</WikiTag><WikiTag>TypeScript</WikiTag><WikiTag>Tailwind CSS</WikiTag>
        <WikiTag>Supabase</WikiTag><WikiTag>PostgreSQL</WikiTag><WikiTag>PostGIS</WikiTag>
        <WikiTag>Mapbox GL</WikiTag><WikiTag>Edge Functions</WikiTag><WikiTag>Vite</WikiTag>
      </div>

      <WikiH2>Patrones arquitectónicos</WikiH2>
      <WikiCard title="Arquitectura reactiva con Edge Computing">
        La lógica se procesa lo más cerca posible del usuario mediante Edge Functions (Deno). La persistencia usa PostgreSQL con RLS (Row-Level Security) para control de acceso granular. La autenticación se gestiona con Supabase Auth y el tiempo real con Supabase Realtime.
      </WikiCard>

      <WikiCard title="Modelo federado" accent="orange">
        Cada nodo territorial opera como instancia autónoma del kernel MD-X4. Los nodos comparten protocolos de identidad y gobernanza pero mantienen independencia en datos y configuración. Esto permite escalar horizontalmente sin centralización.
      </WikiCard>

      <WikiH2>Seguridad</WikiH2>
      <WikiP>
        Criptografía post-cuántica (PQC) para proteger comunicaciones contra amenazas futuras. Modelo Zero-Trust donde ningún componente confía implícitamente en otro. Q-Cells como células lógicas autocurativas que detectan y reparan anomalías en tiempo real.
      </WikiP>

      <WikiH2>Ejemplo de módulo territorial</WikiH2>
      <WikiCode>{`// frontend/rdm-map-2d.ts
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.MAPBOX_TOKEN ?? "";

const map = new mapboxgl.Map({
  container: "rdm-map-2d",
  style: "mapbox://styles/mapbox/dark-v11",
  center: [-98.667, 20.135], // Real del Monte
  zoom: 13.5,
  pitch: 45,
  bearing: -10,
});`}</WikiCode>
    </div>
  );
}
