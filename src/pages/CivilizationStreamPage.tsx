import { Link } from "react-router-dom";
import { CivilizationStream } from "@/components/atlas/CivilizationStream";
import { wikiStructure } from "@/data/wikiStructure";
import type { ArticleSummary, Depth, ModuleMeta } from "@/components/atlas/types";

const modulePalette = ["#60a5fa", "#a78bfa", "#34d399", "#fbbf24", "#f472b6", "#2dd4bf"];

const modules: ModuleMeta[] = wikiStructure.map((section, moduleIndex) => ({
  id: moduleIndex,
  slug: section.id,
  title: section.title,
  level: moduleIndex,
  icon: section.icon,
  color: modulePalette[moduleIndex % modulePalette.length],
  articleCount: section.children.length,
}));

const mapDepth = (moduleId: number): Depth => {
  if (moduleId <= 2) return "intro";
  if (moduleId <= 8) return "tecnico";
  return "constitucional";
};

const articles: ArticleSummary[] = wikiStructure.flatMap((section, moduleIndex) =>
  section.children.map((page, pageIndex) => ({
    id: moduleIndex * 100 + pageIndex,
    slug: page.slug,
    title: page.title,
    summary: `Contenido del ${section.title} para navegación avanzada, flujo civilizatorio y lectura por rol.`,
    tags: [section.id.replace(/-/g, " "), moduleIndex >= 4 ? "ssi" : "isni", moduleIndex >= 10 ? "gobernanza" : "arquitectura"],
    moduleId: moduleIndex,
    moduleSlug: section.id,
    moduleTitle: section.title,
    isCritical: pageIndex === 0 || section.id === "ssi-did" || section.id === "gobernanza",
    readTimeMinutes: 4 + (pageIndex % 5),
    roleWeight: {
      ciudadano: moduleIndex < 3 ? 3 : 1,
      dev: moduleIndex >= 8 ? 4 : 2,
      empresario: moduleIndex === 7 || moduleIndex === 12 ? 4 : 1,
      academia: moduleIndex === 1 || moduleIndex === 11 ? 4 : 2,
      gobierno: moduleIndex >= 9 ? 4 : 1,
    },
    depth: mapDepth(moduleIndex),
  }))
);

export default function CivilizationStreamPage() {
  return (
    <div className="px-4 py-6 md:px-8 lg:px-10 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-mono text-cyan-400">ATLAS / CIVILIZATION STREAM</p>
          <h1 className="text-2xl font-semibold text-slate-100">Paginación avanzada y Flow Lens</h1>
        </div>
        <Link to="/resumen" className="text-xs border border-slate-700 px-3 py-1.5 rounded text-slate-300 hover:border-cyan-400 hover:text-cyan-200 transition-colors">
          Volver a Resumen
        </Link>
      </div>

      <CivilizationStream modules={modules} articles={articles} />
    </div>
  );
}
