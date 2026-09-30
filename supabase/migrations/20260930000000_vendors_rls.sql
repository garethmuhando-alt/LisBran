-- LisBran: supplier listings, admin approval and Row Level Security.
-- Run in the Supabase SQL editor (or `supabase db push`). Safe to re-run.

create extension if not exists pgcrypto;

create table if not exists public.vendors (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  category text,
  email text,
  phone text,
  bio text,
  price_rating text,
  social_link text,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

-- Listing fields used by the job tensioner (turnaround, tier, starting price, city).
alter table public.vendors add column if not exists city text;
alter table public.vendors add column if not exists turnaround text check (turnaround in ('standard', '24h', 'overnight'));
alter table public.vendors add column if not exists budget text check (budget in ('low', 'mid', 'premium'));
alter table public.vendors add column if not exists price_from integer check (price_from >= 0);

create table if not exists public.admin_notifications (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  message text not null,
  vendor_id uuid references public.vendors (id) on delete cascade,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Admin = a user whose app_metadata.role is 'admin'. app_metadata can only be
-- set with the service role (dashboard or server), never by the user.
create or replace function public.is_admin() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
$$;

alter table public.vendors enable row level security;
alter table public.admin_notifications enable row level security;

drop policy if exists "Public reads verified vendors" on public.vendors;
drop policy if exists "Sellers read own listing" on public.vendors;
drop policy if exists "Admins read all vendors" on public.vendors;
drop policy if exists "Anyone applies as unverified" on public.vendors;
drop policy if exists "Admins update vendors" on public.vendors;
drop policy if exists "Admins delete vendors" on public.vendors;

create policy "Public reads verified vendors" on public.vendors
  for select using (verified = true);

create policy "Sellers read own listing" on public.vendors
  for select to authenticated
  using (
    email = auth.jwt() ->> 'email'
    or replace(coalesce(phone, ''), '+', '') = coalesce(auth.jwt() ->> 'phone', '-')
  );

create policy "Admins read all vendors" on public.vendors
  for select to authenticated using (public.is_admin());

create policy "Anyone applies as unverified" on public.vendors
  for insert with check (verified = false);

create policy "Admins update vendors" on public.vendors
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Admins delete vendors" on public.vendors
  for delete to authenticated using (public.is_admin());

drop policy if exists "Anyone files a new-vendor notice" on public.admin_notifications;
drop policy if exists "Admins manage notifications" on public.admin_notifications;

create policy "Anyone files a new-vendor notice" on public.admin_notifications
  for insert with check (type = 'new_vendor' and read = false);

create policy "Admins manage notifications" on public.admin_notifications
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
