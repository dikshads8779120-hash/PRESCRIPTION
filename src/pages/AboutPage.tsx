import {
  User,
  ClipboardList,
  FileText,
  Lightbulb,
  ShieldAlert,
  Stethoscope,
  Target,
  BookOpen,
  Code,
  GraduationCap,
} from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-4 shadow-lg shadow-teal-500/20">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
          About This Project
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          A BCA college project demonstrating the RICE prompt engineering framework for
          making prescriptions understandable to everyone.
        </p>
      </div>

      {/* Project overview */}
      <Section icon={Target} title="Project Objective">
        <p>
          The Prescription Explainer Using Prompt Engineering (RICE Model) is a web
          application that helps patients understand what is written on their doctor's
          prescription. Users can upload a prescription image or type the text manually.
          The system uses OCR (Optical Character Recognition) to read text from images
          and then applies the RICE prompt engineering framework to generate a structured,
          easy-to-understand explanation in English or Hindi.
        </p>
      </Section>

      {/* RICE explanation */}
      <Section icon={Code} title="What is the RICE Model?">
        <p>
          RICE is a prompt engineering framework that structures how we communicate with
          an AI model. Each letter stands for a key component:
        </p>
        <div className="space-y-4 mt-4">
          <RiceExplanation
            letter="R"
            title="Role"
            description="We define the AI's role as a Prescription Explanation Assistant. It is instructed to explain prescriptions in patient-friendly language — not to act as a doctor, diagnose, or prescribe."
          />
          <RiceExplanation
            letter="I"
            title="Instructions"
            description="Clear rules are given: preserve written information exactly, never invent missing values (mark them as Unknown), do not diagnose or recommend substitutions, and always include safety warnings."
          />
          <RiceExplanation
            letter="C"
            title="Context"
            description="The reviewed prescription text and the selected language (English or Hindi) are provided so the system can generate an accurate, relevant response."
          />
          <RiceExplanation
            letter="E"
            title="Examples"
            description="Safe examples of correct explanations are included in the prompt. These show the system how to explain instructions clearly and how to flag uncertain or unreadable medicine names."
          />
        </div>
      </Section>

      {/* Output fields */}
      <Section icon={ClipboardList} title="What the System Outputs">
        <p>For each medicine on the prescription, the system provides:</p>
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <OutputField label="Summary" description="A one-sentence overview of the prescription" />
          <OutputField label="Medicine Name" description="As written on the prescription" />
          <OutputField label="Strength" description="Dosage strength (e.g., 500mg)" />
          <OutputField label="Dose" description="How much to take (e.g., 1 tablet)" />
          <OutputField label="Frequency" description="How often (e.g., twice daily)" />
          <OutputField label="Route" description="How to take it (e.g., oral/by mouth)" />
          <OutputField label="Duration" description="How long to take it" />
          <OutputField label="Simple Explanation" description="Plain-language summary of the instruction" />
          <OutputField label="Uncertain Fields" description="Fields that were unreadable or missing" />
          <OutputField label="Verification Warnings" description="Items needing professional confirmation" />
          <OutputField label="Safety Notice" description="Reminder to verify with a professional" />
        </div>
      </Section>

      {/* Technology */}
      <Section icon={Code} title="Technology Stack">
        <div className="grid sm:grid-cols-2 gap-3">
          <TechItem name="React + TypeScript" description="Frontend framework" />
          <TechItem name="Tailwind CSS" description="Styling and responsive design" />
          <TechItem name="Tesseract.js" description="In-browser OCR for text extraction" />
          <TechItem name="RICE Prompt Engine" description="Custom prescription analysis engine" />
          <TechItem name="Lucide React" description="Icon library" />
          <TechItem name="Vite" description="Build tool and dev server" />
        </div>
      </Section>

      {/* Safety */}
      <Section icon={ShieldAlert} title="Medical Safety & Privacy">
        <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-5">
          <ul className="space-y-3 text-sm text-rose-800">
            <SafetyItem text="This application explains prescriptions — it does NOT replace a doctor or pharmacist." />
            <SafetyItem text="It does not diagnose illnesses, prescribe medicines, recommend substitutions, or change doses." />
            <SafetyItem text="Unclear or conflicting instructions are flagged for professional verification." />
            <SafetyItem text="Prescription text is treated as untrusted data and validated before display." />
            <SafetyItem text="All OCR processing happens in your browser — prescription images are not uploaded to any server." />
            <SafetyItem text="Missing or unreadable values are marked as Unknown — the system never guesses." />
          </ul>
        </div>
      </Section>

      {/* Academic context */}
      <Section icon={GraduationCap} title="Academic Context">
        <p>
          This project is part of a Bachelor of Computer Applications (BCA) curriculum.
          It demonstrates practical application of prompt engineering concepts, OCR
          integration, web development, and medical safety considerations in software
          design. The RICE framework (Role, Instructions, Context, Examples) is a
          structured approach to prompt engineering that produces consistent, safe,
          and reliable AI outputs.
        </p>
      </Section>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: typeof Target; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
          <Icon className="w-5 h-5 text-teal-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      </div>
      <div className="bg-white rounded-2xl border-2 border-slate-100 p-6 text-slate-600 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function RiceExplanation({ letter, title, description }: { letter: string; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md shadow-teal-500/20">
        <span className="text-xl font-bold text-white">{letter}</span>
      </div>
      <div>
        <h4 className="font-semibold text-slate-800 mb-1">{title}</h4>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function OutputField({ label, description }: { label: string; description: string }) {
  return (
    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
      <p className="font-semibold text-slate-800 text-sm">{label}</p>
      <p className="text-xs text-slate-500 mt-0.5">{description}</p>
    </div>
  );
}

function TechItem({ name, description }: { name: string; description: string }) {
  return (
    <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3 border border-slate-100">
      <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0" />
      <div>
        <p className="font-semibold text-slate-800 text-sm">{name}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function SafetyItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-500" />
      <span>{text}</span>
    </li>
  );
}
