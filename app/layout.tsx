import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Rubik } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import ClickTracker from "@/components/ClickTracker";
import { alternates, baseOpenGraph, baseTwitter } from "@/lib/metadata";
import { site } from "@/lib/site";
import "prismjs/themes/prism-okaidia.css";
import "./globals.css";

// Self-hosted at build time; exposed as --font-rubik for Tailwind's font-sans
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - ${site.title}`,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "software engineer",
    "frontend engineer",
    "product engineering",
    "TypeScript",
    "Svelte",
    "SvelteKit",
    "React",
    "GraphQL",
    "Rabat",
    "Morocco",
    "remote",
  ],
  alternates: alternates("/"),
  openGraph: { ...baseOpenGraph, type: "website", url: "/" },
  twitter: baseTwitter,
};

// Browser bar matches the page background
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#021b21" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={rubik.variable}>
      <body>
        {children}
        {/* Vercel Web Analytics; only sends data on Vercel deployments */}
        <Analytics />
        <ClickTracker />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
