import {
  Upload,
  ScanText,
  Edit3,
  Sparkles,
  FileSearch,
  Download,
  ArrowRight,
  ShieldCheck,
  Brain,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import type { PageId } from '@/components/Header';

interface HowItWorksPageProps {
  onNavigate: (page: PageId) => void;
}

export function HowItWorksPage({ onNavigate }: HowItWorksPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-4 shadow-lg shadow-teal-500/20">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
          How It Works
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          From prescription image to patient-friendly explanation — here is the complete
          process, step by step.
        </p>
      </div>

      {/* Process steps */}
      <div className="space-y-6 mb-12">
        <ProcessStep
          num="1"
          icon={Upload}
          title="Upload or Type Prescription"
          description="You can either upload a photo of your prescription (PNG, JPEG, WebP, or BMP format, up to 10 MB) or type the prescription text manually into the text box."
          details={[
            'File is validated for type and size',
            'Image preview is shown before processing',
            'No image data leaves your browser',
          ]}
        />

        <ProcessStep
          num="2"
          icon={ScanText}
          title="OCR Text Extraction"
          description="If you uploaded an image, Tesseract OCR (running entirely in your browser) scans the image and extracts the readable text. A confidence score is shown so you know how reliable the extraction is."
          details={[
            'OCR works best on printed/typed prescriptions',
            'Handwritten text may produce poor results',
            'A progress bar shows extraction status',
          ]}
        />

        <ProcessStep
          num="3"
          icon={Edit3}
          title="Review & Edit Text"
          description="The extracted text appears in an editable text box. You can — and should — review and correct any OCR mistakes before generating the explanation. This is a critical step for accuracy."
          details={[
            'Fix any spelling or formatting errors',
            'Each medicine should be on a separate line',
            'You can also switch to manual entry mode',
          ]}
        />

        <ProcessStep
          num="4"
          icon={Sparkles}
          title="RICE Analysis"
          description="When you click Generate Explanation, the RICE prompt engine processes the text. It identifies each medicine, extracts structured fields (name, strength, dose, frequency, route, duration), and creates a plain-language explanation."
          details={[
            'Role: Prescription Explanation Assistant',
            'Instructions: Never guess, mark unclear as Unknown',
            'Context: Your reviewed text + selected language',
            'Examples: Safe patterns guide the output',
          ]}
        />

        <ProcessStep
          num="5"
          icon={FileSearch}
          title="View Structured Results"
          description="The results page shows a summary, each medicine with all its details, a simple-language explanation, uncertain fields flagged in amber, verification warnings in red, and a safety notice."
          details={[
            'Unknown fields are clearly marked',
            'Verification warnings highlight risks',
            'Safety notice is always included',
          ]}
        />

        <ProcessStep
          num="6"
          icon={Download}
          title="Download or Print"
          description="You can download the complete explanation as a text file or print it directly from your browser. The printed version is formatted cleanly without navigation elements."
          details={[
            'Download creates a formatted .txt file',
            'Print uses a clean, paper-friendly layout',
            'Share with your doctor or pharmacist',
          ]}
        />
      </div>

      {/* RICE deep dive */}
      <div className="bg-gradient-to-br from-slate-50 to-teal-50 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <Brain className="w-6 h-6 text-teal-600" />
          The RICE Prompt in Action
        </h2>

        <div className="space-y-5">
          <RiceDeepDive
            letter="R"
            title="Role Definition"
            code={`You are a Prescription Explanation Assistant.
Your role is to help patients understand what is
written on their doctor's prescription by translating
medical terminology into plain, patient-friendly
language. You do NOT diagnose, prescribe, recommend
substitutions, or alter any dosage.`}
          />
          <RiceDeepDive
            letter="I"
            title="Instructions"
            code={`1. Read the prescription text carefully.
2. Extract: Name, Strength, Dose, Frequency,
   Route, Duration — exactly as written.
3. Write a simple-language explanation.
4. Missing/unreadable fields → "Unknown"
5. NEVER guess or invent values.
6. Do NOT diagnose or recommend.
7. Flag conflicts as verification warnings.
8. Always include a safety notice.
9. Return valid JSON.`}
          />
          <RiceDeepDive
            letter="C"
            title="Context"
            code={`Prescription Text:
"""
Tab Metformin 500mg - 1 tab twice daily
after food for 30 days
Syp Cefixime ??mg - 5ml BD
"""

Selected Language: English`}
          />
          <RiceDeepDive
            letter="E"
            title="Examples"
            code={`Example 1:
Input: "Tab Metformin 500mg - 1 tab BD"
Output: {
  "medicineName": "Metformin",
  "strength": "500mg",
  "dose": "1 tablet",
  "frequency": "Twice daily (BD)",
  "simpleExplanation": "Take one 500mg tablet
    by mouth, two times a day."
}

Example 2:
Input: "Syp Cefixime ??mg - 5ml BD"
Output: {
  "medicineName": "Cefixime",
  "strength": "Unknown",
  "verificationWarnings": [
    "Strength unreadable — verify with pharmacist"
  ]
}`}
          />
        </div>
      </div>

      {/* Safety rules */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-teal-600" />
          Safety Rules Enforced
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <SafetyRule icon={CheckCircle} text="Missing values are marked Unknown — never guessed" />
          <SafetyRule icon={CheckCircle} text="Unclear fields are flagged for verification" />
          <SafetyRule icon={CheckCircle} text="Safety notice is always included" />
          <SafetyRule icon={CheckCircle} text="Medical abbreviations are translated to plain language" />
          <SafetyRule icon={AlertTriangle} text="Does NOT diagnose any illness" />
          <SafetyRule icon={AlertTriangle} text="Does NOT prescribe or recommend medicines" />
          <SafetyRule icon={AlertTriangle} text="Does NOT suggest medicine substitutions" />
          <SafetyRule icon={AlertTriangle} text="Does NOT change or adjust any dosage" />
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl p-10">
        <h2 className="text-2xl font-bold text-white mb-3">Ready to Try It?</h2>
        <p className="text-teal-100 mb-6 max-w-md mx-auto">
          Upload a prescription or type the text and see the RICE framework in action.
        </p>
        <button
          onClick={() => onNavigate('explainer')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-teal-600 font-bold hover:bg-teal-50 active:scale-95 transition-all shadow-lg"
        >
          Go to Explainer
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function ProcessStep({
  num,
  icon: Icon,
  title,
  description,
  details,
}: {
  num: string;
  icon: typeof Upload;
  title: string;
  description: string;
  details: string[];
}) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20 flex-shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="w-px h-full bg-slate-200 mt-2" />
      </div>
      <div className="flex-1 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">STEP {num}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">{description}</p>
        <ul className="space-y-1.5">
          {details.map((detail, i) => (
            <li key={i} className="text-sm text-slate-500 flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function RiceDeepDive({ letter, title, code }: { letter: string; title: string; code: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-100">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{letter}</span>
        </div>
        <h4 className="font-semibold text-slate-800">{title}</h4>
      </div>
      <pre className="bg-slate-900 rounded-lg p-4 text-xs text-slate-300 overflow-x-auto font-mono leading-relaxed">
        {code}
      </pre>
    </div>
  );
}

function SafetyRule({ icon: Icon, text }: { icon: typeof CheckCircle; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${text.includes('NOT') ? 'text-amber-500' : 'text-emerald-500'}`} />
      <p className="text-sm text-slate-600">{text}</p>
    </div>
  );
}
