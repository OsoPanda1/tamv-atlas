import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ComponentType, ReactNode } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AuthPage from "@/pages/Auth";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import Index from "@/pages/Index";
import WikiHome from "@/pages/WikiHome";
import ModuleOverview from "@/pages/ModuleOverview";
import NotFound from "@/pages/NotFound";
import CivilizationStreamPage from "@/pages/CivilizationStreamPage";
import Auditoria from "@/pages/Auditoria";
import IdentidadDemo from "@/pages/IdentidadDemo";
import InvestigacionNodo001 from "@/pages/InvestigacionNodo001";
import DynamicWikiHome from "@/pages/wiki/WikiHome";
import WikiPage from "@/pages/wiki/WikiPage";
import { wikiStructure } from "@/data/wikiStructure";
import { articleBySlug, getAdjacentArticles } from "@/lib/wikiNavigation";

type WikiModule = {
  id: number;
  code: string;
  path: string;
  label: string;
  description: string;
};

const WIKI_MODULES: WikiModule[] = [
  { id: 0, code: "MD-X4", path: "/", label: "Módulo 0 · Observabilidad", description: "MD-X4 · Núcleo de observabilidad civilizatoria TAMV." },
  { id: 1, code: "ISNI-CORE", path: "/modulo/1", label: "Módulo 1 · Fundamentos ISNI", description: "Arquitectura base de la Infraestructura Soberana de Nombres." },
  { id: 2, code: "ISNI-ARCH", path: "/modulo/2", label: "Módulo 2 · Arquitectura ISNI", description: "Capas, dominios y ontologías del sistema ISNI TAMV." },
  { id: 3, code: "IDENTITIES", path: "/modulo/3", label: "Módulo 3 · Modelado de Identidades", description: "Personas, instituciones, territorios y roles." },
  { id: 4, code: "SSI-DID", path: "/modulo/4", label: "Módulo 4 · SSI / DID", description: "Identidad autosoberana y descentralizada en TAMV." },
  { id: 5, code: "PROFILES", path: "/modulo/5", label: "Módulo 5 · Sistema de Perfiles", description: "Perfiles TAMV, vistas y proyecciones." },
  { id: 6, code: "FLOWS", path: "/modulo/6", label: "Módulo 6 · Flujos & Visualizaciones", description: "Pipelines y UI de identidades en movimiento." },
  { id: 7, code: "USE-CASES", path: "/modulo/7", label: "Módulo 7 · Casos de Uso SSI", description: "Aplicaciones en campus, ciudades y metaversos." },
  { id: 8, code: "APIS", path: "/modulo/8", label: "Módulo 8 · Implementación Técnica / API", description: "Especificación de servicios y endpoints soberanos." },
  { id: 9, code: "AUTOMATION", path: "/modulo/9", label: "Módulo 9 · Automatización", description: "Bots, orquestación y flujos automáticos." },
  { id: 10, code: "GOV", path: "/modulo/10", label: "Módulo 10 · Gobernanza & Ética", description: "Normas, principios y modelo de poder distribuido." },
  { id: 11, code: "REFS", path: "/modulo/11", label: "Módulo 11 · Referencias", description: "Bibliografía, DOIs, ORCID, Zenodo y anexos." },
  { id: 12, code: "XR-AI", path: "/modulo/12", label: "Módulo 12 · Metaverso / XR / IA", description: "Isabella AI, DreamSpaces, Kórima, DEKATEOTL." },
  { id: 13, code: "OMEGA", path: "/modulo/13", label: "Módulo Ω · Filosofía e innovación", description: "Manifiesto TAMV, posicionamiento e inteligencia editorial viva." },
];

const wikiPageModules = import.meta.glob<{ default: ComponentType }>("./pages/wiki/**/*.tsx", {
  eager: true,
});

const slugifyFileName = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();

const discoveredComponents = Object.entries(wikiPageModules).reduce<
  Record<string, Record<string, ComponentType>>
>((acc, [path, module]) => {
  const match = path.match(/\.\/pages\/wiki\/(.+)\/([^/]+)\.tsx$/);
  if (!match) return acc;
  const [, sectionId, fileName] = match;
  const slug = slugifyFileName(fileName);
  acc[sectionId] ??= {};
  acc[sectionId][slug] = module.default;
  return acc;
}, {});

