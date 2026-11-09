import { motion, useReducedMotionConfig } from "motion/react";

const petals = [
  { left: "8%", size: 14, duration: 16, delay: 0 },
  { left: "22%", size: 10, duration: 19, delay: 4 },
  { left: "41%", size: 16, duration: 14, delay: 8 },
  { left: "58%", size: 11, duration: 21, delay: 2 },
  { left: "74%", size: 13, duration: 17, delay: 10 },
  { left: "90%", size: 9, duration: 20, delay: 6 },
];

export default function Petals() {
  // Respects both the device setting AND the "Calm motion" choice in Settings
  const reduceMotion = useReducedMotionConfig();
  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {petals.map((p, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 20 20"
          width={p.size}
          height={p.size}
          className="absolute -top-6 text-rose/40"
          style={{ left: p.left }}
          initial={{ y: "-10vh", opacity: 0 }}
          animate={{
            y: "110vh",
            x: [0, 30, -20, 25, 0],
            rotate: 220,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <path
            d="M10 1 C16 6 16 14 10 19 C4 14 4 6 10 1 Z"
            fill="currentColor"
          />
        </motion.svg>
      ))}
    </div>
  );
}
