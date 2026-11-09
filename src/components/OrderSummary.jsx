import { useState } from "react";
import { formatPrice, lineDetail } from "../data/products";
import { getTotals, PROMO_CODES } from "../data/pricing";

export default function OrderSummary({ lines, promo, onPromoChange }) {
  const [code, setCode] = useState(promo);
  const [error, setError] = useState("");
  const totals = getTotals(lines, promo);

  function applyCode(e) {
    e.preventDefault();
    const clean = code.trim().toUpperCase();
    if (PROMO_CODES[clean]) {
      onPromoChange(clean);
      setError("");
    } else {
      setError("That code doesn't work. Check the spelling?");
    }
  }

  return (
    <aside className="rounded-3xl bg-paper p-6 md:sticky md:top-24">
      <h2 className="font-display text-2xl">Your order</h2>

      <ul className="mt-5 space-y-4">
        {lines.map((line) => (
          <li key={line.key} className="flex gap-3">
            <img
              src={line.image}
              alt=""
              className="h-16 w-12 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1 text-sm">
              <p className="font-medium">
                {line.name} × {line.qty}
              </p>
              <p className="text-forest-soft">{lineDetail(line)}</p>
            </div>
            <p className="text-sm">{formatPrice(line.price * line.qty)}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={applyCode} className="mt-6">
        <label className="text-sm font-medium" htmlFor="promo">
          Promo code
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="promo"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="BLOOM10"
            className="min-w-0 flex-1 rounded-full border border-line bg-cream px-4 py-2.5 uppercase outline-none focus-visible:ring-2 focus-visible:ring-forest"
          />
          <button
            type="submit"
            className="rounded-full border border-forest/20 px-4 text-sm hover:border-forest"
          >
            Apply
          </button>
        </div>
        {error && <p className="mt-1 text-sm text-rose">{error}</p>}
        {promo && !error && (
          <p className="mt-1 text-sm text-forest">
            ✓ {promo} applied: {PROMO_CODES[promo].label}
          </p>
        )}
        {!promo && (
          <p className="mt-1 text-xs text-forest-soft">Psst, try BLOOM10 🌷</p>
        )}
      </form>

      <dl className="mt-6 space-y-2 border-t border-line pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-forest-soft">Subtotal</dt>
          <dd>{formatPrice(totals.subtotal)}</dd>
        </div>
        {totals.discount > 0 && (
          <div className="flex justify-between text-forest">
            <dt>Promo</dt>
            <dd>−{formatPrice(totals.discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-forest-soft">Delivery</dt>
          <dd>
            {totals.delivery === 0 ? "Free" : formatPrice(totals.delivery)}
          </dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 text-lg font-medium">
          <dt>Total</dt>
          <dd>{formatPrice(totals.total)}</dd>
        </div>
      </dl>
    </aside>
  );
}
