import { comparePaymentTypes, type PaymentTypeComparison } from '../../utils/paymentComparison'
import { formatCurrency, formatCurrencyShort } from '../../utils/formatters'
import Card from '../shared/Card'
import Alert from '../shared/Alert'

import TabContainer from '../layout/TabContainer'

interface PaymentComparisonProps {
  loanAmount: number
  annualRate: number
  loanTermYears: number
}

export default function PaymentComparison({
  loanAmount,
  annualRate,
  loanTermYears
}: PaymentComparisonProps) {
  const comparison = comparePaymentTypes(loanAmount, annualRate, loanTermYears)
  const { equal, decreasing, recommendation } = comparison

  return (
    <TabContainer
      title="Porównanie typów rat"
      subtitle="Raty równe vs malejące"
      contextInfo={`Dla wybranej kalkulacji: ${formatCurrencyShort(loanAmount)} na ${loanTermYears} lat`}
    >
      <div className="space-y-6">
        {/* Side by side comparison cards */}
        <div className="comparison-card-wrapper">
          <ComparisonCard data={equal} isRecommended={false} />
          <ComparisonCard 
            data={decreasing} 
            isRecommended={decreasing.totalSavings > 5000}
          />
        </div>

        {/* TWO COLUMN LAYOUT - NEW */}
        <div className="two-column-layout">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Którą ratę wybrać - MOVED TO TOP */}
            <Card>
              <h3 className="section-title">🤔 Którą ratę wybrać?</h3>
              <div className="space-y-3">
                <div className="card-success">
                  <div className="font-semibold text-green-900 mb-2">✅ Raty równe gdy:</div>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Chcesz stabilnej raty</li>
                    <li>Budżet napięty na początku</li>
                    <li>Planujesz wcześniejszą spłatę</li>
                  </ul>
                </div>
                <div className="card-info">
                  <div className="font-semibold text-blue-900 mb-2">✅ Raty malejące gdy:</div>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Stać Cię na wyższą ratę początkowo</li>
                    <li>Chcesz maksymalnych oszczędności</li>
                    <li>Dochody rosną w czasie</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Rekomendacja */}
            <Alert type={decreasing.totalSavings > 5000 ? 'success' : 'info'} icon="💡">
              <div className="font-semibold mb-1">Rekomendacja:</div>
              <div className="text-sm">{recommendation}</div>
              {decreasing.firstPayment > equal.firstPayment * 1.15 && (
                <div className="text-sm mt-2 opacity-90">
                  ⚠️ Upewnij się, że stać Cię na pierwszą ratę ({formatCurrencyShort(decreasing.firstPayment)})
                </div>
              )}
            </Alert>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Jak zmieniają się raty - KEPT FIRST */}
            <div className="card-info">
              <h3 className="section-title">📉 Jak zmieniają się raty?</h3>
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-gray-900 mb-1">Raty równe</div>
                  <div className="text-lg font-semibold">
                    {formatCurrencyShort(equal.firstPayment)} → {formatCurrencyShort(equal.lastPayment)}
                  </div>
                  <div className="text-sm text-gray-600">Stała przez cały okres</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900 mb-1">Raty malejące</div>
                  <div className="text-lg font-semibold">
                    {formatCurrencyShort(decreasing.firstPayment)} → {formatCurrencyShort(decreasing.lastPayment)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Maleje o ~{formatCurrencyShort((decreasing.firstPayment - decreasing.lastPayment) / loanTermYears)}/rok
                  </div>
                </div>
              </div>
            </div>

            {/* Kluczowe różnice - MOVED HERE */}
            <Card>
              <h3 className="section-title">🔍 Kluczowe różnice</h3>
              <div className="space-y-4">
                {/* First payment difference */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900 mb-1">Pierwsza rata</div>
                  <div className="text-sm text-gray-600 mb-2">
                    Malejące wyższe o {formatCurrency(Math.abs(decreasing.monthlyDifference))}
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <div className="text-gray-600">Równe</div>
                      <div className="font-semibold">{formatCurrencyShort(equal.firstPayment)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-600">Malejące</div>
                      <div className="font-semibold text-orange-600">
                        {formatCurrencyShort(decreasing.firstPayment)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total savings */}
                <div className="card-success">
                  <div className="font-medium text-gray-900 mb-1">💰 Oszczędność</div>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrencyShort(decreasing.totalSavings)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
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
        isRecommended ? 'border-green-500 bg-gradient-to-br from-green-50 to-white' : 'border-gray-200'
      }`}
    >
      {isRecommended && (
        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          ⭐ LEPSZY WYBÓR
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-4">{data.typeName}</h3>
      
      <div className="space-y-3">
        {/* First payment */}
        <div>
          <div className="text-sm text-gray-600">Pierwsza rata</div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(data.firstPayment)}
          </div>
        </div>

        {/* Last payment (if different) */}
        {data.firstPayment !== data.lastPayment && (
          <div>
            <div className="text-sm text-gray-600">Ostatnia rata</div>
            <div className="text-lg font-semibold text-gray-700">
              {formatCurrency(data.lastPayment)}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t pt-3 mt-3">
          {/* Total interest */}
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Suma odsetek</span>
            <span className="font-semibold">{formatCurrencyShort(data.totalInterest)}</span>
          </div>

          {/* Total cost */}
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">Całkowity koszt</span>
            <span className="text-lg font-bold">
              {formatCurrencyShort(data.totalCost)}
            </span>
          </div>
        </div>

        {/* Savings indicator (for decreasing) */}
        {data.type === 'decreasing' && data.totalSavings > 0 && (
          <div className="bg-green-100 text-green-800 p-2 rounded text-sm text-center font-medium">
            💰 Oszczędzasz {formatCurrencyShort(data.totalSavings)}
          </div>
        )}
      </div>
    </Card>
  )
}
