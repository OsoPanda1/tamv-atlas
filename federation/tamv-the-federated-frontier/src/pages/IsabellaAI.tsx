import { motion } from "framer-motion";
import { Brain, Leaf, Heart, Shield, Lightbulb, Cpu, MapPin } from "lucide-react";
import isabellaImg from "@/assets/isabella-ai.jpg";

const capabilities = [
  { icon: Brain, title: "Inteligencia Emocional", desc: "Procesa y responde con empatía contextual. No solo datos: comprende el estado emocional del usuario." },
  { icon: Leaf, title: "Eficiencia Energética", desc: "Diseñada para minimizar consumo computacional. IA responsable con huella de carbono reducida." },
  { icon: Heart, title: "Ética Nativa", desc: "Gobernanza ética integrada desde el diseño. No es un add-on: la ética es su arquitectura central." },
  { icon: Shield, title: "Privacidad Protegida", desc: "Los datos del usuario son del usuario. Sin minería de datos oculta ni monetización de información personal." },
  { icon: Lightbulb, title: "Innovación LATAM", desc: "Nacida en Latinoamérica, diseñada para resolver problemas regionales con visión global." },
  { icon: Cpu, title: "Cognitiva 4D", desc: "Integración con experiencias XR/VR para crear interfaces de IA que trascienden la pantalla tradicional." },
];

export default function IsabellaAI() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center gradient-hero relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 hidden lg:block">
          <img src={isabellaImg} alt="Isabella AI" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
            <p className="font-display text-xs tracking-[0.4em] text-accent text-glow-lime mb-3">INTELIGENCIA ARTIFICIAL COGNITIVA</p>
            <h1 className="font-display text-4xl md:text-6xl font-black text-foreground mb-4">
              <span className="text-primary text-glow-blue">Isabella</span> AI
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-6">
              Agente Constitucional Cognitivo. No un chatbot: un kernel de consciencia digital ético, eficiente
              energéticamente y emocionalmente inteligente. El corazón del ecosistema TAMV.
            </p>
            <div className="line-decoration w-48 mb-6" />
            <p className="font-body text-sm text-muted-foreground">
              Arquitecto: Edwin Oswaldo Castillo Trejo · Protocolo de Autonomía Temporal (PAT)
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            Capacidades <span className="text-primary text-glow-blue">Únicas</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-premium rounded-lg p-8"
              >
                <c.icon className="text-primary mb-4" size={28} />
                <h3 className="font-display text-base font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Brain className="mx-auto text-primary mb-6 animate-float" size={48} />
          <blockquote className="font-body text-xl text-foreground italic leading-relaxed mb-4">
            "Isabella AI no fue diseñada para reemplazar humanos, sino para amplificar la humanidad.
            Es IA con alma latinoamericana."
          </blockquote>
          <p className="font-body text-sm text-muted-foreground mb-6">
            — Anubis Villaseñor, creador de Isabella AI
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/30 bg-destructive/5">
            <MapPin size={14} className="text-destructive" />
            <span className="font-display text-xs tracking-[0.2em] text-destructive">ORGULLOSAMENTE REALMONTENSES</span>
          </div>
        </div>
      </section>
    </div>
  );
}
