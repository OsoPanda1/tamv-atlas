import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export interface ConvergenceNode {
  id: string;
  label: string;
  wikiPath: string;
  dois: string[];
  datasets: string[];
}

interface IdentityCard {
  label: string;
  value: string;
  href: string;
  verified: boolean;
}

const ORCID_CACHE_KEY = "tamv.orcid.identity.cache.v1";

const SOURCE_NODES: ConvergenceNode[] = [
  { id: "fed-01", label: "ISNI", wikiPath: "/wiki/identidad/orcid-doi-isni", dois: ["10.5281/zenodo.19436662"], datasets: ["Zenodo:19436662"] },
  { id: "fed-02", label: "MD-X", wikiPath: "/wiki/arquitectura/capas-arquitectonicas", dois: ["10.5281/zenodo.19562517"], datasets: ["Kernel Logs v1"] },
  { id: "fed-03", label: "Isabella", wikiPath: "/wiki/metaverso-xr/isabella-ai", dois: [], datasets: ["Ethics Signals"] },
  { id: "fed-04", label: "UTAMV", wikiPath: "/wiki/casos-uso/roadmap-adopcion", dois: ["10.5281/zenodo.19411506"], datasets: ["UTAMV Curricula"] },
  { id: "fed-05", label: "DreamSpaces", wikiPath: "/wiki/metaverso-xr/dreamspaces-xr", dois: [], datasets: ["XR Scene Events"] },
  { id: "fed-06", label: "BookPI", wikiPath: "/wiki/gobernanza/gobernanza-datos", dois: [], datasets: ["Narrative Ledger"] },
  { id: "fed-07", label: "Global", wikiPath: "/wiki/arquitectura/interoperabilidad", dois: ["10.5281/zenodo.19562517"], datasets: ["ORCID Index", "GitHub Repos"] },
];

export default function ConvergenceHub() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "doi" | "dataset">("all");

  const visible = useMemo(() => SOURCE_NODES.filter((n) => {
    const q = query.toLowerCase();
    const found = !q || n.label.toLowerCase().includes(q) || n.dois.some((d) => d.includes(q)) || n.datasets.some((d) => d.toLowerCase().includes(q));
    if (!found) return false;
    if (filter === "doi") return n.dois.length > 0;
    if (filter === "dataset") return n.datasets.length > 0;
    return true;
  }), [filter, query]);

  const identityCards: IdentityCard[] = useMemo(() => {
    const cached = localStorage.getItem(ORCID_CACHE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached) as IdentityCard[];
      } catch {
        localStorage.removeItem(ORCID_CACHE_KEY);
      }
    }
    const cards: IdentityCard[] = [
      { label: "ORCID", value: "0009-0008-5050-1539", href: "https://orcid.org/0009-0008-5050-1539", verified: true },
      { label: "ISNI", value: "TAMV-ONLINE-0001", href: "https://isni.org", verified: true },
      { label: "Bio", value: "Titular ORCID 0009-0008-5050-1539 · Perfil de identidad soberana", href: "/wiki/modulo-cero/biografia-ceo", verified: true },
      { label: "Works", value: "Resumen de trabajos indexados ORCID/OpenAIRE", href: "/wiki/modelado-identidades/integracion-pids", verified: true },
    ];
    localStorage.setItem(ORCID_CACHE_KEY, JSON.stringify(cards));
    return cards;
  }, []);

  return (
    <section className="border border-cyan-500/20 rounded-lg bg-slate-900/40 p-3 space-y-3">
      <header className="flex flex-wrap gap-2 items-center justify-between">
        <h3 className="text-[10px] uppercase tracking-wider text-cyan-300">Convergence Hub · Hex Graph</h3>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar nodo / DOI / dataset" className="bg-black/40 border border-slate-700 rounded px-2 py-1 text-[11px]" />
      </header>
      <div className="flex gap-2 text-[10px]">
        {(["all", "doi", "dataset"] as const).map((f) => <button key={f} onClick={() => setFilter(f)} className={`px-2 py-1 rounded border ${filter === f ? "border-cyan-400 text-cyan-300" : "border-slate-700 text-slate-400"}`}>{f.toUpperCase()}</button>)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {visible.map((node) => (
          <Link key={node.id} to={node.wikiPath} className="p-2 border border-slate-700 rounded-md hover:border-cyan-400">
            <p className="text-[11px] text-slate-100">⬢ {node.label}</p>
            <p className="text-[9px] text-slate-400">DOI: {node.dois.length} · Datasets: {node.datasets.length}</p>
          </Link>
        ))}
      </div>
      <div className="border-t border-slate-700 pt-2">
        <h4 className="text-[10px] text-emerald-300 uppercase">Panel ORCID / ISNI</h4>
        <div className="grid md:grid-cols-2 gap-2 mt-2">
          {identityCards.map((card) => (
            <a key={card.label} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="p-2 rounded border border-slate-700 hover:border-emerald-400 block">
              <p className="text-[10px] text-slate-300">{card.label} {card.verified ? "✓" : ""}</p>
              <p className="text-[10px] text-slate-400">{card.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
