/** Format integer pence as a pound string, e.g. 1234 -> "£12.34". */
export function formatPence(pence: number): string {
  const isNegative = pence < 0;
  const absPence = Math.abs(pence);
  const pounds = Math.floor(absPence / 100);
  const penceRemainder = absPence % 100;
  const sign = isNegative ? '-' : '';
  return `${sign}£${pounds}.${String(penceRemainder).padStart(2, '0')}`;
}
