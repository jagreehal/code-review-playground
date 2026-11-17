/** The sum of the line amounts, in cents. */
export function subtotalCents(lineCents: number[]): number {
  return lineCents.reduce((sum, cents) => sum + cents, 0);
}

/** `totalCents` less `percent`% off, rounded once to whole cents. */
export function applyDiscountCents(totalCents: number, percent: number): number {
  return Math.round(totalCents * (1 - percent / 100));
}

/** `totalCents` with tax at `rate` (0.2 for 20%) added, rounded once to whole cents. */
export function addTaxCents(totalCents: number, rate: number): number {
  return Math.round(totalCents * (1 + rate));
}
