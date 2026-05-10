import type { FC } from "react";
import type {
  ArticleSummary,
  ModuleMeta,
} from "@/components/atlas/types";
import { motion } from "framer-motion";

interface FlowLensProps {
  currentArticle: ArticleSummary | null;
  currentModule: ModuleMeta | null;
}

const STEPS = [
  "Ciudadano TAMV",
  "Perfil Base ISNI",
  "VC Académica",
  "ORCID · DOI",
  "BookPI Ético",
  "Kernel MD-X",
];

const hexStyle = {
  clipPath:
    "polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)",
};

export const FlowLens: FC<FlowLensProps> = ({
  currentArticle,
  currentModule,
}) => {
  const currentIndex = (() => {
    if (!currentArticle) return -1;

    const tags = currentArticle.tags.map((t) =>
      t.toLowerCase()
    );

    if (tags.some((t) => t.includes("intro"))) return 0;
    if (tags.some((t) => t.includes("isni"))) return 1;
    if (tags.some((t) => t.includes("utamv"))) return 2;
    if (tags.some((t) => t.includes("orcid"))) return 3;
    if (tags.some((t) => t.includes("bookpi"))) return 4;
    if (tags.some((t) => t.includes("kernel"))) return 5;

    return -1;
  })();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-950/90 p-6 backdrop-blur-2xl">
      {/* fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* encabezado */}
      <div className="relative z-10 flex justify-between items-start gap-6">
        <div>
          <h3 className="text-xs font-mono tracking-[0.25em] text-cyan-300 uppercase">
            Civilizational Flow Lens
          </h3>

          <p className="mt-2 text-xs text-slate-400 max-w-md">
            Trayectoria progresiva de consolidación
            identitaria, trazabilidad epistemológica
            y maduración federativa.
          </p>
        </div>

        {currentModule && (
          <div className="text-right font-mono text-xs">
            <div className="text-cyan-300">
              {currentModule.icon} {currentModule.title}
            </div>
            <div className="text-slate-500">
              LVL {currentModule.level} · MOD-
              {currentModule.id}
            </div>
          </div>
        )}
      </div>

      {/* línea de flujo */}
      <div className="relative mt-10">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        <div className="grid grid-cols-6 gap-4 relative z-10">
          {STEPS.map((step, idx) => {
            const active = idx === currentIndex;
            const passed = idx < currentIndex;

            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={
                    active
                      ? {
                          scale: [1, 1.06, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                  style={hexStyle}
                  className={`
                    relative h-20 w-full flex items-center justify-center
                    px-3 text-center text-[11px] font-mono border
                    transition-all duration-500
                    ${
                      active
                        ? "border-cyan-300 bg-cyan-500/20 text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,0.25)]"
                        : passed
                        ? "border-cyan-700 bg-cyan-950/40 text-cyan-300"
                        : "border-slate-700 bg-slate-900 text-slate-400"
                    }
                  `}
                >
                  {step}
                </motion.div>

                <span className="mt-3 text-[10px] text-slate-500 font-mono">
                  Φ-{idx + 1}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* artículo */}
      {currentArticle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
        >
          <div className="grid md:grid-cols-[1.6fr_0.8fr] gap-6">
            <div>
              <div className="text-[11px] font-mono text-slate-500">
                NODO ACTIVO
              </div>

              <h4 className="mt-2 text-lg font-semibold text-white">
                {currentArticle.title}
              </h4>

              <p className="mt-3 text-sm text-slate-400 line-clamp-3">
                {currentArticle.summary}
              </p>
            </div>

            <div className="font-mono text-xs text-slate-400">
              <div className="text-slate-500 mb-2">
                COORDENADAS
              </div>

              <div className="text-cyan-300 break-all">
                /mod/{currentArticle.moduleSlug}/
                {currentArticle.slug}
              </div>

              <div className="mt-4">
                PROFUNDIDAD ·{" "}
                <span className="text-white">
                  {currentArticle.depth}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};
