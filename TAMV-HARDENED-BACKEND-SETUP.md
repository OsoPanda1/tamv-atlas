# TAMV Hardened Backend · Setup Guide

Guía de estructura y arranque para backend endurecido de TAMV con QuantumPods orquestados por Isabella DMX4.

---

## 1) Estructura de proyecto (referencia)

```txt
tamv/
├── packages/
│   ├── shared/
│   ├── tap-protocol/
│   ├── isabella-dmx4/
│   ├── tcep/
│   ├── spatial/
│   ├── bookpi/
│   ├── auth-anubis/
│   └── api-gateway/
├── database/
│   └── init-scripts/
├── docker-compose.hardened-backend.yml
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.json
```

---

## 2) Stack tecnológico

- Node.js 20+ + TypeScript (strict)
- Fastify
- WebSocket (`ws`)
- PostgreSQL 15+ + pgvector
- Redis 7+
- PNPM workspaces
- Docker / Docker Compose

---

## 3) Prerrequisitos

- Node.js 20+
- PNPM 8+
- Docker + Docker Compose
- PostgreSQL con pgvector
- Redis

---

## 4) Instalación

```bash
npm install -g pnpm
pnpm install
pnpm --filter @tamv/shared run build
```

---

## 5) Entorno local

```bash
docker compose -f docker-compose.hardened-backend.yml up -d
docker compose -f docker-compose.hardened-backend.yml logs -f
docker compose -f docker-compose.hardened-backend.yml down
```

---

## 6) Desarrollo por QuantumPod

```bash
pnpm --filter @tamv/tap-protocol run dev
pnpm --filter @tamv/isabella-dmx4 run dev
pnpm --filter @tamv/tcep run dev
pnpm --filter @tamv/spatial run dev
pnpm --filter @tamv/bookpi run dev
pnpm --filter @tamv/auth-anubis run dev
pnpm --filter @tamv/api-gateway run dev
```

---

## 7) Build, test y calidad

```bash
pnpm -r run build
pnpm test
pnpm test:watch
pnpm test:property
pnpm test:coverage
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
```

---

## 8) Variables de entorno mínimas

```bash
NODE_ENV=development
PORT=3001
SERVICE_NAME=tap-protocol
LOG_LEVEL=info

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=tamv_hardened
POSTGRES_USER=tamv_user
POSTGRES_PASSWORD=tamv_password

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=redis_password
```

---

## 9) Endpoints clave

### API Gateway

- `POST /v1/kernel/intent`
- `POST /v1/economy/tcep`
- `GET /v1/audit/evidence/:hash`
- `POST /v1/dreamspace/join`
- `POST /v1/spatial/render`
- `WS /v1/tap`

### Health

- `GET /health`
- `GET /healthz`
- `GET /ready`

---

## 10) Próximos pasos técnicos

1. completar data layer/core schemas
2. reforzar Anubis Sentinel
3. madurar BookPI pod
4. circuit breaker global
5. vector memory con pgvector
6. hardening final y auditoría externa

