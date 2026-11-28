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

// Pytania otwarte: symbol nie przypisuje cech użytkownikowi.
const ANIMAL_REFLECTIONS = {
  "wyspa": "Co przychodzi Ci na myśl, kiedy myślisz o zabawie lub bliskości?",
  "sowa": "Jakie skojarzenia budzą w Tobie cisza i uważność?",
  "lis": "Jakie znaczenie ma dla Ciebie ciekawość?",
  "wilk": "Co przychodzi Ci na myśl, gdy myślisz o zaufaniu i więzi?",
  "kot": "Jak rozumiesz przestrzeń dla siebie?",
  "jelen": "Co kojarzy Ci się z delikatnością?",
  "jez": "Jakie znaczenie mają dla Ciebie granice?",
  "delfin": "Co przychodzi Ci na myśl, gdy myślisz o kontakcie z innymi?",
  "zolw": "Jakie skojarzenia budzi w Tobie własne tempo?",
  "motyl": "Co przychodzi Ci na myśl, gdy myślisz o zmianie?",
  "pszczola": "Jak rozumiesz współpracę?",
  "paw": "Co dla Ciebie oznacza pokazywanie siebie innym?",
  "niedzwiedz": "Jakie skojarzenia budzi w Tobie odpoczynek?",
  "pingwin": "Co dla Ciebie oznacza bycie częścią grupy?",
  "krolik": "Jakie skojarzenia masz z uważnością na otoczenie?",
  "aksolotl": "Co przychodzi Ci na myśl, kiedy słyszysz słowo «regeneracja»?",
  "orzel": "Jakie znaczenie ma dla Ciebie patrzenie na coś z innej perspektywy?"
};
function animalReflection(id) { return bfAnimals()[id]?.question || ANIMAL_REFLECTIONS[id] || 'Jakie skojarzenia budzi w Tobie ten symbol?'; }

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
  return bfText('summary','This summary is based on your answers in this exercise. It is not a diagnosis or comparison with other people.');
}

// ================= UI =================
const BF_STORE_KEY = 'emlove_personality';
let bfSession = { i: 0, answers: [], active: false };
function bfText(key,fallback,vars){return window.EmloveLocale?.content('personality-ui',key,vars)||fallback;}
function bfItems(){return window.EmloveLocale?.content('personality-items')||{};}
function bfAnimals(){return window.EmloveLocale?.content('animal-reflections','animals')||{};}
function bfEsc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function bfAnimalName(id){return bfAnimals()[id]?.name||ANIMALS.find(a=>a.id===id)?.name||id;}

