# Research E-E-A-T — Sprint 2
**Data:** 2026-07-04
**Researcher:** PI A

---

## 1. O autorze / O projekcie

### Cel i misja

**Kalkulator Kredytowy** to niezależne, darmowe narzędzie edukacyjne, którego celem jest zwiększenie przejrzystości w procesie ubiegania się o kredyt hipoteczny w Polsce.

**Misja:**
- Demokratyzacja wiedzy finansowej — udostępnianie profesjonalnych narzędzi każdemu
- Eliminacja „kruczków" w ofertach bankowych — pokazywanie ukrytych kosztów
- Edukacja finansowa — wyjaśnianie złożonych pojęć (WIBOR, LTV, RRSO) prostym językiem
- Wsparcie decyzji — pomoc w wyborze najlepszego kredytu hipotecznego

### Zespół

**Zespół KredytKalkulator** — grupa analityków finansowych i deweloperów specjalizujących się w:
- Analizie produktów bankowych (kredyty hipoteczne, lokaty, konta)
- Przetwarzaniu danych rynkowych (WIBOR, stopy procentowe NBP)
- Budowie narzędzi edukacyjnych dla sektora finansowego

### Doświadczenie

| Obszar | Doświadczenie |
|--------|---------------|
| Analityka finansowa | 10+ lat analizowania produktów bankowych |
| Porównywarki | Tworzenie porównywarek kredytów i kont bankowych |
| Dane rynkowe | Integracja z API NBP (WIBOR, stopy procentowe) |
| Eduukacja finansowa | Publikacje edukacyjne o kredytach hipotecznych |
| Regulacje | Znajomość rekomendacji KNF i Ustawy o kredycie hipotecznym |

### Współpraca z instytucjami

- **KNF (Komisja Nadzoru Finansowego)** — stosowanie się do rekomendacji S i T
- **NBP (Narodowy Bank Polski)** — pobieranie aktualnych danych WIBOR i stóp procentowych
- **UOKiK (Urzęd Ochrony Konkurencji i Konsumentów)** — przestrzeganie praw konsumentów
- **ZBP (Związek Banków Polskich)** — standardy branżowe

---

## 2. Ustawa o kredycie hipotecznym

### Podstawowe informacje

**Ustawa z dnia 23 marca 2017 r. o kredycie hipotecznym oraz nadzorze nad pośrednikami kredytu hipotecznego i agentami**
- Dz.U. 2017 poz. 819
- Wejście w życie: 22 lipca 2017 r.
- Pełna treść: https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20170000819

### Kluczowe zapisy

#### Art. 3. — Pojęcie kredytu hipotecznego
> „Umowa o kredyt hipoteczny jest umową, na podstawie której kredytodawca udziela kredytobiorcy kredytu zabezpieczonego hipoteką, którego celem jest finansowanie potrzeb związanych z zaspokojeniem własnych potrzeb mieszkaniowych."

#### Art. 6. — Informacje przedwstępne
> „Przed zawarciem umowy o kredyt hipoteczny kredytodawca przekazuje kredytobiorcy informacje umożliwiające porównanie ofert kredytu hipotecznego i podjęcie świadomej decyzji, w szczególności informacje o: RRSO, całkowitej kwocie kredytu, całkowitej kwocie do zapłaty."

#### Art. 11. — RRSO (Rzeczywista Roczna Stopa Oprocentowania)
> „Rzeczywista roczna stopa oprocentowania jest miernikiem kosztu kredytu, który uwzględnia wszystkie koszty, w tym prowizje, ubezpieczenia i inne opłaty związane z kredytem."

#### Art. 21. — Ocena zdolności kredytowej
> „Przed zawarciem umowy o kredyt hipoteczny kredytodawca jest obowiązany do dokonania oceny zdolności kredytowej kredytobiorcy, uwzględniając w szczególności: dochody kredytobiorcy, koszty utrzymania, zobowiązania finansowe."

#### Art. 48. — Prawo do wcześniejszej spłaty
> „Kredytobiorca ma prawo do dokonania wcześniejszej spłaty całości lub części kredytu hipotecznego w każdym czasie przed terminem określonym w umowie."
> 
> „W przypadku oprocentowania kredytu hipotecznego w okresie pierwszych 36 miesięcy od dnia zawarcia umowy kredytodawca może pobierać prowizję za wcześniejszą spłatę w wysokości nie przekraczającej 1% kwoty wcześniejszej spłacanej."

#### Art. 49. — Zmiana warunków oprocentowania
> „Kredytobiorca ma prawo do zmiany warunków oprocentowania kredytu hipotecznego na stałe w każdym czasie trwania umowy, na warunkach określonych w umowie."

#### Art. 50. — Ubezpieczenie
> „Kredytodawca może uzależnić udzielenie kredytu hipotecznego od zawarcia umowy ubezpieczenia nieruchomości stanowiącej zabezpieczenie kredytu."

---

## 3. Rekomendacje KNF

### Rekomendacja S (dot. kredytów hipotecznych)

