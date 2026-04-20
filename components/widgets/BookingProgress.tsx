'use client';

import { Check } from 'lucide-react';
import type { Language } from '@/components/chat/LanguageToggle';

const STEP_LABELS: Record<Language, string[]> = {
  hi: ['राशि', 'अवधि', 'KYC', 'नॉमिनी', 'पुष्टि'],
  bho: ['रकम', 'समय', 'KYC', 'नॉमिनी', 'पुष्टि'],
  mai: ['राशि', 'अवधि', 'KYC', 'नॉमिनी', 'पुष्टि'],
  en: ['Amount', 'Tenor', 'KYC', 'Nominee', 'Confirm'],
};

export default function BookingProgress({
  step,
  language,
}: {
  step: number;
  language: Language;
}) {
  const labels = STEP_LABELS[language];

  return (
    <div className="bg-[#111811] border border-[rgba(163,230,53,0.08)] rounded-t-2xl px-4 py-3">
      <div className="flex items-center justify-between">
        {labels.map((label, idx) => {
          const isCompleted = idx < step;
          const isActive = idx === step;

          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center min-w-9">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                    isCompleted
                      ? 'bg-[#A3E635] text-[#0A0F0A]'
                      : isActive
                        ? 'bg-[#4ADE80] text-[#0A0F0A]'
                        : 'bg-[#1C2A1C] text-[#3D5C3D]'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                </div>
                <span
                  className={`mt-1 text-[10px] ${
                    language === 'en' ? '' : 'font-vernacular'
                  } ${
                    isActive || isCompleted ? 'text-[#7A9A7A]' : 'text-[#3D5C3D]'
                  }`}
                >
                  {label}
                </span>
              </div>
              {idx < labels.length - 1 && (
                <div className="h-[2px] flex-1 mx-1 rounded-full bg-[#1C2A1C]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
