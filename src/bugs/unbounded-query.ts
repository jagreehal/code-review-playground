import { db } from "../data/db";

export async function exportAllInvoices(): Promise<string> {
  const invoices = await db.invoices.all();
  return invoices.map((invoice) => `${invoice.id},${invoice.amount}`).join("\n");
}

export async function searchUsers(query: string) {
  const users = await db.users.all();
  return users.filter((user) => user.email.includes(query));
}
