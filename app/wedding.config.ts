/**
 * ================================================================
 *        PERSONALISE YOUR INVITATION HERE — WEDDING WEBSITE
 * ================================================================
 * Change the values in this file only. The website reads all names,
 * wording, dates, events, colours, photographs, music, venue details
 * and RSVP settings from here.
 *
 * PHOTOS
 * 1. Put your image files inside the public/photos folder.
 * 2. Use paths such as "photos/couple.jpg" below.
 * 3. You can also use a complete https:// image URL.
 *
 * MUSIC
 * 1. Put an MP3 inside public/music (for example wedding-song.mp3).
 * 2. Set music.src to "music/wedding-song.mp3".
 * 3. Leave it blank to use the website's gentle generated ambience.
 *
 * TEMPLATE
 * Use "aamantran" for the new rose-envelope design.
 * Use "royal" to switch back to the original royal design.
 */
export type WeddingTemplate = "aamantran" | "royal";
const activeTemplate: WeddingTemplate = "aamantran";

/* ==================================================================
   PAGE-BY-PAGE CONTENT — EDIT THESE BLOCKS
   ================================================================== */
const pageContent = {
  // PAGE 1 — CLOSED ENVELOPE
  page1: {
    blessingLine: "With Love & Blessings",
    familyLine: "The Bride's Family & The Groom's Family",
    openButtonLabel: "Click to open",
  },

  // PAGE 2 — COUPLE LANDING PAGE
  page2: {
    brideName: "Urvashi",
    groomName: "Apoorv",
    monogramText: "U · A",
    welcomeText: "We are honoured to welcome you to the wedding ceremony of",
    hashtag: "#ApUrvi",
    scrollLabel: "Scroll",
  },

  // PAGE 3 — DATE, INVITATION MESSAGE AND COUNTDOWN
  page3: {
    heading: "Our Forever Begins",
    // ISO format is required for the live countdown.
    date: "2026-11-23T10:00:00+05:30",
    displayDate: "23 November 2026",
    shortDate: "23.11.26",
    city: "Bilaspur, Chhattisgarh",
    blessing: "By the grace of the divine and with the blessings of our elders",
    invitationMessage:
      "With immense joy in our hearts, we invite you to join us as two families become one.",
    countdownHeading: "Until we say “I do”",
  },

  // PAGE 4 — BRIDE AND GROOM FAMILY DETAILS
  page4: {
    heading: "A Promise for a Lifetime",
    brideGrandparents: "Granddaughter of the Bride's grandparents",
    brideParents: "Daughter of the Bride's parents",
    groomGrandparents: "Grandson of the Groom's grandparents",
    groomParents: "Son of the Groom's parents",
  },

  // PAGE 5 — WEDDING EVENTS
  page5: {
    eyebrow: "Wedding itinerary",
    heading: "Join us in celebration",
    events: [
      {
        name: "Haldi",
        date: "Monday, 23 November",
        time: "10:00 PM onwards",
        venue: "Hari Amrit",
        note: "An afternoon of henna, heirlooms and joyful colour.",
        dressCode: "Festive florals & jewel tones",
        symbol: "✦",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Garden+Courtyard+Udaipur",
      },
      {
        name: "Sangeet Soirée",
        date: "Tuesday, 23 November",
        time: "7:30 PM onwards",
        venue: "The Palace Terrace",
        note: "Music under the stars, followed by dinner and dancing.",
        dressCode: "Indian glam",
        symbol: "♪",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Palace+Terrace+Udaipur",
      },
      {
        name: "Wedding Ceremony",
        date: "Wednesday, 24 November",
        time: "4:00 PM onwards",
        venue: "The Lake Pavilion",
        note: "Baraat, varmala and sacred pheras by the water.",
        dressCode: "Royal Indian formal",
        symbol: "❋",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Lake+Pavilion+Udaipur",
      },
      {
        name: "Royal Reception",
        date: "Wednesday, 24 November",
        time: "8:30 PM onwards",
        venue: "The Grand Durbar Hall",
        note: "A candlelit dinner celebrating our new beginning.",
        dressCode: "Evening elegance",
        symbol: "◇",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Grand+Durbar+Hall+Udaipur",
      },
    ],
  },

  // PAGE 6 — WEDDING LOCATION AND GOOGLE MAP
  page6: {
    eyebrow: "Destination",
    heading: "Wedding Location",
    venueName: "Your Palace Venue",
    address: "Udaipur, Rajasthan, India",
    mapButtonLabel: "Open in Google Maps",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=City+Palace+Udaipur",
    mapEmbedUrl: "https://www.google.com/maps?q=City%20Palace%20Udaipur&z=14&output=embed",
  },

  // PAGE 7 — CONTACT CARD AND FINAL MESSAGE
  page7: {
    loveLinePrefix: "With Love",
    heading: "RSVP / CONTACT",
    hostName: "The Wedding Family",
    deadline: "",
    contacts: [
      { name: "Bride's family", phone: "+91 99999 99999" },
      { name: "Groom's family", phone: "+91 88888 88888" },
    ],
    footerMessage: "Made with love for our forever",
  },
} as const;

