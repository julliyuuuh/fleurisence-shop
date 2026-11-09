import { Link, useNavigate } from "react-router";
import Hero from "../components/Hero";
import Reveal from "../components/Reveal";
import ProductCard from "../components/ProductCard";
import CategoryTiles from "../components/CategoryTiles";
import Delivery from "../components/Delivery";
import ProviderButtons from "../components/ProviderButtons";
import { products } from "../data/products";
import { highlights } from "../data/reviews";
import { useAuth } from "../hooks/useAuth";
import { useTitle } from "../hooks/useTitle";
import workshop from "../assets/photos/workshop.jpg";
import customer from "../assets/photos/customer-bouquet.jpg";

const featured = products.filter((p) => p.featured);

const values = [
  {
    title: "Fresh, never frozen",
    text: "Stems arrive at dawn and leave the studio the same day.",
  },
  {
    title: "Local first",
    text: "We buy from growers in the Philippines whenever the season allows.",
  },
  {
    title: "Less plastic",
    text: "Kraft paper, cotton ribbon, and baskets meant to be reused.",
  },
];

export default function LandingPage({ onAdd }) {
  useTitle("");
  const { user } = useAuth();

  return (
    <>
      <Hero />

      {/* Mission & vision */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.2em] text-forest-soft">
              Why we exist
            </p>
            <p className="mt-5 font-display text-3xl leading-snug md:text-[2.6rem]">
              Sending flowers should feel as personal as{" "}
              <em className="text-rose">handing them over yourself</em>, even
              from across the city.
            </p>
          </Reveal>
          <div className="grid gap-5">
            <Reveal delay={0.1} className="rounded-3xl bg-paper p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-rose">
                Our mission
              </p>
              <p className="mt-3 text-forest-soft">
                Make it easy to send fresh, thoughtful flowers in a few taps:
                the right day, the right words, no stress.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="rounded-3xl bg-paper p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-rose">
                Our vision
              </p>
              <p className="mt-3 text-forest-soft">
                A city where nobody's special day goes by without a little
                bloom on the doorstep.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-16 grid gap-6 border-t border-line pt-10 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 0.1}>
              <p className="font-display text-xl">{v.title}</p>
              <p className="mt-2 text-forest-soft">{v.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.2em] text-forest-soft">
              Featured
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              This week's favourites
            </h2>
          </Reveal>
          <Link
            to="/shop"
            className="text-sm underline decoration-line underline-offset-4 hover:decoration-forest"
          >
            See the whole shop →
          </Link>
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.08}>
              <ProductCard product={p} onAdd={user ? onAdd : undefined} />
            </Reveal>
          ))}
        </ul>
      </section>

      <CategoryTiles />

      <Delivery />

      {/* Testimonials */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-[0.9fr_1.1fr] md:px-10">
        <Reveal className="aspect-[4/5] overflow-hidden rounded-3xl bg-blush">
          <img
            src={customer}
            alt="A florist hands a wrapped bouquet across the counter to a customer"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </Reveal>
        <div>
          <Reveal as="h2" className="font-display text-3xl md:text-4xl">
            Little notes from <em className="text-rose">happy people</em>
          </Reveal>
          <ul className="mt-8 space-y-5">
            {highlights.map((h, i) => (
              <Reveal
                as="li"
                key={h.name}
                delay={i * 0.1}
                className="rounded-3xl bg-paper p-6"
              >
                <p className="text-rose" aria-label="Rated 5 out of 5">
                  ★★★★★
                </p>
                <p className="mt-2">“{h.text}”</p>
                <p className="mt-3 text-sm text-forest-soft">
                  {h.name} · {h.place}
                </p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-4 text-xs text-forest-soft">
            Example reviews for this concept shop.
          </p>
        </div>
      </section>

      {/* Studio story */}
      <section className="mx-auto max-w-6xl px-5 md:px-10">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-forest text-cream">
          <div className="grid md:grid-cols-2">
            {/* The photo fills its half without making the band taller */}
            <div className="relative h-72 md:h-auto">
              <img
                src={workshop}
                alt="A florist arranging bouquets at a long table in a teal studio"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="p-8 md:p-14">
              <p className="text-sm uppercase tracking-[0.2em] text-cream/60">
                The studio
              </p>
              <h2 className="mt-4 font-display text-3xl md:text-4xl">
                Made by hand, one bouquet at a time
              </h2>
              <p className="mt-4 text-cream/80">
                Every order is arranged by one florist, start to finish. They
                write your card, check every stem, and wrap it like it's going
                to their own mom.
              </p>
              <Link
                to="/about"
                className="mt-8 inline-block rounded-full bg-cream px-6 py-3 text-forest transition hover:bg-paper"
              >
                Meet the florists
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {!user && <JoinCta />}
    </>
  );
}

function JoinCta() {
  const { signInWith } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-6xl px-5 pt-24 md:px-10">
      <Reveal className="grid items-center gap-10 rounded-[2rem] bg-blush/60 p-8 md:grid-cols-[1.2fr_1fr] md:p-14">
        <div>
          <h2 className="font-display text-3xl md:text-5xl">
            Ready to send something lovely?
          </h2>
          <p className="mt-4 max-w-md text-forest-soft">
            Create a free account to shop, save favourites, and track every
            delivery. Your first order is 10% off with{" "}
            <strong className="text-forest">BLOOM10</strong>.
          </p>
        </div>
        <div>
          <ProviderButtons
            onPick={(provider) => {
              signInWith(provider);
              navigate("/home");
            }}
          />
          <Link
            to="/signin"
            state={{ mode: "create" }}
            className="mt-3 block text-center text-sm underline underline-offset-4"
          >
            or use your email
          </Link>
          <p className="mt-4 text-center text-xs text-forest-soft">
            Demo: Google and Apple sign you in as a sample shopper.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
