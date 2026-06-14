import { useMemo, useState } from 'react'
import {
  calculateDailyInterest,
  calculateDailyInterestAct360,
  compare365vs360,
  calculateAccumulatedInterest,
} from '../../utils/dailyInterest'
import { formatCurrency, formatPercent } from '../../utils/formatters'
import Card from '../shared/Card'
import Alert from '../shared/Alert'
import TabContainer from '../layout/TabContainer'

export default function DailyInterestCalc() {
  const [principal, setPrincipal] = useState(400000)
  const [annualRate, setAnnualRate] = useState(7.0)
  const [daysInMonth, setDaysInMonth] = useState(30)
  const [lastPaymentDay, setLastPaymentDay] = useState(15)

  const act365 = useMemo(
    () => calculateDailyInterest(principal, annualRate, daysInMonth),
    [principal, annualRate, daysInMonth]
  )
  const act360 = useMemo(
    () => calculateDailyInterestAct360(principal, annualRate, daysInMonth),
    [principal, annualRate, daysInMonth]
  )
  const comparison = useMemo(
    () => compare365vs360(principal, annualRate, daysInMonth),
    [principal, annualRate, daysInMonth]
  )

  const lastPaymentDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() - lastPaymentDay)
    return d
  }, [lastPaymentDay])
  const accumulated = useMemo(
    () => calculateAccumulatedInterest(principal, annualRate, lastPaymentDate),
    [principal, annualRate, lastPaymentDate]
  )

  return (
    <TabContainer
      title="Kalkulator odsetek dziennych"
      subtitle="Jak banki naliczają odsetki od kredytu hipotecznego?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Inputs */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">
              Parametry kredytu
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Saldo kredytu (PLN)
                </label>
                <input
                  type="number"
                  value={principal}
                  onChange={e => setPrincipal(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  min={0}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Oprocentowanie roczne (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={annualRate}
                  onChange={e => setAnnualRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  min={0}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Liczba dni w analizowanym okresie
                </label>
                <select
                  value={daysInMonth}
                  onChange={e => setDaysInMonth(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value={28}>28 (luty)</option>
                  <option value={30}>30 dni</option>
                  <option value={31}>31 dni</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dni od ostatniej raty
                </label>
                <input
                  type="number"
                  value={lastPaymentDay}
                  onChange={e => setLastPaymentDay(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  min={0}
                  max={31}
                />
              </div>
            </div>
          </Card>

          <Alert type="info">
            <div className="text-sm">
              <strong>Standard rynkowy w Polsce:</strong> banki naliczają odsetki <strong>codziennie</strong> według konwencji <strong>aktualna/365</strong> (act/365).
              Oznacza to, że każdy dzień kredytu kosztuje Cię odsetki, nawet jeśli ratę płacisz raz w miesiącu.
            </div>
          </Alert>
        </div>

        {/* Results */}
        <div className="space-y-6 md:sticky md:top-8">
          <Card title="Odsetki dzienne i miesięczne">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Odsetki dzienne</div>
                  <div className="text-xl font-bold text-gray-900">
                    {formatCurrency(act365.dailyInterest)}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">act/365</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Za {daysInMonth} dni</div>
                  <div className="text-xl font-bold text-gray-900">
                    {formatCurrency(act365.dailyInterest * daysInMonth)}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">{formatCurrency(act365.dailyInterest)} dziennie</div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="text-sm text-gray-600 mb-1">Średnie odsetki miesięczne (30.42 dni)</div>
                <div className="text-2xl font-bold text-green-700">
                  {formatCurrency(act365.monthlyInterest)}
                </div>
              </div>

              <div className="text-xs text-gray-500">
                Stopa dzienna: {formatPercent(annualRate / 365, 5)} dziennie
              </div>
            </div>
          </Card>

          <Card title="act/365 vs act/360">
            <div className="space-y-3">
              <div className="flex justify-between text-sm border-b pb-2">
                <span className="text-gray-600">act/365 (standard):</span>
                <span className="font-bold">{formatCurrency(comparison.act365.dailyInterest)}</span>
              </div>
              <div className="flex justify-between text-sm border-b pb-2">
                <span className="text-gray-600">act/360 (niektóre banki):</span>
                <span className="font-bold text-red-600">{formatCurrency(comparison.act360.dailyInterest)}</span>
              </div>
              <div className="flex justify-between text-sm pt-1">
                <span className="text-gray-700 font-semibold">Różnica ({daysInMonth} dni):</span>
                <span className="font-bold text-red-600">
                  +{formatCurrency(comparison.difference)} ({comparison.differencePercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <Alert type="warning">
                <p className="text-sm">
                  Przy act/360 płacisz <strong>~1.39% więcej</strong> odsetek niż przy act/365.
                  Przy kredycie 400 000 zł i oprocentowaniu 7% to około {formatCurrency(comparison.difference * 12)} więcej rocznie.
                </p>
              </Alert>
            </div>
          </Card>

          <Card title="Narosłe odsetki od ostatniej raty">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ostatnia rata:</span>
                <span className="font-medium">{lastPaymentDate.toLocaleDateString('pl-PL')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Dni od ostatniej raty:</span>
                <span className="font-bold">{accumulated.daysSinceLastPayment}</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-3">
                <span className="text-gray-700 font-semibold">Narosłe odsetki:</span>
                <span className="text-xl font-bold text-orange-600">
                  {formatCurrency(accumulated.accruedInterest)}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Następna rata orientacyjnie: {accumulated.nextPaymentDate.toLocaleDateString('pl-PL')}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </TabContainer>
  )
}
