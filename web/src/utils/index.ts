export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-IN").format(n);
}
