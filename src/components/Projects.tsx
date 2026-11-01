import { useState } from "react";
import { projects, type Project } from "../data/portfolio";
import { CloseButton, Icon, Modal, Reveal, Section } from "./ui";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
          Live site
          <Icon name="external" />
        </a>
      )}
      <a href={project.code} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
        <Icon name="github" />
        GitHub
      </a>
    </>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Section id="projects" kicker="Projects" title="Selected work">
      <div className="grid gap-4 md:grid-cols-6">
        {projects.map((project, i) => (
          <Reveal key={project.name} className={i < 2 ? "md:col-span-3" : "md:col-span-2"}>
            <article className="card card-interactive flex h-full flex-col p-6">
              <p className="font-mono text-xs text-sky">
                {String(i + 1).padStart(2, "0")} / {project.kind}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold leading-snug">{project.name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.summary}</p>
              <div className="mt-4 mb-6 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 5).map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
                {project.stack.length > 5 && <span className="chip">+{project.stack.length - 5}</span>}
              </div>
              <div className="mt-auto flex flex-wrap gap-2">
                <button type="button" onClick={() => setSelected(project)} className="btn btn-ghost btn-sm">
                  Details
                </button>
                <ProjectLinks project={project} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Modal open={selected !== null} onClose={() => setSelected(null)} label={selected?.name ?? "Project"} className="w-[min(40rem,calc(100vw-2rem))]">
        {selected && (
          <div className="max-h-[85dvh] overflow-y-auto p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-sky">{selected.kind}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-snug">{selected.name}</h3>
              </div>
              <CloseButton onClick={() => setSelected(null)} />
            </div>
            <p className="mt-4 leading-relaxed text-muted">{selected.summary}</p>
            <ul className="mt-6 space-y-3">
              {selected.points.map((point) => (
                <li key={point} className="flex gap-3 text-[15px] leading-relaxed">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {selected.stack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-6">
              <ProjectLinks project={selected} />
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
}
