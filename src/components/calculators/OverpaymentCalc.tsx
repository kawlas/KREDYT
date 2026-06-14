import { useMemo, useState } from 'react'
import { simulateOverpayment } from '../../utils/overpayment'
import { formatCurrency, formatCurrencyShort, formatMonths } from '../../utils/formatters'
import Card from '../shared/Card'
import Alert from '../shared/Alert'
import TabContainer from '../layout/TabContainer'

export default function OverpaymentCalc() {
  const [principal, setPrincipal] = useState(400000)
  const [annualRate, setAnnualRate] = useState(7.0)
  const [years, setYears] = useState(25)
  const [installmentType, setInstallmentType] = useState<'equal' | 'declining'>('equal')
  const [overpaymentAmount, setOverpaymentAmount] = useState(500)
  const [overpaymentType, setOverpaymentType] = useState<'one-time' | 'recurring'>('recurring')
  const [overpaymentFrequency, setOverpaymentFrequency] = useState(1)
  const [overpaymentStartMonth, setOverpaymentStartMonth] = useState(13)
  const [mode, setMode] = useState<'shorten-term' | 'reduce-installment'>('shorten-term')

  const result = useMemo(() => {
    if (principal <= 0 || annualRate <= 0 || years <= 0) return null
    return simulateOverpayment({
      principal,
      annualRate,
      months: years * 12,
      installmentType,
      overpaymentAmount: overpaymentAmount || 0,
      overpaymentType,
      overpaymentFrequencyMonths: overpaymentFrequency,
      overpaymentStartMonth,
      mode,
    })
  }, [principal, annualRate, years, installmentType, overpaymentAmount, overpaymentType, overpaymentFrequency, overpaymentStartMonth, mode])

  return (
    <TabContainer
      title="Symulator nadpłat kredytu"
      subtitle="Sprawdź, ile zaoszczędzisz nadpłacając kredyt hipoteczny"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Inputs */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">Parametry kredytu</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kwota kredytu (PLN)</label>
                <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} min={0}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Oprocentowanie roczne (%)</label>
                <input type="number" step="0.01" value={annualRate} onChange={e => setAnnualRate(Number(e.target.value))} min={0}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Okres (lat)</label>
                  <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} min={1} max={35}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rodzaj rat</label>
                  <select value={installmentType} onChange={e => setInstallmentType(e.target.value as 'equal' | 'declining')}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="equal">Równe</option>
                    <option value="declining">Malejące</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">Parametry nadpłaty</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kwota nadpłaty (PLN)</label>
                <input type="number" value={overpaymentAmount} onChange={e => setOverpaymentAmount(Number(e.target.value))} min={0}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Typ nadpłaty</label>
                <select value={overpaymentType} onChange={e => setOverpaymentType(e.target.value as 'one-time' | 'recurring')}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="one-time">Jednorazowa</option>
                  <option value="recurring">Cykliczna (co miesiąc)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rozpocznij od miesiąca</label>
                  <input type="number" value={overpaymentStartMonth} onChange={e => setOverpaymentStartMonth(Number(e.target.value))} min={1}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                {overpaymentType === 'recurring' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Co ile miesięcy</label>
                    <input type="number" value={overpaymentFrequency} onChange={e => setOverpaymentFrequency(Number(e.target.value))} min={1}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Efekt nadpłaty</label>
                <div className="flex gap-2">
                  <button onClick={() => setMode('shorten-term')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${mode === 'shorten-term' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                    Skrócenie okresu
                  </button>
                  <button onClick={() => setMode('reduce-installment')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${mode === 'reduce-installment' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                    Zmniejszenie raty
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Alert type="info">
            <p className="text-sm">
              Zgodnie z <strong>Ustawą o kredycie hipotecznym</strong>, przy oprocentowaniu zmiennym po 1 roku od zawarcia umowy bank nie może pobierać prowizji za nadpłatę.
              Przy oprocentowaniu stałym limit wynosi 2% nadpłacanej kwoty przez pierwsze 3 lata.
            </p>
          </Alert>
        </div>

        {/* Results */}
        <div className="space-y-6 md:sticky md:top-8">
          {result && (
            <>
              <Card title="Wyniki symulacji">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Oszczędność na odsetkach</div>
                      <div className="text-2xl font-bold text-green-700">{formatCurrencyShort(result.interestSaved)}</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Skrócenie kredytu o</div>
                      <div className="text-2xl font-bold text-blue-700">{formatMonths(result.monthsSaved)}</div>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pierwotny okres:</span>
                      <span className="font-medium">{formatMonths(result.originalPayoffMonths)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Nowy okres:</span>
                      <span className="font-bold text-green-600">{formatMonths(result.newPayoffMonths)}</span>
                    </div>
                    {mode === 'reduce-installment' && (
                      <div className="flex justify-between text-sm border-t pt-2">
                        <span className="text-gray-600">Nowa rata:</span>
                        <span className="font-bold text-blue-600">{formatCurrency(result.newMonthlyPayment)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Łączna kwota nadpłat:</span>
                      <span className="font-medium">{formatCurrencyShort(result.totalOverpaid)}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Porównanie odsetek">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Odsetki bez nadpłat:</span>
                    <span className="font-bold text-red-600">{formatCurrencyShort(result.originalTotalInterest)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Odsetki z nadpłatami:</span>
                    <span className="font-bold text-green-600">{formatCurrencyShort(result.newTotalInterest)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="text-gray-700 font-semibold">Różnica:</span>
                    <span className="text-lg font-bold text-green-700">-{formatCurrencyShort(result.interestSaved)}</span>
                  </div>
                </div>
              </Card>

              <Card title="Podsumowanie harmonogramu">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {result.scheduleSummary.map(row => (
                    <div key={row.month} className="flex justify-between text-sm border-b border-gray-100 py-1">
                      <span className="text-gray-500">Mies. {row.month}</span>
                      <span className="font-medium">{formatCurrencyShort(row.remainingBalance)}</span>
                      {row.overpayment > 0 && (
                        <span className="text-green-600 text-xs">+{formatCurrencyShort(row.overpayment)}</span>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </TabContainer>
  )
}
