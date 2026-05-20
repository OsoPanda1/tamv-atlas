import hashlib
import hmac
import json
import os
import secrets
import time
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional, Set

from fastapi import Depends, FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).resolve().parent
VAULT_DIR = BASE_DIR / "tamv_core_vault"
VAULT_DIR.mkdir(parents=True, exist_ok=True)

PATHS = {
    "episodic": VAULT_DIR / "tamv_episodic_memory.json",
    "bookpi": VAULT_DIR / "bookpi_ledger.json",
    "datagit": VAULT_DIR / "datagit_index.json",
    "economy": VAULT_DIR / "mdd_economy_state.json",
}

for name, path in PATHS.items():
    if not path.exists():
        with open(path, "w", encoding="utf-8") as f:
            if name == "economy":
                json.dump({"balances": {}, "locks": {}}, f, indent=2)
            else:
                json.dump([], f, indent=2)


class AuthPayload(BaseModel):
    isni_id: str = Field(..., pattern=r"^\d{4}-\d{4}-\d{4}-\d{3}[0-9X]$")
    quantum_signature: str


class InteractionPayload(BaseModel):
    user_input: str


class CreditsTransaction(BaseModel):
    recipient_isni: str
    amount: float = Field(..., gt=0)
    lock_days: int = Field(..., ge=30, le=1460)


class TAMVMemoryEngine:
    STOPWORDS = {"el", "la", "los", "las", "un", "una", "en", "para", "de", "que", "y", "a", "o", "u"}

    @staticmethod
    def _tokens(text: str) -> Set[str]:
        normalized = "".join(c if c.isalnum() or c.isspace() else " " for c in text.lower())
        return {t for t in normalized.split() if t not in TAMVMemoryEngine.STOPWORDS}

    @classmethod
    def buscar_contexto(cls, query: str, top_k: int = 3) -> List[Dict[str, Any]]:
        memory = json.loads(PATHS["episodic"].read_text(encoding="utf-8"))
        if not memory:
            return []
        q = cls._tokens(query)
        if not q:
            return memory[-top_k:]
        scored: List[Any] = []
        for ep in memory:
            e = cls._tokens(ep["payload"]["input"])
            union = q.union(e)
            score = len(q.intersection(e)) / len(union) if union else 0
            scored.append((score, ep))
        scored.sort(key=lambda x: x[0], reverse=True)
        return [ep for s, ep in scored[:top_k] if s > 0.05] or memory[-top_k:]

    @classmethod
    def registrar_episodio(cls, isni: str, user_input: str, system_output: str) -> str:
        episode_id = f"epi_{secrets.token_hex(8)}"
        memory = json.loads(PATHS["episodic"].read_text(encoding="utf-8"))
        memory.append(
            {
                "episode_id": episode_id,
                "timestamp": time.time(),
                "datetime": datetime.utcnow().isoformat(),
                "author_isni": isni,
                "payload": {"input": user_input, "output": system_output},
            }
        )
        PATHS["episodic"].write_text(json.dumps(memory, indent=2, ensure_ascii=False), encoding="utf-8")
        return episode_id


class BookPILedgerEngine:
    DIFFICULTY = 2

    @classmethod
    def registrar_bloque(cls, module: str, action: str, auditor_isni: str, ethical_evaluation: str) -> str:
        ledger = json.loads(PATHS["bookpi"].read_text(encoding="utf-8"))
        prev_hash = "0" * 64 if not ledger else ledger[-1]["current_hash"]
        index = len(ledger)
        ts = time.time()
        nonce = 0
        base = f"{index}{prev_hash}{ts}{module}{action}{auditor_isni}{ethical_evaluation}"
        while True:
            candidate = hashlib.sha256(f"{base}{nonce}".encode()).hexdigest()
            if candidate.startswith("0" * cls.DIFFICULTY):
                break
            nonce += 1
        block = {
            "index": index,
            "timestamp": ts,
            "module": module,
            "action": action,
            "auditor": auditor_isni,
            "ethical_evaluation": ethical_evaluation,
            "previous_hash": prev_hash,
            "current_hash": candidate,
            "nonce": nonce,
        }
        ledger.append(block)
        PATHS["bookpi"].write_text(json.dumps(ledger, indent=2, ensure_ascii=False), encoding="utf-8")

        idx = json.loads(PATHS["datagit"].read_text(encoding="utf-8"))
        idx.append(
            {
                "commit_hash": candidate[:16],
                "tree_id": hashlib.sha1(module.encode()).hexdigest()[:20],
                "timestamp": ts,
                "author": auditor_isni,
                "message": f"TAMV_COMMITTED_BLOCK: [{module}] -> Integrity verified.",
            }
        )
        PATHS["datagit"].write_text(json.dumps(idx, indent=2, ensure_ascii=False), encoding="utf-8")
        return candidate


