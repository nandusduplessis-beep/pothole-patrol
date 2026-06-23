export function formatZAR(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return `R ${(n / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `R ${(n / 1_000_000).toFixed(1)}M`;
  if (abs >= 10_000) return `R ${(n / 1_000).toFixed(0)}k`;
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-ZA").format(n);
}