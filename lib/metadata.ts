import type { Metadata } from "next";
import { site } from "./site";

// Next.js merges metadata shallowly: a page that sets `openGraph`, `twitter` or
// `alternates` replaces the layout's object. Spread these defaults to keep them.

export const baseOpenGraph = {
  siteName: site.name,
  locale: site.locale,
} satisfies Metadata["openGraph"];

export const baseTwitter = {
  card: "summary_large_image",
  creator: site.twitter,
} satisfies Metadata["twitter"];

export function alternates(canonical: string): Metadata["alternates"] {
  return {
    canonical,
    types: { "application/rss+xml": [{ url: "/feed.xml", title: `${site.name} - Blog` }] },
  };
}
