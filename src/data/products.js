import redRose from "../assets/photos/red-rose-classic.jpg";
import pinkRomance from "../assets/photos/pink-romance.jpg";
import plumPosy from "../assets/photos/lavender-dream.jpg";
import whiteGarden from "../assets/photos/white-garden.jpg";
import hydrangea from "../assets/photos/hydrangea-cloud.jpg";
import tulipBasket from "../assets/photos/tulip-basket.jpg";
import goldenLilies from "../assets/photos/golden-lilies.jpg";
import sunflower from "../assets/photos/sunflower-vase.jpg";
import orangeSpray from "../assets/photos/gerbera-joy.jpg";
import rubberPlant from "../assets/photos/plant-rubber.jpg";
import succulent from "../assets/photos/plant-succulent.jpg";
import agave from "../assets/photos/plant-terracotta.jpg";
import eucalyptusCandle from "../assets/photos/candle-eucalyptus.jpg";
import blossomCandle from "../assets/photos/candle-white-flowers.jpg";
import heartCandle from "../assets/photos/candle-heart.jpg";

// Every product shares the same shape, so one card, one grid and one
// product page can show bouquets, plants and gifts alike.
export const products = [
  {
    id: "classic-red-rose",
    name: "Classic Red Rose",
    category: "bouquets",
    price: 1950,
    image: redRose,
    alt: "A red rose with baby's breath, tied with a red satin ribbon",
    badge: "Bestseller",
    note: "Velvet red roses with baby's breath and a satin ribbon",
    occasions: ["anniversary", "birthday"],
    featured: true,
  },
  {
    id: "pink-romance",
    name: "Pink Romance",
    category: "bouquets",
    price: 2350,
    image: pinkRomance,
    alt: "Lilac roses and pink dahlias gathered close with eucalyptus",
    badge: "Signature",
    note: "Lilac roses, dahlias and eucalyptus, gathered close",
    occasions: ["anniversary", "birthday", "just-because"],
    featured: true,
  },
  {
    id: "tulip-basket",
    name: "Tulip Basket",
    category: "bouquets",
    price: 2450,
    image: tulipBasket,
    alt: "Pink and red tulips in a woven basket",
    badge: "Seasonal",
    note: "Pink and red tulips nestled in a woven basket",
    occasions: ["birthday", "thank-you"],
    featured: true,
  },
  {
    id: "hydrangea-cloud",
    name: "Hydrangea Cloud",
    category: "bouquets",
    price: 1650,
    image: hydrangea,
    alt: "One large cream hydrangea wrapped in kraft paper",
    badge: "New",
    note: "One big cream hydrangea in soft kraft wrap",
    occasions: ["thank-you", "get-well", "just-because"],
  },
  {
    id: "white-garden",
    name: "White Garden",
    category: "bouquets",
    price: 1850,
    image: whiteGarden,
    alt: "White stock flowers laid on kraft paper",
    badge: null,
    note: "White stock and lisianthus, quiet and elegant",
    occasions: ["sympathy", "thank-you", "anniversary"],
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    category: "bouquets",
    price: 1450,
    image: goldenLilies,
    alt: "A hand holding yellow lilies and wild greens",
    badge: null,
    note: "Yellow lilies and wild greens, loosely hand-tied",
    occasions: ["get-well", "thank-you", "just-because"],
  },
  {
    id: "sunflower-smile",
    name: "Sunflower Smile",
    category: "bouquets",
    price: 1350,
    image: sunflower,
    alt: "A single sunflower in a glass vase",
    badge: null,
    note: "Big, happy sunflowers to brighten any desk",
    occasions: ["birthday", "get-well"],
  },
  {
    id: "orange-spray",
    name: "Orange Spray",
    category: "bouquets",
    price: 1250,
    image: orangeSpray,
    alt: "A spray of bright orange daisy mums",
    badge: null,
    note: "Bright orange daisy mums that last for days",
    occasions: ["birthday", "get-well", "just-because"],
  },
  {
    id: "plum-posy",
    name: "Plum Posy",
    category: "bouquets",
    price: 1150,
    image: plumPosy,
    alt: "A small posy of plum carnations in clear wrap",
    badge: null,
    note: "A petite posy of plum carnations in clear wrap",
    occasions: ["thank-you", "just-because", "get-well"],
  },
  {
    id: "rubber-plant",
    name: "Rubber Plant",
    category: "plants",
    price: 1100,
    image: rubberPlant,
    alt: "A young rubber plant in a speckled white pot",
    badge: "Easy care",
    note: "Glossy leaves, happy in low light",
    occasions: ["thank-you", "just-because"],
    featured: true,
  },
  {
    id: "terracotta-agave",
    name: "Terracotta Agave",
    category: "plants",
    price: 780,
    image: agave,
    alt: "A small agave plant in a terracotta pot",
    badge: null,
    note: "A sculptural agave in a classic clay pot",
    occasions: ["birthday", "just-because"],
  },
  {
    id: "little-succulent",
    name: "Little Succulent",
    category: "plants",
    price: 450,
    image: succulent,
    alt: "A tiny succulent in a white pot",
    badge: null,
    note: "A tiny succulent in a white pot, nearly unkillable",
    occasions: ["thank-you", "get-well", "just-because"],
  },
  {
    id: "eucalyptus-candle",
    name: "Eucalyptus Candle",
    category: "gifts",
    price: 690,
    image: eucalyptusCandle,
    alt: "A eucalyptus scented candle in a dark glass jar beside fresh eucalyptus",
    badge: null,
    note: "Soy wax with fresh eucalyptus and a hint of mint",
    occasions: ["thank-you", "get-well", "sympathy"],
  },
  {
    id: "white-blossom-candle",
    name: "White Blossom Candle",
    category: "gifts",
    price: 750,
    image: blossomCandle,
    alt: "A white candle on a round stand surrounded by baby's breath",
    badge: null,
    note: "Soft white florals in a frosted glass jar",
    occasions: ["sympathy", "anniversary", "thank-you"],
  },
  {
    id: "heart-candle-duo",
    name: "Heart Candle Duo",
    category: "gifts",
    price: 590,
    image: heartCandle,
    alt: "A heart-shaped wax melt beside a small candle in sunlight",
    badge: "Gift idea",
    note: "A heart-shaped wax melt and a mini candle",
    occasions: ["anniversary", "birthday", "just-because"],
  },
];

