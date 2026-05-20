# TAMV MD-X4 — The Federated Frontier

Implementación frontend + núcleo TypeScript de servicios TAMV para validar arquitectura federada, trazabilidad y cierre de módulos con criterio humano.

## 1) Qué es este repositorio
Este proyecto contiene dos capas principales:

- **Aplicación web (React + Vite)** para navegación, páginas públicas y visualización de integración.
- **Núcleo de servicios (`src/core`)** con contratos y lógica replicable para protocolo, memoria, ética, identidad, economía, social, XR y gobernanza THCF.

El objetivo actual es pasar de landing a base funcional modular, sin acoplar todavía persistencia real, backend HTTP productivo ni infraestructura distribuida.

---

## 2) Arquitectura implementada (estado real)

### L0–L2 (doctrina, memoria, protocolos)
- `src/core/protocol/*`
  - `ProtocolEngine`, `ProtocolOrchestrator`, lifecycle, constitution, command, adapters.
- `src/core/memory/*`
  - `MsrEngine` para eventos auditable-style.
  - `BookPi` para narrativas trazables.
- `src/core/eoct/eoct.service.ts`
  - Evaluación ética base (reglas mínimas do-no-harm).

### L3–L4 (guardianía y XR)
- `src/core/guardian/protocol.monitoring.guardian.ts`
  - Señales de observabilidad/alerta.
- `src/core/xr/*`
  - `protocol.visual.xr.ts` (traducción estado->escena),
  - `xr.renderer.adapter.ts` (escena->instrucción de render),
  - `xr.gateway.ts` (pub/sub de eventos),
  - `dreamspaces.service.ts` (espacios y permisos).

### L5 (servicios de dominio)
- `src/core/identity/idnvida.service.ts`
- `src/core/economy/*` (`ledger.internal`, `memberships`, `economy.service`)
- `src/core/social/*` (posts, canales, mensajes directos)

### L6 (shell UX)
- Rutas React en `src/App.tsx`
- Navegación en `src/components/Layout.tsx`
- Páginas de contenido/integración (`ManifestoHumano`, `IntegracionTamv`, etc.)

### L7 (gobernanza de complejidad)
- `src/core/protocol/thcf.*`
  - **TAMV Human Coherence Filter (THCF)**: evalúa cada módulo por entendibilidad, justificación humana, coherencia operacional y límites.
- `src/core/domain/module-registry.service.ts`
  - Registro y cierre de módulos con estado (`draft`, `in_review`, `closed`, `rework`, `rejected`).

---

## 3) Estructura rápida

```txt
src/
  core/
    api/
    catalog/
    domain/
    economy/
    eoct/
    guardian/
    identity/
    isabella/
    memory/
    protocol/
    social/
    xr/
  data/
  pages/
  test/
```

---

## 4) Integración de fuentes abiertas TAMV

- Catálogo técnico: `src/data/tamv-open-web-catalog.ts`
- Servicio de integración: `src/core/catalog/tamv.catalog.service.ts`
- Vista UI: `src/pages/IntegracionTamv.tsx`

Se usa para mapear fuentes públicas a semillas de módulos evaluables por THCF.

---

## 5) Scripts

```bash
npm install

---

## 4) Integración de fuentes abiertas TAMV

- Catálogo técnico: `src/data/tamv-open-web-catalog.ts`
- Servicio de integración: `src/core/catalog/tamv.catalog.service.ts`
- Vista UI: `src/pages/IntegracionTamv.tsx`

Se usa para mapear fuentes públicas a semillas de módulos evaluables por THCF.

---

## 5) Scripts

```bash
npm install

---

## 4) Integración de fuentes abiertas TAMV

- Catálogo técnico: `src/data/tamv-open-web-catalog.ts`
- Servicio de integración: `src/core/catalog/tamv.catalog.service.ts`
- Vista UI: `src/pages/IntegracionTamv.tsx`

Se usa para mapear fuentes públicas a semillas de módulos evaluables por THCF.

---

## 5) Scripts