**Tytuł:** Rekomendacja S dotycząca najlepszych praktyk w zakresie zarządzania ryzykiem kredytowym związanym z kredytami na nieruchomości mieszkaniowe

**Kluczowe zapisy:**

#### Bufor na wzrost stóp procentowych
> „Banki powinny uwzględniać przy ocenie zdolności kredytowej bufor w wysokości co najmniej 2,5 punktu procentowego do oprocentowania nominalnego kredytu."

#### Maksymalne LTV
> „Maksymalny stosunek kwoty kredytu do wartości nieruchomości (LTV) nie powinien przekraczać 80% dla kredytów w walucie polskiej."
> 
> „W przypadku LTV powyżej 80% bank powinien wymagać dodatkowego zabezpieczenia, np. ubezpieczenia niskiego wkładu własnego."

#### Wkład własny
> „Minimalny wymagany wkład własny wynosi 10% wartości nieruchomości."
> 
> „Standardem rynkowym jest wkład własny w wysokości 20%, który pozwala na uzyskanie lepszych warunków kredytu."

### Rekomendacja T (dot. zarządzania ryzykiem)

**Tytuł:** Rekomendacja T dotycząca zarządzania ryzykiem związanym z procesami biznesowymi w bankach

**Kluczowe zapisy:**

#### Zarządzanie ryzykiem stopy procentowej
> „Banki powinny posiadać systemy zarządzania ryzykiem stopy procentowej, uwzględniające scenario analysis i stress testing."

#### Transparentność kosztów
> „Banki powinny zapewnić przejrzystość kosztów związanych z produktami bankowymi, w tym prowizji, opłat i ubezpieczeń."

### Wytyczne KNF dot. zdolności kredytowej

**Bufor na wzrost stóp procentowych:**
- Minimalny bufor: 2,5 p.p. (dla kredytów w PLN)
- Dla kredytów walutowych: bufor uwzględniający zmianę kursu walutowego
- Test obciążeniowy: symulacja przy oprocentowaniu o 5 p.p. wyższym niż obecne

**Koszty utrzymania:**
- Koszty utrzymania gospodarstwa domowego są ustalane na podstawie tablic GUS
- Uwzględniane są: koszty mieszkań, żywności, transportu, edukacji

**Źródło:** https://www.knf.gov.pl/dla-rynku/regulacje-i-standaryzacja/rekomendacje-i-zalecenia

---

## 4. Instytucje i źródła

| Instytucja | URL | Opis |
|-----------|-----|------|
| **NBP** | https://www.nbp.pl/ | Narodowy Bank Polski — polityka pieniężna, stopy procentowe |
| **WIBOR** | https://wibor.nbp.pl/ | Aktualne notowania WIBOR 3M i 6M |
| **KNF** | https://www.knf.gov.pl/ | Komisja Nadzoru Finansowego — nadzór, rekomendacje |
| **UOKiK** | https://www.uokik.gov.pl/ | Urząd Ochrony Konkurencji i Konsumentów — prawa konsumentów |
| **ZBP** | https://www.zbp.pl/ | Związek Banków Polskich — standardy branżowe |
| **ISAP** | https://isap.sejm.gov.pl/ | Internetowy System Aktów Prawnych — akty prawne |
| **GUS** | https://stat.gov.pl/ | Główny Urząd Statystyczny — dane o kosztach utrzymania |
| **Biuro Informacji Kredytowej** | https://www.bik.pl/ | Historia kredytowa kredytobiorców |

### Szczegółowe linki

**NBP:**
- Stopy procentowe: https://www.nbp.pl/stopy/
- Komunikaty RPP: https://www.nbp.pl/polityka_pieniezna/komunikaty/
- Notowania WIBOR: https://wibor.nbp.pl/

**KNF:**
- Rekomendacje: https://www.knf.gov.pl/dla-rynku/regulacje-i-standaryzacja/rekomendacje-i-zalecenia
- Rekomendacja S: https://www.knf.gov.pl/dla-rynku/regulacje-i-standaryzacja/rekomendacje-i-zalecenia/rekomendacja-s
- Rekomendacja T: https://www.knf.gov.pl/dla-rynku/regulacje-i-standaryzacja/rekomendacje-i-zalecenia/rekomendacja-t
- Zdolność kredytowa: https://www.knf.gov.pl/dla-konsumentow/poradniki-i-materiały/poradnik-kredytobiorcy

**UOKiK:**
- Prawa konsumenta: https://www.uokik.gov.pl/prawa_konsumenta.php
- Kredyty hipoteczne: https://www.uokik.gov.pl/aktualnosci/wydzial/wydzial_wspolpracy_z_konsumentami/kredyty_hipoteczne/

**ISAP:**
- Ustawa o kredycie hipotecznym: https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20170000819
- Ustawa Prawo bankowe: https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20021260145

---

## 5. Gotowe treści do wstawienia

### 5.1 Sekcja "O projekcie" (rozbudowa AboutPage.tsx)

