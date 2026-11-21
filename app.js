// EmocjeLab — logika aplikacji
const EMOTIONS = [
  {id:'joy', emoji:'😊', name:'Radość', color:'#FFC24B', words:['radość','szczęście','entuzjazm','duma','wdzięczność','ulga','spokój','zadowolenie'], desc:'Radość pojawia się, gdy coś idzie po naszej myśli lub gdy czujemy połączenie z innymi. To sygnał, że warto to pielęgnować.', body:'ciepło w klatce piersiowej, lekkość, uśmiech, energia', questions:['Co sprawiło, że poczułeś/poczułaś radość?','Jak chcesz tę chwilę zapamiętać?','Czego ta radość Cię uczy o Twoich wartościach?']},
  {id:'sad', emoji:'😢', name:'Smutek', color:'#8B7CF6', words:['smutek','żal','tęsknota','rozczarowanie','przygnębienie','bezradność','samotność','wstyd'], desc:'Smutek mówi: coś ważnego zostało utracone lub nie spełniło się. To naturalna reakcja na stratę, rozczarowanie, koniec.', body:'ciężkość w klatce, łzy, opadnięte ramiona, zmęczenie', questions:['Co straciłeś/straciłaś lub czego Ci brakuje?','Kto lub co mogłoby Cię teraz wesprzeć?','Jak chcesz zaopiekować się sobą w smutku?']},
  {id:'anger', emoji:'😠', name:'Złość', color:'#FF6B4A', words:['złość','irytacja','frustracja','wściekłość','uraza','niechęć','gniew','zazdrość'], desc:'Złość chroni nasze granice i wartości. Pojawia się, gdy czujemy niesprawiedliwość, blokadę lub naruszenie granicy.', body:'napięcie w szczęce, gorąco, zaciskanie pięści, przyspieszone bicie serca', questions:['Jaką granicę lub wartość czujesz, że naruszono?','Co ta złość próbuje chronić?','Jak możesz wyrazić złość bez ranienia siebie i innych?']},
  {id:'fear', emoji:'😟', name:'Strach / Lęk', color:'#0E9A8B', words:['strach','lęk','niepokój','panika','trema','wstyd','zagrożenie','niepewność'], desc:'Strach i lęk przygotowują nas na niebezpieczeństwo. Lęk dotyczy przyszłości, strach — teraźniejszości.', body:'ściskanie w żołądku, szybki oddech, drżenie, napięcie mięśni', questions:['Czego dokładnie się boisz/boisz się?','Co najgorszego, najlepszego i najbardziej prawdopodobnego może się stać?','Czego potrzebujesz, aby poczuć się bezpieczniej?']},
  {id:'disgust', emoji:'🤢', name:'Wstręt', color:'#7AC74F', words:['wstręt','obrzydzenie','odraza','niechęć','niesmak'], desc:'Wstręt chroni nas przed tym, co szkodliwe lub niezgodne z naszymi wartościami. Może dotyczyć jedzenia, zapachów, ale też zachowań.', body:'mdłości, cofanie się, marszczenie nosa', questions:['Co dokładnie wywołuje wstręt?','Jaką informację niesie ta reakcja?','Jak możesz zadbać o siebie w tej sytuacji?']},
  {id:'surprise', emoji:'😲', name:'Zaskoczenie', color:'#FF8FAB', words:['zaskoczenie','zdziwienie','szok','ciekawość','olśnienie'], desc:'Zaskoczenie przerywa automatyczne działanie i każe zwrócić uwagę. Może być przyjemne lub trudne.', body:'rozszerzone oczy, wstrzymanie oddechu, podniesienie brwi', questions:['Czego się nie spodziewałeś/spodziewałaś?','Jak Twoje ciało zareagowało na zaskoczenie?','Co chcesz teraz zbadać lub zapytać?']},
  {id:'calm', emoji:'😌', name:'Spokój', color:'#6EC6FF', words:['spokój','relaks','ulga','akceptacja','wdzięczność','bezpieczeństwo','równowaga'], desc:'Spokój to stan, w którym układ nerwowy czuje się bezpiecznie. Nie oznacza braku emocji — oznacza równowagę.', body:'spowolniony oddech, rozluźnione mięśnie, ciepło', questions:['Co pomogło Ci poczuć spokój?','Jak możesz wracać do tego stanu?','Co ten spokój mówi o Twoich potrzebach?']},
  {id:'shame', emoji:'😳', name:'Wstyd / Zażenowanie', color:'#C084FC', words:['wstyd','zażenowanie','upokorzenie','poczuci winy','żal'], desc:'Wstyd dotyczy tego, kim jesteśmy w oczach innych. Wina dotyczy tego, co zrobiliśmy. Oba sygnalizują potrzebę naprawy lub akceptacji.', body:'rumieńce, chęć ukrycia się, spuszczenie wzroku', questions:['Co dokładnie czujesz — wstyd czy winę?','Czyja perspektywa mówi w Twojej głowie?','Jak możesz mówić do siebie życzliwie?']},
];

const BODY_SIGNALS = ['klatka piersiowa','żołądek','gardło','szczęka','ramiona','dłonie','całe ciało','głowa','serce','oddech','miejsce intymne'];
const NEEDS = ['spokoju','wsparcia','zrozumienia','odpoczynku','rozmowy','ciszy','przestrzeni','bezpieczeństwa','akceptacji','czasu dla siebie','pomocy','radości'];

const RECOGNIZE_Q = [
  {text:'Masz jutro ważny sprawdzian. Uczyłeś się, ale czujesz, że zapomnisz wszystko. Serce bije szybko, dłonie się pocą.', options:['😟 Lęk / trema','😊 Radość','😠 Złość','😌 Spokój'], answer:0, explain:'Szybkie bicie serca i pocenie przy myśli o przyszłości to typowe sygnały lęku. Nazwanie tego pomaga: „czuję lęk przed sprawdzianem”.'},
  {text:'Kolega opowiedział żart, wszyscy się śmieją, a Ty też czujesz ciepło i lekkość. Chcesz, żeby ten moment trwał.', options:['😢 Smutek','😊 Radość','🤢 Wstręt','😲 Zaskoczenie'], answer:1, explain:'Ciepło, lekkość i chęć przedłużenia chwili to sygnały radości.'},
  {text:'Ktoś bez pytania wziął Twoją ulubioną rzecz i ją zgubił. Czujesz napięcie w szczęce i gorąco w twarzy.', options:['😌 Spokój','😢 Smutek','😠 Złość','😟 Lęk'], answer:2, explain:'Napięcie w szczęce i gorąco przy naruszeniu granicy to sygnały złości. Złość chroni to, co dla Ciebie ważne.'},
  {text:'Dostałeś wiadomość, że Twoja bliska osoba jest chora. Czujesz ciężkość w klatce i łzy napływają do oczu.', options:['😢 Smutek','😊 Radość','😲 Zaskoczenie','😠 Złość'], answer:0, explain:'Ciężkość w klatce i łzy przy stracie lub zmartwieniu o bliskich to smutek / troska.'},
  {text:'Nagle usłyszałeś głośny dźwięk i poczułeś, jak oddech Ci się zatrzymał, a oczy się rozszerzyły.', options:['😌 Spokój','😟 Lęk','😲 Zaskoczenie','😊 Radość'], answer:2, explain:'Zatrzymanie oddechu i rozszerzenie oczu to klasyczne sygnały zaskoczenia.'},
];

const NAME_Q = [
  {text:'Czuję się „źle”, bo nikt nie zaprosił mnie na urodziny, a bardzo chciałem tam być. Jest mi przykro i trochę samotnie.', options:['smutek + samotność','złość','radość','spokój'], answer:0, explain:'Precyzyjniej: smutek i samotność. Nazwanie dwóch emocji zamiast ogólnego „źle” pomaga lepiej zadbać o siebie.'},
  {text:'Popełniłem błąd w pracy i wszyscy to widzieli. Chcę zniknąć, rumienię się, boję się, co pomyślą.', options:['duma','wstyd','entuzjazm','ulga'], answer:1, explain:'Chęć zniknięcia i rumieńce przy ocenie innych to wstyd. To inna emocja niż wina — warto ją rozróżnić.'},
  {text:'Mimo że się boję, chcę spróbować. Czuję motylki, ale też ekscytację, że może się udać.', options:['tylko strach','lęk + ekscytacja / ciekawość','smutek','wstręt'], answer:1, explain:'Emocje mogą występować razem: lęk i ekscytacja. Nazwanie obu daje pełniejszy obraz.'},
  {text:'Ktoś pomógł mi bezinteresownie. Czuję ciepło i chcę podziękować, ale też doceniam, że mam takich ludzi.', options:['wdzięczność','zazdrość','wstyd','frustracja'], answer:0, explain:'Ciepło + chęć podziękowania to wdzięczność — precyzyjniejsze słowo niż ogólna „radość”.'},
];

