import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import Field from "../components/Field";
import OrderSummary from "../components/OrderSummary";
import { useAuth } from "../hooks/useAuth";
import { useTitle } from "../hooks/useTitle";
import { ease } from "../lib/motion";

const steps = ["Delivery", "Your details", "Payment"];

const paymentOptions = [
  { id: "card", label: "Card", detail: "Visa, Mastercard" },
  { id: "gcash", label: "GCash", detail: "Pay with your wallet" },
  { id: "cod", label: "Cash on delivery", detail: "Pay the rider" },
];

function validate(step, data) {
  const errors = {};
  if (step === 0) {
    if (!data.recipientName.trim())
      errors.recipientName = "Who are the flowers for?";
    const phone = data.recipientPhone.replace(/[\s-]/g, "");
    if (!/^(\+63|0)9\d{9}$/.test(phone))
      errors.recipientPhone = "Enter a PH mobile number, like 0917 123 4567";
    if (!data.address.trim())
      errors.address = "We need a street address to deliver to";
    if (!data.city.trim()) errors.city = "Which city should we deliver to?";
  }
  if (step === 1) {
    if (!data.yourName.trim()) errors.yourName = "So they know who it's from";
    if (!/^\S+@\S+\.\S+$/.test(data.email))
      errors.email = "Enter an email for your receipt, like you@email.com";
  }
  return errors;
}

export default function CheckoutPage({ lines, onPlaceOrder }) {
  useTitle("Checkout");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    recipientName: "",
    recipientPhone: "",
    address: "",
    city: "",
    deliveryNote: "",
    yourName: user.name,
    email: user.email,
    payment: "card",
  });
  const [errors, setErrors] = useState({});
  const [promo, setPromo] = useState("");

  if (lines.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-display text-4xl">Your bag is empty</h1>
        <p className="mt-3 text-forest-soft">
          Pick something first, then come back to check out.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-block rounded-full bg-forest px-6 py-3 text-cream"
        >
          Go to the shop
        </Link>
      </section>
    );
  }

  const hasSavedAddress = Boolean(user.address && user.city);

  function update(e) {
    const { name, value } = e.target;
    setData((current) => ({ ...current, [name]: value }));
    if (errors[name])
      setErrors((current) => ({ ...current, [name]: undefined }));
  }

  // "Send to myself": fill the recipient with the saved profile details
  function fillMyDetails() {
    setData((current) => ({
      ...current,
      recipientName: user.name,
      recipientPhone: user.phone ?? "",
      address: user.address,
      city: user.city,
    }));
    setErrors({});
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(step, data);

    if (Object.keys(found).length > 0) {
      setErrors(found);
      requestAnimationFrame(() =>
        document.querySelector('[aria-invalid="true"]')?.focus(),
      );
      return;
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0 });
      return;
    }

    const orderId = onPlaceOrder({ ...data, promo, userEmail: user.email });
    navigate(`/order/${orderId}`);
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:px-10">
      <h1 className="font-display text-4xl md:text-5xl">Checkout</h1>
      <p className="mt-2 text-forest-soft">
        Signed in as {user.email}. Three short steps and you're done.
      </p>

      <ol className="mt-8 flex gap-2">
        {steps.map((label, i) => (
          <li
            key={label}
            className="flex-1"
            aria-current={i === step ? "step" : undefined}
          >
            <div className="h-1.5 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full origin-left rounded-full bg-forest"
                initial={false}
                animate={{ scaleX: i <= step ? 1 : 0 }}
                transition={{ duration: 0.5, ease }}
              />
            </div>
            <p
              className={`mt-2 text-xs ${i === step ? "font-medium text-forest" : "text-forest-soft"}`}
            >
              {i + 1}. {label}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid items-start gap-8 md:grid-cols-[1fr_380px]">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="overflow-hidden rounded-3xl bg-paper p-6 md:p-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease }}
              className="space-y-5"
            >
              {step === 0 && (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="font-display text-2xl">
                      Where is it going?
                    </h2>
                    {hasSavedAddress && (
                      <button
                        type="button"
                        onClick={fillMyDetails}
                        className="rounded-full bg-blush/70 px-4 py-2 text-sm hover:bg-blush"
                      >
                        Send to myself
                      </button>
                    )}
                  </div>
                  <Field
                    label="Recipient's name"
                    name="recipientName"
                    value={data.recipientName}
                    onChange={update}
                    error={errors.recipientName}
                    autoComplete="shipping name"
                  />
                  <Field
                    label="Recipient's mobile"
                    name="recipientPhone"
                    type="tel"
                    inputMode="tel"
                    value={data.recipientPhone}
                    onChange={update}
                    error={errors.recipientPhone}
                    placeholder="0917 123 4567"
                    autoComplete="shipping tel"
                  />
                  <Field
                    label="Street address"
                    name="address"
                    value={data.address}
                    onChange={update}
                    error={errors.address}
                    autoComplete="shipping street-address"
                  />
                  <Field
                    label="City"
                    name="city"
                    value={data.city}
                    onChange={update}
                    error={errors.city}
                    autoComplete="shipping address-level2"
                  />
                  <Field
                    label="Note for the rider"
                    name="deliveryNote"
                    as="textarea"
                    rows={2}
                    optional
                    value={data.deliveryNote}
                    onChange={update}
                    placeholder="Gate code, or leave it with the guard"
                    className="resize-none"
                  />
                </>
              )}

              {step === 1 && (
                <>
                  <h2 className="font-display text-2xl">Who's sending it?</h2>
                  <Field
                    label="Your name"
                    name="yourName"
                    value={data.yourName}
                    onChange={update}
                    error={errors.yourName}
                    autoComplete="name"
                  />
                  <Field
                    label="Your email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={update}
                    error={errors.email}
                    autoComplete="email"
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="font-display text-2xl">
                    How would you like to pay?
                  </h2>
                  <fieldset>
                    <legend className="sr-only">Payment method</legend>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {paymentOptions.map((p) => (
                        <label
                          key={p.id}
                          className="relative cursor-pointer rounded-2xl border border-line p-4 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-forest"
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={p.id}
                            checked={data.payment === p.id}
                            onChange={update}
                            className="sr-only"
                          />
                          {data.payment === p.id && (
                            <motion.span
                              layoutId="pay-highlight"
                              transition={{ duration: 0.4, ease }}
                              className="absolute inset-0 rounded-2xl bg-blush"
                            />
                          )}
                          <span className="relative block font-medium">
                            {p.label}
                          </span>
                          <span className="relative block text-xs text-forest-soft">
                            {p.detail}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <p className="rounded-2xl bg-cream p-4 text-sm text-forest-soft">
                    🔒 This is a portfolio demo: no payment is taken and no card
                    details are asked for.
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="rounded-full border border-forest/20 px-6 py-3.5 hover:border-forest"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex-1 rounded-full bg-forest py-3.5 text-cream hover:bg-forest/90"
            >
              {step < steps.length - 1 ? "Continue" : "Place order"}
            </button>
          </div>
        </form>

        <OrderSummary lines={lines} promo={promo} onPromoChange={setPromo} />
      </div>
    </section>
  );
}
