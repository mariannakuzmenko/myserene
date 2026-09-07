import { createFileRoute, Link } from "@tanstack/react-router";
import { Moon, Heart, CloudRain, Waves, ArrowRight, Play, Pause, Music, Flame, Mountain, Timer, Piano, Trees } from "lucide-react";
import { PageShell, SectionHeading, Scene, NATURE } from "@/components/site-chrome";
import { useAudio } from "@/lib/audio/audio-provider";
import type { SoundId } from "@/lib/audio/catalog";
import { useMemo, useState } from "react";
import { IMG } from "@/lib/images";
import { SmartImage } from "@/components/smart-image";

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
    image: IMG.moonlight,
    mix: [{ id: "deep-sleep", volume: 55 }, { id: "wind", volume: 20 }],
  },
  {
    icon: Waves, title: "Fall Asleep Fast", category: "Fall Asleep Fast", by: "20 min", len: "20 min",
    minutes: 20,
    image: IMG.starryNight,
    mix: [{ id: "ocean", volume: 55 }, { id: "rain", volume: 25 }],
  },
  {
    icon: Timer, title: "Power Nap", category: "Power Nap", by: "20 min", len: "20 min",
    minutes: 20,
    image: IMG.softBedroom,
    mix: [{ id: "rain", volume: 55 }],
  },
  {
    icon: Music, title: "Sleep Music", category: "Sleep Music", by: "Composed by Nils", len: "8 h loop",
    minutes: 480,
    image: IMG.auroraLake,
    mix: [{ id: "soft-ambient", volume: 55 }, { id: "brown-noise", volume: 20 }],
  },
  {
    icon: Waves, title: "Peaceful Night", category: "Peaceful Night", by: "Distant surf & breeze", len: "8 h",
    minutes: 480,
    image: IMG.nightOcean,
    mix: [{ id: "calm-sea", volume: 55 }, { id: "wind", volume: 25 }],
  },
  {
    icon: CloudRain, title: "Rain for Sleep", category: "Rain for Sleep", by: "Heavy rain, no traffic", len: "9 h",
    minutes: 480,
    image: IMG.heavyRain,
    mix: [{ id: "heavy-rain", volume: 65 }, { id: "wind", volume: 20 }],
  },
  {
    icon: Waves, title: "Ocean for Sleep", category: "Ocean for Sleep", by: "Distant surf", len: "9 h",
    minutes: 480,
    image: IMG.oceanSunset,
    mix: [{ id: "ocean", volume: 65 }],
  },
  {
    icon: Moon, title: "Night Forest", category: "Night Forest", by: "Crickets & owl", len: "8 h",
    minutes: 480,
    image: IMG.nightForest,
    mix: [{ id: "night-forest", volume: 65 }, { id: "wind", volume: 15 }],
  },
  {
    icon: Music, title: "Brown Noise", category: "Brown Noise", by: "Deep, warm", len: "∞",
    minutes: 480,
    image: IMG.brownHush,
    mix: [{ id: "brown-noise", volume: 70 }],
  },
  {
    icon: Music, title: "White Noise", category: "White Noise", by: "Even hush", len: "∞",
    minutes: 480,
    image: IMG.whiteHush,
    mix: [{ id: "white-noise", volume: 65 }],
  },
  {
    icon: Music, title: "Pink Noise", category: "Pink Noise", by: "Softer than white", len: "∞",
    minutes: 480,
    image: IMG.pinkHush,
    mix: [{ id: "pink-noise", volume: 65 }],
  },
  {
    icon: Trees, title: "Green Noise", category: "Brown Noise", by: "Mid-band hush", len: "∞",
    minutes: 480,
    image: IMG.greenValley,
    mix: [{ id: "green-noise", volume: 65 }],
  },
  {
    icon: Flame, title: "Fireplace Sleep", category: "Fireplace Sleep", by: "Crackling logs", len: "9 h",
    minutes: 480,
    image: IMG.fireplace,
    mix: [{ id: "fireplace", volume: 65 }, { id: "wind", volume: 15 }],
  },
  {
    icon: Mountain, title: "Mountain Night", category: "Mountain Night", by: "Alpine hush", len: "8 h",
    minutes: 480,
    image: IMG.mountainNight,
    mix: [{ id: "wind", volume: 45 }, { id: "night-forest", volume: 35 }],
  },
  {
    icon: Piano, title: "Gentle Piano", category: "Gentle Piano", by: "Sparse piano & air", len: "60 min",
    minutes: 60,
    image: IMG.pianoKeys,
    mix: [{ id: "piano", volume: 60 }, { id: "drone", volume: 25 }],
  },
];

const CATEGORIES = [
  "All", "Deep Sleep", "Fall Asleep Fast", "Power Nap", "Sleep Music",
  "Rain for Sleep", "Ocean for Sleep", "Night Forest", "Brown Noise",
  "White Noise", "Pink Noise", "Fireplace Sleep", "Gentle Piano", "Peaceful Night",
] as const;
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
              <article key={p.title} className="glass-card rounded-3xl overflow-hidden transition-all hover:-translate-y-1 group flex h-full flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src={p.image}
                    alt={`${p.title} — sleep soundscape`}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 scrim-bottom" />
                  <div className="absolute inset-0 p-3 sm:p-4 flex items-start justify-between gap-3">
                    <span className="glass rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink">
                      {p.category}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => audio.toggleFavorite(p.mix[0].id)}
                        aria-label={audio.isFavorite(p.mix[0].id) ? `Remove ${p.title} from favorites` : `Add ${p.title} to favorites`}
                        aria-pressed={audio.isFavorite(p.mix[0].id)}
                        className="grid place-items-center h-11 w-11 rounded-full icon-control transition hover:scale-105"
                      >
                        <Heart className={`h-4 w-4 ${audio.isFavorite(p.mix[0].id) ? "fill-red-500 text-red-500" : "text-ink"}`} />
                      </button>
                      <span className="grid place-items-center h-11 w-11 rounded-full icon-control">
                        <p.icon className="h-4 w-4 text-ink" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-1 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-base sm:text-lg font-semibold text-ink truncate">{p.title}</div>
                    <div className="text-xs font-medium text-ink-soft mt-0.5 truncate">{p.by} · {p.len}</div>
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