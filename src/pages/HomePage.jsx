import { Link } from "react-router";
import { motion } from "motion/react";
import Reveal from "../components/Reveal";
import ProductCard from "../components/ProductCard";
import CategoryTiles from "../components/CategoryTiles";
import OrderProgress from "../components/OrderProgress";
import { findProduct, occasions } from "../data/products";
import { greeting, formatPlacedAt } from "../data/orders";
import { useAuth } from "../hooks/useAuth";
import { useWishlist } from "../hooks/useWishlist";
import { useTitle } from "../hooks/useTitle";
import { ease } from "../lib/motion";
import banner from "../assets/photos/hero-shop-bouquets.jpg";
import floristVase from "../assets/photos/florist-vase.jpg";
import shopInterior from "../assets/photos/shop-interior.jpg";
import floristSmiling from "../assets/photos/florist-smiling.jpg";

const newThisWeek = [
  "white-garden",
  "golden-hour",
  "terracotta-agave",
  "heart-candle-duo",
].map(findProduct);

export default function HomePage({ onAdd, orders }) {
  useTitle("Home");
  const { user } = useAuth();
  const { ids } = useWishlist();
  const firstName = user.name.split(" ")[0];
  const latest = orders[0];

  return (
    <>
      {/* Welcome banner */}
      <section className="mx-auto max-w-6xl px-5 pt-8 md:px-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-forest">
          <motion.img
            src={banner}
            alt="Rows of colourful wrapped bouquets in a flower shop"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1.03 }}
            transition={{ duration: 2.2, ease }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/85 via-forest/55 to-forest/10" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="relative max-w-lg px-7 py-16 text-cream md:px-14 md:py-24"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-cream/70">
              {greeting()}, {firstName}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
              What are we sending today?
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="rounded-full bg-cream px-6 py-3 text-forest transition hover:bg-paper"
              >
                Browse the shop
              </Link>
              <Link
                to="/wishlist"
                className="rounded-full border border-cream/40 px-6 py-3 transition hover:border-cream"
              >
                Your wishlist{ids.length > 0 && ` (${ids.length})`}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shop by moment */}
      <section className="mx-auto max-w-6xl px-5 pt-12 md:px-10">
        <Reveal as="h2" className="font-display text-2xl">
          What's the moment?
        </Reveal>
        <Reveal as="div" delay={0.1} className="mt-4 flex flex-wrap gap-3">
          {occasions.map((o) => (
            <Link
              key={o.id}
              to={`/shop?occasion=${o.id}`}
              className={`rounded-full px-5 py-3 transition hover:-translate-y-0.5 ${o.color}`}
            >
              {o.label}
            </Link>
          ))}
        </Reveal>
      </section>

      {/* Latest order */}
      {latest && (
        <section className="mx-auto max-w-6xl px-5 pt-12 md:px-10">
          <Reveal className="grid gap-6 rounded-3xl bg-paper p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:p-8">
            <div className="flex -space-x-4">
              {latest.lines.slice(0, 3).map((l) => {
                const p = findProduct(l.productId);
                return p ? (
                  <img
                    key={l.productId + l.size + l.date}
                    src={p.image}
                    alt=""
                    className="h-16 w-16 rounded-full border-4 border-paper object-cover"
                  />
                ) : null;
              })}
            </div>
            <div>
              <p className="text-sm text-forest-soft">
                Your latest order · {latest.id} · placed{" "}
                {formatPlacedAt(latest.placedAt)}
              </p>
              <p className="mt-1 font-display text-xl">
                For {latest.recipientName}
              </p>
              <OrderProgress order={latest} className="mt-4 max-w-md" />
            </div>
            <Link
              to={`/order/${latest.id}`}
              className="rounded-full border border-forest/20 px-5 py-2.5 text-center text-sm hover:border-forest"
            >
              View order
            </Link>
          </Reveal>
        </section>
      )}

      {/* New this week */}
      <section className="mx-auto max-w-6xl px-5 pt-16 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal as="h2" className="font-display text-3xl md:text-4xl">
            New this week
          </Reveal>
          <Link
            to="/shop"
            className="text-sm underline decoration-line underline-offset-4 hover:decoration-forest"
          >
            See everything →
          </Link>
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newThisWeek.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.08}>
              <ProductCard product={p} onAdd={onAdd} />
            </Reveal>
          ))}
        </ul>
      </section>

      <CategoryTiles title="Browse by category" />

      {/* From the studio */}
      <section className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="grid gap-5 md:grid-cols-[1fr_1fr_1.2fr]">
          <Reveal className="aspect-[3/4] overflow-hidden rounded-3xl bg-blush">
            <img
              src={floristVase}
              alt="A florist arranging white and coral flowers in a vase"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </Reveal>
          <Reveal
            delay={0.1}
            className="aspect-[3/4] overflow-hidden rounded-3xl bg-blush"
          >
            <img
              src={shopInterior}
              alt="Buckets of fresh flowers inside a bright flower shop"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </Reveal>
          <Reveal
            delay={0.2}
            className="flex flex-col justify-between gap-6 rounded-3xl bg-blush/60 p-8"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-forest-soft">
                From the studio
              </p>
              <h2 className="mt-4 font-display text-3xl">
                Tulip season is here
              </h2>
              <p className="mt-3 text-forest-soft">
                Our growers sent the first tulips of the year this week. They
                won't last long, so grab a basket while they're blooming.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={floristSmiling}
                alt=""
                className="h-12 w-12 rounded-full object-cover"
              />
              <p className="text-sm">
                Mara, head florist
                <Link
                  to="/shop/tulip-basket"
                  className="block underline underline-offset-4"
                >
                  Shop the Tulip Basket
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* First-order promo */}
      {orders.length === 0 && (
        <section className="mx-auto max-w-6xl px-5 pt-16 md:px-10">
          <Reveal className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-forest p-8 text-cream md:flex-row md:items-center md:p-10">
            <div>
              <p className="font-display text-2xl md:text-3xl">
                10% off your first order
              </p>
              <p className="mt-1 text-cream/75">
                Use code <strong className="text-cream">BLOOM10</strong> at
                checkout.
              </p>
            </div>
            <Link
              to="/shop"
              className="rounded-full bg-cream px-6 py-3 text-forest hover:bg-paper"
            >
              Start shopping
            </Link>
          </Reveal>
        </section>
      )}
    </>
  );
}
