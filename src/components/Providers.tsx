"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Lang } from "@/lib/content";

type Theme = "dark" | "light";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  toggleTheme: () => void;
  /** Renvoie la traduction dans la langue active */
  tr: <T>(value: Record<Lang, T>) => T;
};

const AppContext = createContext<Ctx | null>(null);

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  const [theme, setTheme] = useState<Theme>("dark");

  // Le script d'initialisation a déjà posé les préférences sur <html> : on les relit
  useEffect(() => {
    const root = document.documentElement;
    /* eslint-disable react-hooks/set-state-in-effect */
    if (root.lang === "en") setLangState("en");
    if (root.dataset.theme === "light") setTheme("light");
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    save("lang", l);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      save("theme", next);
      return next;
    });
  }, []);

  const tr = useCallback(<T,>(value: Record<Lang, T>) => value[lang], [lang]);

  return (
    <AppContext.Provider value={{ lang, setLang, theme, toggleTheme, tr }}>{children}</AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp doit être utilisé dans <Providers>");
  return ctx;
}
