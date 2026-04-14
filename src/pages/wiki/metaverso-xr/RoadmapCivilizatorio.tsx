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

const architecturePulse = [
  { layer: "Backend Core", status: "Operativo", progress: 90, color: "bg-cyan-400" },
  { layer: "Quantum Lab", status: "Estable", progress: 85, color: "bg-violet-400" },
  { layer: "XR Worlds", status: "Productivo", progress: 75, color: "bg-fuchsia-400" },
  { layer: "MSR / BookPI", status: "Auditado", progress: 80, color: "bg-emerald-400" },
  { layer: "Gobernanza", status: "CITEMESH live", progress: 90, color: "bg-amber-400" },
];

const integrationFlow = [
  {
    title: "Identity Sovereign",
    description: "Dignity score + reputación con creación automática en registro.",
    endpoint: "/api/v1/identity",
  },
  {
    title: "MSR Registry",
    description: "Evento inmutable con hash SHA-256 para trazabilidad verificable.",
    endpoint: "/api/v1/msr",
  },
  {
    title: "Governance Engine",
    description: "Poderes y roles con enforcement por middleware y auditoría.",
    endpoint: "/api/v1/governance",
  },
];

export default function RoadmapCivilizatorio() {
  return (
    <div>
      <WikiBreadcrumb section="metaverso-xr" page="roadmap-civilizatorio" />

      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 mb-8">
        <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <WikiH1>TAMV 2.0 · Command Center CITEMESH (Febrero 2026)</WikiH1>
        <WikiP>
          Vista ejecutiva de alto impacto para producto e ingeniería: estado operativo, rutas críticas,
          trazabilidad MSR y evolución de gobernanza en una sola pantalla de decisión.
        </WikiP>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4">
            <div className="text-xs text-cyan-200/80 uppercase tracking-wider">Operación validada</div>
            <div className="text-3xl font-bold text-cyan-200">65%</div>
            <div className="text-xs text-cyan-100/70">Corte 04-Feb-2026</div>
          </div>
          <div className="rounded-xl border border-violet-400/30 bg-violet-500/10 p-4">
            <div className="text-xs text-violet-200/80 uppercase tracking-wider">Implementación beta</div>
            <div className="text-3xl font-bold text-violet-200">75%</div>
            <div className="text-xs text-violet-100/70">Consolidado Feb-2026</div>
          </div>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
            <div className="text-xs text-emerald-200/80 uppercase tracking-wider">Servicios reportados</div>
            <div className="text-3xl font-bold text-emerald-200">25</div>
            <div className="text-xs text-emerald-100/70">Incluye auth, feed, identity y MSR</div>
          </div>
          <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-4">
            <div className="text-xs text-amber-200/80 uppercase tracking-wider">Cobertura de trazas</div>
            <div className="text-3xl font-bold text-amber-200">100%</div>
            <div className="text-xs text-amber-100/70">Auth + Post logueados a MSR</div>
          </div>
        </div>
      </div>

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
      </WikiCard>

      <WikiH2>1) Arquitectura técnica integrada</WikiH2>
      <div className="mb-6 rounded-2xl border border-border bg-card/60 p-5">
        <div className="mb-4 text-sm font-semibold text-foreground">Pulse de arquitectura (en vivo)</div>
        <div className="space-y-4">
          {architecturePulse.map((item) => (
            <div key={item.layer}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-foreground">{item.layer}</span>
                <span className="text-muted-foreground">{item.status} · {item.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary">
                <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

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
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        {integrationFlow.map((block) => (
          <div key={block.title} className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="text-sm font-semibold text-foreground">{block.title}</div>
            <p className="mt-1 text-sm text-secondary-foreground">{block.description}</p>
            <div className="mt-3 inline-flex rounded-md border border-primary/20 bg-background px-2 py-1 text-xs font-mono text-primary">
              {block.endpoint}
            </div>
          </div>
        ))}
      </div>

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
