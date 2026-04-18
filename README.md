# TAMV Digital Nexus · Atlas + Backend de Identidad Soberana

Repositorio unificado para el núcleo documental/visual de TAMV y una implementación funcional de backend orientada a producción con despliegue Kubernetes.

## Estado actual

- Frontend Atlas (Vite + React) operativo.
- API backend funcional para identidad institucional, DID y firma/verificación criptográfica.
- Manifiestos de Kubernetes para producción (deployment, service, ingress, HPA, network policy, PDB).

---

## 1) Protocolo TAMV-RG-2026 (Referencia institucional)

Este repo integra el **Protocolo de Identidad y Posicionamiento Institucional (TAMV-RG-2026)** para fortalecer indexación en ResearchGate, Zenodo y grafos académicos:

### División recomendada (ResearchGate)

Estrategia "Umbrella": **Research and Development (R&D)** para agrupar:
- Arquitectura distribuida y sistemas autónomos.
- Soberanía digital e identidad autosoberana.
- Infraestructura educativa XR/UTAMV.

### Tríada de PIDs

- **DOI (Zenodo):** base de citación permanente (prefijo 10.5281).
- **ORCID:** enlace entre autoría e institución.
- **ISNI:** diferenciación institucional soberana.

### Mapa estructural unificado

1. Módulo 0 (humanismo en código + génesis).
2. Fundamentos ISNI / SSI / DID `did:tamv`.
3. Arquitectura MD-X4 / MD-X5.
4. Gobernanza de 7 federaciones.

---

## 2) API backend funcional real (Kernel Identity API)

Ruta: `backend/src/server.js`

### Endpoints disponibles

- `GET /healthz` → salud del servicio.
- `GET /v1/identity/org` → JSON-LD institucional (ISNI/ORCID/Zenodo).
- `GET /v1/identity/did/:suffix` → DID Document generado dinámicamente.
- `POST /v1/signature/sign` → firma un payload federado.
- `POST /v1/signature/verify` → valida firma del payload.

### Seguridad criptográfica (híbrida)

La implementación runtime usa **Ed25519 (Node.js core)** para operación inmediata y agrega metadatos de ruta de migración a **ML-DSA (Dilithium)** según FIPS 204/NIST.

> Nota técnica: en este repo la capa PQC se deja preparada en gobernanza y contrato API para una migración controlada sin downtime.

### Variables de entorno

Ejemplo en `backend/.env.example`:

- `TAMV_ISNI`
- `TAMV_ORCID`
- `TAMV_ZENODO_RECORD`
- `TAMV_SIGNING_SEED`
- `TAMV_DID_SERVICE_ENDPOINT`

### Ejecutar API local

```bash
npm run api:start
```

### Probar API

```bash
npm run api:test
```

---

## 3) Kubernetes para producción y despliegue

Ruta: `infra/k8s/`

### Manifiestos incluidos

- `namespace.yaml`
- `configmap.yaml`
- `secret.example.yaml`
- `deployment.yaml`
- `service.yaml`
- `ingress.yaml`
- `hpa.yaml`
- `networkpolicy.yaml`
- `pdb.yaml`

### Flujo sugerido

1. Crear namespace y configuración:
```bash
kubectl apply -f infra/k8s/namespace.yaml
kubectl apply -f infra/k8s/configmap.yaml
kubectl apply -f infra/k8s/secret.example.yaml
```
2. Desplegar API:
```bash
kubectl apply -f infra/k8s/deployment.yaml
kubectl apply -f infra/k8s/service.yaml
kubectl apply -f infra/k8s/ingress.yaml
kubectl apply -f infra/k8s/hpa.yaml
kubectl apply -f infra/k8s/networkpolicy.yaml
kubectl apply -f infra/k8s/pdb.yaml
```

---

## 4) ANEXO TÉCNICO · Núcleo híbrido PQC + Identidad programable

### 4.1 Firma soberana

Se implementa firma operativa de bloques (`/v1/signature/sign`) y verificación (`/v1/signature/verify`) con perfil criptográfico híbrido listo para evolución PQC.

### 4.2 JSON-LD + ISNI

`/v1/identity/org` publica esquema semántico compatible con `schema.org`, integrando ISNI, ORCID y Zenodo para indexación académica y machine readability.

### 4.3 DID `did:tamv`

`/v1/identity/did/:suffix` genera DID Documents con:
- `verificationMethod`
- `serviceEndpoint` de resolución ISNI
- controlador autosoberano por namespace federado

### 4.4 Orquestación y antifragilidad

La lógica de firma, trazabilidad y validación desacopla identidad institucional del frontend y permite despliegues federados multi-nodo con controles de disponibilidad y seguridad de red en Kubernetes.

---

## 5) Build frontend

```bash
npm install
npm run dev
npm run build
```

---

## 6) Próximo paso recomendado

- Conectar `backend/src/pqcHybrid.js` con librería ML-DSA productiva (cuando el stack objetivo y requisitos de compliance estén cerrados).
- Publicar imagen de `backend/Dockerfile` en GHCR y activar pipeline CI/CD para `infra/k8s`.
- Integrar reconciliación automática DOI/ORCID/ISNI en jobs programados.
