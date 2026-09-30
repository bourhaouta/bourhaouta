import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import Icon from "./Icon";
import NavLinks from "./NavLinks";
import brand from "@/public/images/brand.svg";

export type Back = { title: string; path: Route };

export default function Navbar({ back }: { back?: Back }) {
  return (
    <nav className="mb-8 pt-6 print:hidden" aria-label="Main">
      <div className="site-container grid h-20 grid-cols-3 items-center">
        <div>
          {back && (
            <Link
              className="inline-flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-surface"
              href={back.path}
              title={back.title}
              aria-label={`Back to ${back.title}`}
            >
              <Icon name="back" />
            </Link>
          )}
        </div>

        <div className="flex justify-center">
          <Link href="/" aria-label={`${site.name}, home`}>
            <Image src={brand} alt="" preload unoptimized />
          </Link>
        </div>

        <div />
      </div>

      <div className="site-container">
        <NavLinks />
      </div>
    </nav>
  );
}
