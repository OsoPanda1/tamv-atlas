import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Users, Zap, Award, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const tracks = [
  {
    title: "Arquitectura Interoperable",
    desc: "Diseño de kernels federados, MD-X4, Zero-Trust y observabilidad estructural.",
    icon: Zap,
    hours: "320h",
  },
  {
    title: "IA Ética & Cognitiva",
    desc: "Federated Learning, dialéctica hegeliana aplicada, gobernanza ISO 42001 y EU AI Act.",
    icon: BookOpen,
    hours: "280h",
  },
  {
    title: "XR / VR / 3D / 4D",
    desc: "WebXR, gemelos territoriales, ética inmersiva y ritualidad de onboarding sensorial.",
    icon: Users,
    hours: "240h",
  },
  {
    title: "Economía Programable",
    desc: "Identidad interoperable, credenciales verificables, economía interna gamificada y ARPU sostenible.",
    icon: Award,
    hours: "200h",
  },
];

const UTAMV = () => {
  return (
    <div className="min-h-screen pt-12 pb-24">
      {/* Hero */}
      <section className="container mx-auto px-4 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="font-display text-xs tracking-[0.4em] text-accent text-glow-lime mb-4">
            UNIVERSIDAD ALTERNATIVA · CAMPUS ONLINE
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-black mb-4">
            <span className="metallic-text">U</span>
            <span className="text-primary text-glow-blue">TAMV</span>
          </h1>
          <p className="font-body text-lg text-secondary mb-2">
            Educación profunda, honesta y sostenible — sin intereses corporativos.
          </p>
          <div className="line-decoration w-32 mx-auto mb-6" />
          <p className="font-body text-sm text-muted-foreground max-w-2xl mx-auto">
            UTAMV nace de una constatación incómoda: la mayoría de los caminos para aprender tecnología
            "en serio" son caros, superficiales o condicionados por intereses corporativos. Es la
            respuesta estructural de TAMV: un campus online interoperable para la nueva era digital de LATAM.
          </p>
        </motion.div>

        {/* Manifiesto pedagógico */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="card-premium rounded-lg p-8 md:p-12 mb-16">
          <GraduationCap className="text-accent mb-4" size={36} />
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Manifiesto Pedagógico
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed mb-4">
            Aprendizaje basado en <span className="text-accent">Humanismo en Código</span>: profundidad
            sobre certificados rápidos, autonomía sobre dependencia corporativa, ritualidad sobre
            gamificación vacía. Cada ruta de aprendizaje es trazable, auditable y vinculada a la obra
            real del ecosistema TAMV.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed">
            Los egresados no obtienen un papel: obtienen <span className="text-secondary">credenciales
            verificables interoperables</span> y acceso directo a contribuir en infraestructuras MD-X4 reales,
            con su nombre registrado en la evolución del kernel.
          </p>
        </motion.div>

        {/* Tracks */}
        <div className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 text-foreground">
            Rutas <span className="text-primary text-glow-blue">Formativas</span>
          </h2>
          <div className="line-decoration w-32 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tracks.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-premium rounded-lg p-6 shine-effect"
              >
                <div className="flex items-start justify-between mb-3">
                  <t.icon className="text-primary" size={28} />
                  <span className="font-mono text-xs text-accent">{t.hours}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{t.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { k: "4", v: "Rutas activas" },
            { k: "1,040h", v: "Currículum total" },
            { k: "100%", v: "Open Science" },
            { k: "ORCID", v: "Vinculación autoral" },
          ].map((s) => (
            <div key={s.k} className="text-center p-6 card-premium rounded-lg">
              <p className="font-display text-3xl font-black text-accent text-glow-lime">{s.k}</p>
              <p className="font-body text-xs text-muted-foreground mt-1">{s.v}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/registros"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-md bg-accent text-accent-foreground font-display text-sm font-semibold tracking-wider hover:shadow-[0_0_30px_hsl(80_100%_55%/0.4)] transition-all"
            >
              Ver Registros & DOIs <ArrowRight size={16} />
            </Link>
            <a
              href="https://tamvonline-oficial.odoo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-md border border-primary/30 text-primary font-display text-sm font-semibold tracking-wider hover:bg-primary/5 transition-all"
            >
              Sitio Oficial UTAMV <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UTAMV;
