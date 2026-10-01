import Image from "next/image";
import {
  getProjectStats,
  projects,
  type Project,
  type ProjectStats,
} from "@/lib/projects";
import Heading from "./Heading";
import Icon, { type IconName } from "./Icon";
import ShadowFrame from "./ShadowFrame";

const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});
const exact = new Intl.NumberFormat("en");

type StatItem = {
  icon: IconName;
  value: string;
  label: string;
  shortLabel: string;
};

function statItems(stats: ProjectStats): StatItem[] {
  const items: StatItem[] = [];

  if (stats.stars !== undefined) {
    items.push({
      icon: "star",
      value: exact.format(stats.stars),
      label: "stars on GitHub",
      shortLabel: "stars",
    });
  }
  if (stats.installs !== undefined) {
    items.push({
      icon: "download",
      value: compact.format(stats.installs),
      label: "installs",
      shortLabel: "installs",
    });
  }
  if (stats.downloads !== undefined) {
    items.push({
      icon: "download",
      value: compact.format(stats.downloads),
      label: "downloads on npm",
      shortLabel: "downloads",
    });
  }
  if (stats.rating !== undefined && stats.ratingCount) {
    const reviews = `${stats.ratingCount} ${stats.ratingCount === 1 ? "review" : "reviews"}`;
    items.push({
      icon: "star",
      value: stats.rating.toFixed(1),
      label: `rating (${reviews})`,
      shortLabel: "rating",
    });
  }

  return items;
}

/** `short` labels fit next to a title; the full label stays as the hover title */
function Stats({
  stats,
  short = false,
}: {
  stats: ProjectStats;
  short?: boolean;
}) {
  const items = statItems(stats);
  if (items.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 text-2xs text-muted">
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-center gap-1 whitespace-nowrap"
          title={short ? item.label : undefined}
        >
          <span className="text-brand">
            <Icon name={item.icon} size={12} />
          </span>
          <span className="font-medium text-ink">{item.value}</span>
          <span>{short ? item.shortLabel : item.label}</span>
        </li>
      ))}
    </ul>
  );
}

/** Large numbers, one per row, for the featured card */
function BigStats({ stats }: { stats: ProjectStats }) {
  const items = statItems(stats);
  if (items.length === 0) return null;

  return (
    <ul className="grid grid-cols-3 gap-4 sm:grid-cols-1 sm:gap-3">
      {items.map((item) => (
        <li key={item.label}>
          <p className="flex items-center gap-1.5 text-2xl leading-tight font-medium text-ink sm:text-3xl">
            <span className="text-brand">
              <Icon name={item.icon} size={16} />
            </span>
            {item.value}
          </p>
          <p className="text-2xs text-muted">{item.label}</p>
        </li>
      ))}
    </ul>
  );
}

