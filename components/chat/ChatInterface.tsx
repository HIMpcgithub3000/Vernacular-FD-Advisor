'use client';

import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignOutButton } from '@clerk/nextjs';
import MessageBubble from './MessageBubble';
import FDRateCard from './FDRateCard';
import LanguageToggle, { type Language } from './LanguageToggle';
import MaturityCalculator from '@/components/widgets/MaturityCalculator';
import BookingFlow from '@/components/widgets/BookingFlow';
import { Send, Mic, LogOut } from 'lucide-react';
import type { Message } from 'ai';
import { useSpeechToText } from '@/hooks/useSpeechToText';

const WELCOME_MESSAGES: Record<Language, string> = {
  hi: 'नमस्ते! मैं FD Guru हूँ। आप कोई भी FD सवाल पूछ सकते हैं — बिल्कुल आसान हिंदी में समझाऊंगा। 🙏',
  bho: 'प्रणाम! हम FD Guru हईं। कौनो भी FD के सवाल पूछीं — भोजपुरी में समझाईब। 🙏',
  mai: 'प्रणाम! हम FD Guru छी। कोनो FD के सवाल पूछू — मैथिली मे बुझाएब। 🙏',
  en: "Hello! I'm FD Guru. Ask me anything about Fixed Deposits — in plain, simple language. 🙏",
};

const PLACEHOLDER: Record<Language, string> = {
  hi: 'जैसे: "8.5% वाला FD कैसा है?"',
  bho: 'जइसे: "8.5% वाला FD कइसन बा?"',
  mai: 'जेना: "8.5% वाला FD कोना अछि?"',
  en: 'e.g. "Is 8.5% FD a good deal?"',
};

const QUICK_CHIPS: Record<Language, string[]> = {
  hi: ['यह सुरक्षित है?', 'कितना मिलेगा?', 'Book करें', 'SBI से compare करें'],
  bho: ['सुरक्षित बा?', 'केतना मिली?', 'Book करीं', 'तुलना करीं'],
  mai: ['सुरक्षित अछि?', 'कतेक भेटत?', 'Book करू', 'तुलना करू'],
  en: ['Is it safe?', 'How much will I earn?', 'Book this FD', 'Compare rates'],
};

const LISTENING_TEXT: Record<Language, string> = {
  hi: 'सुन रहा हूँ...',
  bho: 'सुनत बानी...',
  mai: 'सुनि रहल छी...',
  en: 'Listening...',
};

const INSTALL_TEXT: Record<Language, string> = {
  hi: '📲 होम स्क्रीन पर जोड़ें — बिना Play Store के!',
  bho: '📲 होम स्क्रीन पर लगाईं — Play Store के बिना!',
  mai: '📲 होम स्क्रीन पर जोड़ू — Play Store बिना!',
  en: '📲 Add to Home Screen — no Play Store needed!',
};

const RETRY_TEXT: Record<Language, string> = {
  hi: 'फिर कोशिश करें 🔄',
  bho: 'फिर कोशिश करें 🔄',
  mai: 'फिर कोशिश करें 🔄',
  en: 'Try again 🔄',
};

