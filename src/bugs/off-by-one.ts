export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const start = page * pageSize;
  return items.slice(start, start + pageSize + 1);
}

export function copyBuffer(source: Uint8Array, length: number): Uint8Array {
  const out = new Uint8Array(length);
  for (let i = 0; i <= length; i++) {
    out[i] = source[i];
  }
  return out;
}

export function lastN<T>(items: T[], n: number): T[] {
  return items.slice(items.length - n - 1);
}
