import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import Icon from "./Icon";
import ShadowFrame from "./ShadowFrame";
import SocialLinks from "./SocialLinks";
import rabat from "@/public/images/rabat.png";

export default function Hey() {
  return (
    <header>
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
        {/* Faded behind the text on phones (no shadow), next to it with the moving shadow from sm up */}
        <ShadowFrame className="absolute inset-y-0 right-0 mr-4 w-[calc(100%-2rem)] sm:w-1/2 [&>.shadow-frame-shadow]:hidden sm:[&>.shadow-frame-shadow]:block">
          {/* Solid background so the faded map doesn't let the shadow show through */}
          <div className="h-full overflow-hidden rounded-sm bg-page">
            <Image
              className="h-full w-full object-cover opacity-25 sm:opacity-75 dark:opacity-15 dark:sm:opacity-40"
              src={rabat}
              alt=""
              sizes="(min-width: 640px) 304px, 100vw"
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
