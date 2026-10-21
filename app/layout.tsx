import type { Metadata, Viewport } from "next";
import "./globals.css";
import { weddingConfig } from "./wedding.config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${weddingConfig.pages.page2.brideName} & ${weddingConfig.pages.page2.groomName} — Wedding Invitation`,
  description: `You are invited to celebrate the wedding of ${weddingConfig.pages.page2.brideName} and ${weddingConfig.pages.page2.groomName} in ${weddingConfig.pages.page3.city}.`,
  icons: { icon: "./branding/wax-seal-cutout.png" },
  openGraph: {
    title: `${weddingConfig.pages.page2.brideName} & ${weddingConfig.pages.page2.groomName} — Wedding Invitation`,
    description: `${weddingConfig.pages.page3.displayDate} · ${weddingConfig.pages.page3.city}`,
    type: "website",
    images: [{ url: "og.png", width: 1792, height: 939, alt: "Indian wedding invitation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${weddingConfig.pages.page2.brideName} & ${weddingConfig.pages.page2.groomName}`,
    description: `${weddingConfig.pages.page3.displayDate} · ${weddingConfig.pages.page3.city}`,
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
