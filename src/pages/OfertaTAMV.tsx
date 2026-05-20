import { useMemo, useState } from "react";
import { TAMV_OFFER_CATALOG, type OfferProfile } from "@/data/tamvOfferCatalog";
import { Input } from "@/components/ui/input";

const profileLabels: Record<OfferProfile | "all", string> = {
  all: "Todos",
  usuarios: "Usuarios",
  creadores: "Creadores",
  inversionistas: "Inversionistas",
  desarrolladores: "Desarrolladores",
  empresas: "Empresas",
  gobiernos: "Gobiernos",
};

const OfertaTAMV = () => {
  const [profile, setProfile] = useState<OfferProfile | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TAMV_OFFER_CATALOG.filter((item) => {
      const profileMatch = profile === "all" || item.profile === profile;
      const queryMatch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return profileMatch && queryMatch;
    });
  }, [profile, query]);

  return (
    <section className="px-6 py-8 space-y-6">
      <header className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-3">
        <p className="text-xs font-mono uppercase tracking-[0.18em] text-cyan-300">TAMV · Oferta funcional</p>
        <h1 className="text-2xl font-semibold text-slate-100">Catálogo por tipo de usuario</h1>
        <p className="text-sm text-slate-400">Explora módulos, funciones, programas, herramientas y beneficios de TAMV por perfil.</p>
      </header>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por palabra clave..."
            aria-label="Buscar ofertas"
            className="bg-slate-950/70 border-slate-700"
          />
          <div className="flex flex-wrap gap-2">
            {(Object.keys(profileLabels) as Array<OfferProfile | "all">).map((option) => (
              <button
                key={option}
                onClick={() => setProfile(option)}
                className={`px-3 py-1.5 rounded border text-xs ${
                  profile === option
                    ? "border-cyan-400 bg-cyan-500/10 text-cyan-300"
                    : "border-slate-700 text-slate-300 hover:border-cyan-600"
                }`}
              >
                {profileLabels[option]}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400">Resultados: {filtered.length}</p>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <article key={`${item.profile}-${item.category}-${item.title}`} className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] uppercase tracking-wider text-cyan-300">{profileLabels[item.profile]}</span>
                <span className="text-[10px] uppercase text-slate-400">{item.category}</span>
              </div>
              <h2 className="mt-2 text-sm font-semibold text-slate-100">{item.title}</h2>
              <p className="mt-1 text-xs text-slate-400">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfertaTAMV;
