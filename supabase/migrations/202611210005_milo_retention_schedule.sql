-- Uwaga: tworzy codzienne zadanie, które będzie rzeczywiście usuwać
-- nieaktywne anonimowe konta oraz związane z nimi liczniki i aktywność.
-- Samo utworzenie zadania nie uruchamia czyszczenia natychmiast.
-- Wymaga poprawnie zainstalowanego pg_cron i funkcji milo_cleanup_inactive.
-- Zadanie działa codziennie o 03:17 UTC; do 100 kont na jedno uruchomienie.
-- W razie błędu transakcja funkcji zostanie wycofana, a błąd pojawi się w logu Crona.

begin;

do $$
begin
  if to_regprocedure('public.milo_cleanup_inactive()') is null then
    raise exception 'Brak funkcji public.milo_cleanup_inactive()';
  end if;
  if exists(select 1 from cron.job where jobname='emlove-retention-30d-v1') then
    raise exception 'Zadanie emlove-retention-30d-v1 już istnieje. Nie zmieniono go.';
  end if;
end $$;

select cron.schedule(
  'emlove-retention-30d-v1',
  '17 3 * * *',
  'select * from public.milo_cleanup_inactive();'
) as numer_zadania;

commit;

select jobid as numer_zadania, schedule as harmonogram, active as aktywne
from cron.job where jobname='emlove-retention-30d-v1';
