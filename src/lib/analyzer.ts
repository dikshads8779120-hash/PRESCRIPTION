import type {
  Language,
  MedicineEntry,
  PrescriptionAnalysis,
} from './types';

const MEDICAL_TERMS: Record<string, { en: string; hi: string }> = {
  bd: { en: 'Twice daily', hi: 'Din mein do baar' },
  bds: { en: 'Twice daily', hi: 'Din mein do baar' },
  tds: { en: 'Three times daily', hi: 'Din mein teen baar' },
  tid: { en: 'Three times daily', hi: 'Din mein teen baar' },
  od: { en: 'Once daily', hi: 'Din mein ek baar' },
  qds: { en: 'Four times daily', hi: 'Din mein chaar baar' },
  qid: { en: 'Four times daily', hi: 'Din mein chaar baar' },
  qd: { en: 'Once daily', hi: 'Din mein ek baar' },
  hs: { en: 'At bedtime', hi: 'Sone se pehle' },
  prn: { en: 'As needed', hi: 'Jab zaroorat ho' },
  ac: { en: 'Before meals', hi: 'Khane se pehle' },
  pc: { en: 'After meals', hi: 'Khane ke baad' },
  stat: { en: 'Immediately', hi: 'Turant' },
  sos: { en: 'As needed (single dose)', hi: 'Jab zaroorat ho (ek baar)' },
  po: { en: 'Oral (by mouth)', hi: 'Muh se lena (Oral)' },
  '1-0-0': { en: 'Once daily (morning)', hi: 'Din mein ek baar (subah)' },
  '1-0-1': { en: 'Twice daily (morning and night)', hi: 'Din mein do baar (subah aur raat)' },
  '1-1-1': { en: 'Three times daily', hi: 'Din mein teen baar' },
  '0-0-1': { en: 'Once daily (night)', hi: 'Din mein ek baar (raat)' },
  '0-1-0': { en: 'Once daily (afternoon)', hi: 'Din mein ek baar (dopahar)' },
  bid: { en: 'Twice daily', hi: 'Din mein do baar' },
  q6h: { en: 'Every 6 hours', hi: 'Har 6 ghante mein' },
  q8h: { en: 'Every 8 hours', hi: 'Har 8 ghante mein' },
  q12h: { en: 'Every 12 hours', hi: 'Har 12 ghante mein' },
  q4h: { en: 'Every 4 hours', hi: 'Har 4 ghante mein' },
};

const ROUTE_TERMS: Record<string, { en: string; hi: string }> = {
  po: { en: 'Oral (by mouth)', hi: 'Muh se lena (Oral)' },
  oral: { en: 'Oral (by mouth)', hi: 'Muh se lena (Oral)' },
  im: { en: 'Intramuscular (injection into muscle)', hi: 'Injection (muscle mein)' },
  iv: { en: 'Intravenous (injection into vein)', hi: 'Injection (nadi mein)' },
  sc: { en: 'Subcutaneous (under skin)', hi: 'Injection (skin ke neeche)' },
  topical: { en: 'Apply on skin', hi: 'Skin par lagana' },
  'opthalmic': { en: 'For eyes', hi: 'Aankhon ke liye' },
  'ophthalmic': { en: 'For eyes', hi: 'Aankhon ke liye' },
  otic: { en: 'For ears', hi: 'Kaano ke liye' },
  nasal: { en: 'For nose', hi: 'Naak ke liye' },
  rectal: { en: 'Rectal route', hi: 'Rectal (guda maarg)' },
  inhaled: { en: 'Inhaled through mouth/nose', hi: 'Muh/naak se saans mein' },
};

const SAFETY_NOTICE_EN =
  'This explanation is for understanding only. It does NOT replace a doctor or pharmacist. Always confirm any medicine, dose, or instruction with a qualified healthcare professional before taking it.';

