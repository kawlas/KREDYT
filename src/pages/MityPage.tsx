import { Link } from 'react-router-dom'
import SEOHead from '../components/shared/SEOHead'

const myths = [
  {
    myth: 'Kredyt tylko w banku, w którym mam konto',
    truth: 'Możesz wziąć kredzt w dowolnym banku, niezależnie od tego, gdzie masz konto. Wiele osób negocjuje lepsze warunki w banku, który nie jest ich bankiem prowadzącym. Warto porównać oferty kilku banków przed podjęciem decyzji.'
  },
  {
    myth: 'Im wyższa zdolność kredytowa, tym lepszy kredyt',
    truth: 'Zdolność kredytowa to maksymalna kwota, jaką bank może Ci pożyczyć. To nie znaczy, że powinieneś brać kredyt na maksa. Lepiej wziąć mniejszy kredyt z niższą ratą, która daje Ci bezpieczny margines.'
  },
  {
    myth: 'Wkład własny 20% to zawsze konieczność',
    truth: 'Wiele banków akceptuje 10% wkładu własnego, ale wymaga wtedy ubezpieczenia niskiego wkładu (UNWW). W 2026 roku wciąż działają programy wspierające zakup pierwszej nieruchomości z niższym wkładem.'
  },
  {
    myth: 'Stałe oprocentowanie zawsze się opłaca',
    truth: 'Stałe oprocentowanie daje pewność raty, ale jest zwykle wyższe niż zmienne w momencie podpisania umowy. Opłaca się, gdy stopy są niskie i przewidujesz ich wzrost. W okresie wysokich stóp zmienne oprocentowanie może być korzystniejsze.'
  }
]

export default function MityPage() {
  return (
    <>
      <SEOHead
        title="Mity o kredytach hipotecznych – obalamy popularne mity"
        description="Poznaj prawdę o kredytach hipotecznych. Obalamy najpopularniejsze mity i stereotypy dotyczące zdolności kredytowej, wkładu własnego i oprocentowania."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Mity kredytowe', href: '/mity-kredytowe/' },
        ]}
      />
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Mity o kredytach hipotecznych – obalamy popularne stereotypy</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Wokół kredytów hipotecznych narosło wiele mitów i nieporozumień. W tym artykule 
          rozwiewamy najczęstsze wątpliwości i pokazujemy, jak naprawdę działa rynek kredytowy w Polsce.
        </p>

        <div className="space-y-6">
          {myths.map((item, index) => (
            <div key={index} className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="mb-3">
                <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Mit</span>
                <h2 className="text-2xl font-semibold text-foreground mt-2">{item.myth}</h2>
              </div>
              <div className="pl-4 border-l-4 border-green-500">
                <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mb-2">Prawda</span>
                <p className="text-foreground leading-relaxed">{item.truth}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="p-6 bg-primary/10 rounded-xl border border-primary/30">
          <h2 className="text-2xl font-bold text-foreground mb-4">Sprawdź sam!</h2>
          <p className="text-foreground mb-4">
            Najlepszym sposobem na obalenie mitów jest samodzielne sprawdzenie faktów. 
            Skorzystaj z naszych kalkulatorów i narzędzi:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/zdolnosc-kredytowa/" className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              Sprawdź zdolność kredytową
            </Link>
            <Link to="/kalkulator-raty-kredytu/" className="inline-block bg-card text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors text-sm font-medium">
              Oblicz ratę
            </Link>
            <Link to="/symulacja-wibor/" className="inline-block bg-card text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors text-sm font-medium">
              Symuluj WIBOR
            </Link>
          </div>
        </section>

        <section className="border-t border-border pt-6">
          <h3 className="text-sm font-bold text-foreground mb-3">Zobacz także:</h3>
          <ul className="space-y-1">
            <li><Link to="/poradniki/jak-obliczyc-rate/" className="text-primary hover:underline text-sm">Jak obliczyć ratę kredytu? — Kompendium wiedzy</Link></li>
            <li><Link to="/poradniki/zdolnosc-kredytowa/" className="text-primary hover:underline text-sm">Zdolność kredytowa — Kompendium wiedzy</Link></li>
            <li><Link to="/wakacje-kredytowe/" className="text-primary hover:underline text-sm">Wakacje kredytowe 2026</Link></li>
          </ul>
        </section>
      </div>
    </>
  )
}
