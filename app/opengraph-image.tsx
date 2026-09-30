import { ogImage, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name} - ${site.title}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ caption: "Hey There", title: `${site.title} based in Rabat, Morocco` });
}