const SAFETY_NOTICE_HI =
  'Yeh explanation sirf samajhne ke liye hai. Yeh doctor ya pharmacist ki jagah nahi leta. Koi bhi dawai, dose, ya instruction lene se pehle hamesha qualified healthcare professional se confirm karein.';

const UNIT_PATTERNS = ['mg', 'ml', 'mcg', 'gm', 'g', 'iu', 'units?', 'meq', '%'];

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function translateFrequency(freq: string, lang: Language): string {
  const lower = freq.toLowerCase().trim();
  if (MEDICAL_TERMS[lower]) {
    return MEDICAL_TERMS[lower][lang];
  }
  const match = lower.match(/(\d+)\s*-\s*(\d+)\s*-\s*(\d+)/);
  if (match) {
    const key = `${match[1]}-${match[2]}-${match[3]}`;
    if (MEDICAL_TERMS[key]) return MEDICAL_TERMS[key][lang];
  }
  return freq || 'Unknown';
}

function translateRoute(route: string, lang: Language): string {
  const lower = route.toLowerCase().trim();
  if (ROUTE_TERMS[lower]) {
    return ROUTE_TERMS[lower][lang];
  }
  return route || 'Unknown';
}

function detectUncertain(value: string): boolean {
  if (!value || value.trim() === '') return true;
  const lower = value.toLowerCase();
  return ['?', '??', 'unknown', 'unreadable', 'unclear', '___', '...', 'not clear'].some((m) =>
    lower.includes(m),
  );
}

function buildSimpleExplanation(
  entry: ParsedMedicine,
  lang: Language,
): string {
  if (lang === 'hi') {
    const parts: string[] = [];
    if (entry.medicineName && entry.medicineName !== 'Unknown') {
      parts.push(`${entry.medicineName}`);
      if (entry.strength && entry.strength !== 'Unknown') parts.push(`${entry.strength}`);
    }
    if (entry.dose && entry.dose !== 'Unknown') parts.push(`${entry.dose}`);
    if (entry.frequency && entry.frequency !== 'Unknown') {
      parts.push(translateFrequency(entry.frequency, 'hi'));
    }
    if (entry.route && entry.route !== 'Unknown') {
      parts.push(`(${translateRoute(entry.route, 'hi')})`);
    }
    if (entry.duration && entry.duration !== 'Unknown') {
      parts.push(`${entry.duration} tak`);
    }
    if (parts.length === 0) return 'Dawai ki jaankari clearly padhi nahi ja saki. Doctor ya pharmacist se verify karein.';
    return parts.join(' ') + '.';
  }

  const parts: string[] = [];
  if (entry.medicineName && entry.medicineName !== 'Unknown') {
    parts.push(`Take ${entry.medicineName}`);
    if (entry.strength && entry.strength !== 'Unknown') parts.push(entry.strength);
  }
  if (entry.dose && entry.dose !== 'Unknown') parts.push(entry.dose);
  if (entry.frequency && entry.frequency !== 'Unknown') {
    parts.push(translateFrequency(entry.frequency, 'en'));
  }
  if (entry.route && entry.route !== 'Unknown') {
    parts.push(`(${translateRoute(entry.route, 'en')})`);
  }
  if (entry.duration && entry.duration !== 'Unknown') {
    parts.push(`for ${entry.duration}`);
  }
  if (parts.length === 0)
    return 'The medicine information could not be read clearly. Please verify with a doctor or pharmacist.';
  return parts.join(' ') + '.';
}

interface ParsedMedicine {
  medicineName: string;
  strength: string;
  dose: string;
  frequency: string;
  route: string;
  duration: string;
}

