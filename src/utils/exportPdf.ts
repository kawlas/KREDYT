import jsPDF from 'jspdf';

export interface PdfExportData {
  title: string;
  subtitle?: string;
  fields: Array<{
    label: string;
    value: string;
    highlight?: boolean;
  }>;
  summary?: Array<{
    label: string;
    value: string;
    color?: 'green' | 'red' | 'blue';
  }>;
  footer?: string;
}

/**
 * Generuje i pobiera PDF z danymi kalkulacji.
 * Używa jsPDF do tworzenia czytelnego dokumentu.
 */
export function generateAndDownloadPdf(data: PdfExportData): void {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let y = margin;

  // === NAGŁÓWEK ===
  doc.setFontSize(20);
  doc.setTextColor(30, 64, 175); // blue-800
  doc.text(data.title, margin, y);
  y += 10;

  if (data.subtitle) {
    doc.setFontSize(11);
    doc.setTextColor(107, 114, 128); // gray-500
    doc.text(data.subtitle, margin, y);
    y += 8;
  }

  // Linia oddzielająca
  y += 2;
  doc.setDrawColor(229, 231, 235);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // === DATA I URL ===
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  doc.text(`Wygenerowano: ${new Date().toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })}`, margin, y);
  doc.text('kredytkalkulator.netlify.app', pageWidth - margin, y, { align: 'right' });
  y += 10;

  // === POLA (parametry) ===
  doc.setFontSize(14);
  doc.setTextColor(55, 65, 81);
  doc.text('Parametry kalkulacji', margin, y);
  y += 8;

  for (const field of data.fields) {
    // Sprawdź, czy zmieści się na stronie
    if (y > 270) {
      doc.addPage();
      y = margin;
    }

    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text(field.label, margin, y);

    doc.setTextColor(field.highlight ? 30 : 55, field.highlight ? 64 : 65, field.highlight ? 175 : 81);
    doc.setFont(field.highlight ? 'helvetica' : 'helvetica', field.highlight ? 'bold' : 'normal');
    doc.text(field.value, pageWidth - margin, y, { align: 'right' });
    doc.setFont('helvetica', 'normal');

    y += 7;
  }

  // === PODSUMOWANIE ===
  if (data.summary && data.summary.length > 0) {
    y += 4;
    if (y > 260) {
      doc.addPage();
      y = margin;
    }

    // Linia oddzielająca
    doc.setDrawColor(229, 231, 235);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    doc.setFontSize(14);
    doc.setTextColor(55, 65, 81);
    doc.text('Podsumowanie', margin, y);
    y += 8;

    for (const item of data.summary) {
      if (y > 270) {
        doc.addPage();
        y = margin;
      }

      doc.setFontSize(11);
      doc.setTextColor(55, 65, 81);
      doc.text(item.label, margin, y);

      // Kolor w zależności od typu
      switch (item.color) {
        case 'green':
          doc.setTextColor(22, 163, 74);
          break;
        case 'red':
          doc.setTextColor(220, 38, 38);
          break;
        case 'blue':
          doc.setTextColor(37, 99, 235);
          break;
        default:
          doc.setTextColor(55, 65, 81);
      }
      doc.setFont('helvetica', 'bold');
      doc.text(item.value, pageWidth - margin, y, { align: 'right' });
      doc.setFont('helvetica', 'normal');

      y += 8;
    }
  }

  // === STOPKA ===
  if (data.footer) {
    y += 10;
    if (y > 260) {
      doc.addPage();
      y = margin;
    }

    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    const footerLines = doc.splitTextToSize(data.footer, contentWidth);
    for (const line of footerLines) {
      doc.text(line, margin, y);
      y += 4;
    }
  }

  // === Pobranie pliku ===
  doc.save(`kalkulacja-kredytu-${Date.now()}.pdf`);
}

/**
 * Generuje PDF z wynikami kalkulacji kredytu i zwraca go jako blob.
 * Przydatne do podglądu przed pobraniem.
 */
export function generatePdfBlob(data: PdfExportData): Blob {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = margin;

  // Nagłówek
  doc.setFontSize(20);
  doc.setTextColor(30, 64, 175);
  doc.text(data.title, margin, y);
  y += 10;

  if (data.subtitle) {
    doc.setFontSize(11);
    doc.setTextColor(107, 114, 128);
    doc.text(data.subtitle, margin, y);
    y += 8;
  }

  y += 2;
  doc.setDrawColor(229, 231, 235);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Data
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  doc.text(`Wygenerowano: ${new Date().toLocaleDateString('pl-PL')}`, margin, y);
  y += 10;

  // Pola
  doc.setFontSize(14);
  doc.setTextColor(55, 65, 81);
  doc.text('Parametry kalkulacji', margin, y);
  y += 8;

  for (const field of data.fields) {
    if (y > 270) { doc.addPage(); y = margin; }
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text(field.label, margin, y);
    doc.setTextColor(55, 65, 81);
    doc.setFont('helvetica', field.highlight ? 'bold' : 'normal');
    doc.text(field.value, pageWidth - margin, y, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    y += 7;
  }

  // Podsumowanie
  if (data.summary && data.summary.length > 0) {
    y += 4;
    if (y > 260) { doc.addPage(); y = margin; }
    doc.setDrawColor(229, 231, 235);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;
    doc.setFontSize(14);
    doc.setTextColor(55, 65, 81);
    doc.text('Podsumowanie', margin, y);
    y += 8;

    for (const item of data.summary) {
      if (y > 270) { doc.addPage(); y = margin; }
      doc.setFontSize(11);
      doc.setTextColor(55, 65, 81);
      doc.text(item.label, margin, y);
      switch (item.color) {
        case 'green': doc.setTextColor(22, 163, 74); break;
        case 'red': doc.setTextColor(220, 38, 38); break;
        case 'blue': doc.setTextColor(37, 99, 235); break;
        default: doc.setTextColor(55, 65, 81);
      }
      doc.setFont('helvetica', 'bold');
      doc.text(item.value, pageWidth - margin, y, { align: 'right' });
      doc.setFont('helvetica', 'normal');
      y += 8;
    }
  }

  if (data.footer) {
    y += 10;
    if (y > 260) { doc.addPage(); y = margin; }
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    const footerLines = doc.splitTextToSize(data.footer, pageWidth - 2 * margin);
    for (const line of footerLines) {
      doc.text(line, margin, y);
      y += 4;
    }
  }

  return doc.output('blob');
}