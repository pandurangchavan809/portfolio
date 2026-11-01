import photo from "../assets/profile.jpg";
import { achievements, experience, profile, skills } from "../data/portfolio";
import { Reveal, Section } from "./ui";

export function About() {
  const { education } = profile;
  return (
    <Section id="about" kicker="About" title="Applied AI, built for production">
      <Reveal className="grid gap-6 md:grid-cols-[280px_1fr]">
        <img
          src={photo}
          alt="Portrait of Pandurang Chavan"
          width={702}
          height={703}
          loading="lazy"
          className="aspect-square w-full max-w-[280px] rounded-[1.25rem] border border-line object-cover"
        />
        <div className="card flex flex-col justify-between gap-8 p-6 sm:p-8">
          <p className="text-lg leading-relaxed">{profile.summary}</p>
          <dl className="grid gap-6 border-t border-line pt-6 sm:grid-cols-[2fr_1fr_1fr]">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">Education</dt>
              <dd className="mt-1.5 text-sm font-medium">
                {education.degree}
                <span className="block font-normal text-muted">{education.school}</span>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">Period</dt>
              <dd className="mt-1.5 text-sm font-medium">{education.period}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">Location</dt>
              <dd className="mt-1.5 text-sm font-medium">{profile.location}</dd>
            </div>
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}

export function Experience() {
  return (
    <Section id="experience" kicker="Experience" title="Where I'm building now">
      <Reveal className="card p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-2">
          <div>
            <h3 className="font-display text-xl font-semibold">
              {experience.title} <span className="text-muted">at</span> <span className="gradient-text">{experience.company}</span>
            </h3>
            <p className="mt-2 max-w-2xl text-muted">{experience.intro}</p>
          </div>
          <p className="font-mono text-xs leading-6 text-muted">
            {experience.period}
            <br />
            {experience.location}
          </p>
        </div>
        <ul className="mt-6 grid gap-x-10 gap-y-4 border-t border-line pt-6 md:grid-cols-2">
          {experience.points.map((point) => (
            <li key={point} className="flex gap-3 text-[15px] leading-relaxed">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
              {point}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" kicker="Skills" title="The stack behind the agents">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map(({ group, items }) => (
          <Reveal key={group} className="card p-5">
            <h3 className="font-display font-semibold">{group}</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {items.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Achievements() {
  return (
    <Section id="leadership" kicker="Leadership" title="Leadership & achievements">
      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map(({ title, detail }) => (
          <Reveal key={title} className="card p-6">
            <h3 className="font-display text-lg font-semibold">{title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{detail}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
