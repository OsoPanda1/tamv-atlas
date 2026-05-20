# Consolidado 4

Generado: 2026-05-20T11:18:04.265Z

Fuentes: 0

- Descubrir automáticamente los repositorios fuente de `OsoPanda1`.
- Generar un manifiesto auditable de importación.
- Importar repos en subárboles por carpeta para evitar colisiones.
- Mantener un flujo repetible para futuras sincronizaciones.

## 2) Herramienta incluida

Script: `scripts/unify_osopanda_repos.sh`

Capacidades:
- Discovery vía API de GitHub (`/users/:owner/repos`).
- Filtro automático para excluir el repo destino (`tamv-digital-nexus`).
- Manifiesto JSON con metadatos de cada repo.
- Importación opcional con `git subtree --squash` hacia `federation/<repo>`.

## 3) Protocolo operativo recomendado

### Fase A — Discovery (sin tocar código)

```bash
./scripts/unify_osopanda_repos.sh --import-mode none
```

Resultado:
- Genera `docs/repo-unification-manifest.json`.
- Reporta `repo_count` y cada `import_prefix`.

### Fase B — Revisión de gobernanza

Revisar en el manifiesto:
- repos privados vs públicos,
- repos archivados,
- ramas por defecto,
- prefijos de importación.

Si se requiere autenticación (límites de API o privados):

```bash
./scripts/unify_osopanda_repos.sh --import-mode none --github-token "$GITHUB_TOKEN"
```

### Fase C — Importación controlada

```bash
./scripts/unify_osopanda_repos.sh --import-mode squash --prefix-root federation
```

Resultado:
- Importa cada repo en `federation/<nombre-repo>`.
- Evita sobrescribir carpetas ya existentes (las salta).

### Fase D — Validación posterior

Comandos sugeridos:

```bash
git status --short
npm run test
npm run build
```

### Fase E — Commit y trazabilidad

Mensaje recomendado de commit:

```text
chore(unify): importar repositorios de OsoPanda1 a estructura federada
```

## 4) Plan alterno de emergencia y desastres

## Escenario E1 — Rate limit de GitHub API

Síntoma:
- `curl` devuelve 403 o respuestas incompletas.

Respuesta:
1. Reintentar con `--github-token`.
2. Reducir llamadas (mismo manifiesto ya generado).
3. Posponer import hasta ventana con menor carga.

## Escenario E2 — Falla durante `git subtree add`

Síntoma:
- conflicto o interrupción durante import.

Respuesta:
1. `git status` para identificar estado.
2. `git reset --hard HEAD` para volver al último commit limpio.
3. Reejecutar script.

## Escenario E3 — Colisiones de estructura

Síntoma:
- dos repos con rutas internas equivalentes que generan confusión funcional.

Respuesta:
1. Mantener aislamiento por `federation/<repo>`.
2. Crear capa de integración por paquetes (no mezclar código fuente original).
3. Definir plan de convergencia por dominio (`apps`, `services`, `packages`).

## Escenario E4 — Repo privado inaccesible

Síntoma:
- `fetch` falla por permisos.

Respuesta:
1. Confirmar token con alcance de lectura.
2. Registrar incidencia en manifiesto (campo pendiente en backlog).
3. Continuar con import de repos accesibles.

## 5) Siguiente paso sugerido (post-unificación)

1. Crear taxonomía de convergencia:
   - `apps/` (frontends y shells)
   - `services/` (microservicios)
   - `packages/` (librerías compartidas)
   - `infra/` (IaC, k8s, observabilidad)
2. Ejecutar deduplicación por dependencias.
3. Definir contrato de APIs común (OpenAPI + eventos WS).
4. Iniciar pipeline CI federado (lint, test, build por carpeta importada).

---

Con este playbook, la unificación de los repos queda estandarizada y auditable para ejecución iterativa.


## 6) Triple revisión + clasificación federada + freeze

Script complementario: `scripts/classify_federation_repos.sh`

### Fase F — Triple revisión automática inicial

```bash
./scripts/classify_federation_repos.sh
```

Resultado:
- Genera `docs/repo-federation-classification.json` con resultados R1/R2/R3.
- Registra `tamv_internal_sha` para trazabilidad interna.

### Fase G — Índice de congelamiento modular

Resultado:
- Genera `docs/module-freeze-index.json` con estado por módulo (`open`, `in_review`, `frozen`).
- Permite cerrar secciones sin seguir expandiendo alcance de manera indefinida.

