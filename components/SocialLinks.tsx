import { site } from "@/lib/site";
import Icon, { type IconName } from "./Icon";

const links: { icon: IconName; label: string; url: string }[] = [
  { icon: "mail", label: `Email ${site.email}`, url: `mailto:${site.email}` },
  { icon: "twitter", label: "Twitter", url: site.socials.twitter },
  { icon: "github", label: "GitHub", url: site.socials.github },
  { icon: "codepen", label: "CodePen", url: site.socials.codepen },
  { icon: "linkedin", label: "LinkedIn", url: site.socials.linkedin },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex space-x-3 ${className}`}>
      {links.map(({ icon, label, url }) => {
        const external = !url.startsWith("mailto:");
        return (
          <li key={icon}>
            <a
              className="relative inline-flex h-8 w-8 items-center justify-center rounded transition-colors duration-200 hover:bg-surface"
              href={url}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-label={label}
              title={label}
            >
              <Icon name={icon} size={18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
