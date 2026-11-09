import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, NavLink, useNavigate } from "react-router";
import { useWishlist } from "../hooks/useWishlist";
import { useAuth } from "../hooks/useAuth";
import { ease } from "../lib/motion";

const publicLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About us" },
];
const memberLinks = [
  { to: "/home", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About us" },
];

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Header({ cartCount = 0, onCartClick }) {
  const { user } = useAuth();
  const { ids } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = user ? memberLinks : publicLinks;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-10">
        <Link
          to={user ? "/home" : "/"}
          className="font-display text-2xl text-forest"
          onClick={() => setMenuOpen(false)}
        >
          Fleurisence
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-1 text-sm">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `relative block rounded-full px-4 py-2 transition-colors ${
                      isActive
                        ? "text-forest"
                        : "text-forest-soft hover:text-forest"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          transition={{ duration: 0.5, ease }}
                          className="absolute inset-0 rounded-full bg-blush/70"
                        />
                      )}
                      <span className="relative">{l.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          {user ? (
            <>
              <Link
                to="/wishlist"
                aria-label={`Wishlist, ${ids.length} saved`}
                className="flex h-10 items-center gap-1 rounded-full px-3 text-sm transition hover:bg-blush"
              >
                <HeartIcon />
                {ids.length > 0 && <span>{ids.length}</span>}
              </Link>
              <button
                type="button"
                onClick={onCartClick}
                aria-label={`Bag, ${cartCount} items`}
                className="flex h-10 items-center gap-1.5 rounded-full px-3 text-sm transition hover:bg-blush"
              >
                <BagIcon />
                <motion.span
                  key={cartCount}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="grid h-5 min-w-5 place-items-center rounded-full bg-forest px-1 text-xs text-cream"
                >
                  {cartCount}
                </motion.span>
              </button>
              <AccountMenu user={user} />
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="hidden rounded-full px-4 py-2 text-sm transition hover:bg-blush sm:block"
              >
                Sign in
              </Link>
              <Link
                to="/signin"
                state={{ mode: "create" }}
                className="hidden rounded-full bg-forest px-5 py-2.5 text-sm text-cream transition hover:bg-forest/90 sm:block"
              >
                Create account
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-blush md:hidden"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <motion.path
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
                initial={false}
                animate={{ d: menuOpen ? "M6 6l12 12" : "M4 8h16" }}
                transition={{ duration: 0.3, ease }}
              />
              <motion.path
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
                initial={false}
                animate={{ d: menuOpen ? "M6 18L18 6" : "M4 16h16" }}
                transition={{ duration: 0.3, ease }}
              />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="space-y-1 px-5 py-4">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.end}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-2xl px-4 py-3 font-display text-xl ${
                        isActive ? "bg-blush/70" : "hover:bg-blush/40"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
              {!user && (
                <li className="grid grid-cols-2 gap-2 pt-3">
                  <Link
                    to="/signin"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full border border-forest/20 py-3 text-center text-sm"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signin"
                    state={{ mode: "create" }}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full bg-forest py-3 text-center text-sm text-cream"
                  >
                    Create account
                  </Link>
                </li>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function AccountMenu({ user }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  // Close on a click outside, or on Escape
  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      if (!boxRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const items = [
    { to: "/account", label: "Profile & orders" },
    { to: "/wishlist", label: "Wishlist" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Account menu for ${user.name}`}
        className="ml-1 grid h-10 w-10 place-items-center rounded-full bg-blush text-sm font-medium text-forest transition hover:bg-rose/30"
      >
        {initials(user.name)}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.25, ease }}
            style={{ transformOrigin: "top right" }}
            className="absolute right-0 top-12 w-60 rounded-2xl border border-line bg-paper p-2 shadow-[0_24px_40px_-20px_rgba(31,58,46,0.35)]"
          >
            <div className="px-3 py-2">
              <p className="font-medium">{user.name}</p>
              <p className="truncate text-xs text-forest-soft">{user.email}</p>
            </div>
            <ul className="border-t border-line pt-1">
              {items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2 text-sm hover:bg-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    signOut();
                    navigate("/");
                  }}
                  className="block w-full rounded-xl px-3 py-2 text-left text-sm text-rose hover:bg-cream"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d="M12 20.3l-1.2-1.1C6.4 15.3 3.5 12.6 3.5 9.3 3.5 6.6 5.6 4.5 8.3 4.5c1.5 0 3 .7 3.7 1.9.7-1.2 2.2-1.9 3.7-1.9 2.7 0 4.8 2.1 4.8 4.8 0 3.3-2.9 6-7.3 9.9L12 20.3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d="M5.5 8.5h13l-1 11.5h-11l-1-11.5zM9 8.5V7a3 3 0 016 0v1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
