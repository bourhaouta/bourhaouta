import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const BLOG_DIR = path.join(process.cwd(), "blog");

// Same reading speed Gridsome used for timeToRead
const WORDS_PER_MINUTE = 230;

export type Post = {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  cover?: string;
  excerpt: string;
  external?: string;
  /** dev.to copy of a post written here; such posts are left out of /devto.xml */
  devto?: string;
  tags: string[];
  timeToRead: number;
  content: string;
};

function listMarkdownFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listMarkdownFiles(fullPath);
    return entry.name.endsWith(".md") ? [fullPath] : [];
  });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

function readPost(filePath: string): Post | null {
  const { data, content, excerpt } = matter(fs.readFileSync(filePath, "utf8"), {
    excerpt: true,
  });

  if (!data.published) return null;

  const date = new Date(data.date);
  const words = content.trim().split(/\s+/).length;

  return {
    slug: path.basename(filePath, ".md"),
    title: data.title,
    date: date.toISOString(),
    formattedDate: formatDate(date),
    cover: data.cover,
    excerpt: excerpt?.trim() ?? "",
    external: data.external,
    devto: data.devto,
    tags: Array.isArray(data.tags) ? data.tags : [],
    timeToRead: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    // Drop the excerpt separator so it does not render as a <hr>
    content: excerpt ? content.replace(/^---\s*$/m, "") : content,
  };
}

// Cached so pages, metadata and OG images share one read per request
export const getPosts = cache((): Post[] =>
  listMarkdownFiles(BLOG_DIR)
    .map(readPost)
    .filter((post): post is Post => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date)),
);

// Only posts hosted on this site get their own page
export function getLocalPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug && !post.external);
}

/**
 * Renders a post's Markdown to HTML. `highlight: false` keeps code blocks as plain
 * `<pre><code class="language-…">`, which feed readers and dev.to import cleanly.
 */
export async function renderMarkdown(
  markdown: string,
  { highlight = true }: { highlight?: boolean } = {},
): Promise<string> {
  const processor = unified().use(remarkParse).use(remarkRehype).use(rehypeSlug);
  if (highlight) processor.use(rehypePrism, { ignoreMissing: true });

  return String(await processor.use(rehypeStringify).process(markdown));
}
