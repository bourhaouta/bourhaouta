import Image from "next/image";
import { formatPeriod, jobs, yearsOfExperience, type Job } from "@/lib/experience";
import Heading from "./Heading";
import ShadowFrame from "./ShadowFrame";

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
      {items.map((item) => (
        <li key={item} className="rounded-full bg-surface px-2 py-0.5 text-2xs">
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

function FeaturedJob({ job }: { job: Job & { featured: NonNullable<Job["featured"]> } }) {
  return (
    <ShadowFrame brand={job.featured.brand}>
      <article className="brand-card relative rounded-sm border p-4 sm:p-5">
        <header className="mb-3 flex flex-wrap items-start gap-x-3 gap-y-1">
          <Image src={job.featured.logo} alt="" width={40} height={40} className="h-10 w-10 flex-none rounded-xl shadow-sm" />
          <div className="flex-1">
            <h3 className="text-lg leading-tight">
              <Company job={job} />
            </h3>
            <p className="text-muted">
              {job.role} <span aria-hidden>&middot;</span> {job.location}
            </p>
          </div>
          {/* Under the role on phones (aligned with the text), top right from sm up */}
          <p className="basis-full pl-13 text-2xs font-medium tracking-wide whitespace-nowrap text-brand uppercase sm:basis-auto sm:pl-0">
            {formatPeriod(job)}
          </p>
        </header>

        <p className="mb-3 text-muted">{job.summary}</p>

        <ul className="mb-4 space-y-1.5">
          {job.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span aria-hidden className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-(--brand)" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <Stack items={job.stack} />
      </article>
    </ShadowFrame>
  );
}

function PastJob({ job }: { job: Job }) {
  return (
    <li className="relative pl-5">
      {/* Timeline dot on the vertical line */}
      <span aria-hidden className="absolute top-0.5 -left-[4.5px] h-2 w-2 rounded-full border-2 border-page bg-secondary-300" />
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
  const featured = jobs.filter((job): job is Job & { featured: NonNullable<Job["featured"]> } => !!job.featured);
  const past = jobs.filter((job) => !job.featured);

  return (
    <section>
      <div className="site-container">
        <Heading caption="Experience">{yearsOfExperience()}+ years building product-focused web apps</Heading>

        {/* Right/bottom padding leaves room for the offset shadow */}
        <div className="space-y-6 pr-3 pb-3">
          {featured.map((job) => (
            <FeaturedJob key={job.company} job={job} />
          ))}
        </div>

        <ol className="mt-8 ml-1 space-y-6 border-l border-line">
          {past.map((job) => (
            <PastJob key={job.company} job={job} />
          ))}
        </ol>
      </div>
    </section>
  );
}
