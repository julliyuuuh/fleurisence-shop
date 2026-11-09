import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotionConfig,
} from "motion/react";
import { Link } from "react-router";
import pinkRomance from "../assets/photos/pink-romance.jpg";
import tulipsTags from "../assets/photos/tulips-gift-tags.jpg";
import Petals from "./Petals";
import { ease } from "../lib/motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease },
  }),
};

const perks = ["Same-day in Metro Manila", "Handwritten cards", "Free delivery over ₱2,500"];

export default function Hero() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotionConfig();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto grid max-w-6xl items-center gap-12 overflow-hidden px-5 py-14 md:grid-cols-[1.05fr_1fr] md:px-10 md:py-20"
    >
      <Petals />

      <div className="relative z-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-sm uppercase tracking-[0.2em] text-forest-soft"
        >
          Flower studio · Metro Manila
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-4 font-display text-5xl leading-[1.05] md:text-7xl"
        >
          Flowers that say it <em className="text-rose">for you</em>.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 max-w-md text-lg text-forest-soft"
        >
          Bouquets, plants and small gifts, hand-tied the morning they ship.
          Pick the day, write the note, and we'll carry the rest.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            to="/shop"
            className="rounded-full bg-forest px-7 py-3.5 text-cream transition hover:bg-forest/90"
          >
            Start shopping
          </Link>
          <Link
            to="/about"
            className="rounded-full border border-forest/20 px-7 py-3.5 transition hover:border-forest"
          >
            Our story
          </Link>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-forest-soft"
        >
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-rose" />
              {p}
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-md">
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.4, delay: 0.2, ease }}
          className="aspect-[4/5] overflow-hidden rounded-tl-[50%_40%] rounded-tr-[50%_40%] rounded-b-3xl bg-blush"
        >
          <motion.img
            src={pinkRomance}
            alt="Lilac roses and pink dahlias gathered close with eucalyptus"
            fetchPriority="high"
            initial={{ scale: 1.25 }}
            animate={{ scale: 1.12 }}
            transition={{ duration: 2.4, ease }}
            style={reduceMotion ? undefined : { y: imageY }}
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Small round photo that overlaps the arch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease }}
          style={reduceMotion ? undefined : { y: badgeY }}
          className="absolute -bottom-6 -left-4 h-32 w-32 overflow-hidden rounded-full border-[6px] border-cream md:-left-10 md:h-40 md:w-40"
        >
          <img src={tulipsTags} alt="" className="h-full w-full object-cover" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease }}
          className="absolute right-0 top-10 rounded-full bg-paper px-4 py-2 text-sm shadow-[0_12px_30px_-12px_rgba(31,58,46,0.35)] md:-right-6"
        >
          🌿 Hand-tied this morning
        </motion.p>
      </div>
    </section>
  );
}
