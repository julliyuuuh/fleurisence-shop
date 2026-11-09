import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Pick a date",
    text: "Choose any day from tomorrow onward. We'll have it there.",
  },
  {
    number: "02",
    title: "Hand-tied that morning",
    text: "Your bouquet is arranged fresh on the day it ships, never the night before.",
  },
  {
    number: "03",
    title: "Delivered with your note",
    text: "Your card message travels with the flowers, written out by hand.",
  },
];

const list = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Delivery() {
  return (
    <section id="delivery" className="bg-blush/40 py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl md:text-4xl"
        >
          From our hands to <em className="text-rose">theirs</em>
        </motion.h2>

        <motion.ol
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 grid gap-6 md:grid-cols-3"
        >
          {steps.map((s) => (
            <motion.li
              key={s.number}
              variants={item}
              className="rounded-3xl bg-cream p-6"
            >
              <span className="font-display text-4xl text-rose/70">
                {s.number}
              </span>
              <h3 className="mt-3 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-forest-soft">{s.text}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
