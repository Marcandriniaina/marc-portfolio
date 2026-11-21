"use client";

import { useApp } from "./Providers";
import { education, experiences, skills, t } from "@/lib/content";
import { Reveal, SectionHeading } from "./Reveal";

export function Experience() {
  const { tr } = useApp();

  return (
    <section id="experience" className="border-t border-line bg-bg-soft py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker={tr(t.experience.kicker)} title={tr(t.experience.title)} />

        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h3 className="mb-6 font-mono text-xs tracking-[0.2em] text-faint uppercase">{tr(t.experience.work)}</h3>
            <ol className="relative space-y-8 border-l border-line pl-7">
              {experiences.map((e, i) => (
                <Reveal as="li" key={e.period.fr} delay={i * 80} className="relative">
                  <span
                    className={`absolute top-1.5 -left-[33px] h-3 w-3 rounded-full border-2 ${
                      i === 0 ? "border-accent bg-accent" : "border-line bg-bg-soft"
                    }`}
                    aria-hidden
                  />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                    <span className="text-accent">{tr(e.period)}</span>
                    <span className="rounded-full border border-line px-2 py-0.5 text-faint">{tr(e.type)}</span>
                  </div>
                  <h4 className="mt-2 text-lg font-semibold">{tr(e.title)}</h4>
                  <p className="text-sm text-faint">{tr(e.org)}</p>
                  <p className="mt-2 text-pretty text-muted">{tr(e.text)}</p>
                  <p className="mt-2 font-mono text-xs text-accent-2">{e.tech.join(" · ")}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="mb-6 font-mono text-xs tracking-[0.2em] text-faint uppercase">
              {tr(t.experience.education)}
            </h3>
            <ol className="space-y-4">
              {education.map((ed, i) => (
                <Reveal as="li" key={ed.year} delay={i * 80} className="rounded-2xl border border-line bg-surface p-5">
                  <p className="font-mono text-xs text-accent">{ed.year}</p>
                  <p className="mt-1 font-semibold">{tr(ed.title)}</p>
                  <p className="mt-1 text-sm text-muted">{ed.school}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const { tr } = useApp();
  return (
    <section id="skills" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker={tr(t.skills.kicker)} title={tr(t.skills.title)} intro={tr(t.skills.intro)} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <Reveal key={s.group.fr} delay={(i % 3) * 80} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="mb-4 font-semibold">{tr(s.group)}</h3>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((x) => (
                  <li
                    key={x}
                    className="rounded-lg border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted transition hover:border-accent hover:text-fg"
                  >
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
