import { createFileRoute, Link } from "@tanstack/react-router";
import { Moon, Brain, Heart, Sparkles, Wind, Sun, ArrowRight } from "lucide-react";
import { PageShell, SectionHeading } from "@/components/site-chrome";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Serene" },
      { name: "description", content: "Ideas on sleep, stress, meditation, mental health, productivity and mindfulness." },
      { property: "og:title", content: "Serene Journal" },
      { property: "og:description", content: "Small essays on sleep, calm and modern life." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const POSTS = [
  { icon: Moon, cat: "Sleep", title: "Why the last 5 minutes of your day matter most", read: "6 min read", grad: "from-sky-mist to-brand-soft" },
  { icon: Wind, cat: "Stress", title: "A 90-second breathing script for busy afternoons", read: "3 min read", grad: "from-brand-soft to-brand" },
  { icon: Brain, cat: "Meditation", title: "How micro-sessions rewire attention", read: "8 min read", grad: "from-sky-ice to-sky-mist" },
  { icon: Heart, cat: "Mental Health", title: "On being kinder to your own tired mind", read: "5 min read", grad: "from-sky-mist to-brand-soft" },
  { icon: Sparkles, cat: "Productivity", title: "Sound design for deep work, minus the hype", read: "7 min read", grad: "from-brand-soft to-brand" },
  { icon: Sun, cat: "Mindfulness", title: "The one-breath ritual that changes your morning", read: "4 min read", grad: "from-sky-ice to-sky-mist" },
];

function BlogPage() {
  return (
    <PageShell>
      <section className="px-4 pt-16 pb-8">
        <SectionHeading eyebrow="The Serene Journal" title="Small essays on calm." subtitle="Sleep, stress, meditation, mental health, productivity and mindfulness — no fluff." />
      </section>
      <section className="px-4 pt-8">
        <div className="mx-auto max-w-6xl grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <Link to="/blog" key={p.title} className="glass-card rounded-3xl overflow-hidden transition-all hover:-translate-y-1 group">
              <div className={`h-48 bg-gradient-to-br ${p.grad} grid place-items-center relative overflow-hidden`}>
                <p.icon className="h-16 w-16 text-white/80 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.2} />
              </div>
              <div className="p-6">
                <div className="text-[11px] uppercase tracking-widest text-ink-soft">{p.cat}</div>
                <h3 className="mt-2 text-lg font-semibold text-ink leading-snug">{p.title}</h3>
                <div className="mt-4 flex items-center justify-between text-xs text-ink-soft">
                  <span>{p.read}</span>
                  <span className="inline-flex items-center gap-1 text-ink group-hover:gap-2 transition-all">Read <ArrowRight className="h-3 w-3" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}