import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Wind, Focus, Leaf, Moon, Pause, Ear, Play } from "lucide-react";
import { PageShell, SectionHeading, Scene, NATURE } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About MySerene — The story behind it" },
      {
        name: "description",
        content:
          "I'm a programmer, teacher and mother of three, and I built MySerene as a simple place to breathe, reset and find focus during a busy day.",
      },
      { property: "og:title", content: "About MySerene" },
      {
        property: "og:description",
        content: "Designed to help you find calm, focus and balance — whenever you need it.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://myserene.lovable.app/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://myserene.lovable.app/about" }],
  }),
  component: AboutPage,
});

const PURPOSE = [
  {
    icon: Wind,
    title: "Relax",
    body: "A calm environment for the moments when your mind feels overloaded.",
  },
  {
    icon: Focus,
    title: "Focus",
    body: "An atmosphere that helps you settle into the task in front of you.",
  },
  {
    icon: Leaf,
    title: "Meditate",
    body: "Gentle guided and ambient sessions that make space to breathe.",
  },
  {
    icon: Moon,
    title: "Sleep",
    body: "Peaceful nighttime sounds and a sleep timer for winding down.",
  },
];

const MOMENTS = [
  "Before work",
  "Between meetings",
  "After a stressful moment",
  "During a short break",
  "Before studying",
  "In the evening",
  "Before sleep",
  "During quiet family moments",
];

const STEPS = [
  { icon: Pause, label: "Pause." },
  { icon: Wind, label: "Breathe." },
  { icon: Ear, label: "Listen." },
  { icon: Focus, label: "Focus." },
  { icon: Play, label: "Continue." },
];

function AboutPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="px-4">
        <div className="mx-auto max-w-6xl">
          <Scene image={NATURE.sunrise} minHeight="clamp(320px, 52vh, 520px)" className="rounded-[32px] overflow-hidden">
            <div className="relative z-10 px-6 sm:px-12 py-14 sm:py-20 max-w-2xl">
              <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                About MySerene
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-semibold text-ink leading-[1.05] break-words">
                About MySerene
              </h1>
              <p className="mt-5 text-lg sm:text-xl text-ink font-medium leading-relaxed">
                I built MySerene to help you find calm, focus and balance — whenever you need it.
              </p>
            </div>
          </Scene>
        </div>
      </section>

      {/* My Story */}
      <section className="px-4 pt-16">
        <div className="mx-auto max-w-6xl">
          <Scene image={NATURE.forest} className="rounded-[32px] overflow-hidden">
            <div className="relative z-10 p-6 sm:p-12 md:p-16">
              <h2 className="text-3xl sm:text-4xl font-semibold text-ink leading-tight">
                My Story
              </h2>
              <div className="mt-6 max-w-2xl space-y-5 text-base sm:text-lg text-ink leading-[1.85]">
                <p>
                  I created MySerene because I wanted a simple way to calm my mind, reset my
                  attention and return to the things that matter.
                </p>
                <p>
                  As a programmer and a teacher, I know how easy it is to become overwhelmed by
                  work, responsibilities, deadlines and constant distractions. And I'm also a
                  mother of three. Life can be wonderfully full — but it can also be loud.
                </p>
                <p>
                  Sometimes I simply need a few minutes to breathe, slow down and reset. Then I
                  realised my family needed those moments too. That's where the idea for MySerene
                  began.
                </p>
                <p>
                  I wanted a place where I could open an app, choose a peaceful sound, take a few
                  minutes to breathe or meditate, and feel a little more grounded.
                </p>
                <p className="glass rounded-3xl px-5 py-4 font-semibold border-l-4 border-brand">
                  Something simple. Something beautiful. Something that works for me, for my
                  family, and for anyone who needs a quiet moment during a busy day.
                </p>
              </div>
            </div>
          </Scene>
        </div>
      </section>

      {/* Created for Real Life */}
      <section className="px-4 pt-16">
        <div className="mx-auto max-w-3xl glass-card rounded-[32px] p-6 sm:p-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-ink leading-tight">
            Created for Real Life
          </h2>
          <div className="mt-5 space-y-4 text-base sm:text-lg text-ink/90 leading-relaxed">
            <p>
              I didn't build MySerene for a perfect, quiet day. I built it for ordinary ones — the
              busy mornings, the long afternoons, the evenings when everyone in the house is finally
              still.
            </p>
            <p>
              It's made for the whole family, and for whatever kind of pause you need right now.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {MOMENTS.map((m) => (
              <span
                key={m}
                className="rounded-full bg-white/75 px-3.5 py-2 text-xs sm:text-sm font-semibold text-ink"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* My Mission */}
      <section className="px-4 pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink">
            My Mission
          </span>
          <p className="mt-6 text-xl sm:text-2xl md:text-3xl font-semibold text-ink leading-[1.35]">
            I want to make it easier to find a moment of calm whenever you need one.
          </p>
          <p className="mt-5 text-base sm:text-lg text-ink/85 leading-relaxed">
            Whether you have five minutes or an entire evening, I want MySerene to give you a
            peaceful space to pause, breathe, focus and recharge.
          </p>
        </div>
      </section>

      {/* What MySerene is for */}
      <section className="px-4 pt-16">
        <SectionHeading eyebrow="What it's for" title="Four simple reasons to open it." />
        <div className="mt-10 mx-auto max-w-6xl grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PURPOSE.map((p) => (
            <div key={p.title} className="glass-card rounded-3xl p-6 sm:p-7">
              <span className="grid place-items-center h-11 w-11 rounded-2xl bg-gradient-to-br from-brand-soft to-brand">
                <p.icon className="h-5 w-5 text-primary-foreground" strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm text-ink/85 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-4 pt-20">
        <div className="mx-auto max-w-4xl glass-card rounded-[32px] p-6 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-ink leading-[1.1]">
            Less Noise. More Presence.
          </h2>
          <div className="mt-6 space-y-4 max-w-2xl mx-auto text-base sm:text-lg text-ink/85 leading-relaxed">
            <p>
              MySerene is intentionally simple. There are no streaks to protect, no scores to chase
              and no dashboard of numbers to interpret. Every screen tries to do one thing: help you
              settle, and then get out of the way.
            </p>
            <p>
              Complexity is easy to add and hard to live with. So the experience stays short and
              quiet, and follows the same small rhythm each time.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {STEPS.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-2 glass rounded-full px-4 py-2.5 text-sm font-semibold text-ink"
              >
                <s.icon className="h-4 w-4 text-brand" />
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="px-4 pt-20">
        <div className="mx-auto max-w-4xl glass-card rounded-[32px] p-6 sm:p-10 md:p-12">
          <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="mx-auto sm:mx-0">
              {/* Replace the div below with <img src="/images/founder.jpg" ... /> when a real photo is available. */}
              <div className="grid place-items-center h-32 w-32 sm:h-36 sm:w-36 rounded-[28px] bg-gradient-to-br from-brand-soft to-brand shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)]">
                <span className="text-4xl font-semibold text-primary-foreground tracking-tight">MS</span>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">
                Founder &amp; Creator
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-ink leading-tight">
                The person behind MySerene
              </h2>
              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                {["Programmer", "Teacher", "Creator of MySerene"].map((t) => (
                  <span key={t} className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold text-ink">
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-base text-ink/85 leading-relaxed">
                MySerene is built and looked after by one person, in the time between teaching and
                writing code — which is exactly the kind of day it was made for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pt-16 text-center">
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/sounds"
            className="btn-primary px-7 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2"
          >
            Find a sound <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/blog" className="btn-ghost px-7 py-3.5 rounded-full text-sm font-medium">
            Read the articles
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
