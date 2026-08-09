import { createFileRoute } from "@tanstack/react-router";
import { Play, Pause, Headphones, Activity, Info } from "lucide-react";
import { PageShell, SectionHeading, Scene, NATURE } from "@/components/site-chrome";
import { useAudio } from "@/lib/audio/audio-provider";
import { FREQUENCIES, SOUND_BY_ID } from "@/lib/audio/catalog";

export const Route = createFileRoute("/frequencies")({
  head: () => ({
    meta: [
      { title: "Relaxation Frequencies — Serene" },
      { name: "description", content: "Alpha, theta and delta tone ranges, binaural beats and isochronic tones — playable, with clear and responsible descriptions." },
      { property: "og:title", content: "Relaxation Frequencies — Serene" },
      { property: "og:description", content: "Playable alpha, theta, delta, binaural and isochronic audio experiences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/frequencies" },
    ],
    links: [{ rel: "canonical", href: "/frequencies" }],
  }),
  component: FrequenciesPage,
});

function FrequenciesPage() {
  const audio = useAudio();
  return (
    <PageShell>
      <Scene image={NATURE.mist} className="px-4 pt-20 pb-16 rounded-b-[48px]" minHeight="55vh">
        <SectionHeading
          eyebrow="Relaxation frequencies"
          title="Slow tones, steady rhythms."
          subtitle="Five playable frequency experiences. Descriptions are deliberately plain — these are calming audio tools, not medical treatments."
        />
      </Scene>

      <section className="px-4 pt-14 sm:pt-16">
        <div className="mx-auto max-w-6xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FREQUENCIES.map((f) => {
            const sound = SOUND_BY_ID[f.id];
            const playing = f.id in audio.active;
            return (
              <article key={f.id} className="glass-card rounded-3xl overflow-hidden flex h-full flex-col transition-all hover:-translate-y-1 group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={sound?.image}
                    alt={`${f.title} — calming frequency experience`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <div className="absolute inset-0 p-4 flex items-start justify-between">
                    <span className="glass rounded-full px-3 py-1 text-[10px] uppercase tracking-widest">{f.range}</span>
                    <span className="grid place-items-center h-9 w-9 rounded-full glass">
                      <Activity className="h-4 w-4 text-ink-soft" />
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-1 flex-col">
                  <h3 className="text-lg font-semibold leading-tight">{f.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{f.blurb}</p>
                  {f.note && (
                    <p className="mt-3 flex gap-2 text-xs text-ink-soft leading-relaxed">
                      {f.id === "binaural"
                        ? <Headphones className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        : <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />}
                      <span>{f.note}</span>
                    </p>
                  )}
                  <div className="mt-5 pt-4 border-t border-white/50 flex items-center justify-between gap-3">
                    <span className="text-xs text-ink-soft">{playing ? "Playing" : "Continuous loop"}</span>
                    <button
                      onClick={() => audio.toggleTrack(f.id, 55)}
                      className="grid place-items-center h-11 w-11 rounded-full btn-primary shrink-0"
                      aria-label={playing ? `Pause ${f.title}` : `Play ${f.title}`}
                      aria-pressed={playing}
                    >
                      {playing
                        ? <Pause className="h-4 w-4 fill-current" />
                        : <Play className="h-4 w-4 fill-current ml-0.5" />}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mx-auto max-w-3xl mt-12 glass rounded-3xl p-5 sm:p-6">
          <h2 className="text-sm font-semibold">A note on evidence</h2>
          <p className="mt-2 text-sm text-ink-soft leading-relaxed">
            Research on binaural beats and rhythmic audio is mixed, and individual responses vary widely.
            Treat these tracks as calming background audio rather than a treatment for any condition, and
            keep the volume comfortable.
          </p>
        </div>
      </section>
    </PageShell>
  );
}