# Consolidado 3

Generado: 2026-05-20T10:55:37.234Z

Fuentes: 17

## Fuente: federation/tamv-digital-nexus/SECURITY.md

# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

Use this section to tell people how to report a vulnerability.

Tell them where to go, how often they can expect to get an update on a
reported vulnerability, what to expect if the vulnerability is accepted or
declined, etc.

---

## Fuente: federation/tamv-digital-nexus/docs/14_hexa_edimap_architecture.md

# 14 — HEXA-EDIMAP: Arquitectura Operativa Adaptativa Gobernada

> **Estado:** `stable` · **Versión:** 1.0.0 · **Clasificación:** Especificación Fundacional Arquitectónica  
> **Integración TAMV:** Mapeado a DM-X4, MSR, Guardianías y Constitution Engine  
> **Canon Prevalente:** `SOUL.md`, `MASTER_CANON_OPENCLAW_TAMV.md`

---

## 1. DECLARACIÓN FUNDACIONAL

HEXA-EDIMAP es un **sistema operativo arquitectónico** diseñado para entornos donde:

- Existen decisiones críticas en tiempo real (guardianías TAMV)
- Se requiere memoria histórica íntegra (THE SOF Shadow Engine)
- La evolución normativa es frecuente (MSR Rules versioning)
- Hay exigencia regulatoria o económica (UTAMV/BookPI compliance)
- El aprendizaje debe estar gobernado (Isabella AI + bóveda)

Su base conceptual extiende la Arquitectura Hexagonal de Alistair Cockburn y los principios de Clean Architecture, incorporando:

- **Event Sourcing** como fuente de verdad (THE SOF Event Store)
- **Pipeline dual hot/cold** (MD-X4 Pipeline A/B extendido)
- **Gobernanza versionada de reglas** (MSR + Constitution Engine)
- **Memoria estructurada obligatoria** (Audit trail TAMV)
- **Promoción controlada de plantillas** (Template governance)

---

## 2. FILOSOFÍA DEL SISTEMA

### 2.1 Separación Temporal

HEXA-EDIMAP no solo separa infraestructura del dominio. Separa explícitamente:

1. **Presente operativo** → Pipeline HOT (decisiones inmediatas)
2. **Historia estructurada** → Event Store + THE SOF
3. **Evolución normativa** → MSR Rules + Constitution Engine
4. **Aprendizaje analítico** → Pipeline COLD (Isabella Analytics)

> La arquitectura tradicional protege capas. HEXA-EDIMAP protege **tiempos**.

### 2.2 Gobernanza Antes que Autonomía

El sistema **PUEDE**:
- Ajustar parámetros dentro de rangos definidos (MSR dynamic rules)
- Detectar anomalías (Radares TAMV)
- Proponer nuevas plantillas (Isabella proposals)

El sistema **NO PUEDE**:
- Cambiar su marco estructural (Canon lock)
- Auto-promover reglas críticas (Human approval required)
- Alterar límites regulatorios (Legal constraints)

### 2.3 Trazabilidad como Principio Ontológico

> Nada ocurre sin evento.  
> Nada cambia sin versión.  
> Nada evoluciona sin promoción.

---

## 3. VISIÓN Y MISIÓN EN CONTEXTO TAMV

### Visión
Desarrollar sistemas TAMV capaces de evolucionar sin perder estabilidad estructural ni gobernanza, manteniendo la integridad de los 177 repositorios federados.

### Misión
Implementar arquitectura hexagonal extendida sobre DM-X4 con:

- Doble pipeline (hot/cold) integrado a MD-X4 Pipeline A/B
- Memoria estructurada vía THE SOF Shadow Engine
- Motor de aprendizaje controlado (Isabella AI)
- Marco jurídico compatible (UTAMV legal framework)
- Modelo económico versionado (MSR Economic Rules)

---

## 4. ALCANCE DEL SISTEMA

### HEXA-EDIMAP es aplicable a:

| Dominio TAMV | Aplicabilidad | Estado |
|--------------|---------------|--------|
| Plataformas económicas digitales | UTAMV/BookPI/MSR Economy | ✅ Activo |
| Sistemas regulatorios | Constitution Engine + QC-TAMV-01 | ✅ Activo |
| FinTech | Stripe Integration + Tau marketplace | ✅ Activo |
| Plataformas de reputación | Social Core + Radares | ✅ Activo |
| Sistemas de scoring | MSR Rules + Guardianías | ✅ Activo |
| Plataformas XR con gobernanza | MD-X4 Pipeline + Ethics | ✅ Activo |
| Infraestructura crítica | Anubis + Dekateotl + TEE | ✅ Activo |

### No es recomendable para:
- CRUD simples sin gobernanza
- Aplicaciones de baja criticidad
- MVP de bajo riesgo sin requerimientos de auditoría

---

## 5. MODELO ARQUITECTÓNICO GLOBAL

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         HEXA-EDIMAP sobre TAMV                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────────┐         ┌─────────────────┐                      │
│   │  PRIMARIOS      │         │  ADAPTERS       │                      │
│   │  (Inbound Ports)│         │  (Implement)    │                      │
│   │  • HTTP API     │◄────────│  • REST Adapter │                      │
│   │  • WebSocket    │◄────────│  • WS Adapter   │                      │
│   │  • CLI          │◄────────│  • CLI Adapter  │                      │
│   │  • XR Interface │◄────────│  • XR Adapter   │                      │
│   └────────┬────────┘         └─────────────────┘                      │
│            │                                                            │
│            ▼                                                            │
│   ┌──────────────────────────────────────────────────────────┐         │
│   │                    [ HOT PIPELINE ]                      │         │
│   │  ┌──────────────┐  ┌─────────────┐  ┌─────────────────┐  │         │
│   │  │   USE CASE   │─►│  GUARDIAN   │─►│    DECISION     │  │         │
│   │  │   (MSR)      │  │  (Anubis)   │  │  ALLOW/HOLD/BLK │  │         │
│   │  └──────────────┘  └─────────────┘  └────────┬────────┘  │         │
│   └───────────────────────────────────────────────┼───────────┘         │
│                                                   │                     │
│                        ┌──────────────────────────┘                     │
│                        ▼                                                │
│   ┌──────────────────────────────────────────────────────────┐         │
│   │                    EVENT STORE (THE SOF)                 │         │
│   │  ┌────────────────────────────────────────────────────┐  │         │
│   │  │  • Domain Event v1 (EconomicPolicy.v1)             │  │         │
│   │  │  • Domain Event v2 (EconomicPolicy.v1)             │  │         │
│   │  │  • Correlation ID / Causation ID                   │  │         │
│   │  │  • Timestamp + Rule Version                        │  │         │
│   │  └────────────────────────────────────────────────────┘  │         │
│   └──────────────────────────────┬───────────────────────────┘         │
│                                  │                                      │
│                                  ▼                                      │
│   ┌──────────────────────────────────────────────────────────┐         │
│   │                   [ COLD PIPELINE ]                      │         │
│   │  ┌──────────────┐  ┌─────────────┐  ┌─────────────────┐  │         │
│   │  │  AGGREGATION │─►│  ANALYTICS  │─►│  TEMPLATE PROP  │  │         │
│   │  │  (Temporal)  │  │  (Isabella) │  │  (Promoción)    │  │         │
│   │  └──────────────┘  └─────────────┘  └────────┬────────┘  │         │
│   └───────────────────────────────────────────────┼───────────┘         │
│                                                   │                     │
│                        ┌──────────────────────────┘                     │
│                        ▼                                                │
│   ┌──────────────────────────────────────────────────────────┐         │
│   │              PLANTILLAS / GOBERNANZA                     │         │
│   │  ┌──────────────┐  ┌─────────────┐  ┌─────────────────┐  │         │
│   │  │   MSR RULES  │  │ CONSTITUTION│  │   PROMOTION     │  │         │
│   │  │  (Versioned) │  │   ENGINE    │  │    ENGINE       │  │         │
│   │  └──────────────┘  └─────────────┘  └─────────────────┘  │         │
│   └──────────────────────────────────────────────────────────┘         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 6. COMPONENTES DEL SISTEMA

