import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Stat = {
  name: string;
  file_count: number;
  total_bytes: number;
  extensions: Record<string, number>;
  top_files: Array<{ path: string; size: number }>;
};

type Manifest = {
  generated_at: string;
  sources: Array<{ repo: string; url: string; local: string }>;
  stats: Stat[];
  catalog: {
    nexus_services: string[];
    nexus_edge_functions: string[];
    nexus_migrations: string[];
    frontier_pages: string[];
    frontier_core_modules: string[];
  };
};

const fmtBytes = (n: number) => {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
};

export default function FusionRegistry() {
  const [m, setM] = useState<Manifest | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch("/federation-manifest.json")
      .then((r) => r.json())
      .then(setM)
      .catch((e) => setErr(String(e)));
  }, []);

  return (
    <div className="px-6 py-8 md:px-10 space-y-6">
      <header className="rounded-xl border border-primary/30 bg-gradient-to-br from-slate-900/80 to-slate-950 p-6">
        <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-primary">
          FUSION-CORE · OsoPanda1 Federation
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-100 mt-2">
          Registro de Fusión TAMV
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-3xl">
          Unificación de los repositorios{" "}
          <code className="text-primary">tamv-digital-nexus</code> y{" "}
          <code className="text-primary">tamv-the-federated-frontier</code> dentro de este
          proyecto federado. El código fuente queda disponible bajo{" "}
          <code>/federation</code> para integración progresiva sin romper el shell activo.
        </p>
      </header>

      {err && (
        <div className="rounded-lg border border-red-500/40 bg-red-950/40 p-4 text-sm text-red-200">
          Error cargando manifiesto: {err}
        </div>
      )}

      {!m && !err && (
        <div className="text-slate-400 text-sm">Cargando manifiesto…</div>
      )}

      {m && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            {m.stats.map((s, i) => (
              <div
                key={s.name}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-slate-100">
                    {s.name}
                  </h2>
                  <a
                    href={m.sources[i].url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-mono text-primary hover:underline"
                  >
                    github ↗
                  </a>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-slate-500">Archivos</div>
                    <div className="text-slate-100 text-lg">{s.file_count}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Tamaño</div>
                    <div className="text-slate-100 text-lg">
                      {fmtBytes(s.total_bytes)}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">
                    Extensiones
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(s.extensions)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 12)
                      .map(([ext, n]) => (
                        <span
                          key={ext}
                          className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300"
                        >
                          {ext} · {n}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Section title="Edge Functions (Nexus)" items={m.catalog.nexus_edge_functions} accent="primary" />
          <Section title="Services (Nexus)" items={m.catalog.nexus_services} accent="emerald" />
          <Section title="Migrations (Nexus)" items={m.catalog.nexus_migrations} accent="blue" mono />
          <Section title="Pages (Frontier)" items={m.catalog.frontier_pages} accent="purple" />
          <Section title="Core Modules (Frontier)" items={m.catalog.frontier_core_modules} accent="amber" />

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 text-xs text-slate-400">
            Manifiesto generado: <span className="text-slate-200 font-mono">{m.generated_at}</span>.
            Para integrar un módulo concreto al shell activo, importarlo desde{" "}
            <code>/federation/&lt;repo&gt;/…</code> y exponerlo como nueva ruta en{" "}
            <Link to="/" className="text-primary hover:underline">App.tsx</Link>.
          </div>
        </>
      )}
    </div>
  );
}

function Section({
  title,
  items,
  accent,
  mono,
}: {
  title: string;
  items: string[];
  accent: "primary" | "emerald" | "blue" | "purple" | "amber";
  mono?: boolean;
}) {
  const colorMap: Record<string, string> = {
    primary: "text-primary border-primary/30",
    emerald: "text-emerald-400 border-emerald-500/30",
    blue: "text-blue-400 border-blue-500/30",
    purple: "text-purple-400 border-purple-500/30",
    amber: "text-amber-400 border-amber-500/30",
  };
  if (!items?.length) return null;
  return (
    <div className={`rounded-xl border bg-slate-900/40 p-5 ${colorMap[accent]}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold uppercase tracking-widest">{title}</h3>
        <span className="text-[10px] text-slate-500 font-mono">{items.length} ítems</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((it) => (
          <span
            key={it}
            className={`px-2 py-1 rounded bg-slate-950/70 border border-slate-800 text-[10px] text-slate-200 ${
              mono ? "font-mono" : ""
            }`}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
