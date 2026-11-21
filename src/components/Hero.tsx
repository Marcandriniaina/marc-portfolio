"use client";

import Image from "next/image";
import { useApp } from "./Providers";
import { profile, t } from "@/lib/content";
import { ArrowRight, Download, LinkedIn, GitHub, MapPin, WhatsApp } from "./Icons";

export function Hero() {
  const { tr } = useApp();

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] max-w-[160vw] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {tr(t.hero.available)}
          </p>

          <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
            {profile.name.split(" ").slice(0, 2).join(" ")}{" "}
            <span className="text-gradient">{profile.name.split(" ").slice(2).join(" ")}</span>
          </h1>

          <p className="mt-5 text-lg font-medium sm:text-xl">
            {tr(t.hero.title)} <span className="text-muted">· {tr(t.hero.subtitle)}</span>
          </p>

          <p className="mt-5 max-w-xl text-pretty text-muted">{tr(t.hero.pitch)}</p>

          <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
            {profile.stack.map((s) => (
              <li key={s} className="rounded-md border border-line bg-surface/60 px-2.5 py-1 text-muted">
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition hover:brightness-110"
            >
              {tr(t.hero.ctaProjects)}
              <ArrowRight className="transition group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.cv}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-5 py-3 text-sm font-medium transition hover:border-accent"
            >
              <Download />
              {tr(t.hero.ctaCv)}
            </a>
            <div className="flex items-center gap-1 text-muted">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-full p-2.5 transition hover:bg-surface hover:text-fg"
              >
                <LinkedIn />
              </a>
              <a
                href={`https://wa.me/${profile.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="rounded-full p-2.5 transition hover:bg-surface hover:text-fg"
              >
                <WhatsApp />
              </a>
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="rounded-full p-2.5 transition hover:bg-surface hover:text-fg"
                >
                  <GitHub />
                </a>
              )}
            </div>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 text-sm text-faint">
            <MapPin width={16} height={16} />
            {tr(t.hero.location)}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[340px] lg:max-w-none">
          <div className="relative mx-auto aspect-square w-full max-w-[360px]">
            <div
              className="absolute -inset-3 rounded-full opacity-70 blur-2xl"
              style={{ background: "conic-gradient(from 120deg, var(--accent), var(--accent-2), var(--accent))" }}
              aria-hidden
            />
            <div className="relative h-full w-full overflow-hidden rounded-full border border-line bg-surface p-1.5">
              <Image
                src={profile.photo}
                alt={profile.name}
                width={800}
                height={800}
                sizes="(min-width: 1024px) 360px, 340px"
                quality={90}
                preload
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-2">
            {t.stats.map((s) => (
              <div key={s.value} className="rounded-2xl border border-line bg-surface/70 px-3 py-4 text-center">
                <dt className="sr-only">{tr(s.label)}</dt>
                <dd>
                  <span className="block text-2xl font-semibold text-gradient">{s.value}</span>
                  <span className="mt-1 block text-[11px] leading-tight text-muted">{tr(s.label)}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
