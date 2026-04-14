import { Link } from "react-router-dom";
import { wikiStructure } from "@/data/wikiStructure";

type FeatureGroup = {
  title: string;
  items: string[];
};

const totalArticles = wikiStructure.reduce((acc, module) => acc + module.children.length, 0);

const featureGroups: FeatureGroup[] = [
  { title: "Conceptualidad", items: ["Modelo civilizatorio", "Soberanía digital", "Ontologías vivas", "Diseño orientado a confianza"] },
  { title: "Filosofía", items: ["Humanismo en código", "Kórima", "Ética por diseño", "Gobernanza distribuida"] },
  { title: "Economía y Finanzas", items: ["BookPI", "Trazabilidad de valor", "Trust Score", "Mecanismos antifraude"] },
  { title: "Técnico", items: ["Microservicios", "JSON-LD", "Observabilidad", "Pipelines CI/CD"] },
  { title: "APIs e Integraciones", items: ["API ISNI", "Webhooks", "Open Science", "Interoperabilidad multired"] },
  { title: "Operación", items: ["Protocolos", "Planes de emergencia", "Plan de desastre", "FAQ de operación"] },
];

const operationPlaybooks = [
  {
    title: "Protocolos base",
    points: ["Escalamiento de incidentes por severidad", "Matriz de responsables por módulo", "Registro auditable de decisiones"],
  },
  {
    title: "Plan de emergencia",
    points: ["Conmutación a servicios críticos", "Comunicados a stakeholders en <15 min", "Modo degradado con continuidad académica"],
  },
  {
    title: "Plan de desastre",
    points: ["Backups verificados y prueba trimestral", "Objetivo RTO/RPO por dominio", "Recuperación guiada por runbooks"],
  },
];


const strategicNextSteps = [
  {
    title: "Homologar detalle de los 13 módulos",
    description:
      "Elevar cada módulo al estándar narrativo y técnico del Módulo Cero, con APIs, modelos de datos, pipelines y despliegue claramente documentados.",
    links: [
      { to: "/articulo/introduccion", label: "Introducción conceptual" },
      { to: "/articulo/diferenciadores", label: "Por qué TAMV y qué nos diferencia" },
    ],
  },
  {
    title: "Cerrar la capa infra MD-X4/MD-X5",
    description:
      "Explicitar operación sobre 177–195 repos, criterios del motor hexagonal, materialización ISNI/SNI en APIs y bases de datos, y despliegue del kernel en Kubernetes.",
    links: [
      { to: "/articulo/api-isni", label: "API ISNI y endpoints" },
      { to: "/articulo/cicd-pipelines", label: "CI/CD y pipelines" },
      { to: "/articulo/webhooks-eventos", label: "Webhooks y eventos" },
    ],
  },
  {
    title: "Conectar home 3D con rutas operativas",
    description:
      "El home MD-X4 debe funcionar como enrutador táctico hacia fundamentos, metaverso-XR, roadmap civilizatorio y guía de implementación para uso real.",
    links: [
      { to: "/articulo/dreamspaces-xr", label: "DreamSpaces y experiencias XR" },
      { to: "/articulo/roadmap-civilizatorio", label: "Roadmap civilizatorio" },
      { to: "/modulo/8", label: "Guía de implementación (Módulo 8)" },
    ],
  },
];

const faq = [
  {
    q: "¿Cómo navego entre módulos, submódulos y capítulos?",
    a: "Usa el índice por módulos y los enlaces de artículo anterior/siguiente para navegación continua.",
  },
  {
    q: "¿Qué pasa con enlaces antiguos?",
    a: "Las rutas legacy /wiki/:section/:page redirigen automáticamente a la ruta canónica /articulo/:slug.",
  },
  {
    q: "¿Dónde encuentro contenido técnico y de APIs?",
    a: "En Módulo 8 (Implementación Técnica) y Módulo 9 (Automatización), con referencias cruzadas en el índice global.",
  },
];

export default function WikiHome() {
  return (
    <div className="px-6 py-8 md:px-8 lg:px-10 space-y-10">
      <section className="rounded-xl border border-primary/30 bg-gradient-to-br from-slate-900/90 to-slate-950 p-6">
        <p className="text-xs font-mono text-primary mb-2">TAMV ATLAS · RESUMEN EJECUTIVO</p>
        <h1 className="text-3xl md:text-4xl font-bold text-glow-cyan mb-4">Interfaz integral de nueva generación</h1>
        <p className="text-sm text-muted-foreground max-w-4xl">
          Arquitectura visual y operativa unificada para módulos, submódulos y capítulos con navegación canónica,
          redireccionamientos inteligentes, paginación por contexto y secciones especializadas para filosofía,
          economía, finanzas, ingeniería, APIs, protocolos y continuidad de negocio.
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-mono">
          <span className="px-2 py-1 border border-border rounded">13 módulos</span>
          <span className="px-2 py-1 border border-border rounded">{totalArticles}+ capítulos</span>
          <span className="px-2 py-1 border border-border rounded">Flujo canónico de rutas</span>
          <span className="px-2 py-1 border border-border rounded">Navegación asistida</span>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        {featureGroups.map((group) => (
          <article key={group.title} className="rounded-lg border border-border bg-card/80 p-4 backdrop-blur-sm">
            <h2 className="text-sm font-semibold text-primary mb-2">{group.title}</h2>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {group.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-border bg-card p-5 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Protocolos y continuidad operativa</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {operationPlaybooks.map((playbook) => (
            <article key={playbook.title} className="rounded-lg border border-border/70 bg-slate-900/40 p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">{playbook.title}</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                {playbook.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>


      <section className="rounded-lg border border-primary/30 bg-card p-5 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Huecos y siguientes pasos clave</h2>
        <div className="space-y-3">
          {strategicNextSteps.map((step) => (
            <article key={step.title} className="rounded-lg border border-border/70 bg-slate-900/30 p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {step.links.map((link) => (
                  <Link key={link.to} to={link.to} className="px-2 py-1 rounded border border-border hover:border-primary/50 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          En su estado actual, TAMV Atlas ya funciona como puerta oficial del ecosistema. El siguiente umbral es consolidar
          una capa infra verificable y mantener profundidad homogénea en los 13 módulos para acelerar onboarding de nodos y proyectos.
        </p>
      </section>

      <section className="rounded-lg border border-border bg-card p-5 space-y-3">
        <h2 className="text-lg font-semibold">Preguntas frecuentes</h2>
        <div className="space-y-2">
          {faq.map((item) => (
            <details key={item.q} className="rounded border border-border px-3 py-2">
              <summary className="cursor-pointer text-sm text-foreground">{item.q}</summary>
              <p className="mt-2 text-xs text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Índice global de módulos (0–12)</h2>
          <p className="text-xs text-muted-foreground">{totalArticles} artículos enlazados</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wikiStructure.map((section, moduleIndex) => (
            <div key={section.id} className="bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition-colors">
              <Link to={`/modulo/${moduleIndex}`} className="flex items-center gap-3 mb-3 group">
                <span className="text-xl">{section.icon}</span>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{section.title}</h3>
              </Link>
              <ul className="space-y-1 mb-3">
                {section.children.map((page) => (
                  <li key={page.slug}>
                    <Link to={`/articulo/${page.slug}`} className="text-xs text-muted-foreground hover:text-primary">· {page.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
