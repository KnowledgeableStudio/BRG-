export const BASE_PRICE = 24.99;
export const DEFAULT_TAX_RATE = 0.08875;

export function getTaxRate() {
  const configuredRate = Number.parseFloat(process.env.NEXT_PUBLIC_TAX_RATE ?? "");
  return Number.isFinite(configuredRate) && configuredRate >= 0 ? configuredRate : DEFAULT_TAX_RATE;
}

export function roundCurrency(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateOrderTotals(subtotal: number, taxRate = getTaxRate()) {
  const safeSubtotal = Math.max(0, subtotal);
  const tax = roundCurrency(safeSubtotal * taxRate);
  const total = roundCurrency(safeSubtotal + tax);

  return {
    subtotal: roundCurrency(safeSubtotal),
    tax,
    total,
    taxRate
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}
