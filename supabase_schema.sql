-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Year in Review Table
create table public.year_in_review (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  date date not null default current_date,
  category text check (category in ('Work', 'Life', 'Learning', 'Achievement', 'Other')),
  media_url text,
  tags text[],
  created_at timestamptz default now()
);

-- Profile Status Table (Single row expected usually, or latest)
create table public.profile_status (
  id uuid default uuid_generate_v4() primary key,
  status_text text not null,
  project_link text,
  is_available boolean default true,
  updated_at timestamptz default now()
);

-- Projects Table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  link text,
  image_url text,
  tags text[],
  created_at timestamptz default now()
);

-- Messages Table (for Contact Form)
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.year_in_review enable row level security;
alter table public.profile_status enable row level security;
alter table public.projects enable row level security;
alter table public.messages enable row level security;

-- Create Policies
-- Allow read access to everyone for public content
create policy "Allow public read access for year_in_review" on public.year_in_review for select using (true);
create policy "Allow public read access for profile_status" on public.profile_status for select using (true);
create policy "Allow public read access for projects" on public.projects for select using (true);

-- Allow authenticated users (admin) to do everything
create policy "Allow admin all access for year_in_review" on public.year_in_review for all using (auth.role() = 'authenticated');
create policy "Allow admin all access for profile_status" on public.profile_status for all using (auth.role() = 'authenticated');
create policy "Allow admin all access for projects" on public.projects for all using (auth.role() = 'authenticated');
create policy "Allow admin all access for messages" on public.messages for all using (auth.role() = 'authenticated');

-- Allow public to insert messages (Contact Form)
create policy "Allow public to insert messages" on public.messages for insert with check (true);
