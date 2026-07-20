import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand/About */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-foreground font-bold text-lg mb-4">Kalkulator Kredytowy</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Darmowe i profesjonalne narzędzia do analizy kredytów hipotecznych. 
              Budujemy przejrzystość w świecie finansów osobistych.
            </p>
            <p className="text-xs text-muted-foreground">
              Serwis może utrzymywać się z reklam.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-foreground font-bold mb-4">Narzędzia</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition">Start</Link></li>
              <li><Link to="/kalkulator-raty-kredytu/" className="text-muted-foreground hover:text-primary transition">Kalkulator Raty</Link></li>
              <li><Link to="/ltv-kalkulator/" className="text-muted-foreground hover:text-primary transition">Kalkulator LTV</Link></li>
              <li><Link to="/co-wplywa-na-zdolnosc/" className="text-muted-foreground hover:text-primary transition">Scoring BIK — co wpływa?</Link></li>
              <li><Link to="/zdolnosc-kredytowa/" className="text-muted-foreground hover:text-primary transition">Zdolność Kredytowa</Link></li>
              <li><Link to="/raty-rowne-czy-malejace/" className="text-muted-foreground hover:text-primary transition">Raty Równe czy Malejące</Link></li>
              <li><Link to="/symulacja-wibor/" className="text-muted-foreground hover:text-primary transition">Symulacja WIBOR</Link></li>
              <li><Link to="/odsetki-dzienne/" className="text-muted-foreground hover:text-primary transition">Odsetki dzienne</Link></li>
              <li><Link to="/symulator-nadplat/" className="text-muted-foreground hover:text-primary transition">Symulator nadpłat</Link></li>
              <li><Link to="/refinansowanie-kredytu/" className="text-muted-foreground hover:text-primary transition">Refinansowanie</Link></li>
              <li><Link to="/porownanie-ofert-bankow/" className="text-muted-foreground hover:text-primary transition">Porównanie banków</Link></li>
              <li><Link to="/ukryte-koszty-kredytu/" className="text-muted-foreground hover:text-primary transition">Ukryte koszty</Link></li>
              <li><Link to="/stale-vs-zmienne-oprocentowanie/" className="text-muted-foreground hover:text-primary transition">Stałe czy zmienne</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-foreground font-bold mb-4">Wsparcie</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq-kredyt-hipoteczny/" className="text-muted-foreground hover:text-primary transition">FAQ</Link></li>
              <li><Link to="/metodologia/" className="text-muted-foreground hover:text-primary transition">Metodologia obliczeń</Link></li>
              <li><Link to="/o-projekcie/" className="text-muted-foreground hover:text-primary transition">O projekcie</Link></li>
              <li><Link to="/kontakt/" className="text-muted-foreground hover:text-primary transition">Kontakt</Link></li>
            </ul>
          </div>

          {/* Privacy */}
          <div>
            <h4 className="text-foreground font-bold mb-4">Prywatność</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/polityka-prywatnosci/" className="text-muted-foreground hover:text-primary transition">Polityka prywatności</Link></li>
              <li><Link to="/polityka-redakcyjna/" className="text-muted-foreground hover:text-primary transition">Polityka redakcyjna</Link></li>
            </ul>
          </div>
        </div>

        {/* Institution links */}
        <div className="border-t border-border pt-8 mt-8">
          <h4 className="text-foreground font-bold mb-4 text-sm">Instytucje i źródła danych</h4>
          <div className="flex flex-wrap gap-4 text-xs">
            <a href="https://www.nbp.pl/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition">NBP — Narodowy Bank Polski</a>
            <a href="https://www.knf.gov.pl/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition">KNF — Komisja Nadzoru Finansowego</a>
            <a href="https://www.uokik.gov.pl/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition">UOKiK</a>
            <a href="https://www.zbp.pl/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition">ZBP — Związek Banków Polskich</a>
            <a href="https://isap.sejm.gov.pl/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition">ISAP — Akty prawne</a>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © {currentYear} Kalkulator Kredytowy. Wszystkie dane mają charakter informacyjny i nie stanowią oferty w rozumieniu KC.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
