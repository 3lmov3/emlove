// Drabina: zrównoważony plan i sześć rodzajów zadań.
const LADDER_TYPES = ['rozpoznaj','nazwij','rozroznij','cialo','natezenie','potrzeba'];
const LADDER_LABEL = {rozpoznaj:'Rozpoznaj',nazwij:'Nazwij',rozroznij:'Rozróżnij',cialo:'Ciało',natezenie:'Natężenie',potrzeba:'Potrzeba'};
const LADDER_COUNTS = [[9,9,8,8,8,8],[7,7,7,7,6,6],[5,5,5,5,5,5]];
function ladderPlan(level){let counts=shuffleWheel(LADDER_COUNTS[level-1]);let bag=[];LADDER_TYPES.forEach((kind,i)=>{for(let n=0;n<counts[i];n++)bag.push(kind)});return shuffleWheel(bag);}
function ladderOptions(correct,wrong,count=4){const opts=shuffleWheel([correct,...shuffleWheel([...new Set(wrong)].filter(x=>x!==correct)).slice(0,count-1)]);return {options:opts,answer:opts.indexOf(correct)};}
const NAME_EXAMPLES=[
 ['Ktoś wyjawił coś, co powierzyłam mu w zaufaniu. Nazywam to utratą zaufania.','zdradzony',['zlekceważony','zazdrosny','poirytowany']],
 ['Mój pomysł został bez wysłuchania uznany za nieważny. Mówię o pomniejszeniu mojego zdania.','zlekceważony',['zdradzony','zazdrosny','sprowokowany']],
 ['Obawiam się, że ważną dla mnie bliskość utracę na rzecz innej osoby.','zazdrosny',['zdradzony','ośmieszony','poirytowany']],
 ['Nie daję po sobie poznać, co myślę, i celowo nie dopuszczam nikogo bliżej.','zamknięty w sobie',['sprowokowany','zazdrosny','sarkastyczny']],
 ['Obserwuję coś i bardzo chcę dowiedzieć się więcej.','zaciekawiony',['doceniony','wdzięczny','odważny']],
 ['Czyjś gest uświadomił mi, że jestem dla tej osoby ważny. Chcę jej za niego podziękować.','wdzięczny',['odważny','zuchwały','sarkastyczny']],
 ['Moje starania zostały zauważone i pozytywnie uznane.','doceniony',['zlekceważony','odizolowany','sprowokowany']],
 ['Czuję brak kontaktu z ludźmi i oddzielenie od grupy.','odizolowany',['bezsilny','zmartwiony','zawstydzony']],
 ['Mam mało energii i chcę odpocząć; najchętniej bym zasnął.','senny',['rozkojarzony','apatyczny','przytłoczony']],
 ['Rozmyślam o możliwym wyniku rozmowy i martwię się, co się wydarzy.','zmartwiony',['przytłoczony','niepewny','bezsilny']],
 ['W tej sytuacji mam wrażenie, że zabrakło mi wpływu na to, co się dzieje.','bezsilny',['niepewny','zmartwiony','zawstydzony']],
 ['Moją wypowiedź wyśmiano przy innych i tak właśnie to odbieram.','ośmieszony',['zlekceważony','zdradzony','urażony']],
];
const DISTINGUISH_EXAMPLES=[
 ['Które słowo odnosi się do złamanego zaufania, a nie do obawy o utratę bliskości?','zdradzony',['zazdrosny','zlekceważony','poirytowany']],
 ['Które słowo odnosi się do pominięcia czyjegoś zdania, a nie do publicznego wyśmiania?','zlekceważony',['ośmieszony','zazdrosny','sprowokowany']],
 ['Które słowo nazywa chęć dowiedzenia się więcej, a nie otrzymanie uznania?','zaciekawiony',['doceniony','wdzięczny','szanowany']],
 ['Które słowo opisuje brak kontaktu i oddzielenie od grupy, a nie brak wpływu?','odizolowany',['bezsilny','zmartwiony','zawstydzony']],
 ['Które słowo dotyczy martwienia się, a nie potrzeby snu?','zmartwiony',['senny','zazdrosny','zakłopotany']],
 ['Które słowo dotyczy wdzięczności, a nie poczucia bycia docenionym?','wdzięczny',['doceniony','odważny','energiczny']],
 ['Które słowo opisuje wyśmianie przy innych, a nie złamanie zaufania?','ośmieszony',['zdradzony','zazdrosny','poirytowany']],
 ['Które słowo opisuje brak wpływu, a nie brak bliskości?','bezsilny',['odizolowany','zazdrosny','zmartwiony']],
];
const BODY_EXAMPLES=[
 ['Zauważam ucisk w szczęce i ciepło w dłoniach.','szczęka',['dłonie','brzuch','ramiona'],'ucisk'],
 ['Zauważam ciężar w klatce piersiowej oraz napięcie w barkach.','klatka piersiowa',['barki','dłonie','żołądek'],'ciężar'],
 ['Mam ucisk w żołądku, a dłonie pozostają rozluźnione.','żołądek',['dłonie','gardło','stopy'],'ucisk'],
 ['Zauważam drżenie dłoni i ciepło na twarzy.','dłonie',['twarz','brzuch','kolana'],'drżenie'],
 ['Zauważam napięcie w barkach, mój oddech pozostaje spokojny.','barki',['brzuch','dłonie','gardło'],'napięcie'],
 ['Czuję ścisk w gardle, a ramiona są rozluźnione.','gardło',['ramiona','stopy','szczęka'],'ścisk'],
 ['Czuję ciepło w miejscu intymnym, moje dłonie są chłodne.','miejsce intymne',['dłonie','barki','głowa'],'ciepło'],
 ['Czuję napięcie w szczęce; oddech pozostaje spokojny.','szczęka',['brzuch','stopy','ramiona'],'napięcie'],
];
const NEED_EXAMPLES=[
 ['Chcę, żeby ktoś spokojnie mnie wysłuchał. Nie szukam teraz rad.','bycia wysłuchaną lub wysłuchanym',['otrzymania wskazówek','towarzystwa bez rozmowy','jasnych informacji']],
 ['Chcę na chwilę zostać sam na sam ze swoimi myślami.','przestrzeni dla siebie',['bycia wysłuchaną lub wysłuchanym','pomocy w decyzji','jasnych informacji']],
 ['Nie wiem, co się zmieniło. Chcę poznać konkretne informacje.','jasności i informacji',['bycia wysłuchaną lub wysłuchanym','bliskości','odpoczynku']],
 ['Jestem zmęczona i chcę zrobić przerwę.','odpoczynku',['bliskości','jasności i informacji','pomocy w decyzji']],
 ['Chcę, aby ktoś zapytał mnie, czy zgadzam się na dotyk.','poszanowania granic',['bliskości','jasności i informacji','odpoczynku']],
 ['Chcę pobyć blisko kogoś zaufanego i nie tłumaczyć się ze swoich uczuć.','bliskości i akceptacji',['przestrzeni dla siebie','jasności i informacji','pomocy w decyzji']],
 ['Chcę wcześniej wiedzieć, jakie są ustalenia, żebym mógł się przygotować.','przewidywalności',['bycia wysłuchaną lub wysłuchanym','odpoczynku','bliskości']],
 ['Chcę sama wybrać, czy chcę o tym rozmawiać.','autonomii',['bycia wysłuchaną lub wysłuchanym','odpoczynku','jasności i informacji']],
];
// Porównujemy wyłącznie własne słowa tej samej osoby, nie jej sytuację ani ciało.
const INTENSITY_EXAMPLES = [
 ['Czuję lekki smutek.','Czuję bardzo silny smutek.'],
 ['Jest we mnie trochę radości.','Czuję ogromną radość.'],
 ['Czuję niewielki niepokój.','Czuję bardzo silny niepokój.'],
 ['Odczuwam lekką złość.','Odczuwam bardzo silną złość.'],
 ['Czuję odrobinę napięcia.','Czuję duże napięcie.'],
 ['Czuję lekki strach.','Czuję bardzo silny strach.'],
 ['Jestem trochę rozczarowana.','Jestem bardzo mocno rozczarowana.'],
 ['Czuję niewielką frustrację.','Czuję ogromną frustrację.'],
 ['Jestem trochę podekscytowany.','Jestem bardzo mocno podekscytowany.'],
 ['Czuję lekką irytację.','Czuję bardzo silną irytację.'],
 ['Czuję niewielką zazdrość.','Czuję bardzo silną zazdrość.'],
 ['Czuję odrobinę nadziei.','Czuję ogromną nadzieję.'],
 ['Jestem lekko zaskoczona.','Jestem bardzo mocno zaskoczona.'],
 ['Czuję niewielki wstyd.','Czuję bardzo silny wstyd.'],
 ['Czuję się trochę samotnie.','Czuję się bardzo samotnie.'],
 ['Jestem trochę zmartwiony.','Jestem bardzo mocno zmartwiony.'],
 ['Odczuwam lekką wdzięczność.','Odczuwam ogromną wdzięczność.'],
 ['Czuję niewielką bezsilność.','Czuję bardzo silną bezsilność.'],
 ['Jestem trochę zakłopotana.','Jestem bardzo mocno zakłopotana.'],
 ['Czuję niewielki zachwyt.','Czuję ogromny zachwyt.'],
];
function makeIntensityTask(){
 const [weaker,stronger]=shuffleWheel(INTENSITY_EXAMPLES)[0];
 const higher=Math.random()<.5, correct=higher?stronger:weaker;
 return {kind:'natezenie',q:`Ta sama osoba opisuje swoje odczucie na dwa sposoby. W której wypowiedzi wyraża ${higher?'silniejsze':'słabsze'} odczucie?`,
  meta:{intensityVersion:2,weaker,stronger,higher},...ladderOptions(correct,[higher?weaker:stronger],2),
  path:`Wypowiedź tej osoby: „${correct}”`,
  explain:'Odpowiedź wynika ze słów tej osoby. Każdy może inaczej opisywać siłę swoich odczuć.'};
}
// Tylko stary liczbowy wariant, nie dowolne zadanie bez metadanych.
function isOldIntensityTask(t){return !!t && t.kind==='natezenie' && typeof t.q==='string' && /\d+\/10/.test(t.q) && Array.isArray(t.options) && t.options.length===2 && t.options.every(x=>/^\d+$/.test(String(x)));}
function migrateUnansweredIntensity(round){
 if(!round||round.phase!=='quiz'||!Array.isArray(round.tasks)||!Array.isArray(round.answers))return false;
 let changed=false;
 for(let i=round.answers.length;i<round.tasks.length;i++)if(isOldIntensityTask(round.tasks[i])){round.tasks[i]=makeIntensityTask();changed=true;}
 return changed;
}
function ladderTaskKey(t){return t.q+'\n'+(t.kind==='natezenie'?[...t.options].sort().join('\n'):'');}

