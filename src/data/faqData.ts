export interface FAQItem {
  id: number
  question: string
  answer: string
  ctaLink?: string
  ctaText?: string
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "Ile wyniesie rata kredytu hipotecznego przy kwocie X i na Y lat?",
    answer: "Rata zależy od kwoty, okresu kredytowania oraz oprocentowania (WIBOR + marża). Użyj naszego kalkulatora, aby dokładnie wyliczyć miesięczne zobowiązanie dla konkretnych parametrów.",
    ctaLink: "/kalkulator-raty-kredytu/",
    ctaText: "Policz ratę w kalkulatorze"
  },
  {
    id: 2,
    question: "Jak obliczyć ratę kredytu hipotecznego — jakie dane są potrzebne?",
    answer: "Potrzebujesz znać kwotę kredytu, okres spłaty (liczba lat), wysokość oprocentowania (WIBOR/WIRON + marża banku) oraz rodzaj rat (równe lub malejące). Warto uwzględnić również prowizję banku.",
    ctaLink: "/kalkulator-raty-kredytu/",
    ctaText: "Otwórz kalkulator rat"
  },
  {
    id: 3,
    question: "Ile wyniesie całkowity koszt kredytu (odsetki + prowizje) i całkowita kwota do spłaty?",
    answer: "Całkowity koszt to suma odsetek zapłaconych przez cały okres kredytowania oraz kosztów pozaodsetkowych (prowizja, ubezpieczenia, wycena). Całkowita kwota do spłaty to kapitał plus całkowity koszt kredytu.",
    ctaLink: "/kalkulator-raty-kredytu/",
    ctaText: "Sprawdź całkowity koszt"
  },
  {
    id: 4,
    question: "Jak zmieni się rata, jeśli wydłużę okres spłaty z 25 do 30/35 lat?",
    answer: "Wydłużenie okresu spłaty obniża miesięczną ratę, ale znacznie zwiększa całkowity koszt odsetkowy kredytu. Spłacasz kapitał wolniej, więc odsetki naliczają się dłużej.",
    ctaLink: "/kalkulator-raty-kredytu/",
    ctaText: "Symuluj okres spłaty"
  },
  {
    id: 5,
    question: "Co jest lepsze: raty równe czy malejące (i o ile się różnią)?",
    answer: "Raty malejące są tańsze w całkowitym rozrachunku (szybsza spłata kapitału = niższe odsetki), ale wymagają wyższej zdolności kredytowej na początku. Raty równe są bezpieczniejsze dla domowego budżetu.",
    ctaLink: "/raty-rowne-czy-malejace/",
    ctaText: "Porównaj raty równe i malejące"
  },
  {
    id: 6,
    question: "Stałe czy zmienne oprocentowanie — co bezpieczniejsze i jak wpływa na ratę?",
    answer: "Oprocentowanie stałe (zwykle na 5 lat) daje pewność wysokości raty niezależnie od rynku. Zmienne jest ryzykowne – rata może wzrosnąć, gdy stopy procentowe pójdą w górę.",
    ctaLink: "/symulacja-wibor/",
    ctaText: "Symuluj zmianę oprocentowania"
  },
  {
    id: 7,
    question: "Jak WIBOR wpływa na ratę i o ile wzrośnie rata przy +1 p.p./+2 p.p.?",
    answer: "WIBOR to główny składnik oprocentowania zmiennego. Wzrost WIBOR o 1 p.p. podnosi oprocentowanie kredytu o 1 p.p., co przekłada się na zauważalny wzrost raty (np. kilkaset złotych przy średnim kredycie).",
    ctaLink: "/symulacja-wibor/",
    ctaText: "Sprawdź wpływ WIBOR"
  },
  {
    id: 8,
    question: "Jak policzyć ratę przy zmianie oprocentowania (symulacja scenariuszy)?",
    answer: "Skorzystaj z symulatora zmiany oprocentowania. Wpisz aktualne parametry i zobacz, jak zmieni się rata, gdy stopy procentowe wzrosną lub spadną o określoną wartość.",
    ctaLink: "/symulacja-wibor/",
    ctaText: "Otwórz symulator WIBOR"
  },
  {
    id: 9,
    question: "Jaki wkład własny jest potrzebny (10% czy 20%) i jak wpływa na ofertę?",
    answer: "Minimum to zwykle 10% (z ubezpieczeniem niskiego wkładu), ale standardem jest 20%. Wyższy wkład własny często pozwala wynegocjować niższą marżę i tańszy kredyt.",
    ctaLink: "/kalkulator-raty-kredytu/",
    ctaText: "Oblicz wkład własny"
  },
  {
    id: 10,
    question: "Ile mogę pożyczyć (jaka jest moja zdolność kredytowa) przy dochodach X i zobowiązaniach Y?",
    answer: "Zdolność zależy od dochodu netto, formy zatrudnienia, kosztów życia, liczby osób w gospodarstwie i innych zobowiązań (kredyty, karty). Użyj kalkulatora zdolności, aby oszacować maksymalną kwotę.",
    ctaLink: "/zdolnosc-kredytowa/",
    ctaText: "Sprawdź swoją zdolność"
  },
  {
    id: 11,
    question: "Czy limity na kartach kredytowych i inne kredyty obniżają zdolność kredytową?",
    answer: "Tak, każdy limit kredytowy (nawet niewykorzystany) i rata innego kredytu są traktowane jako miesięczne zobowiązanie, co bezpośrednio obniża kwotę, którą bank może Ci pożyczyć.",
    ctaLink: "/zdolnosc-kredytowa/",
    ctaText: "Oblicz wpływ zobowiązań"
  },
  {
    id: 12,
    question: "Jak bank liczy zdolność: dochód, koszty życia, BIK — co najbardziej „ciąży”?",
    answer: "Najważniejszy jest stabilny dochód (preferowane UoP) w relacji do kosztów utrzymania i rat. Negatywna historia w BIK może całkowicie zablokować kredyt. Banki przyjmują też bufory na wzrost stóp procentowych.",
    ctaLink: "/zdolnosc-kredytowa/",
    ctaText: "Analizuj swoją sytuację"
  },
  {
    id: 13,
    question: "Czy da się dostać kredyt hipoteczny bez wkładu własnego?",
    answer: "Standardowo nie – wymagane jest min. 10-20%. Wyjątkiem są programy rządowe (np. Rodzinny Kredyt Mieszkaniowy), które w określonych sytuacjach gwarantują wkład własny."
  },
  {
    id: 14,
    question: "Jakie dokumenty są potrzebne do kredytu hipotecznego?",
    answer: "Podstawowe to dowód osobisty, zaświadczenie o zarobkach (lub PIT/KPiR), wyciągi z konta oraz dokumenty dotyczące nieruchomości (odpis z księgi wieczystej, umowa przedwstępna, operat szacunkowy)."
  },
  {
    id: 15,
    question: "Ile trwa decyzja kredytowa (ile dni ma bank na rozpatrzenie wniosku)?",
    answer: "Zgodnie z ustawą bank ma 21 dni kalendarzowych na wydanie decyzji od momentu złożenia kompletnego wniosku, choć w praktyce (przy dużej liczbie wniosków) proces może się wydłużyć."
  },
  {
    id: 16,
    question: "Jak wyliczyć LTV i dlaczego banki patrzą na relację kredytu do wartości nieruchomości?",
    answer: "LTV (Loan to Value) to stosunek kwoty kredytu do wartości zabezpieczenia. Im niższe LTV (czyli wyższy wkład własny), tym bezpieczniejszy kredyt dla banku i często lepsze warunki cenowe.",
    ctaLink: "/kalkulator-raty-kredytu/",
    ctaText: "Oblicz wskaźnik LTV"
  },
  {
    id: 17,
    question: "Jakie są dodatkowe koszty: ubezpieczenia, prowizja, „pomostowe” i jak je uwzględnić?",
    answer: "Przy kredycie dochodzą: prowizja za udzielenie, wycena nieruchomości, notariusz, PCC (rynek wtórny), wpis do hipoteki oraz ubezpieczenia (nieruchomości, na życie, pomostowe do czasu wpisu).",
    ctaLink: "/kalkulator-raty-kredytu/",
    ctaText: "Zobacz listę kosztów"
  },
  {
    id: 18,
    question: "Czy opłaca się nadpłacać kredyt i jak zmieni się rata / czas spłaty po nadpłacie?",
    answer: "Nadpłata niemal zawsze się opłaca, bo zmniejsza kapitał, od którego naliczane są odsetki. Możesz wybrać zmniejszenie raty (ulga w budżecie) lub skrócenie okresu kredytowania (największe oszczędności).",
    ctaLink: "/kalkulator-raty-kredytu/",
    ctaText: "Symuluj nadpłatę"
  },
  {
    id: 19,
    question: "Czy refinansowanie się opłaca i jak policzyć, czy zmiana banku obniży ratę?",
    answer: "Refinansowanie opłaca się, gdy nowy bank oferuje znacznie niższą marżę lub gdy wartość nieruchomości wzrosła (spadek LTV). Należy jednak uwzględnić koszty przeniesienia kredytu (prowizje, wycena).",
    ctaLink: "/kalkulator-raty-kredytu/",
    ctaText: "Sprawdź opłacalność"
  },
  {
    id: 20,
    question: "Czy można mieć dwa kredyty hipoteczne i od czego to zależy?",
    answer: "Tak, można mieć kilka kredytów hipotecznych, o ile pozwala na to zdolność kredytowa. Bank zweryfikuje, czy Twoje dochody wystarczą na obsługę wszystkich rat jednocześnie.",
    ctaLink: "/zdolnosc-kredytowa/",
    ctaText: "Sprawdź zdolność na drugi kredyt"
  }
]
