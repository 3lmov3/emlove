// ============================================================
// Emlove — zaawansowane ćwiczenia i symulacje na bazie koła emocji
// 4 · Rozróżnij  5 · Natężenie  6 · Ciało  7 · Potrzeba
// Wymaga: wheel.js (WHEEL_FAMILIES, WHEEL_WORDS), app.js (state, addPoints, SoundEngine)
// ============================================================

/* ---------- 4. ROZRÓŻNIJ: bliskie słowa, różne znaczenia ---------- */
const DISTINGUISH_Q = [
  {
    text: 'Na spotkaniu kolega powiedział przy wszystkich, że Twój pomysł „jest bez sensu”. W środku czujesz coś ostrego i chcesz zniknąć.',
    options: ['zlekceważony', 'odrzucony', 'zawiedziony'],
    answer: 0,
    explain: 'Zlekceważony — ktoś pomniejszył wartość Twojego zdania przy innych. Odrzucenie dotyczy bycia odepchniętym (np. „nie chcę z tobą iść”), a zawiedzenie — niespełnionego oczekiwania.',
  },
  {
    text: 'Bliska osoba trzeci raz z rzędu odwołuje Wasze spotkanie, tym razem bez konkretnego powodu.',
    options: ['zawiedziony', 'zraniony', 'zirytowany'],
    answer: 0,
    explain: 'Zawiedziony — miałeś/miałaś oczekiwanie, które się nie spełniło. Zranienie pojawia się, gdy ktoś dotknie czegoś czułego w relacji; irytacja byłaby lżejsza i bardziej „drobna”.',
  },
  {
    text: 'Partner/partnerka spędza coraz więcej czasu z nową osobą z pracy. Czujesz niepokój, gdy o tym myślisz.',
    options: ['zazdrość', 'zawiść', 'lęk przed oceną'],
    answer: 0,
    explain: 'Zazdrość dotyczy relacji — boisz się utraty bliskości. Zawiść dotyczy dobra, którego nie masz (awans, dom, talent). Lęk przed oceną byłby o tym, jak wypadasz w oczach innych.',
  },
  {
    text: 'Siostra dostała awans i dom, o jakim marzysz. Cieszysz się za nią, ale w żołądku czujesz ukłucie.',
    options: ['zawiść', 'zazdrość', 'pogarda'],
    answer: 0,
    explain: 'Zawiść — boli brak dobra, które ma ktoś inny. To nie znaczy, że jesteś złym człowiekiem: zawiść pokazuje, czego pragniesz. Zazdrość byłaby o relację, nie o rzecz.',
  },
  {
    text: 'Masz oddać projekt w piątek. Zostało mało czasu. W głowie ciągle pojawia się „a jeśli nie zdążę, a jeśli ocenią mnie źle”.',
    options: ['lęk', 'strach', 'panika'],
    answer: 0,
    explain: 'Lęk — rozproszony niepokój o przyszłość, „co będzie, jeśli…”. Strach ma konkretny obiekt tu i teraz (np. pies na ulicy), panika to już ciało przejmujące kontrolę.',
  },
  {
    text: 'Od kilku dni czujesz ciężar w klatce piersiowej, brak sił i obojętność wobec rzeczy, które zwykle Cię cieszyły.',
    options: ['przygnębienie', 'smutek', 'zniechęcenie'],
    answer: 0,
    explain: 'Przygnębienie — obniżony nastrój utrzymujący się dłużej, z brakiem energii. Smutek jest zwykle reakcją na konkretną stratę; zniechęcenie wiąże się z utratą motywacji do wysiłku.',
  },
  {
    text: 'Powiedziałeś/powiedziałaś coś ostrego osobie, którą kochasz. Teraz myślisz: „jak mogłem/mogłam tak zrobić?”.',
    options: ['wina', 'wstyd', 'zranienie'],
    answer: 0,
    explain: 'Wina dotyczy czynu: „zrobiłem coś, co kogoś zraniło”. Wstyd dotyczy całej osoby: „jestem do niczego”. Ta różnica jest ważna — winę można naprawić, wstyd trzeba otulić.',
  },
  {
    text: 'Zgodziłeś/zgodziłaś się pomóc, choć nie miałaś/miałeś siły. Teraz czujesz napięcie i pretensję, ale bardziej do siebie niż do kogoś.',
    options: ['żal do siebie', 'wina', 'uraza'],
    answer: 0,
    explain: 'Żal do siebie to pretensja o własną decyzję. Uraza byłaby skierowana do drugiej osoby. Wina pojawia się, gdy przekroczysz własne wartości — tu raczej zawiodła granica.',
  },
  {
    text: 'Ktoś przy stole skomentował Twój wygląd. Ludzie się roześmiali, a Ty chcesz zapaść się pod ziemię.',
    options: ['upokorzony', 'zażenowany', 'skrępowany'],
    answer: 0,
    explain: 'Upokorzenie ma świadków — ktoś obniżył Twoją godność publicznie. Zażenowanie jest łagodniejsze (np. gdy powiesz coś nie w porę), skrępowanie to dyskomfort bez oceny z zewnątrz.',
  },
  {
    text: 'Szef chwali wszystkich po kolei, o Twojej pracy nie mówi nic. Czujesz ucisk w gardle.',
    options: ['niedoceniony', 'odrzucony', 'zazdrosny'],
    answer: 0,
    explain: 'Niedocenienie dotyczy wysiłku, którego nikt nie zauważył. Odrzucenie to „nie chcę cię”. Zazdrość byłaby o konkretne wyróżnienie innej osoby.',
  },
  {
    text: 'Dowiedziałeś/dowiedziałaś się, że bliski przyjaciel opowiadał o Twoich sprawach osobom trzecim.',
    options: ['zdradzony', 'rozczarowany', 'wściekły'],
    answer: 0,
    explain: 'Zdrada dotyczy zaufania i intymności — ktoś użył Twojej słabości bez zgody. Rozczarowanie jest łagodniejsze, wściekłość opisuje natężenie, nie treść.',
  },
  {
    text: 'Czekasz na wynik ważnego badania. Nie masz jeszcze informacji, ale ciało jest spięte, a myśli wracają do najgorszego scenariusza.',
    options: ['niepokój', 'przerażenie', 'przygnębienie'],
    answer: 0,
    explain: 'Niepokój to napięcie przed nieznanym wynikiem. Przerażenie pojawia się, gdy zagrożenie jest już realne i bliskie. Przygnębienie dotyczy nastroju, nie oczekiwania.',
  },
  {
    text: 'Po kłótni została Ci napięta szczęka i myśl: „jeszcze jedno zdanie i wybuchnę”.',
    options: ['gniew', 'irytacja', 'frustracja'],
    answer: 0,
    explain: 'Gniew — silna złość z gotowością do działania. Irytacja jest lżejsza i bardziej powierzchowna, frustracja wiąże się z blokadą dążenia („staram się i nic”).',
  },
  {
    text: 'Ktoś bliski opowiada o swoim sukcesie, a Ty czujesz jednocześnie ciepło i ukłucie.',
    options: ['duma z innym i zawiść', 'pogarda', 'obojętność'],
    answer: 0,
    explain: 'Emocje mogą występować razem. Duma z bliskiej osoby i zawiść mogą współistnieć — to nie sprzeczność, to informacja o tym, czego pragniesz dla siebie.',
  },
];

