import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, SectionHeading } from "@/components/site-chrome";
import { SOUND_LIBRARY, SoundCard } from "@/components/sound-card";

export const Route = createFileRoute("/sounds")({
  head: () => ({
    meta: [
      { title: "Sound Library — Serene" },
      { name: "description", content: "Rain, ocean, forest, fireplace, thunderstorm, wind, birds, noise, cafe and more — mastered in high fidelity." },
      { property: "og:title", content: "Sound Library — Serene" },
      { property: "og:description", content: "16 mastered soundscapes for focus, sleep and calm." },
      { property: "og:url", content: "/sounds" },
    ],
    links: [{ rel: "canonical", href: "/sounds" }],
  }),
  component: SoundsPage,
});

const CATS = ["All", "Nature", "Focus", "Sleep", "Cozy", "Ambient", "Meditation"] as const;

function SoundsPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const shown = cat === "All" ? SOUND_LIBRARY : SOUND_LIBRARY.filter((s) => s.cat === cat);
  return (
    <PageShell>
      <section className="px-4 pt-16 pb-8">
        <SectionHeading
          eyebrow="Sound library"
          title="A world of sound, curated."
          subtitle="Mastered field recordings and studio-crafted ambience. Loop endlessly, layer freely."
        />
        <div className="mt-10 mx-auto max-w-3xl glass rounded-full p-1.5 flex flex-wrap justify-center gap-1">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                cat === c ? "btn-primary" : "text-ink-soft hover:text-ink hover:bg-white/60"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>
      <section className="px-4 pt-8">
        <div className="mx-auto max-w-6xl grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((s) => <SoundCard key={s.title} {...s} />)}
        </div>
      </section>
    </PageShell>
  );
}