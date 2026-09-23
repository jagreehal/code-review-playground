import { db } from "../data/db";

export type Session = {
  userId: string;
};

export async function getSession(userId: string): Promise<Session | undefined> {
  if (!userId) {
    return undefined;
  }
  return { userId };
}

export async function getInvoice(userId: string, invoiceId: string) {
  const session = await getSession(userId);
  if (!session) {
    throw new Error("Unauthorized");
  }
  return db.invoices.findById(invoiceId);
}

export async function downloadInvoicePdf(userId: string, invoiceId: string) {
  const session = await getSession(userId);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const invoice = await db.invoices.findById(invoiceId);
  return { fileName: `${invoiceId}.pdf`, invoice };
}
