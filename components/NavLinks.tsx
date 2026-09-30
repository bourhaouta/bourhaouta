"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactDialog from "./ContactDialog";

// Sections on the home page use "/#id" so they also work from other pages.
const links: { label: string; href: Route; page?: string }[] = [
  { label: "Work", href: "/#experience" as Route },
  { label: "Projects", href: "/#projects" as Route },
  { label: "Blog", href: "/blog", page: "/blog" },
  { label: "Resume", href: "/resume", page: "/resume" },
];

const linkClass = "py-1 transition-colors hover:text-accent-hover";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-2xs font-medium tracking-widest uppercase">
      {links.map(({ label, href, page }) => {
        const current = page !== undefined && pathname.startsWith(page);
        return (
          <li key={label}>
            <Link
              href={href}
              className={`${linkClass} ${current ? "text-accent" : "text-muted"}`}
              aria-current={current ? "page" : undefined}
            >
              {label}
            </Link>
          </li>
        );
      })}
      <li>
        {/* Opens the contact form in a dialog instead of scrolling to the footer */}
        <ContactDialog buttonClassName={`${linkClass} font-medium tracking-widest uppercase text-muted`} />
      </li>
    </ul>
  );
}
