import Image from "next/image";
import { site } from "@/lib/site";
import ShadowFrame from "./ShadowFrame";
import SocialLinks from "./SocialLinks";
import rabat from "@/public/images/rabat.png";

export default function Hey() {
  return (
    <header>
      <div className="site-container relative flex items-center">
        <h1 className="relative z-10 mt-2 mb-4 text-lg font-light">
          <small className="mb-1 block text-2xl font-medium">Hey There,</small>
          I am <strong className="font-normal text-accent">{site.name}</strong>, a Frontend developer
          <br />
          based in{" "}
          <a
            className="hover:underline"
            href="https://www.google.com/maps/place/Rabat/data=!4m2!3m1!1s0xda76b871f50c5c1:0x7ac946ed7408076b?sa=X&ved=2ahUKEwiMj_DwrJjpAhVEr3EKHYyYBngQ8gEwAHoECAsQAQ"
            rel="noopener noreferrer"
            target="_blank"
          >
            Rabat, Morocco
          </a>
          .
        </h1>
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
