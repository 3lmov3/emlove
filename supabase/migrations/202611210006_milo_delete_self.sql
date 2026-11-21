-- Emlove: przygotowanie usuwania własnej anonimowej sesji i jej liczników.
-- Instalacja tej funkcji niczego nie usuwa. Wywołać ją może tylko serwer.
-- Uruchomić po migracjach 001–004. Wspólna blokada z limitem i czyszczeniem.
begin;
create or replace function public.milo_delete_own_session(p_user uuid)
returns boolean
language plpgsql security definer set search_path = pg_catalog, public, pg_temp
as $$
begin
  if p_user is null then return false; end if;
  perform pg_advisory_xact_lock(hashtextextended('emlove-milo:' || p_user::text, 0));
  if not exists(select 1 from auth.users where id=p_user and is_anonymous is true) then
    return false;
  end if;
  delete from public.milo_daily_quota where user_id=p_user;
  delete from public.milo_user_activity where user_id=p_user;
  delete from auth.users where id=p_user and is_anonymous is true;
  return found;
end $$;
revoke all on function public.milo_delete_own_session(uuid) from public, anon, authenticated;
grant execute on function public.milo_delete_own_session(uuid) to service_role;
commit;