### 6.1 Dominio (DM-X4 Cells)

Contiene:
- **Entidades** → DM-X4 domain models
- **Value Objects** → MSR contracts
- **Casos de uso** → UseCase implementations
- **Guardianías** → Anubis, Dekateotl, Horus, Osiris
- **Eventos de dominio** → THE SOF events

> No conoce infraestructura. Regla de HEXA-EDIMAP: Dependency Inversion.

### 6.2 Puertos (Ports)

#### Puertos de Entrada (Inbound)
| Puerto | Implementación TAMV | Ruta |
|--------|---------------------|------|
| HTTP API | REST Adapter | `src/api/` |
| WebSocket | Realtime Adapter | Supabase Realtime |
| CLI | Scripts/Edge Functions | `scripts/`, `supabase/functions/` |
| XR Interface | MD-X4 Pipeline B | `src/systems/ThreeSceneManager.tsx` |
| Scheduler | Cron Edge Functions | `supabase/functions/cron-*` |

#### Puertos de Salida (Outbound)
| Puerto | Implementación TAMV | Ruta |
|--------|---------------------|------|
| EventStorePort | THE SOF Shadow Engine | `src/lib/sof/` (conceptual) |
| RepositoryPort | Supabase/PostgreSQL | `src/lib/db.ts` |
| EventBusPort | Supabase Realtime + WebSocket | `src/lib/realtime.ts` |
| NotificationPort | Notification System | `src/components/notifications/` |
| AnalyticsPort | Isabella Analytics | Edge Functions `analytics-*` |

### 6.3 Adaptadores (TAMV Implementation)

| Adaptador | Tecnología | Ruta |
|-----------|------------|------|
| PostgreSQL Adapter | Supabase PG | `src/lib/db.ts` |
| Kafka Adapter | Supabase Realtime (equivalente) | `src/lib/realtime.ts` |
| REST Adapter | React Query + Fetch | `src/hooks/use*.ts` |
| Mongo Projection Adapter | Supabase Projections | Edge functions |
| Prometheus Metrics Adapter | Custom Metrics | `src/lib/metrics.ts` |

---

## 7. PIPELINE CALIENTE (HOT)

### Objetivo
Tomar decisiones inmediatas con latencia mínima (< 100ms p95).

### Características
- Evaluación de guardianías (Anubis pre-flight)
- Aplicación de reglas vigentes (MSR active rules)
- Persistencia de eventos (THE SOF append)
- Publicación asíncrona (EventBus fire-and-forget)

### Flujo Operativo TAMV
```
Command (User Action)
  → UseCase (DM-X4 Cell)
     → Guardian (Anubis/Dekateotl)
        → Decision (ALLOW/HOLD/BLOCK)
           → DomainEvent (THE SOF)
              → Persist (Event Store)
                 → Publish (Realtime)
                    → Projection Update
```

### Implementación en DM-X4
```typescript
// src/lib/msr.ts (extracto conceptual HEXA-EDIMAP)
export interface HotPipelineContext {
  correlationId: string;
  causationId?: string;
  timestamp: Date;
  ruleVersion: string;  // "EconomicPolicy.v1"
  guardianDecision: "ALLOW" | "HOLD" | "BLOCK";
}

export async function hotPipelineExecute<T>(
  command: Command<T>,
  guardian: Guardian,
  eventStore: EventStorePort
): Promise<PipelineResult> {
  // 1. Evaluación síncrona de guardianía
  const decision = guardian.evaluate(command.context);
  
  if (decision === "BLOCK") {
    return { status: "blocked", reason: guardian.lastReason };
  }
  
  // 2. Ejecución de caso de uso
  const result = await command.execute();
  
  // 3. Generación de evento de dominio
  const event = new DomainEvent({
    id: crypto.randomUUID(),
    name: command.eventName,
    payload: result,
    version: "v1",
    ruleVersion: guardian.activeRuleVersion,
    correlationId: command.correlationId,
    causationId: command.id,
    timestamp: new Date()
  });
  
  // 4. Persistencia síncrona en Event Store
  await eventStore.append(event);
  
  // 5. Publicación asíncrona
  eventBus.publish(event); // Non-blocking
  
  return { status: decision, eventId: event.id };
}
```

### Restricciones HOT
- ❌ No análisis histórico pesado
- ❌ No agregaciones complejas
- ❌ No simulaciones
- ❌ No acceso a pipeline cold

---

## 8. PIPELINE FRÍO (COLD)

### Objetivo
Analizar comportamiento histórico para aprendizaje estructurado y propuesta de evolución normativa.

### Funciones
- **Agregación temporal** → Windowed queries sobre Event Store
- **Análisis estadístico** → Drift detection, anomaly scoring
- **Detección de drift** → Reglas vs. comportamiento real
- **Simulación de impacto** → What-if sobre propuestas
- **Generación de propuestas** → Nuevas plantillas de reglas

### Implementación TAMV (Isabella Analytics)
```typescript
// infrastructure/analytics/ColdPipeline.ts
export class ColdPipeline {
  constructor(
    private eventStore: EventStorePort,
    private analyticsEngine: IsabellaAnalytics,
    private promotionService: PromotionService
  ) {}

  async analyze(window: TimeWindow): Promise<AnalysisResult> {
    // 1. Agregación de eventos
    const events = await this.eventStore.readWindow(window);
    
    // 2. Análisis por Isabella
    const analysis = this.analyticsEngine.analyze(events);
    
    // 3. Detección de anomalías
    if (analysis.driftScore > 0.7) {
      return {
        status: "DRIFT_DETECTED",
        proposal: this.generateProposal(analysis)
      };
    }
    
    // 4. Métricas operativas
    return {
      status: "STABLE",
      metrics: analysis.metrics
    };
  }

  private generateProposal(analysis: Analysis): TemplateProposal {
    return {
      template: "EconomicPolicy",
      currentVersion: "v1",
      proposedVersion: "v2",
      suggestedParams: analysis.optimalParams,
      confidence: analysis.confidence,
      simulationResults: analysis.simulation,
      requiresHumanApproval: true // Siempre
    };
  }
}
```

