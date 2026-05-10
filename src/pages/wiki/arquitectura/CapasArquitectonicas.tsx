import {
  WikiH1,
  WikiH2,
  WikiP,
  WikiBreadcrumb,
  WikiCard,
  WikiCode,
} from "@/components/WikiComponents";

import { motion } from "framer-motion";
import {
  Database,
  Shield,
  Brain,
  Globe,
  Layers3,
  Cpu,
  Network,
  Eye,
} from "lucide-react";

const layers = [
  {
    icon: Database,
    title: "Persistencia",
    desc: "Almacenamiento distribuido y geoespacial",
    tech: "PostGIS · TimeSeries · Vault · RLS",
    color: "from-cyan-500/20 to-blue-500/10",
  },
  {
    icon: Layers3,
    title: "Semántica",
    desc: "Ontologías y significado computable",
    tech: "JSON-LD · Schema.org",
    color: "from-violet-500/20 to-purple-500/10",
  },
  {
    icon: Network,
    title: "Identidad",
    desc: "SSI y federación soberana",
    tech: "DIDs · VCs · ORCID · DOI",
    color: "from-emerald-500/20 to-green-500/10",
  },
  {
    icon: Shield,
    title: "Seguridad",
    desc: "Blindaje post-cuántico",
    tech: "PQC · Zero-Trust · Q-Cells",
    color: "from-orange-500/20 to-red-500/10",
  },
  {
    icon: Brain,
    title: "Inteligencia",
    desc: "Arquitectura cognitiva",
    tech: "Isabella IA · Doble Pipeline",
    color: "from-pink-500/20 to-fuchsia-500/10",
  },
  {
    icon: Globe,
    title: "Territorio",
    desc: "Malla edge y telemetría",
    tech: "IoT · Edge Nodes",
    color: "from-teal-500/20 to-cyan-500/10",
  },
  {
    icon: Eye,
    title: "Visualización",
    desc: "GeoXR inmersivo",
    tech: "Cesium · Mapbox · WebXR",
    color: "from-indigo-500/20 to-sky-500/10",
  },
  {
    icon: Cpu,
    title: "Gobernanza",
    desc: "Reglas ejecutables",
    tech: "Human-in-the-Loop",
    color: "from-yellow-500/20 to-amber-500/10",
  },
];

export default function CapasArquitectonicas() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.25),transparent_65%)]" />

      <WikiBreadcrumb
        section="arquitectura"
        page="capas-arquitectonicas"
      />

      <section className="relative z-10 px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <WikiH1>
            Arquitectura Heptafederada TAMV
          </WikiH1>

          <WikiP>
            Una topología cognitiva multicapa diseñada para
            resiliencia sistémica, interoperabilidad semántica y
            evolución antifrágil.
          </WikiP>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {layers.map((layer, i) => {
            const Icon = layer.icon;

            return (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{
                  scale: 1.03,
                  rotateX: 4,
                  rotateY: -4,
                }}
                className={`
                  rounded-3xl border border-white/10
                  bg-gradient-to-br ${layer.color}
                  backdrop-blur-xl
                  p-6 shadow-2xl
                `}
              >
                <Icon className="mb-4 h-8 w-8 text-cyan-300" />

                <h3 className="text-lg font-semibold">
                  {layer.title}
                </h3>

                <p className="mt-2 text-sm text-slate-300">
                  {layer.desc}
                </p>

                <div className="mt-4 rounded-xl bg-black/30 p-3 text-xs text-cyan-200">
                  {layer.tech}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <WikiCard title="Stack Operativo" accent="blue">
            <WikiCode>{`Frontend     → React + TypeScript + Tailwind
Backend      → Supabase Edge Runtime
GeoEngine    → Cesium + Mapbox
Identity     → DIDs + VCs + PID Graph
Security     → PQC + Zero-Trust
Intelligence → Isabella Protocol
Runtime      → Q-Cells Distributed Mesh`}</WikiCode>
          </WikiCard>

          <WikiCard title="Antifragilidad Sistémica" accent="orange">
            El sistema no busca únicamente resistir fallos:
            aprende de ellos. Las Q-Cells detectan fracturas
            lógicas, reorganizan dependencias y restauran
            consistencia federativa en tiempo real.
          </WikiCard>
        </div>

        <div className="mt-20">
          <WikiH2>Mapa de Flujo Arquitectónico</WikiH2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 rounded-3xl border border-cyan-500/20 bg-black/40 p-8 backdrop-blur-xl"
          >
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              {[
                "Territorio",
                "Persistencia",
                "Semántica",
                "Identidad",
                "Seguridad",
                "IA",
                "Visualización",
              ].map((node) => (
                <div
                  key={node}
                  className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-3"
                >
                  {node}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
