import { createFileRoute, Link } from "@tanstack/react-router";
import { Moon, Star, CloudRain, Waves, BookOpen, ArrowRight, Play } from "lucide-react";
import { PageShell, SectionHeading, Scene, NATURE } from "@/components/site-chrome";

export const Route = createFileRoute("/sleep")({
  head: () => ({
    meta: [
      { title: "Sleep — Serene" },
      { name: "description", content: "Sleep stories, deep sleep music and adaptive noise to help you drift off in minutes." },
      { property: "og:title", content: "Sleep — Serene" },
      { property: "og:description", content: "Fall asleep faster. Wake up gentler." },
      { property: "og:url", content: "/sleep" },
    ],
    links: [{ rel: "canonical", href: "/sleep" }],
  }),
  component: SleepPage,
});

const STORIES = [
  { icon: BookOpen, title: "The Lighthouse", len: "32 min", by: "Narrated by Ava L." },
  { icon: Moon, title: "Under Northern Skies", len: "45 min", by: "Narrated by Elias K." },
  { icon: Star, title: "A Long, Slow Train", len: "28 min", by: "Narrated by Sofia R." },
  { icon: CloudRain, title: "Rain on the Cabin", len: "60 min", by: "Ambient" },
  { icon: Waves, title: "Tide at Dusk", len: "9 h loop", by: "Ambient" },
  { icon: Moon, title: "Deep Sleep Music", len: "8 h loop", by: "Composed by Nils" },
];

function SleepPage() {
  return (
    <PageShell>
      <Scene image={NATURE.beachSunset} className="px-4 pt-20 pb-16 rounded-b-[48px]" minHeight="55vh">
        <SectionHeading
          eyebrow="Sleep"
          title="Fall asleep faster. Wake up gentler."
          subtitle="Bedtime stories, ambient loops and sleep music engineered for the last five minutes before dreams."
        />
      </Scene>
      <section className="px-4 pt-16">
        <div className="mx-auto max-w-6xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STORIES.map((s) => (
            <div key={s.title} className="glass-card rounded-3xl overflow-hidden transition-all hover:-translate-y-1 group">
              <div className="h-32 bg-gradient-to-br from-sky-mist via-brand-soft to-brand grid place-items-center relative">
                <s.icon className="h-14 w-14 text-white/80 group-hover:scale-110 transition-transform" strokeWidth={1.2} />
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
              </div>
              <div className="p-6 flex items-center justify-between">
                <div className="min-w-0">
                  <div className="text-lg font-semibold truncate">{s.title}</div>
                  <div className="text-xs text-ink-soft mt-0.5">{s.by} · {s.len}</div>
                </div>
                <button className="grid place-items-center h-11 w-11 rounded-full btn-primary shrink-0" aria-label="Play">
                  <Play className="h-4 w-4 fill-current ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/register" className="btn-primary px-7 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2">
            Sleep better tonight <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}