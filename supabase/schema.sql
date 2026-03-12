-- Run this in the Supabase Dashboard → SQL Editor after creating your project.
-- Replace nothing; auth.uid() and public tables work out of the box.

-- Optional: profile row per user (for display name, avatar, etc.)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_url text,
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Profiles: users can read/update only their own row; insert on signup
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Drinks log (core table for the app)
create table if not exists public.drinks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  beverage_type text not null,
  amount text,
  logged_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists drinks_user_id_logged_at_idx
  on public.drinks (user_id, logged_at desc);

alter table public.drinks enable row level security;

-- Drinks: users can only access their own rows
create policy "Users can view own drinks"
  on public.drinks for select
  using (auth.uid() = user_id);

create policy "Users can insert own drinks"
  on public.drinks for insert
  with check (auth.uid() = user_id);

create policy "Users can update own drinks"
  on public.drinks for update
  using (auth.uid() = user_id);

create policy "Users can delete own drinks"
  on public.drinks for delete
  using (auth.uid() = user_id);

-- Optional: auto-create a profile when a user signs up (run once)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