/* ---------- 5. NATĘŻENIE: drabiny siły emocji ---------- */
const INTENSITY_LADDERS = [
  { family: 'Złość', color: '#C2435E', words: ['zirytowany', 'poirytowany', 'rozdrażniony', 'sfrustrowany', 'rozgniewany', 'wściekły'] },
  { family: 'Lęk i strach', color: '#7B62C4', words: ['zaniepokojony', 'zdenerwowany', 'przestraszony', 'przerażony', 'spanikowany'] },
  { family: 'Smutek', color: '#2F6F9B', words: ['przybity', 'przygnębiony', 'zraniony', 'załamany'] },
  { family: 'Wstyd i uraza', color: '#A84C74', words: ['skrępowany', 'zażenowany', 'zawstydzony', 'upokorzony'] },
  { family: 'Radość', color: '#0F8C86', words: ['zadowolony', 'wesoły', 'radosny', 'pełen entuzjazmu'] },
  { family: 'Niechęć', color: '#4F8A63', words: ['niechętny', 'sceptyczny', 'zdegustowany', 'obrzydzony'] },
  { family: 'Zaskoczenie', color: '#E08A4A', words: ['zdziwiony', 'zaskoczony', 'zdumiony', 'oszołomiony'] },
];

/* ---------- Generatory z koła ---------- */
function pickN(arr, n, exclude = []) {
  const pool = arr.filter(x => !exclude.includes(x));
  const out = [];
  while (out.length < n && pool.length) out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  return out;
}

function buildBodyQuestions(count = 12) {
  return WHEEL_FAMILIES.slice(0, count).map(f => {
    const others = pickN(WHEEL_FAMILIES.filter(x => x.id !== f.id).map(x => x.name), 3);
    const options = [...others, f.name].sort(() => Math.random() - 0.5);
    return {
      text: f.signal,
      options,
      answer: options.indexOf(f.name),
      explain: `To sygnały ${f.gen}. Ta rodzina prosi zwykle o: ${f.need}. Pamiętaj — ciało mówi językiem emocji, ale każdy organizm jest inny.`,
    };
  });
}

function buildNeedQuestions() {
  const allNeeds = WHEEL_FAMILIES.map(f => f.need);
  return WHEEL_FAMILIES.map(f => {
    const others = pickN(allNeeds.filter(n => n !== f.need), 3);
    const options = [...others, f.need].sort(() => Math.random() - 0.5);
    return {
      text: `Czujesz wyraźnie emocję z rodziny „${f.name}”. O co najczęściej prosi ta emocja?`,
      options,
      answer: options.indexOf(f.need),
      explain: `${f.name} niesie informację o potrzebie: ${f.need}. Nie musisz jej spełnić od razu — nazwanie jej jest pierwszym krokiem.`,
    };
  });
}

