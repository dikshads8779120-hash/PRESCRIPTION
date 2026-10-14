import { Download, Printer, FileText } from 'lucide-react';
import type { PrescriptionAnalysis } from '@/lib/types';
import { downloadAsText, printAnalysis } from '@/lib/download';
import { AlertTriangle, ShieldCheck, ShieldAlert, Pill, Clock, Activity, MapPin, Calendar, FileText as FileTextIcon } from 'lucide-react';

interface ResultsDisplayProps {
  analysis: PrescriptionAnalysis;
}

export function ResultsDisplay({ analysis }: ResultsDisplayProps) {
  const isHindi = analysis.language === 'hi';

  return (
    <div className="space-y-6">
      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 print:hidden">
        <button
          onClick={() => downloadAsText(analysis)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 active:scale-95 transition-all shadow-md shadow-teal-600/20"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
        <button
          onClick={printAnalysis}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border-2 border-slate-200 text-slate-700 text-sm font-semibold hover:border-teal-300 hover:text-teal-700 active:scale-95 transition-all"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-100 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center flex-shrink-0">
            <FileTextIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-teal-700 uppercase tracking-wider mb-1">
              {isHindi ? 'सारांश (Summary)' : 'Summary'}
            </h3>
            <p className="text-slate-700 leading-relaxed">{analysis.summary}</p>
          </div>
        </div>
      </div>

      {/* Medicines */}
      {analysis.medicines.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Pill className="w-5 h-5 text-teal-600" />
            {isHindi ? `दवाइयां (${analysis.medicines.length})` : `Medicines (${analysis.medicines.length})`}
          </h3>
          {analysis.medicines.map((med, i) => (
            <div
              key={i}
              className="bg-white border-2 border-slate-200 rounded-2xl p-5 hover:border-teal-200 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                  {i + 1}
                </div>
                <h4 className="text-lg font-bold text-slate-800">{med.medicineName}</h4>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                <InfoField icon={Activity} label="Strength" value={med.strength} />
                <InfoField icon={Pill} label="Dose" value={med.dose} />
                <InfoField icon={Clock} label="Frequency" value={med.frequency} />
                <InfoField icon={MapPin} label="Route" value={med.route} />
                <InfoField icon={Calendar} label="Duration" value={med.duration} />
              </div>

              <div className="bg-sky-50 border border-sky-100 rounded-xl p-3">
                <p className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-1">
                  {isHindi ? 'आसान भाषा में समझ' : 'Simple Explanation'}
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">{med.simpleExplanation}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 text-center">
          <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <p className="text-amber-800 font-medium">
            {isHindi
              ? 'कोई दवाई स्पष्ट रूप से पहचानी नहीं जा सकी। कृपया डॉक्टर या फार्मासिस्ट से सत्यापित करें।'
              : 'No medicines could be clearly identified. Please verify with a doctor or pharmacist.'}
          </p>
        </div>
      )}

      {/* Uncertain fields */}
      {analysis.uncertainFields.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-amber-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {isHindi ? 'अनिश्चित फ़ील्ड (Uncertain Fields)' : 'Uncertain Fields'}
          </h3>
          <ul className="space-y-1.5">
            {analysis.uncertainFields.map((field, i) => (
              <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                {field}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Verification warnings */}
      {analysis.verificationWarnings.length > 0 && (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-rose-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            {isHindi ? 'सत्यापन चेतावनी (Verification Warnings)' : 'Verification Warnings'}
          </h3>
          <ul className="space-y-2">
            {analysis.verificationWarnings.map((warning, i) => (
              <li key={i} className="text-sm text-rose-800 flex items-start gap-2">
                <span className="text-rose-500 mt-0.5 font-bold">!</span>
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Safety notice */}
      <div className="bg-slate-800 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider mb-1">
              {isHindi ? 'सुरक्षा सूचना (Safety Notice)' : 'Safety Notice'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{analysis.safetyNotice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoField({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Pill;
  label: string;
  value: string;
}) {
  const isUnknown = value === 'Unknown' || !value;
  return (
    <div className={`rounded-lg p-3 ${isUnknown ? 'bg-amber-50 border border-amber-100' : 'bg-slate-50 border border-slate-100'}`}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className={`w-3.5 h-3.5 ${isUnknown ? 'text-amber-500' : 'text-slate-400'}`} />
        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{label}</span>
      </div>
      <p className={`text-sm font-semibold ${isUnknown ? 'text-amber-600 italic' : 'text-slate-700'}`}>
        {isUnknown ? 'Unknown' : value}
      </p>
    </div>
  );
}
