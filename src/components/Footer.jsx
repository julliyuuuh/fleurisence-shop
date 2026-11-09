import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Footer() {
  const { user } = useAuth();

  const columns = [
    {
      title: "Shop",
      links: [
        { to: "/shop?category=bouquets", label: "Bouquets" },
        { to: "/shop?category=plants", label: "Plants" },
        { to: "/shop?category=gifts", label: "Candles & gifts" },
      ],
    },
    {
      title: "Fleurisence",
      links: [
        { to: "/about", label: "About us" },
        { to: "/about#studio", label: "Our studio" },
        { to: "/credits", label: "Photo credits" },
      ],
    },
    {
      title: "Account",
      links: user
        ? [
            { to: "/account", label: "Profile & orders" },
            { to: "/wishlist", label: "Wishlist" },
            { to: "/settings", label: "Settings" },
          ]
        : [
            { to: "/signin", label: "Sign in" },
            { to: "/signin", label: "Create account", state: { mode: "create" } },
          ],
    },
  ];

  return (
    <footer className="mt-24 bg-forest text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-10">
        <div>
          <p className="font-display text-3xl">Fleurisence</p>
          <p className="mt-3 max-w-xs text-sm text-cream/70">
            Flowers, plants and small gifts, hand-tied the morning they ship.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-xs uppercase tracking-[0.2em] text-cream/50">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    state={l.state}
                    className="text-cream/80 transition hover:text-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-cream/10">
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-cream/50 md:px-10">
          A portfolio concept, not a real shop. No orders are shipped and no
          payments are taken. Photos from Pexels.
        </p>
      </div>
    </footer>
  );
}
