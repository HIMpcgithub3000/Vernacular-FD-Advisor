import { NextResponse } from 'next/server';
import { getFDRates } from '@/lib/fd-data';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const bank_name = searchParams.get('bank') || undefined;
  const tenor_months = searchParams.get('tenor')
    ? parseInt(searchParams.get('tenor')!)
    : undefined;
  const senior_citizen = searchParams.get('senior') === 'true';

  const rates = await getFDRates({ bank_name, tenor_months, senior_citizen });

  return NextResponse.json({
    rates,
    fetched_at: new Date().toISOString(),
    dicgc_note: 'All banks covered under DICGC — deposits up to ₹5 lakh insured.',
  });
}
