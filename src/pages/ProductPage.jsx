import { useState } from "react";
import { Link, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  products,
  sizes,
  hasSizes,
  defaultSize,
  priceFor,
  formatPrice,
  findProduct,
  categoryLabel,
} from "../data/products";
import { reviewsFor } from "../data/reviews";
import { tomorrowIso } from "../data/orders";
import { FREE_DELIVERY } from "../data/pricing";
import NotFound from "./NotFound";
import HeartButton from "../components/HeartButton";
import { useTitle } from "../hooks/useTitle";
import { ease } from "../lib/motion";

const MAX_NOTE = 150;

const careTips = {
  bouquets: "Trim stems at an angle and change the water every two days.",
  plants: "Bright, indirect light. Water when the top of the soil feels dry.",
  gifts: "Trim the wick to 5 mm before each burn. Never leave it unattended.",
};

function Stars({ value }) {
  const full = Math.round(value);
  return (
    <span aria-label={`Rated ${value.toFixed(1)} out of 5`} className="text-rose">
      {"★".repeat(full)}
      <span className="text-line">{"★".repeat(5 - full)}</span>
    </span>
  );
}

export default function ProductPage({ onAdd, onOpenCart }) {
  const { id } = useParams();
  const product = findProduct(id);
  useTitle(product?.name ?? "Not found");

  if (!product) return <NotFound />;
  // key = product.id: switching products resets the form (size, note…)
  return (
    <ProductView
      key={product.id}
      product={product}
      onAdd={onAdd}
      onOpenCart={onOpenCart}
    />
  );
}

function ProductView({ product, onAdd, onOpenCart }) {
  const [size, setSize] = useState(defaultSize(product));
  const [date, setDate] = useState(tomorrowIso);
  const [message, setMessage] = useState("");
  const [added, setAdded] = useState(false);

  const price = priceFor(product, size);
  const reviews = reviewsFor(product.id);
  const average = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.occasions.some((o) => product.occasions.includes(o)),
    )
    .slice(0, 4);

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(product, { size, date, message: message.trim() });
    setAdded(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-10 md:py-12">
      <nav aria-label="Breadcrumb" className="text-sm text-forest-soft">
        <Link to="/shop" className="hover:text-forest">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-forest">
          {categoryLabel(product.category)}
        </Link>
        <span className="mx-2">/</span>
        <span aria-current="page" className="text-forest">
          {product.name}
        </span>
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.1, ease }}
          className="aspect-[4/5] overflow-hidden rounded-tl-[50%_40%] rounded-tr-[50%_40%] rounded-b-3xl bg-blush md:sticky md:top-24 md:self-start"
        >
          <motion.img
            src={product.image}
            alt={product.alt}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease }}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            {product.badge && (
              <span className="rounded-full bg-blush px-3 py-1 text-xs font-medium">
                {product.badge}
              </span>
            )}
            <div className="mt-3 flex items-start justify-between gap-4">
              <h1 className="font-display text-4xl md:text-5xl">{product.name}</h1>
              <HeartButton product={product} className="shrink-0 border border-line" />
            </div>
            {reviews.length > 0 && (
              <a href="#reviews" className="mt-2 flex items-center gap-2 text-sm text-forest-soft">
                <Stars value={average} /> {average.toFixed(1)} · {reviews.length}{" "}
                review{reviews.length > 1 && "s"}
              </a>
            )}
            <p className="mt-4 text-lg text-forest-soft">{product.note}</p>
          </div>

          {hasSizes(product) && (
            <fieldset>
              <legend className="text-sm font-medium">Size</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {sizes.map((s) => (
                  <label
                    key={s.id}
                    className="relative cursor-pointer rounded-2xl border border-line px-2 py-3 text-center has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-forest"
                  >
                    <input
                      type="radio"
                      name="size"
                      value={s.id}
                      checked={size === s.id}
                      onChange={() => setSize(s.id)}
                      className="sr-only"
                    />
                    {size === s.id && (
                      <motion.span
                        layoutId="size-highlight"
                        transition={{ duration: 0.4, ease }}
                        className="absolute inset-0 rounded-2xl bg-blush"
                      />
                    )}
                    <span className="relative block font-medium">{s.label}</span>
                    <span className="relative block text-xs text-forest-soft">
                      {s.detail}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <label className="block">
            <span className="text-sm font-medium">Delivery date</span>
            <input
              type="date"
              required
              min={tomorrowIso()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-line bg-paper px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-forest"
            />
          </label>

          <label className="block">
            <span className="flex justify-between text-sm">
              <span className="font-medium">
                Card message{" "}
                <span className="font-normal text-forest-soft">(optional)</span>
              </span>
              <span className="text-forest-soft">
                {message.length}/{MAX_NOTE}
              </span>
            </span>
            <textarea
              rows={3}
              maxLength={MAX_NOTE}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Happy birthday! Thinking of you today 🌷"
              className="mt-2 w-full resize-none rounded-2xl border border-line bg-paper px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-forest"
            />
          </label>

          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.div
                key="added"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-3xl bg-blush/60 p-5"
                role="status"
              >
                <p className="font-medium">Added to your bag ✓</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={onOpenCart}
                    className="rounded-full bg-forest px-5 py-2.5 text-sm text-cream"
                  >
                    View bag
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdded(false)}
                    className="rounded-full border border-forest/20 px-5 py-2.5 text-sm"
                  >
                    Add another
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="add"
                type="submit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-full bg-forest py-3.5 text-cream hover:bg-forest/90"
              >
                Add to bag · {formatPrice(price)}
              </motion.button>
            )}
          </AnimatePresence>

          <dl className="grid gap-3 rounded-3xl bg-paper p-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium">Delivery</dt>
              <dd className="mt-1 text-forest-soft">
                Free over {formatPrice(FREE_DELIVERY)}. Same-day in Metro Manila
                for orders before 11 AM.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Care</dt>
              <dd className="mt-1 text-forest-soft">{careTips[product.category]}</dd>
            </div>
          </dl>
        </form>
      </div>

      {reviews.length > 0 && (
        <section id="reviews" className="mt-20 scroll-mt-20">
          <h2 className="font-display text-3xl">What people said</h2>
          <p className="mt-1 text-xs text-forest-soft">
            Example reviews for this concept shop.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {reviews.map((r) => (
              <li key={r.name} className="rounded-3xl bg-paper p-6">
                <Stars value={r.rating} />
                <p className="mt-3">“{r.text}”</p>
                <p className="mt-3 text-sm text-forest-soft">
                  {r.name} · {r.date}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-3xl">You might also love</h2>
          <ul className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <Link to={`/shop/${p.id}`} className="group block">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-blush">
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 font-display text-lg">{p.name}</p>
                  <p className="text-sm text-forest-soft">{formatPrice(p.price)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
