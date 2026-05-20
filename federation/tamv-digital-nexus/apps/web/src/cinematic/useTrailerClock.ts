// =======================================================
// CINEMATIC TRAILER CLOCK HOOK - ENTERPRISE AAA
// High-Precision Hardware Sincronized Chrono Kernel
// =======================================================

import { useEffect, useRef, useState, useCallback } from "react";
import { TOTAL_DURATION, getActAtTime, type TimelineState } from "./types";

export interface TrailerClock {
  time: number;                  // Tiempo reactivo para componentes de UI
  playing: boolean;
  completed: boolean;
  setPlaying: (playing: boolean) => void;
  restart: () => void;
  seek: (seconds: number) => void;
  getRawTime: () => number;      // Acceso directo síncrono para bucles @react-three/fiber
  getTimelineState: () => TimelineState; // Estado cinemático exacto instantáneo
}

interface TrailerClockOptions {
  duration?: number;
  autoplay?: boolean;
  audioRef?: React.RefObject<HTMLAudioElement | null>; // Enlace directo al reloj de hardware de audio
}

export function useTrailerClock({
  duration = TOTAL_DURATION,
  autoplay = true,
  audioRef
}: TrailerClockOptions = {}): TrailerClock {
  
  const [time, setTime] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(autoplay);
  const [completed, setCompleted] = useState<boolean>(false);

  // Referencias de alta velocidad para evitar ciclos de re-renderizado en WebGL
  const timeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  
  // Guardas funcionales estables para transferir estados al loop de animación
  const stateRef = useRef({ playing, duration });
  useEffect(() => {
    stateRef.current = { playing, duration };
  }, [playing, duration]);

  // Sincronización determinista del estado del tiempo
  const updateTime = useCallback((nextTime: number) => {
    const bounded = Math.max(0, Math.min(nextTime, duration));
    timeRef.current = bounded;
    
    // Throttling implícito: Solo actualizamos el estado de React si hay un cambio significativo perceptible por la UI
    setTime(bounded);

    if (bounded >= duration) {
      setPlaying(false);
      setCompleted(true);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    }
  }, [duration]);

  // Bucle de animación acoplado nativamente a la tasa de refresco de la pantalla (Hz)
  useEffect(() => {
    const loop = (now: number) => {
      const { playing: isPlaying } = stateRef.current;

      if (!isPlaying) {
        lastFrameTimeRef.current = null;
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // VÍA MAESTRA A: Sincronización directa por hardware si hay pista de audio cargada
      if (audioRef?.current) {
        updateTime(audioRef.current.currentTime);
      } else {
        // VÍA MAESTRA B: Cálculo por Delta-Time matemático preciso (1 segundo real = 1 segundo cinemático)
        if (lastFrameTimeRef.current === null) lastFrameTimeRef.current = now;
        const deltaSeconds = (now - lastFrameTimeRef.current) / 1000;
        updateTime(timeRef.current + deltaSeconds);
      }

      lastFrameTimeRef.current = now;
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [audioRef, updateTime]);

  // Controladores de flujo expuestos
  const restart = useCallback(() => {
    if (audioRef?.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    timeRef.current = 0;
    lastFrameTimeRef.current = null;
    setCompleted(false);
    setPlaying(true);
    setTime(0);
  }, [audioRef]);

  const seek = useCallback((seconds: number) => {
    const bounded = Math.max(0, Math.min(seconds, duration));
    if (audioRef?.current) {
      audioRef.current.currentTime = bounded;
    }
    timeRef.current = bounded;
    setTime(bounded);
    if (bounded < duration) setCompleted(false);
  }, [duration, audioRef]);

  // Métodos de lectura de ultra-alta velocidad (Zero-Lag UI thread)
  const getRawTime = useCallback(() => timeRef.current, []);
  
  const getTimelineState = useCallback(() => {
    return getActAtTime(timeRef.current);
  }, []);

  return {
    time,
    playing,
    completed,
    setPlaying,
    restart,
    seek,
    getRawTime,
    getTimelineState
  };
}
