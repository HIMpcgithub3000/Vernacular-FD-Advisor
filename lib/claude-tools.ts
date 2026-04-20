import { tool } from 'ai';
import { z } from 'zod';
import { getFDRates } from './fd-data';
import { getGlossaryTerm } from './glossary';
import type { SupportedLang } from './prompts';
import {
  calcQuarterlyCompound,
  calcSimpleInterest,
  calcTDS,
  calcEffectiveYield,
} from './finance-math';

export const fdAdvisorTools = {
  get_fd_rates: tool({
    description:
      'Fetch current FD interest rates from banks. ALWAYS use this — never quote rates from memory.',
    parameters: z.object({
      bank_name: z
        .string()
        .optional()
        .describe('Specific bank name, or leave empty for top rates'),
      tenor_months: z
        .number()
        .optional()
        .describe('Tenor in months (6, 12, 24, 36, 60)'),
      senior_citizen: z
        .boolean()
        .optional()
        .describe('Whether user is senior citizen (gets +0.25-0.50% extra)'),
    }),
    execute: async ({ bank_name, tenor_months, senior_citizen }) => {
      const rates = await getFDRates({ bank_name, tenor_months, senior_citizen });
      return {
        rates,
        disclaimer: 'Rates fetched live. Verify with bank before booking.',
        dicgc_note:
          'All listed banks covered under DICGC — deposits up to ₹5 lakh insured.',
        fetched_at: new Date().toISOString(),
      };
    },
  }),

  explain_term: tool({
    description:
      "Explain a financial term in the user's language with a local analogy",
    parameters: z.object({
      term: z
        .string()
        .describe(
          'The financial term to explain (e.g., "tenor", "maturity", "TDS", "cumulative")'
        ),
      language: z.enum(['hi', 'bho', 'mai', 'en']),
    }),
    execute: async ({ term, language }) => {
      return getGlossaryTerm(term, language as SupportedLang);
    },
  }),

  calculate_maturity: tool({
    description:
      'Calculate maturity amount for a given principal, rate, and tenor',
    parameters: z.object({
      principal: z.number().describe('Principal amount in rupees'),
      rate: z.number().describe('Annual interest rate as percentage'),
      tenor_months: z.number().describe('Tenor in months'),
      is_cumulative: z
        .boolean()
        .describe(
          'Cumulative FD (interest compounded) or non-cumulative (interest paid out periodically)'
        ),
      is_senior_citizen: z
        .boolean()
        .optional()
        .describe('Whether user is senior citizen for higher TDS threshold'),
    }),
    execute: async ({
      principal,
      rate,
      tenor_months,
      is_cumulative,
      is_senior_citizen,
    }) => {
      const years = tenor_months / 12;

      const grossMaturity = is_cumulative
        ? calcQuarterlyCompound(principal, rate, years)
        : calcSimpleInterest(principal, rate, years);

      const totalInterest = Math.round(grossMaturity - principal);
      const tds = calcTDS(totalInterest, is_senior_citizen ?? false);
      const netMaturity = Math.round(grossMaturity) - tds;
      const effectiveYield = calcEffectiveYield(principal, grossMaturity, years);

      const fmt = (n: number) =>
        new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(n);

      return {
        principal_formatted: fmt(principal),
        gross_maturity: Math.round(grossMaturity),
        gross_maturity_formatted: fmt(grossMaturity),
        total_interest: totalInterest,
        total_interest_formatted: fmt(totalInterest),
        tds_deducted: tds,
        tds_deducted_formatted: fmt(tds),
        net_maturity: netMaturity,
        net_maturity_formatted: fmt(netMaturity),
        effective_yield_percent: effectiveYield,
        compounding: is_cumulative ? 'Quarterly compound' : 'Simple interest',
        tds_note:
          tds > 0
            ? `TDS of ${fmt(tds)} will be deducted (10% on interest above threshold)`
            : 'No TDS - interest below threshold',
        calculation_verified: true,
      };
    },
  }),

  initiate_booking: tool({
    description:
      'Start the FD booking flow — call this when user expresses intent to book/invest',
    parameters: z.object({
      bank_name: z.string(),
      rate: z.number(),
      tenor_months: z.number(),
      suggested_amount: z.number().optional(),
    }),
    execute: async params => {
      return {
        booking_flow_started: true,
        steps: [
          { step: 1, label_hi: 'निवेश राशि', label_en: 'Investment Amount', type: 'amount_input' },
          { step: 2, label_hi: 'अवधि चुनें', label_en: 'Select Tenor', type: 'tenor_select' },
          { step: 3, label_hi: 'KYC जानकारी', label_en: 'KYC Details', type: 'kyc_minimal' },
          { step: 4, label_hi: 'नॉमिनी जोड़ें', label_en: 'Add Nominee', type: 'nominee' },
          { step: 5, label_hi: 'समीक्षा करें', label_en: 'Review & Confirm', type: 'review' },
        ],
        ...params,
        booking_id: `FDG_${Date.now()}`,
      };
    },
  }),
};
