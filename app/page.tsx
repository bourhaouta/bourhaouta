import type { Metadata } from "next";
import Articles from "@/components/Articles";
import Button from "@/components/Button";
import Hey from "@/components/Hey";
import Pens from "@/components/Pens";
import Shell from "@/components/Shell";
import { getPens } from "@/lib/pens";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

// Refresh the CodePen feed once a day
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Front-End Web Developer!",
  description: site.name,
};

export default async function HomePage() {
  const posts = getPosts().slice(0, 2);
  const pens = await getPens();

  return (
    <Shell>
      <div className="space-y-16">
        <Hey />

        <Articles
          posts={posts}
          footer={
            <div className="mt-12 flex justify-center">
              <Button to="/blog/">Read more articles</Button>
            </div>
          }
        />

        <Pens pens={pens} />
      </div>
    </Shell>
  );
}
