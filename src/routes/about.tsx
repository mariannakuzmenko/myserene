import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell, SectionHeading } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Serene" },
      { name: "description", content: "We're a small team building calmer software for a loud world." },
      { property: "og:title", content: "About — Serene" },
      { property: "og:description", content: "Calmer software for a loud world." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const STATS = [
  { k: "2M+", v: "Peaceful people" },
  { k: "180+", v: "Countries" },
  { k: "4.9★", v: "App store rating" },
  { k: "16", v: "Curated sounds" },
];

function AboutPage() {
  return (
    <PageShell>
      <section className="px-4 pt-16 pb-8">
        <SectionHeading eyebrow="About Serene" title="Calmer software for a loud world." subtitle="We build the quiet corner of the internet. A small team, obsessed with the details of feeling better." />
      </section>
      <section className="px-4 pt-8">
        <div className="mx-auto max-w-5xl glass-card rounded-[32px] p-8 sm:p-12 space-y-6 text-lg text-ink leading-relaxed">
          <p>
            Serene started with a simple question: what if a wellness app didn't shout at you?
            No streaks, no guilt, no dark UI trying to be mysterious — just a calm, beautiful
            place to breathe.
          </p>
          <p className="text-ink-soft">
            We're a distributed team of designers, sound engineers and meditation teachers based
            in Stockholm, Lisbon, Kyoto and Toronto. We record in real forests, master in real studios
            and design in a shared belief that software can feel like a soft room.
          </p>
        </div>
        <div className="mt-10 mx-auto max-w-5xl grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.v} className="glass rounded-3xl p-6 text-center">
              <div className="text-4xl font-semibold text-ink">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-ink-soft">{s.v}</div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/register" className="btn-primary px-7 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2">
            Join Serene <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}