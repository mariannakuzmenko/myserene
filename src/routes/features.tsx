import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Trees, Moon, Brain, Wind, Sparkles, Heart, Music, Timer, Star, Cloud } from "lucide-react";
import { PageShell, SectionHeading } from "@/components/site-chrome";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — Serene" },
      { name: "description", content: "Ten thoughtful tools for a quieter mind: nature sounds, meditation, sleep, breathing, focus and more." },
      { property: "og:title", content: "Features — Serene" },
      { property: "og:description", content: "Every tool you need for calm, sleep and focus — in one beautifully quiet app." },
      { property: "og:url", content: "/features" },
    ],
    links: [{ rel: "canonical", href: "/features" }],
  }),
  component: FeaturesPage,
});

const F = [
  { icon: Trees, title: "Nature Sounds", desc: "16 mastered soundscapes: rain, ocean, forest, storms and more." },
  { icon: Moon, title: "Deep Sleep", desc: "Bedtime stories, sleep music and adaptive white/pink/brown noise." },
  { icon: Brain, title: "Meditation", desc: "Guided practice from 3 to 45 minutes for every moment of the day." },
  { icon: Wind, title: "Breathing", desc: "Box, 4-7-8 and coherent breathing with gentle visual guides." },
  { icon: Sparkles, title: "Focus", desc: "Binaural beats, ambient loops and Pomodoro-friendly timers." },
  { icon: Heart, title: "Relaxation", desc: "Body scans and progressive relaxation to melt daily tension." },
  { icon: Music, title: "Personal Playlists", desc: "Save mixes and sessions. Your rituals, one tap away." },
  { icon: Timer, title: "Smart Timer", desc: "Fade out beautifully — never wake to silence again." },
  { icon: Star, title: "Favorites", desc: "Tap once to bookmark. Your calm, always in reach." },
  { icon: Cloud, title: "Cross-device Sync", desc: "iPhone, iPad, Android, macOS, web — always in sync." },
];

function FeaturesPage() {
  return (
    <PageShell>
      <section className="px-4 pt-16 pb-8">
        <SectionHeading eyebrow="Everything Serene does" title="Ten quiet tools. One calm interface." subtitle="Designed to disappear so you can be present." />
      </section>
      <section className="px-4 pt-8">
        <div className="mx-auto max-w-6xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {F.map((f) => (
            <div key={f.title} className="glass-card rounded-3xl p-7 transition-all hover:-translate-y-1 group">
              <div className="grid place-items-center h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-mist to-brand-soft group-hover:scale-110 transition-transform">
                <f.icon className="h-5 w-5 text-ink" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/register" className="btn-primary px-7 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2">
            Try Serene free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}