import { Link } from "react-router";
import { motion } from "motion/react";
import tulipsTags from "../assets/photos/tulips-gift-tags.jpg";
import rubberPlant from "../assets/photos/plant-rubber.jpg";
import candle from "../assets/photos/candle-eucalyptus.jpg";
import { products } from "../data/products";
import Reveal from "./Reveal";
import { ease } from "../lib/motion";

const tiles = [
  { id: "bouquets", label: "Bouquets", image: tulipsTags, blurb: "Hand-tied, in three sizes" },
  { id: "plants", label: "Plants", image: rubberPlant, blurb: "Potted, easy to keep" },
  { id: "gifts", label: "Candles & gifts", image: candle, blurb: "Small extras to send along" },
];

export default function CategoryTiles({ title = "Shop by category" }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-10">
      <Reveal as="h2" className="font-display text-3xl md:text-4xl">
        {title}
      </Reveal>
      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {tiles.map((t, i) => {
          const count = products.filter((p) => p.category === t.id).length;
          return (
            <Reveal as="li" key={t.id} delay={i * 0.1}>
              <Link
                to={`/shop?category=${t.id}`}
                className="group relative block aspect-[16/10] overflow-hidden rounded-3xl bg-blush md:aspect-[3/4]"
              >
                <img
                  src={t.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1000 ease-[var(--ease-calm)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-cream">
                  <div>
                    <p className="font-display text-2xl">{t.label}</p>
                    <p className="text-sm text-cream/80">
                      {t.blurb} · {count} items
                    </p>
                  </div>
                  <motion.span
                    aria-hidden="true"
                    className="grid h-10 w-10 place-items-center rounded-full bg-cream text-forest"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    →
                  </motion.span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
