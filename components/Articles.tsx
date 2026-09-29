import type { ReactNode } from "react";
import type { Post } from "@/lib/posts";
import ArticleCard from "./ArticleCard";
import Heading from "./Heading";

export default function Articles({ posts, footer }: { posts: Post[]; footer?: ReactNode }) {
  return (
    <section>
      <div className="site-container">
        <Heading caption="Articles">Mostly talking about CSS</Heading>

        <ul className="grid gap-10">
          {posts.map((post) => (
            <li key={post.slug}>
              <ArticleCard post={post} />
            </li>
          ))}
        </ul>

        {footer}
      </div>
    </section>
  );
}