app = FastAPI(title="TAMV ATLAS CORE BACKEND", version="Genesis-Enterprise")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
JWT_SECRET = secrets.token_hex(32)
ROOT_ISNI = "0009-0008-5050-1539"


async def anubis_guard(authorization: Optional[str] = Header(None)) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="ANUBIS auth required")
    token = authorization.split(" ", 1)[1]
    try:
        isni, sig = token.split(".", 1)
        expected = hmac.new(JWT_SECRET.encode(), isni.encode(), hashlib.sha256).hexdigest()[:16]
        if not hmac.compare_digest(sig, expected):
            raise ValueError
        return isni
    except Exception as exc:
        raise HTTPException(status_code=403, detail="Invalid token") from exc


@app.post("/auth")
async def auth(payload: AuthPayload):
    if payload.isni_id != ROOT_ISNI:
        raise HTTPException(status_code=401, detail="ISNI no reconocida")
    sig = hmac.new(JWT_SECRET.encode(), payload.isni_id.encode(), hashlib.sha256).hexdigest()[:16]
    token = f"{payload.isni_id}.{sig}"
    BookPILedgerEngine.registrar_bloque("AUTH", "SESSION_ISSUED", payload.isni_id, "INTEGRO_VALIDADO")
    return {"status": "CLEARANCE_GRANTED", "token": token}


@app.post("/social")
async def social(payload: InteractionPayload, isni: str = Depends(anubis_guard)):
    episodes = TAMVMemoryEngine.buscar_contexto(payload.user_input)
    output = f"Procesado soberano. Episodios relevantes recuperados: {len(episodes)}"
    eid = TAMVMemoryEngine.registrar_episodio(isni, payload.user_input, output)
    BookPILedgerEngine.registrar_bloque("ISABELLA_CORE", f"EXECUTE_EPISODE_{eid}", isni, "PROCESADO_EXITOSO")
    return {"isabella_response": output, "episode_id": eid, "memory_context_count": len(episodes)}


@app.post("/economy")
async def economy(tx: CreditsTransaction, isni: str = Depends(anubis_guard)):
    state = json.loads(PATHS["economy"].read_text(encoding="utf-8"))
    state["balances"].setdefault(tx.recipient_isni, 0.0)
    voting_power = tx.amount * (tx.lock_days / 1460.0)
    lock_id = f"lock_{secrets.token_hex(4)}"
    state["balances"][tx.recipient_isni] += tx.amount
    state["locks"][lock_id] = {
        "owner": tx.recipient_isni,
        "amount": tx.amount,
        "voting_power": voting_power,
        "release_timestamp": time.time() + tx.lock_days * 86400,
    }
    PATHS["economy"].write_text(json.dumps(state, indent=2), encoding="utf-8")
    h = BookPILedgerEngine.registrar_bloque("ECONOMY_MDD", f"MINT_VE_LOCK_{lock_id}", isni, "LIQUIDEZ_COMPILADA")
    return {"status": "CREDITS_LOCKED_SUCCESSFULLY", "lock_id": lock_id, "allocated_voting_power": voting_power, "ledger_block_hash": h}


@app.get("/bookpi")
async def get_bookpi():
    return json.loads(PATHS["bookpi"].read_text(encoding="utf-8"))
