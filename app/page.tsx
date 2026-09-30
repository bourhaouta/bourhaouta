import Articles from "@/components/Articles";
import Button from "@/components/Button";
import Hey from "@/components/Hey";
import Pens from "@/components/Pens";
import Projects from "@/components/Projects";
import Shell from "@/components/Shell";
import { getPens } from "@/lib/pens";
import { getPosts } from "@/lib/posts";
import { jsonLd, site } from "@/lib/site";

// Refresh the CodePen feed once a day
export const revalidate = 86400;

// Title, description and canonical come from the root layout

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Rabat", addressCountry: "MA" },
  sameAs: Object.values(site.socials),
};

export default async function HomePage() {
  const posts = getPosts().slice(0, 2);
  const pens = await getPens();

  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(person) }} />

      <div className="space-y-16">
        <Hey />

        <Articles
          posts={posts}
          footer={
            <div className="mt-12 flex justify-center">
              <Button to="/blog">Read more articles</Button>
            </div>
          }
        />

        <Projects />

        <Pens pens={pens} />
      </div>
    </Shell>
  );
}
