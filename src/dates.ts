/** Midnight at the start of a calendar day, as an ISO timestamp. */
export function startOfDayIso(year: number, month: number, day: number): string {
  return new Date(year, month - 1, day).toISOString();
}
