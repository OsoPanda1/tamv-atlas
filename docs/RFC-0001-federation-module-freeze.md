# RFC-0001 — Proceso de triple revisión, clasificación federada y congelamiento modular

- **Estado:** Draft
- **Fecha:** 2026-05-20
- **Autor:** TAMV Atlas Agent
- **Ámbito:** `tamv-digital-nexus`

## 1. Contexto

Para evitar expansión infinita durante la unificación de repositorios de `OsoPanda1`, se define un proceso operativo obligatorio con:

1. **Triple revisión** por repositorio,
2. **Clasificación por federaciones** según contenido,
3. **Integración incremental** con trazabilidad,
4. **Congelamiento de módulos** al cierre de criterios.

## 2. Objetivo

Convertir discovery en integración controlada, robusta y modular; registrar cada avance con evidencia fechada y SHA interno de TAMV.

## 3. Triple revisión (3 pasadas)

Cada repositorio debe pasar por estas revisiones:

### R1 — Estructural

- Tipo de repo: app, servicio, librería, infra, docs, data.
- Stack técnico principal y secundario.
- Dependencias críticas y estado de mantenimiento.

### R2 — Semántica de dominio

- Dominio funcional: identidad, atlas, protocolo, economía, XR, etc.
- Capacidades exportables (módulos reutilizables).
- Riesgos de colisión de nombres y contratos.

### R3 — Operativa / seguridad

- Estado de pruebas y build.
- Señales de seguridad (secrets hardcoded, permisos, dependencias vulnerables).
- Preparación para freeze (criterios de definición de terminado).

## 4. Clasificación por federaciones

Se recomienda el siguiente mapeo de alto nivel:

- `federation/identity/*`
- `federation/atlas/*`
- `federation/protocol/*`
- `federation/economy/*`
- `federation/xr/*`
- `federation/infra/*`
- `federation/docs/*`
- `federation/misc/*`

> Nota: el import físico puede continuar en `federation/<repo>`; la federación se expresa en el manifiesto de clasificación para convergencia posterior.

## 5. Trazabilidad obligatoria

Cada ejecución debe persistir:

- `run_id` (UTC timestamp)
- `generated_at_utc`
- `repo`, `default_branch`, URLs
- Resultados de R1/R2/R3
- `federation`
- `tamv_internal_sha` (SHA de `HEAD` del repo TAMV al momento del registro)

## 6. Criterios de freeze modular

Un módulo puede marcarse como `frozen` cuando:

1. Tiene clasificación federada confirmada,
2. Tiene contrato de integración definido,
3. Tiene estado de pruebas documentado,
4. No tiene bloqueantes críticos abiertos,
5. Tiene revisión de cierre aprobada.

Estados:

- `open`
- `in_review`
- `frozen`

## 7. Flujo de integración (resumen)

1. Discovery e import controlado por script.
2. Triple revisión automática asistida por heurísticas.
3. Generación de backlog de integración por federación.
4. Cierre de módulos con freeze progresivo.

## 8. Entregables técnicos mínimos

- Manifiesto de repos: `docs/repo-unification-manifest.json`
- Clasificación triple revisión: `docs/repo-federation-classification.json`
- Índice de freeze: `docs/module-freeze-index.json`

## 9. Compatibilidad con canon

Este RFC propone gobernanza documental y de integración incremental sin forzar cambios en lógica crítica de producción.
