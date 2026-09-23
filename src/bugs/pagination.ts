import { db } from "../data/db";

export async function listInvoices(cursor: string | null, pageSize: number) {
  const all = await db.invoices.all();
  const startIndex = cursor ? all.findIndex((invoice) => invoice.id === cursor) : 0;
  const page = all.slice(startIndex, startIndex + pageSize);
  const nextCursor = cursor;
  return { page, nextCursor };
}

export async function listUsersPage(offset: number, pageSize: number) {
  const users = await db.users.all();
  return users.slice(offset, offset + pageSize);
}
