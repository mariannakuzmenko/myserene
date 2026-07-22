import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Sunrise, Sun, Moon, Wind, Heart, ArrowRight, Play } from "lucide-react";
import { PageShell, SectionHeading, Scene, NATURE } from "@/components/site-chrome";

export const Route = createFileRoute("/meditation")({
  head: () => ({
    meta: [
      { title: "Meditation — Serene" },
      { name: "description", content: "Guided meditation from 3 to 45 minutes. Morning, focus, anxiety, gratitude and sleep." },
      { property: "og:title", content: "Meditation — Serene" },
      { property: "og:description", content: "Guided sessions designed to fit into any moment of the day." },
      { property: "og:url", content: "/meditation" },
    ],
    links: [{ rel: "canonical", href: "/meditation" }],
  }),
  component: MeditationPage,
});

const SESSIONS = [
  { icon: Sunrise, title: "Morning Reset", len: "10 min", tag: "Start the day" },
  { icon: Brain, title: "Deep Focus", len: "15 min", tag: "Work" },
  { icon: Wind, title: "Anxiety Ease", len: "8 min", tag: "Anytime" },
  { icon: Heart, title: "Gratitude", len: "5 min", tag: "Evening" },
  { icon: Sun, title: "Midday Pause", len: "3 min", tag: "Break" },
  { icon: Moon, title: "Body Scan", len: "20 min", tag: "Before bed" },
];

function MeditationPage() {
  return (
    <PageShell>
      <Scene image={NATURE.mist} className="px-4 pt-20 pb-16 rounded-b-[48px]" minHeight="55vh">
        <SectionHeading
          eyebrow="Guided meditation"
          title="Practice, quietly guided."
          subtitle="Sessions from 3 to 45 minutes — teachers who never rush you."
        />
      </Scene>
      <section className="px-4 pt-16">
        <div className="mx-auto max-w-6xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SESSIONS.map((s) => (
            <div key={s.title} className="glass-card rounded-3xl p-6 transition-all hover:-translate-y-1 group">
              <div className="flex items-start justify-between">
                <div className="grid place-items-center h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-mist to-brand-soft group-hover:scale-110 transition-transform">
                  <s.icon className="h-5 w-5 text-ink" />
                </div>
                <button className="grid place-items-center h-11 w-11 rounded-full btn-primary" aria-label="Play">
                  <Play className="h-4 w-4 fill-current ml-0.5" />
                </button>
              </div>
              <div className="mt-5">
                <div className="text-[11px] uppercase tracking-widest text-ink-soft">{s.tag}</div>
                <div className="mt-1 text-xl font-semibold">{s.title}</div>
                <div className="text-sm text-ink-soft mt-1">{s.len}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/register" className="btn-primary px-7 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2">
            Start a session <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}