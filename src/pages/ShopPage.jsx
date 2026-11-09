import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import ProductCard from "../components/ProductCard";
import { products, categories, occasions } from "../data/products";
import { useTitle } from "../hooks/useTitle";
import { ease } from "../lib/motion";

const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "name", label: "Name: A to Z" },
];

export default function ShopPage({ onAdd }) {
  useTitle("Shop");
  // Filters live in the URL (?category=plants&occasion=birthday), so a
  // filtered view can be bookmarked, shared, and survives the back button.
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "all";
  const occasion = params.get("occasion") ?? "all";
  const query = params.get("q") ?? "";
  const sort = params.get("sort") ?? "featured";

  function setParam(key, value, fallback) {
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (!value || value === fallback) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true },
    );
  }

  const words = query.trim().toLowerCase();
  let visible = products.filter((p) => {
    const inCategory = category === "all" || p.category === category;
    const forOccasion = occasion === "all" || p.occasions.includes(occasion);
    const matches =
      !words || `${p.name} ${p.note} ${p.category}`.toLowerCase().includes(words);
    return inCategory && forOccasion && matches;
  });
  if (sort === "price-asc") visible = visible.toSorted((a, b) => a.price - b.price);
  if (sort === "price-desc") visible = visible.toSorted((a, b) => b.price - a.price);
  if (sort === "name") visible = visible.toSorted((a, b) => a.name.localeCompare(b.name));

  const tabs = [{ id: "all", label: "Everything" }, ...categories];
  const hasFilters = category !== "all" || occasion !== "all" || words;

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-forest-soft">
            The shop
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">
            Flowers & little gifts
          </h1>
        </div>
        <p className="text-sm text-forest-soft">
          Hand-tied the morning they ship
        </p>
      </div>

      {/* Category tabs */}
      <div
        role="group"
        aria-label="Category"
        className="mt-8 flex gap-1 overflow-x-auto rounded-full bg-paper p-1 [scrollbar-width:none] sm:inline-flex"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={category === t.id}
            onClick={() => setParam("category", t.id, "all")}
            className="relative shrink-0 rounded-full px-5 py-2.5 text-sm"
          >
            {category === t.id && (
              <motion.span
                layoutId="category-pill"
                transition={{ duration: 0.45, ease }}
                className="absolute inset-0 rounded-full bg-forest"
              />
            )}
            <span
              className={`relative ${category === t.id ? "text-cream" : "text-forest"}`}
            >
              {t.label}
            </span>
          </button>
        ))}
      </div>

      {/* Occasion chips */}
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Occasion">
        {occasions.map((o) => {
          const active = occasion === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => setParam("occasion", active ? "" : o.id, "all")}
              className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                active ? "bg-forest text-cream" : `${o.color} text-forest hover:brightness-95`
              }`}
            >
              {o.label}
              {active && <span aria-hidden="true"> ×</span>}
            </button>
          );
        })}
      </div>

      {/* Search + sort */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex flex-1 items-center gap-3 rounded-full border border-line bg-paper px-5 focus-within:ring-2 focus-within:ring-forest">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="shrink-0 text-forest-soft">
            <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="sr-only">Search the shop</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setParam("q", e.target.value, "")}
            placeholder="Search roses, plants, candles…"
            className="w-full bg-transparent py-3 outline-none"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <span className="text-forest-soft">Sort</span>
          <span className="relative">
            <select
              value={sort}
              onChange={(e) => setParam("sort", e.target.value, "featured")}
              className="cursor-pointer appearance-none rounded-full border border-line bg-paper py-3 pl-5 pr-11 text-forest transition hover:border-forest/40"
            >
              {sortOptions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-soft"
            >
              <path
                d="M5 7.5l5 5 5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
        <p aria-live="polite" className="text-forest-soft">
          {visible.length} {visible.length === 1 ? "item" : "items"}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => setParams({}, { replace: true })}
            className="underline underline-offset-4 hover:text-rose"
          >
            Clear filters
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-paper p-10 text-center">
          <p className="font-display text-2xl">Nothing matches that</p>
          <p className="mt-2 text-forest-soft">
            Try another word, or clear your filters.
          </p>
          <button
            type="button"
            onClick={() => setParams({}, { replace: true })}
            className="mt-5 rounded-full bg-forest px-6 py-3 text-cream"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
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
