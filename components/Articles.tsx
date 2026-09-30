import type { ElementType, ReactNode } from "react";
import type { Post } from "@/lib/posts";
import ArticleCard from "./ArticleCard";
import Heading from "./Heading";

type Props = {
  posts: Post[];
  footer?: ReactNode;
  caption?: string;
  // Use "h1" when the list is the main content of the page
  headingAs?: ElementType;
};

export default function Articles({ posts, footer, caption = "Articles", headingAs = "h2" }: Props) {
  return (
    <section>
      <div className="site-container">
        <Heading caption={caption} as={headingAs}>
          Mostly talking about CSS
        </Heading>

        <ul className="grid gap-10">
          {posts.map((post) => (
            <li key={post.slug}>
              <ArticleCard post={post} titleAs={headingAs === "h1" ? "h2" : "h3"} />
            </li>
          ))}
        </ul>

        {footer}
      </div>
    </section>
  );
}
