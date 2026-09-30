import type { Metadata } from "next";
import type { ReactNode } from "react";
import PrintButton from "@/components/PrintButton";
import Shell from "@/components/Shell";
import { formatPeriod, jobs } from "@/lib/experience";
import { alternates, baseOpenGraph, baseTwitter } from "@/lib/metadata";
import { resume } from "@/lib/resume";
import { site } from "@/lib/site";

const description = `Resume of ${site.name}, ${site.title}.`;

export const metadata: Metadata = {
  // Also the default file name when saving as PDF
  title: { absolute: `${site.name} - Resume` },
  description,
  alternates: alternates("/resume/"),
  openGraph: { ...baseOpenGraph, type: "profile", title: `${site.name} - Resume`, description, url: "/resume/" },
  twitter: { ...baseTwitter, title: `${site.name} - Resume`, description },
};

// Printed as plain text; the URL itself is the useful part on paper
const links = [
  { label: "Website", url: site.url },
  { label: "GitHub", url: site.socials.github },
  { label: "LinkedIn", url: site.socials.linkedin },
  { label: "CSS-Tricks", url: site.socials.cssTricks },
];

const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8 print:mt-5">
      <h2 className="mb-3 border-b pb-1 text-2xs font-medium tracking-widest text-accent uppercase print:mb-2 print:text-black">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function ResumePage() {
  return (
    <Shell back={{ title: "Homepage", path: "/" }}>
      <article className="site-container text-sm leading-relaxed print:max-w-none print:px-0 print:text-[10.5pt] print:leading-snug print:text-black">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-medium print:text-[22pt]">{site.name}</h1>
            <p className="text-lg font-light text-muted print:text-black">{site.title}</p>
          </div>
          <div className="print:hidden">
            <PrintButton />
          </div>
        </header>

        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted print:text-black">
          <li>
            <a href={`mailto:${site.email}`} className="hover:text-accent-hover hover:underline">
              {site.email}
            </a>
          </li>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.url} className="hover:text-accent-hover hover:underline" aria-label={link.label}>
                {displayUrl(link.url)}
              </a>
            </li>
          ))}
        </ul>

        <Section title="Profile">
          <p>{resume.summary}</p>
        </Section>

        <Section title="Experience">
          <ol className="space-y-6 print:space-y-4">
            {jobs.map((job) => (
              <li key={job.company} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-base font-medium">
                    {job.company} <span className="font-normal text-muted print:text-black">· {job.role}</span>
                  </h3>
                  <p className="text-xs text-muted print:text-black">
                    {formatPeriod(job)} · {job.location}
                  </p>
                </div>
                <ul className="mt-1.5 list-disc space-y-1 pl-5 marker:text-accent print:marker:text-black">
                  {[...job.highlights, ...(job.cvExtra ?? [])].map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <p className="mt-1.5 text-xs text-muted print:text-black">Stack: {job.stack.join(", ")}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Skills">
          <dl className="grid gap-x-4 gap-y-1.5 sm:grid-cols-[10rem_1fr] print:grid-cols-[9rem_1fr]">
            {resume.skills.map((skill) => (
              <div key={skill.group} className="contents">
                <dt className="font-medium">{skill.group}</dt>
                <dd className="mb-2 sm:mb-0 print:mb-0">{skill.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <div className="grid gap-x-8 sm:grid-cols-2 print:grid-cols-2">
          <Section title="Education">
            <p>
              {resume.education.degree}
              <br />
              <span className="text-muted print:text-black">
                {resume.education.school} · {resume.education.year}
              </span>
            </p>
          </Section>

          <Section title="Languages">
            <p>{resume.languages.join(", ")}</p>
          </Section>
        </div>
      </article>
    </Shell>
  );
}
