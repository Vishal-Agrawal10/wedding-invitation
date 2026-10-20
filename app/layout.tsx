import type { Metadata, Viewport } from "next";
import "./globals.css";
import { weddingConfig } from "./wedding.config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${weddingConfig.couple.bride} & ${weddingConfig.couple.groom} — Wedding Invitation`,
  description: `You are invited to celebrate the wedding of ${weddingConfig.couple.bride} and ${weddingConfig.couple.groom} in ${weddingConfig.wedding.city}.`,
  icons: { icon: "./royal-wedding-hero.png" },
  openGraph: {
    title: `${weddingConfig.couple.bride} & ${weddingConfig.couple.groom} — Wedding Invitation`,
    description: `${weddingConfig.wedding.displayDate} · ${weddingConfig.wedding.city}`,
    type: "website",
    images: [{ url: "og.png", width: 1792, height: 939, alt: "Royal Indian wedding invitation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${weddingConfig.couple.bride} & ${weddingConfig.couple.groom}`,
    description: `${weddingConfig.wedding.displayDate} · ${weddingConfig.wedding.city}`,
    images: ["og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#3a0714",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