### Restricciones COLD
- ❌ No modifica directamente el pipeline caliente
- ❌ No ejecuta cambios en producción
- ✅ Solo genera propuestas para promoción

---

## 9. MEMORIA ESTRUCTURADA (THE SOF Event Store)

Fuente de verdad única: **THE SOF Shadow Engine**

Cada evento contiene:

| Campo | Descripción | Ejemplo TAMV |
|-------|-------------|--------------|
| `id` | UUID v4 único | `"evt_abc123..."` |
| `type` | Nombre del evento | `"TokensTransferred"` |
| `payload` | Datos del evento | `{ amount: 100, from: "u1", to: "u2" }` |
| `timestamp` | ISO 8601 UTC | `"2026-03-02T08:00:00Z"` |
| `version` | Versión del esquema | `"v1"` |
| `ruleVersion` | Plantilla aplicada | `"EconomicPolicy.v1"` |
| `correlationId` | ID de trazabilidad | `"corr_xyz789..."` |
| `causationId` | ID del evento causante | `"evt_prev456..."` |

### Capacidades
- **Replay total** → Reconstrucción de estado en cualquier punto temporal
- **Auditoría completa** → Cumplimiento regulatorio UTAMV
- **Simulación retrospectiva** → What-if sobre datos históricos
- **Reconstrucción de estado** → Proyecciones recreables

---

## 10. PLANTILLAS (MSR Rules Versioned)

Las plantillas son reglas versionadas formalmente dentro del MSR.

### Ejemplos en TAMV

| Plantilla | Versión Actual | Descripción |
|-----------|----------------|-------------|
| `EconomicPolicy` | v1 | Reglas de transferencia Tau |
| `RiskThresholds` | v3 | Umbrales de riesgo guardianías |
| `BehaviorRules` | v2 | Reglas de conducta XR |
| `AuthPolicies` | v2 | Políticas de autenticación |
| `ContentModeration` | v1 | Reglas de moderación social |

### Estructura de Plantilla
```typescript
interface Template {
  identifier: string;           // "EconomicPolicy"
  version: string;              // "v1.2.3"
  parameters: Record<string, any>; // { maxTransfer: 1000, fee: 0.01 }
  allowedRanges: {              // Rangos operativos permitidos
    [key: string]: { min: number; max: number }
  };
  promotionDate?: Date;         // Fecha de activación
  author: string;               // "constitution-engine" o humano
  justification: string;        // Razón del cambio
  supportingMetrics: Metric[];  // Métricas que respaldan la versión
  status: "draft" | "simulated" | "approved" | "active" | "deprecated";
}
```

### Proceso de Promoción TAMV
```
1. PROPUESTA
   ↓ Cold Pipeline detecta optimización
   ↓ Genera TemplateProposal v(N+1)
   
2. SIMULACIÓN
   ↓ Simulación sobre datos históricos (72h)
   ↓ Validación de impacto económico/social
   
3. CONSTITUTION CHECK
   ↓ Constitution Engine valida contra QC-TAMV-01
   ↓ Verifica rangos permitidos
   
4. APROBACIÓN HUMANA
   ↓ Review por Governance Panel
   ↓ Firma digital / Consensus
   
5. PUBLICACIÓN
   ↓ Promoción a "active"
   ↓ Evento TemplatePromoted al Event Store
   ↓ Notificación a Hot Pipeline
```

---

## 11. MODELO ECONÓMICO (UTAMV/MSR)

HEXA-EDIMAP integra el modelo económico TAMV:

### Componentes Económicos
- **Tau (τ)** - Token interno de utilidad
- **Reglas de emisión** - MSR Economic Rules
- **Reglas de transferencia** - EconomicGuardian
- **Límites dinámicos** - Hot pipeline adjustable params
- **Penalizaciones** - Automatic via guardianías

### Lo que NUNCA permite
- ❌ Auto-modificación estructural económica
- ❌ Cambio de supply cap sin aprobación
- ❌ Modificación de contratos inteligentes en caliente

### Lo que SÍ permite
- ✅ Ajustes paramétricos dentro de bandas definidas
- ✅ Modificación de fees dentro de rangos
- ✅ Adaptación de thresholds por volumen

---

## 12. MARCO JURÍDICO-LEGAL (UTAMV)

Compatible con:
- **Derecho a explicación** → Cada decisión trazable a regla + versión
- **Auditoría regulatoria** → Event Store inmutable
- **Versionado obligatorio** → Todas las reglas versionadas
- **Separación de datos personales** → PII en tier separado

### Cada decisión es explicable
```typescript
interface DecisionExplanation {
  decisionId: string;
  rule: string;              // "EconomicPolicy.v1"
  ruleVersion: string;       // "v1"
  context: any;              // Datos de entrada
  guardian: string;          // "EconomicGuardian"
  outcome: "ALLOW" | "HOLD" | "BLOCK";
  timestamp: Date;
  correlationId: string;     // Para trazabilidad completa
}
```

---

## 13. INTEGRACIÓN CON ARQUITECTURA TAMV EXISTENTE

### Mapeo HEXA-EDIMAP ↔ TAMV

| HEXA-EDIMAP | Componente TAMV | Estado |
|-------------|-----------------|--------|
| Hot Pipeline | MD-X4 Pipeline A (Datos) | ✅ Mapeado |
| Cold Pipeline | MD-X4 Pipeline B extendido + Isabella Analytics | ✅ Mapeado |
| Event Store | THE SOF Shadow Engine | ✅ Mapeado |
| Guardianías | Anubis, Dekateotl, Horus, Osiris | ✅ Mapeado |
| Plantillas | MSR Rules + Constitution Engine | ✅ Mapeado |
| Promoción | Promotion Service (nuevo) | 📋 Por implementar |
| Puertos | DM-X4 Cells + Edge Functions | ✅ Mapeado |
| Adaptadores | Repositories + API clients | ✅ Mapeado |

