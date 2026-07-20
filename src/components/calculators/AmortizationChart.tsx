import type { ChartYearData, AmortizationInsights } from '../../utils/amortizationChart'
import { formatCurrencyShort } from '../../utils/formatters'
import Card from '../shared/Card'
import Alert from '../shared/Alert'

interface AmortizationChartProps {
  data: ChartYearData[]
  insights: AmortizationInsights
  loanAmount: number
}

export default function AmortizationChart({ data, insights, loanAmount }: AmortizationChartProps) {
  if (data.length === 0) {
    return (
      <Card>
        <p className="text-muted-foreground italic">Brak danych do wyświetlenia wykresu</p>
      </Card>
    )
  }

  const maxTotal = Math.max(...data.map(d => d.total))

  return (
    <Card>
      <figure role="figure" aria-label="Wykres amortyzacji kredytu">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Gdzie idzie Twoja rata? — Jak zmienia się rata w czasie
        </h3>

        <div className="mb-6">
          <div className="flex items-center gap-6 mb-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-rose-500" />
              <span className="text-muted-foreground">Odsetki</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-emerald-500" />
              <span className="text-muted-foreground">Kapitał</span>
            </div>
          </div>

          <div className="space-y-0.5">
            {data.map((d) => {
              const principalPercent = (d.principal / maxTotal) * 100
              const interestPercent = (d.interest / maxTotal) * 100
              const isLabelYear = d.year % 5 === 0 || d.year === 1 || d.year === data.length

              return (
                <div key={d.year} className="flex items-center gap-2">
                  <span className={`w-8 text-xs text-right shrink-0 ${isLabelYear ? 'text-muted-foreground' : 'text-transparent'}`}>
                    {isLabelYear ? d.year : '-'}
                  </span>
                  <div className="flex-1 h-5 rounded-sm overflow-hidden flex bg-secondary">
                    <div
                      className="h-full bg-rose-500 transition-all duration-300"
                      style={{ width: `${interestPercent}%` }}
                      title={`Rok ${d.year}: ${formatCurrencyShort(d.interest)} odsetek`}
                    />
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${principalPercent}%` }}
                      title={`Rok ${d.year}: ${formatCurrencyShort(d.principal)} kapitału`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-3 border-t pt-4">
          <Alert type="warning">
            <p className="font-semibold">
              Pożyczasz {formatCurrencyShort(loanAmount)}, przepłacasz {formatCurrencyShort(insights.totalInterest)}{' '}
              ({(insights.interestToPrincipalRatio * 100).toFixed(0)}% więcej!)
            </p>
          </Alert>

          <Alert type="info">
            <p>
              Przez pierwszy rok odsetki stanowią{' '}
              <strong>{insights.firstYearInterestPercent.toFixed(0)}% raty</strong>.
              Dopiero w <strong>roku {insights.halfwayPointYear}.</strong> kapitał zaczyna przewyższać odsetki.
            </p>
          </Alert>
        </div>
      </figure>
    </Card>
  )
}
