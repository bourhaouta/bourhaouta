import Image from "next/image";
import { getProjectStats, projects, type ProjectStats } from "@/lib/projects";
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

export default async function Projects() {
  const stats = await Promise.all(projects.map(getProjectStats));

  return (
    <section id="projects" className="scroll-mt-8">
      <div className="site-container">
        <Heading caption="Projects">Things I&apos;ve built</Heading>

        {/* Right/bottom padding leaves room for the offset shadows */}
        <ul className="grid gap-6 pr-3 pb-3 sm:grid-cols-2">
          {projects.map((project, index) => (
            <li key={project.name} className="group">
              <ShadowFrame brand={project.brand} className="h-full">
                <div className="brand-card relative flex h-full flex-col rounded-sm border p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <Image
                      src={project.icon}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-xl shadow-sm"
                    />
                    <p className="text-2xs font-medium tracking-wide uppercase text-brand">{project.kind}</p>
                  </div>

                  <h3 className="mb-2 text-lg">
                    {/* Stretched link: the whole card is clickable */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="after:absolute after:inset-0"
                    >
                      {project.name}
                    </a>
                  </h3>

                  <p className="mb-4 text-muted">{project.description}</p>

                  <div className="mt-auto flex flex-col gap-3">
                    <Stats stats={stats[index]} />

                    {project.github && (
                      <a
                        href={`https://github.com/${project.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 self-start text-2xs text-muted underline-offset-2 hover:text-accent hover:underline"
                      >
                        Source on GitHub
                      </a>
                    )}
                  </div>
                </div>
              </ShadowFrame>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
