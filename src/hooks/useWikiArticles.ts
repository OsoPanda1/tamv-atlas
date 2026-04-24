import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type WikiArticle = Database["public"]["Tables"]["wiki_articles"]["Row"];
export type WikiModule = Database["public"]["Tables"]["wiki_modules"]["Row"];

export interface UseWikiArticlesOptions {
  moduleId?: string;
  search?: string;
  tag?: string;
  page?: number;
  pageSize?: number;
}

export interface UseWikiArticlesResult {
  articles: WikiArticle[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

export function useWikiArticles({
  moduleId,
  search,
  tag,
  page = 1,
  pageSize = 12,
}: UseWikiArticlesOptions = {}): UseWikiArticlesResult {
  const [articles, setArticles] = useState<WikiArticle[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError(null);

      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from("wiki_articles")
        .select("*", { count: "exact" })
        .eq("status", "published")
        .order("is_critical", { ascending: false })
        .order("updated_at", { ascending: false })
        .range(from, to);

      if (moduleId) query = query.eq("module_id", moduleId);
      if (tag) query = query.contains("tags", [tag]);
      if (search && search.trim().length > 1) {
        // websearch_to_tsquery via textSearch
        query = query.textSearch("search_tsv", search.trim(), {
          type: "websearch",
          config: "spanish",
        });
      }

      const { data, error: err, count } = await query;
      if (cancelled) return;
      if (err) setError(err.message);
      setArticles(data ?? []);
      setTotal(count ?? 0);
      setLoading(false);
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [moduleId, search, tag, page, pageSize]);

  return {
    articles,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    loading,
    error,
  };
}

export function useWikiModules() {
  const [modules, setModules] = useState<WikiModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("wiki_modules")
      .select("*")
      .order("index_order", { ascending: true })
      .then(({ data }) => {
        setModules(data ?? []);
        setLoading(false);
      });
  }, []);

  return { modules, loading };
}

export function useWikiArticle(moduleId: string | undefined, slug: string | undefined) {
  const [article, setArticle] = useState<WikiArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!moduleId || !slug) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    supabase
      .from("wiki_articles")
      .select("*")
      .eq("module_id", moduleId)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle()
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) setError(err.message);
        setArticle(data);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [moduleId, slug]);

  return { article, loading, error };
}