if (typeof TITLES !== 'undefined') {
  TITLES.personality = ['page.personality.title', 'page.personality.subtitle'];
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
      <span class="badge">🐾 ${bfEsc(bfText('intro','30 statements · 5 dimensions · about 4 minutes.'))}</span>
      <h2 style="margin:12px 0 8px">${bfEsc(bfText('title','Your personality'))}</h2>
      <h3>${bfEsc(bfText('purposeTitle','Why in Emlove?'))}</h3>
      <p class="muted">${bfEsc(bfText('purpose','This exercise is a starting point for your own reflection.'))}</p>
      <h3>${bfEsc(bfText('rulesTitle','How it works'))}</h3>
      <div class="result-hint">${bfEsc(bfText('rules','There are no right or wrong answers.'))}</div>
      <p class="muted small">${bfEsc(bfText('disclaimer','This is an educational exercise, not a diagnosis.'))}</p>
      <button class="btn btn-primary" onclick="bfStart()">${bfEsc(bfText('start','Start the test 🐾'))}</button>
    </div>`;
}

function bfStart() {
  bfSession = { i: 0, answers: new Array(BF_ITEMS.length).fill(null), active: true };
  bfRenderQuestion();
  if (typeof SoundEngine !== 'undefined') SoundEngine.click();
}

function bfRenderQuestion() {
  const root=document.getElementById('bfRoot'),i=bfSession.i,it=BF_ITEMS[i],pct=Math.round((i/BF_ITEMS.length)*100),pack=bfItems();
  const facet=pack.facets?.[i]||it.f,text=pack.items?.[i]||it.t,scale=pack.scale||BF_SCALE;
  root.innerHTML=`
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center"><span class="bf-facet">${bfEsc(facet)}</span><span class="muted small">${i+1} / ${BF_ITEMS.length}</span></div>
      <div class="bf-progress"><div style="width:${pct}%"></div></div>
      <h3 class="bf-q">${bfEsc(text)}</h3>
      <p class="muted small">${bfEsc(bfText('quizHint','How much is this like you? Choose your first impression.'))}</p>
      <div class="bf-scale">${scale.map((label,idx)=>`<button class="bf-opt" onclick="bfAnswer(${idx+1})"><b>${idx+1}</b><span>${bfEsc(label)}</span></button>`).join('')}</div>
      <div class="bf-nav">
        <button class="btn btn-ghost" onclick="bfPrev()" ${i===0?'disabled style="opacity:.4"':''}>${bfEsc(bfText('back','← Back'))}</button>
        <span class="muted small" style="align-self:center">${bfEsc(bfText('quizFooter','Take your time. You can go back.'))}</span>
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
      <h2 style="color:#F3FBFA;margin:0 0 4px">${bfEsc(bfText('finished','Finished. Thank you for your honesty ♥'))}</h2>
      <p style="color:#B9D6D2;margin:0">${bfEsc(bfText('finishedNote','This is a starting point for reflection, not a label.'))}</p>
    </div>` : ''}

    <div class="bf-result-grid" style="margin-top:14px">
      <div class="card">
        <h3 style="margin-top:0">${bfEsc(bfText('profile','Your profile'))}</h3>
        <p class="muted small" style="margin-bottom:14px">${profileSummary(profile)}</p>
        ${dims.map(d => {
          const sourceDim=BIG_FIVE_DIMS[d],localizedDim=bfItems().dimensions?.[d]||{};
          const dim={...sourceDim,name:localizedDim.name||sourceDim.name,desc:localizedDim.description||sourceDim.desc};
          const v = profile[d];
          return `<div class="bf-dim">
            <div class="bf-dim-head"><b>${dim.name}</b><span class="muted">${v}/100</span></div>
            <div class="bf-dim-bar"><div style="width:${v}%;background:${dim.color}"></div></div>
            <div class="muted small" style="margin-top:4px">${dim.desc}</div>
          </div>`;
        }).join('')}
        <p class="muted small" style="margin-top:10px">${bfEsc(bfText('valuesNote','Values come from your answers in this exercise. They are not a diagnosis or comparison.'))}</p>
      </div>

      <div>
        <div class="animal-card">
          <div class="animal-emoji">${animal.emoji}</div>
          <div class="animal-key">${bfEsc(bfText('symbol','Companion animal'))}</div>
          <div class="animal-name">${bfEsc(bfAnimalName(animal.id))}</div>
          <p class="animal-line">${bfEsc(bfText('symbolDescription','A symbol selected from your answers: an invitation to reflect, not a description of who you are.'))}</p>
          <div class="animal-row"><b>${bfEsc(bfText('miloAsks','Milo asks:'))}</b><span>${bfEsc(animalReflection(animal.id))}</span></div>
        </div>
        <div class="card" style="margin-top:12px">
          <h3 style="margin-top:0">${bfEsc(bfText('other','Other symbols selected from your answers'))}</h3>
          <p class="muted small">${bfEsc(bfText('otherNote','These are other symbols selected by the same method; you do not have to identify with them.'))}</p>
          <div class="animal-alt">
            ${matches.slice(1).map(a => `<div class="animal-chip"><span>${a.emoji}</span>${bfEsc(bfAnimalName(a.id))}</div>`).join('')}
          </div>
        </div>
        <div class="card">
          <h3 style="margin-top:0">${bfEsc(bfText('whatNext','What next?'))}</h3>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            <button class="btn btn-primary" onclick="bfAskMilo()">${bfEsc(bfText('askMilo','💬 Ask Milo about my profile'))}</button>
            <button class="btn btn-secondary" onclick="bfGoExercise()">${bfEsc(bfText('goExercises','🧩 Go to exercises'))}</button>
            <button class="btn btn-ghost" onclick="bfRestart()">↻ ${bfEsc(bfText('repeat','Repeat the test'))}</button>
          </div>
          <div id="bfMiloOut" class="preview-box" style="display:none;margin-top:12px"></div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:14px">
      <p class="muted small">${bfEsc(window.EmloveLocale?.t('app.disclaimer')||'Emlove is an educational tool for adults, not therapy.')} ${bfEsc(bfText('regionHelp','Support contacts for your device region:'))} <span data-crisis-summary></span>.</p>
    </div>`;
}

function bfRestart() {
  // Zachowaj poprzedni wynik, dopóki nowy test nie zostanie ukończony.
  bfStart();
}

function bfGoExercise() {
  goTo('exercises');
}

function bfAskMilo() {
  const out = document.getElementById('bfMiloOut');
  const record = bfLoadProfile();
  if (!record || !out) return;
  // Odpowiedź lokalna: bez wysyłania odpowiedzi i profilu do internetu.
  out.style.display = 'block';
  const shown = record.profile ? matchAnimals(record.profile)[0] : null;
  out.textContent = bfText('miloAsks','Milo asks:')+' '+animalReflection(shown ? shown.id : record.animal);
}

// init
document.addEventListener('DOMContentLoaded', () => { if (document.getElementById('bfRoot')) bfRender(); });
if (document.readyState !== 'loading') { if (document.getElementById('bfRoot')) bfRender(); }