function parseLine(line: string): ParsedMedicine | null {
  let trimmed = line.trim();
  if (trimmed.length < 5) return null;
  if (/^(dr|doctor|patient|date|rx|date:|name:|age:|sex:|m\/f|reg)/i.test(trimmed)) {
    return null;
  }

  const entry: ParsedMedicine = {
    medicineName: 'Unknown',
    strength: 'Unknown',
    dose: 'Unknown',
    frequency: 'Unknown',
    route: 'Unknown',
    duration: 'Unknown',
  };

  // Extract duration (e.g., "for 30 days", "x 5 days", "for 2 weeks")
  const durationMatch = trimmed.match(
    /(?:for\s*)?(\d+)\s*(days?|weeks?|months?|day|week|month)\b|(?:x\s*)(\d+)\s*(days?|weeks?)/i,
  );
  if (durationMatch) {
    const num = durationMatch[1] || durationMatch[3];
    const unit = durationMatch[2] || durationMatch[4];
    entry.duration = `${num} ${unit.toLowerCase()}`;
    trimmed = trimmed.replace(durationMatch[0], '').trim();
  }

  // Extract strength (e.g., "500mg", "5ml", "10mcg")
  const unitRegex = new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(${UNIT_PATTERNS.join('|')})\\b`, 'i');
  const strengthMatch = trimmed.match(unitRegex);
  if (strengthMatch) {
    entry.strength = `${strengthMatch[1]}${strengthMatch[2]}`;
  }

  // Extract dose (e.g., "1 tab", "2 tablets", "5ml", "1 cap")
  const doseMatch = trimmed.match(
    /(\d+(?:\s*[-/]\s*\d+)?)\s*(tablets?|tabs?|capsules?|caps?|pills?|syrup|syp|drops?|inhalation|puffs?|ml)/i,
  );
  if (doseMatch) {
    entry.dose = `${doseMatch[1]} ${doseMatch[2].toLowerCase()}`;
  } else if (strengthMatch && !doseMatch) {
    const doseNumMatch = trimmed.match(/(\d+(?:\.\d+)?)\s*(ml|tablets?|tabs?|caps?)/i);
    if (doseNumMatch) {
      entry.dose = `${doseNumMatch[1]} ${doseNumMatch[2].toLowerCase()}`;
    }
  }

  // Extract frequency using known terms
  const lowerLine = trimmed.toLowerCase();
  for (const key of Object.keys(MEDICAL_TERMS)) {
    if (key.includes('-')) {
      if (lowerLine.includes(key)) {
        entry.frequency = key;
        break;
      }
    } else {
      const regex = new RegExp(`\\b${escapeRegex(key)}\\b`, 'i');
      if (regex.test(trimmed)) {
        entry.frequency = key;
        break;
      }
    }
  }
  // Also check natural language frequency
  if (entry.frequency === 'Unknown') {
    const naturalFreq = trimmed.match(
      /\b(once\s*daily|twice\s*daily|three\s*times\s*daily|four\s*times\s*daily|every\s*\d+\s*hours?|at\s*night|at\s*bedtime|as\s*needed|before\s*meals?|after\s*meals?|with\s*meals?)\b/i,
    );
    if (naturalFreq) {
      entry.frequency = naturalFreq[1].toLowerCase();
    }
  }

  // Extract route
  for (const key of Object.keys(ROUTE_TERMS)) {
    const regex = new RegExp(`\\b${escapeRegex(key)}\\b`, 'i');
    if (regex.test(trimmed)) {
      entry.route = key;
      break;
    }
  }

  // Extract medicine name: look for common prefixes
  const nameMatch = trimmed.match(
    /\b(?:Tab(?:let)?|Cap(?:sule)?|Syp(?:rup)?|Inj(?:ection)?|Drops?|Inhaler|Cream|Gel|Oint(?:ment)?|Spray)\s+([A-Za-z][A-Za-z0-9\-\/\s]{1,30})/i,
  );
  if (nameMatch) {
    entry.medicineName = nameMatch[1].trim();
  } else {
    // Try to get the first capitalized word sequence
    const capMatch = trimmed.match(/\b([A-Z][a-zA-Z]{2,}(?:\s+[A-Z]?[a-zA-Z]+)*)\b/);
    if (capMatch) {
      entry.medicineName = capMatch[1].trim();
    }
  }

  // Clean up medicine name from trailing dosage info
  entry.medicineName = entry.medicineName
    .replace(/\d+\s*(mg|ml|mcg|gm|g|iu|units?)\b.*$/i, '')
    .replace(/\s+(BD|TDS|OD|QDS|HS|PRN|AC|PC|STAT|SOS|BID|QID)\b.*$/i, '')
    .trim();

  if (entry.medicineName === '' || entry.medicineName === 'Unknown') {
    return null;
  }

  return entry;
}

export function analyzePrescription(
  prescriptionText: string,
  language: Language,
): PrescriptionAnalysis {
  const lines = prescriptionText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const medicines: MedicineEntry[] = [];
  const uncertainFields: string[] = [];
  const verificationWarnings: string[] = [];

  for (const line of lines) {
    const parsed = parseLine(line);
    if (!parsed) continue;

    const medUncertain: string[] = [];
    const fields: (keyof ParsedMedicine)[] = [
      'medicineName',
      'strength',
      'dose',
      'frequency',
      'route',
      'duration',
    ];

    for (const field of fields) {
      if (detectUncertain(parsed[field])) {
        const displayValue = parsed[field] === 'Unknown' ? 'Unknown' : parsed[field];
        if (displayValue === 'Unknown') {
          medUncertain.push(`${parsed.medicineName}: ${field}`);
        }
      }
    }

    uncertainFields.push(...medUncertain);

    // Build warnings for uncertain critical fields
    if (detectUncertain(parsed.strength)) {
      verificationWarnings.push(
        language === 'hi'
          ? `${parsed.medicineName} ki strength padhi nahi ja saki. Jab tak pharmacist confirm na kare, yeh dawai na lein.`
          : `The strength of ${parsed.medicineName} is unreadable. Do not take this medicine until a pharmacist confirms the correct strength.`,
      );
    }
    if (detectUncertain(parsed.dose)) {
      verificationWarnings.push(
        language === 'hi'
          ? `${parsed.medicineName} ki dose clear nahi hai. Doctor ya pharmacist se verify karein.`
          : `The dose of ${parsed.medicineName} is unclear. Verify with a doctor or pharmacist.`,
      );
    }
    if (detectUncertain(parsed.frequency)) {
      verificationWarnings.push(
        language === 'hi'
          ? `${parsed.medicineName} kab lena hai ye clear nahi hai. Doctor ya pharmacist se verify karein.`
          : `How often to take ${parsed.medicineName} is unclear. Verify with a doctor or pharmacist.`,
      );
    }

    medicines.push({
      medicineName: parsed.medicineName,
      strength: detectUncertain(parsed.strength) ? 'Unknown' : parsed.strength,
      dose: detectUncertain(parsed.dose) ? 'Unknown' : parsed.dose,
      frequency: detectUncertain(parsed.frequency)
        ? 'Unknown'
        : translateFrequency(parsed.frequency, language),
      route: detectUncertain(parsed.route)
        ? 'Unknown'
        : translateRoute(parsed.route, language),
      duration: detectUncertain(parsed.duration) ? 'Unknown' : parsed.duration,
      simpleExplanation: buildSimpleExplanation(parsed, language),
    });
  }

  const summary =
    language === 'hi'
      ? medicines.length > 0
        ? `Is prescription mein ${medicines.length} dawai${medicines.length > 1 ? 'ya' : ''} hai. Nimn details dekhein.`
        : 'Koi dawai clearly identify nahi ho saki. Kripya doctor ya pharmacist se verify karein.'
      : medicines.length > 0
        ? `This prescription contains ${medicines.length} medicine${medicines.length > 1 ? 's' : ''}. See the details below.`
        : 'No medicines could be clearly identified. Please verify with a doctor or pharmacist.';

  const safetyNotice = language === 'hi' ? SAFETY_NOTICE_HI : SAFETY_NOTICE_EN;

  return {
    summary,
    medicines,
    uncertainFields,
    verificationWarnings,
    safetyNotice,
    language,
    analyzedAt: new Date().toISOString(),
  };
}
