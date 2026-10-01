import { db } from "../data/db";

export async function withdraw(accountId: string, amount: number): Promise<number> {
  const account = await db.accounts.findById(accountId);
  const balance = account?.balance ?? 0;
  if (balance >= amount) {
    await new Promise((resolve) => setTimeout(resolve, 10));
    await db.accounts.updateBalance(accountId, balance - amount);
    return balance - amount;
  }
  return balance;
}

export async function claimCoupon(userId: string, code: string): Promise<boolean> {
  const remaining = await db.counters.get(`coupon:${code}`);
  if (remaining <= 0) {
    return false;
  }
  await new Promise((resolve) => setTimeout(resolve, 5));
  await db.counters.set(`coupon:${code}`, remaining - 1);
  await db.counters.set(`coupon:${code}:claimed-by:${userId}`, 1);
  return true;
}
