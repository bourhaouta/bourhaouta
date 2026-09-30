import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import Icon from "./Icon";
import ShadowFrame from "./ShadowFrame";
import SocialLinks from "./SocialLinks";
import rabat from "@/public/images/rabat.png";

// Both maps use the same `sizes`, so the browser downloads the image once
const mapSizes = "(min-width: 640px) 304px, 100vw";

export default function Hey() {
  return (
    <header className="relative overflow-hidden py-10 sm:overflow-visible sm:py-0">
      {/* Phones: full-width map behind the intro. Page color at the top left fades
          to the bottom right so the text stays readable; top and bottom edges fade out. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-1 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_70%,transparent)] sm:hidden"
      >
        <Image
          className="h-full w-full object-cover object-right opacity-75 dark:opacity-40"
          src={rabat}
          alt=""
          fill
          sizes={mapSizes}
          preload
        />
        <div className="absolute inset-0 bg-linear-to-br from-page from-30% to-transparent" />
      </div>

      <div className="site-container relative flex items-center">
        <div className="relative z-10 mt-2 mb-4">
          <h1 className="text-lg font-light">
            <small className="mb-1 block text-2xl font-medium">Hey There,</small>
            I&apos;m <strong className="font-normal text-accent">{site.name}</strong>, a Software Engineer.
            <br />I build product-focused web apps, end to end.
          </h1>

          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            {site.status && (
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-surface px-2.5 py-1 transition-colors hover:text-accent-hover"
              >
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-green-500" />
                </span>
                {site.status}
              </a>
            )}
            <Link href="/cv" className="inline-flex items-center gap-1 underline-offset-2 hover:text-accent-hover hover:underline">
              <Icon name="file" size={14} />
              View CV
            </Link>
          </p>
        </div>

        {/* From sm up: map card on the right with the moving shadow */}
        <ShadowFrame className="absolute inset-y-0 right-0 mr-4 hidden w-1/2 sm:block">
          {/* Solid background so the faded map doesn't let the shadow show through */}
          <div className="h-full overflow-hidden rounded-sm bg-page">
            <Image
              className="h-full w-full object-cover opacity-75 dark:opacity-40"
              src={rabat}
              alt=""
              sizes={mapSizes}
              preload
            />
          </div>
        </ShadowFrame>
      </div>

      <div className="site-container">
        <SocialLinks className="-ml-2" />
      </div>
    </header>
  );
}
