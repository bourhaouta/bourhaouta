import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

// Home page and resume content changes; update by hand
const siteUpdated = "2026-09-30";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts().filter((post) => !post.external);
  const latest = posts[0]?.date;

  return [
    { url: absoluteUrl("/"), lastModified: siteUpdated, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/blog/"), lastModified: latest, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/resume/"), lastModified: siteUpdated, changeFrequency: "monthly", priority: 0.8 },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}/`),
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
