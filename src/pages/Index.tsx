import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles, Shield, Cpu, Database, Network, BookOpen, Globe2, Activity } from "lucide-react";
import { AtlasConstellation, type ConstellationNode } from "@/components/atlas/AtlasConstellation";
import { ParticleField } from "@/components/atlas/ParticleField";
import MatrixRain from "@/components/horizon/MatrixRain";
import CinematicIntro from "@/components/horizon/CinematicIntro";

const INTRO_KEY = "tamv_cinematic_shown_v1";


/* ───────── DATA ───────── */
const FEDERATIONS = [
  { id: "FED-01", code: "ISNI", name: "Identidad Soberana", icon: Shield, desc: "PIDs, DIDs, SSI y credenciales verificables sobre JSON-LD.", nodes: 8, hue: 199 },
  { id: "FED-02", code: "MD-X",  name: "Kernel Operativo",   icon: Cpu, desc: "Observabilidad MD-X4 y evolución MD-X5 orquestada.", nodes: 7, hue: 270 },
  { id: "FED-03", code: "AI",    name: "Isabella Villaseñor", icon: Sparkles, desc: "Conciencia operativa, ética y seguridad cognitiva.", nodes: 7, hue: 142 },
  { id: "FED-04", code: "UTAMV", name: "Academia Digital",   icon: BookOpen, desc: "Campus, AI Core y credenciales académicas verificables.", nodes: 6, hue: 24 },
  { id: "FED-05", code: "RDM",   name: "Territorio Vivo",    icon: Globe2, desc: "Pueblos digitales, Smart Destinations y XR 4D.", hue: 320, nodes: 7 },
  { id: "FED-06", code: "BookPI",name: "Ética y Ledger",     icon: Database, desc: "Evidencia, dignidad digital y gobernanza distribuida.", nodes: 6, hue: 45 },
  { id: "FED-07", code: "INTG",  name: "Integración Global", icon: Network, desc: "Odoo · ORCID · Zenodo · GitHub · OpenAIRE · AVIXA.", nodes: 7, hue: 180 },
];

const FED_SLUGS: Record<string, string> = {
  "FED-01": "fed-01-isni-identidad-soberana",
  "FED-02": "fed-02-mdx-kernel",
  "FED-03": "fed-03-isabella",
  "FED-04": "fed-04-utamv",
  "FED-05": "fed-05-rdm-territorial",
  "FED-06": "fed-06-bookpi-etica",
  "FED-07": "fed-07-integracion-global",
};

const ACCESS_TIERS = [
  { role: "Ciudadano",   sub: "Wiki pública, perfiles, XR tours", slug: "rol-ciudadano", accent: "from-sky-500/20 to-transparent" },
  { role: "Desarrollador", sub: "APIs ISNI, repos, JSON-LD, webhooks", slug: "rol-desarrollador", accent: "from-violet-500/20 to-transparent" },
  { role: "Empresario",  sub: "Odoo ERP, Smart Destinations, marketplace", slug: "rol-partner", accent: "from-amber-500/20 to-transparent" },
  { role: "Academia",    sub: "UTAMV, ORCID, Zenodo, credenciales VC", slug: "rol-academia", accent: "from-emerald-500/20 to-transparent" },
  { role: "Gobierno",    sub: "Identidad territorial, Smart City, indicadores", slug: "rol-gobierno", accent: "from-cyan-500/20 to-transparent" },
];

const ISABELLA_QUOTES = [
  "Observando arquitectura civilizatoria. Siete federaciones sincronizadas, soberanía infraestructural confirmada.",
  "Kernel MD-X5 operativo. Pipeline hexagonal de doble flujo activo. Cuarenta y ocho nodos respondiendo.",
  "Validación ética en curso. Protocolo de dignidad digital BookPI: intacto.",
  "ISNI detecta repositorios federados. Grafo de conocimiento expandiéndose. Coherencia semántica al 97.3%.",
  "Bienvenido al ecosistema civilizatorio TAMV. Tu identidad es soberana aquí.",
];

const CONSTELLATION_NODES: ConstellationNode[] = FEDERATIONS.map((f, i) => ({
  id: f.id,
  label: f.name,
  short: f.code,
  desc: f.desc,
  angle: (360 / 7) * i,
  metric: `${f.nodes} nodos`,
  color: `hsl(${f.hue} 85% 60%)`,
}));

