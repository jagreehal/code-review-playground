export function isWithinBusinessHours(utcTimestamp: string): boolean {
  const date = new Date(utcTimestamp);
  const hour = date.getHours();
  return hour >= 9 && hour < 17;
}

export function daysUntil(deadline: string): number {
  const now = new Date();
  const diff = new Date(deadline).getTime() - now.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function startOfDay(dateString: string): Date {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date;
}
