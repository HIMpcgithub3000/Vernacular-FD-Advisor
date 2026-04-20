'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Shield, Globe, ArrowRight } from 'lucide-react';

type Language = 'hi' | 'bho' | 'mai' | 'en';

interface LangCard {
  code: Language;
  label: string;
  nativeGreeting: string;
  description: string;
  color: string;
  pattern: string;
}

const LANGUAGES: LangCard[] = [
  {
    code: 'hi',
    label: 'हिन्दी',
    nativeGreeting: 'नमस्ते! 🙏',
    description: 'FD को आसान हिंदी में समझें',
    color: 'from-orange-500 to-amber-600',
    pattern: '🕉️',
  },
  {
    code: 'bho',
    label: 'भोजपुरी',
    nativeGreeting: 'प्रणाम! 🙏',
    description: 'FD के बारे में भोजपुरी में जानीं',
    color: 'from-emerald-600 to-teal-700',
    pattern: '🌾',
  },
  {
    code: 'mai',
    label: 'मैथिली',
    nativeGreeting: 'प्रणाम! 🙏',
    description: 'FD के बारे मे मैथिली मे बुझू',
    color: 'from-blue-600 to-indigo-700',
    pattern: '🎭',
  },
  {
    code: 'en',
    label: 'English',
    nativeGreeting: 'Hello! 👋',
    description: 'Understand FDs in plain English',
    color: 'from-violet-600 to-purple-700',
    pattern: '🌐',
  },
];

export default function OnboardingPage() {
  const [selected, setSelected] = useState<Language | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const router = useRouter();

  const handleSelect = (code: Language) => {
    setSelected(code);
  };

  const handleContinue = () => {
    if (!selected) return;
    setTransitioning(true);
    localStorage.setItem('fd-guru-lang', selected);
    setTimeout(() => router.push('/chat'), 400);
  };

  return (
    <div className="min-h-[100dvh] bg-[#FFFBF5] flex flex-col">
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-[#2D2B6B] z-50"
          />
        )}
      </AnimatePresence>

      <div className="flex-1 max-w-md mx-auto w-full px-6 py-8 flex flex-col">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[#E07B00] to-[#c96d00] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-900/20">
            <span className="text-2xl text-white font-bold">FG</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1612] mb-2">FD Guru</h1>
          <p className="text-sm text-[#6B6460] leading-relaxed">
            आपकी भाषा में FD समझें, आसान शब्दों में
          </p>
          <p className="text-xs text-[#6B6460] mt-1">
            Understand FDs in your language, in simple words
          </p>
        </motion.div>

        {/* Language prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-4"
        >
          <Globe className="w-4 h-4 text-[#E07B00]" />
          <p className="text-sm font-semibold text-[#1A1612]">
            अपनी भाषा चुनें / Choose your language
          </p>
        </motion.div>

        {/* Language cards */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {LANGUAGES.map((lang, i) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              onClick={() => handleSelect(lang.code)}
              className={`relative bg-gradient-to-br ${lang.color} rounded-2xl p-4 text-white text-left transition-all ${
                selected === lang.code
                  ? 'ring-4 ring-[#E07B00] ring-offset-2 ring-offset-[#FFFBF5] scale-[1.02]'
                  : 'hover:scale-[1.01]'
              }`}
            >
              <span className="text-2xl block mb-2">{lang.pattern}</span>
              <h3 className="text-lg font-bold">{lang.label}</h3>
              <p className="text-xs opacity-80 mt-1 leading-relaxed">
                {lang.description}
              </p>
              <p className="text-sm font-medium mt-2 opacity-90">
                {lang.nativeGreeting}
              </p>

              {selected === lang.code && (
                <motion.div
                  layoutId="check"
                  className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                >
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-4 mt-6 mb-4"
        >
          <div className="flex items-center gap-1 text-xs text-[#6B6460]">
            <Shield className="w-3 h-3 text-green-600" />
            <span>DICGC Protected</span>
          </div>
          <div className="w-1 h-1 bg-[#E8E0D4] rounded-full" />
          <div className="flex items-center gap-1 text-xs text-[#6B6460]">
            <Shield className="w-3 h-3 text-blue-600" />
            <span>RBI Regulated</span>
          </div>
        </motion.div>

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: selected ? 1 : 0.5,
            y: 0,
          }}
          transition={{ delay: 0.5 }}
          onClick={handleContinue}
          disabled={!selected}
          className="w-full bg-[#E07B00] hover:bg-[#c96d00] disabled:bg-[#E8E0D4] text-white disabled:text-[#6B6460] rounded-2xl py-4 text-base font-semibold flex items-center justify-center gap-2 transition-colors shadow-md shadow-orange-900/20 disabled:shadow-none"
        >
          {selected
            ? selected === 'en'
              ? "Let's Start"
              : 'शुरू करें'
            : 'भाषा चुनें'}
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
