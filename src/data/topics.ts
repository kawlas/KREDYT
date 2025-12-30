import type { Topic } from '../types';

export const TOPICS: Topic[] = [
  {
    slug: 'wklad-wlasny-10-czy-20',
    metaTitle: 'Wkład własny 10% czy 20%? Zalety i wady | Kalkulator Kredytowy',
    metaDescription: 'Zastanawiasz się, czy uzbierać 20% wkładu własnego, czy wystarczy 10%? Poznaj różnice w kosztach, ubezpieczenie niskiego wkładu i sprawdź, co się bardziej opłaca.',
    h1: 'Wkład własny 10% czy 20%? Co wybrać w 2024 roku?',
    intro: 'Wybór między 10% a 20% wkładem własnym to jedna z najważniejszych decyzji przy planowaniu kredytu hipotecznego. Wpływa ona nie tylko na dostępność ofert, ale również na całkowity koszt zobowiązania.',
    sections: [
      {
        heading: 'Kredyt z 10% wkładem własnym - czy to możliwe?',
        body: 'Większość banków w Polsce wymaga standardowo 20% wkładu własnego. Istnieje jednak możliwość uzyskania kredytu przy posiadaniu jedynie 10%, pod warunkiem wykupienia ubezpieczenia niskiego wkładu własnego (UNWW). Jest to rozwiązanie dla osób, które chcą szybciej kupić nieruchomość, nie czekając na zebranie pełnej kwoty.'
      },
      {
        heading: 'Zalety posiadania 20% wkładu własnego',
        body: 'Posiadanie 20% wkładu własnego otwiera drzwi do znacznie korzystniejszych ofert. Banki oferują wtedy niższe marże, co przekłada się na mniejszą ratę. Dodatkowo unikasz kosztów ubezpieczenia niskiego wkładu, co może oszczędzić Ci nawet kilka tysięcy złotych w skali roku.'
      },
      {
        heading: 'Ubezpieczenie niskiego wkładu własnego (UNWW)',
        body: 'Kiedy wpłacasz mniej niż 20%, bank uznaje taki kredyt za bardziej ryzykowny. UNWW to forma zabezpieczenia dla banku. Koszt tego ubezpieczenia jest zazwyczaj doliczany do marży kredytu do momentu, aż spłacisz kapitał do poziomu 80% wartości nieruchomości.'
      }
    ],
    faqs: [
      { q: 'Czy można mieć mniej niż 10% wkładu własnego?', a: 'Obecnie standardem rynkowym jest minimum 10%. Wyjątkiem są programy rządowe (np. Rodzinny Kredyt Mieszkaniowy), które pozwalają na kredyt bez wkładu własnego.' },
      { q: 'Ile wynosi koszt ubezpieczenia niskiego wkładu?', a: 'Zazwyczaj marża rośnie o około 0,2-0,5 punktu procentowego do czasu osiągnięcia 20% udziału własnego.' },
      { q: 'Czy bank może zaakceptować 10% bez ubezpieczenia?', a: 'Zazwyczaj nie, przepisy KNF nakładają na banki obowiązek odpowiedniego zabezpieczenia kredytów z niskim wkładem.' },
      { q: 'Jak obliczyć wymagany wkład własny?', a: 'Wkład własny to procent od ceny zakupu lub wartości rynkowej nieruchomości (zależnie od tego, która kwota jest niższa).' },
      { q: 'Czy ziemia może być wkładem własnym?', a: 'Tak, posiadana działka budowlana, na której ma stanąć dom, jest uznawana przez banki jako wkład własny.' }
    ],
    ctas: [
      { label: 'Oblicz swoją ratę', to: '/kalkulator-raty-kredytu/' },
      { label: 'Sprawdź zdolność', to: '/zdolnosc-kredytowa/' }
    ],
    related: [
      { label: 'LTV - co to jest?', to: '/ltv-co-to-jest/' },
      { label: 'Kredyt z LTV 80%', to: '/ltv-80-procent/' }
    ]
  },
  {
    slug: 'ltv-co-to-jest',
    metaTitle: 'LTV (Loan to Value) - co to jest? Definicja i znaczenie | Kalkulator',
    metaDescription: 'Dowiedz się, czym jest wskaźnik LTV i dlaczego jest kluczowy przy staraniu się o kredyt hipoteczny. Zrozum, jak LTV wpływa na marżę i decyzję banku.',
    h1: 'LTV (Loan to Value) - Kluczowy wskaźnik Twojego kredytu',
    intro: 'LTV to skrót od Loan to Value, co w tłumaczeniu oznacza relację kwoty kredytu do wartości nieruchomości. Jest to jeden z najważniejszych parametrów, na jakie patrzy bank.',
    sections: [
      {
        heading: 'Jak obliczyć wskaźnik LTV?',
        body: 'Wzór jest prosty: (Kwota kredytu / Wartość nieruchomości) * 100%. Jeśli kupujesz mieszkanie za 500 000 zł i pożyczasz 400 000 zł, Twoje LTV wynosi 80%.'
      },
      {
        heading: 'Dlaczego LTV jest ważne dla banku?',
        body: 'Im niższy wskaźnik LTV, tym mniejsze ryzyko dla banku. Jeśli LTV jest niskie (np. 50%), bank ma duży margines bezpieczeństwa w razie spadku cen nieruchomości lub konieczności licytacji komorniczej.'
      },
      {
        heading: 'LTV a marża kredytu',
        body: 'Zazwyczaj banki oferują lepsze warunki cenowe (niższą marżę) dla niższych wskaźników LTV. Przekroczenie progu 80% LTV prawie zawsze wiąże się z dodatkowym kosztem w postaci ubezpieczenia niskiego wkładu.'
      }
    ],
    faqs: [
      { q: 'Jakie jest maksymalne dopuszczalne LTV?', a: 'W Polsce, zgodnie z rekomendacjami KNF, maksymalne LTV wynosi zazwyczaj 80% lub 90% (przy dodatkowym ubezpieczeniu).' },
      { q: 'Czy wycena rzeczoznawcy wpływa na LTV?', a: 'Tak, bank liczy LTV na podstawie wartości z operatu szacunkowego, a nie tylko ceny transakcyjnej.' },
      { q: 'Czy remont zwiększa wartość i obniża LTV?', a: 'Tak, jeśli kredytujesz również remont, bank bierze pod uwagę przyszłą wartość nieruchomości po zakończeniu prac.' },
      { q: 'Czy LTV zmienia się w trakcie spłaty?', a: 'Tak, w miarę spłacania kapitału Twoje LTV maleje, co po pewnym czasie pozwala np. wynegocjować lepsze warunki lub usunąć ubezpieczenie.' },
      { q: 'Co jeśli wartość nieruchomości spadnie?', a: 'W skrajnych przypadkach LTV może wzrosnąć powyżej 100%. Jest to sytuacja trudna, znana jako "negative equity".' }
    ],
    ctas: [
      { label: 'Oblicz wskaźnik LTV', to: '/kalkulator-raty-kredytu/' }
    ],
    related: [
      { label: 'Wkład własny 10% czy 20%?', to: '/wklad-wlasny-10-czy-20/' },
      { label: 'Kredyt z LTV 80%', to: '/ltv-80-procent/' }
    ]
  },
  {
    slug: 'ltv-80-procent',
    metaTitle: 'Kredyt Hipoteczny z LTV 80% - Najlepsze Warunki | Kalkulator',
    metaDescription: 'Dlaczego LTV 80% jest uważane za "złoty standard" w bankowości? Poznaj korzyści z posiadania 20% wkładu własnego i zaoszczędź na marży.',
    h1: 'Kredyt z LTV 80% - Dlaczego to najlepszy wybór?',
    intro: 'Osiągnięcie poziomu 80% Loan-to-Value (czyli wniesienie 20% wkładu) to moment, w którym oferta kredytowa staje się najbardziej korzystna dla klienta.',
    sections: [
      {
        heading: 'Brak ubezpieczenia niskiego wkładu',
        body: 'Główną zaletą LTV 80% jest brak konieczności opłacania ubezpieczenia niskiego wkładu własnego. W skali całego okresu kredytowania oznacza to oszczędność rzędu kilkunastu tysięcy złotych.'
      },
      {
        heading: 'Szeroki wybór banków',
        body: 'Nie wszystkie banki oferują kredyty z LTV 90%. Mając 20% wkładu, możesz przebierać w ofertach niemal wszystkich instytucji finansowych w Polsce, co pozwala wybrać ofertę z najniższą marżą.'
      },
      {
        heading: 'Negocjacje z bankiem',
        body: 'Klient z 20% wkładem własnym jest postrzegany przez bank jako solidniejszy i bardziej przewidywalny. Daje to lepszą pozycję do negocjowania marży, prowizji lub warunków dodatkowych.'
      }
    ],
    faqs: [
      { q: 'Czy warto dozbierać do 20% jeśli mam już 10%?', a: 'Jeśli nie spieszysz się z zakupem, zazwyczaj tak. Oszczędności na marży i braku ubezpieczenia są znaczące.' },
      { q: 'Czy przy LTV 80% prowizja jest niższa?', a: 'Często tak, banki promują klientów z wyższym wkładem własnym lepszą siatką marż i prowizji.' },
      { q: 'Jak bank weryfikuje wartość nieruchomości?', a: 'Przez operat szacunkowy wykonany przez uprawnionego rzeczoznawcę majątkowego.' },
      { q: 'Czy 20% wkładu musi być w gotówce?', a: 'Może to być gotówka, ale też inna nieruchomość jako zabezpieczenie lub (rzadziej) środki na kontach emerytalnych.' },
      { q: 'Czy LTV 80% gwarantuje przyznanie kredytu?', a: 'Nie, bank nadal musi sprawdzić Twoją zdolność kredytową i historię w BIK.' }
    ],
    ctas: [
      { label: 'Sprawdź oferty banków', to: '/kalkulator-raty-kredytu/' }
    ],
    related: [
      { label: 'LTV - co to jest?', to: '/ltv-co-to-jest/' },
      { label: 'Wkład własny 10% czy 20%?', to: '/wklad-wlasny-10-czy-20/' }
    ]
  },
  {
    slug: 'wibor-jak-wplywa-na-rate',
    metaTitle: 'Jak WIBOR wpływa na Twoją ratę kredytu? Wyjaśnienie | Kalkulator',
    metaDescription: 'Zrozum mechanizm działania WIBOR i dowiedz się, jak jego zmiany przekładają się na Twój portfel. Wszystko o zmiennym oprocentowaniu kredytu.',
    h1: 'Jak WIBOR wpływa na wysokość Twojej raty?',
    intro: 'WIBOR (Warsaw Interbank Offered Rate) to wskaźnik, który bezpośrednio decyduje o wysokości oprocentowania większości kredytów hipotecznych w Polsce.',
    sections: [
      {
        heading: 'WIBOR 3M vs WIBOR 6M',
        body: 'Banki najczęściej stosują jeden z dwóch wskaźników: WIBOR 3M (aktualizacja raty co 3 miesiące) lub WIBOR 6M (co pół roku). To, który wskaźnik wybrał Twój bank, określa jak często będziesz otrzymywać nowy harmonogram spłat.'
      },
      {
        heading: 'Marża + WIBOR = Oprocentowanie',
        body: 'Twoje całkowite oprocentowanie składa się z dwóch części: stałej marży banku oraz zmiennego wskaźnika WIBOR. Podczas gdy marża zazwyczaj nie zmienia się przez cały okres kredytowania, WIBOR fluktuuje w zależności od sytuacji rynkowej.'
      },
      {
        heading: 'Wpływ decyzji RPP na WIBOR',
        body: 'Rada Polityki Pieniężnej (RPP) ustala stopy procentowe NBP. Choć WIBOR nie jest identyczny ze stopą referencyjną, zazwyczaj podąża w tym samym kierunku. Wzrost stóp oznacza wzrost WIBOR-u i wyższą ratę.'
      }
    ],
    faqs: [
      { q: 'O ile wzrośnie rata przy wzroście WIBOR o 1%?', a: 'Dla kredytu na 300 000 zł na 25 lat, wzrost WIBOR o 1 punkt procentowy oznacza wzrost raty o około 200-250 zł.' },
      { q: 'Czy WIBOR może być ujemny?', a: 'Teoretycznie tak, choć w historii Polski taka sytuacja jeszcze nie miała miejsca. Umowy kredytowe często mają zapis, że oprocentowanie nie może spaść poniżej marży.' },
      { q: 'Kiedy bank aktualizuje mój WIBOR?', a: 'Zależy to od cyklu 3M lub 6M. Bank sprawdza wartość WIBOR z konkretnego dnia (np. ostatni dzień kwartału) i ustawia nową ratę.' },
      { q: 'Czy można przejść z WIBOR na stałe oprocentowanie?', a: 'Tak, banki mają obowiązek oferowania aneksów zmieniających oprocentowanie na stałe (zazwyczaj na 5 lat).' },
      { q: 'Czym zostanie zastąpiony WIBOR?', a: 'Trwa proces reformy wskaźników, w przyszłości WIBOR ma zostać zastąpiony przez wskaźnik WIRON.' }
    ],
    ctas: [
      { label: 'Symuluj zmianę WIBOR', to: '/symulacja-wibor/' }
    ],
    related: [
      { label: 'WIBOR wzrośnie o 1pp', to: '/wibor-plus-1pp/' },
      { label: 'WIBOR wzrośnie o 2pp', to: '/wibor-plus-2pp/' }
    ]
  },
  {
    slug: 'wibor-plus-1pp',
    metaTitle: 'Wzrost WIBOR o 1 punkt procentowy - Symulacja raty | Kalkulator',
    metaDescription: 'Sprawdź, jak wzrost WIBOR o 1p.p. wpłynie na Twój domowy budżet. Zobacz konkretne wyliczenia dla różnych kwot kredytu.',
    h1: 'Co oznacza wzrost WIBOR o 1 punkt procentowy?',
    intro: 'Nawet niewielka zmiana wskaźnika WIBOR może mieć zauważalny wpływ na Twoje miesięczne wydatki. Zobaczmy, jak wzrost o 1% przekłada się na ratę kredytu.',
    sections: [
      {
        heading: 'Przykładowe wyliczenie dla 400 000 PLN',
        body: 'Przy kredycie na 400 000 zł zaciągniętym na 25 lat, wzrost oprocentowania z 7% na 8% spowoduje wzrost raty z ok. 2827 zł do ok. 3087 zł. To aż 260 zł różnicy miesięcznie.'
      },
      {
        heading: 'Dlaczego rata rośnie bardziej niż oprocentowanie?',
        body: 'Działa tu matematyka procentu składanego. Wyższe oprocentowanie oznacza, że w każdej racie płacisz więcej odsetek, a mniej kapitału, co wydłuża drogę do całkowitej spłaty.'
      },
      {
        heading: 'Jak przygotować portfel na taką zmianę?',
        body: 'Warto mieć poduszkę finansową w wysokości co najmniej 3-6 miesięcznych rat. Jeśli WIBOR rośnie, można rozważyć nadpłatę kredytu, aby obniżyć kapitał i tym samym bazę do naliczania odsetek.'
      }
    ],
    faqs: [
      { q: 'Czy bank musi mnie uprzedzić o wzroście?', a: 'Tak, otrzymasz nowy harmonogram spłat z wyliczoną nową ratą przed terminem płatności.' },
      { q: 'O ile wzrośnie całkowity koszt przy +1%?', a: 'W skali 25 lat, stały wzrost oprocentowania o 1% może zwiększyć całkowity koszt kredytu o kilkadziesiąt tysięcy złotych.' },
      { q: 'Czy rata malejąca rośnie tak samo?', a: 'W racie malejącej wzrost WIBOR wpływa tylko na część odsetkową, więc pierwsza rata wzrośnie podobnie, ale każda kolejna będzie nieco niższa.' },
      { q: 'Co jeśli nie stać mnie na wyższą ratę?', a: 'Należy niezwłocznie skontaktować się z bankiem w celu renegocjacji warunków, np. wydłużenia okresu kredytowania.' },
      { q: 'Czy 1% to dużo?', a: 'W świecie finansów 1 punkt procentowy to bardzo znacząca zmiana, często wynikająca z kilku podwyżek stóp procentowych.' }
    ],
    ctas: [
      { label: 'Uruchom symulator WIBOR', to: '/symulacja-wibor/' }
    ],
    related: [
      { label: 'Jak WIBOR wpływa na ratę?', to: '/wibor-jak-wplywa-na-rate/' },
      { label: 'WIBOR wzrośnie o 2pp', to: '/wibor-plus-2pp/' }
    ]
  },
  {
    slug: 'wibor-plus-2pp',
    metaTitle: 'Wzrost WIBOR o 2 punkty procentowe - Czarny scenariusz? | Kalkulator',
    metaDescription: 'Jak bardzo może wzrosnąć Twoja rata? Symulacja drastycznego wzrostu WIBOR o 2 p.p. Przygotuj się na najgorsze i chroń swoje finanse.',
    h1: 'Symulacja: Wzrost WIBOR o 2 punkty procentowe',
    intro: 'Choć skokowy wzrost o 2% rzadko zdarza się w krótkim czasie, w perspektywie roku lub dwóch jest to scenariusz, który warto brać pod uwagę podczas stres-testu domowego budżetu.',
    sections: [
      {
        heading: 'Drastyczny wzrost raty - liczby',
        body: 'Dla kredytu 500 000 zł na 30 lat, wzrost oprocentowania o 2 punkty procentowe (np. z 6% na 8%) oznacza skok raty z ok. 2997 zł do ok. 3668 zł. To ponad 670 zł dodatkowego obciążenia co miesiąc.'
      },
      {
        heading: 'Ryzyko stopy procentowej',
        body: 'To właśnie ten parametr jest najgroźniejszy przy kredytach ze zmiennym oprocentowaniem. Klient bierze na siebie całe ryzyko, że gospodarka wymusi na banku centralnym gwałtowne podwyżki stóp.'
      },
      {
        heading: 'Ochrona przed wzrostem - refinansowanie',
        body: 'Jeśli prognozy wskazują na dalsze podwyżki, warto rozważyć przejście na stałą stopę procentową. Choć na start może być ona wyższa niż obecny WIBOR, daje spokój ducha na kolejne 5-10 lat.'
      }
    ],
    faqs: [
      { q: 'Czy rata może wzrosnąć o 100%?', a: 'W skrajnych warunkach hiperinflacji tak, ale w stabilnej gospodarce wzrosty o 2-4 punkty procentowe są zazwyczaj sufitem.' },
      { q: 'Jak sprawdzić swoją odporność na wzrosty?', a: 'Skorzystaj z naszego symulatora WIBOR i sprawdź, przy jakiej stopie Twoje zobowiązania przekroczą 50% Twoich dochodów.' },
      { q: 'Czy przy +2% warto zawiesić spłatę?', a: 'Wakacje kredytowe mogą pomóc doraźnie, ale nie rozwiązują problemu wyższego oprocentowania w długim terminie.' },
      { q: 'Czy bank może obniżyć moją marżę, gdy WIBOR wzrośnie?', a: 'Banki rzadko robią to same z siebie. Wymaga to najczęściej złożenia wniosku i wykazania dobrej historii spłat.' },
      { q: 'Kiedy WIBOR zacznie spadać?', a: 'Zazwyczaj wtedy, gdy inflacja znajdzie się w celu narodowego banku centralnego.' }
    ],
    ctas: [
      { label: 'Sprawdź czarny scenariusz', to: '/symulacja-wibor/' }
    ],
    related: [
      { label: 'Jak WIBOR wpływa na ratę?', to: '/wibor-jak-wplywa-na-rate/' },
      { label: 'WIBOR wzrośnie o 1pp', to: '/wibor-plus-1pp/' }
    ]
  },
  {
    slug: 'raty-rowne-czy-malejace',
    metaTitle: 'Raty Równe czy Malejące? Wielkie Porównanie | Kalkulator Kredytowy',
    metaDescription: 'Nie wiesz, który system spłat wybrać? Porównujemy raty równe (annuitetowe) i malejące. Zobacz, gdzie zapłacisz mniej odsetek i dlaczego.',
    h1: 'Raty Równe czy Malejące? Które wybrać?',
    intro: 'To jedno z najczęstszych pytań przy podpisywaniu umowy. Wybór systemu spłat ma kluczowy wpływ na to, ile w sumie oddasz pieniędzy do banku.',
    sections: [
      {
        heading: 'Raty Równe (Annuity)',
        body: 'W tym systemie przez większość czasu płacisz taką samą kwotę (chyba że zmieni się WIBOR). Na początku spłacasz głównie odsetki, a kapitał maleje powoli. Zaleta: przewidywalność i większa zdolność kredytowa na starcie.'
      },
      {
        heading: 'Raty Malejące (Kapitałowe)',
        body: 'Tutaj w każdej racie spłacasz taką samą część kapitału. Odsetki są naliczane od coraz mniejszej kwoty, więc każda kolejna rata jest niższa. Zaleta: znacznie mniejszy całkowity koszt kredytu.'
      },
      {
        heading: 'Zdolność kredytowa a typ rat',
        body: 'Wybierając raty malejące, musisz mieć wyższe dochody, ponieważ pierwsza rata jest znacznie wyższa niż w systemie rat równych. Banki liczą zdolność na podstawie najwyższej (pierwszej) raty.'
      }
    ],
    faqs: [
      { q: 'O ile tańsze są raty malejące?', a: 'Dla kredytu 400k na 25 lat oszczędność na odsetkach może wynieść nawet 40 000 - 60 000 zł.' },
      { q: 'Czy można zmienić typ rat w trakcie spłaty?', a: 'Tak, zazwyczaj wymaga to aneksu do umowy i ponownego przeliczenia zdolności kredytowej.' },
      { q: 'Które raty są popularniejsze w Polsce?', a: 'Zdecydowana większość (ok. 90%) klientów wybiera raty równe ze względu na wyższe bezpieczeństwo domowego budżetu na starcie.' },
      { q: 'Czy przy ratach równych w ogóle spłacam kapitał?', a: 'Tak, ale na początku jest to niewielka część raty (ok. 20-30%). Z każdym rokiem proporcja się zmienia na korzyść kapitału.' },
      { q: 'Dla kogo są raty malejące?', a: 'Dla osób o stabilnych, wysokich dochodach, które chcą zminimalizować koszt odsetek i szybciej pozbyć się długu.' }
    ],
    ctas: [
      { label: 'Porównaj oba systemy', to: '/raty-rowne-czy-malejace/' }
    ],
    related: [
      { label: 'Kiedy opłacają się raty malejące?', to: '/raty-malejace-kiedy-sie-oplacaja/' },
      { label: 'Jak bank liczy zdolność?', to: '/jak-bank-liczy-zdolnosc/' }
    ]
  },
  {
    slug: 'raty-malejace-kiedy-sie-oplacaja',
    metaTitle: 'Kiedy Raty Malejące się opłacają? Analiza Opłacalności | Kalkulator',
    metaDescription: 'Odkryj sytuacje, w których system rat malejących jest strzałem w dziesiątkę. Dowiedz się, jak zaoszczędzić dziesiątki tysięcy złotych na odsetkach.',
    h1: 'Kiedy warto wybrać raty malejące?',
    intro: 'Raty malejące to potężne narzędzie do obniżania kosztów kredytu, ale nie każdy powinien się na nie decydować. Sprawdźmy, kiedy ten wybór ma najwięcej sensu.',
    sections: [
      {
        heading: 'Wysoka nadwyżka finansowa',
        body: 'Raty malejące są idealne, jeśli Twój miesięczny dochód znacznie przewyższa wydatki. Wysoka rata na początku nie będzie problemem, a szybko malejące zadłużenie da Ci poczucie bezpieczeństwa w przyszłości.'
      },
      {
        heading: 'Chęć minimalizacji kosztów odsetkowych',
        body: 'Jeśli Twoim głównym celem jest oddanie bankowi jak najmniej pieniędzy, raty malejące są bezkonkurencyjne. Dzięki szybszej spłacie kapitału, suma zapłaconych odsetek jest drastycznie niższa niż w annuitetach.'
      },
      {
        heading: 'Krótszy okres kredytowania',
        body: 'Przy krótkich kredytach (np. 10-15 lat) różnica między ratą równą a malejącą jest mniejsza, co ułatwia wybór systemu kapitałowego i pozwala na jeszcze szybsze zamknięcie kredytu.'
      }
    ],
    faqs: [
      { q: 'Czy rata malejąca zawsze jest lepsza?', a: 'Pod względem matematycznym tak (jest tańsza). Pod względem płynności finansowej - nie zawsze.' },
      { q: 'Co jeśli stopy wzrosną przy ratach malejących?', a: 'Rata wzrośnie, co przy już i tak wysokim poziomie rat kapitałowych może być dużym obciążeniem.' },
      { q: 'Czy można nadpłacać raty równe zamiast brać malejące?', a: 'Tak, nadpłacanie rat równych daje podobny efekt matematyczny i jest bardziej elastyczne (nie masz obowiązku wysokiej spłaty).' },
      { q: 'O ile mniejsza jest zdolność przy ratach malejących?', a: 'Zazwyczaj o około 15-20% w porównaniu do zdolności wyliczonej dla rat równych.' },
      { q: 'Czy banki chętnie oferują raty malejące?', a: 'Muszą je mieć w ofercie, ale rzadko je promują, bo zarabiają na nich mniej niż na ratach równych.' }
    ],
    ctas: [
      { label: 'Oblicz oszczędności', to: '/raty-rowne-czy-malejace/' }
    ],
    related: [
      { label: 'Raty równe czy malejące?', to: '/raty-rowne-czy-malejace/' },
      { label: 'Koszty kredytu hipotecznego', to: '/koszty-kredytu-hipotecznego-jakie/' }
    ]
  },
  {
    slug: 'zdolnosc-kredytowa-co-obniza',
    metaTitle: 'Co obniża zdolność kredytową? 7 Najczęstszych Błędów | Kalkulator',
    metaDescription: 'Twoja zdolność kredytowa jest niższa niż myślałeś? Sprawdź, co ją zabija: od kart kredytowych po limity w koncie. Dowiedz się, jak ją poprawić.',
    h1: 'Co obniża Twoją zdolność kredytową?',
    intro: 'Zdolność kredytowa to nie tylko Twoje zarobki. To skomplikowane równanie, w którym bank odejmuje od Twoich przychodów wszystko, co uzna za ryzykowne.',
    sections: [
      {
        heading: 'Nieużywane karty i limity w koncie',
        body: 'To największy "cichy zabójca" zdolności. Nawet jeśli nie korzystasz z karty kredytowej z limitem 10 000 zł, bank przyjmuje, że w każdej chwili możesz to zrobić. Każde 1000 zł limitu obniża Twoją zdolność o kilkaset złotych.'
      },
      {
        heading: 'Liczba osób na utrzymaniu',
        body: 'Bank przyjmuje koszty utrzymania na każdą osobę w gospodarstwie domowym. Dzieci lub niepracujący współmałżonek znacząco obniżają kwotę, jaką bank jest skłonny Ci pożyczyć.'
      },
      {
        heading: 'Inne kredyty i zakupy na raty',
        body: 'Każda rata, nawet 50 zł za telefon, jest widoczna w BIK i jest odejmowana bezpośrednio od Twojego wolnego dochodu. Przed staraniem się o hipotekę warto zamknąć wszystkie drobne zobowiązania.'
      }
    ],
    faqs: [
      { q: 'Czy 500+ / 800+ zwiększa zdolność?', a: 'Zazwyczaj nie. Większość banków nie traktuje świadczeń socjalnych jako stałego dochodu przy liczeniu zdolności.' },
      { q: 'Czy wiek wpływa na zdolność?', a: 'Tak, maksymalny okres kredytowania jest ograniczony wiekiem (zazwyczaj do 70-75 lat). Starszy kredytobiorca ma krótszy czas na spłatę, więc niższą zdolność.' },
      { q: 'Czy praca na B2B utrudnia uzyskanie kredytu?', a: 'Wymaga dłuższego stażu (min. 12-24 miesiące) i banki często "ucinają" przychód o ryczałt lub koszty.' },
      { q: 'Czy zerowy BIK jest dobry?', a: 'Lepiej mieć historię spłaconych drobnych rat niż nie mieć jej wcale. Bank widzi wtedy, że jesteś rzetelnym dłużnikiem.' },
      { q: 'Czy rozdzielność majątkowa pomaga?', a: 'Może pomóc, jeśli drugi współmałżonek ma duże długi lub niskie dochody przy wysokich kosztach utrzymania.' }
    ],
    ctas: [
      { label: 'Oblicz swoją zdolność', to: '/zdolnosc-kredytowa/' }
    ],
    related: [
      { label: 'Jak bank liczy zdolność?', to: '/jak-bank-liczy-zdolnosc/' },
      { label: 'Zdolność B2B vs UoP', to: '/zdolnosc-kredytowa/' }
    ]
  },
  {
    slug: 'jak-bank-liczy-zdolnosc',
    metaTitle: 'Jak bank oblicza zdolność kredytową? Kulisy Analizy | Kalkulator',
    metaDescription: 'Poznaj wzory i zasady, którymi kierują się analitycy bankowi. Dowiedz się, jak przygotować się do badania zdolności kredytowej.',
    h1: 'Jak bank liczy Twoją zdolność kredytową?',
    intro: 'Proces badania zdolności kredytowej to nie tylko sucha matematyka, to ocena ryzyka, że przestaniesz spłacać kredyt w ciągu najbliższych 20-30 lat.',
    sections: [
      {
        heading: 'Dochód netto po odliczeniach',
        body: 'Bank bierze Twój średni dochód z ostatnich 3, 6 lub 12 miesięcy. Następnie odejmuje od niego koszty utrzymania (według własnych tabel, zazwyczaj wyższych niż realne wydatki) oraz wszystkie obecne zobowiązania finansowe.'
      },
      {
        heading: 'Zasada DSTI (Debt Service to Income)',
        body: 'To relacja wszystkich rat do Twojego dochodu netto. Większość banków nie pozwoli, aby suma rat przekroczyła 50% Twoich zarobków netto (dla wyższych dochodów) lub 40% (dla niższych).'
      },
      {
        heading: 'Bufor na wzrost stóp procentowych',
        body: 'Zgodnie z rekomendacjami KNF, bank musi przyjąć, że stopy procentowe mogą wzrosnąć. Liczy Twoją zdolność tak, jakby oprocentowanie było o kilka punktów procentowych wyższe niż obecnie.'
      }
    ],
    faqs: [
      { q: 'Ile czasu trwa badanie zdolności?', a: 'Wstępną zdolność poznasz w kilka minut u doradcy, pełna analiza analityka trwa od kilku dni do kilku tygodni.' },
      { q: 'Czy wyciągi z konta są sprawdzane pod kątem wydatków?', a: 'Tak, analitycy szukają tam innych kredytów, alimentów czy wydatków na hazard, które mogą zaniepokoić bank.' },
      { q: 'Czy staż pracy ma znaczenie?', a: 'Tak, zazwyczaj wymagane jest min. 3 miesiące u obecnego pracodawcy na czas nieokreślony.' },
      { q: 'Czy można łączyć dochody z partnerem?', a: 'Tak, a nawet z rodzicami lub osobą obcą, co jest najskuteczniejszym sposobem na zwiększenie zdolności.' },
      { q: 'Co jeśli bank odmówi kredytu?', a: 'Bank ma obowiązek podać powód odmowy (np. negatywny BIK lub brak zdolności). Można wtedy spróbować w innej instytucji o łagodniejszych kryteriach.' }
    ],
    ctas: [
      { label: 'Przejdź do kalkulatora zdolności', to: '/zdolnosc-kredytowa/' }
    ],
    related: [
      { label: 'Co obniża zdolność?', to: '/zdolnosc-kredytowa-co-obniza/' },
      { label: 'Wkład własny 10% czy 20%?', to: '/wklad-wlasny-10-czy-20/' }
    ]
  },
  {
    slug: 'koszty-kredytu-hipotecznego-jakie',
    metaTitle: 'Jakie są rzeczywiste koszty kredytu hipotecznego? | Kalkulator',
    metaDescription: 'Kredyt to nie tylko rata. Poznaj wszystkie ukryte koszty: od prowizji po ubezpieczenia nieruchomości. Nie daj się zaskoczyć dodatkowym wydatkom.',
    h1: 'Jakie są koszty kredytu hipotecznego?',
    intro: 'Wiele osób skupia się wyłącznie na marży i RRSO, zapominając o szeregu opłat okołokredytowych, które mogą wynieść nawet kilka procent wartości nieruchomości na samym starcie.',
    sections: [
      {
        heading: 'Koszty startowe (Wejście)',
        body: 'Na początku musisz przygotować się na: prowizję banku (0-3%), wycenę nieruchomości przez rzeczoznawcę (ok. 400-1000 zł), taksę notarialną oraz opłaty sądowe za wpis do księgi wieczystej.'
      },
      {
        heading: 'Odsetki - największy koszt',
        body: 'W skali 25-30 lat, odsetki przekraczają zazwyczaj wartość pożyczonego kapitału. To tutaj decyduje się, czy Twój kredyt jest "tani" czy "drogi". System rat malejących pomaga ten koszt zminimalizować.'
      },
      {
        heading: 'Obowiązkowe ubezpieczenia',
        body: 'Bank będzie wymagał ubezpieczenia nieruchomości od ognia i innych zdarzeń losowych (z cesją na bank) oraz często ubezpieczenia na życie (przynajmniej na pierwsze lata kredytowania).'
      }
    ],
    faqs: [
      { q: 'Co to jest RRSO?', a: 'To całkowity koszt kredytu wyrażony jako procent roczny, uwzględniający nie tylko oprocentowanie, ale też prowizje i ubezpieczenia.' },
      { q: 'Czy muszę brać ubezpieczenie z banku?', a: 'Zazwyczaj nie, możesz przynieść własną polisę od zewnętrznego ubezpieczyciela, co często jest tańsze.' },
      { q: 'Ile kosztuje wpis do księgi wieczystej?', a: 'Opłata sądowa za wpis hipoteki to obecnie 200 zł plus podatek PCC-3 w wysokości 19 zł.' },
      { q: 'Czy prowizję można skredytować?', a: 'Większość banków pozwala doliczyć prowizję do kwoty kredytu, dzięki czemu nie musisz płacić jej gotówką na starcie.' },
      { q: 'Jakie są koszty wcześniejszej spłaty?', a: 'Zgodnie z ustawą, po 3 latach spłaty kredytu o zmiennej stopie, bank nie może pobierać opłat za wcześniejszą spłatę.' }
    ],
    ctas: [
      { label: 'Sprawdź całkowity koszt', to: '/kalkulator-raty-kredytu/' }
    ],
    related: [
      { label: 'Prowizja, ubezpieczenie, notariusz', to: '/prowizja-ubezpieczenie-notariusz/' },
      { label: 'Raty równe czy malejące?', to: '/raty-rowne-czy-malejace/' }
    ]
  },
  {
    slug: 'prowizja-ubezpieczenie-notariusz',
    metaTitle: 'Prowizja, Ubezpieczenie, Notariusz - Przewodnik po Opłatach | Kalkulator',
    metaDescription: 'Szczegółowe zestawienie dodatkowych opłat przy kredycie hipotecznym. Dowiedz się, ile kosztuje notariusz i jak negocjować prowizję z bankiem.',
    h1: 'Prowizja, ubezpieczenie i notariusz - dodatkowe wydatki',
    intro: 'Przygotowanie do kredytu to nie tylko zbieranie na wkład własny, to także zabezpieczenie gotówki na tzw. koszty transakcyjne.',
    sections: [
      {
        heading: 'Prowizja banku - czy zawsze jest konieczna?',
        body: 'Wiele banków oferuje oferty "0% prowizji", ale zazwyczaj wiążą się one z nieco wyższą marżą lub koniecznością zakupu drogiego ubezpieczenia. Warto policzyć, czy lepiej zapłacić raz na starcie, czy płacić wyższą ratę przez lata.'
      },
      {
        heading: 'Koszty notarialne i podatki',
        body: 'Kupując nieruchomość na rynku wtórnym, płacisz 2% podatku PCC. Do tego dochodzi taksa notarialna, która zależy od wartości transakcji. Przy nieruchomości za 500k, koszty te mogą wynieść ok. 15 000 zł.'
      },
      {
        heading: 'Ubezpieczenie niskiego wkładu i pomostowe',
        body: 'Ubezpieczenie pomostowe płacisz do momentu wpisania hipoteki do księgi wieczystej (zazwyczaj od kilku tygodni do kilku miesięcy). Jest to podwyższenie marży o ok. 1 punkt procentowy.'
      }
    ],
    faqs: [
      { q: 'Ile bierze notariusz za umowę kredytową?', a: 'Taksa notarialna jest regulowana ustawowo, dla 500k wynosi ok. 1500-2000 zł netto + VAT.' },
      { q: 'Czy ubezpieczenie na życie jest obowiązkowe?', a: 'Prawnie nie, ale banki prawie zawsze stawiają taki warunek w decyzji kredytowej.' },
      { q: 'Kiedy płaci się podatek PCC?', a: 'Podatek płaci się u notariusza przy podpisywaniu aktu notarialnego zakupu nieruchomości.' },
      { q: 'Jak uniknąć prowizji?', a: 'Szukaj okresowych promocji bankowych lub negocjuj, jeśli posiadasz wysokie dochody lub inne produkty w danym banku.' },
      { q: 'Co jeśli zrezygnuję z ubezpieczenia w trakcie?', a: 'Bank prawdopodobnie podniesie Ci marżę zgodnie z zapisami w umowie kredytowej.' }
    ],
    ctas: [
      { label: 'Oblicz wszystkie koszty', to: '/kalkulator-raty-kredytu/' }
    ],
    related: [
      { label: 'Jakie są koszty kredytu?', to: '/koszty-kredytu-hipotecznego-jakie/' },
      { label: 'Wkład własny 10% czy 20%?', to: '/wklad-wlasny-10-czy-20/' }
    ]
  }
];
