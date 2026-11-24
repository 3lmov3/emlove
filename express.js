// ============================================================
// Wyraż — ćwiczenie polegające na zapisaniu tego, co czujesz.
//
// Zasady:
//   · „Zanotuj" zapisuje wpis do dziennika z odznaką „Wyraż +1"
//   · 1 punkt za wpis, maksymalnie 5 punktów na miesiąc
//   · napisanie „Milo"  → Milo odpowiada „...".        (krok 1)
//   · napisanie „Ja"    → Milo odpowiada emotkami 1–2  (krok 2)
//   · odpisanie SAMYMI emotkami → Milo zwraca sekret    (krok 3)
//   · wielkość liter nie ma znaczenia
// ============================================================
(function () {
  'use strict';

  const KEY = 'emlove_wyraz_v1';
  const MAX_PER_MONTH = 5;

  // ── sekrety ────────────────────────────────────────────────
  const SECRETS = [
    'Sekret: właśnie nazwałeś uczucie bez słów. To nie uproszczenie — to drugi język. Osoby, które potrafią to robić, szybciej wracają do równowagi po silnych emocjach.',
    'Sekret: emotka to nie ucieczka od słów. To most. Najpierw kolor, potem kształt, a dopiero potem nazwa.',
    'Sekret: w tym ćwiczeniu nie da się odpowiedzieć źle. To jedyne takie miejsce w całej aplikacji.',
    'Sekret: gdy następnym razem poczujesz coś silnego, spróbuj najpierw opisać to jedną emotką. Zanim znajdziesz słowo. Zobacz, co się zmieni.',
    'Sekret: pisanie o sobie w pierwszej osobie („ja czuję") przepina uwagę z oskarżania na opisywanie. To niewidzialna zmiana, ale działa.',
    'Sekret: im krótsze zdanie, tym trudniej się za nim schować. Dlatego czasem jedna emotka mówi więcej niż akapit.',
    'Sekret: nie musisz nazywać emocji poprawnie. Wystarczy, że będziesz bliżej niż przed chwilą.',
    'Sekret: to ćwiczenie nie jest testem. Nikt go nie ocenia. Ani Milo, ani nikt inny.',
    'Sekret: zapisane uczucie ma krawędzie. Niezapisane rozlewa się na cały dzień.',
    'Sekret: wracanie do tego samego słowa to nie powtarzanie się. To sprawdzanie, czy ono jeszcze pasuje.'
  ];

  // ── emotki ─────────────────────────────────────────────────
  // Słowa kluczowe → emotki. Dwie pierwsze pasujące trafiają do odpowiedzi.
  const EMOJI_MAP = [
    {re: /złoś|złos|wkurz|iryt|wściek|gniew/i, e: ['😠', '😖']},
    {re: /smute|smutn|żałob|płacz|łzy|przygnęb/i, e: ['😢', '😔']},
    {re: /lęk|strach|boj|obaw|niepok|przeraż/i, e: ['😰', '😨']},
    {re: /wsty|zawsty|wstyd/i, e: ['😳', '🙈']},
    {re: /wina|winny|przeprasza/i, e: ['😞', '🙏']},
    {re: /rado|szczęś|wesel|zachwy|entuzjaz/i, e: ['😊', '🌟']},
    {re: /wdzięcz|dzięk|docen/i, e: ['🙏', '💛']},
    {re: /zmęcz|wyczerpan|senn|apat/i, e: ['😮‍💨', '😴']},
    {re: /zaskocz|zdumien|nieoczekiw/i, e: ['😲', '🤯']},
    {re: /zazdroś|przywłaszc/i, e: ['😒', '👀']},
    {re: /samot|izolow|odrzucon|opuszcz/i, e: ['🥀', '🖤']},
    {re: /blisko|czuł|miłoś|koch/i, e: ['❤️', '🤗']},
    {re: /spok|ustabiliz|odetchn/i, e: ['😌', '🕊️']},
    {re: /przytłocz|przeciąż|za dużo/i, e: ['😮‍💨', '🌀']},
    {re: /nadziej|optymi|wiar/i, e: ['🌱', '✨']},
    {re: /niepew|wątpliw|zagub/i, e: ['🤔', '🌫️']}
  ];
  const FALLBACK = ['🫧', '🌙', '🌿', '🫒', '💠'];

  function pickEmojis(text) {
    const found = [];
    for (const item of EMOJI_MAP) {
      if (item.re.test(text)) {
        for (const e of item.e) if (!found.includes(e)) found.push(e);
        if (found.length >= 2) break;
      }
    }
    while (found.length < 1) {
      const e = FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
      if (!found.includes(e)) found.push(e);
    }
    return found.slice(0, 2);
  }

  function hasWord(text, word) {
    return new RegExp('(^|[^a-ząćęłńóśźż])' + word + '($|[^a-ząćęłńóśźż])', 'i').test(text);
  }

  function isOnlyEmojis(text) {
    const stripped = text.replace(/[\p{Emoji}\uFE0F\u200D\s]/gu, '');
    return stripped === '' && /\p{Emoji}/u.test(text);
  }

  function readState() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
  }

  function writeState(s) {
    localStorage.setItem(KEY, JSON.stringify(s));
  }

  function monthKey() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
  }

  function monthCount() {
    const s = readState();
    if (!s || s.month !== monthKey()) return 0;
    return s.count || 0;
  }

  function addMonthPoint() {
    const s = readState();
    const cur = (s && s.month === monthKey()) ? (s.count || 0) : 0;
    writeState({month: monthKey(), count: cur + 1});
  }

  // ── stan czatu ─────────────────────────────────────────────
  let step = 0;        // 0 = czekamy na „Milo", 1 = czekamy na „Ja", 2 = czekamy na emotki, 3 = sekret oddany
  let log = [];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function renderLog() {
    const box = document.getElementById('expressLog');
    if (!box) return;
    box.innerHTML = log.map(m =>
      `<div class="express-msg ${m.who}">${m.who === 'milo' ? '<span class="express-who">Milo</span>' : ''}${esc(m.text)}</div>`
    ).join('');
    box.scrollTop = box.scrollHeight;
  }

  function renderHint() {
    const hint = document.getElementById('expressHint');
    if (!hint) return;
    const left = MAX_PER_MONTH - monthCount();
    hint.textContent = left > 0
      ? `Punkty w tym miesiącu: ${monthCount()}/${MAX_PER_MONTH}`
      : 'Limit 5 punktów na ten miesiąc wykorzystany — wpisy nadal się zapisują.';
  }

  function push(who, text) {
    log.push({who, text});
    if (log.length > 40) log = log.slice(-40);
    renderLog();
  }

  // ── odpowiedź Milo ─────────────────────────────────────────
  function miloReply(text) {
    if (step === 0 && hasWord(text, 'Milo')) { step = 1; return '...'; }
    if (step === 1 && hasWord(text, 'Ja')) { step = 2; return pickEmojis(text).join(' '); }
    if (step === 2 && isOnlyEmojis(text)) {
      step = 3;
      return SECRETS[Math.floor(Math.random() * SECRETS.length)];
    }
    return null;
  }

  // ── zapis do dziennika ─────────────────────────────────────
  function saveEntry(text) {
    if (!window.EmloveState) return;
    const st = window.EmloveState;
    const now = new Date();
    const entry = {
      id: 'w' + now.getTime().toString(36),
      updatedAt: now.toISOString(),
      date: now.toISOString().slice(0, 10),
      time: now.toLocaleTimeString('pl-PL', {hour: '2-digit', minute: '2-digit'}),
      emotion: 'Wyraż',
      emoji: '✍️',
      intensity: '—',
      body: [],
      what: text,
      needs: [],
      needText: '',
      iStatement: 'Wyraż +1',
      badge: 'Wyraż +1'
    };
    st.entries.unshift(entry);
    if (window.saveState) window.saveState();
  }

  function submit() {
    const ta = document.getElementById('expressText');
    if (!ta) return;
    const text = ta.value.trim();
    if (!text) return;

    push('ja', text);

    const reply = miloReply(text);
    if (reply) push('milo', reply);

    saveEntry(text);

    if (monthCount() < MAX_PER_MONTH) {
      addMonthPoint();
      if (window.addPoints) window.addPoints(1);
    }

    ta.value = '';
    renderHint();
    ta.focus();
  }

  function init() {
    const btn = document.getElementById('expressSubmit');
    const ta = document.getElementById('expressText');
    if (!btn || !ta) return;
    btn.onclick = submit;
    ta.addEventListener('keydown', e => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); submit(); }
    });
    renderLog();
    renderHint();
  }

  window.EmloveExpress = {init, submit, monthCount, MAX_PER_MONTH};
})();
