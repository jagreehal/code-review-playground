export async function fetchInventory(sku: string): Promise<unknown> {
  const response = await fetch(`https://inventory.internal.example.com/api/items/${sku}`);
  return response.json();
}

export function downloadFile(url: string): Promise<string> {
  return fetch(url).then((response) => response.text());
}

export async function notifyWebhook(url: string, payload: unknown): Promise<void> {
  await fetch(url, { method: "POST", body: JSON.stringify(payload) });
}
