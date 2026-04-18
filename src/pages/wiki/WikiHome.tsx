import { Link } from "react-router-dom";
import { ChevronRight, FolderTree, Layers, Network } from "lucide-react";
import { WIKI_SECTIONS } from "@/data/wikiSchema";
import { wikiStructure } from "@/data/wikiStructure";

const canonicalModules = wikiStructure.filter((section) => {
  const code = Number.parseInt(section.title, 10);
  return Number.isFinite(code) && code >= 0 && code <= 11;
});

export default function WikiHome() {
  const sectionsWithChildren = WIKI_SECTIONS.filter((section) => section.children?.length).length;

  return (
    <div className="min-h-full bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        <header className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-card p-6 md:p-8">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary">TAMV Wiki Engine</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">Wiki TAMV Atlas · Estructura Generativa</h1>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            Mapa maestro dinámico para producir páginas reales desde el blueprint civilizatorio:
            capítulos, módulos, federaciones, roles, blindaje legal y roadmap.
          </p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-border bg-card/80 p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><FolderTree className="w-4 h-4" /> Secciones</div>
              <div className="text-xl font-semibold mt-1">{WIKI_SECTIONS.length}</div>
            </div>
            <div className="rounded-lg border border-border bg-card/80 p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Layers className="w-4 h-4" /> Secciones con subpáginas</div>
              <div className="text-xl font-semibold mt-1">{sectionsWithChildren}</div>
            </div>
            <div className="rounded-lg border border-border bg-card/80 p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Network className="w-4 h-4" /> Federaciones conectadas</div>
              <div className="text-xl font-semibold mt-1">7</div>
            </div>
          </div>
        </header>

        <section className="rounded-xl border border-border bg-card/40 p-5">
          <h2 className="text-lg font-semibold">Índice canónico módulos 0–11</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Primera versión operativa de la malla académica con slugs estables para navegación e indexación.
          </p>
          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {canonicalModules.map((section) => (
              <Link
                key={section.id}
                to={`/wiki/${section.id}`}
                className="rounded-lg border border-border px-3 py-2 text-sm hover:border-primary/60 hover:text-primary transition-colors"
              >
                <span className="font-mono text-xs text-muted-foreground mr-2">{section.icon}</span>
                {section.title}
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {WIKI_SECTIONS.map((section) => (
            <Link
              key={section.id}
              to={`/wiki/${section.id}`}
              className="group rounded-xl border border-border bg-card/40 p-4 hover:border-primary/60 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {section.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary mt-1" />
              </div>

              <div className="mt-3 text-xs text-muted-foreground">
                {section.children?.length
                  ? `Incluye ${section.children.length} subpáginas auto-generables.`
                  : "Sección principal lista para volcado documental."}
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
