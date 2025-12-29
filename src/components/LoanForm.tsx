import React, { useRef } from 'react';
import { type UseFormRegister, type FieldErrors, type UseFormTrigger } from 'react-hook-form';
import type { LoanFormData } from '../types';

interface LoanFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
  register: UseFormRegister<LoanFormData>;
  trigger: UseFormTrigger<LoanFormData>;
  errors: FieldErrors<LoanFormData>;
}

const LoanForm: React.FC<LoanFormProps> = ({ onSubmit, isLoading, register, trigger, errors }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Custom debounce handler for validation
  const debouncedValidate = (name: keyof LoanFormData) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      trigger(name);
    }, 500); // 500ms delay as requested
  };

  const registerWithDebounce = (name: keyof LoanFormData, options?: any) => {
    const { onChange, ...rest } = register(name, options);
    return {
      ...rest,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e); // Update internal state immediately
        debouncedValidate(name); // Trigger validation with delay
      }
    };
  };

  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      
      {/* Kwota kredytu */}
      <div>
        <label htmlFor="principal" className="block text-sm font-medium text-gray-700">Kwota kredytu (PLN)</label>
        <input
          id="principal"
          type="number"
          {...registerWithDebounce('principal', { 
            required: 'Pole wymagane', 
            min: { value: 50000, message: 'Kwota kredytu musi być między 50 000 a 2 000 000 PLN' },
            max: { value: 2000000, message: 'Kwota kredytu musi być między 50 000 a 2 000 000 PLN' },
            valueAsNumber: true
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
        />
        {errors.principal && <p className="mt-1 text-sm text-red-600">{errors.principal.message}</p>}
      </div>

      {/* Okres kredytowania */}
      <div>
        <label htmlFor="years" className="block text-sm font-medium text-gray-700">Okres kredytowania (lata)</label>
        <input
          id="years"
          type="number"
          {...registerWithDebounce('years', { 
            required: 'Pole wymagane',
            min: { value: 1, message: 'Okres kredytowania: 1-35 lat' },
            max: { value: 35, message: 'Okres kredytowania: 1-35 lat' },
            valueAsNumber: true
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
        />
        {errors.years && <p className="mt-1 text-sm text-red-600">{errors.years.message}</p>}
      </div>

      {/* WIBOR 3M */}
      <div>
        <label htmlFor="wibor" className="block text-sm font-medium text-gray-700">WIBOR 3M (%)</label>
        <input
          id="wibor"
          type="number"
          step="0.01"
          {...registerWithDebounce('wibor', { 
            required: 'Pole wymagane',
            min: { value: 0, message: 'WIBOR musi być wartością dodatnią' },
            max: { value: 20, message: 'Maksimum 20%' },
            valueAsNumber: true
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
        />
        {errors.wibor && <p className="mt-1 text-sm text-red-600">{errors.wibor.message}</p>}
      </div>

      {/* Marża banku */}
      <div>
        <label htmlFor="margin" className="block text-sm font-medium text-gray-700">Marża banku (%)</label>
        <input
          id="margin"
          type="number"
          step="0.01"
          {...registerWithDebounce('margin', { 
            required: 'Pole wymagane',
            min: { value: 0.5, message: 'Minimum 0.5%' },
            max: { value: 5, message: 'Maksimum 5%' },
            valueAsNumber: true
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
        />
        {errors.margin && <p className="mt-1 text-sm text-red-600">{errors.margin.message}</p>}
      </div>

      {/* Rodzaj rat */}
      <div>
        <label htmlFor="installmentType" className="block text-sm font-medium text-gray-700">Rodzaj rat</label>
        <select
          id="installmentType"
          {...register('installmentType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 bg-white"
        >
          <option value="equal">Równe</option>
          <option value="declining">Malejące</option>
        </select>
      </div>

      {/* Prowizja bankowa */}
      <div>
        <label htmlFor="commission" className="block text-sm font-medium text-gray-700">Prowizja bankowa (PLN) (opcjonalne)</label>
        <input
          id="commission"
          type="number"
          {...registerWithDebounce('commission', {
            min: { value: 0, message: 'Minimum 0 PLN' },
            max: { value: 100000, message: 'Maksimum 100 000 PLN' },
            valueAsNumber: true
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
        />
        {errors.commission && <p className="mt-1 text-sm text-red-600">{errors.commission.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 transition-colors duration-200"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Obliczam...
          </span>
        ) : (
          'Oblicz ratę'
        )}
      </button>
    </form>
  );
};

export default LoanForm;
