import { useQuery } from "@tanstack/react-query";
import { fetchResearchDossier } from "@/lib/tamvApi";
import {
  Activity,
  ShieldCheck,
  AlertTriangle,
  Database,
  ArrowRight,
  Loader2,
} from "lucide-react";

const verificationStyle = {
  self_reported:
    "bg-amber-500/10 text-amber-300 border-amber-500/20",
  externally_visible:
    "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  not_verified:
    "bg-red-500/10 text-red-300 border-red-500/20",
} as const;

const verificationLabel = {
  self_reported: "Auto-reportado",
  externally_visible: "Visible externamente",
  not_verified: "No verificado",
} as const;

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_60px_rgba(59,130,246,0.05)] ${className}`}
    >
      {children}
    </div>
  );
}

export default function InvestigacionNodo001() {
  const dossierQuery = useQuery({
    queryKey: ["research-dossier", "nodo-001"],
    queryFn: fetchResearchDossier,
    staleTime: 5 * 60_000,
  });

  const dossier = dossierQuery.data;

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <section className="relative z-10 mx-auto max-w-7xl px-8 py-10 space-y-8">
        {/* HEADER */}
        <GlassCard className="p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-mono tracking-[0.35em] uppercase text-cyan-400">
                RESEARCH DOSSIER
              </p>

              <h1 className="text-4xl font-bold mt-3 bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                TAMV Online Network · Nodo 001
              </h1>

              <p className="text-slate-400 mt-4 max-w-3xl text-sm leading-relaxed">
                Evaluación estructural del ecosistema fundacional,
                consistencia documental, trazabilidad institucional
                y matriz de validación externa.
              </p>
            </div>

            <div className="flex flex-col gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                STATUS · LIVE
              </span>

              {dossierQuery.isFetching && (
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  SYNC
                </span>
              )}
            </div>
          </div>
        </GlassCard>

        {!dossier ? (
          <GlassCard className="p-6 border-red-500/20">
            <div className="flex items-center gap-3 text-red-300">
              <AlertTriangle className="w-5 h-5" />
              No fue posible cargar el informe desde backend.
            </div>
          </GlassCard>
        ) : (
          <>
            {/* SUMMARY METRICS */}
            <section className="grid md:grid-cols-4 gap-5">
              {[
                {
                  icon: Database,
                  label: "Claims",
                  value: dossier.claims.length,
                },
                {
                  icon: ShieldCheck,
                  label: "Checks pendientes",
                  value: dossier.pendingChecks.length,
                },
                {
                  icon: Activity,
                  label: "Recomendaciones",
                  value: dossier.recommendations.length,
                },
                {
                  icon: AlertTriangle,
                  label: "Riesgos",
                  value: dossier.claims.filter(
                    c => c.verification === "not_verified"
                  ).length,
                },
              ].map((m) => (
                <GlassCard
                  key={m.label}
                  className="p-5 hover:border-cyan-400/20 transition-all"
                >
                  <m.icon className="w-5 h-5 text-cyan-400 mb-3" />
                  <div className="text-2xl font-bold">{m.value}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                    {m.label}
                  </div>
                </GlassCard>
              ))}
            </section>

            {/* EXEC SUMMARY */}
            <GlassCard className="p-7">
              <h2 className="text-xl font-semibold text-cyan-300 mb-4">
                Resumen Ejecutivo
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {dossier.executiveSummary}
              </p>
            </GlassCard>

            {/* CLAIM MATRIX */}
            <GlassCard className="overflow-hidden">
              <div className="px-7 py-5 border-b border-white/5">
                <h2 className="text-lg font-semibold">
                  Matriz de Evidencia
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/[0.02] text-slate-400">
                    <tr>
                      <th className="px-6 py-4 text-left">Claim</th>
                      <th className="px-6 py-4 text-left">Fuente</th>
                      <th className="px-6 py-4 text-left">Estado</th>
                      <th className="px-6 py-4 text-left">Notas</th>
                    </tr>
                  </thead>

                  <tbody>
                    {dossier.claims.map((claim) => (
                      <tr
                        key={claim.claim}
                        className="border-t border-white/5 hover:bg-white/[0.015] transition"
                      >
                        <td className="px-6 py-5">{claim.claim}</td>

                        <td className="px-6 py-5 text-slate-400 font-mono text-xs">
                          {claim.source}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`px-3 py-1 rounded-full border text-xs font-medium ${verificationStyle[claim.verification]}`}
                          >
                            {verificationLabel[claim.verification]}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-slate-400">
                          {claim.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>

            {/* ACTION PANELS */}
            <section className="grid lg:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-cyan-300 mb-4">
                  Verificaciones pendientes
                </h3>

                <div className="space-y-3">
                  {dossier.pendingChecks.map((item) => (
                    <div
                      key={item.task}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]"
                    >
                      <ArrowRight className="w-4 h-4 mt-0.5 text-cyan-400" />
                      <div>
                        <span className="text-xs font-mono text-slate-500 uppercase">
                          {item.priority}
                        </span>
                        <p className="text-sm">{item.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-cyan-300 mb-4">
                  Recomendaciones operativas
                </h3>

                <div className="space-y-3">
                  {dossier.recommendations.map((rec) => (
                    <div
                      key={rec}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-slate-300"
                    >
                      {rec}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
