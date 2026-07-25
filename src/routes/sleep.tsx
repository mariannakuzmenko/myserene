import { createFileRoute, Link } from "@tanstack/react-router";
import { Moon, Star, CloudRain, Waves, BookOpen, ArrowRight, Play, Pause, Music, Wind, Flame, Mountain, Timer } from "lucide-react";
import { PageShell, SectionHeading, Scene, NATURE } from "@/components/site-chrome";
import { useAudio } from "@/lib/audio/audio-provider";
import type { SoundId } from "@/lib/audio/catalog";
import { useMemo, useState } from "react";

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

type SleepProgram = {
  icon: typeof Moon;
  title: string;
  category: string;
  by: string;
  len: string;
  minutes: number;
  image: string;
  mix: { id: SoundId; volume: number }[];
};

const PROGRAMS: SleepProgram[] = [
  {
    icon: Moon, title: "Deep Sleep", category: "Deep Sleep", by: "9 h loop", len: "9 h",
    minutes: 480,
    image: "https://images.unsplash.com/photo-1520206183501-b80df61043c2?auto=format&fit=crop&w=1600&q=70",
    mix: [{ id: "deep-sleep", volume: 55 }, { id: "wind", volume: 20 }],
  },
  {
    icon: Waves, title: "Fall Asleep Fast", category: "Fall Asleep Fast", by: "20 min", len: "20 min",
    minutes: 20,
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1600&q=70",
    mix: [{ id: "ocean", volume: 55 }, { id: "rain", volume: 25 }],
  },
  {
    icon: Timer, title: "Power Nap", category: "Power Nap", by: "20 min", len: "20 min",
    minutes: 20,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=70",
    mix: [{ id: "rain", volume: 55 }],
  },
  {
    icon: Music, title: "Sleep Music", category: "Sleep Music", by: "Composed by Nils", len: "8 h loop",
    minutes: 480,
    image: "https://images.unsplash.com/photo-1445228949218-ae1ad83b0d19?auto=format&fit=crop&w=1600&q=70",
    mix: [{ id: "meditation", volume: 55 }, { id: "brown-noise", volume: 20 }],
  },
  {
    icon: BookOpen, title: "The Lighthouse", category: "Sleep Stories", by: "Narrated by Ava L.", len: "32 min",
    minutes: 32,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=70",
    mix: [{ id: "ocean", volume: 55 }, { id: "wind", volume: 25 }],
  },
  {
    icon: CloudRain, title: "Rain for Sleep", category: "Rain for Sleep", by: "Heavy rain, no traffic", len: "9 h",
    minutes: 480,
    image: "https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=1600&q=70",
    mix: [{ id: "heavy-rain", volume: 65 }, { id: "wind", volume: 20 }],
  },
  {
    icon: Waves, title: "Ocean for Sleep", category: "Ocean for Sleep", by: "Distant surf", len: "9 h",
    minutes: 480,
    image: "https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=1600&q=70",
    mix: [{ id: "ocean", volume: 65 }],
  },
  {
    icon: Moon, title: "Night Forest", category: "Night Forest", by: "Crickets & owl", len: "8 h",
    minutes: 480,
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1600&q=70",
    mix: [{ id: "night-forest", volume: 65 }, { id: "wind", volume: 15 }],
  },
  {
    icon: Music, title: "Brown Noise", category: "Brown Noise", by: "Deep, warm", len: "∞",
    minutes: 480,
    image: "https://images.unsplash.com/photo-1518281420975-50db6e5d0a97?auto=format&fit=crop&w=1600&q=70",
    mix: [{ id: "brown-noise", volume: 70 }],
  },
  {
    icon: Music, title: "White Noise", category: "White Noise", by: "Even hush", len: "∞",
    minutes: 480,
    image: "https://images.unsplash.com/photo-1518281420975-50db6e5d0a97?auto=format&fit=crop&w=1600&q=70",
    mix: [{ id: "white-noise", volume: 65 }],
  },
  {
    icon: Music, title: "Pink Noise", category: "Pink Noise", by: "Softer than white", len: "∞",
    minutes: 480,
    image: "https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?auto=format&fit=crop&w=1600&q=70",
    mix: [{ id: "pink-noise", volume: 65 }],
  },
  {
    icon: Flame, title: "Fireplace Sleep", category: "Fireplace Sleep", by: "Crackling logs", len: "9 h",
    minutes: 480,
    image: "https://images.unsplash.com/photo-1493889104449-378abb43ad1a?auto=format&fit=crop&w=1600&q=70",
    mix: [{ id: "fireplace", volume: 65 }, { id: "wind", volume: 15 }],
  },
  {
    icon: Mountain, title: "Mountain Night", category: "Mountain Night", by: "Alpine hush", len: "8 h",
    minutes: 480,
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1600&q=70",
    mix: [{ id: "wind", volume: 45 }, { id: "night-forest", volume: 35 }],
  },
  {
    icon: Music, title: "Gentle Piano", category: "Gentle Piano", by: "Meditation drone", len: "60 min",
    minutes: 60,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=70",
    mix: [{ id: "meditation", volume: 65 }],
  },
];

