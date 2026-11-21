-- Tabela prywatna i atomowy limit liczby zapytań na użytkownika/dzień.
create table if not exists public.milo_daily_quota (
  user_id uuid not null,
  quota_day date not null,
  used integer not null default 0 check (used >= 0),
  primary key (user_id, quota_day)
);
alter table public.milo_daily_quota enable row level security;
revoke all on public.milo_daily_quota from public, anon, authenticated;
create or replace function public.milo_consume_quota(p_user uuid, p_limit integer)
returns boolean
language plpgsql security definer set search_path = public, pg_temp
as $$
declare current_used integer;
begin
  if p_user is null or p_limit < 1 or p_limit > 100 then return false; end if;
  insert into public.milo_daily_quota(user_id,quota_day,used)
    values(p_user,(now() at time zone 'UTC')::date,1)
    on conflict(user_id,quota_day) do update
      set used=public.milo_daily_quota.used+1
      where public.milo_daily_quota.used < p_limit
    returning used into current_used;
  return current_used is not null;
end $$;
revoke all on function public.milo_consume_quota(uuid,integer) from public, anon, authenticated;
grant execute on function public.milo_consume_quota(uuid,integer) to service_role;
