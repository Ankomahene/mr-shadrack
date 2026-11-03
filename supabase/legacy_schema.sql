-- Enable UUID extension if not already enabled
create extension if not exists "pgcrypto";

-- 1. Create the work_experiences table
create table if not exists public.work_experiences (
  id uuid default gen_random_uuid() primary key,
  company text not null,
  role text not null,
  period text not null,
  description text[] default '{}',
  skills text[] default '{}',
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.work_experiences enable row level security;

-- 3. Add RLS Policies for work_experiences

-- Allow public read access
create policy "Enable read access for all users"
on public.work_experiences for select
using (true);

-- Allow authenticated users (admin) to insert
create policy "Enable insert for authenticated users only"
on public.work_experiences for insert
with check (auth.role() = 'authenticated');

-- Allow authenticated users (admin) to update
create policy "Enable update for authenticated users only"
on public.work_experiences for update
using (auth.role() = 'authenticated');

-- Allow authenticated users (admin) to delete
create policy "Enable delete for authenticated users only"
on public.work_experiences for delete
using (auth.role() = 'authenticated');


-- 4. Update profile_status table (for the "Hide Status" feature)
-- This adds the is_visible column if it doesn't exist
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name = 'profile_status' and column_name = 'is_visible') then
    alter table public.profile_status add column is_visible boolean default true;
  end if;
end $$;
