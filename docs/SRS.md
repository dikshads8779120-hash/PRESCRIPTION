# Software Requirements Specification (SRS)
## Prescription Explainer Using Prompt Engineering (RICE Model)

---

## 1. Introduction

### 1.1 Purpose

The purpose of this document is to define the software requirements for the Prescription Explainer application. This application helps patients understand the text written on a doctor's prescription by converting medical terminology into simple, patient-friendly language using the RICE prompt engineering framework.

### 1.2 Problem Statement

Many patients receive prescriptions from doctors that contain medical abbreviations and terminology they do not understand. Terms like "BD," "TDS," "OD," "HS," and "PRN" are confusing to non-medical users. This can lead to medication errors, non-compliance, and anxiety. There is a need for a tool that explains prescriptions in plain language without replacing professional medical advice.

### 1.3 Project Scope

The system will:
- Accept prescription images (upload) or manually typed text
- Extract text from images using OCR (Tesseract.js)
- Allow users to review and edit extracted text
- Analyze the prescription using the RICE prompt engineering framework
- Generate structured explanations in English or Hindi
- Flag uncertain or unreadable fields as "Unknown"
- Provide safety warnings and verification alerts
- Allow downloading and printing of the explanation report

The system will NOT:
- Diagnose illnesses
- Prescribe medicines
- Recommend medicine substitutions
- Change or adjust dosages
- Store prescription data permanently

### 1.4 Proposed System

A web-based application built with React, TypeScript, and Tailwind CSS. OCR is performed in-browser using Tesseract.js (no server-side processing required). The RICE prompt engine runs client-side, analyzing prescription text and producing structured JSON output that is rendered as a patient-friendly report.

---

## 2. Stakeholders and User Roles

| Role | Description |
|------|-------------|
| Patient | Primary user who wants to understand their prescription |
| Caregiver | Family member helping a patient understand medication instructions |
| Student | BCA student learning about prompt engineering and OCR integration |
| Evaluator | Faculty member evaluating the project for academic grading |

---

## 3. Functional Requirements

### 3.1 Input Requirements

| ID | Requirement |
|----|-------------|
| FR-01 | The system shall allow users to upload a prescription image (PNG, JPEG, WebP, BMP) |
| FR-02 | The system shall validate uploaded files for type and size (max 10 MB) |
| FR-03 | The system shall allow users to manually type prescription text |
| FR-04 | The system shall provide a language selector (English / Hindi) |
| FR-05 | The system shall provide a sample prescription for testing |

### 3.2 OCR Requirements

| ID | Requirement |
|----|-------------|
| FR-06 | The system shall extract text from uploaded images using Tesseract.js OCR |
| FR-07 | The system shall display a progress indicator during OCR processing |
| FR-08 | The system shall display a confidence score after OCR completion |
| FR-09 | The system shall display an error message if OCR fails or produces no text |
| FR-10 | The system shall allow users to edit the extracted text before analysis |

### 3.3 Analysis Requirements

| ID | Requirement |
|----|-------------|
| FR-11 | The system shall analyze prescription text using the RICE prompt framework |
| FR-12 | The system shall identify individual medicines from the text |
| FR-13 | For each medicine, the system shall extract: name, strength, dose, frequency, route, duration |
| FR-14 | The system shall generate a plain-language explanation for each medicine |
| FR-15 | The system shall mark unreadable or missing fields as "Unknown" |
| FR-16 | The system shall generate a summary of the prescription |
| FR-17 | The system shall identify and list uncertain fields |
| FR-18 | The system shall generate verification warnings for unclear critical fields |
| FR-19 | The system shall always include a safety notice |
| FR-20 | The system shall translate medical abbreviations (BD, TDS, OD, etc.) to plain language |

### 3.4 Output Requirements

| ID | Requirement |
|----|-------------|
| FR-21 | The system shall display results in a structured, card-based layout |
| FR-22 | The system shall allow users to download the report as a text file |
| FR-23 | The system shall allow users to print the report |
| FR-24 | The system shall display results in the selected language (English or Hindi) |

### 3.5 Navigation Requirements

| ID | Requirement |
|----|-------------|
| FR-25 | The system shall provide a Home page with project introduction |
| FR-26 | The system shall provide an Explainer page (main tool) |
| FR-27 | The system shall provide a How It Works page with step-by-step guide |
| FR-28 | The system shall provide an About page with project details |

---

## 4. Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-01 | The system shall be responsive across mobile, tablet, and desktop viewports |
| NFR-02 | The system shall use a medical-themed, professional color palette (teal/cyan) |
| NFR-03 | OCR processing shall occur entirely in the browser (no server upload) |
| NFR-04 | The system shall not store prescription images or text permanently |
| NFR-05 | The system shall display loading indicators during all async operations |
| NFR-06 | The system shall provide clear, user-friendly error messages |
| NFR-07 | The system shall include safety disclaimers on all relevant pages |
| NFR-08 | The system shall use readable fonts with sufficient contrast ratios |
| NFR-09 | The print layout shall exclude navigation elements |
| NFR-10 | The system shall load the OCR engine on-demand (not at page load) |

