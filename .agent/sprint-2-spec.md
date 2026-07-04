# Sprint 2 — E-E-A-T i AI Discovery

## Cel
Dostosować stronę do wymogów Google E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) dla treści finansowych YMYL (Your Money or Your Life).

## Fazy

### Faza 2.1 — Strona "O autorze" z referencjami
- Rozszerzyć istniejącą stronę `/o-projekcie/` (AboutPage.tsx)
- Dodać: cel strony, zespół, doświadczenie, dane kontaktowe
- Dodać referencje do instytucji (KNF, UOKiK, ZBP)

### Faza 2.2 — Polityka redakcyjna
- Dodać stronę `/polityka-redakcyjna/` lub sekcję na istniejącej stronie
- Opisać: źródła danych, częstotliwość aktualizacji, proces weryfikacji
- Uwzględnić: dane WIBOR z NBP, stopy procentowe NBP, rekomendacje KNF

### Faza 2.3 — Cytaty z Ustawy o kredycie hipotecznym i rekomendacji KNF
- Dodać cytaty/odnośniki do Ustawy o kredycie hipotecznym (Dz.U. 2017 poz. 819)
- Dodać odniesienia do Rekomendacji S i T KNF
- Wyświetlać w sekcjach "Podstawa prawna" na stronach kalkulatorów

### Faza 2.4 — Linki do instytucji + sekcja źródła danych
- Dodać sekcję "Źródła danych" w footerze lub na każdej stronie
- Linki do: NBP (wibor), KNF, UOKiK, ZBP
- Dodać ikony zaufania (SSL, bezpieczeństwo danych)

## Testy (Tester)

### Dla AboutPage (/o-projekcie/):
1. Strona zawiera sekcję "O autorze" / "Zespół" (tekst >200 znaków)
2. Strona zawiera linki do instytucji (KNF, UOKiK, ZBP, NBP)
3. Strona zawiera datę ostatniej aktualizacji

### Dla stron kalkulatorów:
4. Każda strona zawiera sekcję "Źródła danych" (lub linki do źródeł)
5. Każda strona zawiera co najmniej jeden cytat/odnośnik do Ustawy/KNF (tekst zawierający "ustawa" lub "rekomendacja" lub "KNF")

### Globalne:
6. Footer zawiera linki do instytucji (NBP, KNF, UOKiK)
7. Strona `/polityka-redakcyjna/` istnieje i ma treść >500 znaków

## Kolejność
1. **Researcher** — zbierze treści: zapisy Ustawy, rekomendacje KNF, dane kontaktowe instytucji
2. **Tester** — pisze testy (RED)
3. **Developer** — implementuje (GREEN)
4. **CEO** — review + commit