export const categories = [
  { id: "bouquets", label: "Bouquets", single: "bouquet" },
  { id: "plants", label: "Plants", single: "plant" },
  { id: "gifts", label: "Candles & gifts", single: "gift" },
];

export const occasions = [
  { id: "birthday", label: "Birthday", color: "bg-blush" },
  { id: "anniversary", label: "Anniversary", color: "bg-rose/20" },
  { id: "thank-you", label: "Thank you", color: "bg-[#f6e7c8]" },
  { id: "get-well", label: "Get well soon", color: "bg-[#dfe9dc]" },
  { id: "sympathy", label: "Sympathy", color: "bg-[#e6e2f0]" },
  { id: "just-because", label: "Just because", color: "bg-blush" },
];

export const findProduct = (id) => products.find((p) => p.id === id);
export const categoryLabel = (id) =>
  categories.find((c) => c.id === id)?.label ?? "Shop";

// Only bouquets come in sizes. Plants and gifts are "one size".
export const sizes = [
  { id: "petite", label: "Petite", detail: "8–10 stems", extra: -300 },
  { id: "classic", label: "Classic", detail: "14–16 stems", extra: 0 },
  { id: "grand", label: "Grand", detail: "22–25 stems", extra: 700 },
];
export const hasSizes = (product) => product.category === "bouquets";
export const defaultSize = (product) => (hasSizes(product) ? "classic" : "one");

export const priceFor = (product, sizeId) =>
  product.price + (sizes.find((s) => s.id === sizeId)?.extra ?? 0);

export const sizeLabel = (sizeId) =>
  sizes.find((s) => s.id === sizeId)?.label ?? "";

export const formatPrice = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(
    amount,
  );

// "2026-11-13" → "Fri, Nov 13"
export const formatDate = (iso) =>
  iso
    ? new Intl.DateTimeFormat("en-PH", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(new Date(`${iso}T00:00`))
    : "";

// "Classic · Arrives Fri, Nov 13" (skips whatever is missing)
export const lineDetail = (line) =>
  [sizeLabel(line.size), line.date && `Arrives ${formatDate(line.date)}`]
    .filter(Boolean)
    .join(" · ");
