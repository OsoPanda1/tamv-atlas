import { useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useWikiArticle, useWikiArticles, useWikiModules } from "@/hooks/useWikiArticles";
import { ArticleCard } from "@/components/wiki/ArticleCard";
import { PaginationBar } from "@/components/wiki/PaginationBar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

function ModuleArticleList({ moduleId, moduleSlug }: { moduleId: string; moduleSlug: string }) {
  const [page, setPage] = useState(1);
  const { articles, totalPages, total, loading } = useWikiArticles({
    moduleId,
    page,
    pageSize: 9,
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    );
  }

  return (
    <>
      <p className="text-xs text-muted-foreground mb-3">{total} artículos en este módulo</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} moduleSlug={moduleSlug} />
        ))}
      </div>
      <PaginationBar page={page} totalPages={totalPages} onChange={setPage} />
    </>
  );
}

function ArticleView({
  moduleId,
  slug,
  moduleSlug,
}: {
  moduleId: string;
  slug: string;
  moduleSlug: string;
}) {
  const { article, loading } = useWikiArticle(moduleId, slug);

  if (loading) return <Skeleton className="h-96 w-full" />;
  if (!article) {
    return (
      <div className="rounded-xl border border-border bg-card/40 p-8 text-center">
        <p className="text-muted-foreground">Artículo no disponible o sin permisos suficientes.</p>
        <Link
          to={`/wiki/${moduleSlug}`}
          className="text-primary hover:underline text-sm mt-2 inline-block"
        >
          Volver al módulo
        </Link>
      </div>
    );
  }

  return (
    <article className="space-y-4">
      <header className="rounded-xl border border-border bg-card/40 p-5">
        <Link
          to={`/wiki/${moduleSlug}`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="w-3 h-3" /> volver al módulo
        </Link>
        <h1 className="text-2xl font-semibold text-foreground mt-2">{article.title}</h1>
        <p className="text-sm text-muted-foreground mt-2">{article.summary}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          <Badge variant="outline">{article.depth}</Badge>
          <Badge variant="secondary">{article.access_level}</Badge>
          <Badge variant="outline">{article.read_minutes} min</Badge>
          {article.tags.map((t) => (
            <Badge key={t} variant="outline" className="text-[10px]">
              #{t}
            </Badge>
          ))}
        </div>
      </header>

      <div className="rounded-xl border border-border bg-card/40 p-6">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted-foreground">
          {article.content_md}
        </pre>
      </div>
    </article>
  );
}

export default function WikiPage() {
  const { sectionId, slug } = useParams();
  const { modules, loading } = useWikiModules();

  const mod = useMemo(
    () => modules.find((m) => m.slug === sectionId || m.id === sectionId),
    [modules, sectionId]
  );

  if (loading) {
    return (
      <div className="px-6 py-8 md:px-8 lg:px-10 space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!mod) return <Navigate to="/wiki" replace />;

  return (
    <div className="px-6 py-8 md:px-8 lg:px-10 space-y-6">
      <header className="rounded-xl border border-border bg-card/40 p-5">
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-primary/80">
          {mod.id.toUpperCase()}
        </p>
        <h1 className="text-2xl font-semibold text-foreground mt-1">{mod.title}</h1>
        {mod.description && (
          <p className="text-sm text-muted-foreground mt-2">{mod.description}</p>
        )}
        <div className="mt-3">
          <Button asChild variant="outline" size="sm">
            <Link to="/wiki">← Wiki dinámica</Link>
          </Button>
        </div>
      </header>

      {slug ? (
        <ArticleView moduleId={mod.id} slug={slug} moduleSlug={mod.slug} />
      ) : (
        <ModuleArticleList moduleId={mod.id} moduleSlug={mod.slug} />
      )}
    </div>
  );
}
