import { db } from "../data/db";

export async function incrementCounter(name: string): Promise<number> {
  const current = await db.counters.get(name);
  const next = current + 1;
  await db.counters.set(name, next);
  return next;
}

export async function updateInvoiceAmount(invoiceId: string, delta: number): Promise<void> {
  const invoice = await db.invoices.findById(invoiceId);
  if (!invoice) {
    return;
  }
  const updated = { ...invoice, amount: invoice.amount + delta };
  await db.invoices.insert(updated);
}
