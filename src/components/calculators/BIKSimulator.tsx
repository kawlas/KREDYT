import { useState, useMemo } from 'react'
import { scoringFactors, calculateScore, getScoreBand, getScoreLabel, getScoreBandColor, getScoreProgressColor, getPercentile } from '../../utils/scoringFactors'
import Card from '../shared/Card'

export default function BIKSimulator() {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  const toggleFactor = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const score = useMemo(() => calculateScore(Array.from(selectedIds)), [selectedIds])
  const band = useMemo(() => getScoreBand(score), [score])
  const label = useMemo(() => getScoreLabel(band), [band])
  const bandColor = useMemo(() => getScoreBandColor(band), [band])
  const progressColor = useMemo(() => getScoreProgressColor(band), [band])
  const percentile = useMemo(() => getPercentile(score), [score])

  const progressPercent = ((score - 200) / 600) * 100

  const selectedNegativeFactors = scoringFactors.filter(
    f => f.impact < 0 && selectedIds.has(f.id)
  )

  const positiveCount = scoringFactors.filter(f => f.impact > 0 && selectedIds.has(f.id)).length
  const negativeCount = scoringFactors.filter(f => f.impact < 0 && selectedIds.has(f.id)).length

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Factors list - 3/5 width */}
        <div className="lg:col-span-3 space-y-3">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Zaznacz czynniki, które Cię dotyczą:
          </h2>
          {scoringFactors.map(factor => (
            <label
              key={factor.id}
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                selectedIds.has(factor.id)
                  ? factor.impact > 0
                    ? 'border-green-300 bg-green-50/50'
                    : 'border-red-300 bg-red-50/50'
                  : 'border-border bg-card hover:border-border'
              }`}
            >
              <button
                role="switch"
                aria-checked={selectedIds.has(factor.id)}
                aria-label={factor.name}
                onClick={() => toggleFactor(factor.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 mt-0.5 ${
                  selectedIds.has(factor.id) ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-card transition-transform ${
                    selectedIds.has(factor.id) ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-foreground text-sm">{factor.name}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                      factor.impact > 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {factor.impact > 0 ? `+${factor.impact}` : factor.impact} pkt
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{factor.description}</p>
                {factor.tip && selectedIds.has(factor.id) && factor.impact < 0 && (
                  <p className="text-xs text-primary mt-1">
                    {factor.tip}
                  </p>
                )}
              </div>
            </label>
          ))}
        </div>

        {/* Score display - 2/5 width */}
        <div className="lg:col-span-2 lg:sticky lg:top-24 space-y-4">
          <Card>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">
                {positiveCount + negativeCount > 0
                  ? `Twój wynik BIK:`
                  : 'Wynik bazowy BIK:'}
              </p>
              <p
                className="text-5xl font-bold text-foreground tabular-nums transition-all duration-300"
                data-testid="score-display"
              >
                {score}
              </p>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>200</span>
                  <span>800</span>
                </div>
              </div>

              <span
                data-testid="score-band"
                className={`inline-block mt-4 px-4 py-1.5 rounded-full text-sm font-bold border ${bandColor}`}
              >
                {label}
              </span>

              <p className="mt-3 text-sm text-muted-foreground">
                Twój wynik jest wyższy niż <strong>{percentile}%</strong> wnioskodawców.
              </p>
            </div>
          </Card>

          {/* Tips section */}
          {selectedNegativeFactors.length > 0 && (
            <Card>
              <h3 className="font-semibold text-foreground mb-2 text-sm">
                Wskazówki jak poprawić swój scoring:
              </h3>
              <ul className="space-y-2">
                {selectedNegativeFactors.map(f => (
                  <li key={f.id} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary flex-shrink-0 mt-0.5">•</span>
                    <span>{f.tip}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {selectedNegativeFactors.length === 0 && score >= 500 && (
            <Card>
              <p className="text-sm text-green-600 text-center">
                Brak negatywnych czynników — świetnie! Twój scoring jest na dobrej drodze.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
