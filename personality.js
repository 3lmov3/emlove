// === Emlove: Test osobowości (Wielka Piątka, 30 podskal) + zwierzę-towarzysz ===
// Wzorowane na strukturze testu wielkiej piątki (30 podskal, 5 wymiarów).
// Emlove nie diagnozuje — wynik służy refleksji i doborowi ćwiczeń.

const BIG_FIVE_DIMS = {
  O: { name: 'Otwartość', short: 'O', color: '#0F8C86', desc: 'Ciekawość świata, wyobraźnia, gotowość na nowe doświadczenia.' },
  C: { name: 'Sumienność', short: 'C', color: '#1F6F8B', desc: 'Porządek, wytrwałość, planowanie i dążenie do celu.' },
  E: { name: 'Ekstrawersja', short: 'E', color: '#F06C97', desc: 'Energia z kontaktu, towarzyskość, wyrazistość.' },
  A: { name: 'Ugodowość', short: 'A', color: '#8FD3C7', desc: 'Ciepło, zaufanie, troska o innych.' },
  N: { name: 'Wrażliwość emocjonalna', short: 'N', color: '#B8A9E8', desc: 'Intensywność przeżywania, reakcja na stres.' },
};

// 30 pozycji — po 6 na wymiar, każda dotyka innej podskali
const BF_ITEMS = [
  { d: 'O', f: 'Wyobraźnia', t: 'Mam żywą wyobraźnię i często tworzę obrazy w głowie.' },
  { d: 'O', f: 'Ciekawość intelektualna', t: 'Lubię pytać „dlaczego” i rozkładać tematy na części.' },
  { d: 'O', f: 'Otwartość na nowość', t: 'Nowe miejsca i nieznane sytuacje raczej mnie ciekawią niż odstraszają.' },
  { d: 'O', f: 'Wrażliwość estetyczna', t: 'Muzyka, sztuka albo przyroda potrafią mnie wzruszyć.' },
  { d: 'O', f: 'Elastyczność myślenia', t: 'Trzymam się swoich poglądów i rzadko je zmieniam.' },
  { d: 'O', f: 'Potrzeba stymulacji', t: 'Nuda bywa dla mnie trudniejsza niż wyzwanie.' },

  { d: 'C', f: 'Sumienność', t: 'Często odkładam rzeczy na później.' },
  { d: 'C', f: 'Porządek', t: 'W mojej przestrzeni panuje porządek, który mi służy.' },
  { d: 'C', f: 'Samodyscyplina', t: 'Potrafię robić coś regularnie, nawet gdy nie mam ochoty.' },
  { d: 'C', f: 'Rozwaga', t: 'Zanim działam, sprawdzam konsekwencje.' },
  { d: 'C', f: 'Dążenie do osiągnięć', t: 'Lubię stawiać sobie cele i je realizować.' },
  { d: 'C', f: 'Punktualność', t: 'Trzymam się ustalonych godzin i zobowiązań.' },

  { d: 'E', f: 'Towarzyskość', t: 'Kontakt z ludźmi dodaje mi energii.' },
  { d: 'E', f: 'Asertywność', t: 'Bez trudu mówię, co myślę, w grupie.' },
  { d: 'E', f: 'Aktywność', t: 'Lubię być w ruchu — mam dużo planów i pomysłów na dzień.' },
  { d: 'E', f: 'Poszukiwanie wrażeń', t: 'Lubię sytuacje z dreszczem emocji.' },
  { d: 'E', f: 'Pozytywne emocje', t: 'Śmieję się i cieszę z drobiazgów częściej niż inni.' },
  { d: 'E', f: 'Wyrazistość', t: 'Moje emocje widać — nie umiem ich ukryć.' },

  { d: 'A', f: 'Zaufanie', t: 'Trudno mi zaufać nowym osobom.' },
  { d: 'A', f: 'Moralność', t: 'Trudno mi postąpić wbrew temu, co uważam za uczciwe.' },
  { d: 'A', f: 'Altruizm', t: 'Pomaganie innym sprawia mi realną przyjemność.' },
  { d: 'A', f: 'Współpraca', t: 'Wolę rozwiązywać konflikty niż wygrywać.' },
  { d: 'A', f: 'Skromność', t: 'Nie lubię mówić o sobie zbyt wiele.' },
  { d: 'A', f: 'Współczucie', t: 'Łatwo się wzruszam, gdy ktoś cierpi.' },

  { d: 'N', f: 'Lęk', t: 'Często zamartwiam się rzeczami, które mogłyby się zdarzyć.' },
  { d: 'N', f: 'Złość', t: 'Szybko robię się rozdrażniony/a, gdy coś nie idzie.' },
  { d: 'N', f: 'Przygnębienie', t: 'Mam dni, w których trudno mi dostrzec cokolwiek dobrego.' },
  { d: 'N', f: 'Samoświadomość', t: 'Często myślę, że inni oceniają mnie krytycznie.' },
  { d: 'N', f: 'Impulsywność', t: 'Zdążę coś zrobić, zanim sprawdzę, czy to dobry pomysł.' },
  { d: 'N', f: 'Wrażliwość na stres', t: 'Napięcie długo zostaje mi w ciele po trudnych sytuacjach.' },
];

