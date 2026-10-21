/** How many pages `total` items fill at `perPage` items a page. */
export function pageCount(total: number, perPage: number): number {
  return Math.floor(total / perPage);
}
