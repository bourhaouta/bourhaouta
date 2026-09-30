import type { Metadata } from "next";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Shell from "@/components/Shell";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Shell back={{ title: "Homepage", path: "/" }}>
      <div className="site-container py-10 text-center">
        <Heading caption="404" as="h1" className="items-center">
          This page could not be found
        </Heading>

        <p className="mb-8 text-sm text-secondary-400">It may have moved, or the link may be wrong.</p>

        <div className="flex justify-center gap-4">
          <Button to="/">Go home</Button>
          <Button to="/blog">Read the blog</Button>
        </div>
      </div>
    </Shell>
  );
}
