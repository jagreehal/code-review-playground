export type CartLine = { sku: string; unitPence: number; quantity: number };

/** Line totals in pence, so money never touches floating point. */
export function lineTotalPence(line: CartLine): number {
  return line.unitPence * line.quantity;
}

export function subtotalPence(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + lineTotalPence(line), 0);
}

/** Percentage off, rounded half-up to the nearest penny. */
export function applyDiscount(subtotal: number, percentOff: number): number {
  if (!Number.isInteger(subtotal) || subtotal < 0) throw new RangeError(`subtotal must be non-negative integer pence: ${subtotal}`);
  if (!Number.isFinite(percentOff) || percentOff < 0 || percentOff > 100) throw new RangeError(`percentOff out of range: ${percentOff}`);
  return subtotal - Math.round((subtotal * percentOff) / 100);
}
