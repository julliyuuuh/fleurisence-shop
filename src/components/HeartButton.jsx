import { motion } from "motion/react";
import { useWishlist } from "../hooks/useWishlist";

export default function HeartButton({ product, className = "" }) {
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(product.id);

  return (
    <motion.button
      type="button"
      data-no-tilt
      onClick={() => toggle(product.id)}
      aria-pressed={saved}
      aria-label={
        saved
          ? `Remove ${product.name} from wishlist`
          : `Save ${product.name} to wishlist`
      }
      whileTap={{ scale: 0.85 }}
      className={`grid h-10 w-10 place-items-center rounded-full bg-cream/90 backdrop-blur transition-colors hover:bg-cream outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 ${className}`}
    >
      <motion.svg
        key={saved ? "saved" : "empty"}
        viewBox="0 0 24 24"
        width="20"
        height="20"
        aria-hidden="true"
        initial={{ scale: saved ? 0.5 : 1 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 14 }}
      >
        <path
          d="M12 20.3l-1.2-1.1C6.4 15.3 3.5 12.6 3.5 9.3 3.5 6.6 5.6 4.5 8.3 4.5c1.5 0 3 .7 3.7 1.9.7-1.2 2.2-1.9 3.7-1.9 2.7 0 4.8 2.1 4.8 4.8 0 3.3-2.9 6-7.3 9.9L12 20.3z"
          fill={saved ? "var(--color-rose)" : "none"}
          stroke={saved ? "var(--color-rose)" : "var(--color-forest)"}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.button>
  );
}
