import { useState } from 'react'
import { Link } from 'react-router-dom'
import { calculateLTV, calculateEquity, getLTVRiskBand, calculateLTVScenarios } from '../../utils/ltvCalculations'
import { formatCurrency, formatPercent } from '../../utils/formatters'
import Card from '../shared/Card'
import Alert from '../shared/Alert'
import Slider from '../shared/Slider'
import TabContainer from '../layout/TabContainer'

type TabMode = 'ltv' | 'equity'

export default function LTVCalc() {
  const [mode, setMode] = useState<TabMode>('ltv')
  const [propertyValue, setPropertyValue] = useState('')
  const [loanAmount, setLoanAmount] = useState('')
  const [equityPercent, setEquityPercent] = useState(20)

  const pv = parseFloat(propertyValue) || 0
  const la = parseFloat(loanAmount) || 0

  const scenario = calculateLTVScenarios(pv, equityPercent)

  const currentLTV = mode === 'ltv' ? calculateLTV(la, pv) : scenario.ltv
  const currentEquity = mode === 'ltv' ? calculateEquity(la, pv) : scenario.equityAmount
  const riskBand = getLTVRiskBand(currentLTV)

  const hasValues = mode === 'ltv' ? pv > 0 && la > 0 : pv > 0
  const equityPercentDisplay = pv > 0 ? ((currentEquity / pv) * 100) : 0

  const tabClass = (tab: TabMode) =>
    `px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
      mode === tab
        ? 'bg-blue-600 text-white shadow-sm'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`

  return (
    <TabContainer
      title="Kalkulator LTV i wkładu własnego"
      subtitle="Sprawdź wskaźnik LTV i wymagany wkład własny dla kredytu hipotecznego"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Section */}
        <div className="space-y-6">
          <Card>
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setMode('ltv')}
                className={tabClass('ltv')}
              >
                Kalkulator LTV
              </button>
              <button
                type="button"
                onClick={() => setMode('equity')}
                className={tabClass('equity')}
              >
                Ile wkładu potrzebuję?
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="ltv-property-value" className="block text-sm font-medium text-gray-700 mb-1">
                  Wartość nieruchomości
                </label>
                <div className="relative">
                  <input
                    id="ltv-property-value"
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value)}
                    placeholder="np. 500000"
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="absolute right-3 top-2 text-gray-400">PLN</span>
                </div>
              </div>

              {mode === 'ltv' ? (
                <div>
                  <label htmlFor="ltv-loan-amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Kwota kredytu
                  </label>
                  <div className="relative">
                    <input
                      id="ltv-loan-amount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="np. 400000"
                      className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <span className="absolute right-3 top-2 text-gray-400">PLN</span>
                  </div>
                </div>
              ) : (
                <div className="pt-2">
                  <Slider
                    label="Wkład własny"
                    value={equityPercent}
                    min={10}
                    max={50}
                    step={0.5}
                    unit="%"
                    onChange={setEquityPercent}
                    minLabel="10%"
                    maxLabel="50%"
                  />
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6 md:sticky md:top-8">
          {hasValues ? (
            <>
              <Card>
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-500 mb-1">LTV (Loan to Value)</p>
                  <p className="text-5xl font-bold text-gray-900">
                    {formatPercent(currentLTV, 2)}
                  </p>
                  <span className={`inline-block mt-3 px-4 py-1.5 rounded-full text-sm font-bold ${riskBand.color} ${riskBand.bgColor} border border-current/20`}>
                    {riskBand.label}
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Wkład własny</span>
                    <span className="font-bold text-gray-900">{formatCurrency(currentEquity)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Udział wkładu</span>
                    <span className="font-bold text-gray-900">{formatPercent(equityPercentDisplay, 1)}</span>
                  </div>
                </div>
              </Card>

              <Alert type={riskBand.band === 'RED' ? 'error' : riskBand.band === 'ORANGE' ? 'warning' : riskBand.band === 'YELLOW' ? 'info' : 'success'}>
                <p className="text-sm">{riskBand.description}</p>
              </Alert>

              <div className="text-center">
                <Link
                  to={`/kalkulator-raty-kredytu/?principal=${Math.round(la || scenario.loanAmount)}&propertyValue=${Math.round(pv)}`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Oblicz ratę dla tego LTV &rarr;
                </Link>
              </div>
            </>
          ) : (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-dashed border-gray-300 text-center">
              <p className="text-gray-500 font-medium">Wprowadź dane, aby zobaczyć wskaźnik LTV i ryzyko</p>
            </div>
          )}
        </div>
      </div>
    </TabContainer>
  )
}
