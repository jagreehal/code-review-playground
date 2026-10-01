export function logRequest(headers: Record<string, string>, body: unknown): void {
  console.log("Incoming request", {
    authorization: headers.authorization,
    cookie: headers.cookie,
    body,
  });
}

export function logPasswordReset(token: string, email: string): void {
  console.log(`Password reset for ${email}: https://app.example.com/reset?token=${token}`);
}

export function logPayment(payload: { cardNumber: string; cvv: string; amount: number }): void {
  console.log(`Charging card ${payload.cardNumber} cvv ${payload.cvv} for ${payload.amount}`);
}
