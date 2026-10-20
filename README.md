# Indian Wedding Invitation

A cinematic, mobile-friendly React wedding invitation with a sealed-envelope welcome, countdown, music, event itinerary, gallery, Google Maps and WhatsApp RSVP.

Two complete designs are included:

- `aamantran` — the active rose-envelope, editorial invitation.
- `royal` — the original palace design, retained for later use.

## Personalise

Edit `app/wedding.config.ts`. Names, date, family copy, events, gallery images, venue, map links, WhatsApp number, music and the active template are kept together in that file.

Put photos in `public/photos/` and music in `public/music/`, then update their paths in the configuration. Change `activeTemplate` to `"royal"` at any time to restore the original design.

The same configuration also controls the envelope animation timing, photo/paper
opening style, event directions, Google Map, RSVP contacts and whether music
starts when the invitation is opened.

## Preview

```bash
npm install
npm run dev
```

## GitHub Pages

The included GitHub Actions workflow builds and publishes the static site for free. Push the project to a GitHub repository, keep the default `main` branch, then choose **GitHub Actions** as the Pages source in the repository settings.
