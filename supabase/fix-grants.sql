-- Naprawa uprawnień do tabel Emlove.
--
-- Objaw: PWA po zalogowaniu pokazuje „Nie udało się zsynchronizować”.
-- Przyczyna: tabele zostały utworzone, ale nikt nie nadał im GRANT-ów.
-- PostgREST zwraca wtedy 42501 „permission denied for table”.
--
-- Uruchom w: Supabase -> SQL Editor -> New query -> Run
-- Można uruchamiać wielokrotnie (idempotentne).

-- ─────────────────────────────────────────────────────────────
-- Dostęp do schematu
-- ─────────────────────────────────────────────────────────────
grant usage on schema public to anon, authenticated;

-- ─────────────────────────────────────────────────────────────
-- Uprawnienia do tabel
--
-- anon jest bezpieczny: polityki RLS dopuszczają tylko wiersze,
-- gdzie auth.uid() = user_id. Dla anon auth.uid() jest NULL,
-- więc anon i tak nie zobaczy żadnego wiersza.
-- ─────────────────────────────────────────────────────────────
grant select, insert, update, delete
  on public.emlove_entries
  to anon, authenticated;

grant select, insert, update, delete
  on public.emlove_progress
  to anon, authenticated;

-- ─────────────────────────────────────────────────────────────
-- Sekwencje (na wypadek gdyby tabela ich używała)
-- ─────────────────────────────────────────────────────────────
grant usage, select on all sequences in schema public to anon, authenticated;

-- ─────────────────────────────────────────────────────────────
-- Weryfikacja
-- ─────────────────────────────────────────────────────────────
select
  table_name,
  grantee,
  string_agg(privilege_type, ', ' order by privilege_type) as uprawnienia
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name in ('emlove_entries', 'emlove_progress')
  and grantee in ('anon', 'authenticated')
group by table_name, grantee
order by table_name, grantee;
