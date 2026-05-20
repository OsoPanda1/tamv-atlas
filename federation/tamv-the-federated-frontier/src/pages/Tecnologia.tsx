import { motion } from "framer-motion";
import { Database, Network, Cpu, Lock, Layers, Workflow, MapPin } from "lucide-react";
import { lazy, Suspense } from "react";

const Scene3D = lazy(() => import("@/components/Scene3D"));

const stack = [
  { icon: Network, title: "Arquitectura Heptafederada", desc: "7 Federaciones (Identidad, Consciencia, DreamSpaces, Economía, Defensa, Gobernanza, Infraestructura) en niveles L0-L3." },
  { icon: Cpu, title: "IA Cognitiva 4D", desc: "Isabella AI opera como Agente Constitucional Cognitivo con Protocolo de Autonomía Temporal (PAT)." },
  { icon: Database, title: "MSR Blockchain", desc: "Registro técnico distribuido — libro estructural inmutable con Reparación sin Amnesia y BookPI™." },
  { icon: Lock, title: "Seguridad Post-Cuántica", desc: "Kyber/Dilithium, QuantumPods™ inmutables, 13 capas Dekateotl, registros WORM." },
  { icon: Layers, title: "Capas XR Nativas", desc: "WebXR, WebGL y frameworks 3D/4D integrados como primera capa, DreamSpaces inmersivos." },
  { icon: Workflow, title: "CITEMESH Framework", desc: "Motor de inteligencia sistémica con malla adaptativa de soluciones sistémicas." },
];

const specs = [
  { label: "Protocolo de Red", value: "Federado P2P con nodos interoperables" },
  { label: "Motor IA", value: "Isabella AI — Agente Constitucional Cognitivo" },
  { label: "Inmersión", value: "WebXR / WebGL / 3D / 4D nativo" },
  { label: "Economía", value: "PLJ FairSplit 75/25 + créditos internos y comprobantes digitales" },
  { label: "Seguridad", value: "Post-cuántica + 13 capas Dekateotl" },
  { label: "Gobernanza", value: "Comité técnico + consejo auditable" },
  { label: "Backend", value: "Monorepo Rust + Go + QuantumPods™" },
  { label: "Escalabilidad", value: "Breakeven: 1,300 usuarios activos" },
  { label: "Frameworks", value: "EU AI Act, GDPR, NIST, ISO 27001, UNESCO" },
];

export default function Tecnologia() {
  return (
    <div>
      <section className="min-h-[60vh] flex items-center gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-display text-xs tracking-[0.4em] text-accent text-glow-lime mb-3">ARQUITECTURA TÉCNICA</p>
            <h1 className="font-display text-4xl md:text-6xl font-black text-foreground mb-4">
              <span className="text-primary text-glow-blue">Tecnología</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-2xl">
              Arquitectura antifrágil heptafederada con seguridad post-cuántica y IA cognitiva constitucional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stack */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stack.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-premium rounded-lg p-8"
              >
                <s.icon className="text-primary mb-4" size={28} />
                <h3 className="font-display text-base font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-center text-foreground mb-12">
            Especificaciones <span className="text-secondary text-glow-silver">Técnicas</span>
          </h2>
          <div className="space-y-3">
            {specs.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex justify-between items-center py-3 border-b border-border/50"
              >
                <span className="font-display text-xs tracking-wider text-muted-foreground">{s.label}</span>
                <span className="font-body text-sm text-primary text-right">{s.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/30 bg-destructive/5">
              <MapPin size={14} className="text-destructive" />
              <span className="font-display text-xs tracking-[0.2em] text-destructive">ORGULLOSAMENTE REALMONTENSES</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