const EXPRESS_SCENARIOS = [
  'kolega/koleżanka spóźnia się na umówione spotkanie bez wiadomości',
  'ktoś przerywa Ci, gdy mówisz o czymś ważnym',
  'dostałeś wiadomość, że Twoja bliska osoba jest chora',
  'musisz odmówić prośbie, na którą nie masz siły',
  'ktoś ocenia Twój wygląd w sposób, który Cię rani',
  'czujesz, że Twoje zdanie nie zostało wysłuchane',
];

const SIMULATIONS = [
  {id:'school', icon:'🏫', title:'W szkole — prezentacja', short:'Treść prezentacji zapada w pamięć, a Ty czujesz lęk.', story:'Jutro masz prezentację przed klasą. Materiał masz opanowany, ale boisz się, że zapomnisz tekst, a wszyscy będą patrzeć i oceniać. Czujesz ścisk w żołądku i szybki oddech.', steps:[
    {q:'Co najpierw zauważasz w swoim ciele?', choices:[{t:'Ścisk w żołądku i szybki oddech', next:'To brzmi jak sygnał lęku. Co ten lęk próbuje Ci powiedzieć o tym, co jest dla Ciebie ważne?'},{t:'Nic nie czuję, wszystko jest okej', next:'Czasem ciało mówi szeptem. Spróbuj sprawdzić: oddech, ramiona, szczęka. Co tam jest?'},{t:'Złość, że muszę to robić', next:'Złość też może być pod lękiem. Co ta złość chroni? Może potrzebę bycia wysłuchanym i docenionym?'}]},
    {q:'Jak nazwiesz tę emocję precyzyjniej niż „źle”?', choices:[{t:'Lęk przed oceną', next:'„Lęk przed oceną” to bardzo precyzyjna nazwa. Co by się zmieniło, gdybyś powiedział/powiedziała to na głos?'},{t:'Treść prezentacji', next:'Treść to bardziej myśl niż emocja. Pod spodem może być lęk, wstyd lub potrzeba akceptacji. Które słowo pasuje?'},{t:'Nie wiem', next:'Nie wiedzieć to też informacja. Możesz powiedzieć: „czuję coś trudnego i nie umiem tego nazwać”. To już krok.'}]},
    {q:'Co możesz teraz zrobić — decyzja należy do Ciebie. Co wybierasz?', choices:[{t:'Powiem komuś zaufanemu, że się boję', next:'Powiedzenie tego na głos to forma wyrażenia emocji. Jak myślisz, co byś chciał/chciała usłyszeć w odpowiedzi?'},{t:'Przećwiczę prezentację jeszcze raz', next:'Przygotowanie może dać poczucie sprawczości. Czy to wystarczy, czy potrzebujesz też wsparcia emocjonalnego?'},{t:'Wezmę minutę oddechu i sprawdzę ciało', next:'Oddech to sposób na zaopiekowanie się ciałem. Po oddechu — co dalej?'}]},
  ]},
  {id:'friend', icon:'💬', title:'Z przyjacielem — cisza w wiadomościach', short:'Nie odpowiada od wczoraj. Co czujesz?', story:'Wczoraj napisałeś/napisałaś do bliskiej osoby. Dziś rano nadal nie ma odpowiedzi. Widzisz, że jest online, ale nie pisze. W głowie pojawiają się różne myśli.', steps:[
    {q:'Co czujesz, gdy widzisz brak odpowiedzi?', choices:[{t:'Smutek i odrzucenie', next:'Smutek przy braku odpowiedzi często mówi o potrzebie bliskości. Co ta potrzeba mówi o tej relacji?'},{t:'Złość — „dlaczego ignoruje?”', next:'Złość może chronić potrzebę szacunku i jasności. Jak możesz wyrazić tę potrzebę bez oskarżania?'},{t:'Lęk — „czy coś się stało?”', next:'Lęk o drugą osobę to troska. Jak możesz sprawdzić, czy wszystko okej, w sposób, który szanuje siebie?'}]},
    {q:'Jaką myśl zauważasz?', choices:[{t:'„Na pewno mnie nie lubi”', next:'To myśl, nie fakt. Jaką inną interpretację możesz wziąć pod uwagę?'},{t:'„Może ma trudny dzień”', next:'To jedna z możliwych interpretacji. Co jeszcze może być prawdą?'},{t:'„Nie wiem, co myśleć”', next:'Niepewność jest trudna. Nazwanie jej — „czuję niepewność” — już pomaga.'}]},
    {q:'Co chcesz zrobić? Pamiętaj: to Twoja decyzja.', choices:[{t:'Napisać: „Czuję niepokój, gdy nie odpowiadasz. Czy wszystko okej?”', next:'To komunikat „Ja” — wyraża emocję i prośbę. Jak się czujesz po takim zdaniu?'},{t:'Poczekać i zająć się sobą', next:'Czekanie też jest wyborem. Co pomoże Ci w tym czasie zadbać o siebie?'},{t:'Porozmawiać z kimś innym o tym, co czuję', next:'Rozmowa z trzecią osobą może pomóc nazwać emocję, zanim napiszesz do przyjaciela.'}]},
  ]},
  {id:'family', icon:'🏠', title:'W rodzinie — kłótnia', short:'Podniesiony głos. Jak wyrażasz złość?', story:'W domu wybucha kłótnia. Ktoś podnosi głos i mówi coś, co Cię rani. Czujesz gorąco w twarzy i napięcie w ciele. Chcesz krzyczeć, ale nie chcesz ranić.', steps:[
    {q:'Co czujesz w ciele w tej chwili?', choices:[{t:'Gorąco i napięcie', next:'To sygnał złości. Złość niesie energię — jak chcesz jej użyć?'},{t:'Ścisk w gardle, łzy', next:'Łzy przy kłótni mogą oznaczać smutek lub zranienie. Co zostało zranione?'},{t:'Chcę uciec', next:'Chęć ucieczki to sygnał potrzeby przestrzeni. Jak możesz poprosić o nią wprost?'}]},
    {q:'Co ta emocja chroni?', choices:[{t:'Moje granice', next:'Granice są ważne. Jak możesz je nazwać słowami zamiast tylko krzykiem?'},{t:'Relację z tą osobą', next:'Chcesz chronić relację mimo kłótni. To cenna potrzeba. Jak ją wyrazić?'},{t:'Nie wiem', next:'Możesz zacząć od: „czuję coś silnego i potrzebuję chwili”. To też wyrażenie emocji.'}]},
    {q:'Wybierz formę wyrażenia (decyzja Twoja):', choices:[{t:'„Czuję złość, gdy… Potrzebuję chwili, aby się uspokoić”', next:'To wyrażenie złości z granicą. Jak myślisz, jak zareaguje druga osoba?'},{t:'„Czuję się zraniony, gdy mówisz… Proszę, mów do mnie spokojniej”', next:'Nazwanie zranienia i prośba o zmianę to konkretny krok. Co byś zrobił/zrobiła, gdyby prośba nie zadziałała?'},{t:'Wyjdę na chwilę i wrócę, gdy będę gotowy/gotowa', next:'Przerwa to też komunikacja. Jak dasz znać, że wrócisz i nie uciekasz od rozmowy?'}]},
  ]},
  {id:'work', icon:'💼', title:'W pracy / online — krytyka', short:'Komentarz, który Cię zabolał.', story:'Na spotkaniu online ktoś skomentował Twoją pracę w sposób, który poczułeś/poczułaś jako upokarzający. Wszyscy to słyszeli. Uśmiechasz się, ale w środku czujesz wstyd i złość.', steps:[
    {q:'Co czujesz najbardziej?', choices:[{t:'Wstyd', next:'Wstyd przy ocenie innych. Czyja perspektywa mówi w Twojej głowie? Jak możesz mówić do siebie życzliwie?'},{t:'Złość', next:'Złość przy naruszeniu szacunku. Jaką granicę chcesz postawić?'},{t:'Lęk, że to wpłynie na moją pozycję', next:'Lęk o pozycję to realna troska. Co możesz zrobić, aby poczuć się bezpieczniej?'}]},
    {q:'Co potrzebujesz teraz?', choices:[{t:'Docenienia i szacunku', next:'Potrzeba docenienia jest ważna. Jak możesz o nią poprosić konkretnie?'},{t:'Chwili, aby ochłonąć', next:'Chwila przerwy to dbanie o siebie. Jak ją zorganizować?'},{t:'Jasności, co dalej', next:'Jasność zmniejsza lęk. Jakie pytanie możesz zadać, aby ją uzyskać?'}]},
    {q:'Co wybierasz?', choices:[{t:'Porozmawiam prywatnie z tą osobą', next:'Prywatna rozmowa często jest bezpieczniejsza niż publiczna. Co chcesz w niej powiedzieć?'},{t:'Zapiszę, co czuję, i przemyślę', next:'Zapisanie to forma wyrażenia. Po przemyśleniu — czy chcesz działać?'},{t:'Poproszę o wsparcie zaufaną osobę', next:'Wsparcie to nie słabość. Kto mógłby Cię wysłuchać bez oceniania?'}]},
  ]},
];

