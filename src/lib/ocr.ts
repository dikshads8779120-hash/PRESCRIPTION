import Tesseract from 'tesseract.js';
import type { OcrResult } from './types';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/bmp'];

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type: "${file.type}". Please upload a PNG, JPEG, WebP, or BMP image.`,
    };
  }
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum allowed is 10 MB.`,
    };
  }
  return { valid: true };
}

export async function extractTextFromImage(
  file: File,
  onProgress?: (progress: number) => void,
): Promise<OcrResult> {
  try {
    const result = await Tesseract.recognize(file, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text' && onProgress) {
          onProgress(Math.round(m.progress * 100));
        }
      },
    });

    const text = result.data.text.trim();
    const confidence = result.data.confidence;

    if (!text || text.length < 3) {
      return {
        text: '',
        confidence,
        status: 'error',
        error:
          'No readable text was found in the image. The image may be blurry, handwritten, or not contain a prescription. You can try a clearer image or enter the text manually below.',
      };
    }

    return {
      text,
      confidence: Math.round(confidence),
      status: 'success',
    };
  } catch (err) {
    return {
      text: '',
      confidence: 0,
      status: 'error',
      error: `OCR processing failed: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again or enter the text manually.`,
    };
  }
}
