import { useMemo, useState } from 'react'
import { calculateOverpaymentSchedule } from '../../utils/overpaymentMath'
import { formatCurrency, formatCurrencyShort, formatMonths } from '../../utils/formatters'
import Card from '../shared/Card'
import Alert from '../shared/Alert'
import TabContainer from '../layout/TabContainer'

export interface OverpaymentCalcProps {
  principal?: number
  annualRate?: number
  years?: number
  monthsElapsed?: number
  initialLumpSum?: number
  initialMonthlyExtra?: number
}

export default function OverpaymentCalc({
  principal = 400000,
  annualRate = 7.85,
  years = 25,
  monthsElapsed = 0,
  initialLumpSum = 0,
  initialMonthlyExtra = 0,
}: OverpaymentCalcProps) {
  const [lumpSum, setLumpSum] = useState(initialLumpSum)
  const [monthlyExtra, setMonthlyExtra] = useState(initialMonthlyExtra)
  const [strategy, setStrategy] = useState<'term' | 'payment'>('term')

  const result = useMemo(() => {
    return calculateOverpaymentSchedule({
      principal,
      annualRate,
      years,
      lumpSum,
      monthlyExtra,
      strategy,
      monthsElapsed,
    })
  }, [principal, annualRate, years, lumpSum, monthlyExtra, strategy, monthsElapsed])

  if (!result) return null

  return (
    <TabContainer
      title="Symulator nadpłat"
      subtitle="Sprawdź, ile zaoszczędzisz na odsetkach i jak szybciej spłacisz kredyt"
    >
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-6 border-b pb-4">Parametry nadpłat</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Jednorazowa nadpłata (PLN)</label>
                <input
                  type="number"
                  value={lumpSum}
                  onChange={e => setLumpSum(Number(e.target.value))}
                  min={0}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ring outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Dodatkowa kwota co miesiąc (PLN)</label>
                <input
                  type="number"
                  value={monthlyExtra}
                  onChange={e => setMonthlyExtra(Number(e.target.value))}
                  min={0}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ring outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Strategia</label>
                <select
                  value={strategy}
                  onChange={e => setStrategy(e.target.value as 'term' | 'payment')}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ring outline-none"
                >
                  <option value="term">Skróć okres kredytu</option>
                  <option value="payment">Obniż ratę</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Summary */}
          <Card>
            <h2 className="text-xl font-semibold text-foreground mb-6 border-b pb-4">Podsumowanie</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Oryginalna rata</span>
                <span className="font-medium">{formatCurrency(result.originalMonthlyPayment)}</span>
              </div>
              {strategy === 'term' && result.newMonths !== undefined && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nowa rata (ta sama)</span>
                  <span className="font-medium">{formatCurrency(result.originalMonthlyPayment)}</span>
                </div>
              )}
              {strategy === 'payment' && result.newMonthlyPayment && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nowa rata</span>
                  <span className="font-medium text-green-600">{formatCurrency(result.newMonthlyPayment)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Skrócono o</span>
                <span className="font-medium text-green-600">{formatMonths(result.monthsSaved)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Zaoszczędzono w odsetkach</span>
                <span className="font-medium text-green-600">{formatCurrency(result.interestSaved)}</span>
              </div>
            </div>
          </Card>

          {/* Fee note */}
          {result.earlyRepaymentFee > 0 && (
            <Alert type="warning">
              <span className="font-medium">Uwaga:</span> {result.feeReason}
            </Alert>
          )}
          {result.earlyRepaymentFee === 0 && result.feeReason && (
            <Alert type="info">
              {result.feeReason}
            </Alert>
          )}
        </div>

        {/* Schedule Table */}
        <Card>
          <h2 className="text-xl font-semibold text-foreground mb-6 border-b pb-4">Harmonogram spłat</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Miesiąc</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-muted-foreground">Rata</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-muted-foreground">Kapitał</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-muted-foreground">Odsetki</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-muted-foreground">Nadpłata</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-muted-foreground">Pozostałe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {result.schedule.slice(0, 24).map(row => (
                  <tr key={row.month}>
                    <td className="px-3 py-2 text-sm">{row.month}</td>
                    <td className="px-3 py-2 text-sm text-right">{formatCurrency(row.payment)}</td>
                    <td className="px-3 py-2 text-sm text-right text-green-600">{formatCurrencyShort(row.principalPart)}</td>
                    <td className="px-3 py-2 text-sm text-right text-blue-600">{formatCurrencyShort(row.interestPart)}</td>
                    <td className="px-3 py-2 text-sm text-right">{row.extraPayment > 0 ? formatCurrency(row.extraPayment) : '-'}</td>
                    <td className="px-3 py-2 text-sm text-right">{formatCurrencyShort(row.remainingPrincipal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {result.schedule.length > 24 && (
            <p className="mt-3 text-xs text-muted-foreground">
              Pokazano pierwsze 24 miesiące harmonogramu.
            </p>
          )}
        </Card>
      </div>
    </TabContainer>
  )
}