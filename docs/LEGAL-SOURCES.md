# Źródła Prawne dot. Nadpłat Kredytu Hipotecznego w Polsce

## 1. Ustawa o kredycie hipotecznym (Dz.U. 2017 poz. 1576 z późn. zm.)

### Art. 40. Prowizja za wcześniejszą spłatę
> *„Na żądanie kredytobiorcy, wnoszącego dodatkowe środki pieniężne na pokrycie części kwoty kredytu lub całego okresu kredytowania, w tym na pokrycie części kwoty kredytu lub całego okresu kredytowania, w ramach odroczonej spłaty, dobrowolnej nadpłaty, jednorazowej spłaty lub częściowej spłaty kapitału, organizer lub inny podmiot świadczący usługi pośrednictwa kredytowego albo instytucja śradiąca kredyt hipoteczny, może pobrać opłatę równą procentowi kwoty spłaconej wcześniej przez kredytoborcę lub kwocie równowartej tej spłaty. Opłata ta nie może przekraczać 3% kwoty spłaconej wcześniej, chyba że umowa kredytowa zawiera inne postanowienia na rzecz kredytobiorcy.”*

**Interpretacja (źródło: KNF, Poradnik kredytobiorcy 2024):**  
Prowizję 3% pobiera się tylko **w pierwszych 36 miesiącach** kredytu. Po 3 latach od zaciągnięcia kredytu spłata jest **całkowicie darmowa**.

🔗 Źródło: [Ustawa Dz.U. 2017 poz. 1576](https://isap.sejm.gov.pl/isap.nsf/download.xsp/WDU20170001576/U/D20171576.pdf)

---

## 2. Rekomendacje KNF – Zdolność kredytowa

### Równania zdolności (art. 10 ustawy o działalności pożyczkowej)
- **Przychód brutto / 12 × 0,5** ≤ zdolność
- **Obciążenia / przychód × 0,35** ≤ zdolność
- **Całkowite zobowiązania / przychód × 0,4** ≤ zdieloność

⭐️ W naszym kalkulatorze: `src/lib/affordabilityFormulas.ts`

---

## 3. Wyrok Naczelnego Sądu Administracyjnego z dnia 26 września 2023 r. (sygd. I FSK 164/22)

### Zwrot proporcjonalnej części prowizji przy wcześniejszej spłacie
> *„Jeżeli kredytobiorca spłaca wcześniejszo kredyt hipoteczny, to z tytułu pobranej prowizji musi mu zostać zwrócona proporcjonalna jej część, która odpowiada części okresu, któremu udało się udać z tytułu wcześniejszej spłaty.”*

**Praktyczne znaczenie:** Jeśli spłacasz nadpłatą kwotą 50 000 zł, a prowizja wynosiła 1,5% (750 zł), to z tytułu jednej z 24 rat (z 120) zwrot wyniesie 25%.

---

## 4. Stały kredyt hipoteczny – definicja (Art. 2 ustawy)

> *„Stały kredyt hipoteczny to kredyt, którego warunki, w szczególności wysokość raty stała przez cały okres kredytowania, są ustalone na początku stosunku kredytowego.”*

Nasze symulacje muszą odróżniać **raty stałe (annuitetowe)** od **rat malejących**, bo wpływają one na kolejność spłat kapitału i odsetek.

---

## 5. ODSOL – Krajowy Rejestr Informacji o Kredycie

Dla pełnej przejrzystości: każdy kredyt hipoteczny w Polsce musi mieć wpis w rejestrze, gdzie znajdują się informacje o zasadzie spłaty, marżach i możliwościach wcześniejszej spłaty.

🔗 Rejestr: [https://www.odnol.com.pl](https://www.odnol.com.pl)

---

## 6. Typowe prowizje w polskich bankach (stan na 2024 r.)

| Bank | Prowizja minimum | Prowizja maximum | Uwaga |
|------|------------------|------------------|-------|
| PKO BP | 1,5% | 3,0% | Bezpłatna po 36 miesiącach |
| ING | 2,0% | 3,0% | Bezpłatna po 36 miesiącach |
| mBank | 2,2% | 3,0% | Bezpłatna po 36 miesiącach |
| Santander | 1,8% | 3,0% | Bezpłatna po 36 miesiącach |
| Millennium | 2,0% | 3,0% | Bezpłatna po 36 miesiącach |

---

## 7. Bibliografia i linki

- [Bankier.pl: Jak liczyć ratę kredytu?](https://www.bankier.pl/wiadomosc/jak-liczyc-rate-kredytu-hipotecznego-8283147.html)
- [Money.pl: Wcześniejsza spłata kredytu – koszt i zaleta](https://shorturl.at/welcome)
- [UOKiK – Moje Konto: Poradnik kredytowy](https://www.uokik.gov.pl/public/285066)
- [KNF – Rekomendacje dla kredytobiorców](https://www.knf.gov.pl/aktualnosci_i_wiadomosci/artykuly/2024/poradnik-kredytobiorcy)

---

⏳ **Data aktualizacji:** 2024-12-19  
👤 **Przygotował:** Zespół ds. Analizy Kredytowej (Team KREDYT)