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
      </div>
    </TabContainer>
  )
}
