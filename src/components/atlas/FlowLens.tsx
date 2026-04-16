import type { FC } from "react";
import type { ArticleSummary, ModuleMeta } from "@/components/atlas/types";

interface FlowLensProps {
  currentArticle: ArticleSummary | null;
  currentModule: ModuleMeta | null;
}

const STEPS = [
  "Ciudadano TAMV",
  "Perfil base ISNI",
  "VC Académica UTAMV",
  "ORCID + DOI + Zenodo",
  "BookPI · Ética",
  "Kernel MD-X · Telemetría",
];

const hexStyle = { clipPath: "polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)" };

export const FlowLens: FC<FlowLensProps> = ({ currentArticle, currentModule }) => {
  const currentIndex = (() => {
    if (!currentArticle) return -1;
    const tags = currentArticle.tags.map((tag) => tag.toLowerCase());
    if (tags.some((tag) => tag.includes("intro"))) return 0;
    if (tags.some((tag) => tag.includes("isni") || tag.includes("identidad"))) return 1;
    if (tags.some((tag) => tag.includes("utamv") || tag.includes("vc"))) return 2;
    if (tags.some((tag) => tag.includes("orcid") || tag.includes("doi"))) return 3;
    if (tags.some((tag) => tag.includes("bookpi") || tag.includes("etica"))) return 4;
    if (tags.some((tag) => tag.includes("kernel") || tag.includes("telemetria"))) return 5;
    return -1;
  })();

  return (
    <div className="relative border border-slate-800/80 rounded-2xl bg-slate-950/80 p-4 overflow-hidden">
      <div className="relative flex items-center justify-between mb-3 gap-3">
        <div>
          <h3 className="text-xs font-mono text-slate-300 mb-1">FLUJO CIVILIZATORIO · IDENTIDAD COMPLETA</h3>
          <p className="text-[11px] text-slate-500 max-w-xs">Cada hexágono representa un salto en la consolidación de identidad soberana TAMV.</p>
        </div>
        {currentModule && (
          <div className="text-right text-[11px] font-mono text-slate-400">
            <div className="text-sky-300">{currentModule.icon} {currentModule.title}</div>
            <div className="text-slate-500">NIVEL {currentModule.level} · MOD-{currentModule.id}</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {STEPS.map((step, idx) => {
          const active = idx === currentIndex;
          return (
            <div key={step} className="flex flex-col items-center gap-1">
              <div
                style={hexStyle}
                className={`w-full h-14 px-2 flex items-center justify-center text-center text-[10px] font-mono border ${
                  active ? "border-cyan-400 bg-cyan-500/15 text-cyan-100" : "border-slate-700 bg-slate-900/90 text-slate-300"
                }`}
              >
                {step}
              </div>
            </div>
          );
        })}
      </div>

      {currentArticle && (
        <div className="mt-4 border-t border-slate-800 pt-3 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="text-[11px] font-mono text-slate-500 mb-1">ARTÍCULO ACTUAL</div>
            <div className="text-sm font-semibold text-slate-50 mb-1.5">{currentArticle.title}</div>
            <p className="text-[12px] text-slate-400 line-clamp-3">{currentArticle.summary}</p>
          </div>
          <div className="w-44 text-[11px] font-mono text-slate-400">
            <div className="mb-1 text-slate-500">COORDENADAS</div>
            <div className="text-sky-300">/modulo/{currentArticle.moduleSlug}/articulo/{currentArticle.slug}</div>
            <div className="mt-2 text-slate-500">PROFUNDIDAD: <span className="text-slate-200">{currentArticle.depth}</span></div>
          </div>
        </div>
      )}
    </div>
  );
};
