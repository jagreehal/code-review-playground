export async function fetchPreview(url: string): Promise<string> {
  const response = await fetch(url);
  return response.text();
}

export async function checkWebhook(target: string): Promise<number> {
  const response = await fetch(target, { method: "HEAD" });
  return response.status;
}

export async function importRemoteSpec(specUrl: string): Promise<unknown> {
  const response = await fetch(specUrl);
  return response.json();
}
