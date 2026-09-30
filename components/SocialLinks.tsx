import { site } from "@/lib/site";
import type { IconName } from "./Icon";
import SocialIconLink from "./SocialIconLink";

const links: { icon: IconName; label: string; url: string }[] = [
  { icon: "mail", label: `Email ${site.email}`, url: `mailto:${site.email}` },
  { icon: "twitter", label: "Twitter", url: site.socials.twitter },
  { icon: "github", label: "GitHub", url: site.socials.github },
  { icon: "codepen", label: "CodePen", url: site.socials.codepen },
  { icon: "linkedin", label: "LinkedIn", url: site.socials.linkedin },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex gap-1 ${className}`}>
      {links.map((link) => (
        <li key={link.icon}>
          <SocialIconLink {...link} />
        </li>
      ))}
    </ul>
  );
}
