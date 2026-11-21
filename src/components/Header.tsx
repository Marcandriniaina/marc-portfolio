"use client";

import { useEffect, useState } from "react";
import { useApp } from "./Providers";
import { t } from "@/lib/content";
import { Close, Menu, Monitor, Moon, Sun } from "./Icons";

const links = ["about", "projects", "experience", "skills", "contact"] as const;

export function Header() {
  const { tr, lang, setLang, theme, toggleTheme } = useApp();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<(typeof links)[number] | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);

      // Section active : la dernière dont le haut a dépassé le tiers supérieur de l'écran.
      // En bas de page, c'est toujours la dernière (Contact, trop courte pour monter jusque-là).
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current: (typeof links)[number] | null = null;
      if (atBottom) current = links[links.length - 1];
      else
        for (const id of links) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id;
        }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const iconBtn =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-line px-2.5 text-sm text-muted transition hover:border-accent hover:text-fg";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors ${
        scrolled || open ? "border-b border-line bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#0a0d14] shadow-lg transition group-hover:scale-105"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}
            aria-hidden
          >
            <Monitor width={19} height={19} strokeWidth={2.2} />
          </span>
          <span className="leading-tight whitespace-nowrap">
            <span className="block text-sm font-semibold tracking-tight">Marc Andriniaina</span>
            <span className="block text-[11px] text-muted">{tr(t.ui.logo)}</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 text-sm lg:flex">
          {links.map((id) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative block rounded-full px-3.5 py-1.5 transition ${
                    isActive ? "bg-accent/12 font-medium text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {tr(t.nav[id])}
                  <span
                    className={`absolute inset-x-3.5 -bottom-[13px] h-0.5 rounded-full bg-accent transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className={`${iconBtn} font-mono text-xs`}
            aria-label={tr(t.ui.lang)}
            title={tr(t.ui.lang)}
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>
          <button type="button" onClick={toggleTheme} className={iconBtn} aria-label={tr(t.ui.theme)} title={tr(t.ui.theme)}>
            {theme === "dark" ? <Sun width={16} height={16} /> : <Moon width={16} height={16} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`${iconBtn} lg:hidden`}
            aria-label={tr(t.ui.menu)}
            aria-expanded={open}
          >
            {open ? <Close width={16} height={16} /> : <Menu width={16} height={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-line px-4 py-3 lg:hidden">
          {links.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                aria-current={active === id ? "location" : undefined}
                className={`block rounded-lg border-l-2 px-3 py-3 transition ${
                  active === id
                    ? "border-accent bg-accent/12 font-medium text-fg"
                    : "border-transparent text-muted hover:bg-surface hover:text-fg"
                }`}
              >
                {tr(t.nav[id])}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
