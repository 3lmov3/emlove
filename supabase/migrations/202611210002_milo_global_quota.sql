-- Emlove: limit globalny 50 prób dziennie oraz dotychczasowy limit na sesję.
-- Uruchom po migracji 202611210001_milo_quota.sql, przed testem.
-- Dzień jest liczony według UTC. Migracja nie usuwa istniejących liczników.
-- Nie zapisuje treści wypowiedzi ani adresów IP.

begin;

create table if not exists public.milo_global_daily_quota (
  quota_day date primary key,
  used integer not null default 0 check (used >= 0)
);
alter table public.milo_global_daily_quota enable row level security;
revoke all on public.milo_global_daily_quota from public, anon, authenticated;

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

commit;
