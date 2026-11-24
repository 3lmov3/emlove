// Drabina emocji — zatwierdzony zestaw zadań (40/20/10; jedno pytanie na zadanie).
// Opcje mają pole accepted; silnik tasuje teksty i zachowuje klucz.
window.SCENARIOS = window.SCENARIOS || [];
window.ROZROZNIJ_SETS = window.ROZROZNIJ_SETS || [];
window.LADDER_TASKS = [
  {
    "id": "a01",
    "level": 1,
    "kind": "scenariusz",
    "title": "Odwołane spotkanie",
    "story": "Umówiłeś się ze znajomym na kawę. Zależało Ci na spotkaniu i jesteś już w drodze, gdy godzinę wcześniej dostajesz wiadomość, że nie może przyjść.",
    "q": "Które zdanie najpewniej opisuje fakt, bez przypisywania znajomemu intencji?",
    "options": [
      {
        "text": "Spotkanie zostało odwołane, gdy byłem już w drodze.",
        "accepted": true
      },
      {
        "text": "Może odwołał spotkanie, bo nie zależy mu na moim czasie.",
        "accepted": false
      }
    ],
    "feedback": "Wiemy, że spotkanie odwołano, ale sam ten fakt nie mówi jeszcze, dlaczego znajomy to zrobił."
  },
  {
    "id": "a02",
    "level": 1,
    "kind": "scenariusz",
    "title": "Przerwanie na spotkaniu",
    "story": "Na zebraniu zaczynasz przedstawiać pomysł. Współpracownik wchodzi Ci w słowo. Zależało Ci na dokończeniu wypowiedzi.",
    "q": "Które zdanie nazywa emocję, a nie potrzebę?",
    "options": [
      {
        "text": "Czuję złość i rozczarowanie.",
        "accepted": true
      },
      {
        "text": "Chcę dokończyć myśl i zostać wysłuchany.",
        "accepted": false
      }
    ],
    "feedback": "Możesz jednocześnie odczuwać złość i potrzebować dokończyć myśl."
  },
  {
    "id": "a03",
    "level": 1,
    "kind": "rozroznij",
    "title": "przeżycie czy obserwowalne zachowanie",
    "story": "Po nieprzyjemnej rozmowie osoba mówi „jestem zła”, po czym wychodzi z pokoju.",
    "q": "Który element możesz bezpośrednio zaobserwować, nie opierając się na samoopisie?",
    "options": [
      {
        "text": "Wyszła z pokoju.",
        "accepted": true
      },
      {
        "text": "Jest zła.",
        "accepted": false
      }
    ],
    "feedback": "Wyjście z pokoju można zobaczyć, a emocję znamy z tego, co osoba o niej mówi."
  },
  {
    "id": "a04",
    "level": 1,
    "kind": "scenariusz",
    "title": "Wiadomość po godzinach",
    "story": "Przełożony wysyła wieczorem kolejne zadanie na rano. Takie wiadomości regularnie utrudniają Ci odpoczynek.",
    "q": "Które zdanie nazywa potrzebę, a nie konkretną prośbę do przełożonego?",
    "options": [
      {
        "text": "Potrzebuję odpoczynku i wyraźnej granicy między pracą a czasem prywatnym.",
        "accepted": true
      },
      {
        "text": "Proszę, nie wysyłaj mi zadań po godzinie osiemnastej.",
        "accepted": false
      }
    ],
    "feedback": "Prośba może być jednym ze sposobów zadbania o odpoczynek i granice między pracą a czasem prywatnym."
  },
  {
    "id": "a05",
    "level": 1,
    "kind": "scenariusz",
    "title": "Pochwała przy wszystkich",
    "story": "Podczas spotkania szef chwali Twoją pracę. Cieszysz się, że została zauważona, ale nie lubisz być w centrum uwagi.",
    "q": "Który opis najlepiej oddaje możliwość współistnienia dwóch stanów?",
    "options": [
      {
        "text": "Mogę jednocześnie czuć dumę z pracy i skrępowanie uwagą innych.",
        "accepted": true
      },
      {
        "text": "Jeśli czuję skrępowanie, chyba nie mogę jednocześnie czuć dumy.",
        "accepted": false
      }
    ],
    "feedback": "Radość i skrępowanie mogą pojawić się razem, nawet jeśli dotyczą różnych części tej samej sytuacji."
  },
  {
    "id": "a06",
    "level": 1,
    "kind": "rozroznij",
    "title": "zachowanie czy przypisana intencja",
    "story": "W trakcie rozmowy ktoś zerka na telefon i odpowiada na wiadomość, gdy do niego mówisz.",
    "q": "Które zdanie opisuje zachowanie, a nie domysł o motywie?",
    "options": [
      {
        "text": "Zerknął na telefon i odpisał w trakcie rozmowy.",
        "accepted": true
      },
      {
        "text": "Odpisał, bo chciał pokazać, że rozmowa ze mną go nudzi.",
        "accepted": false
      }
    ],
    "feedback": "Wiemy, że współpracownik spojrzał na telefon i odpisał, ale nie wiemy dlaczego."
  },
  {
    "id": "a07",
    "level": 1,
    "kind": "scenariusz",
    "title": "Powrót do wypowiedzi",
    "story": "Ktoś przerywa Ci na spotkaniu. Chcesz wrócić do swojej myśli, ale nie wiesz, czy zrobił to celowo.",
    "q": "Która wypowiedź jasno stawia granicę, nie zakładając złej intencji?",
    "options": [
      {
        "text": "Chciałbym dokończyć myśl — wrócę do tego, co mówiłem.",
        "accepted": true
      },
      {
        "text": "Mam wrażenie, że nie chcesz, żebym dokończył — chciałbym wrócić do swojej myśli.",
        "accepted": false
      }
    ],
    "feedback": "Jasno wyrażając potrzebę dokończenia myśli, nie musisz zgadywać, dlaczego ktoś Ci przerwał."
  },
  {
    "id": "a08",
    "level": 1,
    "kind": "scenariusz",
    "title": "Możliwy skutek granicy",
    "story": "Spokojnie prosisz współpracownika, by pozwolił Ci dokończyć.",
    "q": "Który wniosek opisuje to, na co masz wpływ, bez przewidywania reakcji drugiej osoby?",
    "options": [
      {
        "text": "Jasno powiedziałem, czego potrzebuję.",
        "accepted": true
      },
      {
        "text": "Po spokojnej prośbie druga osoba może mnie zrozumieć i przeprosić.",
        "accepted": false
      }
    ],
    "feedback": "Możesz wybrać, jak wyrazić swoją potrzebę; reakcja drugiej osoby zależy także od niej."
  },
  {
    "id": "a09",
    "level": 1,
    "kind": "rozroznij",
    "title": "potrzeba czy strategia",
    "story": "Rozmówca co chwilę sprawdza telefon, gdy opowiadasz mu o ważnej sprawie.",
    "q": "Które zdanie nazywa potrzebę, a nie konkretną strategię?",
    "options": [
      {
        "text": "Potrzebuję uważności i obecności w tej rozmowie.",
        "accepted": true
      },
      {
        "text": "Chcę, żebyś odłożył telefon na cały wieczór.",
        "accepted": false
      }
    ],
    "feedback": "Prośba o odłożenie telefonu to jeden ze sposobów zadbania o uważną rozmowę."
  },
  {
    "id": "a10",
    "level": 1,
    "kind": "scenariusz",
    "title": "Brak odpowiedzi",
    "story": "Wysłałeś znajomemu wiadomość rano. Do wieczora nie ma odpowiedzi. Nie wiesz, co się wydarzyło.",
    "q": "Które działanie może pomóc zdobyć informację, zamiast rozstrzygać za znajomego, co oznacza cisza?",
    "options": [
      {
        "text": "Jeśli to dla mnie ważne, mogę napisać spokojnie i zapytać, czy wszystko w porządku.",
        "accepted": true
      },
      {
        "text": "Mogę się zastanawiać, czy brak odpowiedzi coś zmienił w naszej relacji.",
        "accepted": false
      }
    ],
    "feedback": "Pytanie wprost może dać więcej informacji niż domyślanie się przyczyny ciszy."
  },
  {
    "id": "a11",
    "level": 1,
    "kind": "scenariusz",
    "title": "Umówiony podział obowiązków",
    "story": "W mieszkaniu ustaliliście, że w środę Ty wyniesiesz śmieci, a współlokator umyje naczynia. W czwartek naczynia nadal stoją w zlewie.",
    "q": "Które zdanie najściślej opisuje to, co można zaobserwować?",
    "options": [
      {
        "text": "W czwartek naczynia nadal stały w zlewie.",
        "accepted": true
      },
      {
        "text": "Współlokator nie liczy się z naszymi ustaleniami.",
        "accepted": false
      }
    ],
    "feedback": "Naczynia w zlewie są obserwowalnym faktem; powody, dla których nie zostały umyte, nie są opisane."
  },
  {
    "id": "a12",
    "level": 1,
    "kind": "rozroznij",
    "title": "emocja czy potrzeba",
    "story": "Znajoma odwołuje wspólny plan w ostatniej chwili. Zależało Ci na spotkaniu i trudno Ci przeorganizować wieczór.",
    "q": "Które zdanie nazywa emocję?",
    "options": [
      {
        "text": "Czuję rozczarowanie.",
        "accepted": true
      },
      {
        "text": "Potrzebuję wcześniej wiedzieć, gdy plany się zmieniają.",
        "accepted": false
      }
    ],
    "feedback": "Rozczarowanie jest emocją, a wcześniejsza informacja o zmianie planów może być potrzebą."
  },
  {
    "id": "a13",
    "level": 1,
    "kind": "scenariusz",
    "title": "Dwa stany naraz",
    "story": "Po trudnym tygodniu spotkanie zostaje odwołane. Trochę czekałeś na rozmowę, ale czujesz też zmęczenie i myślisz o odpoczynku.",
    "q": "Który opis najlepiej uwzględnia obie informacje?",
    "options": [
      {
        "text": "Mogę być rozczarowany i jednocześnie czuć ulgę, że odpocznę.",
        "accepted": true
      },
      {
        "text": "Skoro czuję ulgę, spotkanie mogło nie być dla mnie aż tak ważne.",
        "accepted": false
      }
    ],
    "feedback": "Ulga i rozczarowanie mogą współwystępować, bo spotkanie i odpoczynek są ważne na różne sposoby."
  },
  {
    "id": "a14",
    "level": 1,
    "kind": "scenariusz",
    "title": "Czyje jedzenie?",
    "story": "Współpracownik bierze z lodówki posiłek, który przygotowałeś dla siebie. Nie wiesz, czy pomylił pojemniki.",
    "q": "Które zdanie nazywa potrzebę, a nie konkretną prośbę?",
    "options": [
      {
        "text": "Chcę, żeby moje rzeczy były respektowane.",
        "accepted": true
      },
      {
        "text": "Proszę, podpiszmy pojemniki imionami.",
        "accepted": false
      }
    ],
    "feedback": "Podpisanie pojemnika może pomóc chronić potrzebę respektowania swoich rzeczy."
  },
  {
    "id": "a15",
    "level": 1,
    "kind": "rozroznij",
    "title": "emocja czy interpretacja",
    "story": "Po rozmowie ktoś mówi: „Czuję się odsunięta”.",
    "q": "Które zdanie nazywa konkretną emocję?",
    "options": [
      {
        "text": "Czuję smutek.",
        "accepted": true
      },
      {
        "text": "Czuję się odsunięta.",
        "accepted": false
      }
    ],
    "feedback": "Poczucie odsunięcia mówi o tym, jak ktoś przeżywa sytuację, ale nie wskazuje jednej konkretnej emocji."
  },
  {
    "id": "a16",
    "level": 1,
    "kind": "scenariusz",
    "title": "Spóźnienie",
    "story": "Umówiony znajomy przychodzi dwadzieścia minut po czasie. Nie podał jeszcze powodu.",
    "q": "Które zdanie pozostaje przy faktach?",
    "options": [
      {
        "text": "Znajomy przyszedł dwadzieścia minut po umówionej godzinie.",
        "accepted": true
      },
      {
        "text": "Spóźnił się, bo nasze spotkanie nie jest dla niego ważne.",
        "accepted": false
      }
    ],
    "feedback": "Spóźnienie o dwadzieścia minut jest faktem, a jego znaczenie dla znajomego wymagałoby dodatkowych informacji."
  },
  {
    "id": "a17",
    "level": 1,
    "kind": "scenariusz",
    "title": "Zmiana planów",
    "story": "Plan wspólnego wyjazdu kilka razy się zmienia. Czujesz niepokój i trudno Ci zdecydować, co przygotować.",
    "q": "Które zdanie opisuje emocję, a nie potrzebę?",
    "options": [
      {
        "text": "Czuję niepokój.",
        "accepted": true
      },
      {
        "text": "Potrzebuję jasnego planu, zanim zacznę się przygotowywać.",
        "accepted": false
      }
    ],
    "feedback": "Niepokój jest emocją, a jasność planu może pomóc odpowiedzieć na potrzebę przewidywalności."
  },
  {
    "id": "a18",
    "level": 1,
    "kind": "rozroznij",
    "title": "zachowanie czy stan",
    "story": "Po sporze osoba odsuwa krzesło i wychodzi z pokoju. Nie mówi, co czuje.",
    "q": "Który element jest bezpośrednio zaobserwowalnym zachowaniem?",
    "options": [
      {
        "text": "Odsunęła krzesło i wyszła z pokoju.",
        "accepted": true
      },
      {
        "text": "Poczuła się upokorzona.",
        "accepted": false
      }
    ],
    "feedback": "Wyjście z pokoju jest widoczne; to, co osoba przeżywa, warto sprawdzić, zamiast zakładać."
  },
  {
    "id": "a19",
    "level": 1,
    "kind": "scenariusz",
    "title": "Pochwała i skrępowanie",
    "story": "Ktoś chwali Twoją prezentację. Cieszysz się, że została dobrze przyjęta, ale uwaga całej sali sprawia, że czujesz skrępowanie.",
    "q": "Który opis najlepiej oddaje podane informacje?",
    "options": [
      {
        "text": "Mogę czuć zadowolenie z prezentacji i skrępowanie uwagą innych.",
        "accepted": true
      },
      {
        "text": "Może mi się wydawać, że skrępowanie odbiera mi radość z pochwały.",
        "accepted": false
      }
    ],
    "feedback": "Można cieszyć się z dobrze przyjętej prezentacji i jednocześnie czuć skrępowanie uwagą sali."
  },
  {
    "id": "a20",
    "level": 1,
    "kind": "scenariusz",
    "title": "Rozmowa o granicy",
    "story": "Prosisz bliską osobę, by uprzedzała Cię wcześniej o zmianie wspólnych planów.",
    "q": "Który element zależy bezpośrednio od Ciebie?",
    "options": [
      {
        "text": "To, że jasno wyrażę, czego potrzebuję.",
        "accepted": true
      },
      {
        "text": "To, że bliska osoba od razu zmieni swoje zachowanie.",
        "accepted": false
      }
    ],
    "feedback": "Możesz jasno powiedzieć, czego potrzebujesz, a druga osoba zdecyduje, jak zareaguje."
  },
  {
    "id": "a21",
    "level": 1,
    "kind": "rozroznij",
    "title": "emocja czy interpretacja",
    "story": "W lodówce w pracy zostawiasz swój posiłek. W porze lunchu pojemnik jest pusty; nie wiesz, kto go wziął.",
    "q": "Które zdanie nazywa emocję, a nie ocenę czyjejś intencji?",
    "options": [
      {
        "text": "Czuję złość i zaskoczenie.",
        "accepted": true
      },
      {
        "text": "Ktoś uznał, że moje rzeczy są mniej ważne.",
        "accepted": false
      }
    ],
    "feedback": "Złość i zaskoczenie opisują Twoje przeżycia, a ocena czyjejś intencji to już interpretacja."
  },
  {
    "id": "a22",
    "level": 1,
    "kind": "scenariusz",
    "title": "Hałas w nocy",
    "story": "Jest późno, sąsiad słucha głośno muzyki, a rano masz wstać wcześnie.",
    "q": "Które zdanie nazywa potrzebę, a nie stan emocjonalny?",
    "options": [
      {
        "text": "Potrzebuję ciszy i snu.",
        "accepted": true
      },
      {
        "text": "Czuję rozdrażnienie i zmęczenie.",
        "accepted": false
      }
    ],
    "feedback": "Cisza i sen mogą być potrzebami, a rozdrażnienie i zmęczenie — stanami, które przy tej sytuacji się pojawiają."
  },
  {
    "id": "a23",
    "level": 1,
    "kind": "scenariusz",
    "title": "Powierzony sekret",
    "story": "Powierzyłeś znajomej prywatną informację i poprosiłeś, by jej nie przekazywała. Później usłyszałeś ją od kogoś innego.",
    "q": "Które zdanie opisuje to, co wiesz z tej sytuacji, bez dopowiadania motywu?",
    "options": [
      {
        "text": "Usłyszałem tę informację od innej osoby po tym, jak poprosiłem znajomą o dyskrecję.",
        "accepted": true
      },
      {
        "text": "Znajoma chciała, żebym poczuł się upokorzony.",
        "accepted": false
      }
    ],
    "feedback": "Wiemy, że informacja do Ciebie dotarła, ale nie znamy jeszcze powodu jej przekazania."
  },
  {
    "id": "a24",
    "level": 1,
    "kind": "rozroznij",
    "title": "sygnał z ciała czy emocja",
    "story": "Przed prezentacją zauważasz, że masz wilgotne dłonie i szybciej bije Ci serce.",
    "q": "Który element jest sygnałem z ciała, a nie nazwą emocji?",
    "options": [
      {
        "text": "Wilgotne dłonie i przyspieszone bicie serca.",
        "accepted": true
      },
      {
        "text": "Niepokój przed wystąpieniem.",
        "accepted": false
      }
    ],
    "feedback": "Wilgotne dłonie i szybsze bicie serca to sygnały z ciała, które mogą towarzyszyć różnym emocjom."
  },
  {
    "id": "a25",
    "level": 1,
    "kind": "scenariusz",
    "title": "Troska i irytacja",
    "story": "Mama kilka razy pyta, czy jadłeś. Wiesz, że się o Ciebie troszczy, a powtarzające się pytanie zaczyna Cię drażnić.",
    "q": "Który opis uwzględnia oba elementy?",
    "options": [
      {
        "text": "Mogę doceniać jej troskę i jednocześnie czuć irytację.",
        "accepted": true
      },
      {
        "text": "Mogę się zastanawiać, czy za powtarzającymi się pytaniami kryje się brak zaufania.",
        "accepted": false
      }
    ],
    "feedback": "Możesz doceniać czyjąś troskę i jednocześnie odczuwać irytację, gdy pytanie się powtarza."
  },
  {
    "id": "a26",
    "level": 1,
    "kind": "scenariusz",
    "title": "Awans znajomego",
    "story": "Znajomy dostał awans, na który sam też liczyłeś. Cieszysz się z jego sukcesu, ale myślisz o własnym rozczarowaniu.",
    "q": "Który opis najlepiej pasuje do podanych informacji?",
    "options": [
      {
        "text": "Mogę cieszyć się jego sukcesem i jednocześnie odczuwać rozczarowanie swoją sytuacją.",
        "accepted": true
      },
      {
        "text": "Jego awans oznacza, że moje starania nie mają sensu.",
        "accepted": false
      }
    ],
    "feedback": "Radość z sukcesu znajomego może współistnieć z rozczarowaniem własną sytuacją."
  },
  {
    "id": "a27",
    "level": 1,
    "kind": "rozroznij",
    "title": "potrzeba czy sposób jej zaspokojenia",
    "story": "Wspólny plan kilka razy zmienia się w ostatniej chwili. Chcesz móc lepiej zaplanować swój czas.",
    "q": "Które zdanie nazywa potrzebę, a nie konkretną prośbę?",
    "options": [
      {
        "text": "Potrzebuję większej przewidywalności.",
        "accepted": true
      },
      {
        "text": "Proszę, potwierdźmy plan dzień wcześniej.",
        "accepted": false
      }
    ],
    "feedback": "Potrzeba przewidywalności może być zaspokajana na różne sposoby, a potwierdzenie terminu to jedna z próśb."
  },
  {
    "id": "a28",
    "level": 1,
    "kind": "scenariusz",
    "title": "Pożyczone pieniądze",
    "story": "Znajomy nie oddał jeszcze pożyczonych pieniędzy i prosi o kolejną pożyczkę. Chcesz zachować relację, ale nie chcesz pożyczać bez ustaleń.",
    "q": "Która odpowiedź stawia granicę bez przypisywania znajomemu intencji?",
    "options": [
      {
        "text": "Na razie nie pożyczę kolejnej kwoty; najpierw ustalmy, kiedy oddasz poprzednią.",
        "accepted": true
      },
      {
        "text": "Chcesz mnie wykorzystać, skoro prosisz o kolejne pieniądze.",
        "accepted": false
      }
    ],
    "feedback": "Jasne ustalenie spłaty pomaga zadbać o granicę bez przesądzania, dlaczego znajomy prosi o kolejną pożyczkę."
  },
  {
    "id": "a29",
    "level": 1,
    "kind": "scenariusz",
    "title": "Odmowa pomocy",
    "story": "Prosisz bliską osobę o pomoc w przeprowadzce. Odmawia, bo tego dnia ma już inne zobowiązania.",
    "q": "Które pytanie pozwala sprawdzić, czy można znaleźć inne rozwiązanie?",
    "options": [
      {
        "text": "Czy byłby inny termin, w którym możesz mi pomóc? Jeśli nie, poszukam kogoś innego.",
        "accepted": true
      },
      {
        "text": "Czyli nie mogę na Ciebie liczyć, kiedy naprawdę Cię potrzebuję.",
        "accepted": false
      }
    ],
    "feedback": "Możesz uwzględnić odmowę i równocześnie poszukać innego sposobu na uzyskanie pomocy."
  },
  {
    "id": "a30",
    "level": 1,
    "kind": "rozroznij",
    "title": "nastrój czy pojedyncza emocja",
    "story": "Po przerwaniu wypowiedzi czujesz złość. Od kilku dni, także w innych sytuacjach, masz mniej energii i czujesz się przygaszony.",
    "q": "Który opis bardziej odnosi się do nastroju utrzymującego się w różnych sytuacjach?",
    "options": [
      {
        "text": "Od kilku dni czuję się przygaszony i mam mniej energii.",
        "accepted": true
      },
      {
        "text": "Poczułem złość, kiedy przerwano mi wypowiedź.",
        "accepted": false
      }
    ],
    "feedback": "Utrzymujące się przez kilka dni poczucie przygaszenia może opisywać nastrój, a złość po przerwaniu — reakcję na konkretne zdarzenie."
  },
  {
    "id": "a31",
    "level": 1,
    "kind": "scenariusz",
    "title": "Porównanie do rodzeństwa",
    "story": "Rodzic mówi: „Twój brat w Twoim wieku miał już własne mieszkanie”. Ty masz inne plany i czujesz się oceniany.",
    "q": "Które zdanie nazywa potrzebę, a nie emocję?",
    "options": [
      {
        "text": "Potrzebuję, żeby moje wybory były traktowane poważnie.",
        "accepted": true
      },
      {
        "text": "Czuję złość i smutek.",
        "accepted": false
      }
    ],
    "feedback": "Potrzeba uznania własnej drogi może współistnieć ze złością lub smutkiem po porównaniu."
  },
  {
    "id": "a32",
    "level": 1,
    "kind": "scenariusz",
    "title": "Ktoś przedstawia wspólny projekt",
    "story": "Współpracownik opowiada na spotkaniu o projekcie, nad którym pracowaliście razem. Nie wspomina jeszcze o Twoim wkładzie.",
    "q": "Które zdanie opisuje sytuację bez przesądzania, dlaczego współpracownik tak mówi?",
    "options": [
      {
        "text": "Do tej pory nie wspomniał o moim wkładzie.",
        "accepted": true
      },
      {
        "text": "Mam wrażenie, że chciałby przedstawić projekt jako swój.",
        "accepted": false
      }
    ],
    "feedback": "Wiemy, że współpracownik nie wspomniał jeszcze o Twoim wkładzie, ale jego powodu nie znamy."
  },
  {
    "id": "a33",
    "level": 1,
    "kind": "rozroznij",
    "title": "emocja czy motyw",
    "story": "Po rozmowie o awansie czujesz napięcie i zaczynasz przygotowywać się do kolejnego spotkania z przełożonym.",
    "q": "Który element opisuje emocję lub stan, a nie motyw działania?",
    "options": [
      {
        "text": "Napięcie przed kolejną rozmową.",
        "accepted": true
      },
      {
        "text": "Chęć uzyskania jasnej informacji o możliwościach awansu.",
        "accepted": false
      }
    ],
    "feedback": "Napięcie opisuje stan, a chęć uzyskania informacji może kierować kolejnym działaniem."
  },
  {
    "id": "a34",
    "level": 1,
    "kind": "scenariusz",
    "title": "Prezent, który nie pasuje",
    "story": "Bliska osoba daje Ci prezent, którego raczej nie użyjesz. Widzisz, że włożyła wysiłek w jego wybór.",
    "q": "Który opis może jednocześnie uwzględnić Twoje odczucia i intencję bliskiej osoby?",
    "options": [
      {
        "text": "Mogę docenić jej staranie i jednocześnie nie czuć zadowolenia z samego prezentu.",
        "accepted": true
      },
      {
        "text": "Jeśli prezent mi nie pasuje, to znaczy, że bliska osoba wcale o mnie nie myślała.",
        "accepted": false
      }
    ],
    "feedback": "Możesz docenić czyjeś staranie, nawet jeśli sam prezent nie jest tym, czego potrzebujesz."
  },
  {
    "id": "a35",
    "level": 1,
    "kind": "scenariusz",
    "title": "Zapomniane urodziny",
    "story": "Bliski znajomy nie złożył Ci życzeń w dniu urodzin. Nie wiesz, czy pamiętał ani co się u niego działo.",
    "q": "Które zdanie najlepiej oddziela możliwą potrzebę od przypuszczenia o relacji?",
    "options": [
      {
        "text": "Mogę potrzebować poczuć, że bliscy o mnie pamiętają.",
        "accepted": true
      },
      {
        "text": "To znaczy, że znajomość przestała być dla niego ważna.",
        "accepted": false
      }
    ],
    "feedback": "Możesz potrzebować pamięci i uwagi bliskich, nie wiedząc jeszcze, dlaczego znajomy nie złożył życzeń."
  },
  {
    "id": "a36",
    "level": 1,
    "kind": "rozroznij",
    "title": "postawa czy zachowanie",
    "story": "W zespole jedna osoba uważa, że każdy powinien mieć szansę dokończyć wypowiedź. Podczas spotkania regularnie czeka, aż inni skończą mówić.",
    "q": "Który element opisuje postawę — przekonanie, a nie konkretne działanie?",
    "options": [
      {
        "text": "Uważa, że każdy powinien mieć szansę dokończyć wypowiedź.",
        "accepted": true
      },
      {
        "text": "Czeka, aż inni skończą mówić.",
        "accepted": false
      }
    ],
    "feedback": "Przekonanie o dawaniu innym głosu jest postawą, a czekanie na koniec wypowiedzi — działaniem."
  },
  {
    "id": "a37",
    "level": 1,
    "kind": "scenariusz",
    "title": "Zgoda mimo zmęczenia",
    "story": "Znajomy prosi Cię o pomoc w sobotę. Jesteś zmęczony, ale odruchowo odpowiadasz, że przyjdziesz.",
    "q": "Które pytanie może pomóc Ci zauważyć własną potrzebę przed podjęciem decyzji?",
    "options": [
      {
        "text": "Czy mam teraz przestrzeń na pomoc, czy potrzebuję odpoczynku?",
        "accepted": true
      },
      {
        "text": "Jak mogę się zmusić, żeby nie zawieść znajomego?",
        "accepted": false
      }
    ],
    "feedback": "Zauważenie tego, co czujesz i czego potrzebujesz, może pomóc zdecydować, czy przyjąć prośbę."
  },
  {
    "id": "a38",
    "level": 1,
    "kind": "scenariusz",
    "title": "Przerwa w sporze",
    "story": "Rozmowa staje się coraz bardziej napięta. Czujesz, że trudno Ci słuchać i spokojnie odpowiadać.",
    "q": "Które działanie może pomóc zadbać o siebie i wrócić do rozmowy później?",
    "options": [
      {
        "text": "Poprosić o krótką przerwę i ustalić, kiedy wrócicie do tematu.",
        "accepted": true
      },
      {
        "text": "Zakończyć rozmowę bez wyjaśnienia i oczekiwać, że druga osoba sama odgadnie, kiedy wrócisz.",
        "accepted": false
      }
    ],
    "feedback": "Przerwa może dać czas na uspokojenie i umożliwić powrót do rozmowy w ustalonym momencie."
  },
  {
    "id": "a39",
    "level": 1,
    "kind": "rozroznij",
    "title": "zachowanie czy motyw",
    "story": "Po nieporozumieniu ktoś dzwoni do znajomego i mówi, że chce przeprosić.",
    "q": "Który element jest zachowaniem, które można zaobserwować?",
    "options": [
      {
        "text": "Zadzwonił i powiedział, że chce przeprosić.",
        "accepted": true
      },
      {
        "text": "Chce naprawić relację.",
        "accepted": false
      }
    ],
    "feedback": "Telefon i wypowiedziane słowa można zaobserwować, a motyw działania warto poznać z rozmowy."
  },
  {
    "id": "a40",
    "level": 1,
    "kind": "scenariusz",
    "title": "Zmieniony plan",
    "story": "Wspólny plan zmienia się po raz kolejny. Czujesz rozczarowanie, ale wiesz, że nie znasz jeszcze przyczyny zmiany.",
    "q": "Które zdanie łączy emocję z ostrożnym sposobem sprawdzenia sytuacji?",
    "options": [
      {
        "text": "Jestem rozczarowany; mogę zapytać, co się zmieniło i ustalić, czy planujemy nowy termin.",
        "accepted": true
      },
      {
        "text": "Jestem rozczarowany, więc wiem, że druga osoba nie chciała się ze mną spotkać.",
        "accepted": false
      }
    ],
    "feedback": "Rozczarowanie jest realne, ale samo nie wyjaśnia przyczyny zmiany planu; możesz o nią zapytać."
  },
  {
    "id": "b01",
    "level": 2,
    "kind": "scenariusz",
    "title": "Odwołane spotkanie",
    "story": "Zależało Ci na spotkaniu ze znajomym, ale jesteś też po ciężkim tygodniu. Godzinę przed spotkaniem znajomy odwołuje je.",
    "q": "Które odpowiedzi łączą możliwy stan z potrzebą, zamiast przypisywać znajomemu intencję?",
    "options": [
      {
        "text": "Rozczarowanie i potrzeba większej przewidywalności przy umawianiu się.",
        "accepted": true
      },
      {
        "text": "Ulga i potrzeba odpoczynku po ciężkim tygodniu.",
        "accepted": true
      },
      {
        "text": "Przypuszczenie, że znajomy wolał inne plany — to możliwa myśl, ale nie nazywa stanu i potrzeby.",
        "accepted": false
      }
    ],
    "feedback": "Gdy jednocześnie zależy Ci na spotkaniu i jesteś zmęczony, rozczarowanie i ulga mogą współistnieć."
  },
  {
    "id": "b02",
    "level": 2,
    "kind": "scenariusz",
    "title": "Telefon podczas rozmowy",
    "story": "Opowiadasz partnerowi o trudnym dniu. Partner zerka na telefon i odpowiada na kilka wiadomości.",
    "q": "Które potrzeby mogą zostać w tej chwili niezaspokojone?",
    "options": [
      {
        "text": "Uważność i obecność w rozmowie.",
        "accepted": true
      },
      {
        "text": "Poczucie, że moja sprawa jest traktowana poważnie.",
        "accepted": true
      },
      {
        "text": "Kontrola nad tym, z kim partner może pisać.",
        "accepted": false
      }
    ],
    "feedback": "Gdy uwaga rozmówcy ucieka do telefonu, możesz potrzebować obecności i poczucia bycia wysłuchanym."
  },
  {
    "id": "b03",
    "level": 2,
    "kind": "rozroznij",
    "title": "potrzeba, prośba czy emocja",
    "story": "Chcesz porozmawiać z kimś, kto w czasie rozmowy często sprawdza telefon.",
    "q": "Które zdanie jest konkretną prośbą, a nie samą potrzebą lub emocją?",
    "options": [
      {
        "text": "Potrzebuję uważności, kiedy rozmawiamy.",
        "accepted": false
      },
      {
        "text": "Czy możesz odłożyć telefon na kilka minut, kiedy opowiadam?",
        "accepted": true
      },
      {
        "text": "Czuję się pominięty.",
        "accepted": false
      }
    ],
    "feedback": "Konkretna prośba wskazuje jeden ze sposobów zadbania o potrzebę."
  },
  {
    "id": "b04",
    "level": 2,
    "kind": "scenariusz",
    "title": "Powrót do przerwanej wypowiedzi",
    "story": "Współpracownik przerywa Ci podczas spotkania. Nie wiesz, czy zrobił to celowo.",
    "q": "Które zachowania mogą zakomunikować Twoją potrzebę bez przypisywania mu intencji?",
    "options": [
      {
        "text": "Powiedzieć: „Chciałbym dokończyć myśl”.",
        "accepted": true
      },
      {
        "text": "Poczekać na przerwę i poprosić, by wrócić do Twojego punktu.",
        "accepted": true
      },
      {
        "text": "Powiedzieć: „Przerywasz, bo uważasz moje zdanie za nieważne”.",
        "accepted": false
      }
    ],
    "feedback": "Możesz poprosić o dokończenie wypowiedzi, nie przesądzając, dlaczego ktoś Ci przerwał."
  },
  {
    "id": "b05",
    "level": 2,
    "kind": "scenariusz",
    "title": "Co może się wydarzyć po postawieniu granicy?",
    "story": "Prosisz współpracownika, by pozwolił Ci dokończyć wypowiedź.",
    "q": "Które elementy są przede wszystkim po Twojej stronie, niezależnie od reakcji współpracownika?",
    "options": [
      {
        "text": "Mogę jasno powiedzieć, że chcę dokończyć wypowiedź.",
        "accepted": true
      },
      {
        "text": "Mogę zdecydować, czy powtórzyć prośbę, czy wrócić do tematu później.",
        "accepted": true
      },
      {
        "text": "Mogę liczyć na to, że przeprosi i następnym razem da mi dokończyć.",
        "accepted": false
      }
    ],
    "feedback": "To, jak wyrazisz swoją potrzebę, zależy od Ciebie; reakcja drugiej osoby już nie."
  },
  {
    "id": "b06",
    "level": 2,
    "kind": "rozroznij",
    "title": "zachowanie, emocja czy wniosek",
    "story": "Po przerwaniu osoba mówi: „Czuję się pominięta”, a potem robi krótką pauzę.",
    "q": "Które zdanie jest wnioskiem/interpretacją, a nie czystym opisem zachowania ani nazwą emocji?",
    "options": [
      {
        "text": "„Czuję się pominięta”.",
        "accepted": true
      },
      {
        "text": "„Zrobiła krótką pauzę”.",
        "accepted": false
      },
      {
        "text": "„Czuję złość”.",
        "accepted": false
      }
    ],
    "feedback": "„Czuję się pominięta” opisuje przeżycie, ale nie wskazuje jednej konkretnej emocji ani dokładnego zachowania drugiej osoby."
  },
  {
    "id": "b07",
    "level": 2,
    "kind": "scenariusz",
    "title": "Pożyczona rzecz",
    "story": "Współpracownik bierze z Twojego biurka ładowarkę bez pytania. Po chwili ją odkłada; nie wiesz, czy zauważył, że Ci to przeszkadza.",
    "q": "Które odpowiedzi łączą możliwe przeżycie z potrzebą?",
    "options": [
      {
        "text": "Złość i potrzeba, by pytano przed korzystaniem z moich rzeczy.",
        "accepted": true
      },
      {
        "text": "Zaskoczenie i potrzeba ustalenia jasnych zasad korzystania ze wspólnego sprzętu.",
        "accepted": true
      },
      {
        "text": "Przypuszczenie, że chciał mnie zdenerwować.",
        "accepted": false
      }
    ],
    "feedback": "Gdy ktoś bierze naszą rzecz bez pytania, możemy potrzebować zarówno szacunku do własności, jak i jasnych ustaleń."
  },
  {
    "id": "b08",
    "level": 2,
    "kind": "scenariusz",
    "title": "Prośba o zastępstwo",
    "story": "Kolega prosi Cię o przejęcie całej jego sobotniej zmiany. Jesteś zmęczony, ale wiesz, że ma trudny tydzień.",
    "q": "Które odpowiedzi mogą uwzględnić i Twoje możliwości, i jego sytuację?",
    "options": [
      {
        "text": "Sprawdzić, czy mogę pomóc przez część zmiany, zamiast od razu brać całość.",
        "accepted": true
      },
      {
        "text": "Odmówić tej soboty i zapytać, czy można znaleźć inne rozwiązanie.",
        "accepted": true
      },
      {
        "text": "Zgodzić się od razu, a później liczyć, że jakoś dam radę.",
        "accepted": false
      }
    ],
    "feedback": "Można brać pod uwagę potrzeby innych, nie pomijając własnego zmęczenia i granic."
  },
  {
    "id": "b09",
    "level": 2,
    "kind": "rozroznij",
    "title": "postawa, emocja czy zachowanie",
    "story": "W zespole jedna osoba uważa, że każdy powinien mieć możliwość dokończenia wypowiedzi. Podczas spotkania czeka, aż inni skończą.",
    "q": "Które zdanie opisuje postawę — przekonanie, a nie uczucie ani działanie?",
    "options": [
      {
        "text": "Każdy powinien mieć możliwość dokończenia wypowiedzi.",
        "accepted": true
      },
      {
        "text": "Czuje irytację, gdy ktoś komuś przerywa.",
        "accepted": false
      },
      {
        "text": "Czeka, aż rozmówca skończy mówić.",
        "accepted": false
      }
    ],
    "feedback": "Przekonanie o tym, jak warto traktować innych, jest postawą; czekanie na swoją kolej jest zachowaniem."
  },
  {
    "id": "b10",
    "level": 2,
    "kind": "scenariusz",
    "title": "Rada, o którą nie proszono",
    "story": "Opowiadasz bliskiej osobie o trudności. Zanim skończysz, zaczyna podawać rozwiązania. Wiesz, że chce pomóc, ale w tej chwili potrzebujesz przede wszystkim zostać wysłuchany.",
    "q": "Które odpowiedzi łączą możliwe odczucie z potrzebą?",
    "options": [
      {
        "text": "Wdzięczność za chęć pomocy i potrzeba dokończenia myśli.",
        "accepted": true
      },
      {
        "text": "Irytacja, że nie mogłem dokończyć, i potrzeba spokojnego wysłuchania.",
        "accepted": true
      },
      {
        "text": "Wniosek, że skoro daje rady, to nie zależy jej na mnie.",
        "accepted": false
      }
    ],
    "feedback": "Czyjaś chęć pomocy i nasza potrzeba bycia wysłuchanym mogą pojawić się jednocześnie."
  },
  {
    "id": "b11",
    "level": 2,
    "kind": "scenariusz",
    "title": "Wspólny projekt",
    "story": "Na spotkaniu współpracownik omawia projekt, w którym miałeś duży udział. Nie wymienia Cię, ale spotkanie jeszcze trwa.",
    "q": "Które działania mogą pomóc zadbać o uznanie Twojego wkładu?",
    "options": [
      {
        "text": "Uzupełnić rozmowę o swoim konkretnym wkładzie w projekt.",
        "accepted": true
      },
      {
        "text": "Po spotkaniu porozmawiać z współpracownikiem lub przełożonym o tym, jak przedstawiać podział pracy.",
        "accepted": true
      },
      {
        "text": "Założyć, że pominięcie było celowe, i odpowiedzieć w podobny sposób.",
        "accepted": false
      }
    ],
    "feedback": "Można upomnieć się o rzetelne pokazanie swojego wkładu, nie rozstrzygając od razu, dlaczego go pominięto."
  },
  {
    "id": "b12",
    "level": 2,
    "kind": "rozroznij",
    "title": "motyw, emocja czy zachowanie",
    "story": "Po nieporozumieniu ktoś wysyła wiadomość z przeprosinami i proponuje rozmowę.",
    "q": "Które zdanie opisuje możliwy motyw działania?",
    "options": [
      {
        "text": "Chce naprawić relację.",
        "accepted": true
      },
      {
        "text": "Czuje żal z powodu nieporozumienia.",
        "accepted": false
      },
      {
        "text": "Wysłał wiadomość i zaproponował rozmowę.",
        "accepted": false
      }
    ],
    "feedback": "Motyw może wyjaśniać, po co ktoś działa, ale najlepiej sprawdzać go w rozmowie, zamiast zakładać go z góry."
  },
  {
    "id": "b13",
    "level": 2,
    "kind": "scenariusz",
    "title": "Zmieniające się plany",
    "story": "Bliska osoba kilka razy przekłada wspólne spotkanie. Mówisz, że zależy Ci na kontakcie, ale potrzebujesz wcześniej wiedzieć o zmianach.",
    "q": "Które możliwe skutki rozmowy są realistyczne?",
    "options": [
      {
        "text": "Możecie ustalić sposób potwierdzania terminów, który będzie wygodniejszy dla obu stron.",
        "accepted": true
      },
      {
        "text": "Może się okazać, że druga osoba nie może obiecać stałych planów; wtedy możesz zdecydować, jak planować swój czas.",
        "accepted": true
      },
      {
        "text": "Jeśli jasno wyjaśnię potrzebę, druga osoba zareaguje dokładnie tak, jak sobie życzę.",
        "accepted": false
      }
    ],
    "feedback": "Jasna rozmowa może pomóc ustalić możliwości, choć nie przesądza za drugą osobę o jej decyzji."
  },
  {
    "id": "b14",
    "level": 2,
    "kind": "scenariusz",
    "title": "Ostry ton",
    "story": "Ktoś odpowiada Ci ostrym tonem. Czujesz zakłopotanie i złość, ale nie wiesz, czy jego reakcja wynika z rozmowy z Tobą, czy z czegoś innego.",
    "q": "Które potrzeby mogą być teraz ważne?",
    "options": [
      {
        "text": "Spokojniejsza rozmowa i jasność, co druga osoba miała na myśli.",
        "accepted": true
      },
      {
        "text": "Chwila na ochłonięcie, zanim zdecyduję, czy chcę kontynuować rozmowę.",
        "accepted": true
      },
      {
        "text": "Ustalenie, że druga osoba chciała mnie zawstydzić.",
        "accepted": false
      }
    ],
    "feedback": "Ostry ton można zauważyć, ale jego przyczyny nie zawsze są od razu jasne."
  },
  {
    "id": "b15",
    "level": 2,
    "kind": "rozroznij",
    "title": "nastrój czy reakcja na zdarzenie",
    "story": "Po jednej sprzeczce czujesz złość. Od kilku dni masz mniej energii także w innych sytuacjach.",
    "q": "Który opis bardziej dotyczy nastroju obejmującego dłuższy czas i różne sytuacje?",
    "options": [
      {
        "text": "Złość po konkretnej sprzeczce.",
        "accepted": false
      },
      {
        "text": "Od kilku dni czuję się przygaszony i mam mniej energii w różnych sytuacjach.",
        "accepted": true
      },
      {
        "text": "Podniosłem głos podczas sprzeczki.",
        "accepted": false
      }
    ],
    "feedback": "Jedno zdarzenie może wywołać emocję, a nastrój może towarzyszyć człowiekowi szerzej i dłużej."
  },
  {
    "id": "b16",
    "level": 2,
    "kind": "scenariusz",
    "title": "Konflikt wartości i bezpieczeństwa",
    "story": "W pracy zauważasz błąd w raporcie. Zależy Ci na rzetelności, ale obawiasz się, że zgłoszenie problemu może wywołać napięcie z przełożonym.",
    "q": "Które potrzeby lub motywy mogą być jednocześnie obecne?",
    "options": [
      {
        "text": "Potrzeba uczciwego przedstawienia danych.",
        "accepted": true
      },
      {
        "text": "Potrzeba bezpieczeństwa i namysłu nad tym, jak zgłosić problem.",
        "accepted": true
      },
      {
        "text": "Obawa, że przełożony może zareagować niechętnie.",
        "accepted": false
      }
    ],
    "feedback": "W trudnym wyborze mogą ścierać się ważne wartości i potrzeba poczucia bezpieczeństwa."
  },
  {
    "id": "b17",
    "level": 2,
    "kind": "scenariusz",
    "title": "Pomoc mimo zmęczenia",
    "story": "Znajomy prosi Cię o pomoc w sobotę. Ostatnio ma dużo na głowie. Ty też jesteś zmęczony po intensywnym tygodniu.",
    "q": "Które odpowiedzi łączą możliwy stan z potrzebą?",
    "options": [
      {
        "text": "Zmęczenie i potrzeba odpoczynku przed kolejnym tygodniem.",
        "accepted": true
      },
      {
        "text": "Troska o znajomego i potrzeba znalezienia takiej formy pomocy, na którą mam siłę.",
        "accepted": true
      },
      {
        "text": "Przypuszczenie, że jeśli odmówię, znajomy uzna, że mi na nim nie zależy.",
        "accepted": false
      }
    ],
    "feedback": "Można troszczyć się o bliską osobę i jednocześnie brać pod uwagę własne zasoby."
  },
  {
    "id": "b18",
    "level": 2,
    "kind": "rozroznij",
    "title": "stan, potrzeba czy zachowanie",
    "story": "Po długim dniu osoba mówi: „Jestem wyczerpana”, prosi o ciszę i wyłącza telewizor.",
    "q": "Który element jest zachowaniem?",
    "options": [
      {
        "text": "Jestem wyczerpana.",
        "accepted": false
      },
      {
        "text": "Potrzebuję ciszy.",
        "accepted": false
      },
      {
        "text": "Wyłącza telewizor.",
        "accepted": true
      }
    ],
    "feedback": "To samo zdarzenie może obejmować stan, potrzebę i konkretne działanie — warto je od siebie odróżniać."
  },
  {
    "id": "b19",
    "level": 2,
    "kind": "scenariusz",
    "title": "Prośba o rozmowę",
    "story": "Po sprzeczce chcesz wyjaśnić sprawę. Druga osoba odpowiada, że dziś nie ma siły rozmawiać, ale może wrócić do tematu jutro.",
    "q": "Które odpowiedzi mogą pomóc Ci zadbać o kontakt i własną potrzebę jasności?",
    "options": [
      {
        "text": "Ustalić konkretną porę rozmowy następnego dnia.",
        "accepted": true
      },
      {
        "text": "Powiedzieć, że zależy Ci na wyjaśnieniu sprawy, i zapytać, kiedy będzie gotowa wrócić do tematu.",
        "accepted": true
      },
      {
        "text": "Uznać, że propozycja rozmowy jutro oznacza brak chęci naprawienia relacji.",
        "accepted": false
      }
    ],
    "feedback": "Przesunięcie rozmowy może oznaczać potrzebę czasu, a ustalenie terminu pomaga zadbać o jasność."
  },
  {
    "id": "b20",
    "level": 2,
    "kind": "scenariusz",
    "title": "Troska czy kontrola",
    "story": "Bliska osoba kilka razy przypomina Ci o zabraniu kurtki. Wiesz, że martwi się o Ciebie, ale powtarzanie przypomnień zaczyna Cię drażnić.",
    "q": "Które odpowiedzi mogą uwzględnić obie strony tej sytuacji?",
    "options": [
      {
        "text": "Doceniam troskę i mogę poprosić, by przypomnienie wystarczyło raz.",
        "accepted": true
      },
      {
        "text": "Czuję irytację, a jednocześnie mogę rozumieć, że ta osoba chce zadbać o moje bezpieczeństwo.",
        "accepted": true
      },
      {
        "text": "Przypuszczenie, że powtarza to, żeby decydować za mnie.",
        "accepted": false
      }
    ],
    "feedback": "Troska i irytacja mogą współistnieć, a o granicy można porozmawiać bez rozstrzygania intencji."
  },
  {
    "id": "c01",
    "level": 3,
    "kind": "scenariusz",
    "title": "Odwoływane plany",
    "story": "Bliska osoba kilka razy odwołuje wspólne plany w ostatniej chwili. Zależy Ci na relacji, ale zaczynasz rezerwować mniej czasu na spotkania, dopóki nie potwierdzicie terminu.",
    "q": "Które odpowiedzi łączą możliwy stan, potrzebę i działanie bez przesądzania o motywie bliskiej osoby?",
    "options": [
      {
        "text": "Rozczarowanie, potrzeba przewidywalności i prośba o wcześniejsze potwierdzanie planu.",
        "accepted": true
      },
      {
        "text": "Niepewność, potrzeba jasności i decyzja, by umawiać się na terminy, które obie strony potwierdziły.",
        "accepted": true
      },
      {
        "text": "Podejrzenie, że bliska osoba robi to, by sprawdzić, jak dużo jej wybaczę.",
        "accepted": false
      },
      {
        "text": "Brak emocji, bo każdy termin można po prostu zmienić.",
        "accepted": false
      }
    ],
    "feedback": "Powtarzające się zmiany planów mogą budzić różne odczucia; jasne ustalenia pomagają chronić czas obu osób."
  },
  {
    "id": "c02",
    "level": 3,
    "kind": "scenariusz",
    "title": "Współpracownik pomija wkład",
    "story": "Podczas prezentacji współpracownik omawia wspólny projekt i nie wspomina o Twojej pracy. Nie wiesz, czy pominął ją celowo, czy po prostu skupił się na swojej części.",
    "q": "Które działania mogą połączyć potrzebę uznania z rzetelnym sprawdzeniem sytuacji?",
    "options": [
      {
        "text": "Uzupełnić prezentację o konkretny element, za który odpowiadałem.",
        "accepted": true
      },
      {
        "text": "Po spotkaniu porozmawiać o tym, jak przedstawić wkład każdej osoby.",
        "accepted": true
      },
      {
        "text": "Powiedzieć zespołowi, że współpracownik przywłaszczył sobie cały projekt.",
        "accepted": false
      },
      {
        "text": "Zrezygnować z udziału w kolejnych projektach bez rozmowy.",
        "accepted": false
      }
    ],
    "feedback": "Można jasno przedstawić swój wkład i jednocześnie sprawdzić, jak druga osoba rozumie podział pracy."
  },
  {
    "id": "c03",
    "level": 3,
    "kind": "rozroznij",
    "title": "emocja, interpretacja czy fakt",
    "story": "Po spotkaniu osoba mówi: „Czuję się pominięta, kiedy przechodzicie dalej bez pytania o moje zdanie”.",
    "q": "Który opis najlepiej rozdziela elementy tej wypowiedzi?",
    "options": [
      {
        "text": "„Czuję się pominięta” opisuje jej przeżycie; „przechodzicie dalej bez pytania” wskazuje konkretne zachowanie.",
        "accepted": true
      },
      {
        "text": "Całe zdanie jest wyłącznie nazwą emocji.",
        "accepted": false
      },
      {
        "text": "Całe zdanie opisuje tylko zachowanie, bez przeżycia.",
        "accepted": false
      },
      {
        "text": "Zdanie samo w sobie wyjaśnia, dlaczego inni tak postąpili.",
        "accepted": false
      }
    ],
    "feedback": "W jednej wypowiedzi mogą pojawić się naraz przeżycie i opis zachowania, ale nie musi ona wyjaśniać cudzych motywów."
  },
  {
    "id": "c04",
    "level": 3,
    "kind": "scenariusz",
    "title": "Zazdrość i uznanie",
    "story": "Znajomy dostaje awans, o który Ty także się starałeś. Cieszysz się z jego sukcesu, a jednocześnie zastanawiasz się, co ta decyzja oznacza dla Twoich planów.",
    "q": "Które odpowiedzi łączą możliwe emocje z potrzebą lub motywem?",
    "options": [
      {
        "text": "Radość z sukcesu znajomego i potrzeba docenienia własnego wkładu.",
        "accepted": true
      },
      {
        "text": "Rozczarowanie własną sytuacją i motywacja, by dowiedzieć się, jakie są dalsze możliwości.",
        "accepted": true
      },
      {
        "text": "Myśl, że awans znajomego może skłonić mnie do zwątpienia we własne starania.",
        "accepted": false
      },
      {
        "text": "Zastanawianie się, czy sposób, w jaki przełożony postrzega moją pracę, miał wpływ na decyzję.",
        "accepted": false
      }
    ],
    "feedback": "Cudzy sukces może wywołać więcej niż jedno odczucie, a pytanie o własne możliwości daje konkretniejsze informacje niż domysły."
  },
  {
    "id": "c05",
    "level": 3,
    "kind": "scenariusz",
    "title": "Zgoda pod presją",
    "story": "Ktoś prosi Cię o dodatkowe zadanie, choć masz już napięty termin. Mówisz „dobrze”, a chwilę później czujesz napięcie i żal.",
    "q": "Które połączenia stanu, potrzeby i działania mogą pomóc Ci odpowiedzieć bardziej świadomie?",
    "options": [
      {
        "text": "Napięcie może sygnalizować potrzebę sprawdzenia obciążenia przed przyjęciem zadania.",
        "accepted": true
      },
      {
        "text": "Żal może wskazywać, że chcę omówić priorytety albo zaproponować inny termin.",
        "accepted": true
      },
      {
        "text": "Może mi być trudno wrócić do ustaleń po tym, jak już się zgodziłem.",
        "accepted": false
      },
      {
        "text": "Mogę się zastanawiać, czy współpracownik zauważył moje obecne obciążenie.",
        "accepted": false
      }
    ],
    "feedback": "Zauważenie napięcia i żalu może pomóc wrócić do ustaleń, zanim obciążenie stanie się większe."
  },
  {
    "id": "c06",
    "level": 3,
    "kind": "rozroznij",
    "title": "potrzeba, strategia czy emocja",
    "story": "Współpracownik często zmienia ustalenia. Mówisz: „Potrzebuję przewidywalności, więc proszę, potwierdzajmy plan dzień wcześniej”.",
    "q": "Który fragment jest konkretną strategią/prośbą, a nie potrzebą ani emocją?",
    "options": [
      {
        "text": "Potrzebuję przewidywalności.",
        "accepted": false
      },
      {
        "text": "Potwierdzajmy plan dzień wcześniej.",
        "accepted": true
      },
      {
        "text": "Czuję niepokój, gdy ustalenia się zmieniają.",
        "accepted": false
      },
      {
        "text": "Zależy mi na spokojnej współpracy.",
        "accepted": false
      }
    ],
    "feedback": "Potrzeba mówi, czego brakuje, a prośba wskazuje konkretny sposób, który może pomóc ją zaspokoić."
  },
  {
    "id": "c07",
    "level": 3,
    "kind": "scenariusz",
    "title": "Sprzeczne sygnały w relacji",
    "story": "Ktoś mówi, że potrzebuje przerwy w kontakcie, ale po kilku dniach sam inicjuje rozmowę. Zależy Ci na tej osobie i trudno Ci zrozumieć, czego oczekuje.",
    "q": "Które odpowiedzi mogą pomóc połączyć własne odczucia z jasnym działaniem?",
    "options": [
      {
        "text": "Mogę czuć tęsknotę i niepewność, a jednocześnie zapytać, jakiego kontaktu ta osoba teraz chce.",
        "accepted": true
      },
      {
        "text": "Mogę potrzebować jasnych granic i powiedzieć, jaki rodzaj kontaktu jest dla mnie w porządku.",
        "accepted": true
      },
      {
        "text": "Mogę pomyśleć, że ta osoba sama nie jest pewna, jakiego kontaktu chce.",
        "accepted": false
      },
      {
        "text": "Jeśli tęsknię, muszę zgodzić się na każdy sposób kontaktu.",
        "accepted": false
      }
    ],
    "feedback": "Tęsknota nie odbiera prawa do jasnych granic, a pytanie może pomóc ustalić, czego chce każda ze stron."
  },
  {
    "id": "c08",
    "level": 3,
    "kind": "scenariusz",
    "title": "Milczenie po konflikcie",
    "story": "Po nieporozumieniu bliska osoba przez kilka godzin nie odpowiada na wiadomości. Nie wiesz, czy potrzebuje czasu, jest zajęta, czy nie chce rozmawiać.",
    "q": "Które działania mogą uwzględnić Twoją potrzebę jasności i jednocześnie zostawić miejsce na różne wyjaśnienia?",
    "options": [
      {
        "text": "Wysłać jedną spokojną wiadomość z pytaniem, czy chce wrócić do rozmowy później.",
        "accepted": true
      },
      {
        "text": "Ustalić dla siebie, kiedy ponowię kontakt, i w międzyczasie zająć się innymi sprawami.",
        "accepted": true
      },
      {
        "text": "Wysłać kilka wiadomości, aż odpowie.",
        "accepted": false
      },
      {
        "text": "Uznać ciszę za odpowiedź na pytanie o całą relację.",
        "accepted": false
      }
    ],
    "feedback": "Brak odpowiedzi może mieć różne przyczyny; można zadbać o własną jasność, nie próbując wymusić reakcji."
  },
  {
    "id": "c09",
    "level": 3,
    "kind": "rozroznij",
    "title": "zachowanie, skutek czy motyw",
    "story": "Osoba mówi: „Chcę, żebyśmy znowu mogli sobie ufać”, po czym proponuje regularne rozmowy o tym, co jest dla każdej strony ważne.",
    "q": "Który element opisuje konkretną propozycję działania?",
    "options": [
      {
        "text": "Chce odbudować zaufanie.",
        "accepted": false
      },
      {
        "text": "Proponuje regularne rozmowy o potrzebach obu stron.",
        "accepted": true
      },
      {
        "text": "Ma nadzieję, że bliska osoba poczuje ulgę.",
        "accepted": false
      },
      {
        "text": "Zaufanie między nimi jest już odbudowane.",
        "accepted": false
      }
    ],
    "feedback": "Intencja, działanie i jego możliwy skutek są różnymi elementami jednego procesu."
  },
  {
    "id": "c10",
    "level": 3,
    "kind": "scenariusz",
    "title": "Złość i granica",
    "story": "Podczas rozmowy ktoś kilkakrotnie przerywa Ci i odpowiada za Ciebie. Czujesz złość, a jednocześnie nie chcesz eskalować konfliktu.",
    "q": "Które połączenia emocji, potrzeby i zachowania mogą pomóc Ci zadbać o swoją wypowiedź?",
    "options": [
      {
        "text": "Złość może wskazywać, że ważne jest dla mnie dokończenie myśli; mogę poprosić o przestrzeń do wypowiedzi.",
        "accepted": true
      },
      {
        "text": "Mogę potrzebować chwili, by się uspokoić, i wrócić do tematu, gdy będę gotów.",
        "accepted": true
      },
      {
        "text": "Kiedy czuję złość, mogę mieć ochotę odpowiedzieć ostrym tonem, żeby pokazać, że przerwanie mi przeszkadza.",
        "accepted": false
      },
      {
        "text": "Mogę odłożyć swoją wypowiedź, jeśli w danej chwili trudno mi ją spokojnie dokończyć.",
        "accepted": false
      }
    ],
    "feedback": "Zauważenie stanu i potrzeby może pomóc wybrać reakcję, która chroni Twoją przestrzeń bez konieczności eskalowania rozmowy."
  }
];
