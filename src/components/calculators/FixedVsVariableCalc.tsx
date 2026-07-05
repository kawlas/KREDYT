import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { compareFixedVsVariable, type FixedVsVariableComparison } from '../../utils/fixedVsVariable'
import { formatCurrency, formatCurrencyShort, formatPercent } from '../../utils/formatters'
import Card from '../shared/Card'
import Alert from '../shared/Alert'
import Slider from '../shared/Slider'
import TabContainer from '../layout/TabContainer'
import FixedVsVariableChart from './FixedVsVariableChart'

export default function FixedVsVariableCalc() {
  const [principal, setPrincipal] = useState('400000')
  const [variableRate, setVariableRate] = useState('7.0')
  const [fixedRate, setFixedRate] = useState('7.5')
  const [totalYears, setTotalYears] = useState(25)
  const [fixedPeriodYears, setFixedPeriodYears] = useState(5)

  const p = parseFloat(principal) || 0
  const vr = parseFloat(variableRate) || 0
  const fr = parseFloat(fixedRate) || 0

  const result = useMemo(
    () => p > 0 && vr > 0 && fr > 0
      ? compareFixedVsVariable(p, vr, fr, totalYears, fixedPeriodYears)
      : null,
    [p, vr, fr, totalYears, fixedPeriodYears]
  )

  const hasValues = p > 0 && vr > 0 && fr > 0

  return (
    <TabContainer
      title="Stałe czy zmienne oprocentowanie?"
      subtitle="Porównaj koszty i wybierz bezpieczniejszą opcję"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* FORM SECTION - LEFT */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Parametry kredytu</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="fv-principal" className="block text-sm font-medium text-gray-700 mb-1">
                  Kwota kredytu
                </label>
                <div className="relative">
                  <input
                    id="fv-principal"
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    placeholder="np. 400000"
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="absolute right-3 top-2 text-gray-400">PLN</span>
                </div>
              </div>

              <div>
                <label htmlFor="fv-variable-rate" className="block text-sm font-medium text-gray-700 mb-1">
                  Oprocentowanie zmienne (WIBOR + marża)
                </label>
                <div className="relative">
                  <input
                    id="fv-variable-rate"
                    type="number"
                    step="0.01"
                    value={variableRate}
                    onChange={(e) => setVariableRate(e.target.value)}
                    placeholder="np. 7.0"
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="absolute right-3 top-2 text-gray-400">%</span>
                </div>
              </div>

              <div>
                <label htmlFor="fv-fixed-rate" className="block text-sm font-medium text-gray-700 mb-1">
                  Oprocentowanie stałe (na okres stały)
                </label>
                <div className="relative">
                  <input
                    id="fv-fixed-rate"
                    type="number"
                    step="0.01"
                    value={fixedRate}
                    onChange={(e) => setFixedRate(e.target.value)}
                    placeholder="np. 7.5"
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="absolute right-3 top-2 text-gray-400">%</span>
                </div>
              </div>

              <Slider
                label="Okres kredytowania"
                value={totalYears}
                min={10}
                max={35}
                step={1}
                unit=" lat"
                onChange={setTotalYears}
                minLabel="10 lat"
                maxLabel="35 lat"
              />

              <Slider
                label="Okres stałego oprocentowania"
                value={fixedPeriodYears}
                min={3}
                max={10}
                step={1}
                unit=" lat"
                onChange={setFixedPeriodYears}
                minLabel="3 lata"
                maxLabel="10 lat"
                helperText={`Przez pierwsze ${fixedPeriodYears} lata rata jest stała, potem przechodzi na zmienne`}
              />
            </div>
          </Card>
        </div>

        {/* RESULTS SECTION - RIGHT */}
        <div className="space-y-6 md:sticky md:top-8">
          {hasValues && result ? (
            <>
              {/* Comparison Cards */}
              <div className="two-column-layout">
                <ComparisonCard result={result} type="fixed" />
                <ComparisonCard result={result} type="variable" />
              </div>

              {/* Chart */}
              <FixedVsVariableChart result={result} />

              {/* Key Difference */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kluczowa różnica</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900 mb-1">Różnica w racie miesięcznej</div>
                    <div className={`text-2xl font-bold ${result.difference.monthly > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {result.difference.monthly > 0 ? '+' : ''}{formatCurrencyShort(result.difference.monthly)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {result.difference.monthly > 0
                        ? 'Stałe droższe o tyle miesięcznie'
                        : 'Stałe tańsze o tyle miesięcznie'
                      }
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900 mb-1">Różnica w sumie odsetek</div>
                    <div className={`text-2xl font-bold ${result.difference.totalInterest > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {result.difference.totalInterest > 0 ? '+' : ''}{formatCurrencyShort(result.difference.totalInterest)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {result.difference.totalInterest > 0
                        ? 'Stałe generuje więcej odsetek'
                        : 'Stałe oszczędza na odsetkach'
                      }
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="font-medium text-gray-900 mb-1">Próg opłacalności</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPercent(result.breakevenRate, 2)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Jeśli oprocentowanie zmienne przekroczy tę wartość — stałe staje się tańsze
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recommendation */}
              <Alert type={result.difference.monthly <= 0 ? 'success' : 'info'}>
                <div className="font-semibold mb-1">Rekomendacja:</div>
                <div className="text-sm">{result.recommendation}</div>
              </Alert>

              {/* When to choose what */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kiedy wybrać stałe? Kiedy zmienne?</h3>
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="font-semibold text-green-900 mb-2">Oprocentowanie stałe gdy:</div>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                      <li>Potrzebujesz pewności raty przez pierwsze lata</li>
                      <li>Masz napięty budżet i nie możesz ryzykować wzrostu</li>
                      <li>Prognozy stóp procentowych są niepewne</li>
                      <li>Stałe jest niewiele droższe od zmiennego (&lt;1 p.p.)</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="font-semibold text-blue-900 mb-2">Oprocentowanie zmienne gdy:</div>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                      <li>Stałe jest znacznie droższe (różnica &gt;1 p.p.)</li>
                      <li>Masz bufor finansowy na wypadek wzrostu stóp</li>
                      <li>Planujesz szybką nadpłatę lub wcześniejszą spłatę</li>
                      <li>Jesteś świadomy ryzyka i akceptujesz je</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Link to WIBOR simulator */}
              <div className="text-center">
                <Link
                  to={`/symulacja-wibor/?principal=${Math.round(p)}&loanTermYears=${totalYears}&margin=${Math.max(0, (vr - 5.85)).toFixed(2)}&baseWibor=5.85&installmentType=equal`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Sprawdź, jak zmiana stóp wpłynie na ratę &rarr;
                </Link>
              </div>
            </>
          ) : (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-dashed border-gray-300 text-center">
              <p className="text-gray-500 font-medium">Wprowadź dane, aby porównać oprocentowanie stałe i zmienne</p>
            </div>
          )}
        </div>
      </div>
    </TabContainer>
  )
}

function ComparisonCard({ result, type }: { result: FixedVsVariableComparison; type: 'fixed' | 'variable' }) {
  const data = type === 'fixed' ? result.fixed : result.variable

  return (
    <Card className={`relative border-2 ${type === 'fixed' ? 'border-amber-200 bg-gradient-to-br from-amber-50 to-white' : 'border-blue-200 bg-gradient-to-br from-blue-50 to-white'}`}>
      <h3 className="text-xl font-semibold mb-2">{data.label}</h3>
      <p className="text-sm text-gray-500 mb-4">
        {type === 'fixed' ? `Stałe przez ${result.fixed.fixedPeriodYears} lat` : 'Zmienne przez cały okres'}
      </p>

      <div className="space-y-3">
        <div>
          <div className="text-sm text-gray-600">Rata miesięczna</div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(data.monthlyPayment)}
          </div>
        </div>

        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Suma odsetek</span>
            <span className="font-semibold">{formatCurrencyShort(data.totalInterest)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">Całkowity koszt</span>
            <span className="text-lg font-bold">{formatCurrencyShort(data.totalPaid)}</span>
          </div>
        </div>

        {type === 'fixed' && (
          <div className="bg-amber-100 text-amber-800 p-2 rounded text-sm text-center font-medium">
            Po {result.fixed.fixedPeriodYears} latach przechodzi na zmienne
          </div>
        )}

        {type === 'variable' && (
          <div className="bg-blue-100 text-blue-800 p-2 rounded text-sm text-center font-medium">
            Ryzyko: rata może wzrosnąć
          </div>
        )}
      </div>
    </Card>
  )
}
