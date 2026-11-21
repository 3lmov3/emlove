-- Emlove: przygotowanie bezpieczniejszego czyszczenia nieaktywnych sesji.
-- Instalacja NIE usuwa kont ani nie planuje zadań.
-- Uruchom po migracjach 202611210001, 202611210002 i 202611210003.
-- Dzień jest liczony według UTC. Migracja nie usuwa istniejących liczników.
-- Nie zapisuje treści wypowiedzi ani adresów IP.

begin;

create table if not exists public.milo_global_daily_quota (
  quota_day date primary key,
  used integer not null default 0 check (used >= 0)
);
alter table public.milo_global_daily_quota enable row level security;
revoke all on public.milo_global_daily_quota from public, anon, authenticated;

-- Osobna prywatna tabela zapisuje jedynie ID sesji i czas ostatniej próby,
-- która przeszła weryfikację w funkcji Milo. Nie zapisuje treści ani IP.
create table if not exists public.milo_user_activity (
  user_id uuid primary key,
  last_used_at timestamptz not null
);
alter table public.milo_user_activity enable row level security;
revoke all on public.milo_user_activity from public, anon, authenticated;

create or replace function public.milo_consume_quota(p_user uuid, p_limit integer)
returns boolean
language plpgsql security definer set search_path = public, pg_temp
as $$
declare
  quota_date date := (now() at time zone 'UTC')::date;
  global_used integer;
  user_used integer;
begin
  if p_user is null or p_limit is null or p_limit < 1 or p_limit > 100 then
    return false;
  end if;

  -- Ta sama blokada jest używana przez funkcję sprzątającą: usuwa wyścig
  -- pomiędzy uznaniem sesji za nieaktywną a przyjęciem żądania do limitu.
  perform pg_advisory_xact_lock(hashtextextended('emlove-milo:' || p_user::text, 0));
  -- Użytkownik mógł zostać usunięty po weryfikacji tokenu przez Edge Function.
  if not exists (select 1 from auth.users where id = p_user and is_anonymous is true) then
    return false;
  end if;

  -- Aktualizujemy również, gdy limit globalny lub konta został wyczerpany.
  -- Podczas wcześniejszych błędów, np. funkcja wyłączona, nie dochodzi do RPC.
  insert into public.milo_user_activity(user_id, last_used_at)
    values (p_user, now())
    on conflict (user_id) do update set last_used_at = excluded.last_used_at;

  -- Blokada dziennego licznika globalnego serializuje równoległe próby.
  insert into public.milo_global_daily_quota(quota_day, used)
    values (quota_date, 0) on conflict (quota_day) do nothing;
  select used into global_used
    from public.milo_global_daily_quota
    where quota_day = quota_date for update;
  if global_used >= 50 then return false; end if;

  insert into public.milo_daily_quota(user_id, quota_day, used)
    values (p_user, quota_date, 0) on conflict (user_id, quota_day) do nothing;
  select used into user_used
    from public.milo_daily_quota
    where user_id = p_user and quota_day = quota_date for update;
  if user_used >= p_limit then return false; end if;

  update public.milo_global_daily_quota set used = used + 1
    where quota_day = quota_date;
  update public.milo_daily_quota set used = used + 1
    where user_id = p_user and quota_day = quota_date;
  return true;
end $$;

revoke all on function public.milo_consume_quota(uuid, integer) from public, anon, authenticated;
grant execute on function public.milo_consume_quota(uuid, integer) to service_role;

-- Funkcja nie jest zaplanowana automatycznie przez tę migrację.
-- Zwraca tylko liczbę usuniętych i chwilowo pominiętych kont.
create or replace function public.milo_cleanup_inactive()
returns table(deleted_count integer, busy_count integer)
language plpgsql security invoker set search_path = pg_catalog, public, pg_temp
as $$
declare
  candidate record;
  still_inactive boolean;
  n_deleted integer := 0;
  n_busy integer := 0;
begin
  -- Maksymalnie 100 kandydatów na jedno uruchomienie; starsze pierwsze.
  for candidate in
    select u.id
    from auth.users u
    left join public.milo_user_activity a on a.user_id = u.id
    where u.is_anonymous is true
      and greatest(
        u.created_at,
        coalesce(u.last_sign_in_at, u.created_at),
        coalesce(a.last_used_at, u.created_at),
        coalesce((select (max(q.quota_day)::timestamp + interval '1 day') at time zone 'UTC'
                  from public.milo_daily_quota q where q.user_id = u.id), u.created_at)
      ) < now() - interval '30 days'
    order by u.created_at, u.id
    limit 100
  loop
    if not pg_try_advisory_xact_lock(hashtextextended('emlove-milo:' || candidate.id::text, 0)) then
      n_busy := n_busy + 1;
      continue;
    end if;
    -- Po uzyskaniu blokady sprawdź ponownie stan i ostatnie użycie.
    select exists (
      select 1 from auth.users u
      left join public.milo_user_activity a on a.user_id = u.id
      where u.id = candidate.id and u.is_anonymous is true
        and greatest(
          u.created_at,
          coalesce(u.last_sign_in_at, u.created_at),
          coalesce(a.last_used_at, u.created_at),
          coalesce((select (max(q.quota_day)::timestamp + interval '1 day') at time zone 'UTC'
                    from public.milo_daily_quota q where q.user_id = u.id), u.created_at)
        ) < now() - interval '30 days'
    ) into still_inactive;
    if not still_inactive then continue; end if;
    delete from public.milo_daily_quota where user_id = candidate.id;
    delete from public.milo_user_activity where user_id = candidate.id;
    delete from auth.users where id = candidate.id and is_anonymous is true;
    if found then n_deleted := n_deleted + 1; end if;
  end loop;
  return query select n_deleted, n_busy;
end $$;
revoke all on function public.milo_cleanup_inactive() from public, anon, authenticated, service_role;

commit;
