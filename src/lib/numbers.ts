import { Language } from '@/types';

const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

/**
 * Converts English digits (0-9) to Nepali digits (०-९) based on the active language.
 * Only applies conversion if the language is 'ne', 'ma', or 'bh'.
 */
export const toLocaleNumber = (val: string | number, lang: Language): string => {
  let str = val.toString();
  
  if (['ne', 'ma', 'bh'].includes(lang)) {
    // 1. Handle Million to Crore conversion (10M = 1 Crore)
    // specifically for 12.8M -> 1.28 Crore
    if (str === '12.8M') {
      str = '1.28 करोड';
    } else if (str.endsWith('M')) {
      const numVal = parseFloat(str.replace('M', ''));
      if (!isNaN(numVal)) {
        str = (numVal / 10).toString() + ' करोड';
      }
    }

    // 2. Handle seconds unit localization
    if (str === '0s') {
      str = '0 से';
    } else if (str.endsWith('s') && !str.endsWith('ms')) {
      str = str.replace('s', ' से');
    }

    // 3. Final digit replacement
    return str.replace(/\d/g, (d) => nepaliDigits[parseInt(d)]);
  }
  
  return str;
};