const TRIGGER_FD = {
  bank: 'Suryoday Small Finance Bank',
  rate: 8.5,
  tenor: '12M',
  tenorMonths: 12,
};

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function ChatInterface({
  userId,
  userName,
}: {
  userId: string;
  userName: string;
}) {
  const [language, setLanguage] = useState<Language>('hi');
  const [showCalculator, setShowCalculator] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [draft, setDraft] = useState('');
  const [lastUserMessage, setLastUserMessage] = useState('');
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const autoSendTimeout = useRef<number | null>(null);

  const {
    messages,
    setMessages,
    isLoading,
    append,
    error,
  } = useChat({
    api: '/api/chat',
    body: { language },
    fetch: async (input, init) => {
      const response = await fetch(input, init);
      if (!response.ok) {
        let message = WELCOME_MESSAGES[language];
        try {
          const data = await response.json();
          message = data?.message || message;
        } catch {
          message = WELCOME_MESSAGES[language];
        }
        throw new Error(message);
      }
      return response;
    },
  });

  const sendUserMessage = (text: string) => {
    const content = text.trim();
    if (!content) return;
    setApiErrorMessage(null);
    setDraft('');
    setLastUserMessage(content);
    append({ role: 'user', content }, { body: { language } });
  };

  const { isListening, isSupported, startListening, stopListening } =
    useSpeechToText(language, transcript => {
      const recognized = transcript.trim();
      if (!recognized) return;
      setDraft(recognized);
      if (autoSendTimeout.current) {
        window.clearTimeout(autoSendTimeout.current);
      }
      autoSendTimeout.current = window.setTimeout(() => {
        sendUserMessage(recognized);
      }, 800);
    });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showCalculator, showBooking, apiErrorMessage, showInstallPrompt]);

  useEffect(() => {
    if (!error) return;
    setApiErrorMessage(error.message || WELCOME_MESSAGES[language]);
  }, [error, language]);

  useEffect(() => {
    const loadHistory = async () => {
      const res = await fetch('/api/chat/history');
      if (!res.ok) return;
      const data = (await res.json()) as {
        messages?: Array<{ id: string; role: string; content: string }>;
      };
      if (!data.messages?.length) return;
      const mapped: Message[] = data.messages.map(message => ({
        id: message.id,
        role: message.role as 'user' | 'assistant',
        content: message.content,
      }));
      setMessages(mapped);
    };
    loadHistory();
  }, [setMessages, userId]);

  useEffect(() => {
    const dismissed =
      typeof window !== 'undefined' &&
      window.localStorage.getItem('fdguru-install-dismissed') === '1';
    if (dismissed) return;

    const onBeforeInstallPrompt = (event: Event) => {
      const e = event as BeforeInstallPromptEvent;
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (autoSendTimeout.current) {
        window.clearTimeout(autoSendTimeout.current);
      }
    };
  }, []);

  const handleExplainCard = () => {
    const queries: Record<Language, string> = {
      hi: 'Suryoday Small Finance Bank का 8.50% p.a. — 12 महीने वाला FD समझाइए। क्या यह सुरक्षित है? मुझे ₹50,000 लगाने चाहिए?',
      bho: 'Suryoday Small Finance Bank के 8.50% वाला 12 महिना FD का मतलब का बा? ₹50,000 लगाईं का?',
      mai: 'Suryoday Small Finance Bank के 8.50% — 12 मास वाला FD बुझाउ। ई सुरक्षित अछि?',
      en: 'Explain the Suryoday Small Finance Bank 8.50% p.a. 12-month FD. Is it safe? Should I invest ₹50,000?',
    };
    sendUserMessage(queries[language]);
  };

  const handleBookingRequest = () => {
    setShowBooking(true);
    setShowCalculator(false);
  };

  const handleChip = (chipText: string) => {
    sendUserMessage(chipText);
    if (
      chipText.toLowerCase().includes('book') ||
      chipText.toLowerCase().includes('बुक')
    ) {
      handleBookingRequest();
    }
    if (
      chipText.toLowerCase().includes('how much') ||
      chipText.includes('कितना') ||
      chipText.includes('केतना') ||
      chipText.includes('कतेक')
    ) {
      setShowCalculator(true);
      setShowBooking(false);
    }
  };

  const dismissInstallPrompt = () => {
    window.localStorage.setItem('fdguru-install-dismissed', '1');
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  const installApp = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    dismissInstallPrompt();
  };

  const retryLastMessage = () => {
    if (!lastUserMessage || isLoading) return;
    sendUserMessage(lastUserMessage);
  };

  return (
    <div className="flex flex-col h-[100dvh] max-w-md mx-auto bg-transparent">
      <div className="bg-[#111811] border-b border-[rgba(163,230,53,0.08)] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#A3E635] flex items-center justify-center text-[#0A0F0A] text-[11px] font-semibold">
            {userName.slice(0, 1).toUpperCase()}
          </div>
          <h1 className="text-base font-semibold text-[#F0F5F0] font-vernacular">
            नमस्ते, {userName}!
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle value={language} onChange={setLanguage} />
          <SignOutButton redirectUrl="/">
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-[#1C2A1C] border border-[rgba(163,230,53,0.12)] text-[#7A9A7A] flex items-center justify-center"
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </SignOutButton>
        </div>
      </div>

      <FDRateCard
        bank={TRIGGER_FD.bank}
        rate={TRIGGER_FD.rate}
        tenor={TRIGGER_FD.tenor}
        onExplain={handleExplainCard}
        language={language}
      />

      <div className="px-4 pt-3 pb-2 overflow-x-auto scrollbar-none">
        <div className="flex gap-2 min-w-max">
          {QUICK_CHIPS[language].map(chip => (
            <motion.button
              key={chip}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              onClick={() => handleChip(chip)}
              className="px-3 py-1.5 text-xs rounded-full bg-[#1C2A1C] border border-[rgba(163,230,53,0.1)] text-[#7A9A7A] whitespace-nowrap"
            >
              {chip}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={language}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.6 }}
            transition={{ duration: 0.15 }}
            className="space-y-3"
          >
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#A3E635] flex items-center justify-center text-[#0A0F0A] text-xs flex-shrink-0 font-semibold">
                  FG
                </div>
                <div className="bg-[#111811] border border-[rgba(163,230,53,0.08)] rounded-[18px_18px_18px_4px] px-4 py-3 max-w-[84%]">
                  <p className="text-sm text-[#F0F5F0] leading-relaxed font-vernacular">
                    {WELCOME_MESSAGES[language]}
                  </p>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {messages.map(message => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  language={language}
                />
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#A3E635] flex items-center justify-center text-[#0A0F0A] text-xs flex-shrink-0 font-semibold">
                  FG
                </div>
                <div className="bg-[#111811] border border-[rgba(163,230,53,0.08)] rounded-[18px_18px_18px_4px] px-4 py-3">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-[#A3E635] rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 0.6,
                          delay: i * 0.1,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {apiErrorMessage && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#A3E635] flex items-center justify-center text-[#0A0F0A] text-xs flex-shrink-0 font-semibold">
                  FG
                </div>
                <div className="bg-[#111811] border border-[rgba(163,230,53,0.15)] rounded-[18px_18px_18px_4px] px-4 py-3 max-w-[84%]">
                  <p className="text-sm text-[#F0F5F0] leading-relaxed font-vernacular">
                    {apiErrorMessage}
                  </p>
                  <button
                    type="button"
                    onClick={retryLastMessage}
                    className="mt-2 text-xs text-[#A3E635] underline underline-offset-2"
                  >
                    {RETRY_TEXT[language]}
                  </button>
                </div>
              </div>
            )}

            {showCalculator && (
              <MaturityCalculator language={language} defaultRate={TRIGGER_FD.rate} />
            )}
            {showBooking && (
              <BookingFlow
                language={language}
                bankName={TRIGGER_FD.bank}
                rate={TRIGGER_FD.rate}
                onClose={() => setShowBooking(false)}
              />
            )}
          </motion.div>
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-[rgba(163,230,53,0.08)] bg-[#111811] px-4 py-3 relative">
        {showInstallPrompt && (
          <div className="absolute left-0 right-0 bottom-full bg-[#1C2A1C] border-t border-[rgba(163,230,53,0.15)] px-4 py-3">
            <p className="text-xs text-[#F0F5F0] font-vernacular">{INSTALL_TEXT[language]}</p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={installApp}
                className="px-3 py-1.5 rounded-md bg-[#A3E635] text-[#0A0F0A] text-xs font-semibold"
              >
                जोड़ें
              </button>
              <button
                type="button"
                onClick={dismissInstallPrompt}
                className="px-3 py-1.5 rounded-md border border-[rgba(163,230,53,0.18)] text-[#7A9A7A] text-xs"
              >
                बाद में
              </button>
            </div>
          </div>
        )}

        {isListening && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#1C2A1C] border border-[#A3E635] text-xs text-[#A3E635] font-vernacular">
            {LISTENING_TEXT[language]}
          </div>
        )}

        <form
          onSubmit={e => {
            e.preventDefault();
            sendUserMessage(draft);
          }}
          className="flex gap-2 items-end"
        >
          {isSupported && (
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`relative w-[42px] h-[42px] rounded-full flex items-center justify-center border transition-colors ${
                isListening
                  ? 'bg-[#223322] border-[#A3E635] text-[#A3E635]'
                  : 'bg-[#1C2A1C] border-[rgba(163,230,53,0.12)] text-[#7A9A7A]'
              }`}
              aria-label={isListening ? 'Stop listening' : 'Start voice input'}
            >
              {isListening && (
                <span className="absolute inset-0 rounded-full bg-[#A3E635]/30 animate-ping" />
              )}
              <Mic className="w-4 h-4 relative z-10" />
            </button>
          )}
          <div className="flex-1 bg-[#1C2A1C] border border-[rgba(163,230,53,0.12)] rounded-[24px] px-4 py-2.5">
            <textarea
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder={PLACEHOLDER[language]}
              className="w-full bg-transparent text-sm text-[#F0F5F0] placeholder:text-[#3D5C3D] resize-none outline-none max-h-24 leading-relaxed font-vernacular"
              rows={1}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendUserMessage(draft);
                }
              }}
            />
          </div>
          <motion.button
            type="submit"
            disabled={isLoading || !draft.trim()}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[42px] h-[42px] bg-[#A3E635] rounded-full flex items-center justify-center disabled:opacity-40 transition-opacity"
          >
            <Send className="w-4 h-4 text-[#0A0F0A]" />
          </motion.button>
        </form>
      </div>
    </div>
  );
}