// State
let state = {
  entries: JSON.parse(localStorage.getItem('emocje_entries')||'[]'),
  points: parseInt(localStorage.getItem('emocje_points')||'0'),
  exercisesDone: parseInt(localStorage.getItem('emocje_exercises')||'0'),
  chat: JSON.parse(localStorage.getItem('emocje_chat')||'[]'),
  selectedEmotion: null,
  selectedBody: new Set(),
  selectedNeeds: new Set(),
  simIndex: null, simStep: 0, simLog: [],
  recognizeIdx: 0, nameIdx: 0,
};

function saveState(){
  localStorage.setItem('emocje_entries', JSON.stringify(state.entries));
  localStorage.setItem('emocje_points', state.points);
  localStorage.setItem('emocje_exercises', state.exercisesDone);
  localStorage.setItem('emocje_chat', JSON.stringify(state.chat.slice(-100)));
  renderProgress(); renderRecent(); renderJournal();
}
function addPoints(n){ state.points+=n; saveState(); }

function renderProgress(){
  document.getElementById('pointsLabel').textContent = state.points+' pkt';
  const pct = Math.min(100, state.points);
  document.getElementById('progressFill').style.width = pct+'%';
  document.getElementById('progressText').textContent = state.points<20 ? 'Zacznij od dzisiejszego check-inu' : state.points<60 ? 'Świetnie! Kontynuuj ćwiczenia i symulacje' : 'Jesteś wspaniałym odkrywcą emocji! 🌟';
  document.getElementById('statEntries').textContent = state.entries.length;
  document.getElementById('statExercises').textContent = state.exercisesDone;
  // streak: unique dates
  const dates = [...new Set(state.entries.map(e=>e.date))];
  document.getElementById('statStreak').textContent = dates.length;
}
function todayStr(){ return new Date().toISOString().slice(0,10); }
function todayLabel(){ return new Date().toLocaleDateString('pl-PL',{weekday:'long', day:'numeric', month:'long'}); }
document.getElementById('todayPill').textContent = todayLabel();

// Navigation
const TITLES = {
  home:['Cześć, tu Milo 👋','Poznaj, nazwij i wyraź to, co czujesz — w swoim tempie.'],
  checkin:['Codzienny check-in 💭','Zatrzymaj się i zauważ, co czujesz.'],
  wheel:['Koło emocji 🎡','Odkryj rodziny emocji i precyzyjne słowa.'],
  exercises:['Ćwiczenia 🧩','Trenuj rozpoznawanie, nazywanie i wyrażanie.'],
  simulations:['Symulacje 🎭','Przeżyj sytuacje i wybierz, jak chcesz zareagować.'],
  chat:['Rozmowa z Milo 💬','Milo pyta i słucha — nie decyduje za Ciebie.'],
  journal:['Dziennik emocji 📓','Twoje wpisy, Twoja historia.'],
  library:['Biblioteka emocji 📚','Słownik emocji z sygnałami i pytaniami.'],
};
function goTo(view){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+view).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active', b.dataset.view===view));
  const meta = TITLES[view] || [view, ''];
  document.getElementById('viewTitle').textContent = meta[0];
  document.getElementById('viewSubtitle').textContent = meta[1];
  closeSidebar();
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',()=>goTo(b.dataset.view)));
function openSidebar(){ document.getElementById('sidebar').classList.add('open'); const b=document.getElementById('sidebarBackdrop'); if(b) b.classList.add('show'); }
function closeSidebar(){ document.getElementById('sidebar').classList.remove('open'); const b=document.getElementById('sidebarBackdrop'); if(b) b.classList.remove('show'); }
document.getElementById('hamburger').addEventListener('click',()=>{
  const sb=document.getElementById('sidebar');
  if(sb.classList.contains('open')) closeSidebar(); else openSidebar();
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeSidebar(); });

