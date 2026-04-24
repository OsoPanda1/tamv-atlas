
-- ENUMS
CREATE TYPE public.app_role AS ENUM ('ciudadano','dev','empresario','academia','gobierno','admin');
CREATE TYPE public.article_depth AS ENUM ('intro','tecnico','constitucional','filosofico','juridico','operativo');
CREATE TYPE public.article_status AS ENUM ('draft','review','published','archived');

-- USER_ROLES
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  orcid TEXT,
  did_tamv TEXT,
  locale TEXT NOT NULL DEFAULT 'es-MX',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- has_role / has_min_role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id=_user_id AND role=_role)
$$;

CREATE OR REPLACE FUNCTION public.has_min_role(_user_id UUID, _min public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur WHERE ur.user_id=_user_id AND (
      CASE ur.role WHEN 'ciudadano' THEN 0 WHEN 'dev' THEN 1 WHEN 'empresario' THEN 2
        WHEN 'academia' THEN 3 WHEN 'gobierno' THEN 4 WHEN 'admin' THEN 5 END
    ) >= (
      CASE _min WHEN 'ciudadano' THEN 0 WHEN 'dev' THEN 1 WHEN 'empresario' THEN 2
        WHEN 'academia' THEN 3 WHEN 'gobierno' THEN 4 WHEN 'admin' THEN 5 END
    )
  )
$$;

-- Trigger nuevo usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email,'@',1)));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'ciudadano');
  RETURN NEW;
END;$$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- FEDERATIONS
CREATE TABLE public.federations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  level INT NOT NULL,
  description TEXT NOT NULL,
  color_token TEXT NOT NULL,
  nodes_declared INT NOT NULL DEFAULT 0,
  conceptual_pct INT NOT NULL DEFAULT 0,
  wiring_pct INT NOT NULL DEFAULT 0,
  production_pct INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.federations ENABLE ROW LEVEL SECURITY;

-- WIKI MODULES
CREATE TABLE public.wiki_modules (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  level INT NOT NULL,
  index_order INT NOT NULL DEFAULT 0,
  description TEXT,
  federation_id TEXT REFERENCES public.federations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.wiki_modules ENABLE ROW LEVEL SECURITY;

-- WIKI ARTICLES (tsvector via trigger, no generated column)
CREATE TABLE public.wiki_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  module_id TEXT REFERENCES public.wiki_modules(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  content_md TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  depth public.article_depth NOT NULL DEFAULT 'intro',
  status public.article_status NOT NULL DEFAULT 'published',
  access_level public.app_role NOT NULL DEFAULT 'ciudadano',
  is_critical BOOLEAN NOT NULL DEFAULT false,
  read_minutes INT NOT NULL DEFAULT 5,
  source_doc TEXT,
  view_count INT NOT NULL DEFAULT 0,
  search_tsv tsvector,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.wiki_articles_tsv_update()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.search_tsv :=
    setweight(to_tsvector('spanish', coalesce(NEW.title,'')), 'A') ||
    setweight(to_tsvector('spanish', coalesce(NEW.summary,'')), 'B') ||
    setweight(to_tsvector('spanish', coalesce(NEW.content_md,'')), 'C') ||
    setweight(to_tsvector('spanish', coalesce(array_to_string(NEW.tags,' '),'')), 'D');
  RETURN NEW;
END;$$;

CREATE TRIGGER wiki_articles_tsv_trg
BEFORE INSERT OR UPDATE OF title, summary, content_md, tags
ON public.wiki_articles
FOR EACH ROW EXECUTE FUNCTION public.wiki_articles_tsv_update();

CREATE INDEX wiki_articles_search_idx ON public.wiki_articles USING GIN (search_tsv);
CREATE INDEX wiki_articles_module_idx ON public.wiki_articles (module_id, status);
CREATE INDEX wiki_articles_tags_idx ON public.wiki_articles USING GIN (tags);
ALTER TABLE public.wiki_articles ENABLE ROW LEVEL SECURITY;

-- AUDIT METRICS
CREATE TABLE public.audit_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  axis TEXT NOT NULL,
  actual NUMERIC(5,2) NOT NULL,
  objetivo NUMERIC(5,2) NOT NULL,
  source TEXT NOT NULL DEFAULT 'manual',
  measured_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.audit_metrics ENABLE ROW LEVEL SECURITY;

-- ROADMAP
CREATE TABLE public.roadmap_phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fase TEXT NOT NULL,
  actual NUMERIC(5,2) NOT NULL DEFAULT 0,
  target NUMERIC(5,2) NOT NULL DEFAULT 100,
  milestone TEXT NOT NULL,
  eta DATE,
  index_order INT NOT NULL DEFAULT 0
);
ALTER TABLE public.roadmap_phases ENABLE ROW LEVEL SECURITY;

-- IDENTITY PROFILES
CREATE TABLE public.identity_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  display_name TEXT NOT NULL,
  orcid TEXT, isni TEXT, did TEXT,
  doi_prefix TEXT, zenodo_record TEXT, github_handle TEXT,
  jsonld JSONB,
  trust_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.identity_profiles ENABLE ROW LEVEL SECURITY;

-- GITHUB REPOS
CREATE TABLE public.github_repos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner TEXT NOT NULL,
  name TEXT NOT NULL,
  full_name TEXT NOT NULL UNIQUE,
  description TEXT, language TEXT,
  stars INT NOT NULL DEFAULT 0,
  forks INT NOT NULL DEFAULT 0,
  open_issues INT NOT NULL DEFAULT 0,
  pushed_at TIMESTAMPTZ,
  federation_id TEXT REFERENCES public.federations(id) ON DELETE SET NULL,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.github_repos ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES
CREATE POLICY "Profiles readable by all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid()=id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid()=id);

CREATE POLICY "Users see own roles" ON public.user_roles FOR SELECT
  USING (auth.uid()=user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Federations public read" ON public.federations FOR SELECT USING (true);
CREATE POLICY "Federations admin write" ON public.federations FOR ALL
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Modules public read" ON public.wiki_modules FOR SELECT USING (true);
CREATE POLICY "Modules admin write" ON public.wiki_modules FOR ALL
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Articles read by access_level" ON public.wiki_articles FOR SELECT
  USING (status='published' AND (
    access_level='ciudadano' OR (auth.uid() IS NOT NULL AND public.has_min_role(auth.uid(), access_level))
  ));
CREATE POLICY "Articles write dev+" ON public.wiki_articles FOR ALL
  USING (public.has_min_role(auth.uid(),'dev'))
  WITH CHECK (public.has_min_role(auth.uid(),'dev'));

CREATE POLICY "Audit public read" ON public.audit_metrics FOR SELECT USING (true);
CREATE POLICY "Audit admin write" ON public.audit_metrics FOR ALL
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Roadmap public read" ON public.roadmap_phases FOR SELECT USING (true);
CREATE POLICY "Roadmap admin write" ON public.roadmap_phases FOR ALL
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Identity public read" ON public.identity_profiles FOR SELECT USING (true);
CREATE POLICY "Identity write academia+" ON public.identity_profiles FOR ALL
  USING (public.has_min_role(auth.uid(),'academia'))
  WITH CHECK (public.has_min_role(auth.uid(),'academia'));

CREATE POLICY "Repos public read" ON public.github_repos FOR SELECT USING (true);
CREATE POLICY "Repos admin write" ON public.github_repos FOR ALL
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));

-- updated_at triggers
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;$$;

CREATE TRIGGER touch_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_articles BEFORE UPDATE ON public.wiki_articles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_identity BEFORE UPDATE ON public.identity_profiles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
