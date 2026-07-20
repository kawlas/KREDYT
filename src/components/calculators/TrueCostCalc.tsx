import { useState, useMemo } from 'react'
import { formatCurrency } from '../../utils/formatters'
import Card from '../shared/Card'

interface TrueCostCalcProps {
  monthlyInstallment: number
}

type PropertyType = 'apartment' | 'house'
type PropertyAge = 'new' | 'old'
type LocationType = 'metro' | 'city' | 'small_town'

export default function TrueCostCalc({ monthlyInstallment }: TrueCostCalcProps) {
  const [propertyValue, setPropertyValue] = useState<number>(500000)
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment')
  const [propertyAge, setPropertyAge] = useState<PropertyAge>('new')
  const [locationType, setLocationType] = useState<LocationType>('city')

  const maintenanceCosts = useMemo(() => {
    let baseRate = 0.015 // 1.5% base

    // Adjust by property type
    if (propertyType === 'house') baseRate += 0.005 // Houses are more expensive to maintain
    
    // Adjust by age
    if (propertyAge === 'old') baseRate += 0.005 // Old properties have more maintenance
    
    // Adjust by location
    if (locationType === 'metro') baseRate += 0.002 // Metro area has higher costs (taxes, etc.)
    if (locationType === 'small_town') baseRate -= 0.002 // Small town is cheaper

    return baseRate
  }, [propertyType, propertyAge, locationType])

  const annualMaintenance = propertyValue * maintenanceCosts
  const monthlyMaintenance = annualMaintenance / 12
  const totalMonthlyCost = monthlyInstallment + monthlyMaintenance

  // Simple rent comparison logic
  // Rent is roughly 3-5% of property value per year
  const estimatedMonthlyRent = (propertyValue * 0.04) / 12

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Kalkulator kosztów utrzymania nieruchomości</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Inputs Section */}
        <Card>
          <h3 className="text-lg font-semibold text-foreground mb-6">Parametry nieruchomości</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Wartość nieruchomości (PLN)</label>
              <input
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Typ nieruchomości</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPropertyType('apartment')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    propertyType === 'apartment' ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  Mieszkanie
                </button>
                <button
                  onClick={() => setPropertyType('house')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    propertyType === 'house' ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  Dom
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Stan nieruchomości</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPropertyAge('new')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    propertyAge === 'new' ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  Nowe
                </button>
                <button
                  onClick={() => setPropertyAge('old')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    propertyAge === 'old' ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  Starsze
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Lokalizacja</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setLocationType('metro')}
                  className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                    locationType === 'metro' ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  Metropolia
                </button>
                <button
                  onClick={() => setLocationType('city')}
                  className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                    locationType === 'city' ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  Miasto
                </button>
                <button
                  onClick={() => setLocationType('small_town')}
                  className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                    locationType === 'small_town' ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  Małe miasto
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-6 md:sticky md:top-8">
          <Card className="bg-primary/10 border-primary/30">
            <h3 className="text-lg font-semibold text-primary mb-4">Miesięczny koszt utrzymania</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-primary">Media, remonty, podatki</span>
                <span className="text-2xl font-bold text-primary">{formatCurrency(monthlyMaintenance)}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-primary/30">
                <span className="text-primary font-medium">Rata kredytu</span>
                <span className="text-xl font-semibold text-primary">{formatCurrency(monthlyInstallment)}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-primary/30">
                <span className="text-primary font-bold">RAZEM CO MIESIĄC:</span>
                <span className="text-2xl font-black text-primary">{formatCurrency(totalMonthlyCost)}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-foreground mb-4">Kupno vs Wynajem</h3>
            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">Szacowany czynsz najmu</span>
                  <span className="font-semibold">{formatCurrency(estimatedMonthlyRent)}</span>
                </div>
                <p className="text-xs text-muted-foreground italic">Przy założeniu 4% rocznego kosztu najmu</p>
              </div>

              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {totalMonthlyCost < estimatedMonthlyRent
                    ? 'W Twoim przypadku posiadanie nieruchomości może być tańsze niż wynajem.'
                    : 'W Twoim przypadku wynajem może być tańszy niż posiadanie na kredyt.'}
                </p>
                <div className={`text-lg font-bold ${totalMonthlyCost < estimatedMonthlyRent ? 'text-green-600' : 'text-orange-600'}`}>
                  Różnica: {formatCurrency(Math.abs(totalMonthlyCost - estimatedMonthlyRent))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
