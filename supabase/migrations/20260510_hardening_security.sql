-- ============================================
-- TAMV Atlas Security Hardening
-- Scope: RLS, helper function privilege model, and exposed reads
-- ============================================

begin;

-- ============================================
-- 1) Lock helper function execution surface
-- ============================================

revoke execute on function public.has_role(uuid, public.app_role) from anon;
revoke execute on function public.has_role(uuid, public.app_role) from authenticated;
revoke execute on function public.has_min_role(uuid, public.app_role) from anon;
revoke execute on function public.has_min_role(uuid, public.app_role) from authenticated;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security invoker
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  );
$$;

create or replace function public.has_min_role(_user_id uuid, _min public.app_role)
returns boolean
language sql
stable
security invoker
set search_path = public
as $$
  with role_weights as (
    select case role
      when 'ciudadano' then 0
      when 'dev' then 1
      when 'empresario' then 2
      when 'academia' then 3
      when 'gobierno' then 4
      when 'admin' then 5
    end as weight
    from public.user_roles
    where user_id = _user_id
  )
  select exists (
    select 1 from role_weights
    where weight >= case _min
      when 'ciudadano' then 0
      when 'dev' then 1
      when 'empresario' then 2
      when 'academia' then 3
      when 'gobierno' then 4
      when 'admin' then 5
    end
  );
$$;

grant execute on function public.has_role(uuid, public.app_role) to authenticated;
grant execute on function public.has_min_role(uuid, public.app_role) to authenticated;
revoke execute on function public.has_role(uuid, public.app_role) from anon;
revoke execute on function public.has_min_role(uuid, public.app_role) from anon;

-- ============================================
-- 2) identity_profiles: authenticated read + admin write
-- ============================================

alter table public.identity_profiles enable row level security;

drop policy if exists "Identity public read" on public.identity_profiles;
drop policy if exists "Identity authenticated read" on public.identity_profiles;
drop policy if exists "Identity admin write" on public.identity_profiles;
drop policy if exists "Identity write academia+" on public.identity_profiles;

create policy "Identity authenticated read"
on public.identity_profiles
for select
to authenticated
using (true);

create policy "Identity admin write"
on public.identity_profiles
for all
to authenticated
using (public.has_min_role(auth.uid(),'admin'))
with check (public.has_min_role(auth.uid(),'admin'));

-- ============================================
-- 3) profiles: owner/admin scoped reads and updates
-- ============================================

alter table public.profiles enable row level security;

drop policy if exists "Profiles readable by all" on public.profiles;
drop policy if exists "Profiles owner read" on public.profiles;
drop policy if exists "Profiles owner update" on public.profiles;

create policy "Profiles owner read"
on public.profiles
for select
to authenticated
using (id = auth.uid() or public.has_min_role(auth.uid(),'admin'));

create policy "Profiles owner update"
on public.profiles
for update
to authenticated
using (id = auth.uid() or public.has_min_role(auth.uid(),'admin'))
with check (id = auth.uid() or public.has_min_role(auth.uid(),'admin'));

-- keep existing insert-own-profile behavior

-- ============================================
-- 4) wiki_articles: explicit authenticated access
-- ============================================

alter table public.wiki_articles enable row level security;

drop policy if exists "Articles read by access_level" on public.wiki_articles;
drop policy if exists "Authenticated article access" on public.wiki_articles;

create policy "Authenticated article access"
on public.wiki_articles
for select
to authenticated
using (
  status = 'published'
  and (
    access_level = 'ciudadano'
    or public.has_min_role(auth.uid(), access_level)
  )
);

-- ============================================
-- 5) user_roles visibility restriction
-- ============================================

alter table public.user_roles enable row level security;

drop policy if exists "Users see own roles" on public.user_roles;
drop policy if exists "user_roles read" on public.user_roles;
drop policy if exists "Own role visibility" on public.user_roles;

create policy "Own role visibility"
on public.user_roles
for select
to authenticated
using (user_id = auth.uid() or public.has_min_role(auth.uid(),'admin'));

-- ============================================
-- 6) audit_metrics read restriction
-- ============================================

alter table public.audit_metrics enable row level security;

drop policy if exists "Audit public read" on public.audit_metrics;
drop policy if exists "Audit readable" on public.audit_metrics;
drop policy if exists "Audit admin only" on public.audit_metrics;

create policy "Audit admin only"
on public.audit_metrics
for select
to authenticated
using (public.has_min_role(auth.uid(),'admin'));

-- ============================================
-- 7) reduce broad function exposure in public schema
-- ============================================

revoke all on all functions in schema public from anon;
grant usage on schema public to authenticated;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
grant execute on function public.has_min_role(uuid, public.app_role) to authenticated;

commit;
