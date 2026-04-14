import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiTable, WikiCode } from "@/components/WikiComponents";

export default function CapasArquitectonicas() {
  return (
    <div>
      <WikiBreadcrumb section="arquitectura" page="capas-arquitectonicas" />
      <WikiH1>Capas Arquitectónicas</WikiH1>
      <WikiP>
        La arquitectura TAMV se organiza en capas funcionales que van desde la persistencia de datos hasta la interacción con el usuario, pasando por semántica, seguridad e interoperabilidad.
      </WikiP>

      <WikiTable
        headers={["Capa", "Función", "Tecnologías clave"]}
        rows={[
          ["Persistencia", "Almacenamiento y geoespacial", "PostGIS, TimeSeries, Vault, RLS"],
          ["Semántica", "Significado y relaciones", "JSON-LD, Schema.org, ontologías TAMV"],
          ["Identidad", "Autenticación y SSI", "DIDs, VCs, ORCID, DOI, Zero-Trust"],
          ["Seguridad", "Protección post-cuántica", "PQC, Q-Cells autocurativas, SHA-256"],
          ["Inteligencia", "IA cognitiva y agéntica", "Isabella IA, doble pipeline pedagógico"],
          ["Gobernanza", "Reglas ejecutables", "Estatuto TAMV, Human-in-the-Loop"],
          ["Visualización", "GeoEngine y XR", "Mapbox, Cesium, DreamSpaces, WebXR"],
          ["Territorio", "Edge Computing y IoT", "Nodos de borde, malla humana, telemetría"],
        ]}
      />

      <WikiH2>Stack tecnológico base</WikiH2>
      <WikiP>La infraestructura utiliza una arquitectura reactiva con lógica en el borde, persistencia con seguridad a nivel de fila (RLS) y autenticación robusta.</WikiP>
      <WikiCode>{`// Arquitectura de referencia TAMV
// Frontend: React + TypeScript + Tailwind
// Backend: Supabase (PostgreSQL + Auth + Realtime + Edge Functions)
// Geo: Mapbox GL JS / Leaflet / Cesium
// IA: Isabella Protocol (triple bloqueo)
// Seguridad: PQC + Zero-Trust + Q-Cells
// Identidad: DIDs + VCs + PIDs (ORCID/DOI/ISNI)`}</WikiCode>

      <WikiCard title="Modelo antifrágil" accent="orange">
        Ningún módulo es monolito: todo puede evolucionar sin romper el sistema. Las Q-Cells actúan como células lógicas autocurativas que detectan y reparan fallos antes de que se propaguen. El modelo heptafederado garantiza que cada federación pueda operar de forma independiente.
      </WikiCard>
    </div>
  );
}
