// Example reviews for this concept shop (not real customers).
const reviews = {
  "classic-red-rose": [
    {
      name: "Andrea",
      rating: 5,
      text: "Arrived exactly on our anniversary and looked even fuller than the photo.",
      date: "Oct 12",
    },
    {
      name: "Paolo",
      rating: 4,
      text: "Beautiful roses. I wish I could pick the ribbon color.",
      date: "Sep 28",
    },
  ],
  "pink-romance": [
    {
      name: "Carla",
      rating: 5,
      text: "The card note was handwritten. Such a sweet touch.",
      date: "Oct 19",
    },
    {
      name: "Mika",
      rating: 5,
      text: "My mom said it smelled like a garden. She kept it for two weeks.",
      date: "Oct 2",
    },
  ],
  "tulip-basket": [
    {
      name: "Lia",
      rating: 5,
      text: "The basket is so pretty she reused it for her plants.",
      date: "Oct 15",
    },
  ],
  "hydrangea-cloud": [
    {
      name: "Joaquin",
      rating: 5,
      text: "Simple and soft. Exactly what I wanted for a thank-you.",
      date: "Oct 8",
    },
  ],
  "rubber-plant": [
    {
      name: "Bea",
      rating: 5,
      text: "Still thriving on my desk a month later. Came with care tips!",
      date: "Sep 30",
    },
  ],
  "eucalyptus-candle": [
    {
      name: "Nina",
      rating: 4,
      text: "Calming scent. I'd love a bigger size.",
      date: "Oct 1",
    },
  ],
};

export const reviewsFor = (id) => reviews[id] ?? [];

// For the landing page
export const highlights = [
  {
    name: "Andrea M.",
    place: "Quezon City",
    text: "I picked the date, wrote the note, and they handled the rest. It arrived right on our anniversary.",
  },
  {
    name: "Paolo R.",
    place: "Makati",
    text: "The bouquet looked even fuller than the photo. Checking out took me two minutes.",
  },
  {
    name: "Carla D.",
    place: "Pasig",
    text: "The handwritten card made my lola cry happy tears. We order every birthday now.",
  },
];
