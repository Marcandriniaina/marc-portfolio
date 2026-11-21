"use client";

import { useState } from "react";
import { useApp } from "./Providers";
import { profile, t } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ArrowUp, Check, Copy, GitHub, LinkedIn, Mail, Phone, WhatsApp } from "./Icons";

function CopyButton({ value }: { value: string }) {
  const { tr } = useApp();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {}
      }}
      className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-xs text-muted transition hover:border-accent hover:text-fg"
    >
      {done ? <Check width={13} height={13} /> : <Copy width={13} height={13} />}
      {done ? tr(t.contact.copied) : tr(t.contact.copy)}
    </button>
  );
}

export function Contact() {
  const { tr } = useApp();

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line bg-bg-soft py-24">
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[760px] max-w-[160vw] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">{tr(t.contact.kicker)}</p>
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{tr(t.contact.title)}</h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-muted">{tr(t.contact.text)}</p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition hover:brightness-110"
            >
              <Mail />
              {profile.email}
            </a>
            <a
              href={`https://wa.me/${profile.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-medium transition hover:border-accent"
            >
              <WhatsApp />
              {tr(t.contact.whatsapp)}
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-12 grid gap-4 text-left sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 font-mono text-xs tracking-wide text-faint uppercase">
                <Mail width={15} height={15} />
                {tr(t.contact.email)}
              </span>
              <CopyButton value={profile.email} />
            </div>
            <a href={`mailto:${profile.email}`} className="break-all hover:text-accent">
              {profile.email}
            </a>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 font-mono text-xs tracking-wide text-faint uppercase">
                <Phone width={15} height={15} />
                {tr(t.contact.phone)}
              </span>
              <CopyButton value={profile.phones[0]} />
            </div>
            <ul className="space-y-1">
              {profile.phones.map((ph) => {
                const isWhatsApp = ph.replace(/\D/g, "") === profile.whatsapp;
                return (
                  <li key={ph} className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <a href={`tel:${ph.replace(/\s/g, "")}`} className="hover:text-accent">
                      {ph}
                    </a>
                    {isWhatsApp && (
                      <a
                        href={`https://wa.me/${profile.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-500 hover:bg-emerald-500/25"
                      >
                        <WhatsApp width={12} height={12} />
                        WhatsApp
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const { tr } = useApp();
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-faint sm:flex-row sm:px-6">
        <p>
          © 2026 {profile.name}. {tr(t.footer.built)}
        </p>
        <div className="flex items-center gap-1">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full p-2 hover:text-fg"
          >
            <LinkedIn />
          </a>
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-full p-2 hover:text-fg"
            >
              <GitHub />
            </a>
          )}
          <a href="#top" aria-label={tr(t.footer.top)} title={tr(t.footer.top)} className="rounded-full p-2 hover:text-fg">
            <ArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}
