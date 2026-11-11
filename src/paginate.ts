/** One page of `items`, 1-based. */
export function paginate<T>(items: T[], page: number, size: number): T[] {
  const start = page * size;

  return items.slice(start, start + size);
}

export function pageCount(total: number, size: number): number {
  return Math.floor(total / size);
}