/* ---------- Stan ćwiczeń ---------- */
const ex2 = {
  distinguishIdx: 0,
  intensityIdx: 0,
  bodyQs: [],
  needQs: [],
  bodyIdx: 0,
  needIdx: 0,
  intensityQs: [],
};
ex2.bodyQs = buildBodyQuestions();
ex2.needQs = buildNeedQuestions();

function buildIntensityQuestions() {
  return INTENSITY_LADDERS.flatMap(l => {
    const pairs = [];
    for (let i = 0; i < l.words.length - 1; i++) pairs.push(i);
    return pairs.map(i => {
      const correct = l.words[l.words.length - 1];
      const opts = [l.words[i], l.words[i + 1], correct].sort(() => Math.random() - 0.5);
      return {
        text: `Rodzina: ${l.family}. Które słowo opisuje najsilniejsze natężenie?`,
        options: opts,
        answer: opts.indexOf(correct),
        explain: `Drabina natężenia w rodzinie „${l.family}”: ${l.words.join(' → ')}. Im dalej w prawo, tym większa siła — i zwykle większa potrzeba zadbania o siebie.`,
        ladder: l,
      };
    });
  });
}
ex2.intensityQs = buildIntensityQuestions();

/* ---------- Render: 4 · Rozróżnij ---------- */
function renderDistinguish() {
  const q = DISTINGUISH_Q[ex2.distinguishIdx % DISTINGUISH_Q.length];
  document.getElementById('distinguishCard').innerHTML = `
    <h2>🎯 Rozróżnij — bliskie słowa <span class="muted">(${ex2.distinguishIdx + 1}/${DISTINGUISH_Q.length})</span></h2>
    <p class="muted">Koło emocji ma kilkadziesiąt słów, które brzmią podobnie, ale znaczą co innego. Wybierz to, które najlepiej pasuje do sytuacji.</p>
    <div class="scenario-box"><strong>Sytuacja:</strong> ${q.text}</div>
    <div class="exercise-options">${q.options.map((o, i) => `<button class="choice-btn" onclick="answerDistinguish(${i})">${o}</button>`).join('')}</div>
    <div id="distinguishFeedback"></div>`;
}
function answerDistinguish(i) {
  const q = DISTINGUISH_Q[ex2.distinguishIdx % DISTINGUISH_Q.length];
  const ok = i === q.answer;
  const correctWord = q.options[q.answer];
  const chosen = q.options[i];
  document.getElementById('distinguishFeedback').innerHTML = `
    <div class="feedback ${ok ? 'good' : 'try'}">
      ${ok ? `✓ <strong>Dokładnie: ${correctWord}.</strong> ` : `💡 <strong>Bliżej: ${correctWord}</strong> (wybrałeś/wybrałaś „${chosen}”). `}
      ${q.explain}
      <br><br><button class="btn btn-primary" onclick="nextDistinguish()">Następne rozróżnienie →</button>
    </div>`;
  if (ok) { state.exercisesDone++; addPoints(6); try { SoundEngine.success(); } catch (e) {} }
  else { try { SoundEngine.soft(); } catch (e) {} }
}
function nextDistinguish() { ex2.distinguishIdx++; renderDistinguish(); }

/* ---------- Render: 5 · Natężenie ---------- */
function renderIntensity() {
  const q = ex2.intensityQs[ex2.intensityIdx % ex2.intensityQs.length];
  document.getElementById('intensityCard').innerHTML = `
    <h2>📶 Natężenie emocji <span class="muted">(${ex2.intensityIdx + 1}/${ex2.intensityQs.length})</span></h2>
    <p class="muted">Ta sama emocja może mieć różną siłę. Rozpoznanie natężenia pomaga dobrać reakcję — inaczej odpowiadasz na irytację, inaczej na wściekłość.</p>
    <div class="scenario-box"><strong>${q.text}</strong></div>
    <div class="exercise-options">${q.options.map((o, i) => `<button class="choice-btn" onclick="answerIntensity(${i})">${o}</button>`).join('')}</div>
    <div id="intensityFeedback"></div>`;
}
function answerIntensity(i) {
  const q = ex2.intensityQs[ex2.intensityIdx % ex2.intensityQs.length];
  const ok = i === q.answer;
  document.getElementById('intensityFeedback').innerHTML = `
    <div class="feedback ${ok ? 'good' : 'try'}">
      ${ok ? '✓ <strong>Dobrze.</strong> ' : `💡 <strong>Najsilniejsze jest: ${q.options[q.answer]}.</strong> `}
      ${q.explain}
      <br><br><button class="btn btn-primary" onclick="nextIntensity()">Następna drabina →</button>
    </div>`;
  if (ok) { state.exercisesDone++; addPoints(5); try { SoundEngine.success(); } catch (e) {} }
  else { try { SoundEngine.soft(); } catch (e) {} }
}
function nextIntensity() { ex2.intensityIdx++; renderIntensity(); }

