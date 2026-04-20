import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { bank_name, amount, tenor_months, rate, kyc, nominee } = body;

  if (!bank_name || !amount || !tenor_months || !rate) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const r = rate / 100;
  const t = tenor_months / 12;
  const maturity = amount * Math.pow(1 + r / 4, 4 * t);
  const interest = maturity - amount;
  const tds = interest > 40000 ? interest * 0.1 : 0;

  const booking = {
    booking_id: `FDG_${Date.now()}_${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    status: 'CONFIRMED',
    bank_name,
    amount,
    tenor_months,
    rate,
    maturity_amount: Math.round(maturity),
    total_interest: Math.round(interest),
    tds_deducted: Math.round(tds),
    net_maturity: Math.round(maturity - tds),
    kyc: kyc || null,
    nominee: nominee || null,
    booked_at: new Date().toISOString(),
    maturity_date: new Date(
      Date.now() + tenor_months * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
    whatsapp_message: `✅ FD बुक हो गया!\n🏦 ${bank_name}\n💰 ₹${amount.toLocaleString('en-IN')} @ ${rate}% — ${tenor_months} महीने\n📅 मैच्योरिटी: ₹${Math.round(maturity - tds).toLocaleString('en-IN')}\n🛡️ DICGC insured ✓`,
  };

  return NextResponse.json(booking);
}
