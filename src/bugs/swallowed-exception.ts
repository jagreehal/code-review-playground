import { db } from "../data/db";

export async function getInvoicesForUser(userId: string) {
  try {
    return await db.invoices.findByOwner(userId);
  } catch {
    return [];
  }
}

export function parseAmount(raw: string): number {
  try {
    return Number.parseInt(raw, 10);
  } catch {
    return 0;
  }
}

export async function chargeCustomer(customerId: string): Promise<boolean> {
  try {
    await db.counters.set(`charge:${customerId}`, 1);
    return true;
  } catch {
    return false;
  }
}
