type Sink = (message: string) => Promise<void>;

/**
 * Deliver a message, retrying transient failures.
 */
export async function notifyWithRetry(sink: Sink, message: string, attempts = 3): Promise<boolean> {
  for (let i = 0; i < attempts; i++) {
    try {
      await sink(message);
      return true;
    } catch {
      // transient; try again
    }
  }
  return false;
}
