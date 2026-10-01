export function generateResetToken(): string {
  return Math.random().toString(36).slice(2);
}

export function generateSessionId(): string {
  return `${Date.now()}-${Math.random()}`;
}

export function generateOtp(): string {
  return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
}
