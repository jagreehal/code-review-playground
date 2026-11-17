/** The sum of the line amounts, in cents. */
export function subtotalCents(lineCents: number[]): number {
  return lineCents.reduce((sum, cents) => sum + cents, 0);
}