const aliasByPageKey: Record<string, string> = {
  "arquitectura/ontologia-formal": "arquitectura/ontologias-datos",
  "arquitectura/arquitectura-interoperable": "arquitectura/interoperabilidad",
  "ssi-did/credenciales-vc": "identidad/credenciales-vc",
  "gobernanza/gobernanza-documental": "gobernanza/gobernanza-datos",
};

const resolveComponent = (sectionId: string, slug: string) => {
  const direct = discoveredComponents[sectionId]?.[slug];
  if (direct) return direct;

  const alias = aliasByPageKey[`${sectionId}/${slug}`];
  if (!alias) return undefined;

  const [aliasSectionId, aliasSlug] = alias.split("/");
  return discoveredComponents[aliasSectionId]?.[aliasSlug];
};

const articleIndex = wikiStructure.flatMap((section, moduleIndex) =>
  section.children.map((page) => ({
    moduleId: moduleIndex.toString(),
    sectionId: section.id,
    sectionTitle: section.title,
    slug: page.slug,
    title: page.title,
    component: resolveComponent(section.id, page.slug),
  }))
);

function ArticleRouter() {
  const { slug } = useParams();
  const article = articleIndex.find((item) => item.slug === slug);

  if (!article?.component || !slug) return <Navigate to="/resumen" replace />;

  const canonical = articleBySlug.get(slug);
  const ArticleComponent = article.component;
  const { previous, next } = getAdjacentArticles(slug);

  return (
    <div className="px-6 py-8 md:px-8 lg:px-10 space-y-6">
      <header className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 md:p-5">
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-blue-300/80">
          {canonical?.moduleTitle ?? article.sectionTitle}
        </p>
        <h1 className="text-xl md:text-2xl font-semibold text-slate-100 mt-1">{article.title}</h1>
        <p className="text-xs text-slate-400 mt-2">Ruta canónica: /articulo/{article.slug}</p>
      </header>

      <ArticleComponent />

      <footer className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 flex flex-wrap items-center justify-between gap-3">
        {previous ? (
          <Link to={`/articulo/${previous.slug}`} className="text-sm text-slate-300 hover:text-blue-300 transition-colors">
            ← {previous.title}
          </Link>
        ) : (
          <span className="text-sm text-slate-500">Inicio del atlas</span>
        )}
        {next ? (
          <Link to={`/articulo/${next.slug}`} className="text-sm text-slate-300 hover:text-blue-300 transition-colors ml-auto">
            {next.title} →
          </Link>
        ) : (
          <span className="text-sm text-slate-500 ml-auto">Fin del atlas</span>
        )}
      </footer>
    </div>
  );
}

function LegacyWikiRouter() {
  const { sectionId, pageSlug } = useParams();
  if (!sectionId || !pageSlug) return <Navigate to="/resumen" replace />;

  const article = articleIndex.find((item) => item.sectionId === sectionId && item.slug === pageSlug);
  if (!article) return <Navigate to="/resumen" replace />;

  return <Navigate to={`/articulo/${article.slug}`} replace />;
}

const AppShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-slate-950 text-slate-200">
    <header className="border-b border-blue-500/20 bg-slate-950/80 backdrop-blur-md px-4 py-2 flex items-center justify-between text-[11px] tracking-[0.25em] uppercase">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#4ade80]" />
        <span className="text-slate-400">TAMV·ONLINE // Digital Civilization System v1.0</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-blue-400/80">Kernel: MD-X · ISNI · UTAMV · Isabella</span>
        <span className="text-slate-500 hidden md:inline">DOI: 10.5281/ZENODO.19564367</span>
      </div>
    </header>

    <div className="grid grid-cols-12 gap-0 h-[calc(100vh-40px)]">
      <aside className="hidden lg:block col-span-2 border-r border-slate-800 bg-slate-950/90 backdrop-blur-sm text-[11px]">
        <div className="px-4 py-3 border-b border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Atlas TAMV · ISNI</p>
          <p className="text-[9px] text-slate-500">14 módulos · ~66 artículos · Infraestructura viva</p>
        </div>
        <nav className="overflow-y-auto h-[calc(100vh-88px)] scrollbar-thin">
          <ul className="py-2">
            {WIKI_MODULES.map((mod) => (
              <li key={mod.id}>
                <Link
                  to={mod.path}
                  className="flex flex-col gap-0.5 px-4 py-2 border-l-2 border-transparent hover:border-blue-500/70 hover:bg-slate-900/60 transition-colors"
                >
                  <span className="text-[9px] text-blue-400">{mod.code}</span>
                  <span className="text-[10px] text-slate-200">{mod.label}</span>
                  <span className="text-[9px] text-slate-500 line-clamp-1">{mod.description}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/resumen"
                className="flex flex-col gap-0.5 px-4 py-2 border-l-2 border-transparent hover:border-blue-500/70 hover:bg-slate-900/60 transition-colors"
              >
                <span className="text-[9px] text-blue-400">ATLAS-INDEX</span>
                <span className="text-[10px] text-slate-200">Resumen e índice global</span>
                <span className="text-[9px] text-slate-500 line-clamp-1">Navega módulos y artículos enlazables.</span>
              </Link>
            </li>
            <li>
              <Link
                to="/wiki"
                className="flex flex-col gap-0.5 px-4 py-2 border-l-2 border-transparent hover:border-emerald-500/70 hover:bg-slate-900/60 transition-colors"
              >
                <span className="text-[9px] text-emerald-400">WIKI-GEN</span>
                <span className="text-[10px] text-slate-200">Wiki dinámica TAMV</span>
                <span className="text-[9px] text-slate-500 line-clamp-1">Secciones y subpáginas autogeneradas por esquema.</span>
              </Link>
            </li>
            <li>
              <Link
                to="/stream"
                className="flex flex-col gap-0.5 px-4 py-2 border-l-2 border-transparent hover:border-blue-500/70 hover:bg-slate-900/60 transition-colors"
              >
                <span className="text-[9px] text-blue-400">CIV-STREAM</span>
                <span className="text-[10px] text-slate-200">Paginación civilizatoria</span>
                <span className="text-[9px] text-slate-500 line-clamp-1">Timeline por módulos, filtros por rol y Flow Lens.</span>
              </Link>
            </li>
            <li>
              <Link
                to="/auditoria"
                className="flex flex-col gap-0.5 px-4 py-2 border-l-2 border-transparent hover:border-accent/70 hover:bg-slate-900/60 transition-colors"
              >
                <span className="text-[9px] text-accent">AUDIT-MAX</span>
                <span className="text-[10px] text-slate-200">Auditoría Máxima v1.0</span>
                <span className="text-[9px] text-slate-500 line-clamp-1">Dashboard de avance + blindaje legal UNESCO/GDPR/ICCPR/UNDRIP.</span>
              </Link>
            </li>
            <li>
              <Link
                to="/identidad-demo"
                className="flex flex-col gap-0.5 px-4 py-2 border-l-2 border-transparent hover:border-primary/70 hover:bg-slate-900/60 transition-colors"
              >
                <span className="text-[9px] text-primary">SSI-FLOW</span>
                <span className="text-[10px] text-slate-200">Demo identidad E2E</span>
                <span className="text-[9px] text-slate-500 line-clamp-1">Firma y verificación de credenciales UTAMV con DID.</span>
              </Link>
            </li>
            <li>
              <Link
                to="/investigacion/nodo-001"
                className="flex flex-col gap-0.5 px-4 py-2 border-l-2 border-transparent hover:border-primary/70 hover:bg-slate-900/60 transition-colors"
              >
                <span className="text-[9px] text-primary">RESEARCH-001</span>
                <span className="text-[10px] text-slate-200">Informe Nodo 001</span>
                <span className="text-[9px] text-slate-500 line-clamp-1">Matriz de evidencia y verificaciones pendientes.</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="col-span-12 lg:col-span-10 h-full overflow-auto">{children}</main>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/resumen" element={<WikiHome />} />
            <Route path="/wiki" element={<DynamicWikiHome />} />
            <Route path="/wiki/:sectionId" element={<WikiPage />} />
            <Route path="/wiki/:sectionId/:slug" element={<WikiPage />} />
            <Route path="/stream" element={<CivilizationStreamPage />} />
            <Route path="/auditoria" element={<Auditoria />} />
            <Route path="/identidad-demo" element={<IdentidadDemo />} />
            <Route path="/investigacion/nodo-001" element={<InvestigacionNodo001 />} />
            <Route path="/modulo/:id" element={<ModuleOverview />} />
            <Route path="/articulo/:slug" element={<ArticleRouter />} />
            <Route path="/wiki-legacy/:sectionId/:pageSlug" element={<LegacyWikiRouter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
