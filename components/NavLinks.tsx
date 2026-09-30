"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Sections on the home page use "/#id" so they also work from other pages.
// Contact is in the footer of every page, so it stays on the current page.
const links: { label: string; href: Route | `#${string}`; page?: string }[] = [
  { label: "Work", href: "/#experience" as Route },
  { label: "Projects", href: "/#projects" as Route },
  { label: "Blog", href: "/blog", page: "/blog" },
  { label: "CV", href: "/cv", page: "/cv" },
  { label: "Contact", href: "#contact" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-2xs font-medium tracking-widest uppercase">
      {links.map(({ label, href, page }) => {
        const current = page !== undefined && pathname.startsWith(page);
        const className = `py-1 transition-colors hover:text-accent-hover ${
          current ? "text-accent" : "text-muted"
        }`;

        return (
          <li key={label}>
            {href.startsWith("#") ? (
              <a href={href} className={className}>
                {label}
              </a>
            ) : (
              <Link href={href as Route} className={className} aria-current={current ? "page" : undefined}>
                {label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
