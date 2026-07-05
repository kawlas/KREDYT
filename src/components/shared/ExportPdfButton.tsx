import React from 'react';
import { generateAndDownloadPdf, type PdfExportData } from '../../utils/exportPdf';

interface ExportPdfButtonProps {
  data: PdfExportData;
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

const variantStyles = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary:
    'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400',
  outline:
    'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
};

const ExportPdfButton: React.FC<ExportPdfButtonProps> = ({
  data,
  label = 'Pobierz PDF',
  className = '',
  variant = 'primary',
  disabled = false,
}) => {
  const handleClick = () => {
    generateAndDownloadPdf(data);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {/* Ikona PDF */}
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 3v4a1 1 0 001 1h4"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6M9 17h6M9 9h1"
        />
      </svg>
      {label}
    </button>
  );
};

export default ExportPdfButton;