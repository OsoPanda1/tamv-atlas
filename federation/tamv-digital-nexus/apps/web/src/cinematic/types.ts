// =======================================================
// KERNEL TYPES - TAMV CINEMATIC CHRONOLOGY (AAA)
// =======================================================

export type ActId =
  | "BLACK_VOID"
  | "CORE_AWAKENS"
  | "SYSTEM_FAILURE"
  | "CIVILIZATORY_EXPANSION"
  | "REVELATION"
  | "FINAL_DECLARATION";

export interface CameraNode {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export interface PostProcessingConfig {
  bloomIntensity: number;
  chromaticAberration: number;
  glitchIntensity: number;
  vignette: number;
}

export interface ActConfig {
  id: ActId;
  startAt: number; // segundos
  endAt: number;   // segundos
  meta: {
    title: string | null;
    subtitle: string | null;
    glitchText?: boolean;
  };
  // Curva de interpolación espacial de la cámara
  camera: {
    from: CameraNode;
    to: CameraNode;
    curve: "linear" | "exponential" | "magnetic-snap";
  };
  // Parámetros de renderizado en tiempo real (Materiales, Reactores, Iluminación)
  render: {
    reactorCoreGlow: number;      // Brillo del núcleo central
    structureDeformation: number; // Factor de desfragmentación geométrica
    volumetricLightDensity: number;
    post: PostProcessingConfig;
  };
}

// Escala cronológica y cinemática definitiva del Trailer TAMV
export const ACTS: ActConfig[] = [
  {
    id: "BLACK_VOID",
    startAt: 0,
    endAt: 4,
    meta: { title: null, subtitle: null },
    camera: {
      from: { position: [0, 0, 50], target: [0, 0, 0], fov: 30 },
      to: { position: [0, 0, 45], target: [0, 0, 0], fov: 30 },
      curve: "linear",
    },
    render: {
      reactorCoreGlow: 0.0,
      structureDeformation: 0.0,
      volumetricLightDensity: 0.01,
      post: { bloomIntensity: 0.0, chromaticAberration: 0.002, glitchIntensity: 0.0, vignette: 0.8 }
    }
  },
  {
    id: "CORE_AWAKENS",
    startAt: 4,
    endAt: 9,
    meta: { title: "INICIALIZANDO NÚCLEO...", subtitle: "PROTOCOLO SOBERANÍA ACTIVO" },
    camera: {
      from: { position: [0, 0, 45], target: [0, 0, 0], fov: 30 },
      to: { position: [0, 4, 25], target: [0, 1, 0], fov: 45 },
      curve: "exponential",
    },
    render: {
      reactorCoreGlow: 0.7,
      structureDeformation: 0.1,
      volumetricLightDensity: 0.4,
      post: { bloomIntensity: 1.5, chromaticAberration: 0.005, glitchIntensity: 0.1, vignette: 0.5 }
    }
  },
  {
    id: "SYSTEM_FAILURE",
    startAt: 9,
    endAt: 14,
    meta: { title: "ANOMALÍA DETECTADA", subtitle: "ACOSO SISTÉMICO - DESVINCULACIÓN EN PROCESO", glitchText: true },
    camera: {
      from: { position: [0, 4, 25], target: [0, 1, 0], fov: 45 },
      to: { position: [12, -2, 18], target: [0, 2, -2], fov: 55 },
      curve: "magnetic-snap",
    },
    render: {
      reactorCoreGlow: 1.5, // Sobrecarga lumínica
      structureDeformation: 2.8, // Geometría rompiéndose / desfragmentación activa
      volumetricLightDensity: 0.8,
      post: { bloomIntensity: 4.0, chromaticAberration: 0.04, glitchIntensity: 0.9, vignette: 0.3 }
    }
  },
  {
    id: "CIVILIZATORY_EXPANSION",
    startAt: 14,
    endAt: 20,
    meta: { title: "EXPANSIÓN CIVILIZATORIA", subtitle: "CONEXIÓN DE LAS 7 FEDERACIONES DEL TAMV" },
    camera: {
      from: { position: [40, 20, 40], target: [0, 5, 0], fov: 60 },
      to: { position: [0, 80, 5], target: [0, 0, 0], fov: 35 },
      curve: "exponential",
    },
    render: {
      reactorCoreGlow: 0.5,
      structureDeformation: 0.0, // Consolidación estable de la megaestructura
      volumetricLightDensity: 0.2,
      post: { bloomIntensity: 0.8, chromaticAberration: 0.003, glitchIntensity: 0.05, vignette: 0.6 }
    }
  },
  {
    id: "REVELATION",
    startAt: 20,
    endAt: 26,
    meta: { title: "PROTOCOLO TAMV", subtitle: "TAMV ATLAS · ISNI WIKI CORE" },
    camera: {
      from: { position: [0, 80, 5], target: [0, 0, 0], fov: 35 },
      to: { position: [0, 1.5, 8], target: [0, 1.6, 0], fov: 50 },
      curve: "magnetic-snap",
    },
    render: {
      reactorCoreGlow: 1.0,
      structureDeformation: 0.2,
      volumetricLightDensity: 0.5,
      post: { bloomIntensity: 2.0, chromaticAberration: 0.008, glitchIntensity: 0.0, vignette: 0.4 }
    }
  },
  {
    id: "FINAL_DECLARATION",
    startAt: 26,
    endAt: 32,
    meta: { title: null, subtitle: null },
    camera: {
      from: { position: [0, 1.5, 8], target: [0, 1.6, 0], fov: 50 },
      to: { position: [0, 1.5, 8.5], target: [0, 1.6, 0], fov: 20 }, // Zoom dramático final ultra cerrado
      curve: "linear",
    },
    render: {
      reactorCoreGlow: 0.0, // Apagado elegante para contraste negro puro
      structureDeformation: 0.0,
      volumetricLightDensity: 0.0,
      post: { bloomIntensity: 0.0, chromaticAberration: 0.0, glitchIntensity: 0.0, vignette: 0.9 }
    }
  }
];

export const TOTAL_DURATION = 32;

export interface TimelineState {
  act: ActId;
  t: number; // Factor local normalizado de progreso del acto actual (0 a 1)
  config: ActConfig;
}

/**
 * Evalúa el segundo actual y extrae el estado exacto de la línea de tiempo cinemática.
 */
export function getActAtTime(time: number): TimelineState {
  const boundedTime = Math.max(0, Math.min(time, TOTAL_DURATION));
  
  const current =
    ACTS.find((a) => boundedTime >= a.startAt && boundedTime < a.endAt) ?? ACTS[ACTS.length - 1];
    
  const span = current.endAt - current.startAt;
  const local = Math.min(Math.max(boundedTime - current.startAt, 0), span);
  const t = span <= 0 ? 0 : local / span;
  
  return {
    act: current.id,
    t,
    config: current
  };
}
