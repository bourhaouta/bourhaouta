import type { Route } from "next";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const className =
  "inline-flex items-center h-8 px-6 font-medium text-gray-800 transition-colors duration-200 bg-field border rounded-sm cursor-pointer hover:bg-secondary-100 hover:border-secondary-200 dark:text-ink dark:hover:bg-surface dark:hover:border-secondary-400 disabled:opacity-50 disabled:cursor-wait";

type Props = {
  to?: Route;
  href?: string;
  children: ReactNode;
  /** Analytics event sent on click (see ClickTracker) */
  event?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ to, href, children, event, ...buttonProps }: Props) {
  if (to) {
    return (
      <Link className={className} href={to} data-event={event}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={className} href={href} data-event={event}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} data-event={event} {...buttonProps}>
      {children}
    </button>
  );
}
