// ============================================================
// Drabina emocji — silnik
//
// Zasady:
//   · poziom 1: 40 zadań po 2 pytania   (LIMITS w exercises3.js)
//   · poziom 2: 20 zadań po 3 pytania
//   · poziom 3: 10 zadań po 4 pytania
//   · co trzecie zadanie to ROZRÓŻNIJ (pozycje 3, 6, 9…)
//   · zadanie jest zaliczone tylko, gdy WSZYSTKIE pytania poprawne
//   · 1 zaliczone zadanie = 1 serduszko
// ============================================================

const LADDER_TYPES = ['scenariusz', 'rozroznij'];
const LADDER_LABEL = {
  scenariusz: 'Scenariusz',
  rozroznij: 'Rozróżnij',
  // starsze nazwy — zostają, żeby nie wysypać zapisanych cykli
  rozpoznaj: 'Rozpoznaj', nazwij: 'Nazwij', cialo: 'Ciało',
  natezenie: 'Natężenie', potrzeba: 'Potrzeba'
};
const QUESTIONS_PER_LEVEL = [2, 3, 4];

/** Plan poziomu: co trzecie zadanie to Rozróżnij. */
function ladderPlan(level) {
  const total = LIMITS[level - 1];
  const plan = [];
  for (let i = 1; i <= total; i++) plan.push(i % 3 === 0 ? 'rozroznij' : 'scenariusz');
  return plan;
}

/** Losuje kolejność odpowiedzi; zwraca {options, answer}. */
function ladderOptions(correct, wrong, count) {
  const opts = shuffleWheel([correct, ...shuffleWheel([...new Set(wrong)].filter(x => x !== correct)).slice(0, count - 1)]);
  return {options: opts, answer: opts.indexOf(correct)};
}

/** Buduje pytania dla zadania — bierze pierwsze N ze scenariusza. */
function ladderBuildQuestions(qs, level) {
  return qs.slice(0, QUESTIONS_PER_LEVEL[level - 1]).map(([q, a]) => {
    const o = ladderOptions(a[0], a.slice(1), 4);
    return {q, options: o.options, answer: o.answer};
  });
}

function pickUnused(pool, used, key) {
  const free = pool.filter(x => !used.includes(x.id));
  const src = shuffleWheel(free.length ? free : pool)[0];
  if (!used.includes(src.id)) used.push(src.id);
  return src;
}

function makeScenarioTask(level, c) {
  const src = pickUnused(SCENARIOS, c.usedScenarios, 'scenariusz');
  return {
    kind: 'scenariusz', id: src.id, title: src.title, story: src.story,
    questions: ladderBuildQuestions(src.qs, level),
    path: src.title,
    explain: 'To opis przykładowej sytuacji. Nie ma jednej właściwej reakcji — liczy się to, co widzisz w zachowaniu i słowach.'
  };
}

function makeRozroznijTask(level, c) {
  const src = pickUnused(ROZROZNIJ_SETS, c.usedRozroznij, 'rozroznij');
  return {
    kind: 'rozroznij', id: src.id, title: 'Rozróżnij', story: '',
    questions: ladderBuildQuestions(src.qs, level),
    path: 'Rozróżnij · słowa z koła',
    explain: 'Rozróżnianie słów to umiejętność oddzielania podobnych określeń. Każde słowo ma swoją niuansową historię.'
  };
}

function ladderTaskKey(t) {
  return t.kind + '|' + t.id + '|' + t.questions.length;
}

function ladderMakeTask(kind, level, c) {
  return kind === 'rozroznij' ? makeRozroznijTask(level, c) : makeScenarioTask(level, c);
}

function ladderMakeRound(c, level) {
  if (!Array.isArray(c.plans)) c.plans = [];
  if (!Array.isArray(c.plans[level - 1]) || c.plans[level - 1].length !== LIMITS[level - 1]) {
    c.plans[level - 1] = ladderPlan(level);
  }
  if (!Array.isArray(c.usedScenarios)) c.usedScenarios = [];
  if (!Array.isArray(c.usedRozroznij)) c.usedRozroznij = [];

  const n = Math.min(5, LIMITS[level - 1] - c.done[level - 1]);
  const kinds = c.plans[level - 1].slice(c.done[level - 1], c.done[level - 1] + n);

  const chosen = [];
  for (const kind of kinds) {
    let t;
    for (let attempt = 0; attempt < 40; attempt++) {
      t = ladderMakeTask(kind, level, c);
      if (!chosen.some(x => ladderTaskKey(x) === ladderTaskKey(t))) break;
    }
    chosen.push(t);
  }
  return chosen;
}

window.LADDER_LABEL = LADDER_LABEL;
window.LADDER_QUESTIONS_PER_LEVEL = QUESTIONS_PER_LEVEL;
