import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { animate } from 'motion'
import type { LoanResults } from '../types'
import { formatCurrency, formatCurrencyShort, formatPercent } from '../utils/formatters'
import Card from './shared/Card'
import Alert from './shared/Alert'
import Tooltip from './shared/Tooltip'
import Collapsible from './shared/Collapsible'
import { prepareChartData, getAmortizationInsights } from '../utils/amortizationChart'
import AmortizationChart from './calculators/AmortizationChart'
import ExportPdfButton from './shared/ExportPdfButton'
import CsvExportButton from './shared/CsvExportButton'

interface ResultsCardProps extends LoanResults {
  loanAmount: number
  propertyValue: number
  wibor: number
  margin: number
  loanTermYears: number
  installmentType?: 'equal' | 'declining'
  onSave: (name: string) => void
}

const ResultsCard: React.FC<ResultsCardProps> = (props) => {
  const { monthlyPayment, totalInterest, rrso, breakdown, onSave } = props
  const [offerName, setOfferName] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    // Card entrance
    animate(
      cardRef.current,
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.3, ease: "easeOut" }
    )

    // Stagger children
    const items = cardRef.current.querySelectorAll('[data-animate-item]')
    if (items.length > 0) {
      items.forEach((item, index) => {
        animate(
          item,
          { opacity: [0, 1], x: [-10, 0] },
          { duration: 0.3, delay: index * 0.05 }
        )
      })
    }
  }, [])

  const handleSave = () => {
    if (!isSaving) {
      setIsSaving(true)
      if (!offerName) setOfferName(`Oferta ${new Date().toLocaleDateString()}`)
      return
    }

    if (!offerName.trim()) {
      // If still empty when clicking OK, just reset
      setIsSaving(false)
      return
    }
    onSave(offerName.trim())
    setOfferName('')
    setIsSaving(false)
  }

  const nominalRate = props.wibor + props.margin

  const chartData = useMemo(
    () => prepareChartData(props.loanAmount, nominalRate, props.loanTermYears, props.installmentType || 'equal'),
    [props.loanAmount, nominalRate, props.loanTermYears, props.installmentType]
  )
  const amortizationInsights = useMemo(
    () => getAmortizationInsights(props.loanAmount, nominalRate, props.loanTermYears),
    [props.loanAmount, nominalRate, props.loanTermYears]
  )

  if (!breakdown) {
    return (
      <div ref={cardRef}>
        <Card>
          <p className="text-muted-foreground italic">Brak danych do wyświetlenia podsumowania</p>
        </Card>
      </div>
    )
  }

  const { upfrontCosts, yearlyCosts, totalCost, actualAmountReceived } = breakdown
  const ltv = (props.loanAmount / props.propertyValue) * 100

  return (
    <div ref={cardRef} className="space-y-4">
      <Card>
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-xl font-semibold text-foreground">Podsumowanie kosztów</h2>
        </div>

        {/* Section 1: Monthly Payment */}
        <div className="bg-primary/10 rounded-xl p-6 border border-primary/30 mb-6" data-animate-item aria-live="polite">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-medium text-primary">Miesięczna rata bazowa</p>
            <Tooltip text="Sama rata kapitałowo-odsetkowa, bez ubezpieczeń.">
              <span className="text-primary cursor-help text-xs">ⓘ</span>
            </Tooltip>
          </div>
          <p className="text-3xl font-bold text-foreground">
            {formatCurrency(monthlyPayment)}
          </p>
          <div className="mt-4 pt-4 border-t border-primary/30">
            <div className="flex justify-between text-sm">
              <span className="text-primary">Łącznie z kosztami rocznymi (uśrednione):</span>
              <span className="font-bold text-foreground">
                {formatCurrency(monthlyPayment + (yearlyCosts.total / 12))}
              </span>
            </div>
          </div>
        </div>

        {/* Section: Down Payment & LTV */}
        {props.propertyValue > 0 && props.loanAmount > 0 && (
          <div className="bg-card rounded-xl p-6 border border-border mb-6 shadow-sm" data-animate-item>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-4 border-b pb-2">
              Wkład własny i LTV
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Wkład własny</p>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(props.propertyValue - props.loanAmount)}
                </p>
                <p className="text-sm text-primary font-medium">
                  {formatPercent(((props.propertyValue - props.loanAmount) / props.propertyValue) * 100)} wartości
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Wskaźnik LTV</p>
                <p className={`text-xl font-bold ${ltv > 100 ? 'text-red-600' : 'text-foreground'}`}>
                  {formatPercent(ltv)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Loan to Value</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed border-t pt-4">
              <p>
                <strong>LTV</strong> to relacja kwoty kredytu do wartości nieruchomości. 
                Określa ona poziom ryzyka dla banku.
              </p>
              <p>
                Często banki preferują <strong>LTV ≤ 80%</strong> (wymagany wkład 20%), 
                co pozwala na uzyskanie niższej marży i uniknięcie dodatkowych ubezpieczeń.
              </p>
              {ltv > 100 && (
                <Alert type="error" className="mt-2">
                  <p className="font-bold">Uwaga: LTV powyżej 100%</p>
                  <p className="text-xs">Kwota kredytu przewyższa wartość nieruchomości. Większość banków nie udzieli takiego finansowania.</p>
                </Alert>
              )}
            </div>
          </div>
        )}
      </Card>

      {/* SECTION 2: Total Cost Breakdown */}
      <Card title="Ile naprawdę zapłacisz?" data-animate-item>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Suma wszystkich rat ({props.loanTermYears} lat)</div>
              <div className="text-lg font-semibold">
                {formatCurrencyShort(totalCost.allPayments)}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Kapitał (pożyczona kwota)</div>
              <div className="text-lg font-semibold text-muted-foreground">
                -{formatCurrencyShort(props.loanAmount)}
              </div>
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-foreground font-medium">ODSETKI (to przepłacasz):</span>
              <span className="text-2xl font-bold text-red-600">
                {formatCurrencyShort(totalInterest)}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              To jest {((totalInterest / props.loanAmount) * 100).toFixed(0)}% kwoty kredytu
            </div>
          </div>

          <Alert type="warning">
            <div className="text-sm">
              <strong>Rzeczywistość:</strong> Pożyczasz {formatCurrencyShort(props.loanAmount)}, 
              ale zwrócisz {formatCurrencyShort(totalCost.allPayments)} 
              (+{((totalCost.allPayments / props.loanAmount - 1) * 100).toFixed(0)}% więcej!)
            </div>
          </Alert>
        </div>
      </Card>

      {/* SECTION 3: Upfront Costs - COLLAPSIBLE */}
      <div data-animate-item>
        <Collapsible
          title="Koszty na start (musisz zapłacić z góry)"
         
          defaultOpen={false}
        >
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground">Prowizja banku (dwukierunkowa)</span>
              <span className="font-semibold">{formatCurrencyShort(upfrontCosts.provision)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <span className="text-foreground">Notariusz</span>
                <Tooltip text="Akt notarialny, umowa kredytowa, hipoteka" align="left">
                  <span className="text-primary cursor-help text-xs">ⓘ</span>
                </Tooltip>
              </div>
              <span className="font-semibold">{formatCurrencyShort(upfrontCosts.notary)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <span className="text-foreground">Wycena nieruchomości</span>
                <Tooltip text="Rzeczoznawca majątkowy - wycena nieruchomości" align="left">
                  <span className="text-primary cursor-help text-xs">ⓘ</span>
                </Tooltip>
              </div>
              <span className="font-semibold">{formatCurrencyShort(upfrontCosts.valuation)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground">Wpis do księgi wieczystej</span>
              <span className="font-semibold">{formatCurrencyShort(upfrontCosts.landRegistry)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <span className="text-foreground">Ubezp. pomostowe (3mc)</span>
                <Tooltip text="Ubezpieczenie do czasu uruchomienia kredytu (zazwyczaj 3 miesiące)" align="left">
                  <span className="text-primary cursor-help text-xs">ⓘ</span>
                </Tooltip>
              </div>
              <span className="font-semibold">{formatCurrencyShort(upfrontCosts.bridgingInsurance)}</span>
            </div>
            
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-bold text-base">
                <span>RAZEM NA START:</span>
                <span className="text-red-600">{formatCurrencyShort(upfrontCosts.total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Alert type="error">
              <div>
                <div className="font-semibold mb-1">Faktycznie dostaniesz na rękę:</div>
                <div className="text-2xl font-bold">
                  {formatCurrencyShort(actualAmountReceived)}
                </div>
                <div className="text-sm mt-1">
                  (nie {formatCurrencyShort(props.loanAmount)}! Prowizja zabiera {formatCurrencyShort(upfrontCosts.provision)})
                </div>
              </div>
            </Alert>
          </div>
        </Collapsible>
      </div>

      {/* SECTION 4: Yearly Costs - COLLAPSIBLE */}
      <div data-animate-item>
        <Collapsible
          title="Koszty roczne (oprócz raty)"
         
          defaultOpen={false}
        >
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <span className="text-foreground">Ubezpieczenie nieruchomości</span>
                <Tooltip text="Obowiązkowe ubezpieczenie od ognia i zdarzeń losowych" align="left">
                  <span className="text-primary cursor-help text-xs">ⓘ</span>
                </Tooltip>
              </div>
              <span className="font-semibold">{formatCurrencyShort(yearlyCosts.homeInsurance)}/rok</span>
            </div>
            
            {yearlyCosts.creditInsurance > 0 && (
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-foreground">Ubezpieczenie kredytu</span>
                  <Tooltip text={`Wymagane gdy LTV > 80%. Twoje LTV: ${ltv.toFixed(1)}%`} align="left">
                    <span className="text-primary cursor-help text-xs">ⓘ</span>
                  </Tooltip>
                </div>
                <span className="font-semibold text-orange-600">
                  {formatCurrencyShort(yearlyCosts.creditInsurance)}/rok
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-foreground">Prowadzenie rachunku</span>
              <span className="font-semibold text-green-600">0 zł</span>
            </div>

            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Razem rocznie:</span>
                <span>{formatCurrencyShort(yearlyCosts.total)}/rok</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                W {props.loanTermYears} lat: {formatCurrencyShort(yearlyCosts.total * props.loanTermYears)}
              </div>
            </div>
          </div>
        </Collapsible>
      </div>

      {/* SECTION 5: RRSO vs Nominal */}
      <Card title="Oprocentowanie: Nominalne vs RRSO" data-animate-item>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-secondary p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Oprocentowanie nominalne</div>
            <div className="text-2xl font-bold">{formatPercent(nominalRate)}</div>
            <div className="text-xs text-muted-foreground mt-1">
              WIBOR {formatPercent(props.wibor)} + marża {formatPercent(props.margin)}
            </div>
          </div>
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">RRSO (rzeczywiste)</div>
            <div className="text-2xl font-bold text-primary">{formatPercent(rrso)}</div>
            <div className="text-xs text-muted-foreground mt-1">
              +{formatPercent(rrso - nominalRate)} od nominalnego
            </div>
          </div>
        </div>

        <Alert type="info">
          <div className="text-sm">
            <strong>RRSO jest wyższe</strong> bo uwzględnia prowizję i wszystkie opłaty. 
            To jest <strong>faktyczny</strong> koszt kredytu rocznie.
          </div>
        </Alert>
      </Card>

      {/* SECTION 5b: Amortization Chart */}
      {chartData.length > 0 && (
        <AmortizationChart
          data={chartData}
          insights={amortizationInsights}
          loanAmount={props.loanAmount}
        />
      )}

      {/* SECTION 6: GRAND TOTAL */}
      <Card data-animate-item>
        <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg border-2 border-red-200">
          <div className="text-center">
            <div className="text-sm text-foreground mb-2 uppercase tracking-wide font-semibold">
              Całkowity koszt kredytu ({props.loanTermYears} lat)
            </div>
            <div className="text-3xl font-bold text-red-600 mb-3">
              {formatCurrencyShort(totalCost.grandTotal)}
            </div>
            <div className="text-sm text-foreground space-y-1">
              <div>Wszystkie raty: {formatCurrencyShort(totalCost.allPayments)}</div>
              <div>+ Koszty start: {formatCurrencyShort(upfrontCosts.total)}</div>
              <div>+ Koszty roczne: {formatCurrencyShort(totalCost.yearlyCostsOverTerm)}</div>
            </div>
            <div className="mt-4 pt-4 border-t border-red-300">
              <div className="text-base font-semibold">
                Pożyczasz {formatCurrencyShort(props.loanAmount)}, płacisz {formatCurrencyShort(totalCost.grandTotal)}
              </div>
              <div className="text-xl font-bold text-red-700 mt-1">
                To {((totalCost.grandTotal / props.loanAmount - 1) * 100).toFixed(0)}% więcej!
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* SECTION 7: Recommended Topics */}
      <Card data-animate-item>
        <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-4 border-b pb-2">
          Polecane poradniki
        </h3>
        <div className="space-y-3">
          <Link to="/koszty-kredytu-hipotecznego-jakie/" className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/10 transition-all group">
            <span className="text-sm font-medium text-foreground group-hover:text-primary">Jakie są koszty kredytu?</span>
            <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link to="/wklad-wlasny-10-czy-20/" className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/10 transition-all group">
            <span className="text-sm font-medium text-foreground group-hover:text-primary">Wkład własny: 10% czy 20%?</span>
            <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link to="/ltv-80-procent/" className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/10 transition-all group">
            <span className="text-sm font-medium text-foreground group-hover:text-primary">Dlaczego warto mieć LTV 80%?</span>
            <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </Card>

      {/* Save Button / Input Section */}
      <div className="mt-4">
        {!isSaving ? (
          <button
            onClick={handleSave}
            className="w-full py-4 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            Dodaj do porównania
          </button>
        ) : (
          <div className="bg-card p-4 rounded-xl border-2 border-primary/30 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
            <label className="block text-sm font-medium text-foreground mb-2">
              Nazwa oferty (np. Nazwa banku)
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={offerName}
                onChange={(e) => setOfferName(e.target.value)}
                placeholder="np. mBank - Oferta promocyjna"
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-primary outline-none transition-all"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave()
                  if (e.key === 'Escape') setIsSaving(false)
                }}
              />
              <button 
                onClick={handleSave}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 font-semibold transition-colors"
              >
                Zapisz
              </button>
              <button 
                onClick={() => setIsSaving(false)}
                className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Anuluj
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Export buttons */}
      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <ExportPdfButton
          variant="outline"
          label="Pobierz wyniki (PDF)"
          className="w-full justify-center"
          data={{
            title: 'Kalkulacja kredytu hipotecznego',
            fields: [
              { label: 'Kwota kredytu', value: formatCurrency(props.loanAmount) },
              { label: 'Wartość nieruchomości', value: formatCurrency(props.propertyValue) },
              { label: 'WIBOR', value: `${props.wibor}%` },
              { label: 'Marża banku', value: `${props.margin}%` },
              { label: 'Okres kredytu', value: `${props.loanTermYears} lat` },
              { label: 'Typ rat', value: props.installmentType === 'equal' ? 'Równe' : 'Malejące' },
              { label: 'Miesięczna rata', value: formatCurrency(monthlyPayment), highlight: true },
            ],
            summary: [
              { label: 'Całkowity koszt kredytu', value: formatCurrencyShort(breakdown?.totalCost?.grandTotal || totalInterest + props.loanAmount), color: 'red' as const },
              { label: 'RRSO', value: formatPercent(rrso), color: 'blue' as const },
            ],
          }}
        />
        <CsvExportButton
          principal={props.loanAmount}
          annualRate={props.wibor + props.margin}
          months={props.loanTermYears * 12}
          installmentType={props.installmentType || 'equal'}
          variant="outline"
        />
      </div>
    </div>
  )
}

export default ResultsCard
