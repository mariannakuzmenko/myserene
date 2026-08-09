import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Sunrise, Sun, Moon, Wind, Heart, ArrowRight, Play, Pause, Sparkles, Timer } from "lucide-react";
import { PageShell, SectionHeading, Scene, NATURE } from "@/components/site-chrome";
import { useAudio } from "@/lib/audio/audio-provider";
import type { SoundId } from "@/lib/audio/catalog";
import { useMemo } from "react";
import { IMG } from "@/lib/images";
import { SmartImage } from "@/components/smart-image";

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

type Session = {
  icon: typeof Sunrise;
  title: string;
  len: string;
  minutes: number;
  tag: string;
  desc: string;
  image: string;
  mix: { id: SoundId; volume: number }[];
};

const SESSIONS: Session[] = [
  {
    icon: Sunrise, title: "Morning Reset", len: "10 min", minutes: 10, tag: "Start the day",
    desc: "Wake gently with warm birdsong and a soft forest breeze.",
    image: IMG.sunriseForest,
    mix: [{ id: "morning-birds", volume: 55 }, { id: "forest", volume: 35 }],
  },
  {
    icon: Brain, title: "Deep Focus", len: "15 min", minutes: 15, tag: "Work",
    desc: "Steady rain and brown noise for a quiet, productive hour.",
    image: IMG.desk,
    mix: [{ id: "rain", volume: 60 }, { id: "brown-noise", volume: 20 }],
  },
  {
    icon: Wind, title: "Anxiety Ease", len: "8 min", minutes: 8, tag: "Anytime",
    desc: "Waterfall and breeze to soften a racing mind.",
    image: IMG.waterfall,
    mix: [{ id: "waterfall", volume: 55 }, { id: "wind", volume: 25 }],
  },
  {
    icon: Heart, title: "Gratitude", len: "5 min", minutes: 5, tag: "Evening",
    desc: "A slow meditation drone with distant birds.",
    image: IMG.duskField,
    mix: [{ id: "drone", volume: 60 }, { id: "singing-bowls", volume: 30 }],
  },
  {
    icon: Sun, title: "Midday Pause", len: "3 min", minutes: 3, tag: "Break",
    desc: "Three minutes of gentle river to reset attention.",
    image: IMG.stream,
    mix: [{ id: "river", volume: 60 }],
  },
  {
    icon: Moon, title: "Body Scan", len: "20 min", minutes: 20, tag: "Before bed",
    desc: "Nightfall in the forest — perfect to settle the body.",
    image: IMG.nightForest,
    mix: [{ id: "night-forest", volume: 60 }, { id: "wind", volume: 20 }],
  },
  {
    icon: Sparkles, title: "Zen Garden", len: "12 min", minutes: 12, tag: "Meditation",
    desc: "Bamboo, trickling water and mountain quiet.",
    image: IMG.zenGarden,
    mix: [{ id: "zen-garden", volume: 55 }, { id: "bamboo", volume: 30 }, { id: "wind-chimes", volume: 20 }],
  },
  {
    icon: Heart, title: "Loving Kindness", len: "10 min", minutes: 10, tag: "Compassion",
    desc: "Warm ocean waves at dawn.",
    image: IMG.dawnSea,
    mix: [{ id: "ocean", volume: 60 }, { id: "birds", volume: 15 }],
  },
  {
    icon: Brain, title: "Focus Flow", len: "25 min", minutes: 25, tag: "Deep work",
    desc: "Pink noise and a cafe murmur — brain-friendly.",
    image: IMG.focusFlow,
    mix: [{ id: "pink-noise", volume: 45 }, { id: "cafe", volume: 30 }],
  },
];

function MeditationPage() {
  const audio = useAudio();
  const currentTracks = useMemo(() => new Set(Object.keys(audio.active)), [audio.active]);

  const isSessionActive = (mix: Session["mix"]) =>
    mix.length > 0 && mix.every((t) => currentTracks.has(t.id));

  const playSession = (s: Session) => {
    audio.loadPlaylist(s.mix);
    audio.startSleepTimer(s.minutes);
    audio.play();
  };

  return (
    <PageShell>
      <Scene image={NATURE.mist} className="px-4 pt-20 pb-16 rounded-b-[48px]" minHeight="55vh">
        <SectionHeading
          eyebrow="Guided meditation"
          title="Practice, quietly guided."
          subtitle="Sessions from 3 to 45 minutes. Every card plays real ambient audio — pick a length and press play."
        />
      </Scene>
      <section className="px-4 pt-16">
        <div className="mx-auto max-w-6xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SESSIONS.map((s) => {
            const active = isSessionActive(s.mix);
            const fav = audio.isFavorite(s.mix[0].id);
            const progress = active && audio.sleepTimerEndsAt
              ? Math.min(100, Math.max(0, 100 - (audio.sleepTimerRemaining / (s.minutes * 60)) * 100))
              : 0;
            return (
              <article key={s.title} className="glass-card rounded-3xl overflow-hidden transition-all hover:-translate-y-1 group flex h-full flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src={s.image}
                    alt={`${s.title} — guided meditation`}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 scrim-bottom" />
                  <div className="absolute inset-0 p-3 sm:p-4 flex items-start justify-between gap-3">
                    <span className="glass rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink">
                      {s.tag}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => audio.toggleFavorite(s.mix[0].id)}
                        aria-label={fav ? `Remove ${s.title} from favorites` : `Add ${s.title} to favorites`}
                        aria-pressed={fav}
                        className="grid place-items-center h-11 w-11 rounded-full glass transition hover:scale-105"
                      >
                        <Heart className={`h-4 w-4 ${fav ? "fill-red-500 text-red-500" : "text-ink"}`} />
                      </button>
                      <span className="grid place-items-center h-11 w-11 rounded-full bg-white/90 backdrop-blur">
                        <s.icon className="h-4 w-4 text-ink" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-ink leading-tight">{s.title}</h3>
                  <p className="mt-1.5 text-sm font-medium text-ink-soft leading-relaxed">{s.desc}</p>
                  <div className="mt-4 h-1.5 rounded-full bg-white/60 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-brand-soft to-brand transition-all duration-1000"
                      style={{ width: `${progress}%` }} />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-ink-soft">{s.len}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => audio.startSleepTimer(s.minutes)}
                        className="grid place-items-center h-10 w-10 rounded-full glass hover:bg-white/60"
                        aria-label={`Timer ${s.len}`}
                        title={`Set ${s.len} timer`}
                      >
                        <Timer className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => (active ? audio.stopAll() : playSession(s))}
                        className="grid place-items-center h-11 w-11 rounded-full btn-primary"
                        aria-label={active ? `Pause ${s.title}` : `Play ${s.title}`}
                      >
                        {active
                          ? <Pause className="h-4 w-4 fill-current" />
                          : <Play className="h-4 w-4 fill-current ml-0.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
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