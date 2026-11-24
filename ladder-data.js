// ============================================================
// Drabina emocji — treść zadań
//
// Każdy scenariusz ma DOKŁADNIE 4 pytania, ułożone od najłatwiejszego.
// Poziom 1 bierze pierwsze 2, poziom 2 pierwsze 3, poziom 3 wszystkie 4.
//
// Format pytania: [treść, [poprawna, zła, zła, zła]]
// Poprawna odpowiedź jest ZAWSZE pierwsza — silnik losuje kolejność.
// ============================================================

const SCENARIOS = [

// ── POZIOM 1 · codzienne sytuacje ───────────────────────────
{id:'kolejka', title:'Ktoś przeszedł przed Tobą', story:'Stoisz w kolejce do kasy. Człowiek, który stał daleko za Tobą, podchodzi i staje przed Tobą. Nikt nic nie mówi. Ty też milczysz.', qs:[
 ['Co najbardziej czujesz w tej chwili?',['Złość, że ktoś Cię zignorował','Radość z szybkiej obsługi','Wdzięczność','Nudę']],
 ['Dlaczego nic nie powiedziałeś?',['Bo nie chciałeś robić sceny','Bo Ci to nie przeszkadzało','Bo lubisz kolejki','Bo go znasz']],
 ['Co by Ci pomogło?',['Spokojne powiedzenie, że to Twoja kolej','Głośne krzyknięcie','Uderzenie w stół','Odejście bez słowa']],
 ['Czego możesz potrzebować?',['Szacunku i jasności','Nowych znajomych','Pochwały','Presentu']]]},

{id:'odpis', title:'Kolega nie odpisuje', story:'Napisałeś do kolegi rano. Jest wieczór i nadal nie ma odpowiedzi. Widzisz, że był online. Zaczynasz myśleć, że coś go obraziło.', qs:[
 ['Co prawdopodobnie czujesz?',['Niepokój i złość','Radość','Wdzięczność','Spokój']],
 ['Co może oznaczać brak odpowiedzi?',['Wiele rzeczy — nie musi być nic złego','Na pewno jest na Ciebie zły','Chce zakończyć znajomość','Nie czyta wiadomości']],
 ['Dlaczego wymyślasz najgorsze?',['Bo niepokój lubi dopowiadać','Bo zawsze masz rację','Bo znasz jego myśli','Bo tak jest w filmach']],
 ['Co możesz zrobić?',['Zapytać wprost, czy wszystko gra','Napisać złą wiadomość','Usunąć go z kontaktów','Czekać w milczeniu']]]},

{id:'lunch', title:'Zjadł Twój lunch', story:'W lodówce w pracy leżał Twój obiad. Kiedy przyszła przerwa, pudełko było puste. Ktoś je zjadł i nie zostawił karteczki.', qs:[
 ['Co czujesz?',['Złość i zawód','Radość','Wdzięczność','Obojętność']],
 ['Dlaczego to boli?',['Bo ktoś wziął coś, co było Twoje','Bo lubisz gotować','Bo jestem głodny','Bo obiad był smaczny']],
 ['Co możesz zrobić?',['Zapytać, kto to zrobił','Zjeść komuś inny lunch','Nic — to tylko obiad','Napisać złośliwą karteczkę']],
 ['Czego możesz potrzebować?',['Szacunku do swoich rzeczy','Nowego pudełka','Większej lodówki','Pochwały']]]},

{id:'halas', title:'Hałas w nocy', story:'Jest trzecia w nocy. Sąsiad słucha muzyki tak głośno, że słychać ją u Ciebie. Jutro masz wstać wcześnie. Nie możesz zasnąć.', qs:[
 ['Co czujesz?',['Złość i zmęczenie','Radość','Wdzięczność','Spokój']],
 ['Dlaczego to jest trudne?',['Bo nie masz wpływu na sytuację','Bo lubisz muzykę','Bo masz dużo czasu','Bo sąsiad jest miły']],
 ['Co możesz zrobić?',['Poprosić o ciszej albo zadzwonić','Wyłączyć prąd w całym bloku','Krzyknąć przez ścianę','Przeprowadzić się nocą']],
 ['Czego możesz potrzebować?',['Ciszy i snu','Nowej muzyki','Lepszych słuchawek','Więcej kawy']]]},

{id:'pochwala', title:'Pochwała przy wszystkich', story:'Na spotkaniu szef mówi: „To dzięki Tobie ten projekt doszedł do skutku". Wszyscy patrzą. Kiwasz głową i mówisz „nie ma za co".', qs:[
 ['Co możesz czuć?',['Dumę i trochę skrępowanie','Złość','Wstręt','Nudę']],
 ['Dlaczego trudno przyjąć pochwałę?',['Bo uwaga wielu osób bywa niezręczna','Bo pochwała zawsze kłamie','Bo szef się myli','Bo nie lubisz ludzi']],
 ['Co zrobić, gdy dostajesz pochwałę?',['Podziękować i przyjąć ją',' Zaprzeczyć i pomniejsić','Wyjść z sali','Zmienić temat']],
 ['Co ta pochwała mówi o Twojej pracy?',['Że była ważna i zauważona','Że była bezwartościowa','Że to przypadek','Że szef coś kombinuje']]]},

{id:'prezent', title:'Prezent, który Ci się nie podoba', story:'Dostajesz prezent. Starannie zapakowany. W środku coś, czego nie lubisz i nie użyjesz. Osoba, która go dała, patrzy z nadzieją.', qs:[
 ['Co możesz czuć?',['Wdzięczność i zakłopotanie','Złość','Nienawiść','Obojętność']],
 ['Dlaczego to niezręczne?',['Bo wdzięczność i rozczarowanie mogą iść razem','Bo prezenty zawsze są złe','Bo nie lubisz dostawać','Bo osoba jest niemiła']],
 ['Co możesz powiedzieć?',['Dziękuję, to miłe że o mnie pomyślałeś','To mi się nie podoba','Po co mi to','Zwrócę do sklepu']],
 ['Co jest ważniejsze niż sam prezent?',['Że ktoś o Tobie pomyślał','Cena','Marka','Opakowanie']]]},

{id:'autobus', title:'Spóźniłeś się na autobus', story:'Biegniesz na przystanek. Drzwi zamykają się tuż przed Tobą. Kierowca widzi Cię i odjeżdża. Następny autobus za 40 minut.', qs:[
 ['Co czujesz?',['Frustrację i złość','Radość','Wdzięczność','Spokój']],
 ['Dlaczego to tak denerwuje?',['Bo się starałeś i nie zdążyłeś','Bo lubisz czekać','Bo masz wolny dzień','Bo kierowca Cię zna']],
 ['Co możesz teraz zrobić?',['Zadzwonić, że spóźnisz się','Krzyknąć na kierowcę','Wrócić do domu na zawsze','Zepsuć przystanek']],
 ['Czego możesz potrzebować?',['Odrobiny spokoju','Nowego autobusu','Wiecznego biletu','Kawy']]]},

{id:'sekret', title:'Koleżanka powiedziała Twoją tajemnicę', story:'Powierzyłeś koleżance coś ważnego i poprosiłeś, żeby nie mówiła. Dziś usłyszałeś to od osoby trzeciej. Koleżanka zachowuje się, jakby nic się nie stało.', qs:[
 ['Co czujesz?',['Zdradzenie i zawód','Radość','Wdzięczność','Spokój']],
 ['Dlaczego to boli?',['Bo zaufanie zostało złamane','Bo tajemnica była głupia','Bo osoba trzecia jest miła','Bo lubisz plotki']],
 ['Co możesz zrobić?',['Powiedzieć jej, że wiesz i jak się czujesz','Rozpowiedzieć jej sekret','Uśmiechać się i milczeć','Zniknąć']],
 ['Czego możesz potrzebować?',['Wyjaśnienia i przeprosin','Nowych znajomych','Większej tajemnicy','Zemsty']]]},

{id:'pomoc', title:'Ktoś pomógł bez proszenia', story:'Niesiesz ciężkie torby. Nieznajomy podchodzi, bierze jedną i niesie do drzwi. Nie chciał podziękowania, tylko poszedł dalej.', qs:[
 ['Co czujesz?',['Wdzięczność i zaskoczenie','Złość','Wstręt','Strach']],
 ['Dlaczego to miłe?',['Bo ktoś pomógł, nie oczekując niczego','Bo byłeś słaby','Bo torby były lekkie','Bo lubisz obcych']],
 ['Co możesz zrobić?',['Podziękować i zapamiętać ten gest','Dać mu pieniądze','Uciec','Nic — to normalne']],
 ['Co ten gest mówi o ludziach?',['Że pomoc bywa bezinteresowna','Że wszyscy czegoś chcą','Że ludzie są źli','Że lepiej nie ufać']]]},

{id:'mama', title:'Mama pyta, czy jadłeś', story:'Mama dzwoni i pyta, czy jadłeś. Odpowiadasz, że tak. Ona pyta jeszcze dwa razy. Zaczyna Cię to irytować.', qs:[
 ['Co możesz czuć?',['Irrytację i ciepło naraz','Czystą złość','Obojętność','Strach']],
 ['Dlaczego ona pyta?',['Bo tak okazuje troskę','Bo chce Cię kontrolować','Bo nie ma co robić','Bo nie wierzy w lekarzy']],
 ['Co możesz powiedzieć?',['Mamo, dziękuję, ale zjadłem i jestem najedzony','Przestań pytać','Nie dzwoń więcej','Nic']],
 ['Co jest pod jej pytaniem?',['Obawa o Ciebie','Chęć złośliwości','Nuda','Chęć kłótni']]]},

{id:'podwyzka', title:'Nie dostałeś podwyżki', story:'Mówiono Ci, że podwyżki będą w tym roku. Dowiedziałeś się, że jej nie ma. Kolega z Twojego zespołu dostał. Szef mówi, że „sytuacja jest trudna".', qs:[
 ['Co czujesz?',['Zawód i poczucie niesprawiedliwości','Radość','Wdzięczność','Spokój']],
 ['Dlaczego to boli bardziej, że kolega dostał?',['Bo porównanie się wzmienia','Bo kolega jest niemiły','Bo lubisz kolegę','Bo szef kłamie']],
 ['Co możesz zrobić?',['Zapytać wprost, co wpłynęło na decyzję','Od razu rzucić pracę','Zrobić koledze na złość','Milczeć i się wściekać']],
 ['Czego możesz potrzebować?',['Wyjaśnienia i planu','Nowej pracy od jutra','Zemsty','Pochwały']]]},

{id:'przerwanie', title:'Przerwały Ci w pół zdania', story:'Mówisz coś na spotkaniu. W połowie zdania ktoś wchodzi Ci w słowo i mówi coś innego. Wszyscy słuchają jego. Twoja myśl znika.', qs:[
 ['Co czujesz?',['Złość i pominięcie','Radość','Wdzięczność','Nudę']],
 ['Dlaczego to niemiłe?',['Bo nie pozwolono Ci dokończyć','Bo mówisz za cicho','Bo twoja myśl była głupia','Bo lubisz przerywać']],
 ['Co możesz zrobić?',['Wrócić do niej: „Chciałbym dokończyć myśl"','Przerwać jemu','Uśmiechnąć się i dać za wygraną','Wyjść']],
 ['Czego możesz potrzebować?',['Przestrzeni do dokończenia','Nowego zespołu','Mikrofonu','Autorytetu']]]},

{id:'odwolane', title:'Spotkanie odwołane w ostatniej chwili', story:'Umówiłeś się ze znajomym na weekend. Godzinę przed spotkaniem pisze, że nie może. Już byłeś gotowy i wyszedłeś z domu.', qs:[
 ['Co czujesz?',['Zawód i złość','Radość','Wdzięczność','Spokój']],
 ['Dlaczego to denerwuje?',['Bo czekałeś i się przygotowałeś','Bo lubisz czekać','Bo masz dużo czasu','Bo znajomy jest niemiły']],
 ['Co możesz zrobić?',['Powiedzieć, że Ci zależało','Napisać złośliwie','Zniknąć','Zrobić mu na złość']],
 ['Czego możesz potrzebować?',['Poważnego traktowania','Nowego znajomego','Więcej planów','Spokoju']]]},

{id:'wiatr', title:'Deszcz bez parasola', story:'Wychodzisz z domu. Niebo jest szare, ale nie pada. Po drodze zaczyna padać. Nie masz parasola. Wracasz mokry.', qs:[
 ['Co możesz czuć?',['Irrytację i zmęczenie','Radość','Wdzięczność','Spokój']],
 ['Dlaczego to denerwuje?',['Bo nie mogłeś się przygotować','Bo lubisz deszcz','Bo masz nową kurtkę','Bo lubisz wracać']],
 ['Co możesz zrobić?',['Przebrać się i wypić coś ciepłego','Złościć się cały dzień','Obwiniać pogodę','Nie wychodzić z domu']],
 ['Czego możesz potrzebować?',['Chwili na wyschnięcie','Nowego parasola','Zmiany pogody','Spokoju']]]},

{id:'balagan', title:'Bałagan w domu', story:'Wracasz zmęczony. Na stole brudne naczynia, na podłodze ubrania. Nikt nie sprzątał, choć było ustalone, że będzie czysto.', qs:[
 ['Co czujesz?',['Złość i zmęczenie','Radość','Wdzięczność','Spokój']],
 ['Dlaczego to dotyka?',['Bo umowa nie została dotrzymana','Bo lubisz bałagan','Bo masz mało ubrań','Bo naczynia są ładne']],
 ['Co możesz zrobić?',['Powiedzieć, jak się czujesz, i ustalić zasady','Krzyknąć','Sprzątać w milczeniu i wściekać się','Wyprowadzić się']],
 ['Czego możesz potrzebować?',['Współpracy','Nowego domu','Sprzątaczki','Ciszy']]]}
];

