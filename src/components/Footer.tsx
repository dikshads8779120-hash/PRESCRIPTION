import { Stethoscope, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300 mt-20 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Prescrip<span className="text-teal-400">Explain</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              A BCA college project demonstrating the RICE prompt engineering framework
              for explaining doctor's prescriptions in simple language.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
              Safety Notice
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              This tool is for educational purposes only. It does NOT replace a doctor
              or pharmacist. Always verify prescriptions with a qualified healthcare
              professional.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
              Technology
            </h4>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>RICE Prompt Engineering Framework</li>
              <li>Tesseract OCR (in-browser)</li>
              <li>React + TypeScript + Tailwind CSS</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2026 PrescripExplain — BCA College Project. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            Built with <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> for education
          </p>
        </div>
      </div>
    </footer>
  );
}
