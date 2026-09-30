import type { Route } from "next";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const className =
  "inline-flex items-center h-8 px-6 font-medium text-gray-800 transition-colors duration-200 bg-field border rounded-sm cursor-pointer hover:bg-secondary-100 hover:border-secondary-200 dark:text-ink dark:hover:bg-surface dark:hover:border-secondary-400 disabled:opacity-50 disabled:cursor-wait";

type Props = {
  to?: Route;
  href?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ to, href, children, ...buttonProps }: Props) {
  if (to) {
    return (
      <Link className={className} href={to}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} {...buttonProps}>
      {children}
    </button>
  );
}
