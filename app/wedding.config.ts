/**
 * PERSONALISE YOUR INVITATION HERE
 * Replace the placeholder names, dates, venues, phone number, photos and copy.
 * The rest of the website reads from this single file.
 */
export const weddingConfig = {
  couple: {
    bride: "Bride Name",
    groom: "Groom Name",
    monogram: "B · G",
  },
  invitation: {
    eyebrow: "Together with their families",
    headline: "A celebration written in the stars",
    greeting:
      "With immense joy in our hearts, we invite you to join us as two families become one.",
    closing: "Your presence will make our celebration complete.",
    hashtag: "#BrideWedsGroom",
  },
  wedding: {
    // Keep this in ISO format so the countdown works in every browser.
    date: "2027-11-24T16:00:00+05:30",
    displayDate: "24 November 2027",
    city: "Udaipur, Rajasthan",
  },
  families: {
    bride: "The Bride's Family",
    groom: "The Groom's Family",
    blessing:
      "By the grace of the divine and with the blessings of our elders",
  },
  story: {
    label: "Our Story",
    title: "Two paths, one beautiful forever",
    text:
      "Somewhere between chance meetings, shared laughter and countless cups of chai, we found home in one another. Now we cannot wait to begin our next chapter surrounded by the people we love most.",
  },
  events: [
    {
      name: "Mehendi",
      date: "Monday, 22 November",
      time: "4:00 PM onwards",
      venue: "The Garden Courtyard",
      note: "An afternoon of henna, heirlooms and joyful colour.",
      dressCode: "Festive florals & jewel tones",
      symbol: "✦",
    },
    {
      name: "Sangeet Soirée",
      date: "Tuesday, 23 November",
      time: "7:30 PM onwards",
      venue: "The Palace Terrace",
      note: "Music under the stars, followed by dinner and dancing.",
      dressCode: "Indian glam",
      symbol: "♪",
    },
    {
      name: "Wedding Ceremony",
      date: "Wednesday, 24 November",
      time: "4:00 PM onwards",
      venue: "The Lake Pavilion",
      note: "Baraat, varmala and sacred pheras by the water.",
      dressCode: "Royal Indian formal",
      symbol: "❋",
    },
    {
      name: "Royal Reception",
      date: "Wednesday, 24 November",
      time: "8:30 PM onwards",
      venue: "The Grand Durbar Hall",
      note: "A candlelit dinner celebrating our new beginning.",
      dressCode: "Evening elegance",
      symbol: "◇",
    },
  ],
  gallery: [
    {
      src: "royal-wedding-hero.png",
      alt: "Royal Indian wedding at a lakeside palace",
      caption: "Where forever begins",
      position: "center 62%",
    },
    {
      src: "royal-wedding-hero.png",
      alt: "Bride in a richly embroidered wedding lehenga",
      caption: "A tapestry of tradition",
      position: "38% 78%",
    },
    {
      src: "royal-wedding-hero.png",
      alt: "Candlelit mandap at blue hour",
      caption: "Sacred promises",
      position: "center 36%",
    },
    {
      src: "royal-wedding-hero.png",
      alt: "Indian palace illuminated for a wedding",
      caption: "Under palace lights",
      position: "80% 45%",
    },
    {
      src: "royal-wedding-hero.png",
      alt: "Bride and groom walking through a palace courtyard",
      caption: "The first walk of forever",
      position: "55% 68%",
    },
  ],
  venue: {
    name: "Your Palace Venue",
    address: "Udaipur, Rajasthan, India",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=City+Palace+Udaipur",
    mapEmbedUrl:
      "https://www.google.com/maps?q=City%20Palace%20Udaipur&z=14&output=embed",
    travelNote:
      "A detailed travel and stay guide will be shared with our guests closer to the celebration.",
  },
  rsvp: {
    deadline: "Please reply by 15 September 2027",
    // Include country code without + or spaces, e.g. 919876543210.
    whatsappNumber: "919999999999",
    hostName: "The Wedding Family",
  },
  music: {
    // Add a file at public/wedding-music.mp3 and set this to
    // "./wedding-music.mp3". When blank, the site plays a gentle generated ambience.
    src: "",
    label: "Wedding ambience",
  },
} as const;

export type WeddingConfig = typeof weddingConfig;