// ── POZIOM 2 · trudniejsze relacje ──────────────────────────
SCENARIOS.push(

{id:'odwoluje', title:'Zawsze umawia się i odwołuje', story:'Przyjaciel regularnie umawia się na spotkania i odwołuje je dzień albo dwa wcześniej. Za każdym razem ma powód. Przestajesz robić sobie plany.', qs:[
 ['Co możesz czuć?',['Zawód i zmęczenie','Radość','Wdzięczność','Nudę']],
 ['Co może oznaczać taki wzorzec?',['Że coś go powstrzymuje — warto zapytać','Że Cię nienawidzi','Że jest leniwy','Że lubi odwoływać']],
 ['Dlaczego przestajesz planować?',['Bo nie chcesz again zawieść się','Bo nie lubisz ludzi','Bo masz mało czasu','Bo lubisz siedzieć']],
 ['Co możesz zrobić?',['Powiedzieć, jak to wpływa na Ciebie','Od razu zakończyć znajomość','Odwoływać swoje spotkania','Milczeć i mieć żal']]]},

{id:'piatek', title:'Zadania w piątek wieczorem', story:'Szef wysyła Ci zadania w piątek po południu, na poniedziałek. Dzieje się tak regularnie. Nie masz czasu na weekend.', qs:[
 ['Co czujesz?',['Frustrację i zmęczenie','Radość','Wdzięczność','Spokój']],
 ['Dlaczego to problem?',['Bo weekend to odpoczynek, nie praca','Bo zadania są trudne','Bo nie lubisz szefa','Bo piątek jest długi']],
 ['Co możesz zrobić?',['Ustalić granicę: pilne tylko naprawdę pilne','Ignorować','Zmienić pracę','Skarżyć się kolegom']],
 ['Czego możesz potrzebować?',['Jasnych zasad','Nowego telefonu','Mniej pieniędzy','Więcej pracy']]]},

{id:'telefon', title:'Telefon podczas rozmowy', story:'Opowiadasz coś ważnego. Druga osoba przez cały czas zerka na telefon i odpisuje na wiadomości. Mówi, że słucha.', qs:[
 ['Co możesz czuć?',['Pominięcie i złość','Radość','Wdzięczność','Spokój']],
 ['Dlaczego to rani?',['Bo uwaga jest formą szacunku','Bo telefon jest drogi','Bo lubisz gadat','Bo osoba jest zajęta']],
 ['Co możesz powiedzieć?',['„Potrzebuję, żebyś posłuchał bez telefonu"','„Jesteś beznadziejny"','Nic i mieć żal','Zabrać telefon']],
 ['Co jest pod Twoją złością?',['Potrzeba bycia ważnym','Chęć kontroli','Nuda','Zazdrość o telefon']]]},

{id:'coltam', title:'Pyta, ale nie słucha', story:'Ktoś pyta „co tam u Ciebie?". Zaczynasz opowiadać. Po chwili przerywa i mówi o sobie. Nie pyta o nic więcej.', qs:[
 ['Co możesz czuć?',['Zawód i samotność','Radość','Wdzięczność','Nudę']],
 ['Dlaczego to nieprzyjemne?',['Bo pytanie było tylko formą','Bo mówisz za długo','Bo osoba jest ciekawa','Bo nie lubisz pytań']],
 ['Co możesz zrobić?',['Zapytać, czy chce posłuchać','Przerwać i pójść','Mówić głośniej','Zrobić to samo']],
 ['Czego możesz potrzebować?',['Zainteresowania i uwagi','Nowego rozmówcy','Mniej słów','Spokoju']]]},

{id:'porownanie', title:'Porównanie do rodzeństwa', story:'Rodzic mówi: „Twój brat w twoim wieku już miał pracę i rodzinę". Ty masz inny plan. Rodzic powtarza to przy okazji.', qs:[
 ['Co możesz czuć?',['Zawód i poczucie bycia gorszym','Radość','Wdzięczność','Spokój']],
 ['Dlaczego porównania bolą?',['Bo mierzą Cię cudzą miarą','Bo brat jest lepszy','Bo rodzic kocha brata','Bo nie lubisz rodziny']],
 ['Co możesz zrobić?',['Powiedzieć, że masz swoją drogę','Przestać rozmawiać z rodzeństwem','Zrobić wszystko jak brat','Krzyknąć']],
 ['Czego możesz potrzebować?',['Uznania własnej drogi','Nowego brata','Większej rodziny','Spokoju']]]},

{id:'kredit', title:'Ktoś bierze kredit za Twoją pracę', story:'Zrobiłeś większość zadania. Na spotkaniu współpracownik przedstawia je jako wspólne, ale mówi głównie o swoim udziale. Szef go chwali.', qs:[
 ['Co czujesz?',['Złość i niesprawiedliwość','Radość','Wdzięczność','Spokój']],
 ['Dlaczego to boli?',['Bo Twoja praca została pominięta','Bo szef jest miły','Bo lubisz współpracę','Bo zadanie było łatwe']],
 ['Co możesz zrobić?',['Spokojnie wskazać swój wkład','Zrobić mu przykrość','Milczeć i mieć żal','Zniszczyć projekt']],
 ['Czego możesz potrzebować?',['Uznania','Nowego zajęcia','Mniej pracy','Zemsty']]]},

{id:'pieniadze', title:'Pożycza pieniądze i nie oddaje', story:'Znajomy pożyczył pieniądze „na tydzień". Minęły trzy miesiące. Kiedy o tym wspominasz, mówi, że zaraz odda. Czujesz się niezręcznie.', qs:[
 ['Co czujesz?',['Złość i niezręczność','Radość','Wdzięczność','Spokój']],
 ['Dlaczego trudno o tym mówić?',['Bo temat pieniędzy jest wrażliwy','Bo lubisz pożyczać','Bo znajomy jest bogaty','Bo nie potrzebujesz pieniędzy']],
 ['Co możesz zrobić?',['Powiedzieć wprost i ustalić termin','Napisać do jego rodziny','Zniknąć','Zrobić mu scenę']],
 ['Czego możesz potrzebować?',['Zwrotu i jasności','Nowych znajomych','Mniej pieniędzy','Ostrzejszych słów']]]}
);

