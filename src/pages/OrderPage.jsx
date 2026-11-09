import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { findProduct, formatPrice, lineDetail } from "../data/products";
import NotFound from "./NotFound";
import OrderProgress from "../components/OrderProgress";
import { useTitle } from "../hooks/useTitle";
import { ease } from "../lib/motion";

const paymentLabels = {
  card: "Card (demo)",
  gcash: "GCash (demo)",
  cod: "Cash on delivery",
};

export default function OrderPage({ orders }) {
  const { id } = useParams();
  const order = orders.find((o) => o.id === id);
  useTitle(order ? `Order ${order.id}` : "Order not found");
  if (!order) return <NotFound />;

  return (
    <section className="mx-auto max-w-3xl px-5 py-14 md:px-10">
      <svg viewBox="0 0 52 52" className="h-16 w-16 text-forest" aria-hidden="true">
        <motion.circle
          cx="26"
          cy="26"
          r="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease }}
        />
        <motion.path
          d="M15 27l7 7 15-16"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease }}
      >
        <h1 className="mt-6 font-display text-4xl md:text-5xl">
          Thank you, {order.yourName.split(" ")[0]}! 🌷
        </h1>
        <p className="mt-3 text-lg text-forest-soft">
          Your order for {order.recipientName} is in good hands. Order{" "}
          <strong className="text-forest">{order.id}</strong>
        </p>

        <OrderProgress order={order} className="mt-8" />

        <ul className="mt-8 space-y-3">
          {order.lines.map((line) => {
            const image = findProduct(line.productId)?.image;
            return (
              <li
                key={`${line.productId}-${line.size}-${line.date}-${line.message}`}
                className="flex gap-4 rounded-2xl bg-paper p-4"
              >
                {image && (
                  <img src={image} alt="" className="h-20 w-16 rounded-xl object-cover" />
                )}
                <div className="flex-1 text-sm">
                  <p className="font-display text-lg">
                    {line.name} × {line.qty}
                  </p>
                  <p className="text-forest-soft">{lineDetail(line)}</p>
                  {line.message && (
                    <p className="mt-1 italic text-forest-soft">💌 “{line.message}”</p>
                  )}
                </div>
                <p className="text-sm">{formatPrice(line.price * line.qty)}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 grid gap-4 rounded-2xl bg-paper p-5 text-sm sm:grid-cols-2">
          <div>
            <p className="font-medium">Delivering to</p>
            <p className="mt-1 text-forest-soft">
              {order.recipientName}
              <br />
              {order.address}, {order.city}
            </p>
          </div>
          <div>
            <p className="font-medium">Payment</p>
            <p className="mt-1 text-forest-soft">
              {paymentLabels[order.payment]} · Total {formatPrice(order.totals.total)}
            </p>
            <p className="mt-1 text-forest-soft">Receipt for {order.email}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/shop" className="rounded-full bg-forest px-6 py-3 text-cream">
            Keep shopping
          </Link>
          <Link
            to="/account"
            className="rounded-full border border-forest/20 px-6 py-3 hover:border-forest"
          >
            See all orders
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
