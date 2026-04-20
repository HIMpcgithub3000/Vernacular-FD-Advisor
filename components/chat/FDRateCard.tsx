'use client';

import { motion } from 'framer-motion';
import { Shield, HelpCircle } from 'lucide-react';
import type { Language } from './LanguageToggle';

const EXPLAIN_LABEL: Record<Language, string> = {
  hi: 'यह क्या है? समझाइए',
  bho: 'इ का बा? समझाईं',
  mai: 'ई की अछि? बुझाउ',
  en: 'Explain this to me',
};

export default function FDRateCard({
  bank,
  rate,
  tenor,
  onExplain,
  language,
}: {
  bank: string;
  rate: number;
  tenor: string;
  onExplain: () => void;
  language: Language;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="mx-4 mt-3 bg-[#3B82F6] rounded-[20px] p-5 text-white relative overflow-hidden border border-[rgba(255,255,255,0.1)]"
    >
      <div className="relative z-10">
        <div className="flex justify-center mb-2 gap-1.5 text-white/80 text-[8px] tracking-[0.25em]">
          <span>●</span>
          <span>●</span>
          <span>●</span>
        </div>
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[11px] text-white/80">Fixed Deposit</p>
            <p className="text-[13px] font-semibold leading-tight mt-0.5">
              {bank}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.15)] rounded-full px-2.5 py-1">
            <Shield className="w-3 h-3 text-white" />
            <span className="text-[11px] text-white font-medium">DICGC</span>
          </div>
        </div>

        <div className="flex items-end gap-3 mb-5">
          <div className="flex-1">
            <p className="text-[42px] leading-none font-bold text-white font-numbers tracking-tight">
              {rate}%
            </p>
            <p className="text-xs text-white/80 mt-1">per annum</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.2)] rounded-full px-3 py-1.5">
            <p className="text-sm font-semibold font-numbers">{tenor}</p>
          </div>
        </div>

        <motion.button
          onClick={onExplain}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full bg-[#A3E635] hover:bg-[#84CC16] text-[#0A0F0A] rounded-xl py-3.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <HelpCircle className="w-4 h-4" />
          {EXPLAIN_LABEL[language]}
        </motion.button>
      </div>
    </motion.div>
  );
}