const BF_SCALE = ['zupełnie nie ja', 'raczej nie ja', 'pół na pół', 'raczej ja', 'bardzo ja'];
const BF_REVERSED = new Set(['Elastyczność myślenia', 'Sumienność', 'Zaufanie']);

// Zwierzęta-towarzysze: docelowy profil O,C,E,A,N (0-100) + opis delikatny
const ANIMALS = [
  { id:'wyspa', emoji:'🦦', name:'Wydra', my:'moja wydra', gen:'wydry', O:80, C:45, E:80, A:80, N:30, key:'Ciepło + ciekawość',
    line:'Jesteś jak wydra — łączy Cię radość z kontaktu z ludźmi i ciekawość tego, co woda przyniesie.',
    strengths:'łatwo budzisz w innych uśmiech, potrafisz być lekki i bliski jednocześnie',
    care:'Wydra potrzebuje wodospadu spokoju. Krótka samotna chwila nie jest odrzuceniem — jest paliwem.',
    hard:'Granice, gdy relacja staje się męcząca' },
  { id:'sowa', emoji:'🦉', name:'Sowa', my:'moja sowa', gen:'sowy', O:85, C:75, E:30, A:55, N:45, key:'Myśl + spokój',
    line:'Jesteś sową — myślisz głębiej, wolisz noc, ciszę i jedno dobre pytanie od dziesięciu rozmów.',
    strengths:'widzisz wzorce i niuanse, które inni mijają; umiesz być z kimś w ciszy',
    care:'Sowa nie musi przestawiać się na rytm dnia. Zaplanuj ciemny kącik i godzinę bez bodźców.',
    hard:'Wyrażanie emocji, kiedy są niewygodne dla innych' },
  { id:'lis', emoji:'🦊', name:'Lis', my:'mój lis', gen:'lisa', O:85, C:55, E:70, A:35, N:40, key:'Spryt + ciekawość',
    line:'Jesteś jak lis — szybki umysł, wolna wola, niechęć do dreptania wydeptaną ścieżką.',
    strengths:'umiejętnie rozwiązujesz trudne sytuacje i widzisz kulisy',
    care:'Lis, który nie dowierza, bywa jakoś samotny. Kto jest osobą, której możesz dać realne zaufanie?',
    hard:'Cierpliwość do powtarzalności i „powinności”' },
  { id:'wilk', emoji:'🐺', name:'Wilk', my:'mój wilk', gen:'wilka', O:60, C:80, E:45, A:35, N:45, key:'Wierność + siła',
    line:'Jesteś jak wilk — lojalny/a wobec swoich, precyzyjny/a, poważnie traktujesz zobowiązania.',
    strengths:'dotrzymujesz słowa i bronisz swojej grupy',
    care:'Wilk chroni wszystkich. Kto dziś chroni wilka? Odpoczynek też jest obowiązkiem.',
    hard:'Proszenie o pomoc' },
  { id:'kot', emoji:'🐈', name:'Kot', my:'mój kot', gen:'kota', O:75, C:50, E:30, A:50, N:50, key:'Niezależność + łagodność',
    line:'Jesteś jak kot — blisko na Twój sposób, na Twoich zasadach, byle bez złapania za ogon.',
    strengths:'czułość, którą dajesz, jest wyjątkowa, bo dawkowana świadomie',
    care:'Kot potrzebuje mebla, na którym może być sam. Wpisz to na grafik.',
    hard:'Reagowanie na cudze „za chwilę”' },
  { id:'jelen', emoji:'🦌', name:'Jeleń', my:'mój jeleń', gen:'jelenia', O:70, C:60, E:40, A:85, N:70, key:'Czułość + wrażliwość',
    line:'Jesteś jak jeleń — delikatny/a, wyczulony/a na dźwięki i atmosferę, szybko uciekasz od ostrego tonu.',
    strengths:'wyjątkowa umiejętność wyczuwania, co ktoś naprawdę czuje',
    care:'Dźwięków i ludzi bywa za dużo. Zaplanuj jeden wieczór bez ekranów i pośpiechu.',
    hard:'Mówienie „nie” bez poczucia winy' },
  { id:'jez', emoji:'🦔', name:'Jeż', my:'mój jeż', gen:'jeża', O:55, C:60, E:25, A:55, N:75, key:'Ostrożność + miękkość',
    line:'Jesteś jak jeż — masz kolce, bo pod nimi jest coś bardzo miękkiego.',
    strengths:'ostrożnie, ale wiernie; Twoje zaufanie ma znaczenie',
    care:'Jeż zwija się tylko przy kimś, kto usiądzie obok i poczeka. Daj sobie to samo.',
    hard:'Pokazanie, że zależy Ci na kimś' },
  { id:'delfin', emoji:'🐬', name:'Delfin', my:'mój delfin', gen:'delfina', O:75, C:65, E:85, A:70, N:30, key:'Radość + kontakt',
    line:'Jesteś jak delfin — sprawny/a w relacjach, szybko wyczuwasz nastrój grupy.',
    strengths:'jesteś mostem między ludźmi, potrafisz rozładować napięcie',
    care:'Delfin cały czas na powierzchni — czasem w końcu brakuje powietrza. Cisza nie jest karą.',
    hard:'Mówienie o własnych trudnościach' },
  { id:'zolw', emoji:'🐢', name:'Żółw', my:'mój żółw', gen:'żółwia', O:45, C:70, E:35, A:70, N:25, key:'Stabilność + cierpliwość',
    line:'Jesteś jak żółw — wolisz własne tempo, ale to tempo dochodzi do celu.',
    strengths:'spokój, który obniża napięcie w całym pomieszczeniu',
    care:'Twoje tempo jest w porządku. Nie musisz ścigać się z ludźmi, którzy nie robią Twojej drogi.',
    hard:'Wyrażanie złości' },
  { id:'motyl', emoji:'🦋', name:'Motyl', my:'mój motyl', gen:'motyla', O:90, C:40, E:65, A:65, N:55, key:'Wyobraźnia + przemiana',
    line:'Jesteś jak motyl — wiele możliwości, wiele kierunków, ciągła przemiana.',
    strengths:'widzisz piękno tam, gdzie inni widzą zwykłość',
    care:'Trudno wylądować, gdy wszystko wydaje się interesujące. Jeden kwiat dziennie — jeden wybór.',
    hard:'Domknięcie zadań' },
  { id:'pszczola', emoji:'🐝', name:'Pszczoła', my:'moja pszczoła', gen:'pszczoły', O:55, C:85, E:65, A:60, N:45, key:'Praca + wspólnota',
    line:'Jesteś jak pszczoła — masz cel, rytm i potrzebę bycia potrzebnym/a.',
    strengths:'rzetelność, współpraca, konsekwencja',
    care:'Pszczoła nie odlatuje bez celu. Zaplanuj czas bezproduktywny jak spotkanie.',
    hard:'Odpoczynek bez poczucia marnotrawstwa' },
  { id:'paw', emoji:'🦚', name:'Paw', my:'mój paw', gen:'pawia', O:65, C:60, E:85, A:35, N:50, key:'Wyraźność + duma',
    line:'Jesteś jak paw — potrzebujesz być widziany/a i widzisz swoją wartość.',
    strengths:'odwaga w pokazywaniu siebie i swojego talentu',
    care:'Paw rozkłada ogon przed sobą, nie przed każdym. Komu naprawdę chcesz się pokazać?',
    hard:'Przyjmowanie krytyki bez poczucia, że podważa Twoją wartość' },
  { id:'niedzwiedz', emoji:'🐻', name:'Niedźwiedź', my:'mój niedźwiedź', gen:'niedźwiedzia', O:50, C:65, E:40, A:70, N:20, key:'Spokój + oparcie',
    line:'Jesteś jak niedźwiedź — spokojny/a, solidny/a, a w twoich ramionach można odetchnąć.',
    strengths:'stabilność i zdolność bycia oparciem w kryzysie',
    care:'Niedźwiedź potrzebuje snu. Twój rytm jest ważniejszy niż cudze tempo.',
    hard:'Zauważanie własnych potrzeb przed potrzebami innych' },
  { id:'pingwin', emoji:'🐧', name:'Pingwin', my:'mój pingwin', gen:'pingwina', O:50, C:80, E:50, A:85, N:45, key:'Wierność + troska',
    line:'Jesteś jak pingwin — trzymasz się swojej grupy, nie zostawiasz nikogo w zimnie.',
    strengths:'lojalność i ciepło w codziennych drobiazgach',
    care:'Pingwiny się wymieniają miejscami na skraju. Gdy prosisz o zmianę — to nie słabość.',
    hard:'Bycie „tym, który odejdzie pierwszy”' },
  { id:'krolik', emoji:'🐰', name:'Królik', my:'mój królik', gen:'królika', O:60, C:55, E:70, A:75, N:80, key:'Czułość + czujność',
    line:'Jesteś jak królik — szybko wyczuwasz niepokój, a jednocześnie potrafisz skakać z radości.',
    strengths:'empatia i gotowość do troski',
    care:'Królik ma oczy z boku, bo bardzo musi widzieć wszystko. Spróbuj raz nie widzieć wszystkiego.',
    hard:'Odpoczynek bez czuwania' },
  { id:'aksolotl', emoji:'🦎', name:'Aksolotl', my:'mój aksolotl', gen:'aksolotla', O:80, C:45, E:40, A:85, N:70, key:'Łagodność + wrażliwość',
    line:'Jesteś jak aksolotl — miękkie stworzenie z niezwykłą umiejętnością regeneracji.',
    strengths:'niesamowita umiejętność odbudowywania się po trudnych rzeczach',
    care:'Nawet aksolotl potrzebuje ciemnej wody. Wycisz bodźce, gdy jest za dużo.',
    hard:'Ochrona przed przeciążeniem' },
  { id:'orzel', emoji:'🦅', name:'Orzeł', my:'mój orzeł', gen:'orła', O:65, C:85, E:55, A:40, N:35, key:'Wizja + precyzja',
    line:'Jesteś jak orzeł — widzisz daleko i potrafisz być ponad tym, co cię męczy.',
    strengths:'perspektywa i opanowanie w chaosie',
    care:'Orzeł nie lata bez przerwy. Zniż się czasem do ciepłego gniazda.',
    hard:'Empatia vs własne standardy' },
];

