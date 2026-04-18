# TAMV Digital Nexus · Atlas + Backend Soberano Productivo

Repositorio unificado para frontend Atlas, backend de identidad soberana y despliegue enterprise sobre Kubernetes con pipeline GHCR + CI/CD.

## Estado técnico

- ✅ Frontend Atlas operativo (Vite + React).
- ✅ Backend Identity API operativo con firma híbrida (Ed25519 + ML-DSA cuando está disponible en runtime).
- ✅ Pipeline GitHub Actions para test, build, publish en GHCR y despliegue k8s.
- ✅ Job programado (CronJob) para reconciliación automática DOI/ORCID/ISNI.

---

## Backend API (producción)

Código: `backend/src/server.js`

### Endpoints

- `GET /healthz`
- `GET /v1/identity/org`
- `GET /v1/identity/did/:suffix`
- `POST /v1/signature/sign`
- `POST /v1/signature/verify`
- `POST /v1/pids/reconcile`
- `GET /v1/audit/metrics`

### Seguridad PQC híbrida

Implementación en `backend/src/pqcHybrid.js`:

- Firma Ed25519 activa por defecto para compatibilidad universal.
- Integración real con librería productiva **@noble/post-quantum** para perfil **ML-DSA**.
- Modos disponibles por variable `TAMV_SIGNING_MODE`:
  - `hybrid`
  - `mldsa`
  - `ed25519`

> Si el runtime no puede inicializar ML-DSA y el modo es `hybrid`, el sistema degrada de forma segura a Ed25519. Si el modo es `mldsa`, falla explícitamente para evitar falsa conformidad criptográfica.

### Variables de entorno

Archivo base: `backend/.env.example`

---

## Reconciliación automática de PIDs

Implementación:

- Lógica: `backend/src/pidReconciler.js`
- Job manual: `backend/src/jobs/pidReconcileJob.js`
- Endpoint API: `POST /v1/pids/reconcile`
- Scheduler en cluster: `infra/k8s/cronjob-pid-reconcile.yaml`

Valida formato local de ISNI/ORCID/DOI/Zenodo y verifica conectividad contra ORCID y Zenodo para detectar drift documental.

---

## Kubernetes (producción)

Directorio: `infra/k8s/`

- Namespace, configmap, secret template
- Deployment + service + ingress
- HPA + network policy + PDB
- CronJob de reconciliación PIDs

Aplicación:

```bash
kubectl apply -f infra/k8s/namespace.yaml
kubectl apply -f infra/k8s/configmap.yaml
kubectl apply -f infra/k8s/secret.example.yaml
kubectl apply -f infra/k8s/deployment.yaml
kubectl apply -f infra/k8s/service.yaml
kubectl apply -f infra/k8s/hpa.yaml
kubectl apply -f infra/k8s/networkpolicy.yaml
kubectl apply -f infra/k8s/pdb.yaml
kubectl apply -f infra/k8s/ingress.yaml
kubectl apply -f infra/k8s/cronjob-pid-reconcile.yaml
```

---

## CI/CD y GHCR

Workflow: `.github/workflows/backend-cicd.yml`

Flujo:

1. Corre pruebas de backend.
2. Construye imagen `backend/Dockerfile`.
3. Publica en GHCR:
   - `ghcr.io/<owner>/<repo>/tamv-identity-api:<sha>`
   - `ghcr.io/<owner>/<repo>/tamv-identity-api:latest`
4. Despliega manifiestos en k8s usando `KUBE_CONFIG_B64`.

---

## Comandos locales

```bash
npm run api:start
npm run api:test
```

Backend standalone:

```bash
cd backend
npm install
npm test
npm run reconcile:pids
```


---

## Integración frontend real

- `/auditoria` consume métricas reales del backend (`/v1/audit/metrics`) con React Query.
- `/identidad-demo` ejecuta flujo E2E de firma y verificación de credencial UTAMV usando la API soberana.
- `/wiki` incluye índice canónico 0–11 para navegación estable y enlazable.
