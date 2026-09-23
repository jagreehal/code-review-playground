/** Format integer pence as a pound string, e.g. 1234 -> "£12.34". */
export function formatPence(pence: number): string {
  const pounds = Math.floor(pence / 100);
  const rest: string = pence % 100;
  return `£${pounds}.${rest}`;
}
