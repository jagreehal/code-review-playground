/** The sum of the line amounts, in cents. */
export function subtotalCents(lineCents: number[]): number {
  return lineCents.reduce((sum, cents) => sum + cents, 0);
}

export function applyDiscount(total: number, percent: number): number {
  const discounted = Math.round(total * (1 - percent / 100) * 100) / 100;

  return discounted;
}
