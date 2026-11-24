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
function makeWheelPool(level){
 const pool=[];
 for(const f of TRAIN_WHEEL) for(const [g,words] of f.groups){
  if(level===1){
   // Powtarzające się nazwy grup nie mają jednej odpowiedzi — nie zadajemy takich pytań.
   if(TRAIN_WHEEL.filter(x=>x.groups.some(y=>y[0]===g)).length!==1) continue;
   const near=f.name==='Szczęśliwy'?['Zaskoczony','Słaby','Lękliwy']:['Rozgniewany','Lękliwy','Smutny','Zniesmaczony','Słaby','Zaskoczony'];
   const options=shuffleWheel([f.name,...shuffleWheel(near.filter(x=>x!==f.name)).slice(0,3)]);
   pool.push({q:`W którym głównym obszarze koła znajduje się podgrupa „${g}”?`,options,answer:options.indexOf(f.name),path:`${f.name} → ${g}`});
  } else if(level===2){
   for(const word of words){
    if(f.groups.filter(x=>x[1].includes(word)).length!==1) continue;
    const options=shuffleWheel([g,...shuffleWheel([...new Set(f.groups.filter(x=>x[0]!==g).map(x=>x[0]))]).slice(0,3)]);
    pool.push({q:`W obszarze „${f.name}”: do której podgrupy na kole należy słowo „${word}”?`,options,answer:options.indexOf(g),path:`${f.name} → ${g} → ${word}`});
   }
  } else {
   for(const word of words){
    const other=f.groups.filter(x=>x[0]!==g).flatMap(x=>x[1]).filter(x=>!words.includes(x));
    if(other.length<3) continue;
    const options=shuffleWheel([word,...shuffleWheel([...new Set(other)]).slice(0,3)]);
    pool.push({q:`W obszarze „${f.name}” otwieramy podgrupę „${g}”. Które słowo leży w niej na kole?`,options,answer:options.indexOf(word),path:`${f.name} → ${g} → ${word}`});
   }
  }
 }
 return pool;
}
function newCycle(){return {started:null,done:[0,0,0],correct:[0,0,0],round:null};}
function loadCycle(){let c;try{c=JSON.parse(localStorage.getItem(CYCLE_KEY));}catch(e){} if(!c||(c.started!==null&&!Number.isFinite(c.started))||!Array.isArray(c.done)||!Array.isArray(c.correct)||(c.started!==null&&Date.now()>=c.started+DURATION)){c=newCycle();localStorage.setItem(CYCLE_KEY,JSON.stringify(c));} if(migrateUnansweredIntensity(c.round))localStorage.setItem(CYCLE_KEY,JSON.stringify(c)); return c;}
function saveCycle(c){localStorage.setItem(CYCLE_KEY,JSON.stringify(c)); updateHeartsSidebar();}
function currentLevel(c){return LIMITS.findIndex((n,i)=>c.done[i]<n)+1 || 4;}
function updateHeartsSidebar(){const el=document.getElementById('statHearts');if(el){const c=loadCycle();el.textContent=c.correct.reduce((a,b)=>a+b,0);}}
function cycleInfo(c){
 const h=c.correct.reduce((a,b)=>a+b,0), n=c.done.reduce((a,b)=>a+b,0),level=currentLevel(c),deadline=c.started===null?'30 dni od pierwszej rundy':new Date(c.started+DURATION).toLocaleString('pl-PL',{dateStyle:'medium',timeStyle:'short'});
 const remaining=level<=3?LIMITS[level-1]-c.done[level-1]:0;
 const details=level<=3?`<p><strong>Poziom ${level}: ${c.correct[level-1]} zdobytych · ${remaining} serduszek jeszcze do zdobycia</strong><br><span class="muted small">${c.done[level-1]} z ${LIMITS[level-1]} zadań za Tobą. Niewykorzystanych serduszek z błędnych odpowiedzi nie można odzyskać w tym cyklu.</span></p>`:'';
 return `<p><strong>Postęp:</strong> ${n}/70 zadań · ♥ ${h}/70</p>${details}<p class="muted small">Zadania na poziomach: ${c.done.map((d,i)=>`${d}/${LIMITS[i]}`).join(' · ')}<br>Cykl trwa do: ${deadline} (czas na tym urządzeniu).</p>`;
}
const WheelCourse={
 start(withOnline=false){
  const c=loadCycle(),level=currentLevel(c);if(level>3)return this.render();
  if(c.started===null)c.started=Date.now();
  const tasks=ladderMakeRound(c,level);
  c.round={level,tasks,answers:[],taskIndex:0,qIndex:0,wins:0,phase:'quiz',practice:false,id:Date.now().toString(36)+Math.random().toString(36).slice(2)};saveCycle(c);this.render();
  if(withOnline)this.enrich(c.round.id);
 },
 async enrich(id){
  if(!window.MiloClient || !MiloClient.configured())return;
  try {const contexts=await MiloClient.contexts(); const c=loadCycle();if(!c.round||c.round.id!==id||c.round.practice)return; c.round.tasks.forEach((t,i)=>{t.context=contexts[i]||''});saveCycle(c);this.render();}catch(e){/* Offline lub brak konfiguracji — lokalne zadania nadal działają. */}
 },
 answer(i){
  const c=loadCycle(),r=c.round;if(!r||r.phase!=='quiz')return this.render();
  const t=r.tasks[r.taskIndex],q=t&&t.questions[r.qIndex];
  if(!q||!Number.isInteger(i)||i<0||i>=q.options.length)return;
  r.answers.push({task:r.taskIndex,q:r.qIndex,chosen:i,correct:i===q.answer});
  if(r.qIndex<t.questions.length-1){r.qIndex++;}
  else{r.taskIndex++;r.qIndex=0;}
  if(r.taskIndex>=r.tasks.length){
   r.phase='summary';
   if(!r.practice){
    const wins=r.tasks.reduce((n,task,ti)=>{
     const as=r.answers.filter(x=>x.task===ti);
     return n+(as.length===task.questions.length&&as.every(x=>x.correct)?1:0);
    },0);
    r.wins=wins;
    c.done[r.level-1]+=r.tasks.length;c.correct[r.level-1]+=wins;
    state.exercisesDone+=r.tasks.length;state.points+=wins*4;saveState();
   }
  }
  saveCycle(c);this.render();
 },
 retry(){const c=loadCycle();if(!c.round||c.round.phase!=='summary')return; c.round={...c.round,answers:[],taskIndex:0,qIndex:0,wins:0,phase:'quiz',practice:true};saveCycle(c);this.render();},
 next(){const c=loadCycle();if(!c.round||c.round.phase!=='summary')return; c.round=null;saveCycle(c);this.render();},
 render(){
  const el=document.getElementById('wheelCourse');if(!el)return;const c=loadCycle(),r=c.round,level=currentLevel(c);updateHeartsSidebar();
  if(!r&&level===4){const score=c.correct.reduce((a,b)=>a+b,0),gold=score>=63; el.innerHTML=`<h2>Ukończono drogę Emlove</h2>${cycleInfo(c)}<p><b>${score}/70 · ${(score/70*100).toFixed(1).replace('.',',')}%</b></p><img src="${gold?'phoenix-award.jpg':'icon-512.png'}" alt="${gold?'Odznaka złotego feniksa':'Odznaka białego serca'}" class="award-image"><h3>${gold?'Odznaka feniksa':'Odznaka białego serca'}</h3><p>${gold?'Gratulacje! Wynik co najmniej 95%.':'Dziękujemy za przejście całej drogi. Feniks jest za wynik co najmniej 95%.'} Nowy cykl rozpocznie się po upływie 30 dni.</p>`;return;}
  if(!r){el.innerHTML=`<h2>🧭 Drabina emocji</h2>${cycleInfo(c)}<p>Trzy poziomy: <b>40, 20 i 10 zadań</b>. Poziom 1 ma po 2 pytania w zadaniu, poziom 2 po 3, poziom 3 po 4. Co trzecie zadanie to <b>Rozróżnij</b>. Zadanie jest zaliczone tylko wtedy, gdy wszystkie jego pytania są poprawne.</p>${MiloClient.configured()?'<p class="muted small">Możesz zacząć lokalnie lub pobrać nowe tła przez internet. W opcji internetowej prośba trafia przez Supabase do OpenRoutera i dostawcy modelu; Twoje odpowiedzi na zadania nie są wysyłane. Weryfikacja Cloudflare może otrzymać adres IP.</p>':'<p class="muted small">Milo działa lokalnie; zadania losowane są z przygotowanej puli i mogą się powtarzać.</p>'}<p>Runda ma <b>5 zadań</b> — za zaliczoną rundę dostajesz do 5 serduszek. Informację zwrotną zobaczysz na końcu. Feniksa dostaje się przy <b>63 serduszkach</b> (90% z 70), a do 5 dodatkowych można zdobyć w ćwiczeniu <b>Wyraż</b>. Cykl trwa 30 dni.</p><p><button class="btn btn-ghost" onclick="goTo('wheel')">Zobacz koło emocji</button></p><p class="muted small">Zadania korzystają z koła i przykładowych wypowiedzi. Nie oceniamy Twoich uczuć: ta sama sytuacja może wywoływać różne reakcje.</p>${MiloClient.configured()?`<div class="ex-actions"><button class="btn btn-secondary" onclick="WheelCourse.start(false)">Rozpocznij lokalnie · poziom ${level}</button><button class="btn btn-primary" onclick="WheelCourse.start(true)">Rozpocznij z nowym tłem przez internet</button></div>`:`<button class="btn btn-primary" onclick="WheelCourse.start(false)">Rozpocznij rundę · poziom ${level}</button>`}`;return;}
  if(r.phase==='quiz'){
   const t=r.tasks[r.taskIndex],q=t&&t.questions[r.qIndex];if(!q)return;
   const totalQ=r.tasks.reduce((n,x)=>n+x.questions.length,0);
   const doneQ=r.answers.length;
   el.innerHTML=`<h2>Poziom ${r.level} · ${r.practice?'powtórka':'runda'}</h2>${cycleInfo(c)}<p class="muted">${escWheel(LADDER_LABEL[t.kind]||'Koło emocji')} · Zadanie ${r.taskIndex+1} z ${r.tasks.length} · Pytanie ${r.qIndex+1} z ${t.questions.length}${r.practice?' · ćwiczenie bez zmiany wyniku cyklu':''}</p><div class="ex-progress"><div style="width:${100*doneQ/totalQ}%"></div></div>${t.story?`<p class="ex-story">${escWheel(t.story)}</p>`:''}<p class="ex-prompt">${escWheel(q.q)}</p><div class="exercise-options">${q.options.map((o,i)=>`<button class="choice-btn" onclick="WheelCourse.answer(${i})">${escWheel(o)}</button>`).join('')}</div><p class="muted small">Nie ma podpowiedzi ani oceny po pojedynczym pytaniu. Odpowiedzi zobaczysz po całej rundzie.</p>`;
   return;
  }
  const got=typeof r.wins==='number'?r.wins:0;
  el.innerHTML=`<h2>Podsumowanie rundy · poziom ${r.level}</h2>${cycleInfo(c)}<div class="hearts">${'♥'.repeat(got)}${'♡'.repeat(r.tasks.length-got)}</div><p>${got}/${r.tasks.length} zadań zaliczonych${r.practice?' w powtórce — wynik cyklu bez zmian':''}</p><div class="ex-review">${r.tasks.map((t,i)=>{
   const as=r.answers.filter(x=>x.task===i),ok=as.length===t.questions.length&&as.every(x=>x.correct);
   return `<div class="ex-review-item ${ok?'ok':'no'}"><b>${i+1}. ${escWheel(t.title||LADDER_LABEL[t.kind]||'Zadanie')}</b>${t.questions.map((q,qi)=>{
    const a=as.find(x=>x.q===qi);
    return `<p>${escWheel(q.q)}<br>Twoja odpowiedź: ${a?escWheel(q.options[a.chosen]):'—'}${a&&!a.correct?`<br>Poprawnie: ${escWheel(q.options[q.answer])}`:''}</p>`;
   }).join('')}${t.explain?`<p class="muted small">${escWheel(t.explain)}</p>`:''}</div>`;
  }).join('')}</div><div class="ex-actions"><button class="btn btn-primary" onclick="WheelCourse.next()">${level===4?'Zobacz odznakę':'Idziemy dalej'}</button><button class="btn btn-secondary" onclick="WheelCourse.retry()">Poprawiamy tę rundę</button></div><p class="muted small">Zadanie jest zaliczone tylko wtedy, gdy wszystkie jego pytania są poprawne. Powtórka pomaga ćwiczyć, ale nie zmienia wyniku cyklu.</p>`;
 }
};
window.WheelCourse=WheelCourse;
window.showTrainingFamily=function(i){const f=TRAIN_WHEEL[i],el=document.getElementById('wheelDetail');if(!f||!el)return;el.innerHTML=`<h3>${escWheel(f.name)}</h3><p class="muted small">Podgrupa → słowa z zewnętrznego pierścienia</p>${f.groups.map(g=>`<p><b>${escWheel(g[0])}</b><br>${g[1].map(escWheel).join(' · ')}</p>`).join('')}`;};
function initWheelCourse(){
 const section=document.getElementById('view-exercises');if(!section||document.getElementById('wheelCourse'))return;
 section.innerHTML=`<div class="tabs"><button class="tab active" id="courseTab">Drabina emocji</button><button class="tab" id="expressTab">Wyraź</button></div><div id="coursePanel"><div class="card" id="wheelCourse"></div></div><div id="expressPanel" style="display:none"><div class="card"><h2>🗣️ Wyraź</h2><p>Napisz własnymi słowami, co czujesz. Nie ma tu poprawnych odpowiedzi ani oceny.</p><p class="muted small">Jak to działa: napisz <b>Milo</b>, a Milo odpowie. Potem napisz <b>Ja</b> — odpowie emotkami. Gdy odpiszesz samymi emotkami, Milo zdradzi sekret.</p><label for="expressText">Co chcesz wyrazić?</label><textarea id="expressText" rows="5" maxlength="2000" placeholder="Możesz zacząć od: Czuję… gdy…"></textarea><p id="expressHint" class="muted small"></p><div class="ex-actions"><button class="btn btn-primary" id="expressSubmit">Zanotuj</button></div><div id="expressLog" class="scenario-box" style="display:block;max-height:260px;overflow-y:auto" role="log" aria-live="polite"></div><p class="muted small">„Zanotuj" zapisuje wpis do dziennika z odznaką „Wyraż +1". Do 5 punktów na miesiąc. Nic nie jest wysyłane na serwer.</p></div></div>`;
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
