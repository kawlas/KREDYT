import React from 'react'
import { act, render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { useForm, type UseFormHandleSubmit, type UseFormRegister, type UseFormReturn } from 'react-hook-form'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CalculatorPage, { getDisplayResultsInputs } from './CalculatorPage'
import { formatCurrency } from '../utils/formatters'
import { calculateMonthlyPayment } from '../utils/loanCalculations'
import type { LoanFormData } from '../types'

vi.mock('../hooks/useWIBOR', () => ({
  useWIBOR: () => ({
    wibor: 5,
    loading: false,
    error: null,
    lastUpdate: '',
    source: 'test',
    refresh: vi.fn(),
  }),
}))

const baseData: LoanFormData = {
  principal: 400000,
  years: 25,
  wibor: 5,
  margin: 2,
  installmentType: 'equal',
  propertyValue: 500000,
}

const paymentForPrincipal = (principal: number) => formatCurrency(calculateMonthlyPayment(principal, 7, 300, 'equal'))

describe('CalculatorPage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('uses debounced form values for ResultsCard inputs when auto results exist', () => {
    const input = getDisplayResultsInputs(
      {
        principal: 500000,
        years: 30,
        wibor: 5.5,
        margin: 2.25,
        propertyValue: 625000,
      },
      baseData
    )

    expect(input).toEqual({
      loanAmount: 500000,
      propertyValue: 625000,
      wibor: 5.5,
      margin: 2.25,
      loanTermYears: 30,
    })
  })

  it('keeps ResultsCard in sync with debounced auto results while the form changes', async () => {
    const formRef = { current: null as UseFormReturn<LoanFormData> | null }
    const rerenderRef = { current: null as (() => void) | null }
    const setFormValuesRef = { current: null as ((values: LoanFormData) => void) | null }

    render(
      <HelmetProvider>
        <MemoryRouter>
          <CalculatorPageHarness
            formRef={formRef}
            rerenderRef={rerenderRef}
            setFormValuesRef={setFormValuesRef}
          />
        </MemoryRouter>
      </HelmetProvider>
    )
    const form = formRef.current
    const rerender = rerenderRef.current
    const setFormValues = setFormValuesRef.current
    expect(form).not.toBeNull()
    expect(rerender).not.toBeNull()
    expect(setFormValues).not.toBeNull()
    const oldPayment = paymentForPrincipal(baseData.principal)
    const newPayment = paymentForPrincipal(500000)

    expect(await screen.findByText(oldPayment)).toBeInTheDocument()

    await act(async () => {
      form?.setValue('principal', 500000)
      setFormValues?.({ ...baseData, principal: 500000 })
      rerender?.()
    })

    expect(screen.getByText(oldPayment)).toBeInTheDocument()
    expect(screen.queryByText(newPayment)).not.toBeInTheDocument()

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    expect(await screen.findByText(newPayment)).toBeInTheDocument()
  })
})

function CalculatorPageHarness({ formRef, rerenderRef, setFormValuesRef }: {
  formRef: React.MutableRefObject<UseFormReturn<LoanFormData> | null>
  rerenderRef: React.MutableRefObject<(() => void) | null>
  setFormValuesRef: React.MutableRefObject<((values: LoanFormData) => void) | null>
}) {
  const form = useForm<LoanFormData>({ values: baseData })
  const [values, setValues] = React.useState<LoanFormData>(baseData)
  const [, setVersion] = React.useState(0)
  formRef.current = form
  setFormValuesRef.current = (nextValues) => setValues(nextValues)
  rerenderRef.current = () => setVersion((version) => version + 1)

  const register = vi.fn(() => ({
    onChange: vi.fn(),
    onBlur: vi.fn(),
    name: 'principal',
    ref: vi.fn(),
  })) as unknown as UseFormRegister<LoanFormData>
  const handleSubmit = vi.fn((onValid) => onValid(baseData)) as unknown as UseFormHandleSubmit<LoanFormData>
  const setResults = vi.fn()
  const saveOffer = vi.fn()
  const deleteOffer = vi.fn()

  return (
    <CalculatorPage
      register={register}
      handleSubmit={handleSubmit}
      trigger={form.trigger}
      onSubmit={vi.fn()}
      results={null}
      savedOffers={[]}
      isLoading={false}
      error={null}
      saveOffer={saveOffer}
      deleteOffer={deleteOffer}
      errors={{}}
      getValues={() => values}
      reset={(nextValues) => {
        form.reset(nextValues)
        setValues(nextValues)
      }}
      setResults={setResults}
      setValue={form.setValue}
      control={form.control}
    />
  )
}
