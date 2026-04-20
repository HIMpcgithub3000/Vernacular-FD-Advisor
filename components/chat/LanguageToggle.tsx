'use client';

import { motion } from 'framer-motion';

export type Language = 'hi' | 'bho' | 'mai' | 'en';

const LANGS: { code: Language; label: string }[] = [
  { code: 'hi', label: 'हिंदी' },
  { code: 'bho', label: 'भोज.' },
  { code: 'mai', label: 'मैथि.' },
  { code: 'en', label: 'EN' },
];

export default function LanguageToggle({
  value,
  onChange,
}: {
  value: Language;
  onChange: (l: Language) => void;
}) {
  return (
    <div className="flex rounded-[10px] p-[3px] gap-1 bg-[#111811] border border-[rgba(163,230,53,0.08)]">
      {LANGS.map(l => (
        <button
          key={l.code}
          onClick={() => onChange(l.code)}
          className="relative text-xs px-2.5 py-1.5 rounded-md transition-all font-medium"
        >
          {value === l.code && (
            <motion.div
              layoutId="lang-active"
              className="absolute inset-0 bg-[#A3E635] rounded-md"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <span
            className={`relative z-10 ${
              value === l.code
                ? 'text-[#0A0F0A] font-semibold'
                : 'text-[#7A9A7A] hover:text-[#F0F5F0]'
            }`}
          >
            {l.label}
          </span>
        </button>
      ))}
    </div>
  );
}
