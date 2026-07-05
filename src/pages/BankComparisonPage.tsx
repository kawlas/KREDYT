import { Link } from 'react-router-dom'
import BankComparisonCalc from '../components/calculators/BankComparisonCalc'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'
import RelatedTools from '../components/seo/RelatedTools'

export default function BankComparisonPage() {
  return (
    <>
      <SEOHead
        title="Kalkulator Kredytu Hipotecznego — Oblicz Ratę i Koszt Kredytu 2026"
        description="Oblicz miesięczną ratę, całkowity koszt i RRSO kredytu hipotecznego. Kalkulator uwzględnia WIBOR na żywo, marżę banku i test warunków skrajnych KNF."
        type="article"
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Kalkulator kredytu hipotecznego', href: '/porownanie-ofert-bankow/' },
        ]}
        schemaType="WebApplication"
      />
      <div className="space-y-8">
        <BankComparisonCalc />
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Jak znaleźć najlepszy kredyt hipoteczny?</h2>
          <p className="text-lg text-gray-600 mb-4">
            Aktualne rankingi i porównania ofert banków prowadzą <strong>Bankier.pl</strong>, <strong>TotalMoney.pl</strong> i <strong>Comperia.pl</strong>.
            Zbierają one dane bezpośrednio z tabel oprocentowania banków i aktualizują je co miesiąc.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Gdzie sprawdzić aktualne oferty?</h3>
            <ul className="space-y-2">
              <li>🔗 <a href="https://www.bankier.pl/smart/kredyty-hipoteczne" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-medium">Bankier.pl — ranking kredytów hipotecznych</a>
                <span className="text-sm text-gray-500"> — comiesięczny ranking redakcyjny</span></li>
              <li>🔗 <a href="https://totalmoney.pl/kredyty-hipoteczne" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-medium">TotalMoney.pl — porównywarka kredytów</a>
                <span className="text-sm text-gray-500"> — na żywo od partnerów</span></li>
            </ul>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Na co zwracać uwagę?</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Marża</strong> — negocjuj ją, banki często obniżają przy dobrych parametrach</li>
            <li><strong>RRSO</strong> — uwzględnia wszystkie koszty, to najlepszy wskaźnik porównawczy</li>
            <li><strong>Warunki nadpłaty</strong> — większość banków nie pobiera opłat po 3 latach</li>
            <li><strong>Dodatkowe produkty</strong> — konto, karta, ubezpieczenie mogą obniżyć marżę</li>
          </ul>
        </section>

        <section className="border-t border-gray-100 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Podstawa prawna i źródła danych</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
            <li>Obliczenia oparte na wzorach z <a href="https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20170000819" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ustawy o kredycie hipotecznym</a> (Dz.U. 2017 poz. 819)</li>
            <li>Rekomendacje <a href="https://www.knf.gov.pl/dla-rynku/regulacje-i-standaryzacja/rekomendacje-i-zalecenia" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">KNF</a> dot. wyznaczania zdolności kredytowej</li>
            <li>WIBOR: <a href="https://www.bankier.pl/mieszkaniowe/stopy-procentowe/wibor" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Bankier.pl</a> (źródło: GPW Benchmark)</li>
            <li>Rankingi ofert: <a href="https://www.bankier.pl/smart/kredyty-hipoteczne" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Bankier.pl</a>, <a href="https://totalmoney.pl/kredyty-hipoteczne" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TotalMoney.pl</a></li>
          </ul>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h3 className="text-sm font-bold text-gray-700 mb-3">Zobacz także:</h3>
          <ul className="space-y-1">
            <li><Link to="/poradniki/jak-obliczyc-rate/" className="text-blue-600 hover:underline text-sm">Jak obliczyć ratę kredytu? — Kompendium wiedzy</Link></li>
            <li><Link to="/poradniki/zdolnosc-kredytowa/" className="text-blue-600 hover:underline text-sm">Zdolność kredytowa — Kompendium wiedzy</Link></li>
          </ul>
        </section>

        <div>
          <AdSlot slot="5567225861" />
        </div>
        <div>
          <FaqBlock items={FAQ_DATA.filter(i => [9, 14, 15].includes(i.id))} />
        </div>
      </div>
      <RelatedTools />
    </>
  )
}
