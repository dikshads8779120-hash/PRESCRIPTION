import type { PrescriptionAnalysis } from './types';

export function downloadAsText(analysis: PrescriptionAnalysis): void {
  const text = formatAnalysisAsText(analysis);
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `prescription-explanation-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function formatAnalysisAsText(analysis: PrescriptionAnalysis): string {
  const lines: string[] = [];
  const sep = '='.repeat(60);

  lines.push(sep);
  lines.push('  PRESCRIPTION EXPLANATION REPORT');
  lines.push(`  Generated: ${new Date(analysis.analyzedAt).toLocaleString()}`);
  lines.push(sep);
  lines.push('');
  lines.push(`Summary: ${analysis.summary}`);
  lines.push('');

  if (analysis.medicines.length > 0) {
    analysis.medicines.forEach((med, i) => {
      lines.push(`--- Medicine ${i + 1} ---`);
      lines.push(`  Name:           ${med.medicineName}`);
      lines.push(`  Strength:       ${med.strength}`);
      lines.push(`  Dose:           ${med.dose}`);
      lines.push(`  Frequency:      ${med.frequency}`);
      lines.push(`  Route:          ${med.route}`);
      lines.push(`  Duration:       ${med.duration}`);
      lines.push(`  Explanation:    ${med.simpleExplanation}`);
      lines.push('');
    });
  }

  if (analysis.uncertainFields.length > 0) {
    lines.push('--- Uncertain Fields ---');
    analysis.uncertainFields.forEach((f) => lines.push(`  - ${f}`));
    lines.push('');
  }

  if (analysis.verificationWarnings.length > 0) {
    lines.push('--- Verification Warnings ---');
    analysis.verificationWarnings.forEach((w) => lines.push(`  ! ${w}`));
    lines.push('');
  }

  lines.push('--- Safety Notice ---');
  lines.push(`  ${analysis.safetyNotice}`);
  lines.push('');
  lines.push(sep);
  lines.push('  This explanation is for understanding only.');
  lines.push('  Always verify with a qualified healthcare professional.');
  lines.push(sep);

  return lines.join('\n');
}

export function printAnalysis(): void {
  window.print();
}
