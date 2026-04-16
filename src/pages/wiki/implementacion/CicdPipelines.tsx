import { WikiH1, WikiH2, WikiH3, WikiP, WikiBreadcrumb, WikiCard, WikiTable, WikiCode, WikiTag } from "@/components/WikiComponents";

export default function CicdPipelines() {
  return (
    <div>
      <WikiBreadcrumb section="implementacion" page="cicd-pipelines" />
      <WikiH1>CI/CD, Pipelines y QC-TAMV-01 Constitucional</WikiH1>

      <div className="flex flex-wrap gap-1 mb-4">
        <WikiTag>QC-TAMV-01 v1.1</WikiTag>
        <WikiTag>Deca-V</WikiTag>
        <WikiTag>MD-X4</WikiTag>
        <WikiTag>MD-X5</WikiTag>
        <WikiTag>Constitution Engine</WikiTag>
      </div>

      <WikiP>
        QC-TAMV-01 define el <strong>marco constitucional de calidad</strong> del Cliente Civilizatorio TAMV. 
        Su función es establecer invariantes técnicas no negociables, traducir principios arquitectónicos 
        en mecanismos ejecutables (lint, tests, análisis estático) y vincular cumplimiento técnico con 
        validez operativa. Es aplicable a humanos, IAs operativas y CI/CD.
      </WikiP>

      <WikiH2>1. Leyes Constitucionales (L1–L9)</WikiH2>
      <WikiTable
        headers={["Ley", "Nombre", "Invariante"]}
        rows={[
          ["L1", "Raíz única", "createRoot debe existir únicamente en src/main.tsx"],
          ["L2", "Enrutador único", "BrowserRouter restringido a src/App.tsx"],
          ["L3", "Diseño único", "Layout.tsx se monta exactamente una vez en App.tsx"],
          ["L4", "Correspondencia ruta–page", "Cada archivo en src/pages/* corresponde a una sola ruta"],
          ["L5", "Responsabilidad de page", "Cada page compone módulos y domains, no inicializa servicios"],
          ["L6", "Módulos independientes", "src/modules/* no puede importar react-router-dom ni pages"],
          ["L7", "Aislamiento visual", "Ruta / no muestra componentes propios de /login y viceversa"],
          ["L8", "Separation of concerns", "Ninguna capa asume responsabilidades de otra"],
          ["L9", "Excepciones auditadas", "Toda excepción a L1-L8 requiere registro formal en DigyTAMV"],
        ]}
      />

      <WikiH2>2. Principios Arquitectónicos</WikiH2>
      <WikiCard title="Principios P1-P4" accent="cyan">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>P1 – Determinismo estructural:</strong> la arquitectura del cliente es finita, predecible e inspectable</li>
          <li><strong>P2 – Trazabilidad total:</strong> todo artefacto técnico tiene autor, fecha, razón y versión</li>
          <li><strong>P3 – Separación de capas:</strong> pages vs modules vs domains — ninguna capa asume responsabilidades de otra</li>
          <li><strong>P4 – Gobernanza automática:</strong> las reglas se ejecutan por herramientas, no por convención humana</li>
        </ul>
      </WikiCard>

      <WikiH2>3. Pipeline MD-X5 (Deca-V) — 10 Ciclos</WikiH2>
      <WikiCode>{`Pipeline MD-X5 (Deca-V) — obligatorio para PR a main/release/*

 1) npm run lint              → ESLint con eslint-plugin-tamv (modo error)
 2) npm run typecheck         → TypeScript sin emit
 3) npm run test              → Vitest (unit tests)
 4) npm run test:e2e          → Playwright (integration tests)
 5) contract-test             → Verificación de contratos entre módulos
 6) security-scan             → DEKATEOTL security gates
 7) sbom/check-licenses       → Software Bill of Materials + licencias
 8) build + artifact signing  → npm run build + firma
 9) deploy canary             → Despliegue gradual
10) post-deploy verification  → Verificación + rollback gate automático`}</WikiCode>

      <WikiH2>4. ESLint Constitucional (plugin tamv)</WikiH2>
      <WikiCode>{`// eslint-plugin-tamv — reglas obligatorias en modo "error"
{
  "rules": {
    "tamv-constitution/single-root": "error",      // L1
    "tamv-constitution/single-router": "error",     // L2
    "tamv-constitution/single-layout": "error",     // L3
    "tamv-constitution/page-route-map": "error",    // L4
    "tamv-constitution/no-page-imports": "error",   // L6
    "tamv-constitution/no-dao": "error",            // Migrar a SCAO
  }
}

// scripts/check-architecture.ts detecta:
// - page→page imports
// - module→router imports
// - layout fuera de App.tsx
// Ejecutado como parte de npm run ci`}</WikiCode>

      <WikiH2>5. Inventario Federado</WikiH2>
      <WikiTable
        headers={["Aspecto", "Detalle"]}
        rows={[
          ["Repos activos", "177–195 repos federados con clasificación por criticidad y dominio"],
          ["Dominios", "API_INFRA, ECONOMY, IA, ONLINE_EDU, RENDER_XR, SECURITY, UNCATEGORIZED"],
          ["Motor hexagonal", "Criterios entrada/salida, puertos y adaptadores para evitar acoplamiento"],
          ["Política de promoción", "Solo se despliega si lint, typecheck, test, build y L1-L9 pasan"],
          ["Observabilidad", "Cada release exige métricas, trazas y eventos de dominio publicados"],
        ]}
      />

      <WikiH2>6. Despliegue del Kernel TAMV</WikiH2>
      <WikiCode>{`Namespaces: tamv-core, tamv-identity, tamv-events, tamv-observability
Servicios:  api-gateway, isni-service, graph-service, vc-service, sync-service
Mensajería: event-bus (webhooks + colas)
Métricas:   latency p95, error rate, throughput, trust-score drift
Alertas:    SLO breach, backlog growth, schema mismatch, webhook delivery failures

// Edge Functions desplegadas:
// isabella-chat / isabella-chat-enhanced / isabella-tts
// quantum-analytics / quantum-analytics-enhanced
// dekateotl-security / dekateotl-security-enhanced
// create-checkout / stripe-webhook
// tamv-unified-api / tamv-fusion-core / tamv-content-sync
// kaos-audio-system`}</WikiCode>

      <WikiH2>7. Plan de Migración Integral (OLA A/B/C)</WikiH2>
      <WikiTable
        headers={["OLA", "Periodo", "Objetivo", "Acciones"]}
        rows={[
          ["A · Estabilización", "0–72h", "Fix bloqueantes", "Corregir 15 errores P0 de lint, congelar features, smoke tests rutas críticas"],
          ["B · Federación mínima", "Semana 1–2", "Operatividad", "Contrato protocol.orchestrator, enlazar MSR+BookPI, FSM guardianía, gateway XR"],
          ["C · Evolución total", "Semana 3–10", "Funcionalidad", "Identidad avanzada, Social Core extendido, economía/membresías, Viewer XR, pipeline quant-inspired"],
        ]}
      />

      <WikiH2>8. Métricas de Éxito</WikiH2>
      <WikiTable
        headers={["Área", "Métrica"]}
        rows={[
          ["QA", "100% coverage de reglas QC-TAMV-01"],
          ["Social", "Feed carga en < 300ms, 0 fallos en e2e"],
          ["Chat/WebSocket", "RTT < 200ms, 100% de entrega de mensajes"],
          ["Isabella", "P95 < 4s, fallback texto-solo funciona"],
          ["XR", "FPS ≥ 45 en equipos medios"],
          ["Economía", "100% de transacciones procesadas correctamente"],
          ["Security", "Todos los módulos sensibles en TEE"],
        ]}
      />

      <WikiCard title="IAs operativas bajo QC-TAMV-01" accent="orange">
        Cualquier IA que opere sobre el código TAMV debe:
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Respetar todas las leyes L1–L9 sin excepción</li>
          <li>No redefinir TAMV ni sus módulos canon</li>
          <li>Documentar antes que modificar</li>
          <li>Duda o conflicto = STOP + escalamiento humano</li>
          <li>El incumplimiento invalida el estado técnico aunque el software compile</li>
        </ul>
      </WikiCard>
    </div>
  );
}
