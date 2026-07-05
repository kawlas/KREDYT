import { useState, useMemo } from 'react'
import { useWIBOR } from '../../hooks/useWIBOR'
import { calculateMonthlyPayment, calculateTotalCost } from '../../utils/loanCalculations'
import { formatCurrency } from '../../utils/formatters'
import Card from '../shared/Card'
import Alert from '../shared/Alert'
import TabContainer from '../layout/TabContainer'

export default function BankComparisonCalc() {
  const { wibor: liveWibor, lastUpdate, source } = useWIBOR(true)
  const [principal, setPrincipal] = useState(400000)
  const [years, setYears] = useState(25)
  const [margin, setMargin] = useState(2.0)
  const [installmentType, setInstallmentType] = useState<'equal' | 'declining'>('equal')

  const effectiveInterest = (liveWibor ?? 3.85) + margin

  const monthlyPayment = useMemo(() => {
    if (principal <= 0 || years <= 0 || effectiveInterest <= 0) return 0
    return calculateMonthlyPayment(principal, effectiveInterest, years * 12, installmentType)
  }, [principal, years, effectiveInterest, installmentType])

  const totalCost = useMemo(() => {
    if (principal <= 0 || years <= 0 || effectiveInterest <= 0) return 0
    return calculateTotalCost(principal, effectiveInterest, years * 12, installmentType, 0)
  }, [principal, effectiveInterest, years, monthlyPayment, installmentType])

  // KNF stress test (+2.5pp)
  const stressInterest = effectiveInterest + 2.5
  const stressPayment = useMemo(() => {
    if (principal <= 0 || years <= 0) return 0
    return calculateMonthlyPayment(principal, stressInterest, years * 12, installmentType)
  }, [principal, years, stressInterest, installmentType])

  return (
    <TabContainer
      title="Kalkulator kredytu hipotecznego"
      subtitle="Oblicz ratę i koszt kredytu dla swoich parametrów"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar — parametry */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Parametry kredytu</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">Kwota kredytu (zł)</label>
                <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))}
                  className="w-full px-2 py-1.5 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">Okres spłaty (lat)</label>
                <input type="number" value={years} onChange={e => setYears(Number(e.target.value))}
                  className="w-full px-2 py-1.5 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">Marża banku (%)</label>
                <input type="number" step="0.01" value={margin} onChange={e => setMargin(Number(e.target.value))}
                  className="w-full px-2 py-1.5 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                <p className="text-[10px] text-gray-400 mt-0.5">Wpisz marżę którą proponuje bank. Typowo 1.5–3.5%.</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">Rodzaj rat</label>
                <select value={installmentType} onChange={e => setInstallmentType(e.target.value as 'equal' | 'declining')}
                  className="w-full px-2 py-1.5 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="equal">Równe (annuitetowe)</option>
                  <option value="declining">Malejące</option>
                </select>
              </div>
            </div>
          </Card>

          {/* WIBOR info */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-gray-600">
                <strong>WIBOR 3M:</strong> {liveWibor !== null ? `${liveWibor.toFixed(2)}%` : '—'}
                <span className="text-gray-400"> ({source || 'Bankier.pl'})</span>
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Twoje oprocentowanie: marża {margin}% + WIBOR {liveWibor !== null ? liveWibor.toFixed(2) : '?'}% ={' '}
              <strong className="text-gray-700">{effectiveInterest.toFixed(2)}%</strong>
            </p>
            <p className="text-[11px] text-gray-400">{lastUpdate && `Ostatnia aktualizacja WIBOR: ${lastUpdate}`}</p>
          </div>

          <Alert type="info">
            <p className="text-xs">
              <strong>Szukasz najlepszej oferty?</strong> Sprawdź aktualne porównanie ofert na:
            </p>
            <ul className="text-xs mt-1 space-y-0.5">
              <li>• <a href="https://www.bankier.pl/smart/kredyty-hipoteczne" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Bankier.pl — ranking kredytów hipotecznych</a></li>
              <li>• <a href="https://totalmoney.pl/kredyty-hipoteczne" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TotalMoney.pl — porównywarka</a></li>
            </ul>
          </Alert>
        </div>

        {/* Right side — wyniki */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Podsumowanie</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-xs text-blue-600 font-medium">Miesięczna rata</p>
                <p className="text-2xl font-bold text-blue-700">{formatCurrency(monthlyPayment)}</p>
                <p className="text-[11px] text-blue-500">
                  {installmentType === 'equal' ? 'rata równa' : 'pierwsza rata (malejąca)'}
                </p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <p className="text-xs text-red-600 font-medium">Całkowity koszt</p>
                <p className="text-2xl font-bold text-red-700">{formatCurrency(totalCost)}</p>
                <p className="text-[11px] text-red-500">odsetki + prowizje</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4 text-center">
                <p className="text-xs text-amber-600 font-medium">Oprocentowanie</p>
                <p className="text-2xl font-bold text-amber-700">{effectiveInterest.toFixed(2)}%</p>
                <p className="text-[11px] text-amber-500">
                  WIBOR {liveWibor !== null ? liveWibor.toFixed(2) : '?'}% + marża {margin}%
                </p>
              </div>
            </div>
          </Card>

          {/* KNF stress test */}
          <Alert type="warning">
            <p className="text-sm">
              <strong>Test warunków skrajnych (KNF +2.5pp):</strong> Banki zgodnie z Rekomendacją S KNF
              sprawdzają zdolność kredytową przy oprocentowaniu wyższym o 2.5 p.p.
              Dla Twoich parametrów rata przy teście wynosi{' '}
              <strong>{formatCurrency(stressPayment)}/mies.</strong>
              {' '}(przy {stressInterest.toFixed(2)}%).
            </p>
          </Alert>

          {/* Educational info */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Jak liczyć koszt kredytu?</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p>
                <strong>Oprocentowanie</strong> = WIBOR 3M + marża banku. WIBOR zmienia się w czasie —
                rata może rosnąć lub maleć.
              </p>
              <p>
                <strong>Marża</strong> to stały składnik — negocjuj ją z bankiem.
                Im niższa marża, tym tańszy kredyt.
              </p>
              <p>
                <strong>RRSO</strong> uwzględnia wszystkie koszty (marżę, prowizję, ubezpieczenia).
                To najlepszy wskaźnik do porównania ofert.
              </p>
            </div>
          </Card>

          <Alert type="warning">
            <p className="text-xs">
              Ten kalkulator pokazuje szacunkowe wyliczenia. Rzeczywista oferta zależy od indywidualnej oceny
              zdolności kredytowej, LTV, wkładu własnego i negocjacji z bankiem. Przed podjęciem decyzji
              skonsultuj się z doradcą finansowym.
            </p>
          </Alert>
        </div>
      </div>
    </TabContainer>
  )
}
