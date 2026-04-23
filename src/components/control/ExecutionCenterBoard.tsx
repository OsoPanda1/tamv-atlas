import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Filter, Layers, PauseCircle, Radar } from "lucide-react";
import { ARCHITECTURE_LAYERS, CONTROL_CENTER_BACKLOG, type BacklogDomain, type BacklogItem, type BacklogPriority, type BacklogStatus } from "@/data/controlCenterBacklog";

const domainLabel: Record<BacklogDomain, string> = {
  feature: "Producto",
  technical: "Técnico",
  security: "Seguridad",
  ux: "UX/UI",
  integration: "Integración",
};

const priorityColor: Record<BacklogPriority, string> = {
  P0: "text-rose-300 border-rose-600/40 bg-rose-950/30",
  P1: "text-amber-300 border-amber-600/40 bg-amber-950/30",
  P2: "text-blue-300 border-blue-600/40 bg-blue-950/30",
  P3: "text-slate-300 border-slate-600/40 bg-slate-900/50",
};

const statusColor: Record<BacklogStatus, string> = {
  TODO: "bg-slate-700 text-slate-200",
  IN_PROGRESS: "bg-blue-700/60 text-blue-100",
  BLOCKED: "bg-rose-800/70 text-rose-100",
  DONE: "bg-emerald-700/60 text-emerald-100",
};

const statusIcon: Record<BacklogStatus, JSX.Element> = {
  TODO: <PauseCircle className="w-4 h-4" />,
  IN_PROGRESS: <Radar className="w-4 h-4" />,
  BLOCKED: <AlertTriangle className="w-4 h-4" />,
  DONE: <CheckCircle2 className="w-4 h-4" />,
};

const getCompletion = (items: BacklogItem[]) => {
  if (!items.length) return 0;
  const done = items.filter((item) => item.status === "DONE").length;
  return Math.round((done / items.length) * 100);
};

export default function ExecutionCenterBoard() {
  const [domain, setDomain] = useState<BacklogDomain | "ALL">("ALL");
  const [priority, setPriority] = useState<BacklogPriority | "ALL">("ALL");
  const [status, setStatus] = useState<BacklogStatus | "ALL">("ALL");

  const filtered = useMemo(
    () =>
      CONTROL_CENTER_BACKLOG.filter((item) => {
        if (domain !== "ALL" && item.domain !== domain) return false;
        if (priority !== "ALL" && item.priority !== priority) return false;
        if (status !== "ALL" && item.status !== status) return false;
        return true;
      }),
    [domain, priority, status],
  );

  const completion = getCompletion(CONTROL_CENTER_BACKLOG);
  const p0Queue = CONTROL_CENTER_BACKLOG.filter((item) => item.priority === "P0" && item.status !== "DONE");

  return (
    <section className="space-y-5">
      <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-100">Centro de Control EOCT · Plan de ejecución</h3>
            <p className="text-xs text-slate-400 mt-1">Roadmap unificado para cerrar brechas de producción y consolidar el nexus funcional.</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 uppercase tracking-widest">Completado</div>
            <div className="text-2xl font-black text-emerald-300">{completion}%</div>
          </div>
        </div>

        <div className="mt-3 h-2 rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400" style={{ width: `${completion}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-slate-700 bg-slate-900/50 p-4 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200"><Filter className="w-4 h-4" /> Filtros de backlog</div>

          <div className="grid md:grid-cols-3 gap-3 text-xs">
            <FilterSelect label="Dominio" value={domain} onChange={(v) => setDomain(v as typeof domain)} options={["ALL", "feature", "technical", "security", "ux", "integration"]} />
            <FilterSelect label="Prioridad" value={priority} onChange={(v) => setPriority(v as typeof priority)} options={["ALL", "P0", "P1", "P2", "P3"]} />
            <FilterSelect label="Estado" value={status} onChange={(v) => setStatus(v as typeof status)} options={["ALL", "TODO", "IN_PROGRESS", "BLOCKED", "DONE"]} />
          </div>

          <div className="max-h-[420px] overflow-auto space-y-3 pr-1">
            {filtered.map((item) => (
              <article key={item.id} className="rounded-lg border border-slate-700 bg-slate-950/60 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500">{item.id} · {domainLabel[item.domain]} · Owner {item.owner}</div>
                    <h4 className="text-sm font-semibold text-slate-100 mt-1">{item.title}</h4>
                  </div>
                  <div className="flex gap-2">
                    <span className={`text-[10px] px-2 py-1 rounded border ${priorityColor[item.priority]}`}>{item.priority}</span>
                    <span className={`text-[10px] px-2 py-1 rounded inline-flex items-center gap-1 ${statusColor[item.status]}`}>{statusIcon[item.status]} {item.status}</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-300">{item.description}</p>
                <ul className="mt-2 grid md:grid-cols-3 gap-2 text-[11px] text-slate-400">
                  {item.checkpoints.map((checkpoint) => (
                    <li key={checkpoint} className="rounded border border-slate-800 bg-slate-900/60 px-2 py-1">• {checkpoint}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-4">
            <h4 className="text-sm font-semibold text-slate-100 mb-3">Capas de arquitectura</h4>
            <div className="space-y-2">
              {ARCHITECTURE_LAYERS.map((layer) => (
                <div key={layer.id} className="rounded-lg border border-slate-800 bg-slate-950/60 p-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-slate-500">{layer.id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded ${layer.status === "SOLID" ? "bg-emerald-800/60 text-emerald-100" : layer.status === "PARTIAL" ? "bg-amber-800/60 text-amber-100" : "bg-rose-800/60 text-rose-100"}`}>{layer.status}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-1">{layer.title}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{layer.focus}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-4">
            <h4 className="text-sm font-semibold text-slate-100 mb-2 inline-flex items-center gap-2"><Layers className="w-4 h-4" /> Cola crítica P0</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {p0Queue.map((item) => (
                <li key={item.id} className="rounded border border-slate-800 bg-slate-950/60 px-2 py-1">
                  <span className="font-mono text-slate-500 mr-1">{item.id}</span>{item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterSelect<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (value: T) => void; options: T[] }) {
  return (
    <label className="space-y-1 block">
      <span className="text-slate-400">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="w-full rounded border border-slate-700 bg-slate-950/70 text-slate-200 px-2 py-1.5"
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
