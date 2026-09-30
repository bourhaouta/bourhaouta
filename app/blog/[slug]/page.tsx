import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import { alternates, baseOpenGraph, baseTwitter } from "@/lib/metadata";
import { getLocalPost, getPosts, renderMarkdown } from "@/lib/posts";
import { absoluteUrl, jsonLd, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts()
    .filter((post) => !post.external)
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getLocalPost((await params).slug);
  if (!post) return {};

  const url = `/blog/${post.slug}/`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: alternates(url),
    openGraph: {
      ...baseOpenGraph,
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [site.url],
      tags: post.tags,
    },
    // The share image comes from ./opengraph-image.tsx
    twitter: { ...baseTwitter, title: post.title, description: post.excerpt },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getLocalPost((await params).slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    datePublished: post.date,
    keywords: post.tags.join(", "),
    url: absoluteUrl(`/blog/${post.slug}/`),
    author: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <Shell back={{ title: "All articles", path: "/blog" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(article) }} />

      <article>
        <header className="site-container mb-6 text-center">
          <h1 className="mb-3 font-serif text-4xl font-bold">{post.title}</h1>

          <p className="flex items-center justify-center gap-1 text-secondary-400">
            <time dateTime={post.date}>{post.formattedDate}</time>
            <span aria-hidden>&middot;</span>
            <span>{post.timeToRead} min read</span>
          </p>

          {post.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap justify-center gap-2" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-gray-200 px-2 py-0.5 text-2xs">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        {post.cover && (
          <div className="ratio mx-auto max-w-5xl rounded-sm">
            <Image src={post.cover} alt="" fill sizes="(max-width: 1024px) 100vw, 1024px" preload />
          </div>
        )}

        <div className="site-container my-10">
          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </article>
    </Shell>
  );
}
