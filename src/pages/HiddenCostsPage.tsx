import HiddenCostChecklist from '../components/calculators/HiddenCostChecklist'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import RelatedTools from '../components/seo/RelatedTools'

export default function HiddenCostsPage() {
  return (
    <>
      <SEOHead 
        title="Ukryte koszty kredytu hipotecznego – checklista"
        description="Poznaj 20+ ukrytych kosztów kredytu hipotecznego: prowizje, ubezpieczenia, opłaty notarialne. Sprawdź ile naprawdę zapłacisz za kredyt."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Ukryte koszty kredytu', href: '/ukryte-koszty-kredytu/' },
        ]}
        faqItems={[
          { question: 'Czy bank może pobrać prowizję po podpisaniu umowy?', answer: 'Tak, jeśli przekroczysz limit wcześniejszej spłaty w okresie karencji.' },
          { question: 'Czy ubezpieczenie w banku jest droższe niż na zewnątrz?', answer: 'Zazwyczaj tak. Banki oferują ubezpieczenia 30-50% droższe niż polisy kupione samodzielnie.' },
          { question: 'Co to jest ubezpieczenie niskiego wkładu i kto musi je płacić?', answer: 'Ubezpieczenie niskiego wkładu własnego jest wymagane, gdy wkład własny jest niższy niż 20% wartości nieruchomości.' },
        ]}
      />
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Ukryte koszty kredytu hipotecznego — lista kontrolna</h1>
        <p className="text-lg text-muted-foreground mb-4">Zaznacz które opłaty dotyczą Twojego kredytu i sprawdź ile naprawdę zapłacisz. Im więcej wiesz, tym lepiej negocjujesz z bankiem.</p>

        <HiddenCostChecklist loanAmount={350000} />

        <div>
          <AdSlot />
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Najczęstsze pytania o ukryte koszty kredytu</h2>
          <div className="space-y-3">
            <details className="bg-card rounded-lg border border-border p-4 group">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                <span>Czy bank może pobrać prowizję po podpisaniu umowy?</span>
                <svg className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </summary>
              <p className="text-muted-foreground mt-2 text-sm">Tak, jeśli przekroczysz limit wcześniejszej spłaty w okresie karencji (zwykle pierwsze 3-5 lat). Bank może naliczyć prowizję za nadpłatę w wysokości do 3% nadpłacanej kwoty. Po upływie okresu karencji — zgodnie z ustawą o kredycie hipotecznym — bank nie może pobierać prowizji za wcześniejszą spłatę.</p>
            </details>
            <details className="bg-card rounded-lg border border-border p-4 group">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                <span>Czy ubezpieczenie w banku jest droższe niż na zewnątrz?</span>
                <svg className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </summary>
              <p className="text-muted-foreground mt-2 text-sm">Zazwyczaj tak. Banki oferują ubezpieczenia w ramach pakietów, które są wygodne, ale często 30-50% droższe niż polisy kupione samodzielnie. Wiele banków pozwala na przedstawienie własnej polisy (z cesją na rzecz banku) — warto to zrobić, bo w skali roku można zaoszczędzić 200-500 zł.</p>
            </details>
            <details className="bg-card rounded-lg border border-border p-4 group">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                <span>Co to jest ubezpieczenie niskiego wkładu i kto musi je płacić?</span>
                <svg className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </summary>
              <p className="text-muted-foreground mt-2 text-sm">Ubezpieczenie niskiego wkładu własnego (zwane też ubezpieczeniem LTV) jest wymagane, gdy Twój wkład własny jest niższy niż 20% wartości nieruchomości (LTV powyżej 80%). Chroni bank na wypadek spadku wartości nieruchomości. Koszt to zwykle 1-3% różnicy między wkładem a 20%, płatne jednorazowo z góry.</p>
            </details>
            <details className="bg-card rounded-lg border border-border p-4 group">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                <span>Ile kosztuje notariusz przy kredycie hipotecznym?</span>
                <svg className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </summary>
              <p className="text-muted-foreground mt-2 text-sm">Koszt taksy notarialnej zależy od kwoty kredytu i wartości nieruchomości. Maksymalne stawki określa rozporządzenie — dla kredytu 400 000 zł to około 1000-1500 zł. Do tego dochodzą opłaty sądowe za wpisy w księdze wieczystej (200-1500 zł) oraz podatek PCC (2% na rynku wtórnym). Łączne koszty notarialno-sądowe mogą wynieść 3000-5000 zł.</p>
            </details>
            <details className="bg-card rounded-lg border border-border p-4 group">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                <span>Czy opłata za konto bankowe jest ukrytym kosztem kredytu?</span>
                <svg className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </summary>
              <p className="text-muted-foreground mt-2 text-sm">Tak, banki często wymagają posiadania konta w swoim banku i wpływających na nie wynagrodzeń. Jeśli nie spełnisz warunków (wpływ minimalnej kwoty, liczba transakcji), bank naliczy opłatę za prowadzenie konta (5-15 zł/mies.) i kartę (5-10 zł/mies.). W skali 25 lat to nawet 7500 zł dodatkowych kosztów.</p>
            </details>
          </div>
        </section>
      </div>
      <RelatedTools />
    </>
  )
}
