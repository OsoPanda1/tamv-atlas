# Plantillas de endpoints — Social Dashboard y Scheduler

Fecha: 2026-05-20
Versión: v0.1 (template)

## 1) POST /v1/social/connect
Conecta cuenta social y guarda token cifrado.

### Request
```json
{
  "provider": "instagram|tiktok|youtube|linkedin|facebook|threads",
  "workspaceId": "tamv-main",
  "oauthCode": "string"
}
```

### Response 200
```json
{
  "connectionId": "sc_123",
  "provider": "instagram",
  "status": "connected",
  "connectedAt": "2026-05-20T00:00:00Z"
}
```

## 2) POST /v1/scheduler/jobs
Crea publicación programada o reciclaje evergreen.

### Request
```json
{
  "connectionId": "sc_123",
  "content": {
    "caption": "texto",
    "assetIds": ["asset_1"],
    "voiceProfile": "narrator-es"
  },
  "scheduleAt": "2026-05-21T18:30:00Z",
  "mode": "single|evergreen"
}
```

### Response 201
```json
{
  "jobId": "job_987",
  "status": "scheduled",
  "tamvInternalSha": "sha256hex",
  "bookpiRef": "bookpi://release/job_987"
}
```

## 3) GET /v1/analytics/audience/windows
Devuelve ventanas óptimas de publicación.

### Query
- `connectionId`
- `range=7d|30d|90d`

### Response 200
```json
{
  "connectionId": "sc_123",
  "range": "30d",
  "bestWindows": [
    { "weekday": "tuesday", "hourUtc": 18, "score": 0.84 }
  ],
  "explainability": "basado en engagement histórico normalizado"
}
```