function bfScoreFromAnswers(answers){
  // answers: array of 1..5 (index matches BF_ITEMS)
  const sums = { O:[], C:[], E:[], A:[], N:[] };
  BF_ITEMS.forEach((it, i) => {
    let v = answers[i] ?? 3;
    if (BF_REVERSED.has(it.f)) v = 6 - v;   // klucz odwróconych kodowań
    sums[it.d].push(v);
  });
  const out = {};
  Object.keys(sums).forEach(d => {
    const arr = sums[d];
    const avg = arr.reduce((a,b)=>a+b,0) / arr.length; // 1..5
    out[d] = Math.round(((avg - 1) / 4) * 100);
  });
  return out;
}

function distanceToAnimal(p, a){
  const w = { O:1.0, C:1.0, E:1.0, A:1.0, N:0.85 };
  let s = 0;
  Object.keys(w).forEach(k => { const d = (p[k] - a[k]) * w[k]; s += d*d; });
  return Math.sqrt(s);
}

function matchAnimals(profile){
  return ANIMALS.map(a => ({ ...a, dist: distanceToAnimal(profile, a) }))
    .sort((x,y) => x.dist - y.dist)
    .slice(0, 3);
}

function profileSummary(profile){
  const order = Object.entries(profile).sort((a,b)=>b[1]-a[1]);
  const top = BIG_FIVE_DIMS[order[0][0]].name;
  const low = BIG_FIVE_DIMS[order[4][0]].name;
  return `Najbardziej wyróżnia Cię ${top.toLowerCase()}, a najmniej — ${low.toLowerCase()}.`;
}

