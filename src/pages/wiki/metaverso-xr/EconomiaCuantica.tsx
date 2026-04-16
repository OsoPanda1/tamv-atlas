import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiTable, WikiCode, WikiTag } from "@/components/WikiComponents";

export default function EconomiaCuantica() {
  return (
    <div>
      <WikiBreadcrumb section="metaverso-xr" page="economia-cuantica" />
      <WikiH1>Economía Cuántica, TEE y DAO Hybrid</WikiH1>

      <div className="flex flex-wrap gap-1 mb-4">
        <WikiTag>TEE</WikiTag>
        <WikiTag>TCEP</WikiTag>
        <WikiTag>TAU</WikiTag>
        <WikiTag>DAO Hybrid</WikiTag>
        <WikiTag>UTAMV</WikiTag>
      </div>

      <WikiP>
        El TAMV Economic Engine (TEE) implementa economía soberana con sistema de membresías multinivel, 
        moneda TAU, marketplace, subastas, lotería y UTAMV university. La DAO Hybrid combina propuestas P2P, 
        votos ponderados, mesa directiva institucional y veto automático.
      </WikiP>

      <WikiH2>1. Sistema de Membresías (6 Niveles)</WikiH2>
      <WikiTable
        headers={["Tier", "Nombre", "Acceso principal", "Precio"]}
        rows={[
          ["0", "Free / Ciudadano", "Perfil ISNI, wiki, comunidad básica", "Gratis"],
          ["1", "Basic / Creador", "Social feed, DreamSpaces públicos, UTAMV gratuitos", "Freemium"],
          ["2", "Pro / Profesional", "DreamSpaces premium, Isabella voice, analytics avanzados", "Suscripción"],
          ["3", "Business / Empresa", "API access, dashboards, integración Odoo", "B2B"],
          ["4", "Enterprise / Institución", "Multi-sede, whitelabel, soporte dedicado", "B2G/B2B"],
          ["5", "Gold Plus / Alianza", "Gobernanza completa, nodos territoriales, economía TAU", "Estratégico"],
        ]}
      />

      <WikiH2>2. Moneda TAU (Token de Acceso Unificado)</WikiH2>
      <WikiCard accent="cyan">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Compra:</strong> Via Stripe (mode: 'payment') → acredita balance_tau en wallet</li>
          <li><strong>Consumo:</strong> Gifts premium, entradas especiales, contenido exclusivo</li>
          <li><strong>Comisión:</strong> 10% en gifts (sender paga cost, receiver recibe cost×0.9)</li>
          <li><strong>Ledger:</strong> Cada transacción registrada en tabla <code>transactions</code> con tipo, monto, moneda, from/to</li>
          <li><strong>Wallet:</strong> <code>tcep_wallets</code> con balance_tau, membership_tier, user_id</li>
        </ul>
      </WikiCard>

      <WikiH2>3. DAO Hybrid — Gobernanza</WikiH2>
      <WikiTable
        headers={["Componente", "Función"]}
        rows={[
          ["Propuestas P2P", "Cualquier miembro puede proponer cambios al ecosistema"],
          ["Votos ponderados", "Peso del voto según tier de membresía y reputación MSR"],
          ["Mesa directiva", "Veto institucional para decisiones que afecten principios TAMV"],
          ["Veto automático", "Constitution Engine rechaza propuestas que violen L1-L9"],
        ]}
      />

      <WikiCard title="Restricciones de la DAO" accent="orange">
        <ul className="list-disc list-inside space-y-1">
          <li>La DAO <strong>no puede</strong> decidir sobre comisiones, precios de membresía ni reparto de TAU</li>
          <li>La DAO <strong>puede opinar</strong> sobre tipos de productos en marketplace y categorías de contenido</li>
          <li>DAO-Experiencia puede ajustar límites de intensidad XR y accesibilidad</li>
          <li>DAO-Ética/IA pendiente de formalizarse para parámetros de Isabella</li>
        </ul>
      </WikiCard>

      <WikiH2>4. Modelo de Ingresos Proyectado</WikiH2>
      <WikiTable
        headers={["Fuente", "Modelo", "Proyección"]}
        rows={[
          ["Membresías", "Suscripción mensual/anual via Stripe", "Base recurring revenue"],
          ["TAU", "Compra de tokens para economía interna", "Transaccional"],
          ["Marketplace", "Comisión sobre ventas de productos/servicios", "Variable"],
          ["B2B/B2G", "Licencias territoriales para pueblos digitales", "Enterprise"],
          ["UTAMV", "Certificaciones y programas premium", "Educativo"],
          ["XR/4D", "Experiencias inmersivas monetizables", "Contenido premium"],
        ]}
      />

      <WikiH2>5. Tablas de Base de Datos</WikiH2>
      <WikiCode>{`-- Tablas requeridas para el sistema económico
profiles          → Metadatos del usuario, ID-NVIDA
analytics_events  → Tracking de interacciones y coherencia cuántica
user_metrics      → Datos de rendimiento y coherencia en tiempo real
security_scans    → Resultados de Anubis/DEKATEOTL
tcep_wallets      → Balance TAU, membership_tier
transactions      → Ledger de todas las operaciones económicas
processed_stripe_events → Idempotencia de webhooks

-- Todas las tablas con RLS habilitado
-- JWT expiration: 3600 segundos`}</WikiCode>
    </div>
  );
}
