import Image from "next/image";
import type { Pen } from "@/lib/pens";
import { site } from "@/lib/site";
import Heading from "./Heading";

export default function Pens({ pens }: { pens: Pen[] }) {
  if (pens.length === 0) return null;

  return (
    <section className="bg-black py-10">
      <div className="site-container">
        <Heading className="mb-6" caption="Pens" isLight noMargin>
          My picked pens on{" "}
          <a className="hover:underline" href={site.socials.codepen} target="_blank" rel="noopener noreferrer">
            CodePen
          </a>
        </Heading>

        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {pens.map((pen) => (
            <li key={pen.id} className="relative">
              <div className="absolute inset-0 mt-3 ml-3 -mr-2 rounded-lg bg-gray-100/25" />

              {/* The title link below is the accessible one; this image link is a mouse shortcut */}
              <a
                href={pen.link}
                className="ratio"
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden
                tabIndex={-1}
              >
                <Image
                  className="rounded bg-gray-100"
                  src={`${pen.link}/image/large.png`}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 190px, 45vw"
                />
              </a>

              <h3 className="my-2 ml-6 truncate font-bold text-white">
                <a href={pen.link} title={pen.title} target="_blank" rel="noopener noreferrer">
                  {pen.title}
                </a>
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
