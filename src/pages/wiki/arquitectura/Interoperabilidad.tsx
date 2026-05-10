import {
  WikiH1,
  WikiH2,
  WikiP,
  WikiBreadcrumb,
  WikiCard,
} from "@/components/WikiComponents";

import { motion } from "framer-motion";
import {
  Database,
  Globe,
  Github,
  Layers3,
  Map,
  Network,
  ShieldCheck,
} from "lucide-react";

const integrations = [
  {
    name: "Odoo",
    type: "ERP / CMS",
    purpose: "Gestión institucional",
    icon: Layers3,
    x: "18%",
    y: "40%",
  },
  {
    name: "GitHub",
    type: "Código",
    purpose: "Repositorios federados",
    icon: Github,
    x: "32%",
    y: "18%",
  },
  {
    name: "Zenodo",
    type: "Archivo académico",
    purpose: "Persistencia DOI",
    icon: Database,
    x: "68%",
    y: "18%",
  },
  {
    name: "ORCID",
    type: "Identidad",
    purpose: "Vinculación investigativa",
    icon: ShieldCheck,
    x: "82%",
    y: "40%",
  },
  {
    name: "Supabase",
    type: "Backend",
    purpose: "Orquestación operativa",
    icon: Network,
    x: "68%",
    y: "70%",
  },
  {
    name: "Mapbox",
    type: "Geo",
    purpose: "Territorio computable",
    icon: Map,
    x: "32%",
    y: "70%",
  },
];

function Node({ item, delay }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{
        scale: 1.08,
        boxShadow: "0 0 80px rgba(34,211,238,0.25)",
      }}
      className="absolute"
      style={{ left: item.x, top: item.y }}
    >
      <div className="flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 backdrop-blur-xl">
          <Icon className="h-7 w-7 text-cyan-300" />
        </div>

        <div className="mt-3 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-xl text-center">
          <div className="text-sm font-semibold text-white">
            {item.name}
          </div>
          <div className="text-xs text-cyan-300">
            {item.type}
          </div>
          <div className="text-[11px] text-slate-400">
            {item.purpose}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Interoperabilidad() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Fondo neural */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <WikiBreadcrumb
        section="arquitectura"
        page="interoperabilidad"
      />

      <section className="relative z-10 px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <WikiH1>
            Matriz de Interoperabilidad
          </WikiH1>

          <WikiP>
            Una red soberana de intercambio semántico
            diseñada para integrar plataformas externas
            sin comprometer autonomía estructural.
          </WikiP>
        </motion.div>

        {/* Núcleo visual */}
        <div className="relative mt-20 h-[760px] rounded-[40px] border border-cyan-500/20 bg-slate-950/70 backdrop-blur-2xl overflow-hidden shadow-[0_0_120px_rgba(34,211,238,0.08)]">
          {/* conexiones */}
          <svg className="absolute inset-0 h-full w-full opacity-30">
            {integrations.map((item, i) => (
              <line
                key={i}
                x1="50%"
                y1="50%"
                x2={item.x}
                y2={item.y}
                stroke="rgba(34,211,238,0.35)"
              />
            ))}
          </svg>

          {/* núcleo TAMV */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-500/10 backdrop-blur-2xl"
          >
            <div className="text-center">
              <Globe className="mx-auto mb-3 h-10 w-10 text-cyan-200" />
              <div className="text-xl font-bold text-cyan-200">
                TAMV
              </div>
              <div className="text-xs text-slate-300">
                Federation Core
              </div>
            </div>
          </motion.div>

          {integrations.map((item, i) => (
            <Node
              key={item.name}
              item={item}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* Conceptos */}
        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <WikiCard title="Protocolos Federativos" accent="cyan">
            Cada nodo territorial o institucional puede
            operar de manera autónoma mientras mantiene
            consistencia semántica mediante APIs,
            sincronización transaccional y eventos
            distribuidos.
          </WikiCard>

          <WikiCard title="Principio de Soberanía" accent="green">
            La interoperabilidad no implica dependencia.
            Cada integración se articula mediante
            contratos abiertos que preservan trazabilidad,
            autonomía y contexto estructural.
          </WikiCard>
        </div>

        <div className="mt-20">
          <WikiH2>Topología de Flujo</WikiH2>

          <WikiP>
            El ecosistema se comporta como una malla de
            intercambio verificable donde identidad,
            datos, conocimiento y operaciones se
            sincronizan sin pérdida semántica.
          </WikiP>
        </div>
      </section>
    </div>
  );
}
