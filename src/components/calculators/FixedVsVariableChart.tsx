import type { FixedVsVariableComparison } from '../../utils/fixedVsVariable'

interface FixedVsVariableChartProps {
  result: FixedVsVariableComparison
}

const SVG_WIDTH = 600
const SVG_HEIGHT = 280
const PADDING = { top: 30, right: 30, bottom: 50, left: 60 }
const CHART_WIDTH = SVG_WIDTH - PADDING.left - PADDING.right
const CHART_HEIGHT = SVG_HEIGHT - PADDING.top - PADDING.bottom

export default function FixedVsVariableChart({ result }: FixedVsVariableChartProps) {
  const { fixed, variable } = result

  // No data — render empty placeholder
  if (fixed.monthlyPayment === 0 && variable.monthlyPayment === 0) {
    return (
      <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Prognoza oprocentowania w czasie</h3>
        <svg width={SVG_WIDTH} height={SVG_HEIGHT} className="w-full h-auto max-w-full" role="img" aria-label="Wykres porównania stałe vs zmienne">
          <text x={SVG_WIDTH / 2} y={SVG_HEIGHT / 2} textAnchor="middle" fill="#9CA3AF" fontSize={14}>
            Wprowadź dane, aby zobaczyć wykres
          </text>
        </svg>
      </div>
    )
  }

  const totalYears = Math.max(fixed.fixedPeriodYears > 0 ? fixed.fixedPeriodYears * 2 : 25, 25)
  const fixedRate = fixed.rate
  const variableRate = variable.rate
  const yMin = Math.min(fixedRate, variableRate) - 1
  const yMax = Math.max(fixedRate, variableRate) + 2

  const scaleY = (value: number) =>
    PADDING.top + CHART_HEIGHT - ((value - yMin) / (yMax - yMin)) * CHART_HEIGHT
  const scaleX = (year: number) =>
    PADDING.left + (year / totalYears) * CHART_WIDTH

  // Generate grid lines
  const ySteps = 5
  const yGridLines = Array.from({ length: ySteps + 1 }, (_, i) => {
    const value = yMin + (i / ySteps) * (yMax - yMin)
    return { value, y: scaleY(value) }
  })

  // X grid lines - every 5 years
  const xSteps = Math.max(1, Math.floor(totalYears / 5))
  const xGridLines = Array.from({ length: Math.floor(totalYears / xSteps) + 1 }, (_, i) => {
    const year = i * xSteps
    return { year, x: scaleX(year) }
  })

  // Fixed rate line: horizontal at fixedRate during fixed period, then goes to variableRate
  const fixedLinePoints = [
    { x: scaleX(0), y: scaleY(fixedRate) },
    { x: scaleX(fixed.fixedPeriodYears), y: scaleY(fixedRate) },
    { x: scaleX(fixed.fixedPeriodYears), y: scaleY(variableRate), dashed: true },
    { x: scaleX(totalYears), y: scaleY(variableRate), dashed: true },
  ]

  // Variable rate line: horizontal at variableRate
  const variableLinePoints = [
    { x: scaleX(0), y: scaleY(variableRate) },
    { x: scaleX(totalYears), y: scaleY(variableRate) },
  ]

  const fixedPathD = fixedLinePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const variablePathD = variableLinePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Prognoza oprocentowania w czasie</h3>
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="w-full h-auto max-w-full"
        role="img"
        aria-label="Wykres porównania oprocentowania stałego i zmiennego"
      >
        {/* Y-axis grid lines */}
        {yGridLines.map(({ value, y }) => (
          <g key={value}>
            <line x1={PADDING.left} y1={y} x2={PADDING.left + CHART_WIDTH} y2={y} stroke="#E5E7EB" strokeWidth={1} />
            <text x={PADDING.left - 8} y={y + 4} textAnchor="end" fill="#6B7280" fontSize={11}>
              {value.toFixed(1)}%
            </text>
          </g>
        ))}

        {/* X-axis grid lines */}
        {xGridLines.map(({ year, x }) => (
          <g key={year}>
            <line x1={x} y1={PADDING.top} x2={x} y2={PADDING.top + CHART_HEIGHT} stroke="#E5E7EB" strokeWidth={1} />
            <text x={x} y={PADDING.top + CHART_HEIGHT + 18} textAnchor="middle" fill="#6B7280" fontSize={11}>
              {year} lat
            </text>
          </g>
        ))}

        {/* Axes labels */}
        <text x={15} y={SVG_HEIGHT / 2} textAnchor="middle" fill="#6B7280" fontSize={11} transform={`rotate(-90, 15, ${SVG_HEIGHT / 2})`}>
          Oprocentowanie
        </text>

        {/* Variable rate line */}
        <path d={variablePathD} fill="none" stroke="#3B82F6" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />

        {/* Fixed rate line */}
        <path d={fixedPathD} fill="none" stroke="#D97706" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Dashed portion of fixed rate line after fixed period */}
        {fixedLinePoints.slice(2).length > 0 && (
          <path
            d={fixedLinePoints.slice(2).map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
            fill="none"
            stroke="#D97706"
            strokeWidth={3}
            strokeDasharray="6,4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Data points */}
        {/* Fixed rate start point */}
        <circle cx={scaleX(0)} cy={scaleY(fixedRate)} r={5} fill="#D97706" stroke="white" strokeWidth={2} />
        {/* Fixed rate end of fixed period */}
        <circle cx={scaleX(fixed.fixedPeriodYears)} cy={scaleY(fixedRate)} r={5} fill="#D97706" stroke="white" strokeWidth={2} />
        {/* Variable rate start point */}
        <circle cx={scaleX(0)} cy={scaleY(variableRate)} r={5} fill="#3B82F6" stroke="white" strokeWidth={2} />

        {/* Annotation - fixed period label */}
        <rect
          x={scaleX(0)}
          y={PADDING.top + CHART_HEIGHT + 24}
          width={scaleX(fixed.fixedPeriodYears) - scaleX(0)}
          height={4}
          fill="#D97706"
          rx={2}
          opacity={0.5}
        />
        <text
          x={(scaleX(0) + scaleX(fixed.fixedPeriodYears)) / 2}
          y={PADDING.top + CHART_HEIGHT + 36}
          textAnchor="middle"
          fill="#D97706"
          fontSize={10}
          fontWeight={600}
        >
          Okres stały ({fixed.fixedPeriodYears} lat)
        </text>

        {/* Legend */}
        <g transform={`translate(${PADDING.left + CHART_WIDTH - 150}, ${PADDING.top + 8})`}>
          {/* Fixed */}
          <line x1={0} y1={0} x2={20} y2={0} stroke="#D97706" strokeWidth={3} />
          <text x={26} y={4} fill="#374151" fontSize={11}>Oprocentowanie stałe</text>
          {/* Variable */}
          <line x1={0} y1={16} x2={20} y2={16} stroke="#3B82F6" strokeWidth={3} />
          <text x={26} y={20} fill="#374151" fontSize={11}>Oprocentowanie zmienne</text>
        </g>
      </svg>
    </div>
  )
}