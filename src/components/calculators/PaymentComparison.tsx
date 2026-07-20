import { useMemo, useState } from 'react'
import { comparePaymentTypes, type PaymentTypeComparison } from '../../utils/paymentComparison'
import { formatCurrency, formatCurrencyShort } from '../../utils/formatters'
import Card from '../shared/Card'
import Alert from '../shared/Alert'
import DataSourceBanner from '../shared/DataSourceBanner'

import TabContainer from '../layout/TabContainer'

interface PaymentComparisonProps {
  loanAmount?: number
  annualRate?: number
  loanTermYears?: number
  source?: 'calculator' | 'none'
  onSourceApply?: (values: { loanAmount: number; annualRate: number; loanTermYears: number }) => void
  wibor?: number
  margin?: number
}

export default function PaymentComparison({
  loanAmount,
  annualRate,
  loanTermYears,
  source,
  onSourceApply,
  wibor,
  margin
}: PaymentComparisonProps) {
  const [localValues, setLocalValues] = useState<{ loanAmount: number; annualRate: number; loanTermYears: number } | null>(null)

  const effectiveLoanAmount = localValues?.loanAmount ?? loanAmount ?? 400000
  const effectiveAnnualRate = localValues?.annualRate ?? annualRate ?? 7
  const effectiveLoanTermYears = localValues?.loanTermYears ?? loanTermYears ?? 25

  const comparison = useMemo(
    () => comparePaymentTypes(effectiveLoanAmount, effectiveAnnualRate, effectiveLoanTermYears),
    [effectiveLoanAmount, effectiveAnnualRate, effectiveLoanTermYears]
  )
  const { equal, decreasing, recommendation } = comparison

  const handleSourceApply = (values: { loanAmount: number; annualRate: number; loanTermYears: number }) => {
    setLocalValues(values)
    onSourceApply?.(values)
  }

  return (
    <TabContainer
      title="Porównanie typów rat"
      subtitle="Raty równe vs malejące"
    >
      <div className="space-y-6">
        <DataSourceBanner
          source={source ?? 'none'}
          values={{
            loanAmount: effectiveLoanAmount,
            annualRate: effectiveAnnualRate,
            loanTermYears: effectiveLoanTermYears,
            wibor,
            margin,
          }}
          onApply={handleSourceApply}
        />
        {/* Side by side comparison cards */}
        <div className="two-column-layout">
          <ComparisonCard data={equal} isRecommended={false} />
          <ComparisonCard 
            data={decreasing} 
            isRecommended={decreasing.totalSavings > 5000}
          />
        </div>

        {/* TWO COLUMN LAYOUT - NEW */}
        <div className="two-column-layout items-start">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Którą ratę wybrać - MOVED TO TOP */}
            <Card>
              <h3 className="text-lg font-semibold text-foreground mb-4">Którą ratę wybrać?</h3>
              <div className="space-y-3">
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                  <div className="font-semibold text-primary mb-2">Raty równe gdy:</div>
                  <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
                    <li>Chcesz stabilnej raty</li>
                    <li>Budżet napięty na początku</li>
                    <li>Planujesz wcześniejszą spłatę</li>
                  </ul>
                </div>
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                  <div className="font-semibold text-primary mb-2">Raty malejące gdy:</div>
                  <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
                    <li>Stać Cię na wyższą ratę początkowo</li>
                    <li>Chcesz maksymalnych oszczędności</li>
                    <li>Dochody rosną w czasie</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Rekomendacja */}
            <Alert type={decreasing.totalSavings > 5000 ? 'success' : 'info'}>
              <div className="font-semibold mb-1">Rekomendacja:</div>
              <div className="text-sm">{recommendation}</div>
              {decreasing.firstPayment > equal.firstPayment * 1.15 && (
                <div className="text-sm mt-2 opacity-90">
                  Upewnij się, że stać Cię na pierwszą ratę ({formatCurrencyShort(decreasing.firstPayment)})
                </div>
              )}
            </Alert>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Jak zmieniają się raty - KEPT FIRST */}
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 bg-primary/10">Jak zmieniają się raty?</h3>
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-foreground mb-1">Raty równe</div>
                  <div className="text-lg font-semibold">
                    {formatCurrencyShort(equal.firstPayment)} → {formatCurrencyShort(equal.lastPayment)}
                  </div>
                  <div className="text-sm text-muted-foreground">Stała przez cały okres</div>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-1">Raty malejące</div>
                  <div className="text-lg font-semibold">
                    {formatCurrencyShort(decreasing.firstPayment)} → {formatCurrencyShort(decreasing.lastPayment)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Maleje o ~{formatCurrencyShort((decreasing.firstPayment - decreasing.lastPayment) / effectiveLoanTermYears)}/rok
                  </div>
                </div>
              </div>
            </div>

            {/* Kluczowe różnice - MOVED HERE */}
            <Card>
              <h3 className="text-lg font-semibold text-foreground mb-4">Kluczowe różnice</h3>
              <div className="space-y-4">
                {/* First payment difference */}
                <div className="p-3 bg-secondary rounded-lg">
                  <div className="font-medium text-foreground mb-1">Pierwsza rata</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Malejące wyższe o {formatCurrency(Math.abs(decreasing.monthlyDifference))}
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <div className="text-muted-foreground">Równe</div>
                      <div className="font-semibold">{formatCurrencyShort(equal.firstPayment)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-muted-foreground">Malejące</div>
                      <div className="font-semibold text-orange-600">
                        {formatCurrencyShort(decreasing.firstPayment)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total savings */}
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                  <div className="font-medium text-foreground mb-1">Oszczędność</div>
                  <div className="text-2xl font-bold text-primary">
                    {formatCurrencyShort(decreasing.totalSavings)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Malejące płacą mniej odsetek ({((decreasing.totalSavings / equal.totalCost) * 100).toFixed(1)}% taniej)
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </TabContainer>
  )
}

// Helper component for comparison cards
function ComparisonCard({
  data,
  isRecommended
}: {
  data: PaymentTypeComparison
  isRecommended: boolean
}) {
  return (
    <Card 
      className={`relative border-2 ${
        isRecommended ? 'border-primary bg-gradient-to-br from-blue-50 to-white' : 'border-border'
      }`}
    >
      {isRecommended && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          LEPSZY WYBÓR
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-4">{data.typeName}</h3>
      
      <div className="space-y-3">
        {/* First payment */}
        <div>
          <div className="text-sm text-muted-foreground">Pierwsza rata</div>
          <div className="text-2xl font-bold text-foreground">
            {formatCurrency(data.firstPayment)}
          </div>
        </div>

        {/* Last payment (if different) */}
        {data.firstPayment !== data.lastPayment && (
          <div>
            <div className="text-sm text-muted-foreground">Ostatnia rata</div>
            <div className="text-lg font-semibold text-foreground">
              {formatCurrency(data.lastPayment)}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t pt-3 mt-3">
          {/* Total interest */}
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Suma odsetek</span>
            <span className="font-semibold">{formatCurrencyShort(data.totalInterest)}</span>
          </div>

          {/* Total cost */}
          <div className="flex justify-between">
            <span className="text-foreground font-medium">Całkowity koszt</span>
            <span className="text-lg font-bold">
              {formatCurrencyShort(data.totalCost)}
            </span>
          </div>
        </div>

        {/* Savings indicator (for decreasing) */}
        {data.type === 'declining' && data.totalSavings > 0 && (
          <div className="bg-primary/10 text-primary p-2 rounded text-sm text-center font-medium">
            Oszczędzasz {formatCurrencyShort(data.totalSavings)}
          </div>
        )}
      </div>
    </Card>
  )
}
