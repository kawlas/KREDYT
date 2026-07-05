import type { ChartDataPoint } from '../../utils/bankComparisonEnhanced'

interface BankComparisonChartProps {
  data: ChartDataPoint[]
}

const SVG_WIDTH = 600
const SVG_HEIGHT = 300
const PADDING = { top: 30, right: 30, bottom: 60, left: 70 }
const CHART_WIDTH = SVG_WIDTH - PADDING.left - PADDING.right
const CHART_HEIGHT = SVG_HEIGHT - PADDING.top - PADDING.bottom

export default function BankComparisonChart({ data }: BankComparisonChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <p className="text-gray-500 text-sm text-center">Brak danych do porównania</p>
      </div>
    )
  }

  const maxCost = Math.max(...data.map(d => d.totalCost)) * 1.15
  const barWidth = Math.min(50, (CHART_WIDTH - 20) / data.length)

  const scaleX = (i: number) => PADDING.left + 20 + i * (barWidth + 12)
  const scaleY = (value: number) => PADDING.top + CHART_HEIGHT - (value / maxCost) * CHART_HEIGHT

  // Y grid lines
  const ySteps = 5
  const yGridLines = Array.from({ length: ySteps + 1 }, (_, i) => {
    const value = (i / ySteps) * maxCost
    return { value, y: scaleY(value) }
  })

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Porównanie kosztów całkowitych</h3>
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full h-auto max-w-full" role="img" aria-label="Wykres porównania kosztów banków">
        {/* Y-axis grid */}
        {yGridLines.map(({ value, y }) => (
          <g key={value.toFixed(0)}>
            <line x1={PADDING.left} y1={y} x2={PADDING.left + CHART_WIDTH} y2={y} stroke="#E5E7EB" strokeWidth={1} />
            <text x={PADDING.left - 8} y={y + 4} textAnchor="end" fill="#6B7280" fontSize={10}>
              {(value / 1000).toFixed(0)}k
            </text>
          </g>
        ))}

        {/* Y-axis label */}
        <text x={12} y={SVG_HEIGHT / 2} textAnchor="middle" fill="#6B7280" fontSize={10}
          transform={`rotate(-90, 12, ${SVG_HEIGHT / 2})`}>
          Koszt całkowity
        </text>

        {/* Bars */}
        {data.map((d, i) => {
          const x = scaleX(i)
          const y = scaleY(d.totalCost)
          const barHeight = CHART_HEIGHT - (y - PADDING.top)
          const color = d.isBest ? '#059669' : '#3B82F6'

          return (
            <g key={d.label}>
              <rect x={x} y={y} width={barWidth} height={barHeight} rx={4}
                fill={color} opacity={0.85}
                className="hover:opacity-100 transition-opacity cursor-pointer" />
              {d.isBest && (
                <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fill="#059669" fontSize={10} fontWeight={600}>
                  ★ NAJLEPSZY
                </text>
              )}
              {/* Monthly payment annotation */}
              <text x={x + barWidth / 2} y={y + barHeight + 14} textAnchor="middle" fill="#374151" fontSize={10} fontWeight={500}>
                {d.monthlyPayment.toFixed(0)} zł/mc
              </text>
              {/* Bank name */}
              <text x={x + barWidth / 2} y={y + barHeight + 30} textAnchor="middle" fill="#6B7280" fontSize={9}>
                {d.label.length > 12 ? d.label.slice(0, 12) + '…' : d.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}