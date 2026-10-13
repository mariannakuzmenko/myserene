import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Play, Pause, Sparkles, Moon, Wind, Flame, CloudRain, Trees,
  Waves, Bird, Cloud, Music, Brain, Timer, Star, Heart,
  ArrowRight, Check,
} from "lucide-react";
import { PageShell, SectionHeading, Scene, NATURE } from "@/components/site-chrome";
import { SOUND_LIBRARY, SoundCard } from "@/components/sound-card";
import { useAudio } from "@/lib/audio/audio-provider";
import type { SoundId } from "@/lib/audio/catalog";
import { HeroOceanBackground } from "@/components/hero-ocean-background";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MySerene — Find Your Moment of Calm" },
      { name: "description", content: "Immersive sounds, meditation and peaceful environments designed to help you reset and find your focus. Relax. Breathe. Focus. Sleep." },
      { property: "og:title", content: "MySerene — Find Your Moment of Calm" },
      { property: "og:description", content: "Immersive sounds, meditation and peaceful environments designed to help you reset and find your focus." },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "MySerene",
        applicationCategory: "HealthApplication",
        operatingSystem: "iOS, Android, Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      }),
    }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageShell>
      <Hero />
      <Features />
      <SoundPreview />
      <Mixer />
      <AppPreview />
      <Testimonials />
      <CtaBand />
    </PageShell>
  );
}

