import { WikiH1, WikiH2, WikiH3, WikiP, WikiBreadcrumb, WikiCard, WikiTable, WikiCode, WikiTag } from "@/components/WikiComponents";

export default function DreamspacesXR() {
  return (
    <div>
      <WikiBreadcrumb section="metaverso-xr" page="dreamspaces-xr" />
      <WikiH1>DreamSpaces y Experiencias XR/4D</WikiH1>

      <div className="flex flex-wrap gap-1 mb-4">
        <WikiTag>M03_XR</WikiTag>
        <WikiTag>DM-X4-06</WikiTag>
        <WikiTag>Three.js</WikiTag>
        <WikiTag>WebXR</WikiTag>
        <WikiTag>HyperRealEngine</WikiTag>
      </div>

      <WikiP>
        DreamSpaces son entornos inmersivos WebGL/WebXR/Spatial Audio para colaboración y construcción cultural. 
        Incluyen recorridos narrativos por Real del Monte, aulas UTAMV inmersivas, salas de exhibición y distritos culturales.
        Los ambientes disponibles son: <strong>Quantum, Cosmic, Forest, Crystal</strong>.
      </WikiP>

      <WikiH2>1. Objetivos de Performance XR</WikiH2>
      <WikiTable
        headers={["Métrica", "Target mínimo", "Target óptimo"]}
        rows={[
          ["FPS en equipos medios", "45 fps", "60 fps"],
          ["FPS en equipos bajos", "30 fps", "45 fps"],
          ["Tiempo de carga ruta XR", "< 2s percibido", "< 1s"],
          ["Uso de memoria Three.js", "< 200MB", "< 100MB"],
          ["Leaks de geometría", "0", "0"],
          ["Audio latency", "< 50ms", "< 20ms"],
        ]}
      />

      <WikiH2>2. Code-Splitting (Obligatorio — MSR-XR-01)</WikiH2>
      <WikiP>
        Todas las rutas XR deben usar <code>React.lazy()</code> + <code>Suspense</code>. 
        Esta es una regla constitucional enforced por Constitution Engine.
      </WikiP>
      <WikiCode>{`// src/App.tsx — implementación requerida (MSR-XR-01)
const Metaverse = lazy(() => import('./pages/Metaverse'));
const DreamSpaces = lazy(() => import('./pages/DreamSpaces'));
const ThreeDSpace = lazy(() => import('./pages/ThreeDSpace'));

// El fallback de Suspense debe ser una pantalla de carga XR ligera (sin Three.js)
<Suspense fallback={<XRLoadingScreen />}>
  <Route path="/dreamspaces" element={<DreamSpaces />} />
</Suspense>`}</WikiCode>

      <WikiH2>3. LOD (Level of Detail) Adaptativo</WikiH2>
      <WikiCode>{`// Configuración automática por FPS — useXRStore o render loop
const FPS_THRESHOLDS = {
  HIGH:    { min: 55, quality: 'high',    particles: 2000, shadows: true  },
  MEDIUM:  { min: 45, quality: 'medium',  particles: 1000, shadows: false },
  LOW:     { min: 30, quality: 'low',     particles: 500,  shadows: false },
  MINIMAL: { min: 0,  quality: 'minimal', particles: 100,  shadows: false },
};

// Reglas de activación:
// fps < 45 durante 3 segundos consecutivos → bajar un nivel
// fps > 55 durante 5 segundos consecutivos → subir un nivel
// Actualizar: xrStore.updateSceneConfig({ quality, lodEnabled: true })`}</WikiCode>

      <WikiH2>4. Limpieza de Recursos Three.js</WikiH2>
      <WikiCode>{`// OBLIGATORIO: cada componente 3D implementa cleanup en useEffect
useEffect(() => {
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.MeshStandardMaterial();
  
  return () => {
    geometry.dispose();
    material.dispose();
    // texture.dispose();
    // renderTarget.dispose();
  };
}, []);

// ⛔ ANTI-PATRÓN PROHIBIDO: crear geometrías dentro de useFrame`}</WikiCode>

      <WikiH2>5. Audio-Reactivo — Throttle Obligatorio</WikiH2>
      <WikiCode>{`const AUDIO_SAMPLE_MS = 33; // ~30fps max para análisis FFT
let lastSample = 0;

useFrame(({ clock }) => {
  const now = clock.getElapsedTime() * 1000;
  if (now - lastSample < AUDIO_SAMPLE_MS) return;
  lastSample = now;
  // analizar FFT aquí — KAOS Audio System
});`}</WikiCode>

      <WikiH2>6. Patrones Permitidos y Prohibidos</WikiH2>
      <WikiTable
        headers={["Tipo", "Patrón", "Notas"]}
        rows={[
          ["✅ Permitido", "InstancedMesh para partículas", "Objetos repetitivos optimizados"],
          ["✅ Permitido", "BufferGeometry pre-calculada", "Atributos estáticos"],
          ["✅ Permitido", "LOD object de Three.js", "Meshes complejos con múltiples resoluciones"],
          ["✅ Permitido", "RenderTexture", "Reflections simples"],
          ["✅ Permitido", "AudioContext binaural", "KAOS Audio System"],
          ["⛔ Prohibido", "new THREE.* dentro de useFrame", "Memory leak garantizado"],
          ["⛔ Prohibido", "Texturas > 2048px en móvil", "Sin comprimir"],
          ["⛔ Prohibido", "> 10 DirectionalLight activos", "Performance killer"],
          ["⛔ Prohibido", "postprocessing sin feature flag", "Solo con calidad >= MEDIUM"],
        ]}
      />

      <WikiH2>7. KAOS Audio System</WikiH2>
      <WikiCard title="Audio espacial 3D/4D" accent="cyan">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Audio espacial 3D/4D</strong> — posicionamiento de fuentes en el espacio virtual</li>
          <li><strong>Paisajes sonoros inmersivos</strong> — generación procedural basada en contexto</li>
          <li><strong>Integración con DreamSpaces</strong> — cada ambiente tiene su paisaje sonoro</li>
          <li><strong>Control de intensidad sensorial</strong> — adaptativo a preferencias del usuario</li>
          <li><strong>Edge Function:</strong> <code>supabase/functions/kaos-audio-system/index.ts</code></li>
        </ul>
      </WikiCard>

      <WikiH2>8. Canalización Técnica XR</WikiH2>
      <WikiCode>{`[ Usuario XR ]
     │ (login ISNI / TAMV)
     ▼
[ Gateway XR TAMV ]
     │ (valida identidad + credenciales + membership tier)
     ▼
[ Isabella AI ]
     │ (interpreta intención, aplica filtros éticos)
     ▼
[ Servicios XR/4D ]
     │ (museos, recorridos, aulas, distritos)
     │  → DreamSpaces: Quantum | Cosmic | Forest | Crystal
     ▼
[ MD-X4 / MD-X5 ]
     │ (registra eventos, ajusta experiencias, LOD adaptativo)
     ▼
[ ISNI / UTAMV / BookPI ]
     (actualiza perfiles, logros, métricas, cumplimiento ético)`}</WikiCode>

      <WikiH2>9. Gobernanza XR</WikiH2>
      <WikiCard title="DAO-Experiencia puede decidir" accent="green">
        <ul className="list-disc list-inside space-y-1">
          <li>Límites de intensidad visual/sonora</li>
          <li>Tipos de experiencias XR permitidas por defecto</li>
          <li>Umbrales de accesibilidad (reducir movimiento, sin parallax)</li>
        </ul>
      </WikiCard>
      <WikiCard title="DAO-Experiencia NO puede decidir" accent="orange">
        <ul className="list-disc list-inside space-y-1">
          <li>Precios de acceso a experiencias premium XR</li>
          <li>Arquitectura interna del pipeline MD-X4</li>
        </ul>
      </WikiCard>
    </div>
  );
}
