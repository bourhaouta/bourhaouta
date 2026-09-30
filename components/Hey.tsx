import Image from "next/image";
import { site } from "@/lib/site";
import Icon, { type IconName } from "./Icon";
import rabat from "@/public/images/rabat.png";

const links: { icon: IconName; label: string; url: string }[] = [
  { icon: "twitter", label: "Twitter", url: site.socials.twitter },
  { icon: "github", label: "GitHub", url: site.socials.github },
  { icon: "codepen", label: "CodePen", url: site.socials.codepen },
  { icon: "linkedin", label: "LinkedIn", url: site.socials.linkedin },
];

export default function Hey() {
  return (
    <header>
      <div className="site-container relative flex items-center">
        <h1 className="relative z-10 mt-2 mb-4 text-lg font-light">
          <small className="mb-1 block text-2xl font-medium">Hey There,</small>
          I am <strong className="font-normal text-primary-600">{site.name}</strong>, a Frontend
          developer
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
        {/* Faded behind the text on phones, next to it from sm up */}
        <Image
          className="absolute inset-y-0 right-0 mr-4 h-full w-[calc(100%-2rem)] rounded-sm object-cover opacity-25 sm:w-1/2 sm:opacity-75"
          src={rabat}
          alt=""
          sizes="(min-width: 640px) 304px, 100vw"
          preload
        />
      </div>

      <div className="site-container">
        <ul className="-ml-2 flex space-x-3">
          {links.map(({ icon, label, url }) => (
            <li key={icon}>
              <a
                className="relative inline-flex h-8 w-8 items-center justify-center rounded transition-colors duration-200 hover:bg-gray-200"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon name={icon} size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
