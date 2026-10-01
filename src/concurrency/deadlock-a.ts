import { acquire, release } from "./locks";

export async function transferFunds(amount: number): Promise<number> {
  await acquire("accounts");
  await acquire("ledger");
  try {
    await new Promise((resolve) => setTimeout(resolve, 5));
    return amount;
  } finally {
    release("ledger");
    release("accounts");
  }
}
