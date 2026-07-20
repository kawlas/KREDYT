import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ExportPdfButton from './ExportPdfButton';
import type { PdfExportData } from '../../utils/exportPdf';

// Mock the exportPdf utility
vi.mock('../../utils/exportPdf', () => ({
  generateAndDownloadPdf: vi.fn(),
  generatePdfBlob: vi.fn(() => new Blob([''], { type: 'application/pdf' })),
}));

import { generateAndDownloadPdf } from '../../utils/exportPdf';

beforeEach(() => {
  vi.clearAllMocks();
});

const mockData: PdfExportData = {
  title: 'Kalkulacja kredytu',
  fields: [
    { label: 'Kwota', value: '400 000 PLN' },
    { label: 'Rata', value: '2 684 PLN', highlight: true },
  ],
};

describe('ExportPdfButton', () => {
  it('renders with default label', () => {
    render(<ExportPdfButton data={mockData} />);
    expect(screen.getByText('Pobierz PDF')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<ExportPdfButton data={mockData} label="Eksportuj PDF" />);
    expect(screen.getByText('Eksportuj PDF')).toBeInTheDocument();
  });

  it('calls generateAndDownloadPdf on click', async () => {
    render(<ExportPdfButton data={mockData} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => {
      expect(generateAndDownloadPdf).toHaveBeenCalledWith(mockData);
    });
  });

  it('renders with primary variant by default', () => {
    render(<ExportPdfButton data={mockData} />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-primary');
  });

  it('renders with secondary variant', () => {
    render(<ExportPdfButton data={mockData} variant="secondary" />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-secondary');
  });

  it('renders with outline variant', () => {
    render(<ExportPdfButton data={mockData} variant="outline" />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('border-primary');
  });

  it('is disabled when disabled prop is true', () => {
    render(<ExportPdfButton data={mockData} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('does not call generateAndDownloadPdf when disabled', () => {
    render(<ExportPdfButton data={mockData} disabled />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(generateAndDownloadPdf).not.toHaveBeenCalled();
  });
});