// ================= UI =================
const BF_STORE_KEY = 'emlove_personality';
let bfSession = { i: 0, answers: [], active: false };

if (typeof TITLES !== 'undefined') {
  TITLES.personality = ['Twoja osobowość 🐾', 'Test wielkiej piątki i Twój zwierzę-towarzysz — dla refleksji, nie diagnoza.'];
}

function bfLoadProfile() {
  try { return JSON.parse(localStorage.getItem(BF_STORE_KEY) || 'null'); } catch (e) { return null; }
}
function bfSaveProfile(p) { localStorage.setItem(BF_STORE_KEY, JSON.stringify(p)); }

function bfRender() {
  const root = document.getElementById('bfRoot');
  if (!root) return;
  const profile = bfLoadProfile();
  if (bfSession.active) return bfRenderQuestion();
  if (profile) return bfRenderResult(profile);
  bfRenderIntro();
}

function bfRenderIntro() {
  const root = document.getElementById('bfRoot');
  root.innerHTML = `
    <div class="card">
      <span class="badge">🐾 30 podskal · 5 wymiarów · ok. 4 minuty</span>
      <h2 style="margin:12px 0 8px">Poznaj swój sposób przeżywania świata</h2>
      <p class="muted">Odpowiesz na 30 krótkich zdań. Nie ma odpowiedzi lepszych ani gorszych — chodzi o to, jak jest u Ciebie, nie jak „powinno być”.</p>
      <div class="result-hint" style="background:#F1FBFA;border:1px solid #D8EDEA;border-radius:10px;padding:14px;margin:14px 0;font-size:.92rem;line-height:1.6;color:#0A6B66">
        <b>Na końcu poznasz zwierzę-towarzysza</b> — symbol Twojego profilu. Zwierzę nie jest etykietą ani diagnozą: to lustro, z którym łatwiej rozmawiać o sobie. Możesz je zmienić w każdej chwili, powtarzając test.
      </div>
      <p class="muted small">To narzędzie edukacyjne inspirowane strukturą testu wielkiej piątki (30 podskal). Nie zastępuje diagnozy psychologicznej. Wynik zapisuje się tylko w Twojej przeglądarce.</p>
      <button class="btn btn-primary" onclick="bfStart()">Zacznij test 🐾</button>
    </div>`;
}

