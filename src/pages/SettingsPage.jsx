import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import Toggle from "../components/Toggle";
import { useAuth } from "../hooks/useAuth";
import { useWishlist } from "../hooks/useWishlist";
import { useTitle } from "../hooks/useTitle";
import { ease } from "../lib/motion";

const motionOptions = [
  { id: "user", label: "Match my device" },
  { id: "always", label: "Calm" },
  { id: "never", label: "Full" },
];

export default function SettingsPage({ onClearData }) {
  useTitle("Settings");
  const { user, updatePrefs, deleteAccount } = useAuth();
  const { clear: clearWishlist } = useWishlist();
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(null); // "clear" | "delete" | null
  const [notice, setNotice] = useState("");
  const prefs = user.prefs;

  function clearData() {
    onClearData();
    clearWishlist();
    setConfirming(null);
    setNotice("Your bag, wishlist and orders were cleared.");
  }

  function removeAccount() {
    onClearData();
    clearWishlist();
    deleteAccount();
    navigate("/", { replace: true });
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-12 md:px-10">
      <h1 className="font-display text-4xl md:text-5xl">Settings</h1>
      <p className="mt-2 text-forest-soft">Changes save as you go.</p>

      <div className="mt-10 rounded-3xl bg-paper p-2 md:p-4">
        <h2 className="px-4 pt-3 font-display text-2xl">Notifications</h2>
        <div className="mt-2 divide-y divide-line">
          <Toggle
            label="Order updates"
            description="A text when your order is out for delivery."
            checked={prefs.orderUpdates}
            onChange={(v) => updatePrefs({ orderUpdates: v })}
          />
          <Toggle
            label="Occasion reminders"
            description="A nudge a few days before birthdays you've sent to."
            checked={prefs.reminders}
            onChange={(v) => updatePrefs({ reminders: v })}
          />
          <Toggle
            label="New arrivals & offers"
            description="One email a month, never more."
            checked={prefs.offers}
            onChange={(v) => updatePrefs({ offers: v })}
          />
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-paper p-6 md:p-8">
        <h2 className="font-display text-2xl">Motion</h2>
        <p className="mt-1 text-sm text-forest-soft">
          "Calm" turns off falling petals, parallax and card tilt.
        </p>
        <div
          role="radiogroup"
          aria-label="Animation level"
          className="mt-4 grid grid-cols-3 rounded-full bg-cream p-1"
        >
          {motionOptions.map((o) => (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={prefs.motion === o.id}
              onClick={() => updatePrefs({ motion: o.id })}
              className="relative rounded-full py-2.5 text-sm"
            >
              {prefs.motion === o.id && (
                <motion.span
                  layoutId="motion-pref"
                  transition={{ duration: 0.4, ease }}
                  className="absolute inset-0 rounded-full bg-forest"
                />
              )}
              <span className={`relative ${prefs.motion === o.id ? "text-cream" : ""}`}>
                {o.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-rose/30 bg-paper p-6 md:p-8">
        <h2 className="font-display text-2xl">Your data</h2>
        <p className="mt-1 text-sm text-forest-soft">
          Everything is stored only in this browser.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setConfirming("clear")}
            className="rounded-full border border-forest/20 px-5 py-2.5 text-sm hover:border-forest"
          >
            Clear bag, wishlist & orders
          </button>
          <button
            type="button"
            onClick={() => setConfirming("delete")}
            className="rounded-full border border-rose/40 px-5 py-2.5 text-sm text-rose hover:bg-blush/40"
          >
            Delete account
          </button>
        </div>

        <AnimatePresence mode="wait">
          {confirming && (
            <motion.div
              key={confirming}
              role="alert"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease }}
              className="overflow-hidden"
            >
              <div className="mt-5 rounded-2xl bg-blush/50 p-5">
                <p className="font-medium">
                  {confirming === "clear"
                    ? "Clear your bag, wishlist and order history?"
                    : "Delete your account and everything in it?"}
                </p>
                <p className="mt-1 text-sm text-forest-soft">This can't be undone.</p>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={confirming === "clear" ? clearData : removeAccount}
                    className="rounded-full bg-rose px-5 py-2.5 text-sm text-cream hover:bg-rose/90"
                  >
                    {confirming === "clear" ? "Yes, clear it" : "Yes, delete"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirming(null)}
                    className="rounded-full px-5 py-2.5 text-sm hover:bg-cream"
                  >
                    Keep it
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {notice && !confirming && (
          <p role="status" className="mt-4 text-sm">
            ✓ {notice}
          </p>
        )}
      </div>
    </section>
  );
}
