import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import Field from "../components/Field";
import ProviderButtons from "../components/ProviderButtons";
import { useAuth } from "../hooks/useAuth";
import { useTitle } from "../hooks/useTitle";
import { ease } from "../lib/motion";
import florist from "../assets/photos/florist-wrapping.jpg";

const modes = [
  { id: "signin", label: "Sign in" },
  { id: "create", label: "Create account" },
];

export default function SignInPage() {
  const { user, signUp, signIn, signInWith } = useAuth();
  const navigate = useNavigate();
  // Router state: where to go back to + details to pre-fill.
  // It never shows in the address bar, so personal details stay out of URLs.
  const { state } = useLocation();
  const goTo = state?.from ?? "/home";

  const [mode, setMode] = useState(state?.mode ?? "signin");
  const [form, setForm] = useState({
    name: state?.name ?? "",
    email: state?.email ?? "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  useTitle(mode === "create" ? "Create account" : "Sign in");

  if (user) return <Navigate to={goTo} replace />;

  function update(e) {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name])
      setErrors((current) => ({ ...current, [name]: undefined }));
    setFormError("");
  }

  function switchMode(id) {
    setMode(id);
    setErrors({});
    setFormError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = {};
    if (mode === "create" && !form.name.trim())
      found.name = "What should we call you?";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      found.email = "Enter your email, like you@email.com";
    if (mode === "create" && form.password.length < 8)
      found.password = "Use at least 8 characters";
    if (mode === "signin" && !form.password)
      found.password = "Enter your password";

    if (Object.keys(found).length > 0) {
      setErrors(found);
      requestAnimationFrame(() =>
        document.querySelector('[aria-invalid="true"]')?.focus(),
      );
      return;
    }

    const error = mode === "create" ? signUp(form) : signIn(form.email);
    if (error) {
      setFormError(error);
      return;
    }
    navigate(goTo, { replace: true });
  }

  function handleProvider(provider) {
    signInWith(provider);
    navigate(goTo, { replace: true });
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-2 md:px-10 md:py-14">
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.2, ease }}
        className="relative hidden overflow-hidden rounded-t-full rounded-b-3xl bg-blush md:block"
      >
        <img
          src={florist}
          alt="A smiling florist wrapping pink roses in paper"
          className="h-full w-full object-cover"
        />
        <p className="absolute inset-x-6 bottom-6 rounded-2xl bg-cream/90 p-4 text-sm backdrop-blur">
          “We write every card by hand, so take your time with yours.”
          <span className="mt-1 block text-forest-soft">Mara, head florist</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className="mx-auto w-full max-w-md md:py-6"
      >
        {state?.from && (
          <p className="mb-4 rounded-2xl bg-blush/60 px-4 py-3 text-sm">
            Sign in to start shopping. It only takes a few seconds 🌷
          </p>
        )}
        <h1 className="font-display text-4xl md:text-5xl">
          {mode === "create" ? "Join Fleurisence" : "Welcome back"}
        </h1>
        <p className="mt-2 text-forest-soft">
          {mode === "create"
            ? "Save favourites, track deliveries, and check out faster."
            : "Good to see you again."}
        </p>

        <div className="mt-8">
          <ProviderButtons onPick={handleProvider} />
        </div>

        <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-forest-soft">
          <span className="h-px flex-1 bg-line" />
          or with email
          <span className="h-px flex-1 bg-line" />
        </div>

        <div
          role="group"
          aria-label="Sign in or create an account"
          className="grid grid-cols-2 rounded-full bg-paper p-1"
        >
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={mode === m.id}
              onClick={() => switchMode(m.id)}
              className="relative rounded-full py-2.5 text-sm"
            >
              {mode === m.id && (
                <motion.span
                  layoutId="auth-mode"
                  transition={{ duration: 0.4, ease }}
                  className="absolute inset-0 rounded-full bg-forest"
                />
              )}
              <span
                className={`relative ${mode === m.id ? "text-cream" : "text-forest"}`}
              >
                {m.label}
              </span>
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-5 space-y-5 rounded-3xl bg-paper p-6"
        >
          <AnimatePresence initial={false}>
            {mode === "create" && (
              <motion.div
                key="name"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease }}
                className="overflow-hidden"
              >
                <Field
                  label="Your name"
                  name="name"
                  value={form.name}
                  onChange={update}
                  error={errors.name}
                  autoComplete="name"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={update}
            error={errors.email}
            autoComplete="email"
          />
          <Field
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={update}
            error={errors.password}
            autoComplete={mode === "create" ? "new-password" : "current-password"}
          />

          <label className="flex items-center gap-2 text-sm text-forest-soft">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="h-4 w-4 accent-forest"
            />
            Show password
          </label>

          {formError && (
            <p role="alert" className="rounded-2xl bg-blush/60 p-3 text-sm">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-forest py-3.5 text-cream hover:bg-forest/90"
          >
            {mode === "create" ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 rounded-2xl bg-paper/60 p-4 text-xs text-forest-soft">
          🔒 Portfolio demo: accounts live only in this browser and passwords
          are never saved, so please don't use a real one. Google and Apple
          sign you in as a sample shopper.
        </p>
      </motion.div>
    </section>
  );
}
