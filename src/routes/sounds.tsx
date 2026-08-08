import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, SectionHeading, Scene, NATURE } from "@/components/site-chrome";
import { SOUND_LIBRARY, SoundCard } from "@/components/sound-card";
import { useAudio } from "@/lib/audio/audio-provider";
import { SOUND_BY_ID } from "@/lib/audio/catalog";

export const Route = createFileRoute("/sounds")({
  head: () => ({
    meta: [
      { title: "Sound Library — Serene" },
      { name: "description", content: "Birdsong, rain, ocean, forest, fireplace, wind chimes, temple bells, singing bowls, gentle piano and noise — 40+ looping soundscapes." },
      { property: "og:title", content: "Sound Library — Serene" },
      { property: "og:description", content: "40+ mastered soundscapes for focus, sleep and calm." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/sounds" },
    ],
    links: [{ rel: "canonical", href: "/sounds" }],
  }),
  component: SoundsPage,
});

const CATS = [
  "All", "Nature", "Rain", "Water", "Weather", "Cozy", "Zen",
  "Music", "Meditation", "Focus", "Sleep", "Ambient", "Frequencies",
] as const;

function SoundsPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const audio = useAudio();
  const shown = cat === "All" ? SOUND_LIBRARY : SOUND_LIBRARY.filter((s) => s.cat === cat);
  const favorites = audio.favorites.map((id) => SOUND_BY_ID[id]).filter(Boolean);
  const recent = audio.recent.map((id) => SOUND_BY_ID[id]).filter(Boolean);
  return (
    <PageShell>
      <Scene image={NATURE.waterfall} className="px-4 pt-20 pb-16 rounded-b-[48px]" minHeight="60vh">
        <SectionHeading
          eyebrow="Sound library"
          title="A world of sound, curated."
          subtitle="Mastered field recordings and studio-crafted ambience. Loop endlessly, layer freely."
        />
        <div className="mt-10 mx-auto max-w-4xl glass rounded-[28px] sm:rounded-full p-1.5 flex flex-wrap justify-center gap-1">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                cat === c ? "btn-primary" : "text-ink-soft hover:text-ink hover:bg-white/60"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Scene>

      {favorites.length > 0 && (
        <section className="px-4 pt-14 sm:pt-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-sm uppercase tracking-widest text-ink-soft">Your favorites</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {favorites.map((s) => <SoundCard key={`fav-${s.id}`} {...s} />)}
            </div>
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section className="px-4 pt-14 sm:pt-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-sm uppercase tracking-widest text-ink-soft">Recently played</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {recent.map((s) => (
                <button
                  key={`recent-${s.id}`}
                  onClick={() => audio.toggleTrack(s.id, 65)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition ${s.id in audio.active ? "btn-primary" : "glass hover:bg-white/60"}`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 pt-14 sm:pt-16">
        <div className="mx-auto max-w-6xl grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((s) => <SoundCard key={s.id} {...s} />)}
        </div>
      </section>
    </PageShell>
  );
}