// Trzy pierścienie koła użytkownika. Zadania sprawdzają mapę koła,
// nigdy nie oceniają czyichś osobistych odczuć ani nie diagnozują ciała.
const TRAIN_WHEEL = [
 {name:'Słaby',groups:[['Zmęczony',['rozkojarzony','senny']],['Zestresowany',['tracący kontrolę','przytłoczony']],['Zapracowany',['pośpieszany','pod presją']],['Znudzony',['apatyczny','obojętny']]]},
 {name:'Lękliwy',groups:[['Przestraszony',['bezsilny','zastraszony']],['Niespokojny',['przytłoczony','zmartwiony']],['Niepewny',['niewystarczający','podrzędny']],['Uległy',['bezwartościowy','nieistotny']],['Odrzucony',['wyobcowany','niepasujący']],['Zastraszony',['nerwowy','zdemaskowany']]]},
 {name:'Rozgniewany',groups:[['Rozczarowany',['zdradzony','urażony']],['Upokorzony',['zlekceważony','ośmieszony']],['Nienawistny',['zgorszony','zbezczeszczony']],['Zagrożony',['niepewny','zazdrosny']],['Agresywny',['wrogo nastawiony','sprowokowany']],['Sfrustrowany',['oburzony','poirytowany']],['Zdystansowany',['zamknięty w sobie','podejrzliwy']],['Krytyczny',['sceptyczny','sarkastyczny']]]},
 {name:'Zniesmaczony',groups:[['Nieprzychylny',['niechętny','krytykancki']],['Rozczarowany',['zbuntowany','antypatyczny']],['Czujący się podle',['podburzony','obrzydzony']],['Stroniący',['czujący odrazę','niepewny']]]},
 {name:'Smutny',groups:[['Samotny',['odizolowany','porzucony']],['Zraniony',['prześladowany','słabowity']],['Zrozpaczony',['w bólu, w żałobie','bezsilny']],['Winny',['zawstydzony','skruszony']],['Przygnębiony',['wyczerpany','gorszy od innych']],['Zraniony',['rozczarowany','zlekceważony']]]},
 {name:'Szczęśliwy',groups:[['Żartobliwy',['zuchwały','pobudzony']],['Zadowolony',['wolny','wesoły']],['Zainteresowany',['zaciekawiony','dociekliwy']],['Dumny',['ważny','pewny siebie']],['Akceptowany',['szanowany','doceniony']],['Pełen siły',['odważny','kreatywny']],['Spokojny',['kochający','wdzięczny']],['Czujący bliskość',['czuły','figlarny']],['Optymistyczny',['pełen nadziei','zainspirowany']]]},
 {name:'Zaskoczony',groups:[['Podekscytowany',['ochoczy','energiczny']],['Zdumiony',['zadziwiony','zatrwożony']],['Zmieszany',['rozczarowany','zakłopotany']],['Przestraszony',['skonsternowany','wstrząśnięty']]]}
];
const CYCLE_KEY='emlove_wheel_cycle_v1', LIMITS=[40,20,10], DURATION=30*24*60*60*1000;
function shuffleWheel(xs){const a=xs.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function escWheel(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function newCycle(){return {started:null,done:[0,0,0],correct:[0,0,0],round:null,plans:[],usedScenarios:[],usedRozroznij:[]};}
/** Resetuj tylko aktywną rundę ze starego formatu; ukończone serca zostają. */
function migrateUnansweredIntensity(c){
 const r=c&&c.round;if(!r)return false;
 const valid=Array.isArray(r.tasks)&&r.tasks.every(t=>t&&Array.isArray(t.questions)&&t.questions.length===1&&
  Array.isArray(t.questions[0].accepted)&&typeof t.questions[0].feedback==='string');
 if(valid)return false;c.round=null;return true;
}
function loadCycle(){
 let c;try{c=JSON.parse(localStorage.getItem(CYCLE_KEY));}catch(e){}
 if(!c||!Array.isArray(c.done)||!Array.isArray(c.correct)||c.done.length!==3||c.correct.length!==3||
  c.done.some((d,i)=>!Number.isInteger(d)||d<0||d>LIMITS[i])||c.correct.some((n,i)=>!Number.isInteger(n)||n<0||n>c.done[i])||
  (c.started!==null&&!Number.isFinite(c.started))||(c.started!==null&&Date.now()>=c.started+DURATION)){
  c=newCycle();localStorage.setItem(CYCLE_KEY,JSON.stringify(c));
 }
 if(migrateUnansweredIntensity(c))localStorage.setItem(CYCLE_KEY,JSON.stringify(c));
 if(!Array.isArray(c.plans))c.plans=[];if(!Array.isArray(c.usedScenarios))c.usedScenarios=[];if(!Array.isArray(c.usedRozroznij))c.usedRozroznij=[];
 return c;
}
function saveCycle(c){c.updatedAt=new Date().toISOString();localStorage.setItem(CYCLE_KEY,JSON.stringify(c));updateHeartsSidebar();if(window.EmloveSync)window.EmloveSync.scheduleFlush();}
function setCycleFromCloud(c){
 if(!c||!Array.isArray(c.done)||!Array.isArray(c.correct)||c.done.length!==3||c.correct.length!==3)return false;
 localStorage.setItem(CYCLE_KEY,JSON.stringify(c));
 const normalized=loadCycle();
 updateHeartsSidebar();
 if(window.WheelCourse)window.WheelCourse.render();
 return normalized.done.length===3;
}
function currentLevel(c){return LIMITS.findIndex((n,i)=>c.done[i]<n)+1||4;}
function updateHeartsSidebar(){const el=document.getElementById('statHearts');if(el){const c=loadCycle();el.textContent=c.correct.reduce((a,b)=>a+b,0);}}
function cycleInfo(c){
 const h=c.correct.reduce((a,b)=>a+b,0), n=c.done.reduce((a,b)=>a+b,0),level=currentLevel(c),deadline=c.started===null?'30 dni od pierwszej rundy':new Date(c.started+DURATION).toLocaleString('pl-PL',{dateStyle:'medium',timeStyle:'short'});
 const remaining=level<=3?LIMITS[level-1]-c.done[level-1]:0;
 const details=level<=3?`<p><strong>Poziom ${['A','B','C'][level-1]}: ${c.correct[level-1]} zdobytych · ${remaining} serduszek jeszcze do zdobycia</strong><br><span class="muted small">${c.done[level-1]} z ${LIMITS[level-1]} zadań za Tobą. Niewykorzystanych serduszek z błędnych odpowiedzi nie można odzyskać w tym cyklu.</span></p>`:'';
 return `<p><strong>Postęp:</strong> ${n}/70 zadań · ♥ ${h}/70</p>${details}<p class="muted small">Zadania na poziomach: ${c.done.map((d,i)=>`${['A','B','C'][i]} ${d}/${LIMITS[i]}`).join(' · ')}<br>Cykl trwa do: ${deadline} (czas na tym urządzeniu).</p>`;
}
const WheelCourse={
 start(){
  const c=loadCycle(),level=currentLevel(c);if(level>3)return this.render();
  if(c.started===null)c.started=Date.now();
  const tasks=ladderMakeRound(c,level);
  c.round={level,tasks,answers:[],taskIndex:0,qIndex:0,wins:0,phase:'quiz',practice:false,id:Date.now().toString(36)+Math.random().toString(36).slice(2)};saveCycle(c);this.render();
 },
 answer(i){
  const c=loadCycle(),r=c.round;if(!r||r.phase!=='quiz')return this.render();
  const t=r.tasks[r.taskIndex],q=t&&t.questions[0];if(!q||!Number.isInteger(i)||i<0||i>=q.options.length)return;
  if(r.answers.some(a=>a.task===r.taskIndex))return;
  r.answers.push({task:r.taskIndex,q:0,chosen:i,correct:q.accepted.includes(i)});
  r.phase='feedback';saveCycle(c);this.render();
 },
 continueAfterAnswer(){
  const c=loadCycle(),r=c.round;if(!r||r.phase!=='feedback')return this.render();
  if(r.taskIndex<r.tasks.length-1){r.taskIndex++;r.qIndex=0;r.phase='quiz';saveCycle(c);this.render();return;}
  r.phase='summary';
  const wins=r.tasks.reduce((n,_task,ti)=>n+(r.answers.some(a=>a.task===ti&&a.correct)?1:0),0);r.wins=wins;
  if(!r.practice){
   if(r.correction)c.correct[r.level-1]=Math.min(c.done[r.level-1],c.correct[r.level-1]+wins);
   else{c.done[r.level-1]+=r.tasks.length;c.correct[r.level-1]+=wins;state.exercisesDone+=r.tasks.length;state.points+=wins*4;saveState();}
  }
  saveCycle(c);this.render();
 },
 retry(){const c=loadCycle(),r=c.round;if(!r||r.phase!=='summary'||r.practice)return;const tasks=r.tasks.filter((_t,i)=>!r.answers.some(a=>a.task===i&&a.correct));if(!tasks.length)return;c.round={level:r.level,tasks,answers:[],taskIndex:0,qIndex:0,wins:0,phase:'quiz',practice:false,correction:true,recovery:!!r.recovery};saveCycle(c);this.render();},
 next(){const c=loadCycle();if(!c.round||c.round.phase!=='summary')return;c.round=null;saveCycle(c);this.render();},
 render(){
  const el=document.getElementById('wheelCourse');if(!el)return;const c=loadCycle(),r=c.round,level=currentLevel(c);updateHeartsSidebar();
  if(!r&&level===4){const score=c.correct.reduce((a,b)=>a+b,0),gold=score>=63;el.innerHTML=`<h2>Ukończono drogę Emlove</h2>${cycleInfo(c)}<p><b>${score}/70 · ${(score/70*100).toFixed(1).replace('.',',')}%</b></p><img src="${gold?'phoenix-award.jpg':'icon-512.png'}" alt="${gold?'Odznaka złotego feniksa':'Odznaka białego serca'}" class="award-image"><h3>${gold?'Odznaka feniksa':'Odznaka białego serca'}</h3><p>${gold?'Gratulacje! Wynik co najmniej 90%.':'Dziękujemy za przejście całej drogi. Feniks jest za wynik co najmniej 90%.'} Nowy cykl rozpocznie się po upływie 30 dni.</p>`;return;}
  if(!r){el.innerHTML=`<h2>🧭 Drabina emocji</h2>${cycleInfo(c)}<p>Poziom A: <b>40 zadań</b> po jednym pytaniu i 2 opcje. Poziom B: <b>20 zadań</b> i 3 opcje. Poziom C: <b>10 zadań</b> i 4 opcje. Co trzecie zadanie to <b>Rozróżnij</b>.</p><p class="muted small">Zadania działają lokalnie i nie wymagają internetu. Odpowiedzi pozostają na tym urządzeniu.</p><p>Runda ma <b>5 zadań</b>. Zaznaczasz jedną opcję; w niektórych pytaniach więcej niż jedna może być akceptowana. Po każdej odpowiedzi zobaczysz jedno krótkie zdanie wyjaśnienia. Za każde zaliczone zadanie dostajesz serce. Feniks jest za <b>63 serca z 70</b>. Cykl trwa 30 dni.</p><p><button class="btn btn-ghost" onclick="goTo('wheel')">Zobacz koło emocji</button></p><p class="muted small">To przykładowe sytuacje i możliwe połączenia. Nie oceniamy Twoich osobistych uczuć.</p><button class="btn btn-primary" onclick="WheelCourse.start()">Rozpocznij rundę · poziom ${['A','B','C'][level-1]}</button>`;return;}
  if(r.phase==='quiz'){
   const t=r.tasks[r.taskIndex],q=t&&t.questions[0];if(!q)return;
   const total=r.tasks.length,done=r.answers.length;
   el.innerHTML=`<h2>Poziom ${['A','B','C'][r.level-1]} · ${r.practice?'powtórka':'runda'}</h2>${cycleInfo(c)}<p class="muted">${escWheel(LADDER_LABEL[t.kind]||'Scenariusz')} · Zadanie ${r.taskIndex+1} z ${r.tasks.length}${r.practice?' · ćwiczenie bez zmiany wyniku cyklu':''}</p><div class="ex-progress"><div style="width:${100*done/total}%"></div></div>${t.title?`<p class="ex-prompt"><b>${escWheel(t.title)}</b></p>`:''}${t.story?`<p class="ex-story">${escWheel(t.story)}</p>`:''}<p class="ex-prompt">${escWheel(q.q)}</p><div class="exercise-options">${q.options.map((o,i)=>`<button class="choice-btn" onclick="WheelCourse.answer(${i})">${escWheel(o)}</button>`).join('')}</div>`;
   return;
  }
  if(r.phase==='feedback'){
   const t=r.tasks[r.taskIndex],q=t&&t.questions[0];if(!q)return;
   el.innerHTML=`<h2>Poziom ${['A','B','C'][r.level-1]} · ${r.practice?'powtórka':'runda'}</h2><p class="muted">${escWheel(LADDER_LABEL[t.kind]||'Scenariusz')} · Zadanie ${r.taskIndex+1} z ${r.tasks.length}</p>${t.story?`<p class="ex-story">${escWheel(t.story)}</p>`:''}<p class="ex-prompt">${escWheel(q.feedback)}</p><div class="ex-actions"><button class="btn btn-primary" onclick="WheelCourse.continueAfterAnswer()">Dalej</button></div>`;
   return;
  }
  const got=typeof r.wins==='number'?r.wins:0;
  el.innerHTML=`<h2>Podsumowanie rundy · poziom ${['A','B','C'][r.level-1]}</h2>${cycleInfo(c)}<div class="hearts">${'♥'.repeat(got)}${'♡'.repeat(r.tasks.length-got)}</div><p>${got}/${r.tasks.length} zadań zaliczonych${r.practice?' w powtórce — wynik cyklu bez zmian':''}</p><div class="ex-review">${r.tasks.map((t,i)=>{
   const a=r.answers.find(x=>x.task===i),q=t.questions[0];
   return `<div class="ex-review-item"><b>${i+1}. ${escWheel(LADDER_LABEL[t.kind]||'Scenariusz')} · ${escWheel(t.title||'')}</b><p>${escWheel(q.q)}<br>Wybrana odpowiedź: ${a?escWheel(q.options[a.chosen]):'—'}</p></div>`;
  }).join('')}</div><div class="ex-actions"><button class="btn btn-primary" onclick="WheelCourse.next()">${level===4?'Zobacz odznakę':'Idziemy dalej'}</button>${got<r.tasks.length&&!r.practice?'<button class="btn btn-secondary" onclick="WheelCourse.retry()">Popraw niezaliczone zadania</button>':''}</div>`;
 }
};
window.WheelCourse=WheelCourse;
window.EmloveLadderSync={get:loadCycle,setFromCloud:setCycleFromCloud};
window.showTrainingFamily=function(i){const f=TRAIN_WHEEL[i],el=document.getElementById('wheelDetail');if(!f||!el)return;el.innerHTML=`<h3>${escWheel(f.name)}</h3><p class="muted small">Podgrupa → słowa z zewnętrznego pierścienia</p>${f.groups.map(g=>`<p><b>${escWheel(g[0])}</b><br>${g[1].map(escWheel).join(' · ')}</p>`).join('')}`;};
function initWheelCourse(){
 const section=document.getElementById('view-exercises');if(!section||document.getElementById('wheelCourse'))return;
 section.innerHTML=`<div class="tabs"><button class="tab active" id="courseTab">Drabina emocji</button><button class="tab" id="expressTab">Wyraź</button></div><div id="coursePanel"><div class="card" id="wheelCourse"></div></div><div id="expressPanel" style="display:none"><div class="card"><h2>🗣️ Wyraź</h2><p>Napisz własnymi słowami, co czujesz. Nie ma tu poprawnych odpowiedzi ani oceny.</p><label for="expressText">Co chcesz wyrazić?</label><textarea id="expressText" rows="5" maxlength="2000" placeholder="Możesz zacząć od: Czuję… gdy…"></textarea><p id="expressHint" class="muted small"></p><div class="ex-actions"><button class="btn btn-primary" id="expressSubmit">Zanotuj</button></div><div id="expressLog" class="scenario-box" style="display:block;max-height:260px;overflow-y:auto" role="log" aria-live="polite"></div><p class="muted small">„Zanotuj" zapisuje wpis do dziennika z odznaką „Wyraż +1". Do 5 punktów na miesiąc. Nic nie jest wysyłane na serwer.</p></div></div>`;
 if(window.EmloveExpress) window.EmloveExpress.init();
 const switchTab=(isCourse)=>{document.getElementById('coursePanel').style.display=isCourse?'':'none';document.getElementById('expressPanel').style.display=isCourse?'none':'';document.getElementById('courseTab').classList.toggle('active',isCourse);document.getElementById('expressTab').classList.toggle('active',!isCourse);};
 document.getElementById('courseTab').onclick=()=>switchTab(true);document.getElementById('expressTab').onclick=()=>switchTab(false);
 // Skan koła został usunięty z repo — koło rysuje wheel-view.js jako SVG.
 // Nie nadpisujemy #wheelSvg, żeby nie zasłonić trybu awaryjnego (renderWheel).
 const detail=document.getElementById('wheelDetail');if(detail)detail.innerHTML='<h3>Twoje koło emocji</h3><p>Wybierz grupę, aby zobaczyć jej podgrupy i słowa. To mapa do poznawania języka emocji, a nie jedyny sposób odczuwania.</p>';
 if(typeof WHEEL_WORDS!=='undefined'){WHEEL_WORDS.splice(0,WHEEL_WORDS.length,...TRAIN_WHEEL.flatMap(f=>f.groups.flatMap(g=>g[1].map(word=>({word,familyId:f.name,familyName:f.name,cluster:g[0],color:'#0F8C86'})))));if(typeof renderLibraryWheel==='function')renderLibraryWheel('');}
 WheelCourse.render();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initWheelCourse);else initWheelCourse();
