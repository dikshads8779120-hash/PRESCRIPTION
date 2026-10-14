export type Language = 'en' | 'hi';

export type OcrStatus = 'idle' | 'processing' | 'success' | 'error';

export type AnalysisStatus = 'idle' | 'processing' | 'success' | 'error';

export interface MedicineEntry {
  medicineName: string;
  strength: string;
  dose: string;
  frequency: string;
  route: string;
  duration: string;
  simpleExplanation: string;
}

export interface PrescriptionAnalysis {
  summary: string;
  medicines: MedicineEntry[];
  uncertainFields: string[];
  verificationWarnings: string[];
  safetyNotice: string;
  language: Language;
  analyzedAt: string;
}

export interface OcrResult {
  text: string;
  confidence: number;
  status: OcrStatus;
  error?: string;
}

export interface RicePromptParts {
  role: string;
  instructions: string;
  context: string;
  examples: string;
  fullPrompt: string;
}

export interface NavigationPage {
  id: string;
  label: string;
  path: string;
}