### Diagrama de Integración
```
┌─────────────────────────────────────────────────────────────────┐
│                     TAMV MD-X4 + HEXA-EDIMAP                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   NEXUS UI   │◄──►│  FUSION CORE │◄──►│   DM-X4      │      │
│  │   (React)    │    │  (Orquest)   │    │   DOMAINS    │      │
│  └──────────────┘    └──────────────┘    └──────┬───────┘      │
│                                                  │              │
│                           ┌──────────────────────┘              │
│                           ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              HEXA-EDIMAP LAYER                          │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │   │
│  │  │    HOT      │  │  THE SOF    │  │     COLD        │  │   │
│  │  │  PIPELINE   │◄►│ EVENT STORE │◄►│   PIPELINE      │  │   │
│  │  │  (Anubis)   │  │ (Shadow Eng)│  │ (Isabella AI)   │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│                           ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              MSR + CONSTITUTION ENGINE                  │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │   │
│  │  │   RULES     │  │  PROMOTION  │  │     QC-TAMV     │  │   │
│  │  │ (Versioned) │  │   ENGINE    │  │      -01        │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 14. MÉTRICAS OPERATIVAS OFICIALES

Monitorear continuamente:

| Métrica | Target | Alerta |
|---------|--------|--------|
| p95 hot latency | < 100ms | > 200ms |
| Event append throughput | > 1000 evt/s | < 500 evt/s |
| Cold backlog depth | < 10k events | > 50k |
| Template promotion frequency | < 1/semana | > 3/semana |
| Drift score | < 0.3 | > 0.7 |
| Guardian block ratio | < 5% | > 15% |
| Economic imbalance ratio | < 1% | > 5% |

### Dashboard HEXA-EDIMAP
Ubicación propuesta: `src/components/governance/HexaEdimapDashboard.tsx`

---

## 15. RIESGOS ESTRUCTURALES Y MITIGACIÓN

| Riesgo | Probabilidad | Impacto | Mitigación TAMV |
|--------|--------------|---------|-----------------|
| Complejidad organizacional | Media | Alto | Documentación canon, training |
| Coste de infraestructura | Media | Medio | Proyecciones incrementales |
| Sobrediseño | Alta | Medio | HEXA-EDIMAP-Lite para MVP |
| Saturación de eventos | Baja | Alto | Sharding + TTL policies |
| Gobernanza burocrática | Media | Medio | Automatización de validaciones |

### HEXA-EDIMAP-Lite
Versión reducida para dominios no críticos:
- Solo Hot Pipeline
- Event Store simplificado
- Sin Cold Pipeline
- Promoción manual únicamente

---

## 16. CONCLUSIÓN OFICIAL

HEXA-EDIMAP no es solo arquitectura. Es:

> **Un modelo operativo temporal.**  
> **Una infraestructura de memoria.**  
> **Un marco de evolución gobernada.**  
> **Un sistema capaz de aprender sin perder control.**

Permite que TAMV:
- **Actúe** con precisión (Hot Pipeline + Guardianías)
- **Recuerde** con fidelidad (THE SOF Event Store)
- **Aprenda** con análisis (Cold Pipeline + Isabella)
- **Evolucione** con autorización (Promotion Engine + Constitution)

Esto define su naturaleza como **Sistema Operativo Adaptativo Gobernado** integrado a la infraestructura civilizatoria TAMV.

---

## 17. REFERENCIAS CRUZADAS CANON

| Documento | Relación |
|-----------|----------|
| `SOUL.md` | Canon fundacional, valores operativos |
| `MASTER_CANON_OPENCLAW_TAMV.md` | Prevalencia de dominios |
| `docs/02_arquitectura_tamv_mdx4.md` | Arquitectura base DM-X4 |
| `docs/09_motor_mdx4_y_pipelines.md` | Pipelines A/B |
| `docs/modules/msr/` | Motor de reglas |
| `docs/modules/guardianias/` | Guardianías implementadas |
| `docs/modules/ia/` | Isabella AI |
| `02_MODULOS/M01_QC/INTERNO/TEE-AUDIT-RUNBOOK.md` | Auditoría |
| `MDX5_OPERATIONAL_PROTOCOL.md` | Protocolo Deca-V |

---

## 18. HISTORIAL DE VERSIONES

| Versión | Fecha | Cambios | Autor |
|---------|-------|---------|-------|
| 1.0.0 | 2026-03-02 | Especificación fundacional | TAMV_DOC_SENTINEL |

---

*Documento integrado al canon TAMV bajo principio de trazabilidad.  
Cualquier modificación requiere revisión constitucional (QC-TAMV-01).*

---

## Fuente: federation/tamv-digital-nexus/docs/modules/guardianias/guardianias_hexa_edimap_bridge.md

# Guardianías: Puente HEXA-EDIMAP

> **Estado:** `stable` · **Versión:** 1.0.0 · **Clasificación:** Integración Arquitectónica  
> **Relación:** HEXA-EDIMAP Guardian Pattern ↔ TAMV Guardianías Implementadas

---

## Resumen Ejecutivo

Este documento establece el puente conceptual y técnico entre el patrón `Guardian` de HEXA-EDIMAP y las guardianías implementadas en TAMV (Anubis, Dekateotl, Horus, Osiris).

| Concepto HEXA-EDIMAP | Implementación TAMV | Estado |
|----------------------|---------------------|--------|
| `Guardian` interface | `AnubisSecuritySystem` | ✅ Implementado |
| `evaluate(context)` | `validateOperation()` / `checkThreats()` | ✅ Equivalente |
| `Decision` type | `SecurityDecision` | ✅ Equivalente |
| `EconomicGuardian` | MSR Rules + Economic Checks | 🟡 Parcial |
| Composite Guardian | Guardian Chain TAMV | 🔴 Por definir |

---

## Patrón HEXA-EDIMAP: Guardian

### Interface Base

```typescript
// HEXA-EDIMAP Standard Interface
interface Guardian {
  evaluate(context: GuardianContext): GuardianDecision;
  getActiveRuleVersion(): string;
  getLastReason(): string | null;
}

type GuardianDecision = "ALLOW" | "HOLD" | "BLOCK";

interface GuardianContext {
  timestamp: Date;
  actor: string;
  action: string;
  payload: any;
  riskScore?: number;
  metadata?: Record<string, any>;
}
```

### Responsabilidades

1. **Evaluación Síncrona** → Debe responder en < 10ms
2. **Decisión Ternaria** → ALLOW (continuar), HOLD (revisar), BLOCK (denegar)
3. **Trazabilidad** → Cada decisión se registra con razón
4. **Versionado** → Las reglas están versionadas (`EconomicPolicy.v1`)

---

## Mapeo a Guardianías TAMV

### Anubis Security System

```typescript
// src/systems/AnubisSecuritySystem.ts - Adaptación HEXA-EDIMAP

import { Guardian, GuardianDecision, GuardianContext } from "../../lib/guardians/base";

/**
 * Anubis adaptado al patrón Guardian de HEXA-EDIMAP
 * 
 * Responsabilidades:
 * - Pre-flight security checks
 * - Threat detection
 * - Quantum-resistant validation
 */
export class AnubisGuardianAdapter implements Guardian {
  private anubis: AnubisSecuritySystem;
  private ruleVersion = "SecurityPolicy.v2.1";
  private lastReason: string | null = null;

  constructor(anubisInstance: AnubisSecuritySystem) {
    this.anubis = anubisInstance;
  }

