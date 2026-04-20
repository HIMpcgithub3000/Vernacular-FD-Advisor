'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import type { Language } from '@/components/chat/LanguageToggle';
import { formatRupees } from '@/lib/utils';
import { calcQuarterlyCompound, calcTDS } from '@/lib/finance-math';

const LABELS: Record<Language, {
  title: string;
  principal: string;
  rate: string;
  tenor: string;
  months: string;
  maturity: string;
  interest: string;
  tds: string;
  netAmount: string;
}> = {
  hi: {
    title: '🧮 मैच्योरिटी कैलकुलेटर',
    principal: 'निवेश राशि',
    rate: 'ब्याज दर',
    tenor: 'अवधि',
    months: 'महीने',
    maturity: 'मैच्योरिटी राशि',
    interest: 'कुल ब्याज',
    tds: 'TDS कटौती',
    netAmount: 'हाथ में आएगा',
  },
  bho: {
    title: '🧮 मैच्योरिटी कैलकुलेटर',
    principal: 'निवेश के रकम',
    rate: 'ब्याज दर',
    tenor: 'समय',
    months: 'महिना',
    maturity: 'मैच्योरिटी रकम',
    interest: 'कुल ब्याज',
    tds: 'TDS कटौती',
    netAmount: 'हाथ में आई',
  },
  mai: {
    title: '🧮 मैच्योरिटी कैलकुलेटर',
    principal: 'निवेश राशि',
    rate: 'ब्याज दर',
    tenor: 'अवधि',
    months: 'मास',
    maturity: 'मैच्योरिटी राशि',
    interest: 'कुल ब्याज',
    tds: 'TDS कटौती',
    netAmount: 'हाथमे अओत',
  },
  en: {
    title: '🧮 Maturity Calculator',
    principal: 'Investment Amount',
    rate: 'Interest Rate',
    tenor: 'Tenor',
    months: 'months',
    maturity: 'Maturity Amount',
    interest: 'Total Interest',
    tds: 'TDS Deduction',
    netAmount: 'You receive',
  },
};

const AMOUNTS = [10000, 25000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000];
const TENORS = [6, 12, 24, 36, 60];

export default function MaturityCalculator({
  language,
  defaultRate = 8.5,
}: {
  language: Language;
  defaultRate?: number;
}) {
  const l = LABELS[language];
  const [amountIdx, setAmountIdx] = useState(2);
  const [rate, setRate] = useState(defaultRate);
  const [tenorIdx, setTenorIdx] = useState(1);

  const principal = AMOUNTS[amountIdx];
  const tenor = TENORS[tenorIdx];
  const amountProgress = (amountIdx / (AMOUNTS.length - 1)) * 100;
  const rateProgress = ((rate - 5) / 5) * 100;

  const calc = useMemo(() => {
    const years = tenor / 12;
    const maturity = calcQuarterlyCompound(principal, rate, years);
    const interest = maturity - principal;
    const tds = calcTDS(Math.round(interest), false);
    return {
      maturity: Math.round(maturity),
      interest: Math.round(interest),
      tds,
      net: Math.round(maturity - tds),
    };
  }, [principal, rate, tenor]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="mx-4 my-3 bg-[#111811] rounded-2xl border border-[rgba(163,230,53,0.08)] overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-[rgba(163,230,53,0.08)]">
        <h3 className="text-sm font-semibold flex items-center gap-2 text-[#F0F5F0]">
          <Calculator className="w-4 h-4" />
          {l.title}
        </h3>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-xs text-[#7A9A7A]">{l.principal}</label>
            <span className="text-sm font-semibold text-[#F0F5F0] font-numbers">
              {formatRupees(principal)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={AMOUNTS.length - 1}
            step={1}
            value={amountIdx}
            onChange={e => setAmountIdx(parseInt(e.target.value))}
            style={{
              background: `linear-gradient(to right, #4ADE80 0%, #4ADE80 ${amountProgress}%, #1C2A1C ${amountProgress}%, #1C2A1C 100%)`,
            }}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#3D5C3D] mt-0.5">
            <span>₹10K</span>
            <span>₹50L</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-xs text-[#7A9A7A]">{l.rate}</label>
            <span className="text-sm font-semibold text-[#F0F5F0] font-numbers">
              {rate.toFixed(1)}%
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={10}
            step={0.25}
            value={rate}
            onChange={e => setRate(parseFloat(e.target.value))}
            style={{
              background: `linear-gradient(to right, #4ADE80 0%, #4ADE80 ${rateProgress}%, #1C2A1C ${rateProgress}%, #1C2A1C 100%)`,
            }}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#3D5C3D] mt-0.5">
            <span>5%</span>
            <span>10%</span>
          </div>
        </div>

        <div>
          <label className="text-xs text-[#7A9A7A] mb-1.5 block">{l.tenor}</label>
          <div className="flex gap-2">
            {TENORS.map((t, i) => (
              <button
                key={t}
                onClick={() => setTenorIdx(i)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  i === tenorIdx
                    ? 'bg-[#4ADE80] text-[#0A0F0A]'
                    : 'bg-[#1C2A1C] text-[#7A9A7A] hover:text-[#F0F5F0]'
                }`}
              >
                {t} {l.months.slice(0, 2)}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={`${principal}-${rate}-${tenor}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className="bg-[#162016] rounded-xl p-4 space-y-2 border border-[rgba(163,230,53,0.08)]"
        >
          <p className="text-[12px] text-[#7A9A7A]">{l.maturity}</p>
          <motion.div
            key={calc.maturity}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            className="text-[28px] font-bold text-[#F0F5F0] font-numbers leading-none"
          >
            {formatRupees(calc.maturity)}
          </motion.div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="rounded-xl p-3 bg-[rgba(74,222,128,0.10)] border border-[rgba(74,222,128,0.25)]">
              <p className="text-[11px] text-[#7A9A7A]">{l.interest}</p>
              <p className="text-sm font-semibold text-[#4ADE80] font-numbers mt-1">
                +{formatRupees(calc.interest)}
              </p>
              {calc.tds > 0 && (
                <p className="text-[10px] text-[#7A9A7A] mt-1">
                  {l.tds}: -{formatRupees(calc.tds)}
                </p>
              )}
            </div>
            <div className="rounded-xl p-3 bg-[rgba(163,230,53,0.12)] border border-[rgba(163,230,53,0.28)]">
              <p className="text-[11px] text-[#7A9A7A]">{l.netAmount}</p>
              <motion.p
                key={calc.net}
                initial={{ scale: 1.04 }}
                animate={{ scale: 1 }}
                className="text-sm font-semibold text-[#A3E635] font-numbers mt-1"
              >
                {formatRupees(calc.net)}
              </motion.p>
            </div>
          </div>
          <div className="pt-1 text-[11px] text-[#3D5C3D]">
            {l.tenor}: {tenor} {l.months}
          </div>
          <div className="hidden">
            <motion.span
              key={`${calc.net}-sr`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs"
            >
              {calc.net}
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
