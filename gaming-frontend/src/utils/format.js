/* Display helpers. The catalogue images show retail pricing in USD with
   two decimals (e.g. $140.65), so that is what we render. */

const USD = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(value) {
  const n = Number(value);
  return `$${USD.format(Number.isFinite(n) ? n : 0)}`;
}

/* The catalogue can hand back whole numbers; show those without ".00" so a
   $12 accessory does not read as $12.00 next to a $140.65 controller. */
export function formatPriceShort(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "$0";
  return Number.isInteger(n) ? `$${n}` : formatPrice(n);
}

export function pluralise(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural || `${singular}s`}`;
}
