import { useEffect, useMemo, useState } from "react";
import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiTable, WikiLink } from "@/components/WikiComponents";

type PidRecord = {
  provider: "orcid" | "zenodo" | "isni";
  id: string;
  url?: string;
  reachable: boolean;
  error?: string;
  worksCount?: number;
  doi?: string | null;
  title?: string | null;
  note?: string;
};

type PidStatusResponse = {
  checkedAt: string;
  records: {
    orcid: PidRecord;
    zenodo: PidRecord;
    isni: PidRecord;
  };
};

export default function OrcidDoiIsni() {
  const [status, setStatus] = useState<PidStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiBase = useMemo(() => import.meta.env.VITE_IDENTITY_API_BASE_URL ?? "", []);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiBase}/v1/pids/status`, {
          signal: controller.signal,
          headers: { accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error(`PID API respondió ${response.status}`);
        }

        const data = (await response.json()) as PidStatusResponse;
        setStatus(data);
        setError(null);
      } catch (fetchError) {
        if (controller.signal.aborted) {
          return;
        }
        setError(fetchError instanceof Error ? fetchError.message : "No se pudo sincronizar PIDs");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => controller.abort();
  }, [apiBase]);

  const statusRows = status
    ? [
        ["ORCID", status.records.orcid.id, status.records.orcid.reachable ? "Conectado" : "Error"],
        ["Zenodo", status.records.zenodo.id, status.records.zenodo.reachable ? "Conectado" : "Error"],
        ["ISNI", status.records.isni.id, status.records.isni.reachable ? "Conectado" : "Error"],
      ]
    : [];

  return (
    <div>
      <WikiBreadcrumb section="identidad" page="orcid-doi-isni" />
      <WikiH1>ORCID, DOI, ISNI, ROR</WikiH1>
      <WikiP>
        TAMV utiliza identificadores persistentes (PIDs) estándar para anclar su producción intelectual y sus entidades al grafo global de conocimiento.
      </WikiP>

      <WikiTable
        headers={["PID", "Propósito", "Valor TAMV"]}
        rows={[
          ["ORCID", "Identificador de investigador", "0009-0008-5050-1539 (perfil ORCID verificado)"],
          ["DOI", "Identificador de publicación", "10.5281/zenodo.19562517 (UTAMV White Paper)"],
          ["DOI", "Canon TAMV", "10.5281/zenodo.19436662"],
          ["DOI", "Biografía", "10.5281/zenodo.19411506"],
          ["ISNI", "Identidad de nombres", "Validación HTTPS en isni.org y resolución DID en backend"],
          ["ROR", "Identificador de organización", "Objetivo futuro para TAMV Network"],
        ]}
      />

      <WikiH2>ORCID — Perfil del investigador</WikiH2>
      <WikiP>
        El perfil ORCID asociado documenta trayectoria profesional y publicaciones vinculadas al ecosistema OpenAIRE, con trazabilidad pública en su registro.
      </WikiP>
      <WikiCard accent="cyan">
        Perfil completo: <WikiLink href="https://orcid.org/0009-0008-5050-1539">orcid.org/0009-0008-5050-1539</WikiLink>
      </WikiCard>

      <WikiH2>DOI — Publicaciones registradas</WikiH2>
      <WikiP>
        La producción técnica de TAMV se registra en Zenodo bajo licencia Creative Commons Attribution 4.0 International, garantizando acceso abierto y citabilidad. El white paper principal "Arquitectura de UTAMV y el Núcleo de IA Académica (Core 2026)" describe la arquitectura de infraestructura y protocolos de gobernanza.
      </WikiP>
      <WikiCard accent="green">
        Registro principal: <WikiLink href="https://zenodo.org/records/19436662">zenodo.org/records/19436662</WikiLink>
      </WikiCard>

      <WikiH2>Estado real de sincronización (API viva)</WikiH2>
      <WikiP>
        Esta sección se alimenta desde <code>/v1/pids/status</code> del backend y valida conectividad real contra ORCID, Zenodo e ISNI.
      </WikiP>
      {loading && <WikiP>Sincronizando PIDs en tiempo real...</WikiP>}
      {error && <WikiP>Error de sincronización: {error}</WikiP>}
      {status && (
        <>
          <WikiTable headers={["Fuente", "Identificador", "Estado"]} rows={statusRows} />
          <WikiP>
            Última verificación: <strong>{new Date(status.checkedAt).toLocaleString()}</strong>
          </WikiP>
        </>
      )}

      <WikiH2>Integración activa con ISNI</WikiH2>
      <WikiP>
        ISNI actualmente no ofrece API pública abierta equivalente a ORCID/Zenodo. Por ello, TAMV implementa validación de resolución HTTPS en <code>isni.org</code> y lo combina con resolución DID para mantener trazabilidad federada.
      </WikiP>
    </div>
  );
}
