import { useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  useWikiArticle,
  useWikiArticles,
  useWikiModules,
} from "@/hooks/useWikiArticles";

import { ArticleCard } from "@/components/wiki/ArticleCard";
import { PaginationBar } from "@/components/wiki/PaginationBar";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  ChevronLeft,
  BookOpen,
  Layers3,
  Clock3,
  Shield,
} from "lucide-react";

/* ============================================================
   VISUAL WRAPPERS
============================================================ */

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[15%] w-[30rem] h-[30rem] rounded-full blur-[140px] bg-cyan-500/8" />
      <div className="absolute bottom-[-20%] right-[10%] w-[34rem] h-[34rem] rounded-full blur-[180px] bg-indigo-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_70%)]" />
    </div>
  );
}

/* ============================================================
   MODULE LIST
============================================================ */

function ModuleArticleList({
  moduleId,
  moduleSlug,
}: {
  moduleId: string;
  moduleSlug: string;
}) {
  const [page, setPage] = useState(1);

  const { articles, totalPages, total, loading } = useWikiArticles({
    moduleId,
    page,
    pageSize: 9,
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-56 rounded-2xl bg-slate-900/60"
          />
        ))}
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-slate-400">
          {total} ARTÍCULOS DISPONIBLES
        </p>

        <div className="flex items-center gap-2 text-xs text-cyan-300">
          <Layers3 className="w-3.5 h-3.5" />
          KNOWLEDGE GRID
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {articles.map((a) => (
          <div
            key={a.id}
            className="transition-all duration-500 hover:scale-[1.02]"
          >
            <ArticleCard article={a} moduleSlug={moduleSlug} />
          </div>
        ))}
      </div>

      <PaginationBar
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </section>
  );
}

/* ============================================================
   ARTICLE VIEW
============================================================ */

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

  if (loading)
    return (
      <Skeleton className="h-[34rem] rounded-3xl bg-slate-900/60" />
    );

  if (!article) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-950/20 p-10 text-center">
        <p className="text-red-300 text-sm">
          Artículo no disponible
        </p>

        <Link
          to={`/wiki/${moduleSlug}`}
          className="text-cyan-300 hover:underline mt-4 inline-block"
        >
          Regresar
        </Link>
      </div>
    );
  }

  return (
    <article className="space-y-6">
      {/* HEADER */}
      <header className="relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-slate-950/70 backdrop-blur-xl p-8">
        <AuroraBackground />

        <div className="relative z-10">
          <Link
            to={`/wiki/${moduleSlug}`}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300"
          >
            <ChevronLeft className="w-3 h-3" />
            REGRESAR AL MÓDULO
          </Link>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white">
            {article.title}
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300 leading-relaxed">
            {article.summary}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-500/20">
              <BookOpen className="w-3 h-3 mr-1" />
              {article.depth}
            </Badge>

            <Badge className="bg-indigo-500/10 text-indigo-300 border-indigo-500/20">
              <Shield className="w-3 h-3 mr-1" />
              {article.access_level}
            </Badge>

            <Badge className="bg-white/5 text-slate-300 border-white/10">
              <Clock3 className="w-3 h-3 mr-1" />
              {article.read_minutes} min
            </Badge>

            {article.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] border-slate-700"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="rounded-3xl border border-white/5 bg-slate-950/80 backdrop-blur-xl p-8">
        <div className="prose prose-invert prose-slate max-w-none">
          <div className="text-[15px] leading-8 text-slate-300 whitespace-pre-wrap">
            {article.content_md}
          </div>
        </div>
      </section>
    </article>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function WikiPage() {
  const { sectionId, slug } = useParams();

  const { modules, loading } = useWikiModules();

  const mod = useMemo(
    () =>
      modules.find(
        (m) => m.slug === sectionId || m.id === sectionId
      ),
    [modules, sectionId]
  );

  if (loading) {
    return (
      <div className="px-8 py-10 space-y-6">
        <Skeleton className="h-40 rounded-3xl" />
        <Skeleton className="h-[32rem] rounded-3xl" />
      </div>
    );
  }

  if (!mod) return <Navigate to="/wiki" replace />;

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      <AuroraBackground />

      <div className="relative z-10 px-8 py-10 md:px-12 xl:px-20 space-y-8">
        {/* MODULE HEADER */}
        <header className="rounded-3xl border border-cyan-500/10 bg-slate-950/80 backdrop-blur-xl p-8">
          <p className="text-[11px] font-mono tracking-[0.25em] text-cyan-300 uppercase">
            {mod.id}
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            {mod.title}
          </h1>

          {mod.description && (
            <p className="mt-4 max-w-3xl text-slate-400 leading-relaxed">
              {mod.description}
            </p>
          )}

          <div className="mt-6">
            <Button
              asChild
              variant="outline"
              className="border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10"
            >
              <Link to="/wiki">← Núcleo Atlas</Link>
            </Button>
          </div>
        </header>

        {slug ? (
          <ArticleView
            moduleId={mod.id}
            slug={slug}
            moduleSlug={mod.slug}
          />
        ) : (
          <ModuleArticleList
            moduleId={mod.id}
            moduleSlug={mod.slug}
          />
        )}
      </div>
    </div>
  );
}
