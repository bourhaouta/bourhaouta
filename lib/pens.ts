import "server-only";
import Parser from "rss-parser";

export type Pen = {
  id: string;
  title: string;
  link: string;
};

const LIMIT = 6;

export async function getPens(): Promise<Pen[]> {
  const feedUrl = process.env.CODEPEN_FEED;
  if (!feedUrl) return [];

  try {
    const res = await fetch(feedUrl, {
      headers: { "User-Agent": "bourhaouta.com (+https://www.bourhaouta.com)" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const feed = await new Parser().parseString(await res.text());

    return feed.items.slice(0, LIMIT).flatMap((item) =>
      item.link
        ? [{ id: item.guid ?? item.link, title: item.title ?? "", link: item.link }]
        : [],
    );
  } catch (error) {
    console.error("Could not load CodePen feed:", error);
    return [];
  }
}
