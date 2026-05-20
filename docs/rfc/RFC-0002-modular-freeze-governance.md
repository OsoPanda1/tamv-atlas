# RFC-0002: Gobernanza de cierre modular y anti-expansión

- Date: 2026-05-20
- Status: Draft
- Owner: TAMV Online
- Related: RFC-0001 (triple-review)

## Problema
La integración federada puede crecer sin límites y degradar capacidad de ejecución.

## Decisión
Adoptar un esquema **Plan → Integrate → Freeze** por módulo/sección con semáforos de avance.

## Semáforos
- `green`: módulo listo para freeze.
- `yellow`: en integración, sin bloqueo crítico.
- `red`: requiere refactor/seguridad antes de continuar.

## Criterios de freeze
1. Contrato API/documental estable (sin breaking changes pendientes).
2. Evidencia de prueba mínima definida por el módulo.
3. Registro en ledger interno (`tamvInternalSha`) y referencia BookPI.
4. Checklist de seguridad (authz, límites, auditoría).

## Alcance inicial
Aplicar en módulos MD-X4: SM01, AI03, AI04, AI05, SC01, AN01, EC02.

## Resultado esperado
Reducir expansión infinita y habilitar ejecución por lotes cerrados y verificables.
