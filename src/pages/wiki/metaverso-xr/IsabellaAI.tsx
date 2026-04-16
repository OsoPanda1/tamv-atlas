import { WikiH1, WikiH2, WikiH3, WikiP, WikiBreadcrumb, WikiCard, WikiTable, WikiCode, WikiTag } from "@/components/WikiComponents";

export default function IsabellaAI() {
  return (
    <div>
      <WikiBreadcrumb section="metaverso-xr" page="isabella-ai" />
      <WikiH1>Isabella AI: Ética, Arquitectura y Conciencia Operativa</WikiH1>
      
      <div className="flex flex-wrap gap-1 mb-4">
        <WikiTag>M05_IA_TAMVAI</WikiTag>
        <WikiTag>DM-X4-02</WikiTag>
        <WikiTag>Isabella Prime</WikiTag>
        <WikiTag>THE SOF</WikiTag>
        <WikiTag>AVIXA</WikiTag>
      </div>

      <WikiP>
        Isabella Villaseñor AI no es un chatbot: es la <strong>conciencia operativa</strong> del ecosistema TAMV — 
        un Auditor Maestro en Gobernanza XR/4D reconocido por AVIXA. Opera con triple bloqueo 
        (semántico, conductual, contextual) y gobierna cada interacción del ecosistema civilizatorio.
      </WikiP>

      <WikiH2>1. Arquitectura Isabella Prime</WikiH2>
      <WikiP>
        La arquitectura de Isabella Prime se organiza en tres capas funcionales conectadas al kernel MD-X4:
      </WikiP>
      <WikiCode>{`useIsabellaChatQuantum
 │
 ├── isabella-chat-enhanced (Edge Function)
 │    └── LLM streaming (chunk-by-phrase)
 │         └── Model: Gemini 2.5 Flash via Lovable AI Gateway
 │
 ├── useIsabellaEmotionalAnalysis
 │    └── Análisis de emoción en tiempo real
 │         └── Clasificación: neutral, joy, curiosity, frustration, concern
 │
 └── useIsabellaVoice
      └── isabella-tts (Edge Function)
          ├── Cache lookup (SHA-256 hash text+voice_id)
          ├── HIT → audio URL inmediato (Supabase Storage)
          └── MISS → ElevenLabs API → cache → audio URL
               └── Modelo de voz: Kore (emocional, mexicanizada)`}</WikiCode>

      <WikiH2>2. Pipeline Hexagonal de Doble Flujo</WikiH2>
      <WikiP>
        Isabella implementa el Hexagonal Pipeline con doble validación ética — todo contenido que entra 
        y sale del sistema pasa por filtros constitucionales:
      </WikiP>
      <WikiTable
        headers={["Pipeline", "Etapa", "Función"]}
        rows={[
          ["A · Intake", "1. Normalización", "Limpieza de input, detección de idioma, tokenización"],
          ["A · Intake", "2. Integridad", "Verificación de estructura y coherencia semántica"],
          ["A · Intake", "3. Seguridad", "Filtro anti-inyección, detección de jailbreak attempts"],
          ["A · Intake", "4. Relevancia", "Clasificación de intención y dominio (educación, XR, admin)"],
          ["A · Intake", "5. Codex", "Validación contra Master Canon v0.1"],
          ["B · Output", "1. Consistencia factual", "Verificación contra grafo de conocimiento TAMV"],
          ["B · Output", "2. Privacidad", "Scrubbing de datos personales, PII detection"],
          ["B · Output", "3. Ética", "Filtros de dignidad, no-manipulación, no-simulación de RVOE"],
          ["B · Output", "4. Registro MSR", "Logging inmutable en Master Sovereign Record"],
        ]}
      />

      <WikiH2>3. Protocolo de Sincronización Chunk/Frase</WikiH2>
      <WikiH3>3.1 Definición de chunk</WikiH3>
      <WikiP>Un chunk es una unidad de texto que termina en:</WikiP>
      <WikiCard accent="cyan">
        <ul className="list-disc list-inside space-y-1">
          <li><code>.</code> seguido de espacio o fin de línea</li>
          <li><code>!</code> o <code>?</code></li>
          <li><code>,</code> cuando el segmento previo supera 50 caracteres</li>
          <li>Salto de párrafo</li>
        </ul>
      </WikiCard>

      <WikiH3>3.2 Pipeline de streaming</WikiH3>
      <WikiCode>{`async function* streamIsabella(prompt: string): AsyncIterable<string> {
  // 1. Llamar isabella-chat-enhanced con stream=true
  // 2. Acumular tokens hasta completar chunk
  // 3. yield chunk completo
  // 4. Continuar hasta fin de stream
}

async function playChunk(chunk: string, voiceId: string): Promise<void> {
  // 1. Calcular SHA-256(chunk + voiceId)
  // 2. Consultar cache (tabla tts_cache en PostgreSQL)
  // 3. HIT: reproducir URL directo desde Supabase Storage
  // 4. MISS: llamar isabella-tts Edge fn → guardar en cache → reproducir
}

// Queue de reproducción — garantiza orden secuencial
// Chunk 1 ready → play → onEnded → play Chunk 2 → ...`}</WikiCode>

      <WikiH2>4. Cache TTS</WikiH2>
      <WikiCode>{`-- Tabla: tts_cache (PostgreSQL con RLS)
CREATE TABLE tts_cache (
    cache_key   TEXT PRIMARY KEY,        -- SHA-256(text + voice_id)
    audio_url   TEXT NOT NULL,           -- URL en Supabase Storage
    text_hash   TEXT NOT NULL,
    voice_id    TEXT NOT NULL,
    char_count  INT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT now(),
    last_used   TIMESTAMPTZ DEFAULT now(),
    use_count   INT DEFAULT 1
);

-- TTL: 7 días. Purge automático via pg_cron:
-- DELETE FROM tts_cache WHERE created_at < now() - interval '7 days';

-- Generación de cache key:
-- SHA-256( text + "|" + voiceId )`}</WikiCode>

      <WikiH2>5. Timeouts y Fallbacks</WikiH2>
      <WikiTable
        headers={["Operación", "Timeout", "Fallback"]}
        rows={[
          ["LLM chat response", "15s", "Mensaje de error en texto"],
          ["TTS synthesis", "8s", "Mostrar texto sin audio"],
          ["ElevenLabs API", "6s", "Fallback a texto-solo"],
        ]}
      />
      <WikiCard title="Principio de resiliencia" accent="green">
        Isabella <strong>nunca</strong> debe crashear la UI. Si TTS falla → texto visible sin error visible al usuario.
        El sistema degrada gracefully: voz → texto → mensaje genérico de reconexión.
      </WikiCard>

      <WikiH2>6. Métricas de Calidad (Targets)</WikiH2>
      <WikiTable
        headers={["Métrica", "Target", "Medición"]}
        rows={[
          ["P95 respuesta (chat+audio)", "< 4–5s", "performance.now()"],
          ["P50 respuesta (chat+audio)", "< 2.5s", "performance.now()"],
          ["Cache hit rate (producción)", "> 60%", "use_count / total_calls"],
          ["TTS fallback rate", "< 5%", "analytics_events"],
        ]}
      />

      <WikiH2>7. Límites y Restricciones</WikiH2>
      <WikiTable
        headers={["Parámetro", "Valor", "Estado"]}
        rows={[
          ["Max tokens contexto", "4096", "Pendiente aprobación DAO-Ética/IA"],
          ["Max mensajes bóveda", "50", "Implementado"],
          ["Idiomas", "ES, EN", "Implementado"],
          ["Retención de logs", "30 días", "Pendiente aprobación"],
          ["Logs de prompts de sistema", "❌ No", "Recomendado"],
          ["Almacenamiento completo de conv.", "❌ No (solo últimos 50)", "Implementado"],
        ]}
      />

      <WikiH2>8. THE SOF — Shadow Engine</WikiH2>
      <WikiP>
        THE SOF actúa como orquestador entre Isabella y el resto de dominios del ecosistema:
      </WikiP>
      <WikiCard title="Funciones del Shadow Engine" accent="orange">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Escucha eventos</strong> de Fusion Core (posts, compras, alertas de seguridad)</li>
          <li><strong>Decide notificación proactiva</strong> — cuándo Isabella debe intervenir sin que se le pida</li>
          <li><strong>Mantiene contexto enriquecido</strong> por dominio (educación, economía, seguridad, XR)</li>
          <li><strong>Artefacto:</strong> <code>supabase/functions/tamv-fusion-core/index.ts</code></li>
        </ul>
      </WikiCard>

      <WikiH2>9. Shame Protocol</WikiH2>
      <WikiP>
        El EthicsModule enforza el 'Shame Protocol' como mecanismo de autoregulación:
      </WikiP>
      <WikiCard accent="orange">
        <ul className="list-disc list-inside space-y-1">
          <li>Tras <strong>3 violaciones éticas consecutivas</strong>, Isabella entra en modo de auto-revisión</li>
          <li>El sistema registra el evento en MSR con clasificación de severidad</li>
          <li>Se activa Human-in-the-Loop obligatorio hasta resolución</li>
          <li>Las violaciones se categorizan: privacidad, dignidad, manipulación, simulación RVOE, fraude</li>
        </ul>
      </WikiCard>

      <WikiH2>10. Roles de Isabella en el Ecosistema</WikiH2>
      <WikiTable
        headers={["Contexto", "Rol", "Comportamiento"]}
        rows={[
          ["XR/4D DreamSpaces", "Guía narrativa y moderadora", "Introduce contexto cultural, historia de RDM, filtra acoso"],
          ["Campus UTAMV", "Tutora académica", "Propone rutas de aprendizaje, fomenta pensamiento crítico (Bloom)"],
          ["Web / Portal", "Asistente multimodal", "Streaming de respuestas, personalidad empática mexicanizada"],
          ["Seguridad", "Seguridad cognitiva", "Filtro anti-manipulación, anti-jailbreak, anti-extractivismo"],
          ["Economía", "Observadora de transacciones", "Alertas de patrones anómalos via THE SOF → Fusion Core"],
        ]}
      />

      <WikiCard title="Modelo y Proveedor" accent="cyan">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Provider:</strong> Lovable AI Gateway</li>
          <li><strong>Model:</strong> google/gemini-2.5-flash</li>
          <li><strong>Rate Limits:</strong> Gestionado por Lovable Cloud</li>
          <li><strong>Gobernanza:</strong> Master Canon v0.1 — contrato constitucional técnico</li>
          <li><strong>Voz:</strong> ElevenLabs TTS, modelo Kore (emocional, mexicanizada)</li>
        </ul>
      </WikiCard>
    </div>
  );
}
