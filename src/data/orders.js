// Things that depend on "right now" (the clock) live here, outside
// components, so React components stay pure.

export function createOrder(cartLines, details, totals) {
  return {
    id: "FL-" + Date.now().toString(36).toUpperCase().slice(-6),
    placedAt: new Date().toISOString(),
    lines: cartLines.map((line) => ({
      productId: line.id,
      name: line.name,
      size: line.size,
      date: line.date,
      message: line.message,
      qty: line.qty,
      price: line.price,
    })),
    ...details,
    totals,
  };
}

function isoDay(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d - tz).toISOString().slice(0, 10);
}

export const tomorrowIso = () => isoDay(1);

// Demo status: before the delivery day it's being prepared, on the day it's
// out for delivery, after that it's delivered.
export function orderStatus(order) {
  const dates = order.lines
    .map((l) => l.date)
    .filter(Boolean)
    .sort();
  const last = dates.at(-1);
  const today = isoDay(0);
  if (!last || last > today) return { step: 0, label: "Preparing" };
  if (last === today) return { step: 1, label: "Out for delivery" };
  return { step: 2, label: "Delivered" };
}

export function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export const formatPlacedAt = (iso) =>
  new Intl.DateTimeFormat("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
