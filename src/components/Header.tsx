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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

        <ul className="hidden items-center gap-7 text-sm text-muted lg:flex">
          {links.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className="transition hover:text-fg">
                {tr(t.nav[id])}
              </a>
            </li>
          ))}
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
                className="block rounded-lg px-3 py-3 text-muted transition hover:bg-surface hover:text-fg"
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
