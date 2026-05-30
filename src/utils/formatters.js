export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const preciseCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(value) {
  return currencyFormatter.format(value || 0);
}

export function formatPreciseCurrency(value) {
  return preciseCurrencyFormatter.format(value || 0);
}

export function formatPercent(value) {
  if (!Number.isFinite(value)) {
    return "0.00%";
  }

  return `${(value * 100).toFixed(2)}%`;
}

export function formatRate(value) {
  return `${Number(value || 0).toFixed(2)}%`;
}
