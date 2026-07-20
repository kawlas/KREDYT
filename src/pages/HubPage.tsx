import { Link } from 'react-router-dom'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'

interface Tool {
  to: string
  title: string
  desc: string
}

interface Phase {
  id: string
  title: string
  subtitle: string
  tools: Tool[]
}

const phases: Phase[] = [
  {
    id: 'sprawdz',
    title: 'Sprawdź',
    subtitle: 'Ile możesz dostać? Ile zapłacisz?',
    tools: [
      { to: '/zdolnosc-kredytowa/', title: 'Zdolność kredytowa', desc: 'Ile maksymalnie możesz pożyczyć? Sprawdź w 30 sekund.' },
      { to: '/kalkulator-raty-kredytu/', title: 'Kalkulator raty', desc: 'Oblicz miesięczną ratę, RRSO i całkowity koszt kredytu.' },
      { to: '/ltv-kalkulator/', title: 'Kalkulator LTV', desc: 'Jaki wkład własny jest potrzebny? Sprawdź wskaźnik LTV.' },
      { to: '/co-wplywa-na-zdolnosc/', title: 'Co wpływa na zdolność?', desc: 'Sprawdź, jak scoring BIK zmienia się pod wpływem różnych czynników.' },
      { to: '/raty-rowne-czy-malejace/', title: 'Raty równe czy malejące', desc: 'Który typ rat wybrać? Porównaj koszty.' },
    ],
  },
  {
    id: 'symuluj',
    title: 'Symuluj',
    subtitle: 'A co jeśli? Sprawdź scenariusze.',
    tools: [
      { to: '/symulacja-wibor/', title: 'Symulacja WIBOR', desc: 'Co stanie się z ratą, gdy stopy wzrosną lub spadną?' },
      { to: '/symulator-nadplat/', title: 'Symulator nadpłat', desc: 'Ile zaoszczędzisz nadpłacając kredyt?' },
      { to: '/odsetki-dzienne/', title: 'Odsetki dzienne', desc: 'Jak bank nalicza odsetki każdego dnia? act/365 vs act/360.' },
    ],
  },
  {
    id: 'porownaj',
    title: 'Porównaj',
    subtitle: 'Gdzie jest najlepiej? Znajdź optymalną ofertę.',
    tools: [
      { to: '/stale-vs-zmienne-oprocentowanie/', title: 'Stałe czy zmienne', desc: 'Które oprocentowanie wybrać? Porównaj koszty.' },
      { to: '/porownanie-ofert-bankow/', title: 'Porównanie banków', desc: 'Który bank najtaniej? PKO BP, ING, Santander...' },
      { to: '/refinansowanie-kredytu/', title: 'Refinansowanie', desc: 'Czy warto przenieść kredyt do innego banku?' },
      { to: '/ukryte-koszty-kredytu/', title: 'Ukryte koszty kredytu', desc: 'Sprawdź 20+ ukrytych opłat które bank może naliczyć.' },
    ],
  },
]

const steps = [
  { num: '01', title: 'Sprawdź swoją sytuację', desc: 'Zdolność, rata, LTV, typ rat — poznaj swoje możliwości.' },
  { num: '02', title: 'Symuluj scenariusze', desc: 'WIBOR, nadpłaty, odsetki — sprawdź, co się stanie gdy...' },
  { num: '03', title: 'Porównaj i wybierz', desc: 'Zestaw oferty banków, sprawdź refinansowanie, wybierz najlepsze.' },
]

