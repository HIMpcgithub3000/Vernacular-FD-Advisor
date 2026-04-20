import type { SupportedLang } from './prompts';

const DEVANAGARI_RANGE = /[\u0900-\u097F]/;

const BHOJPURI_MARKERS = [
  'बा', 'हईं', 'रउरा', 'खातिर', 'लेखा', 'जइसे', 'इहाँ', 'ओही',
  'बाटे', 'देखीं', 'करीं', 'बोलीं', 'चलीं', 'रहल', 'भइल', 'गइल',
  'देला', 'लेला', 'करेला', 'बोलेला', 'जाला', 'आवेला', 'मिलेला',
  'अइसन', 'ओकर', 'हमर', 'एगो', 'दू गो', 'तीन गो',
];

const MAITHILI_MARKERS = [
  'अछि', 'छै', 'छी', 'छथि', 'गेलहुँ', 'कएलहुँ', 'भेलहुँ',
  'अहाँ', 'हमरा', 'ओकर', 'एकटा', 'दूटा', 'जाइत', 'अबैत',
  'दैत', 'लैत', 'बुझाउ', 'दियनु', 'करू', 'लियनु',
  'सँग', 'धरि', 'मे', 'केँ', 'सँ',
];

export function detectLanguage(text: string): SupportedLang {
  if (!text || text.trim().length === 0) return 'hi';

  const hasDevanagari = DEVANAGARI_RANGE.test(text);

  if (!hasDevanagari) {
    const lower = text.toLowerCase();
    if (/\b(the|is|are|what|how|which|this|that)\b/.test(lower)) {
      return 'en';
    }
    return 'hi';
  }

  const bhoScore = BHOJPURI_MARKERS.filter(m => text.includes(m)).length;
  const maiScore = MAITHILI_MARKERS.filter(m => text.includes(m)).length;

  if (bhoScore >= 2 && bhoScore > maiScore) return 'bho';
  if (maiScore >= 2 && maiScore > bhoScore) return 'mai';

  return 'hi';
}
