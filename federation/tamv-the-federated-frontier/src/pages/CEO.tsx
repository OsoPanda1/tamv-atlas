import { motion } from "framer-motion";
import { ExternalLink, Clock, Code, Award, BookOpen, MapPin, Heart, Mail, Globe, FileText } from "lucide-react";

const milestones = [
  { year: "2022-2023", event: "Inicio de la investigación y conceptualización del ecosistema TAMV Online" },
  { year: "2024", event: "Diseño y arquitectura del Códice Maestro TAMV DM-X4™ — +19,550 horas documentadas" },
  { year: "2024", event: "Desarrollo del concepto CITEMESH — Civilizational Intelligence Engine" },
  { year: "2025", event: "Publicación en AVIXA Xchange — reconocimiento internacional en la industria AV/XR" },
  { year: "2025", event: "Desarrollo de Isabella AI — IA ética, cognitiva y emocionalmente inteligente" },
  { year: "2025", event: "Participación activa en foros de OpenAI y comunidad GPT Builders" },
  { year: "2025", event: "Validación técnica profesional con GREEN LIGHT por agente Gemini 3 Flash" },
  { year: "Feb 2026", event: "Lanzamiento público oficial de TAMV Online — +21,000 horas registradas" },
  { year: "Feb 2026", event: "Publicación del Informe Internacional sobre IA, Desinformación y Responsabilidad" },
];

const links = [
  { label: "Blog Oficial", url: "https://tamvonlinenetwork.blogspot.com", icon: BookOpen },
  { label: "GitHub", url: "https://github.com/OsoPanda1", icon: Code },
  { label: "AVIXA Xchange", url: "https://xchange.avixa.org/posts/tamv-online-primer-plataforma-mexicana-sistémica-digital", icon: Award },
  { label: "ORCID", url: "https://orcid.org/0009-0004-3897-2000", icon: Globe },
];