  evaluate(context: GuardianContext): GuardianDecision {
    // Adaptación de contexto TAMV a evaluación Anubis
    const threatLevel = this.anubis.checkThreats({
      userId: context.actor,
      action: context.action,
      payload: context.payload,
      timestamp: context.timestamp
    });

    const isValid = this.anubis.validateOperation({
      signature: context.payload.signature,
      quantumResistant: true
    });

    // Mapeo de resultado Anubis a decisión HEXA-EDIMAP
    if (!isValid || threatLevel === "CRITICAL") {
      this.lastReason = `Anubis validation failed: ${threatLevel}`;
      return "BLOCK";
    }

    if (threatLevel === "ELEVATED" || context.riskScore && context.riskScore > 0.7) {
      this.lastReason = `Elevated threat detected: ${threatLevel}`;
      return "HOLD";
    }

    this.lastReason = null;
    return "ALLOW";
  }

  getActiveRuleVersion(): string {
    return this.ruleVersion;
  }

  getLastReason(): string | null {
    return this.lastReason;
  }
}
```

### Dekateotl Security

```typescript
// Adaptación Dekateotl al patrón Guardian

/**
 * DekateotlGuardian - Protección post-cuántica y TEE
 * 
 * HEXA-EDIMAP: Guardian especializado en criptografía
 */
export class DekateotlGuardian implements Guardian {
  private ruleVersion = "CryptoPolicy.v1.5";
  private lastReason: string | null = null;

  constructor(
    private teeClient: TEEClient,
    private pqCrypto: PostQuantumCrypto
  ) {}

  evaluate(context: GuardianContext): GuardianDecision {
    // Verificación TEE
    const teeValid = this.teeClient.verifyAttestation(context.payload.teeProof);
    
    if (!teeValid) {
      this.lastReason = "TEE attestation failed";
      return "BLOCK";
    }

    // Verificación post-cuántica
    const pqValid = this.pqCrypto.verifySignature(
      context.payload.signature,
      context.payload.data
    );

    if (!pqValid) {
      this.lastReason = "Post-quantum signature invalid";
      return "BLOCK";
    }

    return "ALLOW";
  }

  getActiveRuleVersion(): string {
    return this.ruleVersion;
  }

  getLastReason(): string | null {
    return this.lastReason;
  }
}
```

### Horus Sentinel (Análisis Predictivo)

```typescript
// Adaptación Horus al patrón Guardian

/**
 * HorusGuardian - Detección de anomalías predictiva
 * 
 * HEXA-EDIMAP: Guardian con capacidad predictiva
 * Integración: Cold Pipeline → Hot Pipeline insights
 */
export class HorusGuardian implements Guardian {
  private ruleVersion = "AnomalyPolicy.v3";
  private lastReason: string | null = null;

  constructor(
    private anomalyModel: AnomalyDetectionModel,
    private coldPipelineMetrics: ColdMetricsClient
  ) {}

  evaluate(context: GuardianContext): GuardianDecision {
    // Análisis en tiempo real
    const anomalyScore = this.anomalyModel.score({
      userId: context.actor,
      action: context.action,
      timestamp: context.timestamp,
      pattern: context.payload
    });

    // Consulta a métricas del Cold Pipeline
    const driftScore = this.coldPipelineMetrics.getDriftScore(context.actor);

    // Decisión combinada
    if (anomalyScore > 0.9 || driftScore > 0.8) {
      this.lastReason = `Critical anomaly: score=${anomalyScore}, drift=${driftScore}`;
      return "BLOCK";
    }

    if (anomalyScore > 0.7 || driftScore > 0.6) {
      this.lastReason = `Elevated anomaly: score=${anomalyScore}`;
      return "HOLD";
    }

    return "ALLOW";
  }

  getActiveRuleVersion(): string {
    return this.ruleVersion;
  }

  getLastReason(): string | null {
    return this.lastReason;
  }
}
```

---

## Composite Guardian: Cadena de Guardianías

HEXA-EDIMAP permite componer guardianías en cadena para evaluaciones complejas.

```typescript
// src/lib/guardians/composite.ts

/**
 * CompositeGuardian - Cadena de guardianías TAMV
 * 
 * Evalúa múltiples guardianes en orden:
 * 1. Anubis (Seguridad base)
 * 2. Dekateotl (Criptografía)
 * 3. Horus (Anomalías)
 * 4. EconomicGuardian (Reglas económicas)
 */
export class CompositeGuardian implements Guardian {
  private lastReason: string | null = null;
  private ruleVersions: string[] = [];

  constructor(
    private guardians: Guardian[],
    private mode: "strict" | "lenient" = "strict"
  ) {
    this.ruleVersions = guardians.map(g => g.getActiveRuleVersion());
  }

  evaluate(context: GuardianContext): GuardianDecision {
    for (const guardian of this.guardians) {
      const decision = guardian.evaluate(context);

      // Modo estricto: cualquier BLOCK o HOLD detiene
      if (this.mode === "strict" && decision !== "ALLOW") {
        this.lastReason = `${guardian.constructor.name}: ${guardian.getLastReason()}`;
        return decision;
      }

      // Modo lenient: solo BLOCK detiene
      if (this.mode === "lenient" && decision === "BLOCK") {
        this.lastReason = `${guardian.constructor.name}: ${guardian.getLastReason()}`;
        return "BLOCK";
      }
    }

    this.lastReason = null;
    return "ALLOW";
  }

  getActiveRuleVersion(): string {
    return this.ruleVersions.join(" + ");
  }

  getLastReason(): string | null {
    return this.lastReason;
  }
}

// Uso en TAMV
export function createTAMVGuardianChain(): CompositeGuardian {
  return new CompositeGuardian([
    new AnubisGuardianAdapter(anubis),
    new DekateotlGuardian(teeClient, pqCrypto),
    new HorusGuardian(anomalyModel, metricsClient),
    new EconomicGuardian(10000, 50000) // maxTransfer, dailyLimit
  ], "strict");
}
```

---

## Integration con Hot Pipeline

```typescript
// Ejemplo de uso en Hot Pipeline con guardianías TAMV

import { HotPipeline } from "../../lib/pipeline/hot";
import { createTAMVGuardianChain } from "./composite";

const guardianChain = createTAMVGuardianChain();
const hotPipeline = new HotPipeline(eventStore, eventBus);

// Transferencia de Tau con protección completa
async function transferTau(input: TransferInput) {
  const result = await hotPipeline.execute(
    transferCommand,
    guardianChain,  // Todas las guardianías TAMV
    input
  );

  if (result.status === "BLOCKED") {
    await notifySecurityTeam({
      correlationId: result.correlationId,
      reason: result.reason,
      input
    });
  }

  return result;
}
```

---

## Matriz de Decisiones

| Guardianía | ALLOW | HOLD | BLOCK | Latencia |
|------------|-------|------|-------|----------|
| Anubis | Validación OK | Riesgo medio | Amenaza crítica | < 5ms |
| Dekateotl | TEE + PQ OK | — | TEE/PQ falla | < 3ms |
| Horus | Score < 0.7 | 0.7-0.9 | > 0.9 | < 10ms |
| Economic | Dentro límites | > 80% límite | > límite | < 1ms |
| **Cadena** | Todos ALLOW | Primer HOLD | Primer BLOCK | < 20ms |

---

## Eventos de Guardianía

Cada evaluación genera eventos para el Event Store:

```typescript
interface GuardianEvaluationEvent extends DomainEvent {
  type: "GuardianEvaluation";
  payload: {
    guardianType: string;        // "Anubis", "Economic", etc.
    decision: "ALLOW" | "HOLD" | "BLOCK";
    reason?: string;
    context: GuardianContext;
    latencyMs: number;
  };
  ruleVersion: string;
}

