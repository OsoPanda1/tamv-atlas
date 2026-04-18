import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, BookOpen, Building2, Network, Shield } from "lucide-react";
import { type WikiSectionId, WIKI_SECTIONS } from "@/data/wikiSchema";

export default function WikiPage() {
  const { sectionId, slug } = useParams<{ sectionId: WikiSectionId; slug?: string }>();

  const section = WIKI_SECTIONS.find((entry) => entry.id === sectionId);
  if (!section) {
    return (
      <div className="min-h-full bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="rounded-xl border border-rose-600/30 bg-rose-950/20 p-6 max-w-md w-full">
          <div className="flex items-center gap-2 text-rose-300 text-sm"><AlertTriangle className="w-4 h-4" /> Ruta inválida</div>
          <p className="text-slate-300 text-sm mt-2">La sección solicitada no existe en el esquema activo.</p>
          <Link className="inline-flex items-center gap-1 mt-4 text-blue-300 hover:text-blue-200" to="/wiki">
            <ArrowLeft className="w-4 h-4" /> Volver al mapa de wiki
          </Link>
        </div>
      </div>
    );
  }

  const child = section.children?.find((entry) => entry.slug === slug);

  return (
    <div className="min-h-full bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-10 space-y-6">
        <div className="text-xs text-slate-500 flex items-center gap-2 overflow-x-auto">
          <Link to="/wiki" className="hover:text-blue-300 transition-colors">Wiki</Link>
          <span>/</span>
          <Link to={`/wiki/${section.id}`} className="hover:text-blue-300 transition-colors">{section.title}</Link>
          {child && (
            <>
              <span>/</span>
              <span className="text-slate-300 whitespace-nowrap">{child.title}</span>
            </>
          )}
        </div>

        <header className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <h1 className="text-3xl font-black tracking-tight">{child ? child.title : section.title}</h1>
          <p className="mt-2 text-slate-400 max-w-3xl">{section.description}</p>
        </header>

        {!slug && <SectionOverview sectionId={section.id} />}

        {!slug && section.children?.length ? (
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="text-lg font-semibold mb-4">Subpáginas</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {section.children.map((entry) => (
                <Link
                  key={entry.slug}
                  to={`/wiki/${section.id}/${entry.slug}`}
                  className="rounded-lg border border-slate-700 bg-slate-950/50 p-3 hover:border-blue-500/60 transition-colors"
                >
                  <p className="text-sm font-semibold">{entry.title}</p>
                  <p className="text-xs text-slate-500 mt-1">Tipo: {entry.kind}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {slug && child && <ChildTemplate childKind={child.kind} />}
      </div>
    </div>
  );
}

function SectionOverview({ sectionId }: { sectionId: WikiSectionId }) {
  const sectionGuides: Record<WikiSectionId, string> = {
    "sistema-civilizatorio": "Índice narrativo de capítulos del Documento Maestro Integrado, con objetivo, dependencias y métrica por capítulo.",
    modulos: "Vista de Módulos 1–11 con propósito, APIs, dependencias, riesgos y KPIs por módulo.",
    federaciones: "Nodo por nodo FED-01 a FED-07: actores, estándares, flujos y madurez de integración.",
    roles: "Definición de capacidades por rol, journeys y permisos asociados al modelo de acceso.",
    "infra-backend": "Arquitectura de servicios, observabilidad, seguridad, CI/CD y patrones de despliegue endurecido.",
    isabella: "Arquitectura multi-agente, trazabilidad de eventos y control ético operacional con HITL.",
    "blindaje-legal": "Matriz de cumplimiento UNESCO/GDPR/ICCPR/UNDRIP con referencias cruzadas a TOS y políticas.",
    tokenomics: "Modelo económico TAMV/MSR: emisión, distribución, gobernanza y riesgos regulatorios.",
    utamv: "Capa académica: ORCID/DOI/Zenodo/OpenAIRE y procesos de ciencia abierta verificable.",
    "rdm-territorial": "Modelo de territorio digital: indicadores, smart destinations y capa XR/4D.",
    marketing: "Narrativa de posicionamiento, value proposition y comparativa competitiva TAMV.",
    roadmap: "Hitos 2026–2027, matriz de riesgos y métricas de ejecución transversal.",
    manifiesto: "Manifiesto operativo TAMV y principios de diseño civilizatorio aplicados al producto.",
    lenguaje: "Taxonomía semántica y glosario canónico para consistencia documental inter-módulo.",
  };

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <h2 className="text-lg font-semibold flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-300" /> Panorama de la sección</h2>
      <p className="mt-2 text-sm text-slate-300">{sectionGuides[sectionId]}</p>
    </section>
  );
}

function ChildTemplate({ childKind }: { childKind: "chapter" | "module" | "federation" | "role" }) {
  if (childKind === "chapter") {
    return <TemplateBlock icon={<BookOpen className="w-4 h-4" />} title="Plantilla de capítulo" lines={[
      "Propósito y contexto del capítulo en el sistema civilizatorio.",
      "Ejes y capacidades que habilita.",
      "Métricas, riesgos y dependencias cruzadas.",
    ]} />;
  }

  if (childKind === "module") {
    return <TemplateBlock icon={<Network className="w-4 h-4" />} title="Plantilla de módulo" lines={[
      "Problema que resuelve, actor principal y valor de negocio.",
      "Arquitectura técnica: servicios, eventos, datos y endpoints.",
      "KPIs de adopción y plan de mitigación de riesgos.",
    ]} />;
  }

  if (childKind === "federation") {
    return <TemplateBlock icon={<Building2 className="w-4 h-4" />} title="Plantilla de federación" lines={[
      "Alcance funcional, actores y dominios de información.",
      "Flujos de interoperabilidad y estándares aplicados.",
      "Relación con cumplimiento legal y gobernanza.",
    ]} />;
  }

  return <TemplateBlock icon={<Shield className="w-4 h-4" />} title="Plantilla de rol" lines={[
    "Capacidades y acciones permitidas dentro del ecosistema.",
    "Journey recomendado y puntos de contacto con módulos/federaciones.",
    "Permisos, riesgos operativos y controles de acceso.",
  ]} />;
}

function TemplateBlock({ icon, title, lines }: { icon: ReactNode; title: string; lines: string[] }) {
  return (
    <section className="rounded-xl border border-blue-700/40 bg-blue-950/20 p-5">
      <h2 className="text-lg font-semibold flex items-center gap-2 text-blue-200">{icon} {title}</h2>
      <ul className="mt-3 space-y-2 text-sm text-slate-300 list-disc pl-5">
        {lines.map((line) => <li key={line}>{line}</li>)}
      </ul>
    </section>
  );
}