/* ---------- Render: 6 · Ciało ---------- */
function renderBodyEx() {
  const q = ex2.bodyQs[ex2.bodyIdx % ex2.bodyQs.length];
  document.getElementById('bodyExCard').innerHTML = `
    <h2>🫀 Ciało → emocja <span class="muted">(${ (ex2.bodyIdx % ex2.bodyQs.length) + 1}/${ex2.bodyQs.length})</span></h2>
    <p class="muted">Emocje zawsze mają wymiar cielesny. Przeczytaj sygnały i wybierz rodzinę emocji, do której najczęściej należą.</p>
    <div class="scenario-box"><strong>W ciele:</strong> ${q.text}</div>
    <div class="exercise-options">${q.options.map((o, i) => `<button class="choice-btn" onclick="answerBodyEx(${i})">${o}</button>`).join('')}</div>
    <div id="bodyExFeedback"></div>`;
}
function answerBodyEx(i) {
  const q = ex2.bodyQs[ex2.bodyIdx % ex2.bodyQs.length];
  const ok = i === q.answer;
  document.getElementById('bodyExFeedback').innerHTML = `
    <div class="feedback ${ok ? 'good' : 'try'}">
      ${ok ? '✓ <strong>Tak.</strong> ' : `💡 <strong>To najczęściej: ${q.options[q.answer]}.</strong> `}
      ${q.explain}
      <p class="muted small">To orientacja, nie diagnoza — te same sygnały mogą u Ciebie znaczyć coś innego.</p>
      <br><button class="btn btn-primary" onclick="nextBodyEx()">Następne ciało →</button>
    </div>`;
  if (ok) { state.exercisesDone++; addPoints(5); try { SoundEngine.success(); } catch (e) {} }
  else { try { SoundEngine.soft(); } catch (e) {} }
}
function nextBodyEx() { ex2.bodyIdx++; renderBodyEx(); }

/* ---------- Render: 7 · Potrzeba ---------- */
function renderNeedEx() {
  const q = ex2.needQs[ex2.needIdx % ex2.needQs.length];
  document.getElementById('needExCard').innerHTML = `
    <h2>🎁 Emocja → potrzeba <span class="muted">(${(ex2.needIdx % ex2.needQs.length) + 1}/${ex2.needQs.length})</span></h2>
    <p class="muted">Każda emocja jest informacją o potrzebie. Rozpoznanie jej zmienia „jestem słaby” w „potrzebuję czegoś konkretnego”.</p>
    <div class="scenario-box"><strong>${q.text}</strong></div>
    <div class="exercise-options">${q.options.map((o, i) => `<button class="choice-btn" onclick="answerNeedEx(${i})">${o}</button>`).join('')}</div>
    <div id="needExFeedback"></div>`;
}
function answerNeedEx(i) {
  const q = ex2.needQs[ex2.needIdx % ex2.needQs.length];
  const ok = i === q.answer;
  document.getElementById('needExFeedback').innerHTML = `
    <div class="feedback ${ok ? 'good' : 'try'}">
      ${ok ? '✓ <strong>Tak.</strong> ' : `💡 <strong>Ta emocja prosi zwykle o: ${q.options[q.answer]}.</strong> `}
      ${q.explain}
      <br><br><button class="btn btn-primary" onclick="nextNeedEx()">Następna emocja →</button>
    </div>`;
  if (ok) { state.exercisesDone++; addPoints(5); try { SoundEngine.success(); } catch (e) {} }
  else { try { SoundEngine.soft(); } catch (e) {} }
}
function nextNeedEx() { ex2.needIdx++; renderNeedEx(); }

