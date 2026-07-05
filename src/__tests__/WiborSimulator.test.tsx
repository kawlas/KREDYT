import { describe, test, expect } from 'vitest';
import {
  calculateNewMonthlyPayment,
  getRiskZone,
} from '../utils/loanCalculations';

// Testy dla funkcji calculateNewMonthlyPayment
describe('calculateNewMonthlyPayment', () => {
  test('should return correct new monthly payment when WIBOR increases', () => {
    const result = calculateNewMonthlyPayment(5, 2, 500000, 360);
    expect(result).toBeCloseTo(3326.51, 2);
  });

  test('should return correct new monthly payment when WIBOR decreases', () => {
    const result = calculateNewMonthlyPayment(5, -1, 500000, 360);
    expect(result).toBeCloseTo(2387.08, 2);
  });

  test('should return original payment when WIBOR change is 0', () => {
    const result = calculateNewMonthlyPayment(5, 0, 500000, 360);
    expect(result).toBeCloseTo(2684.11, 2);
  });
});

// Testy dla funkcji getRiskZone
describe('getRiskZone', () => {
  test('should return "safe" when increase is ≤10%', () => {
    const result = getRiskZone(5000, 5200);
    expect(result).toBe('safe');
  });

  test('should return "warning" when increase is between 10% and 20%', () => {
    const result = getRiskZone(5000, 5750);
    expect(result).toBe('warning');
  });

  test('should return "danger" when increase is >20%', () => {
    const result = getRiskZone(5000, 6100);
    expect(result).toBe('danger');
  });
});

// Testy dla komponentu WiborSimulator
import { render, fireEvent } from '@testing-library/react';
import WiborSimulator from '../components/calculators/WiborSimulator';

describe('WiborSimulator Component', () => {
  test('should render with default values', () => {
    const { getByText } = render(
      <WiborSimulator
        loanAmount={350000}
        loanTermYears={25}
        margin={2}
        baseWibor={5.75}
        installmentType="equal"
      />
    );
    expect(getByText('Przetestuj scenariusze')).toBeInTheDocument();
    expect(getByText('Wynik symulacji')).toBeInTheDocument();
    expect(getByText(/Aktualna rata:/)).toBeInTheDocument();
    expect(getByText(/Nowa rata:/)).toBeInTheDocument();
  });

  test('should update UI when slider changes', () => {
    const { getByRole, getByText } = render(
      <WiborSimulator
        loanAmount={350000}
        loanTermYears={25}
        margin={2}
        baseWibor={5.75}
        installmentType="equal"
      />
    );
    const slider = getByRole('slider');
    fireEvent.change(slider, { target: { value: '0.02' } }); // +2 p.p.
    expect(getByText(/Strefa ryzyka:/)).toBeInTheDocument();
  });

  test('should display risk zone labels', () => {
    const { getAllByText, getByText } = render(
      <WiborSimulator
        loanAmount={350000}
        loanTermYears={25}
        margin={2}
        baseWibor={5.75}
        installmentType="equal"
      />
    );
    // "Bezpieczna" appears twice (result + legend), use getAllByText
    expect(getAllByText(/Bezpieczna/).length).toBeGreaterThanOrEqual(1);
    expect(getByText(/Ostrzeżenie/)).toBeInTheDocument();
    expect(getByText(/Niebezpieczna/)).toBeInTheDocument();
  });
});