// Check-in
function renderCheckin(){
  const grid = document.getElementById('checkinEmotions');
  grid.innerHTML = EMOTIONS.map(e=>`<button class="emotion-btn" data-id="${e.id}" onclick="selectEmotion('${e.id}')"><span class="emoji">${e.emoji}</span><strong>${e.name}</strong></button>`).join('');
  document.getElementById('bodyChips').innerHTML = BODY_SIGNALS.map(s=>`<button class="chip" onclick="toggleChip('body','${s}',this)">${s}</button>`).join('');
  document.getElementById('needChips').innerHTML = NEEDS.map(s=>`<button class="chip" onclick="toggleChip('need','${s}',this)">${s}</button>`).join('');
}
function selectEmotion(id){
  state.selectedEmotion=id;
  document.querySelectorAll('.emotion-btn').forEach(b=>b.classList.toggle('selected', b.dataset.id===id));
  updateIPreview();
}
function toggleChip(type,val,el){
  const set = type==='body'?state.selectedBody:state.selectedNeeds;
  if(set.has(val)){set.delete(val); el.classList.remove('selected');} else {set.add(val); el.classList.add('selected');}
}
document.getElementById('intensity').addEventListener('input', e=>document.getElementById('intensityVal').textContent=e.target.value);
['iFeel','iWhen','iBecause','iNeed','iAsk'].forEach(id=>document.getElementById(id).addEventListener('input', updateIPreview));
function updateIPreview(){
  const f=document.getElementById('iFeel').value, w=document.getElementById('iWhen').value, b=document.getElementById('iBecause').value, n=document.getElementById('iNeed').value, a=document.getElementById('iAsk').value;
  const emo = EMOTIONS.find(e=>e.id===state.selectedEmotion);
  const feel = f || (emo? emo.name.toLowerCase() : '...');
  document.getElementById('iPreview').textContent = `Czuję ${feel}${w?` gdy ${w}`:''}${b?`, bo ${b}`:''}${n?`. Potrzebuję ${n}`:''}${a?`. Proszę o ${a}`:''}.`;
}
function saveCheckin(){
  if(!state.selectedEmotion){ alert('Wybierz najpierw emocję główną 🙂'); return; }
  const emo = EMOTIONS.find(e=>e.id===state.selectedEmotion);
  const entry = {
    date: todayStr(), time: new Date().toLocaleTimeString('pl-PL',{hour:'2-digit',minute:'2-digit'}),
    emotion: emo.name, emoji: emo.emoji, intensity: document.getElementById('intensity').value,
    body: [...state.selectedBody], what: document.getElementById('checkinWhat').value,
    needs: [...state.selectedNeeds], needText: document.getElementById('checkinNeedText').value,
    iStatement: document.getElementById('iPreview').textContent
  };
  state.entries.unshift(entry);
  addPoints(10);
  document.getElementById('checkinMsg').textContent = `✓ Zapisano! ${emo.emoji} ${emo.name} · siła ${entry.intensity}/10 · +10 pkt. Milo: „Dziękuję, że to nazwałeś/nazwałaś. Co chcesz z tym zrobić?”`;
  resetCheckin(false);
  setTimeout(()=>goTo('journal'), 1200);
}
function resetCheckin(clearMsg=true){
  state.selectedEmotion=null; state.selectedBody.clear(); state.selectedNeeds.clear();
  document.querySelectorAll('.emotion-btn,.chip').forEach(b=>b.classList.remove('selected'));
  ['checkinWhat','checkinNeedText','iFeel','iWhen','iBecause','iNeed','iAsk'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('intensity').value=5; document.getElementById('intensityVal').textContent=5;
  updateIPreview(); if(clearMsg) document.getElementById('checkinMsg').textContent='';
}
function renderRecent(){
  const el=document.getElementById('homeRecent');
  if(!state.entries.length){ el.innerHTML='<p class="muted">Brak check-inów. Twój pierwszy wpis pojawi się tutaj.</p>'; return; }
  el.innerHTML = state.entries.slice(0,3).map(e=>`<div class="recent-item"><div><strong>${e.emoji} ${e.emotion}</strong> · siła ${e.intensity}/10<br><span class="muted">${e.what||'—'}</span></div><span class="muted">${e.date} ${e.time}</span></div>`).join('');
}
function renderJournal(){
  const el=document.getElementById('journalList');
  if(!state.entries.length){ el.innerHTML='<p class="muted">Jeszcze pusto. Zrób pierwszy check-in, a pojawi się tutaj.</p>'; return; }
  el.innerHTML = state.entries.map((e,i)=>`<div class="journal-item"><div class="meta"><span class="pill">${e.emoji} ${e.emotion}</span><span>siła ${e.intensity}/10</span><span>${e.date} · ${e.time}</span>${e.body.map(b=>`<span>📍 ${b}</span>`).join('')}</div><p><strong>Co się stało:</strong> ${e.what||'—'}</p>${e.needs.length?`<p><strong>Potrzeby:</strong> ${e.needs.join(', ')}</p>`:''}${e.needText?`<p>${e.needText}</p>`:''}<p class="preview-box">${e.iStatement}</p><button class="btn btn-ghost btn-small" onclick="deleteEntry(${i})">Usuń wpis</button></div>`).join('');
}
function deleteEntry(i){ state.entries.splice(i,1); saveState(); }
function exportJournal(){
  const blob=new Blob([JSON.stringify(state.entries,null,2)],{type:'application/json'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='dziennik-emocji.json'; a.click();
}

// Wheel
function renderWheel(){
  const wrap=document.getElementById('wheelSvg');
  const cx=160, cy=160, rOuter=150, rInner=55;
  let paths='';
  EMOTIONS.forEach((e,i)=>{
    const a0=(i/EMOTIONS.length)*Math.PI*2 - Math.PI/2;
    const a1=((i+1)/EMOTIONS.length)*Math.PI*2 - Math.PI/2;
    const x0=cx+rInner*Math.cos(a0), y0=cy+rInner*Math.sin(a0);
    const x1=cx+rOuter*Math.cos(a0), y1=cy+rOuter*Math.sin(a0);
    const x2=cx+rOuter*Math.cos(a1), y2=cy+rOuter*Math.sin(a1);
    const x3=cx+rInner*Math.cos(a1), y3=cy+rInner*Math.sin(a1);
    const mid=(a0+a1)/2, tx=cx+(rInner+rOuter)/2*Math.cos(mid), ty=cy+(rInner+rOuter)/2*Math.sin(mid);
    paths+=`<path class="wheel-seg" d="M${x0},${y0} L${x1},${y1} A${rOuter},${rOuter} 0 0 1 ${x2},${y2} L${x3},${y3} A${rInner},${rInner} 0 0 0 ${x0},${y0} Z" fill="${e.color}" onclick="showWheelDetail('${e.id}')"/><text x="${tx}" y="${ty}" text-anchor="middle" dominant-baseline="middle" font-size="20">${e.emoji}</text><text x="${tx}" y="${ty+22}" text-anchor="middle" font-size="11" font-weight="700" fill="#2B2118">${e.name.split(' ')[0]}</text>`;
  });
  wrap.innerHTML=`<svg viewBox="0 0 320 320" width="320" height="320">${paths}<circle cx="160" cy="160" r="52" fill="#fff" stroke="#F0E2D6"/><text x="160" y="152" text-anchor="middle" font-weight="800" font-size="14">Jak się</text><text x="160" y="170" text-anchor="middle" font-weight="800" font-size="14">czujesz?</text></svg>`;
}
function showWheelDetail(id){
  const e=EMOTIONS.find(x=>x.id===id);
  document.getElementById('wheelDetail').innerHTML=`
    <span class="badge">${e.emoji} ${e.name}</span>
    <h3>${e.name} — co to znaczy?</h3><p>${e.desc}</p>
    <p><strong>Sygnały w ciele:</strong> ${e.body}</p>
    <p><strong>Precyzyjne słowa:</strong> ${e.words.join(', ')}</p>
    <h4>Pytania do refleksji</h4><ul>${e.questions.map(q=>`<li>${q}</li>`).join('')}</ul>
    <button class="btn btn-primary" onclick="goTo('checkin'); selectEmotion('${e.id}')">Użyj w check-inie →</button>
    <button class="btn btn-ghost" onclick="quickPrompt('Czuję ${e.name.toLowerCase()}')">Porozmawiaj o tym z Milo</button>`;
}

// Exercises
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active')); t.classList.add('active');
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('tab-'+t.dataset.tab).classList.add('active');
}));
function renderRecognize(){
  const q=RECOGNIZE_Q[state.recognizeIdx % RECOGNIZE_Q.length];
  document.getElementById('recognizeCard').innerHTML=`
    <h2>🔍 Rozpoznaj emocję <span class="muted">(${state.recognizeIdx+1}/${RECOGNIZE_Q.length})</span></h2>
    <p class="muted">Przeczytaj sytuację i wybierz emocję, która najbardziej pasuje do sygnałów w ciele.</p>
    <div class="scenario-box"><strong>Sytuacja:</strong> ${q.text}</div>
    <div class="exercise-options">${q.options.map((o,i)=>`<button class="choice-btn" onclick="answerRecognize(${i})">${o}</button>`).join('')}</div>
    <div id="recognizeFeedback"></div>`;
}
function answerRecognize(i){
  const q=RECOGNIZE_Q[state.recognizeIdx % RECOGNIZE_Q.length];
  const ok=i===q.answer;
  document.getElementById('recognizeFeedback').innerHTML=`<div class="feedback ${ok?'good':'try'}">${ok?'✓ <strong>Dobrze!</strong> ':'💡 <strong>Sprawdźmy razem:</strong> '}${q.explain}<br><br><button class="btn btn-primary" onclick="nextRecognize()">Następna sytuacja →</button></div>`;
  if(ok){ state.exercisesDone++; addPoints(5); }
}
function nextRecognize(){ state.recognizeIdx++; renderRecognize(); }

function renderName(){
  const q=NAME_Q[state.nameIdx % NAME_Q.length];
  document.getElementById('nameCard').innerHTML=`
    <h2>🏷️ Nazwij precyzyjnie <span class="muted">(${state.nameIdx+1}/${NAME_Q.length})</span></h2>
    <p class="muted">Zamiast ogólnego „źle/dobrze” wybierz słowo, które najlepiej oddaje to, co czujesz.</p>
    <div class="scenario-box"><strong>Opis:</strong> ${q.text}</div>
    <div class="exercise-options">${q.options.map((o,i)=>`<button class="choice-btn" onclick="answerName(${i})">${o}</button>`).join('')}</div>
    <div id="nameFeedback"></div>`;
}
function answerName(i){
  const q=NAME_Q[state.nameIdx % NAME_Q.length];
  const ok=i===q.answer;
  document.getElementById('nameFeedback').innerHTML=`<div class="feedback ${ok?'good':'try'}">${ok?'✓ <strong>Precyzyjnie!</strong> ':'💡 <strong>Rozważmy:</strong> '}${q.explain}<br><br><button class="btn btn-primary" onclick="nextName()">Następne zadanie →</button></div>`;
  if(ok){ state.exercisesDone++; addPoints(5); }
}
function nextName(){ state.nameIdx++; renderName(); }

function newExpressScenario(){
  document.getElementById('expressScenario').textContent = EXPRESS_SCENARIOS[Math.floor(Math.random()*EXPRESS_SCENARIOS.length)];
}
['exFeel','exWhen','exBecause','exNeed','exAsk'].forEach(id=>document.getElementById(id).addEventListener('input',()=>{
  const f=document.getElementById('exFeel').value,w=document.getElementById('exWhen').value,b=document.getElementById('exBecause').value,n=document.getElementById('exNeed').value,a=document.getElementById('exAsk').value;
  document.getElementById('exPreview').textContent = `Czuję ${f||'...'}${w?` gdy ${w}`:''}${b?`, bo ${b}`:''}${n?`. Potrzebuję ${n}`:''}${a?`. Proszę o ${a}`:''}.`;
}));
function completeExpress(){
  const f=document.getElementById('exFeel').value.trim();
  if(!f){ alert('Uzupełnij przynajmniej „Czuję ...” 🙂'); return; }
  state.exercisesDone++; addPoints(10);
  document.getElementById('expressMsg').textContent='✓ Zapisano! +10 pkt. Pamiętaj: to Twoje słowa, Twoja decyzja, kiedy i czy je wypowiesz.';
}

