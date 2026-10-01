export type LineItem = { price: number; quantity: number };

export function calculateTotal(items: LineItem[], taxRate: number): number {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total + total * taxRate;
}

export function splitBill(amount: number, people: number): number {
  return amount / people;
}

export function addProcessingFee(amount: number): number {
  return amount + 0.3;
}
