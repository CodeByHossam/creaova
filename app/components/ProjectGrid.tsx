import { useState } from "react";
import { Link } from "react-router";
import type { ProjectType } from "~/data/projects";
import { projects } from "~/data/projects";
import { Eyebrow } from "~/components/Eyebrow";

export function ProjectGrid({ featured = false }: { featured?: boolean }) {
  const [filter, setFilter] = useState<"All" | ProjectType>("All");
  const visible = projects.filter((project) => filter === "All" || project.type === filter).slice(0, featured ? 3 : undefined);
  return <div>
    {!featured && <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
      {(["All", "Web project", "App project"] as const).map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={`min-h-11 rounded-full border px-5 text-sm transition-colors ${filter === item ? "border-ink bg-ink text-on-dark" : "border-line text-muted hover:border-ink hover:text-ink"}`}>{item}</button>)}
    </div>}
    {visible.length ? <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">{visible.map((project) => <Link to={`/portfolio#${project.slug}`} key={project.slug} id={project.slug} className="group block">
      <div className="flex aspect-[4/3] flex-col justify-between rounded-panel p-6 transition-transform duration-300 group-hover:-translate-y-1" style={{ backgroundColor: project.accent }}><div className="flex items-start justify-between"><span className="rounded-full bg-white/70 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink">Concept</span><span aria-hidden="true" className="text-2xl">↗</span></div><div className="font-display text-4xl text-ink/80">{project.type === "Web project" ? "□" : "◉"}</div></div>
      <div className="mt-4 flex items-start justify-between gap-4"><div><h3 className="font-display text-h3 group-hover:underline">{project.title}</h3><p className="mt-1 text-sm text-muted">{project.category}</p></div><Eyebrow>{project.type}</Eyebrow></div><p className="mt-3 max-w-sm text-sm leading-6 text-muted">{project.description}</p>
    </Link>)}</div> : <p className="border border-dashed border-line p-8 text-muted">No projects match this filter yet.</p>}
  </div>;
}
