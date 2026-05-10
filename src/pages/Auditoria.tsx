import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAuditMetrics } from "@/lib/tamvApi";
import { Link } from "react-router-dom";
import ExecutionCenterBoard from "@/components/control/ExecutionCenterBoard";
import IntegrationsPanel from "@/components/atlas/IntegrationsPanel";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* ─────────────────────────────────────────────
   INFORME DE AUDITORÍA MÁXIMA TAMV ATLAS v1.0
   Dashboard interactivo con porcentajes reales
   ──────────────────────────────────────────── */

interface FederationAudit {
  id: string;
  name: string;
  color: string;
  nodes: number;
  conceptual: number;
  wiring: number;
  production: number;
  description: string;
}

const DEFAULT_FEDERATIONS_AUDIT: FederationAudit[] = [
  { id: "FED-01", name: "ISNI / Identidad Soberana", color: "hsl(199, 89%, 48%)", nodes: 128, conceptual: 90, wiring: 45, production: 60, description: "PIDs · DIDs · ORCID · Zenodo" },
  { id: "FED-02", name: "MD-X Kernel Operativo", color: "hsl(270, 70%, 60%)", nodes: 256, conceptual: 85, wiring: 40, production: 55, description: "MD-X4/X5 · Deca-V · QC-TAMV-01" },
  { id: "FED-03", name: "Isabella Villaseñor AI", color: "hsl(142, 71%, 45%)", nodes: 64, conceptual: 80, wiring: 35, production: 50, description: "Pipeline hexagonal · 10 capas · SHAME" },
  { id: "FED-04", name: "UTAMV Academia", color: "hsl(45, 93%, 58%)", nodes: 192, conceptual: 85, wiring: 40, production: 55, description: "VC · OpenAIRE · Campus digital" },
  { id: "FED-05", name: "RDM Territorial", color: "hsl(330, 81%, 70%)", nodes: 320, conceptual: 90, wiring: 45, production: 60, description: "Pueblos digitales · XR/4D · Smart" },
  { id: "FED-06", name: "BookPI / Ética", color: "hsl(24, 95%, 60%)", nodes: 80, conceptual: 75, wiring: 30, production: 45, description: "Ledger evidencia · UNESCO · UNDRIP" },
  { id: "FED-07", name: "Integración Global", color: "hsl(174, 72%, 50%)", nodes: 224, conceptual: 80, wiring: 35, production: 50, description: "Odoo · GitHub · OpenAIRE · AVIXA" },
];

const DEFAULT_PRODUCTION_AXES = [
  { axis: "Frontend Atlas", actual: 60, objetivo: 90 },
  { axis: "Integración Backend", actual: 25, objetivo: 80 },
  { axis: "Infra Endurecida", actual: 30, objetivo: 85 },
  { axis: "Documentación", actual: 55, objetivo: 90 },
  { axis: "Testing/QA", actual: 30, objetivo: 85 },
  { axis: "Marketing Digital", actual: 20, objetivo: 75 },
  { axis: "Seguridad/RLS", actual: 40, objetivo: 95 },
  { axis: "Observabilidad", actual: 35, objetivo: 85 },
];

const DEFAULT_LEGAL_FRAMEWORKS = [
  { id: "UNESCO-AI", name: "UNESCO AI Ethics", coverage: 65, status: "in_progress", desc: "Principios, EIA, RAM aplicados al pipeline Isabella" },
  { id: "GDPR", name: "GDPR / RGPD", coverage: 70, status: "in_progress", desc: "PrOnto/GConsent · bases legales · DPIA" },
  { id: "ICCPR", name: "ICCPR · Derechos Lingüísticos", coverage: 80, status: "active", desc: "Español como lengua canónica · Art. 2, 26, 27" },
  { id: "UNDRIP", name: "UNDRIP · Pueblos Originarios", coverage: 55, status: "in_progress", desc: "Indigenous Data Sovereignty · consentimiento previo" },
  { id: "ISO-27001", name: "ISO/IEC 27001", coverage: 45, status: "planned", desc: "SGSI · DEKATEOTL 11 capas · auditoría TEE" },
  { id: "FAIR", name: "FAIR Data Principles", coverage: 75, status: "active", desc: "Findable · Accessible · Interoperable · Reusable" },
];

