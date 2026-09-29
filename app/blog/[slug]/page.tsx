import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import { getLocalPost, getPosts, renderMarkdown } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts()
    .filter((post) => !post.external)
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getLocalPost((await params).slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: post.cover ? [post.cover] : [] },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getLocalPost((await params).slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);

  return (
    <Shell back={{ title: "All articles", path: "/blog/" }}>
      <div className="site-container">
        <h1 className="mb-6 text-center font-serif text-4xl font-bold">{post.title}</h1>
      </div>

      {post.cover && (
        <div className="ratio mx-auto max-w-5xl rounded-sm">
          <Image src={post.cover} alt={post.title} fill sizes="(max-width: 1024px) 100vw, 1024px" priority />
        </div>
      )}

      <div className="site-container my-10">
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Shell>
  );
}
