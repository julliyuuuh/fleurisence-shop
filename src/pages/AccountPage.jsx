import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import Field from "../components/Field";
import OrderProgress from "../components/OrderProgress";
import { useAuth } from "../hooks/useAuth";
import { useTitle } from "../hooks/useTitle";
import { findProduct, formatPrice } from "../data/products";
import { formatPlacedAt } from "../data/orders";
import { ease } from "../lib/motion";

const tabs = [
  { id: "orders", label: "Orders" },
  { id: "details", label: "Your details" },
];

export default function AccountPage({ orders }) {
  useTitle("Profile");
  const { user, updateProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState(orders.length > 0 ? "orders" : "details");

  return (
    <section className="mx-auto max-w-4xl px-5 py-12 md:px-10">
      {/* Profile header */}
      <div className="flex flex-wrap items-center gap-5">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-blush font-display text-3xl">
          {user.name[0]}
        </div>
        <div className="flex-1">
          <h1 className="font-display text-4xl">{user.name}</h1>
          <p className="text-forest-soft">
            {user.email}
            {user.provider && (
              <span className="ml-2 rounded-full bg-paper px-2 py-0.5 text-xs capitalize">
                via {user.provider} (demo)
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/settings"
            className="rounded-full border border-forest/20 px-5 py-2.5 text-sm hover:border-forest"
          >
            Settings
          </Link>
          <button
            type="button"
            onClick={() => {
              signOut();
              navigate("/");
            }}
            className="rounded-full px-5 py-2.5 text-sm text-rose hover:bg-blush/50"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <dl className="mt-8 grid grid-cols-3 gap-3 text-center">
        {[
          { label: "Orders", value: orders.length },
          {
            label: "Items sent",
            value: orders.reduce(
              (sum, o) => sum + o.lines.reduce((s, l) => s + l.qty, 0),
              0,
            ),
          },
          {
            label: "Saved with promos",
            value: formatPrice(orders.reduce((sum, o) => sum + o.totals.discount, 0)),
          },
        ].map((s) => (
          <div key={s.label} className="flex flex-col-reverse rounded-3xl bg-paper p-4">
            <dt className="text-xs text-forest-soft">{s.label}</dt>
            <dd className="font-display text-2xl">{s.value}</dd>
          </div>
        ))}
      </dl>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Profile sections"
        className="mt-10 inline-flex rounded-full bg-paper p-1"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className="relative rounded-full px-6 py-2.5 text-sm"
          >
            {tab === t.id && (
              <motion.span
                layoutId="profile-tab"
                transition={{ duration: 0.4, ease }}
                className="absolute inset-0 rounded-full bg-forest"
              />
            )}
            <span className={`relative ${tab === t.id ? "text-cream" : ""}`}>
              {t.label}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease }}
          className="mt-6"
        >
          {tab === "orders" ? (
            <OrderHistory orders={orders} />
          ) : (
            <ProfileForm key={user.email} user={user} onSave={updateProfile} />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function OrderHistory({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="rounded-3xl bg-paper p-10 text-center">
        <p className="font-display text-2xl">No orders yet</p>
        <p className="mt-2 text-forest-soft">
          When you send something, you can follow it here.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-full bg-forest px-6 py-3 text-cream"
        >
          Go to the shop
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {orders.map((o) => {
        const first = findProduct(o.lines[0]?.productId);
        const count = o.lines.reduce((s, l) => s + l.qty, 0);
        return (
          <li key={o.id} className="rounded-3xl bg-paper p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-4">
              {first && (
                <img src={first.image} alt="" className="h-16 w-16 rounded-2xl object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-display text-xl">
                  For {o.recipientName}
                </p>
                <p className="text-sm text-forest-soft">
                  {o.id} · {formatPlacedAt(o.placedAt)} · {count}{" "}
                  {count === 1 ? "item" : "items"} · {formatPrice(o.totals.total)}
                </p>
              </div>
              <Link
                to={`/order/${o.id}`}
                className="rounded-full border border-forest/20 px-5 py-2.5 text-sm hover:border-forest"
              >
                Details
              </Link>
            </div>
            <OrderProgress order={o} className="mt-5" />
          </li>
        );
      })}
    </ul>
  );
}

function ProfileForm({ user, onSave }) {
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    address: user.address,
    city: user.city,
  });
  const [saved, setSaved] = useState(false);

  function update(e) {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
    setSaved(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ ...form, name: form.name.trim() || user.name });
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl bg-paper p-6 md:p-8">
      <p className="text-sm text-forest-soft">
        Save your address to use "Send to myself" at checkout.
      </p>
      <Field label="Name" name="name" value={form.name} onChange={update} autoComplete="name" />
      <Field
        label="Mobile"
        name="phone"
        type="tel"
        optional
        value={form.phone}
        onChange={update}
        autoComplete="tel"
      />
      <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
        <Field
          label="Street address"
          name="address"
          optional
          value={form.address}
          onChange={update}
          autoComplete="street-address"
        />
        <Field
          label="City"
          name="city"
          optional
          value={form.city}
          onChange={update}
          autoComplete="address-level2"
        />
      </div>
      <div className="flex items-center gap-4">
        <button type="submit" className="rounded-full bg-forest px-6 py-3 text-cream hover:bg-forest/90">
          Save details
        </button>
        <AnimatePresence>
          {saved && (
            <motion.p
              role="status"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm"
            >
              Saved ✓
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
