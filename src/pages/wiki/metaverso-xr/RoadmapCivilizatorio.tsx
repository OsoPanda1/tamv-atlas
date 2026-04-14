import {
  WikiH1,
  WikiH2,
  WikiH3,
  WikiP,
  WikiBreadcrumb,
  WikiCard,
  WikiTable,
  WikiCode,
  WikiTag,
} from "@/components/WikiComponents";

export default function RoadmapCivilizatorio() {
  return (
    <div>
      <WikiBreadcrumb section="metaverso-xr" page="roadmap-civilizatorio" />
      <WikiH1>TAMV 2.0 · Implementación técnica unificada (Febrero 2026)</WikiH1>
      <WikiP>
        Esta versión reemplaza la lectura narrativa por una síntesis técnica ejecutable: stack,
        servicios, endpoints, seguridad, DevOps, testing y estado real de avance. Integra los
        documentos de “Implementación Técnica Completa” y “Reporte de Estado” en una sola hoja
        de decisión para producto e ingeniería.
      </WikiP>

      <div className="mb-5">
        <WikiTag>Node 20 + TS 5</WikiTag>
        <WikiTag>React 18 + Vite 5</WikiTag>
        <WikiTag>PostgreSQL 15</WikiTag>
        <WikiTag>Quantum + XR + MSR</WikiTag>
        <WikiTag>CITEMESH</WikiTag>
        <WikiTag>BookPI</WikiTag>
      </div>

      <WikiCard accent="orange" title="Normalización temporal (fechas y porcentajes)">
        Para evitar ambigüedad: el corte del <strong>4 de febrero de 2026</strong> reporta
        <strong> 65% funcional real para producción</strong>; el corte consolidado de
        <strong> febrero de 2026</strong> mantiene <strong>75% implementado en beta</strong>.
        Ambos datos son compatibles si se interpreta 65% como operación end-to-end validada y
        75% como avance total de construcción del sistema.
      </WikiCard>

      <WikiH2>1) Arquitectura técnica integrada</WikiH2>
      <WikiTable
        headers={["Capa", "Tecnologías", "Estado"]}
        rows={[
          ["Backend Core", "Node.js, TypeScript, Express, PostgreSQL, JWT", "Operativo"],
          ["Frontend", "React, Vite, Tailwind, Zustand, React Query", "Operativo"],
          ["Quantum Lab", "Qiskit, TFQ, cuQuantum (+Azure QDK roadmap)", "85%"],
          ["XR Worlds", "Three.js/WebXR + motor 4D", "75%"],
          ["MSR / BookPI", "Hash SHA-256 + ledger auditable", "80%"],
          ["Gobernanza", "CITEMESH + protocolos Fénix/Hoyo Negro/Iniciación", "90%"],
        ]}
      />

      <WikiCode>{`TAMV Platform
Quantum Lab + XR Worlds + MSR Blockchain
            ↓
      Isabella / TAMVAI Orchestrator
            ↓
Social Feed + UTAMV + DreamSpaces`}</WikiCode>

      <WikiH2>2) Backend y APIs activas</WikiH2>
      <WikiP>
        El core técnico contempla autenticación, usuarios, contenido, identidad, gobernanza y
        auditoría MSR, con estructura por controllers/routes/services/middleware y patrón de
        event-sourcing para trazabilidad.
      </WikiP>
      <WikiTable
        headers={["Dominio", "Base path", "Cobertura"]}
        rows={[
          ["Auth", "/api/v1/auth", "registro, login, refresh, reset"],
          ["Users", "/api/v1/users", "perfil, follow/unfollow, posts"],
          ["Posts", "/api/v1/posts", "CRUD, likes, comentarios"],
          ["Feed", "/api/v1/feed", "personalizado, trending, following"],
          ["Identity", "/api/v1/identity", "verificación + dignity score"],
          ["MSR", "/api/v1/msr", "eventos, actor timeline"],
          ["Governance", "/api/v1/governance", "propuestas, votos, poderes"],
        ]}
      />

      <WikiH2>3) Servicio Quantum y XR: estado por backend</WikiH2>
      <WikiH3>Quantum Lab</WikiH3>
      <WikiTable
        headers={["Backend", "Uso", "Estado"]}
        rows={[
          ["Qiskit", "optimización/simulación", "Implementado"],
          ["TensorFlow Quantum", "recomendación y QML híbrido", "Implementado"],
          ["cuQuantum", "simulación acelerada GPU", "Implementado"],
          ["Azure QDK", "integración enterprise Q#", "Pendiente"],
        ]}
      />

      <WikiH3>XR Worlds</WikiH3>
      <WikiTable
        headers={["Dreamspace", "Capacidad", "Meta de performance"]}
        rows={[
          ["Neo-Tokio 2099", "30-40 usuarios", "60 FPS (mínimo 45)"],
          ["Auditorio Infrasonido", "50-150 usuarios", "latencia < 200ms"],
          ["Santuario Fractal", "20-30 usuarios", "LOD agresivo + baked light"],
        ]}
      />

      <WikiH2>4) Seguridad, identidad y compliance</WikiH2>
      <WikiP>
        La seguridad integra JWT/refresh tokens, rate limit, validación/sanitización de input,
        registro inmutable de eventos (MSR/BookPI) y evolución hacia criptografía post-cuántica
        (ML-KEM/ML-DSA/SLH-DSA en roadmap de endurecimiento).
      </WikiP>
      <WikiCode>{`if (!hasRequiredPower) return 403;
if (securityAlert.risk === 'ALTO') {
  logMSREvent('SECURITY_ALERT');
  escalateToHumanGuardians();
}`}</WikiCode>

      <WikiH2>5) Estado operativo por bloques</WikiH2>
      <WikiTable
        headers={["Bloque", "Avance", "Lectura ejecutiva"]}
        rows={[
          ["Backend Core", "90%", "Listo para carga de producto"],
          ["Quantum", "85%", "3 backends estables + 1 pendiente"],
          ["XR", "75%", "base productiva, falta capa avanzada"],
          ["Economía", "65%", "pendiente integración Stripe"],
          ["Gobernanza", "90%", "modelo CITEMESH completo"],
          ["DevOps", "55%", "CI/CD y despliegue final pendientes"],
        ]}
      />

      <WikiCard accent="cyan" title="Servicios y testing reportados">
        25 servicios implementados, 5,500+ LOC y batería de pruebas (unitarias, integración,
        property-based, E2E y carga) reportadas como base de validación para producción.
      </WikiCard>

      <WikiH2>6) Brechas críticas para 100% (ventana objetivo: 2.25 meses)</WikiH2>
      <WikiTable
        headers={["Prioridad", "Trabajo", "Impacto"]}
        rows={[
          ["Crítico", "Stripe + conciliación de pagos", "habilita economía completa"],
          ["Crítico", "S3 + CloudFront", "distribución de assets XR/CGIFTS"],
          ["Crítico", "WebSocket eventos", "telemetría y tiempo real"],
          ["Importante", "Editor Dreamspaces", "escalabilidad de contenidos"],
          ["Importante", "UTAMV cursos completos", "monetización educativa"],
          ["Opcional", "Azure QDK + polytopes avanzados", "I+D y diferenciación"],
        ]}
      />

      <WikiH2>7) Actualización final para dirección técnica</WikiH2>
      <WikiCard accent="green" title="Conclusión unificada">
        TAMV muestra una base técnica sólida y verificable. El foco inmediato no es rediseñar
        arquitectura, sino cerrar las tres brechas de producción (pagos, distribución y tiempo
        real), endurecer seguridad PQC y convertir el estado beta en operación estable escalable.
      </WikiCard>
    </div>
  );
}
