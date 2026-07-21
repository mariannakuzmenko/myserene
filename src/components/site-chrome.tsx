import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Waves, Instagram, Twitter, Youtube } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/sounds", label: "Sound Library" },
  { to: "/meditation", label: "Meditation" },
  { to: "/sleep", label: "Sleep" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 pt-4 px-4">
      <div className="mx-auto max-w-7xl glass rounded-full px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid place-items-center h-9 w-9 rounded-full bg-gradient-to-br from-brand-soft to-brand text-primary-foreground">
            <Waves className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="font-semibold text-lg tracking-tight">Serene</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.slice(1, 7).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm text-ink-soft hover:text-ink rounded-full transition-colors hover:bg-white/60"
              activeProps={{ className: "px-3 py-2 text-sm text-ink rounded-full bg-white/60" }}
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
          className="lg:hidden md:hidden grid place-items-center h-10 w-10 rounded-full glass"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden mx-auto max-w-7xl mt-2 glass-card rounded-3xl p-4 animate-rise">
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
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-brand-soft/50 blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-sky-mist/70 blur-3xl animate-float-slower" />
      <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-brand/25 blur-3xl animate-float-slow" />
    </div>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <AuroraBg />
      <Header />
      <main className="animate-rise">{children}</main>
      <Footer />
    </div>
  );
}

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
      <h2 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-semibold text-ink leading-[1.05]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg text-ink-soft leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}