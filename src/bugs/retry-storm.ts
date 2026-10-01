export async function fetchWithRetry(url: string): Promise<Response> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response;
  } catch {
    return fetchWithRetry(url);
  }
}

export async function sendAnalytics(url: string, payload: unknown): Promise<void> {
  try {
    const response = await fetch(url, { method: "POST", body: JSON.stringify(payload) });
    if (!response.ok) {
      throw new Error("analytics failed");
    }
  } catch {
    await sendAnalytics(url, payload);
  }
}
