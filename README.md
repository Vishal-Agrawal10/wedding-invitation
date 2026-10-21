# Indian Wedding Invitation

A cinematic, mobile-friendly React wedding invitation with a sealed-envelope welcome, countdown, music, event itinerary, Google Maps and contact card.

The project contains one focused rose-envelope design, organised as seven editable pages.

## Personalise

Edit `app/wedding.config.ts`. The text is grouped as **Page 1** through **Page 7**, followed by image, colour and music settings.

Put photos in `public/photos/` and music in `public/music/`, then update their paths in the configuration.

The same configuration controls the envelope animation timing, paper/photo landing style, Google Map, contact details and whether music starts when the invitation is opened.

## Preview

```bash
npm install
npm run dev
```

## GitHub Pages

The included GitHub Actions workflow builds and publishes the static site for free. Push the project to a GitHub repository, keep the default `main` branch, then choose **GitHub Actions** as the Pages source in the repository settings.
