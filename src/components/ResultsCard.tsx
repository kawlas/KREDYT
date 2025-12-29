import React, { useState, useEffect, useRef } from 'react';
import { animate } from 'motion';
import type { LoanResults } from '../types';

import { formatCurrency } from '../utils/formatters';

interface ResultsCardProps extends LoanResults {
  onSave: (name: string) => void;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ monthlyPayment, totalCost, totalInterest, rrso, onSave }) => {
  const [offerName, setOfferName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    // Card entrance
    animate(
      cardRef.current as any,
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.3, ease: "easeOut" }
    );

    // Stagger children
    const items = cardRef.current.querySelectorAll('[data-animate-item]');
    if (items.length > 0) {
      items.forEach((item, index) => {
        animate(
          item as any,
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
    <div ref={cardRef} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-medium text-gray-900">Wyniki</h2>
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
                  className="text-sm border rounded px-2 py-1"
                  autoFocus
               />
               <button 
                  onClick={handleSave}
                  className="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700"
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
      
      <div className="space-y-1" data-animate-item>
        <p className="text-sm text-gray-500">Miesięczna rata</p>
        <p className="text-3xl font-bold text-gray-900" aria-label={`Miesięczna rata ${formatCurrency(monthlyPayment)}`}>
          {formatCurrency(monthlyPayment)}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div data-animate-item>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Całkowity koszt</p>
          <p className="text-lg font-semibold text-gray-900">{formatCurrency(totalCost)}</p>
        </div>
        
        <div data-animate-item>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Suma odsetek</p>
          <p className="text-lg font-semibold text-gray-900">{formatCurrency(totalInterest)}</p>
        </div>

        <div data-animate-item>
          <p className="text-xs text-gray-500 uppercase tracking-wide">RRSO</p>
          <p className="text-lg font-semibold text-blue-600">{rrso.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