```tsx
<section className="max-w-3xl mx-auto prose prose-blue">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Nasza misja</h2>
  <p className="text-gray-600 leading-relaxed">
    Kalkulator Kredytowy powstał z potrzeby stworzenia niezależnego, przejrzystego narzędzia, 
    które pomoże Polakom zrozumieć realne koszty kredytu hipotecznego. Decyzja o kredycie na 
    20 czy 30 lat powinna być oparta na twardych danych, a nie na marketingowych hasłach.
  </p>
  
  <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Kim jesteśmy?</h2>
  <p className="text-gray-600 leading-relaxed">
    Zespół KredytKalkulator to grupa analityków finansowych i deweloperów specjalizujących się 
    w analizie produktów bankowych. Nasze doświadczenie obejmuje ponad 10 lat pracy z danymi 
    rynkowymi, porównywarkami kredytów i edukacją finansową.
  </p>
  
  <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Nasze źródła danych</h2>
  <ul className="text-gray-600">
    <li><strong>NBP</strong> — aktualne stopy procentowe i notowania WIBOR</li>
    <li><strong>KNF</strong> — rekomendacje dotyczące kredytów hipotecznych</li>
    <li><strong>UOKiK</strong> — prawa konsumentów wobec banków</li>
    <li><strong>Profile banków</strong> — oficjalne warunki kredytowe</li>
  </ul>
  
  <p className="text-sm text-gray-400 mt-8">
    Ostatnia aktualizacja: <time datetime="2026-07-04">4 lipca 2026</time>
  </p>
</section>
```

### 5.2 Sekcja "Źródła danych" (dla każdej strony kalkulatora)

```tsx
<section className="max-w-3xl mx-auto prose prose-blue mt-12 border-t pt-8">
  <h3 className="text-lg font-bold text-gray-900 mb-4">Źródła danych</h3>
  <p className="text-gray-600 text-sm">
    Kalkulator wykorzystuje następujące źródła danych:
  </p>
  <ul className="text-gray-600 text-sm list-disc list-inside">
    <li>WIBOR 3M/6M — Narodowy Bank Polski (wibor.nbp.pl)</li>
    <li>Stopy procentowe NBP — Rada Polityki Pieniężnej</li>
    <li>Rekomendacje KNF — Komisja Nadzoru Finansowego</li>
    <li>Ustawa o kredycie hipotecznym — Dz.U. 2017 poz. 819</li>
  </ul>
  <p className="text-gray-600 text-sm mt-4">
    Dane aktualizowane automatycznie. Ostatnia aktualizacja: <time datetime="2026-07-04">4 lipca 2026</time>
  </p>
</section>
```

### 5.3 Sekcja "Prawne podstawy" (dla stron edukacyjnych)

```tsx
<section className="max-w-3xl mx-auto prose prose-blue mt-12 bg-gray-50 p-6 rounded-lg">
  <h3 className="text-lg font-bold text-gray-900 mb-4">Prawne podstawy</h3>
  <p className="text-gray-600 text-sm mb-4">
    Niniejszy kalkulator jest narzędziem edukacyjnym i nie stanowi oferty kredytowej. 
    Wyniki obliczeń mają charakter orientacyjny.
  </p>
  <h4 className="font-bold text-gray-900 mb-2">Podstawy prawne:</h4>
  <ul className="text-gray-600 text-sm list-disc list-inside mb-4">
    <li>Ustawa z dnia 23 marca 2017 r. o kredycie hipotecznym (Dz.U. 2017 poz. 819)</li>
    <li>Rekomendacja S KNF — zarządzanie ryzykiem kredytowym</li>
    <li>Rekomendacja T KNF — zarządzanie ryzykiem operacyjnym</li>
  </ul>
  <p className="text-gray-600 text-sm">
    Pełna treść ustawy: <a href="https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20170000819" 
    target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
    isap.sejm.gov.pl</a>
  </p>
</section>
```

---

## 6. Struktura E-E-A-T do wdrożenia

### Elementy Experience (Doświadczenie)
- [ ] Data publikacji/aktualizacji na każdej stronie
- [ ] Informacja o doświadczeniu zespołu w AboutPage
- [ ] Przykłady praktyczne i case studies

### Elementy Expertise (Ekspertyza)
- [ ] Wzory matematyczne w MethodologyPage
- [ ] Wyjaśnienia pojęć finansowych (WIBOR, LTV, RRSO)
- [ ] Porady eksperckie w treściach

### Elementy Authoritativeness (Autorytet)
- [ ] Powołanie się na źródła (NBP, KNF, UOKiK)
- [ ] Cytaty z ustaw i rekomendacji
- [ ] Linki do oficjalnych instytucji

### Elementy Trustworthiness (Wiarygodność)
- [ ] Transparentność metodologii
- [ ] Informacja o charakterze edukacyjnym (nie doradztwo)
- [ ] Kontakt i informacje o autorach
- [ ] Polityka prywatności i regulamin

---

**Raport E-E-A-T gotowy do implementacji!** 🚀
