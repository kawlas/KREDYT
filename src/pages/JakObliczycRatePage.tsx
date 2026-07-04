import React from 'react'
import { Link } from 'react-router-dom'
import TabContainer from '../components/layout/TabContainer'
import SEOHead from '../components/shared/SEOHead'
import BreadcrumbNav from '../components/shared/BreadcrumbNav'
import ArticleMeta from '../components/shared/ArticleMeta'

const JakObliczycRatePage: React.FC = () => {
  return (
    <TabContainer title="Kompendium" subtitle="Wiedza o kredytach hipotecznych">
      <SEOHead 
        title="Jak obliczyć ratę kredytu hipotecznego? — Kompendium wiedzy"
        description="Poznaj wzory matematyczne, wpływ WIBOR i oprocentowania na ratę kredytu hipotecznego. Kompleksowe kompendium z przykładami liczbowymi."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Poradniki', href: '/poradniki/' },
          { name: 'Jak obliczyć ratę', href: '/poradniki/jak-obliczyc-rate/' },
        ]}
        schemaType="Article"
      />
      
      <BreadcrumbNav pathname="/poradniki/jak-obliczyc-rate/" />
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Jak obliczyć ratę kredytu hipotecznego? — Kompendium wiedzy</h1>
        <ArticleMeta date="lipiec 2026" expert="Piotr Radwański" />
        <div className="prose prose-blue">
        
        <p className="text-lg text-gray-600 mb-8">
          Zastanawiasz się, ile wyniesie Twoja miesięczna rata kredytu hipotecznego? To pytanie zadaje 
          sobie każdy, kto planuje zakup mieszkania lub domu. Wysokość raty to nie tylko kwestia 
          codziennego budżetu — to fundament, na którym opiera się decyzja o zaciągnięciu zobowiązania 
          na 25–35 lat.
        </p>

        <h2>Wzór matematyczny raty stałej (annuity)</h2>
        <p>
          Większość kredytów hipotecznych w Polsce spłacana jest w racie stałej (annuity). Oznacza to, 
          że przez cały okres kredytowania spłacasz co miesiąc tę samą kwotę.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4">
          R = K × [ r × (1 + r)ⁿ ] / [ (1 + r)ⁿ – 1 ]
        </div>
        <p>Gdzie:</p>
        <ul>
          <li><strong>R</strong> — miesięczna rata</li>
          <li><strong>K</strong> — kwota kredytu (kapitał)</li>
          <li><strong>r</strong> — miesięczne oprocentowanie (oprocentowanie roczne / 12)</li>
          <li><strong>n</strong> — liczba miesięcy spłaty (okres kredytowania × 12)</li>
        </ul>

        <h2>Przykład: kredyt 400 000 zł na 25 lat</h2>
        <p>
          Dla kredytu 400 000 zł na 25 lat przy oprocentowaniu 7% rocznie:
        </p>
        <ul>
          <li>r = 0,07 / 12 = 0,005833</li>
          <li>n = 25 × 12 = 300</li>
          <li>R = 400 000 × [0,005833 × (1,005833)³⁰⁰] / [(1,005833)³⁰⁰ – 1] = <strong>2 804 zł</strong></li>
        </ul>

        <h2>Co wpływa na ratę kredytu?</h2>
        <table>
          <thead>
            <tr>
              <th>Czynnik</th>
              <th>Wpływ na ratę</th>
              <th>Uwagi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Kwota kredytu</strong></td>
              <td>Im wyższa, tym wyższa rata</td>
              <td>Liniowo — 2× kwota = 2× rata</td>
            </tr>
            <tr>
              <td><strong>Okres kredytowania</strong></td>
              <td>Im dłuższy, tym niższa rata</td>
              <td>Ale więcej odsetek w sumie</td>
            </tr>
            <tr>
              <td><strong>Oprocentowanie</strong></td>
              <td>Najsilniejszy wpływ</td>
              <td>Wzrost o 1pp = znaczący wzrost raty</td>
            </tr>
            <tr>
              <td><strong>Marża banku</strong></td>
              <td>Stała część oprocentowania</td>
              <td>Zależy od zdolności kredytowej i wkładu własnego</td>
            </tr>
            <tr>
              <td><strong>WIBOR</strong></td>
              <td>Zmienna część oprocentowania</td>
              <td>Determinowana przez rynek międzybankowy</td>
            </tr>
          </tbody>
        </table>

        <h2>Wpływ WIBOR na ratę — symulacja</h2>
        <p>
          Oprocentowanie kredytu = WIBOR 3M + marża banku. Przykładowo: jeśli WIBOR 3M wynosi 5,50% 
          a marża banku to 1,90%, całkowite oprocentowanie wynosi 7,40% w skali roku.
        </p>

        <h2>Przykład krok po kroku — kredyt 400 000 zł na 25 lat</h2>
        <p>Szczegółowa symulacja pokazująca rozkład kapitału i odsetek w czasie:</p>
        <ul>
          <li><strong>Kwota kredytu:</strong> 400 000 zł</li>
          <li><strong>Okres:</strong> 25 lat (300 miesięcy)</li>
          <li><strong>Oprocentowanie:</strong> 7,00% (WIBOR 5,00% + marża 2,00%)</li>
        </ul>
        <p>Po 5 latach spłacania kredytu (60 rat × 2 804 zł = 168 240 zł wpłacone), kapitał zmniejszył się tylko o 36 524 zł. Reszta (131 716 zł) poszła na odsetki. Dopiero po ok. 18 latach odsetki i kapitał w racie zrównują się.</p>

        <h3>Wpływ skrócenia okresu kredytowania</h3>
        <table>
          <thead><tr><th>Okres</th><th>Rata miesięczna</th><th>Suma odsetek</th><th>Oszczędność vs 25 lat</th></tr></thead>
          <tbody>
            <tr><td>20 lat</td><td>3 101 zł</td><td>344 240 zł</td><td>+96 953 zł</td></tr>
            <tr><td><strong>25 lat</strong></td><td><strong>2 804 zł</strong></td><td><strong>441 193 zł</strong></td><td>–</td></tr>
            <tr><td>30 lat</td><td>2 661 zł</td><td>557 960 zł</td><td>-116 767 zł</td></tr>
            <tr><td>35 lat</td><td>2 582 zł</td><td>684 440 zł</td><td>-243 247 zł</td></tr>
          </tbody>
        </table>
        <p>Przy kredycie 400 000 zł na 25 lat zapłacisz bankowi ponad 440 000 zł samych odsetek. Skrócenie okresu do 20 lat podniesie ratę do ok. 3 101 zł, ale odsetki spadną do ok. 344 240 zł — oszczędność blisko 100 000 zł.</p>

        <h2>Najczęstsze błędy przy obliczaniu raty</h2>
        <ol>
          <li><strong>Pomylenie oprocentowania nominalnego z RRSO</strong> — Oprocentowanie 6% nie oznacza 6% od kwoty kredytu rocznie.</li>
          <li><strong>Ignorowanie okresu kredytowania</strong> — Dłuższy okres = niższa rata, ale wyższe całkowite odsetki.</li>
          <li><strong>Nieuwzględnienie ubezpieczeń</strong> — UNWW, ubezpieczenie nieruchomości i na życie podnoszą koszt o 50-120 zł/mc.</li>
          <li><strong>Brak symulacji na wyższe oprocentowanie</strong> — Zawsze pytaj o symulację przy WIBOR wyższym o 2-3 pp.</li>
        </ol>

        <h2>RRSO — co to jest i jak się liczy?</h2>
        <p>
          <strong>RRSO (Rzeczywista Roczna Stopa Oprocentowania)</strong> to wskaźnik, który uwzględnia 
          całkowity koszt kredytu — nie tylko odsetki, ale także prowizje, ubezpieczenia, opłaty 
          administracyjne i inne koszty. To najbardziej miarodajny wskaźnik do porównywania ofert.
        </p>

        <h2>Rata stała vs malejąca</h2>
        <p>
          <strong>Rata stała (annuity)</strong> — taka sama kwota co miesiąc. Początkowo większa część 
          raty to odsetki, z czasem proporcje odwracają się.
        </p>
        <p>
          <strong>Rata malejąca</strong> — część kapitałowa stała, odsetki maleją. Startuje od wyższej 
          wartości, ale z czasem staje się coraz niższa. W całym okresie suma odsetek jest niższa niż 
          przy racie stałej.
        </p>

        <section className="mt-8 border-t border-gray-100 pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Podstawa prawna i źródła danych</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
            <li>Obliczenia oparte na wzorach z <a href="https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20170000819" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ustawy o kredycie hipotecznym</a> (Dz.U. 2017 poz. 819)</li>
            <li>Rekomendacje <a href="https://www.knf.gov.pl/dla-rynku/regulacje-i-standaryzacja/rekomendacje-i-zalecenia" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">KNF</a> dot. wyznaczania zdolności kredytowej</li>
            <li>Dane WIBOR z <a href="https://www.nbp.pl/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NBP</a></li>
          </ul>
        </section>

        <section className="mt-8 bg-blue-50 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Ekspert radzi</h3>
          <p className="text-gray-700 text-sm italic">
            „Obliczenie raty kredytu to matematyka, ale zrozumienie jej konsekwencji to już sztuka 
            planowania finansowego. Największym błędem kredytobiorców jest patrzenie tylko na miesięczną 
            ratę, a nie na całkowity koszt kredytu. Kredyt na 35 lat to wprawdzie niższa rata o 200–300 zł, 
            ale koszt odsetek wyższy o 200–300 tysięcy złotych."
          </p>
          <p className="text-gray-500 text-xs mt-2">
            — Piotr Radwański, analityk finansowy z 14-letnim doświadczeniem
          </p>
        </section>

        <div className="mt-8">
          <Link 
            to="/kalkulator-raty-kredytu/" 
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Oblicz swoją ratę w kalkulatorze
          </Link>
        </div>

        </div>
        <p className="text-sm text-gray-400 mt-8">
          Data publikacji: <time dateTime="2026-01-15">15 stycznia 2026</time> | 
          Ostatnia aktualizacja: <time dateTime="2026-07-04">4 lipca 2026</time>
        </p>
      </article>
    </TabContainer>
  )
}

export default JakObliczycRatePage
