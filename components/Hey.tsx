import Image from "next/image";
import { site } from "@/lib/site";
import Icon, { type IconName } from "./Icon";
import rabat from "@/public/images/rabat.png";

const links: { icon: IconName; url: string }[] = [
  { icon: "twitter", url: "https://twitter.com/bourhaouta" },
  { icon: "github", url: "https://github.com/bourhaouta" },
  { icon: "codepen", url: "https://codepen.io/bourhaouta" },
  { icon: "linkedin", url: "https://www.linkedin.com/in/bourhaouta" },
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
        <Image
          className="absolute top-0 right-0 bottom-0 mr-4 h-full w-1/2 rounded-sm object-cover opacity-75"
          src={rabat}
          alt={site.name}
          priority
        />
      </div>

      <div className="site-container">
        <ul className="-ml-2 flex space-x-3">
          {links.map(({ icon, url }) => (
            <li key={icon}>
              <a
                className="relative inline-flex h-8 w-8 items-center justify-center rounded transition-colors duration-200 hover:bg-gray-200"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={icon}
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
