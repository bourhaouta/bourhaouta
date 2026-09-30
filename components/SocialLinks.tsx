import { site } from "@/lib/site";
import Icon, { type IconName } from "./Icon";

const links: { icon: IconName; label: string; url: string }[] = [
  { icon: "twitter", label: "Twitter", url: site.socials.twitter },
  { icon: "github", label: "GitHub", url: site.socials.github },
  { icon: "codepen", label: "CodePen", url: site.socials.codepen },
  { icon: "linkedin", label: "LinkedIn", url: site.socials.linkedin },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex space-x-3 ${className}`}>
      {links.map(({ icon, label, url }) => (
        <li key={icon}>
          <a
            className="relative inline-flex h-8 w-8 items-center justify-center rounded transition-colors duration-200 hover:bg-surface"
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
  );
}
