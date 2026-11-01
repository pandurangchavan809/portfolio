import { useEffect, useState } from "react";
import { Icon } from "./ui";

const LINKS = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["certificates", "Certificates"],
  ["contact", "Contact"],
] as const;

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next ? "#07070d" : "#f8f8fe");
    try {
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
    } catch {
      // Storage can be blocked in private browsing; the theme still applies for this visit.
    }
  };

  return (
    <button type="button" onClick={toggle} className="theme-toggle" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <mask id="eclipse">
          <rect width="24" height="24" fill="white" />
          <circle className="bite" r="7" fill="black" />
        </mask>
        <circle className="core" cx="12" cy="12" fill="currentColor" mask="url(#eclipse)" />
        <g className="rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2v2.2M12 19.8V22M2 12h2.2M19.8 12H22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
        </g>
      </svg>
    </button>
  );
}

export function Navbar({ onViewResume }: { onViewResume: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // A thin band across the viewport's upper-middle decides the current section.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || menuOpen ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8" aria-label="Primary">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          Pandurang<span className="gradient-text"> Chavan</span>
        </a>

        <ul className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {LINKS.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className={`transition-colors hover:text-ink ${active === id ? "text-ink" : "text-muted"}`} aria-current={active === id ? "true" : undefined}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button type="button" onClick={onViewResume} className="btn btn-ghost btn-sm hidden sm:inline-flex">
            <Icon name="eye" />
            Resume
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="btn btn-ghost h-10 w-10 !p-0 lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d={menuOpen ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="space-y-1 border-t border-line px-5 py-4 text-sm font-medium lg:hidden">
          {LINKS.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={() => setMenuOpen(false)} className="block rounded-lg px-2 py-2.5 hover:bg-surface">
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onViewResume();
              }}
              className="block w-full rounded-lg px-2 py-2.5 text-left hover:bg-surface"
            >
              View resume
            </button>
          </li>
        </ul>
      )}
    </header>
  );
}