/* ---------- Zaawansowane symulacje ---------- */
const ADVANCED_SIMS = [
  {
    id: 'boss', icon: '🗂️', title: 'Trudna rozmowa z szefem', short: 'Feedback, który zabolał. Cztery kroki: ciało, słowo, potrzeba, decyzja.', advanced: true,
    story: 'Szef wezwał Cię na rozmowę o projekcie. Mówi rzeczowo, ale przy jednym zdaniu: „to było słabe” — czujesz gorąco w twarzy i ucisk w gardle. Po chwili milczenia pyta: „co o tym myślisz?”.',
    steps: [
      { q: 'Co pierwsze zauważasz w ciele?', choices: [
        { t: 'Gorąco w twarzy, ucisk w gardle — chcę zniknąć', next: 'To sygnały wstydu i urazy. Wstyd mówi „jestem oceniany”, uraza — „potraktowano mnie niesprawiedliwie”. Oba są informacją, nie wyrokiem.' },
        { t: 'Napięta szczęka, przyspieszony oddech', next: 'To złość. Pojawia się, gdy dotknięta zostaje granica albo poczucie sprawiedliwości. Złość nie jest zła — chroni coś ważnego.' },
        { t: 'Ścisk w żołądku, chcę się wycofać', next: 'To lęk wobec oceny i konsekwencji. Lęk pokazuje, na czym Ci zależy — tutaj prawdopodobnie na tym, jak Cię widzą.' },
      ]},
      { q: 'Które słowo jest najprecyzyjniejsze dla tego, co czujesz?', choices: [
        { t: 'Zlekceważony — pomniejszono moją pracę', next: 'Zlekceważenie dotyczy wartości Twojego wysiłku. To ważna różnica wobec „jestem do niczego” — to nie o Tobie, a o ocenie jednego efektu.' },
        { t: 'Upokorzony — ale świadków było tylko dwóch', next: 'Upokorzenie potrzebuje publiczności. W rozmowie jeden na jeden bliżej jest urazy lub wstydu. Co z tych dwóch bardziej pasuje?' },
        { t: 'Zdenerwowany — tak najprościej', next: '„Zdenerwowany” jest ogólne. Spróbuj zejść poziom niżej: czy bliżej Ci do złości, lęku, czy wstydu? To zmienia to, czego potrzebujesz.' },
      ]},
      { q: 'O co prosi ta emocja?', choices: [
        { t: 'O szacunek i konkretną informację zwrotną', next: 'Szacunek i konkret to realne potrzeby. Można je wyrazić prośbą: „chcę zrozumieć, co dokładnie było słabe, żeby to poprawić”.' },
        { t: 'O chwilę, żeby ochłonąć', next: 'Przerwa to zadbanie o siebie, nie ucieczka — pod warunkiem, że zapowiesz powrót: „potrzebuję 10 minut, potem wrócę do tematu”.' },
        { t: 'O docenienie całej mojej pracy', next: 'Docenienie jest ważne, ale w tej chwili może być nieosiągalne. Możesz o nie poprosić osobno, innym razem — bez łączenia z tą jedną oceną.' },
      ]},
      { q: 'Co wybierasz? Decyzja jest Twoja.', choices: [
        { t: 'Powiem: „Czuję urazę, gdy słyszę «słabe». Potrzebuję konkretów, żeby wiedzieć, co zmienić”', next: 'To komunikat „Ja”: emocja + kontekst + potrzeba prośby. Nie ocenia szefa, opisuje Twoje odczucie. Jak myślisz, co usłyszysz w odpowiedzi?' },
        { t: 'Poproszę o 10 minut przerwy i wrócę z pytaniem o kryteria', next: 'Przerwa plus konkretne pytanie to połączenie troski o siebie i profesjonalizmu. Co chcesz przygotować przez te 10 minut?' },
        { t: 'Powiem tylko „rozumiem, poprawię” i wyjdę', next: 'To też wybór — czasem najbezpieczniejszy. Ale co zostanie w Tobie po wyjściu? Jeśli uraza zostanie, warto dać jej miejsce później: w dzienniku albo rozmowie z Milo.' },
      ]},
    ],
  },
  {
    id: 'boundary', icon: '🚪', title: 'Odmowa, która nie rani', short: 'Ktoś prosi o coś, na co nie masz siły. Granica bez poczucia winy.', advanced: true,
    story: 'Bliska osoba prosi Cię o pomoc w weekend. Masz za sobą ciężki tydzień i wiesz, że nie dasz rady. Już otwierasz usta, żeby powiedzieć „dobrze, pomogę” — i czujesz ucisk w klatce.',
    steps: [
      { q: 'Co się dzieje w Tobie, gdy słyszysz prośbę?', choices: [
        { t: 'Napięcie i chęć spełnienia prośby za wszelką cenę', next: 'To często wina wyprzedzająca myśl („będę złym człowiekiem, jeśli odmówię”). Wina mówi o wartościach — nie musi decydować o działaniu.' },
        { t: 'Złość, że znowu to ja mam pomagać', next: 'Złość może chronić Twoją granicę i potrzebę odpoczynku. Ona nie mówi „ta osoba jest zła”, mówi „mam za mało zasobów”.' },
        { t: 'Smutek i bezradność', next: 'Smutek przy prośbie bywa tęsknotą za tym, żeby ktoś zapytał, jak Ty się masz. To ważna informacja o potrzebie kontaktu.' },
      ]},
      { q: 'Jak nazwiesz to najprecyzyjniej?', choices: [
        { t: 'Wina', next: 'Wina dotyczy czynu („odmawiam pomocy”). Możesz ją uznać i mimo niej wybrać siebie — to nie sprzeczność.' },
        { t: 'Przeciążenie', next: 'Przeciążenie to stan, nie słabość. Jeśli go nazwiesz, łatwiej powiedzieć: „w tym tygodniu nie mam zasobów”, bez tłumaczenia się z całego życia.' },
        { t: 'Uraza — że nikt nie widzi mojego zmęczenia', next: 'Uraza pokazuje potrzebę bycia zauważonym. Możesz powiedzieć ją wprost: „chciałbym, żeby ktoś zapytał, jak ja się mam”.' },
      ]},
      { q: 'Czego potrzebujesz w tej relacji?', choices: [
        { t: 'Granicy i szacunku dla mojego czasu', next: 'Granica nie zamyka relacji — ustawia warunki, w których można w niej być. Jak chcesz ją wypowiedzieć?' },
        { t: 'Kontaktu bez warunku pomagania', next: 'To ważna potrzeba: być blisko, nie tylko być użytecznym. Jak możesz ją zaproponować zamiast pomocy?' },
        { t: 'Odpoczynku, także od decyzji', next: 'Czasem najpierw odpoczynek, potem odpowiedź. Możesz powiedzieć: „dam znać wieczorem” — to też pełnoprawna odpowiedź.' },
      ]},
      { q: 'Wybierz zdanie, które chcesz wypowiedzieć:', choices: [
        { t: '„W tym tygodniu nie mam siły, więc nie pomogę. Zależy mi na Tobie — zrobię to innym razem.”', next: 'Odmowa + troska o relację. Krótka, konkretna, bez nadmiernego tłumaczenia. Jak czujesz się, czytając to na głos?' },
        { t: '„Mogę pomóc, ale tylko godzinę w niedzielę.”', next: 'Częściowa zgoda z granicą. To dobry kompromis, jeśli naprawdę masz tę godzinę — nie rezygnuj z siebie, by uniknąć dyskomfortu.' },
        { t: '„Muszę przemyśleć, odpowiem wieczorem.”', next: 'Odroczenie to też decyzja. Daje czas na sprawdzenie ciała: czy odpowiedź „tak” nadal napina klatkę piersiową?' },
      ]},
    ],
  },
  {
    id: 'jealousy', icon: '🫂', title: 'Zazdrość w bliskiej relacji', short: 'Ktoś nowy w życiu bliskiej osoby. Zazdrość bez oskarżeń.', advanced: true,
    story: 'Twoja bliska osoba spędza dużo czasu z nową koleżanką z pracy. Mówi o niej często i z entuzjazmem. Czujesz ukłucie, ale boisz się, że nazwanie go zabrzmi jak oskarżenie.',
    steps: [
      { q: 'Co czujesz, gdy słyszysz o niej kolejny raz?', choices: [
        { t: 'Zazdrość i lęk przed utratą', next: 'Zazdrość pokazuje, jak ważna jest ta relacja. Lęk przed utratą mówi o potrzebie bezpieczeństwa — nie o tym, że jesteś „gorszy”.' },
        { t: 'Złość i poczucie bycia mniej ważnym', next: 'Złość pod zazdrością często chroni potrzebę pierwszeństwa. To nie to samo co kontrola — możesz o nią poprosić, nie zabraniając.' },
        { t: 'Wstyd, że w ogóle to czuję', next: 'Wstyd przed własną zazdrością jest bardzo częsty. Zazdrość nie czyni Cię złym człowiekiem — czyni Cię związanym z kimś.' },
      ]},
      { q: 'Jak nazwiesz potrzebę pod tą emocją?', choices: [
        { t: 'Bezpieczeństwo i pewność, że jestem ważny/ważna', next: 'To potrzeba relacyjna, nie roszczeniowa. Można o nią poprosić: „potrzebuję usłyszeć, że to dla Ciebie ważne”.' },
        { t: 'Kontrola — wiedzieć wszystko', next: 'Kontrola jest zrozumiałą reakcją na lęk, ale zwykle zwiększa lęk. Co by się stało, gdybyś zamiast kontroli poprosił/poprosiła o czułość?' },
        { t: 'Więcej czasu tylko we dwoje', next: 'To konkretna, możliwa do spełnienia prośba. „Chcę jednego wieczoru tylko dla nas” jest łatwiejsze niż „nie mów o niej”.' },
      ]},
      { q: 'Co chcesz powiedzieć — bez oskarżenia?', choices: [
        { t: '„Czuję zazdrość, gdy słyszę o niej tyle. To nie pretensja — potrzebuję poczuć, że jestem dla Ciebie ważny/ważna.”', next: 'Nazwana emocja + granica między uczuciem a oskarżeniem + potrzeba. To bardzo dojrzały komunikat. Co może odpowiedzieć druga strona?' },
        { t: '„Miło, że masz kogoś nowego w pracy. Ja też potrzebuję naszego czasu.”', next: 'Docenienie jej relacji i jednoczesne zadbanie o siebie. To zaprasza do rozmowy zamiast stawiać w obronie.' },
        { t: 'Nic nie powiem, poczekam, aż minie', next: 'Czasem to działa. Ale jeśli ukłucie wraca, warto je nazwać — dla siebie w dzienniku, albo w rozmowie. Nie musi być idealnie.' },
      ]},
    ],
  },
  {
    id: 'lonely', icon: '🌃', title: 'Samotność wśród ludzi', short: 'Impreza pełna osób, a Ty czujesz się niewidzialny.', advanced: true,
    story: 'Jesteś na spotkaniu, na którym wszyscy się znają. Rozmowy toczą się obok Ciebie. Trzymasz kubek w dłoni i uśmiechasz się, ale w środku jest coś ciężkiego.',
    steps: [
      { q: 'Co najbardziej odzywa się w Tobie?', choices: [
        { t: 'Samotność — mimo ludzi wokół', next: 'Samotność to nie brak ludzi, a brak bycia widzianym. To ważna różnica: można ją zmniejszyć jednym prawdziwym kontaktem, nie dziesięcioma.' },
        { t: 'Lęk przed oceną, że nie mam nic do powiedzenia', next: 'Lęk przed oceną tworzy błędne koło: im bardziej się pilnujesz, tym trudniej się włączyć. Co byś powiedział/powiedziała, gdyby nikt nie oceniał?' },
        { t: 'Złość, że znowu to ja muszę zagadywać', next: 'Złość pokazuje zmęczenie wysiłkiem. Może dziś nie musisz być inicjatorem — możesz wybrać jedną osobę i jedno pytanie.' },
      ]},
      { q: 'Który drobny krok jest dziś realny?', choices: [
        { t: 'Zapytać jedną osobę o coś, co naprawdę mnie ciekawi', next: 'Ciekawość jest najprostszym mostem. Jedno pytanie, bez planu na cały wieczór — i sprawdzenie, co się stanie w ciele.' },
        { t: 'Dać sobie 15 minut i wyjść bez poczucia porażki', next: 'Decyzja o wyjściu też jest decyzją o sobie. Warto zauważyć: wychodzę, bo potrzebuję spokoju, nie bo „nie umiem”.' },
        { t: 'Napisać do kogoś bliskiego, że jest mi tu trudno', next: 'Podzielenie się trudnością obniża jej ciężar. Ktoś, kto odpowie „rozumiem”, potrafi zmienić cały wieczór.' },
      ]},
      { q: 'Co zabierasz ze sobą po tym wieczorze?', choices: [
        { t: 'Informację: potrzebuję mniejszych spotkań, nie większych', next: 'To bardzo praktyczna wiedza o sobie. Możesz zaplanować następny kontakt w formie, która Ci służy — kawa jedna na jedną.' },
        { t: 'Informację: potrzebuję więcej kontaktu niż myślałem/am', next: 'Samotność pokazała potrzebę, nie słabość. Co możesz zaplanować w tym tygodniu, żeby dać jej miejsce?' },
        { t: 'Nic — chcę o tym zapomnieć', next: 'Zapomnieć można na chwilę. Jeśli coś zostaje, zapisanie tego w dzienniku pomaga zamknąć. Chcesz spróbować?' },
      ]},
    ],
  },
  {
    id: 'body', icon: '🪞', title: 'Trudna relacja z ciałem', short: 'Lustro, komentarz, niechęć. Ciało jako źródło emocji.', advanced: true,
    story: 'Przymierzasz ubranie w sklepie. W lustrze widzisz coś, co Ci się nie podoba. W głowie odzywa się głos, który mówi rzeczy, których nie powiedziałbyś nikomu innemu.',
    steps: [
      { q: 'Jak nazwiesz to, co czujesz patrząc w lustro?', choices: [
        { t: 'Niechęć do ciała', next: 'Niechęć chce Cię odsunąć od źródła dyskomfortu. Nie jest dowodem, że coś z Tobą nie tak — jest sygnałem, że ten moment jest trudny.' },
        { t: 'Wstyd', next: 'Wstyd mówi „cała jesteś nie tak”. To zdanie nie jest prawdą — jest odczuciem. Czyj głos brzmi w nim najbardziej?' },
        { t: 'Smutek i tęsknota za akceptacją', next: 'Smutek pod wstydem to często tęsknota za byciem przyjętym takim, jakim się jest. To ważna potrzeba, nie kaprys.' },
      ]},
      { q: 'Czyj głos słyszysz w tych myślach?', choices: [
        { t: 'Kogoś z rodziny', next: 'Głosy z dzieciństwa zostają długo. Możesz zapytać: czy chcę nadal mówić do siebie tym głosem? Jeśli nie — jaki chcę zamiast?' },
        { t: 'Kultury, mediów, porównań', next: 'To głos systemu, nie Twój. Warto go rozpoznać, żeby przestać traktować go jak własne zdanie.' },
        { t: 'Własny, wewnętrzny krytyk', next: 'Wewnętrzny krytyk często chce chronić — przed odrzuceniem, komentarzem, wstydem. Możesz mu podziękować za intencję i poprosić o inny ton.' },
      ]},
      { q: 'Czego potrzebuje Twoje ciało w tej chwili?', choices: [
        { t: 'Szacunku, nie oceny', next: 'Możesz zacząć od zdania: „moje ciało robi dla mnie wiele rzeczy, o których nie myślę”. To nie affirmacja na siłę — to fakt.' },
        { t: 'Ciepła — dosłownie: koc, ciepła herbata, dotyk', next: 'Ciało reguluje się przez zmysły. Ciepło obniża napięcie szybciej niż rozumienie. To nie ucieczka, to opieka.' },
        { t: 'Odpoczynku od luster i porównań', next: 'Kilka dni bez przymierzania i bez mediów o ciele to nie unikanie — to zmniejszenie bodźców, które ranią.' },
      ]},
      { q: 'Co chcesz powiedzieć sobie — jak przyjacielowi?', choices: [
        { t: '"To trudny moment, nie cała moja historia."', next: 'Oddzielenie momentu od całej historii obniża ciężar. Jak czujesz to zdanie w klatce piersiowej?' },
        { t: '"Mogę zadbać o ciało bez karania go."', next: 'Troska bez kary — to różnica między „muszę schudnąć” a „chcę się dobrze czuć”. Co z tego jest Twoje?' },
        { t: '"Nie muszę dziś nic postanawiać."', next: 'Brak decyzji też jest decyzją o spokoju. Wracasz do tematu wtedy, gdy będziesz mieć więcej zasobów.' },
      ]},
    ],
  },
  {
    id: 'hope', icon: '🎈', title: 'Zawiedziona nadzieja', short: 'Plan się nie udał. Rozczarowanie zamiast „jestem do niczego”.', advanced: true,
    story: 'Bardzo zależało Ci na jednej rzeczy: rozmowie kwalifikacyjnej, wynikach, odpowiedzi od kogoś. Przyszła wiadomość, że to jednak nie teraz. Siedzisz z telefonem w ręce.',
    steps: [
      { q: 'Co pierwsze pojawia się w ciele?', choices: [
        { t: 'Ciężar w klatce, łzy pod powiekami', next: 'Smutek i zawiedzenie. Ten ciężar jest proporcjonalny do nadziei, którą miałeś/miałaś — a nie do Twojej wartości.' },
        { t: 'Pustka i brak sił', next: 'Przygnębienie po utracie nadziei jest naturalne. Ciało czasem wyłącza energię, żeby przetrwać rozczarowanie.' },
        { t: 'Złość — „jak mogli tak zrobić”', next: 'Złość broni sprawiedliwości i wysiłku, który włożyłeś/włożyłaś. Zasługuje na wysłuchanie, nie na wyciszenie.' },
      ]},
      { q: 'Jak nazwiesz to najprecyzyjniej?', choices: [
        { t: 'Rozczarowanie', next: 'Rozczarowanie = oczekiwanie spotkało się z rzeczywistością. To informacja o tym, czego chciałeś/chciałaś — nie o tym, kim jesteś.' },
        { t: 'Zawiedziona nadzieja', next: 'To pięknie precyzyjne. Nadzieja nie była głupia — była odwagą. Co ważnego mówi o Twoich pragnieniach?' },
        { t: 'Porażka', next: '„Porażka” to ocena, nie emocja. Za nią zwykle stoi smutek i wstyd. Który z nich jest dziś większy?' },
      ]},
      { q: 'Czego potrzebujesz teraz?', choices: [
        { t: 'Uznania, że to bolało', next: 'Zamiast „nie ma co się przejmować” — „to bolało, bo mi zależało”. Uznanie emocji zmniejsza jej ciężar.' },
        { t: 'Kontaktu z kimś, kto wysłucha', next: 'Kto mógłby dziś wysłuchać bez rad i pocieszania? Możesz napisać: „nie szukam rozwiązania, chcę tylko powiedzieć, co czuję”.' },
        { t: 'Czasu bez decyzji', next: 'Decyzje podejmowane w ostrej emocji bywają pochopne. Jutro będziesz mieć więcej zasobów — nie musisz dziś planować.' },
      ]},
      { q: 'Co z tym zrobisz dziś?', choices: [
        { t: 'Zapiszę to w dzienniku i zamknę na dziś', next: 'Zapisanie domyka pętlę myślową. Jutro wrócisz do tego z chłodniejszą głową.' },
        { t: 'Zrobię jedną małą rzecz dla siebie', next: 'Mała rzecz (spacer, prysznic, ulubiona herbata) to sygnał dla ciała: „widzę cię”. Nie naprawia sytuacji, ale zmienia stan.' },
        { t: 'Zapytam Milo, co dalej', next: 'Milo nie zdecyduje za Ciebie — ale może pomóc zobaczyć, co w tej sytuacji jest Twoją potrzebą, a co oceną siebie.' },
      ]},
    ],
  },
];

// dopisz do listy symulacji i odśwież widok
if (typeof SIMULATIONS !== 'undefined') {
  ADVANCED_SIMS.forEach(s => { if (!SIMULATIONS.some(x => x.id === s.id)) SIMULATIONS.push(s); });
  if (typeof renderSims === 'function' && document.getElementById('simGrid')) renderSims();
}

// init
function initEx2() {
  if (typeof renderLibrary === 'function') renderLibrary();
  if (document.getElementById('distinguishCard')) renderDistinguish();
  if (document.getElementById('intensityCard')) renderIntensity();
  if (document.getElementById('bodyExCard')) renderBodyEx();
  if (document.getElementById('needExCard')) renderNeedEx();
}
document.addEventListener('DOMContentLoaded', initEx2);
if (document.readyState !== 'loading') initEx2();
