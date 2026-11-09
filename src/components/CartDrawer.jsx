import { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { formatPrice, lineDetail } from "../data/products";
import { FREE_DELIVERY } from "../data/pricing";
import { useDialog } from "../hooks/useDialog";
import { ease } from "../lib/motion";

export default function CartDrawer({
  open,
  onClose,
  cart,
  onChangeQty,
  onRemove,
}) {
  const closeButton = useRef(null);
  useDialog(open, onClose, closeButton);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, line) => sum + line.price * line.qty, 0);
  const remaining = Math.max(FREE_DELIVERY - subtotal, 0);
  const progress = Math.min(subtotal / FREE_DELIVERY, 1);

  function go(path) {
    onClose();
    navigate(path);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-forest/30 backdrop-blur-[2px]"
          />

          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 id="cart-title" className="font-display text-2xl">
                Your bag
              </h2>
              <button
                ref={closeButton}
                type="button"
                onClick={onClose}
                aria-label="Close bag"
                className="grid h-10 w-10 place-items-center rounded-full text-xl hover:bg-blush"
              >
                ×
              </button>
            </div>

            <div className="border-b border-line px-6 py-4">
              <p className="text-sm text-forest-soft">
                {remaining > 0 ? (
                  <>
                    You're{" "}
                    <strong className="text-forest">
                      {formatPrice(remaining)}
                    </strong>{" "}
                    away from free delivery
                  </>
                ) : (
                  <>
                    You've got{" "}
                    <strong className="text-forest">free delivery</strong> 🌷
                  </>
                )}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                <motion.div
                  className="h-full origin-left rounded-full bg-rose"
                  initial={false}
                  animate={{ scaleX: progress }}
                  transition={{ duration: 0.8, ease }}
                />
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <p className="font-display text-2xl">Your bag is empty</p>
                <p className="text-forest-soft">
                  Pick something lovely and it'll wait for you here.
                </p>
                <button
                  type="button"
                  onClick={() => go("/shop")}
                  className="mt-2 rounded-full bg-forest px-6 py-3 text-cream"
                >
                  Go to the shop
                </button>
              </div>
            ) : (
              <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                <AnimatePresence initial={false}>
                  {cart.map((line) => (
                    <motion.li
                      key={line.key}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ duration: 0.35, ease }}
                      className="flex gap-4 rounded-2xl bg-paper p-3"
                    >
                      <img
                        src={line.image}
                        alt=""
                        className="h-20 w-16 shrink-0 rounded-xl object-cover"
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-display text-lg leading-tight">
                              {line.name}
                            </p>
                            <p className="text-xs text-forest-soft">
                              {lineDetail(line)}
                            </p>
                            {line.message && (
                              <p className="mt-1 truncate text-xs italic text-forest-soft">
                                💌 “{line.message}”
                              </p>
                            )}
                          </div>
                          <p className="shrink-0 text-sm font-medium">
                            {formatPrice(line.price * line.qty)}
                          </p>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-line">
                            <button
                              type="button"
                              onClick={() => onChangeQty(line.key, -1)}
                              aria-label={`One less ${line.name}`}
                              className="h-8 w-8 rounded-full hover:bg-blush"
                            >
                              −
                            </button>
                            <span
                              className="w-6 text-center text-sm"
                              aria-live="polite"
                            >
                              {line.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => onChangeQty(line.key, 1)}
                              aria-label={`One more ${line.name}`}
                              className="h-8 w-8 rounded-full hover:bg-blush"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemove(line.key)}
                            className="text-xs text-forest-soft underline underline-offset-4 hover:text-rose"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}

            {cart.length > 0 && (
              <div className="border-t border-line px-6 py-5">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-forest-soft">
                  Each item arrives on the date you picked.
                </p>
                <button
                  type="button"
                  onClick={() => go("/checkout")}
                  className="mt-4 w-full rounded-full bg-forest py-3.5 text-cream hover:bg-forest/90"
                >
                  Continue to checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