export default function CEO() {
  return (
    <div>
      {/* Hero Bio */}
      <section className="min-h-[80vh] flex items-center gradient-hero relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 hidden lg:block">
          <div className="w-full h-full bg-gradient-to-l from-primary/20 to-transparent" />
        </div>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto">
            <p className="font-display text-xs tracking-[0.4em] text-primary text-glow-blue mb-3">CEO & FUNDADOR</p>
            <h1 className="font-display text-3xl md:text-5xl font-black text-foreground mb-2">
              Edwin Oswaldo <span className="text-primary text-glow-blue">Castillo Trejo</span>
            </h1>
            <p className="font-display text-lg text-accent text-glow-lime mb-2">(Anubis Villaseñor)</p>
            <div className="inline-flex items-center gap-2 mb-6">
              <MapPin size={14} className="text-destructive" />
              <span className="font-display text-xs tracking-[0.2em] text-destructive">ORGULLOSAMENTE REALMONTENSES</span>
              <span className="font-body text-xs text-muted-foreground">· Real del Monte, Hidalgo, México</span>
            </div>

            <div className="line-decoration w-48 mb-8" />

            <div className="space-y-4 font-body text-base text-muted-foreground leading-relaxed">
              <p>
                Desarrollador independiente, visionario y arquitecto del ecosistema TAMV Online.
                Desde un pueblo minero en el corazón de Hidalgo, México, ha dedicado más de
                <span className="text-primary font-semibold"> 21,000 horas documentadas</span> a construir un ecosistema
                estructural digital que desafía a las plataformas globales más grandes del mundo.
              </p>
              <p>
                Creador de <span className="text-primary">Isabella AI</span>, una inteligencia artificial ética, cognitiva y
                emocionalmente inteligente diseñada como el Kernel Cognitivo del ecosistema. Isabella no funciona como un chatbot
                estático, sino como un <span className="text-accent">Agente Constitucional Cognitivo</span> capaz de orquestar
                microservicios y reconfigurar código bajo un Bucle de Conciencia innegociable.
              </p>
              <p>
                Arquitecto del concepto <span className="text-primary">CITEMESH</span> (Civilizational Intelligence Engine and
                Systemic Solutions Meshwork), un framework sin precedentes que integra identidad interoperable, economía programable,
                gobernanza ética e inmersión XR bajo una malla adaptativa sistémica.
              </p>
              <p>
                Diseñador de la <span className="text-primary">Arquitectura Heptafederada</span> del TAMV, un sistema que opera bajo
                7 Federaciones (Identidad, Consciencia, DreamSpaces, Economía, Defensa, Gobernanza e Infraestructura) organizadas
                en niveles de criticidad L0 a L3, garantizando que el núcleo de experiencia sea siempre navegable.
              </p>
              <p>
                Su trabajo ha sido reconocido en plataformas internacionales como <span className="text-secondary">AVIXA Xchange</span>,
                foros de OpenAI, la comunidad GPT Builders, y ha recibido validación técnica profesional con
                <span className="text-accent"> GREEN LIGHT</span> de agentes de IA avanzados. Edwin defiende un modelo de tecnología
                que prioriza la dignidad humana, la gobernanza ética y la interoperabilidad digital responsable.
              </p>
              <p>
                Autor del <span className="text-primary">Códice Maestro TAMV DM-X4™</span>, una Constitución Digital de Infraestructura
                Civilizatoria que establece la naturaleza interoperable del ecosistema, protege su propiedad intelectual y provee un marco
                para auditoría, inversión y transferencia tecnológica responsable.
              </p>
              <p>
                Creador del modelo económico <span className="text-primary">MSR</span> (Monetary Stability Reserve) y del
                <span className="text-primary"> Protocolo Lightning Justice (PLJ)</span> que revierte el modelo de explotación actual,
                otorgando el 75% del valor generado directamente al creador (FairSplit 75/25).
              </p>
            </div>

            {/* Quote */}
            <div className="mt-8 p-6 rounded-lg border border-destructive/20 bg-destructive/5">
              <Heart className="text-destructive mb-3" size={20} />
              <p className="font-body text-secondary italic">
                "Este proyecto es dedicado a mi madre, Reina Trejo Serrano. Gracias por nunca rendirte,
                por renunciar a todo para que yo pudiera soñar."
              </p>
            </div>

            {/* Slogan */}
            <div className="mt-8 p-6 rounded-lg gradient-premium border border-primary/10">
              <p className="font-body text-lg text-foreground italic leading-relaxed">
                "No imitamos el futuro. Nosotros somos el futuro. Lo soñamos, lo creamos,
                lo sentimos y definitivamente lo vivimos."
              </p>
              <p className="font-display text-xs text-primary mt-3 tracking-wider">— ANUBIS VILLASEÑOR</p>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <Clock className="text-primary" size={20} />
              <span className="font-mono text-sm text-muted-foreground">+21,000 horas registradas y documentadas</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-center text-foreground mb-12">
            <span className="text-primary text-glow-blue">Trayectoria</span>
          </h2>
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex gap-4 items-start"
              >
                <div className="min-w-[100px] font-mono text-xs text-primary mt-1">{m.year}</div>
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="font-body text-sm text-muted-foreground">{m.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-xl font-bold text-center text-foreground mb-8">
            Presencia <span className="text-secondary">Digital</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-premium rounded-lg p-6 text-center group"
              >
                <link.icon className="mx-auto text-primary mb-3 group-hover:scale-110 transition-transform" size={24} />
                <p className="font-body text-sm text-foreground">{link.label}</p>
                <ExternalLink className="mx-auto mt-2 text-muted-foreground" size={14} />
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-12 text-center">
            <h3 className="font-display text-sm text-secondary mb-4">CONTACTO DIRECTO</h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:tamvonlinenetwork@outlook.es" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body">
                <Mail size={14} /> tamvonlinenetwork@outlook.es
              </a>
              <a href="mailto:ecastillotrejo1983@gmail.com" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body">
                <Mail size={14} /> ecastillotrejo1983@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
