// Supabase Edge Function: usuwa konto zalogowanego użytkownika.
// Wymagane service role — użytkownik nie może usunąć samego siebie kluczem anon.
//
// Usuwa WYŁĄCZNIE konto w auth.users. Wpisy dziennika są lokalne (na urządzeniu)
// i nie istnieją po stronie serwera, więc nie ma czego tam kasować.
//
// Deploy:
//   supabase functions deploy milo-account-delete

import {createClient} from 'npm:@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {...CORS, 'Content-Type': 'application/json'},
  });

Deno.serve(async req => {
  try {
    if (req.method === 'OPTIONS') return new Response('ok', {headers: CORS});
    if (req.method !== 'POST') return json({error: 'method_not_allowed'}, 405);

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const keySet = (name: string): Record<string, string> => {
      try { return JSON.parse(Deno.env.get(name) || '{}'); } catch { return {}; }
    };
    // Supabase now provides named publishable/secret keys; retain legacy fallbacks.
    const anonKey = keySet('SUPABASE_PUBLISHABLE_KEYS').default
      || Deno.env.get('SUPABASE_ANON_KEY')
      || Deno.env.get('SUPABASE_PUBLISHABLE_KEY')
      || '';
    const serviceKey = keySet('SUPABASE_SECRET_KEYS').default
      || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
      || Deno.env.get('SUPABASE_SECRET_KEY')
      || '';

    if (!supabaseUrl || !anonKey) {
      console.error('account-delete: brak SUPABASE_URL lub SUPABASE_ANON_KEY');
      return json({error: 'env_missing'}, 503);
    }
    if (!serviceKey) {
      console.error('account-delete: brak SUPABASE_SERVICE_ROLE_KEY');
      return json({error: 'env_missing'}, 503);
    }

    const auth = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '');
    if (!auth) return json({error: 'unauthorized'}, 401);

    // Weryfikujemy token kluczem anon — to identyfikuje użytkownika.
    const userClient = createClient(supabaseUrl, anonKey, {
      global: {headers: {Authorization: `Bearer ${auth}`}},
    });
    const {data, error: authError} = await userClient.auth.getUser(auth);
    const user = data?.user;
    if (authError || !user) return json({error: 'unauthorized'}, 401);

    // Admin client must be constructed with the secret/service-role key itself.
    // Modern sb_secret_ keys are API keys, not JWTs; do not put them in Bearer.
    const admin = createClient(supabaseUrl, serviceKey, {
      auth: {persistSession: false, autoRefreshToken: false, detectSessionInUrl: false},
    });

    const {error: deleteError} = await admin.auth.admin.deleteUser(user.id);
    if (deleteError) {
      console.error('account-delete: deleteUser', deleteError.message);
      return json({error: 'delete_failed', detail: deleteError.message.slice(0, 200)}, 502);
    }

    return json({ok: true});
  } catch (error) {
    console.error('account-delete: unhandled', error);
    return json({error: 'internal', detail: String(error).slice(0, 200)}, 500);
  }
});