const CATEGORIES = ["All", "Deep Sleep", "Fall Asleep Fast", "Power Nap", "Sleep Music", "Sleep Stories"] as const;
type Category = (typeof CATEGORIES)[number];

function SleepPage() {
  const audio = useAudio();
  const [cat, setCat] = useState<Category>("All");
  const activeSet = useMemo(() => new Set(Object.keys(audio.active)), [audio.active]);
  const list = cat === "All" ? PROGRAMS : PROGRAMS.filter((p) => p.category === cat);

  const isActive = (p: SleepProgram) =>
    p.mix.every((t) => activeSet.has(t.id));

  const playProgram = (p: SleepProgram) => {
    audio.loadPlaylist(p.mix);
    // Auto-arm sleep timer for finite programs; leave 8h+ loops untouched.
    if (p.minutes > 0 && p.minutes <= 120) audio.startSleepTimer(p.minutes);
    audio.play();
  };

  return (
    <PageShell>
      <Scene image={NATURE.beachSunset} className="px-4 pt-20 pb-16 rounded-b-[48px]" minHeight="55vh">
        <SectionHeading
          eyebrow="Sleep"
          title="Fall asleep faster. Wake up gentler."
          subtitle="Every program plays real ambient audio, integrates with the sleep timer, and fades out gently when it's time to rest."
        />
      </Scene>
      <section className="px-4 pt-16">
        <div className="mx-auto max-w-6xl flex flex-wrap gap-2 mb-8 justify-center">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition ${cat === c ? "btn-primary" : "glass hover:bg-white/60"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mx-auto max-w-6xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => {
            const active = isActive(p);
            return (
              <article key={p.title} className="glass-card rounded-3xl overflow-hidden transition-all hover:-translate-y-1 group flex flex-col">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
                  <div className="absolute top-3 left-3 glass rounded-full px-3 py-1 text-[10px] uppercase tracking-widest text-ink">
                    {p.category}
                  </div>
                  <div className="absolute top-3 right-3 grid place-items-center h-9 w-9 rounded-2xl bg-white/80 backdrop-blur">
                    <p.icon className="h-4 w-4 text-ink" />
                  </div>
                </div>
                <div className="p-5 flex-1 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-lg font-semibold truncate">{p.title}</div>
                    <div className="text-xs text-ink-soft mt-0.5 truncate">{p.by} · {p.len}</div>
                  </div>
                  <button
                    onClick={() => (active ? audio.stopAll() : playProgram(p))}
                    className="grid place-items-center h-11 w-11 rounded-full btn-primary shrink-0"
                    aria-label={active ? `Pause ${p.title}` : `Play ${p.title}`}
                  >
                    {active
                      ? <Pause className="h-4 w-4 fill-current" />
                      : <Play className="h-4 w-4 fill-current ml-0.5" />}
                  </button>
                </div>
              </article>
            );
          })}
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