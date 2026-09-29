import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";

function ArticleLink({ post, className, children }: { post: Post; className?: string; children: React.ReactNode }) {
  if (post.external) {
    return (
      <a className={className} href={post.external} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={`/blog/${post.slug}/`}>
      {children}
    </Link>
  );
}

export default function ArticleCard({ post }: { post: Post }) {
  return (
    <article className="group relative grid grid-cols-2 items-start gap-6">
      <div className="absolute inset-0 -z-1 -mt-3 mb-4 ml-3 -mr-3 rounded-sm bg-primary-200/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <ArticleLink post={post} className="ratio rounded-sm bg-gray-200">
        {post.cover && <Image src={post.cover} alt={post.title} fill sizes="300px" />}
      </ArticleLink>

      <div className="flex h-full flex-col">
        <h2 className="-mt-1 mb-2 text-xl">
          <ArticleLink post={post} className="block hover:text-primary-800">
            {post.title}
          </ArticleLink>
        </h2>

        <p className="mb-2 text-secondary-400">{post.excerpt}</p>

        <div className="mt-auto flex items-start justify-between text-2xs text-secondary-400">
          <div className="flex items-start space-x-1">
            <time dateTime={post.date}>{post.formattedDate}</time>
            <span>&middot;</span>
            <p>{post.timeToRead} mins read</p>
          </div>

          {post.external && (
            <a
              href={post.external}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center rounded-full bg-gray-200 pr-2"
            >
              <Image
                className="mr-1 h-4 w-4 rounded-full object-cover object-center"
                src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1544564316/Avatar_qr6vy9.png"
                alt=""
                width={16}
                height={16}
              />
              CSS-Tricks
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
