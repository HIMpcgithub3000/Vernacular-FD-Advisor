export function calcQuarterlyCompound(
  principal: number,
  annualRate: number,
  years: number
): number {
  return principal * Math.pow(1 + annualRate / 100 / 4, 4 * years);
}

export function calcSimpleInterest(
  principal: number,
  annualRate: number,
  years: number
): number {
  return principal + (principal * annualRate * years) / 100;
}

export function calcTDS(interest: number, isSenior = false): number {
  const threshold = isSenior ? 50000 : 40000;
  if (interest <= threshold) return 0;
  return Math.round(interest * 0.1);
}

export function calcEffectiveYield(
  principal: number,
  maturity: number,
  years: number
): string {
  if (years <= 0 || principal <= 0) return '0.00';
  return (((maturity - principal) / principal) * (1 / years) * 100).toFixed(2);
}

