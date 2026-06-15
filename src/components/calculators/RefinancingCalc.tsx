import { useMemo, useState } from 'react'
import { calculateRefinancingAnalysis } from '../../utils/refinancing'
import { formatCurrency, formatCurrencyShort, formatMonths } from '../../utils/formatters'
import { BANK_PROFILES } from '../../data/bankProfiles'
import { useWIBOR } from '../../hooks/useWIBOR'
import Card from '../shared/Card'
import Alert from '../shared/Alert'
import TabContainer from '../layout/TabContainer'

export default function RefinancingCalc() {
  const { wibor: liveWibor } = useWIBOR(true)
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
  const [settlementDay, setSettlementDay] = useState(15)
  const [lastPaymentDay, setLastPaymentDay] = useState(1)
  const [capitalizeCosts, setCapitalizeCosts] = useState(false)
  const [newTermYears, setNewTermYears] = useState(0)

  const handleBankSelect = (id: string) => {
    setSelectedBank(id)
    const bank = BANK_PROFILES.find(b => b.id === id)
    if (bank) {
      const wiborValue = liveWibor ?? 5.85
      setNewRate((bank.typicalMarginMin + bank.typicalMarginMax) / 2 + wiborValue)
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
      settlementDay,
      lastPaymentDay,
      capitalizeCosts,
      bridgingInsuranceMonths: 3,
      newTermMonths: newTermYears > 0 ? newTermYears * 12 : 0,
    })
  }, [principal, oldRate, newRate, totalYears, monthsPaid, installmentType, newProvision, transferFees, earlyFee, settlementDay, lastPaymentDay, capitalizeCosts, newTermYears])

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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Koszty dodatkowe (wpisane ręcznie)</label>
                  <input type="number" value={transferFees} onChange={e => setTransferFees(Number(e.target.value))} min={0}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  <p className="text-xs text-gray-400 mt-1">Suma: wycena (~500 zł) + notariusz (~1000-3000 zł) + wpis do KW (200 zł) + wykreślenie hipoteki (100 zł)</p>
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

              <details className="border-t pt-4">
                <summary className="text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-800">Opcje zaawansowane</summary>
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Dzień rozliczenia</label>
                      <input type="number" value={settlementDay} onChange={e => setSettlementDay(Math.max(1, Math.min(28, Number(e.target.value))))} min={1} max={28}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Dzień ostatniej raty</label>
                      <input type="number" value={lastPaymentDay} onChange={e => setLastPaymentDay(Math.max(1, Math.min(28, Number(e.target.value))))} min={1} max={28}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nowy okres (lat) — opcjonalnie</label>
                    <input type="number" value={newTermYears} onChange={e => setNewTermYears(Math.max(0, Number(e.target.value)))} min={0}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    <p className="text-xs text-gray-400 mt-1">Pozostaw 0, aby zachować pozostały okres kredytowania</p>
                  </div>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={capitalizeCosts} onChange={e => setCapitalizeCosts(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="font-medium text-gray-700">Dodaj koszty do kapitału nowego kredytu</span>
                  </label>
                  <p className="text-xs text-gray-400">Koszty refinansowania doliczane do salda — niższy wydatek z góry, ale wyższa rata.</p>
                </div>
              </details>
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
                    {result.newPrincipal !== result.remainingBalance && (
                      <div className="text-xs text-gray-500 mt-1">
                        Nowa kwota kredytu: {formatCurrencyShort(result.newPrincipal)}
                        <span className="text-orange-500"> (+{formatCurrencyShort(result.capitalizedCosts)} kosztów w kapitale)</span>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Miesięczna oszczędność</div>
                      <div className={`text-xl font-bold ${result.monthlySavings > 0 ? 'text-green-700' : 'text-red-600'}`}>
                        {result.monthlySavings > 0 ? '+' : ''}{formatCurrency(result.monthlySavings)}
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">{capitalizeCosts ? 'Dodane do kapitału' : 'Koszty z góry'}</div>
                      <div className={`text-xl font-bold ${capitalizeCosts ? 'text-orange-600' : 'text-yellow-700'}`}>
                        {capitalizeCosts ? formatCurrencyShort(result.capitalizedCosts) : formatCurrencyShort(result.totalCosts)}
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-4 space-y-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-2">Wpisane ręcznie</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Koszty dodatkowe (wycena, notariusz, KW):</span>
                      <span>{formatCurrencyShort(result.detailedCosts.transferFees)}</span>
                    </div>

                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-3">Wyliczone automatycznie</p>
                    {result.detailedCosts.newProvision > 0 && (
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Prowizja nowego banku ({(newProvision * 100).toFixed(1)}%):</span>
                        <span>{formatCurrencyShort(result.detailedCosts.newProvision)}</span>
                      </div>
                    )}
                    {result.detailedCosts.earlyRepaymentFee > 0 && (
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Opłata za wcześniejszą spłatę:</span>
                        <span>{formatCurrencyShort(result.detailedCosts.earlyRepaymentFee)}</span>
                      </div>
                    )}
                    {result.detailedCosts.accruedInterest > 0 && (
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Odsetki międzyratowe ({(() => { const d = settlementDay >= lastPaymentDay ? settlementDay - lastPaymentDay : 30 + settlementDay - lastPaymentDay; return `${d} dni` })()}):</span>
                        <span>{formatCurrencyShort(result.detailedCosts.accruedInterest)}</span>
                      </div>
                    )}
                    {result.detailedCosts.bridgingInsurance > 0 && (
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Ubezpieczenie pomostowe (3 mies.):</span>
                        <span>{formatCurrencyShort(result.detailedCosts.bridgingInsurance)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm border-t pt-2 mt-3">
                      <span className="text-gray-700 font-semibold">Całkowite koszty refinansowania:</span>
                      <span className="font-bold">{formatCurrencyShort(result.totalCosts)}</span>
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
                    {result.capitalizedCosts > 0 && (
                      <div className="text-orange-600">Koszty dodane do kapitału: {formatCurrencyShort(result.capitalizedCosts)}</div>
                    )}
                  </div>
                </div>
              </Card>

              <Alert type="info">
                <p className="text-sm font-medium mb-1">Jak wypełnić kalkulator?</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li><strong>Koszty dodatkowe</strong> — wpisz sumę: wycena (~500 zł) + notariusz (~1000-3000 zł) + wpis do KW (200 zł) + wykreślenie hipoteki (100 zł). To pole wypełniasz ręcznie.</li>
                  <li><strong>Prowizja nowego banku</strong> — ustaw procent. Kwota prowizji liczona jest automatycznie: od salda (gdy koszty płacisz z góry) lub od pełnej nowej kwoty (gdy koszty dodane do kapitału).</li>
                  <li><strong>Odsetki międzyratowe</strong> — liczone automatycznie z różnicy dni między ostatnią ratą a rozliczeniem.</li>
                  <li><strong>Ubezpieczenie pomostowe</strong> — doliczane automatycznie (3 mies. × 300 zł).</li>
                  <li>Przy zmiennym oprocentowaniu po 1. roku nie ma opłat za wcześniejszą spłatę.</li>
                </ul>
              </Alert>
            </>
          )}
        </div>
      </div>
    </TabContainer>
  )
}
