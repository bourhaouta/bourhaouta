import { buildFeed } from "@/lib/feed";
import { site } from "@/lib/site";

// Built once at deploy time; posts only change with a new deploy
export const dynamic = "force-static";

export function GET() {
  return buildFeed({ path: "/feed.xml", title: `${site.name} - Blog`, includeExternal: true });
}
