import React, { useEffect, useRef } from 'react';
import { animate } from 'motion';
import type { LoanOffer } from '../types';

interface ComparisonTableProps {
  offers: Array<LoanOffer>;
  onDelete: (id: string) => void;
}

import { formatCurrency } from '../utils/formatters';

const ComparisonTable: React.FC<ComparisonTableProps> = ({ offers, onDelete }) => {
  const tableRef = useRef<HTMLTableSectionElement>(null);

  // Znajdź najtańszą ofertę (najniższy koszt całkowity)
  const cheapestOffer = offers.reduce((prev, current) => 
    (prev.results.totalCost < current.results.totalCost) ? prev : current
  , offers[0]);

  // Animate new row
  useEffect(() => {
    if (!tableRef.current) return;
    
    const lastRow = tableRef.current.querySelector('tr:last-child');
    if (!lastRow) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    animate(
      lastRow,
      { opacity: [0, 1], scale: [0.95, 1] },
      { duration: 0.25 }
    );
  }, [offers.length]);

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-sm bg-white">
      {/* Mobile list view */}
      <div className="block md:hidden space-y-4 p-4">
        {offers.map((offer) => (
          <div 
            key={offer.id} 
            className={`p-4 rounded-lg border shadow-sm ${
              offer.name === cheapestOffer?.name ? 'border-green-500 ring-1 ring-green-500 relative' : 'border-gray-200'
            }`}
          >
            {offer.name === cheapestOffer?.name && (
              <span className="absolute -top-3 left-4 px-2 py-0.5 text-xs font-semibold text-white bg-green-500 rounded">
                Najtańsza
              </span>
            )}
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">{offer.name}</h3>
              <div className="flex items-center gap-2">
                 <span className="text-sm font-semibold text-blue-600">{offer.results.rrso.toFixed(2)}% RRSO</span>
                 <button 
                  onClick={() => onDelete(offer.id)}
                  className="text-gray-400 hover:text-red-500"
                  aria-label={`Usuń ofertę ${offer.name}`}
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                   </svg>
                 </button>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Rata:</span>
                <span className="font-medium">{formatCurrency(offer.results.monthlyPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Całkowity koszt:</span>
                <span className="font-bold text-gray-900">{formatCurrency(offer.results.totalCost)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nazwa oferty
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rata miesięczna
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Całkowity koszt
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                RRSO
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Akcje</span>
              </th>
            </tr>
          </thead>
          <tbody ref={tableRef} className="bg-white divide-y divide-gray-200">
            {offers.map((offer, index) => (
              <tr 
                key={offer.id}
                className={`transition-all duration-200 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-md ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${
                   offer.name === cheapestOffer?.name ? 'ring-2 ring-inset ring-green-500' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                  {offer.name}
                  {offer.name === cheapestOffer?.name && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Najtańsza
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 font-semibold">
                  {formatCurrency(offer.results.monthlyPayment)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-bold">
                  {formatCurrency(offer.results.totalCost)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-blue-600 font-medium">
                  {offer.results.rrso.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => onDelete(offer.id)} 
                    className="text-red-600 hover:text-red-900"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