// ── POZIOM 3 · głębsze mechanizmy ────────────────────────────
SCENARIOS.push(

{id:'usmiech', title:'Uśmiech na spotkaniu', story:'Kierownik mówi pracownikowi, że jego projekt został odrzucony. Pracownik uśmiecha się, kiwa głową i mówi: „Oczywiście, rozumiem. Nie ma problemu". Po spotkaniu nie rozmawia z nikim, szybko wychodzi z budynku i odmawia udziału we wspólnym obiedzie.', qs:[
 ['Co on prawdopodobnie czuje?',['Złość i zawód, choć tego nie pokazuje','Radość, że projekt odrzucono','Nic — skoro się uśmiecha','Wstyd, że mu się udało']],
 ['Dlaczego uśmiechał się na spotkaniu?',['Bo w pracy trudno pokazać, że coś boli','Bo go to ucieszyło','Bo zawsze się uśmiecha','Bo chciał zranić kierownika']],
 ['Co pomoże mu najbardziej po takim dniu?',['Rozmowa z kimś, komu ufa','Ucieczka od ludzi','Ukrywanie, że coś się stało','Złość na kierownika']],
 ['Czego może potrzebować od innych?',['Uznania, że to trudna sytuacja','Rad, co robić dalej','Pochwały za uśmiech','Pouczenia, że trzeba być twardszym']]]},

{id:'pewnoscsiebie', title:'Nadmierna pewność siebie', story:'Mężczyzna podczas dyskusji nieustannie podkreśla swoje kompetencje. Gdy ktoś przedstawia odmienną opinię, przerywa mu: „Zajmuję się tym od lat, wiem lepiej". W prywatnej rozmowie przyznaje, że obawia się utraty stanowiska.', qs:[
 ['Co może kryć się pod tą pewnością?',['Lęk przed utratą stanowiska','Prawdziwa pewność siebie','Chęć pomocy','Nuda']],
 ['Dlaczego zachowanie różni się od odczuć?',['Bo pewność bywa zbroją','Bo on kłamie dla zabawy','Bo nie wie, co czuje','Bo lubi się skrywać']],
 ['Czy to musi być świadoma manipulacja?',['Nie — często to mechanizm obronny','Tak, zawsze','Tak, ale rzadko','Nie wiem']],
 ['Co może pomóc?',['Uznanie jego kompetencji i spokojna rozmowa','Publiczne zdemaskowanie','Unikanie go','Zmiana stanowiska']]]},

{id:'milczenie', title:'Milczenie jako komunikat', story:'Kobieta na rodzinnym spotkaniu dowiaduje się, że brat podjął ważną decyzję bez konsultacji. Nie okazuje złości, nie komentuje, odpowiada krótkimi zdaniami. Następnego dnia zachowuje się, jakby nic się nie stało.', qs:[
 ['Co może znaczyć jej milczenie?',['Żę jest zraniona i nie chce mówić','Że jej wszystko jedno','Że nie słyszała','Że jest zmęczona']],
 ['Czy unikanie konfliktu oznacza brak emocji?',['Nie — emocje mogą być silne, ale ukryte','Tak, zawsze','Nie, nigdy','Nie wiem']],
 ['Jak odróżnić wycofanie od karania ciszą?',['Po czasie i intencji','Po tonie głosu','Po ubiorze','Po godzinie']],
 ['Co może pomóc?',['Danie jej przestrzeni i otwarte pytanie','Zmuszanie do rozmowy','Komentowanie milczenia','Zrobienie jej na złość']]]},

{id:'kontrola', title:'Potrzeba kontroli', story:'Osoba A organizuje wyjazd. Ustala godziny, miejsca, posiłki i trasę. Gdy ktoś proponuje zmianę, reaguje irytacją. Mówi: „Chcę, żeby wszystkim było dobrze".', qs:[
 ['Co może czuć przy zmianie planu?',['Lęk i irytację','Radość','Wdzięczność','Nudę']],
 ['Dlaczego tak pilnuje planu?',['Bo nieprzewidziane sytuacje ją niepokoją','Bo lubi rozkazywać','Bo nikomu nie ufa','Bo chce się wszystkim należeć']],
 ['Czy troska może iść w parze z kontrolą?',['Tak — jedno nie wyklucza drugiego','Nie, nigdy','Tylko u kobiet','Tylko u mężczyzn']],
 ['Co może pomóc?',['Ustalenie, co jest naprawdę ważne','Odebranie jej organizacji','Zmiana planu bez pytania','Kłótnia']]]},

{id:'wina', title:'Ciągłe przepraszanie', story:'Mężczyzna przypadkowo uraził przyjaciela. Przyjaciel zapewnia, że nie ma pretensji. Mimo to on wraca do sytuacji, przeprasza i próbuje wynagrodzić przykrość.', qs:[
 ['Co on czuje?',['Winę, mimo że wybaczone','Ulgę','Złość na przyjaciela','Nudę']],
 ['Dlaczego trudno mu uwierzyć w wybaczenie?',['Bo wina siedzi głębiej niż słowa','Bo przyjaciel kłamie','Bo lubi przepraszać','Bo chce się przypodobać']],
 ['Kiedy przepraszanie przestaje pomagać?',['Gdy staje się pętlą','Nigdy','Tylko w pracy','Tylko w rodzinie']],
 ['Co może pomóc?',['Przyjęcie wybaczenia i zmiana zachowania','Kolejne przeprosiny','Unikanie przyjaciela','Prezent']]]},

{id:'komplement', title:'Pochwała przed prośbą', story:'Kobieta mówi współpracownikowi: „Tylko ty potrafisz zrobić to naprawdę dobrze". Zaraz potem prosi go o dodatkową pracę, która nie należy do jego obowiązków. To się powtarza.', qs:[
 ['Jaki może być cel tej pochwały?',['Skłonienie go do dodatkowej pracy','Szczera radość z jego umiejętności','Chęć lepszego poznania','Zwykła uprzejmość']],
 ['Po czym poznać, że to nie tylko pochwała?',['Za każdym razem pojawia się prośba','Mówi głośno','Często się uśmiecha','Pochwała jest długa']],
 ['Czy ona musi świadomie manipulować?',['Nie — może robić to nieświadomie','Tak, zawsze','Nie, nigdy','Nie wiem']],
 ['Jak zareagować asertywnie?',['Docenić pochwałę i odmówić prośbie','Wściec się','Zgodzić się zawsze','Uciec']]]},

{id:'zazdrosc', title:'Zazdrość pod krytyką', story:'Mężczyzna dowiaduje się, że znajomy dostał awans. Gratuluje, ale chwilę później mówi: „Pewnie miałeś dobre znajomości". W kolejnych rozmowach regularnie pomniejsza jego osiągnięcia.', qs:[
 ['Co może kryć się za tymi słowami?',['Zazdrość, że to nie on dostał awans','Radość z sukcesu','Chęć pomocy','Nuda']],
 ['Dlaczego pomniejsza jego osiągnięcia?',['Bo cudzy sukces go boli','Bo znajomy go o to prosił','Bo chce być zabawny','Bo nie zna faktów']],
 ['Czy krytyka może chronić samoocenę?',['Tak — to mechanizm obronny','Nie, nigdy','Tylko w pracy','Tylko w rodzinie']],
 ['Co może pomóc?',['Uznanie sukcesu znajomego','Unikanie znajomego','Krytykowanie go dalej','Zmiana pracy']]]},

{id:'sprzeczne', title:'Sprzeczne sygnały', story:'Kobieta twierdzi, że chce zakończyć znajomość. Jednocześnie regularnie inicjuje kontakt, interesuje się życiem drugiej osoby i reaguje niezadowoleniem, gdy ta zaczyna spotykać się z kimś innym.', qs:[
 ['Co może się dziać w niej?',['Konflikt między chęcią bliskości i lękiem','Czysta radość','Nuda','Obojętność']],
 ['Dlaczego zachowanie nie zgadza się ze słowami?',['Bo uczucia są sprzeczne','Bo kłamie dla zabawy','Bo chce zranić','Bo nie wie, co mówi']],
 ['Jaką rolę może odgrywać przywiązanie?',['Dużą — bliskość bywa potrzebna i straszna','Żadną','Tylko u kobiet','Tylko u mężczyzn']],
 ['Co może pomóc drugiej osobie?',['Postawienie granicy i spokojna rozmowa','Znikać bez słowa','Zrobić jej na złość','Zmienić numer']]]},

{id:'pokrzywdzony', title:'Zawsze pokrzywdzony', story:'W grupie znajomych jedna osoba często opowiada o tym, jak inni ją zawiedli. W konfliktach przedstawia siebie jako stronę poszkodowaną. Rzadko wspomina o własnym udziale.', qs:[
 ['Jaką funkcję może pełnić taka narracja?',['Chronić samoocenę','Być zawsze prawdą','Śmieszyć','Uczyć']],
 ['Czy to może być sposób radzenia sobie z winą?',['Tak — bywa','Nie, nigdy','Tylko u kobiet','Tylko u mężczyzn']],
 ['Jak odróżnić krzywdę od jednostronnej relacji?',['Posłuchać drugiej strony','Zapytać grupę','Zgadywać','Nie da się']],
 ['Co może pomóc?',['Łagodne pytanie o własny udział','Zgadzać się zawsze','Unikać tej osoby','Skrytykować ją publicznie']]]},

{id:'granice', title:'Testowanie granic', story:'Osoba A regularnie spóźnia się na spotkania z osobą B. Gdy B zwraca uwagę, A odpowiada: „Przecież wiesz, jaki jestem. Nie przesadzaj". Po pewnym czasie B przestaje zgłaszać zastrzeżenia.', qs:[
 ['Co się dzieje w tej relacji?',['A przekracza granice, a B przestaje je zgłaszać','B jest bardziej punktualny','Oboje są zadowoleni','A zawsze przychodzi na czas']],
 ['Dlaczego B przestał zgłaszać zastrzeżenia?',['Bo nic to nie zmieniało','Bo mu się to podobało','Bo bał się spóźnić','Bo chciał sprawdzić A']],
 ['Czy wzorzec się utrwala?',['Tak — brak reakcji uczy, że można','Nie, nigdy','Tylko w pracy','Tylko w rodzinie']],
 ['Co może pomóc?',['Konsekwentne stawianie granicy','Przestać się spotykać','Zawsze się spóźniać','Zrobić scenę']]]},

{id:'racjonalizacja', title:'Racjonalizacja', story:'Student nie zdaje egzaminu. Zamiast przyznać, że niewystarczająco się przygotował, stwierdza: „Ten egzamin i tak nie sprawdza rzeczywistych umiejętności. Prowadzący nie potrafi uczyć". Wcześniej odkładał naukę.', qs:[
 ['Co może się dziać?',['Racjonalizacja — chroni samoocenę','Prawda o egzaminie','Chęć pomocy','Nuda']],
 ['Jaki koszt ma racjonalizacja?',['Blokuje naukę na przyszłość','Żaden','Tylko czas','Tylko pieniądze']],
 ['Czy krytyka egzaminu może być uzasadniona?',['Tak — ale to nie zmienia jego części','Nie, nigdy','Tylko czasem','Nie wiem']],
 ['Co może pomóc?',['Szukanie przyczyny w sobie i wsparcie','Oskarżanie prowadzącego','Zmiana kierunku','Rezygnacja']]]},

{id:'empatia', title:'Empatia czy własny interes', story:'Mężczyzna pomaga znajomym w trudnych sytuacjach. Jest dyspozycyjny, poświęca czas i rozwiązuje ich problemy. Z czasem zaczyna oczekiwać wdzięczności. Gdy ktoś odmawia mu pomocy, mówi: „Po wszystkim, co dla ciebie zrobiłem?"', qs:[
 ['Czy pomoc może być autentyczna i interesowna naraz?',['Tak — jedno nie wyklucza drugiego','Nie, nigdy','Tylko u kobiet','Tylko u mężczyzn']],
 ['Jaką rolę odgrywa potrzeba uznania?',['Dużą — bywa ukryta pod pomocą','Żadną','Tylko u kobiet','Tylko u mężczyzn']],
 ['Jak odróżnić wdzięczność od poczucia długu?',['Wdzięczność jest dobrowolna, dług — zobowiązaniem','Nie da się','Wdzięczność zawsze jest fałszywa','Dług zawsze jest zły']],
 ['Co może pomóc?',['Rozmowa o oczekiwaniach','Zaprzestanie pomocy','Zrobienie sceny','Unikanie ludzi']]]},

{id:'odrzucenie', title:'Brak odpowiedzi na wiadomość', story:'Kobieta wysyła wiadomość do znajomego. Nie otrzymuje odpowiedzi przez kilka godzin. Zaczyna analizować ostatnią rozmowę, zastanawia się, czy powiedziała coś niewłaściwego. W końcu usuwa wiadomość i postanawia więcej się nie odzywać.', qs:[
 ['Co ona czuje?',['Niepokój, że mogła coś zepsuć','Ulgę','Złość na niego','Nic']],
 ['Dlaczego usunęła wiadomość?',['Bo uznała, że powiedziała coś nie tak','Bo zmieniła temat','Bo chciała mieć porządek','Bo on ją o to prosił']],
 ['Czy tu jest personalizacja?',['Tak — bierze winę na siebie bez dowodów','Nie','Tylko czasem','Nie wiem']],
 ['Co może pomóc?',['Zapytać wprost zamiast zgadywać','Usunąć wszystkie wiadomości','Zniknąć','Napisać złość']]]},

{id:'wartosci', title:'Konflikt wartości', story:'Pracownik odkrywa, że przełożony manipuluje wynikami raportów. Wie, że zgłoszenie może doprowadzić do utraty pracy. Uważa też, że milczenie byłoby nieuczciwe wobec klientów. Staje się coraz bardziej wycofany.', qs:[
 ['Jaki konflikt w nim zachodzi?',['Między uczciwością a bezpieczeństwem','Między pieniędzmi a nudą','Między kolegami','Żaden']],
 ['Jaka rolę odgrywa strach?',['Dużą — blokuje działanie','Żadną','Tylko w pracy','Tylko w rodzinie']],
 ['Co to jest dysonans poznawczy?',['Napięcie między tym, co myślę, a co robię','Rodzaj muzyki','Choroba','Brak pieniędzy']],
 ['Co może pomóc?',['Rozmowa z kimś zaufanym','Milczenie na zawsze','Zmiana pracy bez planu','Zrobienie sceny']]]},

{id:'obraz', title:'Inna wobec obcych i bliskich', story:'Osoba w kontaktach z obcymi jest spokojna, uprzejma i powściągliwa. Wobec bliskich bywa impulsywna, krytyczna i wymagająca. W pracy jest bardzo zdyscyplinowana, ale w życiu prywatnym często unika odpowiedzialności.', qs:[
 ['Dlaczego bywa inna wobec bliskich?',['Bo bliskość pozwala na większą swobodę','Bo nie lubi bliskich','Bo jest chora','Bo tak wychowana']],
 ['Czy to musi być hipokryzja?',['Nie — różne konteksty wywołują różne zachowania','Tak, zawsze','Nie, nigdy','Nie wiem']],
 ['Jaki koszt ma to dla bliskich?',['Mogą czuć się mniej ważni','Żaden','Tylko czas','Tylko pieniądze']],
 ['Co może pomóc?',['Zauważenie wzorca i rozmowa','Unikanie bliskich','Zmiana pracy','Terapia tylko']]]}
);

