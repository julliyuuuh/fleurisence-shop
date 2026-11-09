import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotionConfig,
} from "motion/react";
import { Link } from "react-router";
import { formatPrice, hasSizes, priceFor } from "../data/products";
import HeartButton from "./HeartButton";

const spring = { stiffness: 150, damping: 18 };

// `onAdd` given → full shop card (heart + Add to bag).
// No `onAdd` → preview card for the public landing page (just "View").
export default function ProductCard({ product, onAdd }) {
  const reduceMotion = useReducedMotionConfig();
  const href = `/shop/${product.id}`;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), spring);

  function handleMove(e) {
    if (reduceMotion || e.pointerType !== "mouse") return;
    if (e.target.closest("[data-no-tilt]")) return handleLeave();
    const box = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - box.left) / box.width - 0.5);
    y.set((e.clientY - box.top) / box.height - 0.5);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(timer);
  }, [added]);

  function handleAdd() {
    onAdd(product);
    setAdded(true);
  }

  return (
    <motion.article
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ y: -4 }}
      className="group relative flex h-full flex-col rounded-3xl bg-paper p-3 shadow-[0_1px_2px_rgba(31,58,46,0.06)] transition-shadow duration-500 hover:shadow-[0_24px_40px_-20px_rgba(31,58,46,0.35)]"
    >
      <div className="relative">
        <Link
          to={href}
          aria-label={`${product.name}, view details`}
          className="relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-blush"
        >
          <img
            src={product.image}
            alt={product.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium backdrop-blur">
              {product.badge}
            </span>
          )}
        </Link>
        {onAdd && (
          <HeartButton product={product} className="absolute right-3 top-3 z-10" />
        )}
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <h3 className="font-display text-xl leading-tight">{product.name}</h3>
        <p className="mt-1 font-medium">
          {hasSizes(product) && (
            <span className="text-xs font-normal text-forest-soft">from </span>
          )}
          {formatPrice(priceFor(product, hasSizes(product) ? "petite" : "one"))}
        </p>
        <p className="mt-1 flex-1 text-sm text-forest-soft">{product.note}</p>

        {onAdd ? (
          <>
            <Link
              to={href}
              className="mt-2 inline-block text-sm text-forest underline decoration-line underline-offset-4 hover:decoration-forest"
            >
              {hasSizes(product)
                ? "Choose size & add a note"
                : "Pick a date & add a note"}
            </Link>
            <motion.button
              type="button"
              onClick={handleAdd}
              whileTap={{ scale: 0.97 }}
              className={`mt-4 w-full rounded-full py-3 text-sm transition-colors duration-300 ${
                added
                  ? "bg-blush text-forest"
                  : "bg-forest text-cream hover:bg-forest/90"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={added ? "added" : "add"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="inline-block"
                >
                  {added ? "Added ✓" : "Add to bag"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </>
        ) : (
          <Link
            to={href}
            className="mt-4 block w-full rounded-full border border-forest/20 py-3 text-center text-sm transition hover:border-forest hover:bg-forest hover:text-cream"
          >
            View {product.name}
          </Link>
        )}
      </div>
    </motion.article>
  );
}
