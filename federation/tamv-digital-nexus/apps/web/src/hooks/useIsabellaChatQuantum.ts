// ============================================================================
// ISABELLA QUANTUM CHAT HOOK - ENTERPRISE AAA STREAMING KERNEL
// High-Throughput Buffering, Memory Leak Prevention & Stable References
// ============================================================================

import { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "sonner";

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
  emotion?: "neutral" | "alegría" | "tristeza" | "poder" | "duda";
  audioUrl?: string;
  meta?: Record<string, any>;
}

const MAX_RETRIES = 2;
const STREAM_TIMEOUT_MS = 30_000;

export function useIsabellaChatQuantum() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [emotion, setEmotion] = useState<Message["emotion"]>("neutral");
  const [ethicsStatus, setEthicsStatus] = useState<string | null>(null);

  // Evitamos recrear funciones manteniendo el historial en una referencia síncrona
  const messagesRef = useRef<Message[]>([]);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const isExecutingRef = useRef<boolean>(false);

  // Cancelación limpia y asilada del flujo
  const cancelStream = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
    isExecutingRef.current = false;
    setIsLoading(false);
  }, []);

  // Asegurar limpieza total si el componente se desmonta inesperadamente
  useEffect(() => {
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, []);

  const sendMessage = useCallback(
    async (userMessage: string, retryCount = 0) => {
      if (!userMessage.trim()) return;

      // Cancelar cualquier petición en vuelo anterior antes de iniciar una nueva
      if (retryCount === 0) {
        cancelStream();
        setIsLoading(true);
        isExecutingRef.current = true;
        setEthicsStatus(null);

        const newUserMessage: Message = {
          role: "user",
          content: userMessage,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, newUserMessage]);
      }

      try {
        controllerRef.current = new AbortController();
        const signal = controllerRef.current.signal;

        // Enmascaramos el AbortController con un temporizador de tiempo de espera estricto
        const timeoutId = setTimeout(() => {
          if (controllerRef.current) {
            controllerRef.current.abort();
            toast.error("Tiempo de espera agotado. Isabella no responde.");
          }
        }, STREAM_TIMEOUT_MS);

        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/isabella-chat-enhanced`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
            body: JSON.stringify({
              messages: [...messagesRef.current, { role: "user", content: userMessage }],
              context: { mood: emotion, timestamp: Date.now() },
            }),
            signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          if (response.status === 429) {
            toast.error("Límite de peticiones alcanzado. Por favor, espera.");
            cancelStream();
            return;
          }
          
          if (response.status >= 500 && retryCount < MAX_RETRIES) {
            console.warn(`[Isabella Kernel] Reintento automático ${retryCount + 1}/${MAX_RETRIES}`);
            await new Promise((r) => setTimeout(r, 1000 * (retryCount + 1)));
            if (!signal.aborted) {
              return sendMessage(userMessage, retryCount + 1);
            }
          }
          
          throw new Error(`Error en servidor Isabella (${response.status})`);
        }

        // Extracción asíncrona de metadatos emocionales y éticos
        const ethicsHeader = response.headers.get("x-isabella-ethics");
        const emotionServer = response.headers.get("x-isabella-emotion") as Message["emotion"];
        if (ethicsHeader) setEthicsStatus(ethicsHeader);
        if (emotionServer) setEmotion(emotionServer);

        // Renderizado inmediato de la pista de voz sintética por hardware
        const voiceUrl = response.headers.get("x-isabella-voice-url");
        if (voiceUrl && voiceRef.current) {
          voiceRef.current.src = voiceUrl;
          voiceRef.current.play().catch(() => undefined);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("Incapaz de mapear el flujo de lectura de datos.");

        const decoder = new TextDecoder();
        let assistantMessage = "";
        let chunkBuffer = "";

        // Inicializamos el nodo del asistente en el historial visual
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "", timestamp: Date.now() },
        ]);

        let lastUpdateTimestamp = performance.now();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          chunkBuffer += decoder.decode(value, { stream: true });
          const lines = chunkBuffer.split("\n");
          chunkBuffer = lines.pop() || "";

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine.startsWith(":")) continue;

            if (trimmedLine.startsWith("data: ")) {
              const data = trimmedLine.slice(6).trim();
              if (data === "[DONE]") break;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content && typeof content === "string") {
                  assistantMessage += content;

                  // Throttling adaptativo: Evitamos saturar el hilo principal de renderizado de React
                  const currentTimestamp = performance.now();
                  if (currentTimestamp - lastUpdateTimestamp > 45) { // Límite sintonizado a ~24 FPS para fluidez del texto
                    setMessages((prev) => {
                      const next = [...prev];
                      if (next.length > 0) {
                        next[next.length - 1] = {
                          ...next[next.length - 1],
                          content: assistantMessage,
                        };
                      }
                      return next;
                    });
                    lastUpdateTimestamp = currentTimestamp;
                  }
                }
              } catch {
                // Ignoramos fragmentos JSON corruptos o incompletos del canal intermedio
              }
            }
          }
        }

        // Sincronización final obligatoria para vaciar el buffer remanente de texto
        setMessages((prev) => {
          const next = [...prev];
          if (next.length > 0) {
            next[next.length - 1] = {
              ...next[next.length - 1],
              content: assistantMessage,
            };
          }
          return next;
        });

        // Verificación de integridad y calidad en la respuesta entregada
        if (!assistantMessage.trim() || assistantMessage.trim().length < 5) {
          if (retryCount < MAX_RETRIES) {
            setMessages((prev) => prev.filter((m, i) => !(i === prev.length - 1 && m.role === "assistant")));
            console.warn(`[Isabella Kernel] Respuesta estéril detectada. Reintentando...`);
            await new Promise((r) => setTimeout(r, 1000));
            return sendMessage(userMessage, retryCount + 1);
          }
          throw new Error("Isabella devolvió una respuesta vacía tras agotar reintentos.");
        }

        isExecutingRef.current = false;
        setIsLoading(false);

      } catch (error: any) {
        if (error?.name === "AbortError") {
          console.log("[Isabella Kernel] Transmisión interrumpida correctamente.");
        } else {
          toast.error(error?.message || "Falla de enlace cuántico con Isabella.");
          
          // Purga atómica de nodos huérfanos o vacíos en caso de colapso en la red
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant" && !last.content.trim()) {
              return prev.slice(0, -1);
            }
            return prev;
          });
        }
      } finally {
        // Bloqueamos el estado de carga solo si este hilo específico no delegó un reintento activo
        if (retryCount === MAX_RETRIES || !isExecutingRef.current) {
          setIsLoading(false);
        }
      }
    },
    [cancelStream, emotion]
  );

  const clearChat = useCallback(() => {
    cancelStream();
    setMessages([]);
    setEmotion("neutral");
    setEthicsStatus(null);
  }, [cancelStream]);

  return {
    messages,
    isLoading,
    emotion,
    ethicsStatus,
    sendMessage,
    clearChat,
    cancelStream,
    voiceRef,
  };
}
