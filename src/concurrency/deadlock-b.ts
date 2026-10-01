import { acquire, release } from "./locks";

export async function reconcileLedger(amount: number): Promise<number> {
  await acquire("ledger");
  await acquire("accounts");
  try {
    await new Promise((resolve) => setTimeout(resolve, 5));
    return amount;
  } finally {
    release("accounts");
    release("ledger");
  }
}