export default function HubPage() {
  return (
    <div className="space-y-16 pb-8">
      <SEOHead
        title="Kalkulator kredytu hipotecznego – sprawdź ratę"
        description="Darmowy kalkulator kredytu hipotecznego. Oblicz ratę, RRSO, zdolność, LTV. Porównaj oprocentowanie stałe vs zmienne i oferty banków. Aktualny WIBOR. Bez rejestracji."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
        ]}
      />

      {/* Hero */}
      <section className="pt-8 sm:pt-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-6">
          Kalkulator Kredytu<br /><span className="text-primary">Hipotecznego</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Sprawdź ratę, zdolność i całkowity koszt w 30 sekund. Bez rejestracji, bez ukrytych opłat. Autor: Tony Halik, ekspert rynku kredytowego.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/kalkulator-raty-kredytu/" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-sm text-lg">
            Oblicz ratę
          </Link>
          <Link to="/zdolnosc-kredytowa/" className="inline-flex items-center justify-center px-8 py-4 bg-card text-foreground font-semibold rounded-xl border border-border hover:border-border hover:bg-muted transition-colors text-lg">
            Sprawdź zdolność
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-12">Jak to działa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(s => (
            <div key={s.num}>
              <div className="text-4xl font-bold text-primary-foreground mb-4">{s.num}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad placement */}
      <div className="py-4">
        <AdSlot slot="5567225861" />
      </div>

      {/* Tools by phase */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-12">Co możesz zrobić</h2>
        {phases.map((phase, idx) => {
          const borderClass = idx === 0 ? 'border-l-blue-500' : idx === 1 ? 'border-l-emerald-500' : 'border-l-violet-500'
          const badgeClass = idx === 0 ? 'bg-primary/10 text-primary' : idx === 1 ? 'bg-emerald-50 text-emerald-700' : 'bg-violet-50 text-violet-700'
          const hoverBorderClass = idx === 0 ? 'hover:border-primary/40' : idx === 1 ? 'hover:border-emerald-200' : 'hover:border-violet-200'
          const hoverTextClass = idx === 0 ? 'group-hover:text-primary' : idx === 1 ? 'group-hover:text-emerald-600' : 'group-hover:text-violet-600'
          const arrowClass = idx === 0 ? 'text-primary' : idx === 1 ? 'text-emerald-600' : 'text-violet-600'
          return (
            <section key={phase.id} className="mb-12 last:mb-0">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-foreground">{phase.title}</h2>
                <span className="text-muted-foreground hidden sm:inline">—</span>
                <p className="text-muted-foreground text-lg hidden sm:block">{phase.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {phase.tools.map((tool) => (
                  <Link key={tool.to} to={tool.to} className={`group block bg-card rounded-lg border border-border p-4 border-l-4 ${borderClass} ${hoverBorderClass} hover:shadow-md transition-all`}>
                    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeClass} mb-2`}>{phase.title}</span>
                    <h3 className={`font-semibold text-sm text-foreground mb-1 ${hoverTextClass} transition-colors`}>{tool.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
                    <div className={`mt-3 ${arrowClass} text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity`}>Sprawdź &rarr;</div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </section>

      {/* Trust */}
      <section className="bg-secondary rounded-2xl p-8 sm:p-12">
        <h2 className="text-2xl font-bold text-foreground mb-10">Zaufaj liczbom</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div><div className="text-3xl font-bold text-primary mb-1">61</div><div className="text-sm text-muted-foreground">testów sprawdza poprawność każdego obliczenia</div></div>
          <div><div className="text-3xl font-bold text-primary mb-1">Bankier.pl</div><div className="text-sm text-muted-foreground">aktualny ranking kredytów hipotecznych</div></div>
          <div><div className="text-3xl font-bold text-primary mb-1">WIBOR</div><div className="text-sm text-muted-foreground">aktualne stopy procentowe z rynku międzybankowego</div></div>
          <div><div className="text-3xl font-bold text-primary mb-1">Ustawa</div><div className="text-sm text-muted-foreground">zgodność z ustawą o kredycie hipotecznym</div></div>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Najczęściej zadawane pytania</h2>
          <Link to="/faq-kredyt-hipoteczny/" className="text-primary hover:text-primary font-medium text-sm">
            Zobacz wszystkie &rarr;
          </Link>
        </div>
        <div className="space-y-3">
          {[
            { q: 'Czym jest RRSO i dlaczego jest ważne?', a: 'RRSO (Rzeczywista Roczna Stopa Oprocentowania) to całkowity koszt kredytu wyrażony w procentach. Uwzględnia nie tylko oprocentowanie, ale też prowizje, ubezpieczenia i inne opłaty. To najważniejszy wskaźnik przy porównywaniu ofert.' },
            { q: 'Raty równe czy malejące — które wybrać?', a: 'Raty równe są niższe na początku i przewidywalne — dobre przy ograniczonym budżecie. Raty malejące kosztują mniej odsetek w całym okresie, ale pierwsze raty są wyższe. Różnica przy kredycie 400 000 zł na 25 lat to nawet kilkadziesiąt tysięcy złotych.' },
            { q: 'Czy nadpłata kredytu zawsze się opłaca?', a: 'Tak — każda nadpłata zmniejsza kapitał, od którego naliczane są odsetki. Przy oprocentowaniu zmiennym, po 1. roku od zawarcia umowy bank nie może pobierać prowizji za nadpłatę (ustawa o kredycie hipotecznym).' },
          ].map((faq, i) => (
            <div key={i} className="bg-card rounded-lg border border-border p-4">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-medium text-foreground pr-4">{faq.q}</span>
                  <svg className="w-5 h-5 flex-shrink-0 text-muted-foreground group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs text-muted-foreground text-center">Autor: Tony Halik &middot; ekspert rynku kredytowego</p>
    </div>
  )
}