// ── ROZRÓŻNIJ · zestawy po 4 pytania ─────────────────────────
const ROZROZNIJ_SETS = [
{id:'r1', qs:[
 ['Które słowo pasuje do poczucia, że ktoś dostał coś, czego Ty chciałeś?',['zazdrosny','wdzięczny','zaskoczony','spokojny']],
 ['Które słowo oznacza niepokój przed tym, co się stanie?',['zmartwiony','wdzięczny','zuchwały','senny']],
 ['Które słowo opisuje brak wpływu na sytuację?',['bezsilny','odizolowany','zaciekawiony','zuchwały']],
 ['Które słowo oznacza poczucie, że jesteś gorszy od innych?',[' Gorszy od innych','zuchwały','spokojny','zaciekawiony']]]},

{id:'r2', qs:[
 ['Które słowo pasuje do poczucia, że ktoś Cię zawiódl?',['rozczarowany','wdzięczny','zaciekawiony','obojętny']],
 ['Które słowo oznacza wdzięczność za czyjś gest?',['wdzięczny','zazdrosny','zmartwiony','bezsilny']],
 ['Które słowo opisuje brak kontaktu z ludźmi?',['odizolowany','bezsilny','zuchwały','senny']],
 ['Które słowo oznacza radość z czegoś nieoczekiwanego?',['zaskoczony','zmartwiony','zazdrosny','bezsilny']]]},

{id:'r3', qs:[
 ['Które słowo pasuje do silnej złości na kogoś?',['wrogo nastawiony','wdzięczny','spokojny','senny']],
 ['Które słowo oznacza poczucie bycia pominiętym?',['zlekceważony','doceniony','wdzięczny','zuchwały']],
 ['Które słowo opisuje chęć dowiedzenia się więcej?',['zaciekawiony','zmartwiony','bezsilny','zazdrosny']],
 ['Które słowo oznacza spokój i brak napięcia?',['spokojny','zmartwiony','wrogo nastawiony','zaskoczony']]]},

{id:'r4', qs:[
 ['Które słowo pasuje do poczucia winy po czymś?',['winny','zuchwały','spokojny','zaciekawiony']],
 ['Które słowo oznacza wstyd po wpadce?',['zawstydzony','zuchwały','wdzięczny','spokojny']],
 ['Które słowo opisuje dumę z osiągnięcia?',['dumny','zawstydzony','zmartwiony','bezsilny']],
 ['Które słowo oznacza strach przed utratą kogoś?',['zazdrosny','spokojny','zuchwały','wdzięczny']]]},

{id:'r5', qs:[
 ['Które słowo pasuje do zmęczenia i chęci odpoczynku?',['senny','zuchwały','wrogo nastawiony','zaskoczony']],
 ['Które słowo oznacza przytłoczenie zbyt wieloma rzeczami?',['przytłoczony','spokojny','wdzięczny','zuchwały']],
 ['Które słowo opisuje radość z bliskości?',['czuły','wrogo nastawiony','zmartwiony','bezsilny']],
 ['Które słowo oznacza niezdecydowanie?',['niepewny','zuchwały','spokojny','wdzięczny']]]},

{id:'r6', qs:[
 ['Które słowo pasuje do poczucia bycia ważnym?',['ważny','bezsilny','zmartwiony','zawstydzony']],
 ['Które słowo oznacza chęć działania i odwagi?',['odważny','bezsilny','zmartwiony','zawstydzony']],
 ['Które słowo opisuje trudność w podjęciu decyzji?',['niepewny','odważny','spokojny','wdzięczny']],
 ['Które słowo oznacza zaskoczenie czymś?',['zadziwiony','zmartwiony','zazdrosny','bezsilny']]]},

{id:'r7', qs:[
 ['Które słowo pasuje do poczucia, że inni Cię nie akceptują?',['niepasujący','spokojny','wdzięczny','zuchwały']],
 ['Które słowo oznacza chęć bycia samemu?',['zamknięty w sobie','odważny','wdzięczny','zuchwały']],
 ['Które słowo opisuje sceptycyzm wobec czyichś słów?',['sceptyczny','wdzięczny','spokojny','zuchwały']],
 ['Które słowo oznacza pewność siebie?',['pewny siebie','bezsilny','zmartwiony','zawstydzony']]]},

{id:'r8', qs:[
 ['Które słowo pasuje do irytacji drobnymi rzeczami?',['poirytowany','wdzięczny','spokojny','senny']],
 ['Które słowo oznacza oburzenie na niesprawiedliwość?',['oburzony','spokojny','wdzięczny','senny']],
 ['Które słowo opisuje chęć przebaczenia?',['skruszony','wrogo nastawiony','zazdrosny','zuchwały']],
 ['Które słowo oznacza zmęczenie emocjonalne?',['wyczerpany','odważny','zuchwały','spokojny']]]},

{id:'r9', qs:[
 ['Które słowo pasuje do radości z życia?',['wesoły','zmartwiony','bezsilny','zawstydzony']],
 ['Które słowo oznacza wolność od zmartwień?',['wolny','zmartwiony','bezsilny','zawstydzony']],
 ['Które słowo opisuje pełen siły i energii?',['energiczny','wyczerpany','zmartwiony','bezsilny']],
 ['Które słowo oznacza spokój wewnętrzny?',['spokojny','poirytowany','zmartwiony','oburzony']]]},

{id:'r10', qs:[
 ['Które słowo pasuje do strachu przed innymi?',['zastraszony','zuchwały','spokojny','wdzięczny']],
 ['Które słowo oznacza niepewność co do siebie?',['niewystarczający','zuchwały','spokojny','wdzięczny']],
 ['Które słowo opisuje chęć ucieczki?',['zamknięty w sobie','odważny','spokojny','wdzięczny']],
 ['Które słowo oznacza brak nadziei?',['bezsilny','odważny','zuchwały','spokojny']]]},

{id:'r11', qs:[
 ['Które słowo pasuje do podziwu dla kogoś?',['szanowany','zlekceważony','zmartwiony','bezsilny']],
 ['Które słowo oznacza uznanie czyjejś pracy?',['doceniony','zlekceważony','zmartwiony','bezsilny']],
 ['Które słowo opisuje radość z czyjegoś sukcesu?',['wdzięczny','zazdrosny','zmartwiony','bezsilny']],
 ['Które słowo oznacza poczucie bycia gorszym?',[' Gorszy od innych','szanowany','zuchwały','spokojny']]]},

{id:'r12', qs:[
 ['Które słowo pasuje do niezadowolenia z siebie?',['zawstydzony','dumny','spokojny','wdzięczny']],
 ['Które słowo oznacza chęć zmiany?',['skruszony','wrogo nastawiony','zazdrosny','zuchwały']],
 ['Które słowo opisuje ulgę po trudnym czasie?',['spokojny','zmartwiony','poirytowany','oburzony']],
 ['Które słowo oznacza nadzieję na coś dobrego?',['pełen nadziei','bezsilny','zmartwiony','zawstydzony']]]},

{id:'r13', qs:[
 ['Które słowo pasuje do radości z niespodzianki?',['zaskoczony','zmartwiony','bezsilny','zawstydzony']],
 ['Które słowo oznacza zadowolenie z siebie?',['dumny','zawstydzony','bezsilny','zmartwiony']],
 ['Które słowo opisuje trudność w nazwaniu emocji?',['zakłopotany','spokojny','wdzięczny','zuchwały']],
 ['Które słowo oznacza chęć bycia bliżej kogoś?',['czuły','wrogo nastawiony','zmartwiony','bezsilny']]]},

{id:'r14', qs:[
 ['Które słowo pasuje do poczucia, że świat jest zbyt trudny?',['przytłoczony','spokojny','wdzięczny','zuchwały']],
 ['Które słowo oznacza potrzebę odpoczynku?',['senny','odważny','zuchwały','spokojny']],
 ['Które słowo opisuje chęć poznania czegoś?',['dociekliwy','zmartwiony','bezsilny','zawstydzony']],
 ['Które słowo oznacza poczucie bycia oszukanym?',['zdradzony','wdzięczny','spokojny','zuchwały']]]},

{id:'r15', qs:[
 ['Które słowo pasuje do smutku po stracie?',['w bólu, w żałobie','wesoły','zuchwały','spokojny']],
 ['Które słowo oznacza radość z akceptacji?',['szanowany','zlekceważony','zmartwiony','bezsilny']],
 ['Które słowo opisuje chęć pomocy innym?',['czuły','wrogo nastawiony','zmartwiony','bezsilny']],
 ['Które słowo oznacza niezadowolenie z czyjegoś zachowania?',['krytykancki','wdzięczny','spokojny','zuchwały']]]}
];
