import { useQuery } from "@tanstack/react-query";
import { fetchResearchDossier } from "@/lib/tamvApi";

const verificationLabel = {
  self_reported: "Auto-reportado",
  externally_visible: "Visible externamente",
  not_verified: "No verificado",
} as const;

export default function InvestigacionNodo001() {
  const dossierQuery = useQuery({
    queryKey: ["research-dossier", "nodo-001"],
    queryFn: fetchResearchDossier,
    staleTime: 5 * 60_000,
  });

  const dossier = dossierQuery.data;

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-8">
      <section className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-xl border border-border bg-card/60 p-6">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Informe de investigación</p>
          <h1 className="text-2xl font-semibold mt-1">TAMV Online Network y Nodo 001 (Génesis)</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Integración técnica del informe con matriz de evidencia, brechas de verificación y checklist operativo.
          </p>
          {dossierQuery.isFetching ? (
            <span className="inline-block mt-3 text-[11px] px-2 py-1 rounded bg-muted text-muted-foreground font-mono">SINCRONIZANDO BACKEND…</span>
          ) : null}
        </header>

        {!dossier ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            No fue posible cargar el informe desde backend.
          </div>
        ) : (
          <>
            <section className="rounded-xl border border-border bg-card/50 p-5">
              <h2 className="text-lg font-semibold">Resumen ejecutivo</h2>
              <p className="text-sm text-muted-foreground mt-2">{dossier.executiveSummary}</p>
            </section>

            <section className="rounded-xl border border-border bg-card/50 p-5 overflow-x-auto">
              <h2 className="text-lg font-semibold mb-3">Comparativa: reclamos vs evidencia</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="py-2 pr-3">Reclamo</th>
                    <th className="py-2 pr-3">Fuente</th>
                    <th className="py-2 pr-3">Verificación</th>
                    <th className="py-2">Notas</th>
                  </tr>
                </thead>
                <tbody>
                  {dossier.claims.map((claim) => (
                    <tr key={claim.claim} className="border-b border-border/60 align-top">
                      <td className="py-2 pr-3">{claim.claim}</td>
                      <td className="py-2 pr-3 text-muted-foreground">{claim.source}</td>
                      <td className="py-2 pr-3">
                        <span className="px-2 py-1 rounded text-xs border border-border bg-muted/60">
                          {verificationLabel[claim.verification]}
                        </span>
                      </td>
                      <td className="py-2 text-muted-foreground">{claim.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="grid lg:grid-cols-2 gap-4">
              <article className="rounded-xl border border-border bg-card/50 p-5">
                <h3 className="text-base font-semibold">Checklist de verificaciones pendientes</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {dossier.pendingChecks.map((item) => (
                    <li key={item.task} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>
                        <strong className="uppercase text-xs text-muted-foreground mr-2">{item.priority}</strong>
                        {item.task}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-xl border border-border bg-card/50 p-5">
                <h3 className="text-base font-semibold">Recomendaciones</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {dossier.recommendations.map((rec) => (
                    <li key={rec} className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">→</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