```bash
npm install
# TAMV — The Federated Frontier

Repositorio de implementación funcional para TAMV MD-X4.

## Objetivo
Construir una base técnica replicable con módulos claros, auditables y cerrables.

## TAMV Human Coherence Filter (THCF)
THCF evalúa cada módulo con 4 reglas:
1. Entendible
2. Justificable
3. Operacionalmente coherente
4. Limitado

Pregunta obligatoria de aprobación:
**¿Este módulo ayuda a valorar y respetar al usuario como individuo?**

Si no puede responderse de forma simple, el módulo no entra al núcleo inicial.

## Módulos implementados
- Core Protocol + MSR + BookPI + EOCT
- Guardian + XR visual translation + DreamSpaces + XR Gateway
- Identity + Economy + Memberships + Ledger
- Social (posts/channels/dm)
- THCF + Module Registry para cierre de módulos

## Desarrollo local
```bash
npm install
npm run test
npm run build
npm run dev
npm run test
npm run build
```

---

## 6) Estado actual y límites

- ✅ Hay contratos y servicios funcionales para simulación local.
- ✅ Hay pruebas unitarias para protocolo, THCF, catálogo, social, XR e identidad/economía.
- ⚠️ No hay backend persistente de producción (DB, colas, auth robusta, observabilidad externa).
- ⚠️ No hay transporte WS/SSE real expuesto como API pública todavía (hay capa de simulación).

---

## 7) Próximos cierres de módulo recomendados

1. **API real**: exponer controladores HTTP/WS reales para `/auth`, `/social/*`, `/protocols`, `/economy`, `/xr`.
2. **Persistencia**: mover servicios en memoria a repositorios persistentes.
3. **Seguridad**: hash de contraseñas, sesiones seguras, control de rate-limit.
4. **THCF obligatorio en CI**: bloquear merge de módulos sin evaluación aprobada o plan de rework.
5. **Observabilidad**: estandarizar eventos MSR/BookPI con schemas versionados.

---

## 8) Nota de entorno

En este entorno de ejecución hubo restricciones intermitentes de red/dependencias (ej. `vitest`/`vite` no disponibles sin instalación), por lo que la verificación depende de la instalación local completa de `node_modules`.

## 6) Estado actual y límites

- ✅ Hay contratos y servicios funcionales para simulación local.
- ✅ Hay pruebas unitarias para protocolo, THCF, catálogo, social, XR e identidad/economía.
- ⚠️ No hay backend persistente de producción (DB, colas, auth robusta, observabilidad externa).
- ⚠️ No hay transporte WS/SSE real expuesto como API pública todavía (hay capa de simulación).

---

## 7) Próximos cierres de módulo recomendados

1. **API real**: exponer controladores HTTP/WS reales para `/auth`, `/social/*`, `/protocols`, `/economy`, `/xr`.
2. **Persistencia**: mover servicios en memoria a repositorios persistentes.
3. **Seguridad**: hash de contraseñas, sesiones seguras, control de rate-limit.
4. **THCF obligatorio en CI**: bloquear merge de módulos sin evaluación aprobada o plan de rework.
5. **Observabilidad**: estandarizar eventos MSR/BookPI con schemas versionados.

---

## 8) Nota de entorno

En este entorno de ejecución hubo restricciones intermitentes de red/dependencias (ej. `vitest`/`vite` no disponibles sin instalación), por lo que la verificación depende de la instalación local completa de `node_modules`.

## 6) Estado actual y límites

- ✅ Hay contratos y servicios funcionales para simulación local.
- ✅ Hay pruebas unitarias para protocolo, THCF, catálogo, social, XR e identidad/economía.
- ⚠️ No hay backend persistente de producción (DB, colas, auth robusta, observabilidad externa).
- ⚠️ No hay transporte WS/SSE real expuesto como API pública todavía (hay capa de simulación).

---

## 7) Próximos cierres de módulo recomendados

1. **API real**: exponer controladores HTTP/WS reales para `/auth`, `/social/*`, `/protocols`, `/economy`, `/xr`.
2. **Persistencia**: mover servicios en memoria a repositorios persistentes.
3. **Seguridad**: hash de contraseñas, sesiones seguras, control de rate-limit.
4. **THCF obligatorio en CI**: bloquear merge de módulos sin evaluación aprobada o plan de rework.
5. **Observabilidad**: estandarizar eventos MSR/BookPI con schemas versionados.

---

## 8) Nota de entorno

En este entorno de ejecución hubo restricciones intermitentes de red/dependencias (ej. `vitest`/`vite` no disponibles sin instalación), por lo que la verificación depende de la instalación local completa de `node_modules`.
## Estado de integración externa
Se intentó analizar `https://github.com/OsoPanda1/documentacion-total-tamv-online.git`, pero este entorno devolvió error de red `403 CONNECT tunnel` al clonar.
Plataforma civilizatoria digital TAMV con enfoque federado, trazable y XR-native.

## Estado del repositorio
Este repositorio contiene el frontend base y documentación fundacional extendida para orientar la integración de capas L0–L7, memoria MSR/BookPI y componentes de guardianía.

## Documentación nueva
- `docs/foundational-expanded-report.md`
- `docs/civilizatory-components-wiki.md`

## Desarrollo local
```bash
npm install
npm run dev
```

## Calidad
```bash
npm run test
npm run build
```
