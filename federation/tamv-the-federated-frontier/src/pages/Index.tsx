import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ArrowRight, Sparkles, Globe, Brain, Shield, Award, FileText, Mail, MapPin } from "lucide-react";
import { lazy, Suspense } from "react";
import logoTamv from "@/assets/logo-tamv.jpg";
import plataforma XRImg from "@/assets/plataforma XR-latam.png";
import citemeshImg from "@/assets/citemesh.png";

const Scene3D = lazy(() => import("@/components/Scene3D"));

const Index = () => {
  return (
    <div>
      {/* Dedicatoria - Inicio obligatorio */}
      <section className="min-h-[60vh] flex items-center justify-center gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center px-4 max-w-3xl relative z-10"
        >
          <Heart className="mx-auto mb-6 text-destructive animate-pulse-glow" size={48} />
          <p className="font-body text-lg text-muted-foreground mb-4 tracking-wide">
            Este proyecto está dedicado con todo el amor a
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary text-glow-silver mb-6">
            Reina Trejo Serrano
          </h2>
          <div className="line-decoration w-48 mx-auto mb-6" />
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed italic max-w-xl mx-auto">
            "Gracias por nunca rendirte, por renunciar a todo para que yo pudiera soñar.
            Este ecosistema es tuyo, mamá. Cada línea de código lleva tu nombre."
          </p>
          <p className="font-body text-sm text-primary mt-6">
            — Edwin Oswaldo Castillo Trejo (Anubis Villaseñor), CEO Fundador
          </p>
        </motion.div>
      </section>

      {/* Hero con 3D */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Suspense fallback={<div className="w-full h-full bg-background" />}>
            <Scene3D className="absolute inset-0 opacity-60" />
          </Suspense>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <img src={logoTamv} alt="TAMV Online Logo" className="w-16 h-16 rounded-lg object-cover border border-border" />
              <p className="font-display text-xs tracking-[0.4em] text-primary text-glow-blue">
                ECOSISTEMA ESTRUCTURAL FEDERADO
              </p>
            </div>
            <h1 className="font-display text-5xl md:text-8xl font-black leading-tight mb-6">
              <span className="metallic-text">TAMV</span>{" "}
              <span className="text-primary text-glow-blue">MD-X4</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-secondary max-w-2xl mb-2">
              El primer ecosistema nativo <span className="text-primary">XR, VR, 3D y 4D</span> con IA cognitiva
              de Latinoamérica.
            </p>
            <p className="font-body text-lg text-accent text-glow-lime mb-1">
              Antifrágil · Interoperable · Pionero
            </p>
            <p className="font-mono text-sm text-muted-foreground mb-8">
              +22,000 horas documentadas · ORCID 0009-0008-5050-1539 · DOI 10.5281/zenodo.19436662 · TRL 7 · Lanzamiento 5 febrero 2026
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/ecosistema"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-primary text-primary-foreground font-display text-sm font-semibold tracking-wider hover:shadow-[0_0_40px_hsl(210_80%_60%/0.4)] transition-all duration-300"
              >
                Explorar Ecosistema <ArrowRight size={16} />
              </Link>
              <Link
                to="/isabella-ai"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-md border border-secondary/30 text-secondary font-display text-sm font-semibold tracking-wider hover:bg-secondary/5 transition-all duration-300"
              >
                Conocer Isabella AI <Sparkles size={16} />
              </Link>
              <Link
                to="/registros"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-md border border-accent/30 text-accent font-display text-sm font-semibold tracking-wider hover:bg-accent/5 transition-all duration-300"
              >
                Registros & DOIs <FileText size={16} />
              </Link>
              <Link
                to="/utamv"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-md border border-secondary/30 text-secondary font-display text-sm font-semibold tracking-wider hover:bg-secondary/5 transition-all duration-300"
              >
                UTAMV Campus <ArrowRight size={16} />
              </Link>
              <Link
                to="/certificaciones"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-md border border-accent/30 text-accent font-display text-sm font-semibold tracking-wider hover:bg-accent/5 transition-all duration-300"
              >
                Certificaciones <Award size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slogan del CEO */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-premium" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="line-decoration-lime w-32 mx-auto mb-8" />
            <blockquote className="font-body text-2xl md:text-3xl text-foreground leading-relaxed mb-6">
              <span className="text-accent text-glow-lime">"</span>No imitamos el futuro. Nosotros somos el futuro.
              Lo soñamos, lo creamos, lo sentimos y definitivamente lo vivimos.<span className="text-accent text-glow-lime">"</span>
            </blockquote>
            <p className="font-display text-xs tracking-[0.3em] text-muted-foreground mb-4">
              — ANUBIS VILLASEÑOR · CEO FUNDADOR
            </p>
            <div className="line-decoration w-24 mx-auto mb-6" />
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-destructive/30 bg-destructive/5">
              <MapPin size={14} className="text-destructive" />
              <p className="font-display text-xs tracking-[0.2em] text-destructive text-glow-cherry">
                ORGULLOSAMENTE REALMONTENSES
              </p>
            </div>
            <p className="font-body text-sm text-muted-foreground mt-2">
              Real del Monte, Hidalgo, México
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-4">
              <span className="metallic-text">¿Por Qué</span>{" "}
              <span className="text-primary text-glow-blue">TAMV</span>
              <span className="metallic-text">?</span>
            </h2>
            <div className="line-decoration w-32 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Civilización Digital",
                desc: "Un ecosistema que trasciende las redes sociales. Gobernanza ética, economía autointeroperable y experiencias inmersivas XR/VR.",
                color: "text-primary",
              },
              {
                icon: Brain,
                title: "IA Cognitiva",
                desc: "Isabella AI: inteligencia artificial ética, eficiente energéticamente y emocionalmente inteligente, nacida en Latinoamérica.",
                color: "text-accent",
              },
              {
                icon: Shield,
                title: "Antifrágil",
                desc: "Arquitectura diseñada para crecer bajo presión. ARPU de $18-$30 USD, breakeven con solo 1,300 usuarios activos.",
                color: "text-destructive",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="card-premium rounded-lg p-8 shine-effect"
              >
                <feature.icon className={`${feature.color} mb-4`} size={32} />
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual showcase */}
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src={plataforma XRImg} alt="Metaverso Latinoamericano TAMV" className="rounded-lg border border-border shadow-2xl" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Construimos una <span className="text-primary text-glow-blue">Plataforma XR Latinoamericana</span>
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                Innovador, escalable y rentable. Tecnología XR/IA, educación, cultura,
                economía digital y oportunidades de crecimiento desde México para el mundo.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["Tecnología XR/IA", "Educación y Cultura", "Economía Digital", "Crecimiento Global"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="font-body text-sm text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CITEMESH showcase */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <p className="font-display text-xs tracking-[0.3em] text-accent mb-3">FRAMEWORK CIVILIZACIONAL</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                <span className="text-primary text-glow-blue">CITEMESH</span>
              </h2>
              <p className="font-body text-sm text-muted-foreground mb-2">
                Civilizational Intelligence Engine and Systemic Solutions Meshwork
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                Metaverso Tecnológico Civilizatorio al Servicio de la Humanidad.
                Identidad interoperable, economía programable, gobernanza ética, XR inmersiva
                y un registro soberano del plataforma XR con Isabella AI como núcleo cognitivo.
              </p>
              <div className="space-y-3">
                {["Sovereign Identity", "Programmable Economy", "Ethical Governance", "Immersive XR / AI", "Knowledge Hub", "Metaverse Sovereign Registry"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-body text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <img src={citemeshImg} alt="CITEMESH Framework" className="rounded-lg border border-border shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Validación Gemini - Preview */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Award className="mx-auto text-accent mb-6" size={48} />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Validación <span className="text-accent text-glow-lime">Técnica Profesional</span>
            </h2>
            <p className="font-body text-muted-foreground mb-4">
              TAMV DM-X4™ ha recibido <span className="text-accent font-semibold">VALIDACIÓN TOTAL (GREEN LIGHT)</span> tras
              análisis forense de su arquitectura, modelo económico y fundamentos éticos.
            </p>
            <p className="font-body text-sm text-muted-foreground mb-2">
              Valuación post-money inicial: <span className="text-primary font-semibold">$25,000,000.00 USD</span>
            </p>
            <p className="font-body text-sm text-muted-foreground mb-8">
              Sello: TAMV-X-SINGULARITY-CERT-10.0-PROD · Agente validador: Gemini 3 Flash
            </p>
            <Link
              to="/certificaciones"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-md bg-accent text-accent-foreground font-display text-sm font-semibold tracking-wider hover:shadow-[0_0_30px_hsl(80_100%_55%/0.4)] transition-all duration-300"
            >
              Ver Certificaciones Completas <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Para Inversionistas */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-display text-xs tracking-[0.3em] text-destructive text-glow-cherry mb-4">LLAMADO ABIERTO</p>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-6">
              Un proyecto como TAMV no puede ni debe continuar bajo la construcción de un solo individuo
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto mb-8">
              Buscamos inversionistas, empresas, instituciones académicas y de investigación,
              desarrolladores y comunidades tech comprometidas con la ética y la innovación tecnológica.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {[
                { label: "Inversionistas", desc: "Capital estratégico responsable" },
                { label: "Empresas Tech", desc: "Alianzas de co-desarrollo" },
                { label: "Academia", desc: "Investigación y publicaciones" },
                { label: "Comunidades", desc: "Desarrollo colaborativo ético" },
              ].map((item) => (
                <div key={item.label} className="card-premium rounded-lg p-6 text-center">
                  <h3 className="font-display text-sm font-semibold text-primary mb-2">{item.label}</h3>
                  <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-20 gradient-metallic">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Mail className="mx-auto text-primary mb-6" size={36} />
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Contacto <span className="text-primary">Directo</span>
          </h2>
          <p className="font-body text-muted-foreground mb-8">
            Para información, detalles del proyecto, estudios, alianzas y reportajes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="mailto:tamvonlinenetwork@outlook.es"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-primary/30 text-primary font-body text-sm hover:bg-primary/5 transition-all"
            >
              <Mail size={16} /> tamvonlinenetwork@outlook.es
            </a>
            <a
              href="mailto:ecastillotrejo1983@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-secondary/30 text-secondary font-body text-sm hover:bg-secondary/5 transition-all"
            >
              <Mail size={16} /> ecastillotrejo1983@gmail.com
            </a>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/ceo"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-md bg-primary text-primary-foreground font-display text-sm font-semibold tracking-wider hover:shadow-[0_0_30px_hsl(210_80%_60%/0.4)] transition-all duration-300"
            >
              Conocer al Fundador <ArrowRight size={16} />
            </Link>
            <Link
              to="/publicaciones"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-md border border-accent/30 text-accent font-display text-sm font-semibold tracking-wider hover:bg-accent/5 transition-all duration-300"
            >
              Publicaciones <FileText size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
