import React from 'react'
import { Link } from 'react-router-dom'
import TabContainer from '../components/layout/TabContainer'
import SEOHead from '../components/shared/SEOHead'
import BreadcrumbNav from '../components/shared/BreadcrumbNav'
import ArticleMeta from '../components/shared/ArticleMeta'

const CreditCapacityCompendiumPage: React.FC = () => {
  return (
    <TabContainer title="Kompendium" subtitle="Wiedza o kredytach hipotecznych">
      <SEOHead 
        title="Zdolność kredytowa – ile możesz pożyczyć?"
        description="Jak bank liczy zdolność? Wpływ formy zatrudnienia, zobowiązań i kosztów utrzymania. Porady eksperta."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Poradniki', href: '/poradniki/' },
          { name: 'Zdolność kredytowa', href: '/poradniki/zdolnosc-kredytowa/' },
        ]}
        schemaType="Article"
      />
      
      <BreadcrumbNav pathname="/poradniki/zdolnosc-kredytowa/" />
      <article>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Zdolność kredytowa — ile możesz pożyczyć? — Kompendium wiedzy</h1>
        <ArticleMeta date="lipiec 2026" expert="Piotr Radwański" />
        <div>
        
        <p className="text-lg text-gray-600 mb-8">
          Zdolność kredytowa to najważniejsza liczba, którą powinieneś poznać przed rozpoczęciem 
          poszukiwań mieszkania. To ona decyduje, czy bank udzieli Ci kredytu i w jakiej wysokości. 
          Wbrew pozorom zdolność kredytowa to nie to samo co „ile zarabiam" — banki mają własne, 
          rygorystyczne metody kalkulacji.
        </p>

        <h2>Jak bank oblicza zdolność kredytową — krok po kroku</h2>
        <p>
          Każdy bank w Polsce działa zgodnie z <strong>Rekomendacją S Komisji Nadzoru Finansowego</strong> (KNF), 
          która określa minimalne standardy oceny zdolności kredytowej.
        </p>

        <h3>Krok 1 — Dochody netto miesięczne</h3>
        <p>Bank sumuje wszystkie udokumentowane dochody gospodarstwa domowego:</p>
        <ul>
          <li><strong>Umowa o pracę (UoP)</strong> — 100% dochodu netto</li>
          <li><strong>Działalność gospodarcza (B2B)</strong> — średnia z 12–24 miesięcy, pomniejszona o 20–30%</li>
          <li><strong>Umowy zlecenia/o dzieło</strong> — średnia z 6–12 miesięcy</li>
          <li><strong>Najem nieruchomości</strong> — udokumentowany umowami</li>
          <li><strong>Alimenty, renty, emerytury</strong> — w 100%</li>
        </ul>

        <h3>Krok 2 — Koszty utrzymania gospodarstwa domowego</h3>
        <p>Bank nie przyjmuje deklarowanych wydatków — stosuje szacowane wskaźniki:</p>
        <table>
          <thead>
            <tr>
              <th>Liczba osób</th>
              <th>Szacowane koszty utrzymania</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1 osoba</td><td>30–35% dochodu</td></tr>
            <tr><td>2 osoby</td><td>30–40% dochodu</td></tr>
            <tr><td>3 osoby</td><td>35–45% dochodu</td></tr>
            <tr><td>4+ osób</td><td>40–50% dochodu</td></tr>
          </tbody>
        </table>

        <h3>Krok 3 — Istniejące zobowiązania</h3>
        <p>
          Każdy kredyt, limit na karcie kredytowej, a nawet raty za telefon komórkowy obniżają 
          Twoją zdolność kredytową. Bank traktuje to jako miesięczne zobowiązanie.
        </p>

        <h3>Krok 4 — Bufor na wzrost stóp procentowych</h3>
        <p>
          Zgodnie z Rekomendacją S KNF, banki muszą uwzględnić bufor w wysokości co najmniej 
          <strong> 2,5 punktu procentowego</strong> do oprocentowania nominalnego kredytu. To oznacza, 
          że zdolność jest obliczana przy założeniu wyższego oprocentowania niż obecne.
        </p>

        <h3>Krok 5 — Ocena scoringowa BIK</h3>
        <p>
          Bank sprawdza Twoją historię kredytową w Biurze Informacji Kredytowej (BIK). 
          Negatywne wpisy (opóźnienia w spłatach) mogą całkowicie zablokować kredyt.
        </p>

        <h2>Bufor na wzrost stóp procentowych</h2>
        <p>Zgodnie z Rekomendacją S KNF, banki muszą uwzględnić bufor w wysokości co najmniej 2,5 punktu procentowego do oprocentowania nominalnego kredytu. Oznacza to, że zdolność jest obliczana przy założeniu wyższego oprocentowania niż obecne. To zabezpieczenie chroni zarówno kredytobiorcę, jak i bank przed ryzykiem wzrostu stóp procentowych.</p>

        <h3>Wpływ formy zatrudnienia na zdolność</h3>
        <p>Umowa o pracę (UoP) to najlepiej widziana forma zatrudnienia — bank bierze pod uwagę 100% dochodu netto. Dla działalności gospodarczej (B2B) banki uśredniają dochód z 12-24 miesięcy i często pomniejszają go o 20-30%. Umowy zlecenia i o dzieło są akceptowane po udokumentowaniu średniej z 6-12 miesięcy. Osoby pracujące za granicą mogą liczyć na ograniczone uznanie dochodu — niektóre banki akceptują tylko 50-70%.</p>

        <h3>Limit wieku a zdolność kredytowa</h3>
        <p>Większość banków wymaga spłaty kredytu przed 70. lub 75. rokiem życia. Dla 45-latka oznacza to maksymalny okres kredytowania 25-30 lat, co przekłada się na wyższą ratę miesięczną i niższą dostępną kwotę kredytu. Osoby starsze mogą skorzystać z opcji współkredytobiorcy (np. dorosłe dzieci).</p>

        <h2>Jak zwiększyć zdolność kredytową?</h2>
        <ul>
          <li><strong>Spłać zobowiązania</strong> — nawet niewielka spłata karty kredytowej pomaga</li>
          <li><strong>Dodaj współkredytobiorcę</strong> — wspólny kredyt z partnerem zwiększa zdolność nawet o 50%</li>
          <li><strong>Zmień formę zatrudnienia</strong> — UoP jest najlepiej widziana przez banki</li>
          <li><strong>Poczekaj na premię</strong> — udokumentowany dochód z premii zwiększa zdolność</li>
          <li><strong>Ogranicz wydatki</strong> — im mniejsze koszty utrzymania, tym wyższa zdolność</li>
        </ul>

        <section className="mt-8 border-t border-gray-100 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Podstawa prawna i źródła danych</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
            <li>Obliczenia oparte na wzorach z <a href="https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20170000819" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ustawy o kredycie hipotecznym</a> (Dz.U. 2017 poz. 819)</li>
            <li>Rekomendacje <a href="https://www.knf.gov.pl/dla-rynku/regulacje-i-standaryzacja/rekomendacje-i-zalecenia" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">KNF</a> dot. wyznaczania zdolności kredytowej</li>
            <li>Dane WIBOR z <a href="https://www.nbp.pl/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NBP</a></li>
          </ul>
        </section>

        <section className="mt-8 bg-blue-50 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Ekspert radzi</h3>
          <p className="text-gray-700 text-sm italic">
            „Najczęstszym błędem jest sprawdzanie zdolności tuż przed wizytą w banku. Zacznij 
            planować 6–12 miesięcy wcześniej. Spłać zobowiązania, zbierz dokumenty dochodowe 
            i nie składaj wniosków do wielu banków jednocześnie — każde zapytanie obniża Twój scoring."
          </p>
          <p className="text-gray-500 text-xs mt-2">
            — Piotr Radwański, analityk finansowy z 14-letnim doświadczeniem
          </p>
        </section>

        <div className="mt-8">
          <Link 
            to="/zdolnosc-kredytowa/" 
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Sprawdź swoją zdolność w kalkulatorze
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

export default CreditCapacityCompendiumPage
