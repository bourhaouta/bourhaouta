import type { AnchorHTMLAttributes, ElementType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";

type ArticleLinkProps = {
  post: Post;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

function ArticleLink({ post, children, ...props }: ArticleLinkProps) {
  if (post.external) {
    return (
      <a href={post.external} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    // next/link adds the trailing slash (trailingSlash: true)
    <Link href={`/blog/${post.slug}`} {...props}>
      {children}
    </Link>
  );
}

type Props = {
  post: Post;
  titleAs?: ElementType;
};

export default function ArticleCard({ post, titleAs: Title = "h3" }: Props) {
  return (
    <article className="group relative grid items-start gap-4 sm:grid-cols-2 sm:gap-6">
      <div className="absolute inset-0 -z-1 -mt-3 mb-4 ml-3 -mr-3 rounded-sm bg-primary-200/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* The title link below is the accessible one; this image link is a mouse shortcut */}
      <ArticleLink post={post} className="ratio rounded-sm bg-gray-200" aria-hidden tabIndex={-1}>
        {post.cover && <Image src={post.cover} alt="" fill sizes="(min-width: 640px) 300px, 100vw" />}
      </ArticleLink>

      <div className="flex h-full flex-col">
        <Title className="-mt-1 mb-2 text-xl">
          <ArticleLink post={post} className="block hover:text-primary-800">
            {post.title}
            {post.external && <span className="sr-only"> (opens CSS-Tricks in a new tab)</span>}
          </ArticleLink>
        </Title>

        <p className="mb-2 text-secondary-400">{post.excerpt}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 text-2xs text-secondary-400">
          <div className="flex items-center gap-1 whitespace-nowrap">
            <time dateTime={post.date}>{post.formattedDate}</time>
            <span aria-hidden>&middot;</span>
            <span>{post.timeToRead} min read</span>
          </div>

          {post.external && (
            <span className="flex items-center rounded-full bg-gray-200 pr-2 whitespace-nowrap">
              <Image
                className="mr-1 h-4 w-4 rounded-full object-cover object-center"
                src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1544564316/Avatar_qr6vy9.png"
                alt=""
                width={16}
                height={16}
              />
              CSS-Tricks
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
