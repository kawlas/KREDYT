# Breadcrumbs Map — Sprint 1.2
**Data:** 2026-07-04
**Researcher:** PI A

---

## Mapowanie breadcrumbs dla wszystkich stron

| Ścieżka | Breadcrumb |
|---------|-----------|
| `/` | Strona główna |
| `/kalkulator-raty-kredytu/` | Strona główna > Kalkulator raty kredytu |
| `/zdolnosc-kredytowa/` | Strona główna > Zdolność kredytowa |
| `/raty-rowne-czy-malejace/` | Strona główna > Raty równe vs malejące |
| `/symulacja-wibor/` | Strona główna > Symulacja WIBOR |
| `/odsetki-dzienne/` | Strona główna > Odsetki dzienne |
| `/stale-vs-zmienne-oprocentowanie/` | Strona główne > Stałe vs zmienne oprocentowanie |
| `/symulator-nadplat/` | Strona główna > Symulator nadpłat |
| `/refinansowanie-kredytu/` | Strona główna > Refinansowanie kredytu |
| `/porownanie-ofert-bankow/` | Strona główna > Porównanie ofert banków |
| `/ltv-kalkulator/` | Strona główna > Kalkulator LTV |
| `/ukryte-koszty-kredytu/` | Strona główna > Ukryte koszty kredytu |
| `/co-wplywa-na-zdolnosc/` | Strona główna > Co wpływa na zdolność |
| `/faq-kredyt-hipoteczny/` | Strona główna > FAQ |
| `/o-projekcie/` | Strona główna > O projekcie |
| `/metodologia/` | Strona główna > Metodologia |
| `/kontakt/` | Strona główna > Kontakt |
| `/polityka-prywatnosci/` | Strona główna > Polityka prywatności |
| `/404/` | Strona główna > Błąd 404 |

---

## Strony dynamiczne (artykuły z topics.ts)

| Ścieżka | Breadcrumb |
|---------|-----------|
| `/wklad-wlasny-10-czy-20/` | Strona główna > Wkład własny 10% czy 20%? |
| `/ltv-co-to-jest/` | Strona główna > LTV - co to jest? |
| `/ltv-80-procent/` | Strona główna > Kredyt z LTV 80% |
| `/wibor-jak-wplywa-na-rate/` | Strona główna > Jak WIBOR wpływa na ratę? |
| `/wibor-plus-1pp/` | Strona główna > Wzrost WIBOR o 1 p.p. |
| `/wibor-plus-2pp/` | Strona główna > Symulacja: Wzrost WIBOR o 2 p.p. |
| `/raty-rowne-czy-malejace/` | Strona główna > Raty równe czy malejące? |
| `/raty-malejace-kiedy-sie-oplacaja/` | Strona główna > Kiedy opłacają się raty malejące? |
| `/zdolnosc-kredytowa-co-obniza/` | Strona główna > Co obniża zdolność kredytową? |
| `/jak-bank-liczy-zdolnosc/` | Strona główna > Jak bank liczy zdolność? |
| `/koszty-kredytu-hipotecznego-jakie/` | Strona główna > Jakie są koszty kredytu? |
| `/prowizja-ubezpieczenie-notariusz/` | Strona główna > Prowizja, ubezpieczenie, notariusz |

---

## Uwagi

1. **Max 2-3 elementy** w breadcrumb — dla czytelności
2. **Strona główna** zawsze jako pierwszy element
3. **Nazwy po polsku**, przyjazne dla użytkownika
4. **Bez numeracji** — tylko nazwy ścieżek
5. **Ostatni element** to zawsze aktualna strona (bold w UI)

---

## Implementacja w kodzie

Breadcrumb powinien być zaimplementowany jako:
```tsx
<nav aria-label="Breadcrumb">
  <ol className="flex items-center space-x-2 text-sm text-gray-600">
    <li><a href="/">Strona główna</a></li>
    <li className="flex items-center">
      <span className="mx-2">/</span>
      <a href="/kalkulator-raty-kredytu/">Kalkulator raty kredytu</a>
    </li>
  </ol>
</nav>
```

---

**Mapowanie gotowe do implementacji!** 🚀
