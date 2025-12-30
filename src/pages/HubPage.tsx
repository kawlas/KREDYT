import { Link } from 'react-router-dom'
import Card from '../components/shared/Card'
import TabContainer from '../components/layout/TabContainer'
import SEOHead from '../components/shared/SEOHead'

export default function HubPage() {
  return (
    <TabContainer
      title="Kalkulator Kredytu Hipotecznego"
      subtitle="Wszystkie narzędzia w jednym miejscu"
    >
      <SEOHead 
        title="Kalkulator Kredytu Hipotecznego dla Ciebie | Darmowe Narzędzia"
        description="Oblicz ratę, sprawdź zdolność kredytową i analizuj koszty kredytu. Darmowy kalkulator kredytu hipotecznego aktualizowany regularnie. Sprawdź teraz!"
      />
      <div className="space-y-8">
        <section className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-600 mb-6">
            Witaj w centrum wiedzy o kredytach hipotecznych. Skorzystaj z naszych darmowych narzędzi, 
            aby świadomie zaplanować zakup nieruchomości.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/kalkulator-raty-kredytu/" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Oblicz Ratę
            </Link>
            <Link 
              to="/zdolnosc-kredytowa/" 
              className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Sprawdź Zdolność
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/kalkulator-raty-kredytu/">
            <Card title="🧮 Kalkulator Raty" className="h-full hover:shadow-lg transition cursor-pointer">
              <p className="text-gray-600">
                Oblicz wysokość miesięcznej raty dla kredytu o wybranych parametrach. 
                Sprawdź harmonogram i całkowity koszt.
              </p>
            </Card>
          </Link>

          <Link to="/zdolnosc-kredytowa/">
            <Card title="💰 Zdolność Kredytowa" className="h-full hover:shadow-lg transition cursor-pointer">
              <p className="text-gray-600">
                Dowiedz się, na jaki kredyt Cię stać przy Twoich zarobkach i wydatkach.
              </p>
            </Card>
          </Link>

          <Link to="/raty-rowne-czy-malejace/">
            <Card title="⚖️ Raty Równe czy Malejące?" className="h-full hover:shadow-lg transition cursor-pointer">
              <p className="text-gray-600">
                Porównaj dwa systemy spłat i zobacz, ile możesz zaoszczędzić wybierając raty malejące.
              </p>
            </Card>
          </Link>

          <Link to="/symulacja-wibor/">
            <Card title="📊 Symulacja WIBOR" className="h-full hover:shadow-lg transition cursor-pointer">
              <p className="text-gray-600">
                Sprawdź, jak zmiana stóp procentowych wpłynie na Twoją ratę w przyszłości.
              </p>
            </Card>
          </Link>
          
           <Link to="/faq-kredyt-hipoteczny/">
            <Card title="❓ FAQ - Częste Pytania" className="h-full hover:shadow-lg transition cursor-pointer">
              <p className="text-gray-600">
                Odpowiedzi na 20 najczęściej zadawanych pytań o kredyt hipoteczny.
              </p>
            </Card>
          </Link>
        </div>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>📚</span> Poradniki i Baza Wiedzy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/wklad-wlasny-10-czy-20/" className="p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Wkład własny 10% czy 20%?</h3>
              <p className="text-sm text-gray-500 mt-1">Zalety i wady obu rozwiązań w 2024 roku.</p>
            </Link>
            <Link to="/zdolnosc-kredytowa-co-obniza/" className="p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Co obniża zdolność?</h3>
              <p className="text-sm text-gray-500 mt-1">7 najczęstszych błędów kredytobiorców.</p>
            </Link>
            <Link to="/raty-rowne-czy-malejace/" className="p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Raty równe czy malejące?</h3>
              <p className="text-sm text-gray-500 mt-1">Który system spłat bardziej się opłaca?</p>
            </Link>
            <Link to="/ltv-co-to-jest/" className="p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Wskaźnik LTV</h3>
              <p className="text-sm text-gray-500 mt-1">Co to jest i jak wpływa na marżę banku?</p>
            </Link>
            <Link to="/koszty-kredytu-hipotecznego-jakie/" className="p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Koszty dodatkowe</h3>
              <p className="text-sm text-gray-500 mt-1">Prowizja, notariusz, ubezpieczenia.</p>
            </Link>
            <Link to="/wibor-jak-wplywa-na-rate/" className="p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Wpływ WIBOR</h3>
              <p className="text-sm text-gray-500 mt-1">Jak zmiany rynkowe zmieniają Twoją ratę.</p>
            </Link>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            Więcej poradników znajdziesz w sekcji FAQ oraz pod wynikami kalkulatorów.
          </div>
        </section>
      </div>
    </TabContainer>
  )
}
