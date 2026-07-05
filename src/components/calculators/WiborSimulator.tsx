import React, { useState, useMemo } from 'react';
import { calculateMonthlyPayment, calculateNewMonthlyPayment, getRiskZone } from '../../utils/loanCalculations';
import Card from '../shared/Card';

interface WiborSimulatorProps {
  loanAmount: number;       // Kwota kredytu (PLN)
  loanTermYears: number;    // Okres kredytu (lata)
  margin: number;           // Marża banku (p.p.)
  baseWibor: number;        // Bazowa stawka WIBOR (p.p.)
  installmentType: 'equal' | 'declining'; // Typ rat
}

interface WiborSimulatorState {
  wiborChange: number;      // Zmiana WIBOR w p.p. (np. 2 dla +2%)
  newMonthlyPayment: number; // Nowa rata po zmianie WIBOR
  riskZone: 'safe' | 'warning' | 'danger';
}

const WiborSimulator: React.FC<WiborSimulatorProps> = ({
  loanAmount,
  loanTermYears,
  margin,
  baseWibor,
  installmentType,
}) => {
  const months = loanTermYears * 12;
  const currentRate = baseWibor + margin;

  const currentMonthlyPayment = useMemo(
    () => calculateMonthlyPayment(loanAmount, currentRate, months, installmentType),
    [loanAmount, currentRate, months, installmentType]
  );

  const [state, setState] = useState<WiborSimulatorState>({
    wiborChange: 0,
    newMonthlyPayment: currentMonthlyPayment,
    riskZone: 'safe',
  });

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const wiborChangeDecimal = parseFloat(e.target.value);
    const wiborChangePct = wiborChangeDecimal * 100;

    const newMonthlyPayment = calculateNewMonthlyPayment(
      currentRate,
      wiborChangePct,
      loanAmount,
      months
    );
    const riskZone = getRiskZone(currentMonthlyPayment, newMonthlyPayment);

    setState({
      wiborChange: wiborChangePct,
      newMonthlyPayment,
      riskZone,
    });
  };

  const getRiskZoneColor = () => {
    switch (state.riskZone) {
      case 'safe': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'danger': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskZoneBg = () => {
    switch (state.riskZone) {
      case 'safe': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'danger': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getRiskZoneLabel = () => {
    switch (state.riskZone) {
      case 'safe': return 'Bezpieczna';
      case 'warning': return 'Ostrzeżenie';
      case 'danger': return 'Niebezpieczna';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      {/* Lewa kolumna — parametry */}
      <Card title="Przetestuj scenariusze">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-xs text-gray-500">Kwota kredytu</p>
              <p className="text-sm font-semibold">{loanAmount.toLocaleString()} PLN</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Okres kredytu</p>
              <p className="text-sm font-semibold">{loanTermYears} lat</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Oprocentowanie</p>
              <p className="text-sm font-semibold">{baseWibor}% + {margin}% = {currentRate}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Typ rat</p>
              <p className="text-sm font-semibold">{installmentType === 'equal' ? 'Równe' : 'Malejące'}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zmiana WIBOR: <span className="font-bold">{state.wiborChange >= 0 ? '+' : ''}{state.wiborChange} p.p.</span>
            </label>
            <input
              type="range"
              min="-0.02"
              max="0.05"
              step="0.001"
              value={(state.wiborChange || 0) / 100}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>-2 p.p.</span>
              <span className="font-medium">0</span>
              <span>+5 p.p.</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            <div className="p-2 rounded bg-green-50 text-green-700 font-medium">
              🟢 Bezpieczna<br/>(≤10% wzrostu)
            </div>
            <div className="p-2 rounded bg-yellow-50 text-yellow-700 font-medium">
              🟡 Ostrzeżenie<br/>(10-20% wzrostu)
            </div>
            <div className="p-2 rounded bg-red-50 text-red-700 font-medium">
              🔴 Niebezpieczna<br/>(&gt;20% wzrostu)
            </div>
          </div>
        </div>
      </Card>

      {/* Prawa kolumna — wyniki */}
      <Card title="Wynik symulacji">
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Aktualna rata:</span>
              <span className="text-lg font-semibold text-gray-900">
                {currentMonthlyPayment.toFixed(2)} PLN
              </span>
            </div>
          </div>

          <div className={`p-4 rounded-lg border ${getRiskZoneBg()} transition-colors duration-300`}>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Nowa rata:</span>
              <span className="text-lg font-bold text-gray-900">
                {state.newMonthlyPayment.toFixed(2)} PLN
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-600">Różnica:</span>
              <span className={`text-base font-semibold ${getRiskZoneColor()}`}>
                {(state.newMonthlyPayment - currentMonthlyPayment) >= 0 ? '+' : ''}
                {(state.newMonthlyPayment - currentMonthlyPayment).toFixed(2)} PLN
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-gray-600">Strefa ryzyka:</span>
              <span className={`text-base font-bold ${getRiskZoneColor()}`}>
                {getRiskZoneLabel()}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WiborSimulator;