// ============================================================
// Emlove — sesje ćwiczeń: 5 zadań → serduszka → podsumowanie
// Bez podpowiedzi po każdym zadaniu. Informacja zwrotna dopiero
// w podsumowaniu, razem z wyborem: „idziemy dalej” / „poprawiamy”.
// Poziom trudności rośnie z każdą ukończoną rundą.
// ============================================================

const EX_TABS = ['recognize', 'name', 'distinguish', 'intensity', 'body', 'need'];
const EX_LEVEL_HINT = {
  recognize: 'oprócz emocji nazwij też to, co dzieje się w ciele.',
  name: 'wybierz słowo o najwęższym znaczeniu, nie to „najładniejsze”.',
  distinguish: 'odrzuć najpierw słowa, które pasują tylko częściowo.',
  intensity: 'porównaj sąsiednie słowa na drabinie, nie skrajne.',
  body: 'pamiętaj, że jedna rodzina może dawać podobne sygnały w ciele.',
  need: 'potrzeba bywa głębiej niż pierwsza reakcja.',
};
const EX_PER_ROUND = 5;
const EX_CARD_ID = {
  recognize: 'recognizeCard',
  name: 'nameCard',
  distinguish: 'distinguishCard',
  intensity: 'intensityCard',
  body: 'bodyExCard',
  need: 'needExCard',
};

if (typeof state !== 'undefined' && state.hearts === undefined) state.hearts = 0;

const ExSession = {
  tabs: {},
  get(tab) {
    if (!this.tabs[tab]) this.tabs[tab] = { level: 1, idx: 0, tasks: [], answers: [], phase: 'intro' };
    return this.tabs[tab];
  },
  start(tab, level) {
    const s = this.get(tab);
    s.level = level || s.level || 1;
    s.tasks = buildTasks(tab, s.level);
    s.idx = 0;
    s.answers = [];
    s.phase = 'quiz';
    renderEx(tab);
  },
  answer(tab, optionIndex) {
    const s = this.get(tab);
    const task = s.tasks[s.idx];
    if (!task) return;
    s.answers.push({ task, chosen: optionIndex, correct: optionIndex === task.answer });
    s.idx++;
    if (s.idx < s.tasks.length) { renderEx(tab); return; }
    s.phase = 'summary';
    const got = s.answers.filter(a => a.correct).length;
    if (typeof state !== 'undefined') {
      state.hearts = (state.hearts || 0) + got;
      state.exercisesDone = (state.exercisesDone || 0) + got;
      if (typeof addPoints === 'function') addPoints(got * 4);
      if (typeof saveState === 'function') saveState();
    }
    if (got >= 3) { try { SoundEngine.success(); } catch (e) {} }
    if (typeof updateHeartsSidebar === 'function') updateHeartsSidebar();
    renderEx(tab);
  },
  next(tab) { this.start(tab, this.get(tab).level + 1); },
  retry(tab) { this.start(tab, this.get(tab).level); },
};

window.ExSession = ExSession;

/* ---------- narzędzia ---------- */
function exShuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function exPick(arr, n) { return exShuffle(arr).slice(0, n); }

// ogranicz liczbę opcji z zachowaniem poprawnej odpowiedzi
function trimOptions(text, options, answer, count) {
  const correct = options[answer];
  const others = options.filter((_, i) => i !== answer);
  const picked = exShuffle([correct, ...exPick(others, Math.max(0, count - 1))]);
  return { options: picked, answer: picked.indexOf(correct) };
}

