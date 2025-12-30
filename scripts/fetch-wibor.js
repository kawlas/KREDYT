import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchWIBOR() {
  try {
    console.log('Fetching WIBOR rates from Bankier.pl...');
    
    const response = await fetch('https://www.bankier.pl/mieszkaniowe/stopy-procentowe/wibor');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Regex dla WIBOR 3M i 6M z Bankier.pl
    const match3M = html.match(/WIBOR\s*3M[^0-9]*(\d+[.,]\d+)\s*%/i);
    const match6M = html.match(/WIBOR\s*6M[^0-9]*(\d+[.,]\d+)\s*%/i);
    
    if (!match3M || !match6M) {
      throw new Error('Could not parse WIBOR rates from HTML');
    }
    
    const rate3M = parseFloat(match3M[1].replace(',', '.'));
    const rate6M = parseFloat(match6M[1].replace(',', '.'));
    
    // Walidacja (sensowny zakres dla WIBOR w Polsce 2024/2025)
    if (rate3M < 0 || rate3M > 20 || rate6M < 0 || rate6M > 20) {
      throw new Error(`Invalid WIBOR values: 3M=${rate3M}%, 6M=${rate6M}%`);
    }
    
    const data = {
      updated: new Date().toISOString(),
      source: 'Bankier.pl',
      rates: {
        '3M': rate3M,
        '6M': rate6M
      }
    };
    
    // Zapis do public/wibor.json
    const outputPath = path.join(__dirname, '..', 'public', 'wibor.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    
    console.log('✓ WIBOR updated successfully:');
    console.log(`  3M: ${rate3M}%`);
    console.log(`  6M: ${rate6M}%`);
    console.log(`  File: ${outputPath}`);
    
  } catch (error) {
    console.error('✗ Failed to fetch WIBOR:', error.message);
    process.exit(1);  // fail workflow jeśli nie udało się
  }
}

fetchWIBOR();
