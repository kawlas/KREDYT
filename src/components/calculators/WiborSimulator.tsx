import { useState, useEffect, useMemo } from 'react'
import { calculateMonthlyPayment } from '../../utils/loanCalculations'
import { formatCurrency, formatPercent, formatCurrencyShort } from '../../utils/formatters'
import { useWIBOR } from '../../hooks/useWIBOR'
import WIBORDisplay from '../shared/WIBORDisplay'
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
  
  const wiborData = useWIBOR(true)
  const [historyData, setHistoryData] = useState<Array<{date: string; value: number} | null> | null>(null)
  const [historyLoading, setHistoryLoading] = useState(true)

  useEffect(() => {
    fetch('/wibor.json')
      .then(res => res.json())
      .then(data => {
        setHistoryData(data.history ?? [])
        setHistoryLoading(false)
      })
      .catch(() => {
        setHistoryLoading(false)
        setHistoryData([])
      })
  }, [])

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

  // Prepare historical data for chart: extract yearly average? We have yearly points already.
  const chartData = useMemo(() => {
    if (!historyData) return []
    // Filter out nulls and sort by date
    const valid = historyData.filter((item): item is {date: string; value: number} => item !== null)
    return valid.slice().sort((a, b) => a.date.localeCompare(b.date))
  }, [historyData])

  // Compute chart dimensions and points
  const chartPoints = useMemo(() => {
    if (chartData.length === 0) return []
    const width = 340
    const height = 200
    const padding = 40
    const chartWidth = width - 2 * padding
    const chartHeight = height - 2 * padding

    // Find min and max values for scaling
    const values = chartData.map(d => d.value)
    const minVal = Math.min(...values)
    const maxVal = Math.max(...values)
    const valueRange = maxVal - minVal
    const range = valueRange > 0 ? valueRange : 1 // avoid division by zero

    return chartData.map((d, idx) => {
      const x = padding + (idx / (chartData.length - 1)) * chartWidth
      // Invert y because SVG y starts at top
      const y = height - padding - ((d.value - minVal) / range) * chartHeight
      return { x, y, date: d.date, value: d.value }
    })
  }, [chartData])

  const chartAnnotations = useMemo(() => {
    if (chartPoints.length === 0) return []
    const annotations = []
    // Low period: 2020-2021
    const lowStartIdx = chartPoints.findIndex(p => p.date.startsWith('2020'))
    const lowEndIdx = chartPoints.findIndex(p => p.date.startsWith('2021'))
    if (lowStartIdx !== -1 && lowEndIdx !== -1) {
      annotations.push(
        <text
          key="low"
          x={(chartPoints[lowStartIdx].x + chartPoints[lowEndIdx].x) / 2}
          y={chartPoints[lowStartIdx].y - 10}
          textAnchor="middle"
          fontSize="10"
          fill="green"
        >
          Stopy niskie
        </text>
      )
    }
    // High period: 2022-2024
    const highStartIdx = chartPoints.findIndex(p => p.date.startsWith('2022'))
    const highEndIdx = chartPoints.findIndex(p => p.date.startsWith('2024'))
    if (highStartIdx !== -1 && highEndIdx !== -1) {
      annotations.push(
        <text
          key="high"
          x={(chartPoints[highStartIdx].x + chartPoints[highEndIdx].x) / 2}
          y={chartPoints[highStartIdx].y - 10}
          textAnchor="middle"
          fontSize="10"
          fill="red"
        >
          Stopy wysokie
        </text>
      )
    }
    return annotations
  }, [chartPoints])

  return (
    <TabContainer
      title="Symulacja zmiany WIBOR"
      subtitle="Sprawdź jak wzrost stóp wpłynie na Twoją ratę"
      contextInfo={`Dla kredytu ${formatCurrencyShort(loanAmount)}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Controls */}
        <div className="space-y-6">
          <WIBORDisplay
            wibor={wiborData.wibor}
            loading={wiborData.loading}
            error={wiborData.error}
            lastUpdate={wiborData.lastUpdate}
            source={wiborData.source}
            onRefresh={wiborData.refresh}
          />

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
            <Alert type="warning">
              <div className="font-semibold mb-1 text-sm">Scenariusz pesymistyczny</div>
              <p className="text-xs">
                Wzrost o 2-3 p.p. w krótkim czasie jest możliwy (historia 2021-2022). Upewnij się, że masz poduszkę finansową na wypadek takich zmian.
              </p>
            </Alert>
          )}
        </div>
      </div>

      {/* Historical Chart Section */}
      {historyLoading ? (
        <div className="col-span-2 text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-sm text-gray-500">Ładowanie historii WIBOR...</p>
        </div>
      ) : historyData && historyData.length > 0 ? (
        <div className="col-span-2 py-8">
          <Card title="Historia WIBOR (10 lat)" className="mb-6">
            <div className="space-y-6">
              {/* Adnotacja o różnicy rat */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-900 mb-2">
                  Uwaga: Różnica w metodologii naliczania odsetek (act/365 vs act/360) może oznaczać tysiące złotych różnicy w kosztach kredytu.
                </div>
                <div className="text-xs text-gray-600">
                  Przykładowo: przy kredycie 400 000 zł na 25 lat, rata w 2020 r. wynosiła ~1800 zł, a w 2023 r. ~3200 zł (różnica ~1400 zł miesięcznie).
                </div>
              </div>

              {/* SVG Chart */}
              <div className="relative h-[200px] w-full">
                <svg className="absolute inset-0" width="340" height="200">
                  {/* Axes */}
                  <line x1="40" y1="40" x2="40" y2="160" stroke="gray" strokeWidth="1" />
                  <line x1="40" y1="160" x2="340" y2="160" stroke="gray" strokeWidth="1" />

                  {/* Labels for years */}
                  {chartPoints.map((p, idx) => (
                    <text
                      key={idx}
                      x={p.x}
                      y={170}
                      textAnchor="middle"
                      fontSize="10"
                      fill="gray"
                    >
                      {p.date.slice(0, 4)}
                    </text>
                  ))}

                  {/* Value labels on left */}
                  {[chartPoints[0].value, chartPoints[chartPoints.length - 1].value].map((val, idx) => (
                    <text
                      key={idx}
                      x={20}
                      y={idx === 0 ? chartPoints[0].y : chartPoints[chartPoints.length - 1].y}
                      textAnchor="end"
                      fontSize="10"
                      fill="gray"
                      dy="3"
                    >
                      {val.toFixed(2)}%
                    </text>
                  ))}

                  {/* Line chart */}
                  <path
                    d={chartPoints.map((p, idx) => 
                      idx === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
                    ).join(' ')}
                    fill="none"
                    stroke="blue"
                    strokeWidth="2"
                  />

                  {/* Points */}
                  {chartPoints.map((p, idx) => (
                    <circle
                      key={idx}
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      fill="blue"
                    />
                  ))}

                  {/* Annotations for low and high periods */}
                  {chartAnnotations}
                </svg>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="col-span-2 text-center py-8">
          <p className="text-sm text-gray-500">Brak danych historycznych WIBOR.</p>
        </div>
      )}
    </TabContainer>
  )
}
