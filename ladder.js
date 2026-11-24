// ============================================================
// Drabina emocji — silnik gotowych zadań
// Poziom A/B/C: 40/20/10 zadań, jedno pytanie, 2/3/4 opcje.
// Co trzecie zadanie na każdym poziomie to „Rozróżnij”.
// ============================================================
const LADDER_LABEL = {scenariusz:'Scenariusz', rozroznij:'Rozróżnij'};
const LADDER_OPTIONS_PER_LEVEL = [2,3,4];

function ladderBuildTask(src){
  const shuffled=shuffleWheel(src.options);
  const options=shuffled.map(o=>o.text);
  const accepted=shuffled.flatMap((o,i)=>o.accepted?[i]:[]);
  return {
    kind:src.kind,id:src.id,title:src.title,story:src.story,
    questions:[{q:src.q,options,accepted,feedback:src.feedback}],
    path:src.title
  };
}

function ladderPlan(level){
  const total=LIMITS[level-1],plan=[];
  for(let i=1;i<=total;i++)plan.push(i%3===0?'rozroznij':'scenariusz');
  return plan;
}

function ladderPickTask(kind,level,c){
  const pool=(window.LADDER_TASKS||[]).filter(t=>t.level===level&&t.kind===kind);
  if(!pool.length)throw new Error('missing_ladder_pool_'+level+'_'+kind);
  const used=kind==='rozroznij'?c.usedRozroznij:c.usedScenarios;
  const free=pool.filter(t=>!used.includes(t.id));
  const src=shuffleWheel(free.length?free:pool)[0];
  if(!used.includes(src.id))used.push(src.id);
  return src;
}

function ladderMakeTask(kind,level,c){
  if(!Array.isArray(c.usedScenarios))c.usedScenarios=[];
  if(!Array.isArray(c.usedRozroznij))c.usedRozroznij=[];
  return ladderBuildTask(ladderPickTask(kind,level,c));
}

function ladderTaskKey(t){return `${t.kind}|${t.id}`;}

function ladderMakeRound(c,level){
  if(!Array.isArray(c.plans))c.plans=[];
  if(!Array.isArray(c.plans[level-1])||c.plans[level-1].length!==LIMITS[level-1])c.plans[level-1]=ladderPlan(level);
  if(!Array.isArray(c.usedScenarios))c.usedScenarios=[];
  if(!Array.isArray(c.usedRozroznij))c.usedRozroznij=[];
  const n=Math.min(5,LIMITS[level-1]-c.done[level-1]);
  const kinds=c.plans[level-1].slice(c.done[level-1],c.done[level-1]+n);
  const chosen=[];
  for(const kind of kinds){
    let t;
    for(let attempt=0;attempt<40;attempt++){
      t=ladderMakeTask(kind,level,c);
      if(!chosen.some(x=>ladderTaskKey(x)===ladderTaskKey(t)))break;
    }
    chosen.push(t);
  }
  return chosen;
}

window.LADDER_LABEL=LADDER_LABEL;
window.LADDER_OPTIONS_PER_LEVEL=LADDER_OPTIONS_PER_LEVEL;
