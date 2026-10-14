import {
  FileSearch,
  Languages,
  ShieldCheck,
  ScanText,
  ArrowRight,
  Brain,
  Eye,
  Download,
  Stethoscope,
  AlertCircle,
} from 'lucide-react';
import type { PageId } from '@/components/Header';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-sm font-medium mb-6">
                <Brain className="w-4 h-4" />
                RICE Prompt Engineering Framework
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Understand Your{' '}
                <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Prescription
                </span>{' '}
                in Simple Language
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
                Upload a prescription image or type the text. Our system uses OCR to read
                it and the RICE prompt engineering model to explain every medicine, dose,
                and instruction in plain English or Hindi.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('explainer')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-400 active:scale-95 transition-all shadow-lg shadow-teal-500/30 text-base"
                >
                  <FileSearch className="w-5 h-5" />
                  Try the Explainer
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white font-semibold hover:bg-white/20 active:scale-95 transition-all text-base"
                >
                  How It Works
                </button>
              </div>
            </div>

            {/* Hero visual card */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/30 flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-teal-300" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Sample Analysis</p>
                      <p className="text-slate-400 text-xs">Prescription Explanation Output</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-teal-300 text-xs font-medium uppercase tracking-wider mb-1">Medicine 1</p>
                      <p className="text-white font-semibold">Metformin 500mg</p>
                      <p className="text-slate-300 text-sm mt-1">
                        Take 1 tablet by mouth, twice daily after food, for 30 days.
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-teal-300 text-xs font-medium uppercase tracking-wider mb-1">Medicine 2</p>
                      <p className="text-white font-semibold">Cefixime Syrup</p>
                      <div className="flex items-center gap-2 mt-1">
                        <AlertCircle className="w-4 h-4 text-amber-400" />
                        <p className="text-amber-300 text-sm">Strength unreadable — verify with pharmacist</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    <p className="text-slate-400 text-xs">
                      Safety verified — for understanding only
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Everything You Need to Understand Prescriptions
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Built with the RICE prompt engineering framework for accurate, safe, and
            patient-friendly prescription explanations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={ScanText}
            title="OCR Text Extraction"
            description="Upload a prescription photo and Tesseract OCR reads the text right in your browser — no data sent to any server."
            color="teal"
          />
          <FeatureCard
            icon={Brain}
            title="RICE Prompt Model"
            description="Role, Instructions, Context, and Examples — a structured prompt engineering framework that produces consistent, safe explanations."
            color="cyan"
          />
          <FeatureCard
            icon={Languages}
            title="English & Hindi"
            description="Choose your preferred language and get the entire explanation — summary, medicine details, and safety notices — in that language."
            color="blue"
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Safety First"
            description="Unclear fields are flagged as Unknown. Verification warnings alert you to check with a professional. Never guesses or invents values."
            color="emerald"
          />
        </div>
      </section>

      {/* RICE Framework Section */}
      <section className="bg-gradient-to-br from-slate-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              The RICE Framework
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Four structured components that ensure every prescription explanation is
              accurate, safe, and easy to understand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RiceCard
              letter="R"
              title="Role"
              description="Defines the AI as a Prescription Explanation Assistant — not a doctor, not a pharmacist. It explains, it does not diagnose."
            />
            <RiceCard
              letter="I"
              title="Instructions"
              description="Clear rules: preserve written information, never invent missing values, do not prescribe, and always include safety warnings."
            />
            <RiceCard
              letter="C"
              title="Context"
              description="The reviewed prescription text and the patient's selected language are supplied so the response is relevant and accurate."
            />
            <RiceCard
              letter="E"
              title="Examples"
              description="Safe examples show the system how to explain instructions and flag unclear medicine names — guiding consistent output."
            />
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Simple Three-Step Process
            </h2>
            <div className="space-y-6">
              <StepRow
                num="1"
                title="Upload or Type"
                description="Upload a prescription photo (PNG, JPEG, WebP) or type the prescription text manually. Choose English or Hindi."
              />
              <StepRow
                num="2"
                title="Review & Edit"
                description="OCR extracts text from your image. You can review and edit the extracted text before generating the explanation."
              />
              <StepRow
                num="3"
                title="Get Explanation"
                description="The RICE analyzer processes the text and produces a structured, patient-friendly explanation with safety warnings."
              />
            </div>
            <button
              onClick={() => onNavigate('explainer')}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 active:scale-95 transition-all shadow-lg shadow-teal-600/20"
            >
              Start Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FeatureHighlight icon={Eye} title="Editable Preview" description="Fix OCR mistakes before processing" />
            <FeatureHighlight icon={Download} title="Download & Print" description="Save or print the full report" />
            <FeatureHighlight icon={AlertCircle} title="Uncertainty Flags" description="Unclear fields marked as Unknown" />
            <FeatureHighlight icon={ShieldCheck} title="Safety Notices" description="Always reminds you to verify" />
          </div>
        </div>
      </section>
    </div>
  );
}

const colorMap = {
  teal: { bg: 'bg-teal-100', text: 'text-teal-600', group: 'group-hover:shadow-teal-500/30' },
  cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', group: 'group-hover:shadow-cyan-500/30' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', group: 'group-hover:shadow-blue-500/30' },
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', group: 'group-hover:shadow-emerald-500/30' },
};

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: typeof FileSearch;
  title: string;
  description: string;
  color: keyof typeof colorMap;
}) {
  const c = colorMap[color];
  return (
    <div className={`group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl ${c.group} transition-all hover:-translate-y-1`}>
      <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 ${c.text}`} />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

function RiceCard({ letter, title, description }: { letter: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 hover:border-teal-200 transition-colors text-center">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-4 shadow-lg shadow-teal-500/20">
        <span className="text-3xl font-bold text-white">{letter}</span>
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

function StepRow({ num, title, description }: { num: string; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-lg">
        {num}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-slate-800 mb-1">{title}</h4>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function FeatureHighlight({ icon: Icon, title, description }: { icon: typeof Eye; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-100 hover:shadow-md transition-shadow">
      <Icon className="w-6 h-6 text-teal-600 mb-3" />
      <h4 className="font-semibold text-slate-800 text-sm mb-1">{title}</h4>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
  );
}
