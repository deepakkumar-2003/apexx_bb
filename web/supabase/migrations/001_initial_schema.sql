-- Enquiries table
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  package text,
  message text,
  created_at timestamptz default now() not null
);

-- Packages table
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price integer not null,
  duration text not null,
  badge text,
  features text[] default '{}',
  is_active boolean default true not null,
  created_at timestamptz default now() not null
);

-- RLS: enable on both tables
alter table public.enquiries enable row level security;
alter table public.packages enable row level security;

-- enquiries: anyone can insert (form submission), no public reads
create policy "Public can insert enquiries"
  on public.enquiries
  for insert
  to anon
  with check (true);

-- packages: anyone can read active packages (public site)
create policy "Public can read active packages"
  on public.packages
  for select
  to anon
  using (is_active = true);

-- Service role has full access (admin panel uses service role key)
-- No additional policies needed — service role bypasses RLS by default