// Simulations
function renderSims(){
  document.getElementById('simGrid').innerHTML = SIMULATIONS.map((s,i)=>`<div class="sim-card" onclick="startSim(${i})"><h4>${s.icon} ${s.title}${s.advanced?' <span class="sim-badge">rozbudowana</span>':''}</h4><p>${s.short}</p><span class="muted">Wejdź w symulację →</span></div>`).join('');
}
function startSim(i){
  state.simIndex=i; state.simStep=0; state.simLog=[];
  document.getElementById('simPlayer').style.display='block';
  document.getElementById('simGrid').parentElement.style.display='none';
  renderSimStep();
}
function closeSim(){ document.getElementById('simPlayer').style.display='none'; document.getElementById('simGrid').parentElement.style.display='block'; }
function renderSimStep(){
  const sim=SIMULATIONS[state.simIndex];
  const step=sim.steps[state.simStep];
  document.getElementById('simStepLabel').textContent=`Krok ${state.simStep+1} z ${sim.steps.length}`;
  document.getElementById('simStory').innerHTML=`<strong>${sim.icon} ${sim.title}</strong><br>${sim.story}`;
  document.getElementById('simQuestion').innerHTML=`<strong>Milo pyta:</strong> ${step.q}`;
  document.getElementById('simChoices').innerHTML=step.choices.map((c,i)=>`<button class="choice-btn" onclick="chooseSim(${i})">${c.t}</button>`).join('');
  document.getElementById('simReflect').style.display='none';
}
function chooseSim(i){
  const sim=SIMULATIONS[state.simIndex];
  const step=sim.steps[state.simStep];
  const choice=step.choices[i];
  state.simLog.push({step:state.simStep, choice:choice.t, milo:choice.next});
  document.getElementById('simQuestion').innerHTML=`<strong>Milo:</strong> ${choice.next}`;
  document.getElementById('simChoices').innerHTML='';
  if(state.simStep < sim.steps.length-1){
    document.getElementById('simChoices').innerHTML=`<button class="btn btn-primary" onclick="state.simStep++; renderSimStep()">Dalej →</button>`;
  } else {
    document.getElementById('simReflect').style.display='block';
  }
}
function finishSim(){
  state.exercisesDone++; addPoints(15);
  const sim=SIMULATIONS[state.simIndex];
  const reflect=document.getElementById('simReflectText').value;
  state.entries.unshift({date:todayStr(), time:new Date().toLocaleTimeString('pl-PL',{hour:'2-digit',minute:'2-digit'}), emotion:'Symulacja: '+sim.title, emoji:sim.icon, intensity:'—', body:[], what:reflect||state.simLog.map(l=>l.choice).join(' · '), needs:[], needText:'', iStatement:'Symulacja ukończona. Refleksja: '+(reflect||'—')});
  saveState();
  alert('✓ Symulacja ukończona! +15 pkt. Pamiętaj: w prawdziwej sytuacji decyzja zawsze należy do Ciebie.');
  closeSim(); document.getElementById('simReflectText').value='';
}

// Library
function renderLibrary(){
  const q=(document.getElementById('libSearch').value||'').toLowerCase();
  renderLibraryWheel(q);
  const list=EMOTIONS.filter(e=>e.name.toLowerCase().includes(q)||e.words.join(' ').includes(q));
  document.getElementById('libGrid').innerHTML=list.map(e=>`<div class="lib-card" onclick="this.classList.toggle('open')"><h4>${e.emoji} ${e.name}</h4><p class="muted">${e.words.slice(0,4).join(', ')}…</p><div class="body"><p>${e.desc}</p><p><strong>Ciało:</strong> ${e.body}</p><p><strong>Słowa:</strong> ${e.words.join(', ')}</p><ul>${e.questions.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>`).join('')||'<p class="muted">Brak wyników.</p>';
}

// Breath
let breathTimer=null;
function toggleBreath(){
  const c=document.getElementById('breathCircle'), b=document.getElementById('breathBtn');
  if(breathTimer){ clearInterval(breathTimer); breathTimer=null; c.classList.remove('in'); c.textContent='oddychaj'; b.textContent='Rozpocznij oddech'; return; }
  b.textContent='Zatrzymaj'; let phase=true;
  const tick=()=>{ phase=!phase; c.classList.toggle('in',phase); c.textContent=phase?'wdech…':'wydech…'; };
  tick(); breathTimer=setInterval(tick,4000);
}