const DEFAULT_ROADMAP_PHASES = [
  { fase: "Q2 2026", actual: 35, target: 55, milestone: "Wiki canónica + Atlas 3D + buscador" },
  { fase: "Q3 2026", actual: 0, target: 70, milestone: "Backend FastAPI + JWT + RLS multi-rol" },
  { fase: "Q4 2026", actual: 0, target: 85, milestone: "K8s producción + CI/CD Deca-V + observabilidad" },
  { fase: "Q1 2027", actual: 0, target: 95, milestone: "Federación 177 repos + UNESCO compliance certificado" },
];

const DEFAULT_RISK_MATRIX = [
  { id: "R-01", risk: "Ausencia wiring backend real", impact: "ALTO", probability: "ALTA", mitigation: "FastAPI + Supabase Edge Functions OLA-A" },
  { id: "R-02", risk: "Falta CI/CD Deca-V activo", impact: "ALTO", probability: "MEDIA", mitigation: "GitHub Actions con npm run audit:deca-v" },
  { id: "R-03", risk: "Sin RLS en tablas sensibles", impact: "CRÍTICO", probability: "BAJA", mitigation: "Habilitar RLS + has_role() security definer" },
  { id: "R-04", risk: "Sesgo lingüístico en IA", impact: "MEDIO", probability: "MEDIA", mitigation: "Auditoría UNESCO + tests multilingües" },
  { id: "R-05", risk: "Performance Three.js en mobile", impact: "MEDIO", probability: "ALTA", mitigation: "LOD adaptativo + react-three/drei optimizations" },
  { id: "R-06", risk: "Falta consentimiento UNDRIP", impact: "ALTO", probability: "MEDIA", mitigation: "Protocolo de consulta previa territorial RDM" },
];

type Tab = "control" | "executive" | "federations" | "production" | "legal" | "roadmap" | "risks";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "control", label: "Control EOCT", icon: "🧠" },
  { id: "executive", label: "Resumen Ejecutivo", icon: "📊" },
  { id: "federations", label: "Federaciones", icon: "🌐" },
  { id: "production", label: "Producción", icon: "⚙️" },
  { id: "legal", label: "Blindaje Legal", icon: "⚖️" },
  { id: "roadmap", label: "Roadmap", icon: "🗺️" },
  { id: "risks", label: "Riesgos", icon: "🛡️" },
];

const StatCard = ({ label, value, sub, accent = "primary" }: { label: string; value: string; sub: string; accent?: "primary" | "accent" | "destructive" | "muted" }) => {
  const accentMap = {
    primary: "border-primary/30 text-primary",
    accent: "border-accent/30 text-accent",
    destructive: "border-destructive/30 text-destructive",
    muted: "border-border text-muted-foreground",
  };
  return (
    <div className={`rounded-lg border ${accentMap[accent]} bg-card/50 p-4 backdrop-blur`}>
      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${accentMap[accent].split(" ")[1]}`}>{value}</p>
      <p className="text-[11px] text-muted-foreground mt-1">{sub}</p>
    </div>
  );
};

const ProgressBar = ({ value, color = "hsl(var(--primary))" }: { value: number; color?: string }) => (
  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
    <div
      className="h-full rounded-full transition-all duration-700"
      style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}, ${color}aa)`, boxShadow: `0 0 10px ${color}88` }}
    />
  </div>
);

