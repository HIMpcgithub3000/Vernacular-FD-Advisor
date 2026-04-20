import { useState, useCallback, useRef } from 'react';

type SupportedLang = 'hi' | 'bho' | 'mai' | 'en';

const LANG_CODES: Record<SupportedLang, string> = {
  hi: 'hi-IN',
  bho: 'hi-IN',
  mai: 'hi-IN',
  en: 'en-IN',
};

interface UseSpeechToTextReturn {
  isListening: boolean;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
}

export function useSpeechToText(
  language: SupportedLang,
  onResult: (text: string) => void
): UseSpeechToTextReturn {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const isSupported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('Voice not supported in this browser');
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = LANG_CODES[language];
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onerror = (event: any) => {
      setError(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [language, onResult, isSupported]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop?.();
    setIsListening(false);
  }, []);

  return { isListening, isSupported, startListening, stopListening, error };
}

