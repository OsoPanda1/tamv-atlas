import { useMemo, useState, type FC } from "react";
import { ArchitectureMiniMap } from "@/components/atlas/ArchitectureMiniMap";
import { FlowLens } from "@/components/atlas/FlowLens";
import type { ArticleSummary, Depth, ModuleMeta, Role } from "@/components/atlas/types";

interface CivilizationStreamProps {
  modules: ModuleMeta[];
  articles: ArticleSummary[];
  pageSize?: number;
}

const ROLES: Role[] = ["ciudadano", "dev", "empresario", "academia", "gobierno"];
const DEPTHS: Depth[] = ["intro", "tecnico", "constitucional"];

export const CivilizationStream: FC<CivilizationStreamProps> = ({ modules, articles, pageSize = 7 }) => {
  const [selectedModule, setSelectedModule] = useState<number | "all">("all");
  const [role, setRole] = useState<Role>("ciudadano");
  const [depth, setDepth] = useState<Depth>("intro");
  const [page, setPage] = useState(0);
  const [hoveredArticle, setHoveredArticle] = useState<ArticleSummary | null>(null);

  const filteredArticles = useMemo(() => {
    let current = [...articles];

    if (selectedModule !== "all") current = current.filter((article) => article.moduleId === selectedModule);

    current = current.filter((article) => {
      if (depth === "intro") return true;
      if (depth === "tecnico") return article.depth !== "intro";
      return article.depth === "constitucional";
    });

    current.sort((a, b) => {
      const aWeight = a.roleWeight?.[role] ?? 0;
      const bWeight = b.roleWeight?.[role] ?? 0;
      if (aWeight !== bWeight) return bWeight - aWeight;
      if (a.isCritical !== b.isCritical) return a.isCritical ? -1 : 1;
      return a.title.localeCompare(b.title);
    });

    return current;
  }, [articles, depth, role, selectedModule]);

  const pageCount = Math.max(1, Math.ceil(filteredArticles.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const pageArticles = filteredArticles.slice(currentPage * pageSize, currentPage * pageSize + pageSize);

  const currentModule = selectedModule === "all" ? null : modules.find((module) => module.id === selectedModule) ?? null;

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-6rem)] text-slate-100 bg-gradient-to-br from-slate-950 via-slate-900 to-black border border-slate-800 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(56,189,248,0.2)]">
      <div className="col-span-7 flex flex-col border-r border-slate-800/70">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/60">
          <span className="text-xs font-mono text-cyan-400/80">CIVILIZATION_STREAM v1.0</span>
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">kernel: MD-X4/X5 · UP</span>
            <span className="px-2 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/30">artículos: {filteredArticles.length}</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/70 bg-slate-950/70 gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono">ROL</span>
            {ROLES.map((item) => (
              <button key={item} onClick={() => setRole(item)} className={`px-2.5 py-1 rounded-full border text-[11px] font-mono transition ${role === item ? "border-cyan-400 bg-cyan-500/10 text-cyan-200" : "border-slate-700 hover:border-slate-500 text-slate-400"}`}>
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono">PROFUNDIDAD</span>
            {DEPTHS.map((item) => (
              <button key={item} onClick={() => setDepth(item)} className={`px-2.5 py-1 rounded-full border text-[11px] font-mono transition ${depth === item ? "border-violet-400 bg-violet-500/10 text-violet-100" : "border-slate-700 hover:border-slate-500 text-slate-400"}`}>
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {pageArticles.map((article) => (
            <button
              key={article.id}
              onMouseEnter={() => setHoveredArticle(article)}
              onMouseLeave={() => setHoveredArticle(null)}
              className="w-full text-left rounded-xl border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/80 transition p-3.5"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-sky-400/90">{article.moduleTitle.toUpperCase()}</span>
                  <span className="text-[11px] font-mono text-slate-500">/articulo/{article.slug}</span>
                </div>
                {article.isCritical && <span className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-rose-400/60 text-rose-200 bg-rose-500/10">CRITICAL SPEC</span>}
              </div>
              <h3 className="text-sm font-semibold text-slate-50 mb-1.5">{article.title}</h3>
              <p className="text-[12px] text-slate-400 line-clamp-2 mb-2.5">{article.summary}</p>
              <div className="flex flex-wrap gap-1.5">
                {article.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-900 border border-slate-700 text-slate-300">{tag.toUpperCase()}</span>
                ))}
              </div>
            </button>
          ))}
        </div>

        <div className="border-t border-slate-800 bg-slate-950/80 px-4 py-3 flex flex-col gap-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>PÁGINA {currentPage + 1} / {pageCount}</span>
            <div className="flex gap-1.5">
              <button disabled={currentPage === 0} onClick={() => setPage((prev) => Math.max(0, prev - 1))} className="px-2 py-1 rounded border border-slate-700 text-slate-300 disabled:opacity-30">◀</button>
              <button disabled={currentPage >= pageCount - 1} onClick={() => setPage((prev) => Math.min(pageCount - 1, prev + 1))} className="px-2 py-1 rounded border border-slate-700 text-slate-300 disabled:opacity-30">▶</button>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button onClick={() => { setSelectedModule("all"); setPage(0); }} className={`px-3 py-1.5 rounded-full border text-[11px] font-mono whitespace-nowrap transition ${selectedModule === "all" ? "border-cyan-400 bg-cyan-500/10 text-cyan-100" : "border-slate-700 text-slate-400"}`}>
              TODOS · {articles.length}
            </button>
            {modules.map((module) => (
              <button key={module.id} onClick={() => { setSelectedModule(module.id); setPage(0); }} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-mono whitespace-nowrap transition ${selectedModule === module.id ? "border-sky-400 bg-sky-500/10 text-sky-100" : "border-slate-700 text-slate-400"}`}>
                <span>{module.icon}</span>
                <span>{module.title}</span>
                <span className="text-slate-500 text-[10px]">· {module.articleCount}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-5 flex flex-col p-4 gap-4 bg-slate-950/40">
        <FlowLens currentArticle={hoveredArticle} currentModule={currentModule} />
        <ArchitectureMiniMap />
      </div>
    </div>
  );
};
