// Supabase Edge Function: Milo z kluczem użytkownika (BYOK).
// Używa klucza przekazanego w żądaniu; NIE używa klucza administratora.
// Klucz nie jest zapisywany ani logowany.
//
// Deploy:
//   supabase functions deploy milo-mobile-byok
//
// Wymagane env (automatyczne w Supabase): SUPABASE_URL, SUPABASE_ANON_KEY.

import {createClient} from 'https://esm.sh/@supabase/supabase-js@2.49.8';
import {resolveLocale, systemPrompt, crisisReply} from '../_shared/milo-locales.mjs';

type ProviderId = 'grok' | 'anthropic' | 'openai' | 'openrouter';

type ProviderConfig = {
  endpoint: string;
  model: string;
  pattern: RegExp;
};

const PROVIDERS: Record<ProviderId, ProviderConfig> = {
  grok: {
    endpoint: 'https://api.x.ai/v1/chat/completions',
    model: 'grok-4',
    pattern: /^grok-[a-z0-9.-]+$/,
  },
  anthropic: {
    endpoint: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-5-haiku-latest',
    pattern: /^claude-[a-z0-9.-]+$/,
  },
  openai: {
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini',
    pattern: /^(gpt|o[0-9]|chatgpt)[a-z0-9.-]*$/,
  },
  openrouter: {
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'openai/gpt-4o-mini',
    pattern: /^[a-z0-9-]+\/[a-z0-9.:-]+$/,
  },
};

// Ten sam system prompt, którego używa milo-mobile-private26.
// Bez tego Milo zachowywałby się inaczej na własnym kluczu niż na kluczu
// administratora — a zwłaszcza gorzej radziłby sobie z kryzysem i prompt injection.
const CRISIS_TERMS:Record<string,RegExp>={
  pl:/samobój|zabi(ję|c|ć) się|odebrać sobie życie|nie chcę żyć|chcę umrzeć|skrzywdzić siebie|samookalecz/i,
  en:/suicid|kill myself|end my life|take my life|hurt myself|harm myself|self[- ]?harm|don't want to live|want to die/i,
  de:/suizid|mich umbringen|mich töten|mir das leben nehmen|nicht mehr leben|mir etwas antun|selbstverletzung/i,
  fr:/suicid|me tuer|me faire du mal|me blesser|ne veux plus vivre|envie de mourir|automutil/i,
  hu:/öngyilk|megölöm magam|meg akarok halni|nem akarok élni|bántsam magam|önsért/i,
  uk:/самогуб|покінчити з життям|не хочу жити|хочу померти|завдати собі шкоди|нашкодити собі|самоушкодж/i,
};

const MAX_TOKENS = 500;
const MAX_TEXT = 4000;
const MAX_HISTORY = 4;
const MAX_HISTORY_ITEM = 2000;
const RATE_LIMIT_PER_MINUTE = 20;

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

// Prosty limit na instancję funkcji; dla publicznej wersji lepiej trzymać licznik w bazie.
const hits = new Map<string, number[]>();
function allow(userId: string): boolean {
  const now = Date.now();
  const recent = (hits.get(userId) || []).filter(t => now - t < 60_000);
  if (recent.length >= RATE_LIMIT_PER_MINUTE) return false;
  recent.push(now);
  hits.set(userId, recent);
  return true;
}

type Turn = {role: 'user' | 'assistant'; content: string};

function cleanHistory(value: unknown): Turn[] {
  if (!Array.isArray(value)) return [];
  const out: Turn[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') continue;
    const role = (item as {role?: unknown}).role;
    const content = (item as {content?: unknown}).content;
    if ((role === 'user' || role === 'assistant') && typeof content === 'string' && content.trim()) {
      out.push({role, content: content.slice(0, MAX_HISTORY_ITEM)});
    }
  }
  return out.slice(-MAX_HISTORY);
}

type Message = {role: 'system' | 'user' | 'assistant'; content: string};

function buildMessages(text: string, history: Turn[], locale: string): Message[] {
  return [
    {role: 'system', content: systemPrompt(locale) || systemPrompt('pl') || ''},
    ...history.map(h => ({role: h.role, content: h.content})),
    {role: 'user', content: text},
  ];
}

