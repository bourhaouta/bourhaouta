import Image from "next/image";
import { site } from "@/lib/site";
import ContactForm from "./ContactForm";
import Heading from "./Heading";
import SocialLinks from "./SocialLinks";
import sky from "@/public/images/sky.png";

export default function Footer() {
  return (
    <footer id="contact" className="relative mt-20 scroll-mt-8 print:hidden">
      {/* Sky centered at the bottom; both sides fade into the page so wide screens have no hard edges */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-1 flex justify-center overflow-hidden dark:hidden">
        <Image
          className="h-auto w-full max-w-[1800px] [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
          src={sky}
          alt=""
          sizes="(min-width: 1800px) 1800px, 100vw"
        />
      </div>

      <div className="site-container sm:px-20">
        <Heading caption="Contact" className="items-center">
          Get in touch
        </Heading>

        <p className="mb-6 text-center text-muted">
          Email me at{" "}
          <a href={`mailto:${site.email}`} className="text-accent underline-offset-2 hover:underline">
            {site.email}
          </a>{" "}
          or send a message below.
        </p>

        <ContactForm />

        <div className="flex flex-col items-center gap-2 border-t py-6 sm:flex-row sm:justify-between">
          <p className="text-2xs text-muted">
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <SocialLinks className="-mr-2" />
        </div>
      </div>
    </footer>
  );
}
