import { Link } from "react-router-dom";
import { wikiStructure } from "@/data/wikiStructure";

type FeatureGroup = {
  title: string;
  items: string[];
};

const totalArticles = wikiStructure.reduce((acc, module) => acc + module.children.length, 0);

const featureGroups: FeatureGroup[] = [
  { title: "Social", items: ["Reels", "Stories 24h", "Mensajería", "Comentarios y reacciones", "Seguir/Dejar de seguir"] },
  { title: "Contenido", items: ["Streaming en vivo", "Chat en vivo", "Grabación automática", "Calidades múltiples"] },
  { title: "Educación", items: ["Cursos", "Seguimiento de progreso", "Certificados verificables", "Monetización"] },
  { title: "Economía", items: ["CGIFTS", "Lotería transparente", "Trust Score", "Pagos seguros"] },
  { title: "XR", items: ["DreamSpaces 3D", "Avatares", "Interacción real-time", "Propiedad de objetos"] },
  { title: "Cumplimiento", items: ["GDPR", "CCPA", "Derecho al olvido", "Exportación de datos"] },
];

const progressData = [
  { label: "Fase 0 · Especificación", value: 100, status: "completada" },
  { label: "Fase 1 · Core services", value: 100, status: "completada" },
  { label: "Fase 2 · Avanzadas", value: 40, status: "en progreso" },
  { label: "Fase 3 · Polish/Deploy", value: 0, status: "pendiente" },
  { label: "Total proyecto", value: 65, status: "en desarrollo" },
];

function ProgressRow({ label, value, status }: { label: string; value: number; status: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-foreground">{label}</span>
        <span className="text-muted-foreground">{value}% · {status}</span>
      </div>
      <div className="h-2 rounded bg-secondary overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function WikiHome() {
  return (
    <div className="px-6 py-8 md:px-8 lg:px-10 space-y-10">
      <section className="rounded-xl border border-primary/30 bg-slate-900/60 p-6">
        <p className="text-xs font-mono text-primary mb-2">TAMV ATLAS · RESUMEN EJECUTIVO</p>
        <h1 className="text-3xl md:text-4xl font-bold text-glow-cyan mb-4">TAMV · Plataforma Social del Futuro</h1>
        <p className="text-sm text-muted-foreground max-w-4xl">
          Integración unificada de red social, educación digital, economía trazable y espacios 3D: una capa operativa que conecta
          TikTok + Instagram + Zoom + metaverso funcional bajo principios de soberanía digital y transparencia.
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-mono">
          <span className="px-2 py-1 border border-border rounded">25 servicios</span>
          <span className="px-2 py-1 border border-border rounded">100+ endpoints</span>
          <span className="px-2 py-1 border border-border rounded">14 tablas BD</span>
          <span className="px-2 py-1 border border-border rounded">~65% avance funcional</span>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        {featureGroups.map((group) => (
          <article key={group.title} className="rounded-lg border border-border bg-card p-4">
            <h2 className="text-sm font-semibold text-primary mb-2">{group.title}</h2>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {group.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-border bg-card p-5 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Arquitectura en simple</h2>
        <pre className="text-[11px] leading-relaxed text-muted-foreground bg-secondary/60 border border-border rounded p-3 overflow-auto">{`Usuario/App Web-Móvil
    │
    ▼
TAMV Core (Realtime, Reels, Stories, Messaging, Live, Courses, XR)
    │
    ├─ Cache rápido (Redis)
    ├─ Base de datos (PostgreSQL)
    ├─ BookPI (contabilidad inmutable)
    └─ Panteón (seguridad, fraude, moderación)`}</pre>
      </section>

      <section className="rounded-lg border border-border bg-card p-5 space-y-3">
        <h2 className="text-lg font-semibold">Progreso visual (corte reportado: febrero 2026)</h2>
        <p className="text-xs text-muted-foreground">
          Nota: estas métricas se muestran como estado documental reportado en febrero de 2026; requieren validación operativa continua
          para una publicación técnica definitiva.
        </p>
        <div className="space-y-3">
          {progressData.map((row) => (
            <ProgressRow key={row.label} {...row} />
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-orange-400/30 bg-orange-500/5 p-5 space-y-3">
        <h2 className="text-lg font-semibold text-orange-300">UTAMV · Bloque institucional pre‑RVOE</h2>
        <p className="text-sm text-muted-foreground">
          La UTAMV se presenta como institución privada en fase de preparación y, en su caso, solicitud de RVOE. Salvo resolución
          oficial expresa para programas específicos, los estudios tienen carácter institucional sin validez oficial.
        </p>
        <blockquote className="border-l-2 border-orange-400 pl-3 text-xs text-orange-200">
          “Estudios sin reconocimiento de validez oficial. La formación educativa ofrecida no cuenta con reconocimiento por parte de
          la autoridad educativa competente.”
        </blockquote>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Índice global de módulos (0–12)</h2>
          <p className="text-xs text-muted-foreground">{totalArticles} artículos enlazados</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wikiStructure.map((section, moduleIndex) => (
            <div key={section.id} className="bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition-colors">
              <Link to={`/modulo/${moduleIndex}`} className="flex items-center gap-3 mb-3 group">
                <span className="text-xl">{section.icon}</span>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{section.title}</h3>
              </Link>
              <ul className="space-y-1 mb-3">
                {section.children.map((page) => (
                  <li key={page.slug}>
                    <Link to={`/articulo/${page.slug}`} className="text-xs text-muted-foreground hover:text-primary">· {page.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
