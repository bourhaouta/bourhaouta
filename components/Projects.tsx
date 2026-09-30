import Image from "next/image";
import { getProjectStats, projects, type Project, type ProjectStats } from "@/lib/projects";
import Heading from "./Heading";
import Icon, { type IconName } from "./Icon";
import ShadowFrame from "./ShadowFrame";

const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
const exact = new Intl.NumberFormat("en");

function Stats({ stats }: { stats: ProjectStats }) {
  const items: { icon: IconName; value: string; label: string }[] = [];

  if (stats.stars !== undefined) {
    items.push({ icon: "star", value: exact.format(stats.stars), label: "stars on GitHub" });
  }
  if (stats.installs !== undefined) {
    items.push({ icon: "download", value: compact.format(stats.installs), label: "installs" });
  }
  if (stats.downloads !== undefined) {
    items.push({ icon: "download", value: compact.format(stats.downloads), label: "downloads on npm" });
  }
  if (stats.rating !== undefined && stats.ratingCount) {
    const reviews = `${stats.ratingCount} ${stats.ratingCount === 1 ? "review" : "reviews"}`;
    items.push({ icon: "star", value: stats.rating.toFixed(1), label: `rating (${reviews})` });
  }

  if (items.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 text-2xs text-muted">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1 whitespace-nowrap">
          <span className="text-brand">
            <Icon name={item.icon} size={12} />
          </span>
          <span className="font-medium text-ink">{item.value}</span>
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectIcon({ project }: { project: Project }) {
  return (
    <Image
      src={project.icon}
      alt=""
      width={40}
      height={40}
      // The image optimizer doesn't process SVGs; they're small and sharp as is
      unoptimized={project.icon.endsWith(".svg")}
      className="h-10 w-10 flex-none rounded-xl shadow-sm"
    />
  );
}

// Stretched link: the whole card is clickable
function ProjectLink({ project }: { project: Project }) {
  return (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
      {project.name}
    </a>
  );
}

function SourceLink({ project }: { project: Project }) {
  const source = project.github && `https://github.com/${project.github}`;
  // Nothing to add when the card itself already links to the code
  if (!source || project.url === source) return null;
  return (
    <a
      href={source}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-10 text-2xs text-muted underline-offset-2 hover:text-accent hover:underline"
    >
      Source on GitHub
    </a>
  );
}

function Kind({ project }: { project: Project }) {
  return <p className="text-2xs font-medium tracking-wide text-brand uppercase">{project.kind}</p>;
}

/** Tall card, one column */
function ProjectCard({ project, stats }: { project: Project; stats: ProjectStats }) {
  return (
    <div className="brand-card relative flex h-full flex-col rounded-sm border p-4">
      <div className="mb-3 flex items-center gap-3">
        <ProjectIcon project={project} />
        <Kind project={project} />
      </div>

      <h3 className="mb-2 text-lg">
        <ProjectLink project={project} />
      </h3>

      <p className="mb-4 text-muted">{project.description}</p>

      <div className="mt-auto flex flex-col items-start gap-3">
        <Stats stats={stats} />
        <SourceLink project={project} />
      </div>
    </div>
  );
}

/** Short card across both columns, for smaller projects; stacks like a normal card on phones */
function CompactProjectCard({ project, stats }: { project: Project; stats: ProjectStats }) {
  return (
    <div className="brand-card relative flex flex-col gap-3 rounded-sm border p-4 sm:flex-row sm:items-center sm:gap-4">
      <ProjectIcon project={project} />

      <div className="flex-1">
        <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
          <h3 className="text-lg leading-tight">
            <ProjectLink project={project} />
          </h3>
          <Kind project={project} />
        </div>
        {/* Full width; the numbers go on their own row below, aligned right */}
        <p className="text-muted">{project.description}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 sm:justify-end">
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
        <ul className="grid gap-6 pb-3 sm:grid-cols-2">
          {projects.map((project, index) => (
            <li key={project.name} className={`group ${project.compact ? "sm:col-span-2" : ""}`}>
              <ShadowFrame brand={project.brand} className="h-full">
                {project.compact ? (
                  <CompactProjectCard project={project} stats={stats[index]} />
                ) : (
                  <ProjectCard project={project} stats={stats[index]} />
                )}
              </ShadowFrame>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
