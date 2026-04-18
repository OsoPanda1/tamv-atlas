import { CivilizationStream } from "@/components/atlas/CivilizationStream";
import type { ArticleSummary, Depth, ModuleMeta } from "@/components/atlas/types";
import { wikiStructure } from "@/data/wikiStructure";

const moduleGradients = [
  "from-cyan-400 to-sky-500",
  "from-emerald-400 to-cyan-500",
  "from-sky-400 to-indigo-500",
  "from-indigo-400 to-violet-500",
  "from-violet-400 to-fuchsia-500",
  "from-amber-400 to-orange-500",
];

const mapDepth = (moduleId: number): Depth => {
  if (moduleId <= 2) return "intro";
  if (moduleId <= 8) return "tecnico";
  return "constitucional";
};

const mapRoleWeight = (moduleId: number) => ({
  ciudadano: moduleId <= 2 ? 0.9 : 0.5,
  dev: moduleId >= 2 && moduleId <= 9 ? 1 : 0.6,
  academia: moduleId === 1 || moduleId === 11 ? 1 : 0.7,
  gobierno: moduleId >= 9 ? 0.95 : 0.65,
  empresario: moduleId === 7 || moduleId === 12 ? 0.95 : 0.6,
});

const modules: ModuleMeta[] = wikiStructure.map((section, moduleIndex) => ({
  id: moduleIndex,
  slug: section.id,
  title: section.title,
  level: moduleIndex,
  icon: section.icon,
  color: moduleGradients[moduleIndex % moduleGradients.length],
  articleCount: section.children.length,
}));

const articles: ArticleSummary[] = wikiStructure.flatMap((section, moduleIndex) =>
  section.children.map((page, pageIndex) => ({
    id: moduleIndex * 100 + pageIndex,
    slug: page.slug,
    title: page.title,
    summary: `Síntesis de ${page.title} dentro de ${section.title}, orientada a lectura guiada por rol, profundidad y flujo civilizatorio TAMV.`,
    tags: [
      section.id.replace(/-/g, " "),
      moduleIndex <= 1 ? "isni" : "tamv",
      moduleIndex >= 9 ? "gobernanza" : "arquitectura",
      page.slug,
    ],
    moduleId: moduleIndex,
    moduleSlug: section.id,
    moduleTitle: section.title,
    isCritical: pageIndex === 0 || moduleIndex === 0 || moduleIndex === 2 || moduleIndex >= 10,
    readTimeMinutes: 6 + (pageIndex % 6),
    roleWeight: mapRoleWeight(moduleIndex),
    depth: mapDepth(moduleIndex),
  }))
);

export default function WikiHome() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <p className="text-[11px] font-mono text-cyan-400">TAMV·ONLINE // DIGITAL CIVILIZATION SYSTEM V1.0</p>
            <h1 className="text-xl font-semibold tracking-tight text-slate-50">KERNEL: MD-X · ISNI · UTAMV · ISABELLA</h1>
            <p className="text-[12px] text-slate-400 max-w-xl">
              Consola central del Atlas TAMV · Grafo civilizatorio, flujos de identidad y estado operativo del ecosistema.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              <span className="text-emerald-300">ISNI PIPELINE · ACTIVE</span>
            </div>
            <div className="flex items-center gap-2 text-sky-300">
              <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
              <span>MD-X5 KERNEL · ONLINE</span>
            </div>
            <div className="flex items-center gap-2 text-violet-300">
              <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(129,140,248,0.9)]" />
              <span>ISABELLA CORE · AWARE</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <p className="text-[11px] font-mono text-slate-400">7 FEDERACIONES · 48 NODOS · 195 REPOS INDEXADOS</p>
            <p className="text-[11px] font-mono text-slate-500">
              Vista Civilization Stream: lectura guiada por rol, profundidad y flujo civilizatorio.
            </p>
          </div>
          <div className="flex gap-2 text-[11px] font-mono">
            <span className="px-2 py-1 rounded-full border border-slate-700 bg-slate-900/80 text-slate-300">P95 &lt; 4s (target)</span>
            <span className="px-2 py-1 rounded-full border border-slate-700 bg-slate-900/80 text-slate-300">QC-TAMV-01 · ACTIVE</span>
          </div>
        </div>

        <CivilizationStream modules={modules} articles={articles} />
      </section>

      <footer className="border-t border-slate-800/60 bg-slate-950/95">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-4 flex-wrap text-[11px] text-slate-500 font-mono">
          <span>© TAMV ONLINE · Edwin O. Castillo Trejo (Anubis Villaseñor) · Real del Monte, Hidalgo, MX</span>
          <div className="flex gap-2">
            <a href="https://orcid.org/0009-0008-5050-1539" target="_blank" rel="noreferrer" className="hover:text-cyan-300">
              ORCID
            </a>
            <a href="https://zenodo.org/records/19562517" target="_blank" rel="noreferrer" className="hover:text-cyan-300">
              Zenodo DOI
            </a>
            <a href="https://github.com/OsoPanda1" target="_blank" rel="noreferrer" className="hover:text-cyan-300">
              GitHub
            </a>
            <a href="https://tamvonline-oficial.odoo.com/" target="_blank" rel="noreferrer" className="hover:text-cyan-300">
              Odoo Portal
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