function bfStart() {
  bfSession = { i: 0, answers: new Array(BF_ITEMS.length).fill(null), active: true };
  bfRenderQuestion();
  if (typeof SoundEngine !== 'undefined') SoundEngine.click();
}

function bfRenderQuestion() {
  const root = document.getElementById('bfRoot');
  const i = bfSession.i;
  const it = BF_ITEMS[i];
  const pct = Math.round((i / BF_ITEMS.length) * 100);
  root.innerHTML = `
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span class="bf-facet">${it.f}</span>
        <span class="muted small">${i + 1} / ${BF_ITEMS.length}</span>
      </div>
      <div class="bf-progress"><div style="width:${pct}%"></div></div>
      <h3 class="bf-q">${it.t}</h3>
      <p class="muted small">Na ile to o Tobie? Wybierz to, co pierwsze przychodzi.</p>
      <div class="bf-scale">
        ${BF_SCALE.map((label, idx) => `
          <button class="bf-opt" onclick="bfAnswer(${idx + 1})">
            <b>${idx + 1}</b><span>${label}</span>
          </button>`).join('')}
      </div>
      <div class="bf-nav">
        <button class="btn btn-ghost" onclick="bfPrev()" ${i === 0 ? 'disabled style="opacity:.4"' : ''}>← Wstecz</button>
        <span class="muted small" style="align-self:center">Bez pośpiechu. Możesz wrócić.</span>
      </div>
    </div>`;
}

