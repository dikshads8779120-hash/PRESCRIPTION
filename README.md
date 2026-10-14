# PrescripExplain — Prescription Explainer Using Prompt Engineering (RICE Model)

A BCA college project that helps patients understand doctor's prescriptions in simple English or Hindi using OCR and the RICE prompt engineering framework.

## What It Does

- Upload a prescription photo or type the text manually
- OCR (Tesseract.js) extracts text from the image — right in your browser
- The RICE prompt engine analyzes the text and produces a structured explanation
- Get details for each medicine: name, strength, dose, frequency, route, duration
- Unclear fields are marked as "Unknown" — never guessed
- Safety warnings and verification alerts are always included
- Download or print the complete explanation report
- Available in English and Hindi

## RICE Framework

| Letter | Component | Purpose |
|--------|-----------|---------|
| **R** | Role | Defines the AI as a Prescription Explanation Assistant — not a doctor |
| **I** | Instructions | Rules: never guess, mark unknowns, include safety notices |
| **C** | Context | The reviewed prescription text and selected language |
| **E** | Examples | Safe examples that guide consistent, correct output |

## Technology Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **OCR:** Tesseract.js (in-browser, no server needed)
- **Icons:** Lucide React
- **Prompt Engine:** Custom RICE-based analyzer (see `src/lib/`)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

The app runs on `http://localhost:5173` by default.

## Project Structure

```
prescripexplain/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx       # Navigation bar
│   │   ├── Footer.tsx       # Footer with safety info
│   │   ├── Alert.tsx        # Alert/notification boxes
│   │   └── ResultsDisplay.tsx # Structured results display
│   ├── pages/               # Page-level views
│   │   ├── HomePage.tsx     # Landing page with hero & features
│   │   ├── ExplainerPage.tsx# Main tool: upload, OCR, analyze
│   │   ├── AboutPage.tsx    # About the project
│   │   └── HowItWorksPage.tsx# Step-by-step guide
│   ├── lib/                 # Core logic libraries
│   │   ├── types.ts         # TypeScript type definitions
│   │   ├── rice-prompt.ts   # RICE prompt template builder
│   │   ├── analyzer.ts      # Prescription analysis engine
│   │   ├── ocr.ts           # OCR service (Tesseract.js)
│   │   └── download.ts      # Download & print utilities
│   ├── App.tsx              # Main app with navigation
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── docs/                    # Documentation
│   └── SRS.md               # Software Requirements Specification
├── index.html               # HTML template
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
└── tailwind.config.js       # Tailwind CSS config
```

## How to Use

1. Go to the **Explainer** page
2. Choose **Upload Image** or **Type Text**
3. Select your language (English or Hindi)
4. If uploading: click "Extract Text (OCR)" and wait for processing
5. Review and edit the extracted text
6. Click "Generate Explanation"
7. View the structured results with safety warnings
8. Download or print the report

## Safety Notice

This application is for **educational purposes only**. It is a BCA college project and does NOT:
- Diagnose illnesses
- Prescribe medicines
- Recommend medicine substitutions
- Change or adjust dosages

**Always consult a qualified doctor or pharmacist** before taking any medication.

## OCR Limitations

- Works best on **printed or typed** prescriptions
- **Handwritten** text may produce poor or no results
- Blurry or low-quality images reduce accuracy
- Always review and edit OCR output before generating the explanation

## License

This is an academic project for educational purposes.
