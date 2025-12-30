import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand/About */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-gray-900 font-bold text-lg mb-4">Kalkulator Kredytowy</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Darmowe i profesjonalne narzędzia do analizy kredytów hipotecznych. 
              Budujemy przejrzystość w świecie finansów osobistych.
            </p>
            <p className="text-xs text-gray-400">
              Serwis może utrzymywać się z reklam.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">Narzędzia</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-500 hover:text-blue-600 transition">Start</Link></li>
              <li><Link to="/kalkulator-raty-kredytu/" className="text-gray-500 hover:text-blue-600 transition">Kalkulator Raty</Link></li>
              <li><Link to="/zdolnosc-kredytowa/" className="text-gray-500 hover:text-blue-600 transition">Zdolność Kredytowa</Link></li>
              <li><Link to="/raty-rowne-czy-malejace/" className="text-gray-500 hover:text-blue-600 transition">Raty Równe czy Malejące</Link></li>
              <li><Link to="/symulacja-wibor/" className="text-gray-500 hover:text-blue-600 transition">Symulacja WIBOR</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">Wsparcie</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq-kredyt-hipoteczny/" className="text-gray-500 hover:text-blue-600 transition">FAQ</Link></li>
              <li><Link to="/metodologia/" className="text-gray-500 hover:text-blue-600 transition">Metodologia obliczeń</Link></li>
              <li><Link to="/o-projekcie/" className="text-gray-500 hover:text-blue-600 transition">O projekcie</Link></li>
              <li><Link to="/kontakt/" className="text-gray-500 hover:text-blue-600 transition">Kontakt</Link></li>
            </ul>
          </div>

          {/* Privacy */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">Prywatność</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/polityka-prywatnosci/" className="text-gray-500 hover:text-blue-600 transition">Polityka prywatności</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            © {currentYear} Kalkulator Kredytowy. Wszystkie dane mają charakter informacyjny i nie stanowią oferty w rozumieniu KC.
          </p>
          <div className="flex gap-4">
            {/* Social icons could go here */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
