import { useState, useRef, useCallback } from 'react';
import {
  Upload,
  ScanText,
  Languages,
  FileSearch,
  Loader2,
  AlertCircle,
  Edit3,
  Sparkles,
  RotateCcw,
  Image as ImageIcon,
  Type,
} from 'lucide-react';
import type { Language, OcrResult, AnalysisStatus, PrescriptionAnalysis } from '@/lib/types';
import { validateImageFile, extractTextFromImage } from '@/lib/ocr';
import { analyzePrescription } from '@/lib/analyzer';
import { Alert } from '@/components/Alert';
import { ResultsDisplay } from '@/components/ResultsDisplay';

type InputMode = 'upload' | 'manual';

export function ExplainerPage() {
  const [inputMode, setInputMode] = useState<InputMode>('upload');
  const [language, setLanguage] = useState<Language>('en');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [prescriptionText, setPrescriptionText] = useState('');
  const [analysis, setAnalysis] = useState<PrescriptionAnalysis | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    setError(null);
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }
    setSelectedFile(file);
    setAnalysis(null);
    setOcrResult(null);
    setPrescriptionText('');
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const runOcr = async () => {
    if (!selectedFile) return;
    setOcrProgress(0);
    setOcrResult(null);
    setError(null);
    setAnalysis(null);

    setOcrResult({ text: '', confidence: 0, status: 'processing' });

    const result = await extractTextFromImage(selectedFile, (p) => setOcrProgress(p));

    setOcrResult(result);
    if (result.status === 'success' && result.text) {
      setPrescriptionText(result.text);
    }
  };

  const runAnalysis = () => {
    const text = prescriptionText.trim();
    if (!text) {
      setError('Please enter or extract some prescription text first.');
      return;
    }
    setError(null);
    setAnalysisStatus('processing');
    setAnalysis(null);

    // Simulate processing for UX feedback
    setTimeout(() => {
      try {
        const result = analyzePrescription(text, language);
        setAnalysis(result);
        setAnalysisStatus('success');
      } catch (err) {
        setAnalysisStatus('error');
        setError(
          `Analysis failed: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again.`,
        );
      }
    }, 800);
  };

  const reset = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setOcrResult(null);
    setPrescriptionText('');
    setAnalysis(null);
    setAnalysisStatus('idle');
    setError(null);
    setOcrProgress(0);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
          Prescription Explainer
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Upload a prescription image or type the text. Get a clear, structured explanation
          using the RICE prompt engineering framework.
        </p>
      </div>

      {/* Language selector */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-slate-200">
          <Languages className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-500 font-medium">Language:</span>
        </div>
        <div className="inline-flex rounded-xl border-2 border-slate-200 overflow-hidden">
          <button
            onClick={() => setLanguage('en')}
            className={`px-5 py-2 text-sm font-semibold transition-all ${
              language === 'en' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={`px-5 py-2 text-sm font-semibold transition-all ${
              language === 'hi' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            हिंदी (Hindi)
          </button>
        </div>
      </div>

      {/* Input mode toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-xl bg-slate-100 p-1">
          <button
            onClick={() => { setInputMode('upload'); reset(); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              inputMode === 'upload' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Upload Image
          </button>
          <button
            onClick={() => { setInputMode('manual'); reset(); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              inputMode === 'manual' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Type className="w-4 h-4" />
            Type Text
          </button>
        </div>
      </div>

      {error && (
        <Alert variant="error" title="Error" className="mb-6">
          {error}
        </Alert>
      )}

      {/* Upload mode */}
      {inputMode === 'upload' && (
        <div className="space-y-6">
          {!imagePreview && (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className="border-3 border-dashed border-slate-300 rounded-2xl p-12 text-center cursor-pointer hover:border-teal-400 hover:bg-teal-50/50 transition-all"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-100 flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-teal-600" />
              </div>
              <p className="text-lg font-semibold text-slate-700 mb-1">
                Drop your prescription image here
              </p>
              <p className="text-sm text-slate-400">
                or click to browse — PNG, JPEG, WebP, BMP (max 10 MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/bmp"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          )}

          {imagePreview && (
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-shrink-0">
                  <img
                    src={imagePreview}
                    alt="Prescription preview"
                    className="w-full sm:w-48 h-48 object-cover rounded-xl border border-slate-200"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">{selectedFile?.name}</p>
                    <p className="text-sm text-slate-400">
                      {(selectedFile ? selectedFile.size / 1024 / 1024 : 0).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button
                      onClick={runOcr}
                      disabled={ocrResult?.status === 'processing'}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-teal-600/20"
                    >
                      {ocrResult?.status === 'processing' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Extracting Text... {ocrProgress}%
                        </>
                      ) : (
                        <>
                          <ScanText className="w-4 h-4" />
                          Extract Text (OCR)
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border-2 border-slate-200 text-slate-700 text-sm font-semibold hover:border-slate-300 active:scale-95 transition-all"
                    >
                      <Upload className="w-4 h-4" />
                      Change Image
                    </button>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-slate-500 text-sm font-semibold hover:bg-slate-100 active:scale-95 transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp,image/bmp"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* OCR progress bar */}
              {ocrResult?.status === 'processing' && (
                <div className="mt-4">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300"
                      style={{ width: `${ocrProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* OCR result info */}
          {ocrResult?.status === 'success' && (
            <Alert variant="info" className="">
              <p>
                <strong>OCR completed</strong> with {ocrResult.confidence}% confidence. Review and
                edit the extracted text below before generating the explanation.
              </p>
            </Alert>
          )}
          {ocrResult?.status === 'error' && (
            <Alert variant="warning" title="OCR Issue">
              {ocrResult.error}
            </Alert>
          )}
        </div>
      )}

      {/* Manual mode */}
      {inputMode === 'manual' && (
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Edit3 className="w-4 h-4 text-teal-600" />
            <h3 className="font-semibold text-slate-800">Enter Prescription Text</h3>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            Type the text exactly as written on the prescription. Put each medicine on a new line.
          </p>
          <textarea
            value={prescriptionText}
            onChange={(e) => { setPrescriptionText(e.target.value); setAnalysis(null); }}
            placeholder="Example:&#10;Tab Metformin 500mg - 1 tab twice daily after food for 30 days&#10;Syp Cefixime 200mg - 5ml BD for 5 days&#10;Tab Pantoprazole 40mg - 1 tab OD before breakfast"
            rows={8}
            className="w-full rounded-xl border-2 border-slate-200 p-4 text-sm text-slate-700 font-mono focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all resize-y"
          />
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={() => setPrescriptionText(SAMPLE_PRESCRIPTION)}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              Load Sample Prescription
            </button>
            <span className="text-xs text-slate-400">{prescriptionText.length} characters</span>
          </div>
        </div>
      )}

      {/* Editable text area (shown after OCR or in manual mode) */}
      {(ocrResult?.status === 'success' || (inputMode === 'manual' && prescriptionText)) && (
        <div className="mt-6 bg-white border-2 border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Edit3 className="w-4 h-4 text-teal-600" />
            <h3 className="font-semibold text-slate-800">
              {inputMode === 'upload' ? 'Review & Edit Extracted Text' : 'Prescription Text'}
            </h3>
          </div>
          {inputMode === 'upload' && (
            <p className="text-sm text-slate-500 mb-4">
              OCR may make mistakes. Please review and correct any errors before generating
              the explanation.
            </p>
          )}
          <textarea
            value={prescriptionText}
            onChange={(e) => { setPrescriptionText(e.target.value); setAnalysis(null); }}
            placeholder="Prescription text will appear here after OCR..."
            rows={8}
            className="w-full rounded-xl border-2 border-slate-200 p-4 text-sm text-slate-700 font-mono focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all resize-y"
          />

          {/* Generate button */}
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={runAnalysis}
              disabled={analysisStatus === 'processing' || !prescriptionText.trim()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold hover:from-teal-700 hover:to-cyan-700 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-teal-600/20"
            >
              {analysisStatus === 'processing' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Explanation
                </>
              )}
            </button>
            {analysis && (
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-slate-200 text-slate-700 font-semibold hover:border-slate-300 active:scale-95 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Start Over
              </button>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      {analysis && analysisStatus === 'success' && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-6">
            <FileSearch className="w-5 h-5 text-teal-600" />
            <h2 className="text-2xl font-bold text-slate-800">Explanation Results</h2>
          </div>
          <ResultsDisplay analysis={analysis} />
        </div>
      )}

      {/* Safety disclaimer */}
      <div className="mt-12">
        <Alert variant="danger" title="Important Medical Disclaimer">
          <p>
            This tool is for educational purposes only and is part of a BCA college project.
            It does <strong>NOT</strong> diagnose illnesses, prescribe medicines, recommend
            substitutions, or change doses. Always consult a qualified doctor or pharmacist
            before taking any medication. If any information is unclear, do not act on it —
            seek professional verification.
          </p>
        </Alert>
      </div>
    </div>
  );
}

const SAMPLE_PRESCRIPTION = `Tab Metformin 500mg - 1 tab twice daily after food for 30 days
Tab Pantoprazole 40mg - 1 tab OD before breakfast for 15 days
Syp Cefixime 200mg - 5ml BD for 5 days
Tab Atorvastatin 10mg - 1 tab at night`;
