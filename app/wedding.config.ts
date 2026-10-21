/**
 * ================================================================
 *        PERSONALISE YOUR INVITATION HERE — WEDDING WEBSITE
 * ================================================================
 * Edit the Page 1–Page 7 blocks below. Saved changes appear in the
 * local preview. Assets, colours and music are grouped afterwards.
 *
 * PAGE-BY-PAGE CONTENT
 */

export const weddingConfig = {
  pages: {
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
      welcomeText: "We are honoured to welcome you to the wedding ceremony of",
      hashtag: "#ApUrvi",
      scrollLabel: "Scroll",
    },

    // PAGE 3 — DATE, INVITATION MESSAGE AND COUNTDOWN
    page3: {
      heading: "Our Forever Begins",
      // Keep this date in ISO format for the live countdown.
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
        },
        {
          name: "Sangeet Soirée",
          date: "Tuesday, 23 November",
          time: "7:30 PM onwards",
          venue: "The Palace Terrace",
        },
        {
          name: "Wedding Ceremony",
          date: "Wednesday, 24 November",
          time: "4:00 PM onwards",
          venue: "The Lake Pavilion",
        },
        {
          name: "Royal Reception",
          date: "Wednesday, 24 November",
          time: "8:30 PM onwards",
          venue: "The Grand Durbar Hall",
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
  },

  // IMAGE FILES
  branding: {
    omLogo: "branding/om-logo-transparent.png",
    initialsLogo: "branding/initials-logo-transparent.png",
    waxStamp: "branding/wax-seal-cutout.png",
    handsIllustration: "branding/hands-reference.jpg",
    sacredMarkAlt: "Shree Ganeshay Namah",
  },

  // PAGE 2 BACKGROUND MODE
  presentation: {
    // Use "paper" for the current design or "photo" for a couple photograph.
    heroMode: "paper" as "paper" | "photo",
    entryAnimationDurationMs: 1650,
    playMusicWhenOpened: true,
  },

  // OPTIONAL COUPLE PHOTO — place the image inside public/photos.
  photos: {
    hero: "photos/couple.jpg",
  },

  // TEMPLATE COLOURS
  theme: {
    colors: {
      wine: "#6f2e3e",
      wineSoft: "#a96977",
      gold: "#b38a52",
      cream: "#fffaf0",
      ink: "#241a17",
    },
  },

  // MUSIC — place the MP3 at public/music/wedding-song.mp3.
  music: {
    src: "",
    label: "Wedding ambience",
    volume: 0.42,
    loop: true,
  },
} as const;

export type WeddingConfig = typeof weddingConfig;
