// =======================================================
// CINEMATIC CAMERA RIG - TAMV ONLINE AAA TRAILER
// Hardware-Synchronized Matrix Transformations
// =======================================================

import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { type TimelineState } from "./types";

interface CinematicCameraRigProps {
  timelineState: TimelineState; // El estado exacto devuelto por clock.getTimelineState()
}

export function CinematicCameraRig({ timelineState }: { timelineState: TimelineState }) {
  const { act, t, config } = timelineState;
  
  // Vectores e instancias persistentes en memoria para evitar recolección de basura (Garbage Collection) en cada frame
  const currentPos = useRef(new THREE.Vector3());
  const currentTarget = useRef(new THREE.Vector3());
  const targetPosV3 = useRef(new THREE.Vector3());
  const targetLookAtV3 = useRef(new THREE.Vector3());

  // Inicializar la posición de la cámara al arrancar el acto cero para evitar destellos o saltos iniciales
  useEffect(() => {
    if (act === "BLACK_VOID") {
      const { from } = config.camera;
      currentPos.current.set(...from.position);
      currentTarget.current.set(...from.target);
    }
  }, [act, config.camera]);

  useFrame((state) => {
    const { camera } = state;
    const { from, to, curve } = config.camera;

    // 1. Convertir coordenadas planas de la configuración a vectores 3D nativos
    const startPos = targetPosV3.current.set(...from.position);
    const endPos = targetPosV3.current.set(...to.position);
    const startTarget = targetLookAtV3.current.set(...from.target);
    const endTarget = targetLookAtV3.current.set(...to.target);

    // 2. Determinar la física de aceleración (Curva de interpolación matemática)
    // Usamos el factor 't' local del acto [0, 1] calculado por el reloj maestro
    let interpolationFactor = t;
    
    if (curve === "exponential") {
      // Curva sigmoide para aceleración y desaceleración fluida
      interpolationFactor = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    } else if (curve === "magnetic-snap") {
      // Efecto de inercia/frenado industrial (Cubic BezierOut aproximado)
      interpolationFactor = 1 - Math.pow(1 - t, 4);
    }

    // 3. Interpolar linealmente la posición y el objetivo en el espacio tridimensional
    currentPos.current.lerpVectors(startPos, endPos, interpolationFactor);
    currentTarget.current.lerpVectors(startTarget, endTarget, interpolationFactor);

    // 4. Inyectar movimientos orbitales orgánicos residuales (Ruido cinemático)
    // Esto hace que la cámara se sienta "viva" y flotante incluso si está estática
    const globalTime = state.clock.getElapsedTime(); // Usado puramente para la onda senoidal del ruido
    if (act !== "BLACK_VOID" && act !== "FINAL_DECLARATION") {
      const noiseX = Math.sin(globalTime * 0.4) * 0.3;
      const noiseY = Math.cos(globalTime * 0.3) * 0.2;
      camera.position.set(
        currentPos.current.x + noiseX,
        currentPos.current.y + noiseY,
        currentPos.current.z
      );
    } else {
      camera.position.copy(currentPos.current);
    }

    // 5. Orientación de matriz estricta y actualización de FOV óptico
    camera.lookAt(currentTarget.current);
    
    const targetFOV = THREE.MathUtils.lerp(from.fov, to.fov, interpolationFactor);
    if (Math.abs(camera.fov - targetFOV) > 0.01) {
      camera.fov = targetFOV;
      camera.updateProjectionMatrix(); // Obligatorio al mutar el FOV en tiempo de ejecución
    }
  });

  return null;
}
