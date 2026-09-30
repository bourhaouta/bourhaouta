import type { Metadata } from "next";
import Articles from "@/components/Articles";
import Shell from "@/components/Shell";
import { alternates, baseOpenGraph, baseTwitter } from "@/lib/metadata";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

const description = `Articles by ${site.name}, mostly about CSS and front-end development.`;

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: alternates("/blog/"),
  openGraph: { ...baseOpenGraph, type: "website", title: "Blog", description, url: "/blog/" },
  twitter: { ...baseTwitter, title: "Blog", description },
};

export default function BlogPage() {
  return (
    <Shell back={{ title: "Homepage", path: "/" }}>
      <Articles posts={getPosts()} headingAs="h1" />
    </Shell>
  );
}
