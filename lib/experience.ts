export type Job = {
  company: string;
  url?: string;
  role: string;
  location: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", or undefined for the current job */
  end?: string;
  summary: string;
  highlights: string[];
  stack: string[];
  /** Featured jobs get a full card with logo, brand color and highlights */
  featured?: {
    logo: string;
    /** Shadow, bullets and date color */
    brand: string;
    /** The company's own card colors, used in both light and dark mode */
    theme?: {
      background: string;
      border: string;
      text: string;
      heading: string;
      muted: string;
      chip: string;
    };
  };
};

// From the resume. Newest first.
export const jobs: Job[] = [
  {
    company: "Metafy",
    url: "https://metafy.gg",
    role: "Frontend Engineer",
    location: "Remote",
    start: "2021-02",
    summary: "The gaming community where players learn from the best creators and coaches.",
    highlights: [
      "Owned the checkout for 5+ years: payments, discounts, credits, subscriptions, upsells, and a major redesign.",
      "Helped build Memberships 2.0: tiered subscriptions with benefits, discounts, Discord roles, and upgrade/downgrade flows.",
      "Drove several generations of coaching: scheduling, availability, calendars, timezones, rescheduling, and member-only sessions.",
      "Built video playback for coaching reviews and lessons, through HLS streaming, iOS quirks, and fullscreen behavior.",
      "Worked on frontend foundations used across the product: navigation, Storybook/Histoire, theming, shared components, and icons.",
    ],
    stack: ["TypeScript", "Svelte/SvelteKit", "React", "GraphQL", "Storybook"],
    // Metafy's dark UI (metafy.gg) with its yellow accent
    featured: {
      logo: "/images/companies/metafy.png",
      brand: "#fcd23e",
      theme: {
        background: "#0e0e11",
        border: "#282834",
        text: "#c0c0d1",
        heading: "#ffffff",
        muted: "#9494a8",
        chip: "#1e1e27",
      },
    },
  },
  {
    company: "SQLI",
    role: "Frontend Engineer",
    location: "Rabat · Hybrid",
    start: "2019-12",
    end: "2021-01",
    summary:
      "Built the Guest Checkout flow and its REST API integrations while a Hybris/JSP platform moved to React, and fixed bugs in legacy AngularJS and jQuery code.",
    highlights: [],
    stack: ["React", "REST APIs", "AngularJS"],
  },
  {
    company: "Avito Adevinta",
    url: "https://www.avito.ma",
    role: "Frontend Engineer",
    location: "Casablanca",
    start: "2018-10",
    end: "2019-12",
    summary:
      "Built campaign and product experiences (Carrières, Boutiques, Guide ImmoNeuf, Digital Talks) and contributed to Avito's internal design system.",
    highlights: [],
    stack: ["Next.js", "Nuxt.js", "React", "Redux", "Styled Components"],
  },
  {
    company: "Next Media",
    role: "Frontend Engineer",
    location: "Rabat",
    start: "2017-02",
    end: "2018-09",
    summary:
      "Worked on early versions of YouCan.shop, and built Telquel.ma's mobile SPA, ad integrations, and animated premium content.",
    highlights: [],
    stack: ["Vue.js", "Laravel", "Sass"],
  },
];

const monthFormat = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

/** "Feb 2021 – Present" */
export function formatPeriod(job: Job): string {
  const format = (value: string) => monthFormat.format(new Date(`${value}-01T00:00:00Z`));
  return `${format(job.start)} – ${job.end ? format(job.end) : "Present"}`;
}

/** Whole years since the first job, e.g. 9 */
export function yearsOfExperience(): number {
  const first = jobs.map((job) => job.start).sort()[0];
  const start = new Date(`${first}-01T00:00:00Z`);
  return Math.floor((Date.now() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
}
