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

      {/* Independent product intro */}
      <section className="px-4 pt-14">
        <div className="mx-auto max-w-3xl glass-card rounded-[32px] p-6 sm:p-10 space-y-5">
          <p className="text-lg text-ink leading-relaxed">
            MySerene is an independent product, created and maintained by one person: a programmer
            and teacher who understands how difficult it can be to stay focused and productive
            while dealing with stress, mental overload and constant distractions.
          </p>
          <p className="text-base text-ink/85 leading-relaxed">
            It started from a simple personal idea. Sometimes you don't need a complicated solution.
            You just need a few minutes of the right atmosphere, a calming sound, a moment to
            breathe, and a way to reset your mind. The goal of MySerene is to make that process
            simple and accessible — a place to quickly calm down, reset your attention and return
            to your work with a clearer mind.
          </p>
          <p className="text-base text-ink/85 leading-relaxed">
            As both a programmer and a teacher, the creator wanted to combine technology with
            something very human: the ability to pause, breathe and regain focus.
          </p>
        </div>
      </section>

      {/* Personal story */}
      <section className="px-4 pt-16">
        <div className="mx-auto max-w-6xl">
          <Scene image={NATURE.forest} className="rounded-[32px] overflow-hidden">
            <div className="relative z-10 p-6 sm:p-12 md:p-16">
              <h2 className="text-3xl sm:text-4xl font-semibold text-ink leading-tight">
                Why I Created MySerene
              </h2>
              <div className="mt-6 max-w-2xl space-y-5 text-base sm:text-lg text-ink leading-[1.85]">
                <p>
                  I created MySerene because I wanted something simple. As a programmer and
                  teacher, I know how easy it is to become overwhelmed by tasks, notifications,
                  deadlines and constant mental noise.
                </p>
                <p>
                  Sometimes I don't need another productivity tool. I need a few quiet minutes to
                  reset.
                </p>
                <p>
                  I wanted a place where I could open the browser, choose a sound or meditation,
                  take a breath and quickly return to what matters. That idea became MySerene.
                </p>
                <p className="glass rounded-3xl px-5 py-4 font-semibold border-l-4 border-brand">
                  It is designed around a simple belief: a calmer mind can make space for better
                  work, better focus and better moments.
                </p>
              </div>
            </div>
          </Scene>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink">
            Our Mission
          </span>
          <p className="mt-6 text-xl sm:text-2xl md:text-3xl font-semibold text-ink leading-[1.35]">
            MySerene exists to make moments of calm easier to find.
          </p>
          <p className="mt-5 text-base sm:text-lg text-ink/85 leading-relaxed">
            Whether you need five minutes between tasks, a peaceful environment for focused work, a
            meditation session, or gentle sounds to help you wind down at night, MySerene is
            designed to give you a simple space to reset.
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
