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
const checkinCatalog = JSON.parse(fs.readFileSync(new URL('../translations/checkin.json', here), 'utf8'));
const sandbox = {
  window: {EMLOVE_TRANSLATION_CATALOG: {checkin: checkinCatalog}, dispatchEvent: e => events.push(e)},
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
assert.equal(locale.content('checkin', 'title'), 'Check-in');
assert.equal(locale.content('checkin', 'step'), 'Schritt');
assert.equal(locale.content('checkin', 'emotions').sad, 'Traurigkeit', 'structured locale values are available to dynamic views');
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

const css = fs.readFileSync(new URL('../style.css', here), 'utf8');
assert.match(css, /html\[data-theme="night"\] \.topbar h1,html\[data-theme="night"\] \.card h2,html\[data-theme="night"\] \.card h3,html\[data-theme="night"\] \.field-label\{color:#F2F5FB\}/);
assert.match(css, /html\[data-theme="night"\] \.emotion-btn,html\[data-theme="night"\] \.chip/);
assert.match(css, /html\[data-theme="night"\] input::placeholder,html\[data-theme="night"\] textarea::placeholder\{color:#AAB8CA!important/);
assert.match(css, /html\[data-theme="night"\] \.btn-ghost\{color:#F1F4FA!important/);
assert.match(css, /html\[data-theme="night"\] \.btn-secondary\{color:#FFE7F1!important/);
assert.match(css, /html\[data-theme="night"\] \.bf-opt\{color:#F2F5FB!important;-webkit-text-fill-color:#F2F5FB!important;background:#28374B!important/);
assert.match(css, /html\[data-theme="night"\] \.bf-opt b\{color:#FFFFFF!important;-webkit-text-fill-color:#FFFFFF!important;background:#3C5377!important/);
assert.match(css, /html\[data-theme="night"\] \.chat-messages\{background:#141E2C!important\}/);
assert.match(css, /html\[data-theme="night"\] \.msg\.milo\{color:#F2F5FB!important;background:#28374B!important;border-color:#526278!important\}/);
assert.match(css, /html\[data-theme="night"\] \.msg\.user\{color:#111925!important;-webkit-text-fill-color:#111925!important;background:#B4C9FF!important/);
assert.match(css, /html\[data-theme="night"\] \.chat-voice-bar\{color:#F2F5FB!important;background:#222F40!important/);
assert.match(css, /html\[data-theme="night"\] \.journal-item\{color:#F2F5FB!important;background:#1B2635!important;border-color:#3C4A5E!important\}/);
assert.match(css, /html\[data-theme="night"\] \.lib-card\{color:#F2F5FB!important;background:#222F40!important;border-color:#46566B!important\}/);
assert.match(css, /html\[data-theme="night"\] \.wheel-word\{color:#DCE6F2!important;background:#28374B!important;border-color:#526278!important\}/);
assert.match(css, /html\[data-theme="night"\] \.ex-review-item\{color:#F2F5FB!important;background:#222F40!important;border-color:#46566B!important\}/);
assert.match(css, /html\[data-theme="night"\] \.ex-review-item p\{color:#D2DBE8!important\}/);
assert.match(css, /html\[data-theme="night"\] \.ex-extra\{color:#E9DDCC!important;background:#39332D!important;border-color:#6E5D49!important\}/);
assert.match(css, /\.wheel-canvas svg\{width:min\(100%,580px\);max-width:min\(100%,580px\);max-height:68vh;height:auto;flex:0 0 auto;transition:width \.28s cubic-bezier\(\.2,\.7,\.2,1\)\}/);
assert.match(css, /\.wheel-canvas\.zoomed svg\{width:min\(112%,650px\);max-width:min\(112%,650px\)\}/);
const wheelJs = fs.readFileSync(new URL('../wheel-view.js', here), 'utf8');
assert.match(wheelJs, /function toggleZoom\(\)[\s\S]*?canvas\.classList\.toggle\('zoomed', zoom\)/);
assert.match(wheelJs, /button\.setAttribute\('aria-pressed', zoom \?/);
assert.match(css, /html\[data-theme="night"\] input:not\(\[type="range"\]\):not\(\[type="checkbox"\]\):not\(\[type="radio"\]\),html\[data-theme="night"\] textarea,html\[data-theme="night"\] select\{color:#F2F5FB!important;-webkit-text-fill-color:#F2F5FB!important;background:#182332!important/);
assert.match(css, /html\[data-theme="night"\] #authModal \.settings-actions \.btn-ghost\{color:#F1F4FA!important/);
const html = fs.readFileSync(new URL('../index.html', here), 'utf8');
assert.match(html, /style\.css\?v=night-chat-contrast-2/);
const sw = fs.readFileSync(new URL('../sw.js', here), 'utf8');
assert.match(sw, /emlove-v80/);
assert.ok(fs.existsSync(new URL('../translation-catalog.js', here)), 'the translation catalogue must be present for deployment');
assert.match(html, /translation-catalog\.js/);
assert.match(sw, /style\.css\?v=night-chat-contrast-2/);

const launcherManifest = JSON.parse(fs.readFileSync(new URL('../manifest.json', here), 'utf8'));
assert.deepEqual(launcherManifest.icons.map(icon => icon.src), ['icon-192.png', 'icon-512.png', 'icon-512.png']);
for (const [name, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]]) {
  const png = fs.readFileSync(new URL(`../${name}`, here));
  assert.equal(png.readUInt32BE(16), size, `${name} width ${size}`);
  assert.equal(png.readUInt32BE(20), size, `${name} height ${size}`);
}
for (const theme of ['mint', 'night', 'lilac']) {
  const png = fs.readFileSync(new URL(`../icons/app-icon-${theme}-192.png`, here));
  assert.equal(png.readUInt32BE(16), 192, `${theme} in-app icon width`);
}

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
