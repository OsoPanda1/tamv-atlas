-- Unicidad para upserts seguros y URLs amigables
ALTER TABLE public.wiki_articles
  ADD CONSTRAINT wiki_articles_module_slug_uniq UNIQUE (module_id, slug);

ALTER TABLE public.wiki_modules
  ADD CONSTRAINT wiki_modules_slug_uniq UNIQUE (slug);

-- Índices de soporte para listado paginado y filtrado
CREATE INDEX IF NOT EXISTS wiki_articles_module_idx
  ON public.wiki_articles (module_id, status, access_level);

CREATE INDEX IF NOT EXISTS wiki_articles_search_idx
  ON public.wiki_articles USING GIN (search_tsv);

CREATE INDEX IF NOT EXISTS wiki_articles_tags_idx
  ON public.wiki_articles USING GIN (tags);