function ladderMakeTask(kind,level){
 const count=level===1?3:4;
 if(kind==='rozpoznaj'){let t=shuffleWheel(makeWheelPool(level))[0];return {...t,kind,explain:'To umiejscowienie słów na przesłanym kole. Nie oznacza jednej właściwej reakcji na daną sytuację.'};}
 if(kind==='nazwij'||kind==='rozroznij'){
  // Unikamy słów występujących w kilku rodzinach koła, gdzie nie ma jednej odpowiedzi.
  const source=kind==='nazwij'?NAME_EXAMPLES:DISTINGUISH_EXAMPLES;
  const eligible=source.filter(x=>TRAIN_WHEEL.filter(f=>f.groups.some(g=>g[1].includes(x[1]))).length===1);
  const [s,word,wrong]=shuffleWheel(eligible)[0];
  const family=TRAIN_WHEEL.find(f=>f.groups.some(g=>g[1].includes(word)));
  const group=family.groups.find(g=>g[1].includes(word))[0];
  const meaning=kind==='nazwij'?`Osoba opisuje swoje doświadczenie: „${s}”`:`${s.replace(/^Które słowo /,'Szukamy określenia, które ').replace(/\?$/,'.')}`;
  let correct, distractors,question,path=`${family.name} → ${group} → ${word}`;
  if(level===1){correct=family.name;const peers=family.name==='Szczęśliwy'?['Zaskoczony','Słaby','Lękliwy']:['Rozgniewany','Lękliwy','Smutny','Zniesmaczony','Słaby','Zaskoczony'];distractors=peers.filter(x=>x!==correct);question='Do której głównej grupy koła należy to określenie?';}
  else if(level===2){correct=group;distractors=family.groups.map(g=>g[0]).filter(x=>x!==correct);question=`W grupie „${family.name}”: do której podgrupy koła należy to określenie?`;}
  else{correct=word;distractors=wrong;question='Które określenie najlepiej odpowiada temu opisowi?';}
  return {kind,q:`${meaning} ${question}`,...ladderOptions(correct,distractors,count),path,explain:'Wybór odnosi się do przykładowego opisu i umiejscowienia słów na kole, nie do tego, co czułaby każda osoba.'};
 }
 if(kind==='cialo'){
  const [s,correct,wrong,signal]=shuffleWheel(BODY_EXAMPLES)[0];return {kind,q:`Osoba mówi: „${s}” Gdzie ta osoba odczuwa ${signal}?`,...ladderOptions(correct,wrong,count),path:`Wypowiedź wskazuje: ${correct}`,explain:'To ćwiczenie słuchania opisu ciała. Sygnał w ciele sam w sobie nie przesądza o emocji.'};
 }
 if(kind==='potrzeba'){
  const [s,correct,wrong]=shuffleWheel(NEED_EXAMPLES)[0];return {kind,q:`Osoba mówi: „${s}” Jaką potrzebę wyraża własnymi słowami?`,...ladderOptions(correct,wrong,count),path:`Wyrażona potrzeba: ${correct}`,explain:'Odczytujemy potrzebę z wypowiedzi tej osoby, nie przypisujemy potrzeby automatycznie do emocji.'};
 }
 return makeIntensityTask();
}
function ladderMakeRound(c,level){
 if(!Array.isArray(c.plans))c.plans=[];
 if(!Array.isArray(c.plans[level-1])||c.plans[level-1].length!==LIMITS[level-1])c.plans[level-1]=ladderPlan(level);
 const n=Math.min(5,LIMITS[level-1]-c.done[level-1]);const kinds=c.plans[level-1].slice(c.done[level-1],c.done[level-1]+n);
 if(!Array.isArray(c.seen))c.seen=[];const chosen=[];
 for(const kind of kinds){let t;for(let attempt=0;attempt<40;attempt++){t=ladderMakeTask(kind,level);if(!c.seen.includes(ladderTaskKey(t))&&!chosen.some(x=>ladderTaskKey(x)===ladderTaskKey(t)))break;}chosen.push(t);c.seen.push(ladderTaskKey(t));}
 c.seen=c.seen.slice(-120);return chosen;
}
window.LADDER_LABEL=LADDER_LABEL;
