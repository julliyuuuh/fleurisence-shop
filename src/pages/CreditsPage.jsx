import { photoCredits, pexelsUrl } from "../data/credits";
import { useTitle } from "../hooks/useTitle";

const images = import.meta.glob("../assets/photos/*.jpg", {
  eager: true,
  import: "default",
});
const imageFor = (file) => images[`../assets/photos/${file}.jpg`];

export default function CreditsPage() {
  useTitle("Photo credits");
  return (
    <section className="mx-auto max-w-4xl px-5 py-14 md:px-10">
      <h1 className="font-display text-4xl md:text-5xl">Photo credits</h1>
      <p className="mt-3 max-w-xl text-forest-soft">
        Every photo on this site comes from{" "}
        <a
          href="https://www.pexels.com"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4"
        >
          Pexels
        </a>
        . Thank you to these photographers.
      </p>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {photoCredits.map((c) => (
          <li key={c.file}>
            <a
              href={pexelsUrl(c.id)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-paper p-3 transition hover:bg-blush/40"
            >
              <img
                src={imageFor(c.file)}
                alt=""
                loading="lazy"
                className="h-14 w-14 rounded-xl object-cover"
              />
              <span className="text-sm">
                <span className="block font-medium">{c.photographer}</span>
                <span className="text-forest-soft">Pexels photo {c.id} ↗</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
