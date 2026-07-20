import React from 'react'
import { Link } from 'react-router-dom'
import TabContainer from '../components/layout/TabContainer'
import SEOHead from '../components/shared/SEOHead'
import BreadcrumbNav from '../components/shared/BreadcrumbNav'
import ArticleMeta from '../components/shared/ArticleMeta'

const WiborARataPage: React.FC = () => {
  return (
    <TabContainer title="WIBOR a rata kredytu — jak się zmienia?" subtitle="Kompendium wiedzy o kredytach hipotecznych">
      <SEOHead 
        title="WIBOR a rata kredytu — jak się zmienia? — Kompendium wiedzy"
        description="Symulacje wzrostu i spadku WIBOR, wpływ na ratę przy różnych kwotach. Przygotuj się na zmiany stóp procentowych."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Poradniki', href: '/poradniki/' },
          { name: 'WIBOR a rata', href: '/poradniki/wibor-a-rata/' },
        ]}
        schemaType="Article"
      />
      
      <BreadcrumbNav pathname="/poradniki/wibor-a-rata/" />
      <article>
        <ArticleMeta date="lipiec 2026" expert="Piotr Radwański" />
        <div>
        
        <p className="text-lg text-muted-foreground mb-8">
          WIBOR to kluczowy składnik oprocentowania kredytów hipotecznych w Polsce. Zrozumienie, 
          jak wpływa na Twoją ratę, pozwala lepiej planować budżet i przygotować się na zmiany 
          stóp procentowych. W tym kompendium wyjaśniamy mechanizmy WIBOR i pokazujemy symulacje 
          na konkretnych liczbach.
        </p>

        <h2>Czym jest WIBOR?</h2>
        <p>
          <strong>WIBOR (Warsaw Interbank Offered Rate)</strong> to referencyjna stopa procentowa, 
          po której banki w Polsce udzielają sobie wzajemnie pożyczek. Jest wyznaczana codziennie 
          na podstawie danych z rynku międzybankowego.
        </p>
        <p>Dla kredytów hipotecznych najczęściej stosowany jest:</p>
        <ul>
          <li><strong>WIBOR 3M</strong> — aktualizowany co kwartał (3 miesiące)</li>
          <li><strong>WIBOR 6M</strong> — aktualizowany co pół roku (6 miesięcy)</li>
        </ul>

        <h2>Jak WIBOR wpływa na ratę?</h2>
        <p>
          <strong>Oprocentowanie kredytu = WIBOR + marża banku</strong>
        </p>
        <p>
          Przykładowo: jeśli WIBOR 3M wynosi 5,50% a marża banku to 1,90%, całkowite 
          oprocentowanie wynosi <strong>7,40%</strong> w skali roku.
        </p>

        <h2>Współczynnik wrażliwości raty na WIBOR</h2>
        <p>
          Wzrost WIBOR o 1 punkt procentowy oznacza wzrost raty o ok. <strong>7–9%</strong>. 
          Im wyższa kwota kredytu, tym większy wpływ w złotówkach.
        </p>

        <h2>Symulacja: wpływ WIBOR na ratę</h2>
        <p>Założenia: kredyt na 25 lat, marża banku 2,00%</p>
        <table>
          <thead>
            <tr>
              <th>Poziom WIBOR</th>
              <th>Oprocentowanie</th>
              <th>Rata (400k)</th>
              <th>Rata (600k)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>3,00%</td><td>5,00%</td><td>2 338 zł</td><td>3 507 zł</td></tr>
            <tr><td>4,00%</td><td>6,00%</td><td>2 582 zł</td><td>3 873 zł</td></tr>
            <tr><td>5,00%</td><td>7,00%</td><td>2 804 zł</td><td>4 206 zł</td></tr>
            <tr><td>6,00%</td><td>8,00%</td><td>3 025 zł</td><td>4 537 zł</td></tr>
            <tr><td>7,00%</td><td>9,00%</td><td>3 246 zł</td><td>4 869 zł</td></tr>
          </tbody>
        </table>

        <h2>Scenariusze zmian — co oznaczają w praktyce?</h2>
        <p>Dla kredytu 500 000 zł na 25 lat:</p>
        <table>
          <thead>
            <tr>
              <th>Zmiana WIBOR</th>
              <th>Zmiana raty</th>
              <th>Dodatkowy koszt roczny</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>+1 pp</td><td>+276 zł/mc</td><td>+3 312 zł</td></tr>
            <tr><td>+2 pp</td><td>+552 zł/mc</td><td>+6 624 zł</td></tr>
            <tr><td>+3 pp</td><td>+828 zł/mc</td><td>+9 936 zł</td></tr>
          </tbody>
        </table>

        <h2>Historia WIBOR — wahania w czasie</h2>
        <p>
          Historyczne wahania pokazują, że różnica między dołkiem (0,19% w 2021) a szczytem 
          (6,92% w 2023) sięgała <strong>6,73 pp</strong>. Dla kredytu 400 000 zł oznaczało to 
          wzrost raty z 1 643 zł do 3 183 zł — <strong>o 94% więcej</strong>.
        </p>

        <h2>Wpływ WIBOR na ratę — tabela szczegółowa</h2>
        <p>Założenia: kredyt na 25 lat, marża banku 2,00%. Poniżej pełna tabela wrażliwości raty na zmiany WIBOR:</p>
        <table>
          <thead><tr><th>WIBOR</th><th>Oprocentowanie</th><th>Rata (400k)</th><th>Rata (600k)</th></tr></thead>
          <tbody>
            <tr><td>2,00%</td><td>4,00%</td><td>2 114 zł</td><td>3 171 zł</td></tr>
            <tr><td>3,00%</td><td>5,00%</td><td>2 338 zł</td><td>3 507 zł</td></tr>
            <tr><td>4,00%</td><td>6,00%</td><td>2 582 zł</td><td>3 873 zł</td></tr>
            <tr><td>5,00%</td><td>7,00%</td><td>2 804 zł</td><td>4 206 zł</td></tr>
            <tr><td>5,50% (2026)</td><td>7,50%</td><td>2 889 zł</td><td>4 334 zł</td></tr>
            <tr><td>6,92% (szczyt 2023)</td><td>8,92%</td><td>3 183 zł</td><td>4 775 zł</td></tr>
          </tbody>
        </table>
        <p>Różnica między dołkiem WIBOR (0,19% w 2021) a szczytem (6,92% w 2023) to 6,73 pp. Dla kredytu 400 000 zł oznaczało to wzrost raty z 1 643 zł do 3 183 zł — o 94% więcej.</p>

        <h2>Historia WIBOR — lekcja z lat 2021-2023</h2>
        <p>W 2021 roku WIBOR 3M wynosił zaledwie 0,19%. W 2023 roku osiągnął 6,92%. To oznacza, że rata kredytu 400 000 zł na 25 lat wzrosła z 1 643 zł do 3 183 zł w ciągu zaledwie dwóch lat. Tysiące kredytobiorców doświadczyło szoku stóp procentowych. Od 2024 roku banki oferują stałe oprocentowanie na 5 lub 10 lat jako alternatywę.</p>

        <h2>Stałe vs zmienne oprocentowanie</h2>
        <p>
          <strong>Oprocentowanie stałe</strong> (na 5–10 lat) daje pewność wysokości raty 
          niezależnie od zmian WIBOR. Jest droższe, ale bezpieczniejsze.
        </p>
        <p>
          <strong>Oprocentowanie zmienne</strong> jest tańsze na starcie, ale ryzykowne — 
          rata może wzrosnąć, gdy stopy procentowe pójdą w górę.
        </p>

        <section className="mt-8 border-t border-border pt-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Podstawa prawna i źródła danych</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Obliczenia oparte na wzorach z <a href="https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20170000819" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ustawy o kredycie hipotecznym</a> (Dz.U. 2017 poz. 819)</li>
            <li>Rekomendacje <a href="https://www.knf.gov.pl/dla-rynku/regulacje-i-standaryzacja/rekomendacje-i-zalecenia" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">KNF</a> dot. wyznaczania zdolności kredytowej</li>
            <li>Dane WIBOR z <a href="https://www.nbp.pl/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">NBP</a></li>
          </ul>
        </section>

        <section className="mt-8 bg-primary/10 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-foreground mb-3">💡 Ekspert radzi</h3>
          <p className="text-foreground text-sm italic">
            „Przy kredycie ze zmiennym oprocentowaniem zawsze rób symulację przy wyższym WIBOR. 
            Jeśli Twój budżet nie wytrzyma wzrostu o 2–3 pp, rozważ oprocentowanie stałe lub 
            niższą kwotę kredytu. Wzrost stóp z 0% do 7% w ciągu 2 lat to nie scenariusz 
            pesymistyczny — to rzeczywistość, która wydarzyła się w latach 2021–2023."
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            — Piotr Radwański, analityk finansowy z 14-letnim doświadczeniem
          </p>
        </section>

        <div className="mt-8">
          <Link 
            to="/symulacja-wibor/" 
            className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors"
          >
            Symuluj wpływ WIBOR na ratę
          </Link>
        </div>

        </div>
        <p className="text-sm text-muted-foreground mt-8">
          Data publikacji: <time dateTime="2026-01-15">15 stycznia 2026</time> | 
          Ostatnia aktualizacja: <time dateTime="2026-07-04">4 lipca 2026</time>
        </p>
      </article>
    </TabContainer>
  )
}

export default WiborARataPage
