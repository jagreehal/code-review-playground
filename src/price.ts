/** Format integer pence as a pound string, e.g. 1234 -> "£12.34". */
export function formatPence(pence: number): string {
  const absPence = Math.abs(pence);
  const pounds = Math.floor(absPence / 100);
  const penceRemainder = absPence % 100;
  return `${pence < 0 ? '-' : ''}£${pounds}.${String(penceRemainder).padStart(2, '0')}`;
}
