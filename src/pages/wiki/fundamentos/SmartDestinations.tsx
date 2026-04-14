import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function SmartDestinations() {
  return (
    <div>
      <WikiBreadcrumb section="fundamentos" page="smart-destinations" />
      <WikiH1>Smart Cities y Smart Destinations</WikiH1>

      <WikiP>
        TAMV redefine el concepto de Smart City al pasar de "ciudad con sensores" a "territorio con sistema operativo soberano". El modelo RDM‑TOS (Real del Monte Territorial Operating System) es la implementación de referencia de esta visión.
      </WikiP>

      <WikiH2>De Smart City a Territorio Soberano</WikiH2>
      <WikiP>
        Las smart cities convencionales suelen depender de proveedores externos que extraen datos del territorio para procesarlos en la nube. TAMV invierte este modelo: los datos se procesan localmente con lógica en el borde (Edge Computing), las decisiones se toman con datos propios y la gobernanza queda en manos de los actores territoriales.
      </WikiP>

      <WikiH2>Smart Destinations</WikiH2>
      <WikiP>
        El concepto de Smart Destination en TAMV conecta turismo, cultura, comercio local y servicios públicos en una experiencia integrada. El visitante no consume un "destino turístico" pasivo: interactúa con un ecosistema vivo que le ofrece rutas inteligentes, experiencias inmersivas y servicios contextuales.
      </WikiP>

      <WikiCard title="RDM Digital — Primer nodo territorial" accent="cyan">
        Real del Monte, Hidalgo, se convierte en el primer pueblo mágico de Latinoamérica operando bajo lógica soberana. Con al menos 48 nodos/subsistemas que cubren comercio, turismo, servicios urbanos, negocios y rutas inteligentes. Despliegue oficial: 4 de marzo de 2026.
      </WikiCard>

      <WikiH2>Componentes del gemelo digital</WikiH2>
      <ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
        <li>Telemetría en tiempo real con backend Supabase Realtime</li>
        <li>Mapas interactivos 2D/3D (Mapbox / Leaflet / Cesium)</li>
        <li>Integración con IoT y sensores urbanos</li>
        <li>Rutas y experiencias turísticas contextualizadas</li>
        <li>Dashboards tácticos para operación urbana y logística</li>
      </ul>
    </div>
  );
}