export default function Auditoria() {
  const [activeTab, setActiveTab] = useState<Tab>("control");
  const [selectedFed, setSelectedFed] = useState<string | null>(null);

  const auditQuery = useQuery({
    queryKey: ["audit-metrics"],
    queryFn: fetchAuditMetrics,
    staleTime: 60_000,
    refetchInterval: 120_000,
  });

  const productionAxes = auditQuery.data?.productionAxes ?? DEFAULT_PRODUCTION_AXES;
  const federationsAudit =
    auditQuery.data?.federations?.map((f) => ({
      ...f,
      color: "hsl(var(--chart-1))",
      description: `Nodos activos: ${f.nodes}`,
    })) ?? DEFAULT_FEDERATIONS_AUDIT;
  const legalFrameworks = auditQuery.data?.legalFrameworks ?? DEFAULT_LEGAL_FRAMEWORKS;
  const roadmapPhases = auditQuery.data?.roadmapPhases ?? DEFAULT_ROADMAP_PHASES;
  const riskMatrix = auditQuery.data?.riskMatrix ?? DEFAULT_RISK_MATRIX;

  const globalAvg = useMemo(() => {
    const sum = productionAxes.reduce((acc, x) => acc + x.actual, 0);
    return Math.round(sum / productionAxes.length);
  }, [productionAxes]);

  const fedAvg = useMemo(() => {
    const sum = federationsAudit.reduce((acc, f) => acc + (f.conceptual + f.wiring + f.production) / 3, 0);
    return Math.round(sum / federationsAudit.length);
  }, [federationsAudit]);

  const totalNodes = federationsAudit.reduce((acc, f) => acc + f.nodes, 0);

  return (
    <div className="min-h-full bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/40 backdrop-blur sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-[11px] font-mono text-primary uppercase tracking-[0.25em]">ATLAS / AUDITORÍA MÁXIMA v1.0</p>
            <h1 className="text-2xl font-bold mt-1">Informe de Auditoría TAMV Atlas</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Evaluación 360° · Producción · Despliegue · Blindaje académico y jurídico internacional
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {auditQuery.isFetching ? (
              <span className="px-2 py-1 rounded-full bg-muted text-[10px] text-muted-foreground font-mono">SYNC BACKEND…</span>
            ) : null}
            <span className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[11px] font-mono">
              KERNEL · MD-X5 · ONLINE
            </span>
            <span className="px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-[11px] font-mono">
              QC-TAMV-01 · ACTIVE
            </span>
            <Link
              to="/"
              className="px-3 py-1.5 rounded-full bg-secondary border border-border text-xs hover:bg-secondary/80 transition"
            >
              ← Atlas Home
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <nav className="px-6 flex gap-1 overflow-x-auto border-t border-border/50">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-mono whitespace-nowrap border-b-2 transition ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="mr-1.5">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {activeTab === "control" && (
          <section className="animate-in fade-in duration-500 space-y-6">
            <IntegrationsPanel />
            <ExecutionCenterBoard />
          </section>
        )}

        {/* ─── EXECUTIVE ─── */}
        {activeTab === "executive" && (
          <section className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Avance Global Producción" value={`${globalAvg}%`} sub="Frente a estándar 100%" accent="primary" />
              <StatCard label="Madurez Federaciones" value={`${fedAvg}%`} sub="Promedio 7 federaciones" accent="accent" />
              <StatCard label="Nodos Federados" value={`${totalNodes}`} sub="48 hubs · 1264 nodos totales" accent="primary" />
              <StatCard label="Repos Inventariados" value="177" sub="OLA A/B/C migration plan" accent="muted" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-xl border border-border bg-card/50 p-5">
                <h3 className="text-sm font-semibold text-foreground mb-1">Avance por Eje de Producción</h3>
                <p className="text-[11px] text-muted-foreground mb-4 font-mono">ACTUAL vs OBJETIVO 2027</p>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={productionAxes}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="axis" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} />
                    <Radar name="Actual" dataKey="actual" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
                    <Radar name="Objetivo" dataKey="objetivo" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.15} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 11 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-xl border border-border bg-card/50 p-5">
                <h3 className="text-sm font-semibold mb-1">Madurez por Federación</h3>
                <p className="text-[11px] text-muted-foreground mb-4 font-mono">CONCEPTUAL · WIRING · PRODUCCIÓN</p>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={federationsAudit}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="id" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 11 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="conceptual" fill="hsl(var(--primary))" name="Conceptual" />
                    <Bar dataKey="wiring" fill="hsl(var(--accent))" name="Wiring" />
                    <Bar dataKey="production" fill="hsl(142, 71%, 45%)" name="Producción" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-5">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">⚡</span> Conclusión Ejecutiva
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                TAMV Atlas presenta una <strong className="text-foreground">madurez conceptual del 65–70%</strong> (federaciones,
                módulo Ω, sistema civilizatorio, ontologías UNESCO/GDPR) muy por encima de la media del sector. Sin embargo, el
                <strong className="text-accent"> avance hacia producción endurecida es del 35%</strong>: brechas críticas en wiring
                de backends reales, infraestructura K8s/Terraform, observabilidad y marketing digital operativo. La hoja de ruta
                Q2 2026 → Q1 2027 lleva el sistema a un <strong className="text-primary">95% de readiness con compliance UNESCO/GDPR/ICCPR/UNDRIP</strong> certificado.
              </p>
            </div>
          </section>
        )}

        {/* ─── FEDERATIONS ─── */}
        {activeTab === "federations" && (
          <section className="space-y-4 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {federationsAudit.map((fed) => {
                const avg = Math.round((fed.conceptual + fed.wiring + fed.production) / 3);
                const active = selectedFed === fed.id;
                return (
                  <button
                    key={fed.id}
                    onClick={() => setSelectedFed(active ? null : fed.id)}
                    className={`text-left rounded-xl border bg-card/50 p-4 transition ${
                      active ? "border-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-muted-foreground">{fed.id}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono" style={{ background: `${fed.color}22`, color: fed.color }}>
                        {fed.nodes} nodos
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold mb-1">{fed.name}</h4>
                    <p className="text-[11px] text-muted-foreground mb-3">{fed.description}</p>

                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-[10px] font-mono mb-1">
                          <span className="text-muted-foreground">CONCEPTUAL</span>
                          <span style={{ color: fed.color }}>{fed.conceptual}%</span>
                        </div>
                        <ProgressBar value={fed.conceptual} color={fed.color} />
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] font-mono mb-1">
                          <span className="text-muted-foreground">WIRING</span>
                          <span style={{ color: fed.color }}>{fed.wiring}%</span>
                        </div>
                        <ProgressBar value={fed.wiring} color={fed.color} />
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] font-mono mb-1">
                          <span className="text-muted-foreground">PRODUCCIÓN</span>
                          <span style={{ color: fed.color }}>{fed.production}%</span>
                        </div>
                        <ProgressBar value={fed.production} color={fed.color} />
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-border/50 flex justify-between items-center">
                      <span className="text-[10px] font-mono text-muted-foreground">PROMEDIO</span>
                      <span className="text-lg font-bold" style={{ color: fed.color }}>{avg}%</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* ─── PRODUCTION ─── */}
        {activeTab === "production" && (
          <section className="space-y-6 animate-in fade-in duration-500">
            <div className="rounded-xl border border-border bg-card/50 p-5">
              <h3 className="text-sm font-semibold mb-4">Brecha Actual vs Objetivo (8 ejes)</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={productionAxes} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                  <YAxis type="category" dataKey="axis" width={140} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 11 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="actual" fill="hsl(var(--primary))" name="Actual" />
                  <Bar dataKey="objetivo" fill="hsl(var(--accent))" name="Objetivo" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productionAxes.map((axis) => {
                const gap = axis.objetivo - axis.actual;
                return (
                  <div key={axis.axis} className="rounded-lg border border-border bg-card/40 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-semibold">{axis.axis}</h4>
                      <span className="text-[10px] font-mono text-muted-foreground">GAP {gap}%</span>
                    </div>
                    <ProgressBar value={axis.actual} />
                    <div className="flex justify-between text-[10px] font-mono mt-2">
                      <span className="text-primary">ACTUAL {axis.actual}%</span>
                      <span className="text-accent">OBJETIVO {axis.objetivo}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ─── LEGAL ─── */}
        {activeTab === "legal" && (
          <section className="space-y-6 animate-in fade-in duration-500">
            <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-5">
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">⚖️ Manifiesto de Lengua y Soberanía Cognitiva</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                TAMV Atlas se expresa primordialmente en <strong className="text-foreground">español</strong> como decisión
                arquitectónica de soberanía cultural y digital. Esta decisión se alinea con
                <strong className="text-primary"> ICCPR Art. 2, 26 y 27</strong> (no discriminación por idioma + derechos de
                minorías lingüísticas), <strong className="text-accent">UNESCO Recommendation on the Ethics of AI</strong>{" "}
                (transparencia y explicabilidad en lengua local) y <strong className="text-foreground">UNDRIP</strong> (derechos
                de pueblos originarios sobre representaciones culturales).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {legalFrameworks.map((fw) => (
                <div key={fw.id} className="rounded-xl border border-border bg-card/50 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-[10px] font-mono text-muted-foreground">{fw.id}</p>
                      <h4 className="text-sm font-semibold">{fw.name}</h4>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                      fw.status === "active" ? "bg-primary/15 text-primary border border-primary/30" :
                      fw.status === "in_progress" ? "bg-accent/15 text-accent border border-accent/30" :
                      "bg-muted text-muted-foreground border border-border"
                    }`}>
                      {fw.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{fw.desc}</p>
                  <ProgressBar value={fw.coverage} />
                  <p className="text-[11px] font-mono text-right mt-1 text-foreground">{fw.coverage}% coverage</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-card/50 p-5">
              <h3 className="text-sm font-semibold mb-3">Comparativa UNESCO Ethics vs GDPR en Ontologías Atlas</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground font-mono">
                      <th className="text-left py-2 px-2">DIMENSIÓN</th>
                      <th className="text-left py-2 px-2 text-primary">UNESCO AI ETHICS</th>
                      <th className="text-left py-2 px-2 text-accent">GDPR / RGPD</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-2">Naturaleza</td><td className="py-2 px-2">Soft law global</td><td className="py-2 px-2">Hard law UE vinculante</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-2">Ámbito</td><td className="py-2 px-2">Ciclo de vida IA completo</td><td className="py-2 px-2">Datos personales</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-2">Núcleo</td><td className="py-2 px-2">Principios + EIA + RAM</td><td className="py-2 px-2">Bases legales + derechos ARCO</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-2">Ontología tipo</td><td className="py-2 px-2">AIIA-Ontology</td><td className="py-2 px-2">PrOnto / GConsent</td></tr>
                    <tr><td className="py-2 px-2">Sanciones</td><td className="py-2 px-2">Indirectas (soft enforcement)</td><td className="py-2 px-2">Directas (multas hasta 4% facturación)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ─── ROADMAP ─── */}
        {activeTab === "roadmap" && (
          <section className="space-y-6 animate-in fade-in duration-500">
            <div className="rounded-xl border border-border bg-card/50 p-5">
              <h3 className="text-sm font-semibold mb-4">Roadmap a Producción Endurecida</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={roadmapPhases}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="fase" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 11 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="actual" fill="hsl(var(--primary))" name="Actual" />
                  <Bar dataKey="target" fill="hsl(var(--accent))" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {roadmapPhases.map((phase, idx) => (
                <div key={phase.fase} className="rounded-xl border border-border bg-card/50 p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-mono text-xs flex-shrink-0">
                    Q{idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-semibold">{phase.fase}</h4>
                      <span className="text-[11px] font-mono text-accent">→ {phase.target}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{phase.milestone}</p>
                    <ProgressBar value={phase.target} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── RISKS ─── */}
        {activeTab === "risks" && (
          <section className="space-y-4 animate-in fade-in duration-500">
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5">
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">🛡️ Matriz de Riesgos Activos</h3>
              <p className="text-xs text-muted-foreground">6 riesgos identificados · 1 crítico · 3 altos · 2 medios</p>
            </div>

            <div className="space-y-3">
              {riskMatrix.map((risk) => (
                <div key={risk.id} className="rounded-xl border border-border bg-card/50 p-4">
                  <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                    <div className="flex-1">
                      <p className="text-[10px] font-mono text-muted-foreground">{risk.id}</p>
                      <h4 className="text-sm font-semibold">{risk.risk}</h4>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-mono ${
                        risk.impact === "CRÍTICO" ? "bg-destructive/15 text-destructive border border-destructive/40" :
                        risk.impact === "ALTO" ? "bg-accent/15 text-accent border border-accent/40" :
                        "bg-muted text-muted-foreground border border-border"
                      }`}>
                        IMPACTO · {risk.impact}
                      </span>
                      <span className="px-2 py-1 rounded-full text-[10px] font-mono bg-secondary border border-border">
                        PROB · {risk.probability}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 pl-3 border-l-2 border-primary/40">
                    <p className="text-[11px] font-mono text-muted-foreground">MITIGACIÓN</p>
                    <p className="text-xs text-foreground">{risk.mitigation}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-6 border-t border-border text-center">
          <p className="text-[10px] font-mono text-muted-foreground">
            INFORME DE AUDITORÍA MÁXIMA TAMV ATLAS v1.0 · Abril 2026 · © Edwin O. Castillo Trejo · DOI: 10.5281/ZENODO.19564367
          </p>
        </footer>
      </div>
    </div>
  );
}
