import { useState, useMemo } from 'react'
import { compareRentVsBuy } from '../../utils/rentVsBuy'
import { formatCurrency, formatCurrencyShort, formatPercent } from '../../utils/formatters'
import Card from '../shared/Card'
import Slider from '../shared/Slider'
import Alert from '../shared/Alert'

export default function RentVsBuyCalc() {
  const [propertyPrice, setPropertyPrice] = useState('500000')
  const [downPayment, setDownPayment] = useState('20')
  const [loanRate, setLoanRate] = useState('7.0')
  const [loanTerm, setLoanTerm] = useState(25)
  const [monthlyRent, setMonthlyRent] = useState('2500')
  const [rentIncrease, setRentIncrease] = useState('3')
  const [maintenance, setMaintenance] = useState('600')
  const [appreciation, setAppreciation] = useState('3')
  const [investmentReturn, setInvestmentReturn] = useState('5')
  const [years, setYears] = useState(10)

  const pp = parseFloat(propertyPrice) || 0
  const dp = parseFloat(downPayment) || 20
  const lr = parseFloat(loanRate) || 0
  const mr = parseFloat(monthlyRent) || 0
  const ri = parseFloat(rentIncrease) || 0
  const mt = parseFloat(maintenance) || 0
  const ap = parseFloat(appreciation) || 0
  const ir = parseFloat(investmentReturn) || 0

  const result = useMemo(() => {
    if (pp <= 0 || lr <= 0) return null
    return compareRentVsBuy({
      propertyPrice: pp,
      downPaymentPercent: dp,
      loanRate: lr,
      loanTermYears: loanTerm,
      commissionPercent: 0,
      notaryCosts: 3000,
      pccPercent: 2,
      renovationCosts: 15000,
      monthlyMaintenance: mt,
      monthlyInsurance: 50,
      monthlyRent: mr,
      rentIncreaseAnnual: ri,
      investmentReturnRate: ir,
      propertyAppreciation: ap,
      yearsToCompare: years,
    })
  }, [pp, dp, lr, loanTerm, mr, ri, mt, ap, ir, years])

  const hasValues = pp > 0 && lr > 0 && mr > 0

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* LEFT - inputs */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Parametry nieruchomości</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="rvb-price" className="block text-sm font-medium text-gray-700 mb-1">Cena nieruchomości</label>
                <div className="relative">
                  <input id="rvb-price" type="number" value={propertyPrice}
                    onChange={(e) => setPropertyPrice(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  <span className="absolute right-3 top-2 text-gray-400">PLN</span>
                </div>
              </div>
              <div>
                <label htmlFor="rvb-down" className="block text-sm font-medium text-gray-700 mb-1">Wkład własny</label>
                <div className="relative">
                  <input id="rvb-down" type="number" step="1" value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  <span className="absolute right-3 top-2 text-gray-400">%</span>
                </div>
              </div>
              <div>
                <label htmlFor="rvb-rate" className="block text-sm font-medium text-gray-700 mb-1">Oprocentowanie kredytu</label>
                <div className="relative">
                  <input id="rvb-rate" type="number" step="0.1" value={loanRate}
                    onChange={(e) => setLoanRate(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  <span className="absolute right-3 top-2 text-gray-400">%</span>
                </div>
              </div>
              <Slider label="Okres kredytu" value={loanTerm} min={15} max={35} step={5} unit=" lat"
                onChange={setLoanTerm} minLabel="15 lat" maxLabel="35 lat" />
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Koszty i założenia</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="rvb-rent" className="block text-sm font-medium text-gray-700 mb-1">Miesięczny czynsz najmu</label>
                <div className="relative">
                  <input id="rvb-rent" type="number" value={monthlyRent}
                    onChange={(e) => setMonthlyRent(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  <span className="absolute right-3 top-2 text-gray-400">PLN</span>
                </div>
              </div>
              <div>
                <label htmlFor="rvb-rent-inc" className="block text-sm font-medium text-gray-700 mb-1">Roczny wzrost czynszu</label>
                <div className="relative">
                  <input id="rvb-rent-inc" type="number" step="0.5" value={rentIncrease}
                    onChange={(e) => setRentIncrease(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  <span className="absolute right-3 top-2 text-gray-400">%</span>
                </div>
              </div>
              <div>
                <label htmlFor="rvb-maintenance" className="block text-sm font-medium text-gray-700 mb-1">Koszty utrzymania (media, fundusz remontowy)</label>
                <div className="relative">
                  <input id="rvb-maintenance" type="number" value={maintenance}
                    onChange={(e) => setMaintenance(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  <span className="absolute right-3 top-2 text-gray-400">PLN/mc</span>
                </div>
              </div>
              <div>
                <label htmlFor="rvb-appreciation" className="block text-sm font-medium text-gray-700 mb-1">Roczny wzrost wartości nieruchomości</label>
                <div className="relative">
                  <input id="rvb-appreciation" type="number" step="0.5" value={appreciation}
                    onChange={(e) => setAppreciation(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  <span className="absolute right-3 top-2 text-gray-400">%</span>
                </div>
              </div>
              <div>
                <label htmlFor="rvb-invest" className="block text-sm font-medium text-gray-700 mb-1">Roczny zwrot z inwestycji (dla oszczędności najemcy)</label>
                <div className="relative">
                  <input id="rvb-invest" type="number" step="0.5" value={investmentReturn}
                    onChange={(e) => setInvestmentReturn(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  <span className="absolute right-3 top-2 text-gray-400">%</span>
                </div>
              </div>
              <Slider label="Lata porównania" value={years} min={1} max={30} step={1} unit=" lat"
                onChange={setYears} minLabel="1 rok" maxLabel="30 lat" />
            </div>
          </Card>
        </div>

        {/* RIGHT - results */}
        <div className="space-y-6 md:sticky md:top-8">
          {hasValues && result ? (
            <>
              {/* Main comparison */}
              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 dark:from-gray-800 dark:to-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Wynik porównania</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Kredyt — wartość netto</div>
                    <div className="text-lg font-bold text-green-700 dark:text-green-400">
                      {formatCurrencyShort(result.conclusion.buyNetWorthFinal)}
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Wynajem — wartość netto</div>
                    <div className="text-lg font-bold text-blue-700 dark:text-blue-400">
                      {formatCurrencyShort(result.conclusion.rentNetWorthFinal)}
                    </div>
                  </div>
                </div>

                {result.conclusion.breakEvenYear && (
                  <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    Próg opłacalności: <strong>{result.conclusion.breakEvenYear} lat</strong>
                  </div>
                )}
              </Card>

              {/* Recommendation */}
              <Alert type={result.conclusion.buyIsBetter ? 'success' : 'info'}>
                <div className="font-semibold text-sm mb-1">
                  {result.conclusion.buyIsBetter ? '✅ Lepiej kupić' : '💡 Lepiej wynająć'}
                </div>
                <div className="text-sm">{result.conclusion.recommendation}</div>
              </Alert>

              {/* Year-by-year table */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Szczegóły rok po roku</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-gray-500 border-b dark:border-gray-600">
                        <th className="text-left py-2 pr-2">Rok</th>
                        <th className="text-right px-2">Koszt kupna</th>
                        <th className="text-right px-2">Koszt najmu</th>
                        <th className="text-right px-2">Wartość netto (kupno)</th>
                        <th className="text-right px-2">Wartość netto (najem)</th>
                        <th className="text-right pl-2">Różnica</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyData.filter(d => d.year % 2 === 1 || d.year === result.yearlyData.length).map(d => (
                        <tr key={d.year} className="border-b border-gray-50 dark:border-gray-700">
                          <td className="py-1.5 pr-2 font-medium">{d.year}</td>
                          <td className="text-right px-2">{formatCurrencyShort(d.buyTotalSpent)}</td>
                          <td className="text-right px-2">{formatCurrencyShort(d.rentTotalSpent)}</td>
                          <td className="text-right px-2 font-medium">{formatCurrencyShort(d.buyNetWorth)}</td>
                          <td className="text-right px-2">{formatCurrencyShort(d.rentNetWorth)}</td>
                          <td className={`text-right pl-2 font-medium ${d.netWorthDiff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {d.netWorthDiff >= 0 ? '+' : ''}{formatCurrencyShort(d.netWorthDiff)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-2">Pokazano lata nieparzyste i ostatni</p>
              </Card>

              {/* Note */}
              <div className="text-xs text-gray-400 space-y-1">
                <p>* Koszty początkowe kupna: wkład własny ({downPayment}%), PCC (2%), notariusz (3 000 zł), remont (15 000 zł)</p>
                <p>* Oszczędności najemcy inwestowane z zakładanym zwrotem {investmentReturn}% rocznie</p>
                <p>* Wzrost czynszu: {rentIncrease}% rocznie</p>
              </div>
            </>
          ) : (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-dashed border-gray-300 text-center">
              <p className="text-gray-500 font-medium">Wprowadź dane, aby porównać kredyt z wynajmem</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}