// Chat Milo
function addMsg(who,text){
  state.chat.push({who,text,ts:Date.now()});
  renderChat(); saveState();
}
function renderChat(){
  const el=document.getElementById('chatMessages');
  if(!state.chat.length){
    el.innerHTML=`<div class="msg milo"><span class="who">Milo</span>Cześć! Jestem Milo, towarzysz z Krainy Odczuwania. Nie jestem terapeutą — jestem tu, aby słuchać i pytać. Nie przejmę Twoich słów i nie zdecyduję za Ciebie. Jak się dziś czujesz? Możesz napisać np. „czuję smutek” albo „nie wiem, co czuję”.</div>`;
    return;
  }
  el.innerHTML=state.chat.map(m=>`<div class="msg ${m.who}"><span class="who">${m.who==='milo'?'Milo':'Ty'}</span>${escapeHtml(m.text)}</div>`).join('');
  el.scrollTop=el.scrollHeight;
}
function escapeHtml(s){ return s.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function clearChat(){ state.chat=[]; saveState(); renderChat(); }
function quickPrompt(text){ document.getElementById('chatInput').value=text; document.getElementById('chatForm').requestSubmit(); }

const CRISIS_WORDS=['samobój','samookalecz','krzywdz','nie chcę żyć','nie chce mi się żyć','zniknąć na zawsze','zranić się'];
function miloReply(userText){
  const t=userText.toLowerCase();
  if(CRISIS_WORDS.some(w=>t.includes(w))){
    return 'Słyszę, że jest Ci teraz bardzo trudno i że pojawiają się myśli o krzywdzeniu siebie. Dziękuję, że mi o tym mówisz. Nie jestem w stanie pomóc Ci w kryzysie — proszę, skontaktuj się teraz z zaufaną osobą lub zadzwoń: 116 111 (dla dzieci i młodzieży), 116 123 (kryzysowy telefon zaufania), 112 (numer alarmowy). Jeśli możesz, zostań z kimś, komu ufasz. Czy jest ktoś, do kogo możesz teraz zadzwonić?';
  }
  if(t.includes('nie chcę teraz')||t.includes('nie chce mi się mówić')||t.includes('przestań pytać')){
    return 'Rozumiem i szanuję to. Nie musisz teraz nic mówić. Możesz wrócić, kiedy będziesz chciał/chciała. Czy chcesz, żebym zaproponował/a cichą minutę oddechu albo ćwiczenie bez rozmowy?';
  }
  // emotion detection
  for(const e of EMOTIONS){
    if(e.words.some(w=>t.includes(w)) || t.includes(e.name.toLowerCase())){
      const qs=[
        `Słyszę, że czujesz ${e.name.toLowerCase()}. Co się stało, że pojawiła się ta emocja?`,
        `Dziękuję, że to nazywasz. Gdzie w ciele czujesz ${e.name.toLowerCase()}?`,
        `„${e.name}” — co ta emocja próbuje Ci powiedzieć o Twoich potrzebach?`,
        `Jak silna jest ta ${e.name.toLowerCase()} teraz — od 1 do 10?`,
      ];
      return qs[Math.floor(Math.random()*qs.length)] + ' Nie zdecyduję za Ciebie, co dalej — ale mogę zapytać: czego potrzebujesz w tej chwili?';
    }
  }
  if(t.includes('nie wiem')||t.includes('nie umiem')||t.includes('nie rozumiem')){
    return '„Nie wiem, co czuję” to bardzo częste i w porządku. Spróbujmy razem od ciała: co zauważasz — oddech, ramiona, szczęka, żołądek? Możesz też zajrzeć do Koła emocji i zobaczyć, które słowo brzmi najbliżej. Co tam jest?';
  }
  if(t.includes('ćwiczenie')||t.includes('daj mi')||t.includes('zadanie')){
    const opts=['Spróbuj check-inu: wybierz emocję, siłę i miejsce w ciele.','Otwórz Koło emocji i kliknij segment, który Cię przyciąga.','Zrób ćwiczenie „Rozpoznaj” — przeczytaj sytuację i wybierz emocję.','Ułóż komunikat „Ja”: Czuję… gdy… bo… Potrzebuję… Proszę o…'];
    return 'Oto propozycja: '+opts[Math.floor(Math.random()*opts.length)]+' Chcesz, żebym zapytał/a o coś konkretnego przed rozpoczęciem?';
  }
  if(t.includes('powinieneś')||t.includes('powinnaś')||t.includes('co mam zrobić')||t.includes('co powinienem')||t.includes('co powinnam')||t.includes('zdecyduj')){
    return 'Nie mogę zdecydować za Ciebie — to Twoje życie i Twoje wybory. Mogę tylko zapytać: jakie masz opcje? Co czujesz wobec każdej z nich? Czego potrzebujesz, aby wybrać?';
  }
  if(t.includes('dzięk')||t.includes('dziekuje')){
    return 'Cieszę się, że rozmowa pomaga. Pamiętaj, że to Twoje słowa i Twoje wnioski mają znaczenie. Czy chcesz zapisać coś z tej rozmowy w dzienniku?';
  }
  if(t.includes('cześć')||t.includes('hej')||t.includes('witaj')){
    return 'Cześć! Miło Cię widzieć. Jak się dziś czujesz — możesz nazwać emocję albo powiedzieć, że nie wiesz. Oba warianty są okej.';
  }
  if(t.includes('oddech')||t.includes('oddych')){
    return 'Możemy odetchnąć razem: wdech na 4, wydech na 4. Wróć na stronę główną i użyj Minuty oddechu, albo po prostu spróbuj teraz. Co zauważasz po jednym oddechu?';
  }
  // reflective generic
  const generic=[
    `Słyszę: „${userText}”. Co czujesz, gdy o tym mówisz?`,
    'Dziękuję, że się tym dzielisz. Co w tej sytuacji jest dla Ciebie najważniejsze?',
    'Co ta sytuacja mówi o tym, czego potrzebujesz?',
    'Jak nazwałbyś/nazwałabyś to, co czujesz, jednym słowem?',
    'Gdyby ta emocja mogła mówić, co by powiedziała?',
  ];
  return generic[Math.floor(Math.random()*generic.length)] + ' Pytam, nie oceniam — odpowiedź należy do Ciebie.';
}
document.getElementById('chatForm').addEventListener('submit', e=>{
  e.preventDefault();
  const inp=document.getElementById('chatInput');
  const text=inp.value.trim(); if(!text) return;
  addMsg('user', text); inp.value='';
  setTimeout(()=>{ addMsg('milo', miloReply(text)); }, 500);
});

// Init
renderCheckin(); renderWheel(); renderRecognize(); renderName(); newExpressScenario(); renderSims(); renderLibrary(); renderChat(); renderProgress(); renderRecent(); renderJournal(); updateIPreview();

/* ============================================================
   v2: DŹWIĘK + PEŁNY MILO (model językowy)
   ============================================================ */

// ---------- Ustawienia ----------
const AI_SETTINGS_KEY = 'emocje_ai_settings';
let aiSettings = JSON.parse(localStorage.getItem(AI_SETTINGS_KEY) || 'null') || {
  enabled:false, provider:'openai', baseUrl:'https://api.openai.com/v1', model:'gpt-4o-mini', key:'', temp:0.7,
  soundEnabled:true, voiceEnabled:true, ambient:'off', volume:70
};
function saveAISettings(){
  localStorage.setItem(AI_SETTINGS_KEY, JSON.stringify(aiSettings));
  updateAIStatus();
}
function updateAIStatus(){
  const t=document.getElementById('aiStatusTitle'), x=document.getElementById('aiStatusText'), c=document.getElementById('chatModeLabel');
  if(aiSettings.enabled){
    t.textContent='🌙 Pełny Milo';
    x.textContent=`Model: ${aiSettings.model} · ${aiSettings.baseUrl}`;
    if(c) c.textContent=`Pełny Milo (${aiSettings.model}) · pyta, nie ocenia · nie decyduje za Ciebie`;
  } else {
    t.textContent='🌙 Milo — tryb lokalny';
    x.textContent='Milo działa lokalnie, bez internetu. Możesz dać mu pełną rozmowność w ⚙️ Ustawieniach.';
    if(c) c.textContent='Online · tryb lokalny · pyta, nie ocenia · nie decyduje za Ciebie';
  }
  document.getElementById('muteBtn').textContent = aiSettings.soundEnabled ? '🔊' : '🔇';
  const amb=document.getElementById('ambientSelect'); if(amb) amb.value=aiSettings.ambient;
  const vol=document.getElementById('volumeRange'); if(vol) vol.value=aiSettings.volume;
}

// ---------- Silnik dźwięku (Web Audio API) ----------
const SoundEngine = {
  ctx:null, master:null, ambientNodes:null, ambientType:'off',
  ensure(){
    try{
    if(!this.ctx){
      const AC = window.AudioContext || window.webkitAudioContext;
      if(!AC) return false;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = (aiSettings.volume/100)*0.5;
      this.master.connect(this.ctx.destination);
    }
    if(this.ctx.state==='suspended') this.ctx.resume();
    return true;
    }catch(e){ return false; }
  },
  setVolume(v){
    aiSettings.volume = parseInt(v);
    if(this.master) this.master.gain.value = (aiSettings.volume/100)*0.5;
    saveAISettings();
  },
  tone(freq, dur=0.15, type='sine', vol=0.3, when=0, slideTo=null){
    // Dźwięk NIGDY nie może zablokować interfejsu: każdy błąd Web Audio jest wyciszany.
    try{
      if(!aiSettings.soundEnabled || !this.ensure()) return;
      const t0=this.ctx.currentTime+when;
      const o=this.ctx.createOscillator(), g=this.ctx.createGain();
      o.type=type; o.frequency.setValueAtTime(freq,t0);
      if(slideTo && o.frequency.exponentialRampToValueAtTime) o.frequency.exponentialRampToValueAtTime(slideTo, t0+dur);
      g.gain.setValueAtTime(0.0001,t0);
      if(g.gain.exponentialRampToValueAtTime){
        g.gain.exponentialRampToValueAtTime(vol, t0+0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0+dur);
      } else { g.gain.value = vol; }
      o.connect(g); g.connect(this.master);
      o.start(t0); o.stop(t0+dur+0.05);
    }catch(e){ /* cicho: brak wsparcia Web Audio nie psuje aplikacji */ }
  },
  click(){ this.tone(600,0.07,'sine',0.15); },
  pop(){ this.tone(800,0.08,'sine',0.2,0,1200); },
  success(){ this.tone(523,0.15,'sine',0.25); this.tone(659,0.15,'sine',0.25,0.12); this.tone(784,0.25,'sine',0.25,0.24); },
  soft(){ this.tone(300,0.2,'sine',0.15,0,220); },
  breathIn(){ this.tone(392,3.8,'sine',0.12,0,523); },
  breathOut(){ this.tone(523,3.8,'sine',0.12,0,392); },
  noiseBuffer(){
    const len=this.ctx.sampleRate*2, buf=this.ctx.createBuffer(1,len,this.ctx.sampleRate), d=buf.getChannelData(0);
    for(let i=0;i<len;i++) d[i]=Math.random()*2-1;
    return buf;
  },
  startAmbient(type){
    this.stopAmbient();
    this.ambientType=type;
    if(type==='off' || !this.ensure()) return;
    const ctx=this.ctx;
    const src=ctx.createBufferSource(); src.buffer=this.noiseBuffer(); src.loop=true;
    const filter=ctx.createBiquadFilter(); const gain=ctx.createGain();
    if(type==='rain'){ filter.type='lowpass'; filter.frequency.value=1200; gain.gain.value=0.12; }
    else if(type==='ocean'){ filter.type='lowpass'; filter.frequency.value=500; gain.gain.value=0.10;
      const lfo=ctx.createOscillator(), lfoGain=ctx.createGain();
      lfo.frequency.value=0.15; lfoGain.gain.value=0.05; lfo.connect(lfoGain); lfoGain.connect(gain.gain); lfo.start(); this._lfo=lfo;
    }
    else if(type==='fire'){ filter.type='lowpass'; filter.frequency.value=400; gain.gain.value=0.14; }
    else if(type==='forest'){ filter.type='bandpass'; filter.frequency.value=800; gain.gain.value=0.06; }
    src.connect(filter); filter.connect(gain); gain.connect(this.master); src.start();
    this._ambient={src,filter,gain};
    if(type==='forest'){
      this._birdTimer=setInterval(()=>{ if(Math.random()>0.4){ this.tone(1200+Math.random()*800,0.12,'sine',0.05,0,1800); } }, 3500);
    }
    if(type==='fire'){
      this._crackleTimer=setInterval(()=>{ if(Math.random()>0.5){ this.tone(150+Math.random()*200,0.03,'square',0.03); } }, 400);
    }
  },
  stopAmbient(){
    if(this._ambient){ try{this._ambient.src.stop();}catch(e){} this._ambient=null; }
    if(this._lfo){ try{this._lfo.stop();}catch(e){} this._lfo=null; }
    if(this._birdTimer){ clearInterval(this._birdTimer); this._birdTimer=null; }
    if(this._crackleTimer){ clearInterval(this._crackleTimer); this._crackleTimer=null; }
    this.ambientType='off';
  }
};
function toggleMute(){
  aiSettings.soundEnabled=!aiSettings.soundEnabled;
  document.getElementById('setSoundEnabled').checked=aiSettings.soundEnabled;
  saveAISettings(); updateAIStatus();
  if(aiSettings.soundEnabled) SoundEngine.pop();
}
function setVolume(v){ SoundEngine.setVolume(v); }
function setAmbient(v){ aiSettings.ambient=v; saveAISettings(); SoundEngine.startAmbient(v); }

// ---------- Głos Milo (TTS) ----------
const TTS = {
  voices:[],
  loadVoices(){
    if(!('speechSynthesis' in window)) return;
    const all=speechSynthesis.getVoices();
    this.voices=all;
    const sel=document.getElementById('voiceSelect');
    if(!sel) return;
    const pl=all.filter(v=>v.lang && v.lang.toLowerCase().startsWith('pl'));
    const list = pl.length?pl:all;
    sel.innerHTML='<option value="">Automatyczny (polski)</option>'+list.map((v,i)=>`<option value="${v.name}">${v.name} (${v.lang})</option>`).join('');
  },
  speak(text){
    if(!aiSettings.voiceEnabled) return;
    const toggle=document.getElementById('voiceToggle');
    if(toggle && !toggle.checked) return;
    if(!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const clean=text.replace(/[„"“”]/g,'').replace(/[*_#>`]/g,'').slice(0,600);
    const u=new SpeechSynthesisUtterance(clean);
    u.lang='pl-PL';
    const sel=document.getElementById('voiceSelect');
    const chosen=sel && sel.value ? this.voices.find(v=>v.name===sel.value) : (this.voices.find(v=>v.lang && v.lang.toLowerCase().startsWith('pl')) || this.voices[0]);
    if(chosen) u.voice=chosen;
    u.rate=parseFloat(document.getElementById('voiceRate')?.value||0.95);
    u.pitch=1.05; u.volume=1;
    speechSynthesis.speak(u);
  },
  stop(){ if('speechSynthesis' in window) speechSynthesis.cancel(); }
};
if('speechSynthesis' in window){ TTS.loadVoices(); speechSynthesis.onvoiceschanged=()=>TTS.loadVoices(); }
function stopSpeaking(){ TTS.stop(); }
function testVoice(){ TTS.speak('Cześć! Jestem Milo, Twój towarzysz emocji. Nie oceniam i nie decyduję za Ciebie. Tylko pytam i słucham. Jak się dziś czujesz?'); SoundEngine.pop(); }
function playMiloIntro(){ testVoice(); }
function speakText(t){ TTS.speak(t); }

// ---------- Pełny Milo (model językowy) ----------
const MILO_SYSTEM_PROMPT = `Jesteś Milo — wirtualnym towarzyszem emocji z Krainy Odczuwania. Twoja tożsamość jest stała:
- Nie jesteś terapeutą, lekarzem ani nauczycielem. Jesteś towarzyszem, który słucha i pyta.
- Nigdy nie przejmujesz wypowiedzi użytkownika i nie piszesz za niego. Nie kończysz jego zdań.
- Nigdy nie decydujesz za użytkownika. Nigdy nie mówisz "powinieneś", "powinnaś", "musisz", "powinieneś zrobić X". Zamiast tego pytasz o opcje i uczucia.
- Nigdy nie stawiasz diagnoz, nie oceniasz, nie etykietujesz człowieka.
- Odpowiadasz po polsku, ciepło i krótko (2-4 zdania), zadajesz jedno pytanie otwarte na raz.
- Pomagasz rozpoznawać sygnały w ciele, nazywać emocje precyzyjnie i wyrażać je komunikatem "Ja" (Czuję... gdy... bo... Potrzebuję... Proszę o...).
- Tworzysz sytuacje i ćwiczenia, gdy użytkownik o to prosi.
- Jeśli użytkownik pisze o myślach samobójczych, samookaleczeniu lub krzywdzeniu siebie: odpowiedz ze współczuciem, zachęć do kontaktu z zaufaną osobą i podaj numery: 116 111 (dzieci i młodzież), 116 123 (kryzysowy telefon zaufania), 112 (alarmowy). Nie udzielaj terapii.
- Szanujesz "nie chcę teraz mówić" — nie naciskasz.
- Nie używasz formatowania markdown poza prostym tekstem.`;

async function callAI(messages, opts={}){
  if(!aiSettings.enabled) throw new Error('Pełny Milo nie jest włączony. Włącz go w ⚙️ Ustawieniach.');
  const base=(aiSettings.baseUrl||'').replace(/\/$/,'');
  const url=base+'/chat/completions';
  const headers={'Content-Type':'application/json'};
  if(aiSettings.key) headers['Authorization']='Bearer '+aiSettings.key;
  const body={model:aiSettings.model, messages, temperature: aiSettings.temp ?? 0.7, ...opts};
  const res=await fetch(url,{method:'POST',headers,body:JSON.stringify(body)});
  if(!res.ok){
    const txt=await res.text().catch(()=> '');
    throw new Error(`Milo nie mógł odpowiedzieć (błąd ${res.status}): ${txt.slice(0,300)}`);
  }
  const data=await res.json();
  return data.choices?.[0]?.message?.content || '';
}
async function miloReplyAI(userText){
  const history=state.chat.slice(-12).map(m=>({role: m.who==='milo'?'assistant':'user', content:m.text}));
  const messages=[{role:'system',content:MILO_SYSTEM_PROMPT}, ...history, {role:'user',content:userText}];
  return await callAI(messages);
}
async function testAI(){
  const msg=document.getElementById('settingsMsg');
  msg.textContent='⏳ Testuję połączenie...';
  try{
    const r=await callAI([{role:'system',content:'Odpowiedz jednym krótkim zdaniem po polsku.'},{role:'user',content:'Cześć, czy działasz?'}]);
    msg.textContent='✓ Połączenie działa! Milo odpowiedział: '+r.slice(0,200);
    SoundEngine.success();
  }catch(e){ msg.textContent='✗ Błąd: '+e.message; SoundEngine.soft(); }
}

// ---------- Ustawienia UI ----------
function openSettings(){
  document.getElementById('settingsModal').style.display='grid';
  document.getElementById('aiEnabled').checked=aiSettings.enabled;
  document.getElementById('aiProvider').value=aiSettings.provider;
  document.getElementById('aiBaseUrl').value=aiSettings.baseUrl;
  document.getElementById('aiModel').value=aiSettings.model;
  document.getElementById('aiKey').value=aiSettings.key;
  document.getElementById('aiTemp').value=aiSettings.temp;
  document.getElementById('tempVal').textContent=aiSettings.temp;
  document.getElementById('setSoundEnabled').checked=aiSettings.soundEnabled;
  document.getElementById('setVoiceEnabled').checked=aiSettings.voiceEnabled;
  document.getElementById('setAmbient').value=aiSettings.ambient;
  document.getElementById('setVolume').value=aiSettings.volume;
  SoundEngine.click();
}
function closeSettings(){ document.getElementById('settingsModal').style.display='none'; SoundEngine.click(); }
function applyProviderPreset(){
  const p=document.getElementById('aiProvider').value;
  const base=document.getElementById('aiBaseUrl'), model=document.getElementById('aiModel');
  if(p==='openai'){ base.value='https://api.openai.com/v1'; model.value='gpt-4o-mini'; }
  if(p==='openrouter'){ base.value='https://openrouter.ai/api/v1'; model.value='meta-llama/llama-3.1-8b-instruct:free'; }
  if(p==='ollama'){ base.value='http://localhost:11434/v1'; model.value='llama3.1'; }
}
function saveSettings(){
  aiSettings.enabled=document.getElementById('aiEnabled').checked;
  aiSettings.provider=document.getElementById('aiProvider').value;
  aiSettings.baseUrl=document.getElementById('aiBaseUrl').value.trim();
  aiSettings.model=document.getElementById('aiModel').value.trim();
  aiSettings.key=document.getElementById('aiKey').value.trim();
  aiSettings.temp=parseFloat(document.getElementById('aiTemp').value);
  aiSettings.soundEnabled=document.getElementById('setSoundEnabled').checked;
  aiSettings.voiceEnabled=document.getElementById('setVoiceEnabled').checked;
  aiSettings.ambient=document.getElementById('setAmbient').value;
  aiSettings.volume=parseInt(document.getElementById('setVolume').value);
  saveAISettings(); SoundEngine.startAmbient(aiSettings.ambient); updateAIStatus();
  document.getElementById('settingsMsg').textContent='✓ Zapisano! '+(aiSettings.enabled?'Pełny Milo włączony ('+aiSettings.model+')':'Milo działa lokalnie.');
  SoundEngine.success();
}

// ---------- Generowanie z Milo ----------
async function generateExpressWithAI(){
  if(!aiSettings.enabled){ alert('Włącz pełnego Milo w ⚙️ Ustawieniach, żeby tworzył nowe sytuacje.'); openSettings(); return; }
  const btn=event.target; btn.textContent='⏳ Milo wymyśla…';
  try{
    const r=await callAI([{role:'system',content:'Jesteś Milo. Wymyśl jedną krótką, codzienną sytuację społeczną, w której trudno wyrazić emocję. Odpowiedz TYLKO treścią sytuacji, bez cudzysłowu, po polsku, max 20 słów.'},{role:'user',content:'Wymyśl sytuację do ćwiczenia komunikatu Ja.'}]);
    document.getElementById('expressScenario').textContent=r.trim();
    SoundEngine.success();
  }catch(e){ alert('Milo nie mógł teraz odpowiedzieć: '+e.message); }
  btn.textContent='✨ Poproś Milo o nową';
}
async function generateSimWithAI(){
  if(!aiSettings.enabled){ alert('Włącz pełnego Milo w ⚙️ Ustawieniach.'); openSettings(); return; }
  const btn=event.target; btn.textContent='⏳ Milo wymyśla sytuację…';
  try{
    const prompt=`Wymyśl nową symulację emocji w formacie JSON: {"icon":"🎭","title":"...","short":"...","story":"...","steps":[{"q":"...","choices":[{"t":"...","next":"..."},{"t":"...","next":"..."},{"t":"...","next":"..."}]},{"q":"...","choices":[...]},{"q":"...","choices":[...]}]}. Temat: codzienna trudna sytuacja społeczna. Odpowiedz TYLKO JSON, bez markdown.`;
    const r=await callAI([{role:'system',content:'Odpowiadasz wyłącznie poprawnym JSON.'},{role:'user',content:prompt}]);
    const clean=r.replace(/```json|```/g,'').trim();
    const sim=JSON.parse(clean);
    SIMULATIONS.push(sim); renderSims();
    alert('✓ Nowa symulacja dodana: '+sim.title);
    SoundEngine.success();
  }catch(e){ alert('Nie udało się wygenerować symulacji: '+e.message); }
  btn.textContent='✨ Poproś Milo o nową sytuację';
}
async function summarizeWithAI(){
  const box=document.getElementById('aiSummary');
  if(!state.entries.length){ alert('Najpierw zrób check-in, żeby Milo miał co podsumować.'); return; }
  if(!aiSettings.enabled){ alert('Włącz pełnego Milo w ⚙️ Ustawieniach.'); openSettings(); return; }
  box.style.display='block'; box.textContent='⏳ Milo czyta Twój dziennik…';
  try{
    const data=state.entries.slice(0,20).map(e=>`${e.date} ${e.emotion} siła ${e.intensity}: ${e.what||''} | ${e.iStatement||''}`).join('\n');
    const r=await callAI([{role:'system',content:MILO_SYSTEM_PROMPT+' Na podstawie dziennika napisz krótkie, ciepłe podsumowanie wzorców (nie diagnozuj), nazwij częste emocje i zadaj 2 pytania do refleksji. Max 150 słów.'},{role:'user',content:'Dziennik:\n'+data}]);
    box.textContent='✨ Podsumowanie od Milo:\n'+r;
    TTS.speak(r); SoundEngine.success();
  }catch(e){ box.textContent='Milo nie mógł teraz napisać podsumowania: '+e.message; }
}
async function askMiloAboutCheckin(){
  goTo('chat');
  const emo=state.selectedEmotion ? EMOTIONS.find(e=>e.id===state.selectedEmotion).name : 'nieznana';
  const what=document.getElementById('checkinWhat').value||'';
  const msg=`Czuję ${emo}. ${what}`;
  document.getElementById('chatInput').value=msg;
  document.getElementById('chatForm').requestSubmit();
}

// ---------- Nadpisanie czatu: pełny Milo + głos ----------
const _origRenderChat = renderChat;
renderChat = function(){
  _origRenderChat();
  const el=document.getElementById('chatMessages');
  // dodaj przyciski odsłuchu do wiadomości Milo
  el.querySelectorAll('.msg.milo').forEach((node,idx)=>{
    if(node.querySelector('.speak-btn')) return;
    const btn=document.createElement('button');
    btn.className='speak-btn'; btn.textContent='🔊 Odsłuchaj';
    btn.onclick=()=>{ const txt=node.textContent.replace('MILO','').replace('Milo','').trim(); TTS.speak(txt); };
    node.appendChild(btn);
  });
};
function showTyping(){
  const el=document.getElementById('chatMessages');
  const d=document.createElement('div'); d.className='msg milo'; d.id='typingMsg';
  d.innerHTML='<span class="who">Milo</span><span class="typing"><span></span><span></span><span></span></span> Milo myśli...';
  el.appendChild(d); el.scrollTop=el.scrollHeight;
}
function hideTyping(){ document.getElementById('typingMsg')?.remove(); }

// Podmiana obsługi formularza czatu (usuń stare listenery przez klonowanie)
(function(){
  const form=document.getElementById('chatForm');
  const clone=form.cloneNode(true);
  form.parentNode.replaceChild(clone,form);
  clone.addEventListener('submit', async e=>{
    e.preventDefault();
    const inp=document.getElementById('chatInput');
    const text=inp.value.trim(); if(!text) return;
    addMsg('user', text); inp.value=''; SoundEngine.pop();
    showTyping();
    let reply='';
    try{
      if(aiSettings.enabled){ reply=await miloReplyAI(text); }
      else { reply=miloReply(text); }
    }catch(err){
      reply='⚠️ Pełny Milo nie odpowiedział ('+err.message+'). Odpowiadam po swojemu: '+miloReply(text);
    }
    hideTyping();
    addMsg('milo', reply);
    TTS.speak(reply);
    SoundEngine.pop();
  });
})();

// ---------- Dźwięk w kluczowych akcjach (wrap) ----------
const _origSaveCheckin = saveCheckin;
saveCheckin = function(){ _origSaveCheckin(); SoundEngine.success(); };
const _origAnswerRecognize = answerRecognize;
answerRecognize = function(i){ _origAnswerRecognize(i); (i===RECOGNIZE_Q[state.recognizeIdx % RECOGNIZE_Q.length].answer)?SoundEngine.success():SoundEngine.soft(); };
const _origAnswerName = answerName;
answerName = function(i){ _origAnswerName(i); (i===NAME_Q[state.nameIdx % NAME_Q.length].answer)?SoundEngine.success():SoundEngine.soft(); };
const _origCompleteExpress = completeExpress;
completeExpress = function(){ _origCompleteExpress(); SoundEngine.success(); };
const _origFinishSim = finishSim;
finishSim = function(){ _origFinishSim(); SoundEngine.success(); };
const _origToggleBreath = toggleBreath;
toggleBreath = function(){
  const wasOn = !!breathTimer;
  _origToggleBreath();
  if(!wasOn){ SoundEngine.breathIn(); }
};
// kliknięcia w przyciski nawigacji
document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',()=>SoundEngine.click()));
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>SoundEngine.click()));

// Oddech z dźwiękiem: nadpisanie interwału
let _breathPhase=true;
setInterval(()=>{
  if(breathTimer){ _breathPhase=!_breathPhase; _breathPhase?SoundEngine.breathIn():SoundEngine.breathOut(); }
},4000);

// Init v2
updateAIStatus();
if(aiSettings.ambient!=='off'){ /* start po pierwszej interakcji */ document.addEventListener('click',()=>SoundEngine.startAmbient(aiSettings.ambient),{once:true}); }
document.addEventListener('click',()=>SoundEngine.ensure(),{once:true});

// === Emlove PWA: instalacja ===
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt', e=>{ e.preventDefault(); deferredPrompt=e; const b=document.getElementById('installBtn'); if(b) b.style.display='inline-flex'; });
async function installPWA(){
  if(deferredPrompt){ deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; }
  else { alert('Aby zainstalować Emlove: w Chrome/Android kliknij ⋮ → „Zainstaluj aplikację”. Na iPhonie: Udostępnij → „Dodaj do ekranu początkowego”.'); }
}


// Biblioteka: precyzyjne słowa z koła 3-poziomowego
function renderLibraryWheel(q){
  const box = document.getElementById('wheelWordList');
  if(!box || typeof WHEEL_WORDS === 'undefined') return;
  const list = q ? WHEEL_WORDS.filter(w =>
      w.word.includes(q) || w.familyName.toLowerCase().includes(q) || w.cluster.toLowerCase().includes(q)) : WHEEL_WORDS;
  if(!list.length){ box.innerHTML = '<p class="muted">Brak słów pasujących do „' + q + '”.</p>'; return; }
  const shown = list.slice(0, 60);
  box.innerHTML = shown.map(w => `<div class="wheel-word"><b>${w.word}</b><span>${w.cluster}</span><i>${w.familyName}</i></div>`).join('') +
    (list.length > shown.length ? `<p class="muted small">Pokazano ${shown.length} z ${list.length} słów — doprecyzuj wyszukiwanie.</p>` : '');
}
