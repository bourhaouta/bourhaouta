import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { site } from "@/lib/site";
import "prismjs/themes/prism-okaidia.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  keywords: ["front-end web developer", "HTML", "CSS", "JavaScript", "UI", "UX", "Rabat", "Morocco"],
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
