begin;

-- Force strict write authorization on collaborative content tables.
alter table public.wiki_articles enable row level security;
drop policy if exists "Wiki articles admin write" on public.wiki_articles;
create policy "Wiki articles admin write"
on public.wiki_articles
for all
to authenticated
using (public.has_min_role(auth.uid(),'admin'))
with check (public.has_min_role(auth.uid(),'admin'));

alter table public.article_versions enable row level security;
drop policy if exists "Article versions admin read" on public.article_versions;
drop policy if exists "Article versions admin write" on public.article_versions;
create policy "Article versions admin read"
on public.article_versions
for select
to authenticated
using (public.has_min_role(auth.uid(),'admin'));

create policy "Article versions admin write"
on public.article_versions
for all
to authenticated
using (public.has_min_role(auth.uid(),'admin'))
with check (public.has_min_role(auth.uid(),'admin'));

-- Access requests are user-owned; only admins can update request outcomes.
alter table public.access_requests enable row level security;
drop policy if exists "Access request owner insert" on public.access_requests;
drop policy if exists "Access request owner read" on public.access_requests;
drop policy if exists "Access request admin update" on public.access_requests;

create policy "Access request owner insert"
on public.access_requests
for insert
to authenticated
with check (user_id = auth.uid());

create policy "Access request owner read"
on public.access_requests
for select
to authenticated
using (user_id = auth.uid() or public.has_min_role(auth.uid(),'admin'));

create policy "Access request admin update"
on public.access_requests
for update
to authenticated
using (public.has_min_role(auth.uid(),'admin'))
with check (public.has_min_role(auth.uid(),'admin'));

-- No anonymous writes anywhere in public schema.
revoke insert, update, delete on all tables in schema public from anon;

commit;
