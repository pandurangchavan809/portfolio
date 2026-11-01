import { useState } from "react";
import { certificates, type CertCategory } from "../data/portfolio";
import { CloseButton, Icon, Modal, Reveal, Section } from "./ui";

const FILTERS: ("All" | CertCategory)[] = ["All", "AWS", "DeepLearning.AI", "Cisco"];

export function Certificates() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = certificates.filter((c) => filter === "All" || c.category === filter);
  const current = openIndex === null ? null : visible[openIndex];

  const move = (delta: number) => setOpenIndex((i) => (i === null ? i : (i + delta + visible.length) % visible.length));

  return (
    <Section id="certificates" kicker="Certificates" title="Credentials & continued learning">
      <Reveal className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setFilter(name)}
            aria-pressed={filter === name}
            className={`btn btn-sm ${filter === name ? "btn-primary" : "btn-ghost"}`}
          >
            {name}
          </button>
        ))}
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((cert, i) => (
          <button
            key={cert.title}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`View certificate: ${cert.title}`}
            className="card card-interactive group flex flex-col overflow-hidden text-left"
          >
            <span className="block aspect-[4/3] w-full overflow-hidden border-b border-line bg-white p-3">
              <img
                src={cert.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </span>
            <span className="flex flex-1 flex-col p-5">
              <span className="font-mono text-xs text-sky">{cert.category}</span>
              <span className="mt-2 font-display font-semibold leading-snug">{cert.title}</span>
              <span className="mt-1.5 text-sm text-muted">{cert.issuer}</span>
              <span className="mt-4 flex items-center justify-between pt-1 text-xs text-muted">
                {cert.date ?? "Digital badge"}
                <span className="flex items-center gap-1 font-medium text-violet">
                  View
                  <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>

      <Modal open={current !== null} onClose={() => setOpenIndex(null)} label={current?.title ?? "Certificate"} className="w-[min(58rem,calc(100vw-2rem))]">
        {current && (
          <div
            className="flex max-h-[92dvh] flex-col"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") move(1);
              if (e.key === "ArrowLeft") move(-1);
            }}
          >
            <div className="flex items-start justify-between gap-4 p-5 sm:px-6">
              <div>
                <h3 className="font-display text-xl font-semibold leading-snug">{current.title}</h3>
                <p className="mt-1 text-sm text-muted">
                  {current.issuer}
                  {current.date && ` · Issued ${current.date}`}
                </p>
              </div>
              <CloseButton onClick={() => setOpenIndex(null)} />
            </div>
            <div className="min-h-0 flex-1 overflow-auto border-y border-line bg-white p-3 sm:p-5">
              <img src={current.image} alt={`${current.title} certificate`} className="mx-auto max-h-[64dvh] w-auto max-w-full object-contain" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:px-6">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => move(-1)} aria-label="Previous certificate" className="btn btn-ghost h-9 w-9 !p-0">
                  <Icon name="back" />
                </button>
                <button type="button" onClick={() => move(1)} aria-label="Next certificate" className="btn btn-ghost h-9 w-9 !p-0">
                  <Icon name="arrow" />
                </button>
                <span className="ml-1 font-mono text-xs text-muted">
                  {(openIndex ?? 0) + 1} / {visible.length}
                </span>
              </div>
              {current.verify && (
                <a href={current.verify} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                  <Icon name="shield" />
                  Verify credential
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
}
