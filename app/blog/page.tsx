import type { Metadata } from "next";
import Articles from "@/components/Articles";
import Shell from "@/components/Shell";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <Shell back={{ title: "Homepage", path: "/" }}>
      <Articles posts={getPosts()} />
    </Shell>
  );
}
