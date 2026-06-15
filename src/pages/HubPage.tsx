import { Link } from 'react-router-dom'
import SEOHead from '../components/shared/SEOHead'
import Card from '../components/shared/Card'
import AdSlot from '../components/shared/AdSlot'

const tools = [
  { to: '/zdolnosc-kredytowa/', title: 'Zdolność kredytowa', desc: 'Ile maksymalnie możesz pożyczyć? Sprawdź w 30 sekund.', step: 1 },
  { to: '/kalkulator-raty-kredytu/', title: 'Kalkulator raty', desc: 'Oblicz miesięczną ratę, RRSO i całkowity koszt kredytu.', step: 2 },
  { to: '/raty-rowne-czy-malejace/', title: 'Raty równe czy malejące', desc: 'Który typ rat wybrać? Porównaj koszty.', step: 3 },
  { to: '/symulacja-wibor/', title: 'Symulacja WIBOR', desc: 'Co stanie się z ratą, gdy stopy wzrosną?', step: 4 },
  { to: '/odsetki-dzienne/', title: 'Odsetki dzienne', desc: 'Jak bank nalicza odsetki każdego dnia.', step: 5 },
  { to: '/symulator-nadplat/', title: 'Symulator nadpłat', desc: 'Ile zaoszczędzisz nadpłacając kredyt?', step: 6 },
  { to: '/refinansowanie-kredytu/', title: 'Refinansowanie', desc: 'Czy warto przenieść kredyt do innego banku?', step: 7 },
  { to: '/porownanie-ofert-bankow/', title: 'Porównanie banków', desc: 'Który bank najtaniej? PKO BP, ING, Santander...', step: 8 },
]

const steps = [
  { num: '01', title: 'Wpisz dane kredytu', desc: 'Kwota, okres, oprocentowanie — wystarczą 4 pola.' },
  { num: '02', title: 'Zobacz pełny koszt', desc: 'Rata, RRSO, całkowity koszt — w jednym miejscu.' },
  { num: '03', title: 'Porównaj i zapisz', desc: 'Zestaw oferty, zapisz lokalnie, bez rejestracji.' },
]

export default function HubPage() {
  return (
    <div className="space-y-16 pb-8">
      <SEOHead
        title="Kalkulator Kredytu Hipotecznego — Sprawdź Ratę, RRSO i Zdolność"
        description="Darmowy kalkulator kredytu hipotecznego. Oblicz ratę, RRSO, zdolność. Porównaj oferty banków. Aktualny WIBOR. Bez rejestracji."
      />

      {/* Hero */}
      <section className="text-center pt-8 sm:pt-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
          Kalkulator Kredytu<br /><span className="text-blue-600">Hipotecznego</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Sprawdź ratę, zdolność i całkowity koszt w 30 sekund. Bez rejestracji, bez ukrytych opłat.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/kalkulator-raty-kredytu/" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm text-lg">
            Oblicz ratę
          </Link>
          <Link to="/zdolnosc-kredytowa/" className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-lg">
            Sprawdź zdolność
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">Jak to działa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(s => (
            <div key={s.num} className="text-center">
              <div className="text-4xl font-bold text-blue-100 mb-4">{s.num}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad placement */}
      <div className="py-4">
        <AdSlot slot="5567225861" />
      </div>

      {/* Tools grid */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">Co możesz zrobić</h2>
        <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
          Narzędzia ułożone od decyzji o kredycie po wybór najlepszej oferty.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map(tool => (
            <Link key={tool.to} to={tool.to} className="group block bg-white rounded-xl border border-gray-100 p-6 hover:border-blue-200 hover:shadow-md transition-all">
              <div className="text-xs font-bold text-blue-400 mb-2">KROK {tool.step}</div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{tool.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{tool.desc}</p>
              <div className="mt-4 text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Sprawdź &rarr;</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="bg-gray-50 rounded-2xl p-8 sm:p-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Zaufaj liczbom</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div><div className="text-3xl font-bold text-blue-600 mb-1">61</div><div className="text-sm text-gray-500">testów sprawdza poprawność każdego obliczenia</div></div>
          <div><div className="text-3xl font-bold text-blue-600 mb-1">Bankier.pl</div><div className="text-sm text-gray-500">aktualny WIBOR pobierany automatycznie</div></div>
          <div><div className="text-3xl font-bold text-blue-600 mb-1">Ustawa</div><div className="text-sm text-gray-500">zgodność z ustawą o kredycie hipotecznym</div></div>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Najczęściej zadawane pytania</h2>
          <Link to="/faq-kredyt-hipoteczny/" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            Zobacz wszystkie &rarr;
          </Link>
        </div>
        <div className="space-y-3">
          {[
            { q: 'Czym jest RRSO i dlaczego jest ważne?', a: 'RRSO (Rzeczywista Roczna Stopa Oprocentowania) to całkowity koszt kredytu wyrażony w procentach. Uwzględnia nie tylko oprocentowanie, ale też prowizje, ubezpieczenia i inne opłaty. To najważniejszy wskaźnik przy porównywaniu ofert.' },
            { q: 'Raty równe czy malejące — które wybrać?', a: 'Raty równe są niższe na początku i przewidywalne — dobre przy ograniczonym budżecie. Raty malejące kosztują mniej odsetek w całym okresie, ale pierwsze raty są wyższe. Różnica przy kredycie 400 000 zł na 25 lat to nawet kilkadziesiąt tysięcy złotych.' },
            { q: 'Czy nadpłata kredytu zawsze się opłaca?', a: 'Tak — każda nadpłata zmniejsza kapitał, od którego naliczane są odsetki. Przy oprocentowaniu zmiennym, po 1. roku od zawarcia umowy bank nie może pobierać prowizji za nadpłatę (ustawa o kredycie hipotecznym).' },
          ].map((faq, i) => (
            <Card key={i} className="!p-5">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                  <svg className="w-5 h-5 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
