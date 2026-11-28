import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {resolveLocale, systemPrompt, crisisReply} from '../supabase/functions/_shared/milo-locales.mjs';

const here = new URL('.', import.meta.url);
const localeScript = fs.readFileSync(new URL('../locales.js', here), 'utf8');
const values = new Map();
const events = [];
const root = {lang: 'pl', dataset: {}};
const sandbox = {
  window: {dispatchEvent: e => events.push(e)},
  document: {
    documentElement: root,
    addEventListener() {},
    getElementById() { return null; },
    querySelectorAll() { return []; },
  },
  navigator: {languages: ['de-DE', 'en-US'], language: 'de-DE'},
  localStorage: {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
  },
  CustomEvent: class { constructor(type, init) { this.type = type; this.detail = init.detail; } },
};
vm.runInNewContext(localeScript, sandbox);
const locale = sandbox.window.EmloveLocale;
assert.equal(locale.language(), 'de', 'auto uses the first supported browser language');
for (const code of ['pl', 'en', 'de', 'fr', 'hu', 'uk']) {
  assert.equal(locale.setLanguage(code), true);
  assert.equal(locale.language(), code);
  assert.ok(systemPrompt(code));
  assert.ok(crisisReply(code));
}
assert.equal(locale.setLanguage('xx'), false, 'unsupported languages are rejected');
assert.equal(locale.setLanguage('auto'), true);
assert.equal(locale.language(), 'de');
for (const theme of ['classic', 'night', 'lilac']) {
  assert.equal(locale.setTheme(theme), true);
  assert.equal(locale.theme(), theme);
  assert.equal(root.dataset.theme, theme);
}
assert.equal(locale.setTheme('neon'), false, 'unknown themes are rejected');
assert.ok(events.some(e => e.type === 'emlove:language-change'));
assert.ok(events.some(e => e.type === 'emlove:theme-change'));
assert.equal(resolveLocale('en-GB'), 'en');
assert.equal(resolveLocale('xx'), null);

const miloBundle = JSON.parse(fs.readFileSync(new URL('../translations/milo-local.json', here), 'utf8'));
for (const code of ['pl', 'en', 'de', 'fr', 'hu', 'uk']) {
  assert.ok(miloBundle[code]?.crisisFallback && Array.isArray(miloBundle[code].generic), `${code} local Milo replies exist`);
  assert.ok(miloBundle[code].crisisTerms.length > 0, `${code} crisis terms exist`);
}

const simulationBundle = JSON.parse(fs.readFileSync(new URL('../translations/simulations-content.json', here), 'utf8'));
for (const code of ['en', 'de', 'fr', 'hu', 'uk']) {
  for (const id of ['school', 'friend', 'family', 'work']) {
    const sim = simulationBundle[code]?.[id];
    assert.ok(sim?.title && sim?.short && sim?.story && Array.isArray(sim.steps), `${code}/${id} is translated`);
  }
}
console.log('PWA locale settings and simulation resources: OK');
