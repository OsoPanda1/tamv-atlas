# TAMV Atlas — Avance Real

TAMV Atlas es una base funcional para consolidar el ecosistema TAMV MD‑X4 en una experiencia operable para despliegue en Lovable:

- **Frontend Atlas/Wiki** en React + Vite con rutas de módulos civilizatorios.
- **Capa federada inicial (7+ capas conceptual-operables)** para identidad, protocolos, memoria, guardianía, XR y economía.
- **Contratos tipados y motor de integración** para trazabilidad (`MSR`) y narrativa (`BookPI`) de eventos críticos.

## Avance implementado en este corte

Se añadió un núcleo funcional de orquestación (`AtlasKernel`) que permite:

1. Crear usuarios y registrar su alta en memoria (`identity.user.created`).
2. Asignar membresías con trazabilidad (`economy.membership.assigned`).
3. Ejecutar protocolos con lógica quant-inspired de “evaluar rutas y colapsar decisión”.
4. Emitir señales de guardianía cuando el riesgo ético supera el umbral.
5. Crear DreamSpaces XR persistentes mínimos con permisos base.
6. Registrar movimientos de economía interna en ledger con eventos auditables.

## Estructura añadida

- `src/lib/federated/types.ts`: contratos de dominio federado.
- `src/lib/federated/atlasKernel.ts`: núcleo de integración funcional.
- `src/test/federated/atlasKernel.test.ts`: pruebas unitarias del flujo integral.

## Cómo correr en local

```bash
npm install
npm run dev
```

## Checks de calidad

```bash
npm run test
npm run build
```

## Despliegue en Lovable

1. Conecta el repositorio en Lovable.
2. Define variables de entorno (si aplica backend externo):
   - `VITE_TAMV_BACKEND_URL`
3. Usa comando de build:
   - `npm run build`
4. Publica el artefacto de Vite (`dist/`).

## Siguiente iteración recomendada

- Exponer `AtlasKernel` como API real (`/auth`, `/users`, `/protocols`, `/economy`, `/xr`) en backend.
- Integrar persistencia (Postgres/Supabase) en vez de memoria en proceso.
- Acoplar stream XR en tiempo real (WS/SSE) para render declarativo de eventos Guardian.
- Completar videollamadas/streaming social con señalización WebRTC.

---

Este README refleja el **avance real actual**: una base técnica funcional y testeada para seguir ensamblando TAMV como plataforma civilizatoria XR‑nativa.
