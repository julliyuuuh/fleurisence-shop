import { motion } from "motion/react";

import { ease } from "../lib/motion";

const tags = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  p: motion.p,
  h2: motion.h2,
  figure: motion.figure,
};

// Fades + lifts its children in once, when they scroll into view.
// One shared component keeps every section's motion calm and consistent.
export default function Reveal({
  as = "div",
  delay = 0,
  y = 20,
  className = "",
  children,
  ...rest
}) {
  const Tag = tags[as] ?? motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
