import { useMemo, useState } from 'react'
import { calculateRefinancingAnalysis } from '../../utils/refinancing'
import { formatCurrency, formatCurrencyShort, formatMonths } from '../../utils/formatters'
import { BANK_PROFILES } from '../../data/bankProfiles'
import Card from '../shared/Card'
import Alert from '../shared/Alert'
import TabContainer from '../layout/TabContainer'

export default function RefinancingCalc() {
  const [principal, setPrincipal] = useState(400000)
  const [oldRate, setOldRate] = useState(7.85)
  const [totalYears, setTotalYears] = useState(25)
  const [monthsPaid, setMonthsPaid] = useState(36)
  const [installmentType, setInstallmentType] = useState<'equal' | 'declining'>('equal')
  const [newRate, setNewRate] = useState(6.85)
  const [transferFees, setTransferFees] = useState(3000)
  const [newProvision, setNewProvision] = useState(0)
  const [earlyFee, setEarlyFee] = useState(0)
  const [selectedBank, setSelectedBank] = useState('')

  const handleBankSelect = (id: string) => {
    setSelectedBank(id)
    const bank = BANK_PROFILES.find(b => b.id === id)
    if (bank) {
      setNewRate((bank.typicalMarginMin + bank.typicalMarginMax) / 2 + 5.85) // WIBOR estimate
      setNewProvision(bank.provision)
    }
  }

  const result = useMemo(() => {
    if (principal <= 0 || oldRate <= 0 || newRate <= 0) return null
    return calculateRefinancingAnalysis({
      originalPrincipal: principal,
      oldAnnualRate: oldRate,
      newAnnualRate: newRate,
      totalMonths: totalYears * 12,
      monthsPaid,
      installmentType,
      newLoanProvision: newProvision,
      transferFees,
      earlyRepaymentFeePercent: earlyFee,
    })
  }, [principal, oldRate, newRate, totalYears, monthsPaid, installmentType, newProvision, transferFees, earlyFee])

  return (
    <TabContainer
      title="Kalkulator refinansowania kredytu"
      subtitle="Sprawdź, czy warto przenieść kredyt do innego banku"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Inputs */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">Obecny kredyt</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pierwotna kwota (PLN)</label>
                <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} min={0}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Oprocentowanie (%)</label>
                  <input type="number" step="0.01" value={oldRate} onChange={e => setOldRate(Number(e.target.value))} min={0}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Okres (lat)</label>
                  <input type="number" value={totalYears} onChange={e => setTotalYears(Number(e.target.value))} min={1}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Miesięcy spłaconych</label>
                  <input type="number" value={monthsPaid} onChange={e => setMonthsPaid(Number(e.target.value))} min={0}
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
            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">Nowa oferta</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Wybierz bank (lub wpisz ręcznie)</label>
                <select value={selectedBank} onChange={e => handleBankSelect(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">— Wpisz ręcznie —</option>
                  {BANK_PROFILES.map(b => (
                    <option key={b.id} value={b.id}>{b.name} (marża ~{((b.typicalMarginMin + b.typicalMarginMax) / 2).toFixed(1)}%)</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nowe oprocentowanie (%)</label>
                <input type="number" step="0.01" value={newRate} onChange={e => setNewRate(Number(e.target.value))} min={0}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Koszty jednorazowe (PLN)</label>
                  <input type="number" value={transferFees} onChange={e => setTransferFees(Number(e.target.value))} min={0}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prowizja nowego banku (%)</label>
                  <input type="number" step="0.1" value={newProvision * 100} onChange={e => setNewProvision(Number(e.target.value) / 100)} min={0}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Opłata za wcześniejszą spłatę (%)</label>
                <input type="number" step="0.1" value={earlyFee} onChange={e => setEarlyFee(Number(e.target.value))} min={0} max={5}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <p className="text-xs text-gray-400 mt-1">Przy zmiennym oprocentowaniu: 0% po 1. roku</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6 md:sticky md:top-8">
          {result && (
            <>
              <Card title="Wyniki refinansowania">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Saldo do spłaty</div>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrencyShort(result.remainingBalance)}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Miesięczna oszczędność</div>
                      <div className={`text-xl font-bold ${result.monthlySavings > 0 ? 'text-green-700' : 'text-red-600'}`}>
                        {result.monthlySavings > 0 ? '+' : ''}{formatCurrency(result.monthlySavings)}
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Całkowite koszty</div>
                      <div className="text-xl font-bold text-yellow-700">{formatCurrencyShort(result.totalCosts)}</div>
                    </div>
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Koszty refinansowania:</span>
                      <span className="font-medium">{formatCurrencyShort(result.totalCosts)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Oszczędność na odsetkach:</span>
                      <span className="font-bold text-green-600">{formatCurrencyShort(result.interestSaved)}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t pt-2">
                      <span className="text-gray-700 font-semibold">Korzyść netto:</span>
                      <span className={`text-lg font-bold ${result.netBenefit > 0 ? 'text-green-700' : 'text-red-600'}`}>
                        {formatCurrencyShort(result.netBenefit)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Opłacalność">
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${result.isWorthIt ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="text-lg font-bold mb-1">
                      {result.isWorthIt ? '✅ Refinansowanie się opłaca!' : '❌ Refinansowanie się nie opłaca'}
                    </div>
                    <p className="text-sm text-gray-600">
                      {result.isWorthIt
                        ? `Zwrot kosztów po ${result.breakevenMonths} miesiącach (${(result.breakevenMonths / 12).toFixed(1)} lat).`
                        : 'Koszty refinansowania przewyższają oszczędności na odsetkach.'}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Stara rata: {formatCurrency(result.oldMonthlyPayment)}/mies.</div>
                    <div>Nowa rata: {formatCurrency(result.newMonthlyPayment)}/mies.</div>
                    <div>Okres zwrotu: {formatMonths(result.breakevenMonths)}</div>
                  </div>
                </div>
              </Card>

              <Alert type="info">
                <p className="text-sm">
                  Typowe koszty refinansowania: wycena nieruchomości (~500 zł), notariusz (~1000-3000 zł),
                  wpis do KW (200 zł), wykreślenie hipoteki (100 zł). Przy zmiennym oprocentowaniu po 1. roku
                  nie ma opłat za wcześniejszą spłatę.
                </p>
              </Alert>
            </>
          )}
        </div>
      </div>
    </TabContainer>
  )
}
