import { describe, it, expect } from 'vitest';
import { generatePdfBlob, type PdfExportData } from './exportPdf';

describe('generatePdfBlob', () => {
  const mockData: PdfExportData = {
    title: 'Test PDF',
    subtitle: 'Test podtytuł',
    fields: [
      { label: 'Kwota kredytu', value: '400 000 PLN' },
      { label: 'Oprocentowanie', value: '7%' },
      { label: 'Okres', value: '25 lat' },
      { label: 'Miesięczna rata', value: '2 684 PLN', highlight: true },
    ],
    summary: [
      { label: 'Całkowity koszt', value: '805 232 PLN', color: 'red' },
      { label: 'Możesz zaoszczędzić', value: '52 000 PLN', color: 'green' },
    ],
    footer: 'Test stopka — dane mają charakter informacyjny.',
  };

  it('generates a blob from PDF data', () => {
    const blob = generatePdfBlob(mockData);
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('application/pdf');
  });

  it('generates non-empty PDF', () => {
    const blob = generatePdfBlob(mockData);
    expect(blob.size).toBeGreaterThan(0);
  });

  it('handles minimal data', () => {
    const minimalData: PdfExportData = {
      title: 'Minimalny PDF',
      fields: [{ label: 'Test', value: '123' }],
    };
    const blob = generatePdfBlob(minimalData);
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.size).toBeGreaterThan(0);
  });

  it('handles empty summary', () => {
    const dataWithoutSummary: PdfExportData = {
      title: 'Bez podsumowania',
      fields: [{ label: 'Kwota', value: '100 000 PLN' }],
    };
    const blob = generatePdfBlob(dataWithoutSummary);
    expect(blob).toBeInstanceOf(Blob);
  });

  it('handles all summary colors', () => {
    const dataWithAllColors: PdfExportData = {
      title: 'Kolory',
      fields: [{ label: 'Test', value: '123' }],
      summary: [
        { label: 'Zielony', value: '100', color: 'green' },
        { label: 'Czerwony', value: '200', color: 'red' },
        { label: 'Niebieski', value: '300', color: 'blue' },
      ],
    };
    const blob = generatePdfBlob(dataWithAllColors);
    expect(blob).toBeInstanceOf(Blob);
  });
});