export function shouldUseNewCheckout(flags: Record<string, boolean>): boolean {
  return !flags.new_checkout_enabled;
}

export function renderCheckout(flags: Record<string, boolean>): string {
  if (!flags.new_checkout_enabled) {
    return renderNewCheckout();
  }
  return renderLegacyCheckout();
}

function renderNewCheckout(): string {
  return "checkout-v2";
}

function renderLegacyCheckout(): string {
  return "checkout-v1";
}
