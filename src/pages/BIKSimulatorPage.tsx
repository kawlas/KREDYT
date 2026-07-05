import BIKSimulator from '../components/calculators/BIKSimulator'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import FaqBlock from '../components/seo/FaqBlock'
import RelatedTools from '../components/seo/RelatedTools'

const bikFaq = [
  {
    id: 101,
    question: 'Czym jest scoring BIK i jak jest obliczany?',
    answer: 'Scoring BIK to punktowa ocena wiarygodności kredytowej obliczana na podstawie historii spłat, zadłużenia, liczby zapytań kredytowych i innych czynników. Banki korzystają z niego przy decyzji o udzieleniu kredytu. Im wyższy wynik (w skali 200-800), tym lepsze masz szanse na kredyt i korzystniejsze warunki.',
  },
  {
    id: 102,
    question: 'Jaki scoring BIK jest wymagany do kredytu hipotecznego?',
    answer: 'Większość banków wymaga scoringu na poziomie co najmniej 400-500 pkt. Wynik powyżej 600 pkt znacznie zwiększa szanse na korzystną ofertę. Przy scoringu poniżej 400 pkt banki mogą odmówić kredytu lub zażądać dodatkowych zabezpieczeń.',
  },
  {
    id: 103,
    question: 'Jak szybko mogę poprawić swój scoring BIK?',
    answer: 'Regularne spłaty wszystkich zobowiązań przez minimum 6-12 miesięcy to najszybsza droga do poprawy. Unikaj nowych zapytań kredytowych, spłacaj karty kredytowe i redukuj zadłużenie. Pozytywne zmiany widać zwykle po 3-6 miesiącach systematycznej poprawy.',
  },
  {
    id: 104,
    question: 'Czy sprawdzenie swojego scoringu w BIK obniża wynik?',
    answer: 'Nie — sprawdzenie własnego scoringu (tzw. zapytanie konsumenckie) nie wpływa na Twój wynik. Dopiero zapytania składane przez banki przy wnioskach kredytowych są rejestrowane i mogą wpływać na ocenę, szczególnie gdy jest ich wiele w krótkim czasie.',
  },
  {
    id: 105,
    question: 'Jak długo negatywne informacje pozostają w BIK?',
    answer: 'Negatywne informacje, takie jak opóźnienia w spłatach, są przechowywane w BIK przez 5 lat od daty ich wystąpienia lub spłaty zadłużenia. Informacje pozytywne są przechowywane dłużej i budują Twoją historię kredytową.',
  },
]

export default function BIKSimulatorPage() {
  return (
    <>
      <SEOHead
        title="Symulator BIK — co wpływa na scoring kredytowy? | Kalkulator Kredytowy"
        description="Sprawdź, jakie czynniki wpływają na Twój scoring BIK. Symulator pokaże Ci, jak terminowe spłaty, opóźnienia i inne czynniki zmieniają Twój wynik punktowy."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Co wpływa na zdolność', href: '/co-wplywa-na-zdolnosc/' },
        ]}
        schemaType="WebApplication"
        faqItems={bikFaq.map(i => ({ question: i.question, answer: i.answer }))}
      />

      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Co wpływa na scoring BIK?
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Zaznacz czynniki, które Cię dotyczą i sprawdź, jak zmienia się Twój wynik w skali 200-800.
          Dowiedz się, co możesz poprawić, aby zwiększyć szanse na kredyt.
        </p>

        <BIKSimulator />

        <div>
          <AdSlot slot="5567225861" />
        </div>

        <div>
          <FaqBlock items={bikFaq} title="Najczęstsze pytania o scoring BIK" />
        </div>
      </div>

      <RelatedTools />
    </>
  )
}
