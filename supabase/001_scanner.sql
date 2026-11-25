-- 3DScanner tables in the shared database (11 Oct 2026).
-- Paste into the Supabase SQL editor of the TripPlanner project (ahzfyzjbixskurdkphor) and run.
-- Safe to run twice. Touches nothing that already exists.
-- Locked down: RLS on with no policies, and no grants to anon/authenticated,
-- so only the site's server (service role key) can read or write.

create table if not exists public.scanner_spaces (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  description text,
  luma_url text not null,
  luma_embed_url text
);

create table if not exists public.scanner_notes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  space_id uuid not null references public.scanner_spaces(id) on delete cascade,
  title text not null,
  description text,
  color text not null default 'yellow' check (color in ('yellow', 'blue', 'red', 'green'))
);

create index if not exists scanner_notes_space_idx on public.scanner_notes (space_id, created_at);

alter table public.scanner_spaces enable row level security;
alter table public.scanner_notes enable row level security;

revoke all on public.scanner_spaces from anon, authenticated;
revoke all on public.scanner_notes from anon, authenticated;
