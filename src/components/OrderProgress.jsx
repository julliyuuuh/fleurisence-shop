import { motion } from "motion/react";
import { orderStatus } from "../data/orders";
import { ease } from "../lib/motion";

const steps = ["Preparing", "Out for delivery", "Delivered"];

// A small 3-step tracker: the bar fills up to the current step.
export default function OrderProgress({ order, className = "" }) {
  const status = orderStatus(order);

  return (
    <div className={className}>
      <div className="h-1.5 overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full origin-left rounded-full bg-rose"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: (status.step + 1) / steps.length }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        />
      </div>
      <ol className="mt-2 grid grid-cols-3 text-xs">
        {steps.map((s, i) => (
          <li
            key={s}
            aria-current={i === status.step ? "step" : undefined}
            className={`${i === 1 ? "text-center" : i === 2 ? "text-right" : ""} ${
              i <= status.step ? "text-forest" : "text-forest-soft/60"
            } ${i === status.step ? "font-medium" : ""}`}
          >
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}