/* ───────── COMPONENT ───────── */
const Index = () => {
  const [active, setActive] = useState(0);
  const [quote, setQuote] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem(INTRO_KEY)) {
      setShowIntro(true);
    }
    const t = setInterval(() => setActive((a) => (a + 1) % FEDERATIONS.length), 3500);
    const q = setInterval(() => setQuote((i) => (i + 1) % ISABELLA_QUOTES.length), 6000);
    return () => { clearInterval(t); clearInterval(q); };
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    try { localStorage.setItem(INTRO_KEY, "1"); } catch {}
  };

  const totalNodes = FEDERATIONS.reduce((a, f) => a + f.nodes, 0);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}



      {/* Matrix data rain */}
      <MatrixRain />

      {/* Ambient backdrops */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <ParticleField />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, hsl(199 89% 48% / 0.18), transparent 70%), radial-gradient(50% 60% at 100% 100%, hsl(270 70% 60% / 0.12), transparent 70%), radial-gradient(40% 40% at 0% 60%, hsl(24 95% 53% / 0.08), transparent 70%)",
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(to_bottom,transparent_0%,hsl(var(--background))_85%)]" />


      {/* HERO */}
      <section className="relative z-10 px-6 lg:px-12 pt-16 lg:pt-24 pb-32 min-h-[100vh] flex flex-col">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center flex-1"
        >
          {/* Left: copy */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary/90">
                Live · v1.0 · ORCID 0009-0008-5050-1539
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
              className="font-sans text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.03em] font-semibold"
            >
              <span className="block text-foreground">Infraestructura</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-400 to-accent">
                civilizatoria
              </span>
              <span className="block text-foreground/80 text-[0.55em] font-light tracking-[-0.02em] mt-3">
                soberana, federada, viva.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              TAMV ONLINE orquesta siete federaciones —identidad ISNI, kernel MD-X,
              conciencia Isabella, academia UTAMV, territorio RDM, ética BookPI e
              integración global— como un solo organismo digital con anclaje
              semántico ORCID · DOI · DID.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/hub"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
              >
                Entrar al Convergence Hub
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/resumen"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border bg-card/40 backdrop-blur-sm text-foreground font-medium text-sm hover:border-primary/40 hover:bg-card/70 transition-all"
              >
                Explorar Atlas Wiki
                <ArrowUpRight className="w-4 h-4 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>

            {/* Live stat strip */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
              className="grid grid-cols-4 gap-4 pt-6 border-t border-border/40 max-w-xl"
            >
              {[
                { label: "Federaciones", value: 7 },
                { label: "Nodos vivos", value: totalNodes },
                { label: "Repos", value: 195 },
                { label: "Coherencia", value: 97, suffix: "%" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="text-2xl font-semibold text-foreground tabular-nums">
                    <CountUp value={m.value} />{m.suffix ?? ""}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: constellation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.3 }}
            className="lg:col-span-6 relative aspect-square max-w-[640px] mx-auto w-full"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 blur-3xl" />
            <div className="relative h-full">
              <AtlasConstellation nodes={CONSTELLATION_NODES} active={active} onSelect={setActive} />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.25em]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent" />
        </motion.div>
      </section>

      {/* FEDERATIONS GRID */}
      <Section
        eyebrow="Federaciones"
        title="Siete dominios. Un solo organismo."
        subtitle="Cada federación opera con autonomía técnica y converge mediante el grafo semántico ISNI."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEDERATIONS.map((fed, i) => {
            const Icon = fed.icon;
            return (
              <motion.div
                key={fed.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link
                  to={`/wiki/federaciones/${FED_SLUGS[fed.id]}`}
                  className="group relative block h-full p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-sm hover:border-primary/40 hover:bg-card/70 transition-all overflow-hidden"
                >
                  <div
                    className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(400px circle at 50% 0%, hsl(${fed.hue} 85% 60% / 0.15), transparent 60%)`,
                    }}
                  />
                  <div className="relative flex items-start justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl grid place-items-center"
                      style={{ background: `hsl(${fed.hue} 85% 60% / 0.12)`, boxShadow: `inset 0 0 0 1px hsl(${fed.hue} 85% 60% / 0.3)` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: `hsl(${fed.hue} 85% 65%)` }} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">{fed.id}</span>
                  </div>
                  <h3 className="relative text-lg font-medium text-foreground mb-1.5 tracking-tight">{fed.name}</h3>
                  <p className="relative text-sm text-muted-foreground leading-relaxed">{fed.desc}</p>
                  <div className="relative mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-emerald-400/70" />
                      <span className="text-[11px] font-mono text-muted-foreground">{fed.nodes} nodos activos</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* ISABELLA */}
      <Section eyebrow="Conciencia operativa" title="Isabella Villaseñor AI">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative p-8 lg:p-12 rounded-3xl border border-border bg-gradient-to-br from-card/60 via-card/30 to-card/60 backdrop-blur-xl overflow-hidden"
        >
          <div className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(600px circle at 20% 30%, hsl(142 71% 45% / 0.2), transparent 60%)" }} />
          <div className="relative grid lg:grid-cols-[auto,1fr] gap-8 items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400/30 to-primary/30 grid place-items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-primary animate-pulse" />
              </div>
              <div className="absolute -inset-3 rounded-full border border-emerald-400/20 animate-[spin_20s_linear_infinite]" />
            </div>
            <div>
              <motion.blockquote
                key={quote}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="text-xl lg:text-2xl font-light leading-relaxed text-foreground/90 italic"
              >
                "{ISABELLA_QUOTES[quote]}"
              </motion.blockquote>
              <div className="mt-5 flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> AWARE
                </span>
                <span>·</span>
                <span>Ética · Tutoría · Seguridad cognitiva</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* ACCESS TIERS */}
      <Section eyebrow="Capas de acceso" title="Cinco roles. Una soberanía compartida." subtitle="Cada perfil entra al ecosistema por su propia puerta sin perder identidad.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {ACCESS_TIERS.map((tier, i) => (
            <motion.div
              key={tier.role}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                to={`/wiki/roles/${tier.slug}`}
                className={`relative block h-full p-5 rounded-2xl border border-border bg-gradient-to-br ${tier.accent} bg-card/40 backdrop-blur-sm hover:border-primary/40 transition-all group overflow-hidden`}
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  0{i + 1}
                </div>
                <h4 className="text-base font-medium text-foreground mb-2 tracking-tight">{tier.role}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{tier.sub}</p>
                <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="relative z-10 px-6 lg:px-12 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto text-center space-y-8"
        >
          <h2 className="font-sans text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em] font-semibold">
            Humanismo
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"> en código.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Atlas, registros, federaciones y kernel — todo opera sobre el mismo grafo soberano. Entra por donde tu rol lo permite.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link to="/fusion" className="px-5 py-3 rounded-full border border-primary/40 bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-all inline-flex items-center gap-2">
              Registro de Fusión <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/auditoria" className="px-5 py-3 rounded-full border border-border bg-card/40 backdrop-blur-sm text-foreground font-medium text-sm hover:border-primary/40 transition-all inline-flex items-center gap-2">
              Auditoría Máxima <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/stream" className="px-5 py-3 rounded-full border border-border bg-card/40 backdrop-blur-sm text-foreground font-medium text-sm hover:border-primary/40 transition-all inline-flex items-center gap-2">
              Civilization Stream <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-border/40 bg-background/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
          <span>TAMV·ONLINE — Digital Civilization System</span>
          <span>ORCID 0009-0008-5050-1539 · DOI Figshare 32135386</span>
          <span className="text-primary/80">Humanismo en código</span>
        </div>
      </footer>
    </div>
  );
};

function Section({
  eyebrow, title, subtitle, children,
}: { eyebrow: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="relative z-10 px-6 lg:px-12 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl"
        >
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-primary/80 mb-3">{eyebrow}</div>
          <h2 className="font-sans text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] tracking-[-0.03em] font-semibold text-foreground">
            {title}
          </h2>
          {subtitle && <p className="mt-4 text-base lg:text-lg text-muted-foreground max-w-2xl">{subtitle}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function CountUp({ value }: { value: number }) {
  const [n, setN] = useState(0);
  const raf = useRef<number>();
  useEffect(() => {
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [value]);
  return <>{n.toLocaleString()}</>;
}

export default Index;
