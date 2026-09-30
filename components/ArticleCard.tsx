import type { AnchorHTMLAttributes, ElementType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import ShadowFrame from "./ShadowFrame";
import CoverTransition from "./CoverTransition";

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

/** Name and small logo of the site an external post was published on */
function externalSource(url: string): { name: string; logo: ReactNode } {
  const host = new URL(url).hostname.replace(/^www\./, "");

  if (host === "css-tricks.com") {
    return {
      name: "CSS-Tricks",
      logo: (
        <Image
          className="h-4 w-4 rounded-full object-cover object-center"
          src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1544564316/Avatar_qr6vy9.png"
          alt=""
          width={16}
          height={16}
        />
      ),
    };
  }

  if (host === "dev.to") {
    return {
      name: "DEV Community",
      // The DEV logo: white "DEV" on a black rounded square
      logo: (
        <span className="flex h-4 items-center rounded-sm bg-black px-1 text-[0.5rem] leading-none font-bold text-white">
          DEV
        </span>
      ),
    };
  }

  return { name: host, logo: null };
}

export default function ArticleCard({ post, titleAs: Title = "h3" }: Props) {
  const source = post.external ? externalSource(post.external) : undefined;

  return (
    <article className="group relative grid items-start gap-4 sm:grid-cols-2 sm:gap-6">
      <div className="absolute inset-0 -z-1 -mt-3 mb-4 ml-3 -mr-3 rounded-sm bg-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* The title link below is the accessible one; this image link is a mouse shortcut */}
      <ShadowFrame>
        <ArticleLink post={post} className="ratio rounded-sm bg-surface" aria-hidden tabIndex={-1}>
          {post.cover && (
            <CoverTransition slug={post.slug}>
              <Image src={post.cover} alt="" fill sizes="(min-width: 640px) 300px, 100vw" />
            </CoverTransition>
          )}
        </ArticleLink>
      </ShadowFrame>

      <div className="flex h-full flex-col">
        <Title className="-mt-1 mb-2 text-xl">
          <ArticleLink post={post} className="block transition-colors hover:text-accent-hover">
            {post.title}
            {source && <span className="sr-only"> (opens {source.name} in a new tab)</span>}
          </ArticleLink>
        </Title>

        <p className="mb-2 text-muted">{post.excerpt}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 text-2xs text-muted">
          <div className="flex items-center gap-1 whitespace-nowrap">
            <time dateTime={post.date}>{post.formattedDate}</time>
            <span aria-hidden>&middot;</span>
            <span>{post.timeToRead} min read</span>
          </div>

          {source && (
            <span className="flex items-center gap-1 rounded-full bg-surface pr-2 whitespace-nowrap">
              {source.logo ?? <span className="w-1" />}
              {source.name}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
