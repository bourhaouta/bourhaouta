import { ogImage, ogSize } from "@/lib/og";
import { getLocalPost } from "@/lib/posts";
import { site } from "@/lib/site";

// Build one image per post at deploy time
export { generateStaticParams } from "./page";

export const alt = `Article by ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getLocalPost((await params).slug);
  return ogImage({ caption: "Articles", title: post?.title ?? site.title });
}
