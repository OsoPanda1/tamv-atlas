import { Link } from "react-router-dom";
import { ChevronRight, FolderTree, Layers, Network } from "lucide-react";
import { WIKI_SECTIONS } from "@/data/wikiSchema";

export default function WikiHome() {
  const sectionsWithChildren = WIKI_SECTIONS.filter((section) => section.children?.length).length;

  return (
    <div className="min-h-full bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        <header className="rounded-2xl border border-slate-800 bg-gradient-to-br from-blue-950/50 to-slate-900 p-6 md:p-8">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-blue-300">TAMV Wiki Engine</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">Wiki TAMV Atlas · Estructura Generativa</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Mapa maestro dinámico para producir páginas reales desde el blueprint civilizatorio:
            capítulos, módulos, federaciones, roles, blindaje legal y roadmap.
          </p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
              <div className="flex items-center gap-2 text-xs text-slate-400"><FolderTree className="w-4 h-4" /> Secciones</div>
              <div className="text-xl font-semibold mt-1">{WIKI_SECTIONS.length}</div>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
              <div className="flex items-center gap-2 text-xs text-slate-400"><Layers className="w-4 h-4" /> Secciones con subpáginas</div>
              <div className="text-xl font-semibold mt-1">{sectionsWithChildren}</div>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
              <div className="flex items-center gap-2 text-xs text-slate-400"><Network className="w-4 h-4" /> Federaciones conectadas</div>
              <div className="text-xl font-semibold mt-1">7</div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {WIKI_SECTIONS.map((section) => (
            <Link
              key={section.id}
              to={`/wiki/${section.id}`}
              className="group rounded-xl border border-slate-800 bg-slate-900/70 p-4 hover:border-blue-500/60 hover:bg-slate-900 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-100 group-hover:text-blue-300 transition-colors">
                    {section.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">{section.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-300 mt-1" />
              </div>

              <div className="mt-3 text-xs text-slate-500">
                {section.children?.length
                  ? `Incluye ${section.children.length} subpáginas auto-generables.`
                  : "Sección principal lista para volcado documental."}
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
