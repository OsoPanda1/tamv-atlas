# TAMV MD-X4 — Integración funcional tipo Schedra.io

- Fecha de consolidación: 2026-05-20
- Estado: Activo (en integración controlada)
- Fuente estratégica: propuesta TAMV MD-X4 (equipo TAMV)

## Objetivo
Integrar en TAMV una capa de estudio creativo-social con gobernanza, seguridad y trazabilidad, evitando expansión infinita mediante cierre por módulos (freeze gates).

## Catálogo de módulos nuevos

| ID | Módulo | Capa TAMV | Estado | Criterio de cierre |
|---|---|---|---|---|
| SM01 | Social Dashboard | L0 | En diseño | APIs sociales conectadas + panel único operativo |
| AI03 | VideoGen Studio | L2 | En diseño | 2+ proveedores de video IA con fallback |
| AI04 | Captioner | L2 | En diseño | generación de copy/caption con plantillas auditables |
| AI05 | VoiceSynth | L2 | En diseño | síntesis emocional con perfiles de voz |
| SC01 | Scheduler | L1 | En desarrollo | publicación programada + reciclaje evergreen |
| AN01 | Audience Analytics | L1 | En diseño | recomendaciones horarias explicables |
| EC02 | SaaS Access | L1 | En diseño | plan de suscripción con límites y créditos |

## Integración por capas
- **L0 Shell**: SM01 centraliza conexiones y estado de publicación.
- **L1 Servicios**: SC01 + AN01 exponen contratos vía gateway y notificaciones.
- **L2 Motores IA**: AI03/AI04/AI05 se integran a DreamSpaces + KAOS Audio 3D.
- **L3 Orquestación**: Isabella IA decide intents creativos y agenda social.
- **L4 Gobernanza**: comité publica política de uso para IA creativa y social.

## Entregables técnicos mínimos
1. Contratos API para `social-connect`, `schedule-job`, `analytics-insight`.
2. Registro BookPI por cada release de contenido asistido por IA.
3. Hash interno TAMV (`sha256`) sobre manifiestos de publicación.
4. Freeze por módulo al cumplir DoD (Definition of Done).

## Política de cierre (module freeze)
- Un módulo se congela cuando cumple:
  1. contrato estable,
  2. pruebas verdes,
  3. bitácora BookPI,
  4. runbook operativo.
- Todo cambio posterior entra como RFC de descongelamiento.
