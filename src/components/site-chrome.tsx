import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Waves, Instagram, Twitter, Youtube } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/sounds", label: "Sound Library" },
  { to: "/meditation", label: "Meditation" },
  { to: "/sleep", label: "Sleep" },
  { to: "/frequencies", label: "Frequencies" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="sticky top-0 z-50 px-4 pb-2"
      style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}
    >
      <div className="mx-auto max-w-7xl glass rounded-full px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid place-items-center h-9 w-9 rounded-full bg-gradient-to-br from-brand-soft to-brand text-primary-foreground">
            <Waves className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="font-semibold text-lg tracking-tight">Serene</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {NAV.slice(1, 7).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-2.5 xl:px-3 py-2 text-sm text-ink-soft hover:text-ink rounded-full transition-colors hover:bg-white/60 whitespace-nowrap"
              activeProps={{ className: "px-2.5 xl:px-3 py-2 text-sm text-ink rounded-full bg-white/60 whitespace-nowrap" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Link to="/login" className="btn-ghost px-4 py-2 rounded-full text-sm font-medium">
            Login
          </Link>
          <Link to="/register" className="btn-primary px-4 py-2 rounded-full text-sm font-semibold">
            Get Started
          </Link>
        </div>
        <button
          className="lg:hidden grid place-items-center h-10 w-10 rounded-full glass shrink-0"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden mx-auto max-w-7xl mt-2 glass-card rounded-3xl p-4 animate-rise max-h-[70vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-2xl text-ink-soft hover:text-ink hover:bg-white/60"
                activeProps={{ className: "px-4 py-3 rounded-2xl text-ink bg-white/60" }}
              >
                {n.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Link to="/login" onClick={() => setOpen(false)} className="btn-ghost flex-1 text-center px-4 py-2.5 rounded-full text-sm font-medium">Login</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="btn-primary flex-1 text-center px-4 py-2.5 rounded-full text-sm font-semibold">Get Started</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 px-4 pb-8">
      <div className="mx-auto max-w-7xl glass-card rounded-[36px] p-8 sm:p-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid place-items-center h-9 w-9 rounded-full bg-gradient-to-br from-brand-soft to-brand">
                <Waves className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
              </span>
              <span className="font-semibold text-lg">Serene</span>
            </div>
            <p className="mt-4 text-sm text-ink-soft max-w-sm leading-relaxed">
              A calmer state of mind, on demand. Nature sounds, guided meditations and deep sleep — designed for modern life.
            </p>
            <form className="mt-6 flex items-center gap-2 glass rounded-full p-1.5 max-w-sm">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-ink-soft/70"
              />
              <button type="button" className="btn-primary px-4 py-2 rounded-full text-sm font-semibold">
                Subscribe
              </button>
            </form>
          </div>
          <FooterCol title="Product" links={[
            ["/features","Features"],["/sounds","Sound Library"],["/meditation","Meditation"],["/sleep","Sleep"],["/pricing","Pricing"],
          ]} />
          <FooterCol title="Company" links={[
            ["/about","About"],["/blog","Blog"],["/contact","Contact"],
          ]} />
          <FooterCol title="Legal" links={[
            ["/privacy","Privacy"],["/terms","Terms"],["/cookies","Cookies"],
          ]} />
        </div>
        <div className="mt-10 pt-6 border-t border-white/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-soft">© {new Date().getFullYear()} Serene. All rights reserved.</p>
          <div className="flex items-center gap-2">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="grid place-items-center h-9 w-9 rounded-full glass hover:scale-110 transition-transform">
                <Icon className="h-4 w-4 text-ink-soft" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-ink mb-4">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {links.map(([href, label]) => (
          <li key={href}>
            <Link to={href} className="text-sm text-ink-soft hover:text-ink transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AuroraBg() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-aurora">
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-mint/60 blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-aqua/50 blur-3xl animate-float-slower" />
      <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-sun/40 blur-3xl animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/10 blur-3xl animate-breathe" />
      {/* Floating particles */}
      <Particles />
      {/* Soft light rays */}
      <div className="absolute inset-0 opacity-40 mix-blend-soft-light bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.9),transparent_60%)]" />
    </div>
  );
}

function Particles() {
  // 18 particles, deterministic positions & delays
  const dots = Array.from({ length: 18 }, (_, i) => {
    const left = (i * 53) % 100;
    const size = 3 + ((i * 7) % 5);
    const delay = (i * 1.3) % 12;
    const dur = 14 + ((i * 5) % 14);
    return { left, size, delay, dur, i };
  });
  return (
    <div className="absolute inset-0">
      {dots.map((d) => (
        <span
          key={d.i}
          className="absolute rounded-full bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.9)]"
          style={{
            left: `${d.left}%`,
            bottom: `-5vh`,
            width: d.size,
            height: d.size,
            animation: `particle ${d.dur}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function useTimeOfDay() {
  useEffect(() => {
    const apply = () => {
      const h = new Date().getHours();
      const cls =
        h >= 5 && h < 10 ? "tod-morning" :
        h >= 10 && h < 17 ? "tod-day" :
        h >= 17 && h < 20 ? "tod-sunset" : "tod-night";
      const html = document.documentElement;
      html.classList.remove("tod-morning","tod-day","tod-sunset","tod-night");
      html.classList.add(cls);
    };
    apply();
    const id = setInterval(apply, 60_000);
    return () => clearInterval(id);
  }, []);
}

function LoadingVeil() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 900);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-aurora transition-opacity duration-700"
         style={{ opacity: gone ? 0 : 1 }}>
      <div className="relative">
        <div className="breath-orb h-24 w-24 rounded-full animate-breathe" />
        <div className="absolute inset-0 rounded-full border border-white/60" style={{ animation: "ripple 2s ease-out infinite" }} />
      </div>
    </div>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  useTimeOfDay();
  return (
    <div className="relative min-h-screen">
      <LoadingVeil />
      <AuroraBg />
      <Header />
      <main className="animate-rise pt-6 sm:pt-10 lg:pt-12 pb-36 sm:pb-28">{children}</main>
      <Footer />
    </div>
  );
}

/**
 * Scene — a full-width cinematic section with a nature photo background,
 * gradient overlay for readability, and gentle drift animation.
 */
export function Scene({
  image,
  children,
  className = "",
  dark = false,
  minHeight,
}: {
  image: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  minHeight?: string;
}) {
  return (
    <section className={`scene ${dark ? "scene-dark" : ""} ${className}`} style={{ minHeight }}>
      <div className="scene-img" style={{ backgroundImage: `url(${image})` }} />
      <div className="scene-overlay" />
      {children}
    </section>
  );
}

/** Curated nature imagery (Unsplash) for reusable scenes. */
export const NATURE = {
  sunrise: "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?auto=format&fit=crop&w=2400&q=80",
  ocean: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80",
  forest: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2400&q=80",
  waterfall: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=2400&q=80",
  lake: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2400&q=80",
  bamboo: "https://images.unsplash.com/photo-1441325193581-b6dc9a1a6adb?auto=format&fit=crop&w=2400&q=80",
  beachSunset: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=2400&q=80",
  night: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=2400&q=80",
  mist: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=2400&q=80",
  mountains: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2400&q=80",
};

export function SectionHeading({ eyebrow, title, subtitle, align = "center" }: {
  eyebrow?: string; title: string; subtitle?: string; align?: "center" | "left";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-ink-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-shimmer" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-medium text-ink leading-[1.05]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg text-ink-soft leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}