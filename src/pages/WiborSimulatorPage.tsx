import WiborSimulator from '../components/calculators/WiborSimulator'

interface WiborSimulatorPageProps {
  loanAmount: number
  loanTermYears: number
  margin: number
  baseWibor: number
  installmentType: 'equal' | 'declining'
}

export default function WiborSimulatorPage({
  loanAmount,
  loanTermYears,
  margin,
  baseWibor,
  installmentType
}: WiborSimulatorPageProps) {
  return (
    <WiborSimulator
      loanAmount={loanAmount}
      loanTermYears={loanTermYears}
      margin={margin}
      baseWibor={baseWibor}
      installmentType={installmentType}
    />
  )
}