/* ---------- generatory zadań ---------- */
function buildTasks(tab, level) {
  const L = Math.min(level, 5);
  let pool = [];
  if (tab === 'recognize' && typeof RECOGNIZE_Q !== 'undefined') {
    pool = RECOGNIZE_Q.map(q => {
      const t = trimOptions(q.text, q.options, q.answer, L === 1 ? 2 : L === 2 ? 3 : 3);
      return { prompt: 'Przeczytaj sytuację i wybierz emocję, która najlepiej pasuje do sygnałów w ciele.', scenario: q.text, options: t.options, answer: t.answer, explain: q.explain, kind: 'rozpoznanie emocji' };
    });
  } else if (tab === 'name' && typeof NAME_Q !== 'undefined') {
    pool = NAME_Q.map(q => {
      const t = trimOptions(q.text, q.options, q.answer, L === 1 ? 2 : 3);
      return { prompt: 'Wybierz słowo, które najlepiej oddaje to, co czujesz.', scenario: q.text, options: t.options, answer: t.answer, explain: q.explain, kind: 'precyzyjne nazwanie' };
    });
  } else if (tab === 'distinguish' && typeof DISTINGUISH_Q !== 'undefined') {
    pool = DISTINGUISH_Q.map(q => {
      const t = trimOptions(q.text, q.options, q.answer, L === 1 ? 2 : 3);
      return { prompt: 'Które słowo najlepiej pasuje do tej sytuacji?', scenario: q.text, options: t.options, answer: t.answer, explain: q.explain, kind: 'różnica między słowami' };
    });
  } else if (tab === 'intensity' && typeof INTENSITY_LADDERS !== 'undefined') {
    pool = INTENSITY_LADDERS.map(lad => {
      const askLowest = L >= 4;
      const target = askLowest ? lad.words[0] : lad.words[lad.words.length - 1];
      const count = L === 1 ? 2 : L === 2 ? 3 : 4;
      let opts = exShuffle(lad.words).slice(0, count);
      if (!opts.includes(target)) opts[opts.length - 1] = target;
      opts = exShuffle(opts);
      return {
        prompt: `Rodzina: ${lad.family}. Które słowo opisuje ${askLowest ? 'najsłabsze' : 'najsilniejsze'} natężenie?`,
        scenario: `W tej rodzinie emocje układają się od łagodnych do bardzo silnych.`,
        options: opts,
        answer: opts.indexOf(target),
        explain: `Pełna drabina: ${lad.words.join(' → ')}. ${askLowest ? 'Najlżej jest na początku — łatwiej wtedy o spokojną reakcję.' : 'Im dalej w prawo, tym większa siła i zwykle większa potrzeba zadbania o siebie.'}`,
        kind: 'natężenie emocji',
      };
    });
  } else if (tab === 'body' && typeof WHEEL_FAMILIES !== 'undefined') {
    pool = WHEEL_FAMILIES.map(f => {
      const count = L === 1 ? 2 : L === 2 ? 3 : 4;
      const others = exPick(WHEEL_FAMILIES.filter(x => x.id !== f.id).map(x => x.name), count - 1);
      const options = exShuffle([f.name, ...others]);
      return {
        prompt: 'Przeczytaj sygnały z ciała i wybierz rodzinę emocji, do której najczęściej należą.',
        scenario: f.signal,
        options,
        answer: options.indexOf(f.name),
        explain: `To sygnały ${f.gen}. Ta rodzina prosi zwykle o: ${f.need}. To orientacja, nie diagnoza — u każdego ciało mówi trochę inaczej.`,
        kind: 'ciało → emocja',
      };
    });
  } else if (tab === 'need' && typeof WHEEL_FAMILIES !== 'undefined') {
    pool = WHEEL_FAMILIES.map(f => {
      const count = L === 1 ? 2 : L === 2 ? 3 : 4;
      const others = exPick(WHEEL_FAMILIES.filter(x => x.id !== f.id).map(x => x.need), count - 1);
      const options = exShuffle([f.need, ...others]);
      return {
        prompt: `Czujesz wyraźnie emocję z rodziny „${f.name}”. O co najczęściej prosi?`,
        scenario: `W ciele: ${f.signal}`,
        options,
        answer: options.indexOf(f.need),
        explain: `${f.name} niesie informację o potrzebie: ${f.need}. Nie musisz jej spełniać od razu — nazwanie jest pierwszym krokiem.`,
        kind: 'emocja → potrzeba',
      };
    });
  }
  if (!pool.length) return [{ prompt: 'Brak zadań — odśwież aplikację.', scenario: '', options: ['OK'], answer: 0, explain: '', kind: '' }];

  // dobór 5 zadań: rosnąca trudność
  const picked = exShuffle(pool).slice(0, EX_PER_ROUND);
  while (picked.length < EX_PER_ROUND) picked.push(exShuffle(pool)[0]);
  return picked;
}

/* ---------- render ---------- */
function heartsRow(got, total) {
  let html = '<div class="hearts" aria-label="' + got + ' z ' + total + ' serduszek">';
  for (let i = 0; i < total; i++) html += `<span class="${i < got ? 'on' : 'off'}">${i < got ? '♥' : '♡'}</span>`;
  return html + '</div>';
}

