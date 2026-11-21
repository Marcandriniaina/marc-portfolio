"use client";

import { useApp } from "./Providers";
import { t } from "@/lib/content";
import { Reveal, SectionHeading } from "./Reveal";

export function About() {
  const { tr } = useApp();
  const f = t.about.facts;
  const facts = [
    [f.location, f.locationValue],
    [f.birth, f.birthValue],
    [f.languages, f.languagesValue],
    [f.softSkills, f.softSkillsValue],
    [f.interests, f.interestsValue],
  ] as const;

  return (
    <section id="about" className="border-t border-line bg-bg-soft py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker={tr(t.about.kicker)} title={tr(t.about.title)} />
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Reveal className="space-y-5 text-pretty text-muted sm:text-lg">
            <p>{tr(t.about.p1)}</p>
            <p>{tr(t.about.p2)}</p>
          </Reveal>
          <Reveal delay={120}>
            <dl className="divide-y divide-line rounded-2xl border border-line bg-surface">
              {facts.map(([label, value]) => (
                <div key={label.fr} className="grid gap-1 px-5 py-4 sm:grid-cols-[150px_1fr] sm:gap-4">
                  <dt className="font-mono text-xs tracking-wide text-faint uppercase sm:pt-0.5">{tr(label)}</dt>
                  <dd className="text-sm">{tr(value)}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
