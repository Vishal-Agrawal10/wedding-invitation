# Wedding music

Place an MP3 file in this folder, then set the following in
`app/wedding.config.ts`:

```ts
music: {
  src: "music/wedding-song.mp3",
  label: "Our wedding song",
  volume: 0.42,
  loop: true,
},
```

Leave `src` blank to keep the generated ambient sound.
