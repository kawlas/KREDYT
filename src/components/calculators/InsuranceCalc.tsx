import { useState, useMemo } from 'react'
import { calculateInsuranceCosts } from '../../utils/insuranceCalc'
import { formatCurrency, formatCurrencyShort } from '../../utils/formatters'
import Card from '../shared/Card'
import Alert from '../shared/Alert'
import Slider from '../shared/Slider'

export default function InsuranceCalc() {
  const [principal, setPrincipal] = useState('400000')
  const [propertyValue, setPropertyValue] = useState('500000')
  const [years, setYears] = useState(25)
  const [hasLife, setHasLife] = useState(true)
  const [lifeCost, setLifeCost] = useState('50')
  const [ownLifeDiscount, setOwnLifeDiscount] = useState('30')
  const [hasBridge, setHasBridge] = useState(true)
  const [bridgeCost, setBridgeCost] = useState('500')
  const [hasUnemployment, setHasUnemployment] = useState(true)
  const [unemploymentCost, setUnemploymentCost] = useState('40')

  const p = parseFloat(principal) || 0
  const pv = parseFloat(propertyValue) || 0
  const ltv = pv > 0 ? (p / pv) * 100 : 0

  const result = useMemo(() => calculateInsuranceCosts({
    principal: p,
    propertyValue: pv,
    loanTermYears: years,
    insuranceLifeMonthly: hasLife ? (parseFloat(lifeCost) || 0) : 0,
    insuranceBridgeOnce: hasBridge ? (parseFloat(bridgeCost) || 0) : 0,
    insuranceUnemploymentMonthly: hasUnemployment ? (parseFloat(unemploymentCost) || 0) : 0,
    hasLifeInsurance: hasLife,
    hasBridgeInsurance: hasBridge,
    hasUnemploymentInsurance: hasUnemployment,
    ownLifeInsuranceCheaperByPercent: parseFloat(ownLifeDiscount) || 0,
  }), [p, pv, years, hasLife, lifeCost, hasBridge, bridgeCost, hasUnemployment, unemploymentCost, ownLifeDiscount])

  const hasValues = p > 0 && pv > 0

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* LEFT - inputs */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dane kredytu</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="ins-principal" className="block text-sm font-medium text-gray-700 mb-1">
                  Kwota kredytu
                </label>
                <div className="relative">
                  <input
                    id="ins-principal" type="number" value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="absolute right-3 top-2 text-gray-400">PLN</span>
                </div>
              </div>

              <div>
                <label htmlFor="ins-property" className="block text-sm font-medium text-gray-700 mb-1">
                  Wartość nieruchomości
                </label>
                <div className="relative">
                  <input
                    id="ins-property" type="number" value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="absolute right-3 top-2 text-gray-400">PLN</span>
                </div>
              </div>

              {pv > 0 && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">LTV (wskaźnik wartości kredytu)</span>
                    <span className={`font-bold ${ltv > 80 ? 'text-red-600' : 'text-green-600'}`}>
                      {ltv.toFixed(1)}%
                    </span>
                  </div>
                  {ltv > 80 && (
                    <p className="text-xs text-red-600 mt-1">
                      ⚠ LTV &gt; 80% — wymagane UNWW (ubezpieczenie niskiego wkładu)
                    </p>
                  )}
                </div>
              )}

              <Slider
                label="Okres kredytowania"
                value={years}
                min={10}
                max={35}
                step={1}
                unit=" lat"
                onChange={setYears}
                minLabel="10 lat"
                maxLabel="35 lat"
              />
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ubezpieczenia</h3>
            <div className="space-y-5">
              {/* Życie */}
              <div className="flex items-start gap-3">
                <input
                  id="ins-life-toggle" type="checkbox" checked={hasLife}
                  onChange={(e) => setHasLife(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <label htmlFor="ins-life-toggle" className="font-medium text-sm text-gray-900 cursor-pointer">
                    Ubezpieczenie na życie (cesja)
                  </label>
                  {hasLife && (
                    <div className="mt-2 space-y-2">
                      <div className="relative">
                        <input
                          id="ins-life-cost" type="number" value={lifeCost}
                          onChange={(e) => setLifeCost(e.target.value)}
                          className="w-full pl-3 pr-10 py-1.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <span className="absolute right-3 top-1.5 text-gray-400 text-sm">zł/mies</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          id="ins-life-own" type="range" min="0" max="50" step="5"
                          value={ownLifeDiscount}
                          onChange={(e) => setOwnLifeDiscount(e.target.value)}
                          className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <span className="text-xs text-gray-600 w-16 text-right">
                          -{ownLifeDiscount}% własna
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        Własna polisa poza bankiem jest tańsza o {ownLifeDiscount}%
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Pomostowe */}
              <div className="flex items-start gap-3">
                <input
                  id="ins-bridge-toggle" type="checkbox" checked={hasBridge}
                  onChange={(e) => setHasBridge(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <label htmlFor="ins-bridge-toggle" className="font-medium text-sm text-gray-900 cursor-pointer">
                    Ubezpieczenie pomostowe
                  </label>
                  {hasBridge && (
                    <div className="mt-2 relative">
                      <input
                        id="ins-bridge-cost" type="number" value={bridgeCost}
                        onChange={(e) => setBridgeCost(e.target.value)}
                        className="w-full pl-3 pr-10 py-1.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <span className="absolute right-3 top-1.5 text-gray-400 text-sm">zł (jednorazowo)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Utrata pracy */}
              <div className="flex items-start gap-3">
                <input
                  id="ins-unemp-toggle" type="checkbox" checked={hasUnemployment}
                  onChange={(e) => setHasUnemployment(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <label htmlFor="ins-unemp-toggle" className="font-medium text-sm text-gray-900 cursor-pointer">
                    Ubezpieczenie od utraty pracy
                  </label>
                  {hasUnemployment && (
                    <div className="mt-2 relative">
                      <input
                        id="ins-unemp-cost" type="number" value={unemploymentCost}
                        onChange={(e) => setUnemploymentCost(e.target.value)}
                        className="w-full pl-3 pr-10 py-1.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <span className="absolute right-3 top-1.5 text-gray-400 text-sm">zł/mies</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT - results */}
        <div className="space-y-6 md:sticky md:top-8">
          {hasValues ? (
            <>
              {/* Main summary card */}
              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Całkowity koszt ubezpieczeń</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {formatCurrencyShort(result.totalOverall)}
                </div>
                <p className="text-sm text-gray-500">
                  przez {years} lat kredytu
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Koszty początkowe (upfront)</span>
                    <span className="font-semibold">{formatCurrency(result.totalUpfront)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Miesięczny wpływ na budżet</span>
                    <span className="font-semibold">{formatCurrency(result.monthlyImpact)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Miesięczna rata + ubezpieczenia</span>
                    <span className="font-semibold text-red-600">
                      +{formatCurrency(result.monthlyImpact)}/mc
                    </span>
                  </div>
                </div>
              </Card>

              {/* Breakdown */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Szczegółowy podział</h3>
                <div className="space-y-3">
                  {/* UNWW */}
                  {result.unwwRequired && (
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                      <div className="font-medium text-sm text-amber-900 mb-1">
                        UNWW — ubezpieczenie niskiego wkładu
                      </div>
                      <div className="flex justify-between text-sm mb-0.5">
                        <span className="text-amber-700">Nadwyżka LTV</span>
                        <span className="font-semibold text-amber-900">+{result.unwwPercent.toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between text-sm mb-0.5">
                        <span className="text-amber-700">Składka (jednorazowa)</span>
                        <span className="font-semibold text-amber-900">{formatCurrency(result.unwwAmount)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-amber-700">Rozłożona na {result.unwwMonths} mies.</span>
                        <span className="font-semibold text-amber-900">{formatCurrency(result.unwwMonthly)}/mc</span>
                      </div>
                    </div>
                  )}

                  {/* Życie */}
                  {result.lifeMonthly > 0 && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="font-medium text-sm text-blue-900 mb-1">Ubezpieczenie na życie</div>
                      <div className="flex justify-between text-sm mb-0.5">
                        <span className="text-blue-700">Składka miesięczna</span>
                        <span className="font-semibold text-blue-900">{formatCurrency(result.lifeMonthly)}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-0.5">
                        <span className="text-blue-700">Koszt w całym okresie</span>
                        <span className="font-semibold text-blue-900">{formatCurrencyShort(result.lifeTotal)}</span>
                      </div>
                      {result.lifeSavingsOwn > 0 && (
                        <div className="mt-1 pt-1 border-t border-blue-200">
                          <div className="flex justify-between text-xs">
                            <span className="text-green-700">Oszczędność przy własnej polisie</span>
                            <span className="font-semibold text-green-700">-{formatCurrencyShort(result.lifeSavingsOwn)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Pomostowe */}
                  {result.bridgeOnce > 0 && (
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="font-medium text-sm text-purple-900 mb-1">Ubezpieczenie pomostowe</div>
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-700">Jednorazowo</span>
                        <span className="font-semibold text-purple-900">{formatCurrency(result.bridgeOnce)}</span>
                      </div>
                    </div>
                  )}

                  {/* Utrata pracy */}
                  {result.unemploymentMonthly > 0 && (
                    <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                      <div className="font-medium text-sm text-red-900 mb-1">Ubezpieczenie od utraty pracy</div>
                      <div className="flex justify-between text-sm mb-0.5">
                        <span className="text-red-700">Składka miesięczna</span>
                        <span className="font-semibold text-red-900">{formatCurrency(result.unemploymentMonthly)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-red-700">Koszt w całym okresie</span>
                        <span className="font-semibold text-red-900">{formatCurrencyShort(result.unemploymentTotal)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Tip */}
              <Alert type="info">
                <div className="font-semibold text-sm mb-1">💡 Oszczędzaj na ubezpieczeniach</div>
                <div className="text-sm">
                  Banki często narzucają drogie polisy. Możesz znaleźć tańsze ubezpieczenie na życie 
                  poza bankiem i przepisać cesję — to może dać oszczędność 30-50%. 
                  Ubezpieczenie pomostowe to koszt jednorazowy, ale można go uniknąć 
                  przyspieszając wpis hipoteki.
                </div>
              </Alert>

              {/* Not UNWW required */}
              {!result.unwwRequired && ltv > 0 && (
                <Alert type="success">
                  <div className="font-semibold text-sm mb-1">✅ UNWW nie jest wymagane</div>
                  <div className="text-sm">
                    Twój wkład własny wynosi co najmniej 20% (LTV = {ltv.toFixed(1)}%). 
                    Nie musisz płacić ubezpieczenia niskiego wkładu.
                  </div>
                </Alert>
              )}
            </>
          ) : (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-dashed border-gray-300 text-center">
              <p className="text-gray-500 font-medium">Wprowadź dane, aby obliczyć koszty ubezpieczeń</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}