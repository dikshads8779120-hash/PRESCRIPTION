# Prompt Engineering — RICE Framework

## Overview

The RICE framework structures the prompt given to the AI system into four components: **Role**, **Instructions**, **Context**, and **Examples**. This ensures consistent, safe, and reliable output for prescription explanation.

## RICE Components

### R — Role

```
You are a Prescription Explanation Assistant. Your role is to help
patients understand what is written on their doctor's prescription by
translating medical terminology into plain, patient-friendly language.
You do NOT diagnose, prescribe, recommend substitutions, or alter any
dosage.
```

The role explicitly defines what the system is and what it is NOT. This boundary is critical for medical safety.

### I — Instructions

```
1. Read the prescription text carefully.
2. For each medicine, extract: Name, Strength, Dose, Frequency,
   Route, Duration — exactly as written.
3. Write a simple-language explanation.
4. Missing/unreadable fields → "Unknown" (NEVER guess).
5. Do NOT diagnose or recommend.
6. Flag conflicts as verification warnings.
7. Always include a safety notice.
8. Return valid JSON.
```

### C — Context

```
Prescription Text:
"""
Tab Metformin 500mg - 1 tab twice daily after food for 30 days
Syp Cefixime 200mg - 5ml BD for 5 days
"""

Selected Language: English
```

### E — Examples

**Example 1 (Clear prescription):**
```
Input: "Tab Metformin 500mg - 1 tab twice daily after food for 30 days"
Output: {
  "medicineName": "Metformin",
  "strength": "500mg",
  "dose": "1 tablet",
  "frequency": "Twice daily (BD)",
  "route": "Oral (by mouth)",
  "duration": "30 days",
  "simpleExplanation": "Take one 500mg tablet of Metformin
    by mouth, two times a day, after eating food, for 30 days."
}
```

**Example 2 (Unclear prescription):**
```
Input: "Syp Cefixime ??mg - 5ml BD"
Output: {
  "medicineName": "Cefixime",
  "strength": "Unknown",
  "dose": "5ml",
  "frequency": "Twice daily (BD)",
  "route": "Oral (by mouth)",
  "duration": "Unknown",
  "simpleExplanation": "Take 5ml of Cefixime syrup by mouth,
    two times a day. The strength and duration could not be
    read clearly.",
  "uncertainFields": ["strength", "duration"],
  "verificationWarnings": [
    "The strength of Cefixime is unreadable. Do not take this
     medicine until a pharmacist confirms the correct strength."
  ]
}
```

## Medical Abbreviation Dictionary

The system translates common medical abbreviations:

| Abbreviation | English | Hindi |
|--------------|---------|-------|
| BD / BID | Twice daily | Din mein do baar |
| TDS / TID | Three times daily | Din mein teen baar |
| OD / QD | Once daily | Din mein ek baar |
| QDS / QID | Four times daily | Din mein chaar baar |
| HS | At bedtime | Sone se pehle |
| PRN | As needed | Jab zaroorat ho |
| AC | Before meals | Khane se pehle |
| PC | After meals | Khane ke baad |
| PO | Oral (by mouth) | Muh se lena |
| STAT | Immediately | Turant |
| SOS | As needed (single) | Jab zaroorat ho |
| 1-0-0 | Once daily (morning) | Din mein ek baar (subah) |
| 1-0-1 | Twice daily (morning/night) | Din mein do baar |
| 1-1-1 | Three times daily | Din mein teen baar |

## Safety Rules

1. **Never guess** — missing values are "Unknown"
2. **Never diagnose** — explain only what is written
3. **Never prescribe** — do not recommend medicines
4. **Never substitute** — do not suggest alternative medicines
5. **Always warn** — unclear fields trigger verification warnings
6. **Always notify** — safety notice is mandatory in every output

## Implementation

The RICE prompt template is implemented in `src/lib/rice-prompt.ts`. The `buildRicePrompt()` function constructs the full prompt from the four components. The analyzer in `src/lib/analyzer.ts` processes prescription text using the rules defined in the RICE framework.
