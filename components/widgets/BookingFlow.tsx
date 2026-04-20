'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Shield,
  Share2,
  X,
} from 'lucide-react';
import type { Language } from '@/components/chat/LanguageToggle';
import { formatRupees } from '@/lib/utils';
import BookingProgress from './BookingProgress';

interface BookingData {
  amount: number;
  tenor: number;
  phone: string;
  nominee: string;
}

const AMOUNTS = [10000, 25000, 50000, 100000, 200000, 500000];
const TENORS = [6, 12, 24, 36, 60];

const LABELS: Record<Language, Record<string, string>> = {
  hi: {
    selectAmount: 'निवेश राशि चुनें',
    selectTenor: 'अवधि चुनें (महीने)',
    enterPhone: 'फ़ोन नंबर दर्ज करें',
    enterNominee: 'नॉमिनी का नाम',
    next: 'आगे बढ़ें',
    back: 'वापस',
    confirm: '✅ FD बुक करें',
    success: '🎉 FD सफलतापूर्वक बुक हो गया!',
    bookingId: 'बुकिंग ID',
    share: 'WhatsApp पर शेयर करें',
    months: 'महीने',
    maturity: 'मैच्योरिटी',
    bank: 'बैंक',
    rate: 'ब्याज दर',
    dicgc: '🛡️ DICGC — ₹5 लाख तक सुरक्षित',
  },
  bho: {
    selectAmount: 'निवेश के रकम चुनीं',
    selectTenor: 'समय चुनीं (महिना)',
    enterPhone: 'फ़ोन नंबर भरीं',
    enterNominee: 'नॉमिनी के नाम',
    next: 'आगे बढ़ीं',
    back: 'वापस',
    confirm: '✅ FD बुक करीं',
    success: '🎉 FD बुक हो गइल!',
    bookingId: 'बुकिंग ID',
    share: 'WhatsApp पर शेयर करीं',
    months: 'महिना',
    maturity: 'मैच्योरिटी',
    bank: 'बैंक',
    rate: 'ब्याज दर',
    dicgc: '🛡️ DICGC — ₹5 लाख तक सुरक्षित',
  },
  mai: {
    selectAmount: 'निवेश राशि चुनू',
    selectTenor: 'अवधि चुनू (मास)',
    enterPhone: 'फ़ोन नंबर भरू',
    enterNominee: 'नॉमिनीक नाम',
    next: 'आगू बढ़ू',
    back: 'वापस',
    confirm: '✅ FD बुक करू',
    success: '🎉 FD सफलतापूर्वक बुक भए गेल!',
    bookingId: 'बुकिंग ID',
    share: 'WhatsApp पर शेयर करू',
    months: 'मास',
    maturity: 'मैच्योरिटी',
    bank: 'बैंक',
    rate: 'ब्याज दर',
    dicgc: '🛡️ DICGC — ₹5 लाख धरि सुरक्षित',
  },
  en: {
    selectAmount: 'Select investment amount',
    selectTenor: 'Choose tenor (months)',
    enterPhone: 'Enter phone number',
    enterNominee: 'Nominee name',
    next: 'Continue',
    back: 'Back',
    confirm: '✅ Book FD',
    success: '🎉 FD Booked Successfully!',
    bookingId: 'Booking ID',
    share: 'Share on WhatsApp',
    months: 'months',
    maturity: 'Maturity',
    bank: 'Bank',
    rate: 'Interest Rate',
    dicgc: '🛡️ DICGC — Up to ₹5 lakh insured',
  },
};