function bfAnswer(v) {
  bfSession.answers[bfSession.i] = v;
  const isLast = bfSession.i >= BF_ITEMS.length - 1;
  if (!isLast) { bfSession.i++; bfRenderQuestion(); }
  try { if (typeof SoundEngine !== 'undefined') SoundEngine.soft(); } catch (e) {}
  if (isLast || bfSession.answers.every(a => a !== null)) bfFinish();
}

function bfPrev() {
  if (bfSession.i > 0) { bfSession.i--; bfRenderQuestion(); }
}

function bfFinish() {
  const answers = bfSession.answers.map(a => a ?? 3);
  const profile = bfScoreFromAnswers(answers);
  const matches = matchAnimals(profile);
  const record = {
    profile,
    animal: matches[0].id,
    answers,
    date: new Date().toISOString(),
  };
  bfSaveProfile(record);
  if (typeof SoundEngine !== 'undefined') SoundEngine.success();
  bfSession.active = false;
  bfRenderResult(record, true);
}

function bfRenderResult(record, justFinished = false) {
  const root = document.getElementById('bfRoot');
  const profile = record.profile;
  const matches = matchAnimals(profile);
  const animal = matches[0];
  const dims = ['O', 'C', 'E', 'A', 'N'];

  root.innerHTML = `
    ${justFinished ? `<div class="card" style="background:#0B1514;border-color:#1E332F;color:#F3FBFA">
      <h2 style="color:#F3FBFA;margin:0 0 4px">Gotowe. Dziękuję za szczerość ♥</h2>
      <p style="color:#B9D6D2;margin:0">To nie etykieta — to punkt wyjścia do rozmowy ze sobą.</p>
    </div>` : ''}

    <div class="bf-result-grid" style="margin-top:14px">
      <div class="card">
        <h3 style="margin-top:0">Twój profil</h3>
        <p class="muted small" style="margin-bottom:14px">${profileSummary(profile)}</p>
        ${dims.map(d => {
          const dim = BIG_FIVE_DIMS[d];
          const v = profile[d];
          return `<div class="bf-dim">
            <div class="bf-dim-head"><b>${dim.name}</b><span class="muted">${v}/100</span></div>
            <div class="bf-dim-bar"><div style="width:${v}%;background:${dim.color}"></div></div>
            <div class="muted small" style="margin-top:4px">${dim.desc}</div>
          </div>`;
        }).join('')}
        <p class="muted small" style="margin-top:10px">Wynik to opis tendencji, nie diagnoza. Zmienia się z czasem i sytuacją.</p>
      </div>

      <div>
        <div class="animal-card">
          <div class="animal-emoji">${animal.emoji}</div>
          <div class="animal-key">Twój zwierzę-towarzysz</div>
          <div class="animal-name">${animal.name}</div>
          <p class="animal-line">${animal.line}</p>
          <div class="animal-row"><b>Siła:</b><span>${animal.strengths}</span></div>
          <div class="animal-row"><b>Troska:</b><span>${animal.care}</span></div>
          <div class="animal-row"><b>Wyzwanie:</b><span>${animal.hard}</span></div>
        </div>
        <div class="card" style="margin-top:12px">
          <h3 style="margin-top:0">Inne bliskie zwierzęta</h3>
          <p class="muted small">Twój profil jest pomiędzy tymi zwierzętami — możesz się w nich odnaleźć.</p>
          <div class="animal-alt">
            ${matches.slice(1).map(a => `<div class="animal-chip"><span>${a.emoji}</span>${a.name}</div>`).join('')}
          </div>
        </div>
        <div class="card">
          <h3 style="margin-top:0">Co dalej?</h3>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            <button class="btn btn-primary" onclick="bfAskMilo()">💬 Zapytaj Milo o mój profil</button>
            <button class="btn btn-secondary" onclick="bfGoExercise()">🧩 Dopasowane ćwiczenie</button>
            <button class="btn btn-ghost" onclick="bfRestart()">↻ Powtórz test</button>
          </div>
          <div id="bfMiloOut" class="preview-box" style="display:none;margin-top:12px"></div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:14px">
      <h3 style="margin-top:0">🐾 Twoje zwierzę jako codzienne narzędzie</h3>
      <p class="muted">Zwierzę nie mówi, kim jesteś. Mówi, jak możesz o siebie zadbać — i o co warto zapytać w check-inie.</p>
      <ul class="muted" style="line-height:1.8;padding-left:18px">
        <li><b>Rano:</b> „Czego dzisiaj potrzebuje ${animal.my}?”</li>
        <li><b>Wieczorem:</b> „Co było dziś dla mnie trudne?” — i zapisz w dzienniku.</li>
        <li><b>W kryzysie:</b> przypomnij sobie: ${animal.care}</li>
      </ul>
      <p class="muted small">Test inspirowany strukturą wielkiej piątki (30 podskal). Emlove nie diagnozuje. W kryzysie: 116 123 · 112.</p>
    </div>`;
}

