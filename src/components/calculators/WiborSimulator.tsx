import { useState, useMemo } from 'react'
import { calculateMonthlyPayment } from '../../utils/loanCalculations'
import { formatCurrency, formatPercent, formatCurrencyShort } from '../../utils/formatters'
import Card from '../shared/Card'
import Alert from '../shared/Alert'
import Slider from '../shared/Slider'
import TabContainer from '../layout/TabContainer'

interface WiborSimulatorProps {
  loanAmount: number
  loanTermYears: number
  margin: number
  baseWibor: number
  installmentType: 'equal' | 'declining'
}

export default function WiborSimulator({
  loanAmount,
  loanTermYears,
  margin,
  baseWibor,
  installmentType
}: WiborSimulatorProps) {
  const [wiborChange, setWiborChange] = useState(0)
  const [income, setIncome] = useState<number>(10000) // Default value for context

  const simulatedWibor = useMemo(() => {
    return Math.max(0, baseWibor + wiborChange)
  }, [baseWibor, wiborChange])

  const annualRate = margin + simulatedWibor
  const months = loanTermYears * 12

  const simulatedPayment = useMemo(() => {
    return calculateMonthlyPayment(loanAmount, annualRate, months, installmentType)
  }, [loanAmount, annualRate, months, installmentType])

  const basePayment = useMemo(() => {
    return calculateMonthlyPayment(loanAmount, margin + baseWibor, months, installmentType)
  }, [loanAmount, margin, baseWibor, months, installmentType])

  const paymentDifference = simulatedPayment - basePayment
  
  // Safety Zone Calculation
  const dsti = income > 0 ? (simulatedPayment / income) * 100 : 0
  
  const safetyStatus = useMemo(() => {
    if (dsti <= 30) return { label: 'Bezpieczna', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' }
    if (dsti <= 45) return { label: 'Ostrzegawcza', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' }
    return { label: 'Wysokie ryzyko', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' }
  }, [dsti])

  return (
    <TabContainer
      title="Symulacja zmiany WIBOR"
      subtitle="Sprawdź jak wzrost stóp wpłynie na Twoją ratę"
      contextInfo={`Dla kredytu ${formatCurrencyShort(loanAmount)}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Controls */}
        <div className="space-y-6">
          <Card title="Przetestuj scenariusze">
            <div className="space-y-8">
              <Slider
                label="Zmiana WIBOR"
                value={wiborChange}
                min={-2}
                max={5}
                step={0.25}
                onChange={setWiborChange}
                unit=" p.p."
                minLabel="-2%"
                maxLabel="+5%"
                helperText="Przesuń suwak, aby symulować wzrost lub spadek rynkowych stóp procentowych."
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Twój dochód netto (do analizy ryzyka)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Wpisz dochód netto..."
                  />
                  <span className="absolute right-3 top-2 text-gray-400">PLN</span>
                </div>
              </div>
            </div>
          </Card>

          <Alert type="info">
            <p className="text-sm">
              WIBOR 3M/6M zmienia się co kilka miesięcy. Większość kredytów hipotecznych w Polsce posiada zmienne oprocentowanie oparte na tym wskaźniku.
            </p>
          </Alert>
        </div>

        {/* Results */}
        <div className="space-y-6 sticky top-8">
          <Card title="Wynik symulacji">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Nowy WIBOR</div>
                  <div className="text-xl font-bold text-gray-900">{formatPercent(simulatedWibor)}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Oprocentowanie</div>
                  <div className="text-xl font-bold text-blue-600">{formatPercent(annualRate)}</div>
                </div>
              </div>

              <div className="p-6 border-2 border-blue-100 rounded-xl bg-gradient-to-br from-white to-blue-50">
                <div className="text-sm text-blue-700 font-semibold mb-1 uppercase tracking-wider">Nowa rata</div>
                <div className="text-3xl font-bold text-gray-900">{formatCurrency(simulatedPayment)}</div>
                {paymentDifference !== 0 && (
                  <div className={`text-sm mt-2 font-medium ${paymentDifference > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {paymentDifference > 0 ? '↑ Wzrost o ' : '↓ Spadek o '}
                    {formatCurrency(Math.abs(paymentDifference))} miesięcznie
                  </div>
                )}
              </div>

              {/* Safety Indicator */}
              <div className={`p-4 rounded-lg border ${safetyStatus.bg} ${safetyStatus.border}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Strefa bezpieczeństwa:</span>
                  <span className={`text-sm font-bold ${safetyStatus.color}`}>{safetyStatus.label}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full transition-all duration-500 ${dsti > 45 ? 'bg-red-500' : dsti > 30 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                    style={{ width: `${Math.min(100, (dsti / 60) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>0%</span>
                  <span>30%</span>
                  <span>45%</span>
                  <span>60%+</span>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Rata stanowi <strong>{dsti.toFixed(1)}%</strong> Twojego dochodu netto. 
                  {dsti > 50 && " To bardzo wysokie obciążenie, które może zagrozić płynności finansowej."}
                </p>
              </div>
            </div>
          </Card>

          {wiborChange > 2 && (
            <Alert type="warning" icon="⚠️">
              <div className="font-semibold mb-1 text-sm">Scenariusz pesymistyczny</div>
              <p className="text-xs">
                Wzrost o 2-3 p.p. w krótkim czasie jest możliwy (historia 2021-2022). Upewnij się, że masz poduszkę finansową na wypadek takich zmian.
              </p>
            </Alert>
          )}
        </div>
      </div>
    </TabContainer>
  )
}
