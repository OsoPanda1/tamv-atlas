import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiLink } from "@/components/WikiComponents";

export default function RecursosSmartCities() {
  return (
    <div>
      <WikiBreadcrumb section="referencias" page="recursos-smart-cities" />
      <WikiH1>Recursos sobre Smart Cities</WikiH1>

      <WikiH2>Smart Cities y Digital Twins</WikiH2>
      <WikiP>TAMV redefine el concepto de Smart City como "Territorio con Sistema Operativo Soberano". Los siguientes recursos proporcionan contexto sobre las tendencias globales en ciudades inteligentes y gemelos digitales.</WikiP>
      <ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
        <li>Modelos de gemelos digitales urbanos (Digital Twin) para operación municipal</li>
        <li>Edge Computing y procesamiento de datos en origen para soberanía territorial</li>
        <li>IoT urbano y redes de sensores para telemetría en tiempo real</li>
        <li>GIS y sistemas de información geográfica (PostGIS, Mapbox, Cesium)</li>
      </ul>

      <WikiH2>Smart Destinations y turismo</WikiH2>
      <WikiP>La integración de turismo inteligente con sistemas operativos territoriales es un campo emergente donde TAMV aporta el modelo de "destino inteligente soberano".</WikiP>

      <WikiH2>Economías creativas</WikiH2>
      <WikiP>Los modelos de economía creativa digital que TAMV integra (marketplaces phygital, contenido audiovisual, experiencias XR monetizables) se enmarcan en las tendencias globales de economía naranja y cultura digital participativa.</WikiP>

      <WikiH2>Tecnologías clave referenciadas</WikiH2>
      <ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
        <li><WikiLink href="https://www.mapbox.com">Mapbox</WikiLink> — Mapas interactivos y geolocalización</li>
        <li><WikiLink href="https://cesium.com">Cesium</WikiLink> — Plataforma 3D geoespacial</li>
        <li><WikiLink href="https://supabase.com">Supabase</WikiLink> — Backend open-source (PostgreSQL, Auth, Realtime)</li>
        <li><WikiLink href="https://www.immersiveweb.dev">WebXR</WikiLink> — APIs para experiencias inmersivas en la web</li>
      </ul>
    </div>
  );
}
