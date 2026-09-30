import { buildFeed } from "@/lib/feed";
import { site } from "@/lib/site";

// Feed for dev.to's RSS import (dev.to → Dashboard → RSS Import Feeds).
// Only posts written on this site: posts from CSS-Tricks or dev.to itself must
// not be imported again. dev.to turns each new item into a draft.
export const dynamic = "force-static";

export function GET() {
  return buildFeed({ path: "/devto.xml", title: `${site.name} - Blog`, includeExternal: false });
}
