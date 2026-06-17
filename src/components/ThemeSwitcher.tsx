import { useEffect, useState } from "react";

const MONO = "var(--font-jetbrains-mono), monospace";

export const THEME_STORAGE_KEY = "portfolio-theme";

export type ThemeId = "light" | "dark" | "midnight" | "sepia";

export type Theme = {
  id: ThemeId;
  name: string;
  /* page background swatch */
  bg: string;
  /* accent dot */
  dot: string;
};

/* The four themes, in switcher order. Values mirror the design palettes. */
export const THEMES: Theme[] = [
  { id: "light", name: "Light", bg: "#EFEAE0", dot: "#E0512A" },
  { id: "dark", name: "Dark", bg: "#1A1714", dot: "#E86B46" },
  { id: "midnight", name: "Midnight", bg: "#0F1424", dot: "#EE6352" },
  { id: "sepia", name: "Sepia", bg: "#F2E8D5", dot: "#A8431A" },
];

const THEME_IDS = THEMES.map((t) => t.id);

function isThemeId(value: string | null): value is ThemeId {
  return value !== null && (THEME_IDS as string[]).includes(value);
}

function applyTheme(id: ThemeId) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", id);
  const meta = document.querySelector('meta[name="theme-color"]');
  const theme = THEMES.find((t) => t.id === id);
  if (meta && theme) meta.setAttribute("content", theme.bg);
}

/**
 * Reads the active theme (set pre-paint by the inline script in _document),
 * keeps it in React state, and persists changes to localStorage.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>("light");

  useEffect(() => {
    let initial: ThemeId = "light";
    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem(THEME_STORAGE_KEY)
        : null;
    if (isThemeId(stored)) {
      initial = stored;
    } else if (typeof document !== "undefined") {
      const current = document.documentElement.getAttribute("data-theme");
      if (isThemeId(current)) initial = current;
    }
    setThemeState(initial);
    applyTheme(initial); /* keep data-theme + theme-color meta in sync */
  }, []);

  const setTheme = (id: ThemeId) => {
    setThemeState(id);
    applyTheme(id);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
  };

  return { theme, setTheme };
}

/* Row of theme swatches + active-theme label, styled for the editorial header. */
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const activeName = THEMES.find((t) => t.id === theme)?.name ?? "Light";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span
        className="ed-theme-name"
        style={{
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {activeName}
      </span>
      <div style={{ display: "flex", gap: 7 }}>
        {THEMES.map((t) => {
          const active = t.id === theme;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTheme(t.id)}
              aria-label={`${t.name} theme`}
              aria-pressed={active}
              title={t.name}
              style={{
                width: 24,
                height: 24,
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: t.bg,
                border: active
                  ? "2px solid var(--accent)"
                  : "1px solid var(--border-strong)",
                cursor: "pointer",
                transition: "border-color 0.2s, transform 0.15s",
              }}
            >
              <span
                style={{ width: 9, height: 9, background: t.dot }}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ThemeSwitcher;