/** Description text, with `backtick` parts shown as code */
function Description({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, index) =>
        index % 2 === 1 ? (
          <code
            key={index}
            className="rounded-sm bg-surface px-1 font-mono text-[0.9em] whitespace-nowrap"
          >
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}

function ProjectIcon({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <Image
      src={project.icon}
      alt=""
      width={large ? 56 : 40}
      height={large ? 56 : 40}
      // The image optimizer doesn't process SVGs; they're small and sharp as is
      unoptimized={project.icon.endsWith(".svg")}
      className={`flex-none rounded-xl shadow-sm ${large ? "h-14 w-14" : "h-10 w-10"}`}
    />
  );
}

// Stretched link: the whole card is clickable
function ProjectLink({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="after:absolute after:inset-0"
      data-event="project_click"
      data-event-project={project.name}
    >
      {project.name}
    </a>
  );
}

function SourceLink({
  project,
  short = false,
}: {
  project: Project;
  short?: boolean;
}) {
  const source = project.github && `https://github.com/${project.github}`;
  // Nothing to add when the card itself already links to the code
  if (!source || project.url === source) return null;
  return (
    <a
      href={source}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-10 text-2xs text-muted underline-offset-2 hover:text-accent hover:underline"
      data-event="project_source_click"
      data-event-project={project.name}
    >
      {short ? "GitHub" : "Source on GitHub"}
    </a>
  );
}

function Kind({ project }: { project: Project }) {
  return (
    <p className="text-2xs font-medium tracking-wide text-brand uppercase">
      {project.kind}
    </p>
  );
}

// Tailwind Shades' own output for the brand color, 50 to 950
const PALETTE = [
  "#f2fcfb",
  "#d3f8f4",
  "#a8f0e9",
  "#74e4db",
  "#46ccc4",
  "#38b2ac",
  "#2c8f8c",
  "#277271",
  "#225b5b",
  "#214b4c",
  "#102d2f",
];

/** Big highlight card across both columns: the story on the left, the numbers on the right */
function FeaturedProjectCard({
  project,
  stats,
}: {
  project: Project;
  stats: ProjectStats;
}) {
  return (
    <div className="brand-card relative flex flex-col rounded-sm border">
      <div className="grid gap-6 p-5 sm:grid-cols-[1fr_auto] sm:gap-10 sm:p-6">
        <div className="flex flex-col">
          <div className="mb-4 flex items-center gap-3">
            <ProjectIcon project={project} large />
            <div>
              <Kind project={project} />
              <h3 className="text-2xl leading-tight">
                <ProjectLink project={project} />
              </h3>
            </div>
          </div>

          <p className="mb-4 text-base text-muted">
            <Description text={project.description} />
          </p>

          <div className="mt-auto">
            <SourceLink project={project} />
          </div>
        </div>

        <div
          className="border-t pt-5 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8"
          style={{
            borderColor: "color-mix(in srgb, var(--brand) 25%, var(--line))",
          }}
        >
          <BigStats stats={stats} />
        </div>
      </div>

      <ul className="flex h-2 overflow-hidden rounded-b-sm" aria-hidden>
        {PALETTE.map((color) => (
          <li
            key={color}
            className="flex-1"
            style={{ backgroundColor: color }}
          />
        ))}
      </ul>
    </div>
  );
}

/** Short card for smaller projects; stacks on phones */
function CompactProjectCard({
  project,
  stats,
}: {
  project: Project;
  stats: ProjectStats;
}) {
  return (
    <div className="brand-card relative flex flex-col gap-3 rounded-sm border p-4 sm:flex-row sm:items-start sm:gap-4">
      <ProjectIcon project={project} />

      <div className="flex-1">
        <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <h3 className="text-lg leading-tight">
              <ProjectLink project={project} />
            </h3>
            <Kind project={project} />
          </div>

          {/* From sm up: short numbers on the title's line, on the right */}
          <div className="hidden items-center gap-x-3 sm:flex">
            <Stats stats={stats} short />
            <SourceLink project={project} short />
          </div>
        </div>

        <p className="text-muted">
          <Description text={project.description} />
        </p>

        {/* Phones: full numbers under the description */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 sm:hidden">
          <Stats stats={stats} />
          <SourceLink project={project} />
        </div>
      </div>
    </div>
  );
}

export default async function Projects() {
  const stats = await Promise.all(projects.map(getProjectStats));

  return (
    <section id="projects" className="scroll-mt-8">
      <div className="site-container">
        <Heading caption="Projects">Things I&apos;ve built</Heading>

        {/* Cards keep the full width: the offset shadows (max 12px) fit in the page's side margin */}
        <ul className="grid gap-6 pb-3">
          {projects.map((project, index) => (
            <li key={project.name} className="group">
              <ShadowFrame brand={project.brand} className="h-full">
                {project.featured ? (
                  <FeaturedProjectCard project={project} stats={stats[index]} />
                ) : (
                  <CompactProjectCard project={project} stats={stats[index]} />
                )}
              </ShadowFrame>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