function Hero() {
  const audio = useAudio();
  return (
    <section
      className="relative isolate w-full overflow-hidden -mt-32 sm:-mt-36 lg:-mt-44 px-4 pt-40 pb-20 sm:pt-48 sm:pb-24 lg:pt-56 flex items-center"
      style={{ minHeight: "100svh" }}
    >
      <HeroOceanBackground />

      <div className="mx-auto max-w-6xl w-full text-center relative">
        <span className="inline-flex items-center gap-2 icon-control-dark rounded-full px-4 py-1.5 text-xs font-semibold animate-rise">
          <Sparkles className="h-3.5 w-3.5" />
          Relax. Breathe. Focus. Sleep.
        </span>
        <h1 className="relative mt-8 text-4xl sm:text-6xl md:text-7xl font-semibold !text-white leading-[1.05] tracking-tight animate-rise [text-shadow:0_2px_24px_rgba(4,22,18,0.55)]">
          Find Your Moment
          <br />
          <span className="italic text-mint" style={{ fontFamily: "Fraunces, serif" }}>
            of Calm
          </span>
        </h1>
        <p className="relative mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-on-image font-medium leading-relaxed animate-rise px-2">
          Immersive sounds, meditation and peaceful environments designed to help you
          reset and find your focus.
        </p>

        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3 animate-rise">
          <button
            onClick={() => audio.startImmersive("rain")}
            className="btn-primary px-7 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 shadow-[0_10px_30px_-10px_rgba(16,110,80,0.55)] transition-shadow hover:shadow-[0_14px_40px_-10px_rgba(16,110,80,0.7)]"
          >
            <Sparkles className="h-4 w-4" /> Start Relaxation
          </button>
          <Link to="/sounds" className="btn-ghost px-7 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2">
            <Play className="h-4 w-4 fill-current" /> Explore Sounds
          </Link>
        </div>

        {/* Quick-start soundscapes */}
        <div className="relative mt-16 max-w-5xl mx-auto">
          <div className="glass-card rounded-[36px] p-6 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-3">
              <PreviewSoundCard icon={CloudRain} title="Gentle Rain" mood="Focus" soundId="rain" />
              <PreviewSoundCard icon={Waves} title="Ocean Waves" mood="Calm" soundId="ocean" />
              <PreviewSoundCard icon={Flame} title="Fireplace" mood="Sleep" soundId="fireplace" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewSoundCard({ icon: Icon, title, mood, soundId }: {
  icon: typeof Waves; title: string; mood: string; soundId: SoundId;
}) {
  const audio = useAudio();
  const p = soundId in audio.active;
  return (
    <div className="glass rounded-3xl p-5 text-left transition-all hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="grid place-items-center h-11 w-11 rounded-2xl bg-gradient-to-br from-sky-mist to-brand-soft">
          <Icon className="h-5 w-5 sound-icon" />
        </div>
        <button
          onClick={() => audio.toggleTrack(soundId, 65)}
          className="grid place-items-center h-11 w-11 rounded-full btn-primary"
          aria-label={p ? "Pause" : "Play"}
        >
          {p ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
        </button>
      </div>
      <div className="mt-5">
        <div className="text-xs text-ink-soft">{mood}</div>
        <div className="text-lg font-semibold text-ink">{title}</div>
      </div>
      <div className="mt-4 h-1.5 rounded-full bg-white/60 overflow-hidden">
        <div className={`h-full bg-gradient-to-r from-brand-soft to-brand ${p ? "w-2/3 animate-shimmer" : "w-1/4"}`} />
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: Trees, title: "Nature Sounds", desc: "Rain, ocean, forest — mastered in high fidelity." },
  { icon: Moon, title: "Deep Sleep", desc: "Sleep stories and soundscapes that guide you off." },
  { icon: Brain, title: "Meditation", desc: "Guided sessions from 3 to 45 minutes." },
  { icon: Wind, title: "Breathing", desc: "Box, 4-7-8 and coherent breathing exercises." },
  { icon: Sparkles, title: "Focus", desc: "Binaural beats and lo-fi loops that stick." },
  { icon: Heart, title: "Relaxation", desc: "Gentle audio journeys to melt tension." },
  { icon: Music, title: "Personal Playlists", desc: "Save the mixes that get you into flow." },
  { icon: Timer, title: "Smart Timer", desc: "Fade out beautifully — never wake to silence." },
  { icon: Star, title: "Favorites", desc: "Tap once. Your ritual is always one gesture away." },
  { icon: Cloud, title: "Cross-device Sync", desc: "iPhone, iPad, web — everything, everywhere." },
];

function Features() {
  return (
    <Scene image={NATURE.forest} className="px-4 pt-32 pb-32 mt-24 rounded-[48px] mx-4">
      <SectionHeading
        eyebrow="Everything you need"
        title="A quieter mind, one tap away."
        subtitle="Ten thoughtful tools, one calm interface. Made to disappear so you can be present."
      />
      <div className="mt-16 mx-auto max-w-6xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="glass-card rounded-3xl p-6 transition-all hover:-translate-y-1 group">
            <div className="grid place-items-center h-12 w-12 rounded-2xl bg-gradient-to-br from-mint to-aqua group-hover:scale-110 transition-transform">
              <f.icon className="h-5 w-5 sound-icon" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-ink">{f.title}</h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </Scene>
  );
}

function SoundPreview() {
  return (
    <section className="px-4 pt-32">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-end justify-between gap-6">
        <SectionHeading eyebrow="Sound library" title="A world of sound, curated." align="left" />
        <Link to="/sounds" className="btn-ghost self-start md:self-auto px-5 py-2.5 rounded-full text-sm font-medium inline-flex items-center gap-2">
          Explore all 16 <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-12 mx-auto max-w-6xl grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {SOUND_LIBRARY.slice(0, 8).map((s) => (
          <SoundCard key={s.title} {...s} />
        ))}
      </div>
    </section>
  );
}

function Mixer() {
  const audio = useAudio();
  const rows: { id: SoundId; label: string; icon: typeof Waves }[] = [
    { id: "rain",      label: "Rain",      icon: CloudRain },
    { id: "wind",      label: "Wind",      icon: Wind },
    { id: "fireplace", label: "Fire",      icon: Flame },
    { id: "birds",     label: "Birds",     icon: Bird },
    { id: "ocean",     label: "Ocean",     icon: Waves },
  ];
  return (
    <section className="px-4 pt-32">
      <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeading
            eyebrow="Sound mixer"
            title="Design the silence that suits you."
            subtitle="Combine sounds like a producer. Save your mix, open it in one tap tomorrow."
            align="left"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => audio.loadPlaylist([
                { id: "rain", volume: 55 }, { id: "fireplace", volume: 45 }, { id: "wind", volume: 20 },
              ])}
              className="inline-flex btn-primary px-6 py-3 rounded-full text-sm font-semibold items-center gap-2"
            >
              Play a demo mix <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => audio.stopAll()}
              className="btn-ghost px-6 py-3 rounded-full text-sm font-medium"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="glass-card rounded-[32px] p-6 sm:p-8">
          {rows.map(({ id, label, icon: Icon }) => {
            const active = id in audio.active;
            const value = active ? audio.active[id] : 0;
            return (
              <div key={id} className="py-4 first:pt-0 last:pb-0 border-b border-white/50 last:border-0">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => audio.toggleTrack(id, 55)}
                      aria-pressed={active}
                      aria-label={`Toggle ${label}`}
                      className={`grid place-items-center h-10 w-10 rounded-xl shrink-0 transition ${active ? "btn-primary" : "bg-gradient-to-br from-sky-mist to-brand-soft"}`}
                    >
                      <Icon className={`h-4 w-4 ${active ? "" : "sound-icon"}`} />
                    </button>
                    <div className="font-medium truncate">{label}</div>
                  </div>
                  <div className="text-sm text-ink-soft tabular-nums shrink-0">{value}%</div>
                </div>
                <input
                  type="range" min={0} max={100} value={value}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (v === 0) audio.stopTrack(id);
                    else audio.setTrackVolume(id, v);
                  }}
                  className="mt-3 w-full accent-[color:var(--brand)]"
                  aria-label={`${label} volume`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AppPreview() {
  return (
    <Scene image={NATURE.lake} className="px-4 pt-32 pb-32 mt-24 rounded-[48px] mx-4">
      <div className="mx-auto max-w-6xl glass-card rounded-[40px] p-8 sm:p-16 overflow-hidden relative">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading
              eyebrow="Everywhere you are"
              title="Beautifully quiet, on every device."
              subtitle="Native apps for iPhone, iPad, Android, macOS and the web. Your rituals sync in real time."
              align="left"
            />
          </div>
          <div className="relative h-[440px]">
            <PhoneMock className="absolute left-4 top-4 rotate-[-6deg] animate-float-slow" title="Rain" mood="Deep focus" icon={CloudRain} />
            <PhoneMock className="absolute right-4 bottom-0 rotate-[6deg] animate-float-slower" title="Night Forest" mood="Sleep" icon={Moon} />
          </div>
        </div>
      </div>
    </Scene>
  );
}

function PhoneMock({ className = "", title, mood, icon: Icon }: {
  className?: string; title: string; mood: string; icon: typeof Waves;
}) {
  return (
    <div className={`w-[240px] rounded-[42px] p-2 bg-gradient-to-b from-white/90 to-white/60 border border-white/80 shadow-2xl ${className}`}>
      <div className="rounded-[34px] bg-gradient-to-br from-sky-ice via-white to-sky-mist p-5 h-[400px] flex flex-col">
        <div className="mx-auto h-1 w-16 rounded-full bg-ink/10" />
        <div className="mt-6 grid place-items-center h-40 rounded-3xl bg-gradient-to-br from-brand-soft to-brand">
          <Icon className="h-16 w-16 text-white/90" strokeWidth={1.2} />
        </div>
        <div className="mt-5">
          <div className="text-[10px] uppercase tracking-widest text-ink-soft">{mood}</div>
          <div className="text-xl font-semibold">{title}</div>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-ink-soft tabular-nums">01:24</span>
          <button className="grid place-items-center h-12 w-12 rounded-full btn-primary" aria-label="Play">
            <Play className="h-5 w-5 fill-current ml-0.5" />
          </button>
          <span className="text-xs text-ink-soft tabular-nums">08:00</span>
        </div>
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  { name: "Ava Lindqvist", role: "Designer, Stockholm", quote: "I fall asleep before the first story ends. MySerene replaced three apps for me." },
  { name: "Marcus Chen", role: "Founder, Singapore", quote: "The mixer is quietly genius. My focus sessions have never been calmer." },
  { name: "Sofia Rey", role: "Therapist, Barcelona", quote: "I recommend MySerene to clients weekly. It feels premium without ever being loud." },
];

function Testimonials() {
  return (
    <section className="px-4 pt-32">
      <SectionHeading eyebrow="In their words" title="A calmer life, in their words." />
      <div className="mt-14 mx-auto max-w-6xl grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="glass-card rounded-3xl p-7">
            <div className="flex gap-0.5 text-brand">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <blockquote className="mt-5 text-lg text-ink leading-relaxed">"{t.quote}"</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-sky-mist to-brand-soft" />
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-ink-soft">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <Scene image={NATURE.night} dark className="px-4 pt-32 pb-32 mt-24 rounded-[48px] mx-4">
      {/* Twinkling stars */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="absolute h-1 w-1 rounded-full bg-white/90 animate-twinkle"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 90}%`,
              animationDelay: `${(i * 0.4) % 4}s`,
            }} />
        ))}
      </div>
      <div className="mx-auto max-w-6xl glass-dark rounded-[40px] p-10 sm:p-16 text-center relative overflow-hidden">
        <div aria-hidden className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-brand-soft/40 blur-3xl animate-float-slow" />
        <div aria-hidden className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-sky-mist/70 blur-3xl animate-float-slower" />
        <div className="relative">
          <h2 className="text-4xl sm:text-6xl font-medium leading-tight text-white">
            Your peaceful place<br />begins here.
          </h2>
          <p className="mt-5 text-lg text-white/95 font-medium max-w-xl mx-auto">
            Seven days free. No card required. Cancel any time.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/register" className="btn-primary px-7 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2">
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/pricing" className="btn-ghost px-7 py-3.5 rounded-full text-sm font-medium">
              See pricing
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-medium text-white/90">
            {["No ads, ever","Cancel anytime","Sync across devices"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-mint" />{t}</span>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  );
}