export default function BookingFlow({
  language,
  bankName = 'Suryoday Small Finance Bank',
  rate = 8.5,
  onClose,
}: {
  language: Language;
  bankName?: string;
  rate?: number;
  onClose?: () => void;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>({
    amount: 50000,
    tenor: 12,
    phone: '',
    nominee: '',
  });
  const [booked, setBooked] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const l = LABELS[language];

  const r = rate / 100;
  const t = data.tenor / 12;
  const maturity = Math.round(data.amount * Math.pow(1 + r / 4, 4 * t));
  const interest = maturity - data.amount;

  const handleBook = async () => {
    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bank_name: bankName,
        amount: data.amount,
        tenor_months: data.tenor,
        rate,
        kyc: { phone: data.phone },
        nominee: data.nominee,
      }),
    });
    const result = await res.json();
    setBookingId(result.booking_id);
    setBooked(true);
  };

  const handleShare = () => {
    const msg = `✅ FD बुक हो गया!\n🏦 ${bankName}\n💰 ${formatRupees(data.amount)} @ ${rate}% — ${data.tenor} ${l.months}\n📅 ${l.maturity}: ${formatRupees(maturity)}\n🛡️ DICGC insured ✓`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  if (booked) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-[#0A0F0A] px-5 py-6 flex flex-col"
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1C2A1C] text-[#7A9A7A] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle2 className="w-20 h-20 mx-auto mb-5 text-[#A3E635]" />
          </motion.div>
          <h3 className="text-xl font-semibold text-[#F0F5F0]">{l.success}</h3>
          <p className="text-xs text-[#7A9A7A] mt-2">
            {l.bookingId}: {bookingId}
          </p>
          <p className="text-[36px] font-numbers font-semibold text-[#F0F5F0] mt-5">
            {formatRupees(data.amount)}
          </p>
          <div className="mt-4 w-full max-w-sm bg-[#111811] rounded-2xl border border-[rgba(163,230,53,0.08)] p-4 space-y-2 text-sm text-left">
            <div className="flex justify-between">
              <span className="text-[#7A9A7A]">{l.bank}</span>
              <span className="text-[#F0F5F0] text-right text-xs">{bankName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A9A7A]">{l.rate}</span>
              <span className="text-[#F0F5F0] font-numbers">{rate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A9A7A]">{l.maturity}</span>
              <span className="text-[#A3E635] font-numbers">{formatRupees(maturity)}</span>
            </div>
          </div>
          <p className="text-xs text-[#3D5C3D] mt-3">{l.dicgc}</p>
        </div>
        <div className="space-y-3">
          <button
            onClick={handleShare}
            className="w-full bg-[#25D366] hover:bg-[#1da851] text-white rounded-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            {l.share}
          </button>
          <button
            onClick={onClose}
            className="w-full bg-[#4ADE80] text-[#0A0F0A] rounded-xl py-3 text-sm font-semibold"
          >
            Done
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="mx-4 my-3 bg-[#111811] rounded-2xl border border-[rgba(163,230,53,0.08)] overflow-hidden"
    >
      <BookingProgress step={step} language={language} />

      <div className="p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.15 }}
            className="min-h-32"
          >
            {step === 0 && (
              <div>
                <p className="text-sm font-semibold text-[#F0F5F0] mb-3">{l.selectAmount}</p>
                <div className="grid grid-cols-3 gap-2">
                  {AMOUNTS.map(a => (
                    <button
                      key={a}
                      onClick={() => setData(d => ({ ...d, amount: a }))}
                      className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                        data.amount === a
                          ? 'bg-[#4ADE80] text-[#0A0F0A]'
                          : 'bg-[#1C2A1C] text-[#7A9A7A] hover:text-[#F0F5F0]'
                      }`}
                    >
                      {formatRupees(a)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <p className="text-sm font-semibold text-[#F0F5F0] mb-3">{l.selectTenor}</p>
                <div className="grid grid-cols-5 gap-2">
                  {TENORS.map(t => (
                    <button
                      key={t}
                      onClick={() => setData(d => ({ ...d, tenor: t }))}
                      className={`py-3 rounded-xl text-sm font-medium transition-all ${
                        data.tenor === t
                          ? 'bg-[#4ADE80] text-[#0A0F0A]'
                          : 'bg-[#1C2A1C] text-[#7A9A7A] hover:text-[#F0F5F0]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="mt-3 bg-[#162016] rounded-xl p-3 text-center border border-[rgba(163,230,53,0.08)]">
                  <p className="text-xs text-[#7A9A7A]">{l.maturity}</p>
                  <p className="text-xl font-bold text-[#F0F5F0] font-numbers">
                    {formatRupees(maturity)}
                  </p>
                  <p className="text-xs text-[#A3E635]">
                    +{formatRupees(interest)} {language === 'hi' ? 'ब्याज' : 'interest'}
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p className="text-sm font-semibold text-[#F0F5F0] mb-3">{l.enterPhone}</p>
                <input
                  type="tel"
                  maxLength={10}
                  value={data.phone}
                  onChange={e => setData(d => ({ ...d, phone: e.target.value.replace(/\D/g, '') }))}
                  placeholder="9876543210"
                  className="w-full bg-[#1C2A1C] border border-[rgba(163,230,53,0.12)] text-[#F0F5F0] rounded-xl px-4 py-3 text-base font-numbers outline-none focus:border-[rgba(163,230,53,0.2)]"
                />
                <div className="flex items-center gap-2 mt-3 text-xs text-[#7A9A7A]">
                  <Shield className="w-3 h-3" />
                  <span>{language === 'hi' ? 'आपका डेटा सुरक्षित है — बैंक के अलावा किसी को नहीं जाएगा' : 'Your data is secure — shared only with the bank'}</span>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <p className="text-sm font-semibold text-[#F0F5F0] mb-3">{l.enterNominee}</p>
                <input
                  type="text"
                  value={data.nominee}
                  onChange={e => setData(d => ({ ...d, nominee: e.target.value }))}
                  placeholder={language === 'hi' ? 'जैसे: पिता जी का नाम' : 'e.g. Father\'s name'}
                  className="w-full bg-[#1C2A1C] border border-[rgba(163,230,53,0.12)] rounded-xl px-4 py-3 text-base text-[#F0F5F0] outline-none focus:border-[rgba(163,230,53,0.2)]"
                />
                <p className="text-xs text-[#7A9A7A] mt-2">
                  {language === 'hi'
                    ? 'नॉमिनी = अगर कुछ हो जाए तो पैसा किसे मिलेगा'
                    : 'Nominee = who gets the money if something happens to you'}
                </p>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-[#F0F5F0]">
                  {language === 'hi' ? '📋 समीक्षा करें' : '📋 Review'}
                </p>
                <div className="bg-[#162016] rounded-xl p-3 space-y-2 text-sm border border-[rgba(163,230,53,0.08)]">
                  <div className="flex justify-between">
                    <span className="text-[#7A9A7A]">{l.bank}</span>
                    <span className="font-semibold text-right text-xs text-[#F0F5F0]">{bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A9A7A]">{l.rate}</span>
                    <span className="font-semibold font-numbers text-[#F0F5F0]">{rate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A9A7A]">
                      {language === 'hi' ? 'राशि' : 'Amount'}
                    </span>
                    <span className="font-semibold font-numbers text-[#F0F5F0]">{formatRupees(data.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A9A7A]">
                      {language === 'hi' ? 'अवधि' : 'Tenor'}
                    </span>
                    <span className="font-semibold text-[#F0F5F0]">
                      {data.tenor} {l.months}
                    </span>
                  </div>
                  <div className="border-t border-[rgba(163,230,53,0.08)] pt-2 flex justify-between">
                    <span className="font-semibold text-[#F0F5F0]">{l.maturity}</span>
                    <span className="font-bold text-[#A3E635] font-numbers text-base">
                      {formatRupees(maturity)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-center text-[#7A9A7A]">{l.dicgc}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 mt-4">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex-1 bg-[#1C2A1C] text-[#7A9A7A] rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              {l.back}
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              className="flex-1 bg-[#4ADE80] hover:bg-[#22C55E] text-[#0A0F0A] rounded-xl py-2.5 text-sm font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              {l.next}
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleBook}
              className="flex-1 bg-[#A3E635] hover:bg-[#84CC16] text-[#0A0F0A] rounded-xl py-2.5 text-sm font-semibold transition-colors"
            >
              {l.confirm}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
