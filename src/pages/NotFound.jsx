import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function NotFound() {
  const { user } = useAuth();
  return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="font-display text-6xl text-rose">404</p>
      <h1 className="mt-4 font-display text-3xl">This bloom wandered off</h1>
      <p className="mt-3 text-forest-soft">
        The page you're looking for doesn't exist anymore.
      </p>
      <Link
        to={user ? "/shop" : "/"}
        className="mt-8 inline-block rounded-full bg-forest px-6 py-3 text-cream"
      >
        {user ? "Back to the shop" : "Back home"}
      </Link>
    </section>
  );
}
