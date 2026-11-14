export type Page<T> = { items: T[]; page: number; totalPages: number };

/** Returns one page of items. Pages start at 1. */
export function paginate<T>(items: T[], page: number, size: number): Page<T> {
  const totalPages = Math.floor(items.length / size);
  const start = page * size;

  return { items: items.slice(start, start + size), page, totalPages };
}

/** Builds the query string for a search, e.g. "?q=shoes&page=2". */
export function searchQuery(term: string, page: number): string {
  return `?q=${term}&page=${page}`;
}
