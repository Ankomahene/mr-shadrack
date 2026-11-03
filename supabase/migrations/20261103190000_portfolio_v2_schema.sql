-- Portfolio v2 schema: richer projects, experience details, an admin allowlist and an uploads bucket.

begin;

-- ---------------------------------------------------------------------------
-- Admin allowlist. Policies used to trust any authenticated user, which would
-- make anyone who managed to sign up an admin. Only listed users are admins now.
-- ---------------------------------------------------------------------------
create table if not exists public.portfolio_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.portfolio_admins enable row level security;

insert into public.portfolio_admins (user_id)
select id from auth.users
where email in ('ankomaheneshadrack@gmail.com', 'mrshad.abuo@gmail.com')
on conflict do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.portfolio_admins where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "Admins can read the admin list" on public.portfolio_admins;
create policy "Admins can read the admin list" on public.portfolio_admins
  for select using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Projects
-- ---------------------------------------------------------------------------
alter table public.projects
  add column if not exists slug text,
  add column if not exists tagline text,
  add column if not exists overview text,
  add column if not exists category text not null default 'side',
  add column if not exists platforms text[] not null default '{}',
  add column if not exists role text,
  add column if not exists year text,
  add column if not exists repo_url text,
  add column if not exists gallery jsonb not null default '[]'::jsonb,
  add column if not exists highlights text[] not null default '{}',
  add column if not exists accent text,
  add column if not exists featured boolean not null default false,
  add column if not exists is_visible boolean not null default true,
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'projects_slug_key') then
    alter table public.projects add constraint projects_slug_key unique (slug);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'projects_category_check') then
    alter table public.projects add constraint projects_category_check
      check (category in ('product', 'client', 'side'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'projects_slug_format') then
    alter table public.projects add constraint projects_slug_format
      check (slug is null or slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
  end if;
end $$;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_touch_updated_at on public.projects;
create trigger projects_touch_updated_at before update on public.projects
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Work experience
-- ---------------------------------------------------------------------------
alter table public.work_experiences
  add column if not exists location text,
  add column if not exists company_url text,
  add column if not exists summary text;

-- ---------------------------------------------------------------------------
-- Policies: public reads what is published; only admins write.
-- ---------------------------------------------------------------------------
drop policy if exists "Allow public read access for projects" on public.projects;
drop policy if exists "Allow admin all access for projects" on public.projects;
create policy "Public reads visible projects" on public.projects
  for select using (is_visible or public.is_admin());
create policy "Admins manage projects" on public.projects
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Enable insert for authenticated users only" on public.work_experiences;
drop policy if exists "Enable update for authenticated users only" on public.work_experiences;
drop policy if exists "Enable delete for authenticated users only" on public.work_experiences;
create policy "Admins manage work experience" on public.work_experiences
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Allow admin all access for year_in_review" on public.year_in_review;
create policy "Admins manage journal" on public.year_in_review
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Allow admin all access for profile_status" on public.profile_status;
create policy "Admins manage status" on public.profile_status
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Allow admin all access for messages" on public.messages;
create policy "Admins manage messages" on public.messages
  for all using (public.is_admin()) with check (public.is_admin());

-- Public contact form: bounded fields, and it can't mark its own message read.
drop policy if exists "Allow public to insert messages" on public.messages;
create policy "Anyone can send a message" on public.messages
  for insert with check (
    coalesce(is_read, false) = false
    and char_length(name) between 1 and 120
    and char_length(email) between 3 and 254
    and char_length(message) between 1 and 5000
  );

-- ---------------------------------------------------------------------------
-- Storage: public bucket for project screenshots uploaded from the admin.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio', 'portfolio', true, 8388608, array['image/webp', 'image/png', 'image/jpeg', 'image/avif'])
on conflict (id) do update set public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins upload portfolio files" on storage.objects;
drop policy if exists "Admins update portfolio files" on storage.objects;
drop policy if exists "Admins delete portfolio files" on storage.objects;
create policy "Admins upload portfolio files" on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio' and public.is_admin());
create policy "Admins update portfolio files" on storage.objects
  for update to authenticated using (bucket_id = 'portfolio' and public.is_admin());
create policy "Admins delete portfolio files" on storage.objects
  for delete to authenticated using (bucket_id = 'portfolio' and public.is_admin());

commit;
