import "server-only";
import { getPosts, renderMarkdown, type Post } from "./posts";
import { absoluteUrl, site } from "./site";

type FeedOptions = {
  /** Path of the feed itself, for the self link */
  path: string;
  title: string;
  /**
   * true: every post, with posts from other sites (CSS-Tricks, dev.to) as links.
   * false: only posts written here that aren't on dev.to yet (for dev.to's import).
   */
  includeExternal: boolean;
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// CDATA can't contain "]]>", so split it across two sections
const cdata = (value: string) => `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;

async function item(post: Post): Promise<string> {
  const link = post.external ?? absoluteUrl(`/blog/${post.slug}/`);
  // Full article for posts on this site; external posts only link out
  const content = post.external
    ? ""
    : `\n      <content:encoded>${cdata(await renderMarkdown(post.content, { highlight: false }))}</content:encoded>`;

  return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>${content}${post.tags
        .map((tag) => `\n      <category>${escapeXml(tag)}</category>`)
        .join("")}
    </item>`;
}

/** RSS 2.0 feed of the blog, with the full text of posts written on this site */
export async function buildFeed({ path, title, includeExternal }: FeedOptions): Promise<Response> {
  const posts = getPosts().filter((post) => includeExternal || (!post.external && !post.devto));
  const items = (await Promise.all(posts.map(item))).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${absoluteUrl("/blog/")}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
    <atom:link href="${absoluteUrl(path)}" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
