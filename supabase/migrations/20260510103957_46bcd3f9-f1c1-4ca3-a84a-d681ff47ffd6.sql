
-- Extender audit_metrics con columnas operativas
ALTER TABLE public.audit_metrics
  ADD COLUMN IF NOT EXISTS actor uuid,
  ADD COLUMN IF NOT EXISTS event_type text,
  ADD COLUMN IF NOT EXISTS payload jsonb,
  ADD COLUMN IF NOT EXISTS federation_id text;

-- Hacer columnas legacy opcionales para no romper inserts de auditoría
ALTER TABLE public.audit_metrics ALTER COLUMN axis DROP NOT NULL;
ALTER TABLE public.audit_metrics ALTER COLUMN objetivo DROP NOT NULL;
ALTER TABLE public.audit_metrics ALTER COLUMN actual DROP NOT NULL;

-- Article versions
CREATE TABLE IF NOT EXISTS public.article_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES public.wiki_articles(id) ON DELETE CASCADE,
  previous_body text,
  new_body text,
  edited_by uuid,
  edit_reason text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_article_versions_article ON public.article_versions(article_id, created_at DESC);

ALTER TABLE public.article_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Versions public read" ON public.article_versions
  FOR SELECT USING (true);

CREATE POLICY "Versions write dev+" ON public.article_versions
  FOR ALL USING (public.has_min_role(auth.uid(),'dev'))
  WITH CHECK (public.has_min_role(auth.uid(),'dev'));

-- Access requests
CREATE TABLE IF NOT EXISTS public.access_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  requested_role public.app_role NOT NULL,
  reason text,
  status text NOT NULL DEFAULT 'pending',
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own requests" ON public.access_requests
  FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "Users create own requests" ON public.access_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins manage requests" ON public.access_requests
  FOR ALL USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Trigger de versionado de wiki_articles
CREATE OR REPLACE FUNCTION public.wiki_article_version_trigger()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND OLD.content_md IS DISTINCT FROM NEW.content_md THEN
    INSERT INTO public.article_versions(article_id, previous_body, new_body, edited_by)
    VALUES (OLD.id, OLD.content_md, NEW.content_md, auth.uid());
  END IF;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_wiki_article_versioning ON public.wiki_articles;
CREATE TRIGGER trg_wiki_article_versioning
  AFTER UPDATE ON public.wiki_articles
  FOR EACH ROW EXECUTE FUNCTION public.wiki_article_version_trigger();

-- Trigger universal de auditoría
CREATE OR REPLACE FUNCTION public.audit_event_trigger()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE payload jsonb;
BEGIN
  payload := CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE to_jsonb(NEW) END;
  INSERT INTO public.audit_metrics(source, axis, objetivo, actual, actor, event_type, payload)
  VALUES (
    TG_TABLE_NAME,
    TG_TABLE_NAME || ':' || TG_OP,
    0, 0,
    auth.uid(),
    TG_OP,
    payload
  );
  RETURN COALESCE(NEW, OLD);
END; $$;

DROP TRIGGER IF EXISTS trg_audit_wiki_articles ON public.wiki_articles;
CREATE TRIGGER trg_audit_wiki_articles
  AFTER INSERT OR UPDATE OR DELETE ON public.wiki_articles
  FOR EACH ROW EXECUTE FUNCTION public.audit_event_trigger();

DROP TRIGGER IF EXISTS trg_audit_identity ON public.identity_profiles;
CREATE TRIGGER trg_audit_identity
  AFTER INSERT OR UPDATE OR DELETE ON public.identity_profiles
  FOR EACH ROW EXECUTE FUNCTION public.audit_event_trigger();

DROP TRIGGER IF EXISTS trg_audit_access_requests ON public.access_requests;
CREATE TRIGGER trg_audit_access_requests
  AFTER INSERT OR UPDATE OR DELETE ON public.access_requests
  FOR EACH ROW EXECUTE FUNCTION public.audit_event_trigger();