---

## 5. System Constraints and Assumptions

### Constraints
- OCR accuracy depends on image quality; handwritten prescriptions may not be readable
- The RICE analyzer uses rule-based parsing (not an external LLM API) for reliability
- The application runs entirely client-side with no backend server
- Browser support requires modern JavaScript (ES2020+)

### Assumptions
- Users have a modern browser with JavaScript enabled
- Uploaded images contain printed or typed text (not handwritten)
- Each medicine is written on a separate line in the prescription
- Users will review and edit OCR output before analysis

---

## 6. Use Cases

### UC-01: Upload and Analyze Prescription Image
1. User navigates to the Explainer page
2. User selects "Upload Image" mode
3. User uploads a prescription photo
4. User clicks "Extract Text (OCR)"
5. System extracts text and displays it in an editable text box
6. User reviews and edits the text
7. User selects language (English or Hindi)
8. User clicks "Generate Explanation"
9. System displays structured results with safety warnings

### UC-02: Manual Text Entry and Analysis
1. User navigates to the Explainer page
2. User selects "Type Text" mode
3. User enters prescription text manually
4. User selects language
5. User clicks "Generate Explanation"
6. System displays structured results

### UC-03: Download Report
1. User views the explanation results
2. User clicks "Download Report"
3. System generates a formatted text file and downloads it

### UC-04: Print Report
1. User views the explanation results
2. User clicks "Print"
3. Browser print dialog opens with a clean, formatted layout

---

## 7. RICE Prompt Engineering Design

### 7.1 Role (R)
The system is defined as a "Prescription Explanation Assistant" that translates medical terminology into patient-friendly language. It is explicitly instructed NOT to diagnose, prescribe, or recommend substitutions.

### 7.2 Instructions (I)
- Extract fields exactly as written
- Mark missing/unreadable values as "Unknown"
- Never guess or invent values
- Do not diagnose or prescribe
- Flag conflicts as verification warnings
- Always include a safety notice
- Return structured output

### 7.3 Context (C)
The reviewed prescription text and the selected language are provided as context.

### 7.4 Examples (E)
Two examples are included in the prompt template:
1. A clear prescription with all fields readable
2. A prescription with an unreadable strength field (demonstrating the "Unknown" pattern)

---

## 8. Data Model

### 8.1 PrescriptionAnalysis

| Field | Type | Description |
|-------|------|-------------|
| summary | string | One-sentence overview |
| medicines | MedicineEntry[] | List of identified medicines |
| uncertainFields | string[] | Fields that were unclear or missing |
| verificationWarnings | string[] | Items needing professional verification |
| safetyNotice | string | Safety reminder text |
| language | Language | Selected output language |
| analyzedAt | string | ISO timestamp |

### 8.2 MedicineEntry

| Field | Type | Description |
|-------|------|-------------|
| medicineName | string | Medicine name as written |
| strength | string | Dosage strength (e.g., 500mg) |
| dose | string | Amount to take (e.g., 1 tablet) |
| frequency | string | How often (translated to plain language) |
| route | string | How to take it (translated to plain language) |
| duration | string | How long to take it |
| simpleExplanation | string | Plain-language explanation |

---

## 9. Acceptance Criteria

| ID | Criteria |
|----|----------|
| AC-01 | User can upload a PNG/JPEG image and OCR extracts text |
| AC-02 | User can type prescription text manually |
| AC-03 | Extracted text is editable before analysis |
| AC-04 | System identifies medicines and extracts all 6 fields |
| AC-05 | Missing fields are marked as "Unknown" |
| AC-06 | Medical abbreviations are translated to plain language |
| AC-07 | Safety notice is always displayed |
| AC-08 | Verification warnings appear for unclear critical fields |
| AC-09 | Report can be downloaded as a text file |
| AC-10 | Report can be printed with a clean layout |
| AC-11 | English and Hindi language outputs work correctly |
| AC-12 | Application is responsive on mobile, tablet, and desktop |

---

## 10. Privacy and Safety Requirements

| ID | Requirement |
|----|-------------|
| PS-01 | Prescription images shall not be uploaded to any server |
| PS-02 | OCR processing shall occur entirely in the browser |
| PS-03 | No prescription data shall be stored permanently |
| PS-04 | The system shall always display a safety notice |
| PS-05 | The system shall never guess medication details |
| PS-06 | The system shall include medical disclaimers on all pages |
| PS-07 | Unclear values shall be flagged for professional verification |

---

## 11. Future Enhancements

- Integration with an external LLM API (e.g., OpenAI) for more sophisticated analysis
- Support for more languages (e.g., Tamil, Telugu, Bengali)
- Prescription image preprocessing (contrast enhancement, rotation correction)
- Mobile app version (React Native)
- Voice output for accessibility
- Integration with pharmacy databases for medicine information
- Batch processing of multiple prescriptions