function bfRestart() {
  localStorage.removeItem(BF_STORE_KEY);
  bfSession = { i: 0, answers: [], active: false };
  bfRenderIntro();
}

function bfGoExercise() {
  goTo('exercises');
}

async function bfAskMilo() {
  const out = document.getElementById('bfMiloOut');
  const record = bfLoadProfile();
  if (!record || !out) return;
  const animal = ANIMALS.find(a => a.id === record.animal);
  out.style.display = 'block';
  out.textContent = 'Milo myśli…';

  const hasAI = (typeof aiSettings !== 'undefined') && aiSettings.enabled;
  if (!hasAI) {
    out.innerHTML = `<b>Milo:</b> Widzę, że blisko Ci do ${animal.gen} — ${animal.key.toLowerCase()}. Zamiast mówić Ci, co robić, zapytam: kiedy ostatnio czułeś/czułaś się jak ${animal.name.toLowerCase()} w dobrym tego słowa znaczeniu? I co wtedy było obecne?`;
    return;
  }
  try {
    const p = record.profile;
    const res = await callAI([
      { role: 'system', content: (typeof MILO_SYSTEM_PROMPT !== 'undefined' ? MILO_SYSTEM_PROMPT : '') + '\nKontekst: użytkownik zrobił test osobowości. Wynik (0-100): Otwartość ' + p.O + ', Sumienność ' + p.C + ', Ekstrawersja ' + p.E + ', Ugodowość ' + p.A + ', Wrażliwość emocjonalna ' + p.N + '. Symbol: ' + animal.name + '. Nie interpretuj wyniku jak diagnozy, nie mów "jesteś typem...". Zadaj jedno pytanie łączące profil z emocjami.' },
      { role: 'user', content: 'Zrobiłem/am test osobowości. Co mogę z tego wyniku zrobić dla siebie?' }
    ]);
    out.innerHTML = '<b>Milo:</b> ' + escapeHtml(res);
  } catch (e) {
    out.innerHTML = '<b>Milo:</b> Nie mam teraz połączenia z modelem, ale zapytam po swojemu: co w Twoim profilu wydaje Ci się najbardziej prawdziwe — i co najmniej?';
  }
}

// init
document.addEventListener('DOMContentLoaded', () => { if (document.getElementById('bfRoot')) bfRender(); });
if (document.readyState !== 'loading') { if (document.getElementById('bfRoot')) bfRender(); }
