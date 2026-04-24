CREATE OR REPLACE FUNCTION public.wiki_articles_tsv_update()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  NEW.search_tsv :=
    setweight(to_tsvector('spanish', coalesce(NEW.title,'')), 'A') ||
    setweight(to_tsvector('spanish', coalesce(NEW.summary,'')), 'B') ||
    setweight(to_tsvector('spanish', coalesce(NEW.content_md,'')), 'C') ||
    setweight(to_tsvector('spanish', coalesce(array_to_string(NEW.tags,' '),'')), 'D');
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$function$;