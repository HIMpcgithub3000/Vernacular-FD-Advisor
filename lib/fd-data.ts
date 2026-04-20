export interface FDRate {
  bank_name: string;
  bank_type: 'PSU' | 'Private' | 'Small Finance' | 'Cooperative';
  rate_general: number;
  rate_senior: number;
  tenor_months: number;
  min_amount: number;
  dicgc_insured: boolean;
  booking_url?: string;
}

const FD_RATES: FDRate[] = [
  // 12-month rates
  { bank_name: 'Unity Small Finance Bank', bank_type: 'Small Finance', rate_general: 9.00, rate_senior: 9.50, tenor_months: 12, min_amount: 1000, dicgc_insured: true },
  { bank_name: 'Suryoday Small Finance Bank', bank_type: 'Small Finance', rate_general: 8.50, rate_senior: 9.00, tenor_months: 12, min_amount: 1000, dicgc_insured: true },
  { bank_name: 'Utkarsh Small Finance Bank', bank_type: 'Small Finance', rate_general: 8.50, rate_senior: 9.00, tenor_months: 12, min_amount: 1000, dicgc_insured: true },
  { bank_name: 'IDFC First Bank', bank_type: 'Private', rate_general: 7.75, rate_senior: 8.25, tenor_months: 12, min_amount: 10000, dicgc_insured: true },
  { bank_name: 'HDFC Bank', bank_type: 'Private', rate_general: 7.10, rate_senior: 7.60, tenor_months: 12, min_amount: 5000, dicgc_insured: true },
  { bank_name: 'Axis Bank', bank_type: 'Private', rate_general: 7.10, rate_senior: 7.85, tenor_months: 12, min_amount: 5000, dicgc_insured: true },
  { bank_name: 'SBI', bank_type: 'PSU', rate_general: 6.80, rate_senior: 7.30, tenor_months: 12, min_amount: 1000, dicgc_insured: true },
  { bank_name: 'Punjab National Bank', bank_type: 'PSU', rate_general: 6.75, rate_senior: 7.25, tenor_months: 12, min_amount: 1000, dicgc_insured: true },
  // 6-month rates
  { bank_name: 'Unity Small Finance Bank', bank_type: 'Small Finance', rate_general: 8.50, rate_senior: 9.00, tenor_months: 6, min_amount: 1000, dicgc_insured: true },
  { bank_name: 'Suryoday Small Finance Bank', bank_type: 'Small Finance', rate_general: 8.00, rate_senior: 8.50, tenor_months: 6, min_amount: 1000, dicgc_insured: true },
  { bank_name: 'IDFC First Bank', bank_type: 'Private', rate_general: 7.25, rate_senior: 7.75, tenor_months: 6, min_amount: 10000, dicgc_insured: true },
  { bank_name: 'SBI', bank_type: 'PSU', rate_general: 6.50, rate_senior: 7.00, tenor_months: 6, min_amount: 1000, dicgc_insured: true },
  // 24-month rates
  { bank_name: 'Unity Small Finance Bank', bank_type: 'Small Finance', rate_general: 8.75, rate_senior: 9.25, tenor_months: 24, min_amount: 1000, dicgc_insured: true },
  { bank_name: 'Suryoday Small Finance Bank', bank_type: 'Small Finance', rate_general: 8.50, rate_senior: 9.00, tenor_months: 24, min_amount: 1000, dicgc_insured: true },
  { bank_name: 'IDFC First Bank', bank_type: 'Private', rate_general: 7.50, rate_senior: 8.00, tenor_months: 24, min_amount: 10000, dicgc_insured: true },
  { bank_name: 'SBI', bank_type: 'PSU', rate_general: 6.75, rate_senior: 7.25, tenor_months: 24, min_amount: 1000, dicgc_insured: true },
  // 36-month rates
  { bank_name: 'Suryoday Small Finance Bank', bank_type: 'Small Finance', rate_general: 8.25, rate_senior: 8.75, tenor_months: 36, min_amount: 1000, dicgc_insured: true },
  { bank_name: 'Unity Small Finance Bank', bank_type: 'Small Finance', rate_general: 8.50, rate_senior: 9.00, tenor_months: 36, min_amount: 1000, dicgc_insured: true },
  { bank_name: 'SBI', bank_type: 'PSU', rate_general: 6.75, rate_senior: 7.25, tenor_months: 36, min_amount: 1000, dicgc_insured: true },
  { bank_name: 'HDFC Bank', bank_type: 'Private', rate_general: 7.00, rate_senior: 7.50, tenor_months: 36, min_amount: 5000, dicgc_insured: true },
  // 60-month rates
  { bank_name: 'Unity Small Finance Bank', bank_type: 'Small Finance', rate_general: 8.25, rate_senior: 8.75, tenor_months: 60, min_amount: 1000, dicgc_insured: true },
  { bank_name: 'Suryoday Small Finance Bank', bank_type: 'Small Finance', rate_general: 8.00, rate_senior: 8.50, tenor_months: 60, min_amount: 1000, dicgc_insured: true },
  { bank_name: 'SBI', bank_type: 'PSU', rate_general: 6.50, rate_senior: 7.00, tenor_months: 60, min_amount: 1000, dicgc_insured: true },
];

export async function getFDRates(params: {
  bank_name?: string;
  tenor_months?: number;
  senior_citizen?: boolean;
}) {
  let rates = [...FD_RATES];

  if (params.bank_name) {
    rates = rates.filter(r =>
      r.bank_name.toLowerCase().includes(params.bank_name!.toLowerCase())
    );
  }
  if (params.tenor_months) {
    rates = rates.filter(r => r.tenor_months === params.tenor_months);
  }

  return rates
    .sort((a, b) => {
      const rateA = params.senior_citizen ? a.rate_senior : a.rate_general;
      const rateB = params.senior_citizen ? b.rate_senior : b.rate_general;
      return rateB - rateA;
    })
    .slice(0, 8)
    .map(r => ({
      ...r,
      effective_rate: params.senior_citizen ? r.rate_senior : r.rate_general,
      safety_note:
        r.bank_type === 'Small Finance'
          ? 'Small Finance Bank — RBI regulated, DICGC insured ✓'
          : `${r.bank_type} Bank — DICGC insured ✓`,
    }));
}
