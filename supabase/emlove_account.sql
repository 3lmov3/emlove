-- Emlove — konto użytkownika: dziennik i postępy zapisywane w Supabase.
--
-- Wklej w: Supabase -> SQL Editor -> New query -> Run
--
-- Tabele są chronione RLS: użytkownik widzi i zmienia WYŁĄCZNIE swoje wiersze.
-- Klucz anon (używany przez PWA) nie ma dostępu do cudzych danych.

create extension if not exists "pgcrypto";
create extension if not exists "moddatetime" with schema extensions;

-- ─────────────────────────────────────────────────────────────
-- Wpisy dziennika
-- ─────────────────────────────────────────────────────────────
create table if not exists public.emlove_entries (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  entry_date   date not null,
  entry_time   text not null,
  emotion      text not null,
  emoji        text not null default '',
  intensity    text not null default '5',
  body         jsonb not null default '[]',
  what         text not null default '',
  needs        jsonb not null default '[]',
  need_text    text not null default '',
  i_statement  text not null default '',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists emlove_entries_user_idx
  on public.emlove_entries (user_id);

-- ─────────────────────────────────────────────────────────────
-- Postępy (punkty, ukończone ćwiczenia)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.emlove_progress (
  user_id        uuid primary key references auth.users(id) on delete cascade,
  points         integer not null default 0,
  exercises_done integer not null default 0,
  updated_at     timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- RLS
-- ─────────────────────────────────────────────────────────────
alter table public.emlove_entries  enable row level security;
alter table public.emlove_progress enable row level security;

drop policy if exists "emlove_entries_select" on public.emlove_entries;
drop policy if exists "emlove_entries_insert" on public.emlove_entries;
drop policy if exists "emlove_entries_update" on public.emlove_entries;
drop policy if exists "emlove_entries_delete" on public.emlove_entries;
drop policy if exists "emlove_progress_all"    on public.emlove_progress;

create policy "emlove_entries_select" on public.emlove_entries
  for select using (auth.uid() = user_id);

create policy "emlove_entries_insert" on public.emlove_entries
  for insert with check (auth.uid() = user_id);

create policy "emlove_entries_update" on public.emlove_entries
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "emlove_entries_delete" on public.emlove_entries
  for delete using (auth.uid() = user_id);

create policy "emlove_progress_all" on public.emlove_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- Uprawnienia
--
-- Bez tego PostgREST zwraca 42501 „permission denied for table”,
-- a aplikacja pokazuje „Nie udało się zsynchronizować”.
-- anon jest bezpieczny: RLS dopuszcza tylko wiersze z auth.uid() = user_id.
-- ─────────────────────────────────────────────────────────────
grant usage on schema public to anon, authenticated;

grant select, insert, update, delete
  on public.emlove_entries  to anon, authenticated;

grant select, insert, update, delete
  on public.emlove_progress to anon, authenticated;

grant usage, select on all sequences in schema public to anon, authenticated;

-- ─────────────────────────────────────────────────────────────
-- Zmiana updated_at przy edycji
-- ─────────────────────────────────────────────────────────────
drop trigger if exists emlove_entries_touch on public.emlove_entries;
create trigger emlove_entries_touch
  before update on public.emlove_entries
  for each row execute function moddatetime(updated_at);
