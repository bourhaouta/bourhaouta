import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { alternates, baseOpenGraph, baseTwitter } from "@/lib/metadata";
import { site } from "@/lib/site";
import "prismjs/themes/prism-okaidia.css";
import "./globals.css";

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
  keywords: ["front-end web developer", "HTML", "CSS", "JavaScript", "UI", "UX", "Rabat", "Morocco"],
  alternates: alternates("/"),
  openGraph: { ...baseOpenGraph, type: "website", url: "/" },
  twitter: baseTwitter,
};

export const viewport: Viewport = {
  themeColor: "#db4d53",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
