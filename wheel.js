// Emlove — koło emocji 3-poziomowe (rodzina → klaster → słowo precyzyjne)
// Zbudowane na podstawie koła emocji dostarczonego przez użytkownika.

// Koło emocji Emlove — struktura trójpoziomowa
// Zbudowane na podstawie koła emocji dostarczonego przez użytkownika (wersja polska, 3 pierścienie).
// Poziom 1: 8 rodzin. Poziom 2: klastry (niuanse). Poziom 3: słowa precyzyjne.


/*
  id: string;
  name: string;
  gen: string;
  color: string;
  soft: string;
  emoji: string;
*/

const WHEEL_FAMILIES = [
  {
    id: 'joy', name: 'Radość', gen: 'radości', color: '#0F8C86', soft: '#E4F3F1', emoji: '☀️',
    signal: 'rozluźnione ramiona, ciepło w klatce piersiowej, łatwiejszy oddech, uśmiech w oczach',
    need: 'dzielenie się, zatrzymanie chwili, wdzięczność',
    clusters: [
      { name: 'Radość spokojna', words: ['spokojny', 'czujący bliskość', 'akceptowany', 'wdzięczny', 'czuły', 'kochający'] },
      { name: 'Radość żywa', words: ['wesoły', 'figlarny', 'energiczny', 'zuchwały', 'pobudzony', 'ochoczy', 'pełen energii'] },
      { name: 'Spełnienie', words: ['dumny', 'doceniony', 'ważny', 'szanowany', 'pewny siebie', 'pełen siły', 'odważny', 'kreatywny', 'zainspirowany', 'pełen nadziei'] },
    ],
    questions: ['Co dokładnie sprawiło, że zrobiło się ciepło?', 'Z kim chcesz się tym podzielić?', 'Jak chcesz to zapamiętać?'],
  },
  {
    id: 'surprise', name: 'Zaskoczenie', gen: 'zaskoczenia', color: '#E08A4A', soft: '#FDF0E4', emoji: '✨',
    signal: 'podniesione brwi, wstrzymany oddech, rozszerzone oczy, chwilowe zatrzymanie',
    need: 'czas na przetworzenie, informacja, orientacja',
    clusters: [
      { name: 'Zdziwienie', words: ['zaskoczony', 'zdziwiony', 'zdumiony', 'oszołomiony', 'zmieszany'] },
      { name: 'Ciekawość', words: ['zaciekawiony', 'zainteresowany', 'podekscytowany', 'żartobliwy', 'zadziwiony'] },
    ],
    questions: ['Czego się nie spodziewałeś/spodziewałaś?', 'Co teraz chcesz wiedzieć?', 'Czy to zaskoczenie jest raczej ciekawe, czy trudne?'],
  },
  {
    id: 'anger', name: 'Złość', gen: 'złości', color: '#C2435E', soft: '#FBE7EC', emoji: '🔥',
    signal: 'napięta szczęka, ciepło w twarzy, przyspieszony oddech, napięte ramiona, zaciśnięte dłonie',
    need: 'granica, sprawiedliwość, usłyszenie „to nie jest ok”',
    clusters: [
      { name: 'Irytacja', words: ['zirytowany', 'poirytowany', 'zniecierpliwiony', 'krytyczny', 'oskarżający'] },
      { name: 'Frustracja', words: ['sfrustrowany', 'bezsilny', 'pod presją', 'rozdrażniony', 'zdystansowany'] },
      { name: 'Gniew', words: ['rozgniewany', 'oburzony', 'agresywny', 'wzburzony', 'pełen gniewu', 'zbuntowany', 'wściekły'] },
    ],
    questions: ['Jaka granica została dotknięta?', 'Czego ta złość broni?', 'Co chcesz powiedzieć — nawet jeśli jeszcze nie teraz?'],
  },
  {
    id: 'disgust', name: 'Niechęć', gen: 'niechęci', color: '#4F8A63', soft: '#EAF4EC', emoji: '🌿',
    signal: 'cofnięcie głowy, skrzywienie ust, napięcie w żołądku, chęć odsunięcia się',
    need: 'dystans, ochrona wartości, wybór',
    clusters: [
      { name: 'Niechęć', words: ['niechętny', 'nieufny', 'sceptyczny', 'podejrzliwy', 'obojętny', 'niepewny'] },
      { name: 'Pogarda', words: ['pogardliwy', 'sarkastyczny', 'krytykancki', 'antypatyczny', 'zdegustowany', 'obrzydzony', 'czujący odrazę'] },
    ],
    questions: ['Co dokładnie Ci nie odpowiada?', 'Czy to o ciele, czy o wartościach?', 'Co chcesz od siebie odsunąć?'],
  },
  {
    id: 'sad', name: 'Smutek', gen: 'smutku', color: '#2F6F9B', soft: '#E7F1F8', emoji: '🌧️',
    signal: 'ciężar w klatce piersiowej, pieczenie w gardle, opadnięte ramiona, wolniejszy oddech',
    need: 'bliskość, pocieszenie, czas, płacz',
    clusters: [
      { name: 'Samotność', words: ['samotny', 'odizolowany', 'porzucony', 'opuszczony', 'odrzucony', 'wyobcowany', 'niepasujący'] },
      { name: 'Ból', words: ['zraniony', 'cierpiący', 'w bólu', 'załamany', 'skruszony', 'wycieńczony'] },
      { name: 'Przygnębienie', words: ['przygnębiony', 'przybity', 'zrezygnowany', 'zawiedziony', 'rozczarowany', 'bezradny', 'zniechęcony'] },
    ],
    questions: ['Czego ten smutek potrzebuje najbardziej?', 'Kto mógłby teraz być obok?', 'Gdyby smutek miał głos — co by powiedział?'],
  },
  {
    id: 'fear', name: 'Lęk i strach', gen: 'lęku i strachu', color: '#7B62C4', soft: '#F0EBFB', emoji: '🌫️',
    signal: 'ścisk w żołądku, przyspieszone serce, spięte barki, płytki oddech, zimne dłonie',
    need: 'bezpieczeństwo, przewidywalność, wsparcie, informacja',
    clusters: [
      { name: 'Lęk', words: ['lękliwy', 'zaniepokojony', 'zmartwiony', 'zatroskany', 'lęk przed oceną', 'zdenerwowany'] },
      { name: 'Strach', words: ['przestraszony', 'przerażony', 'spanikowany', 'onieśmielony', 'spięty', 'wystraszony'] },
      { name: 'Bezradność', words: ['bezradny', 'przytłoczony', 'uległy', 'niepewny', 'osamotniony w strachu'] },
    ],
    questions: ['Czego dokładnie się boisz?', 'Co realnie masz pod kontrolą?', 'Jakiego wsparcia potrzebujesz w tej chwili?'],
  },
  {
    id: 'shame', name: 'Wstyd i uraza', gen: 'wstydu i urazy', color: '#A84C74', soft: '#FBEBF1', emoji: '🫧',
    signal: 'gorąco w twarzy, spuszczony wzrok, chęć zniknięcia, napięcie w szyi',
    need: 'akceptacja, szacunek, naprawa relacji, wybaczenie sobie',
    clusters: [
      { name: 'Wstyd', words: ['zażenowany', 'zawstydzony', 'skrępowany', 'upokorzony', 'ośmieszony', 'niepewny siebie'] },
      { name: 'Uraza', words: ['urażony', 'zlekceważony', 'zdradzony', 'niesprawiedliwie potraktowany', 'gorszy od innych'] },
      { name: 'Wina', words: ['winny', 'skruszony', 'zawiedziony sobą', 'żałujący'] },
    ],
    questions: ['Czyj głos słyszysz, gdy się wstydzisz?', 'Co ten wstyd chce ochronić?', 'Co powiedziałbyś przyjacielowi w tej sytuacji?'],
  },
  {
    id: 'calm', name: 'Spokój i siła', gen: 'spokoju i siły', color: '#177E77', soft: '#E7F6F4', emoji: '🌊',
    signal: 'swobodny oddech, rozluźniona szczęka, stabilne nogi, ciche ciało',
    need: 'kontynuacja, odpoczynek, bycie sobą',
    clusters: [
      { name: 'Spokój', words: ['spokojny', 'zrelaksowany', 'bezpieczny', 'uważny', 'senny', 'wolny'] },
      { name: 'Siła', words: ['pełen siły', 'pewny siebie', 'akceptowany', 'doceniony', 'odważny', 'szanowany', 'dumny'] },
    ],
    questions: ['Co sprawiło ten spokój?', 'Gdzie w ciele jest Ci teraz dobrze?', 'Jak możesz do tego wracać w trudnym dniu?'],
  },
];

// Płaska lista do wyszukiwania w bibliotece
const WHEEL_WORDS =
  WHEEL_FAMILIES.flatMap(f =>
    f.clusters.flatMap(c =>
      c.words.map(w => ({ word: w, familyId: f.id, familyName: f.name, cluster: c.name, color: f.color }))
    )
  );
