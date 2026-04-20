'use client';

import { motion } from 'framer-motion';
import type { Message } from 'ai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Language } from './LanguageToggle';

type RateRow = {
  bank_name: string;
  effective_rate: number;
};

function getToolRates(message: Message): RateRow[] {
  const msg = message as Message & {
    toolInvocations?: unknown[];
    parts?: unknown[];
  };

  const fromInvocations =
    msg.toolInvocations
      ?.filter(
        t =>
          typeof t === 'object' &&
          t !== null &&
          (t as { toolName?: string }).toolName === 'get_fd_rates' &&
          (t as { state?: string }).state === 'result'
      )
      .flatMap(t => ((t as { result?: { rates?: RateRow[] } }).result?.rates ?? [])) ?? [];

  const fromParts =
    msg.parts
      ?.filter(
        p =>
          typeof p === 'object' &&
          p !== null &&
          (p as { type?: string }).type === 'tool-invocation'
      )
      .flatMap(p =>
        (p as { toolInvocation?: { toolName?: string; state?: string; result?: { rates?: RateRow[] } } })
          .toolInvocation?.toolName === 'get_fd_rates' &&
        (p as { toolInvocation?: { toolName?: string; state?: string; result?: { rates?: RateRow[] } } })
          .toolInvocation?.state === 'result'
          ? ((p as {
              toolInvocation?: {
                toolName?: string;
                state?: string;
                result?: { rates?: RateRow[] };
              };
            }).toolInvocation?.result?.rates ?? [])
          : []
      ) ?? [];

  return [...fromInvocations, ...fromParts];
}

export default function MessageBubble({
  message,
}: {
  message: Message;
  language: Language;
}) {
  const isUser = message.role === 'user';

  const textContent = typeof message.content === 'string' ? message.content : '';
  const rates = getToolRates(message);
  const hasRateRows = rates.length > 0;

  if (!textContent.trim() && !hasRateRows) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#A3E635] flex items-center justify-center text-[#0A0F0A] text-xs flex-shrink-0 font-semibold">
          FG
        </div>
      )}

      <div className="max-w-[86%] space-y-2">
        {!!textContent.trim() && (
          <div
            className={`px-4 py-3 border text-[#F0F4FF] ${
              isUser
                ? 'bg-[#162016] border-transparent rounded-[18px_18px_4px_18px]'
                : 'bg-[#111811] border-[rgba(163,230,53,0.08)] rounded-[18px_18px_18px_4px]'
            }`}
          >
            {isUser ? (
              <p
                className="text-sm leading-relaxed whitespace-pre-wrap font-vernacular text-[#F0F5F0]"
                style={{ wordBreak: 'break-word' }}
              >
                {textContent}
              </p>
            ) : (
              <div className="text-sm leading-relaxed font-vernacular text-[#F0F5F0] break-words">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => (
                      <p className="mb-2 last:mb-0">{children}</p>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-[#A3E635] font-semibold">{children}</strong>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-4 text-[#F0F5F0] mb-2 last:mb-0">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-4 text-[#F0F5F0] mb-2 last:mb-0">{children}</ol>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-2">
                        <table className="markdown-table">{children}</table>
                      </div>
                    ),
                  }}
                >
                  {textContent}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}

        {!isUser && hasRateRows && (
          <div className="bg-[#111811] border border-[rgba(163,230,53,0.08)] rounded-2xl overflow-hidden">
            {rates.slice(0, 6).map((rate, idx) => {
              const initials = rate.bank_name
                .split(' ')
                .slice(0, 2)
                .map(w => w[0])
                .join('')
                .toUpperCase();
              const isTop = idx === 0;
              return (
                <div
                  key={`${rate.bank_name}-${rate.effective_rate}-${idx}`}
                  className="flex items-center gap-3 px-3 py-3 border-b border-[rgba(163,230,53,0.08)] last:border-b-0"
                >
                  <div className="w-9 h-9 rounded-full bg-[#1C2A1C] text-[#7A9A7A] flex items-center justify-center text-xs font-semibold">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#F0F5F0] truncate">{rate.bank_name}</p>
                  </div>
                  <div
                    className={`text-sm font-numbers font-semibold ${
                      isTop ? 'text-[#A3E635]' : 'text-[#F0F5F0]'
                    }`}
                  >
                    {rate.effective_rate.toFixed(2)}%
                  </div>
                  <button className="w-7 h-7 rounded-full bg-[#4ADE80] text-[#0A0F0A] text-xs">
                    →
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
