import { motion } from "framer-motion";
import { ExternalLink, FileText, Award, BookOpen, Globe, Shield, Hash, Database } from "lucide-react";

const registros = [
  {
    label: "ORCID",
    value: "0009-0008-5050-1539",
    desc: "Identificador autoral verificado de Edwin Oswaldo Castillo Trejo (Anubis Villaseñor). Titular del registro de obra TAMV.",
    url: "https://orcid.org/0009-0008-5050-1539",
    icon: Hash,
  },
  {
    label: "DOI Canon TAMV — Zenodo",
    value: "10.5281/zenodo.19436662",
    desc: "DOI de referencia del ecosistema TAMV MD-X4. Manifiesto, whitepaper, anexos arquitectónicos y respuestas a revisión técnica.",
    url: "https://doi.org/10.5281/zenodo.19436662",
    icon: BookOpen,
  },
  {
    label: "DOI Figshare — Interactive Resource",
    value: "10.6084/m9.figshare.32135386",
    desc: "Depósito complementario en Figshare que documenta la evolución arquitectónica del MD-X4 y nodos federados.",
    url: "https://doi.org/10.6084/m9.figshare.32135386",
    icon: Database,
  },
  {
    label: "OpenAIRE Graph",
    value: "Integración ciencia abierta",
    desc: "Mapeo de repositorios TAMV como software research products, enlazados a DOIs Zenodo/Figshare y cosechables por EOSC.",
    url: "https://explore.openaire.eu/",
    icon: Globe,
  },
  {
    label: "Loop / Frontiers",
    value: "Profile 3117809",
    desc: "Perfil de autor en Loop (Frontiers) para articular producción teórica sobre interoperabilidad digital responsable y gobernanza XR.",
    url: "http://loop.frontiersin.org/people/3117809/overview?referrer=orcid_profile",
    icon: FileText,
  },
  {
    label: "ISNI (en proceso)",
    value: "Identificador normalizado",
    desc: "Consolidación de autoría distribuida del fundador y de TAMV Online como entidad cultural-tecnológica.",
    url: "https://isni.org/",
    icon: Shield,
  },
];

const works = [
  { year: "2026", type: "Other · Manifiesto TAMV MD-X4", role: "Author" },
  { year: "2026", type: "Report · Informe Internacional de Análisis Crítico", role: "Author" },
  { year: "2026-05-10", type: "Interactive resource (Figshare)", role: "Author", doi: "10.6084/m9.figshare.32135386" },
  { year: "2026-04-30", type: "Whitepaper Arquitectura Heptafederada MD-X4", role: "Author" },
  { year: "2025-2026", type: "Grant · TAMV-HUBDEVS001 (Independent Research)", role: "Principal" },
  { year: "2024", type: "Distinction · LEYENDA URBANA (Alianzas LATAM)", role: "Honoree" },
];

const Registros = () => {
  return (
    <div className="min-h-screen pt-12 pb-24">
      <section className="container mx-auto px-4 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="font-display text-xs tracking-[0.4em] text-primary text-glow-blue mb-4">
            DOCUMENTACIÓN · DOIS · CIENCIA ABIERTA
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-black mb-4">
            <span className="metallic-text">Registros</span>{" "}
            <span className="text-accent text-glow-lime">Internacionales</span>
          </h1>
          <div className="line-decoration w-32 mx-auto mb-6" />
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            TAMV Online está inscrito en los circuitos de ciencia abierta y metadatos académicos globales,
            siguiendo las <span className="text-secondary">OpenAIRE Guidelines</span> y los{" "}
            <span className="text-secondary">Principles of Open Scholarly Infrastructure (POSI)</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {registros.map((r, i) => (
            <motion.a
              key={r.label}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="card-premium rounded-lg p-6 shine-effect group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-md bg-primary/10 border border-primary/20">
                  <r.icon className="text-primary" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display text-sm font-semibold text-foreground">{r.label}</h3>
                    <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="font-mono text-xs text-accent text-glow-lime mb-2">{r.value}</p>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Works */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Obra Registrada <span className="text-primary text-glow-blue">(13 works · ORCID)</span>
          </h2>
          <div className="line-decoration w-32 mb-8" />
          <div className="card-premium rounded-lg divide-y divide-border">
            {works.map((w) => (
              <div key={w.year + w.type} className="p-5 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <span className="font-mono text-xs text-accent w-24 shrink-0">{w.year}</span>
                <span className="font-body text-sm text-foreground flex-1">{w.type}</span>
                {w.doi && <span className="font-mono text-[10px] text-primary">DOI: {w.doi}</span>}
                <span className="font-display text-[10px] tracking-wider text-muted-foreground">{w.role}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cumplimiento */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          <div className="card-premium rounded-lg p-8">
            <Award className="text-accent mb-4" size={28} />
            <h3 className="font-display text-lg font-semibold mb-3 text-accent text-glow-lime">POSI · Gobernanza Comunitaria</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              TAMV se alinea con los <span className="text-secondary">Principles of Open Scholarly Infrastructure</span>:
              gobernanza por comunidades, transparencia financiera, código abierto y ausencia de dependencia de
              un único proveedor.
            </p>
          </div>
          <div className="card-premium rounded-lg p-8">
            <Globe className="text-primary mb-4" size={28} />
            <h3 className="font-display text-lg font-semibold mb-3 text-primary text-glow-blue">EOSC Latinoamericana</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Propuesta de nube científica regional FAIR, interoperable con EOSC pero interoperable sobre datos,
              algoritmos e infraestructuras del Sur Global.
            </p>
          </div>
        </motion.div>

        {/* TRL / Producción */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="card-premium rounded-lg p-8 md:p-12">
          <p className="font-display text-xs tracking-[0.3em] text-destructive text-glow-cherry mb-3">
            ESTADO DE PRODUCCIÓN Y DESPLIEGUE
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Avance Real Tecnológico — <span className="text-accent text-glow-lime">Fase 0.8 · TRL 7</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { k: "80%", v: "Avance ecosistema" },
              { k: "22,000h", v: "Trabajo documentado" },
              { k: "TRL 7", v: "Demo en entorno real" },
              { k: "7", v: "Federaciones MD-X4" },
            ].map((s) => (
              <div key={s.k} className="text-center p-4 rounded-md border border-border">
                <p className="font-display text-2xl font-black text-primary text-glow-blue">{s.k}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">{s.v}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-body text-muted-foreground leading-relaxed">
            <div>
              <h4 className="font-display text-sm font-semibold text-foreground mb-2">Componentes operativos</h4>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>Kernel MD-X4 / MD-X5 — observabilidad y Zero-Trust.</li>
                <li>Nodo Territorial <span className="text-accent">RDM-TOS</span> (Real del Monte).</li>
                <li>Módulos UTAMV Campus Online activos.</li>
                <li>Isabella Villaseñor AI — Triple Federación.</li>
                <li>Integraciones Supabase + Edge Functions.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm font-semibold text-foreground mb-2">Roadmap de despliegue</h4>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>Q1 2026 — Lanzamiento oficial (5 febrero).</li>
                <li>Q2 2026 — Apertura UTAMV a cohorte fundadora.</li>
                <li>Q3 2026 — Federación de nodos territoriales LATAM.</li>
                <li>Q4 2026 — Auditoría ISO 42001 / EU AI Act.</li>
                <li>2027 — Despliegue MSR-BookPI y MD-X4 Quantum.</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Registros;
