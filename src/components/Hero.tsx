import { useEffect, useState } from "react";
import { certificates, experience, profile, projects } from "../data/portfolio";
import { Icon } from "./ui";

const STEPS = [
  ["route", "classify intent and scope"],
  ["rewrite", "sharpen the query"],
  ["retrieve", "embed, search, rerank"],
  ["call_tool", "pick the right tool"],
  ["guardrail", "verify before answering"],
  ["respond", "stream a cited answer"],
];

function AgentTrace() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card p-5 font-mono text-[13px] sm:p-6" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <span className="text-muted">agent_graph.run()</span>
        <span className="flex items-center gap-2 text-sky">
          <span className="h-2 w-2 animate-pulse rounded-full bg-sky" />
          running
        </span>
      </div>
      <ol className="relative mt-4 space-y-1">
        {STEPS.map(([name, note], i) => (
          <li
            key={name}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-300 ${i === step ? "bg-violet/15" : ""}`}
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-300 ${
                i === step ? "bg-violet shadow-[0_0_12px_var(--violet)]" : i < step ? "bg-sky" : "bg-line"
              }`}
            />
            <span className={`font-medium ${i === step ? "text-ink" : "text-muted"}`}>{name}</span>
            <span className="ml-auto hidden truncate text-xs text-muted sm:block">{note}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Hero({ onViewResume }: { onViewResume: () => void }) {
  const facts = [
    [experience.company.split(" ")[0], "Current AI internship"],
    [String(projects.length), "Featured AI projects"],
    [String(certificates.length), "Certificates"],
    [profile.education.cgpa.split(" ")[0], "CGPA out of 10"],
  ];

  return (
    <section id="top" className="grid min-h-[100svh] items-center gap-12 pb-12 pt-28 lg:grid-cols-[1.25fr_1fr] lg:pt-20">
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-sky">{profile.role}</p>
        <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl xl:text-7xl">
          Pandurang
          <br />
          <span className="gradient-text">Chavan</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          I build AI agents that retrieve, reason, and verify. Currently developing enterprise Agentic RAG at Visteon, turning documents into
          knowledge people can trust.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="btn btn-primary">
            See my work
            <Icon name="arrow" />
          </a>
          <button type="button" onClick={onViewResume} className="btn btn-ghost">
            <Icon name="eye" />
            View resume
          </button>
        </div>
        <div className="mt-8 max-w-xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Open to roles</p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {profile.targetRoles.map((role) => (
              <li key={role} className="chip bg-surface !text-ink">
                {role}
              </li>
            ))}
          </ul>
        </div>
        <dl className="mt-10 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4">
          {facts.map(([value, label]) => (
            <div key={label}>
              <dd className="font-display text-2xl font-semibold">{value}</dd>
              <dt className="mt-1 text-xs leading-snug text-muted">{label}</dt>
            </div>
          ))}
        </dl>
      </div>
      <AgentTrace />
    </section>
  );
}