interface GuardianChainEvent extends DomainEvent {
  type: "GuardianChainEvaluation";
  payload: {
    chain: string[];             // ["Anubis", "Dekateotl", ...]
    finalDecision: "ALLOW" | "HOLD" | "BLOCK";
    individualDecisions: Record<string, string>;
    totalLatencyMs: number;
  };
}
```

---

## Referencias

| Documento | Descripción |
|-----------|-------------|
| `14_hexa_edimap_architecture.md` | §6.4 Guardianías, §7 Hot Pipeline |
| `14b_hexa_edimap_tamv_integration_map.md` | Mapeo técnico detallado |
| `guardianias_summary.md` | Resumen de guardianías TAMV |
| `guardianias_internal.md` | Detalles internos de implementación |
| `08_seguridad_sentinel_y_radares.md` | Seguridad y radares |

---

*Puente arquitectónico v1.0.0 — Documento de integración continua*

---

## Fuente: federation/tamv-digital-nexus/docs/modules/guardianias/guardianias_public.md

# Guardianías TAMV — Documento Público

> **Estado:** `stable` · **Acceso:** PÚBLICO

## ¿Qué son las Guardianías?

Las Guardianías son los sistemas de protección civilizatoria del ecosistema TAMV Digital Nexus. Operan de forma continua para garantizar la seguridad, integridad y dignidad de todos los participantes de la plataforma.

## Principios de operación

1. **Protección sin vigilancia masiva**: Las Guardianías protegen sin almacenar datos sensibles innecesarios.
2. **Dignidad civilizatoria**: Las acciones de seguridad respetan los derechos y dignidad de los usuarios.
3. **Transparencia de incidentes**: Los usuarios son notificados de eventos de seguridad que les afecten.
4. **Auto-sanación**: El sistema se recupera automáticamente de la mayoría de amenazas.

## ¿Qué protegen?

- Tu identidad y cuenta personal.
- Tus tokens TCEP y TAU.
- Tu contenido y creaciones en la plataforma.
- La integridad del ecosistema civilizatorio.

## Guardianías visibles

- **Anubis**: El centinela principal. Escanea y responde ante amenazas.
- **Horus**: El vigilante en tiempo real. Monitorea actividad anómala.

## Reporte de incidentes

Para reportar un problema de seguridad, visita `/anubis` en la plataforma o consulta `SECURITY.md`.

---

## Fuente: federation/tamv-digital-nexus/docs/modules/msr/msr_public.md

# Economía TAMV — Documento Público

> **Estado:** `stable` · **Acceso:** PÚBLICO

## Sistema de tokens TAMV

TAMV Digital Nexus opera con una economía digital propia basada en dos tokens:

### TCEP — Créditos de Plataforma
- Se obtienen participando activamente en la plataforma.
- Se usan para compras, gifts digitales y acceso a contenido premium.

### TAU — Token de Acción Universal
- Se obtienen mediante compras o logros destacados.
- Dan acceso a experiencias exclusivas, gobernanza y features avanzados.

## Membresías

| Tier | Beneficios |
|------|-----------|
| Free | Acceso al ecosistema básico |
| Premium | Funcionalidades avanzadas + Isabella Pro |
| VIP | Experiencias XR exclusivas |
| Elite | Acceso total + prioridad de soporte |
| Celestial | Tier máximo de la comunidad |
| Enterprise | Para organizaciones federadas |

## Tu billetera

Accede a tu billetera en `/economy` para ver tu balance, historial de transacciones y gestionar tu membresía.

## Seguridad de transacciones

Todas las transacciones están protegidas por el sistema Anubis y son auditables. Los pagos con tarjeta se procesan mediante Stripe con certificación PCI DSS.

---

## Fuente: federation/tamv-digital-nexus/docs/ops/runbooks/canary-weights.md

# Runbook: canary-weights

## Objetivo
Operar el script `scripts/canary-weights.sh` de manera trazable y auditable.

## Precondiciones
- Acceso al entorno objetivo (dev|stage|prod).
- Permisos mínimos definidos en `docs/ops/runbooks/README.md`.
- Ticket de cambio/incidente vinculado.

## Ejecución
1. Revisar ayuda: `./scripts/canary-weights.sh --help`
2. Ejecutar con parámetros mínimos y `--json` para evidencia estructurada.
3. Guardar salida JSON y asociarla al `operation_id`.

## Validación
- Código de salida `0`.
- Contrato de salida contiene `script`, `status` (o equivalente) y `timestamp`.
- Evento BookPI publicado/referenciado.

## Rollback / remediación
- Si falla con código `2`: corregir parámetros y reintentar.
- Si falla con código `3`: restaurar dependencias del runner.
- Si falla con código `4`: escalar a seguridad/plataforma según política.
- Si falla con código `5`: abrir incidente y adjuntar logs completos.

## Evidencia requerida (BookPI)
- `operation_id`, parámetros no sensibles, salida JSON, código de salida, hash de evidencia y enlace a ticket.

---

## Fuente: federation/tamv-digital-nexus/docs/ops/runbooks/drain-dlq.md

# Runbook: drain-dlq

## Objetivo
Operar el script `scripts/drain-dlq.sh` de manera trazable y auditable.

## Precondiciones
- Acceso al entorno objetivo (dev|stage|prod).
- Permisos mínimos definidos en `docs/ops/runbooks/README.md`.
- Ticket de cambio/incidente vinculado.

## Ejecución
1. Revisar ayuda: `./scripts/drain-dlq.sh --help`
2. Ejecutar con parámetros mínimos y `--json` para evidencia estructurada.
3. Guardar salida JSON y asociarla al `operation_id`.

## Validación
- Código de salida `0`.
- Contrato de salida contiene `script`, `status` (o equivalente) y `timestamp`.
- Evento BookPI publicado/referenciado.

## Rollback / remediación
- Si falla con código `2`: corregir parámetros y reintentar.
- Si falla con código `3`: restaurar dependencias del runner.
- Si falla con código `4`: escalar a seguridad/plataforma según política.
- Si falla con código `5`: abrir incidente y adjuntar logs completos.

## Evidencia requerida (BookPI)
- `operation_id`, parámetros no sensibles, salida JSON, código de salida, hash de evidencia y enlace a ticket.

---

## Fuente: federation/tamv-digital-nexus/docs/ops/runbooks/pi-check.md

# Runbook: pi-check

## Objetivo
Operar el script `scripts/pi-check.sh` de manera trazable y auditable.

## Precondiciones
- Acceso al entorno objetivo (dev|stage|prod).
- Permisos mínimos definidos en `docs/ops/runbooks/README.md`.
- Ticket de cambio/incidente vinculado.

## Ejecución
1. Revisar ayuda: `./scripts/pi-check.sh --help`
2. Ejecutar con parámetros mínimos y `--json` para evidencia estructurada.
3. Guardar salida JSON y asociarla al `operation_id`.

## Validación
- Código de salida `0`.
- Contrato de salida contiene `script`, `status` (o equivalente) y `timestamp`.
- Evento BookPI publicado/referenciado.

## Rollback / remediación
- Si falla con código `2`: corregir parámetros y reintentar.
- Si falla con código `3`: restaurar dependencias del runner.
- Si falla con código `4`: escalar a seguridad/plataforma según política.
- Si falla con código `5`: abrir incidente y adjuntar logs completos.

## Evidencia requerida (BookPI)
- `operation_id`, parámetros no sensibles, salida JSON, código de salida, hash de evidencia y enlace a ticket.

---

## Fuente: federation/tamv-digital-nexus/docs/ops/runbooks/publish-bookpi.md

# Runbook: publish-bookpi

## Objetivo
Operar el script `scripts/publish-bookpi.sh` de manera trazable y auditable.

## Precondiciones
- Acceso al entorno objetivo (dev|stage|prod).
- Permisos mínimos definidos en `docs/ops/runbooks/README.md`.
- Ticket de cambio/incidente vinculado.

## Ejecución
1. Revisar ayuda: `./scripts/publish-bookpi.sh --help`
2. Ejecutar con parámetros mínimos y `--json` para evidencia estructurada.
3. Guardar salida JSON y asociarla al `operation_id`.

## Validación
- Código de salida `0`.
- Contrato de salida contiene `script`, `status` (o equivalente) y `timestamp`.
- Evento BookPI publicado/referenciado.

## Rollback / remediación
- Si falla con código `2`: corregir parámetros y reintentar.
- Si falla con código `3`: restaurar dependencias del runner.
- Si falla con código `4`: escalar a seguridad/plataforma según política.
- Si falla con código `5`: abrir incidente y adjuntar logs completos.

## Evidencia requerida (BookPI)
- `operation_id`, parámetros no sensibles, salida JSON, código de salida, hash de evidencia y enlace a ticket.

---

## Fuente: federation/tamv-digital-nexus/docs/ops/runbooks/rotate-keys.md

# Runbook: rotate-keys

## Objetivo
Operar el script `scripts/rotate-keys.sh` de manera trazable y auditable.

## Precondiciones
- Acceso al entorno objetivo (dev|stage|prod).
- Permisos mínimos definidos en `docs/ops/runbooks/README.md`.
- Ticket de cambio/incidente vinculado.

## Ejecución
1. Revisar ayuda: `./scripts/rotate-keys.sh --help`
2. Ejecutar con parámetros mínimos y `--json` para evidencia estructurada.
3. Guardar salida JSON y asociarla al `operation_id`.

## Validación
- Código de salida `0`.
- Contrato de salida contiene `script`, `status` (o equivalente) y `timestamp`.
- Evento BookPI publicado/referenciado.

## Rollback / remediación
- Si falla con código `2`: corregir parámetros y reintentar.
- Si falla con código `3`: restaurar dependencias del runner.
- Si falla con código `4`: escalar a seguridad/plataforma según política.
- Si falla con código `5`: abrir incidente y adjuntar logs completos.

## Evidencia requerida (BookPI)
- `operation_id`, parámetros no sensibles, salida JSON, código de salida, hash de evidencia y enlace a ticket.

---

## Fuente: federation/tamv-digital-nexus/docs/repo-unification/federated-ingestion-protocol.md

# Federated Ingestion Protocol (TAMV)

**Version:** 1.0.0  
**Mode:** DOCUMENTAL_ONLY  
**Scope:** Absorción federada de repositorios hacia dominios TAMV

## Flujo obligatorio (secuencial y bloqueante)

Toda absorción **DEBE** ejecutar el siguiente flujo, sin omitir etapas:

1. **Discovery**
2. **Scoring**
3. **Sandbox Import**
4. **Contract Fit**
5. **Security/License Gate**
6. **Merge**

Si una etapa falla, el proceso cambia a estado `rejected` o vuelve a `draft` con acciones correctivas.

---

## 1) Discovery

Objetivo: identificar origen, alcance y artefactos del repositorio candidato.

Entradas mínimas:
- URL del repo y commit/tag de referencia.
- Metadatos de licencia declarada.
- Inventario base (lenguajes, módulos, dependencias, CI).

Salidas mínimas:
- Registro en `federated_sources.json`.
- Ficha de Absorción inicial (`status: draft`).

## 2) Scoring

Objetivo: priorizar absorciones con una métrica trazable.

Dimensiones sugeridas (0–5):
- Relevancia TAMV por dominio destino.
- Calidad técnica/mantenibilidad.
- Cobertura documental.
- Riesgo operativo.
- Riesgo legal/licencia.

Regla:
- `score_total` normalizado 0–100.
- Candidatos con score bajo umbral pasan a `rejected` o backlog.

## 3) Sandbox Import

Objetivo: aislar la ingesta y validar reproducibilidad sin afectar módulos críticos.

Controles:
- Import en entorno sandbox/documental.
- Congelado de dependencias y snapshot de artefactos.
- Generación de evidencia (logs, hashes, manifiestos).

Resultado:
- `AuditBundle` preliminar BookPI-ready.

## 4) Contract Fit

Objetivo: validar encaje con contratos canónicos TAMV.

Verificaciones:
- Compatibilidad con dominios y taxonomía TAMV.
- Mapeo de interfaces/contratos esperados.
- No colisión con módulos canónicos.

Resultado:
- Dictamen: `fit`, `fit-with-gaps`, o `no-fit`.

## 5) Security/License Gate

Objetivo: bloquear absorciones inseguras o legalmente incompatibles.

Validaciones obligatorias:
- Licencia compatible con política TAMV.
- Dependencias críticas con mantenimiento activo.
- Ausencia de incidentes de seguridad críticos sin parche.
- No evidencia de breach comprometido sin remediación verificable.

Resultado:
- Gate `pass` o `fail`.
- `fail` implica estado `rejected` automático.

## 6) Merge

Objetivo: integración documental y trazabilidad final.

Precondiciones:
- Contract Fit != `no-fit`.
- Security/License Gate = `pass`.
- AuditBundle completo y referenciado.

Salida:
- Estado actualizado (`validated` o `integrated`).
- Evidencia enlazada en Ficha y en índice federado.

---

## Estados de absorción

- `draft`: descubierto o en evaluación inicial.
- `validated`: superó controles clave, pendiente de integración plena.
- `integrated`: absorbido y trazado en canon operativo.
- `rejected`: descartado por reglas automáticas o no-fit estructural.

## Criterios de rechazo automáticos

Una absorción pasa a `rejected` sin excepción cuando ocurra cualquiera:

1. **Licencia incompatible** con política TAMV o sin licencia verificable.
2. **Dependencias críticas sin mantenimiento** (abandono confirmado, sin reemplazo viable).
3. **Breach o vulnerabilidad crítica activa** sin parche/remediación verificable.

## AuditBundle documental (BookPI-ready)

Cada absorción DEBE enlazar un `AuditBundle` con:
- `manifest.json` (metadatos, hash, versión, timestamps).
- `evidence/` (capturas de análisis, reportes, logs, SBOM si aplica).
- `decision.md` (dictamen, riesgos, justificación y estado).

Convención de referencia en ficha:
- `audit_bundle_ref`: ruta o URI estable del paquete.
- `bookpi_ready`: `true|false`.

## Trazabilidad mínima requerida

- Source ID único por repositorio.
- Fecha/hora UTC por transición de estado.
- Responsable documental y versión de protocolo aplicada.

---

## Fuente: federation/tamv-digital-nexus/docs/repo-unification/fichas/FICHA_ABSORCION_TEMPLATE.md

# Ficha de Absorción — {{source_id}}

## 1. Identificación
- **Source ID:** {{source_id}}
- **Repositorio (URL):** {{url}}
- **Ref evaluada (tag/commit):** {{ref}}
- **Responsable documental:** {{owner}}
- **Fecha UTC:** {{date_utc}}

## 2. Estado de absorción
- **Estado:** `draft | validated | integrated | rejected`
- **Fase actual:** `discovery | scoring | sandbox-import | contract-fit | security-license-gate | merge`
- **Score total (0-100):** {{score_total}}

## 3. Dominio TAMV destino
- **Dominio objetivo:** {{tamv_target_domain}}
- **Justificación de encaje:** {{fit_rationale}}

## 4. Riesgo y licencia
- **Licencia:** {{license}}
- **Riesgo global:** `low | medium | high | critical`
- **Riesgos clave:**
  - {{risk_1}}
  - {{risk_2}}

## 5. AuditBundle (BookPI-ready)
- **AuditBundle ref:** {{audit_bundle_ref}}
- **BookPI-ready:** `true | false`
- **Contenido mínimo verificado:**
  - `manifest.json`
  - `evidence/`
  - `decision.md`

## 6. Gate y decisión
- **Contract Fit:** `fit | fit-with-gaps | no-fit`
- **Security/License Gate:** `pass | fail`
- **Decisión final:** `continue | integrate | reject`
- **Motivo de decisión:** {{decision_rationale}}

## 7. Rechazo automático (si aplica)
Marcar `true/false`:
- **Licencia incompatible:** {{reject_incompatible_license}}
- **Dependencias críticas sin mantenimiento:** {{reject_unmaintained_critical_dependencies}}
- **Breach/vulnerabilidad crítica sin remediación:** {{reject_unremediated_critical_breach}}

> Si cualquiera es `true`, el estado final DEBE ser `rejected`.

## 8. Trazabilidad
| Timestamp UTC | Cambio de estado | Actor | Evidencia |
|---|---|---|---|
| {{ts_1}} | {{state_change_1}} | {{actor_1}} | {{evidence_1}} |

---

## Fuente: federation/tamv-digital-nexus/docs/unified/02_AUDIT_AND_SECURITY_TRAILS_UNIFIED.md

# 02 Audit and Security Trails Unified

Documento consolidado para seguimiento de hallazgos críticos de Nexus/OpenDA con estados, severidad, evidencia y remediación.

---

## Fuente: federation/tamv-digital-nexus/docs/unified/03_DOMAIN_MODULES_UNIFIED.md

# 03 Domain Modules Unified

Documento consolidado de dominios constitucionales (Economía, Social, XR, IA, Governance) con intents, constraints y pilotos.

---

## Fuente: federation/tamv-digital-nexus/domains/README.md

# domains/

## Propósito
Define dominios de negocio y bounded contexts de TAMV.

## Responsables
- Arquitectura de Producto
- Líderes de Dominio

## Contratos esperados
- Cada dominio documenta entidades, eventos y reglas.
- Interfaces públicas deben ser estables y versionadas.

---

## Fuente: federation/tamv-digital-nexus/infra/README.md

# infra/

## Propósito
Centraliza IaC, configuración operativa y despliegues por entorno.

## Responsables
- DevOps/SRE
- Seguridad de Plataforma

## Contratos esperados
- Cambios de infraestructura deben ser declarativos y auditables.
- Toda configuración sensible usa secretos externos y no hardcodeados.

---

## Fuente: federation/tamv-the-federated-frontier/docs/civilizatory-components-wiki.md

# TAMV Civilizatory Components Wiki

## 1) Protocolos y kernels
- **Core Protocol Engine**: ejecuta ciclo de vida, comandos y políticas de constitución.
- **Kernel TAMV**: conjunto de servicios base para identidad, memoria, guardianía y orquestación.
- **Korima Codex**: capa doctrinal y semántica para decisiones con impacto civilizatorio.

## 2) Memoria y trazabilidad
- **MSR Blockchain**: registro de eventos críticos con integridad verificable.
- **BookPI**: narrativa pública/auditable de decisiones y contexto.
- **EOCT**: evaluación ética continua antes, durante y después de acciones automatizadas.

## 3) Guardianía
- **Anubis Centinel**: defensa de perímetro lógico y detección de anomalías de flujo.
- **Horus Centinel**: visión operacional, correlación de señales y telemetría crítica.
- **Radar Ojo de Ra**: observabilidad estratégica en tiempo real.
- **Radar Ojo de Quetzalcóatl**: observabilidad sociotécnica y señales de resiliencia.
- **Radares gemelos MOS**: instrumentación paralela para verificación cruzada.

## 4) Identidad, economía y experiencia
- **ID-NVIDA**: identidad soberana federada y control de acceso por rol/capacidad.
- **UTAMV**: unidad transaccional interna de contribución/uso (no especulativa).
- **GEMET**: malla de metadatos y taxonomía de conocimiento operativo.
- **KAOS Audio System**: sistema de señal sonora para experiencia inmersiva y alarmas UX.
- **CITEMESH**: tejido civilizatorio de cells y servicios federados.

## 5) Dimensión simbólica
- **Dekateotl** y **Aztek Gods**: namespace simbólico-cultural para modos narrativos/experienciales.
- **Método 4L**: ciclo operativo `Listen → Learn → Link → Legitimize`.

## 6) Reglas de diseño
- Transparencia por defecto.
- Trazabilidad obligatoria en decisiones de alto impacto.
- Interoperabilidad entre módulos mediante contratos explícitos.

---

