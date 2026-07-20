import React, { useState } from 'react';
import type { PdfExportData } from '../../utils/exportPdf';

interface ExportPdfButtonProps {
  data: PdfExportData;
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

const variantStyles = {
  primary:
    'bg-primary text-white hover:bg-primary/90 focus:ring-ring',
  secondary:
    'bg-secondary text-foreground hover:bg-muted focus:ring-ring',
  outline:
    'border border-primary text-primary hover:bg-primary/10 focus:ring-ring',
};

const ExportPdfButton: React.FC<ExportPdfButtonProps> = ({
  data,
  label = 'Pobierz PDF',
  className = '',
  variant = 'primary',
  disabled = false,
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading || disabled) return;
    setLoading(true);
    try {
      // Dynamically import the heavy PDF libs (jsPDF + html2canvas) only when
      // the user actually exports — keeps them out of the initial bundle.
      const { generateAndDownloadPdf } = await import('../../utils/exportPdf');
      generateAndDownloadPdf(data);
    } catch (err) {
      console.error('Błąd podczas generowania PDF:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      aria-busy={loading}
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
        {loading ? 'Generowanie…' : label}
    </button>
  );
};

export default ExportPdfButton;