import { useMemo, useState, useEffect } from 'react'
import { compareBanks } from '../../utils/bankComparison'
import { BANK_PROFILES } from '../../data/bankProfiles'
import { formatCurrency, formatCurrencyShort, formatPercent } from '../../utils/formatters'
import Card from '../shared/Card'
import Alert from '../shared/Alert'
import TabContainer from '../layout/TabContainer'
import { useWIBOR } from '../../hooks/useWIBOR'
import BankComparisonChart from './BankComparisonChart'
import { prepareChartData, sortOffers, type SortKey, type SortDirection } from '../../utils/bankComparisonEnhanced'

interface OffersMeta {
  updated: string
  source: string
  sourceUrl: string
  disclaimer: string
}

export default function BankComparisonCalc() {
  const { wibor: liveWibor } = useWIBOR(true)
  const [principal, setPrincipal] = useState(400000)
  const [offersMeta, setOffersMeta] = useState<OffersMeta | null>(null)

  useEffect(() => {
    fetch('/bank-offers.json')
      .then(r => r.json())
      .then(data => setOffersMeta({
        updated: data.updated,
        source: data.source,
        sourceUrl: data.sourceUrl,
        disclaimer: data.disclaimer,
      }))
      .catch(() => {}) // Silently use static data
  }, [])
  const [years, setYears] = useState(25)
  const [wibor, setWibor] = useState(5.85)
  const [installmentType, setInstallmentType] = useState<'equal' | 'declining'>('equal')
  const [propertyValue, setPropertyValue] = useState(500000)
  const [sortKey] = useState<SortKey>('totalCost')
  const [sortDir] = useState<SortDirection>('asc')

  const effectiveWibor = liveWibor ?? wibor

  const results = useMemo(() => {
    if (principal <= 0 || years <= 0) return []
    const offers = compareBanks(BANK_PROFILES, {
      principal,
      years,
      wibor: effectiveWibor,
      installmentType,
      propertyValue,
    })
    return sortOffers(offers, sortKey, sortDir)
  }, [principal, years, effectiveWibor, installmentType, propertyValue, sortKey, sortDir])

  const chartData = useMemo(() => prepareChartData(results.slice(0, 8)), [results])

  const cheapest = results.length > 0 ? results[0] : null

  return (
    <TabContainer
      title="Porównanie ofert banków"
      subtitle="Który bank oferuje najtańszy kredyt hipoteczny?"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Parametry</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">Kwota</label>
                <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))}
                  className="w-full px-2 py-1.5 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">Okres (lat)</label>
                <input type="number" value={years} onChange={e => setYears(Number(e.target.value))}
                  className="w-full px-2 py-1.5 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">WIBOR (%)</label>
                <input type="number" step="0.01" value={effectiveWibor} onChange={e => setWibor(Number(e.target.value))}
                  className="w-full px-2 py-1.5 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">Wartość nieruchomości</label>
                <input type="number" value={propertyValue} onChange={e => setPropertyValue(Number(e.target.value))}
                  className="w-full px-2 py-1.5 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">Rodzaj rat</label>
                <select value={installmentType} onChange={e => setInstallmentType(e.target.value as 'equal' | 'declining')}
                  className="w-full px-2 py-1.5 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="equal">Równe</option>
                  <option value="declining">Malejące</option>
                </select>
              </div>
            </div>
          </Card>

          {offersMeta && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${Date.now() - new Date(offersMeta.updated).getTime() < 14 * 86400000 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <span className="text-xs text-gray-600">
                  Aktualizacja: <strong>{new Date(offersMeta.updated).toLocaleDateString('pl-PL')}</strong>
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Źródło: <a href={offersMeta.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{offersMeta.source}</a>
              </p>
              <p className="text-[11px] text-gray-400 leading-relaxed">{offersMeta.disclaimer}</p>
            </div>
          )}

          <Alert type="warning">
            <p className="text-xs">
              Marże są wartościami orientacyjnymi. Rzeczywista oferta zależy od indywidualnej oceny zdolności kredytowej, LTV i negocjacji z bankiem. Przed podjęciem decyzji zweryfikuj aktualne stawki bezpośrednio w banku lub u doradcy finansowego.
            </p>
          </Alert>
        </div>

        {/* Results table */}
        <div className="lg:col-span-3 space-y-4">
          {cheapest && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <span className="text-sm font-semibold text-green-700">
                Najtańsza oferta: {cheapest.bank.name} — rata {formatCurrency(cheapest.results.monthlyPayment)}/mies.
                (RRSO {formatPercent(cheapest.results.rrso)})
              </span>
            </div>
          )}

          {results.length > 0 && (
            <BankComparisonChart data={chartData} />
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white rounded-xl shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bank</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Marża</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">RRSO</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Rata</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Pełny koszt</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">KNF +2.5pp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {results.map((offer, i) => (
                  <tr key={offer.bank.id} className={`${i === 0 ? 'bg-green-50/50' : ''} hover:bg-gray-50 transition-colors`}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {i === 0 && <span className="text-green-600 mr-1">★</span>}
                      {offer.bank.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">{formatPercent(offer.margin)}</td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-blue-600">
                      {formatPercent(offer.results.rrso)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-semibold">
                      {formatCurrency(offer.results.monthlyPayment)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-bold text-red-600">
                      {formatCurrencyShort(offer.results.allInCost!)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-500">
                      {formatCurrency(offer.knfBufferMonthlyPayment)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Alert type="info">
            <p className="text-sm">
              <strong>KNF +2.5pp:</strong> Zgodnie z Rekomendacją S KNF, banki muszą doliczyć 2.5 p.p. do oprocentowania
              przy ocenie zdolności kredytowej. Kolumna pokazuje ratę przy takim stres teście — jeśli jest wyższa niż
              Twoja maksymalna zdolność, bank może odmówić kredytu.
            </p>
          </Alert>
        </div>
      </div>
    </TabContainer>
  )
}
