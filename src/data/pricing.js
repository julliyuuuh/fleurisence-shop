export const FREE_DELIVERY = 2500;
export const DELIVERY_FEE = 150;

export const PROMO_CODES = {
  BLOOM10: { label: "10% off", percent: 10 },
};

export function getTotals(lines, promoCode = "") {
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
  const promo = PROMO_CODES[promoCode];
  const discount = promo ? Math.round((subtotal * promo.percent) / 100) : 0;
  const delivery =
    subtotal === 0 || subtotal >= FREE_DELIVERY ? 0 : DELIVERY_FEE;
  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  };
}
