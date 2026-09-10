import { db } from "../data/db";

export async function listInvoicesWithOwners(): Promise<
  Array<{ invoiceId: string; ownerEmail: string }>
> {
  const invoices = await db.invoices.all();
  const result: Array<{ invoiceId: string; ownerEmail: string }> = [];
  for (const invoice of invoices) {
    const owner = await db.users.findById(invoice.ownerId);
    result.push({ invoiceId: invoice.id, ownerEmail: owner?.email ?? "" });
  }
  return result;
}
