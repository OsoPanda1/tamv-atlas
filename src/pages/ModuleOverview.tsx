import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { wikiStructure } from "@/data/wikiStructure";

const PAGE_SIZE = 3;

export default function ModuleOverview() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const moduleIndex = Number(id);

  if (moduleIndex === 0) {
    return <Navigate to="/" replace />;
  }

  const section = Number.isInteger(moduleIndex) ? wikiStructure[moduleIndex] : undefined;

  if (!section) {
    return (
      <div className="pt-8 lg:pt-0 px-6">
        <h1 className="text-2xl font-bold text-foreground mb-3">Módulo no encontrado</h1>
        <p className="text-muted-foreground mb-6">Selecciona un módulo válido dentro del rango disponible.</p>
        <Link to="/" className="text-primary hover:underline">Volver al resumen</Link>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(section.children.length / PAGE_SIZE));
  const requestedPage = Number(searchParams.get("page") ?? "1");
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.min(requestedPage, totalPages) : 1;

  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageItems = section.children.slice(pageStart, pageStart + PAGE_SIZE);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    setSearchParams(params);
  };

  return (
    <div className="pt-8 lg:pt-0 px-6 pb-10">
      <div className="mb-8 space-y-3">
        <p className="text-xs font-mono text-primary mb-2">Módulo {moduleIndex} de {wikiStructure.length - 1}</p>
        <h1 className="text-3xl font-bold text-foreground text-glow-cyan">{section.title}</h1>
        <p className="text-sm text-muted-foreground">
          Página {currentPage}/{totalPages} · Mostrando {pageItems.length} de {section.children.length} capítulos.
        </p>
      </div>

      <div className="grid gap-3">
        {pageItems.map((article, idx) => (
          <Link
            key={article.slug}
            to={`/articulo/${article.slug}`}
            className="bg-card border border-border rounded-lg p-4 hover:border-primary/40 transition-colors"
          >
            <p className="text-xs font-mono text-muted-foreground mb-1">Artículo {pageStart + idx + 1}</p>
            <h2 className="font-medium text-foreground">{article.title}</h2>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => goToPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-sm rounded border border-border disabled:opacity-50"
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => goToPage(pageNumber)}
            className={`px-3 py-1.5 text-sm rounded border transition-colors ${
              pageNumber === currentPage ? "border-primary text-primary" : "border-border text-muted-foreground"
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          type="button"
          onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-sm rounded border border-border disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
