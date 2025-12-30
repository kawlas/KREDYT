import PaymentComparison from '../components/calculators/PaymentComparison'

interface PaymentComparisonPageProps {
  loanAmount: number
  annualRate: number
  loanTermYears: number
}

export default function PaymentComparisonPage({ 
  loanAmount, 
  annualRate, 
  loanTermYears 
}: PaymentComparisonPageProps) {
  return (
    <PaymentComparison
      loanAmount={loanAmount}
      annualRate={annualRate}
      loanTermYears={loanTermYears}
    />
  )
}
