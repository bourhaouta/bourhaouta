import "server-only";

export type Project = {
  name: string;
  kind: string;
  /** `backticks` mark code, shown in a monospace font that doesn't break */
  description: string;
  url: string;
  // Local icon in /public and the color taken from it
  icon: string;
  brand: string;
  // "owner/repo" on GitHub
  github?: string;
  // "publisher.extension" on the VS Code Marketplace
  marketplace?: string;
  // Package name on npm
  npm?: string;
  /** Short card across both columns, for smaller projects */
  compact?: boolean;
};

export type ProjectStats = {
  stars?: number;
  installs?: number;
  rating?: number;
  ratingCount?: number;
  /** All-time npm downloads */
  downloads?: number;
};

export const projects: Project[] = [
  {
    name: "Tailwind CSS Shades",
    kind: "VS Code extension",
    description:
      "Generate a full Tailwind CSS palette (50\u2060–\u2060950) from any color, right in your editor. Version 1.0 adds Tailwind v4, OKLCH, and version-aware output.",
    url: "https://marketplace.visualstudio.com/items?itemName=bourhaouta.tailwindshades",
    icon: "/images/projects/tailwindshades.png",
    brand: "#38b2ac",
    github: "bourhaouta/vscode-tailwindshades",
    marketplace: "bourhaouta.tailwindshades",
  },
  {
    name: "Shooot",
    kind: "Web app",
    description: "Create good-looking screenshots for your Dribbble shots.",
    url: "https://shooot.bourhaouta.com/",
    icon: "/images/projects/shooot.png",
    brand: "#ff4b5c",
    github: "bourhaouta/shooot",
  },
  {
    name: "This website",
    kind: "Next.js site",
    description:
      "My portfolio and blog, built end to end: Next.js 16, TypeScript and Tailwind v4, with a server-side contact form, RSS syndication to dev.to, generated share images, and a printable resume.",
    url: "https://github.com/bourhaouta/bourhaouta",
    icon: "/images/projects/bourhaouta.svg",
    brand: "#db4d53",
    github: "bourhaouta/bourhaouta",
    compact: true,
  },
  {
    name: "hotory",
    kind: "Utility CSS",
    description:
      "A small, utility-first CSS toolkit built on Stylus in 2018, before Tailwind took off: a lighter alternative to Bootstrap with readable classes like `is-flex:column` and `hover:has-color:primary`, and themeable variables. Made for internal projects and still in use today.",
    url: "https://www.npmjs.com/package/hotory",
    icon: "/images/projects/hotory.svg",
    brand: "#f97316",
    github: "bourhaouta/hotory",
    npm: "hotory",
    compact: true,
  },
];

// Stats change slowly; refresh once a day
const REVALIDATE = 86400;

async function getGitHubStars(repo: string): Promise<number | undefined> {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  // Optional: raises GitHub's rate limit for unauthenticated requests
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const res = await fetch(`https://api.github.com/repos/${repo}`, { headers, next: { revalidate: REVALIDATE } });
  if (!res.ok) throw new Error(`GitHub ${repo}: HTTP ${res.status}`);

  const data: { stargazers_count?: number } = await res.json();
  return data.stargazers_count;
}

type MarketplaceResponse = {
  results?: { extensions?: { statistics?: { statisticName: string; value: number }[] }[] }[];
};

async function getMarketplaceStats(id: string): Promise<Pick<ProjectStats, "installs" | "rating" | "ratingCount">> {
  const res = await fetch("https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;api-version=3.0-preview.1",
    },
    // filterType 7 = extension name; flags 256 = include statistics
    body: JSON.stringify({ filters: [{ criteria: [{ filterType: 7, value: id }] }], flags: 256 }),
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`Marketplace ${id}: HTTP ${res.status}`);

  const data: MarketplaceResponse = await res.json();
  const stats = data.results?.[0]?.extensions?.[0]?.statistics ?? [];
  const stat = (name: string) => stats.find((s) => s.statisticName === name)?.value;

  return { installs: stat("install"), rating: stat("averagerating"), ratingCount: stat("ratingcount") };
}

/**
 * All-time npm downloads. npm's API returns at most 18 months per request,
 * so this adds up one request per year since the package was created.
 */
async function getNpmDownloads(pkg: string): Promise<number> {
  const res = await fetch(`https://registry.npmjs.org/${pkg}`, { next: { revalidate: REVALIDATE } });
  if (!res.ok) throw new Error(`npm ${pkg}: HTTP ${res.status}`);

  const data: { time?: { created?: string } } = await res.json();
  const firstYear = new Date(data.time?.created ?? Date.now()).getUTCFullYear();
  const thisYear = new Date().getUTCFullYear();

  const years = Array.from({ length: thisYear - firstYear + 1 }, (_, i) => firstYear + i);
  const counts = await Promise.all(
    years.map(async (year) => {
      const res = await fetch(`https://api.npmjs.org/downloads/point/${year}-01-01:${year}-12-31/${pkg}`, {
        next: { revalidate: REVALIDATE },
      });
      if (!res.ok) throw new Error(`npm downloads ${pkg} ${year}: HTTP ${res.status}`);
      const point: { downloads?: number } = await res.json();
      return point.downloads ?? 0;
    }),
  );

  return counts.reduce((sum, count) => sum + count, 0);
}

// Never throws: a failing source just leaves its numbers out of the card
export async function getProjectStats(project: Project): Promise<ProjectStats> {
  const [stars, market, downloads] = await Promise.allSettled([
    project.github ? getGitHubStars(project.github) : Promise.resolve(undefined),
    project.marketplace ? getMarketplaceStats(project.marketplace) : Promise.resolve({}),
    project.npm ? getNpmDownloads(project.npm) : Promise.resolve(undefined),
  ]);

  for (const result of [stars, market, downloads]) {
    if (result.status === "rejected") console.error("Could not load project stats:", result.reason);
  }

  return {
    stars: stars.status === "fulfilled" ? stars.value : undefined,
    ...(market.status === "fulfilled" ? market.value : {}),
    downloads: downloads.status === "fulfilled" ? downloads.value : undefined,
  };
}