function renderEx(tab) {
  const card = document.getElementById(EX_CARD_ID[tab]);
  if (!card) return;
  const s = ExSession.get(tab);

  if (s.phase === 'intro' || !s.tasks.length) {
    card.innerHTML = `
      <div class="ex-head">
        <div>
          <h2>${exTitle(tab)}</h2>
          <p class="muted">${exIntro(tab)}</p>
        </div>
        <div class="ex-score"><span class="ex-hearts-total">♥ ${(state.hearts || 0)}</span><span class="muted small">serduszka razem</span></div>
      </div>
      <div class="ex-rules">
        <p><b>Jak to działa:</b> ${EX_PER_ROUND} zadań w rundzie. Po każdym zadaniu nie mówię, czy było dobrze — dowiesz się tego w podsumowaniu. Za każde poprawne zadanie dostajesz <b>1 serduszko</b> (maks. ${EX_PER_ROUND}).</p>
      </div>
      <button class="btn btn-primary" onclick="ExSession.start('${tab}', 1)">Zacznij rundę 1 · poziom 1</button>`;
    return;
  }

  if (s.phase === 'quiz') {
    const task = s.tasks[s.idx];
    const pct = Math.round((s.idx / s.tasks.length) * 100);
    card.innerHTML = `
      <div class="ex-head">
        <div>
          <h2>${exTitle(tab)}</h2>
          <p class="muted small">Zadanie ${s.idx + 1} z ${s.tasks.length} · poziom ${s.level} · ${task.kind}</p>
        </div>
        <div class="ex-score"><span class="ex-hearts-total">♥ ${(state.hearts || 0)}</span></div>
      </div>
      <div class="ex-progress"><div style="width:${pct}%"></div></div>
      <p class="ex-prompt">${task.prompt}</p>
      ${task.scenario ? `<div class="scenario-box">${task.scenario}</div>` : ''}
      ${s.level >= 3 ? `<p class="ex-extra">Poziom ${s.level}: ${EX_LEVEL_HINT[tab] || 'zwróć uwagę na niuanse między podobnymi słowami.'}</p>` : ''}
      <div class="exercise-options">
        ${task.options.map((o, i) => `<button class="choice-btn" onclick="ExSession.answer('${tab}', ${i})">${o}</button>`).join('')}
      </div>
      <p class="muted small ex-hint">Odpowiedz tak, jak czujesz — informacja zwrotna pojawi się po ${EX_PER_ROUND} zadaniach.</p>`;
    return;
  }

  // podsumowanie
  const got = s.answers.filter(a => a.correct).length;
  const msg = got === 5 ? 'Pięć serduszek. Cała runda trafiona.'
    : got >= 3 ? 'Dobra runda. Widać kierunek — warto iść dalej.'
    : 'Ta runda była trudna. Możemy ją powtórzyć spokojniej, z nowymi zdaniami.';
  card.innerHTML = `
    <div class="ex-head">
      <div>
        <h2>Podsumowanie rundy · poziom ${s.level}</h2>
        <p class="muted small">${msg}</p>
      </div>
      <div class="ex-score"><span class="ex-hearts-total">♥ ${(state.hearts || 0)}</span><span class="muted small">razem</span></div>
    </div>
    ${heartsRow(got, s.tasks.length)}
    <p class="ex-hearts-label">${got} z ${s.tasks.length} serduszek w tej rundzie</p>
    <div class="ex-review">
      ${s.answers.map((a, i) => `
        <div class="ex-review-item ${a.correct ? 'ok' : 'no'}">
          <div class="ex-review-top">
            <span class="ex-mark">${a.correct ? '♥' : '♡'}</span>
            <span class="ex-review-q">${i + 1}. ${a.task.prompt}</span>
          </div>
          ${a.task.scenario ? `<p class="muted small">${a.task.scenario}</p>` : ''}
          <p class="small">Twoja odpowiedź: <b>${a.task.options[a.chosen]}</b>${a.correct ? '' : ` · właściwa: <b>${a.task.options[a.task.answer]}</b>`}</p>
          <p class="muted small">${a.task.explain}</p>
        </div>`).join('')}
    </div>
    <div class="ex-actions">
      <button class="btn btn-primary" onclick="ExSession.next('${tab}')">Idziemy dalej → poziom ${s.level + 1}</button>
      <button class="btn btn-secondary" onclick="ExSession.retry('${tab}')">Poprawiamy tę rundę</button>
    </div>`;
}

function exTitle(tab) {
  return {
    recognize: '🔍 Rozpoznaj emocję',
    name: '🏷️ Nazwij precyzyjnie',
    distinguish: '🎯 Rozróżnij bliskie słowa',
    intensity: '📶 Natężenie emocji',
    body: '🫀 Ciało → emocja',
    need: '🎁 Emocja → potrzeba',
  }[tab] || tab;
}
function exIntro(tab) {
  return {
    recognize: 'Sytuacja i sygnały w ciele. Wybierz emocję, która najbardziej pasuje.',
    name: 'Zamiast „źle / dobrze” — słowo, które naprawdę oddaje to, co czujesz.',
    distinguish: 'Słowa, które brzmią podobnie, ale znaczą co innego: zlekceważony ≠ odrzucony.',
    intensity: 'Ta sama emocja ma różną siłę. Im wyższy poziom, tym trudniejsze drabiny.',
    body: 'Ciało mówi pierwsze. Rozpoznaj rodzinę emocji po sygnałach.',
    need: 'Każda emocja jest informacją o potrzebie. Nazwij ją.',
  }[tab] || '';
}

/* ---------- nadpisanie starych renderów ---------- */
window.renderRecognize = function () { renderEx('recognize'); };
window.renderName = function () { renderEx('name'); };
window.renderDistinguish = function () { renderEx('distinguish'); };
window.renderIntensity = function () { renderEx('intensity'); };
window.renderBodyEx = function () { renderEx('body'); };
window.renderNeedEx = function () { renderEx('need'); };

function updateHeartsSidebar() {
  const el = document.getElementById('statHearts');
  if (el) el.textContent = (typeof state !== 'undefined' && state.hearts) || 0;
}

function initEx3() {
  EX_TABS.forEach(renderEx);
  updateHeartsSidebar();
}
document.addEventListener('DOMContentLoaded', initEx3);
if (document.readyState !== 'loading') initEx3();
