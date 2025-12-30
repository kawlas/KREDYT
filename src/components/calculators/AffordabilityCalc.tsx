import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import type { AffordabilityFormData } from '../../types'
import { calculateAffordability } from '../../utils/affordabilityFormulas'
import { formatCurrency, formatMonths } from '../../utils/formatters'
import Card from '../shared/Card'
import Alert from '../shared/Alert'
import { LOAN_CONSTANTS } from '../../types/constants'

export const AffordabilityCalc: React.FC = () => {
  const { register, watch } = useForm<AffordabilityFormData>({
    defaultValues: {
      income: 10000,
      employmentType: 'UOP',
      obligations: 0,
      dependents: 0,
      age: 30,
      wibor: LOAN_CONSTANTS.AFFORDABILITY.MAX_DSTI * 10, // Just a placeholder, will use real values
      margin: 2.0
    }
  })

  // Watch for changes to trigger real-time calc
  const values = watch()
  
  // Actually wibor/margin should come from a central place, but for now we let user adjust or use defaults
  // In a real app we might fetch these or use common defaults
  const affordabilityResults = useMemo(() => {
    return calculateAffordability({
      ...values,
      wibor: 5.85, // Default for now
      margin: values.margin || 2.0
    })
  }, [values])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Form Section */}
      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Dane finansowe</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dochód netto (miesięcznie)
              </label>
              <div className="relative">
                <input
                  type="number"
                  {...register('income', { valueAsNumber: true })}
                  className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <span className="absolute right-3 top-2 text-gray-400">PLN</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Forma zatrudnienia
              </label>
              <select
                {...register('employmentType')}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="UOP">Umowa o pracę (UoP)</option>
                <option value="B2B">B2B / Samozatrudnienie</option>
                <option value="CONTRACT">Umowa zlecenie / o dzieło</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inne kredyty i karty (miesięcznie)
              </label>
              <div className="relative">
                <input
                  type="number"
                  {...register('obligations', { valueAsNumber: true })}
                  className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <span className="absolute right-3 top-2 text-gray-400">PLN</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Osoby na utrzymaniu
                </label>
                <input
                  type="number"
                  {...register('dependents', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twój wiek
                </label>
                <input
                  type="number"
                  {...register('age', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zakładana marża banku (%)
              </label>
              <input
                type="number"
                step="0.1"
                {...register('margin', { valueAsNumber: true })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Results Section */}
      <div className="space-y-6 md:sticky md:top-8">
        {/* Card 1: Available Loan */}
        <Card title="💰 Dostępny kredyt (szacunkowo)">
          <div className="bg-green-50 rounded-xl p-6 border border-green-100 mb-6">
            <p className="text-4xl font-black text-gray-900">
              {formatCurrency(affordabilityResults.maxLoanAmount)}
            </p>
            <p className="text-xs text-green-700 mt-2">
              Przy okresie {formatMonths(affordabilityResults.maxTermMonths)}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b pb-2">
              Parametry obliczeń
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Dochód korygowany:</span>
                <span className="font-bold text-gray-900">{formatCurrency(affordabilityResults.effectiveIncome)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Wolne środki na ratę:</span>
                <span className="font-bold text-gray-900">{formatCurrency(affordabilityResults.disposableIncome)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Max okres:</span>
                <span className="font-bold text-gray-900">{formatMonths(affordabilityResults.maxTermMonths)}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Card 2: Max Installment */}
        <Card title="📈 Maksymalna rata">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-6">
            <p className="text-4xl font-black text-gray-900">
              {formatCurrency(affordabilityResults.maxMonthlyPayment)}
            </p>
            <p className="text-xs text-blue-700 mt-2">
              Bezpieczny limit 50% Twojego dochodu netto
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b pb-2">
                Co to oznacza?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Możesz celować w nieruchomość o wartości ok. <strong>{formatCurrency(affordabilityResults.ltv80PropertyValue)}</strong> zakładając 20% wkładu własnego ({formatCurrency(affordabilityResults.ltv80PropertyValue * 0.2)}).
              </p>
              <Alert type="info">
                <p className="text-xs">
                  Pamiętaj, że każdy bank ma własne algorytmy i powyższe wyliczenie jest jedynie orientacyjne.
                </p>
              </Alert>
            </div>

            {affordabilityResults.alerts.length > 0 && (
              <div className="pt-6 border-t space-y-3">
                {affordabilityResults.alerts.map((alert, idx) => (
                  <Alert key={idx} type={alert.type}>
                    <p className="text-sm">{alert.message}</p>
                  </Alert>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
