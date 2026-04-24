import { useState } from "react";
import { useWikiArticles, useWikiModules } from "@/hooks/useWikiArticles";
import { ArticleCard } from "@/components/wiki/ArticleCard";
import { PaginationBar } from "@/components/wiki/PaginationBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function DynamicWikiHome() {
  const { modules, loading: modulesLoading } = useWikiModules();
  const [search, setSearch] = useState("");
  const [moduleId, setModuleId] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  const { articles, total, totalPages, loading } = useWikiArticles({
    moduleId,
    search,
    page,
    pageSize: 12,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleModule = (id: string | undefined) => {
    setModuleId(id);
    setPage(1);
  };

  return (
    <div className="px-6 py-8 md:px-8 lg:px-10 space-y-6">
      <header className="rounded-xl border border-border bg-card/40 p-5">
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-primary/80">
          WIKI-GEN · Atlas TAMV
        </p>
        <h1 className="text-2xl font-semibold text-foreground mt-1">Wiki dinámica TAMV</h1>
        <p className="text-sm text-muted-foreground mt-2">
          {total} artículos publicados a través de {modules.length} módulos. Búsqueda full-text en
          español + filtros por módulo y rol.
        </p>

        <div className="mt-4 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder='Buscar (ej: "soberanía", "DID", "VC")'
              className="pl-9 pr-9 bg-background"
            />
            {search && (
              <button
                onClick={() => handleSearch("")}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <Button
            variant={moduleId === undefined ? "default" : "outline"}
            size="sm"
            onClick={() => handleModule(undefined)}
          >
            Todos
          </Button>
          {modulesLoading
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-8 w-24" />)
            : modules.map((m) => (
                <Button
                  key={m.id}
                  variant={moduleId === m.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleModule(m.id)}
                  title={m.description ?? ""}
                >
                  {m.title.replace(/^Módulo [^·]+· /, "")}
                </Button>
              ))}
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="rounded-xl border border-border bg-card/40 p-10 text-center">
          <p className="text-muted-foreground">
            No hay artículos para esta combinación de filtros.
          </p>
          <Link to="/wiki" className="text-primary hover:underline text-sm mt-2 inline-block">
            Limpiar filtros
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((a) => {
              const mod = modules.find((m) => m.id === a.module_id);
              return <ArticleCard key={a.id} article={a} moduleSlug={mod?.slug} />;
            })}
          </div>
          <PaginationBar page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
