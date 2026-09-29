import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import Icon from "./Icon";
import brand from "@/public/images/brand.svg";

export type Back = { title: string; path: string };

export default function Navbar({ back }: { back?: Back }) {
  return (
    <nav className="mb-4">
      <div className="site-container grid h-32 grid-cols-3 items-center">
        <div>
          {back && (
            <Link
              className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-gray-200"
              href={back.path}
              title={back.title}
            >
              <Icon name="back" />
            </Link>
          )}
        </div>

        <div className="flex justify-center">
          <Link href="/">
            <Image src={brand} alt={site.name} priority unoptimized />
          </Link>
        </div>

        <div />
      </div>
    </nav>
  );
}
