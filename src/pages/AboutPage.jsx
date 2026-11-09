import { Link } from "react-router";
import { motion } from "motion/react";
import Reveal from "../components/Reveal";
import { useAuth } from "../hooks/useAuth";
import { useTitle } from "../hooks/useTitle";
import { ease } from "../lib/motion";
import wrapping from "../assets/photos/florist-wrapping.jpg";
import vase from "../assets/photos/florist-vase.jpg";
import smiling from "../assets/photos/florist-smiling.jpg";
import workshop from "../assets/photos/workshop.jpg";
import interior from "../assets/photos/shop-interior.jpg";

const timeline = [
  { year: "2019", text: "Started as weekend bouquets sold from a kitchen table." },
  { year: "2021", text: "Opened our first studio, with one van and two florists." },
  { year: "2024", text: "Added plants and candles, because people asked." },
  { year: "Today", text: "Same small team, still writing every card by hand." },
];

const team = [
  { name: "Mara", role: "Head florist", image: smiling },
  { name: "Lea", role: "Arranger", image: vase },
  { name: "Joy", role: "Studio lead", image: workshop },
];

export default function AboutPage() {
  useTitle("About us");
  const { user } = useAuth();

  return (
    <>
      {/* Intro */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-2 md:px-10 md:py-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="text-sm uppercase tracking-[0.2em] text-forest-soft"
          >
            About us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="mt-4 font-display text-5xl leading-[1.05] md:text-6xl"
          >
            A small studio with a <em className="text-rose">soft spot</em> for
            big moments.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="mt-6 max-w-md text-lg text-forest-soft"
          >
            Fleurisence began with one simple idea: flowers sent from far away
            should still feel like they came from your hands.
          </motion.p>
        </div>
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.3, delay: 0.15, ease }}
          className="aspect-[4/5] overflow-hidden rounded-tl-[50%_40%] rounded-tr-[50%_40%] rounded-b-3xl bg-blush"
        >
          <img
            src={wrapping}
            alt="A smiling florist wrapping pink roses in paper"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-6xl px-5 py-10 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
          <Reveal as="h2" className="font-display text-3xl md:text-4xl">
            How we got here
          </Reveal>
          <ol className="space-y-6 border-l border-line pl-8">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.year} delay={i * 0.08} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full bg-rose"
                />
                <p className="font-display text-xl">{t.year}</p>
                <p className="mt-1 text-forest-soft">{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Studio */}
      <section id="studio" className="mx-auto max-w-6xl px-5 py-20 md:px-10">
        <Reveal className="overflow-hidden rounded-[2rem]">
          <img
            src={interior}
            alt="Buckets of fresh flowers inside our bright studio"
            loading="lazy"
            className="h-72 w-full object-cover md:h-[28rem]"
          />
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            ["Open daily", "8 AM – 6 PM, deliveries from 10 AM"],
            ["Same-day", "Order before 11 AM within Metro Manila"],
            ["Workshops", "Monthly bouquet classes in the studio"],
          ].map(([title, text], i) => (
            <Reveal key={title} delay={i * 0.08}>
              <p className="font-display text-xl">{title}</p>
              <p className="mt-1 text-forest-soft">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-6xl px-5 md:px-10">
        <Reveal as="h2" className="font-display text-3xl md:text-4xl">
          The hands behind your bouquet
        </Reveal>
        <ul className="mt-8 grid gap-6 sm:grid-cols-3">
          {team.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 0.1}>
              <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-blush">
                <img
                  src={m.image}
                  alt={`${m.name}, ${m.role.toLowerCase()}, at work in the studio`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-4 font-display text-xl">{m.name}</p>
              <p className="text-sm text-forest-soft">{m.role}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pt-24 md:px-10">
        <Reveal className="rounded-[2rem] bg-blush/60 p-10 text-center md:p-16">
          <h2 className="mx-auto max-w-xl font-display text-3xl md:text-5xl">
            Got someone in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-forest-soft">
            We'd love to make something for them.
          </p>
          <Link
            to={user ? "/shop" : "/signin"}
            state={user ? undefined : { mode: "create", from: "/shop" }}
            className="mt-8 inline-block rounded-full bg-forest px-7 py-3.5 text-cream hover:bg-forest/90"
          >
            {user ? "Go to the shop" : "Create an account to shop"}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
