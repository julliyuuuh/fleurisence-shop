import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { products } from "../data/products";
import { useWishlist } from "../hooks/useWishlist";
import { useTitle } from "../hooks/useTitle";
import ProductCard from "../components/ProductCard";
import { ease } from "../lib/motion";

export default function WishlistPage({ onAdd }) {
  useTitle("Wishlist");
  const { ids } = useWishlist();
  const saved = products.filter((p) => ids.includes(p.id));

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:px-10">
      <h1 className="font-display text-4xl md:text-5xl">
        Your wishlist <span className="text-rose">♡</span>
      </h1>
      <p className="mt-2 text-forest-soft">
        {saved.length > 0 ? `${saved.length} saved for later` : "Nothing saved yet"}
      </p>

      {saved.length === 0 ? (
        <div className="mt-10 rounded-3xl bg-paper p-10 text-center">
          <p className="font-display text-2xl">Tap the ♡ on anything you love</p>
          <p className="mt-2 text-forest-soft">
            It'll wait for you here, even if you come back next week.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-block rounded-full bg-forest px-6 py-3 text-cream"
          >
            Go to the shop
          </Link>
        </div>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {saved.map((p) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease }}
              >
                <ProductCard product={p} onAdd={onAdd} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </section>
  );
}
