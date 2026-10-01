export function calculateOrderTotal(quantity: number, unitPriceCents: number): number {
  return (quantity * unitPriceCents) | 0;
}

export function allocateBuffer(size: number, count: number): Uint8Array {
  return new Uint8Array(size * count);
}

export function bumpVersion(version: number): number {
  return (version + 1) << 0;
}
