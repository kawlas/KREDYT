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
        title="Porównanie banków – kalkulator kredytu"
        description="Oblicz miesięczną ratę, całkowity koszt i RRSO kredytu hipotecznego. Kalkulator uwzględnia WIBOR na żywo, marżę banku i test warunków skrajnych KNF."
        type="article"
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Kalkulator kredytu hipotecznego', href: '/porownanie-ofert-bankow/' },
        ]}
        schemaType="WebApplication"
      />
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-foreground">
          Kalkulator kredytu hipotecznego
        </h1>
        <p className="text-lg text-muted-foreground">
          Oblicz ratę i koszt kredytu dla swoich parametrów. Wpisz kwotę, okres, marżę — resztę liczy kalkulator.
        </p>

        <BankComparisonCalc />

        <section>
          <h2 className="text-2xl font-bold text-foreground">Jak znaleźć najlepszy kredyt hipoteczny?</h2>
          <p className="text-muted-foreground">
            Aktualne rankingi i porównania ofert banków prowadzą <strong>Bankier.pl</strong>, <strong>TotalMoney.pl</strong> i <strong>Comperia.pl</strong>.
            Zbierają one dane bezpośrednio z tabel oprocentowania banków i aktualizują je co miesiąc.
          </p>
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mt-4">
            <h3 className="font-semibold text-primary mb-2">Gdzie sprawdzić aktualne oferty?</h3>
            <ul className="space-y-2">
              <li>🔗 <a href="https://www.bankier.pl/smart/kredyty-hipoteczne" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Bankier.pl — ranking kredytów hipotecznych</a>
                <span className="text-muted-foreground"> — comiesięczny ranking redakcyjny</span></li>
              <li>🔗 <a href="https://totalmoney.pl/kredyty-hipoteczne" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">TotalMoney.pl — porównywarka kredytów</a>
                <span className="text-muted-foreground"> — na żywo od partnerów</span></li>
            </ul>
          </div>
          <h3 className="text-xl font-semibold text-foreground mt-6">Na co zwracać uwagę?</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Marża</strong> — negocjuj ją, banki często obniżają przy dobrych parametrach</li>
            <li><strong>RRSO</strong> — uwzględnia wszystkie koszty, to najlepszy wskaźnik porównawczy</li>
            <li><strong>Warunki nadpłaty</strong> — większość banków nie pobiera opłat po 3 latach</li>
            <li><strong>Dodatkowe produkty</strong> — konto, karta, ubezpieczenie mogą obniżyć marżę</li>
          </ul>
        </section>

        <section className="border-t border-border pt-6">
          <h2 className="text-2xl font-bold text-foreground">Podstawa prawna i źródła danych</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Obliczenia oparte na wzorach z <a href="https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20170000819" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ustawy o kredycie hipotecznym</a> (Dz.U. 2017 poz. 819)</li>
            <li>Rekomendacje <a href="https://www.knf.gov.pl/dla-rynku/regulacje-i-standaryzacja/rekomendacje-i-zalecenia" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">KNF</a> dot. wyznaczania zdolności kredytowej</li>
            <li>WIBOR: <a href="https://www.bankier.pl/mieszkaniowe/stopy-procentowe/wibor" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Bankier.pl</a> (źródło: GPW Benchmark)</li>
            <li>Rankingi ofert: <a href="https://www.bankier.pl/smart/kredyty-hipoteczne" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Bankier.pl</a>, <a href="https://totalmoney.pl/kredyty-hipoteczne" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TotalMoney.pl</a></li>
          </ul>
        </section>

        <section className="border-t border-border pt-6">
          <h3 className="text-lg font-bold text-foreground">Zobacz także:</h3>
          <ul className="space-y-1">
            <li><Link to="/poradniki/jak-obliczyc-rate/" className="text-primary hover:underline">Jak obliczyć ratę kredytu? — Kompendium wiedzy</Link></li>
            <li><Link to="/poradniki/zdolnosc-kredytowa/" className="text-primary hover:underline">Zdolność kredytowa — Kompendium wiedzy</Link></li>
          </ul>
        </section>

        <AdSlot slot="5567225861" />
        <FaqBlock items={FAQ_DATA.filter(i => [9, 14, 15].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}
