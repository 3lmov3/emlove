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

// The reviewed translations are used to localize built-in simulations. Polish remains the source locale.
const SIMULATIONS_PL = JSON.parse(JSON.stringify(SIMULATIONS));
function applySimulationLocale(){
  const locale=window.EmloveLocale?window.EmloveLocale.language():'pl';
  const translated=window.EMLOVE_SIMULATION_LOCALES&&window.EMLOVE_SIMULATION_LOCALES[locale];
  SIMULATIONS_PL.forEach((base,i)=>{
    const target=SIMULATIONS[i];
    const content=translated&&translated[base.id];
    target.title=content?.title||base.title; target.short=content?.short||base.short;
    target.story=content?.story||base.story; target.steps=content?.steps||base.steps;
  });
}

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
  if(window.EmloveSync) EmloveSync.scheduleFlush();
}
function addPoints(n){ state.points+=n; saveState(); }

function renderProgress(){
  const tr=key=>window.EmloveLocale?.t(key)||key;
  document.getElementById('pointsLabel').textContent=state.points+' '+tr('progress.points');
  const pct=Math.min(100,state.points);
  document.getElementById('progressFill').style.width=pct+'%';
  document.getElementById('progressText').textContent=state.points<20?tr('progress.start'):state.points<60?tr('progress.continue'):tr('progress.great');
  document.getElementById('statEntries').textContent=state.entries.length;
  document.getElementById('statExercises').textContent=state.exercisesDone;
  // streak: unique dates
  const dates = [...new Set(state.entries.map(e=>e.date))];
  document.getElementById('statStreak').textContent = dates.length;
}
function trContent(section,key,fallback='',vars){const value=window.EmloveLocale&&window.EmloveLocale.content(section,key,vars);return typeof value==='string'&&value?value:fallback;}
function miloPrompt(key){const prompts=window.EmloveLocale?.content('milo-ui','prompts')||{};return prompts[key]||key;}
function todayStr(){ return new Date().toISOString().slice(0,10); }
function todayLabel(){ const lang=window.EmloveLocale?window.EmloveLocale.language():'pl'; return new Date().toLocaleDateString(lang,{weekday:'long', day:'numeric', month:'long'}); }
document.getElementById('todayPill').textContent = todayLabel();

// Navigation
const TITLES = {
  home:['page.home.title','page.home.subtitle'],
  checkin:['page.checkin.title','page.checkin.subtitle'],
  wheel:['page.wheel.title','page.wheel.subtitle'],
  exercises:['page.exercises.title','page.exercises.subtitle'],
  simulations:['page.simulations.title','page.simulations.subtitle'],
  chat:['page.chat.title','page.chat.subtitle'],
  journal:['page.journal.title','page.journal.subtitle'],
  personality:['page.personality.title','page.personality.subtitle'],
  library:['page.library.title','page.library.subtitle'],
  keys:['page.keys.title','page.keys.subtitle'],
};
let currentView='home';
const navMenu=document.querySelector('.nav');
function updateNavMenuEdges(){
  if(!navMenu)return;
  navMenu.classList.toggle('has-scroll-up',navMenu.scrollTop>2);
  navMenu.classList.toggle('has-scroll-down',navMenu.scrollTop+navMenu.clientHeight<navMenu.scrollHeight-2);
}
function revealActiveNavItem(behavior='smooth'){
  if(!navMenu)return;
  const active=navMenu.querySelector('.nav-btn.active');
  if(!active)return;
  if(window.matchMedia('(max-width:740px)').matches){
    const sidebar=document.getElementById('sidebar');
    if(sidebar){
      const panel=sidebar.getBoundingClientRect(),item=active.getBoundingClientRect();
      const maxScroll=Math.max(0,sidebar.scrollHeight-sidebar.clientHeight);
      const top=Math.max(0,Math.min(maxScroll,sidebar.scrollTop+item.top-panel.top-(sidebar.clientHeight-active.offsetHeight)/2));
      sidebar.scrollTo({top,behavior});
      requestAnimationFrame(updateNavMenuEdges);
      return;
    }
  }
  const maxScroll=Math.max(0,navMenu.scrollHeight-navMenu.clientHeight);
  const top=Math.max(0,Math.min(maxScroll,active.offsetTop-(navMenu.clientHeight-active.offsetHeight)/2));
  navMenu.scrollTo({top,behavior});
  requestAnimationFrame(updateNavMenuEdges);
}
function goTo(view){
  currentView=view;
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+view).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active', b.dataset.view===view));
  revealActiveNavItem();
  const meta = TITLES[view] || [view, ''];
  const tr=window.EmloveLocale?window.EmloveLocale.t:(key=>key);
  document.getElementById('viewTitle').textContent = tr(meta[0]);
  document.getElementById('viewSubtitle').textContent = tr(meta[1]);
  closeSidebar();
  if(view==='keys'&&typeof renderKeys==='function') renderKeys();
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',()=>goTo(b.dataset.view)));
window.addEventListener('emlove:language-change',()=>{if(window.EmloveLocale)window.EmloveLocale.apply();goTo(currentView);if(currentView==='checkin'){renderCheckin();updateIPreview();}if(currentView==='journal')renderJournal();if(currentView==='home')renderRecent();if(currentView==='chat'){renderChat();updateAIStatus();updateMiloGate();updateKeysStatus();}if(currentView==='library')renderLibrary();if(currentView==='keys')renderKeys();if(currentView==='personality'&&typeof bfRender==='function')bfRender();document.getElementById('todayPill').textContent=todayLabel();renderProgress();if(currentView==='simulations'){renderSims();if(state.simIndex!==null&&document.getElementById('simPlayer').style.display!=='none')renderSimStep();}if(currentView==='exercises'&&window.WheelCourse)window.WheelCourse.render();if(currentView==='wheel'&&window.EmloveWheel)window.EmloveWheel.render();if(typeof TTS!=='undefined')TTS.loadVoices();});
if(navMenu){
  navMenu.addEventListener('scroll',updateNavMenuEdges,{passive:true});
  window.addEventListener('resize',updateNavMenuEdges);
  requestAnimationFrame(()=>{revealActiveNavItem('auto');updateNavMenuEdges();});
}
function openSidebar(){ document.getElementById('sidebar').classList.add('open'); const b=document.getElementById('sidebarBackdrop'); if(b) b.classList.add('show'); }
function closeSidebar(){ document.getElementById('sidebar').classList.remove('open'); const b=document.getElementById('sidebarBackdrop'); if(b) b.classList.remove('show'); }
document.getElementById('hamburger').addEventListener('click',()=>{
  const sb=document.getElementById('sidebar');
  if(sb.classList.contains('open')) closeSidebar(); else openSidebar();
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeSidebar(); });

