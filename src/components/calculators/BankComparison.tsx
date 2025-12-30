import { useState, useMemo } from 'react'
import { POLISH_BANKS } from '../../data/banks'
import {
  compareAllBanks,
  sortComparisonResults,
  filterBanks,
  type BankComparisonResult
} from '../../utils/bankComparison'
import { formatCurrency, formatCurrencyShort, formatPercent } from '../../utils/formatters'
import Card from '../shared/Card'

interface BankComparisonProps {
  loanAmount: number
  loanTermYears: number
  wibor: number
  paymentType: 'equal' | 'declining'
}

export default function BankComparison({
  loanAmount,
  loanTermYears,
  wibor,
  paymentType
}: BankComparisonProps) {
  const [sortBy, setSortBy] = useState<'monthlyPayment' | 'totalCost' | 'margin' | 'name'>('totalCost')
  const [showNoCommissionOnly, setShowNoCommissionOnly] = useState(false)

  // Filter banks
  const filteredBanks = useMemo(() => {
    return filterBanks(POLISH_BANKS, {
      noCommission: showNoCommissionOnly
    })
  }, [showNoCommissionOnly])

  // Calculate comparison
  const comparisonResults = useMemo(() => {
    const results = compareAllBanks(filteredBanks, {
      loanAmount,
      loanTermYears,
      wibor,
      paymentType
    })
    return sortComparisonResults(results, sortBy)
  }, [filteredBanks, loanAmount, loanTermYears, wibor, paymentType, sortBy])

  const bestOffer = comparisonResults.find(r => r.isBestOffer)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🏦 Porównanie ofert banków
        </h2>
        <p className="text-gray-600">
          Dla kredytu {formatCurrencyShort(loanAmount)} na {loanTermYears} lat
        </p>
        <div className="inline-block bg-blue-50 text-blue-700 px-6 py-3 rounded-lg text-lg font-bold mt-3">
          WIBOR {formatPercent(wibor)} + marża banku
        </div>
      </div>

      {/* Best offer highlight */}
      {bestOffer && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🏆</div>
            <div className="flex-1">
              <div className="text-sm text-green-700 font-semibold mb-1">NAJLEPSZA OFERTA</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {bestOffer.bank.name}
              </div>
              <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
                <div>
                  <span className="text-gray-600">Rata: </span>
                  <span className="font-semibold">{formatCurrencyShort(bestOffer.monthlyPayment)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Całkowity koszt: </span>
                  <span className="font-semibold">{formatCurrencyShort(bestOffer.totalCost)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Marża: </span>
                  <span className="font-semibold">{formatPercent(bestOffer.bank.margin)}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-50 p-4 rounded-lg">
        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Sortuj po:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="totalCost">Całkowity koszt</option>
            <option value="monthlyPayment">Rata miesięczna</option>
            <option value="margin">Marża</option>
            <option value="name">Nazwa banku</option>
          </select>
        </div>

        {/* Filter */}
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={showNoCommissionOnly}
            onChange={(e) => setShowNoCommissionOnly(e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">Tylko bez prowizji</span>
        </label>
      </div>

      {/* Comparison Table/Cards */}
      <div className="space-y-3">
        {comparisonResults.map((result) => (
          <BankOfferCard key={result.bank.id} result={result} />
        ))}
      </div>

      {comparisonResults.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-600">Brak banków spełniających kryteria</p>
        </div>
      )}

      {/* Info */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="text-sm text-gray-700 space-y-2">
          <p className="font-semibold text-blue-900">ℹ️ Informacje:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li className="font-semibold text-red-600">UWAGA: Dane orientacyjne, aktualizowane ręcznie.</li>
            <li>Marże i prowizje są orientacyjne (stan na grudzień 2025)</li>
            <li>Rzeczywiste warunki mogą się różnić w zależności od Twojej zdolności kredytowej</li>
            <li>Przed podjęciem decyzji skonsultuj się z doradcą bankowym</li>
            <li>Całkowity koszt uwzględnia prowizję i odsetki</li>
            <li>Ostatnia aktualizacja: 30.12.2025</li>
            <li>Źródło: Strony internetowe banków + porównywarki</li>
          </ul>
        </div>
      </Card>
    </div>
  )
}

// Helper component for individual bank card
function BankOfferCard({ result }: { result: BankComparisonResult }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className={result.isBestOffer ? 'border-2 border-green-500' : ''}>
      <div className="flex flex-col md:flex-row items-start gap-4">
        {/* Bank info */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0"
              style={{ backgroundColor: result.bank.color }}
            >
              {result.bank.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                {result.bank.name}
                {result.isBestOffer && <span className="text-green-600 text-sm">🏆 NAJLEPSZA</span>}
              </h3>
              <p className="text-sm text-gray-600">{result.bank.fullName}</p>
            </div>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
            <div>
              <div className="text-xs text-gray-600">Rata miesięczna</div>
              <div className="text-lg font-bold text-blue-600">
                {formatCurrencyShort(result.monthlyPayment)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Całkowity koszt</div>
              <div className="text-lg font-bold">
                {formatCurrencyShort(result.totalCost)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Marża</div>
              <div className="text-lg font-bold">
                {formatPercent(result.bank.margin)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Prowizja</div>
              <div className="text-lg font-bold">
                {result.bank.commission === 0 ? (
                  <span className="text-green-600">Brak</span>
                ) : (
                  <span>{formatPercent(result.bank.commission)}</span>
                )}
              </div>
            </div>
          </div>

          {/* Expandable details */}
          {expanded && (
            <div className="mt-4 pt-4 border-t space-y-3 animate-in fade-in duration-300">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Prowizja:</div>
                  <div className="text-sm text-gray-600">
                    {result.commissionAmount > 0
                      ? `${formatCurrency(result.commissionAmount)} (${formatPercent(result.bank.commission)})`
                      : 'Brak prowizji'}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Ubezpieczenie:</div>
                  <div className="text-sm text-gray-600">
                    {result.bank.insurance.required ? '⚠️ Wymagane' : '✓ Opcjonalne'}
                    {result.bank.insurance.description && ` - ${result.bank.insurance.description}`}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-1">Zalety:</div>
                <ul className="text-sm text-gray-600 list-disc list-inside grid md:grid-cols-2 gap-x-4">
                  {result.bank.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              {result.bank.website && (
                <a
                  href={result.bank.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline mt-2 transition-colors"
                >
                  🌐 Odwiedź stronę banku →
                </a>
              )}
            </div>
          )}

          {/* Toggle button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline mt-2 font-medium transition-colors"
          >
            {expanded ? '▲ Ukryj szczegóły' : '▼ Pokaż szczegóły'}
          </button>
        </div>
      </div>
    </Card>
  )
}
