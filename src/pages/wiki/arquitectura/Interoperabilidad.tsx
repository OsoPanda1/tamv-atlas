import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiTable } from "@/components/WikiComponents";

export default function Interoperabilidad() {
  return (
    <div>
      <WikiBreadcrumb section="arquitectura" page="interoperabilidad" />
      <WikiH1>Arquitectura Interoperable</WikiH1>
      <WikiP>
        TAMV se diseña como sistema abierto capaz de conectar con plataformas y servicios externos sin perder su soberanía. La interoperabilidad se logra mediante estándares abiertos, APIs documentadas y protocolos de federación.
      </WikiP>

      <WikiH2>Integraciones actuales</WikiH2>
      <WikiTable
        headers={["Plataforma", "Tipo", "Propósito"]}
        rows={[
          ["Odoo", "ERP / CMS", "Sitio oficial, gestión de servicios y productos"],
          ["Blogspot", "Blog", "Narrativa, historia, casos de uso y comunicación"],
          ["GitHub", "Código", "Repositorios, documentación técnica, prototipos"],
          ["Zenodo", "Archivo académico", "White papers, DOIs, acceso abierto"],
          ["ORCID", "Identidad académica", "Perfil del investigador y vinculaciones"],
          ["OpenAIRE", "Ciencia abierta", "Indexación en grafo europeo de investigación"],
          ["Supabase", "Backend", "PostgreSQL, Auth, Realtime, Edge Functions"],
          ["Mapbox/Leaflet", "Geo", "Mapas interactivos para RDM‑TOS"],
        ]}
      />

      <WikiH2>Protocolos de federación</WikiH2>
      <WikiP>
        El modelo federado de TAMV permite que nodos territoriales operen con autonomía pero compartan protocolos comunes de identidad, gobernanza y datos. Cada nodo puede conectar con el grafo central mediante APIs RESTful y eventos en tiempo real (Supabase Realtime).
      </WikiP>

      <WikiCard title="Principio de interoperabilidad" accent="green">
        TAMV no busca reemplazar herramientas existentes sino integrarlas en un ecosistema coherente. La capa de interoperabilidad garantiza que los datos fluyan entre sistemas sin duplicación ni pérdida de contexto semántico.
      </WikiCard>
    </div>
  );
}
