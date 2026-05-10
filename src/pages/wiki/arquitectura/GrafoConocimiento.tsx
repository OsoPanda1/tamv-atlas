import {
  WikiH1,
  WikiH2,
  WikiP,
  WikiBreadcrumb,
  WikiCard,
} from "@/components/WikiComponents";

import { motion } from "framer-motion";
import {
  Orbit,
  Network,
  Cpu,
  Globe2,
  BookOpen,
  BrainCircuit,
} from "lucide-react";

const nodes = [
  {
    name: "Edwin O. Castillo Trejo",
    type: "Fundador",
    meta: "ORCID · Núcleo Identitario",
    icon: Orbit,
    x: "18%",
    y: "38%",
  },
  {
    name: "TAMV Online Network",
    type: "Organización",
    meta: "Centro Federativo",
    icon: Network,
    x: "50%",
    y: "28%",
  },
  {
    name: "MD-X4",
    type: "Kernel",
    meta: "Arquitectura Heptafederada",
    icon: Cpu,
    x: "72%",
    y: "40%",
  },
  {
    name: "Isabella IA",
    type: "Inteligencia",
    meta: "Cognición Ética",
    icon: BrainCircuit,
    x: "35%",
    y: "68%",
  },
  {
    name: "UTAMV",
    type: "Academia",
    meta: "Nodo DOI",
    icon: BookOpen,
    x: "60%",
    y: "72%",
  },
  {
    name: "RDM-TOS",
    type: "Territorio",
    meta: "Gemelo Digital",
    icon: Globe2,
    x: "82%",
    y: "62%",
  },
];

function KnowledgeNode({ node, delay }) {
  const Icon = node.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{
        scale: 1.12,
        boxShadow: "0 0 60px rgba(34,211,238,0.35)",
      }}
      className="absolute"
      style={{ left: node.x, top: node.y }}
    >
      <div className="group relative flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/10 backdrop-blur-xl">
          <Icon className="h-7 w-7 text-cyan-300" />
        </div>

        <div className="mt-3 rounded-2xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl text-center">
          <div className="text-sm font-semibold text-white">
            {node.name}
          </div>
          <div className="text-xs text-cyan-300">
            {node.type}
          </div>
          <div className="text-[11px] text-slate-400">
            {node.meta}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function GrafoConocimiento() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Fondo cósmico */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <WikiBreadcrumb
        section="arquitectura"
        page="grafo-conocimiento"
      />

      <section className="relative z-10 px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <WikiH1>
            Núcleo Ontológico TAMV
          </WikiH1>

          <WikiP>
            Una constelación semántica viva donde cada
            identidad, publicación, territorio y módulo
            computacional se entrelaza como parte de una
            inteligencia distribuida.
          </WikiP>
        </motion.div>

        {/* Grafo inmersivo */}
        <div className="relative mt-20 h-[720px] rounded-[40px] border border-cyan-500/20 bg-slate-950/70 backdrop-blur-2xl shadow-[0_0_120px_rgba(6,182,212,0.08)] overflow-hidden">
          {/* líneas orbitales */}
          <svg className="absolute inset-0 h-full w-full opacity-30">
            <line
              x1="18%"
              y1="38%"
              x2="50%"
              y2="28%"
              stroke="rgba(34,211,238,0.35)"
            />
            <line
              x1="50%"
              y1="28%"
              x2="72%"
              y2="40%"
              stroke="rgba(34,211,238,0.35)"
            />
            <line
              x1="50%"
              y1="28%"
              x2="35%"
              y2="68%"
              stroke="rgba(34,211,238,0.35)"
            />
            <line
              x1="35%"
              y1="68%"
              x2="60%"
              y2="72%"
              stroke="rgba(34,211,238,0.35)"
            />
            <line
              x1="60%"
              y1="72%"
              x2="82%"
              y2="62%"
              stroke="rgba(34,211,238,0.35)"
            />
          </svg>

          {nodes.map((node, i) => (
            <KnowledgeNode
              key={node.name}
              node={node}
              delay={i * 0.12}
            />
          ))}

          {/* núcleo central */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-300/40 backdrop-blur-2xl"
          >
            <div className="text-center">
              <div className="text-xl font-bold text-cyan-200">
                TAMV
              </div>
              <div className="text-xs text-slate-300">
                Knowledge Core
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <WikiCard title="Identificadores Globales" accent="cyan">
            ORCID, DOI, ISNI y ROR funcionan como anclas
            criptográficas que proyectan el conocimiento TAMV
            hacia infraestructuras científicas internacionales.
          </WikiCard>

          <WikiCard title="Open Science Mesh" accent="purple">
            La integración con OpenAIRE inserta el ecosistema
            dentro del tejido europeo de ciencia abierta,
            habilitando descubribilidad federada.
          </WikiCard>
        </div>

        <div className="mt-20">
          <WikiH2>Topología de Conocimiento</WikiH2>

          <WikiP>
            No es una base de datos enlazada. Es una memoria
            cognitiva distribuida donde cada nodo hereda,
            proyecta y resignifica contexto.
          </WikiP>
        </div>
      </section>
    </div>
  );
}
