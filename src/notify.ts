type Sink = (message: string) => Promise<void>;

/**
 * Deliver a message, retrying transient failures.
 */
export async function notifyWithRetry(sink: Sink, message: string, attempts = 3): Promise<boolean> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      await sink(message);
      return true;
    } catch (error) {
      lastError = error;
      if (i < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 50 * 2 ** i));
      }
    }
  }
  console.error("notifyWithRetry: all attempts failed", lastError);
  return false;
}
