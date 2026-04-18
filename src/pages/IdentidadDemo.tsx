import { useState } from "react";
import { signCitizenCredential, verifyCitizenCredential } from "@/lib/tamvApi";

export default function IdentidadDemo() {
  const [citizenId, setCitizenId] = useState("did:tamv:rdm:7f:001");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const runFlow = async () => {
    setLoading(true);
    setResult("");
    try {
      const signed = await signCitizenCredential(citizenId);
      const verification = await verifyCitizenCredential(signed.payload, signed.signature);
      setResult(
        JSON.stringify(
          {
            citizenId,
            signatureAlgorithm: signed.profile?.activeAlgorithm,
            verification,
          },
          null,
          2,
        ),
      );
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-8">
      <section className="mx-auto max-w-3xl rounded-xl border border-border bg-card/60 p-6 space-y-4">
        <header>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Demo identidad soberana</p>
          <h1 className="text-2xl font-semibold">Flujo E2E: ISNI/DID + credencial UTAMV</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Este flujo consume el backend real para firmar y verificar una credencial de ciudadano.
          </p>
        </header>

        <label className="block text-sm">
          DID del ciudadano
          <input
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={citizenId}
            onChange={(event) => setCitizenId(event.target.value)}
          />
        </label>

        <button
          onClick={runFlow}
          disabled={loading}
          className="rounded-md border border-primary/40 bg-primary/10 px-4 py-2 text-sm text-primary hover:bg-primary/20 disabled:opacity-50"
        >
          {loading ? "Ejecutando…" : "Ejecutar flujo"}
        </button>

        <pre className="rounded-md border border-border bg-background p-4 text-xs overflow-auto min-h-36">{result || "Sin ejecución"}</pre>
      </section>
    </main>
  );
}