// Check-in
function renderCheckin(){
  const grid=document.getElementById('checkinEmotions'),loc=window.EmloveLocale?window.EmloveLocale.language():'pl';
  const emotionLabels=window.EmloveLocale?.content('checkin','emotions')||{};
  if(grid)grid.innerHTML=EMOTIONS.map(e=>`<button class="emotion-btn${state.selectedEmotion===e.id?' selected':''}" data-id="${e.id}" onclick="selectEmotion('${e.id}')"><span class="emoji">${e.emoji}</span><strong>${escapeHtml(emotionLabels[e.id]||e.name)}</strong></button>`).join('');
  const bodyDict=window.EmloveLocale?.content('checkin','bodyParts')||{};
  const needDict=window.EmloveLocale?.content('checkin','needOptions')||{};
  const bodyKeys=['head','throat','chest','stomach','arms','hands','legs','intimate','whole'];
  const needKeys=['calm','connection','boundaries','rest','understanding','safety','expression','support'];
  const body=document.getElementById('bodyChips'),needs=document.getElementById('needChips');
  if(body)body.innerHTML=bodyKeys.map(k=>`<button class="chip${state.selectedBody.has(k)?' selected':''}" onclick="toggleChip('body','${k}',this)">${escapeHtml(bodyDict[k]||BODY_SIGNALS[0])}</button>`).join('');
  if(needs)needs.innerHTML=needKeys.map(k=>`<button class="chip${state.selectedNeeds.has(k)?' selected':''}" onclick="toggleChip('need','${k}',this)">${escapeHtml(needDict[k]||NEEDS[0])}</button>`).join('');
  const lang=loc, hint=trContent('checkin','writeHint','');
  const hintEl=document.getElementById('checkinMsg'); if(hintEl&&!hintEl.textContent&&hint)hintEl.dataset.hint=hint;
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
  const f=document.getElementById('iFeel').value,w=document.getElementById('iWhen').value,b=document.getElementById('iBecause').value,n=document.getElementById('iNeed').value,a=document.getElementById('iAsk').value;
  const emo=EMOTIONS.find(e=>e.id===state.selectedEmotion),names=window.EmloveLocale?.content('checkin','emotions')||{};
  const feel=f||(emo?String(names[emo.id]||emo.name).toLowerCase():'...');
  const tr=key=>window.EmloveLocale?.t('checkin.'+key)||({feel:'Czuję',when:'gdy',because:'bo',need:'Potrzebuję',ask:'Proszę o'}[key]);
  document.getElementById('iPreview').textContent=`${tr('feel')} ${feel}${w?` ${tr('when')} ${w}`:''}${b?`, ${tr('because')} ${b}`:''}${n?`. ${tr('need')} ${n}`:''}${a?`. ${tr('ask')} ${a}`:''}.`;
}
function saveCheckin(){
  if(!state.selectedEmotion){ alert(window.EmloveLocale?.t('checkin.noEmotion')||'Wybierz najpierw emocję główną 🙂'); return; }
  const emo = EMOTIONS.find(e=>e.id===state.selectedEmotion);
  const entry = {
    id: newEntryId(), updatedAt: new Date().toISOString(),
    date: todayStr(), time: new Date().toLocaleTimeString('pl-PL',{hour:'2-digit',minute:'2-digit'}),
    emotion: emo.name, emotionId: emo.id, emoji: emo.emoji, intensity: document.getElementById('intensity').value,
    entryType: 'checkin', supportive: '', difficult: '', wishes: '',
    body: [...state.selectedBody], what: document.getElementById('checkinWhat').value,
    needs: [...state.selectedNeeds], needText: document.getElementById('checkinNeedText').value,
    iStatement: document.getElementById('iPreview').textContent
  };
  state.entries.unshift(entry);
  if(window.EmloveSync) EmloveSync.markDirty(entry.id);
  addPoints(10);
  const shownEmotion=(window.EmloveLocale?.content('checkin','emotions')||{})[emo.id]||emo.name;
  document.getElementById('checkinMsg').textContent = `${window.EmloveLocale?.t('checkin.saved')||'✓ Zapisano!'} ${emo.emoji} ${shownEmotion} · ${window.EmloveLocale?.t('checkin.strength')||'siła'} ${entry.intensity}/10 · +10 pkt. Milo: „${window.EmloveLocale?.t('checkin.miloThanks')||'Dziękuję, że to nazywasz. Co chcesz z tym zrobić?'}”`;
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
const BODY_ALIASES={'klatka piersiowa':'chest','żołądek':'stomach','brzuch':'stomach','gardło':'throat','ramiona':'arms','dłonie':'hands','całe ciało':'whole','głowa':'head','miejsce intymne':'intimate'};
const NEED_ALIASES={'spokoju':'calm','spokój':'calm','wsparcia':'support','zrozumienia':'understanding','odpoczynku':'rest','rozmowy':'connection','ciszy':'calm','przestrzeni':'boundaries','bezpieczeństwa':'safety','akceptacji':'understanding','pomocy':'support','radości':'expression'};
function displayEmotion(e){const dict=window.EmloveLocale?.content('checkin','emotions')||{};return dict[e.emotionId]||e.emotion||''}
function displayStored(values,section,group,aliases){const dict=window.EmloveLocale?.content(section,group)||{};return (values||[]).map(value=>dict[value]||dict[aliases[value]]||value)}
function renderRecent(){
  const el=document.getElementById('homeRecent');
  if(!state.entries.length){el.innerHTML=`<p class="muted">${window.EmloveLocale?.t('home.recentEmpty')||'Brak check-inów. Twój pierwszy wpis pojawi się tutaj.'}</p>`;return;}
  el.innerHTML=state.entries.slice(0,3).map(e=>`<div class="recent-item"><div><strong>${escapeHtml(e.emoji)} ${escapeHtml(displayEmotion(e))}</strong> · ${escapeHtml(window.EmloveLocale?.t('checkin.strength')||'siła')} ${escapeHtml(e.intensity)}/10<br><span class="muted">${escapeHtml(e.what||'—')}</span></div><span class="muted">${escapeHtml(e.date)} ${escapeHtml(e.time)}</span></div>`).join('');
}
function renderJournal(){
  const el=document.getElementById('journalList');
  if(!state.entries.length){el.innerHTML=`<p class="muted">${trContent('journal-ui','journalEmpty','Jeszcze pusto. Zrób pierwszy check-in, a pojawi się tutaj.')}</p>`;return;}
  el.innerHTML=state.entries.map((e,i)=>`<div class="journal-item"><div class="meta"><span class="pill">${escapeHtml(e.emoji)} ${escapeHtml(displayEmotion(e))}</span><span>${escapeHtml(trContent('journal-ui','entryIntensity','intensity'))} ${escapeHtml(e.intensity)}/10</span><span>${escapeHtml(e.date)} · ${escapeHtml(e.time)}</span>${displayStored(e.body,'checkin','bodyParts',BODY_ALIASES).map(b=>`<span>📍 ${escapeHtml(b)}</span>`).join('')}</div><p><strong>${escapeHtml(trContent('checkin','storyQuestion','What happened?'))}</strong> ${escapeHtml(e.what||'—')}</p>${(e.needs||[]).length?`<p><strong>${escapeHtml(trContent('journal-ui','entryNeeds','Needs:'))}</strong> ${displayStored(e.needs,'checkin','needOptions',NEED_ALIASES).map(escapeHtml).join(', ')}</p>`:''}${e.needText?`<p>${escapeHtml(e.needText)}</p>`:''}<p class="preview-box">${escapeHtml(e.iStatement)}</p><button class="btn btn-ghost btn-small" onclick="deleteEntry(${i})">${escapeHtml(trContent('journal-ui','entryDelete','Delete entry'))}</button></div>`).join('');
}
function deleteEntry(i){
  const removed=state.entries[i];
  if(removed&&removed.id&&window.EmloveSync) EmloveSync.markDeleted(removed.id);
  state.entries.splice(i,1); saveState();
}
function exportJournal(){
  const blob=new Blob([JSON.stringify(state.entries,null,2)],{type:'application/json'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='dziennik-emocji.json'; a.click();
}

// Wheel
// Stare koło 8-segmentowe — używane tylko awaryjnie, gdy brak wheel-reference.json.
window.legacyWheel = renderWheel;

function renderWheel(){
  const wrap=document.getElementById('wheelSvg');
  if(!wrap) return;
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
  applySimulationLocale();
  const advanced=trContent('simulations-ui','advanced','extended'),open=trContent('exercises','open','Open');
  document.getElementById('simGrid').innerHTML=SIMULATIONS.map((s,i)=>`<div class="sim-card" onclick="startSim(${i})"><h4>${escapeHtml(s.icon)} ${escapeHtml(s.title)}${s.advanced?` <span class="sim-badge">${escapeHtml(advanced)}</span>`:''}</h4><p>${escapeHtml(s.short)}</p><span class="muted">${escapeHtml(open)} →</span></div>`).join('');
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
  document.getElementById('simStepLabel').textContent=trContent('simulations-ui','step',`Step ${state.simStep+1} of ${sim.steps.length}`,{step:state.simStep+1,total:sim.steps.length});
  document.getElementById('simStory').innerHTML=`<strong>${escapeHtml(sim.icon)} ${escapeHtml(sim.title)}</strong><br>${escapeHtml(sim.story)}`;
  document.getElementById('simQuestion').innerHTML=`<strong>${escapeHtml(trContent('simulations-ui','ask','Milo asks:'))}</strong> ${escapeHtml(step.q)}`;
  document.getElementById('simChoices').innerHTML=step.choices.map((c,i)=>`<button class="choice-btn" onclick="chooseSim(${i})">${escapeHtml(c.t)}</button>`).join('');
  document.getElementById('simReflect').style.display='none';
}
function chooseSim(i){
  const sim=SIMULATIONS[state.simIndex];
  const step=sim.steps[state.simStep];
  const choice=step.choices[i];
  state.simLog.push({step:state.simStep, choice:choice.t, milo:choice.next});
  document.getElementById('simQuestion').innerHTML=`<strong>${escapeHtml(trContent('simulations-ui','milo','Milo:'))}</strong> ${escapeHtml(choice.next)}`;
  document.getElementById('simChoices').innerHTML='';
  if(state.simStep < sim.steps.length-1){
    document.getElementById('simChoices').innerHTML=`<button class="btn btn-primary" onclick="state.simStep++; renderSimStep()">${escapeHtml(trContent('simulations-ui','next','Next →'))}</button>`;
  } else {
    document.getElementById('simReflect').style.display='block';
  }
}
function finishSim(){
  state.exercisesDone++; addPoints(15);
  const sim=SIMULATIONS[state.simIndex];
  const reflect=document.getElementById('simReflectText').value;
  const _simEntry={id:newEntryId(), updatedAt:new Date().toISOString(), date:todayStr(), time:new Date().toLocaleTimeString('pl-PL',{hour:'2-digit',minute:'2-digit'}), emotion:'Symulacja: '+sim.title, emoji:sim.icon, intensity:'—', body:[], what:reflect||state.simLog.map(l=>l.choice).join(' · '), needs:[], needText:'', iStatement:'Symulacja ukończona. Refleksja: '+(reflect||'—'), entryType:'simulation', simulationId:sim.id, simulationTitle:sim.title, simulationChoices:state.simLog.map(l=>l.choice)};
  state.entries.unshift(_simEntry);
  if(window.EmloveSync) EmloveSync.markDirty(_simEntry.id);
  saveState();
  alert(trContent('simulations-ui','doneTitle','Simulation complete')+'\n'+trContent('simulations-ui','doneBody','Saved on this device. +15 points. In a real situation, the decision is always yours.'));
  closeSim(); document.getElementById('simReflectText').value='';
}

// Library
function renderLibrary(){
  const q=(document.getElementById('libSearch')?.value||'').trim().toLocaleLowerCase();
  renderLibraryWheel(q);
  const ui=(key,fb)=>trContent('library-ui',key,fb);
  const catalog=window.EmloveLocale?.content('library-content')||{};
  const list=EMOTIONS.map(source=>{const t=catalog[source.id]||{};return {...source,name:t.name||source.name,words:t.words||source.words,desc:t.desc||source.desc,body:t.body||source.body,questions:t.questions||source.questions}})
    .filter(e=>!q||[e.name,...e.words,e.desc,e.body].join(' ').toLocaleLowerCase().includes(q));
  document.getElementById('libGrid').innerHTML=list.map(e=>`<div class="lib-card" onclick="this.classList.toggle('open')"><h4>${escapeHtml(e.emoji)} ${escapeHtml(e.name)}</h4><p class="muted">${e.words.slice(0,4).map(escapeHtml).join(', ')}…</p><div class="body"><p>${escapeHtml(e.desc)}</p><p><strong>${escapeHtml(ui('body','Possible body sensations:'))}</strong> ${escapeHtml(e.body)}</p><p><strong>${escapeHtml(ui('words','Words:'))}</strong> ${e.words.map(escapeHtml).join(', ')}</p><p><strong>${escapeHtml(ui('questions','Questions for reflection:'))}</strong></p><ul>${e.questions.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></div></div>`).join('')||`<p class="muted">${escapeHtml(ui('noCards','No matching cards.'))}</p>`;
}

// Breath
let breathTimer=null;
function toggleBreath(){
  const c=document.getElementById('breathCircle'),b=document.getElementById('breathBtn'),tr=k=>window.EmloveLocale?.t('home.'+k)||k;
  if(breathTimer){clearInterval(breathTimer);breathTimer=null;c.classList.remove('in');c.textContent=tr('breathe');b.textContent=tr('startBreath');return;}
  b.textContent=tr('stopBreath');let phase=true;
  const tick=()=>{phase=!phase;c.classList.toggle('in',phase);c.textContent=phase?tr('inhale'):tr('exhale');};
  tick();breathTimer=setInterval(tick,4000);
}

// Chat Milo
function addMsg(who,text){
  state.chat.push({who,text,ts:Date.now()});
  renderChat(); saveState();
}
const CHAT_COPY={
 pl:{you:'Ty',greeting:'Cześć! Jestem Milo, towarzysz z Krainy Odczuwania. Nie jestem terapeutą — jestem tu, aby słuchać i pytać. Nie przejmę Twoich słów i nie zdecyduję za Ciebie. Jak się dziś czujesz? Możesz napisać np. „czuję smutek” albo „nie wiem, co czuję”.'},
 en:{you:'You',greeting:'Hello! I am Milo, your emotional companion. I am not a therapist; I am here to listen and ask questions. I will not take over your words or decide for you. How are you feeling today? You can say “I feel sad” or “I do not know what I feel”.'},
 de:{you:'Du',greeting:'Hallo! Ich bin Milo, dein Begleiter für Gefühle. Ich bin kein Therapeut, sondern höre zu und stelle Fragen. Ich nehme dir deine Worte nicht ab und entscheide nicht für dich. Wie fühlst du dich heute? Du kannst sagen: „Ich bin traurig“ oder „Ich weiß nicht, was ich fühle“.'},
 fr:{you:'Toi',greeting:'Bonjour ! Je suis Milo, ton compagnon des émotions. Je ne suis pas thérapeute : je suis là pour écouter et poser des questions. Je ne parlerai pas à ta place et ne déciderai pas pour toi. Comment te sens-tu aujourd’hui ? Tu peux dire « je me sens triste » ou « je ne sais pas ce que je ressens ».'},
 hu:{you:'Te',greeting:'Szia! Milo vagyok, az érzelmi társad. Nem vagyok terapeuta; azért vagyok itt, hogy figyeljek és kérdezzek. Nem veszem át a szavaidat, és nem döntök helyetted. Hogy érzed magad ma? Mondhatod például: „szomorú vagyok” vagy „nem tudom, mit érzek”.'},
 uk:{you:'Ти',greeting:'Привіт! Я Milo, твій емоційний помічник. Я не терапевт — я тут, щоб слухати й запитувати. Я не говоритиму замість тебе й не вирішуватиму за тебе. Як ти почуваєшся сьогодні? Можеш написати: «мені сумно» або «я не знаю, що відчуваю».'}
};
function renderChat(){
  const el=document.getElementById('chatMessages');
  const locale=window.EmloveLocale?window.EmloveLocale.language():'pl';
  const copy=CHAT_COPY[locale]||CHAT_COPY.pl;
  if(!state.chat.length){
    el.innerHTML=`<div class="msg milo"><span class="who">Milo</span>${escapeHtml(copy.greeting)}</div>`;
    return;
  }
  el.innerHTML=state.chat.map(m=>`<div class="msg ${m.who==='milo'?'milo':'user'}"><span class="who">${m.who==='milo'?'Milo':copy.you}</span>${escapeHtml(m.text)}</div>`).join('');
  el.scrollTop=el.scrollHeight;
}
function escapeHtml(s){ return String(s??'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function clearChat(){ state.chat=[]; saveState(); renderChat(); }
function quickPrompt(text){ document.getElementById('chatInput').value=text; document.getElementById('chatForm').requestSubmit(); }

const CRISIS_WORDS=['samobój','samookalecz','krzywdz','nie chcę żyć','nie chce mi się żyć','zniknąć na zawsze','zranić się'];
function miloReply(userText){
  const t=userText.toLowerCase();
  const locale=window.EmloveLocale?window.EmloveLocale.language():'pl';
  const localPack=window.EMLOVE_MILO_LOCAL&&window.EMLOVE_MILO_LOCAL[locale];
  if(locale!=='pl'&&localPack){
    if(localPack.crisisTerms.some(w=>t.includes(w)))return window.EmloveLocale.crisisReply();
    if(/don't want to talk|stop asking|leave me alone|nicht reden|hör auf zu fragen|ne veux pas parler|arrête de demander|nem akarok beszélni|ne kérdezz|не хочу говорити|припини питати/i.test(t)){
      return ({en:'I understand, and I respect that. You do not have to say anything now. You can come back whenever you want. Would you prefer a quiet breathing minute or an exercise without talking?',de:'Ich verstehe das und respektiere es. Du musst jetzt nichts sagen. Du kannst zurückkommen, wann immer du möchtest. Möchtest du lieber eine stille Atemminute oder eine Übung ohne Gespräch?',fr:'Je comprends et je respecte cela. Tu n’as rien à dire maintenant. Tu peux revenir quand tu le souhaites. Préfères-tu une minute de respiration en silence ou un exercice sans parler ?',hu:'Megértem, és tiszteletben tartom. Most nem kell semmit mondanod. Bármikor visszatérhetsz. Inkább egy csendes légzőgyakorlatot vagy beszéd nélküli feladatot szeretnél?',uk:'Я розумію і поважаю це. Тобі не потрібно нічого говорити зараз. Повертайся, коли захочеш. Тобі підійде тиха хвилина дихання чи вправа без розмови?'})[locale];
    }
    for(const group of Object.values(localPack.groups||{}))if(group.terms?.some(w=>t.includes(w)))return group.reply;
    const generic=localPack.generic||[];
    return generic[Math.floor(Math.random()*generic.length)]||localPack.crisisFallback;
  }
  if(CRISIS_WORDS.some(w=>t.includes(w))){
    return window.EmloveLocale?window.EmloveLocale.crisisReply():'Skontaktuj się z zaufaną osobą lub lokalnymi służbami ratunkowymi.';
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
renderCheckin(); renderWheel(); if(window.EmloveWheel) window.EmloveWheel.mount(); renderRecognize(); renderName(); newExpressScenario(); renderSims(); renderLibrary(); renderChat(); renderProgress(); renderRecent(); renderJournal(); updateIPreview();

/* ============================================================
   v2: DŹWIĘK + PEŁNY MILO (model językowy)
   ============================================================ */

// ---------- Ustawienia ----------
const AI_SETTINGS_KEY = 'emocje_ai_settings';
const _CFG = (typeof window !== 'undefined' && window.EMLOVE_CONFIG) || {};
const _saved = JSON.parse(localStorage.getItem(AI_SETTINGS_KEY) || 'null') || {};
let aiSettings = {
  // „Pełny Milo” jest dostępny, gdy działa choć jedna z trzech dróg:
  //   a) użytkownik dodał własny klucz (BYOK),
  //   b) jest zalogowany — klucz administratora leży w Supabase,
  //   c) administrator ustawił własny endpoint OpenAI-compatible w config.js.
  // Wcześniej ta flaga zależała WYŁĄCZNIE od aiEndpoint, więc zalogowany
  // użytkownik z działającą funkcją Supabase dostawał odpowiedzi lokalne.
  get enabled(){
    const byok = !!(window.EmloveProviders && window.EmloveProviders.activeProvider
                    && window.EmloveProviders.activeProvider() !== 'admin');
    const onlineReady = !!(window.EmloveOnline && window.EmloveAuth
                           && window.EmloveAuth.currentUser && window.EmloveAuth.currentUser());
    const ownEndpoint = !!(_CFG.aiEndpoint && _CFG.aiEndpoint.length > 5);
    return byok || onlineReady || ownEndpoint;
  },
  baseUrl: _CFG.aiEndpoint || '',
  model: _CFG.aiModel || 'emlove',
  temp: 0.8,
  soundEnabled: _saved.soundEnabled !== false,
  voiceEnabled: _saved.voiceEnabled !== false,
  ambient: _saved.ambient || 'off',
  volume: _saved.volume !== undefined ? _saved.volume : 70
};
function saveAISettings(){
  localStorage.setItem(AI_SETTINGS_KEY, JSON.stringify(aiSettings));
  updateAIStatus();
}
function updateAIStatus(){
  // Gdy aktywny jest własny klucz, stan opisuje updateMiloGate().
  if(window.EmloveProviders && window.EmloveProviders.activeProvider()!=='admin'){ updateMiloGate(); return; }
  const t=document.getElementById('aiStatusTitle'), x=document.getElementById('aiStatusText'), c=document.getElementById('chatModeLabel');
  if(aiSettings.enabled){
    const title=trContent('milo-ui','fullTitle','Milo online');
    t.textContent='🌙 '+title;
    x.textContent=trContent('milo-ui','fullText','Milo writes its own replies and asks questions without judging or deciding for you.');
    if(c) c.textContent=title+' ('+aiSettings.model+')';
  } else {
    t.textContent='🌙 '+trContent('milo-ui','localMode','Local mode');
    x.textContent=trContent('milo-ui','localText','Milo is available locally.');
    if(c) c.textContent=trContent('milo-ui','status','local mode · offline');
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
    if(typeof Ambient!=='undefined'){ Ambient.set(type); return; }
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
  if(typeof Ambient!=='undefined' && Ambient.type!=='off' && Ambient.needsGesture && aiSettings.soundEnabled){
    Ambient.needsGesture=false; Ambient.muted=false; if(Ambient.audio)Ambient.audio.muted=false; Ambient.play(); return;
  }
  aiSettings.soundEnabled=!aiSettings.soundEnabled;
  const chk=document.getElementById('setSoundEnabled'); if(chk) chk.checked=aiSettings.soundEnabled;
  saveAISettings(); updateAIStatus();
  if(typeof Ambient!=='undefined'){Ambient.needsGesture=false;Ambient.setMuted(!aiSettings.soundEnabled);if(aiSettings.soundEnabled && Ambient.type!=='off' && !Ambient.audio)Ambient.play();}
  if(aiSettings.soundEnabled) SoundEngine.pop();
}
function setVolume(v){ SoundEngine.setVolume(v); if(typeof Ambient!=='undefined') Ambient.setVolume(v); }
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
    const lang=window.EmloveLocale?window.EmloveLocale.language():'pl';
    const prefix={pl:'pl',en:'en',de:'de',fr:'fr',hu:'hu',uk:'uk'}[lang]||'pl';
    const matching=all.filter(v=>v.lang && v.lang.toLowerCase().startsWith(prefix));
    const list=matching.length?matching:all;
    const autoLabel={pl:'Automatyczny (polski)',en:'Automatic (English)',de:'Automatisch (Deutsch)',fr:'Automatique (français)',hu:'Automatikus (magyar)',uk:'Автоматично (українська)'}[lang]||'Automatic';
    const selected=sel.value;
    sel.innerHTML='<option value="">'+autoLabel+'</option>'+list.map(v=>`<option value="${escapeHtml(v.name)}">${escapeHtml(v.name)} (${escapeHtml(v.lang)})</option>`).join('');
    if(selected&&list.some(v=>v.name===selected))sel.value=selected;
  },
  speak(text){
    if(!aiSettings.voiceEnabled) return;
    const toggle=document.getElementById('voiceToggle');
    if(toggle && !toggle.checked) return;
    if(!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const clean=String(text)
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu,'')
      .replace(/[\u201E\u201C\u201D"]/g,'')
      .replace(/[*_#>`]/g,'')
      .replace(/\s+/g,' ')
      .trim()
      .slice(0,600)
      .trim();
    const u=new SpeechSynthesisUtterance(clean);
    const speechLocale={pl:'pl-PL',en:'en-GB',de:'de-DE',fr:'fr-FR',hu:'hu-HU',uk:'uk-UA'};
    u.lang=speechLocale[window.EmloveLocale?window.EmloveLocale.language():'pl']||'pl-PL';
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
function testVoice(){
  const lang=window.EmloveLocale?window.EmloveLocale.language():'pl';
  const intros={
    pl:'Cześć! Jestem Milo, Twój towarzysz emocji. Nie oceniam i nie decyduję za Ciebie. Tylko pytam i słucham. Jak się dziś czujesz?',
    en:'Hello! I am Milo, your emotional companion. I do not judge or decide for you. I listen and ask questions. How are you feeling today?',
    de:'Hallo! Ich bin Milo, dein Begleiter für Gefühle. Ich bewerte dich nicht und entscheide nicht für dich. Ich höre zu und frage. Wie fühlst du dich heute?',
    fr:'Bonjour ! Je suis Milo, ton compagnon des émotions. Je ne juge pas et ne décide pas à ta place. J’écoute et je pose des questions. Comment te sens-tu aujourd’hui ?',
    hu:'Szia! Milo vagyok, az érzelmi társad. Nem ítélkezem, és nem döntök helyetted. Figyelek és kérdezek. Hogy érzed magad ma?',
    uk:'Привіт! Я Milo, твій емоційний помічник. Я не засуджую й не вирішую за тебе. Я слухаю та запитую. Як ти почуваєшся сьогодні?'
  };
  TTS.speak(intros[lang]||intros.pl); SoundEngine.pop();
}
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
- Jeśli użytkownik pisze o myślach samobójczych, samookaleczeniu lub krzywdzeniu siebie: odpowiedz ze współczuciem, zachęć do kontaktu z zaufaną osobą i podaj wyłącznie kontakty z regionu urządzenia. Nie zgaduj kraju na podstawie języka. Nie udzielaj terapii.
- Lokalne kontakty pomocy: ${window.EmloveLocale?window.EmloveLocale.crisisSummary():"skontaktuj się z lokalnymi służbami ratunkowymi"}.
- Szanujesz "nie chcę teraz mówić" — nie naciskasz.
- Nie używasz formatowania markdown poza prostym tekstem.`;

const MILO_LANGUAGE_DIRECTIVES={pl:'Odpowiadaj wyłącznie po polsku.',en:'Reply only in English.',de:'Antworte ausschließlich auf Deutsch.',fr:'Réponds uniquement en français.',hu:'Kizárólag magyarul válaszolj.',uk:'Відповідай лише українською.'};
async function callAI(messages, opts={}){
  const activeLocale=window.EmloveLocale?window.EmloveLocale.language():'pl';
  const localizedMessages=messages.map(m=>m.role==='system'?{...m,content:m.content+'\n\n'+(MILO_LANGUAGE_DIRECTIVES[activeLocale]||MILO_LANGUAGE_DIRECTIVES.pl)}:m);
  // Własny klucz użytkownika (BYOK) ma pierwszeństwo przed kluczem administratora.
  const _active = window.EmloveProviders ? window.EmloveProviders.activeProvider() : 'admin';
  if(_active !== 'admin'){
    const _last = messages[messages.length-1] || {content:''};
    const _history = messages.slice(0,-1)
      .filter(m=>m.role!=='system')
      .map(m=>({role:m.role, content:m.content}));
    return await window.EmloveByok.ask({
      provider:_active,
      model:'',
      text:_last.content,
      history:_history,
      language:activeLocale,
    });
  }
  // 2) Własny endpoint z config.js — jeśli administrator go ustawił.
  if(aiSettings.enabled && aiSettings.baseUrl){
    const base=(aiSettings.baseUrl||'').replace(/\/$/,'');
    const url=base+'/chat/completions';
    const headers={'Content-Type':'application/json'};
    if(aiSettings.key) headers['Authorization']='Bearer '+aiSettings.key;
    const body={model:aiSettings.model, messages:localizedMessages, temperature: aiSettings.temp ?? 0.7, ...opts};
    const res=await fetch(url,{method:'POST',headers,body:JSON.stringify(body)});
    if(!res.ok){
      const txt=await res.text().catch(()=> '');
      throw new Error(`Milo nie mógł odpowiedzieć (błąd ${res.status}): ${txt.slice(0,300)}`);
    }
    const data=await res.json();
    return data.choices?.[0]?.message?.content || '';
  }

  // 3) Klucz administratora przez funkcję Supabase — wystarczy zalogowanie.
  if(window.EmloveOnline && window.EmloveAuth && window.EmloveAuth.currentUser()){
    const _last=messages[messages.length-1] || {content:''};
    const _hist=messages.slice(0,-1)
      .filter(m=>m.role!=='system')
      .map(m=>({role:m.role, content:m.content}));
    return await window.EmloveOnline.ask(_last.content, _hist, undefined, activeLocale);
  }

  if(window.EmloveOnline) throw new Error('login_required');
  if(!aiSettings.enabled) throw new Error('Pełny Milo nie jest włączony. Włącz go w ⚙️ Ustawieniach.');
  const base=(aiSettings.baseUrl||'').replace(/\/$/,'');
  const url=base+'/chat/completions';
  const headers={'Content-Type':'application/json'};
  if(aiSettings.key) headers['Authorization']='Bearer '+aiSettings.key;
  const body={model:aiSettings.model, messages:localizedMessages, temperature: aiSettings.temp ?? 0.7, ...opts};
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

// ---------- Ustawienia UI ----------
function openSettings(){
  document.getElementById('settingsModal').style.display='flex';
  const byId = id => document.getElementById(id);
  const sv = (id, val) => { const el = byId(id); if (el) el.value = val; };
  sv('setAmbient', aiSettings.ambient);
  sv('setVolume', aiSettings.volume);
  const c1 = byId('setSoundEnabled'); if (c1) c1.checked = aiSettings.soundEnabled;
  const c2 = byId('setVoiceEnabled'); if (c2) c2.checked = aiSettings.voiceEnabled;
  const note = byId('settingsMiloMode');
  if (note) note.textContent = aiSettings.enabled
    ? 'Milo układa odpowiedzi sam — klucz administratora (wystarczy zalogowanie) albo Twój własny z „Klucze API”.'
    : (window.EmloveOnline
        ? 'Milo działa lokalnie. Zaloguj się, aby rozmawiać z pełnym Milo — albo dodaj własny klucz w „Klucze API”.'
        : 'Milo działa lokalnie. Pełną rozmowność włącza administrator aplikacji.');
  SoundEngine.click();
}
function closeSettings(){ document.getElementById('settingsModal').style.display='none'; SoundEngine.click(); }
async function deleteLocalUserData(){
  const accepted=window.confirm('Usunąć wszystkie wpisy, rozmowy, wynik testu osobowości, serduszka i postępy w ćwiczeniach?\n\nZostaną usunięte z tego urządzenia, a jeśli jesteś zalogowany — również z chmury. Tego nie można cofnąć.\n\nSesja i ustawienia dźwięku pozostaną. Zamknij inne otwarte karty Emlove przed usunięciem.');
  if(!accepted)return;
  try{
    // 1. Zaznacz wpisy jako usunięte na serwerze. Bez tego sync pobrałby
    //    je z powrotem zaraz po przeładowaniu i wyglądałoby, że nic się nie stało
    //    (pojedyncze usuwanie działa właśnie dlatego, że woła markDeleted).
    if(window.EmloveSync){
      state.entries.forEach(e=>{ if(e.id) window.EmloveSync.markDeleted(e.id); });
    }
    // 2. Opróżnij stan w pamięci: flush nie może wysłać starych wpisów jako
    //    „brudnych”, a postępy mają wyjechać jako 0, nie jako stare wartości.
    state.entries = [];
    state.points = 0;
    state.exercisesDone = 0;
    // 3. Wyślij usunięcia ZANIM strona zostanie przeładowana.
    if(window.EmloveSync && window.EmloveSync.flush){
      try{ await window.EmloveSync.flush(); }catch(e){ /* kolejka zostaje — nadrobi przy następnej próbie */ }
    }
    // 4. Wyczyść urządzenie.
    ['emocje_entries','emocje_points','emocje_exercises','emocje_chat','emlove_personality','emlove_wheel_cycle_v1'].forEach(k=>localStorage.removeItem(k));
    // Własne klucze API też znikają z urządzenia.
    Object.keys(localStorage).forEach(k=>{ if(k.indexOf('emlove.provider.')===0) localStorage.removeItem(k); });
  }catch(e){window.alert('Nie udało się usunąć danych na tym urządzeniu. Spróbuj ponownie.');return;}
  window.location.reload();
}
async function deleteMiloServerSession(){
  // Anonimowe sesje Milo zostały zastąpione kontem użytkownika.
  // Usunięcie konta odbywa się w Ustawienia -> „Usuń konto z chmury”.
  const status=document.getElementById('deleteMiloSessionStatus');
  if(status) status.textContent='Milo korzysta teraz z konta użytkownika. Aby usunąć dane z serwera, użyj „Usuń konto z chmury”.';
}
function saveSettings(){
  const byId = id => document.getElementById(id);
  const g = id => byId(id) ? byId(id).value : undefined;
  const c = id => byId(id) ? byId(id).checked : undefined;
  aiSettings.soundEnabled = c('setSoundEnabled') !== false;
  aiSettings.voiceEnabled = c('setVoiceEnabled') !== false;
  if (g('setAmbient') !== undefined) aiSettings.ambient = g('setAmbient');
  if (g('setVolume') !== undefined) aiSettings.volume = parseInt(g('setVolume'));
  saveAISettings();
  if (typeof Ambient !== 'undefined') { Ambient.setVolume(aiSettings.volume); Ambient.setMuted(!aiSettings.soundEnabled); Ambient.set(aiSettings.ambient); }
  updateAIStatus();
  const msg = document.getElementById('settingsMsg');
  if (msg) msg.textContent = '✓ Zapisano.';
  SoundEngine.success();
}

// ---------- Generowanie z Milo ----------
async function generateExpressWithAI(){
  if(!aiSettings.enabled){ alert(window.EmloveOnline
    ? 'Ta funkcja wymaga pełnego Milo. Zaloguj się w panelu bocznym albo dodaj własny klucz w „Klucze API”. Na razie proponuję gotowe sytuacje.'
    : 'Ta funkcja wymaga pełnego Milo, którego włącza administrator aplikacji. Na razie proponuję gotowe sytuacje.'); return; }
  const btn=event.target; btn.textContent='⏳ Milo wymyśla…';
  try{
    const r=await callAI([{role:'system',content:'Jesteś Milo. Wymyśl jedną krótką, codzienną sytuację społeczną, w której trudno wyrazić emocję. Odpowiedz TYLKO treścią sytuacji, bez cudzysłowu, po polsku, max 20 słów.'},{role:'user',content:'Wymyśl sytuację do ćwiczenia komunikatu Ja.'}]);
    document.getElementById('expressScenario').textContent=r.trim();
    SoundEngine.success();
  }catch(e){
    if(e && e.message==='login_required'){
      alert('Milo online wymaga zalogowania. Zaloguj się w panelu bocznym — bez konta Milo działa lokalnie.');
      return;
    }
    alert('Milo nie mógł teraz odpowiedzieć: '+e.message);
  }
  btn.textContent='✨ Poproś Milo o nową';
}
async function generateSimWithAI(){
  if(!aiSettings.enabled){ alert(window.EmloveOnline
    ? 'Ta funkcja wymaga pełnego Milo. Zaloguj się w panelu bocznym albo dodaj własny klucz w „Klucze API”.'
    : 'Ta funkcja wymaga pełnego Milo, którego włącza administrator aplikacji.'); return; }
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
  const _byok = window.EmloveProviders && window.EmloveProviders.activeProvider()!=='admin';
  const _onlineReady = !!(window.EmloveOnline && window.EmloveAuth && window.EmloveAuth.currentUser());
  if(!aiSettings.enabled && !_byok && !_onlineReady){ alert('Ta funkcja wymaga Milo online — zaloguj się albo wybierz własny klucz w „Klucze API”.'); return; }
  box.style.display='block'; box.textContent='⏳ Milo czyta Twój dziennik…';
  try{
    const data=state.entries.slice(0,20).map(e=>`${e.date} ${e.emotion} siła ${e.intensity}: ${e.what||''} | ${e.iStatement||''}`).join('\n');
    const r=await callAI([{role:'system',content:MILO_SYSTEM_PROMPT+' Na podstawie dziennika napisz krótkie, ciepłe podsumowanie wzorców (nie diagnozuj), nazwij częste emocje i zadaj 2 pytania do refleksji. Max 150 słów.'},{role:'user',content:'Dziennik:\n'+data}]);
    box.textContent='✨ Podsumowanie od Milo:\n'+r;
    lastSummary=r; setMailButton(true);
    TTS.speak(r); SoundEngine.success();
  }catch(e){ box.textContent='Milo nie mógł teraz napisać podsumowania: '+aiErrorMessage(e); lastSummary=''; setMailButton(false); }
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
    // Tekst wiadomości zbieramy ZANIM dodamy przycisk — inaczej TTS czytał
    // etykietę „🔊 Odsłuchaj” na końcu każdej wypowiedzi.
    const clone=node.cloneNode(true);
    clone.querySelectorAll('.who,.speak-btn').forEach(n=>n.remove());
    const txt=clone.textContent.replace(/\s+/g,' ').trim();
    const btn=document.createElement('button');
    btn.className='speak-btn'; btn.textContent=trContent('milo-ui','listen','🔊 Listen');
    btn.onclick=()=>TTS.speak(txt);
    node.appendChild(btn);
  });
};
// Serwer potrafi zwrócić HTTP 200 z treścią, która jest de facto komunikatem
// błędu (np. „Nie udało się wysłać zapytania do modelu. Możliwe przyczyny:
// quota_exceeded…”). Takiego tekstu nie pokazujemy jako wypowiedzi Milo.
function looksLikeServerError(text){
 const s=String(text||'');
 if(!s.trim())return true;
 return /quota_exceeded|quota_unavailable|bad_provider|provider_unavailable|provider_empty|not_configured|unauthorized|invalid_request|too_large|upstream_status|upstream_error/i.test(s)
     || /Nie udało się wysłać zapytania|Możliwe przyczyny/i.test(s);
}
function showTyping(){
  const el=document.getElementById('chatMessages');
  const d=document.createElement('div'); d.className='msg milo'; d.id='typingMsg';
  d.innerHTML='<span class="who">Milo</span><span class="typing"><span></span><span></span><span></span></span> '+escapeHtml(trContent('milo-ui','typing','Milo is typing…'));
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
      const _c=err&&err.code;
      // Przy limicie nie udajemy odpowiedzi — użytkownik ma wiedzieć, że ją stracił.
      reply = (_c==='quota_exceeded'||_c==='limit')
        ? '⚠️ '+aiErrorMessage(err)
        : '⚠️ '+aiErrorMessage(err)+' Odpowiadam po swojemu: '+miloReply(text);
    }
    hideTyping();
    if(looksLikeServerError(reply)){
      reply='Milo nie mógł teraz odpowiedzieć. Najczęstsza przyczyna to wyczerpany limit lub błąd dostawcy modelu — sprawdź klucz API w „Klucze API” i spróbuj ponownie.';
    }
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
  const box=document.getElementById('wheelWordList');if(!box||typeof WHEEL_WORDS==='undefined')return;
  const lang=window.EmloveLocale?.language()||'pl',terms=window.EmloveLocale?.content('wheel-reference-locales','locales.'+lang)||{};
  const ui=(key,fb)=>trContent('library-ui',key,fb),localized=WHEEL_WORDS.map(w=>({...w,word:terms[w.word]||w.word,familyName:terms[w.familyName]||w.familyName,cluster:terms[w.cluster]||w.cluster}));
  const query=(q||'').toLocaleLowerCase(),list=query?localized.filter(w=>`${w.word} ${w.familyName} ${w.cluster}`.toLocaleLowerCase().includes(query)):localized;
  if(!list.length){box.innerHTML=`<p class="muted">${escapeHtml(ui('noWords','No matching words.'))}</p>`;return;}
  const shown=list.slice(0,60);
  box.innerHTML=shown.map(w=>`<div class="wheel-word"><b>${escapeHtml(w.word)}</b><span>${escapeHtml(w.cluster)}</span><i>${escapeHtml(w.familyName)}</i></div>`).join('')+
    (list.length>shown.length?`<p class="muted small">${escapeHtml(ui('shownCount','Showing {shown} of {total} words — refine your search.').replace('{shown}',shown.length).replace('{total}',list.length))}</p>`:'');
}

// ══════════════════════════════════════════════════════════════
// Konto użytkownika i synchronizacja
// ══════════════════════════════════════════════════════════════

/** Stabilne id wpisu — potrzebne do synchronizacji między urządzeniami. */
function newEntryId(){
  try{
    if(window.crypto && crypto.randomUUID) return crypto.randomUUID();
    if(window.crypto && crypto.getRandomValues){
      const b=new Uint8Array(16); crypto.getRandomValues(b);
      return [...b].map(x=>x.toString(16).padStart(2,'0')).join('');
    }
  }catch(e){}
  return 'e'+Date.now().toString(36)+Math.random().toString(36).slice(2,10);
}

/** Wpisy sprzed aktualizacji nie mają id — uzupełniamy je przy starcie. */
function ensureEntryIds(){
  let added=0;
  state.entries.forEach(e=>{
    if(!e.id){ e.id=newEntryId(); e.updatedAt=new Date().toISOString(); added++; }
  });
  if(added && window.EmloveSync){
    state.entries.forEach(e=>EmloveSync.markDirty(e.id));
  }
  return added;
}

// Stan i zapis udostępnione modułowi synchronizacji.
window.EmloveState = state;
window.EmloveSave = saveState;

const AUTH_TEXT = {
  captcha_failed:'Weryfikacja bezpieczeństwa nie powiodła się. Spróbuj ponownie.',
  captcha_unavailable:'Nie udało się wczytać weryfikacji Cloudflare. Sprawdź połączenie.',
  email_taken:'Konto z tym adresem już istnieje. Zaloguj się.',
  email_not_confirmed:'Potwierdź adres e-mail przed zalogowaniem — sprawdź skrzynkę.',
  invalid_credentials:'Nieprawidłowy e-mail lub hasło.',
  weak_password:'Hasło jest za słabe. Użyj co najmniej 8 znaków.',
  email_address_invalid:'Podaj poprawny adres e-mail.',
  email_address_not_authorized:'Ten adres nie jest autoryzowany do rejestracji.',
  user_banned:'To konto zostało zablokowane.',
  over_request_rate_limit:'Zbyt wiele prób. Odczekaj chwilę i spróbuj ponownie.',
  not_configured:'Konto nie jest skonfigurowane w config.js.',
  network:'Brak połączenia. Sprawdź internet i spróbuj ponownie.',
  login_required:'Sesja wygasła. Zaloguj się ponownie.',
  delete_failed:'Nie udało się usunąć konta. Spróbuj ponownie.',
};
const AUTH_CODE_ALIAS = {
  user_already_exists:'email_taken',
  email_exists:'email_taken',
  validation_failed:'email_address_invalid',
  over_email_send_rate_limit:'over_request_rate_limit',
  request_rate_limit_exceeded:'over_request_rate_limit',
  captcha_failed:'captcha_failed',
  bad_jwt:'login_required',
  session_expired:'login_required',
  refresh_token_not_found:'login_required',
};

function authMessage(e, fallback){
  if(!e) return fallback;
  const code = AUTH_CODE_ALIAS[e.code] || e.code;
  const byMessage = AUTH_CODE_ALIAS[e.message] || e.message;
  return (code && AUTH_TEXT[code]) || (byMessage && AUTH_TEXT[byMessage]) || fallback;
}

let authMode = 'login';

function renderAccount(){
  const box=document.getElementById('accountBox');
  if(!box) return;
  const auth=window.EmloveAuth;
  if(!auth || !auth.configured()){
    box.innerHTML='<strong>👤 Konto</strong><p class="muted small">Logowanie nie jest skonfigurowane w config.js.</p>';
    return;
  }
  const user=auth.currentUser();
  if(user && lastSyncText==='Nie zalogowano'){ lastSyncText='Zalogowano'; }
  if(!user){
    box.innerHTML =
      '<strong>👤 Konto</strong>' +
      '<p class="muted small">Zaloguj się, aby zapisać wpisy w chmurze i mieć je na każdym urządzeniu.</p>' +
      '<div class="account-actions">' +
        '<button class="btn btn-small btn-primary" type="button" onclick="openAuth(\'login\')">Zaloguj się</button>' +
        '<button class="btn btn-small btn-ghost" type="button" onclick="openAuth(\'signup\')">Zarejestruj się</button>' +
      '</div>';
    return;
  }
  box.innerHTML =
    '<strong>👤 ' + escapeHtml(user.email || 'Użytkownik') + '</strong>' +
    '<p class="muted small" id="syncStatus">' + escapeHtml(lastSyncText) + '</p>' +
    '<div class="account-actions">' +
      '<button class="btn btn-small btn-ghost" type="button" onclick="syncNow()">Synchronizuj</button>' +
      '<button class="btn btn-small btn-ghost" type="button" onclick="signOutAccount()">Wyloguj</button>' +
    '</div>';
}

let lastSyncText = 'Nie zalogowano';
document.addEventListener('emlove:sync', e => {
  lastSyncText = e.detail && e.detail.text ? e.detail.text : lastSyncText;
  const el = document.getElementById('syncStatus');
  if(el){
    el.textContent = lastSyncText;
    el.className = 'muted small sync-' + (e.detail && e.detail.kind ? e.detail.kind : 'idle');
  }
});
document.addEventListener('emlove:auth', () => { renderAccount(); updateMiloGate(); });

function openAuth(mode){
  authMode = mode || 'login';
  const modal=document.getElementById('authModal');
  if(!modal) return;
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.toggle('active', t.dataset.mode===authMode));
  const pw=document.getElementById('authPassword');
  const pwRow=document.getElementById('authPasswordRow');
  if(pwRow) pwRow.style.display = authMode==='reset' ? 'none' : '';
  const btn=document.getElementById('authSubmit');
  if(btn) btn.textContent = authMode==='login' ? 'Zaloguj się' : authMode==='signup' ? 'Zarejestruj się' : 'Wyślij link resetujący';
  const title=document.getElementById('authTitle');
  if(title) title.textContent = authMode==='login' ? '🔐 Logowanie' : authMode==='signup' ? '✨ Nowe konto' : '🔑 Reset hasła';
  const msg=document.getElementById('authMsg');
  if(msg){ msg.textContent=''; msg.className='auth-msg'; }
  if(pw) pw.value='';
  document.getElementById('authEmail').value = document.getElementById('authEmail').value || '';
  modal.style.display='flex';
  setTimeout(()=>{ const e=document.getElementById('authEmail'); if(e) e.focus(); }, 50);
}

function switchAuthMode(mode){ openAuth(mode); }

function closeAuth(){
  const m=document.getElementById('authModal');
  if(m) m.style.display='none';
}

async function submitAuth(){
  const email=document.getElementById('authEmail').value.trim();
  const password=document.getElementById('authPassword').value;
  const btn=document.getElementById('authSubmit');
  const msg=document.getElementById('authMsg');

  if(!email){ if(msg){ msg.textContent='Podaj adres e-mail.'; msg.className='auth-msg error'; } return; }
  if(authMode!=='reset' && !password){ if(msg){ msg.textContent='Podaj hasło.'; msg.className='auth-msg error'; } return; }
  if(authMode==='signup' && password.length<8){ if(msg){ msg.textContent='Hasło musi mieć co najmniej 8 znaków.'; msg.className='auth-msg error'; } return; }

  const auth=window.EmloveAuth;
  if(!auth){ return; }
  btn.disabled=true;
  if(msg){ msg.textContent='Proszę czekać…'; msg.className='auth-msg'; }

  try{
    const token = await auth.captcha(authMode==='signup' ? 'Potwierdzenie rejestracji' : authMode==='login' ? 'Potwierdzenie logowania' : 'Potwierdzenie resetu hasła');

    if(authMode==='signup'){
      const result = await auth.signUp(email, password, token);
      closeAuth();
      alert(result.needsConfirmation
        ? 'Konto utworzone. Wysłaliśmy link potwierdzający na ' + email + '. Otwórz go, a potem wróć tutaj i zaloguj się.'
        : 'Konto utworzone. Możesz się zalogować.');
      openAuth('login');
    } else if(authMode==='reset'){
      await auth.resetPassword(email, token);
      closeAuth();
      alert('Jeśli konto z tym adresem istnieje, wysłaliśmy link do ustawienia nowego hasła. Sprawdź też folder spam.');
    } else {
      await auth.signIn(email, password, token);
      closeAuth();
      lastSyncText = 'Zalogowano — pobieram wpisy…';
      renderAccount();
      await window.EmloveSync.pull();
      await window.EmloveSync.flush();
    }
  }catch(e){
    if(msg){ msg.textContent = authMessage(e, 'Nie udało się wykonać operacji. Spróbuj ponownie.'); msg.className='auth-msg error'; }
  }finally{
    btn.disabled=false;
  }
}

async function signOutAccount(){
  const auth=window.EmloveAuth;
  if(!auth) return;
  if(!confirm('Wylogować się? Wpisy pozostaną na tym urządzeniu, ale nie będą zapisywane w chmurze.')) return;
  try{ await window.EmloveSync.flush(); }catch(e){}
  await auth.signOut();
  lastSyncText='Nie zalogowano';
  renderAccount();
}

async function syncNow(){
  const el=document.getElementById('syncStatus');
  if(el){ el.textContent='Synchronizuję…'; }
  try{
    await window.EmloveSync.fullSync();
  }catch(e){
    lastSyncText='Nie udało się zsynchronizować';
    renderAccount();
  }
}

async function deleteAccount(){
  const auth=window.EmloveAuth;
  if(!auth || !auth.currentUser()) return;
  if(!confirm('Usunąć konto? To jest trwałe. Zniknie login i zapisane w chmurze wpisy. Wpisy na tym urządzeniu pozostaną.')) return;
  try{
    await auth.deleteAccount();
    lastSyncText='Konto usunięte';
    renderAccount();
    updateMiloGate();
    alert('Konto zostało usunięte.');
  }catch(e){
    alert(authMessage(e,'Nie udało się usunąć konta. Spróbuj ponownie.'));
  }
}

// ── Milo online wymaga teraz zalogowania ────────────────────
function updateMiloGate(){
  const status=document.getElementById('aiStatusTitle'),text=document.getElementById('aiStatusText');
  if(!status||!text)return;
  const auth=window.EmloveAuth,P=window.EmloveProviders,provider=P?P.activeProvider():'admin';
  const byok=provider!=='admin'&&!!P.getApiKey(provider),adminAvailable=!!window.EmloveOnline;
  const loggedIn=!!(auth&&auth.currentUser()),anyOnline=byok||adminAvailable;
  const online=trContent('milo-ui','onlineMode','Milo online'),local=trContent('milo-ui','localMode','Local mode');
  if(loggedIn&&(byok||adminAvailable)){
    status.textContent='🌙 '+online;text.textContent=trContent('milo-ui','onlineText','Your message is sent to the model provider for a reply.');return;
  }
  if(!loggedIn&&anyOnline){
    status.textContent='🌙 '+online;text.textContent=trContent('milo-ui','loginJournal','Sign in through the Journal tab to enable Milo online.');return;
  }
  status.textContent='🌙 '+local;text.textContent=trContent('milo-ui','localText','Milo is available locally.');
}

ensureEntryIds();
renderAccount();
updateMiloGate();

// Przy starcie: jeśli ktoś jest zalogowany, dopasuj chmurę w tle.
// Scalanie idzie po `updated_at`, więc lokalne zmiany nie zostaną nadpisane.
if(window.EmloveAuth && window.EmloveAuth.currentUser() && window.EmloveSync){
  lastSyncText='Synchronizuję…';
  renderAccount();
  window.EmloveSync.pull()
    .then(()=>window.EmloveSync.flush())
    .catch(()=>{ lastSyncText='Nie udało się zsynchronizować'; renderAccount(); });
}

// ── Ponowna wysyłka linku potwierdzającego ──────────────────
// Przydatne, gdy pierwszy link wygasł (Supabase unieważnia go przy kolejnej
// rejestracji albo po 24 h) albo nie doszedł.
async function resendLink(event){
  if(event) event.preventDefault();
  const msg=document.getElementById('authMsg');
  const email=document.getElementById('authEmail').value.trim();
  if(!email){ if(msg){ msg.textContent='Podaj adres e-mail, na który wysłać link.'; msg.className='auth-msg error'; } return; }

  const auth=window.EmloveAuth;
  if(!auth) return;
  if(msg){ msg.textContent='Wysyłam…'; msg.className='auth-msg'; }
  try{
    const token=await auth.captcha('Potwierdzenie ponownej wysyłki');
    await auth.resendConfirmation(email, token);
    if(msg){ msg.textContent='Jeśli konto z tym adresem istnieje, wysłaliśmy nowy link. Sprawdź też folder spam.'; msg.className='auth-msg'; }
  }catch(e){
    if(msg){ msg.textContent=authMessage(e,'Nie udało się wysłać linku. Spróbuj ponownie.'); msg.className='auth-msg error'; }
  }
}

// ══════════════════════════════════════════════════════════════
// Klucze API (BYOK)
// ══════════════════════════════════════════════════════════════

let selectedProvider = 'admin';

function renderKeys(){
  const P = window.EmloveProviders;
  if(!P) return;

  selectedProvider = P.activeProvider();
  const list = document.getElementById('providerList');
  if(!list) return;
  const names=window.EmloveLocale?.content('api-keys','providerNames')||{};
  const help=window.EmloveLocale?.content('api-keys','providerHelp')||{};
  const displayName=id=>names[id]||P.providerById(id)?.label||id;

  list.innerHTML = P.PROVIDERS.map(item => {
    const on = item.id === selectedProvider;
    return '<button type="button" class="provider-item' + (on ? ' active' : '') + '"' +
      ' role="radio" aria-checked="' + (on ? 'true' : 'false') + '"' +
      ' data-provider="' + item.id + '"' +
      ' onclick="chooseProvider(\'' + item.id + '\')">' +
      '<span class="provider-radio' + (on ? ' active' : '') + '"></span>' +
      '<span class="provider-body"><span class="provider-label">' + escapeHtml(displayName(item.id)) + '</span>' +
      '<span class="provider-hint">' + escapeHtml(help[item.id]||item.hint) + '</span></span>' +
      '</button>';
  }).join('');

  const fields = document.getElementById('keyFields');
  const adminHint = document.getElementById('adminHint');
  const current = P.providerById(selectedProvider);

  if(selectedProvider === 'admin'){
    if(fields) fields.hidden = true;
    if(adminHint) adminHint.hidden = false;
  } else {
    if(fields) fields.hidden = false;
    if(adminHint) adminHint.hidden = true;
    const keyEl = document.getElementById('providerKey');
    const modelEl = document.getElementById('providerModel');
    const hintEl = document.getElementById('providerKeyHint');
    if(keyEl){
      keyEl.value = P.getApiKey(selectedProvider);
      keyEl.placeholder = current.keyPrefix ? ('np. ' + current.keyPrefix + '…') : 'sk-…';
    }
    if(modelEl){
      modelEl.value = P.getModel(selectedProvider);
      modelEl.placeholder = current.model;
    }
    if(hintEl) hintEl.textContent = help[selectedProvider]||current.hint;
  }
  updateKeysStatus();
}

function chooseProvider(id){
  const P = window.EmloveProviders;
  if(!P) return;
  selectedProvider = id;
  renderKeys();
  const status = document.getElementById('keysStatus');
  if(status) status.textContent = '';
}

function updateKeysStatus(){
  const label = document.getElementById('chatModeLabel');
  const P = window.EmloveProviders;
  if(!label || !P) return;
  const active = P.activeProvider();
  if(active === 'admin') return;
  const names=window.EmloveLocale?.content('api-keys','providerNames')||{};
  label.textContent=trContent('milo-ui','onlineMode','Milo online')+' · '+(names[active]||P.providerById(active).label);
}

async function saveProviderKey(){
  const P = window.EmloveProviders;
  if(!P) return;
  const status = document.getElementById('keysStatus');
  const keyEl = document.getElementById('providerKey');
  const modelEl = document.getElementById('providerModel');

  const cleanKey = (keyEl ? keyEl.value : '').trim();
  const cleanModel = (modelEl ? modelEl.value : '').trim() || P.providerById(selectedProvider).model;

  if(selectedProvider !== 'admin' && !cleanKey){
    if(status){ status.textContent = 'Wpisz klucz API dla wybranego dostawcy.'; status.className = 'keys-status error'; }
    return;
  }

  P.setActiveProvider(selectedProvider);
  if(selectedProvider !== 'admin'){
    P.setApiKey(selectedProvider, cleanKey);
    P.setModel(selectedProvider, cleanModel);
  }

  const looksValid = selectedProvider === 'admin' || P.keyLooksValid(selectedProvider, cleanKey);
  const label = selectedProvider === 'admin' ? 'klucza administratora' : P.providerById(selectedProvider).label;

  if(status){
    status.textContent = looksValid
      ? 'Zapisano. Milo będzie używał: ' + label + '.'
      : 'Zapisano, ale klucz nie wygląda na klucz ' + label + '. Sprawdź, czy wklejasz właściwy klucz.';
    status.className = 'keys-status' + (looksValid ? '' : ' error');
  }

  updateKeysStatus();
  updateMiloGate();
  SoundEngine.success();
}

function clearProviderKey(){
  const P = window.EmloveProviders;
  if(!P) return;
  if(selectedProvider === 'admin') return;
  if(!confirm('Usunąć klucz ' + P.providerById(selectedProvider).label + ' z tego urządzenia?')) return;
  P.clearApiKey(selectedProvider);
  const status = document.getElementById('keysStatus');
  if(status){ status.textContent = 'Usunięto klucz z urządzenia.'; status.className = 'keys-status'; }
  renderKeys();
}

// Czyszczenie danych urządzenia ma objąć też klucze.
document.addEventListener('emlove:clearLocal', () => {
  if(!window.EmloveProviders) return;
  window.EmloveProviders.PROVIDERS.forEach(p => window.EmloveProviders.clearApiKey(p.id));
});

// ══════════════════════════════════════════════════════════════
// Podsumowanie mailem
// ══════════════════════════════════════════════════════════════

let lastSummary = '';

function setMailButton(enabled){
  const btn=document.getElementById('sendMailBtn');
  if(btn) btn.disabled = !enabled;
}

async function sendSummaryMail(){
  if(!lastSummary.trim()){
    alert('Najpierw wygeneruj podsumowanie — kliknij „✨ Podsumowanie od Milo”.');
    return;
  }
  if(!window.EmloveSummaryMail) return;

  const btn=document.getElementById('sendMailBtn');
  const original=btn ? btn.textContent : '';
  if(btn){ btn.disabled=true; btn.textContent='📧 Wysyłanie…'; }

  try{
    const to=await window.EmloveSummaryMail.send(lastSummary);
    const box=document.getElementById('aiSummary');
    if(box){
      box.textContent='✅ Wysłano na ' + to + '.\n\n' + lastSummary;
      box.style.display='block';
    }
    SoundEngine.success();
  }catch(e){
    alert(window.EmloveSummaryMail.messageOf(e,'Nie udało się wysłać podsumowania.'));
  }finally{
    if(btn){ btn.disabled=false; btn.textContent=original||'📧 Wyślij mailem'; }
  }
}

// ══════════════════════════════════════════════════════════════
// Czytelne komunikaty błędów AI
// ══════════════════════════════════════════════════════════════

function aiErrorMessage(e){
  const code = e && e.code ? e.code : (e && e.message) || '';
  const source = e && e.source ? e.source : '';
  const label = source === 'byok' ? 'funkcja milo-mobile-byok'
    : source === 'private26' ? 'funkcja milo-mobile-private26' : '';

  const map = Object.assign({},
    window.EmloveByok ? window.EmloveByok.MESSAGES : {},
    window.EmloveOnline ? window.EmloveOnline.MESSAGES : {},
    {
      bad_provider: 'Funkcja nie rozpoznaje wybranego dostawcy.',
      bad_key: 'Klucz API jest nieprawidłowy.',
      bad_model: 'Nazwa modelu jest nieprawidłowa.',
      bad_text: 'Wiadomość jest pusta albo za długa.',
      invalid_request: 'Żądanie jest niepoprawne.',
      quota_exceeded: 'Osiągnięto dzienny limit rozmów. Spróbuj ponownie jutro.',
      provider_unavailable: 'Dostawca modelu jest chwilowo niedostępny. Spróbuj za chwilę.',
      provider_empty: 'Model nie zwrócił odpowiedzi. Spróbuj ponownie.',
      unavailable: 'Serwer jest chwilowo niedostępny. Spróbuj ponownie.',
      quota_unavailable: 'Nie udało się sprawdzić limitu.',
      mail_failed: 'Nie udało się wysłać maila.',
    });

  const text = map[code];
  // Znamy kod → sam przyjazny komunikat. Nazwa funkcji i surowy kod
  // trafiały wcześniej do dymka Milo i wyglądały jak błąd dla użytkownika.
  if(text) return text;
  // Nieznanego kodu nie tłumaczymy na siłę — zostawiamy go do zgłoszenia.
  if(!code) return 'Milo nie mógł teraz odpowiedzieć.';
  return 'Milo nie mógł teraz odpowiedzieć.' + (label ? ' (' + label + ': ' + code + ')' : ' (' + code + ')');
}
