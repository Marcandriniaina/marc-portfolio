"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useApp } from "./Providers";
import { projects, t, type Project } from "@/lib/content";
import { Reveal, SectionHeading } from "./Reveal";
import { ArrowUpRight, Check, Close, Code, Expand } from "./Icons";

function TechList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5 font-mono text-[11px]">
      {items.map((x) => (
        <li key={x} className="rounded-md border border-line bg-surface-2 px-2 py-0.5 text-muted">
          {x}
        </li>
      ))}
    </ul>
  );
}

function Visual({ p, onExpand }: { p: Project; onExpand: () => void }) {
  const { tr } = useApp();

  if (p.mobile && p.image) {
    return (
      <div className="relative flex h-full items-end justify-center overflow-hidden bg-gradient-to-br from-[#2a1416] via-surface-2 to-surface px-6 pt-8">
        <div className="relative w-[190px] translate-y-6 sm:w-[230px] overflow-hidden rounded-t-[2rem] border-[6px] border-b-0 border-[#1c1f26] shadow-2xl transition duration-500 group-hover:translate-y-3">
          <Image src={p.image} alt={`${p.name}, fiche Google Play`} width={719} height={1225} className="h-auto w-full" />
        </div>
      </div>
    );
  }

  if (p.logo) {
    return (
      <div className="flex h-full items-center justify-center bg-white p-6">
        <Image
          src={p.logo}
          alt={`${p.name}, logo`}
          width={223}
          height={226}
          className="h-full max-h-[150px] w-auto object-contain transition duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  if (!p.image) {
    return (
      <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 bg-surface-2 text-faint">
        <Code width={28} height={28} />
        <span className="text-xs">{tr(t.projects.noImage)}</span>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden bg-surface-2">
      <Image
        src={p.image}
        alt={p.name}
        width={1440}
        height={900}
        sizes="(min-width: 1024px) 640px, 100vw"
        className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
      />
      {p.fullImage && (
        <button
          type="button"
          onClick={onExpand}
          className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition hover:bg-black/80"
        >
          <Expand width={14} height={14} />
          {tr(t.projects.fullPage)}
        </button>
      )}
    </div>
  );
}

function FeaturedCard({ p, index, onExpand }: { p: Project; index: number; onExpand: (p: Project) => void }) {
  const { tr } = useApp();
  const reversed = index % 2 === 1;

  return (
    <Reveal
      as="article"
      // minmax(0,1fr) : la colonne ne peut jamais dépasser la largeur de la carte
      className="group grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-3xl border border-line bg-surface transition hover:border-accent/50 lg:grid-cols-2"
    >
      <div
        className={`${p.mobile ? "h-[340px] sm:h-[420px]" : "aspect-[16/10]"} lg:aspect-auto lg:h-auto lg:min-h-[420px] ${
          reversed ? "lg:order-2" : ""
        }`}
      >
        <Visual p={p} onExpand={() => onExpand(p)} />
      </div>
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-faint">
          <span className="text-accent">0{index + 1}</span>
          <span>{tr(p.context)}</span>
          <span aria-hidden>·</span>
          <span>{tr(p.platforms)}</span>
        </div>
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">{p.name}</h3>
          <p className="mt-1 text-muted">{tr(p.kind)}</p>
        </div>
        <p className="text-pretty text-muted">{tr(p.description)}</p>
        {tr(p.highlights).length > 0 && (
          <ul className="space-y-2 text-sm">
            {tr(p.highlights).map((h) => (
              <li key={h} className="flex gap-2.5">
                <Check width={16} height={16} className="mt-0.5 shrink-0 text-accent-2" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="text-sm">
          <span className="font-medium">{tr(t.projects.role)} : </span>
          <span className="text-muted">{tr(p.role)}</span>
        </p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-2">
          <TechList items={p.tech} />
          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              {tr(t.projects.visit)}
              <ArrowUpRight width={16} height={16} />
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function SmallCard({ p, delay, onExpand }: { p: Project; delay: number; onExpand: (p: Project) => void }) {
  const { tr } = useApp();
  return (
    <Reveal
      as="article"
      delay={delay}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:border-accent/50"
    >
      <div className="aspect-[16/10]">
        <Visual p={p} onExpand={() => onExpand(p)} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="font-mono text-xs text-faint">{tr(p.context)}</p>
        <div>
          <h3 className="text-lg font-semibold">{p.name}</h3>
          <p className="text-sm text-muted">{tr(p.kind)}</p>
        </div>
        <p className="text-sm text-pretty text-muted">{tr(p.description)}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-2">
          <TechList items={p.tech} />
          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              {tr(t.projects.visit)}
              <ArrowUpRight width={16} height={16} />
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function FullPageDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { tr } = useApp();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) d.showModal();
    if (!project && d.open) d.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto h-[92vh] w-[min(1100px,94vw)] max-w-none overflow-hidden rounded-2xl border border-line bg-surface p-0 text-fg"
    >
      {project?.fullImage && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
            <p className="truncate text-sm font-medium">{project.name}</p>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted hover:text-fg"
            >
              <Close width={14} height={14} />
              {tr(t.projects.close)}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Image src={project.fullImage} alt={project.name} width={1280} height={4000} className="h-auto w-full" />
          </div>
        </div>
      )}
    </dialog>
  );
}

export function Projects() {
  const { tr } = useApp();
  const [expanded, setExpanded] = useState<Project | null>(null);
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker={tr(t.projects.kicker)} title={tr(t.projects.title)} intro={tr(t.projects.intro)} />

        <div className="space-y-8">
          {featured.map((p, i) => (
            <FeaturedCard key={p.id} p={p} index={i} onExpand={setExpanded} />
          ))}
        </div>

        <h3 className="mt-20 mb-6 font-mono text-xs tracking-[0.2em] text-faint uppercase">
          {tr(t.projects.internships)}
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {others.map((p, i) => (
            <SmallCard key={p.id} p={p} delay={i * 100} onExpand={setExpanded} />
          ))}
        </div>
      </div>

      <FullPageDialog project={expanded} onClose={() => setExpanded(null)} />
    </section>
  );
}
