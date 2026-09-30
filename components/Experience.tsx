import type { CSSProperties } from "react";
import Image from "next/image";
import { formatPeriod, jobs, yearsOfExperience, type Job } from "@/lib/experience";
import { site } from "@/lib/site";
import Button from "./Button";
import Heading from "./Heading";
import ShadowFrame from "./ShadowFrame";

function Stack({ items, chipClass = "bg-surface" }: { items: string[]; chipClass?: string }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
      {items.map((item) => (
        <li key={item} className={`rounded-full px-2 py-0.5 text-2xs ${chipClass}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Company({ job }: { job: Job }) {
  if (!job.url) return <>{job.company}</>;
  return (
    <a href={job.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent-hover hover:underline">
      {job.company}
    </a>
  );
}

type Featured = NonNullable<Job["featured"]>;

/**
 * Classes for a featured card: the company's own colors when it has a theme
 * (e.g. Metafy's dark UI, the same in light and dark mode), otherwise the site's.
 */
function cardClasses(theme: Featured["theme"]) {
  if (!theme) {
    return {
      card: "brand-card",
      heading: "",
      text: "",
      muted: "text-muted",
      accent: "text-brand",
      chip: "bg-surface",
      logo: "shadow-sm",
    };
  }
  return {
    card: "bg-(--card-bg) border-(--card-border) text-(--card-text)",
    heading: "text-(--card-heading)",
    text: "text-(--card-text)",
    muted: "text-(--card-muted)",
    accent: "text-(--brand)",
    chip: "bg-(--card-chip) text-(--card-text)",
    logo: "ring-1 ring-(--card-border)",
  };
}

function FeaturedJob({ job }: { job: Job & { featured: Featured } }) {
  const { theme } = job.featured;
  const classes = cardClasses(theme);
  const themeVars = theme && {
    "--card-bg": theme.background,
    "--card-border": theme.border,
    "--card-text": theme.text,
    "--card-heading": theme.heading,
    "--card-muted": theme.muted,
    "--card-chip": theme.chip,
  };

  return (
    <ShadowFrame brand={job.featured.brand} brandRestDark={theme?.border}>
      <article
        className={`relative rounded-sm border p-4 sm:p-5 ${classes.card}`}
        style={themeVars as CSSProperties | undefined}
      >
        <header className="mb-3 flex flex-wrap items-start gap-x-3 gap-y-1">
          <Image
            src={job.featured.logo}
            alt=""
            width={40}
            height={40}
            className={`h-10 w-10 flex-none rounded-xl ${classes.logo}`}
          />
          <div className="flex-1">
            <h3 className={`text-lg leading-tight ${classes.heading}`}>
              <Company job={job} />
            </h3>
            <p className={classes.muted}>
              {job.role} <span aria-hidden>&middot;</span> {job.location}
            </p>
          </div>
          {/* Under the role on phones (aligned with the text), top right from sm up */}
          <p
            className={`basis-full pl-13 text-2xs font-medium tracking-wide whitespace-nowrap uppercase sm:basis-auto sm:pl-0 ${classes.accent}`}
          >
            {formatPeriod(job)}
          </p>
        </header>

        <p className={`mb-3 ${classes.muted}`}>{job.summary}</p>

        <ul className={`mb-4 space-y-1.5 ${classes.text}`}>
          {job.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span aria-hidden className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-(--brand)" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <Stack items={job.stack} chipClass={classes.chip} />
      </article>
    </ShadowFrame>
  );
}

/** What's next, shown above the latest job while site.status is set */
function Now({ status }: { status: string }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-sm border border-dashed p-4 sm:px-5">
      <div className="flex-1 basis-64">
        <p className="mb-0.5 flex items-center gap-2 text-2xs font-medium tracking-wide text-green-600 uppercase dark:text-green-400">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Now
        </p>
        <h3 className="text-base leading-snug">{status}</h3>
        <p className="text-muted">{site.availability}</p>
      </div>
      <Button href="/#contact">Get in touch</Button>
    </div>
  );
}

function PastJob({ job }: { job: Job }) {
  return (
    <li className="group relative pl-5">
      {/* Soft block on hover, like the article cards */}
      <div
        aria-hidden
        className="absolute inset-0 -z-1 -my-3 ml-2 -mr-3 rounded-sm bg-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {/* Timeline dot on the vertical line; turns red while its job is hovered */}
      <span
        aria-hidden
        className="absolute top-0.5 -left-[4.5px] h-2 w-2 rounded-full border-2 border-page bg-secondary-300 transition-colors duration-300 group-hover:bg-accent"
      />
      <p className="mb-0.5 text-2xs tracking-wide text-muted uppercase">{formatPeriod(job)}</p>
      <h3 className="text-base leading-snug">
        <Company job={job} /> <span className="text-muted">&middot; {job.role}</span>
      </h3>
      <p className="mb-2 text-2xs text-muted">{job.location}</p>
      <p className="mb-2 text-muted">{job.summary}</p>
      <Stack items={job.stack} />
    </li>
  );
}

export default function Experience() {
  const featured = jobs.filter((job): job is Job & { featured: Featured } => !!job.featured);
  const past = jobs.filter((job) => !job.featured);

  return (
    <section id="experience" className="scroll-mt-8">
      <div className="site-container">
        <Heading caption="Experience">{yearsOfExperience} years building product-focused web apps</Heading>

        {site.status && <Now status={site.status} />}

        {/* Cards keep the full width: the offset shadow (max 12px) fits in the page's side margin */}
        <div className="space-y-6 pb-3">
          {featured.map((job) => (
            <FeaturedJob key={job.company} job={job} />
          ))}
        </div>

        <ol className="mt-8 ml-1 space-y-6 border-l border-line">
          {past.map((job) => (
            <PastJob key={job.company} job={job} />
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <Button to="/resume">View full resume</Button>
        </div>
      </div>
    </section>
  );
}
