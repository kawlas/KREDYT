import { useState, useMemo } from 'react'
import { compareCommission, calculateOptimalCommission } from '../../utils/commissionCalc'
import { formatCurrency, formatCurrencyShort, formatPercent } from '../../utils/formatters'
import Card from '../shared/Card'
import Slider from '../shared/Slider'

export default function CommissionCalc() {
  const [principal, setPrincipal] = useState('400000')
  const [baseRate, setBaseRate] = useState('7.0')
  const [commission, setCommission] = useState('2.0')
  const [altRateUp, setAltRateUp] = useState('7.8')
  const [years, setYears] = useState(25)

  const p = parseFloat(principal) || 0
  const br = parseFloat(baseRate) || 0
  const comm = parseFloat(commission) || 0
  const alt = parseFloat(altRateUp) || 0
  const y = years

  const result = useMemo(
    () => p > 0 && br > 0 ? compareCommission(p, br, comm, alt, y) : null,
    [p, br, comm, alt, y]
  )

  const optimal = useMemo(
    () => p > 0 && br > 0 ? calculateOptimalCommission(p, br, y, 0.3) : null,
    [p, br, y]
  )

  const hasValues = p > 0 && br > 0

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* LEFT - inputs */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Parametry kredytu</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="cm-principal" className="block text-sm font-medium text-gray-700 mb-1">
                  Kwota kredytu
                </label>
                <div className="relative">
                  <input
                    id="cm-principal"
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="absolute right-3 top-2 text-gray-400">PLN</span>
                </div>
              </div>

              <div>
                <label htmlFor="cm-base-rate" className="block text-sm font-medium text-gray-700 mb-1">
                  Oprocentowanie bazowe (WIBOR + marża przy prowizji)
                </label>
                <div className="relative">
                  <input
                    id="cm-base-rate"
                    type="number"
                    step="0.01"
                    value={baseRate}
                    onChange={(e) => setBaseRate(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="absolute right-3 top-2 text-gray-400">%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Niższa marża, ale płacisz prowizję
                </p>
              </div>

              <div>
                <label htmlFor="cm-commission" className="block text-sm font-medium text-gray-700 mb-1">
                  Prowizja banku
                </label>
                <div className="relative">
                  <input
                    id="cm-commission"
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={commission}
                    onChange={(e) => setCommission(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="absolute right-3 top-2 text-gray-400">%</span>
                </div>
              </div>

              <div>
                <label htmlFor="cm-alt-rate" className="block text-sm font-medium text-gray-700 mb-1">
                  Oprocentowanie alternatywne (bez prowizji)
                </label>
                <div className="relative">
                  <input
                    id="cm-alt-rate"
                    type="number"
                    step="0.01"
                    value={altRateUp}
                    onChange={(e) => setAltRateUp(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="absolute right-3 top-2 text-gray-400">%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Wyższa marża, ale bez prowizji
                </p>
              </div>

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

            {hasValues && optimal && (
              <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <h4 className="font-semibold text-indigo-900 text-sm mb-2">Optymalna prowizja</h4>
                <p className="text-sm text-indigo-700">
                  Przy założeniu +0.3 p.p. marży za każdy 1% unikniętej prowizji, 
                  optymalna prowizja wynosi <strong>{optimal.optimalCommission.toFixed(1)}%</strong>
                  {optimal.savings > 0 
                    ? ` (oszczędność ${formatCurrencyShort(optimal.savings)})`
                    : ' (brak oszczędności — unikaj prowizji)'}
                  .
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* RIGHT - results */}
        <div className="space-y-6 md:sticky md:top-8">
          {hasValues && result ? (
            <>
              {/* Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* With commission card */}
                <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Z prowizją</h3>
                  <p className="text-xs text-gray-500 mb-3">
                    {result.withCommission.commissionPercent}% = {formatCurrency(result.withCommission.commissionAmount)}
                  </p>
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-gray-500">Rata miesięczna</div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(result.withCommission.monthlyPayment)}
                      </div>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Suma odsetek</span>
                        <span className="font-semibold">{formatCurrencyShort(result.withCommission.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Efektywne oprocentowanie</span>
                        <span className="font-semibold">{formatPercent(result.withCommission.effectiveRate)}</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Without commission card */}
                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Bez prowizji</h3>
                  <p className="text-xs text-gray-500 mb-3">0% prowizji</p>
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-gray-500">Rata miesięczna</div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(result.withoutCommission.monthlyPayment)}
                      </div>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Suma odsetek</span>
                        <span className="font-semibold">{formatCurrencyShort(result.withoutCommission.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Efektywne oprocentowanie</span>
                        <span className="font-semibold">{formatPercent(result.withoutCommission.effectiveRate)}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Key metrics */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kluczowe różnice</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900 text-sm mb-1">Różnica w racie miesięcznej</div>
                    <div className={`text-xl font-bold ${result.difference.monthly > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {result.difference.monthly > 0 ? '+' : ''}{formatCurrencyShort(result.difference.monthly)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {result.difference.monthly > 0
                        ? 'Wariant z prowizją droższy miesięcznie'
                        : 'Wariant z prowizją tańszy miesięcznie'
                      }
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900 text-sm mb-1">Różnica w sumie odsetek</div>
                    <div className={`text-xl font-bold ${result.difference.totalInterest > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {result.difference.totalInterest > 0 ? '+' : ''}{formatCurrencyShort(result.difference.totalInterest)}
                    </div>
                  </div>
                </div>

                {result.monthlyBreakEvenAtYears > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <div className="font-medium text-blue-900 text-sm mb-1">Próg opłacalności</div>
                    <div className="text-sm text-blue-700">
                      Wariant bez prowizji zwraca się po <strong>{result.monthlyBreakEvenAtYears} latach</strong>.
                      {result.monthlyBreakEvenAtYears <= years
                        ? ' Planujesz spłacać dłużej? Wybierz opcję bez prowizji.'
                        : ' Przez cały okres kredytu opłaca się prowizja.'}
                    </div>
                  </div>
                )}
              </Card>

              {/* Recommendation */}
              <div className={`p-4 rounded-xl border ${result.difference.monthly > 0 ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200'}`}>
                <div className="font-semibold mb-1 text-sm">Rekomendacja:</div>
                <p className="text-sm">{result.recommendation}</p>
              </div>

              {/* Calculator hint */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Jak negocjować prowizję?</h3>
                <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                  <li>Banki często oferują wybór: prowizja + niższa marża lub brak prowizji + wyższa marża</li>
                  <li>Przy kredycie na 25 lat, różnica 0.5 p.p. w marży to tysiące złotych odsetek</li>
                  <li>Jeśli masz gotówkę na pokrycie prowizji — opcja z prowizją i niższą marżą może być tańsza</li>
                  <li>Jeśli chcesz zachować płynność — wybierz brak prowizji i wyższą marżę</li>
                </ul>
              </Card>
            </>
          ) : (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-dashed border-gray-300 text-center">
              <p className="text-gray-500 font-medium">Wprowadź dane kredytu, aby porównać koszty prowizji</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}