function anthropicMessages(messages: Message[]): {role: 'user' | 'assistant'; content: string}[] {
  const out: {role: 'user' | 'assistant'; content: string}[] = [];
  for (const message of messages) {
    if (message.role === 'system') continue;
    const role: 'user' | 'assistant' = message.role === 'assistant' ? 'assistant' : 'user';
    const last = out[out.length - 1];
    if (last && last.role === role) {
      last.content += '\n' + message.content;
    } else {
      out.push({role, content: message.content});
    }
  }
  if (out.length === 0 || out[0].role !== 'user') {
    out.unshift({role: 'user', content: 'Kontynuuj.'});
  }
  return out;
}

async function callProvider(
  provider: ProviderId,
  apiKey: string,
  model: string,
  messages: Message[],
  signal: AbortSignal,
  locale: string,
): Promise<{text?: string; error?: string; detail?: string}> {
  if (provider === 'anthropic') {
    const response = await fetch(PROVIDERS.anthropic.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        system: systemPrompt(locale) || systemPrompt('pl') || '',
        messages: anthropicMessages(messages),
        max_tokens: MAX_TOKENS,
        temperature: 0.7,
      }),
      signal,
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      return {error: `anthropic_${response.status}`, detail: data?.error?.message || ''};
    }
    const text = Array.isArray(data?.content)
      ? data.content.map((part: {type?: string; text?: string}) => (part?.type === 'text' ? part.text : '')).join('').trim()
      : '';
    return {text};
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };
  if (provider === 'openrouter') {
    headers['HTTP-Referer'] = 'https://emlove.app'; // zmień na domenę PWA, jeśli chcesz inną atrybucję
    headers['X-Title'] = 'Emlove';
  }

  const response = await fetch(PROVIDERS[provider].endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model,
      messages,
      max_tokens: MAX_TOKENS,
      temperature: 0.7,
    }),
    signal,
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    return {error: `${provider}_${response.status}`, detail: data?.error?.message || ''};
  }
  const text = data?.choices?.[0]?.message?.content;
  return {text: typeof text === 'string' ? text.trim() : ''};
}

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', {headers: CORS});
  if (req.method !== 'POST') return json({error: 'method_not_allowed'}, 405);

  const auth = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '');
  if (!auth) return json({error: 'unauthorized'}, 401);

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    {global: {headers: {Authorization: `Bearer ${auth}`}}},
  );
  const {data, error: authError} = await supabase.auth.getUser(auth);
  const user = data?.user;
  if (authError || !user) return json({error: 'unauthorized'}, 401);
  if (!allow(user.id)) return json({error: 'rate_limited'}, 429);

  let body: {
    provider?: unknown;
    apiKey?: unknown;
    model?: unknown;
    text?: unknown;
    history?: unknown;
    language?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return json({error: 'bad_json'}, 400);
  }

  const locale = resolveLocale(body.language === undefined ? 'pl' : body.language);
  if (!locale) return json({error: 'unsupported_language'}, 400);

  const provider = body.provider;
  if (typeof provider !== 'string' || !(provider in PROVIDERS)) {
    return json({error: 'bad_provider'}, 400);
  }
  const providerId = provider as ProviderId;

  const apiKey = body.apiKey;
  if (typeof apiKey !== 'string' || apiKey.length < 10 || apiKey.length > 300) {
    return json({error: 'bad_key'}, 400);
  }

  const text = body.text;
  if (typeof text !== 'string' || !text.trim() || text.length > MAX_TEXT) {
    return json({error: 'bad_text'}, 400);
  }

  const config = PROVIDERS[providerId];
  const model = typeof body.model === 'string' && body.model.trim() ? body.model.trim() : config.model;
  if (!config.pattern.test(model)) return json({error: 'bad_model'}, 400);

  const history = cleanHistory(body.history);
  const cleanText = text.trim();
  if (CRISIS_TERMS[locale].test(cleanText)) return json({text: crisisReply(locale), language: locale});
  const messages = buildMessages(cleanText, history, locale);

  const result = await callProvider(providerId, apiKey, model, messages, req.signal, locale);
  if (result.error) {
    return json({error: 'provider_error', detail: (result.detail || '').slice(0, 300)}, 502);
  }
  if (!result.text) return json({error: 'empty_response'}, 502);

  return json({text: result.text.slice(0, 1500), language: locale});
});
