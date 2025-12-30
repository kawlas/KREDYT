import React, { useState, useEffect, useRef } from 'react';
import { animate } from 'motion';
import type { LoanResults } from '../types';
import { formatCurrency } from '../utils/formatters';
import Card from './shared/Card';
import Alert from './shared/Alert';
import Tooltip from './shared/Tooltip';

interface ResultsCardProps extends LoanResults {
  onSave: (name: string) => void;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ monthlyPayment, totalCost, totalInterest, rrso, breakdown, onSave }) => {
  const [offerName, setOfferName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    // Card entrance
    animate(
      cardRef.current,
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.3, ease: "easeOut" }
    );

    // Stagger children
    const items = cardRef.current.querySelectorAll('[data-animate-item]');
    if (items.length > 0) {
      items.forEach((item, index) => {
        animate(
          item,
          { opacity: [0, 1], x: [-10, 0] },
          { duration: 0.3, delay: index * 0.05 }
        );
      });
    }
  }, []);

  const handleSave = () => {
    if (!offerName.trim()) return;
    onSave(offerName);
    setOfferName('');
    setIsSaving(false);
  };

  return (
    <div ref={cardRef} className="space-y-6">
      <Card>
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Podsumowanie kosztów</h2>
          <div className="flex items-center gap-2">
             {!isSaving ? (
                <button 
                  onClick={() => setIsSaving(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Zapisz ofertę
                </button>
             ) : (
               <div className="flex items-center gap-2">
                 <input 
                    type="text" 
                    value={offerName}
                    onChange={(e) => setOfferName(e.target.value)}
                    placeholder="Nazwa, np. Bank PKO"
                    className="text-sm border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none"
                    autoFocus
                 />
                 <button 
                    onClick={handleSave}
                    className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 font-medium transition-colors"
                 >
                   OK
                 </button>
                 <button 
                    onClick={() => setIsSaving(false)}
                    className="text-gray-500 text-xs hover:text-gray-700"
                 >
                   Anuluj
                 </button>
               </div>
             )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Payment Section */}
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100" data-animate-item>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-blue-800">Miesięczna rata bazowa</p>
                <Tooltip text="Sama rata kapitałowo-odsetkowa, bez ubezpieczeń.">
                  <span className="text-blue-400 cursor-help text-xs">ⓘ</span>
                </Tooltip>
              </div>
              <p className="text-4xl font-bold text-gray-900">
                {formatCurrency(monthlyPayment)}
              </p>
              {breakdown && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700">Z ubezpieczeniami:</span>
                    <span className="font-bold text-gray-900">
                      {formatCurrency(monthlyPayment + breakdown.ongoingCosts.totalMonthlyExtra)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3" data-animate-item>
              <div className="flex justify-between items-end">
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">RRSO</p>
                <p className="text-2xl font-bold text-blue-600">{rrso.toFixed(2)}%</p>
              </div>
              <Alert type="info" icon="💡">
                <p className="text-xs">
                  RRSO obejmuje wszystkie koszty kredytu (prowizje, odsetki, ubezpieczenia) w ujęciu rocznym.
                </p>
              </Alert>
            </div>
          </div>

          {/* Breakdown Section */}
          <div className="space-y-6">
            <div data-animate-item>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">
                Koszty na start
              </h3>
              {breakdown ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Prowizja banku:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(breakdown.upfrontCosts.commission)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Notariusz i podatki:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(breakdown.upfrontCosts.notary)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Wycena nieruchomości:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(breakdown.upfrontCosts.valuation)}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2 font-bold">
                    <span>Razem na start:</span>
                    <span className="text-blue-600">{formatCurrency(breakdown.upfrontCosts.total)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">Brak szczegółowych danych</p>
              )}
            </div>

            <div data-animate-item>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">
                Koszty całkowite
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Suma wszystkich odsetek:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t pt-2 text-xl mt-4">
                  <span>Ile oddasz łącznie:</span>
                  <span className="text-gray-900">{formatCurrency(totalCost)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {breakdown && breakdown.ongoingCosts.monthlyBridgeInsurance > 0 && (
        <Alert type="warning" icon="⚠️">
          <p className="text-sm">
            Twoja rata będzie wyższa o <strong>{formatCurrency(breakdown.ongoingCosts.monthlyBridgeInsurance)}</strong> do czasu wpisu do księgi wieczystej (ubezpieczenie pomostowe).
          </p>
        </Alert>
      )}
    </div>
  );
};

export default ResultsCard;