export const weddingConfig = {
  activeTemplate,

  // The active invitation reads its wording from these page blocks.
  pages: pageContent,

  branding: {
    omLogo: "branding/om-logo-transparent.png",
    initialsLogo: "branding/initials-logo-transparent.png",
    waxStamp: "branding/wax-seal-cutout.png",
    handsIllustration: "branding/hands-reference.jpg",
  },

  presentation: {
    // "photo" fills the first page with your couple photo.
    // "paper" uses the ivory invitation-card version seen in the reference.
    heroMode: "paper",
    entryAnimationDurationMs: 1650,
    playMusicWhenOpened: true,
  },

  theme: {
    colors: {
      wine: "#6f2e3e",
      wineDark: "#3b1720",
      wineSoft: "#a96977",
      gold: "#b38a52",
      goldBright: "#e8cd88",
      ivory: "#f8f0df",
      cream: "#fffaf0",
      ink: "#241a17",
      muted: "#796862",
      green: "#173a31",
    },
  },

  couple: {
    bride: pageContent.page2.brideName,
    groom: pageContent.page2.groomName,
    monogram: pageContent.page2.monogramText,
  },

  // Compatibility link used by the inactive royal template.
  frontEnvelope: pageContent.page1,

  welcome: {
    kicker: "A wedding invitation",
    invitationLine: "You are cordially invited to celebrate",
    soundNote: "Best experienced with sound",
  },

  invitation: {
    eyebrow: "Together with their families",
    heroGreeting: pageContent.page2.welcomeText,
    greeting: pageContent.page3.invitationMessage,
    closing: "Your presence will make our celebration complete.",
    hashtag: pageContent.page2.hashtag,
  },

  wedding: {
    date: pageContent.page3.date,
    displayDate: pageContent.page3.displayDate,
    shortDate: pageContent.page3.shortDate,
    city: pageContent.page3.city,
  },

  families: {
    bride: "The Bride's Family",
    groom: "The Groom's Family",
    blessing: pageContent.page3.blessing,
    sacredMark: "॥ शुभ विवाह ॥",
    groomGrandparents: pageContent.page4.groomGrandparents,
    groomParents: pageContent.page4.groomParents,
    brideGrandparents: pageContent.page4.brideGrandparents,
    brideParents: pageContent.page4.brideParents,
  },

  story: {
    label: "Our Story",
    title: "Two paths, one beautiful forever",
    text:
      "Somewhere between chance meetings, shared laughter and countless cups of chai, we found home in one another. Now we cannot wait to begin our next chapter surrounded by the people we love most.",
    sealText: "Made for each other",
  },

  sectionHeadings: {
    countdown: pageContent.page3.countdownHeading,
    eventsEyebrow: pageContent.page5.eyebrow,
    eventsTitle: pageContent.page5.heading,
    galleryEyebrow: "A glimpse of us",
    galleryTitle: "Moments we treasure",
    venueEyebrow: pageContent.page6.eyebrow,
    venueTitle: "A palace affair",
    rsvpEyebrow: "Répondez s'il vous plaît",
    rsvpTitle: "Will you be joining us?",
  },

  events: pageContent.page5.events,

  photos: {
    hero: "royal-wedding-hero.png",
    story: "royal-wedding-hero.png",
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
  },

  venue: {
    sectionTitle: pageContent.page6.heading,
    name: pageContent.page6.venueName,
    address: pageContent.page6.address,
    mapButtonLabel: pageContent.page6.mapButtonLabel,
    mapUrl: pageContent.page6.mapUrl,
    mapEmbedUrl: pageContent.page6.mapEmbedUrl,
    travelNote:
      "A detailed travel and stay guide will be shared with our guests closer to the celebration.",
  },

  rsvp: {
    deadline: pageContent.page7.deadline,
    // Include the country code without + or spaces, e.g. 919876543210.
    whatsappNumber: "919999999999",
    hostName: pageContent.page7.hostName,
    nameLabel: "Your name",
    namePlaceholder: "Full name",
    attendanceLabel: "Will you attend?",
    attendanceOptions: [
      "Joyfully attending",
      "Regretfully unable to attend",
    ],
    guestsLabel: "Number of guests",
    maximumGuests: 6,
    noteLabel: "A note for the couple",
    notePlaceholder: "Blessings, dietary notes or travel details",
    buttonLabel: "",
    contacts: pageContent.page7.contacts,
  },

  music: {
    // Put your MP3 at: public/music/wedding-song.mp3
    // Then change the next line to: src: "music/wedding-song.mp3",
    src: "",
    label: "Wedding ambience",
    volume: 0.42,
    loop: true,
  },

  footer: {
    message: pageContent.page7.footerMessage,
  },
} as const;

export type WeddingConfig = typeof weddingConfig;
