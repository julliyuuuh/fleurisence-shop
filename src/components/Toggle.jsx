import { motion } from "motion/react";

// An on/off switch. role="switch" + aria-checked tells screen readers
// it's a toggle, and the whole row is one big tap target.
export default function Toggle({ label, description, checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-6 rounded-2xl px-4 py-4 text-left transition hover:bg-cream"
    >
      <span>
        <span className="block font-medium">{label}</span>
        {description && (
          <span className="mt-0.5 block text-sm text-forest-soft">{description}</span>
        )}
      </span>
      <span
        className={`flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition-colors duration-300 ${
          checked ? "justify-end bg-forest" : "justify-start bg-line"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className="h-5 w-5 rounded-full bg-paper shadow"
        />
      </span>
    </button>
  );
}
